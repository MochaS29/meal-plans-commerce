'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Clock, Users, Search, ArrowLeft, Printer, ShoppingCart, Book, X } from 'lucide-react'
import Link from 'next/link'

interface FullRecipe {
  id: string
  name: string
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  day: number
  meal: string
  recipe_ingredients?: any[]
  recipe_instructions?: any[]
  recipe_nutrition?: any[]
}

export default function MemberRecipesPage() {
  const [mealPlanData, setMealPlanData] = useState<any>(null)
  const [fullRecipes, setFullRecipes] = useState<FullRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [selectedDiet] = useState('mediterranean') // Get from user preferences
  const [selectedMonth] = useState(1) // Default to January
  const [selectedYear] = useState(2025)

  useEffect(() => {
    fetchMealPlanAndRecipes()
  }, [])

  const fetchMealPlanAndRecipes = async () => {
    try {
      // First fetch the meal plan
      const response = await fetch(`/api/meal-plans?menuType=${selectedDiet}&month=${selectedMonth}&year=${selectedYear}`)
      if (response.ok) {
        const data = await response.json()
        setMealPlanData(data)
        
        // Then fetch full recipe details for each meal
        const recipePromises: Promise<FullRecipe | null>[] = []
        
        if (data?.dailyMeals) {
          Object.entries(data.dailyMeals).forEach(([dayKey, dayData]: [string, any]) => {
            const dayNum = parseInt(dayKey.replace('day_', ''))
            
            // Fetch breakfast recipe
            if (dayData.breakfast?.name) {
              recipePromises.push(
                fetchRecipeDetails(dayData.breakfast.name, dayNum, 'Breakfast')
              )
            }
            
            // Fetch lunch recipe
            if (dayData.lunch?.name) {
              recipePromises.push(
                fetchRecipeDetails(dayData.lunch.name, dayNum, 'Lunch')
              )
            }
            
            // Fetch dinner recipe
            if (dayData.dinner?.name) {
              recipePromises.push(
                fetchRecipeDetails(dayData.dinner.name, dayNum, 'Dinner')
              )
            }
          })
        }
        
        const recipes = await Promise.all(recipePromises)
        const validRecipes = recipes.filter((recipe): recipe is FullRecipe => recipe !== null)
        setFullRecipes(validRecipes)
      }
    } catch (error) {
      console.error('Error fetching meal plan and recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecipeDetails = async (recipeName: string, day: number, meal: string): Promise<FullRecipe | null> => {
    try {
      console.log(`Fetching recipe details for: "${recipeName}" (Day ${day} ${meal})`)
      
      // Try the API endpoint first
      const response = await fetch(`/api/recipes/by-name/${encodeURIComponent(recipeName)}`)
      
      if (response.ok) {
        const recipe = await response.json()
        console.log(`Received recipe:`, recipe)
        
        // Only return if it's not a placeholder and has valid data
        if (!recipe.placeholder && recipe.id) {
          const fullRecipe = {
            ...recipe,
            day,
            meal
          }
          console.log(`Successfully processed recipe: "${recipe.name}" with ${recipe.recipe_ingredients?.length || 0} ingredients and ${recipe.recipe_instructions?.length || 0} instructions`)
          return fullRecipe
        } else {
          console.log(`Recipe is placeholder or missing ID for: ${recipeName}`)
        }
      } else {
        console.log(`API request failed with status ${response.status} for: ${recipeName}`)
      }

      // If no real recipe found, don't create fallbacks - just return null
      console.log(`No matching recipe found in database for: ${recipeName}`)
      return null
    } catch (error) {
      console.error(`Error fetching recipe ${recipeName}:`, error)
      return null
    }
  }

  // Filter recipes based on search
  const filteredRecipes = fullRecipes.filter(recipe =>
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
            All {fullRecipes.length} recipes from your {mealPlanData?.title || 'meal plan'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
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
          
          <button
            onClick={() => {
              const url = `/api/download-pdf?menuType=${selectedDiet}&month=${selectedMonth}&year=${selectedYear}&demo=true`;
              window.open(url, '_blank');
            }}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Printer className="w-5 h-5" />
            Print This Week's Recipes
          </button>
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
                  <button 
                    onClick={() => {
                      console.log('Setting selected recipe:', recipe)
                      setSelectedRecipe(recipe)
                    }}
                    className="text-left"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-amber-600 transition-colors cursor-pointer">{recipe.name}</h3>
                  </button>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                      Day {recipe.day} • {recipe.meal}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => window.open(`/print/recipe/${encodeURIComponent(recipe.name)}`, '_blank')}
                  className="text-gray-400 hover:text-amber-600 transition"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-gray-700">Prep: {recipe.prep_time} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-teal-600" />
                  <span className="text-gray-700">Cook: {recipe.cook_time} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">Serves: {recipe.servings}</span>
                </div>
                {recipe.recipe_nutrition?.[0] && (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 text-green-600">🔥</span>
                    <span className="text-gray-700">{recipe.recipe_nutrition[0].calories} calories</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t">
                <button 
                  onClick={() => {
                    console.log('View Full Recipe clicked for:', recipe)
                    setSelectedRecipe(recipe)
                  }}
                  className="w-full text-center text-sm font-semibold text-amber-600 hover:text-amber-700"
                >
                  View Full Recipe
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRecipes.length === 0 && !loading && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try a different search term' : 'Unable to load recipes from your meal plan. Please try refreshing the page.'}
            </p>
          </div>
        )}
      </div>

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
                  onClick={() => window.open(`/print/recipe/${encodeURIComponent(selectedRecipe.name)}`, '_blank')}
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
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}