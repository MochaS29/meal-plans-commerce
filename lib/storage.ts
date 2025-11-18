import { put, del, list } from '@vercel/blob'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { EnhancedMealPlanPDFGenerator } from './pdf-generator-enhanced'

// Initialize Supabase client
function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables')
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// Generate hash from recipe IDs for caching
function generateRecipeHash(recipeIds: string[]): string {
  return crypto
    .createHash('sha256')
    .update(recipeIds.sort().join(','))
    .digest('hex')
}

// Upload PDF to Vercel Blob storage
export async function uploadPDFToStorage(
  buffer: Buffer,
  filename: string
): Promise<string> {
  try {
    // In development, return a mock URL
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('📁 Would upload PDF:', filename)
      return `https://mock-storage.vercel.app/${filename}`
    }

    // Upload to Vercel Blob
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'application/pdf',
    })

    console.log('✅ PDF uploaded to Vercel Blob:', blob.url)
    return blob.url
  } catch (error) {
    console.error('Failed to upload PDF:', error)
    throw new Error('Failed to upload PDF to storage')
  }
}

// Generate and upload meal plan PDF with caching
export async function generateAndUploadMealPlan(
  customerEmail: string,
  planType: string,
  sessionId: string,
  selectedRecipes?: any[],
  dietPlanId?: string,
  dietType?: string
): Promise<string> {
  try {
    console.log(`🎨 Processing meal plan for ${customerEmail} - ${planType}`)

    if (!selectedRecipes || selectedRecipes.length === 0) {
      throw new Error('No recipes provided for meal plan')
    }

    const supabase = getSupabaseClient()

    // Generate hash from recipe IDs
    const recipeIds = selectedRecipes.map(r => r.id).sort()
    const recipeHash = generateRecipeHash(recipeIds)

    console.log(`🔍 Checking for existing PDF (hash: ${recipeHash.substring(0, 12)}...)`)

    // Check if we already have a PDF with this exact recipe combination
    const { data: existingPdf, error: lookupError } = await supabase
      .from('meal_plan_pdfs')
      .select('*')
      .eq('recipe_hash', recipeHash)
      .eq('plan_type', planType)
      .single()

    if (existingPdf && !lookupError) {
      console.log(`♻️  Found existing PDF! Reusing instead of generating new one`)
      console.log(`📊 This PDF has been reused ${existingPdf.times_reused} times before`)

      // Update usage tracking
      await supabase
        .from('meal_plan_pdfs')
        .update({
          times_reused: existingPdf.times_reused + 1,
          last_used_at: new Date().toISOString()
        })
        .eq('id', existingPdf.id)

      // Link this customer to the existing PDF
      await supabase
        .from('customer_meal_plans')
        .insert({
          customer_email: customerEmail,
          meal_plan_pdf_id: existingPdf.id,
          stripe_session_id: sessionId,
          purchase_date: new Date().toISOString()
        })

      console.log(`✅ Linked customer to existing PDF: ${existingPdf.pdf_url}`)
      return existingPdf.pdf_url
    }

    // No existing PDF found, generate a new one
    console.log(`🎨 No existing PDF found. Generating new meal plan...`)
    const pdfBuffer = await generateMealPlanPDF(
      customerEmail,
      planType,
      selectedRecipes,
      dietType
    )

    // Generate filename
    const timestamp = Date.now()
    const filename = `meal-plans/${sessionId}-${timestamp}.pdf`

    // Upload to storage
    const pdfUrl = await uploadPDFToStorage(pdfBuffer, filename)

    // Calculate file size and page count
    const fileSizeBytes = pdfBuffer.length
    const pageCount = selectedRecipes.length + 4 // Cover + Calendar + Shopping + Recipes + Prep Guide

    // Save PDF metadata to database
    const { data: newPdf, error: saveError } = await supabase
      .from('meal_plan_pdfs')
      .insert({
        pdf_url: pdfUrl,
        diet_plan_id: dietPlanId || null,
        plan_type: planType,
        recipe_ids: recipeIds,
        recipe_hash: recipeHash,
        recipe_count: selectedRecipes.length,
        file_size_bytes: fileSizeBytes,
        page_count: pageCount,
        generation_date: new Date().toISOString(),
        times_reused: 0
      })
      .select()
      .single()

    if (saveError) {
      console.error('⚠️  Failed to save PDF metadata:', saveError)
      // Don't throw - PDF was still generated successfully
    } else {
      console.log(`💾 Saved PDF metadata to database (ID: ${newPdf.id})`)

      // Link customer to the new PDF
      await supabase
        .from('customer_meal_plans')
        .insert({
          customer_email: customerEmail,
          meal_plan_pdf_id: newPdf.id,
          stripe_session_id: sessionId,
          purchase_date: new Date().toISOString()
        })
    }

    console.log(`✅ PDF generated and uploaded: ${pdfUrl}`)
    return pdfUrl
  } catch (error) {
    console.error('Failed to generate and upload meal plan:', error)
    throw new Error('Failed to generate meal plan PDF')
  }
}

