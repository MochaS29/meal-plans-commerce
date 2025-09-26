'use client'

import Link from 'next/link'
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <XCircle className="w-20 h-20 text-red-500 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Your payment was cancelled and you haven't been charged.
            Your meal plan is still waiting for you whenever you're ready!
          </p>

          <div className="bg-amber-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-amber-600" />
              Need Help?
            </h2>
            <p className="text-gray-700 mb-4">
              If you experienced any issues during checkout or have questions about our meal plans,
              we're here to help!
            </p>
            <a
              href="mailto:support@mealplans.com"
              className="text-amber-600 font-semibold hover:underline"
            >
              Contact Support
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 font-medium">Ready to try again?</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/plans"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Plans
              </Link>
              <Link
                href="/"
                className="border-2 border-gray-400 text-gray-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
              >
                Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Questions? Email us at{' '}
            <a href="mailto:support@mealplans.com" className="text-indigo-600 hover:underline">
              support@mealplans.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}