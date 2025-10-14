'use client'

import { useState, useEffect } from 'react'
import { Database, Download, Search, Filter, Eye, Trash2, X } from 'lucide-react'
import Link from 'next/link'

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
  recipe_nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }[]
}

export default function AdminDatabase() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [dietFilter, setDietFilter] = useState<string>('')
  const [imageFilter, setImageFilter] = useState<string>('all') // all, with, without
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    fetchAllRecipes()
  }, [])

  const fetchAllRecipes = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/recipes?limit=10000')
      const data = await response.json()

      if (data.success) {
        setRecipes(data.recipes || [])
        setTotalCount(data.total || 0)
      }
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteRecipe = async (recipeId: string) => {
    if (!confirm('Are you sure you want to delete this recipe? This cannot be undone.')) return

    try {
      const response = await fetch(`/api/admin/recipes?id=${recipeId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setRecipes(recipes.filter(r => r.id !== recipeId))
        setTotalCount(totalCount - 1)
        if (selectedRecipe?.id === recipeId) {
          setSelectedRecipe(null)
        }
        alert('Recipe deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting recipe:', error)
      alert('Failed to delete recipe')
    }
  }

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    // Search filter
    const matchesSearch = searchTerm === '' ||
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Diet filter
    const matchesDiet = dietFilter === '' ||
      recipe.diet_plan_names.some(d => d.slug === dietFilter)

    // Image filter
    const matchesImage = imageFilter === 'all' ||
      (imageFilter === 'with' && recipe.image_url) ||
      (imageFilter === 'without' && !recipe.image_url)

    return matchesSearch && matchesDiet && matchesImage
  })

  // Get unique diet types
  const dietTypes = Array.from(new Set(recipes.flatMap(r => r.diet_plan_names.map(d => d.slug))))
    .sort()

  // Stats
  const recipesWithImages = recipes.filter(r => r.image_url).length
  const recipesWithoutImages = recipes.filter(r => !r.image_url).length

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Description', 'Prep Time', 'Cook Time', 'Servings', 'Difficulty', 'Diet Plans', 'Has Image', 'Calories', 'Protein', 'Carbs', 'Fat', 'Fiber', 'Created At']

    const rows = filteredRecipes.map(r => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.description.replace(/"/g, '""')}"`,
      r.prep_time,
      r.cook_time,
      r.servings,
      r.difficulty,
      `"${r.diet_plan_names.map(d => d.name).join(', ')}"`,
      r.image_url ? 'Yes' : 'No',
      r.recipe_nutrition?.[0]?.calories || 0,
      r.recipe_nutrition?.[0]?.protein || 0,
      r.recipe_nutrition?.[0]?.carbs || 0,
      r.recipe_nutrition?.[0]?.fat || 0,
      r.recipe_nutrition?.[0]?.fiber || 0,
      new Date(r.created_at).toLocaleString()
    ])

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recipes-database-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="w-16 h-16 text-teal-600 mx-auto mb-4 animate-pulse" />
          <p className="text-xl text-gray-600">Loading database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-teal-700 text-white shadow-lg">
        <nav className="px-6 py-4">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-6">
                <Database className="w-8 h-8 text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Admin Recipe Management</h1>
                  <p className="text-sm text-white/80">
                    {totalCount} total recipes | {recipesWithImages} with images | {recipesWithoutImages} without images
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-white text-amber-700 rounded-lg hover:bg-white/90 transition flex items-center gap-2 font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
                <Link href="/" className="text-sm text-white/70 hover:text-white transition">
                  ← Back to Site
                </Link>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-white/20">
              <Link
                href="/admin/recipes"
                className="px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white font-medium rounded-t-lg transition"
              >
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Recipe Library
                </div>
              </Link>
              <Link
                href="/admin/database"
                className="px-6 py-3 bg-white/30 text-white font-semibold rounded-t-lg border-b-2 border-white"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Database View
                </div>
              </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60"
                  />
                </div>
              </div>

              <select
                value={dietFilter}
                onChange={(e) => setDietFilter(e.target.value)}
                className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
              >
                <option value="" className="text-gray-900">All Diet Plans</option>
                {dietTypes.map(diet => (
                  <option key={diet} value={diet} className="text-gray-900">
                    {diet.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </option>
                ))}
              </select>

              <select
                value={imageFilter}
                onChange={(e) => setImageFilter(e.target.value)}
                className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
              >
                <option value="all" className="text-gray-900">All Recipes</option>
                <option value="with" className="text-gray-900">With Images</option>
                <option value="without" className="text-gray-900">Without Images</option>
              </select>

              <div className="text-sm text-white/90 flex items-center px-3 bg-white/20 rounded-lg">
                Showing: {filteredRecipes.length} recipes
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Database Table */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Diet Plans</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Servings</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Difficulty</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Calories</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecipes.map((recipe) => (
                  <tr key={recipe.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      {recipe.image_url ? (
                        <img
                          src={recipe.image_url}
                          alt={recipe.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-xs">
                        <p className="font-medium text-gray-900 truncate">{recipe.name}</p>
                        <p className="text-xs text-gray-500 truncate">{recipe.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {recipe.diet_plan_names.slice(0, 2).map((diet) => (
                          <span
                            key={diet.slug}
                            className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs"
                          >
                            {diet.name}
                          </span>
                        ))}
                        {recipe.diet_plan_names.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{recipe.diet_plan_names.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {recipe.prep_time + recipe.cook_time}m
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {recipe.servings}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs capitalize">
                        {recipe.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {recipe.recipe_nutrition?.[0]?.calories || 0}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(recipe.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedRecipe(recipe)}
                          className="p-1 text-teal-600 hover:bg-teal-50 rounded transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRecipe(recipe.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                          title="Delete Recipe"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
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
              <div className="relative w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Database className="w-32 h-32 text-gray-400" />
              </div>
            )}

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedRecipe.name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">ID: {selectedRecipe.id}</p>
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

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <p><strong>Created:</strong> {new Date(selectedRecipe.created_at).toLocaleString()}</p>
                <p className="mt-2"><strong>Image URL:</strong> {selectedRecipe.image_url || 'No image'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
