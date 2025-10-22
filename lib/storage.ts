import { put, del, list } from '@vercel/blob'
import PDFDocument from 'pdfkit'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

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
  dietPlanId?: string
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
      selectedRecipes
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

// Generate meal plan PDF with PDFKit
async function generateMealPlanPDF(
  customerEmail: string,
  planType: string,
  recipes: any[]
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        info: {
          Title: `${planType} Meal Plan`,
          Author: 'Mindful Meal Plan',
          Subject: 'Monthly Meal Plan'
        }
      })

      const buffers: Buffer[] = []

      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers)
        resolve(pdfBuffer)
      })
      doc.on('error', reject)

      // === COVER PAGE ===
      drawHeader(doc, planType)
      doc.moveDown(3)

      doc.fontSize(14).text(`Prepared for: ${customerEmail}`, { align: 'left' })
      doc.moveDown()
      doc.fontSize(12).text(`Generated: ${new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })}`, { align: 'left' })

      // === MONTHLY CALENDAR ===
      doc.addPage()
      drawHeader(doc, '📅 Monthly Meal Calendar')
      doc.moveDown(2)

      drawMonthlyCalendar(doc, recipes)

      // === WEEKLY SHOPPING LISTS ===
      doc.addPage()
      drawHeader(doc, '🛒 Weekly Shopping Lists')
      doc.moveDown(2)

      drawWeeklyShoppingLists(doc, recipes)

      // === RECIPE BOOK ===
      doc.addPage()
      drawHeader(doc, '📖 Recipe Book')
      doc.moveDown(2)

      drawRecipeBook(doc, recipes)

      // === SUNDAY MEAL PREP GUIDE ===
      doc.addPage()
      drawHeader(doc, '🍳 Sunday Meal Prep Guide')
      doc.moveDown(2)

      drawSundayPrepGuide(doc, recipes)

      // Add footer to all pages
      const range = doc.bufferedPageRange()
      for (let i = range.start; i < (range.start + range.count); i++) {
        doc.switchToPage(i)
        drawFooter(doc, i - range.start + 1, range.count)
      }

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

function drawHeader(doc: PDFKit.PDFDocument, title: string) {
  doc
    .fillColor('#14b8a6')
    .fontSize(24)
    .font('Helvetica-Bold')
    .text(title, { align: 'center' })
    .fillColor('#000000')
    .moveDown()
}

function drawFooter(doc: PDFKit.PDFDocument, pageNum: number, totalPages: number) {
  doc
    .fontSize(10)
    .fillColor('#888888')
    .text(
      `Page ${pageNum} of ${totalPages} | Mindful Meal Plan © ${new Date().getFullYear()}`,
      50,
      doc.page.height - 50,
      { align: 'center', width: doc.page.width - 100 }
    )
    .fillColor('#000000')
}

function drawMonthlyCalendar(doc: PDFKit.PDFDocument, recipes: any[]) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  doc.fontSize(16).font('Helvetica-Bold').text(currentMonth, { align: 'center' })
  doc.moveDown()

  // Group recipes into weeks (7 days each)
  const weeks = []
  for (let i = 0; i < recipes.length; i += 7) {
    weeks.push(recipes.slice(i, i + 7))
  }

  weeks.forEach((week, weekIndex) => {
    doc.fontSize(14).font('Helvetica-Bold')
      .fillColor('#14b8a6')
      .text(`Week ${weekIndex + 1}`, { underline: true })
      .fillColor('#000000')
    doc.moveDown(0.5)

    week.forEach((recipe, dayIndex) => {
      if (doc.y > 700) {
        doc.addPage()
        doc.moveDown(2)
      }

      doc.fontSize(11).font('Helvetica-Bold')
        .text(`${daysOfWeek[dayIndex]}: `, { continued: true })
        .font('Helvetica')
        .text(recipe.name || 'No recipe')

      if (recipe.prep_time || recipe.cook_time) {
        doc.fontSize(9).fillColor('#666666')
          .text(`   ⏱ ${recipe.prep_time || 0} + ${recipe.cook_time || 0} min`, { indent: 20 })
          .fillColor('#000000')
      }

      doc.moveDown(0.3)
    })

    doc.moveDown()
  })
}

