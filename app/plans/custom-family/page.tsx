'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Calendar, Users, Heart, ChefHat, Clock, ArrowLeft } from 'lucide-react'
import { getProductById } from '@/lib/products'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CustomFamilyPage() {
  const product = getProductById('custom-family')

  const handleGetStarted = () => {
    // Redirect to unified customization page
    window.location.href = '/plans/customize'
  }

  if (!product) {
    return <div>Product not found</div>
  }

  const sampleRecipes = [
    {
      name: "Family-Style Teriyaki Salmon Bowl",
      time: "25 min",
      servings: "4-6",
      description: "Kid-friendly glazed salmon with colorful veggies"
    },
    {
      name: "Build-Your-Own Taco Night",
      time: "20 min",
      servings: "4-6",
      description: "Interactive dinner with healthy toppings bar"
    },
    {
      name: "Hidden Veggie Pasta Primavera",
      time: "30 min",
      servings: "6",
      description: "Creamy pasta packed with blended vegetables"
    }
  ]

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
            Back to Plans
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              PERSONALIZED FAMILY PLAN
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {product.description}
            </p>
            <div className="mt-8">
              <span className="text-5xl font-bold text-teal-600">${(product.price / 100).toFixed(0)}</span>
              <span className="text-gray-600 ml-2">one-time</span>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* What Makes It Special */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Families Love This Plan</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Heart className="w-8 h-8 text-red-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Accommodates Everyone</h3>
                <p className="text-gray-700">Mix regular, vegetarian, gluten-free, and allergy-friendly options in one cohesive plan</p>
              </div>
              <div>
                <Clock className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Time-Saving Strategies</h3>
                <p className="text-gray-700">Batch cooking guides and meal prep tips designed for busy families</p>
              </div>
              <div>
                <Users className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Kid-Approved Recipes</h3>
                <p className="text-gray-700">Healthy meals that even picky eaters will love, with hidden veggie options</p>
              </div>
              <div>
                <ChefHat className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Restaurant Quality</h3>
                <p className="text-gray-700">Elevated family dinners that bring everyone together around delicious food</p>
              </div>
            </div>
          </motion.div>

          {/* Sample Recipes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample Family Favorites</h2>
            <div className="space-y-4">
              {sampleRecipes.map((recipe, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>⏱ {recipe.time}</span>
                      <span>👥 {recipe.servings}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{recipe.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Your Custom Plan is Generated</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Complete Your Family Profile</h3>
                  <p className="text-gray-700">Tell us about family size (2-8 people), dietary needs, allergies, and food preferences</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Generates Your Plan</h3>
                  <p className="text-gray-700">Our AI system creates a personalized 30-day meal calendar optimized for your family&apos;s unique needs</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quick Delivery</h3>
                  <p className="text-gray-700">Get your custom calendar, recipes, shopping lists, and meal prep guides within 1-2 hours (delivered via email)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA - Dual Pricing Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Plan</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-6">
              {/* One-Time Purchase */}
              <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-6 border-2 border-teal-200">
                <div className="text-sm font-semibold text-teal-700 mb-2">ONE-TIME</div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-teal-600">$59</span>
                  <span className="text-gray-600 ml-2">one month</span>
                </div>
                <button
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-teal-600 to-amber-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition transform hover:scale-105"
                >
                  Get One Month
                </button>
                <p className="text-xs text-gray-600 mt-3">Perfect for trying it out</p>
              </div>

              {/* Monthly Subscription */}
              <div className="bg-gradient-to-br from-amber-50 to-teal-50 rounded-2xl p-6 border-2 border-amber-300 relative">
                <div className="absolute -top-3 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  SAVE 50%
                </div>
                <div className="text-sm font-semibold text-amber-700 mb-2">SUBSCRIPTION</div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-amber-600">$29</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <button
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-amber-600 to-teal-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition transform hover:scale-105"
                >
                  Subscribe Monthly
                </button>
                <p className="text-xs text-gray-600 mt-3">Cancel anytime • New plan on 1st</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Delivered in 2-4 hours • 30-day money-back guarantee</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}