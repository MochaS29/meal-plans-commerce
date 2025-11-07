'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PortalPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page
    router.push('/login')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
            Mocha&apos;s MindLab
          </Link>
          <Link href="/" className="text-gray-600 hover:text-teal-600 transition">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Customer Portal
          </h1>

          <p className="text-gray-700 mb-6 text-center">
            Access your meal plans and manage your subscription
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="button"
              onClick={() => alert('Customer portal coming soon! For now, please email support@mindfulmealplan.com')}
              className="w-full bg-gradient-to-r from-teal-600 to-amber-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Access Portal
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Need help? <Link href="mailto:support@mindfulmealplan.com" className="text-teal-600 hover:underline">Contact Support</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}