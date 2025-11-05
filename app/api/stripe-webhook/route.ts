import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { trackWebhookError, trackPurchaseMetric, trackResponseTime } from '@/lib/monitoring'

// This is your Stripe webhook secret - you'll get this from Stripe Dashboard
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')!

    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 503 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      )
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      await trackWebhookError('Signature verification failed', {
        error: err.message,
        hasSignature: !!signature
      })
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Get customer email
        const customerEmail = session.customer_details?.email

        if (customerEmail) {
          console.log('Checkout completed for:', customerEmail)

          // TODO: Here's where we would:
          // 1. Create/update user account
          await createUserAccount(customerEmail, session)

          // 2. Generate PDF with hybrid recipe selection
          const pdfUrl = await generateMealPlanPDF(session, customerEmail)

          // 3. Send email with PDF
          await sendMealPlanEmail(customerEmail, pdfUrl, session)

          // 4. Store purchase history
          await storePurchaseHistory(customerEmail, session)

          // 5. Track successful purchase metric
          await trackPurchaseMetric(session.amount_total || 0, session.currency || 'usd')
        }

        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('Subscription created:', subscription.id)

        // TODO: Set up recurring delivery for monthly subscribers
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('Subscription cancelled:', subscription.id)

        // TODO: Handle subscription cancellation
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Track successful response time
    await trackResponseTime('stripe-webhook', Date.now() - startTime)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    await trackWebhookError('Webhook handler failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      responseTime: Date.now() - startTime
    })
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

import { sendEmail, getMealPlanEmailTemplate, getWelcomeEmailTemplate } from '@/lib/email'
import { getProductById } from '@/lib/products'
import { createOrUpdateUser, createPurchase, updatePurchaseWithPDF, createSubscription } from '@/lib/supabase'
import { generateAndUploadMealPlan } from '@/lib/storage'
import { createOrUpdateUser as createAuthUser, createSession, setSessionCookie } from '@/lib/auth'
import { selectRecipesForCustomer, trackCustomerRecipes } from '@/lib/hybrid-recipe-selector'

// Helper functions for webhook processing
async function createUserAccount(email: string, session: Stripe.Checkout.Session) {
  console.log('Creating user account for:', email)

  // Create user session for immediate access
  const productName = session.line_items?.data?.[0]?.description || 'Meal Plan'
  const authUser = await createAuthUser(email, {
    productId: session.metadata?.product_id || 'unknown',
    productName: productName,
    customerId: session.customer as string,
    dietPlan: session.metadata?.diet_plan
  })

  // Create session token (this would be set via response headers in production)
  const sessionToken = await createSession(authUser)

  // Create or update user in Supabase
  const user = await createOrUpdateUser(email, {
    name: session.customer_details?.name || undefined,
    stripe_customer_id: session.customer as string
  })

  return user
}

async function generateMealPlanPDF(session: Stripe.Checkout.Session, customerEmail: string) {
  console.log('Generating PDF with hybrid recipes for session:', session.id)

  const productName = session.line_items?.data?.[0]?.description || 'Wellness Transformation'
  const dietType = session.metadata?.diet_plan || 'mediterranean' // Default to mediterranean

  try {
    // Step 1: Select 30 recipes using hybrid approach (75% library + 25% new)
    console.log(`🍽️ Selecting recipes for ${dietType} diet...`)
    const selectedRecipes = await selectRecipesForCustomer({
      dietType,
      totalRecipes: 30, // One month worth
      newRecipesPercentage: 25 // 25% new recipes, 75% from library
    })

    console.log(`✅ Selected ${selectedRecipes.length} recipes:`)
    console.log(`  - From library: ${selectedRecipes.filter(r => !r.isNew).length}`)
    console.log(`  - Newly generated: ${selectedRecipes.filter(r => r.isNew).length}`)

    // Step 2: Track which recipes this customer received
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
    const customerId = customerEmail // Use email as customer ID
    const recipeIds = selectedRecipes.map(r => r.id)

    await trackCustomerRecipes(customerId, recipeIds, currentMonth)
    console.log(`📊 Tracked ${recipeIds.length} recipes for customer: ${customerEmail}`)

    // Step 3: Generate PDF with selected recipes
    const pdfUrl = await generateAndUploadMealPlan(
      customerEmail,
      productName,
      session.id,
      selectedRecipes // Pass the selected recipes
    )

    return pdfUrl
  } catch (error) {
    console.error('Error generating meal plan with hybrid recipes:', error)

    // Fallback to basic PDF generation
    console.log('Falling back to basic PDF generation...')
    return await generateAndUploadMealPlan(
      customerEmail,
      productName,
      session.id
    )
  }
}

async function sendMealPlanEmail(email: string, pdfUrl: string, session: Stripe.Checkout.Session) {
  console.log('Sending email to:', email, 'with PDF:', pdfUrl)

  const customerName = session.customer_details?.name || 'Valued Customer'
  const isSubscription = session.mode === 'subscription'
  const productName = session.line_items?.data?.[0]?.description || 'Meal Plan'

  // Send welcome email
  const welcomeHtml = getWelcomeEmailTemplate(customerName, email, isSubscription)
  await sendEmail({
    to: email,
    subject: 'Welcome to Meal Plans - Your Journey Begins!',
    html: welcomeHtml
  })

  // Send meal plan email with download link
  const mealPlanHtml = getMealPlanEmailTemplate(customerName, productName, pdfUrl)
  await sendEmail({
    to: email,
    subject: `Your ${productName} is Ready to Download!`,
    html: mealPlanHtml
  })
}

async function storePurchaseHistory(email: string, session: Stripe.Checkout.Session) {
  console.log('Storing purchase for:', email)

  // Get user from database
  const user = await createOrUpdateUser(email, {})

  if (user) {
    // Store purchase in Supabase
    const purchase = await createPurchase({
      user_id: user.id,
      stripe_session_id: session.id,
      product_id: session.metadata?.product_id || 'wellness-transformation',
      product_name: session.line_items?.data?.[0]?.description || 'Meal Plan',
      amount: session.amount_total || 0,
      currency: session.currency || 'usd',
      status: 'completed'
    })

    // If it's a subscription, also create subscription record
    if (session.mode === 'subscription' && session.subscription) {
      await createSubscription({
        user_id: user.id,
        stripe_subscription_id: session.subscription as string,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })
    }

    return purchase
  }

  return null
}