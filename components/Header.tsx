'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (dropdownOpen) setDropdownOpen(false)
  }

  return (
    <header className="relative z-[1000] border-b border-gray-200 bg-white shadow-sm" onClick={handleClickOutside}>
      <div className="px-6 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/ML-Logo1.png"
              alt="Mindful Meal Plans Logo"
              width={67}
              height={67}
              className="w-17 h-17 rounded-full"
            />
            <span className="text-xl font-semibold text-amber-800">Mindful Meal Plans</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/menu-benefits" className="text-gray-700 hover:text-teal-600 transition font-medium">
              Why It Works
            </Link>
            <Link href="/calendar" className="text-gray-700 hover:text-teal-600 transition font-medium">
              Sample Calendar
            </Link>
            {/* Meal Plans Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setDropdownOpen(!dropdownOpen)
                }}
                className="text-gray-700 hover:text-teal-600 transition font-medium flex items-center space-x-1"
              >
                <span>Meal Plans</span>
                <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-200 z-[9999] overflow-hidden ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="py-2 bg-white">
                  <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Diet Types</p>
                  </div>
                  <Link href="/diets/mediterranean" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition">
                    🌊 Mediterranean
                  </Link>
                  <Link href="/diets/intermittent-fasting" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition">
                    ⏰ Intermittent Fasting
                  </Link>
                  <Link href="/diets/family-focused" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition">
                    👨‍👩‍👧‍👦 Family Focused
                  </Link>
                  <Link href="/diets/paleo" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition">
                    🥩 Paleo
                  </Link>
                  <Link href="/diets/vegetarian" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition">
                    🥗 Vegetarian
                  </Link>
                  <Link href="/diets/vegan" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition">
                    🌱 Vegan
                  </Link>
                  <Link href="/diets/keto" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition">
                    🥑 Keto
                  </Link>
                  <Link href="/diets/global" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition">
                    🌍 Global Cuisine
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link href="/plans/wellness-transformation" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-amber-700 hover:bg-amber-50 hover:text-amber-800 transition font-medium">
                      ✨ 30-Day Transformation
                    </Link>
                    <Link href="/plans/custom-family" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-amber-700 hover:bg-amber-50 hover:text-amber-800 transition font-medium">
                      🏠 Custom Family Plan
                    </Link>
                    <Link href="/plans/monthly-calendar" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-amber-700 hover:bg-amber-50 hover:text-amber-800 transition font-medium">
                      📅 Monthly Subscription
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/recipes" className="text-gray-700 hover:text-teal-600 transition font-medium">
              Recipes
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-teal-600 transition font-medium">
              Pricing
            </Link>
            <Link href="/login" className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition font-medium">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}