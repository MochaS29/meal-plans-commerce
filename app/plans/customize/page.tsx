'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Calendar, Users, Heart, ChefHat, Clock, ArrowLeft, Sparkles } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CustomizeContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  // Customization state
  const [dietType, setDietType] = useState('mediterranean')
  const [familySize, setFamilySize] = useState('4')
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([])
  const [allergies, setAllergies] = useState('')
  const [preferences, setPreferences] = useState('')

  const dietOptions = [
    { id: 'mediterranean', name: 'Mediterranean', description: 'Heart-healthy with olive oil, fish, and fresh vegetables', icon: '🫒' },
    { id: 'keto', name: 'Keto', description: 'Low-carb, high-fat recipes for ketosis', icon: '🥑' },
    { id: 'vegan', name: 'Vegan', description: 'Plant-based recipes with complete nutrition', icon: '🌱' },
    { id: 'paleo', name: 'Paleo', description: 'Whole foods, no processed ingredients', icon: '🥩' },
    { id: 'vegetarian', name: 'Vegetarian', description: 'Meat-free with dairy and eggs', icon: '🥗' },
    { id: 'family-focused', name: 'Family Recipes', description: 'Kid-friendly, crowd-pleasing meals', icon: '👨‍👩‍👧‍👦' },
    { id: 'intermittent-fasting', name: 'Intermittent Fasting', description: 'Time-restricted eating with nutrient-dense meals', icon: '⏰' },
    { id: 'global-cuisine', name: 'Global Cuisine', description: 'International flavors from around the world', icon: '🌍' }
  ]

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'low-carb', label: 'Low-Carb' },
    { id: 'kid-friendly', label: 'Kid-Friendly' }
  ]

  // Handle diet parameter from URL
  useEffect(() => {
    const dietParam = searchParams.get('diet')
    if (dietParam && dietOptions.find(d => d.id === dietParam)) {
      setDietType(dietParam)
    }
  }, [searchParams])

  const toggleDietaryNeed = (id: string) => {
    setDietaryNeeds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleCheckout = async (productType: 'one_time' | 'subscription') => {
    try {
      setLoading(true)

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productType === 'one_time' ? 'wellness-transformation' : 'monthly-calendar',
          productType,
          dietType,
          customizations: {
            familySize: parseInt(familySize),
            dietaryNeeds,
            allergies,
            preferences
          }
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Checkout failed: ${errorMessage}\n\nPlease check the browser console for details.`)
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
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-PERSONALIZED MEAL PLANS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Customize Your Meal Plan
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Tell us about your preferences and we&apos;ll create a personalized meal plan with AI-generated recipes tailored just for you
            </p>
          </motion.div>

          {/* Customization Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Preferences</h2>

            {/* Diet Type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Your Diet Style
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {dietOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDietType(option.id)}
                    className={`p-4 rounded-lg border-2 transition text-left ${
                      dietType === option.id
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">{option.name}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                      {dietType === option.id && (
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Family Size */}
            <div className="mb-8">
              <label htmlFor="familySize" className="block text-sm font-semibold text-gray-900 mb-2">
                Family Size
              </label>
              <select
                id="familySize"
                value={familySize}
                onChange={(e) => setFamilySize(e.target.value)}
                className="w-full md:w-64 px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              >
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5 people</option>
                <option value="6">6 people</option>
                <option value="7">7 people</option>
                <option value="8">8 people</option>
              </select>
            </div>

            {/* Dietary Needs */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Dietary Needs (select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietaryOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleDietaryNeed(option.id)}
                    className={`px-4 py-3 rounded-lg border-2 transition font-medium ${
                      dietaryNeeds.includes(option.id)
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <span className="mr-2">{dietaryNeeds.includes(option.id) ? '✓' : ''}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div className="mb-8">
              <label htmlFor="allergies" className="block text-sm font-semibold text-gray-900 mb-2">
                Allergies & Food Restrictions
              </label>
              <input
                id="allergies"
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="e.g., peanuts, shellfish, soy"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
            </div>

            {/* Preferences */}
            <div className="mb-0">
              <label htmlFor="preferences" className="block text-sm font-semibold text-gray-900 mb-2">
                Additional Preferences (optional)
              </label>
              <textarea
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="Tell us about favorite cuisines, foods to avoid, spice preferences, cooking skill level, etc."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none"
              />
            </div>
          </motion.div>

          {/* Pricing Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {/* One-Time Option */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-teal-600 transition">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">One Month</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-teal-600">$59</span>
                  <span className="text-gray-600 ml-2">one-time</span>
                </div>
                <p className="text-gray-700">Perfect for trying out our service</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">30-35 AI-personalized recipes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dinner recipes for the entire month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">4 snack recipes included</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Shopping lists & meal prep guides</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Delivered in 2-4 hours</span>
                </li>
              </ul>
              <button
                onClick={() => handleCheckout('one_time')}
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-600 to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Get One Month'}
              </button>
            </div>

            {/* Subscription Option */}
            <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl shadow-lg p-8 border-2 border-teal-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                BEST VALUE
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Subscription</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-teal-600">$29</span>
                  <span className="text-gray-600 ml-2">per month</span>
                </div>
                <p className="text-gray-700">Fresh recipes delivered monthly</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">New meal plan every month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">30-35 AI-personalized recipes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Delivered on the 1st of each month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Save 50% compared to one-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Cancel anytime</span>
                </li>
              </ul>
              <button
                onClick={() => handleCheckout('subscription')}
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-600 to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Subscribe Monthly'}
              </button>
            </div>
          </motion.div>

          {/* What You Get */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What&apos;s Included</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Calendar className="w-8 h-8 text-teal-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Monthly Calendar</h3>
                  <p className="text-gray-700">Visual meal calendar for the entire month with all recipes organized</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ChefHat className="w-8 h-8 text-amber-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Complete Recipes</h3>
                  <p className="text-gray-700">Full recipes with ingredients, instructions, prep times, and nutrition info</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Portion-Adjusted</h3>
                  <p className="text-gray-700">All recipes scaled to your family size automatically</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Meal Prep Guides</h3>
                  <p className="text-gray-700">Time-saving strategies and prep schedules to make cooking easier</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default function CustomizePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CustomizeContent />
    </Suspense>
  )
}
