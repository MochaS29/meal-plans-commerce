'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Download, Calendar, ShoppingCart, Book,
  Printer, Copy, User, LogOut, Check,
  ChefHat, Clock, Heart, Sparkles, Home,
  CopyCheck
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface UserData {
  email: string
  customerId?: string
  purchases: {
    productId: string
    productName: string
    purchaseDate: string
    dietPlan?: string
  }[]
}

const dietPlans = [
  { id: 'mediterranean', name: 'Mediterranean', icon: '🌊', color: 'from-blue-500 to-cyan-500' },
  { id: 'keto', name: 'Keto', icon: '🥑', color: 'from-green-500 to-emerald-500' },
  { id: 'vegan', name: 'Vegan', icon: '🌱', color: 'from-green-600 to-lime-500' },
  { id: 'paleo', name: 'Paleo', icon: '🦴', color: 'from-amber-500 to-orange-500' },
  { id: 'vegetarian', name: 'Vegetarian', icon: '🥬', color: 'from-emerald-500 to-green-500' },
  { id: 'intermittent-fasting', name: 'Intermittent Fasting', icon: '⏰', color: 'from-purple-500 to-pink-500' },
  { id: 'family-focused', name: 'Family Focused', icon: '👨‍👩‍👧‍👦', color: 'from-amber-500 to-yellow-500' },
]

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDiet, setSelectedDiet] = useState('mediterranean')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [copiedList, setCopiedList] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        setUser(data)
      } else {
        // For demo, create a mock user
        setUser({
          email: 'demo@example.com',
          purchases: [{
            productId: 'wellness-transformation',
            productName: 'Wellness Transformation Bundle',
            purchaseDate: new Date().toISOString(),
            dietPlan: 'mediterranean'
          }]
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      // Demo user for testing
      setUser({
        email: 'demo@example.com',
        purchases: [{
          productId: 'wellness-transformation',
          productName: 'Wellness Transformation Bundle',
          purchaseDate: new Date().toISOString(),
          dietPlan: 'mediterranean'
        }]
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePrintCalendar = () => {
    window.print()
  }

  const handlePrintRecipe = (recipeId: string) => {
    const printWindow = window.open(`/print/recipe/${recipeId}`, '_blank')
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  }

  const handleCopyShoppingList = async () => {
    const shoppingList = `Shopping List - ${months[selectedMonth - 1]} ${selectedYear}

Weekly Shopping List:
• 2 lbs chicken breast
• 1 lb salmon fillet
• 3 avocados
• 2 bunches spinach
• 1 lb cherry tomatoes
• Greek yogurt (32 oz)
• Olive oil (extra virgin)
• 1 dozen eggs
• Mixed nuts (almonds, walnuts)
• Fresh herbs (basil, parsley, oregano)
• Lemons (6)
• Garlic (2 bulbs)
• Quinoa (1 lb)
• Brown rice (2 lbs)
• Whole grain bread
• Feta cheese (8 oz)
• Chickpeas (2 cans)
• Black olives
• Bell peppers (4)
• Cucumber (3)`

    try {
      await navigator.clipboard.writeText(shoppingList)
      setCopiedList(true)
      setTimeout(() => setCopiedList(false), 2000)
    } catch (err) {
      console.error('Failed to copy shopping list:', err)
    }
  }

  const handleDownloadPDF = async () => {
    const response = await fetch(
      `/api/download-pdf?menuType=${selectedDiet}&month=${selectedMonth}&year=${selectedYear}`
    )
    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${selectedDiet}-${selectedYear}-${selectedMonth}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="animate-pulse text-lg text-amber-700">Loading your wellness dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with gradient background */}
      <div className="relative">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '200px'
        }}>
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white"></div>
        </div>

        <div className="relative z-10">
          {/* Navigation */}
          <nav className="px-6 py-4 border-b bg-white/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-amber-700 flex items-center gap-2">
                <Home className="w-6 h-6" />
                Mocha's MindLab
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-sm text-teal-700 font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-amber-700 transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </nav>

          {/* Welcome Section */}
          <div className="px-6 py-12">
            <div className="max-w-7xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-amber-800 mb-4"
              >
                Your Wellness Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-teal-700"
              >
                Access your personalized meal plans, recipes, and shopping lists
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <button
            onClick={handlePrintCalendar}
            className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 hover:shadow-lg transition flex items-center gap-4 border border-amber-200"
          >
            <Printer className="w-8 h-8 text-amber-700" />
            <div className="text-left">
              <h3 className="font-semibold text-amber-900">Print Calendar</h3>
              <p className="text-sm text-amber-700">Monthly meal overview</p>
            </div>
          </button>

          <button
            onClick={handleCopyShoppingList}
            className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl p-6 hover:shadow-lg transition flex items-center gap-4 border border-teal-200"
          >
            {copiedList ? (
              <CopyCheck className="w-8 h-8 text-teal-700" />
            ) : (
              <Copy className="w-8 h-8 text-teal-700" />
            )}
            <div className="text-left">
              <h3 className="font-semibold text-teal-900">
                {copiedList ? 'Copied!' : 'Copy List'}
              </h3>
              <p className="text-sm text-teal-700">To shopping app</p>
            </div>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 hover:shadow-lg transition flex items-center gap-4 border border-green-200"
          >
            <Download className="w-8 h-8 text-green-700" />
            <div className="text-left">
              <h3 className="font-semibold text-green-900">Download PDF</h3>
              <p className="text-sm text-green-700">Complete meal plan</p>
            </div>
          </button>

          <Link
            href="/dashboard/recipes"
            className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 hover:shadow-lg transition flex items-center gap-4 border border-purple-200"
          >
            <Book className="w-8 h-8 text-purple-700" />
            <div className="text-left">
              <h3 className="font-semibold text-purple-900">Recipe Book</h3>
              <p className="text-sm text-purple-700">All your recipes</p>
            </div>
          </Link>
        </motion.div>

        {/* Diet Plan & Month Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Select Your Meal Plan
          </h2>

          <div className="space-y-6">
            {/* Diet Plan Selector */}
            <div>
              <label className="block text-sm font-semibold text-teal-700 mb-3">Diet Plan</label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {dietPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedDiet(plan.id)}
                    className={`p-3 rounded-lg border-2 transition ${
                      selectedDiet === plan.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{plan.icon}</div>
                    <div className="text-xs font-medium">{plan.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Month & Year Selector */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-teal-700 mb-2">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>{month}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold text-teal-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Weekly Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2">
            <ChefHat className="w-6 h-6" />
            This Week's Meals
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((week) => (
              <div key={week} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-amber-900">Week {week}</h3>
                    <p className="text-sm text-gray-600">28 recipes</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Breakfast</span>
                    <button
                      onClick={() => handlePrintRecipe(`${selectedDiet}-week${week}-breakfast`)}
                      className="text-amber-600 hover:underline flex items-center gap-1"
                    >
                      <Printer className="w-3 h-3" />
                      Print
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunch</span>
                    <button
                      onClick={() => handlePrintRecipe(`${selectedDiet}-week${week}-lunch`)}
                      className="text-amber-600 hover:underline flex items-center gap-1"
                    >
                      <Printer className="w-3 h-3" />
                      Print
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dinner</span>
                    <button
                      onClick={() => handlePrintRecipe(`${selectedDiet}-week${week}-dinner`)}
                      className="text-amber-600 hover:underline flex items-center gap-1"
                    >
                      <Printer className="w-3 h-3" />
                      Print
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() => handlePrintRecipe(`${selectedDiet}-week${week}-all`)}
                    className="w-full text-center text-sm font-semibold text-teal-600 hover:text-teal-700"
                  >
                    Print All Week {week} Recipes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Wellness Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 border border-amber-200"
        >
          <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Wellness Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-amber-800">
            <div>
              <h4 className="font-semibold mb-2">🧘 Mindful Eating</h4>
              <p className="text-sm">Take time to enjoy each meal without distractions for better digestion and satisfaction.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💧 Stay Hydrated</h4>
              <p className="text-sm">Drink at least 8 glasses of water daily to support your body's natural processes.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🚶 Move Daily</h4>
              <p className="text-sm">Combine your nutrition plan with 30 minutes of movement for optimal results.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}