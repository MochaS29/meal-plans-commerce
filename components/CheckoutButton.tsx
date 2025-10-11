'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Loader2 } from 'lucide-react'
import { trackBeginCheckout } from './GoogleAdsTracking'
import { products } from '@/lib/products'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutButtonProps {
  productId?: string
  className?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export default function CheckoutButton({
  productId = 'wellness-transformation',
  className = '',
  children,
  variant = 'primary'
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setLoading(true)

      // Get product details for tracking
      const product = products.find(p => p.id === productId)
      const amount = product ? product.price / 100 : 0

      // Track begin checkout conversion
      trackBeginCheckout(productId, amount)

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId,
          customizations: {}
        })
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('Checkout API error:', error)
        throw new Error(error.error || 'Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again or contact support.')
    } finally {
      setLoading(false)
    }
  }

  const baseClasses = variant === 'primary'
    ? 'bg-gradient-to-r from-teal-600 to-amber-600 text-white hover:shadow-xl'
    : 'bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50'

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${baseClasses} px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  )
}