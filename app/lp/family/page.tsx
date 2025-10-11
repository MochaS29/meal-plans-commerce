'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Star, Users, Clock, DollarSign, Utensils, ShoppingCart, Calendar } from 'lucide-react'

export default function FamilyLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🧠</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Mindful Meal Plan</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-800 transition">
              Login
            </Link>
            <Link
              href="#pricing"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-emerald-50 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              End Family Dinner Stress
              <span className="text-emerald-600"> Forever</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Custom meal plans the whole family will love. Picky eaters? Dietary restrictions? We've got you.
            </p>
            <Link
              href="#pricing"
              className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
            >
              Get Your Family Plan - $149/month →
            </Link>
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Kid-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Customizable</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Saves 10+ Hours/Week</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Family Pain Points */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-red-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">"What's for dinner?"</h3>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <p className="text-lg text-gray-700">❌ Nightly scrambling</p>
              </div>
              <div className="text-2xl">→</div>
              <div className="flex-1">
                <p className="text-lg text-emerald-700 font-semibold">✅ Pre-planned for entire month</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">"My kids won't eat that!"</h3>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <p className="text-lg text-gray-700">❌ Cooking multiple meals</p>
              </div>
              <div className="text-2xl">→</div>
              <div className="flex-1">
                <p className="text-lg text-emerald-700 font-semibold">✅ Kid-tested, family-approved</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">"No time for meal prep!"</h3>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <p className="text-lg text-gray-700">❌ Hours in kitchen</p>
              </div>
              <div className="text-2xl">→</div>
              <div className="flex-1">
                <p className="text-lg text-emerald-700 font-semibold">✅ Organized prep guides save 10+ hrs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Built for Busy Families</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Everything you need to make family dinners easy again</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Picky Eater Solutions</h3>
              <p className="text-gray-600">
                Alternative options for every meal
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Time-Saving</h3>
              <p className="text-gray-600">
                Batch cooking & prep-ahead tips
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Budget-Friendly</h3>
              <p className="text-gray-600">
                Reduce food waste, save $$$
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Utensils className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fully Customizable</h3>
              <p className="text-gray-600">
                Swap recipes, adjust portions
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Balanced Nutrition</h3>
              <p className="text-gray-600">
                Kid-approved & parent-trusted
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Shopping</h3>
              <p className="text-gray-600">
                Organized by store sections
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Family Week */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">See A Week of Delicious Family Meals</h2>
          <div className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday'].map((day, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3">{day}</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>
                      <p className="text-xs text-gray-500">Breakfast</p>
                      <p className="font-medium">Pancakes</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lunch</p>
                      <p className="font-medium">Mac & Cheese</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Dinner</p>
                      <p className="font-medium">Chicken Tacos</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Serves: 2 adults + 2 kids</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Family Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Real Families, Real Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-4">
                "Game changer! Kids actually eat vegetables now!"
              </p>
              <p className="font-semibold text-gray-900">- The Johnson Family (4)</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-4">
                "Saved us $200/month on food waste alone!"
              </p>
              <p className="font-semibold text-gray-900">- Sarah & Tom + 3 kids</p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Pricing */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Family Wellness Plan</h2>
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-10 shadow-xl border-2 border-emerald-200">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                $149<span className="text-2xl">/month</span>
              </div>
              <p className="text-xl text-emerald-700 font-semibold">Serves 4-6 People</p>
              <p className="text-gray-600 mt-2">Just $1.24 per meal per person!</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
              <ul className="space-y-3">
                {[
                  '90+ family-sized recipes',
                  'Picky eater alternatives',
                  'Bulk shopping lists',
                  'Meal prep guides',
                  'Leftover strategies',
                  'Kid-friendly nutrition tracking',
                  'Family wellness consultation',
                  'Cancel anytime'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/plans/custom-family"
              className="block w-full py-4 px-6 bg-emerald-600 text-white text-center rounded-lg font-semibold text-lg hover:bg-emerald-700 transition shadow-lg"
            >
              Start Family Plan →
            </Link>

            <div className="mt-8 bg-white rounded-xl p-6">
              <p className="text-center text-gray-700 mb-2">
                💰 <strong>Compare:</strong> Restaurant family meal = $50-80
              </p>
              <p className="text-center text-emerald-700 font-semibold text-lg">
                Our plan: $1.24/meal = Save $800+/month!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Family Plan FAQ</h2>
          <div className="space-y-6">
            {[
              {
                question: "What if my kids are picky eaters?",
                answer: "Every meal plan includes alternative options and kid-friendly recipes. We also provide tips for introducing new foods gradually."
              },
              {
                question: "Can we customize for food allergies?",
                answer: "Yes! You can specify allergies and dietary restrictions, and we'll provide suitable alternatives for every recipe."
              },
              {
                question: "How much time does meal prep take?",
                answer: "Our batch cooking guides help you prep in 2-3 hours on Sunday, saving 10+ hours during the week. Everything is designed to be family-friendly and efficient."
              },
              {
                question: "What serving sizes do you provide?",
                answer: "The family plan is designed for 4-6 people with adjustable portions. You'll get guidance on scaling recipes up or down as needed."
              }
            ].map((faq, idx) => (
              <details key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer">
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Give Your Family The Gift of Stress-Free Dinners</h2>
          <Link
            href="#pricing"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition shadow-lg mt-6"
          >
            Start Your Family Plan - $149 →
          </Link>
          <p className="mt-6 text-emerald-100">
            30-Day Guarantee • Cancel Anytime • Kid-Approved ✅
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>&copy; 2025 Mocha's MindLab Inc.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="mailto:support@mindfulmealplan.com" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
