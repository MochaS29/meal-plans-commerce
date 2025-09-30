'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Check, Printer, Download, Calendar, ChefHat, Sparkles, Apple, Leaf, Fish, Package } from 'lucide-react'
import Link from 'next/link'
import CheckoutButton from '@/components/CheckoutButton'

interface ShoppingItem {
  id: string
  name: string
  quantity: string
  category: 'produce' | 'proteins' | 'pantry' | 'dairy' | 'herbs'
  checked?: boolean
}

const weeklyShoppingList: { [key: string]: ShoppingItem[] } = {
  produce: [
    { id: '1', name: 'Tomatoes (cherry)', quantity: '2 lbs', category: 'produce' },
    { id: '2', name: 'Cucumbers', quantity: '4 large', category: 'produce' },
    { id: '3', name: 'Red onions', quantity: '3 medium', category: 'produce' },
    { id: '4', name: 'Bell peppers (red & yellow)', quantity: '4 total', category: 'produce' },
    { id: '5', name: 'Lemons', quantity: '8 large', category: 'produce' },
    { id: '6', name: 'Garlic', quantity: '2 heads', category: 'produce' },
    { id: '7', name: 'Baby spinach', quantity: '2 bags (5 oz)', category: 'produce' },
    { id: '8', name: 'Arugula', quantity: '1 bag (5 oz)', category: 'produce' },
    { id: '9', name: 'Eggplant', quantity: '2 medium', category: 'produce' },
    { id: '10', name: 'Zucchini', quantity: '3 medium', category: 'produce' },
  ],
  proteins: [
    { id: '11', name: 'Wild salmon fillets', quantity: '1.5 lbs', category: 'proteins' },
    { id: '12', name: 'Chicken breasts', quantity: '2 lbs', category: 'proteins' },
    { id: '13', name: 'Ground turkey (93% lean)', quantity: '1 lb', category: 'proteins' },
    { id: '14', name: 'Eggs', quantity: '1 dozen', category: 'proteins' },
    { id: '15', name: 'White fish (cod/halibut)', quantity: '1 lb', category: 'proteins' },
    { id: '16', name: 'Canned tuna (in water)', quantity: '3 cans', category: 'proteins' },
  ],
  pantry: [
    { id: '17', name: 'Extra virgin olive oil', quantity: '1 bottle (500ml)', category: 'pantry' },
    { id: '18', name: 'Chickpeas (canned)', quantity: '3 cans', category: 'pantry' },
    { id: '19', name: 'Cannellini beans', quantity: '2 cans', category: 'pantry' },
    { id: '20', name: 'Green lentils', quantity: '1 lb', category: 'pantry' },
    { id: '21', name: 'Quinoa', quantity: '1 lb', category: 'pantry' },
    { id: '22', name: 'Whole wheat bread', quantity: '1 loaf', category: 'pantry' },
    { id: '23', name: 'Kalamata olives', quantity: '1 jar', category: 'pantry' },
    { id: '24', name: 'Capers', quantity: '1 jar', category: 'pantry' },
    { id: '25', name: 'Red wine vinegar', quantity: '1 bottle', category: 'pantry' },
    { id: '26', name: 'Honey (Greek thyme)', quantity: '1 jar', category: 'pantry' },
    { id: '27', name: 'Almonds (raw)', quantity: '1 lb', category: 'pantry' },
    { id: '28', name: 'Walnuts', quantity: '1/2 lb', category: 'pantry' },
    { id: '29', name: 'Pine nuts', quantity: '4 oz', category: 'pantry' },
  ],
  dairy: [
    { id: '30', name: 'Greek yogurt (plain, 0%)', quantity: '2 large containers', category: 'dairy' },
    { id: '31', name: 'Feta cheese (block)', quantity: '1 lb', category: 'dairy' },
    { id: '32', name: 'Fresh mozzarella', quantity: '8 oz', category: 'dairy' },
    { id: '33', name: 'Parmesan cheese', quantity: '8 oz', category: 'dairy' },
    { id: '34', name: 'Ricotta (part-skim)', quantity: '1 container', category: 'dairy' },
    { id: '35', name: 'Cottage cheese (low-fat)', quantity: '1 container', category: 'dairy' },
  ],
  herbs: [
    { id: '36', name: 'Fresh basil', quantity: '2 bunches', category: 'herbs' },
    { id: '37', name: 'Fresh parsley', quantity: '2 bunches', category: 'herbs' },
    { id: '38', name: 'Fresh dill', quantity: '1 bunch', category: 'herbs' },
    { id: '39', name: 'Fresh mint', quantity: '1 bunch', category: 'herbs' },
    { id: '40', name: 'Fresh oregano', quantity: '1 package', category: 'herbs' },
    { id: '41', name: 'Dried oregano', quantity: '1 jar', category: 'herbs' },
    { id: '42', name: 'Dried thyme', quantity: '1 jar', category: 'herbs' },
  ]
}

const categoryInfo = {
  produce: { icon: <Apple className="w-5 h-5" />, color: 'bg-teal-600', lightColor: 'bg-teal-50' },
  proteins: { icon: <Fish className="w-5 h-5" />, color: 'bg-amber-600', lightColor: 'bg-amber-50' },
  pantry: { icon: <Package className="w-5 h-5" />, color: 'bg-gray-600', lightColor: 'bg-gray-50' },
  dairy: { icon: <Package className="w-5 h-5" />, color: 'bg-teal-700', lightColor: 'bg-teal-50' },
  herbs: { icon: <Leaf className="w-5 h-5" />, color: 'bg-amber-700', lightColor: 'bg-amber-50' }
}

