'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ChefHat, ShoppingCart, Download, Printer, Heart, Sparkles, Star, Coffee, Sun, Moon, Apple } from 'lucide-react'
import Link from 'next/link'
import CheckoutButton from '@/components/CheckoutButton'

interface Meal {
  type: 'breakfast' | 'snack1' | 'lunch' | 'snack2' | 'dinner'
  label: string
  name: string
  calories?: number
}

interface DayMeals {
  day: number
  meals: Meal[]
  isWeekend?: boolean
}

const monthData: DayMeals[] = [
  {
    day: 1,
    isWeekend: true,
    meals: [
      { type: 'breakfast', label: '🥣 B:', name: 'Greek Yogurt with Thyme Honey', calories: 280 },
      { type: 'snack1', label: '🫒 S1:', name: 'Kalamata Olives & Almonds', calories: 150 },
      { type: 'lunch', label: '🥗 L:', name: 'Horiatiki (Greek Village Salad)', calories: 420 },
      { type: 'snack2', label: '🧀 S2:', name: 'Feta with Drizzled Olive Oil', calories: 120 },
      { type: 'dinner', label: '🍽️ D:', name: 'Kotopoulo me Rigani (Greek Herb Chicken)', calories: 480 }
    ]
  },
  {
    day: 2,
    meals: [
      { type: 'breakfast', label: '🍳 B:', name: 'Strapatsada (Greek Scrambled Eggs)', calories: 320 },
      { type: 'snack1', label: '🥚 S1:', name: 'Hard-Boiled Egg with Za\'atar', calories: 90 },
      { type: 'lunch', label: '🐟 L:', name: 'Psito Psari (Grilled Fish) Salad', calories: 450 },
      { type: 'snack2', label: '🫒 S2:', name: 'Hummus with Crudités', calories: 140 },
      { type: 'dinner', label: '🍲 D:', name: 'Kokoras Krasatos (Chicken in Wine)', calories: 460 }
    ]
  },
  {
    day: 3,
    meals: [
      { type: 'breakfast', label: '🥞 B:', name: 'Ricotta Pancakes Sicilian Style', calories: 290 },
      { type: 'snack1', label: '🧀 S1:', name: 'Fresh Mozzarella & Basil', calories: 130 },
      { type: 'lunch', label: '🐟 L:', name: 'Salmone e Fagioli (Salmon & Beans)', calories: 480 },
      { type: 'snack2', label: '🥜 S2:', name: 'Mixed Mediterranean Nuts', calories: 160 },
      { type: 'dinner', label: '🥩 D:', name: 'Keftedes (Mediterranean Meatballs)', calories: 440 }
    ]
  },
  {
    day: 4,
    meals: [
      { type: 'breakfast', label: '🍞 B:', name: 'Pan con Tomate (Spanish Tomato Bread)', calories: 260 },
      { type: 'snack1', label: '🥚 S1:', name: 'Greek Yogurt with Honey', calories: 110 },
      { type: 'lunch', label: '🍲 L:', name: 'Fakes (Greek Lentil Soup)', calories: 380 },
      { type: 'snack2', label: '🫒 S2:', name: 'Muhammara (Red Pepper Dip)', calories: 120 },
      { type: 'dinner', label: '🥩 D:', name: 'Souvlaki with Grilled Vegetables', calories: 520 }
    ]
  },
  {
    day: 5,
    meals: [
      { type: 'breakfast', label: '🥤 B:', name: 'Frappé with Mediterranean Yogurt', calories: 240 },
      { type: 'snack1', label: '🥜 S1:', name: 'Pistachios & Dried Figs', calories: 170 },
      { type: 'lunch', label: '🥗 L:', name: 'Quinoa Tabbouleh', calories: 400 },
      { type: 'snack2', label: '🧀 S2:', name: 'Kasseri Cheese & Tomatoes', calories: 100 },
      { type: 'dinner', label: '🐔 D:', name: 'Pollo alla Griglia (Italian Grilled Chicken)', calories: 490 }
    ]
  },
  {
    day: 6,
    meals: [
      { type: 'breakfast', label: '🍳 B:', name: 'Shakshuka (North African Eggs)', calories: 310 },
      { type: 'snack1', label: '🥚 S1:', name: 'Avgolemon Soup (small portion)', calories: 80 },
      { type: 'lunch', label: '🌯 L:', name: 'Lavash with Mediterranean Fillings', calories: 360 },
      { type: 'snack2', label: '🫒 S2:', name: 'Dolmades (Stuffed Grape Leaves)', calories: 140 },
      { type: 'dinner', label: '🥩 D:', name: 'Lonza di Maiale (Italian Pork Loin)', calories: 510 }
    ]
  },
  {
    day: 7,
    isWeekend: true,
    meals: [
      { type: 'breakfast', label: '🥣 B:', name: 'Overnight Oats with Greek Honey', calories: 300 },
      { type: 'snack1', label: '🧀 S1:', name: 'Manouri Cheese with Nuts', calories: 150 },
      { type: 'lunch', label: '🥗 L:', name: 'Panzanella (Tuscan Bread Salad)', calories: 390 },
      { type: 'snack2', label: '🥜 S2:', name: 'Spiced Mediterranean Nuts', calories: 140 },
      { type: 'dinner', label: '🍕 D:', name: 'Pizza Margherita with Arugula', calories: 470 }
    ]
  }
]

