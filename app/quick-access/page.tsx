'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Shield, Loader } from 'lucide-react'

export default function QuickAccessPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const quickLogin = async (email: string, isAdmin: boolean = false) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        // Redirect to appropriate dashboard
        setTimeout(() => {
          router.push(isAdmin ? '/admin' : '/dashboard')
        }, 500)
      }
    } catch (error) {
      console.error('Quick login failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Quick Access
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Choose an account to log in instantly
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-amber-600" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Admin Access */}
              <button
                onClick={() => quickLogin('mocha@mochasmindlab.com', true)}
                className="w-full p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:shadow-lg transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Admin Account</div>
                    <div className="text-sm opacity-90">mocha@mochasmindlab.com</div>
                  </div>
                </div>
                <span className="text-sm opacity-75 group-hover:opacity-100">→</span>
              </button>

              {/* Regular User Access */}
              <button
                onClick={() => quickLogin('demo@example.com', false)}
                className="w-full p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Customer Account</div>
                    <div className="text-sm opacity-90">demo@example.com</div>
                  </div>
                </div>
                <span className="text-sm opacity-75 group-hover:opacity-100">→</span>
              </button>

              {/* Premium User */}
              <button
                onClick={() => quickLogin('premium@example.com', false)}
                className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Premium Account</div>
                    <div className="text-sm opacity-90">premium@example.com</div>
                  </div>
                </div>
                <span className="text-sm opacity-75 group-hover:opacity-100">→</span>
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>Development/Demo Mode</p>
            <p className="mt-1">In production, users would receive a login link via email</p>
          </div>
        </div>
      </div>
    </div>
  )
}