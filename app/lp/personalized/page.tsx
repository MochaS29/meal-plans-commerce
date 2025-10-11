'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Star, Calendar, ShoppingCart, ChefHat, Clock, Users, Heart } from 'lucide-react'

export default function PersonalizedLandingPage() {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "NYC",
      quote: "Lost 15 lbs in 2 months!",
      rating: 5
    },
    {
      name: "Mike & Jenny T.",
      quote: "Game changer for our family",
      rating: 5
    }
  ]

  const faqs = [
    {
      question: "How does the meal plan work?",
      answer: "Choose your diet type and preferences. You'll receive a monthly meal calendar with 50+ recipes, complete shopping lists, and meal prep guides. Everything is delivered digitally for instant access."
    },
    {
      question: "Can I customize my plan?",
      answer: "Yes! You can choose from Mediterranean, Keto, Vegan, Vegetarian, Paleo, and more. You can also swap recipes and adjust portions to fit your needs."
    },
    {
      question: "What if I have dietary restrictions?",
      answer: "All our plans accommodate common dietary restrictions. Each recipe includes full ingredient lists and nutritional information so you can make informed choices."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Absolutely! We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund you in full, no questions asked."
    }
  ]

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
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-indigo-50 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Wellness Journey with
              <span className="text-emerald-600"> Personalized Meal Plans</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Custom nutrition plans tailored to your goals. 50+ restaurant-quality recipes delivered monthly.
            </p>
            <Link
              href="#pricing"
              className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
            >
              Start Your Transformation - $29/month →
            </Link>
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>500+ Happy Members</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gray-50 py-6 px-6 border-y border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-12 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700">"Life-changing!" - Sarah M.</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700">"Finally meal planning is easy" - James K.</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Plans</h3>
              <p className="text-gray-600">
                Tailored to your dietary needs & wellness goals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Restaurant-Quality</h3>
              <p className="text-gray-600">
                50+ delicious recipes each month
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Time-Saving</h3>
              <p className="text-gray-600">
                Shopping lists & meal prep guides included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Your Plan</h3>
              <p className="text-gray-600">
                Select diet type, preferences & family size
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Your Calendar</h3>
              <p className="text-gray-600">
                Receive monthly meal calendar with 50+ recipes
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Cooking</h3>
              <p className="text-gray-600">
                Follow easy recipes with shopping lists
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diet Options */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Choose Your Perfect Plan</h2>
          <p className="text-center text-gray-600 mb-12">All plans include shopping lists, meal prep guides, nutrition info & printable calendars</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Mediterranean', 'Keto', 'Vegan', 'Vegetarian', 'Intermittent Fasting', 'Paleo', 'Whole30'].map((diet, idx) => (
              <div key={idx} className="bg-gradient-to-br from-emerald-50 to-indigo-50 p-6 rounded-xl text-center hover:shadow-lg transition cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-900">{diet}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* One-Time */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">One-Time</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$79</div>
              <p className="text-gray-600 mb-6">30-Day Wellness</p>
              <Link
                href="/plans/wellness-transformation"
                className="block w-full py-3 px-6 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition text-center"
              >
                Select
              </Link>
            </div>

            {/* Monthly - Most Popular */}
            <div className="bg-white rounded-2xl p-8 border-2 border-emerald-500 hover:shadow-xl transition relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-1">$29<span className="text-xl">/mo</span></div>
              <p className="text-gray-600 mb-6">Wellness Journey</p>
              <Link
                href="/plans/monthly-calendar"
                className="block w-full py-3 px-6 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition text-center"
              >
                Start Now →
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$149</div>
              <p className="text-gray-600 mb-6">Family Plan (4-6 people)</p>
              <Link
                href="/plans/custom-family"
                className="block w-full py-3 px-6 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition text-center"
              >
                Select
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray-900">
                  - {testimonial.name}{testimonial.location && `, ${testimonial.location}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
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
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Wellness?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join 500+ members on their wellness journey
          </p>
          <Link
            href="#pricing"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition shadow-lg"
          >
            Get Started Today - $29/month →
          </Link>
          <p className="mt-6 text-emerald-100">
            30-Day Money-Back Guarantee • Cancel Anytime
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
