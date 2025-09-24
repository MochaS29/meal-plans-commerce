'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Clock, Users, Flame, Heart, Star, Download, Printer, Search, Filter, Sparkles, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Recipe {
  id: string
  name: string
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  prepTime: number
  cookTime: number
  servings: number
  calories: number
  difficulty: 'easy' | 'medium' | 'hard'
  image?: string
  description: string
  tags: string[]
  featured?: boolean
}

const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Greek Village Salad (Horiatiki)',
    category: 'lunch',
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    calories: 380,
    difficulty: 'easy',
    description: 'Authentic Greek salad with ripe tomatoes, crisp cucumber, tangy feta, and Kalamata olives',
    tags: ['vegetarian', 'gluten-free', 'quick'],
    featured: true
  },
  {
    id: '2',
    name: 'Mediterranean Herb Chicken',
    category: 'dinner',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    calories: 380,
    difficulty: 'easy',
    description: 'Juicy chicken breasts marinated in olive oil, lemon, and aromatic Mediterranean herbs',
    tags: ['high-protein', 'gluten-free', 'family-friendly'],
    featured: true
  },
  {
    id: '3',
    name: 'Shakshuka',
    category: 'breakfast',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    calories: 310,
    difficulty: 'medium',
    description: 'North African eggs poached in spiced tomato sauce with peppers and aromatic spices',
    tags: ['vegetarian', 'spicy', 'one-pan']
  },
  {
    id: '4',
    name: 'Greek Yogurt with Thyme Honey',
    category: 'breakfast',
    prepTime: 3,
    cookTime: 0,
    servings: 1,
    calories: 280,
    difficulty: 'easy',
    description: 'Creamy Greek yogurt drizzled with golden thyme honey, walnuts, and a touch of olive oil',
    tags: ['vegetarian', 'quick', 'high-protein']
  },
  {
    id: '5',
    name: 'Mediterranean Lentil Soup',
    category: 'lunch',
    prepTime: 15,
    cookTime: 35,
    servings: 6,
    calories: 280,
    difficulty: 'easy',
    description: 'Hearty and nutritious soup with green lentils, vegetables, and Mediterranean spices',
    tags: ['vegan', 'high-fiber', 'meal-prep']
  },
  {
    id: '6',
    name: 'Grilled Mediterranean Salmon',
    category: 'dinner',
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    calories: 450,
    difficulty: 'easy',
    description: 'Wild salmon with lemon, dill, and olive oil, grilled to perfection',
    tags: ['omega-3', 'gluten-free', 'quick']
  },
  {
    id: '7',
    name: 'Hummus with Crudités',
    category: 'snack',
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    calories: 120,
    difficulty: 'easy',
    description: 'Creamy homemade hummus served with fresh vegetable sticks',
    tags: ['vegan', 'gluten-free', 'party']
  },
  {
    id: '8',
    name: 'Ricotta Pancakes Sicilian Style',
    category: 'breakfast',
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    calories: 290,
    difficulty: 'medium',
    description: 'Fluffy ricotta pancakes with lemon zest and fresh berries',
    tags: ['vegetarian', 'weekend-brunch']
  }
]

const categoryColors = {
  breakfast: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  lunch: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  dinner: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  snack: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' }
}

const difficultyColors = {
  easy: 'text-green-600',
  medium: 'text-yellow-600',
  hard: 'text-red-600'
}

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  // Add ESC key handler for closing modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedRecipe) {
        setSelectedRecipe(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [selectedRecipe])

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-teal-50">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-teal-500 text-white shadow-xl">
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
              50+ delicious recipes from around the world
            </p>
          </motion.div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-purple-100"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search recipes or ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-mindlab-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition capitalize ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white'
                      : 'bg-purple-100 text-gray-900 hover:bg-purple-200'
                  }`}
                >
                  {category === 'all' ? 'All Recipes' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-700 font-medium">Popular tags:</span>
            {['quick', 'vegetarian', 'high-protein', 'gluten-free', 'family-friendly'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 bg-teal-100 text-gray-900 rounded-full text-sm hover:bg-teal-200 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Recipes */}
        {!searchQuery && selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">⭐ Featured Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes.filter(r => r.featured).map((recipe, idx) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-purple-200 hover:border-mindlab-teal-300 transition cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-teal-500 h-48 flex items-center justify-center">
                    <ChefHat className="w-20 h-20 text-white/30" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{recipe.name}</h3>
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-gray-800 mb-4">{recipe.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[recipe.category].bg} ${categoryColors[recipe.category].text}`}>
                        {recipe.category}
                      </span>
                      <span className={`text-sm font-semibold ${difficultyColors[recipe.difficulty]}`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-700 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.prepTime + recipe.cookTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {recipe.servings} servings
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {recipe.calories} cal
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recipe Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {selectedCategory === 'all' ? 'All Recipes' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Recipes`}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, idx) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition cursor-pointer group"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="h-40 bg-gradient-to-br from-purple-100 to-teal-100 flex items-center justify-center relative overflow-hidden">
                  <ChefHat className="w-16 h-16 text-white/30 group-hover:scale-110 transition" />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[recipe.category].bg} ${categoryColors[recipe.category].text} ${categoryColors[recipe.category].border} border`}>
                      {recipe.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-teal-600 transition">
                    {recipe.name}
                  </h3>

                  <p className="text-gray-800 text-sm mb-3 line-clamp-2">{recipe.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recipe.prepTime + recipe.cookTime}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {recipe.servings}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {recipe.calories}
                    </span>
                    <span className={`font-semibold ${difficultyColors[recipe.difficulty]}`}>
                      {recipe.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {recipe.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recipe Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-purple-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What's Included in Your Recipe Collection
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white">
                <span className="text-2xl font-bold">50+</span>
              </div>
              <h4 className="font-bold text-gray-900">Recipes</h4>
              <p className="text-sm text-gray-800">Global cuisines</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-mindlab-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900">Quick Meals</h4>
              <p className="text-sm text-gray-800">Under 30 minutes</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-mindlab-coral-400 to-coral-600 rounded-full flex items-center justify-center text-white">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900">Heart Healthy</h4>
              <p className="text-sm text-gray-800">Nutritionally balanced</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-mindlab-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900">Family Friendly</h4>
              <p className="text-sm text-gray-800">Kids love them too</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-3">Every Recipe Includes:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Step-by-step instructions with photos',
                'Complete nutritional information',
                'Prep & cooking times',
                'Serving size adjustments',
                'Storage & reheating instructions',
                'Wine pairing suggestions',
                'Substitution options for allergies',
                'Traditional cooking tips'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Get All 50+ Recipes with Your Meal Plan
          </h3>
          <p className="text-gray-800 mb-6">
            Includes printable recipe cards, video tutorials, and lifetime updates
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition"
          >
            <Sparkles className="w-6 h-6" />
            Get Your Complete Package - $79
            <Sparkles className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>

      {/* Recipe Modal (simplified) */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRecipe(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
              aria-label="Close recipe"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 pr-12">{selectedRecipe.name}</h2>
            <p className="text-gray-800 mb-6">{selectedRecipe.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                <strong>Total Time:</strong> {selectedRecipe.prepTime + selectedRecipe.cookTime} minutes
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-500" />
                <strong>Servings:</strong> {selectedRecipe.servings}
              </span>
              <span className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-coral-500" />
                <strong>Calories:</strong> {selectedRecipe.calories} per serving
              </span>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-700 mb-3 font-medium">Click outside or press ESC to close</p>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-full font-semibold hover:opacity-90 transition"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}