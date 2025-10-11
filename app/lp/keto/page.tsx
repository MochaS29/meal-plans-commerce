'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Star, Scale, Brain, Zap, UtensilsCrossed } from 'lucide-react'

export default function KetoLandingPage() {
  const sampleWeek = [
    { day: 'Monday', meal: 'Keto Breakfast Bowl', carbs: '5g', fat: '75g', protein: '25g' },
    { day: 'Tuesday', meal: 'Cauliflower Rice Bowl', carbs: '8g', fat: '70g', protein: '22g' },
    { day: 'Wednesday', meal: 'Salmon & Greens', carbs: '4g', fat: '80g', protein: '35g' },
    { day: 'Thursday', meal: 'Bacon & Eggs', carbs: '2g', fat: '85g', protein: '30g' },
  ]

  const ketoFaqs = [
    {
      question: "Will this keep me in ketosis?",
      answer: "Yes! All our recipes are under 20g net carbs per day, designed to keep you in ketosis. Each meal includes complete macro breakdowns so you can track your progress."
    },
    {
      question: "What if I'm new to keto?",
      answer: "Perfect! We include a keto quick-start guide, shopping tips, and meal prep strategies specifically for beginners. You'll learn as you go with easy-to-follow recipes."
    },
    {
      question: "Do you include net carbs or total carbs?",
      answer: "We provide both net carbs and total carbs for every recipe, along with fiber content. This gives you complete control over your tracking method."
    },
    {
      question: "Can I customize recipes?",
      answer: "Absolutely! While we provide optimized recipes, you can swap proteins, adjust portions, and substitute ingredients while staying within your macro goals."
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
      <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Perfect Keto Meal Plan
              <span className="text-emerald-600"> Delivered Monthly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stay in ketosis with 50+ delicious low-carb recipes. All macros calculated for you.
            </p>
            <Link
              href="#pricing"
              className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
            >
              Start Your Keto Journey - $29/month →
            </Link>
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>&lt;20g Net Carbs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Macro Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Keto-Certified Recipes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Keto-Specific Benefits */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fat-Burning</h3>
              <p className="text-gray-600">
                Stay in ketosis automatically
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mental Clarity</h3>
              <p className="text-gray-600">
                No keto fog with balanced nutrition
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustained Energy</h3>
              <p className="text-gray-600">
                No sugar crashes all day long
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Delicious</h3>
              <p className="text-gray-600">
                Real food you'll love
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Week Preview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">See What You'll Eat This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleWeek.map((day, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                <h3 className="font-bold text-gray-900 mb-2">{day.day}</h3>
                <p className="text-gray-700 mb-4">{day.meal}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Carbs:</span>
                    <span className="font-semibold text-emerald-600">{day.carbs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fat:</span>
                    <span className="font-semibold text-gray-900">{day.fat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protein:</span>
                    <span className="font-semibold text-gray-900">{day.protein}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Your Monthly Keto Package Includes</h2>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8">
            <ul className="space-y-4">
              {[
                '50+ keto-certified recipes (<20g net carbs)',
                'Complete macro breakdown for every meal',
                'Keto-specific shopping lists',
                'Meal prep guides to save time',
                'Printable meal calendar',
                'Snack ideas & keto desserts',
                'Restaurant survival guide'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Keto Success Stories */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Keto Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-4">"Lost 25 lbs in 3 months!"</p>
              <p className="text-gray-600 mb-4">
                Starting: 185 lbs → Now: 160 lbs<br />
                Waist: -4 inches
              </p>
              <p className="font-semibold text-gray-900">- Jennifer K.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-4">"Finally found keto easy!"</p>
              <p className="text-gray-600 mb-4">
                No more meal planning stress. Love these recipes!
              </p>
              <p className="font-semibold text-gray-900">- David M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Choose Your Keto Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-emerald-500 hover:shadow-xl transition relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Plan</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-1">$29<span className="text-xl">/mo</span></div>
              <p className="text-gray-600 mb-6">Recurring</p>
              <Link
                href="/plans/monthly-calendar"
                className="block w-full py-3 px-6 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition text-center"
              >
                Subscribe →
              </Link>
            </div>

            {/* One-Time */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">One-Time</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$79</div>
              <p className="text-gray-600 mb-6">30-Day Trial</p>
              <Link
                href="/plans/wellness-transformation"
                className="block w-full py-3 px-6 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition text-center"
              >
                Try Once
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-emerald-600 font-semibold">
              🎁 LIMITED TIME: First month 50% off - just $14.50!
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-12 flex-wrap">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="font-semibold text-gray-900">30-Day Guarantee</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 text-blue-600" />
            </div>
            <p className="font-semibold text-gray-900">Certified Nutritionist</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 text-purple-600" />
            </div>
            <p className="font-semibold text-gray-900">500+ Members</p>
          </div>
        </div>
      </section>

      {/* Keto FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Keto Questions Answered</h2>
          <div className="space-y-6">
            {ketoFaqs.map((faq, idx) => (
              <details key={idx} className="bg-gray-50 rounded-xl p-6 shadow-sm">
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
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Start Your Keto Transformation Today</h2>
          <Link
            href="#pricing"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition shadow-lg mt-6"
          >
            Get My Keto Plan - $29/month →
          </Link>
          <p className="mt-6 text-emerald-100">
            Cancel Anytime • 30-Day Money-Back Guarantee
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
