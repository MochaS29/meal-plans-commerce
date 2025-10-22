'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Calendar, ShoppingCart, ChefHat, Heart, Star, ArrowRight } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function WellnessTransformationPage() {
  const [loading, setLoading] = useState(false)
  const [selectedDiet, setSelectedDiet] = useState('mediterranean')

  const dietOptions = [
    { id: 'mediterranean', name: 'Mediterranean', description: 'Heart-healthy with olive oil, fish, and fresh vegetables' },
    { id: 'keto', name: 'Keto', description: 'Low-carb, high-fat recipes for ketosis' },
    { id: 'vegan', name: 'Vegan', description: 'Plant-based recipes with complete nutrition' },
    { id: 'paleo', name: 'Paleo', description: 'Whole foods, no processed ingredients' },
    { id: 'vegetarian', name: 'Vegetarian', description: 'Meat-free with dairy and eggs' },
    { id: 'family', name: 'Family Recipes', description: 'Kid-friendly, crowd-pleasing meals' }
  ]

  const handleCheckout = async () => {
    try {
      setLoading(true)

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: 'wellness-transformation',
          dietPlan: selectedDiet,
          customizations: {}
        })
      })

      if (!response.ok) {
        const error = await response.json()
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
            Mocha&apos;s MindLab
          </Link>
          <Link href="/" className="text-gray-600 hover:text-teal-600 transition">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent"
        >
          30-Day Wellness Transformation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-700 max-w-3xl mx-auto mb-8"
        >
          Your complete meal planning solution with restaurant-quality recipes,
          organized shopping lists, and a beautiful printable calendar
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block"
        >
          <div className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold">
            MOST POPULAR CHOICE
          </div>
        </motion.div>
      </div>

      {/* What's Included */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What You Get</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              {[
                '30-day designer printable calendar',
                'Choice of cuisine style (Mediterranean, Keto, Plant-Based, etc.)',
                '50+ restaurant-quality recipes',
                'Complete nutritional information',
                'Professionally organized weekly shopping lists'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                'Sunday meal prep strategies',
                'Portion control guidelines',
                'Quick-start wellness guide',
                'AI-powered recipe assistance',
                'Lifetime access to updates'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Choose Your Style */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Choose Your Diet Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dietOptions.map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDiet(diet.id)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedDiet === diet.id
                      ? 'bg-gradient-to-br from-teal-100 to-amber-100 border-2 border-teal-500 ring-2 ring-teal-200'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900 mb-1">{diet.name}</div>
                  <div className="text-sm text-gray-600">{diet.description}</div>
                  {selectedDiet === diet.id && (
                    <div className="mt-2">
                      <Check className="w-5 h-5 text-teal-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="mb-4">
              <span className="text-5xl font-bold text-teal-600">$79</span>
              <span className="text-gray-600 ml-2">one-time payment</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-gradient-to-r from-teal-600 to-amber-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (
                <>Start Your Transformation <ArrowRight className="inline w-5 h-5 ml-2" /></>
              )}
            </button>
            <p className="text-sm text-gray-600 mt-4">Instant download • 30-day money-back guarantee</p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Beautiful Calendar</h3>
            <p className="text-gray-700">Professional design you'll be proud to display</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Smart Shopping</h3>
            <p className="text-gray-700">Organized lists save time and reduce waste</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Easy Recipes</h3>
            <p className="text-gray-700">Simple instructions for delicious results</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}