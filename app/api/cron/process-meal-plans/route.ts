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

        // Parse customer preferences
        const avoidIngredients = job.allergies
          ? parseIngredientsFromText(job.allergies)
          : undefined

        const preferredIngredients = job.preferences
          ? parseIngredientsFromText(job.preferences)
          : undefined

        const customerPreferences = {
          familySize: job.family_size,
          avoidIngredients,
          preferredIngredients
        }

        // Get accumulated recipes from previous phases
        const accumulatedRecipes = job.generated_recipes || []
        console.log(`   📦 Accumulated recipes from previous phases: ${accumulatedRecipes.length}`)

        // Execute the current phase
        switch (currentPhase) {
          case 1:
            await executePhase1(job, customerPreferences, accumulatedRecipes)
            break
          case 2:
            await executePhase2(job, customerPreferences, accumulatedRecipes)
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

// PHASE 1: Generate 20 dinners + images
async function executePhase1(job: any, customerPreferences: any, accumulatedRecipes: any[]) {
  console.log(`\n📍 PHASE 1: Generate 20 dinners with images`)
  const phaseStartTime = Date.now()

  // Generate 20 dinner recipes
  let dinnerRecipes = await selectRecipesForCustomer({
    dietType: job.diet_type,
    totalRecipes: 20 * 2, // Get extra to filter from
    newRecipesPercentage: 100,
    mealTypes: ['dinner'],
    customerPreferences
  })

  // Apply filters
  dinnerRecipes = applyFilters(dinnerRecipes, job)
  dinnerRecipes = dinnerRecipes.slice(0, 20)
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
    'Generated 20 dinners with images',
    updatedRecipes
  )

  const duration = ((Date.now() - phaseStartTime) / 1000).toFixed(1)
  console.log(`✅ Phase 1 completed in ${duration}s - ${updatedRecipes.length} total recipes`)
}

// PHASE 2: Generate 10 more dinners + images
async function executePhase2(job: any, customerPreferences: any, accumulatedRecipes: any[]) {
  console.log(`\n📍 PHASE 2: Generate 10 more dinners with images`)
  const phaseStartTime = Date.now()

  let dinnerRecipes = await selectRecipesForCustomer({
    dietType: job.diet_type,
    totalRecipes: 10 * 2,
    newRecipesPercentage: 100,
    mealTypes: ['dinner'],
    customerPreferences
  })

  dinnerRecipes = applyFilters(dinnerRecipes, job)
  dinnerRecipes = dinnerRecipes.slice(0, 10)
  console.log(`✅ Generated ${dinnerRecipes.length} dinner recipes`)

  console.log(`🎨 Generating images...`)
  const recipesWithImages = await generateImagesForRecipes(dinnerRecipes, job.diet_type)

  const updatedRecipes = [...accumulatedRecipes, ...recipesWithImages]

  await updateMealPlanJobPhase(
    job.id,
    3,
    'Generated 30 dinners total with images',
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
    'Generated 30 dinners + 7 breakfasts with images',
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
    'Generated all 42 recipes with images - creating PDF',
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

// Helper: Apply all filters to recipes
function applyFilters(recipes: any[], job: any): any[] {
  let filtered = recipes

  if (job.dietary_needs && job.dietary_needs.length > 0) {
    filtered = filterByDietaryNeeds(filtered, job.dietary_needs)
  }
  if (job.allergies) {
    filtered = filterByAllergens(filtered, job.allergies)
  }
  if (job.preferences) {
    filtered = filterByPreferences(filtered, job.preferences)
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

  if (allergyLower.match(/peanut|nut/)) allergens.push('peanut', 'nut', 'almond')
  if (allergyLower.match(/shellfish|shrimp|crab|lobster/)) allergens.push('shrimp', 'shellfish', 'crab', 'lobster')
  if (allergyLower.match(/soy/)) allergens.push('soy', 'tofu', 'edamame')
  if (allergyLower.match(/dairy|milk|lactose/)) allergens.push('milk', 'cheese', 'butter', 'cream', 'yogurt', 'dairy')
  if (allergyLower.match(/egg/)) allergens.push('egg')
  if (allergyLower.match(/wheat|gluten/)) allergens.push('wheat', 'flour', 'bread', 'pasta')
  if (allergyLower.match(/fish/)) allergens.push('fish', 'salmon', 'tuna', 'cod')

  console.log(`🔍 Detected allergens: ${allergens.join(', ')}`)

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

function filterByPreferences(recipes: any[], preferenceText: string): any[] {
  if (!preferenceText || preferenceText.trim() === '') return recipes

  const prefLower = preferenceText.toLowerCase()
  const avoidIngredients: string[] = []

  const noPatterns = prefLower.match(/no\s+([a-z\s]+?)(?:,|and|$)/g)
  if (noPatterns) {
    noPatterns.forEach(pattern => {
      const ingredient = pattern.replace(/^no\s+/, '').replace(/[,and\s]+$/, '').trim()
      if (ingredient) avoidIngredients.push(ingredient)
    })
  }

  const avoidPatterns = prefLower.match(/avoid\s+([a-z\s]+?)(?:,|and|$)/g)
  if (avoidPatterns) {
    avoidPatterns.forEach(pattern => {
      const ingredient = pattern.replace(/^avoid\s+/, '').replace(/[,and\s]+$/, '').trim()
      if (ingredient) avoidIngredients.push(ingredient)
    })
  }

  const lessPatterns = prefLower.match(/less\s+([a-z\s]+?)(?:,|and|$)/g)
  if (lessPatterns) {
    lessPatterns.forEach(pattern => {
      const ingredient = pattern.replace(/^less\s+/, '').replace(/[,and\s]+$/, '').trim()
      if (ingredient) avoidIngredients.push(ingredient)
    })
  }

  if (avoidIngredients.length === 0) return recipes

  console.log(`🔍 Preference filters: ${avoidIngredients.join(', ')}`)

  return recipes.filter(recipe => {
    const recipeName = recipe.name.toLowerCase()
    const recipeDesc = recipe.description?.toLowerCase() || ''

    for (const ingredient of avoidIngredients) {
      if (recipeName.includes(ingredient) || recipeDesc.includes(ingredient)) {
        console.log(`   ❌ Excluded "${recipe.name}" (preference: no ${ingredient})`)
        return false
      }
    }
    return true
  })
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
