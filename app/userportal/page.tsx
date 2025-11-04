'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Download, Calendar, ShoppingCart, Book,
  Printer, Copy, User, LogOut, Check,
  ChefHat, Clock, Heart, Sparkles, Home,
  CopyCheck, Settings, Library, BarChart3,
  X, Users
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

// Recipe mapping from meal plan names to database recipe names
const recipeMapping: { [key: string]: string } = {
  // Breakfast recipes
  "Overnight Oats with Greek Yogurt": "Satiating Pumpkin Spice Overnight Oats",
  "Whole Grain Toast with Avocado and Feta": "Mediterranean Quinoa and Egg Breakfast Bowl", 
  "Turkish Breakfast Platter": "Turkish Menemen",
  "Mediterranean Egg Bites": "Mediterranean Shakshuka",
  "Greek Yogurt Parfait with Honey": "Autumn Protein-Packed Oatmeal Bowl",
  "Shakshuka with Whole Grain Pita": "Mediterranean Shakshuka",
  "Mediterranean Smoothie Bowl": "Pumpkin Pie Smoothie Bowl",
  "Mediterranean Omelet": "Turkish Menemen: Eggs in Tomato Sauce",
  "Ricotta Pancakes with Berry Compote": "Autumn Protein-Packed Oatmeal Bowl",
  
  // Lunch recipes  
  "Spanakopita with Greek Salad": "Mediterranean Roasted Vegetable and Feta Salad",
  "Mediterranean Chickpea Salad": "Mediterranean Chickpea Salad",
  "Greek Lentil Soup": "Moroccan Harira Lentil Soup with Poached Eggs",
  "Falafel Wrap with Tahini": "Mediterranean Baked Falafel Bites",
  "Stuffed Bell Peppers": "Mediterranean Quinoa Stuffed Peppers",
  "Greek Orzo Salad": "Mediterranean Chickpea and Quinoa Salad",
  "Mediterranean Quinoa Bowl": "Mediterranean Quinoa and Egg Breakfast Bowl",
  "Mediterranean Tuna Salad": "Mediterranean Tuna and Chickpea Salad",
  "Mezze Platter with Hummus": "Middle Eastern Hummus Platter",
  "Tabbouleh with Grilled Halloumi": "Mediterranean Roasted Vegetable and Feta Salad",
  
  // Dinner recipes
  "Grilled Lemon Herb Salmon": "Mediterranean Salmon and Quinoa Salad",
  "Ratatouille with Grilled Chicken": "Mediterranean Roasted Vegetable Medley",
  "Mediterranean Baked Fish": "Mediterranean Baked Feta with Roasted Vegetables",
  "Moussaka": "Mediterranean Quinoa Stuffed Peppers",
  "Chicken Souvlaki with Tzatziki": "Moroccan Spiced Chicken Tagine",
  "Grilled Vegetable and Halloumi Skewers": "Mediterranean Roasted Vegetable and Feta Salad",
  "Seafood Paella": "Mediterranean Salmon and Quinoa Salad",
  "Baked Cod with Tomatoes and Olives": "Mediterranean Baked Feta with Roasted Vegetables",
  "Chicken Tagine with Couscous": "Moroccan Tagine with Chicken and Seasonal Vegetables",
  "Lamb Kofta with Mint Yogurt": "Moroccan Lamb Tagine with Roasted Vegetables"
}

