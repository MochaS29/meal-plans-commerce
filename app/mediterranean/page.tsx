'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Fish, Leaf, Heart, Clock, Calendar, CheckCircle, ChefHat, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react'

const nutritionPrinciples = [
  { item: 'Olive Oil', description: 'Primary fat source', icon: '🫒' },
  { item: 'Fish', description: '2-3 times per week', icon: '🐟' },
  { item: 'Legumes', description: 'Daily intake', icon: '🌰' },
  { item: 'Vegetables', description: '5-7 servings daily', icon: '🥗' },
  { item: 'Fruits', description: '3-4 servings daily', icon: '🍊' },
  { item: 'Whole Grains', description: 'Daily consumption', icon: '🌾' },
  { item: 'Nuts', description: '1oz daily', icon: '🥜' }
]

const sampleRecipes = [
  {
    name: 'Greek Yogurt Parfait with Honey & Walnuts',
    time: '10 min',
    calories: 320,
    difficulty: 'Easy',
    tags: ['Breakfast', 'No-Cook', 'Protein-Rich']
  },
  {
    name: 'Mediterranean Chickpea Salad',
    time: '20 min',
    calories: 385,
    difficulty: 'Easy',
    tags: ['Lunch', 'High-Protein', 'Fiber-Rich']
  },
  {
    name: 'Herb-Crusted Salmon with Roasted Vegetables',
    time: '40 min',
    calories: 425,
    difficulty: 'Medium',
    tags: ['Dinner', 'Omega-3', 'Heart-Healthy']
  }
]

const weeklyThemes = [
  { day: 'Monday', theme: 'Classic Greek', flag: '🇬🇷' },
  { day: 'Tuesday', theme: 'Italian Inspired', flag: '🇮🇹' },
  { day: 'Wednesday', theme: 'Spanish Tapas', flag: '🇪🇸' },
  { day: 'Thursday', theme: 'Turkish & Middle Eastern', flag: '🇹🇷' },
  { day: 'Friday', theme: 'French Riviera', flag: '🇫🇷' },
  { day: 'Saturday', theme: 'Family Feast', flag: '🎉' },
  { day: 'Sunday', theme: 'Simple Restorative', flag: '🌿' }
]

const seasonalHighlights = {
  spring: ['Asparagus', 'Artichokes', 'Fresh Peas', 'Spring Herbs'],
  summer: ['Tomatoes', 'Zucchini', 'Eggplant', 'Fresh Basil'],
  fall: ['Squash', 'Pomegranates', 'Figs', 'Walnuts'],
  winter: ['Citrus Fruits', 'Winter Greens', 'Beans', 'Root Vegetables']
}

