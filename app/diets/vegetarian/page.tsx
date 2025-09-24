'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Salad, Heart, Leaf, Globe, Check } from 'lucide-react'

export default function VegetarianDietPage() {
  const benefits = [
    "Lower risk of heart disease and diabetes",
    "Better weight management",
    "Improved digestion and gut health",
    "Environmental sustainability",
    "Lower grocery costs"
  ]

  const proteinSources = [
    "Eggs and dairy products",
    "Legumes and beans",
    "Nuts and seeds",
    "Whole grains like quinoa",
    "Tofu and tempeh"
  ]

  const sampleMeals = [
    {
      meal: "Breakfast",
      name: "Veggie Scramble with Toast",
      description: "Fluffy eggs with spinach, mushrooms, and whole grain bread"
    },
    {
      meal: "Lunch",
      name: "Buddha Bowl",
      description: "Quinoa, roasted vegetables, chickpeas, and tahini dressing"
    },
    {
      meal: "Dinner",
      name: "Eggplant Parmesan",
      description: "Crispy breaded eggplant with marinara and melted mozzarella"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/20 to-white">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Salad className="w-4 h-4" />
              VEGETARIAN
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Plant-Powered Living
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Enjoy vibrant, nutritious meals without meat - discover how delicious
              and satisfying vegetarian eating can be.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Why Go Vegetarian
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

          {/* Protein Sources */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Protein Sources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {proteinSources.map((source, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-4">
                  <Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800">{source}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sample Day */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">A Day of Vegetarian Meals</h2>
            <div className="space-y-4">
              {sampleMeals.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm font-semibold text-green-600">{item.meal}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    </div>
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
            className="text-center bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Vegetarian Journey
            </h2>
            <p className="text-gray-700 mb-6">
              Get 30 days of balanced vegetarian meals with complete nutrition
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plans/wellness-transformation"
                className="bg-gradient-to-r from-green-600 to-lime-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Get Vegetarian Plan - $79
              </Link>
              <Link
                href="/recipes"
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition"
              >
                Try Veggie Recipes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}