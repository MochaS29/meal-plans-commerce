'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Leaf, Flower, Heart, Globe, Sprout, Star, TreePine } from 'lucide-react'

export default function VeganPage() {
  const veganFeatures = [
    { icon: Leaf, title: "100% Plant-Based", description: "No animal products" },
    { icon: Globe, title: "Eco-Friendly", description: "Minimal environmental impact" },
    { icon: Heart, title: "Compassionate", description: "Cruelty-free lifestyle" },
    { icon: Star, title: "Nutrient-Dense", description: "Complete nutrition" }
  ]

  const sampleMeals = [
    { meal: "Breakfast", name: "Overnight Oats & Berries", calories: "340", protein: "12g" },
    { meal: "Lunch", name: "Rainbow Power Bowl", calories: "450", protein: "18g" },
    { meal: "Dinner", name: "Thai Coconut Curry", calories: "480", protein: "15g" },
    { meal: "Snack", name: "Energy Date Balls", calories: "160", protein: "5g" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🌱</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Vegan Lifestyle</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition">
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
              Pure Plant
              <span className="text-emerald-600"> Power</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the transformative power of a whole-food, plant-based lifestyle.
              Compassionate choices for your health and our planet.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {veganFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <feature.icon className="w-12 h-12 text-emerald-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Vegan Philosophy */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              The Vegan Advantage
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" /> Health
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lower cholesterol</li>
                  <li>• Reduced inflammation</li>
                  <li>• Higher fiber intake</li>
                  <li>• Antioxidant rich</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" /> Planet
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 50% less CO2</li>
                  <li>• 95% less water use</li>
                  <li>• Protects forests</li>
                  <li>• Preserves oceans</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-600 mb-4 flex items-center">
                  <Flower className="w-5 h-5 mr-2" /> Ethics
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Animal welfare</li>
                  <li>• Sustainable future</li>
                  <li>• Food justice</li>
                  <li>• Compassionate living</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nutrition Focus */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Nutrients</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Protein</span>
                  <span className="text-sm text-gray-600">Legumes, nuts, seeds</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">B12</span>
                  <span className="text-sm text-gray-600">Fortified foods, supplements</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Iron</span>
                  <span className="text-sm text-gray-600">Leafy greens, beans</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Omega-3</span>
                  <span className="text-sm text-gray-600">Flax, chia, walnuts</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Meal Planning Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Sprout className="w-4 h-4 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Eat the rainbow daily</span>
                </li>
                <li className="flex items-start">
                  <Sprout className="w-4 h-4 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Combine grains & legumes</span>
                </li>
                <li className="flex items-start">
                  <Sprout className="w-4 h-4 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Include fermented foods</span>
                </li>
                <li className="flex items-start">
                  <Sprout className="w-4 h-4 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Don't forget healthy fats</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sample Meals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sample Vegan Meals</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleMeals.map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-6"
                >
                  <div className="text-sm font-medium text-emerald-600 mb-2">{meal.meal}</div>
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
            className="text-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-12 text-white"
          >
            <TreePine className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Join the Plant Revolution
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Transform your health while protecting our planet
            </p>
            <Link
              href="/#plans"
              className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition inline-block"
            >
              Explore Vegan Plans
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}