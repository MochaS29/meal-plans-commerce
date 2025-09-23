'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Star, Shield, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'custom' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (priceId: string, planType: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planType,
          successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: '$79',
      period: '/month',
      description: 'Perfect for trying our meal planning service',
      features: [
        'Access to all 7 menu types',
        'Complete monthly meal calendar',
        'Weekly shopping lists',
        'Detailed recipes with instructions',
        'Downloadable PDF meal plans',
        'Nutritional information',
        'Meal prep guides',
        'Mobile app access',
        'Email support'
      ],
      priceId: 'price_monthly_79',
      color: 'teal'
    },
    {
      id: 'custom',
      name: 'Custom Family Plan',
      price: '$149',
      period: '/month',
      description: 'Tailored for your family\'s unique needs',
      popular: true,
      features: [
        'Everything in Monthly Plan',
        'Customized for family size',
        'Kid-friendly meal options',
        'Allergy & preference adjustments',
        'Bulk shopping lists',
        'Family meal prep strategies',
        'Priority support',
        'Recipe scaling for 4-6 people'
      ],
      priceId: 'price_family_149',
      color: 'amber'
    },
    {
      id: 'annual',
      name: 'Annual Plan',
      price: '$29',
      period: '/month',
      description: 'Best value - billed annually ($348/year)',
      savings: 'Save $600/year',
      features: [
        'Everything in Family Plan',
        'Exclusive seasonal menus',
        'Advanced meal planning AI',
        'Personalized nutrition coaching',
        'Recipe collection downloads',
        'Early access to new features',
        'VIP customer support',
        'Free cooking masterclasses'
      ],
      priceId: 'price_annual_348',
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
            Mocha&apos;s MindLab
          </Link>
          <Link href="/" className="text-gray-600 hover:text-teal-600 transition">
            ← Back to Home
          </Link>
        </div>
      </div>

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
          className="text-xl text-gray-600 max-w-3xl mx-auto"
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
        <div className="grid md:grid-cols-3 gap-8">
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
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>

                <button
                  onClick={() => handleCheckout(plan.priceId, plan.id)}
                  disabled={loading}
                  className={`w-full py-4 rounded-full font-semibold text-white transition-all transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                      : plan.id === 'annual'
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
                      : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Get Started'}
                </button>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 text-${plan.color}-500 flex-shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
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
            <Lock className="inline w-8 h-8 mr-3 text-amber-500" />
            What&apos;s Protected Behind Payment
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Meal Calendars</h3>
              <p className="text-gray-600">
                Full month of planned meals for breakfast, lunch, dinner & snacks
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Detailed Recipes + PDFs</h3>
              <p className="text-gray-600">
                Step-by-step instructions with downloadable PDF versions for offline use
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Shopping Lists</h3>
              <p className="text-gray-600">
                Weekly organized lists with quantities and estimated costs
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
            <p className="text-center text-gray-600">
              <strong>Free Preview Available:</strong> Explore our sample calendar, shopping list, and select recipes before subscribing
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/calendar" className="text-teal-600 hover:text-teal-700 font-semibold">
                View Sample Calendar →
              </Link>
              <Link href="/shopping-list" className="text-amber-600 hover:text-amber-700 font-semibold">
                Sample Shopping List →
              </Link>
            </div>
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
              <h3 className="font-bold mb-2">When do I get access?</h3>
              <p className="text-gray-600">Immediately after payment, you&apos;ll receive full access to all meal plans and features.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Can I switch menu types?</h3>
              <p className="text-gray-600">Yes! You can switch between all 7 menu types anytime during your subscription.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Is there a mobile app?</h3>
              <p className="text-gray-600">Yes, our mobile app is included with all plans for iOS and Android.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Absolutely. Cancel anytime from your account dashboard, no questions asked.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}