'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Beef, Fish, Egg, Leaf, Zap, Shield, Mountain } from 'lucide-react'

export default function PaleoPage() {
  const paleoFeatures = [
    { icon: Beef, title: "Grass-Fed Meats", description: "Premium protein sources" },
    { icon: Fish, title: "Wild-Caught Fish", description: "Omega-3 rich seafood" },
    { icon: Leaf, title: "Organic Vegetables", description: "Nutrient-dense produce" },
    { icon: Shield, title: "No Processed Foods", description: "Clean, whole ingredients" }
  ]

  const sampleMeals = [
    { meal: "Breakfast", name: "Primal Power Bowl", calories: "420", protein: "35g" },
    { meal: "Lunch", name: "Hunter's Salad", calories: "380", protein: "28g" },
    { meal: "Dinner", name: "Caveman Steak & Veggies", calories: "520", protein: "42g" },
    { meal: "Snack", name: "Nut & Seed Mix", calories: "180", protein: "8g" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-stone-600 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🥩</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Paleo Diet</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Eat Like Your
              <span className="text-green-700"> Ancestors</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Return to your roots with the Paleo diet. Whole foods, lean proteins,
              and vegetables - the way nature intended.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {paleoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Core Principles */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Paleo Principles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">Eat This</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Grass-fed meats & wild game</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Fresh fruits & vegetables</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Nuts, seeds & healthy oils</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Eggs & seafood</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">Avoid That</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Mountain className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-700">Grains & legumes</span>
                  </li>
                  <li className="flex items-center">
                    <Mountain className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-700">Dairy products</span>
                  </li>
                  <li className="flex items-center">
                    <Mountain className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-700">Processed foods & sugars</span>
                  </li>
                  <li className="flex items-center">
                    <Mountain className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-700">Artificial additives</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sample Meals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sample Paleo Meals</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleMeals.map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-stone-100 to-green-100 rounded-xl p-6"
                >
                  <div className="text-sm font-medium text-green-600 mb-2">{meal.meal}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{meal.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{meal.calories}</span>
                    <span>{meal.protein}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-gradient-to-r from-stone-600 to-green-700 rounded-2xl p-12 text-white"
          >
            <Mountain className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Start Your Primal Journey
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Fuel your body the way evolution intended
            </p>
            <Link
              href="/#plans"
              className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition inline-block"
            >
              Get Paleo Plans
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}