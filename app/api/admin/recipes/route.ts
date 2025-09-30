import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/admin/recipes - Fetch all recipes with their details
export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({
      error: 'Database not configured',
      recipes: []
    })
  }

  try {
    const { searchParams } = new URL(request.url)
    const dietType = searchParams.get('diet')
    const mealType = searchParams.get('meal')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    let query = supabase
      .from('recipes')
      .select(`
        *,
        recipe_ingredients (
          ingredient,
          amount,
          unit,
          notes,
          order_index
        ),
        recipe_instructions (
          step_number,
          instruction
        ),
        recipe_nutrition (
          calories,
          protein,
          carbs,
          fat,
          fiber
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters if provided
    if (dietType) {
      const { data: dietPlan } = await supabase
        .from('diet_plans')
        .select('id')
        .eq('slug', dietType)
        .single()

      if (dietPlan) {
        query = query.contains('diet_plans', [dietPlan.id])
      }
    }

    const { data: recipes, error, count } = await query

    if (error) throw error

    // Get diet plan names for each recipe
    const recipesWithDietPlans = await Promise.all((recipes || []).map(async (recipe) => {
      const dietPlanNames = []
      if (recipe.diet_plans && recipe.diet_plans.length > 0) {
        const { data: plans } = await supabase
          .from('diet_plans')
          .select('name, slug')
          .in('id', recipe.diet_plans)

        dietPlanNames.push(...(plans || []))
      }

      return {
        ...recipe,
        diet_plan_names: dietPlanNames
      }
    }))

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      recipes: recipesWithDietPlans,
      total: totalCount || 0,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/recipes - Delete a recipe
export async function DELETE(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({
      error: 'Database not configured'
    }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const recipeId = searchParams.get('id')

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID required' },
        { status: 400 }
      )
    }

    // Delete recipe (cascades to related tables)
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', recipeId)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Recipe deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting recipe:', error)
    return NextResponse.json(
      { error: 'Failed to delete recipe' },
      { status: 500 }
    )
  }
}