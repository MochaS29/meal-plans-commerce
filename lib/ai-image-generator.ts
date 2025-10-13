// AI Image Generation Module
// Generates food images for recipes using Google Gemini (Imagen), DALL-E 3, or other AI services

import OpenAI from 'openai'
import { GoogleGenAI } from '@google/genai'
import Replicate from 'replicate'
import { supabase } from './supabase'

interface RecipeImagePrompt {
  recipeName: string
  description: string
  mealType: string
  dietType: string
}

// Initialize Google GenAI client (Primary - Imagen)
let genai: GoogleGenAI | null = null
if (process.env.GOOGLE_AI_API_KEY) {
  genai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY })
}

// Initialize OpenAI client (DALL-E 3)
let openai: OpenAI | null = null
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
}

// Initialize Replicate client (FLUX models)
let replicate: Replicate | null = null
if (process.env.REPLICATE_API_TOKEN) {
  replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
  })
}

/**
 * Generate an optimized image prompt for food photography
 */
export function createFoodImagePrompt(recipe: RecipeImagePrompt): string {
  const { recipeName, description, mealType, dietType } = recipe

  // Create a professional food photography prompt
  const prompt = `Professional food photography of ${recipeName}, ${description}.
The dish is beautifully plated on a ${mealType === 'breakfast' ? 'breakfast table' : mealType === 'dinner' ? 'elegant dinner plate' : 'stylish serving dish'},
with natural lighting. The style is ${dietType === 'mediterranean' ? 'Mediterranean-inspired with vibrant colors' :
dietType === 'keto' ? 'keto-friendly with rich textures' :
dietType === 'vegan' ? 'plant-based with fresh ingredients' :
dietType === 'paleo' ? 'rustic and natural' :
dietType === 'vegetarian' ? 'colorful vegetarian cuisine' : 'family-friendly home cooking'}.
High-quality commercial food photography, appetizing presentation, shallow depth of field,
no text or labels, realistic, mouth-watering appearance.`

  return prompt.trim()
}

/**
 * Generate image using Google Imagen 4.0
 */
export async function generateWithGemini(
  prompt: string
): Promise<{ url: string; base64?: string } | null> {
  if (!genai) {
    console.log('⚠️  Google AI API key not configured')
    return null
  }

  try {
    console.log('  🎨 Generating with Google Imagen 4.0...')

    const response = await genai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
        imageSize: '1K'
      }
    })

    const images = response.generatedImages

    if (!images || images.length === 0) {
      console.log('  ⚠️  No images were generated. The prompt may have been blocked.')
      return null
    }

    const base64ImageBytes = images[0]?.image?.imageBytes

    if (!base64ImageBytes) {
      console.log('  ⚠️  No image data in response')
      return null
    }

    console.log('  ✅ Image generated successfully')

    // Return base64 encoded image
    return {
      url: '',
      base64: base64ImageBytes
    }
  } catch (error: any) {
    console.error('  ❌ Imagen error:', error.message)
    return null
  }
}

/**
 * Generate image using DALL-E 3 (OpenAI) - Fallback
 */
export async function generateWithDALLE3(
  prompt: string
): Promise<{ url: string; revised_prompt?: string } | null> {
  if (!openai) {
    console.log('⚠️  OpenAI API key not configured')
    return null
  }

  try {
    console.log('  🎨 Generating with DALL-E 3...')

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard', // Use 'hd' for higher quality (costs more)
      style: 'natural' // 'natural' or 'vivid'
    })

    if (response.data && response.data[0]) {
      return {
        url: response.data[0].url!,
        revised_prompt: response.data[0].revised_prompt
      }
    }

    return null
  } catch (error: any) {
    console.error('  ❌ DALL-E 3 error:', error.message)
    return null
  }
}

/**
 * Generate image using Replicate (FLUX models)
 */
export async function generateWithReplicate(
  prompt: string,
  model: 'flux-schnell' | 'flux-dev' | 'flux-pro' = 'flux-schnell'
): Promise<{ url: string } | null> {
  if (!replicate) {
    console.log('  ⚠️  Replicate API token not configured')
    return null
  }

  try {
    const modelMap = {
      'flux-schnell': 'black-forest-labs/flux-schnell',
      'flux-dev': 'black-forest-labs/flux-dev',
      'flux-pro': 'black-forest-labs/flux-1.1-pro'
    }

    const modelName = modelMap[model]
    console.log(`  🎨 Generating with Replicate ${model}...`)

    const output = await replicate.run(
      modelName as `${string}/${string}:${string}` | `${string}/${string}`,
      {
        input: {
          prompt,
          num_outputs: 1,
          aspect_ratio: '1:1',
          output_format: 'jpg',
          output_quality: 90
        }
      }
    ) as string[]

    if (!output || output.length === 0) {
      console.log('  ⚠️  No image generated by Replicate')
      return null
    }

    console.log('  ✅ Image generated successfully')

    return {
      url: output[0]
    }
  } catch (error: any) {
    console.error('  ❌ Replicate error:', error.message)
    return null
  }
}

/**
 * Download image from URL or base64 and upload to Supabase Storage
 */
