'use client';

import { motion } from 'framer-motion';
import { Check, Star, Heart, Brain, TrendingUp, Users, Leaf, Globe } from 'lucide-react';
import Link from 'next/link';
import { menuDescriptions } from '@/data/menu-descriptions';

const menuIcons = {
  mediterranean: Heart,
  'intermittent-fasting': TrendingUp,
  'family-focused': Users,
  paleo: Brain,
  vegetarian: Leaf,
  vegan: Leaf,
  'global-cuisine': Globe
};

export default function MenuBenefitsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
            Mocha&apos;s MindLab
          </Link>
          <div className="flex gap-6">
            <Link href="/pricing" className="text-gray-600 hover:text-teal-600 transition">
              Pricing
            </Link>
            <Link href="/" className="text-gray-600 hover:text-teal-600 transition">
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent"
        >
          Science-Backed Menu Plans
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Each of our menu types is thoughtfully designed based on nutritional principles and wellness research.
          Discover which plan aligns with your health goals.
        </motion.p>
      </div>

      {/* Menu Types Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        {Object.entries(menuDescriptions).map(([key, menu], index) => {
          const Icon = menuIcons[key as keyof typeof menuIcons];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-16"
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className={`p-8 lg:p-12 ${isEven ? 'lg:flex' : 'lg:flex lg:flex-row-reverse'}`}>
                  {/* Content Side */}
                  <div className="lg:w-3/5 lg:pr-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold">{menu.title}</h2>
                    </div>

                    <p className="text-xl text-amber-600 font-semibold mb-4">{menu.tagline}</p>
                    <p className="text-gray-700 mb-6">{menu.briefDescription}</p>

                    {/* Why It Works */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 text-teal-700">{menu.whyItWorks.title}</h3>
                      <div className="space-y-4">
                        {menu.whyItWorks.points.map((point, idx) => (
                          <div key={idx} className="flex gap-3">
                            <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-gray-800">{point.heading}</h4>
                              <p className="text-sm text-gray-600">{point.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4">
                      <Link
                        href={`/${key}`}
                        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold hover:from-teal-600 hover:to-cyan-600 transition"
                      >
                        Learn More
                      </Link>
                      <Link
                        href="/pricing"
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>

                  {/* Info Side */}
                  <div className="lg:w-2/5 mt-8 lg:mt-0">
                    {/* Scientific Backing */}
                    <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-6 mb-6">
                      <h4 className="font-bold text-teal-700 mb-3">📊 Key Benefits</h4>
                      <ul className="space-y-2">
                        {menu.scientificBacking.map((fact, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex gap-2">
                            <Check className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
                      <h4 className="font-bold text-amber-700 mb-3">✨ Best For</h4>
                      <ul className="space-y-2">
                        {menu.bestFor.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-amber-600">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weekly Themes for Global Cuisine */}
                    {'weeklyThemes' in menu && Array.isArray(menu.weeklyThemes) && menu.weeklyThemes.length > 0 && (
                      <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                        <h4 className="font-bold text-purple-700 mb-3">🌍 Weekly Journey</h4>
                        <ul className="space-y-2">
                          {menu.weeklyThemes.map((theme, idx) => (
                            <li key={idx} className="text-sm text-gray-700">{theme}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 bg-gradient-to-br from-teal-600 to-amber-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose your perfect menu plan and start your journey to better health today.
            All plans include complete recipes, shopping lists, and meal prep guides.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white text-teal-600 rounded-full font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
            >
              View Pricing
            </Link>
            <Link
              href="/calendar"
              className="px-8 py-4 bg-white/20 backdrop-blur text-white border-2 border-white rounded-full font-bold text-lg hover:bg-white/30 transition"
            >
              See Sample Calendar
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}