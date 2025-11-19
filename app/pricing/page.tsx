'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Star, Shield, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { products } from '@/lib/products';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
  const handleGetStarted = (productId: string) => {
    // Redirect to unified customization page
    window.location.href = `/plans/customize?product=${productId}`
  };

  const plans = [
    {
      id: 'monthly-subscription',
      name: 'AI-Generated Monthly Plan',
      price: '$29',
      period: '/month',
      description: 'Fresh AI-generated meal plans delivered monthly',
      popular: true,
      features: products[0].features,
      productId: 'monthly-subscription',
      color: 'teal',
      badge: 'POPULAR'
    },
    {
      id: 'annual-subscription',
      name: 'AI-Generated Annual Plan',
      price: '$299',
      period: '/year',
      description: 'Save $48/year with annual billing - best value!',
      savings: 'Save $48/year - Just $24.92/month',
      features: products[1].features,
      productId: 'annual-subscription',
      color: 'green',
      badge: 'BEST VALUE'
    },
    {
      id: 'ai-customized',
      name: 'AI-Customized Interactive',
      price: '$49',
      period: '/month',
      description: 'Chat with AI to customize your meal plans in real-time',
      features: products[2].features,
      productId: 'ai-customized',
      color: 'purple',
      badge: 'COMING FEB 2026',
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent"
        >
          Choose Your Wellness Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-900 max-w-3xl mx-auto"
        >
          Unlock access to all meal plans, recipes, and shopping lists. Start your journey to healthier eating today.
        </motion.p>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">SSL Secure</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Powered by Stripe</span>
          </div>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl overflow-hidden ${
                plan.popular
                  ? 'ring-4 ring-amber-400 shadow-2xl transform scale-105'
                  : 'shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-bl-lg">
                  <Star className="inline w-4 h-4 mr-1" />
                  Most Popular
                </div>
              )}

              {plan.savings && (
                <div className="absolute top-0 left-0 bg-green-500 text-white px-4 py-1 rounded-br-lg text-sm font-bold">
                  {plan.savings}
                </div>
              )}

              <div className="bg-white p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-900 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-900">{plan.period}</span>
                </div>

                <button
                  onClick={() => handleGetStarted(plan.productId)}
                  className={`w-full py-4 rounded-full font-semibold text-white transition-all transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600'
                      : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
                  }`}
                >
                  Get Started
                </button>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 text-${plan.color}-500 flex-shrink-0`} />
                      <span className="text-gray-900 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What's Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-white rounded-3xl shadow-xl p-12"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            What You Get
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-bold mb-2">30-Day Meal Calendar</h3>
              <p className="text-gray-900">
                Beautifully designed calendar with a different recipe for each day
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">30 Complete Recipes</h3>
              <p className="text-gray-900">
                Full instructions, ingredients, nutrition info, and cooking times for every recipe
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Beautiful PDF</h3>
              <p className="text-gray-900">
                Professional cover design delivered via email within 24 hours
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
            <p className="text-center text-gray-900 mb-4">
              <strong>8 Diet Plans Available:</strong> Mediterranean, Keto, Vegan, Paleo, Vegetarian, Intermittent Fasting, Family Focused, and Global Cuisine
            </p>
            <p className="text-center text-gray-900">
              <strong>Full Customization:</strong> Adjust for your family size, dietary restrictions, allergies, and food preferences
            </p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div>
              <h3 className="font-bold mb-2">When will I receive my meal plan?</h3>
              <p className="text-gray-900">Your personalized meal plan PDF will be delivered via email within 24 hours of purchase.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Can I customize my meal plan?</h3>
              <p className="text-gray-900">Yes! Choose your diet type, family size, dietary restrictions, allergies, and food preferences during checkout.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">How does the subscription work?</h3>
              <p className="text-gray-900">Get a fresh meal plan on the 1st of each month. You can update your preferences before each delivery.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-900">Absolutely. Cancel anytime with no commitment. You&apos;ll keep access to any meal plans you&apos;ve received.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}