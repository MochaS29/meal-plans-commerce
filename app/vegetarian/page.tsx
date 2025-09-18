'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Leaf, Apple, Flower2, Heart, Sprout, Sun, Carrot } from 'lucide-react'

export default function VegetarianPage() {
  const vegetarianFeatures = [
    { icon: Leaf, title: "Plant-Powered", description: "Nutrient-rich vegetables" },
    { icon: Apple, title: "Fresh Produce", description: "Seasonal fruits & veggies" },
    { icon: Sprout, title: "Protein-Rich", description: "Legumes, nuts & dairy" },
    { icon: Heart, title: "Heart-Healthy", description: "Lower cholesterol naturally" }
  ]

  const sampleMeals = [
    { meal: "Breakfast", name: "Garden Scramble & Toast", calories: "380", protein: "18g" },
    { meal: "Lunch", name: "Buddha Bowl Delight", calories: "420", protein: "22g" },
    { meal: "Dinner", name: "Mushroom Stroganoff", calories: "460", protein: "16g" },
    { meal: "Snack", name: "Hummus & Veggie Sticks", calories: "150", protein: "6g" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🥬</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Vegetarian Cuisine</span>
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
              Vibrant
              <span className="text-green-600"> Vegetarian</span> Living
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the colorful world of plant-based nutrition. Fresh, flavorful,
              and full of life-giving nutrients.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {vegetarianFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <feature.icon className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Why Go Vegetarian?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">Health Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Sun className="w-5 h-5 text-lime-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Increased energy levels</span>
                  </li>
                  <li className="flex items-start">
                    <Sun className="w-5 h-5 text-lime-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Better digestion & gut health</span>
                  </li>
                  <li className="flex items-start">
                    <Sun className="w-5 h-5 text-lime-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Lower risk of chronic diseases</span>
                  </li>
                  <li className="flex items-start">
                    <Sun className="w-5 h-5 text-lime-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Healthy weight management</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-lime-600 mb-4">Environmental Impact</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Flower2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Reduced carbon footprint</span>
                  </li>
                  <li className="flex items-start">
                    <Flower2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Conservation of water resources</span>
                  </li>
                  <li className="flex items-start">
                    <Flower2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Sustainable food system</span>
                  </li>
                  <li className="flex items-start">
                    <Flower2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Animal welfare</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sample Meals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sample Vegetarian Meals</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleMeals.map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-green-100 to-lime-100 rounded-xl p-6"
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
            className="text-center bg-gradient-to-r from-green-500 to-lime-600 rounded-2xl p-12 text-white"
          >
            <Carrot className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Embrace Plant-Based Living
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nourish your body with nature's bounty
            </p>
            <Link
              href="/#plans"
              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition inline-block"
            >
              Start Vegetarian Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}