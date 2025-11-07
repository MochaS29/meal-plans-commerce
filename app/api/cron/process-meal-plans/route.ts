import { NextRequest, NextResponse } from 'next/server'
import { getPendingMealPlanJobs, updateMealPlanJobStatus } from '@/lib/supabase'
import { selectRecipesForCustomer, trackCustomerRecipes } from '@/lib/hybrid-recipe-selector'
import { generateAndUploadMealPlan } from '@/lib/storage'
import { sendEmail, getMealPlanEmailTemplate } from '@/lib/email'

// This endpoint is called by Vercel Cron once daily at 5pm UTC (9am Pacific)
// to process pending meal plan jobs
export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Verify this is a cron request (optional security check)
    const authHeader = request.headers.get('authorization')
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔄 Starting meal plan job processor...')

    // Get pending jobs (process up to 5 at a time to avoid timeout)
    const pendingJobs = await getPendingMealPlanJobs(5)

    if (pendingJobs.length === 0) {
      console.log('✅ No pending jobs to process')
      return NextResponse.json({
        success: true,
        message: 'No pending jobs',
        processed: 0,
        duration: Date.now() - startTime
      })
    }

    console.log(`📋 Found ${pendingJobs.length} pending jobs to process`)

    const results = {
      processed: 0,
      succeeded: 0,
      failed: 0,
      errors: [] as string[]
    }

    // Process each job
    for (const job of pendingJobs) {
      try {
        console.log(`\n🚀 Processing job ${job.id} for ${job.customer_email}`)

        // Mark as processing
        await updateMealPlanJobStatus(job.id, 'processing')

        // Calculate recipe count (days in month + 4 snacks)
        const dinnerCount = job.days_in_month || 30
        const snackCount = 4
        const totalRecipes = dinnerCount + snackCount

        console.log(`📊 Generating ${dinnerCount} dinners + ${snackCount} snacks = ${totalRecipes} total recipes`)
        console.log(`👥 Family size: ${job.family_size}`)
        console.log(`🥗 Dietary needs: ${job.dietary_needs?.join(', ') || 'none'}`)
        console.log(`⚠️  Allergies: ${job.allergies || 'none'}`)
        console.log(`💭 Preferences: ${job.preferences || 'none'}`)

        // Parse customer preferences for AI generation
        const avoidIngredients = job.allergies
          ? parseIngredientsFromText(job.allergies)
          : undefined

        const preferredIngredients = job.preferences
          ? parseIngredientsFromText(job.preferences)
          : undefined

        // Select and filter recipes based on ALL customizations
        // Now with 30% AI-generated recipes that respect customer preferences
        let selectedRecipes = await selectRecipesForCustomer({
          dietType: job.diet_type,
          totalRecipes: dinnerCount * 2, // Get extra to filter from
          newRecipesPercentage: 30, // Re-enabled AI generation with customer preferences!
          mealTypes: ['dinner'],
          customerPreferences: {
            familySize: job.family_size,
            avoidIngredients,
            preferredIngredients
          }
        })

        console.log(`📋 Initial selection: ${selectedRecipes.length} recipes`)

        // FILTER 1: Apply dietary restrictions
        if (job.dietary_needs && job.dietary_needs.length > 0) {
          selectedRecipes = filterByDietaryNeeds(selectedRecipes, job.dietary_needs)
          console.log(`🥗 After dietary filter: ${selectedRecipes.length} recipes`)
        }

        // FILTER 2: Exclude allergens
        if (job.allergies) {
          selectedRecipes = filterByAllergens(selectedRecipes, job.allergies)
          console.log(`⚠️  After allergen filter: ${selectedRecipes.length} recipes`)
        }

        // FILTER 3: Limit to needed count
        selectedRecipes = selectedRecipes.slice(0, dinnerCount)

        console.log(`✅ Final selection: ${selectedRecipes.length} dinner recipes`)

        // Track recipes for this customer
        const currentMonth = new Date().toISOString().slice(0, 7)
        const recipeIds = selectedRecipes.map(r => r.id)
        await trackCustomerRecipes(job.customer_email, recipeIds, currentMonth)
        console.log(`📊 Tracked ${recipeIds.length} recipes`)

        // Scale recipes for family size
        const scaledRecipes = scaleRecipesForFamilySize(selectedRecipes, job.family_size)

        // Generate PDF with scaled recipes
        const productName = job.product_type === 'subscription'
          ? 'Monthly Meal Plan'
          : 'Custom AI Meal Plan'

        const pdfUrl = await generateAndUploadMealPlan(
          job.customer_email,
          productName,
          job.stripe_session_id,
          scaledRecipes
        )

        console.log(`📄 PDF generated: ${pdfUrl}`)

        // Send delivery email
        await sendDeliveryEmail(job.customer_email, pdfUrl, productName)
        console.log(`📧 Delivery email sent`)

        // Mark as completed
        await updateMealPlanJobStatus(job.id, 'completed', {
          pdf_url: pdfUrl,
          recipe_count: selectedRecipes.length
        })

        console.log(`✅ Job ${job.id} completed successfully`)
        results.succeeded++

      } catch (error) {
        console.error(`❌ Error processing job ${job.id}:`, error)

        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        results.errors.push(`Job ${job.id}: ${errorMessage}`)

        // Mark as failed
        await updateMealPlanJobStatus(job.id, 'failed', {
          error_message: errorMessage
        })

        results.failed++
      }

      results.processed++
    }

    const duration = Date.now() - startTime
    console.log(`\n✅ Cron job completed in ${duration}ms`)
    console.log(`   Processed: ${results.processed}`)
    console.log(`   Succeeded: ${results.succeeded}`)
    console.log(`   Failed: ${results.failed}`)

    return NextResponse.json({
      success: true,
      ...results,
      duration
    })

  } catch (error) {
    console.error('❌ Cron job error:', error)

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime
    }, { status: 500 })
  }
}

