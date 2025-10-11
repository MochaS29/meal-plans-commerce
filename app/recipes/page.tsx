'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Clock, Users, Flame, Search, Sparkles, X } from 'lucide-react'
import Link from 'next/link'

interface Recipe {
  id: string
  name: string
  description: string
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  image_url?: string | null
  diet_plan_names: { name: string; slug: string }[]
  recipe_nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }[]
}

const difficultyColors = {
  easy: 'text-green-600',
  medium: 'text-yellow-600',
  hard: 'text-red-600'
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDiet, setSelectedDiet] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    fetchRecipes()
  }, [selectedDiet])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedRecipe) {
        setSelectedRecipe(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [selectedRecipe])

  const fetchRecipes = async () => {
    try {
      if (selectedDiet) {
        // If a diet is selected, fetch from that diet
        const params = new URLSearchParams()
        params.append('diet', selectedDiet)
        params.append('limit', '100')

        const response = await fetch(`/api/admin/recipes?${params}`)
        const data = await response.json()

        if (data.success) {
          const shuffled = [...(data.recipes || [])].sort(() => Math.random() - 0.5)
          setRecipes(shuffled.slice(0, 9))
        }
      } else {
        // Fetch one recipe from each diet type
        const dietTypes = [
          'mediterranean',
          'keto',
          'vegan',
          'paleo',
          'vegetarian',
          'intermittent-fasting',
          'family-focused',
          'global-cuisine'
        ]

        const recipePromises = dietTypes.map(async (diet) => {
          const params = new URLSearchParams()
          params.append('diet', diet)
          params.append('limit', '10') // Get 10 to pick a random one

          const response = await fetch(`/api/admin/recipes?${params}`)
          const data = await response.json()

          if (data.success && data.recipes && data.recipes.length > 0) {
            // Pick a random recipe from this diet
            const recipes = data.recipes.filter(r => r.image_url) // Only recipes with images
            if (recipes.length === 0) return data.recipes[0] // Fallback to any recipe
            return recipes[Math.floor(Math.random() * recipes.length)]
          }
          return null
        })

        const dietRecipes = (await Promise.all(recipePromises)).filter(Boolean)

        // Add 1 more random recipe for variety (to make 9 total)
        const params = new URLSearchParams()
        params.append('limit', '20')
        const response = await fetch(`/api/admin/recipes?${params}`)
        const data = await response.json()

        if (data.success && data.recipes) {
          const extraRecipes = data.recipes
            .filter(r => r.image_url && !dietRecipes.find(dr => dr.id === r.id))
            .sort(() => Math.random() - 0.5)
            .slice(0, 1)

          setRecipes([...dietRecipes, ...extraRecipes])
        } else {
          setRecipes(dietRecipes)
        }
      }
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-teal-50 to-teal-50">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-teal-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading delicious recipes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-teal-50">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-teal-600 via-teal-500 to-teal-500 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 text-white hover:text-yellow-200 transition">
            <Sparkles className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4 text-white drop-shadow-lg">
              <div className="p-3 bg-white/30 backdrop-blur-sm rounded-full">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <span>Recipe Collection</span>
            </h1>
            <p className="text-xl text-white font-medium ml-16 drop-shadow">
              Discover delicious recipes for every diet plan
            </p>
          </motion.div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition"
              />
            </div>
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition bg-white"
            >
              <option value="">All Diet Plans</option>
              <option value="mediterranean">Mediterranean</option>
              <option value="keto">Keto</option>
              <option value="vegan">Vegan</option>
              <option value="paleo">Paleo</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="intermittent-fasting">Intermittent Fasting</option>
              <option value="family-focused">Family Focused</option>
              <option value="global-cuisine">Global Cuisine</option>
            </select>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              {/* Recipe Image */}
              {recipe.image_url ? (
                <div className="relative w-full h-64 bg-gray-100">
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-64 bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                  <ChefHat className="w-20 h-20 text-teal-400" />
                </div>
              )}

              {/* Recipe Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {recipe.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {recipe.description}
                </p>

                {/* Diet Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.diet_plan_names.slice(0, 2).map((diet) => (
                    <span
                      key={diet.slug}
                      className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
                    >
                      {diet.name}
                    </span>
                  ))}
                  {recipe.diet_plan_names.length > 2 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      +{recipe.diet_plan_names.length - 2} more
                    </span>
                  )}
                </div>

                {/* Recipe Meta */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prep_time + recipe.cook_time}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    <span>{recipe.recipe_nutrition?.[0]?.calories || 0} cal</span>
                  </div>
                </div>

                <div className={`mt-3 text-sm font-medium capitalize ${difficultyColors[recipe.difficulty as keyof typeof difficultyColors] || 'text-gray-600'}`}>
                  {recipe.difficulty}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No recipes found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </section>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedRecipe(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Modal Image */}
            {selectedRecipe.image_url ? (
              <div className="relative w-full h-80 bg-gray-100">
                <img
                  src={selectedRecipe.image_url}
                  alt={selectedRecipe.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative w-full h-80 bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <ChefHat className="w-32 h-32 text-teal-400" />
              </div>
            )}

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedRecipe.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.diet_plan_names.map((diet) => (
                    <span
                      key={diet.slug}
                      className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
                    >
                      {diet.name}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="text-gray-500 hover:text-gray-700 transition p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6 text-lg">{selectedRecipe.description}</p>

              {/* Recipe Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-medium">Prep Time</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRecipe.prep_time}m</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-medium">Cook Time</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRecipe.cook_time}m</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-medium">Servings</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRecipe.servings}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-medium">Difficulty</p>
                  <p className="text-2xl font-bold text-gray-900 capitalize">{selectedRecipe.difficulty}</p>
                </div>
              </div>

              {/* Nutrition */}
              {selectedRecipe.recipe_nutrition?.[0] && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Nutrition Per Serving</h3>
                  <div className="grid grid-cols-5 gap-3">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Calories</p>
                      <p className="text-lg font-bold text-green-700">
                        {selectedRecipe.recipe_nutrition[0].calories}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Protein</p>
                      <p className="text-lg font-bold text-blue-700">
                        {selectedRecipe.recipe_nutrition[0].protein}g
                      </p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Carbs</p>
                      <p className="text-lg font-bold text-yellow-700">
                        {selectedRecipe.recipe_nutrition[0].carbs}g
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Fat</p>
                      <p className="text-lg font-bold text-purple-700">
                        {selectedRecipe.recipe_nutrition[0].fat}g
                      </p>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-700 font-medium">Fiber</p>
                      <p className="text-lg font-bold text-teal-700">
                        {selectedRecipe.recipe_nutrition[0].fiber}g
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Get the full recipe with ingredients and step-by-step instructions
                </p>
                <Link
                  href="/pricing"
                  className="inline-block px-8 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition transform hover:scale-105"
                >
                  View Meal Plans
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