export default function ShoppingListPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [selectedWeek, setSelectedWeek] = useState('Week 1')

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const getProgress = () => {
    const totalItems = Object.values(weeklyShoppingList).flat().length
    return Math.round((checkedItems.size / totalItems) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-teal-600 to-amber-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 text-white/80 hover:text-white transition">
            <Sparkles className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <span>Weekly Shopping Lists</span>
            </h1>
            <p className="text-xl text-white/90 ml-16">
              Organized by grocery store sections for efficient shopping
            </p>
          </motion.div>
        </div>
      </header>

      {/* Week Selector */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">September 2025 - {selectedWeek}</h2>
              <p className="text-gray-600">Mediterranean Diet 30-Day Challenge</p>
            </div>
            <div className="flex gap-2">
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(week => (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    selectedWeek === week
                      ? 'bg-gradient-to-r from-teal-500 to-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {week}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Shopping Progress</span>
              <span className="text-sm font-semibold text-gray-700">{getProgress()}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-teal-500 to-amber-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-teal-500 text-teal-700 rounded-full font-semibold hover:bg-teal-50 transition">
              <Printer className="w-5 h-5" />
              Print List
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-full font-semibold hover:bg-amber-200 transition">
              <Calendar className="w-5 h-5" />
              View Meal Calendar
            </button>
          </div>
        </motion.div>

        {/* Shopping Lists by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(weeklyShoppingList).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
            >
              <div className={`${categoryInfo[category as keyof typeof categoryInfo].color} text-white p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    {categoryInfo[category as keyof typeof categoryInfo].icon}
                  </div>
                  <h3 className="text-xl font-bold capitalize">{category}</h3>
                </div>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {items.length} items
                </span>
              </div>

              <div className="p-4">
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer ${
                        checkedItems.has(item.id) ? 'bg-gray-50 opacity-60' : ''
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                          checkedItems.has(item.id)
                            ? 'bg-teal-500 border-teal-500'
                            : 'border-gray-300 hover:border-teal-400'
                        }`}>
                          {checkedItems.has(item.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className={`font-medium ${checkedItems.has(item.id) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        categoryInfo[category as keyof typeof categoryInfo].lightColor
                      } ${checkedItems.has(item.id) ? 'text-gray-400' : ''}`}>
                        {item.quantity}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shopping Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-mindlab-purple-100"
        >
          <h3 className="text-2xl font-bold text-mindlab-purple-800 mb-6 flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-mindlab-purple-500" />
            Smart Shopping Tips
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-mindlab-purple-50 rounded-xl p-6">
              <h4 className="font-bold text-mindlab-purple-700 mb-3">💰 Budget Savers</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Buy olive oil in bulk - you'll use 2-3 tbsp daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Frozen fish is often fresher and more affordable</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Stock up on canned beans when on sale</span>
                </li>
              </ul>
            </div>

            <div className="bg-mindlab-teal-50 rounded-xl p-6">
              <h4 className="font-bold text-mindlab-teal-700 mb-3">🥬 Freshness Guide</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-purple-500 mt-0.5 flex-shrink-0" />
                  <span>Shop for produce twice weekly for peak freshness</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-purple-500 mt-0.5 flex-shrink-0" />
                  <span>Store herbs with stems in water like flowers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-purple-500 mt-0.5 flex-shrink-0" />
                  <span>Buy fish the day you plan to cook it</span>
                </li>
              </ul>
            </div>

            <div className="bg-mindlab-coral-50 rounded-xl p-6">
              <h4 className="font-bold text-mindlab-coral-700 mb-3">🏪 Store Navigation</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-purple-500 mt-0.5 flex-shrink-0" />
                  <span>Shop perimeter first: produce, dairy, proteins</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-purple-500 mt-0.5 flex-shrink-0" />
                  <span>International aisle for authentic ingredients</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-purple-500 mt-0.5 flex-shrink-0" />
                  <span>Bulk bins for nuts and grains</span>
                </li>
              </ul>
            </div>

            <div className="bg-mindlab-pink-50 rounded-xl p-6">
              <h4 className="font-bold text-mindlab-pink-700 mb-3">⏰ Time Savers</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Pre-wash greens when you get home</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Batch prep garlic and freeze in ice cube trays</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-mindlab-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Sunday prep: chop vegetables for 3 days</span>
                </li>
              </ul>
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
          <h3 className="text-2xl font-bold text-mindlab-purple-800 mb-4">
            Get Complete Shopping Lists for All 30 Days
          </h3>
          <p className="text-gray-600 mb-6">
            Plus recipes, meal prep guides, and nutritional tracking
          </p>
          <CheckoutButton
            productId="wellness-transformation"
            className="text-xl shadow-xl"
          >
            <Sparkles className="w-6 h-6" />
            Get Your Complete Package - $79
            <Sparkles className="w-6 h-6" />
          </CheckoutButton>
        </motion.div>
      </section>
    </div>
  )
}