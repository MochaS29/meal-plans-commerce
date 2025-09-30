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
            <li><Link href="/diets/mediterranean" className="hover:text-white transition">Mediterranean</Link></li>
            <li><Link href="/diets/keto" className="hover:text-white transition">Keto</Link></li>
            <li><Link href="/diets/vegan" className="hover:text-white transition">Vegan</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">View All Plans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-amber-200">
            <li><Link href="/dashboard" className="hover:text-white transition">My Dashboard</Link></li>
            <li><Link href="/login" className="hover:text-white transition">Login</Link></li>
            <li><Link href="/admin" className="hover:text-white transition">Admin Portal</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-amber-200">
            <li><Link href="/recipes" className="hover:text-white transition">Recipes</Link></li>
            <li><Link href="/calendar" className="hover:text-white transition">Sample Calendar</Link></li>
            <li><Link href="/menu-benefits" className="hover:text-white transition">Menu Benefits</Link></li>
            <li><Link href="mailto:support@mochasmindlab.com" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-amber-700 text-center text-amber-200">
        <p>&copy; 2024 Mocha's MindLab Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}