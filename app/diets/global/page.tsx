'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, MapPin, Utensils, Sparkles, Check } from 'lucide-react'

export default function GlobalCuisinePage() {
  const cuisines = [
    {
      region: "Mediterranean",
      countries: "Italy, Greece, Spain",
      highlight: "Olive oil, fresh herbs, seafood"
    },
    {
      region: "Asian Fusion",
      countries: "Japan, Thailand, Vietnam",
      highlight: "Rice, ginger, soy, fresh vegetables"
    },
    {
      region: "Latin American",
      countries: "Mexico, Peru, Brazil",
      highlight: "Beans, corn, chilies, cilantro"
    },
    {
      region: "Middle Eastern",
      countries: "Lebanon, Morocco, Turkey",
      highlight: "Spices, tahini, chickpeas, yogurt"
    },
    {
      region: "Indian Subcontinent",
      countries: "India, Pakistan, Sri Lanka",
      highlight: "Curry, lentils, rice, aromatic spices"
    }
  ]

  const benefits = [
    "Expand your culinary horizons",
    "Natural variety of nutrients",
    "Never get bored with meals",
    "Learn authentic cooking techniques",
    "Family-friendly adventure meals"
  ]

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/diets/global-cuisine.png")',
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
              <Globe className="w-4 h-4" />
              GLOBAL CUISINE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              A World of Flavors on Your Plate
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Travel the globe through your kitchen - authentic recipes from
              every corner of the world, adapted for healthy home cooking.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Why Go Global
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

          {/* Cuisine Regions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Culinary Journey Map</h2>
            <div className="space-y-4">
              {cuisines.map((cuisine, idx) => (
                <div key={idx} className="bg-gradient-to-r from-indigo-50/40 to-purple-50/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{cuisine.region}</h3>
                      <p className="text-indigo-600 text-sm mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {cuisine.countries}
                      </p>
                      <p className="text-gray-700">{cuisine.highlight}</p>
                    </div>
                    <Utensils className="w-5 h-5 text-indigo-500" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Theme Example */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-50/40 to-indigo-50/40 backdrop-blur-sm rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample Weekly Adventure</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <span className="text-sm font-semibold text-purple-600">Monday</span>
                <p className="text-gray-800">Italian: Tuscan White Bean Soup</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <span className="text-sm font-semibold text-purple-600">Tuesday</span>
                <p className="text-gray-800">Thai: Pad Thai with Tofu</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <span className="text-sm font-semibold text-purple-600">Wednesday</span>
                <p className="text-gray-800">Mexican: Fish Tacos with Mango Salsa</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <span className="text-sm font-semibold text-purple-600">Thursday</span>
                <p className="text-gray-800">Indian: Chickpea Tikka Masala</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <span className="text-sm font-semibold text-purple-600">Friday</span>
                <p className="text-gray-800">Greek: Moussaka with Salad</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <span className="text-sm font-semibold text-purple-600">Weekend</span>
                <p className="text-gray-800">Japanese: Homemade Sushi Night</p>
              </div>
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
              Start Your Global Food Adventure
            </h2>
            <p className="text-gray-700 mb-6">
              Get 30 days of international recipes with authentic ingredients and cooking guides
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plans/wellness-transformation"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Get Global Plan - $79
              </Link>
              <Link
                href="/recipes"
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition"
              >
                Explore World Recipes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}