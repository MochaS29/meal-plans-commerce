'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Heart, Clock, Utensils, Check, ShoppingCart } from 'lucide-react'
import CheckoutButton from '@/components/CheckoutButton'

export default function FamilyFocusedPage() {
  const benefits = [
    "Meals everyone will actually eat",
    "Hidden vegetables for picky eaters",
    "Quick 30-minute weeknight dinners",
    "Batch cooking for busy schedules",
    "Budget-friendly shopping lists"
  ]

  const features = [
    {
      title: "Kid-Approved",
      description: "Healthy versions of family favorites that kids love",
      icon: "🧒"
    },
    {
      title: "Flexible Options",
      description: "Easy swaps for dietary restrictions and preferences",
      icon: "🔄"
    },
    {
      title: "One-Pot Meals",
      description: "Minimal cleanup for busy weeknights",
      icon: "🍲"
    },
    {
      title: "Prep Ahead",
      description: "Sunday prep guides for the whole week",
      icon: "📅"
    }
  ]

  const sampleMeals = [
    {
      meal: "Monday",
      name: "Hidden Veggie Spaghetti",
      time: "25 min"
    },
    {
      meal: "Tuesday",
      name: "Build-Your-Own Taco Tuesday",
      time: "20 min"
    },
    {
      meal: "Wednesday",
      name: "Crispy Baked Chicken Tenders",
      time: "30 min"
    }
  ]

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/diets/family-focused.png")',
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
            <Users className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900">Family-Focused Meal Plan</span>
          </div>
          <div className="flex gap-3">
            <CheckoutButton
              productId="wellness-transformation"
              className="text-sm py-2 px-6"
              variant="secondary"
            >
              <ShoppingCart className="w-4 h-4" />
              One-Time $79
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              FAMILY FOCUSED
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Healthy Meals the Whole Family Will Love
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Real food for real families - nutritious meals that are kid-approved,
              parent-friendly, and designed for busy weeknights.
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
              Why Families Choose Our Plans
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

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {features.map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pink-50/40 to-purple-50/40 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Sample Week */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample Weeknight Dinners</h2>
            <div className="space-y-4">
              {sampleMeals.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-pink-50/40 backdrop-blur-sm rounded-lg">
                  <div>
                    <span className="text-sm font-semibold text-pink-600">{item.meal}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-purple-50/40 to-pink-50/40 backdrop-blur-sm rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Family Meal Success Tips</h2>
            <div className="space-y-3 text-gray-700">
              <p>🎯 <strong>Get kids involved:</strong> Let them choose one meal per week</p>
              <p>🥕 <strong>Sneak in veggies:</strong> Blend them into sauces and smoothies</p>
              <p>🍱 <strong>Prep together:</strong> Make Sunday meal prep a family activity</p>
              <p>🎨 <strong>Make it fun:</strong> Use colorful ingredients and fun presentations</p>
              <p>📦 <strong>Keep it simple:</strong> Stock pantry with versatile basics</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Family Meal Plan Today
            </h2>
            <p className="text-gray-700 mb-6">
              Get 30 days of family-friendly meals with shopping lists and prep guides
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plans/custom-family"
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Get Family Plan - $149
              </Link>
              <Link
                href="/recipes"
                className="border-2 border-pink-600 text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition"
              >
                Try Family Recipes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}