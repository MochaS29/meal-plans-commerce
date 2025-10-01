import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

// This is your Stripe webhook secret - you'll get this from Stripe Dashboard
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
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

          // 2. Generate PDF resources
          const pdfUrl = await generateMealPlanPDF(session)

          // 3. Send email with PDF
          await sendMealPlanEmail(customerEmail, pdfUrl, session)

          // 4. Store purchase history
          await storePurchaseHistory(customerEmail, session)
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

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
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

async function generateMealPlanPDF(session: Stripe.Checkout.Session) {
  console.log('Generating PDF for session:', session.id)

  const customerEmail = session.customer_details?.email || ''
  const productName = session.line_items?.data?.[0]?.description || 'Wellness Transformation'

  // Generate and upload PDF to Vercel Blob
  const pdfUrl = await generateAndUploadMealPlan(
    customerEmail,
    productName,
    session.id
  )

  return pdfUrl
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