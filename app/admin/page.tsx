'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users, DollarSign, TrendingUp, Package,
  Calendar, Settings, RefreshCw, Database,
  FileText, Home, LogOut, Bot, Shield, Book
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SalesData {
  totalRevenue: number
  totalCustomers: number
  activeSubscriptions: number
  monthlyRevenue: number
  recentPurchases: {
    email: string
    product: string
    amount: number
    date: string
  }[]
}

// Mock data for demonstration
const mockData: SalesData = {
  totalRevenue: 12847,
  totalCustomers: 187,
  activeSubscriptions: 43,
  monthlyRevenue: 2847,
  recentPurchases: [
    { email: 'john@example.com', product: 'Wellness Transformation', amount: 79, date: '2025-01-28' },
    { email: 'sarah@example.com', product: 'Monthly Calendar', amount: 29, date: '2025-01-28' },
    { email: 'mike@example.com', product: 'Mediterranean Plan', amount: 49, date: '2025-01-27' },
    { email: 'emma@example.com', product: 'Family Bundle', amount: 99, date: '2025-01-27' },
    { email: 'alex@example.com', product: 'Monthly Calendar', amount: 29, date: '2025-01-26' },
  ]
}

export default function AdminDashboard() {
  const [salesData, setSalesData] = useState<SalesData>(mockData)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [generatingRecipes, setGeneratingRecipes] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const response = await fetch('/api/admin/verify')
      if (response.ok) {
        setIsAdmin(true)
        fetchSalesData()
      } else {
        // Redirect to login page
        router.push('/admin/login')
      }
    } catch (error) {
      // Redirect to login page on error
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchSalesData = async () => {
    try {
      const response = await fetch('/api/admin/sales')
      if (response.ok) {
        const data = await response.json()
        setSalesData(data)
      }
    } catch (error) {
      console.error('Error fetching sales data:', error)
    }
  }

  const handleGenerateRecipes = async (dietType: string, months: number) => {
    setGeneratingRecipes(true)
    try {
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'single', // Start with single recipe for testing
          dietType,
          mealType: 'breakfast'
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert(`Successfully generated ${dietType} recipe: ${data.recipe?.name || 'Recipe created'}`)
        console.log('Generated recipe:', data)
      } else {
        alert(`Error: ${data.error || 'Failed to generate recipe'}`)
      }
    } catch (error) {
      console.error('Error generating recipes:', error)
      alert('Failed to generate recipes - check console for details')
    } finally {
      setGeneratingRecipes(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="animate-pulse text-lg text-amber-700">Loading admin dashboard...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need admin privileges to view this page.</p>
          <Link href="/" className="text-amber-600 hover:underline">Return to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-teal-700 text-white">
        <nav className="px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                <Home className="w-6 h-6" />
                Mocha's MindLab
              </Link>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hover:text-amber-200 transition">
                User Dashboard
              </Link>
              <button
                onClick={async () => {
                  await fetch('/api/admin/logout', { method: 'POST' })
                  router.push('/admin/login')
                }}
                className="hover:text-amber-200 transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </nav>

        <div className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-amber-100">Manage your meal plan business</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              ${salesData.totalRevenue.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-blue-600" />
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {salesData.totalCustomers}
            </h3>
            <p className="text-sm text-gray-600">Total Customers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-purple-600" />
              <RefreshCw className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {salesData.activeSubscriptions}
            </h3>
            <p className="text-sm text-gray-600">Active Subscriptions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-10 h-10 text-amber-600" />
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                This Month
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              ${salesData.monthlyRevenue.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
          </motion.div>
        </div>

        {/* Recent Purchases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Purchases</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Customer</th>
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Product</th>
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {salesData.recentPurchases.map((purchase, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-sm">{purchase.email}</td>
                    <td className="py-3 text-sm">{purchase.product}</td>
                    <td className="py-3 text-sm font-semibold text-green-600">
                      ${purchase.amount}
                    </td>
                    <td className="py-3 text-sm text-gray-500">{purchase.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* AI Recipe Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200 mb-8"
        >
          <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
            <Bot className="w-6 h-6" />
            AI Recipe Generator
          </h2>
          <p className="text-purple-700 mb-4">
            Generate new recipes using Claude AI for any diet plan
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['mediterranean', 'keto', 'vegan', 'paleo'].map((diet) => (
              <button
                key={diet}
                onClick={() => handleGenerateRecipes(diet, 1)}
                disabled={generatingRecipes}
                className="bg-white px-4 py-2 rounded-lg text-purple-700 font-medium hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingRecipes ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  `Generate ${diet}`
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Link
            href="/admin/recipes"
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition flex items-center gap-4"
          >
            <Book className="w-10 h-10 text-purple-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Recipe Library</h3>
              <p className="text-sm text-gray-600">View all generated recipes</p>
            </div>
          </Link>

          <Link
            href="/api/admin/export-customers"
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition flex items-center gap-4"
          >
            <Database className="w-10 h-10 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Export Customers</h3>
              <p className="text-sm text-gray-600">Download CSV of all customers</p>
            </div>
          </Link>

          <Link
            href="/api/admin/sales-report"
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition flex items-center gap-4"
          >
            <FileText className="w-10 h-10 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Sales Report</h3>
              <p className="text-sm text-gray-600">Monthly sales analysis</p>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition flex items-center gap-4"
          >
            <Settings className="w-10 h-10 text-gray-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Settings</h3>
              <p className="text-sm text-gray-600">Configure site settings</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}