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
      '42 AI-generated recipes: 30 dinners + 7 breakfasts + 5 desserts',
      '30-day meal calendar with daily dinner assignments',
      'Choose from 8 diet plans (Mediterranean, Keto, Vegan, etc.)',
      'Full ingredients list with measurements',
      'Complete nutritional information (calories, macros, fiber)',
      'Beautiful PDF with AI-generated cover image',
      'Prep time, cook time, and difficulty level',
      'Customized for your family size and dietary needs',
      'Lifetime access - keep it forever',
      'Delivered within 2-4 hours via email'
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
      '42 NEW recipes every month (30 dinners + 7 breakfasts + 5 desserts)',
      'Fresh seasonal recipes delivered on the 1st',
      'Keep access to ALL previous months forever',
      'All features from one-time plan included',
      'Change diet preferences each month',
      'Adjust family size and dietary needs anytime',
      'Beautiful PDF with fresh AI-generated images',
      'Continuous variety - never repeat the same meal',
      'Priority email support',
      'Cancel anytime - keep your past meal plans'
    ]
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(p => p.priceId === priceId)
}