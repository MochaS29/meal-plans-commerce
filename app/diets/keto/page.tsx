'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Brain, TrendingDown, Flame, Check } from 'lucide-react'

export default function KetoDietPage() {
  const benefits = [
    "Rapid weight loss and fat burning",
    "Stable energy levels throughout the day",
    "Reduced appetite and cravings",
    "Improved mental focus and clarity",
    "Better blood sugar control"
  ]

  const macros = {
    fat: "70-75%",
    protein: "20-25%",
    carbs: "5-10%"
  }

  const foods = {
    eat: [
      "Healthy fats (avocado, olive oil, nuts)",
      "Quality proteins (meat, fish, eggs)",
      "Low-carb vegetables (leafy greens, broccoli)",
      "Full-fat dairy (cheese, Greek yogurt)",
      "Berries in moderation"
    ],
    avoid: [
      "Grains and starches",
      "Sugar and sweeteners",
      "Most fruits",
      "Legumes and beans",
      "High-carb vegetables"
    ]
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/diets/keto.png")',
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

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              KETOGENIC DIET
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fuel Your Body with Fat
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Switch your metabolism to burn fat for fuel with the scientifically-proven ketogenic diet
              for weight loss and mental clarity.
            </p>
          </motion.div>

          {/* Macro Breakdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Keto Macro Breakdown</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{macros.fat}</div>
                <div className="text-gray-700 font-medium">Healthy Fats</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{macros.protein}</div>
                <div className="text-gray-700 font-medium">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">{macros.carbs}</div>
                <div className="text-gray-700 font-medium">Carbs</div>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              Ketosis Benefits
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

          {/* Foods Guide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            <div className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">✅ Keto-Friendly Foods</h3>
              <ul className="space-y-2">
                {foods.eat.map((food, idx) => (
                  <li key={idx} className="text-gray-700">• {food}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50/80 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">❌ Foods to Avoid</h3>
              <ul className="space-y-2">
                {foods.avoid.map((food, idx) => (
                  <li key={idx} className="text-gray-700">• {food}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Keto Transformation
            </h2>
            <p className="text-gray-700 mb-6">
              Get a complete 30-day keto meal plan with macro-calculated recipes and shopping lists
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plans/wellness-transformation"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Get Keto Plan - $79
              </Link>
              <Link
                href="/recipes"
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition"
              >
                Browse Keto Recipes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}