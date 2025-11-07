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
  // NEW SIMPLIFIED PRODUCTS
  {
    id: 'custom-meal-plan',
    name: 'Custom AI Meal Plan',
    description: 'One month of AI-personalized recipes tailored to your exact preferences, family size, and dietary needs',
    price: 5900, // $59 in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CUSTOM_ONE_TIME || '',
    image: '/images/wellness-calendar.jpg',
    type: 'one-time',
    popular: true,
    features: [
      'AI-personalized for your exact needs',
      '30-35 dinner recipes + 4 snacks',
      'Scaled to your family size (2-8 people)',
      'Accommodates all dietary restrictions',
      'Monthly calendar with all recipes',
      'Complete shopping lists',
      'Meal prep guides included',
      'Delivered in 2-4 hours',
      'Beautiful printable PDF'
    ]
  },
  {
    id: 'monthly-subscription',
    name: 'Monthly Subscription',
    description: 'Fresh AI-personalized meal plans delivered on the 1st of every month',
    price: 2900, // $29/month in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_SUB || '',
    image: '/images/monthly-calendar.jpg',
    type: 'subscription',
    features: [
      'New AI meal plan every month',
      'Delivered on the 1st automatically',
      '30-35 personalized recipes each month',
      'Save 50% vs one-time purchase',
      'Update preferences anytime',
      'Access to all your past plans',
      'Cancel anytime - no commitment',
      'Member-only recipe archive'
    ]
  },
  // LEGACY PRODUCTS (for existing pages)
  {
    id: 'wellness-transformation',
    name: '30-Day Wellness Transformation',
    description: 'Complete meal planning package with your choice of cuisine style',
    price: 5900,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WELLNESS || '',
    image: '/images/wellness-calendar.jpg',
    type: 'one-time',
    popular: false,
    features: [
      '30-day personalized calendar',
      'Choice of cuisine style',
      'AI-personalized recipes',
      'Shopping lists & meal prep guides',
      'Delivered in 2-4 hours'
    ]
  },
  {
    id: 'custom-family',
    name: 'Custom Family Plan',
    description: 'AI-powered meal planning for families',
    price: 5900,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CUSTOM_FAMILY || '',
    image: '/images/family-meals.jpg',
    type: 'one-time',
    popular: false,
    features: [
      'AI-personalized recipes',
      'Smart portion sizing for families',
      'Multiple dietary needs handled',
      'Kid-friendly options',
      'Delivered in 2-4 hours'
    ]
  },
  {
    id: 'monthly-calendar',
    name: 'Monthly Plan',
    description: 'Fresh meal plans delivered monthly',
    price: 2900,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || '',
    image: '/images/monthly-calendar.jpg',
    type: 'subscription',
    popular: false,
    features: [
      'New plan every month',
      'AI-personalized recipes',
      'Cancel anytime'
    ]
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(p => p.priceId === priceId)
}