import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getProductById } from '@/lib/products'
import { getBaseUrl } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { productId, customizations, dietType } = await request.json()

    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing is not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const baseUrl = getBaseUrl()

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: product.type === 'subscription' ? 'subscription' : 'payment',
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: product.name,
              description: product.description,
              images: product.image ? [`${baseUrl}${product.image}`] : [],
            },
            unit_amount: product.price,
            ...(product.type === 'subscription' && {
              recurring: {
                interval: 'month',
              },
            }),
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/plans/customize`,
      metadata: {
        productId,
        diet_type: dietType || 'mediterranean', // Default to mediterranean if not specified
        customizations: JSON.stringify(customizations || {}),
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_email: undefined, // Will be collected in checkout
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      {
        error: error.message || 'Failed to create checkout session',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}