import { put, del, list } from '@vercel/blob'
import { MealPlanPDFGenerator } from './pdf-generator'

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

// Generate and upload meal plan PDF
export async function generateAndUploadMealPlan(
  customerEmail: string,
  planType: string,
  sessionId: string
): Promise<string> {
  try {
    // Create sample meal plan data
    // In production, this would be fetched based on the plan type
    const mealPlanData = {
      menuType: planType,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      dailyMeals: generateSampleMeals(planType),
      weeklyShoppingLists: generateSampleShoppingLists(),
      nutritionTargets: {
        calories: 2000,
        protein: 75,
        carbs: 225,
        fat: 75,
        fiber: 35
      },
      mealPrepGuides: {
        sunday: [
          'Prep vegetables for the week',
          'Cook grains in batch',
          'Marinate proteins',
          'Make sauces and dressings',
          'Portion out snacks'
        ]
      }
    }

    // Generate PDF using the existing generator
    const generator = new MealPlanPDFGenerator()

    // The generator expects a specific format, so we'll create a simple version
    // In production, you'd have a full implementation
    const pdfDoc = generator['doc'] // Access the jsPDF instance

    // Add content to PDF
    generator['drawHeader'](planType, `${new Date().toLocaleDateString()}`)
    generator['currentY'] = 50

    // Add some basic content
    pdfDoc.setFontSize(14)
    pdfDoc.text('Your Personalized Meal Plan', 20, generator['currentY'])
    generator['currentY'] += 10

    pdfDoc.setFontSize(11)
    pdfDoc.text(`Customer: ${customerEmail}`, 20, generator['currentY'])
    generator['currentY'] += 10
    pdfDoc.text(`Plan Type: ${planType}`, 20, generator['currentY'])
    generator['currentY'] += 20

    // Add a simple weekly menu
    pdfDoc.setFontSize(12)
    pdfDoc.setFont('helvetica', 'bold')
    pdfDoc.text('Week 1 Sample Menu', 20, generator['currentY'])
    generator['currentY'] += 10

    pdfDoc.setFont('helvetica', 'normal')
    pdfDoc.setFontSize(10)
    const sampleDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    sampleDays.forEach(day => {
      pdfDoc.text(`${day}: Breakfast | Lunch | Dinner`, 20, generator['currentY'])
      generator['currentY'] += 8
    })

    // Get PDF as buffer
    const pdfBuffer = Buffer.from(pdfDoc.output('arraybuffer'))

    // Generate filename
    const timestamp = Date.now()
    const filename = `meal-plans/${sessionId}-${timestamp}.pdf`

    // Upload to storage
    const url = await uploadPDFToStorage(pdfBuffer, filename)

    return url
  } catch (error) {
    console.error('Failed to generate and upload meal plan:', error)
    throw new Error('Failed to generate meal plan PDF')
  }
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