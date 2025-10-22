'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Activity, Flame, Utensils } from 'lucide-react'

// TODO: USER INPUT NEEDED
// This component displays nutritional tracking for users
// Integrate this into your user portal once you have meal plan data

interface NutritionalData {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

interface NutritionalDashboardProps {
  weeklyData?: NutritionalData[]
  dailyTarget?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  currentWeek?: number
}

export default function NutritionalDashboard({
  weeklyData = [],
  dailyTarget = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  },
  currentWeek = 1
}: NutritionalDashboardProps) {
  const [selectedDay, setSelectedDay] = useState<number>(0)

  // Calculate weekly averages
  const weeklyAverage = weeklyData.length > 0 ? {
    calories: Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / weeklyData.length),
    protein: Math.round(weeklyData.reduce((sum, day) => sum + day.protein, 0) / weeklyData.length),
    carbs: Math.round(weeklyData.reduce((sum, day) => sum + day.carbs, 0) / weeklyData.length),
    fat: Math.round(weeklyData.reduce((sum, day) => sum + day.fat, 0) / weeklyData.length)
  } : dailyTarget

  const calculatePercentage = (actual: number, target: number) => {
    return Math.round((actual / target) * 100)
  }

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90 && percentage <= 110) return 'text-green-600 bg-green-100'
    if (percentage >= 80 && percentage <= 120) return 'text-amber-600 bg-amber-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-amber-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Nutritional Dashboard</h2>
        <p className="opacity-90">Week {currentWeek} - Tracking your wellness journey</p>
      </div>

      {/* Weekly Average Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Calories */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-600">Calories</span>
            </div>
            {weeklyAverage.calories > dailyTarget.calories ? (
              <TrendingUp className="w-4 h-4 text-orange-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-blue-500" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">{weeklyAverage.calories}</p>
            <p className="text-xs text-gray-500">Target: {dailyTarget.calories}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(calculatePercentage(weeklyAverage.calories, dailyTarget.calories), 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Protein */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Protein</span>
            </div>
            {weeklyAverage.protein > dailyTarget.protein ? (
              <TrendingUp className="w-4 h-4 text-blue-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">{weeklyAverage.protein}g</p>
            <p className="text-xs text-gray-500">Target: {dailyTarget.protein}g</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(calculatePercentage(weeklyAverage.protein, dailyTarget.protein), 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Carbs */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Carbs</span>
            </div>
            {weeklyAverage.carbs > dailyTarget.carbs ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">{weeklyAverage.carbs}g</p>
            <p className="text-xs text-gray-500">Target: {dailyTarget.carbs}g</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(calculatePercentage(weeklyAverage.carbs, dailyTarget.carbs), 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Fat */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">Fat</span>
            </div>
            {weeklyAverage.fat > dailyTarget.fat ? (
              <TrendingUp className="w-4 h-4 text-purple-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">{weeklyAverage.fat}g</p>
            <p className="text-xs text-gray-500">Target: {dailyTarget.fat}g</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(calculatePercentage(weeklyAverage.fat, dailyTarget.fat), 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Macro Distribution Pie Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Macronutrient Distribution</h3>

        <div className="flex items-center justify-center gap-8">
          {/* Simple circular progress indicators */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="transform -rotate-90 w-24 h-24">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${calculatePercentage(weeklyAverage.protein * 4, weeklyAverage.calories) * 2.51} 251`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900">
                  {calculatePercentage(weeklyAverage.protein * 4, weeklyAverage.calories)}%
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Protein</p>
          </div>

          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="transform -rotate-90 w-24 h-24">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${calculatePercentage(weeklyAverage.carbs * 4, weeklyAverage.calories) * 2.51} 251`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900">
                  {calculatePercentage(weeklyAverage.carbs * 4, weeklyAverage.calories)}%
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Carbs</p>
          </div>

          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="transform -rotate-90 w-24 h-24">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#a855f7"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${calculatePercentage(weeklyAverage.fat * 9, weeklyAverage.calories) * 2.51} 251`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900">
                  {calculatePercentage(weeklyAverage.fat * 9, weeklyAverage.calories)}%
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Fat</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          Based on average daily intake • Total: {weeklyAverage.calories} calories
        </p>
      </div>

      {/* Insights & Tips */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-teal-900 mb-3">💡 Wellness Insights</h3>
        <ul className="space-y-2 text-sm text-teal-800">
          {weeklyAverage.protein < dailyTarget.protein * 0.9 && (
            <li>• Consider adding more protein-rich foods to meet your daily target</li>
          )}
          {weeklyAverage.calories > dailyTarget.calories * 1.1 && (
            <li>• Your calorie intake is above target - check portion sizes</li>
          )}
          {weeklyAverage.calories < dailyTarget.calories * 0.9 && (
            <li>• You're under your calorie target - make sure you're eating enough!</li>
          )}
          <li>• Great job staying consistent with your meal plan this week!</li>
        </ul>
      </div>
    </div>
  )
}

// TODO: USER INPUT NEEDED
// Example usage in user portal:
/*
import NutritionalDashboard from '@/components/NutritionalDashboard'

// Get user's meal plan data for current week
const weekData = await getUserWeeklyNutrition(userId, currentWeek)

<NutritionalDashboard
  weeklyData={weekData}
  dailyTarget={userPreferences.nutritionTargets}
  currentWeek={currentWeek}
/>
*/
