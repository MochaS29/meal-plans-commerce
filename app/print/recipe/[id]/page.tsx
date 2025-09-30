'use client'

import { useEffect } from 'react'
import { ChefHat, Clock, Users, Printer } from 'lucide-react'

// Sample recipe data (in production, fetch from database based on ID)
const getRecipeData = (id: string) => {
  return {
    name: 'Mediterranean Quinoa Bowl',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: [
      '1 cup quinoa',
      '2 cups vegetable broth',
      '1 cucumber, diced',
      '2 tomatoes, chopped',
      '1/2 red onion, sliced',
      '1/2 cup kalamata olives',
      '1/2 cup feta cheese, crumbled',
      '3 tbsp olive oil',
      '2 tbsp lemon juice',
      '1 tsp oregano',
      'Salt and pepper to taste',
      'Fresh parsley for garnish'
    ],
    instructions: [
      'Rinse quinoa under cold water until water runs clear.',
      'In a medium saucepan, bring vegetable broth to a boil.',
      'Add quinoa, reduce heat to low, cover and simmer for 15 minutes.',
      'Remove from heat and let stand for 5 minutes, then fluff with a fork.',
      'While quinoa cooks, prepare vegetables: dice cucumber, chop tomatoes, slice onion.',
      'In a large bowl, combine cooked quinoa with prepared vegetables.',
      'Add olives and crumbled feta cheese.',
      'In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.',
      'Pour dressing over quinoa mixture and toss to combine.',
      'Garnish with fresh parsley and serve warm or at room temperature.'
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 14,
      fiber: 6
    }
  }
}

export default function PrintRecipePage({ params }: { params: { id: string } }) {
  const recipe = getRecipeData(params.id)

  useEffect(() => {
    // Auto-print when page loads
    setTimeout(() => {
      window.print()
    }, 500)
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white print-page">
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Print Button (hidden when printing) */}
      <button
        onClick={() => window.print()}
        className="no-print mb-4 bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700"
      >
        <Printer className="w-4 h-4" />
        Print Recipe
      </button>

      {/* Recipe Header */}
      <div className="border-b-2 border-amber-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-amber-800 mb-2">{recipe.name}</h1>
        <div className="flex gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Prep: {recipe.prepTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span>Cook: {recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Serves: {recipe.servings}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div>
          <h2 className="text-xl font-semibold text-teal-700 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition */}
        <div>
          <h2 className="text-xl font-semibold text-teal-700 mb-4">Nutrition Per Serving</h2>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>Calories:</span>
                <span className="font-semibold">{recipe.nutrition.calories}</span>
              </div>
              <div className="flex justify-between">
                <span>Protein:</span>
                <span className="font-semibold">{recipe.nutrition.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span>Carbs:</span>
                <span className="font-semibold">{recipe.nutrition.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fat:</span>
                <span className="font-semibold">{recipe.nutrition.fat}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fiber:</span>
                <span className="font-semibold">{recipe.nutrition.fiber}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">Instructions</h2>
        <ol className="space-y-3">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="flex">
              <span className="font-semibold text-amber-600 mr-3">{index + 1}.</span>
              <span>{instruction}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
        <p>From Mocha's MindLab Meal Plans • mochasmindlab.com</p>
      </div>
    </div>
  )
}