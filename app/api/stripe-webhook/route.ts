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

          // 1. Create/update user account
          await createUserAccount(customerEmail, session)

          // 2. Create background job for meal plan generation
          await createBackgroundJob(customerEmail, session)

          // 3. Send processing email (tells user meal plan is being generated)
          await sendProcessingEmail(customerEmail, session)

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

import { sendEmail, getWelcomeEmailTemplate } from '@/lib/email'
import { getProductById } from '@/lib/products'
import { createOrUpdateUser, createPurchase, createSubscription, createMealPlanJob } from '@/lib/supabase'
import { createOrUpdateUser as createAuthUser, createSession, setSessionCookie } from '@/lib/auth'

// Helper functions for webhook processing
async function createUserAccount(email: string, session: Stripe.Checkout.Session) {
  console.log('Creating user account for:', email)

  // Create user session for immediate access
  const productName = session.line_items?.data?.[0]?.description || 'Meal Plan'
  const authUser = await createAuthUser(email, {
    productId: session.metadata?.product_id || 'unknown',
    productName: productName,
    customerId: session.customer as string,
    dietPlan: session.metadata?.diet_type
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

async function createBackgroundJob(email: string, session: Stripe.Checkout.Session) {
  console.log('Creating background job for:', email)

  const productId = session.metadata?.productId || 'custom-meal-plan'
  const productType = session.mode === 'subscription' ? 'subscription' : 'one_time'
  const dietType = session.metadata?.diet_type || 'mediterranean'
  const customizations = JSON.parse(session.metadata?.customizations || '{}')

  console.log(`📦 Product: ${productId} (${productType})`)
  console.log(`🍽️ Diet type: ${dietType}`)
  console.log(`⚙️ Customizations:`, customizations)

  // Create meal plan job
  await createMealPlanJob({
    customer_email: email,
    stripe_session_id: session.id,
    product_type: productType,
    diet_type: dietType,
    family_size: customizations.familySize || 4,
    dietary_needs: customizations.dietaryNeeds || [],
    allergies: customizations.allergies,
    preferences: customizations.preferences,
    customizations: customizations
  })

  console.log('✅ Background job created successfully')
}

async function sendProcessingEmail(email: string, session: Stripe.Checkout.Session) {
  console.log('Sending processing email to:', email)

  const customerName = session.customer_details?.name || 'Valued Customer'
  const isSubscription = session.mode === 'subscription'

  // Send welcome email with updated text about AI generation
  const welcomeHtml = getWelcomeEmailTemplate(customerName, email, isSubscription, true)
  await sendEmail({
    to: email,
    subject: 'Your Personalized Meal Plan is Being Prepared',
    html: welcomeHtml
  })

  console.log('✅ Processing email sent successfully')
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