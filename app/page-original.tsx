'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, Star, Calendar, ShoppingCart, BookOpen, ChefHat, Heart, Sparkles } from 'lucide-react'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mindlab-purple-100 via-mindlab-pink-50 to-mindlab-teal-100">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-mindlab-gradient opacity-90"></div>
        <div className="relative z-10 px-6 py-8">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-white" />
              <span className="text-2xl font-display font-bold text-white">Mocha's MindLab</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/plans" className="text-white hover:text-mindlab-teal-200 transition">
                Meal Plans
              </Link>
              <Link href="/about" className="text-white hover:text-mindlab-teal-200 transition">
                About
              </Link>
              <Link href="/portal" className="bg-white text-mindlab-purple-600 px-4 py-2 rounded-full hover:bg-mindlab-teal-50 transition">
                My Account
              </Link>
            </div>
          </nav>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Transform Your Health with
            <span className="block text-mindlab-teal-200 mt-2">Mediterranean Magic</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Discover the joy of Mediterranean eating with our expertly crafted meal plans.
            Fresh ingredients, authentic recipes, and a proven path to wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#plans"
              className="bg-white text-mindlab-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-mindlab-teal-50 transform hover:scale-105 transition"
            >
              View Meal Plans
            </Link>
            <Link
              href="#sample"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition"
            >
              See Sample Calendar
            </Link>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-mindlab-purple-800 mb-4">
              Why Choose Mediterranean?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Science-backed nutrition that tastes incredible and fits your lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Heart Healthy",
                description: "Reduce cardiovascular risk with olive oil and omega-3s",
                gradient: "from-mindlab-pink-400 to-mindlab-pink-600"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "30-Day Plans",
                description: "Complete monthly calendars with every meal planned",
                gradient: "from-mindlab-purple-400 to-mindlab-purple-600"
              },
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: "Shopping Lists",
                description: "Organized by grocery section for easy shopping",
                gradient: "from-mindlab-teal-400 to-mindlab-teal-600"
              },
              {
                icon: <ChefHat className="w-8 h-8" />,
                title: "50+ Recipes",
                description: "Authentic Mediterranean recipes with step-by-step guides",
                gradient: "from-mindlab-coral-400 to-mindlab-coral-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-mindlab-purple-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Plans Section */}
      <section id="plans" className="py-16 px-6 bg-gradient-to-br from-mindlab-purple-50 to-mindlab-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-mindlab-purple-800 mb-4">
              Choose Your Mediterranean Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional meal planning that makes healthy eating effortless
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  product.popular ? 'ring-2 ring-mindlab-purple-500' : ''
                }`}
              >
                {product.popular && (
                  <div className="bg-mindlab-gradient text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-mindlab-purple-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-mindlab-purple-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.type === 'subscription' && (
                      <span className="text-gray-600 ml-2">/month</span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <ul className="space-y-3 mb-8">
                    {product.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-mindlab-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/plans/${product.id}`}
                    className={`block text-center py-3 px-6 rounded-full font-semibold transition ${
                      product.popular
                        ? 'bg-mindlab-gradient text-white hover:opacity-90'
                        : 'bg-mindlab-purple-100 text-mindlab-purple-700 hover:bg-mindlab-purple-200'
                    }`}
                  >
                    {product.type === 'subscription' ? 'Subscribe Now' : 'Get Started'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Calendar Section */}
      <section id="sample" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-mindlab-purple-800 mb-4">
              See What's Inside
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A sneak peek at your Mediterranean meal calendar
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-mindlab-gradient text-white p-6">
              <h3 className="text-2xl font-bold text-center">September 2025 - Week 1</h3>
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-mindlab-purple-100 text-mindlab-purple-800 font-semibold text-center py-2">
                  {day}
                </div>
              ))}
              {[1, 2, 3, 4, 5, 6, 7].map(date => (
                <div key={date} className="bg-white p-4 min-h-[150px]">
                  <div className="font-bold text-mindlab-purple-600 mb-2">{date}</div>
                  <div className="text-xs space-y-1">
                    <div className="text-mindlab-coral-600 font-semibold">B: Greek Yogurt</div>
                    <div className="text-mindlab-teal-600 font-semibold">L: Med Salad</div>
                    <div className="text-mindlab-purple-600 font-semibold">D: Herb Chicken</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gradient-to-br from-mindlab-teal-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-mindlab-purple-800 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands who've transformed their health
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                review: "Lost 15 pounds in 2 months! The meal plans are delicious and easy to follow.",
                rating: 5
              },
              {
                name: "John D.",
                review: "My cholesterol dropped 30 points. The Mediterranean diet really works!",
                rating: 5
              },
              {
                name: "Maria L.",
                review: "Finally found sustainable meal planning. My whole family loves these recipes!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                <p className="font-semibold text-mindlab-purple-700">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mindlab-purple-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <span className="text-xl font-display font-bold">Mocha's MindLab</span>
              </div>
              <p className="text-mindlab-purple-200">
                Transform your health with authentic Mediterranean meal planning
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Meal Plans</h4>
              <ul className="space-y-2 text-mindlab-purple-200">
                <li><Link href="/plans/mediterranean-challenge" className="hover:text-white transition">30-Day Challenge</Link></li>
                <li><Link href="/plans/custom-family" className="hover:text-white transition">Custom Family Plan</Link></li>
                <li><Link href="/plans/monthly-calendar" className="hover:text-white transition">Monthly Subscription</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-mindlab-purple-200">
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/portal" className="hover:text-white transition">Customer Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-mindlab-purple-200">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/refunds" className="hover:text-white transition">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-mindlab-purple-800 pt-8 text-center text-mindlab-purple-200">
            <p>&copy; 2025 Mocha's MindLab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
