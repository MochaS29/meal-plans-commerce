'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Globe2, Plane, MapPin, Utensils, Star, Coffee, ChefHat } from 'lucide-react'

export default function GlobalCuisinePage() {
  const cuisineRegions = [
    { icon: "🇮🇹", title: "Italian", description: "Pasta, risotto, fresh herbs" },
    { icon: "🇯🇵", title: "Japanese", description: "Sushi, ramen, seasonal ingredients" },
    { icon: "🇲🇽", title: "Mexican", description: "Tacos, mole, vibrant spices" },
    { icon: "🇮🇳", title: "Indian", description: "Curries, dal, aromatic spices" },
    { icon: "🇹🇭", title: "Thai", description: "Balance of sweet, sour, spicy" },
    { icon: "🇫🇷", title: "French", description: "Classic techniques, rich sauces" },
    { icon: "🇬🇷", title: "Greek", description: "Fresh vegetables, olive oil, feta" },
    { icon: "🇲🇦", title: "Moroccan", description: "Tagines, couscous, exotic spices" }
  ]

  const weeklyThemes = [
    { week: "Week 1", theme: "Mediterranean Coast", description: "Greek, Italian, Spanish" },
    { week: "Week 2", theme: "Asian Adventure", description: "Japanese, Thai, Vietnamese" },
    { week: "Week 3", theme: "Latin Flavors", description: "Mexican, Brazilian, Peruvian" },
    { week: "Week 4", theme: "Middle Eastern", description: "Lebanese, Turkish, Moroccan" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🌍</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Global Cuisine</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition">
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
              A Culinary Journey
              <span className="text-purple-600"> Around the World</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore authentic flavors from every continent. Experience the world's
              most beloved cuisines from the comfort of your kitchen.
            </p>
          </motion.div>

          {/* Cuisine Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Cuisines</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cuisineRegions.map((cuisine, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{cuisine.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{cuisine.title}</h3>
                  <p className="text-gray-600 text-sm">{cuisine.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Monthly Rotation */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Monthly Global Menu
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {weeklyThemes.map((week, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-purple-600">{week.week}</span>
                    <Globe2 className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{week.theme}</h3>
                  <p className="text-sm text-gray-600">{week.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Plane className="w-12 h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Passport to Flavor</h3>
              <p className="text-gray-600">
                No plane ticket required. Travel through taste with authentic recipes
                from professional chefs worldwide.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <MapPin className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Authentic Ingredients</h3>
              <p className="text-gray-600">
                Detailed shopping guides help you find authentic ingredients,
                with substitutions for hard-to-find items.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <ChefHat className="w-12 h-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cultural Context</h3>
              <p className="text-gray-600">
                Learn the history and traditions behind each dish, making
                every meal a cultural experience.
              </p>
            </div>
          </div>

          {/* Sample Week */}
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sample Week: Asian Adventure</h3>
            <div className="grid md:grid-cols-7 gap-4">
              {['Japanese Bento', 'Thai Green Curry', 'Vietnamese Pho', 'Korean BBQ', 'Chinese Stir-Fry', 'Indian Tikka', 'Malaysian Laksa'].map((dish, index) => (
                <div key={index} className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs font-medium text-gray-500 mb-1">Day {index + 1}</div>
                  <div className="text-sm font-semibold text-gray-800">{dish}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-12 text-white"
          >
            <Globe2 className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Your Culinary Passport Awaits
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explore the world's flavors, one meal at a time
            </p>
            <Link
              href="/#plans"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition inline-block"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}