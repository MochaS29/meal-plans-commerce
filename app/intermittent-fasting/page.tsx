'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, Calendar, ShoppingCart, ChefHat, TrendingUp, CheckCircle, ArrowRight, ChevronRight } from 'lucide-react'

const phases = [
  { week: 'Week 1', pattern: '16:8', eating: '12pm-8pm', fasting: '16 hours', difficulty: 'Foundation', theme: 'Mediterranean Foundation' },
  { week: 'Week 2', pattern: '16:8', eating: '12pm-8pm', fasting: '16 hours', difficulty: 'Convenience', theme: 'Convenience & Fish Focus' },
  { week: 'Week 3', pattern: '16:8', eating: '12pm-8pm', fasting: '16 hours', difficulty: 'Plant-Forward', theme: 'Plant-Forward Proteins' },
  { week: 'Week 4', pattern: '16:8', eating: '12pm-8pm', fasting: '16 hours', difficulty: 'Mastery', theme: 'Celebration & Sustainability' }
]

const sampleMeals = {
  breakFast: [
    { name: 'Green Anti-Inflammatory Smoothie', time: '12:00 PM', calories: 380, protein: 25, fiber: 12 },
    { name: 'Mediterranean Chickpea Salad', time: '12:00 PM', calories: 450, protein: 18, fiber: 12 },
    { name: 'Greek Yogurt with Berries & Nuts', time: '12:00 PM', calories: 320, protein: 20, fiber: 8 }
  ],
  snack: [
    { name: 'Hummus & Vegetables', time: '3:00 PM', calories: 193, protein: 6, fiber: 8 },
    { name: 'Hard-boiled Eggs with Avocado', time: '3:00 PM', calories: 280, protein: 12, fiber: 7 },
    { name: 'Cottage Cheese with Berries', time: '3:00 PM', calories: 130, protein: 14, fiber: 4 }
  ],
  dinner: [
    { name: 'Mediterranean Herb Chicken', time: '6:00 PM', calories: 620, protein: 45, fiber: 8 },
    { name: 'Baked Salmon with Sweet Potato', time: '6:00 PM', calories: 580, protein: 42, fiber: 10 },
    { name: 'Greek Meatballs with Quinoa', time: '6:00 PM', calories: 540, protein: 38, fiber: 9 }
  ]
}

