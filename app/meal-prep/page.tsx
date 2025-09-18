'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, ChefHat, Package, Utensils, Calendar, CheckCircle, AlertCircle, ArrowRight, Timer } from 'lucide-react'

const prepStrategies = [
  {
    title: 'Sunday Power Hour',
    time: '60-90 minutes',
    icon: Timer,
    color: 'teal',
    tasks: [
      'Wash and chop all vegetables for the week',
      'Cook grains and legumes in bulk',
      'Prepare 2-3 base sauces and dressings',
      'Portion out snacks and nuts',
      'Marinate proteins for Monday-Wednesday'
    ]
  },
  {
    title: 'Batch Cooking Basics',
    time: '2-3 hours',
    icon: Package,
    color: 'amber',
    tasks: [
      'Prepare 3-4 complete meals for freezing',
      'Make a large pot of soup or stew',
      'Bake proteins for multiple meals',
      'Prep breakfast items (overnight oats, egg muffins)',
      'Create versatile meal components'
    ]
  },
  {
    title: 'Quick Daily Prep',
    time: '15-20 minutes',
    icon: Clock,
    color: 'green',
    tasks: [
      'Assemble tomorrow\'s lunch',
      'Defrost proteins for next day',
      'Quick-pickle vegetables',
      'Mix fresh salad dressing',
      'Set up breakfast station'
    ]
  }
]

const ifMealPrepTips = [
  {
    phase: 'Week 1 (12:12)',
    tips: [
      'Prep three meals per day initially',
      'Focus on balanced macros in each meal',
      'Keep healthy snacks ready for eating window',
      'Prepare herbal teas for fasting hours'
    ]
  },
  {
    phase: 'Week 2 (14:10)',
    tips: [
      'Shift to larger, more satisfying meals',
      'Increase healthy fat content',
      'Prep nutrient-dense breakfast options',
      'Batch cook proteins for quick assembly'
    ]
  },
  {
    phase: 'Week 3 (15:9)',
    tips: [
      'Focus on two substantial meals',
      'Prep filling Mediterranean bowls',
      'Keep nuts and olives portioned',
      'Prepare electrolyte drinks for fasting'
    ]
  },
  {
    phase: 'Week 4 (16:8)',
    tips: [
      'Master the art of meal consolidation',
      'Prep one-pot Mediterranean meals',
      'Focus on meal timing optimization',
      'Keep breaking-fast foods gentle'
    ]
  }
]

const containerGuide = [
  { type: 'Glass Containers', best: 'Reheating, soups, sauces', quantity: '8-10 various sizes' },
  { type: 'BPA-Free Plastic', best: 'Salads, cold items, snacks', quantity: '6-8 containers' },
  { type: 'Mason Jars', best: 'Dressings, overnight oats, smoothies', quantity: '6-8 jars' },
  { type: 'Freezer Bags', best: 'Marinated proteins, frozen vegetables', quantity: '20-30 bags' },
  { type: 'Aluminum Foil Pans', best: 'Freezer meals, casseroles', quantity: '10-12 pans' }
]

