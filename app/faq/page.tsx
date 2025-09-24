'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const faqs = [
  {
    q: "What's included in the meal plans?",
    a: "Each meal plan includes a 30-day printable calendar, 50+ recipes, complete shopping lists, meal prep guides, and nutritional information."
  },
  {
    q: "Can I customize the meal plans?",
    a: "Yes! You can choose from various cuisine styles including Mediterranean, Keto, Plant-Based, and more. For fully personalized plans, check out our Custom Family option."
  },
  {
    q: "How do I receive my meal plan?",
    a: "After purchase, you'll receive instant access to download your meal plan as a PDF that you can print or view on any device."
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with your meal plan."
  },
  {
    q: "Can I change my cuisine style after purchase?",
    a: "You can purchase additional meal plan styles at any time. Each style is a separate plan with unique recipes and calendars."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
            Mocha&apos;s MindLab
          </Link>
          <Link href="/" className="text-gray-600 hover:text-teal-600 transition">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-900"
        >
          Frequently Asked Questions
        </motion.h1>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">Still have questions?</p>
          <Link href="mailto:support@mindfulmealplan.com" className="text-teal-600 font-semibold hover:underline">
            Contact us at support@mindfulmealplan.com
          </Link>
        </div>
      </div>
    </div>
  )
}