// Fallback meal plan data for testing when API fails
const createFallbackMealPlan = () => ({
  title: "Mediterranean - January 2025 (Demo)",
  dailyMeals: {
    day_1: {
      breakfast: { name: "Overnight Oats with Greek Yogurt", calories: 340, protein: "18g", prepTime: "5 min" },
      lunch: { name: "Spanakopita with Greek Salad", calories: 440, protein: "17g", prepTime: "30 min" },
      dinner: { name: "Moroccan Lamb Tagine with Roasted Vegetables", calories: 485, protein: "26g", prepTime: "45 min" }
    },
    day_2: {
      breakfast: { name: "Whole Grain Toast with Avocado and Feta", calories: 330, protein: "15g", prepTime: "10 min" },
      lunch: { name: "Peruvian Quinoa and Roasted Vegetable Bowl", calories: 420, protein: "16g", prepTime: "25 min" },
      dinner: { name: "Moroccan Beef Tagine", calories: 460, protein: "28g", prepTime: "40 min" }
    },
    day_3: {
      breakfast: { name: "Turkish Breakfast Platter", calories: 360, protein: "19g", prepTime: "15 min" },
      lunch: { name: "Mediterranean Chickpea Salad", calories: 380, protein: "14g", prepTime: "15 min" },
      dinner: { name: "Moroccan Spiced Chicken Tagine", calories: 445, protein: "32g", prepTime: "35 min" }
    },
    day_4: {
      breakfast: { name: "Mediterranean Egg Bites", calories: 280, protein: "22g", prepTime: "25 min" },
      lunch: { name: "Greek Lemon Rice with Herbs", calories: 340, protein: "8g", prepTime: "20 min" },
      dinner: { name: "Grilled Salmon with Mediterranean Vegetables", calories: 520, protein: "35g", prepTime: "30 min" }
    },
    day_5: {
      breakfast: { name: "Greek Yogurt Parfait with Nuts", calories: 320, protein: "20g", prepTime: "5 min" },
      lunch: { name: "Turkish Lentil Soup", calories: 290, protein: "18g", prepTime: "25 min" },
      dinner: { name: "Mediterranean Stuffed Peppers", calories: 380, protein: "22g", prepTime: "40 min" }
    },
    day_6: {
      breakfast: { name: "Shakshuka with Feta", calories: 350, protein: "18g", prepTime: "20 min" },
      lunch: { name: "Greek Village Salad", calories: 310, protein: "12g", prepTime: "10 min" },
      dinner: { name: "Herb-Crusted Mediterranean Fish", calories: 425, protein: "38g", prepTime: "25 min" }
    },
    day_7: {
      breakfast: { name: "Mediterranean Breakfast Bowl", calories: 385, protein: "16g", prepTime: "15 min" },
      lunch: { name: "Hummus and Vegetable Wrap", calories: 360, protein: "14g", prepTime: "10 min" },
      dinner: { name: "Mediterranean Pasta Primavera", calories: 445, protein: "18g", prepTime: "30 min" }
    }
  }
})

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDiet, setSelectedDiet] = useState('mediterranean')
  const [selectedMonth, setSelectedMonth] = useState(1) // Default to January since we have data for months 1-4
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [copiedList, setCopiedList] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [mealPlanData, setMealPlanData] = useState<any>(null)
  const [loadingMeals, setLoadingMeals] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [loadingRecipe, setLoadingRecipe] = useState(false)
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
        console.error('Failed to fetch meal plan data - using fallback data')
        // Create fallback meal data with clickable recipes
        setMealPlanData(createFallbackMealPlan())
      }
    } catch (error) {
      console.error('Error fetching meal plan:', error)
      console.log('Using fallback meal plan data')
      setMealPlanData(createFallbackMealPlan())
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
    try {
      // Fetch real shopping list from API
      const response = await fetch(`/api/shopping-list?menuType=${selectedDiet}&month=${selectedMonth}&year=${selectedYear}`)
      
      if (response.ok) {
        const data = await response.json()
        let shoppingListText = `Shopping List - ${months[selectedMonth - 1]} ${selectedYear}\n\n`
        
        if (data.shoppingLists) {
          // Show all weeks' shopping lists for the month
          Object.entries(data.shoppingLists).forEach(([weekKey, weekData]: [string, any]) => {
            const weekNum = weekKey.replace('week', '')
            shoppingListText += `Week ${weekNum}:\n`
            
            if (weekData.produce) {
              shoppingListText += '\nProduce:\n'
              weekData.produce.forEach((item: string) => shoppingListText += `• ${item}\n`)
            }
            
            if (weekData.proteins) {
              shoppingListText += '\nProteins:\n'
              weekData.proteins.forEach((item: string) => shoppingListText += `• ${item}\n`)
            }
            
            if (weekData.dairy) {
              shoppingListText += '\nDairy:\n'
              weekData.dairy.forEach((item: string) => shoppingListText += `• ${item}\n`)
            }
            
            if (weekData.pantry) {
              shoppingListText += '\nPantry:\n'
              weekData.pantry.forEach((item: string) => shoppingListText += `• ${item}\n`)
            }
            
            shoppingListText += '\n'
          })
        } else {
          shoppingListText += 'No shopping list available for this meal plan.'
        }
        
        await navigator.clipboard.writeText(shoppingListText)
        setCopiedList(true)
        setTimeout(() => setCopiedList(false), 2000)
      } else {
        throw new Error('Failed to fetch shopping list')
      }
    } catch (err) {
      console.error('Failed to copy shopping list:', err)
      // Fallback to a basic message
      await navigator.clipboard.writeText(`Shopping List - ${months[selectedMonth - 1]} ${selectedYear}\n\nPlease check your meal plan for shopping list details.`)
      setCopiedList(true)
      setTimeout(() => setCopiedList(false), 2000)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(
        `/api/download-pdf?menuType=${selectedDiet}&month=${selectedMonth}&year=${selectedYear}&demo=true`,
        {
          credentials: 'include' // Include cookies for authentication
        }
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
      } else {
        const errorData = await response.json()
        console.error('PDF download error:', errorData)
        alert('Unable to download PDF. Please try again.')
      }
    } catch (error) {
      console.error('PDF download failed:', error)
      alert('Unable to download PDF. Please try again.')
    }
  }

  const fetchRecipeDetails = async (recipeName: string) => {
    setLoadingRecipe(true)
    try {
      // Use recipe mapping to find the correct database recipe name
      const mappedRecipeName = recipeMapping[recipeName] || recipeName
      console.log(`Fetching recipe details for: "${recipeName}" -> mapped to: "${mappedRecipeName}"`)
      
      const response = await fetch(`/api/recipes/by-name/${encodeURIComponent(mappedRecipeName)}`)
      
      if (response.ok) {
        const recipe = await response.json()
        console.log('Received recipe:', recipe)
        
        if (recipe && !recipe.placeholder) {
          setSelectedRecipe(recipe)
          console.log('Recipe modal should now open')
        } else {
          console.log('Recipe is placeholder or invalid, not opening modal')
          alert(`Sorry, full recipe details are not available for "${recipeName}". This recipe is being matched from our curated database.`)
        }
      } else {
        console.error(`Failed to fetch recipe details - Status: ${response.status}`)
        alert(`Sorry, we couldn't find recipe details for "${recipeName}". Please try another recipe.`)
      }
    } catch (error) {
      console.error('Error fetching recipe:', error)
      alert('Error loading recipe. Please try again.')
    } finally {
      setLoadingRecipe(false)
    }
  }

  const handleRecipeClick = (recipeName: string) => {
    // Don't try to fetch recipes for loading states or placeholder text
    if (!recipeName || 
        recipeName === 'Loading...' || 
        recipeName.includes('No ') || 
        recipeName.includes('planned')) {
      console.log('Skipping recipe click for:', recipeName)
      return
    }
    
    console.log('Fetching recipe details for:', recipeName)
    fetchRecipeDetails(recipeName)
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
                href="/member-recipes"
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
                      {months.slice(0, 4).map((month, index) => (
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
                ) : mealPlanData?.error ? (
                  <div className="col-span-7 text-center py-8">
                    <div className="text-red-600 mb-2">⚠️ {mealPlanData.message}</div>
                    <div className="text-gray-600 text-sm">Try selecting a different month from the dropdown above.</div>
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
                        <button 
                          onClick={() => handleRecipeClick(meals.breakfast)}
                          disabled={!meals.breakfast || meals.breakfast === 'Loading...' || meals.breakfast.includes('No ')}
                          className={`truncate text-left w-full transition-all ${
                            !meals.breakfast || meals.breakfast === 'Loading...' || meals.breakfast.includes('No ')
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-amber-800 font-semibold hover:underline hover:bg-amber-50 cursor-pointer p-1 rounded'
                          }`}
                          title={meals.breakfast}
                        >
                          🌅 {meals.breakfast}
                        </button>
                        <button 
                          onClick={() => handleRecipeClick(meals.lunch)}
                          disabled={!meals.lunch || meals.lunch === 'Loading...' || meals.lunch.includes('No ')}
                          className={`truncate text-left w-full transition-all ${
                            !meals.lunch || meals.lunch === 'Loading...' || meals.lunch.includes('No ')
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-teal-700 font-semibold hover:underline hover:bg-teal-50 cursor-pointer p-1 rounded'
                          }`}
                          title={meals.lunch}
                        >
                          ☀️ {meals.lunch}
                        </button>
                        <button 
                          onClick={() => handleRecipeClick(meals.dinner)}
                          disabled={!meals.dinner || meals.dinner === 'Loading...' || meals.dinner.includes('No ')}
                          className={`truncate text-left w-full transition-all ${
                            !meals.dinner || meals.dinner === 'Loading...' || meals.dinner.includes('No ')
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-purple-700 font-semibold hover:underline hover:bg-purple-50 cursor-pointer p-1 rounded'
                          }`}
                          title={meals.dinner}
                        >
                          🌙 {meals.dinner}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Recipe Usage Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-2xl p-8 mb-8 border border-teal-200"
            >
              <h2 className="text-2xl font-bold text-teal-800 mb-4 flex items-center gap-2">
                <ChefHat className="w-6 h-6" />
                How to Use Your Meal Plan
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-teal-700">
                <div className="text-center">
                  <div className="text-3xl mb-2">📅</div>
                  <h3 className="font-semibold mb-2">Click Any Recipe</h3>
                  <p className="text-sm">Click on any meal name in the calendar above to see full ingredients, instructions, and nutrition info.</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🖨️</div>
                  <h3 className="font-semibold mb-2">Print Individual Recipes</h3>
                  <p className="text-sm">Each recipe modal has a print button for easy kitchen reference while cooking.</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🛒</div>
                  <h3 className="font-semibold mb-2">Get Shopping Lists</h3>
                  <p className="text-sm">Use the "Copy List" button above to get organized shopping lists for your meal plan.</p>
                </div>
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

      {/* Loading Modal */}
      {loadingRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            <span className="text-lg text-gray-700">Loading recipe...</span>
          </div>
        </div>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{selectedRecipe.name}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(`/print/recipe/${selectedRecipe.id}`, '_blank')}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
              {loadingRecipe ? (
                <div className="p-8 text-center">
                  <div className="animate-pulse text-amber-700">Loading recipe details...</div>
                </div>
              ) : (
                <div className="p-6">
                  {/* Recipe Header */}
                  <div className="grid md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <div>
                        <div className="text-sm text-gray-600">Prep Time</div>
                        <div className="font-semibold">{selectedRecipe.prep_time} min</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-teal-600" />
                      <div>
                        <div className="text-sm text-gray-600">Cook Time</div>
                        <div className="font-semibold">{selectedRecipe.cook_time} min</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="text-sm text-gray-600">Servings</div>
                        <div className="font-semibold">{selectedRecipe.servings}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChefHat className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm text-gray-600">Difficulty</div>
                        <div className="font-semibold capitalize">{selectedRecipe.difficulty}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Ingredients */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-teal-600" />
                        Ingredients
                      </h3>
                      <div className="space-y-2">
                        {selectedRecipe.recipe_ingredients?.map((ingredient: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                            <span className="text-gray-900">{ingredient.ingredient}</span>
                            <span className="text-sm text-gray-600 font-medium">
                              {ingredient.amount} {ingredient.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Book className="w-5 h-5 text-amber-600" />
                        Instructions
                      </h3>
                      <div className="space-y-3">
                        {selectedRecipe.recipe_instructions?.map((instruction: any, index: number) => (
                          <div key={index} className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {instruction.step_number}
                            </div>
                            <p className="text-gray-700 leading-relaxed">{instruction.instruction}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Nutrition */}
                  {selectedRecipe.recipe_nutrition?.length > 0 && (
                    <div className="mt-8 p-4 bg-green-50 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Nutritional Information</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">{selectedRecipe.recipe_nutrition[0].calories}</div>
                          <div className="text-sm text-gray-600">Calories</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{selectedRecipe.recipe_nutrition[0].protein}g</div>
                          <div className="text-sm text-gray-600">Protein</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">{selectedRecipe.recipe_nutrition[0].carbs}g</div>
                          <div className="text-sm text-gray-600">Carbs</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{selectedRecipe.recipe_nutrition[0].fat}g</div>
                          <div className="text-sm text-gray-600">Fat</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-600">{selectedRecipe.recipe_nutrition[0].fiber}g</div>
                          <div className="text-sm text-gray-600">Fiber</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
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
