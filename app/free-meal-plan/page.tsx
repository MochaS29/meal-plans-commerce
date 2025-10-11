'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Lock, Star } from 'lucide-react'
import { trackLeadCapture } from '@/components/GoogleAdsTracking'

export default function FreeMealPlanPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Track lead conversion
    trackLeadCapture('free-meal-plan')

    // TODO: Integrate with your email service (e.g., Mailchimp, ConvertKit, Supabase)
    console.log('Email submitted:', email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Check Your Email!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your free 7-day Mediterranean meal plan is on its way to <strong>{email}</strong>
          </p>
          <p className="text-gray-600 mb-8">
            Don't see it? Check your spam folder or promotions tab.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🧠</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Mindful Meal Plan</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Preview Image Placeholder */}
            <div className="mb-8 bg-white rounded-2xl shadow-xl p-8 border-2 border-emerald-200">
              <div className="aspect-video bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">📅</p>
                  <p className="text-gray-600 font-semibold">7-Day Calendar Preview</p>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your FREE 7-Day Mediterranean
              <br />
              <span className="text-emerald-600">Meal Plan + Shopping List</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Restaurant-quality recipes, complete shopping list, and meal prep guide - absolutely free.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Enter Your Email:
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-4"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition shadow-md hover:shadow-lg"
                >
                  Send Me The Free Plan →
                </button>
                <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Here's What's Inside Your Free Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              '7 Days of Mediterranean Meals (Breakfast, Lunch, Dinner)',
              'Complete Shopping List (Organized by Store Section)',
              'Meal Prep Guide (Save Hours This Week!)',
              'Nutrition Information for Every Recipe',
              'Printable Calendar',
              'BONUS: 5 Quick Snack Ideas'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-emerald-50 rounded-lg p-4">
                <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-6">
            Join 5,000+ people transforming their wellness
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-700">"This changed my life!"</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-700">"So easy to follow!"</span>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Preview Your Monday
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                meal: 'Breakfast',
                name: 'Greek Yogurt Bowl',
                description: 'with Berries'
              },
              {
                meal: 'Lunch',
                name: 'Mediterranean Quinoa Salad',
                description: 'with Feta & Olives'
              },
              {
                meal: 'Dinner',
                name: 'Grilled Salmon',
                description: 'with Roasted Veggies'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="w-full aspect-square bg-white rounded-lg mb-4 flex items-center justify-center text-4xl">
                  {idx === 0 ? '🥣' : idx === 1 ? '🥗' : '🐟'}
                </div>
                <p className="text-sm text-gray-500 mb-1">{item.meal}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-600 to-blue-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Week?</h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg mb-4 text-gray-900"
              />
              <button
                type="submit"
                className="w-full bg-white text-emerald-600 py-3 px-6 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition shadow-md"
              >
                Get My Free Plan Now →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">&copy; 2025 Mocha's MindLab Inc.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition">Privacy Policy</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900 transition">Already a member? Login</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
