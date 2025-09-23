import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

export async function createCheckoutSession({
  priceId,
  mode = 'payment',
  customerId,
  customerEmail,
  metadata = {},
  successUrl,
  cancelUrl,
}: {
  priceId?: string
  mode?: 'payment' | 'subscription'
  customerId?: string
  customerEmail?: string
  metadata?: Record<string, string>
  successUrl: string
  cancelUrl: string
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card'],
      line_items: priceId ? [{ price: priceId, quantity: 1 }] : undefined,
      customer: customerId,
      customer_email: customerEmail && !customerId ? customerEmail : undefined,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })

    return session
  } catch (error) {
    console.error('Failed to create checkout session:', error)
    throw error
  }
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session
  } catch (error) {
    console.error('Failed to create customer portal session:', error)
    throw error
  }
}