export default function IntermittentFastingPage() {
  const [selectedPhase, setSelectedPhase] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/images/if-lifestyle.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 mb-4">
              16:8 Protocol • Anti-Inflammatory Focus
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Intermittent Fasting Plans
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Master the 16:8 fasting protocol with our anti-inflammatory Mediterranean approach.
              Designed for sustainable weight loss and optimal metabolic health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/checkout?product=wellness-transformation&type=if"
                className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition font-semibold"
              >
                Start Your IF Journey - $79
              </Link>
              <button
                onClick={() => setActiveTab('sample')}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                View Sample Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 border-b">
            {['overview', 'phases', 'sample', 'benefits'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 capitalize font-medium text-sm border-b-2 transition ${
                  activeTab === tab
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'sample' ? 'Sample Meals' : tab}
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
                  <Clock className="h-8 w-8 text-teal-600 mr-3" />
                  <h3 className="text-2xl font-bold">16:8 Fasting Protocol</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Eat from 12:00 PM to 8:00 PM, fast from 8:00 PM to 12:00 PM for optimal metabolic benefits
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Target 1-2 lbs weekly weight loss</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">1400-1450 daily calories optimized</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">80g+ protein for muscle preservation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <ChefHat className="h-8 w-8 text-amber-600 mr-3" />
                  <h3 className="text-2xl font-bold">Anti-Inflammatory Focus</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Mediterranean-inspired meals designed to reduce inflammation and optimize hormone balance
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Break-fast protein & fiber focus</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">15-22g daily fiber target</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Family-friendly dinner options</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-gradient-to-r from-teal-50 to-amber-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">What's Included</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-teal-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">30-Day IF Calendar</h4>
                  <p className="text-sm text-gray-600">Complete 16:8 schedule with themed weekly plans</p>
                </div>
                <div className="text-center">
                  <ShoppingCart className="h-12 w-12 text-amber-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Weekly Shopping Lists</h4>
                  <p className="text-sm text-gray-600">Organized by category with Sunday prep guides</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Success Metrics</h4>
                  <p className="text-sm text-gray-600">Track weight, energy, mood, and sleep quality</p>
                </div>
              </div>
            </div>

            {/* Daily Schedule */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">Your Daily IF Schedule</h3>
              <div className="max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">8:00 AM</span>
                    <span className="text-gray-600">☕ Black coffee/tea + morning supplements</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <span className="font-medium text-green-700">12:00 PM</span>
                    <span className="text-gray-700">🍽️ Break fast (protein + fiber focus)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <span className="font-medium">3:00 PM</span>
                    <span className="text-gray-600">🥗 Afternoon snack</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <span className="font-medium">6:00 PM</span>
                    <span className="text-gray-600">🍖 Family-friendly dinner</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <span className="font-medium">7:30 PM</span>
                    <span className="text-gray-600">🥜 Evening snack (optional)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-2 border-red-200">
                    <span className="font-medium text-red-700">8:00 PM</span>
                    <span className="text-gray-700">⏰ Begin 16-hour fast</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>During Fasting:</strong> Black coffee, green tea, herbal teas, and water are allowed
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phases Tab */}
        {activeTab === 'phases' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your 4-Week IF Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each week follows the proven 16:8 protocol with different themes to keep your meals exciting
                and nutritionally optimized for anti-inflammatory benefits
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phases.map((phase, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhase(index)}
                  className={`p-6 rounded-xl border-2 transition text-left ${
                    selectedPhase === index
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-lg mb-2">{phase.week}</div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">{phase.pattern}</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Eating: {phase.eating}</div>
                    <div>Fasting: {phase.fasting}</div>
                  </div>
                  <div className={`mt-3 inline-block px-2 py-1 rounded text-xs font-medium ${
                    phase.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    phase.difficulty === 'Easy' ? 'bg-blue-100 text-blue-700' :
                    phase.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {phase.difficulty}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4">{phases[selectedPhase].week}: {phases[selectedPhase].theme}</h3>
              <div className="prose max-w-none text-gray-600">
                <p>
                  Throughout this week, you'll follow the {phases[selectedPhase].pattern} pattern,
                  eating between {phases[selectedPhase].eating} and fasting for {phases[selectedPhase].fasting}.
                </p>
                <p className="mt-4">
                  <strong>Weekly Focus:</strong> {phases[selectedPhase].theme}
                </p>
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm">
                    <strong>Daily Targets:</strong> 1400-1450 calories • 80g+ protein • 15-22g fiber
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Meals Tab */}
        {activeTab === 'sample' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Sample Daily Meals</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience how our meals adapt to your fasting schedule throughout the program
              </p>
            </div>

            <div className="space-y-6">
              {Object.entries(sampleMeals).map(([mealType, meals]) => (
                <div key={mealType} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3">
                    <h3 className="text-xl font-semibold text-white capitalize">
                      {mealType === 'breakFast' ? 'Break-Fast (12 PM)' : mealType === 'snack' ? 'Afternoon Snack (3 PM)' : 'Dinner (6 PM)'}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      {meals.map((meal, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                          <div className="font-semibold text-gray-900 mb-2">{meal.name}</div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {meal.time}
                            </div>
                            <div>{meal.calories} cal</div>
                            <div className="text-xs">{meal.protein}g protein • {meal.fiber}g fiber</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-teal-50 rounded-xl p-6 text-center">
              <p className="text-gray-700 mb-4">
                Want to see the full 30-day IF schedule with meal plans?
              </p>
              <Link
                href="/checkout?product=wellness-transformation&type=if"
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold"
              >
                Get Instant Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Transform Your Wellness</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover how Intermittent Fasting can transform your metabolism and overall wellness
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-teal-600">Metabolic Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Enhanced Fat Burning</div>
                      <div className="text-sm text-gray-600">16:8 fasting optimizes ketosis while healthy fats provide sustained energy</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Improved Insulin Sensitivity</div>
                      <div className="text-sm text-gray-600">Regulated eating windows combined with balanced, nutrient-dense meals</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Cellular Autophagy</div>
                      <div className="text-sm text-gray-600">Extended fasting periods trigger cellular renewal and detoxification</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-amber-600">Lifestyle Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Simplified Meal Planning</div>
                      <div className="text-sm text-gray-600">Fewer meals means less prep time, with batch-cooking strategies included</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Mental Clarity</div>
                      <div className="text-sm text-gray-600">Stable blood sugar from IF plus brain-boosting nutrients</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Sustainable Results</div>
                      <div className="text-sm text-gray-600">Gradual progression ensures lasting lifestyle changes, not temporary fixes</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Life?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Join thousands who have discovered the power of Intermittent Fasting for sustainable wellness
              </p>
              <Link
                href="/checkout?product=wellness-transformation&type=if"
                className="inline-flex items-center px-8 py-3 bg-white text-teal-700 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Start Your IF Journey
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <p className="text-sm mt-4 opacity-90">30-day money-back guarantee</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}