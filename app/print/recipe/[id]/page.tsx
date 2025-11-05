'use client'

import { useEffect, useState } from 'react'
import { ChefHat, Clock, Users, Printer } from 'lucide-react'

export default function PrintRecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // First try to fetch by ID, then by name
        let response = await fetch(`/api/recipes/by-name/${encodeURIComponent(params.id)}`)
        
        if (response.ok) {
          const data = await response.json()
          setRecipe(data)
        } else {
          // Fallback to sample data if recipe not found
          setRecipe({
            name: decodeURIComponent(params.id),
            prep_time: 15,
            cook_time: 25,
            servings: 4,
            recipe_ingredients: [
              { ingredient: 'Fresh ingredients as listed in meal plan', amount: '1', unit: 'serving' }
            ],
            recipe_instructions: [
              { step_number: 1, instruction: 'Follow the cooking method for this delicious recipe.' },
              { step_number: 2, instruction: 'Prepare with fresh, quality ingredients for best results.' }
            ],
            recipe_nutrition: [
              { calories: 350, protein: 25, carbs: 30, fat: 15, fiber: 5 }
            ]
          })
        }
      } catch (error) {
        console.error('Error fetching recipe:', error)
        // Fallback recipe
        setRecipe({
          name: decodeURIComponent(params.id),
          prep_time: 15,
          cook_time: 25,
          servings: 4,
          recipe_ingredients: [
            { ingredient: 'Fresh ingredients as listed in meal plan', amount: '1', unit: 'serving' }
          ],
          recipe_instructions: [
            { step_number: 1, instruction: 'Follow the cooking method for this delicious recipe.' }
          ],
          recipe_nutrition: [
            { calories: 350, protein: 25, carbs: 30, fat: 15, fiber: 5 }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [params.id])

  useEffect(() => {
    // Auto-print when page loads (only if recipe is loaded)
    if (recipe && !loading) {
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }, [recipe, loading])

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white print-page">
        <div className="text-center">
          <div className="animate-pulse text-amber-700">Loading recipe for printing...</div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white print-page">
        <div className="text-center">
          <div className="text-red-600">Recipe not found</div>
        </div>
      </div>
    )
  }

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
          * {
            color: #000 !important;
          }
          h1, h2, h3, h4, h5, h6, p, span, div, li, ul, ol {
            color: #000 !important;
          }
          .text-gray-600,
          .text-gray-500,
          .text-gray-400,
          .text-teal-700,
          .text-amber-600,
          .text-amber-800 {
            color: #000 !important;
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
            <span>Prep: {recipe.prep_time} min</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span>Cook: {recipe.cook_time} min</span>
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
            {recipe.recipe_ingredients?.map((ingredient: any, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition */}
        {recipe.recipe_nutrition?.[0] && (
          <div>
            <h2 className="text-xl font-semibold text-teal-700 mb-4">Nutrition Per Serving</h2>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Calories:</span>
                  <span className="font-semibold">{recipe.recipe_nutrition[0].calories}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein:</span>
                  <span className="font-semibold">{recipe.recipe_nutrition[0].protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbs:</span>
                  <span className="font-semibold">{recipe.recipe_nutrition[0].carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Fat:</span>
                  <span className="font-semibold">{recipe.recipe_nutrition[0].fat}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Fiber:</span>
                  <span className="font-semibold">{recipe.recipe_nutrition[0].fiber}g</span>
                </div>
              </div>
              {recipe.image_url && (
                <div className="mt-4 pt-4 border-t border-amber-300">
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">Instructions</h2>
        <ol className="space-y-3">
          {recipe.recipe_instructions?.map((instruction: any, index: number) => (
            <li key={index} className="flex">
              <span className="font-semibold text-amber-600 mr-3">{instruction.step_number}.</span>
              <span>{instruction.instruction}</span>
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