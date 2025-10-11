import { notFound, redirect } from 'next/navigation'

interface DownloadPageProps {
  params: {
    id: string
  }
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  try {
    // Await params in Next.js 15+
    const { id } = await params

    // Parse the meal plan ID to extract plan type
    // Format: meal-plan-123456 or similar
    const mealPlanId = id

    // For demo purposes, map IDs to plan types
    // In production, this would come from a database lookup
    let planType = 'Mediterranean Challenge'
    let customerName = 'Valued Customer'
    let customerEmail = 'customer@example.com'

    // Parse plan type from ID if it contains plan info
    if (mealPlanId.includes('mediterranean')) planType = 'Mediterranean Challenge'
    else if (mealPlanId.includes('keto')) planType = 'Keto Kickstart'
    else if (mealPlanId.includes('vegan')) planType = 'Plant-Based Power'
    else if (mealPlanId.includes('paleo')) planType = 'Paleo Reset'
    else if (mealPlanId.includes('family')) planType = 'Family-Friendly Meals'
    else if (mealPlanId.includes('intermittent')) planType = 'Intermittent Fasting'

    console.log(`🔗 Download request for meal plan: ${mealPlanId} (${planType})`)

    // Convert plan type to menu type for the API
    let menuType = 'mediterranean'
    if (planType.includes('Mediterranean')) menuType = 'mediterranean'
    else if (planType.includes('Keto')) menuType = 'keto'
    else if (planType.includes('Vegan') || planType.includes('Plant-Based')) menuType = 'vegan'
    else if (planType.includes('Paleo')) menuType = 'paleo'
    else if (planType.includes('Family')) menuType = 'family-focused'
    else if (planType.includes('Intermittent')) menuType = 'intermittent-fasting'

    // Redirect to the existing PDF download API (use localhost for development)
    const baseUrl = 'http://localhost:3004'
    const pdfUrl = `${baseUrl}/api/download-pdf?menuType=${menuType}&demo=true&userName=${encodeURIComponent(customerName)}&userEmail=${encodeURIComponent(customerEmail)}`

    console.log(`📄 Redirecting to PDF: ${pdfUrl}`)
    redirect(pdfUrl)

  } catch (error) {
    console.error('Download error:', error)
    notFound()
  }
}