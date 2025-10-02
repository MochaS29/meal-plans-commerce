import { NextRequest, NextResponse } from 'next/server'
import { generateRecipe, saveRecipeToDatabase, bulkGenerateRecipes } from '@/lib/ai-recipe-generator'
import { supabase } from '@/lib/supabase'
import { headers, cookies } from 'next/headers'
import { jwtVerify } from 'jose'

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

    // Check for admin authentication
    let isAdmin = false
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('admin-token')

      if (token) {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || 'your-jwt-secret-key'
        )
        const { payload } = await jwtVerify(token.value, secret)
        isAdmin = payload.role === 'admin'
      }
    } catch (error) {
      // Token verification failed
      isAdmin = false
    }

    // Bulk operations always require admin auth
    if (action === 'bulk' && !isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required for bulk generation' },
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

      let savedToDatabase = false
      let savedRecipe = null

      console.log('Supabase status:', supabase ? 'Connected' : 'Not configured')
      console.log('Generated recipe:', recipe?.name)

      if (recipe && supabase) {
        // Get diet plan ID or create a default one
        let dietPlanId = null

        const { data: dietPlan } = await supabase
          .from('diet_plans')
          .select('id')
          .eq('slug', dietType)
          .single()

        if (dietPlan) {
          dietPlanId = dietPlan.id
        } else {
          // Create diet plan if it doesn't exist
          const { data: newDietPlan } = await supabase
            .from('diet_plans')
            .insert({
              name: dietType.charAt(0).toUpperCase() + dietType.slice(1),
              slug: dietType,
              description: `${dietType} diet plan`,
              features: ['AI Generated Recipes'],
              price: 49
            })
            .select()
            .single()

          if (newDietPlan) {
            dietPlanId = newDietPlan.id
          }
        }

        if (dietPlanId) {
          savedRecipe = await saveRecipeToDatabase(recipe, [dietPlanId])
          savedToDatabase = !!savedRecipe
        }
      }

      return NextResponse.json({
        success: true,
        recipe,
        savedToDatabase,
        message: savedToDatabase
          ? 'Recipe generated and saved to library!'
          : 'Recipe generated (database not configured)'
      })
    } else if (action === 'batch') {
      // Generate multiple recipes
      const recipes = []
      let savedCount = 0

      // Get or create diet plan once for all recipes
      let dietPlanId = null
      if (supabase) {
        const { data: dietPlan } = await supabase
          .from('diet_plans')
          .select('id')
          .eq('slug', dietType)
          .single()

        if (dietPlan) {
          dietPlanId = dietPlan.id
        } else {
          // Create diet plan if it doesn't exist
          const { data: newDietPlan } = await supabase
            .from('diet_plans')
            .insert({
              name: dietType.charAt(0).toUpperCase() + dietType.slice(1),
              slug: dietType,
              description: `${dietType} diet plan`,
              features: ['AI Generated Recipes'],
              price: 49
            })
            .select()
            .single()

          if (newDietPlan) {
            dietPlanId = newDietPlan.id
          }
        }
      }

      for (let i = 0; i < count; i++) {
        const recipe = await generateRecipe({
          dietType,
          mealType,
          difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
          servings: 4
        })

        if (recipe) {
          recipes.push(recipe)

          if (supabase && dietPlanId) {
            const savedRecipe = await saveRecipeToDatabase(recipe, [dietPlanId])
            if (savedRecipe) savedCount++
          }
        }

        // Add delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      return NextResponse.json({
        success: true,
        count: recipes.length,
        savedCount,
        recipes,
        message: `Generated ${recipes.length} recipes, saved ${savedCount} to library`
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