'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Fish, Heart, Leaf, Clock, Check } from 'lucide-react'

export default function MediterraneanDietPage() {
  const benefits = [
    "Reduces risk of heart disease by 30%",
    "Improves brain function and memory",
    "Supports healthy weight management",
    "Reduces inflammation naturally",
    "Increases longevity and vitality"
  ]

  const sampleMeals = [
    {
      meal: "Breakfast",
      name: "Greek Yogurt Parfait",
      description: "Creamy yogurt with honey, walnuts, and fresh berries"
    },
    {
      meal: "Lunch",
      name: "Mediterranean Quinoa Bowl",
      description: "Quinoa with roasted vegetables, feta, and lemon-herb dressing"
    },
    {
      meal: "Dinner",
      name: "Herb-Crusted Salmon",
      description: "Wild salmon with olive tapenade and roasted asparagus"
    }
  ]

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/diets/mediterranean.png")',
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Fish className="w-4 h-4" />
              MEDITERRANEAN DIET
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Mediterranean Way of Life
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Experience the world's most researched and celebrated diet, rich in fresh vegetables,
              olive oil, whole grains, and lean proteins from the sun-soaked Mediterranean coast.
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
              <Heart className="w-6 h-6 text-red-500" />
              Science-Backed Benefits
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

          {/* What You'll Eat */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50/40 to-teal-50/40 backdrop-blur-sm rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's On Your Plate</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Enjoy Daily</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Fresh vegetables and fruits</li>
                  <li>• Whole grains and legumes</li>
                  <li>• Extra virgin olive oil</li>
                  <li>• Nuts and seeds</li>
                  <li>• Herbs and spices</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Enjoy Weekly</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Fish and seafood (2-3x)</li>
                  <li>• Poultry and eggs</li>
                  <li>• Greek yogurt and cheese</li>
                  <li>• Red wine (optional, in moderation)</li>
                  <li>• Lean red meat (limited)</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Sample Day */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">A Day on the Mediterranean Diet</h2>
            <div className="space-y-4">
              {sampleMeals.map((item, idx) => (
                <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm font-semibold text-blue-600">{item.meal}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    </div>
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Mediterranean Journey
            </h2>
            <p className="text-gray-700 mb-6">
              Get a complete 30-day Mediterranean meal plan with recipes, shopping lists, and prep guides
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plans/wellness-transformation"
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Get Mediterranean Plan - $79
              </Link>
              <Link
                href="/recipes"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
              >
                Try Free Recipes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}