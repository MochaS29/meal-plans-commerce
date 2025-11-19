import { NextRequest, NextResponse } from 'next/server'
import { getPendingMealPlanJobs, updateMealPlanJobStatus, updateMealPlanJobPhase } from '@/lib/supabase'
import { selectRecipesForCustomer, trackCustomerRecipes } from '@/lib/hybrid-recipe-selector'
import { generateAndUploadMealPlan } from '@/lib/storage'
import { sendEmail, getMealPlanEmailTemplate } from '@/lib/email'
import { generateRecipeImage } from '@/lib/ai-image-generator'

// This endpoint is called by Vercel Cron every 30 minutes
// Multi-phase processing to avoid 5-minute timeout
export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Verify this is a cron request
    const authHeader = request.headers.get('authorization')
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔄 Starting multi-phase meal plan processor...')

    // Get pending jobs OR jobs in progress with incomplete phases
    const pendingJobs = await getPendingMealPlanJobs(1)

    if (pendingJobs.length === 0) {
      console.log('✅ No pending jobs to process')
      return NextResponse.json({
        success: true,
        message: 'No pending jobs',
        processed: 0,
        duration: Date.now() - startTime
      })
    }

    console.log(`📋 Found ${pendingJobs.length} jobs to process`)

    const results = {
      processed: 0,
      succeeded: 0,
      failed: 0,
      errors: [] as string[]
    }

    // Process each job
    for (const job of pendingJobs) {
      try {
        const jobStartTime = Date.now()
        const currentPhase = job.current_phase || 1

        console.log(`\n🚀 [${new Date().toISOString()}] Processing job ${job.id}`)
        console.log(`   📧 Customer: ${job.customer_email}`)
        console.log(`   📍 Phase: ${currentPhase}/5`)
        console.log(`   📊 Status: ${job.status}`)

        // Mark as processing if still pending
        if (job.status === 'pending') {
          await updateMealPlanJobStatus(job.id, 'processing')
        }

        // Parse customer preferences with tiered filtering
        // Allergies: Hard filter (0% allowed)
        const allergyIngredients = job.allergies
          ? parseIngredientsFromText(job.allergies)
          : undefined

        // Parse preferences into avoid (no X = 0%) and reduce (less X = ~10%)
        const preferencesData = job.preferences
          ? parsePreferencesWithWeights(job.preferences)
          : { avoid: [], reduce: [], preferred: [] }

        const customerPreferences = {
          familySize: job.family_size,
          avoidIngredients: [...(allergyIngredients || []), ...(preferencesData.avoid || [])], // Combine allergies + "no X"
          reduceIngredients: preferencesData.reduce || [], // "less X" = 10%
          preferredIngredients: preferencesData.preferred || []
        }

        // Calculate actual days in the current month for dinner count
        const now = new Date()
        const currentMonth = now.getMonth() + 1
        const currentYear = now.getFullYear()
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
        console.log(`   📅 Month ${currentMonth}/${currentYear} has ${daysInMonth} days - will generate ${daysInMonth} dinners`)

        // Get accumulated recipes from previous phases
        const accumulatedRecipes = job.generated_recipes || []
        console.log(`   📦 Accumulated recipes from previous phases: ${accumulatedRecipes.length}`)

        // Execute the current phase
        switch (currentPhase) {
          case 1:
            await executePhase1(job, customerPreferences, accumulatedRecipes, daysInMonth)
            break
          case 2:
            await executePhase2(job, customerPreferences, accumulatedRecipes, daysInMonth)
            break
          case 3:
            await executePhase3(job, customerPreferences, accumulatedRecipes)
            break
          case 4:
            await executePhase4(job, customerPreferences, accumulatedRecipes)
            break
          case 5:
            await executePhase5(job, accumulatedRecipes)
            break
          default:
            throw new Error(`Invalid phase: ${currentPhase}`)
        }

        const totalJobTime = ((Date.now() - jobStartTime) / 1000).toFixed(1)
        console.log(`✅ Phase ${currentPhase} completed in ${totalJobTime}s`)
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

// PHASE 1: Generate ~67% of dinners + images (split across two phases to avoid timeout)
async function executePhase1(job: any, customerPreferences: any, accumulatedRecipes: any[], daysInMonth: number) {
  // Generate approximately 2/3 of the dinners in phase 1
  const phase1Count = Math.ceil(daysInMonth * 0.67)
  console.log(`\n📍 PHASE 1: Generate ${phase1Count} dinners with images (month has ${daysInMonth} days)`)
  const phaseStartTime = Date.now()

  // Generate dinner recipes with buffer for filtering
  let dinnerRecipes = await selectRecipesForCustomer({
    dietType: job.diet_type,
    totalRecipes: phase1Count * 2, // Get extra to filter from
    newRecipesPercentage: 100,
    mealTypes: ['dinner'],
    customerPreferences
  })

  // Apply filters
  dinnerRecipes = applyFilters(dinnerRecipes, job)
  dinnerRecipes = dinnerRecipes.slice(0, phase1Count)
  console.log(`✅ Generated ${dinnerRecipes.length} dinner recipes`)

  // Generate images for each recipe
  console.log(`🎨 Generating images...`)
  const recipesWithImages = await generateImagesForRecipes(dinnerRecipes, job.diet_type)

  // Accumulate recipes
  const updatedRecipes = [...accumulatedRecipes, ...recipesWithImages]

  // Update job to phase 2
  await updateMealPlanJobPhase(
    job.id,
    2,
    `Generated ${phase1Count} dinners with images`,
    updatedRecipes
  )

  const duration = ((Date.now() - phaseStartTime) / 1000).toFixed(1)
  console.log(`✅ Phase 1 completed in ${duration}s - ${updatedRecipes.length} total recipes`)
}

// PHASE 2: Generate remaining ~33% of dinners + images
async function executePhase2(job: any, customerPreferences: any, accumulatedRecipes: any[], daysInMonth: number) {
  // Generate the remaining 1/3 of dinners
  const phase1Count = Math.ceil(daysInMonth * 0.67)
  const phase2Count = daysInMonth - phase1Count
  console.log(`\n📍 PHASE 2: Generate ${phase2Count} more dinners with images (total will be ${daysInMonth})`)
  const phaseStartTime = Date.now()

  let dinnerRecipes = await selectRecipesForCustomer({
    dietType: job.diet_type,
    totalRecipes: phase2Count * 2,
    newRecipesPercentage: 100,
    mealTypes: ['dinner'],
    customerPreferences
  })

  dinnerRecipes = applyFilters(dinnerRecipes, job)
  dinnerRecipes = dinnerRecipes.slice(0, phase2Count)
  console.log(`✅ Generated ${dinnerRecipes.length} dinner recipes`)

  console.log(`🎨 Generating images...`)
  const recipesWithImages = await generateImagesForRecipes(dinnerRecipes, job.diet_type)

  const updatedRecipes = [...accumulatedRecipes, ...recipesWithImages]

  await updateMealPlanJobPhase(
    job.id,
    3,
    `Generated ${daysInMonth} dinners total with images`,
    updatedRecipes
  )

  const duration = ((Date.now() - phaseStartTime) / 1000).toFixed(1)
  console.log(`✅ Phase 2 completed in ${duration}s - ${updatedRecipes.length} total recipes`)
}

// PHASE 3: Generate 7 breakfasts + images
async function executePhase3(job: any, customerPreferences: any, accumulatedRecipes: any[]) {
  console.log(`\n📍 PHASE 3: Generate 7 BONUS breakfasts with images`)
  const phaseStartTime = Date.now()

  let breakfastRecipes = await selectRecipesForCustomer({
    dietType: job.diet_type,
    totalRecipes: 7 * 2,
    newRecipesPercentage: 100,
    mealTypes: ['breakfast'],
    customerPreferences
  })

  breakfastRecipes = applyFilters(breakfastRecipes, job)
  breakfastRecipes = breakfastRecipes.slice(0, 7)
  console.log(`✅ Generated ${breakfastRecipes.length} BONUS breakfast recipes`)

  console.log(`🎨 Generating images...`)
  const recipesWithImages = await generateImagesForRecipes(breakfastRecipes, job.diet_type)

  const updatedRecipes = [...accumulatedRecipes, ...recipesWithImages]

  await updateMealPlanJobPhase(
    job.id,
    4,
    `Generated all dinners + 7 breakfasts with images`,
    updatedRecipes
  )

  const duration = ((Date.now() - phaseStartTime) / 1000).toFixed(1)
  console.log(`✅ Phase 3 completed in ${duration}s - ${updatedRecipes.length} total recipes`)
}

// PHASE 4: Generate 5 desserts + images
async function executePhase4(job: any, customerPreferences: any, accumulatedRecipes: any[]) {
  console.log(`\n📍 PHASE 4: Generate 5 BONUS desserts with images`)
  const phaseStartTime = Date.now()

  let dessertRecipes = await selectRecipesForCustomer({
    dietType: job.diet_type,
    totalRecipes: 5 * 2,
    newRecipesPercentage: 100,
    mealTypes: ['dessert'],
    customerPreferences
  })

  dessertRecipes = applyFilters(dessertRecipes, job)
  dessertRecipes = dessertRecipes.slice(0, 5)
  console.log(`✅ Generated ${dessertRecipes.length} BONUS dessert recipes`)

  console.log(`🎨 Generating images...`)
  const recipesWithImages = await generateImagesForRecipes(dessertRecipes, job.diet_type)

  const updatedRecipes = [...accumulatedRecipes, ...recipesWithImages]

  await updateMealPlanJobPhase(
    job.id,
    5,
    `Generated all recipes with images (${updatedRecipes.length} total) - creating PDF`,
    updatedRecipes
  )

  const duration = ((Date.now() - phaseStartTime) / 1000).toFixed(1)
  console.log(`✅ Phase 4 completed in ${duration}s - ${updatedRecipes.length} total recipes`)
}

// PHASE 5: Create PDF and send email
async function executePhase5(job: any, accumulatedRecipes: any[]) {
  console.log(`\n📍 PHASE 5: Create PDF and send email`)
  const phaseStartTime = Date.now()

  // MIGRATION: Normalize mealType → meal_type for recipes from Phases 1&2 (before the fix)
  const normalizedRecipes = accumulatedRecipes.map((r: any) => ({
    ...r,
    meal_type: r.meal_type || r.mealType || 'dinner'  // Ensure snake_case
  }))

  console.log(`📋 Total recipes: ${normalizedRecipes.length}`)
  console.log(`   🍽️  Dinners: ${normalizedRecipes.filter((r: any) => r.meal_type === 'dinner').length}`)
  console.log(`   🥞 Breakfasts: ${normalizedRecipes.filter((r: any) => r.meal_type === 'breakfast').length}`)
  console.log(`   🍰 Desserts: ${normalizedRecipes.filter((r: any) => r.meal_type === 'dessert').length}`)

  // Track recipes for this customer
  const currentMonth = new Date().toISOString().slice(0, 7)
  const recipeIds = normalizedRecipes.map((r: any) => r.id)
  await trackCustomerRecipes(job.customer_email, recipeIds, currentMonth)
  console.log(`📊 Tracked ${recipeIds.length} recipes`)

  // Scale recipes for family size (use normalized recipes)
  const scaledRecipes = scaleRecipesForFamilySize(normalizedRecipes, job.family_size)

  // Generate PDF
  const productName = job.product_type === 'subscription'
    ? 'Monthly Meal Plan'
    : 'Custom AI Meal Plan'

  console.log(`📄 Generating PDF...`)
  const pdfUrl = await generateAndUploadMealPlan(
    job.customer_email,
    productName,
    job.stripe_session_id,
    scaledRecipes,
    undefined, // dietPlanId
    job.diet_type
  )
  console.log(`✅ PDF generated: ${pdfUrl}`)

  // Send delivery email
  console.log(`📧 Sending delivery email...`)
  await sendDeliveryEmail(job.customer_email, pdfUrl, productName, job.diet_type)
  console.log(`✅ Email sent`)

  // Mark as completed
  await updateMealPlanJobStatus(job.id, 'completed', {
    pdf_url: pdfUrl,
    recipe_count: accumulatedRecipes.length
  })

  const duration = ((Date.now() - phaseStartTime) / 1000).toFixed(1)
  console.log(`✅ Phase 5 completed in ${duration}s - Job fully completed!`)
}

// Helper: Generate images for recipes
async function generateImagesForRecipes(recipes: any[], dietType: string) {
  const recipesWithImages = []

  for (const recipe of recipes) {
    try {
      console.log(`  🖼️  Generating image for: ${recipe.name}`)

      // Normalize meal_type from mealType (camelCase) to meal_type (snake_case)
      const mealType = recipe.meal_type || recipe.mealType || 'dinner'

      const imageResult = await generateRecipeImage(
        recipe.id,
        recipe.name,
        recipe.description || '',
        mealType,
        dietType
      )

      if (imageResult.success && imageResult.imageUrl) {
        // Normalize property names to snake_case for database consistency
        recipesWithImages.push({
          ...recipe,
          meal_type: mealType,  // Ensure snake_case
          image_url: imageResult.imageUrl
        })
        console.log(`  ✅ Image generated`)
      } else {
        // Include recipe without image if generation fails
        console.log(`  ⚠️  Image generation failed, continuing without image`)
        recipesWithImages.push({
          ...recipe,
          meal_type: mealType  // Ensure snake_case even without image
        })
      }
    } catch (error) {
      console.error(`  ❌ Error generating image: ${error}`)
      // Ensure meal_type is set even on error
      const mealType = recipe.meal_type || recipe.mealType || 'dinner'
      recipesWithImages.push({
        ...recipe,
        meal_type: mealType
      })
    }
  }

  return recipesWithImages
}

// Helper: Apply all filters to recipes with tiered weights
function applyFilters(recipes: any[], job: any): any[] {
  let filtered = recipes

  // Apply dietary needs filter
  if (job.dietary_needs && job.dietary_needs.length > 0) {
    filtered = filterByDietaryNeeds(filtered, job.dietary_needs)
  }

  // Apply allergen filter (HARD 0%)
  if (job.allergies) {
    filtered = filterByAllergens(filtered, job.allergies)
  }

  // Apply preferences filter (handles "no X" as HARD 0%)
  if (job.preferences) {
    const preferencesData = parsePreferencesWithWeights(job.preferences)

    // Filter out "no X" ingredients (HARD 0%)
    if (preferencesData.avoid.length > 0) {
      filtered = filterByAvoidIngredients(filtered, preferencesData.avoid)
    }

    // Apply "less X" soft filter (keep only ~10% with these ingredients)
    if (preferencesData.reduce.length > 0) {
      filtered = applyReduceFilter(filtered, preferencesData.reduce)
    }
  }

  return filtered
}

// Helper function to send delivery email
async function sendDeliveryEmail(email: string, pdfUrl: string, productName: string, dietType?: string) {
  const customerName = email.split('@')[0]
  const mealPlanHtml = getMealPlanEmailTemplate(customerName, productName, pdfUrl, 'https://mindfulmealplan.com/portal', dietType)
  await sendEmail({
    to: email,
    subject: `Your ${productName} is Ready to Download! 🎉`,
    html: mealPlanHtml
  })
}

// PERSONALIZATION FILTERS (copied from original file)

function filterByDietaryNeeds(recipes: any[], dietaryNeeds: string[]): any[] {
  if (!dietaryNeeds || dietaryNeeds.length === 0) return recipes

  return recipes.filter(recipe => {
    for (const need of dietaryNeeds) {
      switch (need.toLowerCase()) {
        case 'vegetarian':
          if (recipe.name.toLowerCase().match(/chicken|beef|pork|fish|salmon|turkey|lamb|shrimp|meat/)) {
            return false
          }
          break
        case 'vegan':
          if (recipe.name.toLowerCase().match(/chicken|beef|pork|fish|salmon|turkey|lamb|shrimp|meat|egg|dairy|cheese|milk|butter|cream/)) {
            return false
          }
          break
        case 'gluten-free':
          if (recipe.name.toLowerCase().match(/pasta|bread|wheat|flour|noodle|pizza|cracker/)) {
            return false
          }
          break
        case 'dairy-free':
          if (recipe.name.toLowerCase().match(/cheese|milk|butter|cream|yogurt|dairy/)) {
            return false
          }
          break
        case 'low-carb':
          if (recipe.name.toLowerCase().match(/pasta|rice|bread|potato|noodle|pizza/)) {
            return false
          }
          break
        case 'kid-friendly':
          break
      }
    }
    return true
  })
}

function filterByAllergens(recipes: any[], allergyText: string): any[] {
  if (!allergyText || allergyText.trim() === '') return recipes

  const allergyLower = allergyText.toLowerCase()
  const allergens: string[] = []

  // Parse allergens from text
  if (allergyLower.match(/peanut|nut/)) allergens.push('peanut', 'nut', 'almond', 'walnut', 'pecan', 'cashew')
  if (allergyLower.match(/shellfish|shrimp|crab|lobster/)) allergens.push('shrimp', 'shellfish', 'crab', 'lobster')
  if (allergyLower.match(/soy/)) allergens.push('soy', 'tofu', 'edamame')
  if (allergyLower.match(/dairy|milk|lactose/)) allergens.push('milk', 'cheese', 'butter', 'cream', 'yogurt', 'dairy')
  if (allergyLower.match(/egg/)) allergens.push('egg')
  if (allergyLower.match(/wheat|gluten/)) allergens.push('wheat', 'flour', 'bread', 'pasta')
  if (allergyLower.match(/fish/)) allergens.push('fish', 'salmon', 'tuna', 'cod')
  if (allergyLower.match(/pepper/)) allergens.push('pepper', 'bell pepper', 'chili')

  console.log(`🔍 Detected allergens: ${allergens.join(', ')}`)

  return recipes.filter(recipe => {
    const recipeName = recipe.name.toLowerCase()
    const recipeDesc = recipe.description?.toLowerCase() || ''

    // Check recipe name and description
    for (const allergen of allergens) {
      if (recipeName.includes(allergen) || recipeDesc.includes(allergen)) {
        console.log(`   ❌ Excluded "${recipe.name}" (contains ${allergen} in name/description)`)
        return false
      }
    }

    // Check actual ingredients if available
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      for (const ingredient of recipe.ingredients) {
        const ingredientText = (typeof ingredient === 'string' ? ingredient : ingredient.item || ingredient.ingredient || '').toLowerCase()

        for (const allergen of allergens) {
          // Special handling for peppers
          if ((allergen === 'pepper' || allergen === 'bell pepper') && ingredientText.includes('pepper') && !ingredientText.includes('peppercorn')) {
            console.log(`   ❌ Excluded "${recipe.name}" (contains ${allergen} in ingredients)`)
            return false
          } else if (allergen !== 'pepper' && allergen !== 'bell pepper' && ingredientText.includes(allergen)) {
            console.log(`   ❌ Excluded "${recipe.name}" (contains ${allergen} in ingredients)`)
            return false
          }
        }
      }
    }

    return true
  })
}

// Filter for "no X" or "avoid X" - HARD 0% filter
function filterByAvoidIngredients(recipes: any[], avoidIngredients: string[]): any[] {
  if (!avoidIngredients || avoidIngredients.length === 0) return recipes

  console.log(`🚫 AVOID filter (0%): ${avoidIngredients.join(', ')}`)

  return recipes.filter(recipe => {
    const recipeName = recipe.name.toLowerCase()
    const recipeDesc = recipe.description?.toLowerCase() || ''

    // Check recipe name and description
    for (const ingredient of avoidIngredients) {
      if (recipeName.includes(ingredient) || recipeDesc.includes(ingredient)) {
        console.log(`   ❌ Excluded "${recipe.name}" (contains ${ingredient} in name/description)`)
        return false
      }
    }

    // Check actual ingredients if available
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      for (const recipeIngredient of recipe.ingredients) {
        const ingredientText = (typeof recipeIngredient === 'string' ? recipeIngredient : recipeIngredient.item || recipeIngredient.ingredient || '').toLowerCase()

        for (const avoidIngredient of avoidIngredients) {
          // Special handling for peppers
          if ((avoidIngredient === 'pepper' || avoidIngredient === 'peppers') && ingredientText.includes('pepper') && !ingredientText.includes('peppercorn')) {
            console.log(`   ❌ Excluded "${recipe.name}" (contains ${avoidIngredient} in ingredients)`)
            return false
          } else if (ingredientText.includes(avoidIngredient)) {
            console.log(`   ❌ Excluded "${recipe.name}" (contains ${avoidIngredient} in ingredients)`)
            return false
          }
        }
      }
    }

    return true
  })
}

