'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Clock, DollarSign, Apple, Heart, Sparkles, ChefHat } from 'lucide-react'

export default function FamilyFocusedPage() {
  const familyFeatures = [
    { icon: Users, title: "Kid-Approved", description: "Meals the whole family will love" },
    { icon: Clock, title: "Quick & Easy", description: "30-minute weeknight dinners" },
    { icon: DollarSign, title: "Budget-Friendly", description: "Smart shopping for families" },
    { icon: Apple, title: "Hidden Nutrition", description: "Vegetables kids won't notice" }
  ]

  const sampleMeals = [
    { meal: "Breakfast", name: "Pancake Bar Sunday", time: "20 min", servings: "Serves 4-6" },
    { meal: "Lunch", name: "DIY Pizza Pockets", time: "25 min", servings: "Serves 4" },
    { meal: "Dinner", name: "Taco Tuesday Fiesta", time: "30 min", servings: "Serves 6" },
    { meal: "Snack", name: "Fruit & Yogurt Parfaits", time: "10 min", servings: "Serves 4" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👨‍👩‍👧‍👦</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Family Focused Meals</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition">
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
              Family Focused
              <span className="text-orange-500"> Meal Planning</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delicious, nutritious meals that bring families together. Kid-approved recipes
              that parents can feel good about serving.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {familyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <feature.icon className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Why Choose Family Focused?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-orange-600 mb-4">For Parents</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-orange-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Balanced nutrition for growing bodies</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-orange-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Batch cooking and meal prep strategies</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-orange-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Budget-conscious shopping lists</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-600 mb-4">For Kids</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Sparkles className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Fun, interactive meal experiences</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Familiar flavors with healthy twists</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Kid-friendly portion sizes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sample Meals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sample Family Meals</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleMeals.map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-6"
                >
                  <div className="text-sm font-medium text-orange-600 mb-2">{meal.meal}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{meal.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{meal.time}</span>
                    <span>{meal.servings}</span>
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
            className="text-center bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl p-12 text-white"
          >
            <ChefHat className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Bring Your Family Together
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start creating memorable meals that everyone will love
            </p>
            <Link
              href="/#plans"
              className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition inline-block"
            >
              View Family Plans
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}