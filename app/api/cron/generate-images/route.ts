import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateRecipeImage } from '@/lib/ai-image-generator'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// This endpoint is called by Vercel Cron every 30 minutes
// to generate images for recipes that don't have them yet
export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Verify this is a cron request (optional security check)
    const authHeader = request.headers.get('authorization')
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🎨 Starting image generation job...')

    // Get recipes without images (limit to 10 per run to avoid timeout)
    const { data: recipesWithoutImages, error } = await supabase
      .from('recipes')
      .select('id, name, description, meal_type, diet_type')
      .is('image_url', null)
      .limit(10)

    if (error) {
      console.error('Error fetching recipes:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!recipesWithoutImages || recipesWithoutImages.length === 0) {
      console.log('✅ No recipes need images')
      return NextResponse.json({
        success: true,
        message: 'No recipes need images',
        processed: 0,
        duration: Date.now() - startTime
      })
    }

    console.log(`📋 Found ${recipesWithoutImages.length} recipes without images`)

    const results = {
      processed: 0,
      succeeded: 0,
      failed: 0,
      errors: [] as string[]
    }

    // Process each recipe
    for (const recipe of recipesWithoutImages) {
      try {
        console.log(`🖼️  Generating image for: ${recipe.name}`)

        const result = await generateRecipeImage(
          recipe.id,
          recipe.name,
          recipe.description || '',
          recipe.meal_type || 'dinner',
          recipe.diet_type || 'general'
        )

        if (result.success && result.imageUrl) {
          console.log(`✅ Image generated: ${recipe.name}`)
          results.succeeded++
        } else {
          console.log(`⚠️  Failed to generate image: ${recipe.name}`)
          results.failed++
          results.errors.push(`${recipe.name}: ${result.error || 'Unknown error'}`)
        }

        results.processed++

      } catch (error) {
        console.error(`❌ Error processing recipe ${recipe.id}:`, error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        results.errors.push(`Recipe ${recipe.id}: ${errorMessage}`)
        results.failed++
        results.processed++
      }
    }

    const duration = Date.now() - startTime
    console.log(`\n✅ Image generation job completed in ${duration}ms`)
    console.log(`   Processed: ${results.processed}`)
    console.log(`   Succeeded: ${results.succeeded}`)
    console.log(`   Failed: ${results.failed}`)

    return NextResponse.json({
      success: true,
      ...results,
      duration
    })

  } catch (error) {
    console.error('❌ Image generation job error:', error)

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime
    }, { status: 500 })
  }
}
