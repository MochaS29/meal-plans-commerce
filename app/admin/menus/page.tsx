'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash, Calendar, ChefHat } from 'lucide-react'

// Simple admin interface for managing meal plans
// In production, add authentication to protect this route

export default function MenuAdminPage() {
  const [dietPlans, setDietPlans] = useState<any[]>([])
  const [recipes, setRecipes] = useState<any[]>([])
  const [selectedDiet, setSelectedDiet] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    if (!supabase) {
      console.log('Supabase not configured')
      setLoading(false)
      return
    }

    try {
      // Load diet plans
      const { data: plans } = await supabase
        .from('diet_plans')
        .select('*')
        .order('name')

      // Load recipes
      const { data: recipeList } = await supabase
        .from('recipes')
        .select('*')
        .order('name')

      setDietPlans(plans || [])
      setRecipes(recipeList || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-yellow-900 mb-2">Database Not Configured</h2>
            <p className="text-yellow-700">
              To use the menu admin, set up Supabase following the SETUP_GUIDE.md
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-teal-600" />
            Menu Management
          </h1>
          <p className="text-gray-600 mt-2">
            Create and manage meal plans, recipes, and shopping lists
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-teal-600">{dietPlans.length}</div>
            <div className="text-gray-600">Diet Plans</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-amber-600">{recipes.length}</div>
            <div className="text-gray-600">Recipes</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-gray-600">Active Plans</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-gray-600">This Month</div>
          </div>
        </div>

        {/* Recipes Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recipe Library</h2>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Recipe
            </button>
          </div>

          {recipes.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No recipes yet</p>
              <p className="text-sm text-gray-500 mt-1">Start by adding your first recipe</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map(recipe => (
                <div key={recipe.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">{recipe.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <span>⏱ {recipe.prep_time}min</span>
                    <span>👥 {recipe.servings} servings</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Meal Plans Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Monthly Meal Plans</h2>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Create Plan
            </button>
          </div>

          <div className="mb-4">
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-auto"
            >
              <option value="">Select Diet Plan</option>
              {dietPlans.map(plan => (
                <option key={plan.id} value={plan.id}>{plan.name}</option>
              ))}
            </select>
          </div>

          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No meal plans created yet</p>
            <p className="text-sm text-gray-500 mt-1">Select a diet plan and create your first monthly calendar</p>
          </div>
        </div>
      </div>
    </div>
  )
}