// Generate meal plan PDF with jsPDF (works in Vercel serverless)
async function generateMealPlanPDF(
  customerEmail: string,
  planType: string,
  recipes: any[],
  dietType?: string
): Promise<Buffer> {
  try {
    console.log(`🎨 Generating PDF for ${customerEmail} with ${recipes.length} recipes`)

    // Transform recipes array into MealPlan structure expected by the generator
    const currentDate = new Date()
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()

    // Separate recipes by meal type
    const dinnerRecipes = recipes.filter(r => r.meal_type === 'dinner' || r.meal_type === 'any')
    const breakfastRecipes = recipes.filter(r => r.meal_type === 'breakfast')
    const dessertRecipes = recipes.filter(r => r.meal_type === 'dessert')

    console.log(`📊 PDF Recipe breakdown: ${dinnerRecipes.length} dinners, ${breakfastRecipes.length} breakfasts, ${dessertRecipes.length} desserts`)

    // Build dailyMeals structure - assign ONLY dinners to days 1-30 (no reuse!)
    const dailyMeals: any = {}
    const maxDays = Math.min(30, dinnerRecipes.length) // Limit to 30 days or available dinners

    for (let i = 0; i < maxDays; i++) {
      const dayNum = i + 1
      const dinnerRecipe = dinnerRecipes[i]

      if (dinnerRecipe) {
        dailyMeals[`day_${dayNum}`] = {
          dinner: {
            name: dinnerRecipe.name,
            prep_time: dinnerRecipe.prep_time,
            cook_time: dinnerRecipe.cook_time,
            servings: dinnerRecipe.servings,
            difficulty: dinnerRecipe.difficulty
          }
          // FUTURE FEATURE: Add breakfast and lunch when implemented
          // breakfast: { ... },
          // lunch: { ... }
        }
      }
    }

    console.log(`✅ Created ${Object.keys(dailyMeals).length} days of meals (Day 1 - Day ${maxDays})`)

    // Build weekly shopping lists - group by weeks (ONLY for dinners)
    const weeklyShoppingLists: any = {}
    for (let week = 1; week <= Math.ceil(maxDays / 7); week++) {
      const startIdx = (week - 1) * 7
      const endIdx = Math.min(startIdx + 7, maxDays)
      const weekRecipes = dinnerRecipes.slice(startIdx, endIdx)

      // Aggregate ingredients from recipes with proper quantity combination
      const ingredients = new Map<string, {quantity: number, unit: string, rawQuantities: string[]}>()
      weekRecipes.forEach(recipe => {
        if (recipe.recipe_ingredients && Array.isArray(recipe.recipe_ingredients)) {
          recipe.recipe_ingredients.forEach((ing: any) => {
            const item = (ing.item || ing.ingredient || '').toLowerCase().trim()
            if (item) {
              const parsedQty = parseQuantity(ing.quantity || '0')
              const unit = (ing.unit || '').toLowerCase().trim()

              // Create a unique key combining item name and unit for proper aggregation
              const key = unit ? `${item}|${unit}` : item

              if (ingredients.has(key)) {
                const existing = ingredients.get(key)!
                existing.quantity += parsedQty
                existing.rawQuantities.push(ing.quantity || '0')
              } else {
                ingredients.set(key, {
                  quantity: parsedQty,
                  unit: unit,
                  rawQuantities: [ing.quantity || '0']
                })
              }
            }
          })
        }
      })

      // Convert to array format with combined quantities
      const items = Array.from(ingredients.entries()).map(([key, {quantity, unit, rawQuantities}]) => {
        const item = key.split('|')[0] // Extract item name from key
        return {
          item: item.charAt(0).toUpperCase() + item.slice(1), // Capitalize
          quantity: formatQuantity(quantity),
          unit: unit
        }
      })

      // Sort alphabetically for easier shopping
      items.sort((a, b) => a.item.localeCompare(b.item))

      weeklyShoppingLists[`week_${week}`] = items
    }

    // Build meal prep guide
    const mealPrepGuides: any = {
      sunday_prep: {
        title: 'Sunday Meal Prep Guide',
        sections: [
          {
            title: '🥗 Wash & Chop Vegetables',
            tasks: [
              'Wash all produce for the week',
              'Chop vegetables for quick cooking',
              'Store in airtight containers'
            ],
            timeEstimate: '30-45 minutes'
          },
          {
            title: '🍚 Cook Grains & Proteins',
            tasks: [
              'Cook rice, quinoa, or other grains in batch',
              'Grill or bake proteins for the week',
              'Hard-boil eggs for quick protein'
            ],
            timeEstimate: '45-60 minutes'
          }
        ]
      }
    }

    // Create meal plan object with BONUS recipes
    const mealPlan = {
      menuType: planType.toLowerCase().replace(/\s+/g, '-'),
      month,
      year,
      title: planType,
      dailyMeals,
      bonusRecipes: {
        breakfasts: breakfastRecipes.map(r => ({
          name: r.name,
          description: r.description,
          prep_time: r.prep_time,
          cook_time: r.cook_time,
          servings: r.servings,
          difficulty: r.difficulty
        })),
        desserts: dessertRecipes.map(r => ({
          name: r.name,
          description: r.description,
          prep_time: r.prep_time,
          cook_time: r.cook_time,
          servings: r.servings,
          difficulty: r.difficulty
        }))
      },
      weeklyShoppingLists,
      nutritionTargets: {},
      mealPrepGuides
    }

    console.log(`📦 PDF Meal Plan Structure:`)
    console.log(`   - ${Object.keys(dailyMeals).length} days (Day 1 - Day ${maxDays})`)
    console.log(`   - ${breakfastRecipes.length} BONUS breakfasts`)
    console.log(`   - ${dessertRecipes.length} BONUS desserts`)

    // Generate PDF using the enhanced generator
    const generator = new EnhancedMealPlanPDFGenerator()
    const pdfBlob = await generator.generateMealPlanPDF(mealPlan, {
      email: customerEmail
    }, dietType)

    // Convert Blob to Buffer for upload
    const arrayBuffer = await pdfBlob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log(`✅ PDF generated successfully (${buffer.length} bytes)`)
    return buffer
  } catch (error) {
    console.error('Error generating PDF with jsPDF:', error)
    throw error
  }
}