// Helper function to send delivery email
async function sendDeliveryEmail(email: string, pdfUrl: string, productName: string) {
  const customerName = email.split('@')[0] // Simple fallback

  const mealPlanHtml = getMealPlanEmailTemplate(customerName, productName, pdfUrl)
  await sendEmail({
    to: email,
    subject: `Your ${productName} is Ready to Download! 🎉`,
    html: mealPlanHtml
  })
}

// PERSONALIZATION FILTERS

/**
 * Filter recipes by dietary needs
 * Removes recipes that don't match the selected dietary restrictions
 */
function filterByDietaryNeeds(recipes: any[], dietaryNeeds: string[]): any[] {
  if (!dietaryNeeds || dietaryNeeds.length === 0) return recipes

  return recipes.filter(recipe => {
    // Check each dietary need
    for (const need of dietaryNeeds) {
      switch (need.toLowerCase()) {
        case 'vegetarian':
          // Exclude recipes with meat/poultry/fish
          if (recipe.name.toLowerCase().match(/chicken|beef|pork|fish|salmon|turkey|lamb|shrimp|meat/)) {
            return false
          }
          break

        case 'vegan':
          // Exclude all animal products
          if (recipe.name.toLowerCase().match(/chicken|beef|pork|fish|salmon|turkey|lamb|shrimp|meat|egg|dairy|cheese|milk|butter|cream/)) {
            return false
          }
          break

        case 'gluten-free':
          // Exclude recipes with gluten
          if (recipe.name.toLowerCase().match(/pasta|bread|wheat|flour|noodle|pizza|cracker/)) {
            return false
          }
          break

        case 'dairy-free':
          // Exclude dairy products
          if (recipe.name.toLowerCase().match(/cheese|milk|butter|cream|yogurt|dairy/)) {
            return false
          }
          break

        case 'low-carb':
          // Exclude high-carb items
          if (recipe.name.toLowerCase().match(/pasta|rice|bread|potato|noodle|pizza/)) {
            return false
          }
          break

        case 'kid-friendly':
          // Prioritize kid-friendly recipes (this is inclusive, not exclusive)
          // Don't filter out, just note for future ranking
          break
      }
    }
    return true
  })
}

/**
 * Filter out recipes containing allergens
 * Parses allergen text and excludes matching recipes
 */
function filterByAllergens(recipes: any[], allergyText: string): any[] {
  if (!allergyText || allergyText.trim() === '') return recipes

  // Parse common allergens from text
  const allergyLower = allergyText.toLowerCase()
  const allergens: string[] = []

  if (allergyLower.match(/peanut|nut/)) allergens.push('peanut', 'nut', 'almond')
  if (allergyLower.match(/shellfish|shrimp|crab|lobster/)) allergens.push('shrimp', 'shellfish', 'crab', 'lobster')
  if (allergyLower.match(/soy/)) allergens.push('soy', 'tofu', 'edamame')
  if (allergyLower.match(/dairy|milk|lactose/)) allergens.push('milk', 'cheese', 'butter', 'cream', 'yogurt', 'dairy')
  if (allergyLower.match(/egg/)) allergens.push('egg')
  if (allergyLower.match(/wheat|gluten/)) allergens.push('wheat', 'flour', 'bread', 'pasta')
  if (allergyLower.match(/fish/)) allergens.push('fish', 'salmon', 'tuna', 'cod')

  console.log(`🔍 Detected allergens: ${allergens.join(', ')}`)

  // Filter out recipes containing allergens
  return recipes.filter(recipe => {
    const recipeName = recipe.name.toLowerCase()
    const recipeDesc = recipe.description?.toLowerCase() || ''

    for (const allergen of allergens) {
      if (recipeName.includes(allergen) || recipeDesc.includes(allergen)) {
        console.log(`   ❌ Excluded "${recipe.name}" (contains ${allergen})`)
        return false
      }
    }
    return true
  })
}

/**
 * Scale recipe servings based on family size
 * Adds a note to each recipe indicating servings have been scaled
 */
function scaleRecipesForFamilySize(recipes: any[], familySize: number): any[] {
  const defaultServings = 4 // Most recipes are for 4 people

  if (!familySize || familySize === defaultServings) {
    return recipes // No scaling needed
  }

  const scaleFactor = familySize / defaultServings
  console.log(`👨‍👩‍👧‍👦 Scaling recipes for ${familySize} people (${scaleFactor}x)`)

  return recipes.map(recipe => ({
    ...recipe,
    servings: familySize,
    scaleFactor: scaleFactor,
    servingsNote: `Scaled for ${familySize} people`
  }))
}

/**
 * Parse free-text ingredients into an array
 * Handles comma-separated, space-separated, or natural language text
 */
function parseIngredientsFromText(text: string): string[] {
  if (!text || text.trim() === '') return []

  // Remove common connecting words
  const cleaned = text
    .toLowerCase()
    .replace(/\b(and|or|no|avoid|dislike|don't like|hate|can't have)\b/gi, ',')
    .trim()

  // Split by common delimiters
  const ingredients = cleaned
    .split(/[,;|\n]+/)
    .map(item => item.trim())
    .filter(item => item.length > 0)

  console.log(`📝 Parsed ingredients: ${ingredients.join(', ')}`)
  return ingredients
}