export async function uploadImageToSupabase(
  imageUrl: string,
  recipeName: string,
  recipeId: string,
  base64Data?: string
): Promise<string | null> {
  if (!supabase) {
    console.log('  ⚠️  Supabase not configured, using temporary URL')
    return imageUrl
  }

  try {
    let buffer: Buffer

    // Handle base64 data
    if (base64Data) {
      buffer = Buffer.from(base64Data, 'base64')
    } else {
      // Download image from URL
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const arrayBuffer = await blob.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    }

    // Create filename
    const sanitizedName = recipeName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const filename = `recipes/${recipeId}/${sanitizedName}-${Date.now()}.png`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('recipe-images')
      .upload(filename, buffer, {
        contentType: 'image/png',
        upsert: false
      })

    if (error) {
      console.error('  ❌ Supabase upload error:', error.message)
      // Fall back to original URL
      return imageUrl
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(filename)

    return publicUrl
  } catch (error: any) {
    console.error('  ❌ Image upload error:', error.message)
    return imageUrl // Fall back to original URL
  }
}

/**
 * Generate and save recipe image
 */
export async function generateRecipeImage(
  recipeId: string,
  recipeName: string,
  description: string,
  mealType: string,
  dietType: string,
  provider?: 'replicate' | 'dalle3' | 'imagen' | 'auto'
): Promise<{ success: boolean; imageUrl?: string; error?: string; provider?: string }> {
  try {
    // Create optimized prompt
    const prompt = createFoodImagePrompt({
      recipeName,
      description,
      mealType,
      dietType
    })

    console.log(`\n  📸 Generating image for: ${recipeName}`)
    console.log(`  📝 Prompt: ${prompt.substring(0, 100)}...`)

    let imageResult: { url: string; base64?: string } | null = null
    let usedProvider = ''

    // Use specified provider or auto-detect
    const selectedProvider = provider || process.env.IMAGE_PROVIDER || 'auto'

    if (selectedProvider === 'replicate' && replicate) {
      const fluxModel = (process.env.REPLICATE_FLUX_MODEL || 'flux-schnell') as 'flux-schnell' | 'flux-dev' | 'flux-pro'
      imageResult = await generateWithReplicate(prompt, fluxModel)
      usedProvider = 'replicate'
    } else if (selectedProvider === 'dalle3' && openai) {
      imageResult = await generateWithDALLE3(prompt)
      usedProvider = 'dalle3'
    } else if (selectedProvider === 'imagen' && genai) {
      imageResult = await generateWithGemini(prompt)
      usedProvider = 'imagen'
    } else if (selectedProvider === 'auto') {
      // Auto fallback chain: Replicate (cheapest) -> DALL-E 3 -> Imagen
      if (replicate) {
        const fluxModel = (process.env.REPLICATE_FLUX_MODEL || 'flux-schnell') as 'flux-schnell' | 'flux-dev' | 'flux-pro'
        imageResult = await generateWithReplicate(prompt, fluxModel)
        usedProvider = 'replicate'
      }

      if (!imageResult && openai) {
        imageResult = await generateWithDALLE3(prompt)
        usedProvider = 'dalle3'
      }

      if (!imageResult && genai) {
        imageResult = await generateWithGemini(prompt)
        usedProvider = 'imagen'
      }
    }

    if (!imageResult) {
      return {
        success: false,
        error: 'No image generation service available or configured'
      }
    }

    console.log(`  ✅ Image generated successfully`)

    // Upload to Supabase Storage
    const finalUrl = await uploadImageToSupabase(
      imageResult.url,
      recipeName,
      recipeId,
      imageResult.base64
    )

    if (!finalUrl) {
      return {
        success: false,
        error: 'Failed to upload image'
      }
    }

    // Save to images table
    if (supabase) {
      const { error: dbError } = await supabase.from('images').insert({
        url: finalUrl,
        alt_text: `${recipeName} - ${description}`,
        caption: recipeName,
        entity_type: 'recipe',
        entity_id: recipeId,
        is_primary: true,
        metadata: {
          generated_by: usedProvider,
          prompt: ('revised_prompt' in imageResult ? imageResult.revised_prompt : undefined) || prompt,
          meal_type: mealType,
          diet_type: dietType
        }
      })

      if (dbError) {
        console.error('  ❌ Database error:', dbError.message)
        return {
          success: false,
          error: `Image generated but not saved to database: ${dbError.message}`
        }
      }
    }

    console.log(`  💾 Image saved to database (provider: ${usedProvider})`)

    return {
      success: true,
      imageUrl: finalUrl,
      provider: usedProvider
    }
  } catch (error: any) {
    console.error(`  ❌ Error generating image:`, error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Batch generate images for multiple recipes
 */
export async function batchGenerateRecipeImages(
  recipes: Array<{
    id: string
    name: string
    description: string
    meal_type?: string
    diet_plans?: string[]
  }>,
  delayMs: number = 5000 // Delay between requests to avoid rate limits
): Promise<{
  total: number
  successful: number
  failed: number
  results: Array<{ recipeId: string; recipeName: string; success: boolean; error?: string }>
}> {
  const results = []
  let successful = 0
  let failed = 0

  for (const recipe of recipes) {
    const result = await generateRecipeImage(
      recipe.id,
      recipe.name,
      recipe.description || '',
      recipe.meal_type || 'dinner',
      recipe.diet_plans?.[0] || 'general'
    )

    results.push({
      recipeId: recipe.id,
      recipeName: recipe.name,
      success: result.success,
      error: result.error
    })

    if (result.success) {
      successful++
    } else {
      failed++
    }

    // Add delay to avoid rate limits
    if (delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }

  return {
    total: recipes.length,
    successful,
    failed,
    results
  }
}