// Helper function to parse quantity strings into numbers
// Handles: "4", "1.5", "1/2", "2 1/2", etc.
function parseQuantity(qtyString: string): number {
  if (!qtyString || typeof qtyString !== 'string') return 0

  // Remove any extra whitespace
  const cleaned = qtyString.trim()

  // Handle fractions like "1/2", "1/4", "3/4"
  const fractionMatch = cleaned.match(/^(\d+)\/(\d+)$/)
  if (fractionMatch) {
    return parseInt(fractionMatch[1]) / parseInt(fractionMatch[2])
  }

  // Handle mixed numbers like "2 1/2", "1 3/4"
  const mixedMatch = cleaned.match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1])
    const numerator = parseInt(mixedMatch[2])
    const denominator = parseInt(mixedMatch[3])
    return whole + (numerator / denominator)
  }

  // Handle decimal numbers like "1.5", "2.25"
  const decimalMatch = cleaned.match(/^(\d+\.?\d*)/)
  if (decimalMatch) {
    return parseFloat(decimalMatch[1])
  }

  // Default to 0 if can't parse
  return 0
}

// Helper function to format quantities nicely
// Converts decimals to fractions when appropriate
function formatQuantity(qty: number): string {
  if (qty === 0) return '0'

  // If it's a whole number, return as is
  if (Number.isInteger(qty)) {
    return qty.toString()
  }

  // Convert common decimals to fractions
  const fractions: { [key: number]: string } = {
    0.25: '1/4',
    0.33: '1/3',
    0.5: '1/2',
    0.66: '2/3',
    0.75: '3/4'
  }

  // Check for whole number + fraction (like 2.5 = "2 1/2")
  const wholePart = Math.floor(qty)
  const decimalPart = qty - wholePart

  // Round decimal to 2 places for comparison
  const roundedDecimal = Math.round(decimalPart * 100) / 100

  if (fractions[roundedDecimal]) {
    return wholePart > 0
      ? `${wholePart} ${fractions[roundedDecimal]}`
      : fractions[roundedDecimal]
  }

  // Otherwise return as decimal with 1-2 decimal places
  return qty.toFixed(qty % 1 < 0.1 ? 0 : 1)
}