// Filter for "less X" - SOFT ~10% filter (keep only 10% of recipes with this ingredient)
function applyReduceFilter(recipes: any[], reduceIngredients: string[]): any[] {
  if (!reduceIngredients || reduceIngredients.length === 0) return recipes

  console.log(`⚖️  REDUCE filter (10%): ${reduceIngredients.join(', ')}`)

  // Separate recipes into two groups: with and without reduce ingredients
  const recipesWithReduceIngredient: any[] = []
  const recipesWithoutReduceIngredient: any[] = []

  recipes.forEach(recipe => {
    const recipeName = recipe.name.toLowerCase()
    const recipeDesc = recipe.description?.toLowerCase() || ''
    let hasReduceIngredient = false

    // Check name and description
    for (const ingredient of reduceIngredients) {
      if (recipeName.includes(ingredient) || recipeDesc.includes(ingredient)) {
        hasReduceIngredient = true
        break
      }
    }

    // Check actual ingredients if available
    if (!hasReduceIngredient && recipe.ingredients && Array.isArray(recipe.ingredients)) {
      for (const recipeIngredient of recipe.ingredients) {
        const ingredientText = (typeof recipeIngredient === 'string' ? recipeIngredient : recipeIngredient.item || recipeIngredient.ingredient || '').toLowerCase()

        for (const reduceIngredient of reduceIngredients) {
          if (ingredientText.includes(reduceIngredient)) {
            hasReduceIngredient = true
            break
          }
        }
        if (hasReduceIngredient) break
      }
    }

    if (hasReduceIngredient) {
      recipesWithReduceIngredient.push(recipe)
    } else {
      recipesWithoutReduceIngredient.push(recipe)
    }
  })

  // Keep only ~10% of recipes with the reduce ingredient
  const targetWithReduceIngredient = Math.ceil(recipes.length * 0.1)
  const selectedWithReduceIngredient = recipesWithReduceIngredient.slice(0, targetWithReduceIngredient)

  console.log(`   ℹ️  Kept ${selectedWithReduceIngredient.length}/${recipesWithReduceIngredient.length} recipes with reduce ingredients (target: ${targetWithReduceIngredient})`)

  // Combine: all without + limited with
  return [...recipesWithoutReduceIngredient, ...selectedWithReduceIngredient]
}

