'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Printer } from 'lucide-react'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const dietPlans: { [key: string]: string } = {
  'mediterranean': 'Mediterranean Diet',
  'keto': 'Keto Diet',
  'vegan': 'Vegan Diet',
  'paleo': 'Paleo Diet',
  'vegetarian': 'Vegetarian Diet',
  'intermittent-fasting': 'Intermittent Fasting',
  'family-focused': 'Family Focused',
}

function CalendarContent() {
  const searchParams = useSearchParams()
  const diet = searchParams.get('diet') || 'mediterranean'
  const month = parseInt(searchParams.get('month') || '1')
  const year = parseInt(searchParams.get('year') || '2025')
  const [mealPlanData, setMealPlanData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch real meal plan data from API
    const fetchMealPlan = async () => {
      try {
        const response = await fetch(`/api/meal-plans?menuType=${diet}&month=${month}&year=${year}`)
        if (response.ok) {
          const data = await response.json()
          setMealPlanData(data)
        } else {
          console.error('Failed to fetch meal plan data')
        }
      } catch (error) {
        console.error('Error fetching meal plan:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMealPlan()
  }, [diet, month, year])

  useEffect(() => {
    // Auto-print when page loads and data is ready
    if (!loading && mealPlanData) {
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }, [loading, mealPlanData])

  // Calculate first day of month
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay()

  // Get real meals for each day from API data
  const getMealsForDay = (dayNum: number) => {
    const dayKey = `day_${dayNum}`
    const dayMeals = mealPlanData?.dailyMeals?.[dayKey]

    if (dayMeals) {
      return {
        dinner: dayMeals.dinner?.name || 'No dinner planned',
        // FUTURE FEATURE: Uncomment when adding daily breakfast/lunch
        // breakfast: dayMeals.breakfast?.name || 'No breakfast planned',
        // lunch: dayMeals.lunch?.name || 'No lunch planned'
      }
    }

    return {
      dinner: 'Loading...',
      // FUTURE FEATURE: Uncomment when adding daily breakfast/lunch
      // breakfast: 'Loading...',
      // lunch: 'Loading...'
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto bg-white">
        <div className="text-center">
          <div className="animate-pulse text-amber-700">Loading your meal plan calendar...</div>
        </div>
      </div>
    )
  }

  return (
    <div id="calendar-to-print" className="p-8 max-w-7xl mx-auto bg-white">
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.3in;
            size: landscape;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            background: white !important;
          }

          /* Hide everything first */
          body * {
            visibility: hidden;
          }

          /* Show only the calendar and its children */
          #calendar-to-print,
          #calendar-to-print * {
            visibility: visible;
          }

          /* Position calendar at top of page */
          #calendar-to-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0.2in !important;
          }

          /* Make header more compact */
          #calendar-to-print h1 {
            font-size: 18px !important;
            margin-bottom: 4px !important;
          }

          #calendar-to-print p {
            font-size: 10px !important;
            margin-bottom: 8px !important;
          }

          /* Compact day headers */
          #calendar-to-print .grid > div {
            font-size: 9px !important;
            padding: 2px !important;
          }

          /* Make calendar cells smaller */
          #calendar-to-print .border-2 {
            min-height: 85px !important;
            padding: 3px !important;
            font-size: 8px !important;
          }

          /* Smaller day numbers */
          #calendar-to-print .border-2 > div:first-child {
            font-size: 11px !important;
            margin-bottom: 2px !important;
            padding-bottom: 1px !important;
          }

          /* Compact meal text */
          #calendar-to-print .space-y-1 {
            gap: 1px !important;
          }

          #calendar-to-print .space-y-1 > div {
            font-size: 7px !important;
            line-height: 1.2 !important;
          }

          /* Reduce grid gap */
          #calendar-to-print .grid {
            gap: 4px !important;
          }

          /* Compact footer */
          #calendar-to-print .mt-8 {
            margin-top: 8px !important;
            padding-top: 4px !important;
            font-size: 8px !important;
          }

          /* Hide the print button */
          .no-print {
            display: none !important;
          }

          * {
            color: #000 !important;
          }
          h1, h2, h3, h4, h5, h6, p, span, div, li {
            color: #000 !important;
          }
        }

        @media screen {
          .calendar-grid {
            max-width: 100%;
          }
        }
      `}</style>

      {/* Print Button (hidden when printing) */}
      <button
        onClick={() => window.print()}
        className="no-print mb-4 bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700"
      >
        <Printer className="w-4 h-4" />
        Print Calendar
      </button>

      {/* Calendar Header */}
      <div className="border-b-2 border-amber-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-amber-800 mb-2">
          {dietPlans[diet] || diet} - {months[month - 1]} {year}
        </h1>
        <p className="text-sm text-gray-900">30-Day Meal Plan Calendar</p>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {/* Day Headers */}
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <div key={day} className="text-center font-bold text-gray-900 py-2 bg-amber-100 border border-amber-200">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="border border-gray-200 bg-gray-50 min-h-[140px]" />
          ))}

          {/* Calendar Days */}
          {Array.from({ length: 30 }, (_, i) => {
            const dayNum = i + 1
            const meals = getMealsForDay(dayNum)

            return (
              <div
                key={dayNum}
                className="border-2 border-gray-300 p-2 min-h-[140px] bg-white"
              >
                <div className="font-bold text-lg text-gray-900 mb-2 pb-1 border-b border-gray-300">
                  {dayNum}
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-semibold text-gray-900">
                    <span className="text-purple-700">🍽️ Dinner:</span> {meals.dinner}
                  </div>
                  {/* FUTURE FEATURE: Uncomment when adding daily breakfast/lunch
                  <div className="font-semibold text-gray-900">
                    <span className="text-amber-800">🌅 Breakfast:</span> {meals.breakfast}
                  </div>
                  <div className="font-semibold text-gray-900">
                    <span className="text-teal-700">☀️ Lunch:</span> {meals.lunch}
                  </div>
                  */}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-900">
        <p className="font-bold mb-1">Meal Prep Tips:</p>
        <div className="text-left max-w-4xl mx-auto">
          <div>
            <strong className="text-purple-700">Dinner Prep:</strong> Chop vegetables and marinate proteins the night before. Batch cook grains and proteins on Sunday for easy weeknight meals. Check your BONUS recipes section for breakfast and dessert ideas!
          </div>
          {/* FUTURE FEATURE: Uncomment when adding daily breakfast/lunch
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <strong className="text-amber-800">Breakfast Prep:</strong> Prepare overnight oats, smoothie packs, or egg muffins in advance
            </div>
            <div>
              <strong className="text-teal-700">Lunch Prep:</strong> Batch cook proteins and grains on Sunday for easy assembly
            </div>
            <div>
              <strong className="text-purple-700">Dinner Prep:</strong> Chop vegetables and marinate proteins the night before
            </div>
          </div>
          */}
        </div>
        <p className="mt-4">© 2025 Mindful Meal Plan - Your Journey to Healthier Eating</p>
      </div>
    </div>
  )
}

export default function PrintCalendarPage() {
  return (
    <Suspense fallback={
      <div className="p-8 max-w-7xl mx-auto">
        <div className="text-center">Loading calendar...</div>
      </div>
    }>
      <CalendarContent />
    </Suspense>
  )
}