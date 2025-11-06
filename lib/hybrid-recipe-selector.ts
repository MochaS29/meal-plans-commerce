// Hybrid recipe selection system
// Combines existing recipes from library with newly generated ones
// This ensures customers get fresh content while building the database

import { supabase } from './supabase'
import { generateRecipe, saveRecipeToDatabase } from './ai-recipe-generator'

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

interface RecipeSelectionConfig {
  dietType: string
  totalRecipes: number
  newRecipesPercentage?: number // Default 20% new recipes
  mealTypes?: MealType[]
}

interface SelectedRecipe {
  id: string
  name: string
  description: string
  mealType: string
  isNew: boolean
  [key: string]: any
}

export async function selectRecipesForCustomer(config: RecipeSelectionConfig): Promise<SelectedRecipe[]> {
  const {
    dietType,
    totalRecipes,
    newRecipesPercentage = 20, // 20% new recipes by default
    mealTypes = ['breakfast', 'lunch', 'dinner', 'snack']
  } = config

  const newRecipesCount = Math.ceil(totalRecipes * (newRecipesPercentage / 100))
  const existingRecipesCount = totalRecipes - newRecipesCount

  console.log(`📚 Selecting ${totalRecipes} recipes for ${dietType} diet`)
  console.log(`  - ${existingRecipesCount} from library`)
  console.log(`  - ${newRecipesCount} newly generated`)

  const selectedRecipes: SelectedRecipe[] = []

  // Step 1: Get existing recipes from library
  if (supabase && existingRecipesCount > 0) {
    try {
      // First get diet plan ID
      const { data: dietPlans } = await supabase
        .from('diet_plans')
        .select('id')
        .eq('slug', dietType)
        .single()

      if (dietPlans) {
        // Get random recipes from library, filtered by meal types
        let query = supabase
          .from('recipes')
          .select('*')
          .contains('diet_plans', [dietPlans.id])

        // Filter by meal types if specified
        if (mealTypes && mealTypes.length > 0) {
          query = query.in('meal_type', mealTypes)
        }

        const { data: existingRecipes } = await query.limit(existingRecipesCount * 2) // Get extra for variety

        if (existingRecipes && existingRecipes.length > 0) {
          // Randomly select from existing recipes
          const shuffled = existingRecipes.sort(() => 0.5 - Math.random())
          const selected = shuffled.slice(0, existingRecipesCount)

          selected.forEach(recipe => {
            selectedRecipes.push({
              ...recipe,
              mealType: recipe.meal_type || determineMealType(recipe.name),
              isNew: false
            })
          })

          console.log(`✅ Selected ${selected.length} recipes from library (meal types: ${mealTypes.join(', ')})`)
        }
      }
    } catch (error) {
      console.error('Error selecting from library:', error)
    }
  }

  // Step 2: Generate new recipes to fill the gap
  const recipesToGenerate = totalRecipes - selectedRecipes.length
  if (recipesToGenerate > 0) {
    console.log(`🎨 Generating ${recipesToGenerate} new recipes...`)

    // Distribute new recipes across meal types
    const recipesPerMealType = Math.ceil(recipesToGenerate / mealTypes.length)

    for (const mealType of mealTypes) {
      const count = Math.min(recipesPerMealType, recipesToGenerate - selectedRecipes.length + existingRecipesCount)

      for (let i = 0; i < count; i++) {
        if (selectedRecipes.length >= totalRecipes) break

        try {
          // Generate new recipe
          const newRecipe = await generateRecipe({
            dietType,
            mealType,
            difficulty: 'medium',
            servings: 4
          })

          if (newRecipe) {
            // Save to database for future use
            let savedRecipe = null
            if (supabase) {
              // Get diet plan ID first
              const { data: dietPlan } = await supabase
                .from('diet_plans')
                .select('id')
                .eq('slug', dietType)
                .single()

              if (dietPlan) {
                savedRecipe = await saveRecipeToDatabase(newRecipe, [dietPlan.id])
              }
            }

            selectedRecipes.push({
              id: savedRecipe?.id || `temp-${Date.now()}-${i}`,
              ...newRecipe,
              mealType,
              isNew: true
            })

            console.log(`✨ Generated new ${mealType}: ${newRecipe.name}`)
          }
        } catch (error) {
          console.error(`Error generating ${mealType} recipe:`, error)
        }
      }
    }
  }

  // Step 3: Balance meal types
  const balanced = balanceRecipesByMealType(selectedRecipes, mealTypes)

  console.log(`\n📊 Final selection:`)
  console.log(`  - Total: ${balanced.length} recipes`)
  console.log(`  - From library: ${balanced.filter(r => !r.isNew).length}`)
  console.log(`  - Newly generated: ${balanced.filter(r => r.isNew).length}`)

  return balanced
}

