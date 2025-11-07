'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Calendar, Star, Globe, Sparkles, ArrowLeft, RefreshCw } from 'lucide-react'
import { getProductById } from '@/lib/products'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function MonthlyCalendarPage() {
  const product = getProductById('monthly-calendar')

  const handleGetStarted = () => {
    // Redirect to unified customization page
    window.location.href = '/plans/customize'
  }

  if (!product) {
    return <div>Product not found</div>
  }

  const monthlyThemes = [
    {
      month: "January",
      theme: "New Year Wellness Reset",
      cuisines: ["Clean Eating", "Detox Smoothies", "Light Asian"]
    },
    {
      month: "February",
      theme: "Heart-Healthy Love",
      cuisines: ["Mediterranean", "Omega-Rich", "Dark Chocolate Treats"]
    },
    {
      month: "March",
      theme: "Spring Energy Boost",
      cuisines: ["Fresh Salads", "Green Smoothies", "Light Italian"]
    }
  ]

  const sampleRecipes = [
    {
      name: "Morning Matcha Energy Bowl",
      theme: "January Reset",
      description: "Antioxidant-rich breakfast with matcha, berries, and superfoods"
    },
    {
      name: "Mediterranean Stuffed Peppers",
      theme: "February Hearts",
      description: "Colorful bell peppers filled with quinoa, herbs, and feta"
    },
    {
      name: "Spring Garden Frittata",
      theme: "March Renewal",
      description: "Light egg dish with fresh asparagus, peas, and herbs"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
              <RefreshCw className="w-4 h-4" />
              MONTHLY SUBSCRIPTION
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {product.description}
            </p>
            <div className="mt-8">
              <span className="text-5xl font-bold text-teal-600">${(product.price / 100).toFixed(0)}</span>
              <span className="text-gray-600 ml-2">/month</span>
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

          {/* Monthly Themes Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-50 to-teal-50 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Monthly Themes</h2>
            <div className="space-y-6">
              {monthlyThemes.map((month, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{month.month}</h3>
                      <p className="text-amber-700 font-medium">{month.theme}</p>
                    </div>
                    <Calendar className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {month.cuisines.map((cuisine, cidx) => (
                      <span key={cidx} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What Makes It Special */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <Globe className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Cuisine Adventures</h3>
              <p className="text-gray-700">Travel the world from your kitchen with authentic recipes from different cultures each month</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <Sparkles className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Seasonal & Fresh</h3>
              <p className="text-gray-700">Menus designed around seasonal produce for maximum flavor and nutrition</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <Star className="w-10 h-10 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Member Exclusives</h3>
              <p className="text-gray-700">Access to bonus recipes, meal prep guides, and AI-powered recipe Q&A</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <RefreshCw className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible & Easy</h3>
              <p className="text-gray-700">Switch themes, skip months, or cancel anytime with no hassle</p>
            </div>
          </motion.div>

          {/* Sample Recipes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample Monthly Favorites</h2>
            <div className="space-y-4">
              {sampleRecipes.map((recipe, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                      {recipe.theme}
                    </span>
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
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Your Subscription Works</h2>
            <div className="space-y-4 text-gray-700">
              <p>📅 <strong>Monthly Delivery:</strong> Receive your new calendar on the 25th of each month for the following month</p>
              <p>🎨 <strong>Beautiful Design:</strong> Each calendar is uniquely designed with that month's theme and colors</p>
              <p>📧 <strong>Digital Access:</strong> Get instant access to recipes and shopping lists in your member portal</p>
              <p>🔄 <strong>Switch Anytime:</strong> Change your cuisine preference for next month with one click</p>
              <p>⏸ <strong>Pause When Needed:</strong> Going on vacation? Pause your subscription and resume when ready</p>
            </div>
          </motion.div>

          {/* CTA - Dual Pricing Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
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