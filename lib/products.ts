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
    description: 'Luxury personalized meal planning designed specifically for your family\'s unique wellness goals and preferences',
    price: 14900, // in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CUSTOM_FAMILY || '',
    image: '/images/family-meals.jpg',
    type: 'one-time',
    features: [
      'Completely personalized 30-day plan',
      'Customized for your family size',
      'Multiple dietary accommodations',
      'Kid-friendly wellness options',
      'Mix of cuisine styles in one plan',
      'Budget-conscious shopping strategies',
      'Batch cooking & meal prep guides',
      'Time-saving meal prep strategies',
      'One wellness consultation call',
      'Special occasion meal alternatives'
    ]
  },
  {
    id: 'monthly-calendar',
    name: 'Monthly Wellness Journey',
    description: 'Fresh curated meal plans delivered monthly featuring rotating global cuisines and seasonal ingredients',
    price: 2900, // in cents per month
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || '',
    image: '/images/monthly-calendar.jpg',
    type: 'subscription',
    features: [
      'New designer calendar each month',
      'Rotating cuisine themes',
      'Seasonal & locally-inspired recipes',
      'Member-exclusive wellness content',
      'Access to full recipe archive',
      'Monthly wellness coaching Q&A',
      'Private wellness community',
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