function drawWeeklyShoppingLists(doc: PDFKit.PDFDocument, recipes: any[]) {
  // Group recipes into weeks
  const weeks = []
  for (let i = 0; i < recipes.length; i += 7) {
    weeks.push(recipes.slice(i, i + 7))
  }

  weeks.forEach((week, weekIndex) => {
    if (weekIndex > 0) {
      doc.addPage()
      doc.moveDown(2)
    }

    doc.fontSize(16).font('Helvetica-Bold')
      .fillColor('#14b8a6')
      .text(`Week ${weekIndex + 1} Shopping List`)
      .fillColor('#000000')
    doc.moveDown()

    // Aggregate ingredients from all recipes in the week
    const ingredients: { [key: string]: Set<string> } = {
      'Proteins': new Set(),
      'Vegetables': new Set(),
      'Fruits': new Set(),
      'Grains & Starches': new Set(),
      'Dairy': new Set(),
      'Pantry': new Set(),
      'Herbs & Spices': new Set()
    }

    week.forEach(recipe => {
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach((ing: any) => {
          const item = typeof ing === 'string' ? ing : ing.item || ing.name
          if (item) {
            // Categorize ingredients (simplified categorization)
            if (item.match(/chicken|beef|pork|fish|salmon|turkey|tofu/i)) {
              ingredients['Proteins'].add(item)
            } else if (item.match(/tomato|lettuce|spinach|carrot|broccoli|pepper|onion|garlic/i)) {
              ingredients['Vegetables'].add(item)
            } else if (item.match(/apple|banana|berry|orange|lemon/i)) {
              ingredients['Fruits'].add(item)
            } else if (item.match(/rice|pasta|bread|quinoa|oat|flour/i)) {
              ingredients['Grains & Starches'].add(item)
            } else if (item.match(/milk|cheese|yogurt|cream|butter/i)) {
              ingredients['Dairy'].add(item)
            } else if (item.match(/basil|oregano|thyme|salt|pepper|cumin|paprika/i)) {
              ingredients['Herbs & Spices'].add(item)
            } else {
              ingredients['Pantry'].add(item)
            }
          }
        })
      }
    })

    // Print categorized ingredients
    Object.entries(ingredients).forEach(([category, items]) => {
      if (items.size > 0) {
        if (doc.y > 650) {
          doc.addPage()
          doc.moveDown(2)
        }

        doc.fontSize(13).font('Helvetica-Bold')
          .fillColor('#14b8a6')
          .text(category)
          .fillColor('#000000')
        doc.moveDown(0.5)

        doc.fontSize(10).font('Helvetica')
        Array.from(items).forEach(item => {
          doc.text(`  • ${item}`)
        })

        doc.moveDown()
      }
    })
  })
}

