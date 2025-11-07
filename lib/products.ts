export interface Product {
  id: string
  name: string
  description: string
  price: number
  priceId: string
  image: string
  features: string[]
  popular?: boolean
  type: 'one-time' | 'subscription'
}

export const products: Product[] = [
  {
    id: 'wellness-transformation',
    name: '30-Day Personalized Meal Plan',
    description: 'Your customized meal calendar with 30 days of recipes delivered as a beautiful PDF',
    price: 5900, // $59 in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WELLNESS || '',
    image: '/images/wellness-calendar.jpg',
    type: 'one-time',
    popular: true,
    features: [
      '30-day meal calendar with daily recipes',
      'Choose from 8 diet plans (Mediterranean, Keto, Vegan, etc.)',
      '30 complete recipes with full instructions',
      'Ingredient lists for every recipe',
      'Complete nutritional information per serving',
      'Beautiful PDF with cover image',
      'Prep time and cook time for each recipe',
      'Customize for family size and dietary needs',
      'Delivered within 24 hours via email'
    ]
  },
  {
    id: 'monthly-calendar',
    name: 'Monthly Meal Plan Subscription',
    description: 'Fresh personalized meal plans delivered monthly',
    price: 2900, // $29/month in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || '',
    image: '/images/monthly-calendar.jpg',
    type: 'subscription',
    features: [
      'New meal calendar on the 1st of each month',
      '30 new recipes delivered monthly',
      'Change diet preferences each month',
      'Adjust family size anytime',
      'Update dietary needs as needed',
      'Beautiful PDF delivered via email',
      'Complete nutritional information',
      'Priority email support',
      'Cancel anytime - no commitment'
    ]
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(p => p.priceId === priceId)
}