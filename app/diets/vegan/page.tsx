'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Heart, Globe, Sprout, Check, ShoppingCart } from 'lucide-react'
import CheckoutButton from '@/components/CheckoutButton'

export default function VeganDietPage() {
  const benefits = [
    "Lowest environmental impact",
    "Reduced risk of chronic diseases",
    "Higher fiber and antioxidants",
    "Ethical and compassionate living",
    "Lower carbon footprint"
  ]

  const proteinSources = [
    "Legumes (beans, lentils, chickpeas)",
    "Nuts and seeds",
    "Whole grains and quinoa",
    "Tofu, tempeh, and seitan",
    "Plant-based protein powders"
  ]

  const essentials = [
    "Vitamin B12 supplement",
    "Iron-rich foods with vitamin C",
    "Omega-3 from flax and chia",
    "Calcium from fortified foods",
    "Vitamin D from sunshine or supplements"
  ]

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/diets/vegan.png")',
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

      {/* Sticky Buy Now Bar */}
      <div className="relative z-20 sticky top-0 bg-white/95 backdrop-blur-md shadow-md py-3 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-900">Vegan Diet Plan</span>
          </div>
          <div className="flex gap-3">
            <CheckoutButton
              productId="wellness-transformation"
              className="text-sm py-2 px-6"
              variant="secondary"
            >
              <ShoppingCart className="w-4 h-4" />
              One-Time $59
            </CheckoutButton>
            <CheckoutButton
              productId="monthly-calendar"
              className="text-sm py-2 px-6"
            >
              <ShoppingCart className="w-4 h-4" />
              Monthly $29
            </CheckoutButton>
          </div>
        </div>
      </div>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              <Leaf className="w-4 h-4" />
              VEGAN
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              100% Plant-Based Living
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Thrive on plants alone - discover the power of compassionate eating
              for your health, the animals, and our planet.
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
              <Sprout className="w-6 h-6 text-green-500" />
              Why Choose Vegan
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

          {/* Protein & Nutrition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            <div className="bg-emerald-50/40 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💪 Plant Proteins</h3>
              <ul className="space-y-2">
                {proteinSources.map((source, idx) => (
                  <li key={idx} className="text-gray-700">• {source}</li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50/40 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">⚡ Key Nutrients</h3>
              <ul className="space-y-2">
                {essentials.map((item, idx) => (
                  <li key={idx} className="text-gray-700">• {item}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-emerald-50/40 to-green-50/40 backdrop-blur-sm rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              Your Positive Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-600">1,100</div>
                <div className="text-gray-700">Gallons of water saved daily</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">45</div>
                <div className="text-gray-700">Pounds of grain saved daily</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">30</div>
                <div className="text-gray-700">Square feet of forest saved daily</div>
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
              Go Vegan with Confidence
            </h2>
            <p className="text-gray-700 mb-6">
              Get nutritionally complete vegan meal plans with B12 tracking and protein optimization
            </p>
            <div className="flex justify-center">
              <Link
                href="/plans/customize?diet=vegan"
                className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}