// Fill in the rest of the month with sample data
for (let i = 8; i <= 30; i++) {
  const isWeekend = i % 7 === 0 || i % 7 === 1
  monthData.push({
    day: i,
    isWeekend,
    meals: [
      { type: 'breakfast', label: '🥣 B:', name: 'Mediterranean Breakfast', calories: 280 },
      { type: 'snack1', label: '🥜 S1:', name: 'Morning Snack', calories: 150 },
      { type: 'lunch', label: '🥗 L:', name: 'Mediterranean Lunch', calories: 420 },
      { type: 'snack2', label: '🧀 S2:', name: 'Afternoon Snack', calories: 120 },
      { type: 'dinner', label: '🍽️ D:', name: 'Mediterranean Dinner', calories: 480 }
    ]
  })
}

const mealTypeStyles = {
  breakfast: 'bg-amber-100 text-amber-800',
  snack1: 'bg-green-50 text-green-700',
  lunch: 'bg-teal-100 text-teal-800',
  snack2: 'bg-amber-50 text-amber-700',
  dinner: 'bg-teal-200 text-teal-900'
}

const mealIcons = {
  breakfast: <Coffee className="w-4 h-4" />,
  snack1: <Apple className="w-4 h-4" />,
  lunch: <Sun className="w-4 h-4" />,
  snack2: <Apple className="w-4 h-4" />,
  dinner: <Moon className="w-4 h-4" />
}

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-700 to-teal-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 text-white/90 hover:text-white transition">
            <span className="text-lg">←</span>
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              September 2025 Meal Planning Calendar
            </h1>
            <p className="text-xl text-white/90">
              Your complete 30-day transformation journey with delicious, healthy meals
            </p>
          </motion.div>
        </div>
      </header>

      {/* Package Features */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-amber-50/50 to-teal-50/50 rounded-xl shadow-md p-8 mb-8 border border-gray-200"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-amber-800">
            📦 Complete Package Includes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Calendar className="w-8 h-8" />, title: "Printable Calendar", desc: "30 days of complete meal planning", color: "#4A9B9B" },
              { icon: <ChefHat className="w-8 h-8" />, title: "Recipe Collection", desc: "50+ authentic Mediterranean recipes", color: "#8B4513" },
              { icon: <ShoppingCart className="w-8 h-8" />, title: "Shopping Lists", desc: "Weekly organized by store section", color: "#7FB069" },
              { icon: <Clock className="w-8 h-8" />, title: "Meal Prep Guide", desc: "Sunday prep saves time all week", color: "#4A9B9B" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white shadow-md transform hover:scale-105 transition"
                  style={{ backgroundColor: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                // For demo, show message. In production, would generate PDF
                alert('PDF download will be available with your subscription. For now, you can use the browser\'s print function (Ctrl/Cmd + P) and save as PDF.');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-full font-medium hover:bg-amber-800 transition"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition"
            >
              <Printer className="w-5 h-5" />
              Print Calendar
            </button>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200"
        >
          {/* Month Header */}
          <div className="bg-gradient-to-r from-teal-600 to-amber-600 text-white p-6 text-center">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-yellow-300 animate-pulse" />
              September 2025
              <Star className="w-8 h-8 text-yellow-300 animate-pulse" />
            </h2>
            <p className="mt-2 text-white/90">Your Wellness Transformation Begins</p>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 bg-gray-50">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <div key={day} className="text-center py-3 font-bold text-gray-700 border-b-2 border-gray-200">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-px bg-gray-100">
            {monthData.map((dayData) => (
              <motion.div
                key={dayData.day}
                whileHover={{ scale: 1.02 }}
                className={`
                  ${dayData.isWeekend ? 'bg-amber-50/50' : 'bg-white'}
                  p-3 min-h-[180px] hover:shadow-md transition-all duration-300 border border-gray-100
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xl font-bold ${dayData.isWeekend ? 'text-amber-700' : 'text-gray-700'}`}>
                    {dayData.day}
                  </span>
                  {dayData.day === 1 && <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">START!</span>}
                  {dayData.day === 30 && <span className="text-xs bg-teal-600 text-white px-2 py-1 rounded-full">COMPLETE! 🎉</span>}
                </div>

                <div className="space-y-1">
                  {dayData.meals.slice(0, 3).map((meal, idx) => (
                    <div key={idx} className="text-xs flex items-center gap-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        meal.type === 'breakfast' ? 'bg-amber-600' :
                        meal.type === 'lunch' ? 'bg-teal-600' :
                        'bg-green-600'
                      }`}></span>
                      <span className="truncate text-gray-600">{meal.name.split('(')[0]}</span>
                    </div>
                  ))}
                  {dayData.meals.length > 3 && (
                    <div className="text-xs text-teal-600 font-semibold">+2 more...</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Nutrition Targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-gray-200"
        >
          <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
            🎯 Mediterranean Weight Loss Targets
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-teal-50 to-gray-50 rounded-xl p-6 text-center">
              <Heart className="w-12 h-12 mx-auto mb-3 text-teal-600" />
              <h4 className="font-bold text-lg mb-2">Daily Nutrition</h4>
              <p className="text-sm text-gray-700">1,400-1,600 calories</p>
              <p className="text-sm text-gray-700">35-40% healthy fats</p>
              <p className="text-sm text-gray-700">20-25% protein</p>
            </div>

            <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl p-6 text-center">
              <ChefHat className="w-12 h-12 mx-auto mb-3 text-teal-500" />
              <h4 className="font-bold text-lg mb-2">Key Ingredients</h4>
              <p className="text-sm text-gray-700">Olive Oil: 2-3 tbsp daily</p>
              <p className="text-sm text-gray-700">Fish: 3-4 times/week</p>
              <p className="text-sm text-gray-700">Legumes: 3+ times/week</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center">
              <Star className="w-12 h-12 mx-auto mb-3 text-orange-500" />
              <h4 className="font-bold text-lg mb-2">Your Goals</h4>
              <p className="text-sm text-gray-700">Weight Loss: 1-2 lbs/week</p>
              <p className="text-sm text-gray-700">Mediterranean portions</p>
              <p className="text-sm text-gray-700">Daily walks + activity</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <CheckoutButton productId="wellness-transformation">
            Get Your Complete Calendar Package - $59
          </CheckoutButton>

          <p className="mt-4 text-gray-600">
            Includes PDF download, all recipes, shopping lists, and meal prep guides
          </p>
        </motion.div>
      </section>
    </div>
  )
}