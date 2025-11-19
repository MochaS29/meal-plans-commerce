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
    id: 'monthly-subscription',
    name: 'AI-Generated Monthly Plan',
    description: 'Fresh AI-generated meal plans delivered monthly',
    price: 2900, // $29/month in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || '',
    image: '/images/monthly-calendar.jpg',
    type: 'subscription',
    popular: true,
    features: [
      '28-31 unique dinner recipes every month',
      'Matches actual calendar days (Feb=28, Mar=31, etc.)',
      '➕ BONUS: 7 breakfast recipes included FREE',
      '➕ BONUS: 5 dessert recipes included FREE',
      'Choose from 8 diet plans (Mediterranean, Keto, Vegan, etc.)',
      'Full ingredients list with measurements',
      'Complete nutritional information (calories, macros, fiber)',
      'Beautiful PDF with AI-generated images',
      'Prep time, cook time, and difficulty level',
      'Keep access to ALL previous months forever',
      'Change diet preferences each month',
      'Adjust family size and dietary needs anytime',
      'Priority email support',
      'Cancel anytime - keep your past meal plans'
    ]
  },
  {
    id: 'annual-subscription',
    name: 'AI-Generated Annual Plan',
    description: 'Save $48/year with annual billing - best value!',
    price: 29900, // $299/year in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL || '',
    image: '/images/annual-calendar.jpg',
    type: 'subscription',
    features: [
      '✨ Save $48/year - Just $24.92/month!',
      '360+ unique dinner recipes per year',
      '28-31 dinners every month (matches calendar)',
      '➕ BONUS: 84 breakfast recipes annually',
      '➕ BONUS: 60 dessert recipes annually',
      'Everything in Monthly Plan included',
      'All 12 months delivered throughout the year',
      'Priority support and early access to new features',
      'Archive access grows to 500+ recipes',
      'Change diet preferences monthly',
      'Adjust family size anytime',
      'Cancel anytime - prorated refund available',
      'Best value for committed meal planners'
    ]
  },
  {
    id: 'ai-customized',
    name: 'AI-Customized Interactive',
    description: 'Chat with AI to customize your meal plans in real-time (Coming Feb 2026)',
    price: 4900, // $49/month in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_AI_CUSTOM || '',
    image: '/images/ai-custom-calendar.jpg',
    type: 'subscription',
    features: [
      '🤖 Everything in Monthly Plan PLUS AI Chat',
      '28-31 dinners + BONUS breakfasts & desserts',
      'Chat with AI to customize ANY recipe',
      '"Swap this dinner" or "More chicken dishes"',
      'AI learns your preferences over time',
      'Dynamic meal plan adjustments',
      'Real-time recipe modifications',
      'Personalized recommendations',
      '"Make it spicier" or "Less prep time"',
      'Save favorite customizations',
      '🎉 Early access pricing - $49/month',
      'Regular price will be $59/month after launch',
      '📅 Beta access starting February 2026'
    ]
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(p => p.priceId === priceId)
}