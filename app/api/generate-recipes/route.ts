import { NextRequest, NextResponse } from 'next/server'
import { generateRecipe, saveRecipeToDatabase, bulkGenerateRecipes } from '@/lib/ai-recipe-generator'
import { supabase } from '@/lib/supabase'
import { headers } from 'next/headers'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// API endpoint to generate recipes on-demand
// POST /api/generate-recipes

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const windowMs = 60 * 60 * 1000 // 1 hour window
    const maxRequests = 10 // Max 10 requests per hour

    const userRateLimit = rateLimitStore.get(ip) || { count: 0, resetTime: now + windowMs }

    if (now > userRateLimit.resetTime) {
      userRateLimit.count = 0
      userRateLimit.resetTime = now + windowMs
    }

    if (userRateLimit.count >= maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    userRateLimit.count++
    rateLimitStore.set(ip, userRateLimit)

    // Parse body first
    const body = await request.json()
    const {
      action,
      dietType,
      mealType,
      count = 1,
      monthsToGenerate = 1
    } = body

    // Check for API key
    const authHeader = request.headers.get('authorization')
    const validKey = process.env.ADMIN_API_KEY || 'ba92ff3e18c089cc916f47f7e5eddeba03d3d71220f0914fbc2285d28aeed4e0'
    const hasValidAuth = authHeader === `Bearer ${validKey}`

    // Bulk operations always require auth
    if (action === 'bulk' && !hasValidAuth) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin API key required for bulk generation' },
        { status: 401 }
      )
    }

    // For single/batch operations, check if auth is provided and valid
    // If auth is provided, it must be valid
    if (authHeader && !hasValidAuth) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    if (action === 'bulk') {
      // Generate recipes for multiple months
      // This should be run as a background job in production
      await bulkGenerateRecipes(dietType, monthsToGenerate)

      return NextResponse.json({
        success: true,
        message: `Started generating ${monthsToGenerate} months of ${dietType} recipes`
      })
    } else if (action === 'single') {
      // Generate a single recipe
      const recipe = await generateRecipe({
        dietType,
        mealType,
        difficulty: 'medium',
        servings: 4
      })

      if (recipe && supabase) {
        // Get diet plan ID
        const { data: dietPlan } = await supabase
          .from('diet_plans')
          .select('id')
          .eq('slug', dietType)
          .single()

        if (dietPlan) {
          await saveRecipeToDatabase(recipe, [dietPlan.id])
        }
      }

      return NextResponse.json({
        success: true,
        recipe
      })
    } else if (action === 'batch') {
      // Generate multiple recipes
      const recipes = []

      for (let i = 0; i < count; i++) {
        const recipe = await generateRecipe({
          dietType,
          mealType,
          difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
          servings: 4
        })

        if (recipe) {
          recipes.push(recipe)

          if (supabase) {
            const { data: dietPlan } = await supabase
              .from('diet_plans')
              .select('id')
              .eq('slug', dietType)
              .single()

            if (dietPlan) {
              await saveRecipeToDatabase(recipe, [dietPlan.id])
            }
          }
        }

        // Add delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      return NextResponse.json({
        success: true,
        count: recipes.length,
        recipes
      })
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "single", "batch", or "bulk"' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Recipe generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recipes' },
      { status: 500 }
    )
  }
}

// GET endpoint to check generation status
export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({
      error: 'Database not configured',
      recipesCount: 0
    })
  }

  try {
    // Get recipe counts per diet plan
    const { data: dietPlans } = await supabase
      .from('diet_plans')
      .select('id, name, slug')

    const stats = []

    for (const plan of dietPlans || []) {
      const { count } = await supabase
        .from('recipes')
        .select('*', { count: 'exact', head: true })
        .contains('diet_plans', [plan.id])

      stats.push({
        dietPlan: plan.name,
        slug: plan.slug,
        recipeCount: count || 0
      })
    }

    return NextResponse.json({
      success: true,
      stats,
      message: 'Use POST with action:"single", "batch", or "bulk" to generate recipes'
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}