// Helper function to determine meal type from recipe name
function determineMealType(recipeName: string): MealType {
  const name = recipeName.toLowerCase()

  if (name.includes('breakfast') || name.includes('pancake') || name.includes('oatmeal') ||
      name.includes('egg') || name.includes('toast') || name.includes('smoothie bowl')) {
    return 'breakfast'
  }

  if (name.includes('snack') || name.includes('bites') || name.includes('chips') ||
      name.includes('dip') || name.includes('trail mix')) {
    return 'snack'
  }

  if (name.includes('salad') || name.includes('sandwich') || name.includes('wrap') ||
      name.includes('soup') || name.includes('lunch')) {
    return 'lunch'
  }

  return 'dinner'
}

// Balance recipes across meal types
function balanceRecipesByMealType(recipes: SelectedRecipe[], mealTypes: MealType[]): SelectedRecipe[] {
  const balanced: SelectedRecipe[] = []
  const recipesByType: { [key: string]: SelectedRecipe[] } = {}

  // Group by meal type
  mealTypes.forEach(type => {
    recipesByType[type] = recipes.filter(r => r.mealType === type)
  })

  // Calculate target per meal type
  const targetPerType = Math.ceil(recipes.length / mealTypes.length)

  // Distribute evenly
  mealTypes.forEach(type => {
    const available = recipesByType[type]
    const toAdd = Math.min(available.length, targetPerType)
    balanced.push(...available.slice(0, toAdd))
  })

  // Add remaining if any
  const remaining = recipes.filter(r => !balanced.includes(r))
  balanced.push(...remaining)

  return balanced
}

// Get monthly recipe selection for a customer
export async function getMonthlyMenuWithHybridSelection(
  dietType: string,
  month: number = 1
): Promise<{ week: number; recipes: SelectedRecipe[] }[]> {
  const daysInMonth = 30 // Standard month length
  const totalRecipes = daysInMonth

  // Select recipes with 25% being new for variety
  const selectedRecipes = await selectRecipesForCustomer({
    dietType,
    totalRecipes,
    newRecipesPercentage: 25 // 25% new recipes each month
  })

  // Organize into weeks (30 days = 4 weeks + 2 days)
  const weeklyMenus = []
  const recipesPerWeek = 7
  let recipeIndex = 0

  for (let week = 1; week <= 5; week++) {
    const daysInThisWeek = week <= 4 ? 7 : 2 // First 4 weeks get 7 days, 5th week gets 2 days
    const weekRecipes = selectedRecipes.slice(recipeIndex, recipeIndex + daysInThisWeek)

    if (weekRecipes.length > 0) {
      weeklyMenus.push({
        week,
        recipes: weekRecipes
      })
    }

    recipeIndex += daysInThisWeek
  }

  return weeklyMenus
}

// Track which recipes have been sent to which customers
export async function trackCustomerRecipes(
  customerId: string,
  recipeIds: string[],
  month: string
): Promise<void> {
  if (!supabase) return

  try {
    // Create a customer_recipes table if it doesn't exist
    // This would track which recipes each customer has received
    const records = recipeIds.map(recipeId => ({
      customer_id: customerId,
      recipe_id: recipeId,
      sent_month: month,
      created_at: new Date().toISOString()
    }))

    const { error } = await supabase
      .from('customer_recipes')
      .insert(records)

    if (error) {
      console.error('Error tracking customer recipes:', error)
    }
  } catch (error) {
    console.error('Error in trackCustomerRecipes:', error)
  }
}

// Get recipes that haven't been sent to a customer yet
export async function getUnsentRecipesForCustomer(
  customerId: string,
  dietType: string,
  limit: number = 20
): Promise<any[]> {
  if (!supabase) return []

  try {
    // Get recipes customer hasn't received yet
    const { data: sentRecipeIds } = await supabase
      .from('customer_recipes')
      .select('recipe_id')
      .eq('customer_id', customerId)

    const sentIds = sentRecipeIds?.map(r => r.recipe_id) || []

    // Get diet plan ID
    const { data: dietPlan } = await supabase
      .from('diet_plans')
      .select('id')
      .eq('slug', dietType)
      .single()

    if (!dietPlan) return []

    // Get unsent recipes
    const { data: unsentRecipes } = await supabase
      .from('recipes')
      .select('*')
      .contains('diet_plans', [dietPlan.id])
      .not('id', 'in', `(${sentIds.join(',')})`)
      .limit(limit)

    return unsentRecipes || []
  } catch (error) {
    console.error('Error getting unsent recipes:', error)
    return []
  }
}