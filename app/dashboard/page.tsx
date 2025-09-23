'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, ShoppingCart, Book, FileText, Check, Loader } from 'lucide-react';
import Link from 'next/link';

interface MealPlanAccess {
  menuType: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
}

const availablePlans: MealPlanAccess[] = [
  {
    menuType: 'mediterranean',
    displayName: 'Mediterranean',
    description: 'Heart-healthy cuisine with anti-inflammatory benefits',
    icon: '🌊',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    menuType: 'intermittent-fasting',
    displayName: 'Intermittent Fasting',
    description: '16:8 time-restricted eating for metabolic health',
    icon: '⏰',
    color: 'from-purple-500 to-pink-500'
  },
  {
    menuType: 'family-focused',
    displayName: 'Family Focused',
    description: 'Kid-friendly meals for the whole family',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-amber-500 to-orange-500'
  },
  {
    menuType: 'paleo',
    displayName: 'Paleo',
    description: 'Ancestral eating for optimal health',
    icon: '🦴',
    color: 'from-green-500 to-teal-500'
  },
  {
    menuType: 'vegetarian',
    displayName: 'Vegetarian',
    description: 'Plant-powered nutrition',
    icon: '🥬',
    color: 'from-green-600 to-lime-500'
  },
  {
    menuType: 'vegan',
    displayName: 'Vegan',
    description: '100% plant-based excellence',
    icon: '🌱',
    color: 'from-emerald-500 to-green-500'
  },
  {
    menuType: 'global-cuisine',
    displayName: 'Global Cuisine',
    description: 'World tour of healthy flavors',
    icon: '🌍',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [downloadingPlan, setDownloadingPlan] = useState<string | null>(null);
  const [downloadedPlans, setDownloadedPlans] = useState<Set<string>>(new Set());

  const handleDownloadPDF = async (menuType: string) => {
    setDownloadingPlan(menuType);

    try {
      const response = await fetch(
        `/api/download-pdf?menuType=${menuType}&month=${selectedMonth}&year=${selectedYear}&demo=true`
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${menuType}-${selectedYear}-${selectedMonth.padStart(2, '0')}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Mark as downloaded
        setDownloadedPlans(prev => new Set([...prev, menuType]));
      } else {
        alert('Failed to download PDF. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('An error occurred while downloading the PDF.');
    } finally {
      setDownloadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
            Mocha&apos;s MindLab
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              ✓ Active Subscription
            </span>
            <button className="text-gray-600 hover:text-gray-800">
              Account Settings
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome to Your Meal Plan Dashboard</h1>
          <p className="text-gray-600">Access and download your personalized meal plans, shopping lists, and recipes</p>
        </motion.div>

        {/* Month/Year Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4">Select Month</h2>
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-4 mb-8"
        >
          <Link
            href="/calendar"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex items-center gap-4"
          >
            <Calendar className="w-8 h-8 text-teal-600" />
            <div>
              <h3 className="font-semibold">View Calendar</h3>
              <p className="text-sm text-gray-600">Interactive meal calendar</p>
            </div>
          </Link>

          <Link
            href="/shopping-list"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex items-center gap-4"
          >
            <ShoppingCart className="w-8 h-8 text-amber-600" />
            <div>
              <h3 className="font-semibold">Shopping Lists</h3>
              <p className="text-sm text-gray-600">Weekly grocery lists</p>
            </div>
          </Link>

          <Link
            href="/recipes"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex items-center gap-4"
          >
            <Book className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-semibold">Recipe Collection</h3>
              <p className="text-sm text-gray-600">All your recipes</p>
            </div>
          </Link>

          <Link
            href="/meal-prep"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex items-center gap-4"
          >
            <FileText className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold">Meal Prep Guide</h3>
              <p className="text-sm text-gray-600">Weekly prep strategies</p>
            </div>
          </Link>
        </motion.div>

        {/* Downloadable Meal Plans */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Download Your Meal Plans</h2>
          <p className="text-gray-600 mb-8">
            Download complete PDF versions of your meal plans including calendars, shopping lists, recipes, and prep guides.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <motion.div
                key={plan.menuType}
                whileHover={{ scale: 1.02 }}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{plan.icon}</span>
                    <h3 className="font-bold text-lg">{plan.displayName}</h3>
                  </div>
                  {downloadedPlans.has(plan.menuType) && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                <button
                  onClick={() => handleDownloadPDF(plan.menuType)}
                  disabled={downloadingPlan === plan.menuType}
                  className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${plan.color} hover:opacity-90 transition flex items-center justify-center gap-2`}
                >
                  {downloadingPlan === plan.menuType ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download PDF
                    </>
                  )}
                </button>

                <div className="mt-3 text-xs text-gray-500 text-center">
                  Includes: Calendar • Recipes • Shopping Lists • Prep Guide
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-teal-600 to-amber-600 rounded-2xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Pro Tips for Success</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">📱 Mobile App</h3>
              <p className="text-sm opacity-90">
                Download our mobile app to access your meal plans on the go and get cooking timers
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎯 Meal Prep Sundays</h3>
              <p className="text-sm opacity-90">
                Use the meal prep guides to save 5+ hours during the week
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💬 Community Support</h3>
              <p className="text-sm opacity-90">
                Join our Facebook group to share tips and get motivation from others
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}