export default function MealPrepPage() {
  const [activeTab, setActiveTab] = useState('strategies')

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🧠</span>
              </div>
              <span className="text-xl font-semibold text-amber-800">Mocha's MindLab</span>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/calendar" className="text-gray-600 hover:text-teal-600 transition">Calendar</Link>
              <Link href="/intermittent-fasting" className="text-gray-600 hover:text-amber-600 transition">IF Plan</Link>
              <Link href="/recipes" className="text-gray-600 hover:text-teal-600 transition">Recipes</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master Meal Prep
          </h1>
          <p className="text-xl text-teal-50 max-w-3xl mx-auto">
            Transform your wellness journey with strategic meal preparation techniques designed for busy lifestyles
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 border-b">
            {['strategies', 'if-guide', 'containers', 'shopping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 capitalize font-medium text-sm border-b-2 transition ${
                  activeTab === tab
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'if-guide' ? 'IF Meal Prep' : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Strategies Tab */}
        {activeTab === 'strategies' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Choose Your Prep Style</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Whether you prefer one big prep session or daily touch-ups, we have a strategy that fits your schedule
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {prepStrategies.map((strategy, index) => {
                const Icon = strategy.icon
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                    <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center`}
                         style={{ backgroundColor: strategy.color === 'teal' ? '#14b8a6' : strategy.color === 'amber' ? '#f59e0b' : '#10b981' }}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{strategy.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">Time needed: {strategy.time}</p>
                    <ul className="space-y-2">
                      {strategy.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="bg-amber-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-amber-800">Pro Tip: The Mediterranean Advantage</h3>
              <p className="text-gray-700 mb-4">
                Mediterranean cuisine is perfect for meal prep! Many dishes actually improve in flavor after a day or two,
                as herbs and spices meld together. Focus on:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Marinated vegetables and salads</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Slow-cooked stews and tagines</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Grain-based salads (tabbouleh, farro)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Hummus and other dips</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* IF Guide Tab */}
        {activeTab === 'if-guide' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">IF-Optimized Meal Prep</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Adapt your meal prep strategy as you progress through the IF phases
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {ifMealPrepTips.map((phase, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-teal-700 font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{phase.phase}</h3>
                  </div>
                  <ul className="space-y-2">
                    {phase.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-amber-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Breaking Your Fast Right</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-teal-700">Gentle Starters</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bone broth</li>
                    <li>• Greek yogurt</li>
                    <li>• Soft-cooked eggs</li>
                    <li>• Avocado</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-amber-700">30 Minutes Later</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Grilled proteins</li>
                    <li>• Cooked vegetables</li>
                    <li>• Whole grains</li>
                    <li>• Legumes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-700">Avoid Initially</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Raw vegetables</li>
                    <li>• Spicy foods</li>
                    <li>• Heavy meals</li>
                    <li>• Sugary items</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Containers Tab */}
        {activeTab === 'containers' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Container & Storage Guide</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The right containers make all the difference in keeping your prepped meals fresh and delicious
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-amber-600 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Essential Container Collection</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Container Type</th>
                        <th className="text-left py-2 px-4">Best For</th>
                        <th className="text-left py-2 px-4">Recommended Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {containerGuide.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{item.type}</td>
                          <td className="py-3 px-4 text-gray-600">{item.best}</td>
                          <td className="py-3 px-4 text-gray-600">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-teal-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-teal-800">Storage Timeline</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Refrigerator (3-5 days):</span>
                      <span className="text-gray-600 text-sm block">Cooked proteins, grains, roasted vegetables</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Refrigerator (5-7 days):</span>
                      <span className="text-gray-600 text-sm block">Soups, stews, marinated vegetables</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Freezer (2-3 months):</span>
                      <span className="text-gray-600 text-sm block">Casseroles, cooked beans, portioned meals</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">Labeling System</h3>
                <p className="text-gray-600 mb-3">Always label your containers with:</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">Contents/Recipe name</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">Date prepared</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">Use by date</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">Reheating instructions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Shopping Tab */}
        {activeTab === 'shopping' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Smart Shopping Strategies</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Save time and money with our organized approach to grocery shopping for meal prep
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Weekly Shopping Routine</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-teal-700 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Review Your Calendar</h4>
                    <p className="text-gray-600">Check your meal plan for the upcoming week and note any special ingredients needed</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-teal-700 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Inventory Check</h4>
                    <p className="text-gray-600">Review pantry, fridge, and freezer to avoid duplicate purchases</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-teal-700 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Organize by Store Layout</h4>
                    <p className="text-gray-600">Group items by department: produce, proteins, dairy, pantry, frozen</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-teal-700 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Shop Strategic Times</h4>
                    <p className="text-gray-600">Early morning or late evening for less crowds, mid-week for best selection</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">Mediterranean Pantry Staples</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-1">
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Extra virgin olive oil</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Canned tomatoes</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Dried herbs & spices</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Whole grains</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Legumes (dried/canned)</li>
                  </ul>
                  <ul className="space-y-1">
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Nuts & seeds</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Olives & capers</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Vinegars</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Honey</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>Dried fruits</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-teal-800">Money-Saving Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Buy proteins in bulk and portion at home</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Choose seasonal produce for best prices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Stock up on pantry staples during sales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Compare unit prices, not package prices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Consider frozen vegetables for prep efficiency</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-600 to-amber-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Master Meal Prep?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Get our complete meal prep system with done-for-you shopping lists, prep schedules, and storage guides
              </p>
              <Link
                href="/checkout?product=if-mediterranean"
                className="inline-flex items-center px-8 py-3 bg-white text-teal-700 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Get the Complete System
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}