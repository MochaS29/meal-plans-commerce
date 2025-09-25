'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Beef, Apple, Fish, Egg, Check } from 'lucide-react'

export default function PaleoDietPage() {
  const benefits = [
    "Improved energy and mental clarity",
    "Reduced inflammation and pain",
    "Better digestion and gut health",
    "Stable blood sugar levels",
    "Natural weight management"
  ]

  const foods = {
    eat: [
      "Grass-fed meats and wild game",
      "Wild-caught fish and seafood",
      "Fresh vegetables and fruits",
      "Nuts and seeds (except peanuts)",
      "Healthy fats (coconut, avocado, olive oil)"
    ],
    avoid: [
      "Grains and cereals",
      "Dairy products",
      "Legumes and beans",
      "Processed foods and sugar",
      "Refined vegetable oils"
    ]
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/diets/paleo.png")',
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
              <Beef className="w-4 h-4" />
              PALEO DIET
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Eat Like Your Ancestors
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Return to whole, unprocessed foods that fuel your body naturally -
              the way humans ate for thousands of years.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Apple className="w-6 h-6 text-red-500" />
              Paleo Benefits
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
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            <div className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">✅ Paleo-Approved</h3>
              <ul className="space-y-2">
                {foods.eat.map((food, idx) => (
                  <li key={idx} className="text-gray-700">• {food}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50/80 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">❌ Not Paleo</h3>
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
            transition={{ delay: 0.4 }}
            className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Go Paleo Today
            </h2>
            <p className="text-gray-700 mb-6">
              Get 30 days of delicious paleo meals with complete shopping lists
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plans/wellness-transformation"
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Get Paleo Plan - $79
              </Link>
              <Link
                href="/recipes"
                className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition"
              >
                Browse Paleo Recipes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}