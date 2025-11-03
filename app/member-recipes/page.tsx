'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Clock, Users, Search, ArrowLeft, Printer } from 'lucide-react'
import Link from 'next/link'

interface Recipe {
  name: string
  calories: number
  protein: string
  prepTime: string
  day: number
  meal: string
}

export default function MemberRecipesPage() {
  const [mealPlanData, setMealPlanData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDiet] = useState('mediterranean') // Get from user preferences
  const [selectedMonth] = useState(1) // Default to January
  const [selectedYear] = useState(2025)

  useEffect(() => {
    fetchMealPlan()
  }, [])

  const fetchMealPlan = async () => {
    try {
      const response = await fetch(`/api/meal-plans?menuType=${selectedDiet}&month=${selectedMonth}&year=${selectedYear}`)
      if (response.ok) {
        const data = await response.json()
        setMealPlanData(data)
      }
    } catch (error) {
      console.error('Error fetching meal plan:', error)
    } finally {
      setLoading(false)
    }
  }

  // Extract all recipes from meal plan data
  const allRecipes: Recipe[] = []
  if (mealPlanData?.dailyMeals) {
    Object.entries(mealPlanData.dailyMeals).forEach(([dayKey, dayData]: [string, any]) => {
      const dayNum = parseInt(dayKey.replace('day_', ''))
      
      if (dayData.breakfast) {
        allRecipes.push({
          ...dayData.breakfast,
          day: dayNum,
          meal: 'Breakfast'
        })
      }
      if (dayData.lunch) {
        allRecipes.push({
          ...dayData.lunch,
          day: dayNum,
          meal: 'Lunch'
        })
      }
      if (dayData.dinner) {
        allRecipes.push({
          ...dayData.dinner,
          day: dayNum,
          meal: 'Dinner'
        })
      }
    })
  }

  // Filter recipes based on search
  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.meal.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="animate-pulse text-lg text-amber-700">Loading your recipe collection...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/userportal" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2"
          >
            Your Recipe Collection
          </motion.h1>
          <p className="text-xl text-white/90">
            All {allRecipes.length} recipes from your {mealPlanData?.title || 'meal plan'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={`${recipe.day}-${recipe.meal}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{recipe.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                      Day {recipe.day} • {recipe.meal}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="text-gray-400 hover:text-amber-600 transition"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-600" />
                  <span className="text-gray-700">{recipe.calories} calories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span className="text-gray-700">{recipe.protein} protein</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">{recipe.prepTime}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <button className="w-full text-center text-sm font-semibold text-amber-600 hover:text-amber-700">
                  View Full Recipe
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try a different search term' : 'No recipes available in your meal plan'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}