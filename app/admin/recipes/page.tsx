'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Book, Search, Filter, Trash2, Eye, Clock,
  Users, ChefHat, Home, Plus, Download, X
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Recipe {
  id: string
  name: string
  description: string
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  created_at: string
  image_url?: string | null
  diet_plan_names: { name: string; slug: string }[]
  recipe_ingredients: {
    ingredient: string
    amount: string
    unit: string
    notes?: string
    order_index: number
  }[]
  recipe_instructions: {
    step_number: number
    instruction: string
  }[]
  recipe_nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }[]
}

export default function RecipeLibrary() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDiet, setSelectedDiet] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [totalRecipes, setTotalRecipes] = useState(0)
  const router = useRouter()

  useEffect(() => {
    fetchRecipes()
  }, [selectedDiet])

  const fetchRecipes = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedDiet) params.append('diet', selectedDiet)
      params.append('limit', '10000') // Fetch all recipes

      const response = await fetch(`/api/admin/recipes?${params}`)
      const data = await response.json()

      if (data.success) {
        setRecipes(data.recipes || [])
        setTotalRecipes(data.total || 0)
      }
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteRecipe = async (recipeId: string) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return

    try {
      const response = await fetch(`/api/admin/recipes?id=${recipeId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setRecipes(recipes.filter(r => r.id !== recipeId))
        setTotalRecipes(totalRecipes - 1)
        if (selectedRecipe?.id === recipeId) {
          setSelectedRecipe(null)
        }
      }
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const exportRecipesToCSV = () => {
    const csv = [
      ['Name', 'Description', 'Diet Plans', 'Prep Time', 'Cook Time', 'Servings', 'Difficulty', 'Created'],
      ...filteredRecipes.map(r => [
        r.name,
        r.description,
        r.diet_plan_names.map(d => d.name).join('; '),
        `${r.prep_time} mins`,
        `${r.cook_time} mins`,
        r.servings,
        r.difficulty,
        new Date(r.created_at).toLocaleDateString()
      ])
    ].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recipes-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="animate-pulse text-lg text-amber-700">Loading recipe library...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-teal-700 text-white shadow-lg">
        <nav className="px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-6">
                <Book className="w-8 h-8 text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Admin Recipe Management</h1>
                  <p className="text-sm text-white/80">{totalRecipes} recipes total</p>
                </div>
              </div>
              <Link href="/" className="text-sm text-white/70 hover:text-white transition">
                ← Back to Site
              </Link>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-white/20">
              <Link
                href="/admin/recipes"
                className="px-6 py-3 bg-white/30 text-white font-semibold rounded-t-lg border-b-2 border-white"
              >
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Recipe Library
                </div>
              </Link>
              <Link
                href="/admin/database"
                className="px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white font-medium rounded-t-lg transition"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Database View
                </div>
              </Link>
            </div>
          </div>
        </nav>

        <div className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Recipe Library</h1>
            <p className="text-amber-100">
              {totalRecipes} recipes in your collection
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Diets</option>
                <option value="family-focused">Family Focused</option>
                <option value="global-cuisine">Global Cuisine</option>
                <option value="intermittent-fasting">Intermittent Fasting</option>
                <option value="keto">Keto</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="paleo">Paleo</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportRecipesToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <Link
                href="/admin"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Generate More
              </Link>
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition overflow-hidden"
            >
              {/* Recipe Image */}
              {recipe.image_url ? (
                <div className="relative w-full h-48 bg-gray-100">
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-48 bg-gradient-to-br from-amber-100 to-teal-100 flex items-center justify-center">
                  <ChefHat className="w-16 h-16 text-gray-400" />
                </div>
              )}

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-800 flex-1">
                    {recipe.name}
                  </h3>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="text-red-500 hover:text-red-700 transition p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {recipe.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.diet_plan_names.map((diet) => (
                    <span
                      key={diet.slug}
                      className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium"
                    >
                      {diet.name}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {recipe.prep_time + recipe.cook_time} mins
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {recipe.servings} servings
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="w-3 h-3" />
                    {recipe.difficulty}
                  </div>
                  <div>
                    {recipe.recipe_nutrition?.[0]?.calories || 0} cal
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recipes found</p>
          </div>
        )}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999] overflow-y-auto"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedRecipe.name}
              </h2>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Recipe Image */}
              {selectedRecipe.image_url && (
                <div className="mb-6">
                  <img
                    src={selectedRecipe.image_url}
                    alt={selectedRecipe.name}
                    className="w-full max-h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              <p className="text-gray-600 mb-6">{selectedRecipe.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 font-medium">Prep Time</p>
                  <p className="font-bold text-gray-900">{selectedRecipe.prep_time} mins</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 font-medium">Cook Time</p>
                  <p className="font-bold text-gray-900">{selectedRecipe.cook_time} mins</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 font-medium">Servings</p>
                  <p className="font-bold text-gray-900">{selectedRecipe.servings}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 font-medium">Difficulty</p>
                  <p className="font-bold text-gray-900 capitalize">{selectedRecipe.difficulty}</p>
                </div>
              </div>

              {/* Nutrition */}
              {selectedRecipe.recipe_nutrition?.[0] && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Nutrition Per Serving</h3>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Calories</p>
                      <p className="font-bold text-green-700">
                        {selectedRecipe.recipe_nutrition[0].calories}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Protein</p>
                      <p className="font-bold text-blue-700">
                        {selectedRecipe.recipe_nutrition[0].protein}g
                      </p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Carbs</p>
                      <p className="font-bold text-amber-700">
                        {selectedRecipe.recipe_nutrition[0].carbs}g
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Fat</p>
                      <p className="font-bold text-purple-700">
                        {selectedRecipe.recipe_nutrition[0].fat}g
                      </p>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Fiber</p>
                      <p className="font-bold text-teal-700">
                        {selectedRecipe.recipe_nutrition[0].fiber}g
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {selectedRecipe.recipe_ingredients
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((ing, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span className="text-gray-900">
                          <strong className="text-gray-900">{ing.amount} {ing.unit}</strong> {ing.ingredient}
                          {ing.notes && <span className="text-gray-600"> ({ing.notes})</span>}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Instructions</h3>
                <ol className="space-y-3">
                  {selectedRecipe.recipe_instructions
                    .sort((a, b) => a.step_number - b.step_number)
                    .map((inst) => (
                      <li key={inst.step_number} className="flex gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {inst.step_number}
                        </span>
                        <span className="pt-1 text-gray-900">{inst.instruction}</span>
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}