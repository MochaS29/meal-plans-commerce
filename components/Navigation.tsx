'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Home, Calendar, ShoppingCart, User, LogIn, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user/profile')
        setIsLoggedIn(response.ok)
      } catch {
        setIsLoggedIn(false)
      }
    }
    checkAuth()
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/pricing', label: 'Pricing', icon: ShoppingCart },
    { href: '/diets', label: 'Diet Plans', icon: Calendar },
    { href: '/about', label: 'About', icon: User },
  ]

  const userLinks = [
    { href: '/dashboard', label: 'My Dashboard', icon: User },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent hover:from-amber-700 hover:to-amber-800 transition-all"
          >
            Mindful Meal Plans
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  pathname === link.href ? 'text-amber-700' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    pathname === link.href
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}

              {isLoggedIn ? (
                userLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors mx-4 mt-2"
                >
                  <LogIn className="w-5 h-5" />
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}