import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const recipeName = decodeURIComponent(name)
    
    if (!recipeName) {
      return NextResponse.json(
        { error: 'Recipe name is required' },
        { status: 400 }
      )
    }

    // Connect to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Search for recipe by name (case-insensitive, partial match)
    const { data: recipes, error: recipeError } = await supabase
      .from('recipes')
      .select(`
        *,
        recipe_ingredients (
          id,
          ingredient,
          amount,
          unit,
          notes,
          order_index
        ),
        recipe_instructions (
          id,
          step_number,
          instruction
        ),
        recipe_nutrition (
          id,
          calories,
          protein,
          carbs,
          fat,
          fiber
        ),
        images (
          id,
          url,
          is_primary
        )
      `)
      .ilike('name', `%${recipeName}%`)
      .order('created_at', { ascending: false })

    if (recipeError) {
      console.error('Recipe fetch error:', recipeError)
      return NextResponse.json(
        { error: 'Failed to fetch recipe' },
        { status: 500 }
      )
    }

    if (!recipes || recipes.length === 0) {
      // Return a placeholder recipe structure for missing recipes
      return NextResponse.json({
        id: 'placeholder',
        name: recipeName,
        description: `Delicious ${recipeName} recipe from your meal plan`,
        prep_time: 15,
        cook_time: 25,
        servings: 4,
        difficulty: 'medium',
        recipe_ingredients: [
          { ingredient: 'Fresh ingredients', amount: '1', unit: 'serving', notes: 'As specified in meal plan' }
        ],
        recipe_instructions: [
          { step_number: 1, instruction: 'Follow the cooking method for this delicious recipe.' },
          { step_number: 2, instruction: 'Prepare with fresh, quality ingredients for best results.' },
          { step_number: 3, instruction: 'Serve hot and enjoy as part of your healthy meal plan.' }
        ],
        recipe_nutrition: [
          { calories: 350, protein: 25, carbs: 30, fat: 15, fiber: 5 }
        ],
        images: [],
        placeholder: true
      })
    }

    // Get the best match (exact or closest)
    const recipe = recipes[0]

    // Sort ingredients by order_index
    if (recipe.recipe_ingredients) {
      recipe.recipe_ingredients.sort((a: any, b: any) => 
        (a.order_index || 0) - (b.order_index || 0)
      )
    }

    // Sort instructions by step_number
    if (recipe.recipe_instructions) {
      recipe.recipe_instructions.sort((a: any, b: any) => 
        a.step_number - b.step_number
      )
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error('Recipe API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}