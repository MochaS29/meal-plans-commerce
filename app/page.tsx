'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, Star, Calendar, ShoppingCart, BookOpen, ChefHat, Heart, Sparkles } from 'lucide-react'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import StructuredData from '@/components/StructuredData'

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData type="website" />
      <StructuredData type="organization" />
      <StructuredData type="service" />

      <div className="min-h-screen bg-white">
      {/* Container with Background Image for Header and Hero */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/hero-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            minHeight: '650px',
            maxHeight: '850px'
          }}
        >
          {/* White overlay for text readability */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]"></div>
          {/* Gradient overlay for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/30 to-white"></div>
        </div>


        {/* Hero Section */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-amber-800 mb-6 leading-tight">
              Empowering Health Through Mindful
              <span className="text-amber-700"> Nutrition</span>
            </h1>
            <p className="text-xl text-teal-700 mb-8">
              Transform your wellness journey with personalized meal plans and mindful insights
            </p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-4xl mx-auto">
              Experience the luxury of having an AI wellness chef design your family's health journey.
              Our custom monthly menu plans are thoughtfully curated to match your wellness goals, dietary
              preferences, and lifestyle. Each month includes a designer printable calendar featuring your
              choice of wellness-focused cuisines—from heart-healthy recipes and clean eating to keto-friendly,
              plant-based, globally-inspired dishes, and beyond—professionally organized shopping lists
              that streamline your wellness routine, and restaurant-quality recipes simplified for mindful home cooking.
              Choose from our curated wellness themes or let our AI wellness chef create a completely personalized meal plan just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#plans"
                className="bg-amber-700 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 transition inline-block text-center"
              >
                Learn More
              </Link>
              <Link
                href="/calendar"
                className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-full font-medium hover:bg-teal-50 transition inline-block text-center"
              >
                See Menus
              </Link>
            </div>
          </motion.div>
          </div>
        </section>
      </div>  {/* End of background image container */}


      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-800 mb-4">
              Why Choose Our Menu Plans?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professionally curated meal plans that taste incredible and fit your lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Personalized Wellness",
                description: "Custom plans for keto, plant-based, clean eating & more",
                color: "#7FB069"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Designer Calendars",
                description: "Beautiful monthly meal plans with every detail planned",
                color: "#4A9B9B"
              },
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: "Smart Shopping",
                description: "Professional lists organized to streamline your routine",
                color: "#8B4513"
              },
              {
                icon: <ChefHat className="w-8 h-8" />,
                title: "Global Cuisines",
                description: "Restaurant-quality recipes from around the world",
                color: "#4A9B9B"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-amber-50/50 to-teal-50/50 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: feature.color + '20' }}>
                  <div style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Plans Section */}
      <section id="plans" className="py-20 px-6 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-800 mb-4">
              Choose Your Wellness Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional meal planning that makes healthy eating effortless
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-md overflow-hidden border ${
                  product.popular ? 'border-teal-500' : 'border-gray-200'
                }`}
              >
                {product.popular && (
                  <div className="bg-teal-600 text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-amber-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-teal-600">
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
                        <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/plans/${product.id}`}
                    className={`block text-center py-3 px-6 rounded-full font-medium transition ${
                      product.popular
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
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

      {/* Sample Calendar Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-amber-800 mb-4">
              See What's Inside
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A sneak peek at your personalized meal calendar
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="bg-gradient-to-r from-amber-700 to-teal-600 text-white p-6">
              <h3 className="text-2xl font-bold text-center">September 2025 - Week 1</h3>
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-amber-50 text-amber-800 font-semibold text-center py-2">
                  {day}
                </div>
              ))}
              {[1, 2, 3, 4, 5, 6, 7].map(date => (
                <div key={date} className="bg-white p-4 min-h-[150px] hover:bg-amber-50/50 transition cursor-pointer group">
                  <div className="font-bold text-amber-800 mb-2">{date}</div>
                  <div className="text-xs space-y-1">
                    <div className="text-green-700 font-medium">B: Greek Yogurt</div>
                    <div className="text-teal-700 font-medium">L: Med Salad</div>
                    <div className="text-amber-700 font-medium">D: Herb Chicken</div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
                    1,850 cal
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="text-center mt-8">
            <Link
              href="/calendar"
              className="inline-flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition"
            >
              <Calendar className="w-5 h-5" />
              View Full Interactive Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-amber-800 mb-4">
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
                review: "My cholesterol dropped 30 points. These meal plans really work!",
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
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                <p className="font-semibold text-teal-700">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      </div>
    </>
  )
}