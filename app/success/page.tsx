'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Download, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SuccessPage() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    // You can fetch session details here if needed
    // const sessionId = new URLSearchParams(window.location.search).get('session_id')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Thank you for your purchase! Your meal plan is being prepared and will be sent to your email shortly.
          </p>

          <div className="bg-green-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What happens next?
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  You'll receive an email confirmation with your receipt
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  Your meal plan PDF will be sent within 5 minutes
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  Shopping lists and prep guides included
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
            >
              Return to Home
            </Link>
            <Link
              href="/recipes"
              className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition"
            >
              Browse Recipes
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Contact us at{' '}
            <a href="mailto:support@mealplans.com" className="text-green-600 hover:underline">
              support@mealplans.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}