function scaleRecipesForFamilySize(recipes: any[], familySize: number): any[] {
  const defaultServings = 4

  if (!familySize || familySize === defaultServings) {
    return recipes
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

function parseIngredientsFromText(text: string): string[] {
  if (!text || text.trim() === '') return []

  const cleaned = text
    .toLowerCase()
    .replace(/\b(and|or|no|avoid|dislike|don't like|hate|can't have)\b/gi, ',')
    .trim()

  const ingredients = cleaned
    .split(/[,;|\n]+/)
    .map(item => item.trim())
    .filter(item => item.length > 0)

  console.log(`📝 Parsed ingredients: ${ingredients.join(', ')}`)
  return ingredients
}

// Parse preferences with different weights (avoid vs reduce vs prefer)
function parsePreferencesWithWeights(text: string): { avoid: string[], reduce: string[], preferred: string[] } {
  if (!text || text.trim() === '') return { avoid: [], reduce: [], preferred: [] }

  const prefLower = text.toLowerCase()
  const avoid: string[] = []
  const reduce: string[] = []
  const preferred: string[] = []

  // Parse "no X" or "avoid X" patterns - HARD FILTER (0%)
  const noPatterns = prefLower.match(/(?:no|avoid|don't want|hate|dislike)\s+([a-z\s]+?)(?:,|and|;|\.|$)/gi)
  if (noPatterns) {
    noPatterns.forEach(pattern => {
      const ingredient = pattern
        .replace(/^(?:no|avoid|don't want|hate|dislike)\s+/i, '')
        .replace(/[,and;.\s]+$/, '')
        .trim()
      if (ingredient && ingredient.length > 2) avoid.push(ingredient)
    })
  }

  // Parse "less X" patterns - SOFT FILTER (~10%)
  const lessPatterns = prefLower.match(/(?:less|fewer|reduce|limit)\s+([a-z\s]+?)(?:,|and|;|\.|$)/gi)
  if (lessPatterns) {
    lessPatterns.forEach(pattern => {
      const ingredient = pattern
        .replace(/^(?:less|fewer|reduce|limit)\s+/i, '')
        .replace(/[,and;.\s]+$/, '')
        .trim()
      if (ingredient && ingredient.length > 2) reduce.push(ingredient)
    })
  }

  // Parse "more X" or "prefer X" patterns - POSITIVE WEIGHT
  const preferPatterns = prefLower.match(/(?:more|prefer|like|love|want)\s+([a-z\s]+?)(?:,|and|;|\.|$)/gi)
  if (preferPatterns) {
    preferPatterns.forEach(pattern => {
      const ingredient = pattern
        .replace(/^(?:more|prefer|like|love|want)\s+/i, '')
        .replace(/[,and;.\s]+$/, '')
        .trim()
      if (ingredient && ingredient.length > 2) preferred.push(ingredient)
    })
  }

  console.log(`📝 Preferences parsed:`)
  if (avoid.length > 0) console.log(`   ❌ AVOID (0%): ${avoid.join(', ')}`)
  if (reduce.length > 0) console.log(`   ⚖️  REDUCE (10%): ${reduce.join(', ')}`)
  if (preferred.length > 0) console.log(`   ✨ PREFER: ${preferred.join(', ')}`)

  return { avoid, reduce, preferred }
}