export default function MediterraneanPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedSeason, setSelectedSeason] = useState('summer')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/images/mediterranean-feast.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              World's Healthiest Diet
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Mediterranean Cuisine Plans
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Experience the timeless flavors and proven health benefits of authentic Mediterranean cooking
              with our chef-designed 30-day meal plans
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/checkout?product=wellness-transformation&type=mediterranean"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-semibold"
              >
                Start Mediterranean Journey - $79
              </Link>
              <button
                onClick={() => setActiveTab('sample')}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                View Sample Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 border-b overflow-x-auto">
            {['overview', 'principles', 'sample', 'calendar', 'seasonal'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 capitalize font-medium text-sm border-b-2 transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'sample' ? 'Sample Recipes' : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <Heart className="h-8 w-8 text-red-500 mr-3" />
                  <h3 className="text-2xl font-bold">Heart-Healthy Benefits</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Scientifically proven to reduce heart disease risk by up to 30% with omega-3 rich foods and healthy fats
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Lower cholesterol naturally</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Reduce inflammation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Improve blood pressure</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold">Fresh & Sustainable</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Based on fresh, seasonal ingredients with minimal processing and maximum flavor
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Locally sourced ingredients</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Plant-forward approach</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Sustainable seafood choices</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Nutrition Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Your Daily Nutrition Targets</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1800</div>
                  <div className="text-sm text-gray-600">Daily Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">45-50%</div>
                  <div className="text-sm text-gray-600">Carbs (Complex)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">30-35%</div>
                  <div className="text-sm text-gray-600">Healthy Fats</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">25-35g</div>
                  <div className="text-sm text-gray-600">Daily Fiber</div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">What's Included</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">30-Day Calendar</h4>
                  <p className="text-sm text-gray-600">Themed daily menus with cultural variety</p>
                </div>
                <div className="text-center">
                  <ShoppingCart className="h-12 w-12 text-amber-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Smart Shopping Lists</h4>
                  <p className="text-sm text-gray-600">Organized by category with cost estimates</p>
                </div>
                <div className="text-center">
                  <ChefHat className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Chef-Designed Recipes</h4>
                  <p className="text-sm text-gray-600">60+ authentic recipes with variations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Principles Tab */}
        {activeTab === 'principles' && (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Mediterranean Diet Principles</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these evidence-based guidelines for optimal health benefits
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nutritionPrinciples.map((principle, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="text-4xl mb-4">{principle.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{principle.item}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">The Mediterranean Pyramid</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 mb-2">Daily (Base of Pyramid)</h4>
                  <p className="text-gray-600">Whole grains, fruits, vegetables, beans, herbs, spices, nuts, olive oil</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-amber-700 mb-2">2-3 Times Per Week</h4>
                  <p className="text-gray-600">Fish and seafood, poultry, eggs, yogurt and cheese</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-red-700 mb-2">Occasionally</h4>
                  <p className="text-gray-600">Red meat and sweets (limited portions)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Recipes Tab */}
        {activeTab === 'sample' && (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Sample Mediterranean Recipes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A taste of what's included in your 30-day meal plan
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {sampleRecipes.map((recipe, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-amber-400"></div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      {recipe.time} • {recipe.calories} cal • {recipe.difficulty}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Featured Recipe: Greek Yogurt Parfait</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Ingredients (Serves 2)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 1 cup Greek yogurt, plain</li>
                    <li>• 2 tbsp honey</li>
                    <li>• 1/4 cup walnuts, chopped</li>
                    <li>• 1/2 cup fresh berries, mixed</li>
                    <li>• 1/2 tsp cinnamon</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Instructions</h4>
                  <ol className="space-y-2 text-gray-600">
                    <li>1. Layer half the Greek yogurt in a bowl</li>
                    <li>2. Drizzle with 1 tbsp honey</li>
                    <li>3. Add half the berries and walnuts</li>
                    <li>4. Repeat layers</li>
                    <li>5. Sprinkle with cinnamon and serve</li>
                  </ol>
                </div>
              </div>
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Nutrition per serving:</strong> 320 calories • 18g protein • 28g carbs • 16g fat • 4g fiber
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-amber-600 rounded-xl p-6 text-white text-center">
              <p className="mb-4">Want access to all 60+ recipes with complete nutritional information?</p>
              <Link
                href="/checkout?product=wellness-transformation&type=mediterranean"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Get Full Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Weekly Culinary Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the diverse flavors of the Mediterranean region with themed daily menus
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-6">Week 1: Mediterranean Foundations</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weeklyThemes.map((day, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{day.day}</h4>
                      <span className="text-2xl">{day.flag}</span>
                    </div>
                    <p className="text-sm text-gray-600">{day.theme}</p>
                    <div className="mt-3 text-xs space-y-1">
                      <div className="text-gray-500">B: Greek Yogurt Parfait</div>
                      <div className="text-gray-500">L: Chickpea Salad</div>
                      <div className="text-gray-500">D: Herb-Crusted Salmon</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">Sunday Meal Prep</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Cook grains in bulk (30 min)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Wash and chop vegetables (45 min)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Prepare herb oils & dressings (20 min)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Portion snacks (15 min)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Shopping Estimate</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekly groceries (2 people)</span>
                    <span className="font-semibold">$85-95</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pantry staples (monthly)</span>
                    <span className="font-semibold">$40-50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fresh herbs & spices</span>
                    <span className="font-semibold">$15-20</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total Weekly Average</span>
                    <span className="text-green-600">$95-105</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seasonal Tab */}
        {activeTab === 'seasonal' && (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Seasonal Mediterranean Eating</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Embrace the Mediterranean tradition of eating with the seasons for peak flavor and nutrition
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-center space-x-4 mb-6">
                {Object.keys(seasonalHighlights).map((season) => (
                  <button
                    key={season}
                    onClick={() => setSelectedSeason(season)}
                    className={`px-4 py-2 rounded-lg capitalize transition ${
                      selectedSeason === season
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 capitalize">{selectedSeason} Highlights</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {seasonalHighlights[selectedSeason as keyof typeof seasonalHighlights].map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg p-3">
                        <Sparkles className="h-4 w-4 text-amber-600 mb-1" />
                        <p className="text-sm font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Featured {selectedSeason} Recipe</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">
                      {selectedSeason === 'spring' && 'Asparagus & Pea Risotto'}
                      {selectedSeason === 'summer' && 'Fresh Tomato & Basil Bruschetta'}
                      {selectedSeason === 'fall' && 'Roasted Squash with Pomegranate'}
                      {selectedSeason === 'winter' && 'Citrus & Winter Greens Salad'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      A perfect representation of {selectedSeason} flavors, using the freshest seasonal ingredients
                      for maximum taste and nutrition.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Start Your Mediterranean Journey Today</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Join thousands who have discovered the delicious path to better health through Mediterranean cuisine
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/checkout?product=wellness-transformation&type=mediterranean"
                  className="inline-flex items-center px-8 py-3 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition font-semibold"
                >
                  Get Your 30-Day Plan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/meal-prep"
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition font-semibold"
                >
                  Learn Meal Prep Strategies
                </Link>
              </div>
              <p className="text-sm mt-4 opacity-90">30-day money-back guarantee • Cancel anytime</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}