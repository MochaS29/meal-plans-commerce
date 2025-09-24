'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-amber-800 to-amber-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">🧠</span>
            <span className="text-xl font-bold">Mocha's MindLab</span>
          </div>
          <p className="text-amber-200">
            Transform your health with personalized meal planning
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Meal Plans</h4>
          <ul className="space-y-2 text-amber-200">
            <li><Link href="/plans/wellness-transformation" className="hover:text-white transition">30-Day Challenge</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">Custom Family Plan</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">Monthly Subscription</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-amber-200">
            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link href="mailto:support@mindfulmealplan.com" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/portal" className="hover:text-white transition">Customer Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Browse</h4>
          <ul className="space-y-2 text-amber-200">
            <li><Link href="/recipes" className="hover:text-white transition">Recipes</Link></li>
            <li><Link href="/calendar" className="hover:text-white transition">Sample Calendar</Link></li>
            <li><Link href="/menu-benefits" className="hover:text-white transition">Menu Benefits</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-amber-700 text-center text-amber-200">
        <p>&copy; 2024 Mocha's MindLab Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}