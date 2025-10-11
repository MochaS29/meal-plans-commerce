import { NextRequest, NextResponse } from 'next/server'
import { generateRecipeImage } from '@/lib/ai-image-generator'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

// API endpoint to generate recipe images
// POST /api/generate-images

export async function POST(request: NextRequest) {
  try {
    // Check for admin authentication
    let isAdmin = false

    try {
      // Check cookie first
      const cookieStore = await cookies()
      const token = cookieStore.get('admin-token')

      if (token) {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || 'your-jwt-secret-key'
        )
        const { payload } = await jwtVerify(token.value, secret)
        isAdmin = payload.role === 'admin'
      }

      // If not admin yet, check Authorization header with API key
      if (!isAdmin) {
        const authHeader = request.headers.get('authorization')
        const adminApiKey = process.env.ADMIN_API_KEY

        if (authHeader && adminApiKey) {
          const bearerToken = authHeader.replace('Bearer ', '')
          isAdmin = bearerToken === adminApiKey
        }
      }
    } catch (error) {
      // Token verification failed
      isAdmin = false
    }

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const {
      recipeId,
      recipeName,
      description,
      mealType = 'dinner',
      dietType = 'general'
    } = body

    if (!recipeId || !recipeName) {
      return NextResponse.json(
        { error: 'Missing required fields: recipeId and recipeName' },
        { status: 400 }
      )
    }

    // Generate image
    const result = await generateRecipeImage(
      recipeId,
      recipeName,
      description || recipeName,
      mealType,
      dietType
    )

    if (result.success) {
      return NextResponse.json({
        success: true,
        imageUrl: result.imageUrl,
        message: 'Image generated and saved successfully'
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to generate image'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check image generation status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const recipeId = searchParams.get('recipeId')

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Missing recipeId parameter' },
        { status: 400 }
      )
    }

    // You would check the database here to see if the recipe has an image
    // For now, return basic info
    return NextResponse.json({
      message: 'Use POST to generate images for recipes',
      usage: {
        method: 'POST',
        body: {
          recipeId: 'uuid',
          recipeName: 'Recipe Name',
          description: 'Optional description',
          mealType: 'breakfast|lunch|dinner|snack',
          dietType: 'mediterranean|keto|vegan|paleo|vegetarian|family'
        }
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