// Helper functions to generate sample data
function generateSampleMeals(planType: string) {
  // In production, these would be fetched from your content database
  const meals: Record<string, any> = {
    'Mediterranean Diet': {
      monday: {
        breakfast: 'Greek Yogurt with Honey and Walnuts',
        lunch: 'Mediterranean Quinoa Bowl',
        dinner: 'Grilled Salmon with Lemon Herbs'
      },
      tuesday: {
        breakfast: 'Whole Grain Toast with Avocado',
        lunch: 'Greek Salad with Feta',
        dinner: 'Chicken Souvlaki with Tzatziki'
      }
    },
    'Keto Diet': {
      monday: {
        breakfast: 'Scrambled Eggs with Avocado',
        lunch: 'Cauliflower Rice Bowl with Chicken',
        dinner: 'Ribeye Steak with Butter and Asparagus'
      },
      tuesday: {
        breakfast: 'Keto Smoothie with MCT Oil',
        lunch: 'Tuna Salad Lettuce Wraps',
        dinner: 'Baked Salmon with Broccoli'
      }
    }
  }

  return meals[planType] || meals['Mediterranean Diet']
}

function generateSampleShoppingLists() {
  return {
    week1: [
      'Fresh vegetables (spinach, tomatoes, cucumbers)',
      'Lean proteins (chicken, salmon, eggs)',
      'Whole grains (quinoa, brown rice)',
      'Healthy fats (olive oil, avocados)',
      'Fresh herbs and spices'
    ]
  }
}

// Delete a PDF from storage (for cleanup or GDPR compliance)
export async function deletePDFFromStorage(url: string): Promise<void> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('Would delete PDF:', url)
      return
    }

    await del(url)
    console.log('✅ PDF deleted from storage:', url)
  } catch (error) {
    console.error('Failed to delete PDF:', error)
    throw new Error('Failed to delete PDF from storage')
  }
}

// List all PDFs for a user (for account management)
export async function listUserPDFs(userId: string): Promise<string[]> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('Would list PDFs for user:', userId)
      return []
    }

    const { blobs } = await list({
      prefix: `meal-plans/${userId}`,
    })

    return blobs.map(blob => blob.url)
  } catch (error) {
    console.error('Failed to list PDFs:', error)
    return []
  }
}