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
    name: '30-Day Wellness Transformation',
    description: 'Complete meal planning package with your choice of cuisine style - Mediterranean, Intermittent Fasting, Keto, Plant-Based, Clean Eating, or Global Fusion',
    price: 7900, // in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WELLNESS || '',
    image: '/images/wellness-calendar.jpg',
    type: 'one-time',
    popular: true,
    features: [
      '30-day designer printable calendar',
      'Choice of wellness cuisine style',
      '50+ restaurant-quality recipes',
      'Professionally organized shopping lists',
      'Sunday meal prep strategies',
      'Complete nutritional breakdowns',
      'Wellness journey quick-start guide',
      'Email support from our wellness team',
      'Lifetime access to all updates'
    ]
  },
  {
    id: 'custom-family',
    name: 'Custom Family Wellness Plan',
    description: 'AI-powered personalized meal planning designed specifically for your family\'s unique wellness goals and preferences',
    price: 9900, // in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CUSTOM_FAMILY || '',
    image: '/images/family-meals.jpg',
    type: 'one-time',
    features: [
      'AI-personalized 30-day plan',
      'Smart portion sizing for 2-8 people',
      'Multiple dietary accommodations handled',
      'Kid-friendly wellness options included',
      'Mix of cuisine styles in one plan',
      'Optimized shopping lists by store section',
      'Batch cooking & meal prep guides',
      'Time-saving meal prep strategies',
      'Generated within 24 hours',
      'Unlimited regeneration (adjust anytime)'
    ]
  },
  {
    id: 'monthly-calendar',
    name: 'Monthly Wellness Journey',
    description: 'Fresh AI-curated meal plans delivered monthly featuring rotating global cuisines and seasonal ingredients',
    price: 2900, // in cents per month
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || '',
    image: '/images/monthly-calendar.jpg',
    type: 'subscription',
    features: [
      'New designer calendar each month',
      'Rotating cuisine themes',
      'Seasonal & locally-inspired recipes',
      'AI wellness insights & monthly tips',
      'Access to full recipe archive',
      'AI-powered recipe Q&A chatbot',
      'Exclusive member resources',
      'Switch cuisine styles anytime',
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