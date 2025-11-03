'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Download, Calendar, ShoppingCart, Book,
  Printer, Copy, User, LogOut, Check,
  ChefHat, Clock, Heart, Sparkles, Home,
  CopyCheck, Settings, Library, BarChart3
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PreferencesForm from '@/components/PreferencesForm'
import NutritionalDashboard from '@/components/NutritionalDashboard'
import RecipeQAChatbot from '@/components/RecipeQAChatbot'

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

type TabType = 'dashboard' | 'preferences' | 'resources' | 'analytics'

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDiet, setSelectedDiet] = useState('mediterranean')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [copiedList, setCopiedList] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [mealPlanData, setMealPlanData] = useState<any>(null)
  const [loadingMeals, setLoadingMeals] = useState(false)
  const router = useRouter()

  // Add print styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @media print {
        * {
          color: #000 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body {
          background: white !important;
        }
        .text-gray-600,
        .text-gray-500,
        .text-gray-400,
        .text-teal-700,
        .text-teal-600,
        .text-amber-700,
        .text-amber-800,
        .text-amber-900 {
          color: #000 !important;
        }
        h1, h2, h3, h4, h5, h6, p, span, div, li {
          color: #000 !important;
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    fetchMealPlan()
  }, [selectedDiet, selectedMonth, selectedYear])

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

  const fetchMealPlan = async () => {
    setLoadingMeals(true)
    try {
      const response = await fetch(`/api/meal-plans?menuType=${selectedDiet}&month=${selectedMonth}&year=${selectedYear}`)
      if (response.ok) {
        const data = await response.json()
        setMealPlanData(data)
      } else {
        console.error('Failed to fetch meal plan data')
        setMealPlanData(null)
      }
    } catch (error) {
      console.error('Error fetching meal plan:', error)
      setMealPlanData(null)
    } finally {
      setLoadingMeals(false)
    }
  }

  const handlePrintCalendar = () => {
    window.open(`/print/calendar?diet=${selectedDiet}&month=${selectedMonth}&year=${selectedYear}`, '_blank')
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
      {/* AI Chatbot - Floating Button */}
      <RecipeQAChatbot />

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

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-semibold transition flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'text-amber-700 border-b-2 border-amber-700'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Meal Plans
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-6 py-3 font-semibold transition flex items-center gap-2 ${
              activeTab === 'preferences'
                ? 'text-amber-700 border-b-2 border-amber-700'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            <Settings className="w-5 h-5" />
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 font-semibold transition flex items-center gap-2 ${
              activeTab === 'resources'
                ? 'text-amber-700 border-b-2 border-amber-700'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            <Library className="w-5 h-5" />
            Resources
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 font-semibold transition flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'text-amber-700 border-b-2 border-amber-700'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
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
                href="/recipes"
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
                  <label className="block text-sm font-bold text-gray-900 mb-3">Diet Plan</label>
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
                        <div className="text-xs font-bold text-gray-900">{plan.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Month & Year Selector */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-900 mb-2">Month</label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 font-medium"
                    >
                      {months.map((month, index) => (
                        <option key={month} value={index + 1}>{month}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-900 mb-2">Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 font-medium"
                    >
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Monthly Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8"
              id="monthly-calendar"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Monthly Calendar - {months[selectedMonth - 1]} {selectedYear}
                </h2>
                <button
                  onClick={() => window.open(`/print/calendar?diet=${selectedDiet}&month=${selectedMonth}&year=${selectedYear}`, '_blank')}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 transition"
                >
                  <Printer className="w-4 h-4" />
                  Print Calendar
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-bold text-gray-900 py-2 text-sm">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {loadingMeals ? (
                  <div className="col-span-7 text-center py-8">
                    <div className="animate-pulse text-amber-700">Loading your meal plan...</div>
                  </div>
                ) : Array.from({ length: 30 }, (_, i) => {
                  const dayNum = i + 1
                  const dayOfWeek = (i + new Date(selectedYear, selectedMonth - 1, 1).getDay()) % 7
                  const dayKey = `day_${dayNum}`

                  // Get real meal data from the database
                  const dayMeals = mealPlanData?.dailyMeals?.[dayKey]
                  
                  const meals = dayMeals ? {
                    breakfast: dayMeals.breakfast?.name || 'No breakfast planned',
                    lunch: dayMeals.lunch?.name || 'No lunch planned', 
                    dinner: dayMeals.dinner?.name || 'No dinner planned'
                  } : {
                    breakfast: 'Loading...',
                    lunch: 'Loading...',
                    dinner: 'Loading...'
                  }

                  return (
                    <div
                      key={dayNum}
                      className="border border-gray-200 rounded-lg p-2 min-h-[120px] bg-white hover:shadow-md transition"
                      style={{ gridColumnStart: i === 0 ? dayOfWeek + 1 : 'auto' }}
                    >
                      <div className="font-bold text-gray-900 mb-2">{dayNum}</div>
                      <div className="space-y-1 text-xs">
                        <div className="text-amber-800 font-semibold truncate" title={meals.breakfast}>
                          🌅 {meals.breakfast}
                        </div>
                        <div className="text-teal-700 font-semibold truncate" title={meals.lunch}>
                          ☀️ {meals.lunch}
                        </div>
                        <div className="text-purple-700 font-semibold truncate" title={meals.dinner}>
                          🌙 {meals.dinner}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Weekly Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8"
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
                        <p className="text-sm text-gray-800">28 recipes</p>
                      </div>
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-900">Breakfast</span>
                        <button
                          onClick={() => handlePrintRecipe(`${selectedDiet}-week${week}-breakfast`)}
                          className="text-amber-600 hover:underline flex items-center gap-1"
                        >
                          <Printer className="w-3 h-3" />
                          Print
                        </button>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">Lunch</span>
                        <button
                          onClick={() => handlePrintRecipe(`${selectedDiet}-week${week}-lunch`)}
                          className="text-amber-600 hover:underline flex items-center gap-1"
                        >
                          <Printer className="w-3 h-3" />
                          Print
                        </button>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">Dinner</span>
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
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 border border-amber-200"
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
          </>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PreferencesForm />
          </motion.div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ResourcesLibrary />
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <NutritionalDashboard
              currentWeek={Math.ceil(new Date().getDate() / 7)}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Resources Library Component
function ResourcesLibrary() {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchResources()
  }, [selectedCategory])

  const fetchResources = async () => {
    try {
      const url = selectedCategory
        ? `/api/member-resources?category=${selectedCategory}`
        : '/api/member-resources'

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setResources(data.resources || [])
      }
    } catch (error) {
      console.error('Error fetching resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'meal-prep', name: 'Meal Prep', icon: '📦' },
    { id: 'nutrition', name: 'Nutrition', icon: '🥗' },
    { id: 'cooking-techniques', name: 'Cooking Tips', icon: '👨‍🍳' },
    { id: 'meal-planning', name: 'Meal Planning', icon: '📅' }
  ]

  if (loading && resources.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-lg text-amber-700">Loading resources...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-amber-600 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Member Resources</h2>
        <p className="text-lg">Exclusive guides and tips for your wellness journey</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            selectedCategory === null
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Resources
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      {resources.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
          <Library className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-amber-900 mb-2">Resources Coming Soon!</h3>
          <p className="text-amber-700">
            We're preparing exclusive guides and resources for you. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
                {resource.viewed && (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">{resource.content_type}</span>
                {resource.read_time_minutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {resource.read_time_minutes} min
                  </span>
                )}
              </div>

              <Link
                href={`/resources/${resource.slug}`}
                className="block w-full text-center bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-semibold"
              >
                Read Resource
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
