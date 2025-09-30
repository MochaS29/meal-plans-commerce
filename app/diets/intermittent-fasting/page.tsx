'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Zap, Brain, TrendingDown, Check, ShoppingCart } from 'lucide-react'
import CheckoutButton from '@/components/CheckoutButton'

export default function IntermittentFastingPage() {
  const benefits = [
    "Accelerates fat burning and weight loss",
    "Improves insulin sensitivity",
    "Enhances mental clarity and focus",
    "Promotes cellular repair and autophagy",
    "Increases growth hormone production"
  ]

  const methods = [
    {
      name: "16:8 Method",
      description: "Fast for 16 hours, eat within 8 hours",
      best_for: "Beginners and daily routine"
    },
    {
      name: "5:2 Diet",
      description: "Eat normally 5 days, restrict calories 2 days",
      best_for: "Flexible schedules"
    },
    {
      name: "Eat-Stop-Eat",
      description: "24-hour fasts once or twice per week",
      best_for: "Experienced fasters"
    }
  ]

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/diets/intermittent-fasting.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* White overlay for text readability */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]"></div>
        {/* Gradient overlay for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/30 to-white"></div>
      </div>

      {/* Sticky Buy Now Bar */}
      <div className="relative z-20 sticky top-0 bg-white/95 backdrop-blur-md shadow-md py-3 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <span className="font-semibold text-gray-900">Intermittent Fasting Plan</span>
          </div>
          <div className="flex gap-3">
            <CheckoutButton
              productId="wellness-transformation"
              className="text-sm py-2 px-6"
              variant="secondary"
            >
              <ShoppingCart className="w-4 h-4" />
              One-Time $79
            </CheckoutButton>
            <CheckoutButton
              productId="monthly-calendar"
              className="text-sm py-2 px-6"
            >
              <ShoppingCart className="w-4 h-4" />
              Monthly $29
            </CheckoutButton>
          </div>
        </div>
      </div>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
              <Clock className="w-4 h-4" />
              INTERMITTENT FASTING
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Time-Restricted Eating for Optimal Health
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Harness the power of strategic fasting to boost metabolism, enhance mental clarity,
              and achieve sustainable weight management.
            </p>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Transformative Benefits
            </h2>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fasting Methods */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Fasting Methods</h2>
            <div className="space-y-4">
              {methods.map((method, idx) => (
                <div key={idx} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.name}</h3>
                  <p className="text-gray-700 mb-2">{method.description}</p>
                  <p className="text-sm text-amber-700">
                    <strong>Best for:</strong> {method.best_for}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What to Eat */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">During Your Eating Window</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Focus On
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lean proteins (chicken, fish, tofu)</li>
                  <li>• Healthy fats (avocado, nuts, olive oil)</li>
                  <li>• Complex carbohydrates</li>
                  <li>• Fiber-rich vegetables</li>
                  <li>• Plenty of water</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  Minimize
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Processed foods</li>
                  <li>• Sugary drinks and snacks</li>
                  <li>• Refined carbohydrates</li>
                  <li>• Excessive caffeine</li>
                  <li>• Alcohol</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center bg-gradient-to-br from-amber-50/40 to-orange-50/40 backdrop-blur-sm rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Fasting Journey
            </h2>
            <p className="text-gray-700 mb-6">
              Get a complete intermittent fasting meal plan with timing guides and nutrient-optimized recipes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plans/wellness-transformation"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Get IF Meal Plan - $79
              </Link>
              <Link
                href="/calendar"
                className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition"
              >
                View Sample Schedule
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}