function drawRecipeBook(doc: PDFKit.PDFDocument, recipes: any[]) {
  recipes.forEach((recipe, index) => {
    if (index > 0) {
      doc.addPage()
      doc.moveDown(2)
    }

    // Recipe title
    doc.fontSize(18).font('Helvetica-Bold')
      .fillColor('#14b8a6')
      .text(recipe.name || 'Untitled Recipe')
      .fillColor('#000000')
    doc.moveDown()

    // Recipe metadata
    doc.fontSize(10).font('Helvetica')
    const metadata = []
    if (recipe.prep_time) metadata.push(`Prep: ${recipe.prep_time} min`)
    if (recipe.cook_time) metadata.push(`Cook: ${recipe.cook_time} min`)
    if (recipe.servings) metadata.push(`Servings: ${recipe.servings}`)
    if (recipe.difficulty) metadata.push(`Difficulty: ${recipe.difficulty}`)

    if (metadata.length > 0) {
      doc.text(metadata.join('  |  '))
      doc.moveDown()
    }

    // Description
    if (recipe.description) {
      doc.fontSize(11).font('Helvetica')
        .text(recipe.description, { align: 'justify' })
      doc.moveDown()
    }

    // Ingredients
    doc.fontSize(14).font('Helvetica-Bold').text('Ingredients')
    doc.moveDown(0.5)

    doc.fontSize(10).font('Helvetica')
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach((ing: any) => {
        const text = typeof ing === 'string' ? ing :
                    `${ing.item || ing.name}: ${ing.quantity || ''} ${ing.unit || ''}`
        doc.text(`  • ${text}`)
      })
    }
    doc.moveDown()

    // Instructions
    doc.fontSize(14).font('Helvetica-Bold').text('Instructions')
    doc.moveDown(0.5)

    doc.fontSize(10).font('Helvetica')
    if (recipe.instructions && Array.isArray(recipe.instructions)) {
      recipe.instructions.forEach((step: any, i: number) => {
        const text = typeof step === 'string' ? step : step.step || step.text
        doc.text(`${i + 1}. ${text}`, { align: 'justify' })
        doc.moveDown(0.3)
      })
    }

    // Nutrition info
    if (recipe.nutrition || (recipe.recipe_nutrition && recipe.recipe_nutrition[0])) {
      const nutrition = recipe.nutrition || recipe.recipe_nutrition[0]
      doc.moveDown()
      doc.fontSize(12).font('Helvetica-Bold').text('Nutrition (per serving)')
      doc.moveDown(0.5)
      doc.fontSize(10).font('Helvetica')

      if (nutrition.calories) doc.text(`Calories: ${nutrition.calories}`)
      if (nutrition.protein) doc.text(`Protein: ${nutrition.protein}g`)
      if (nutrition.carbs) doc.text(`Carbs: ${nutrition.carbs}g`)
      if (nutrition.fat) doc.text(`Fat: ${nutrition.fat}g`)
      if (nutrition.fiber) doc.text(`Fiber: ${nutrition.fiber}g`)
    }
  })
}

function drawSundayPrepGuide(doc: PDFKit.PDFDocument, recipes: any[]) {
  doc.fontSize(14).font('Helvetica')
    .text('Make your week easier with Sunday meal prep! Here are tasks you can do in advance:', { align: 'justify' })
  doc.moveDown(2)

  const prepTasks = [
    {
      title: '🥗 Wash & Chop Vegetables',
      tasks: [
        'Wash all produce for the week',
        'Chop vegetables for quick cooking',
        'Store in airtight containers with paper towels',
        'Pre-portion snack vegetables'
      ]
    },
    {
      title: '🍚 Cook Grains & Proteins',
      tasks: [
        'Cook rice, quinoa, or other grains in batch',
        'Grill or bake chicken breasts for the week',
        'Hard-boil eggs for quick protein',
        'Prepare any marinades needed'
      ]
    },
    {
      title: '🥫 Prep Ingredients',
      tasks: [
        'Measure out spices for each recipe',
        'Make salad dressings and sauces',
        'Portion out nuts and seeds',
        'Prep overnight oats if applicable'
      ]
    },
    {
      title: '📦 Organization Tips',
      tasks: [
        'Label all containers with dates',
        'Stack containers for easy access',
        'Keep a meal prep checklist',
        'Plan for 2-3 hours of Sunday prep time'
      ]
    }
  ]

  prepTasks.forEach(section => {
    if (doc.y > 650) {
      doc.addPage()
      doc.moveDown(2)
    }

    doc.fontSize(14).font('Helvetica-Bold')
      .fillColor('#14b8a6')
      .text(section.title)
      .fillColor('#000000')
    doc.moveDown(0.5)

    doc.fontSize(11).font('Helvetica')
    section.tasks.forEach(task => {
      doc.text(`  • ${task}`)
      doc.moveDown(0.3)
    })

    doc.moveDown()
  })

  // Add motivational footer
  doc.moveDown(2)
  doc.fontSize(12).font('Helvetica-Bold')
    .fillColor('#14b8a6')
    .text('💡 Pro Tip:', { continued: true })
    .fillColor('#000000')
    .font('Helvetica')
    .text(' Spend 2-3 hours on Sunday to save 1+ hour each weekday!')
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