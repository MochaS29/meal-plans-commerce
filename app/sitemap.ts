import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mindfulmealplan.com'
  const currentDate = new Date()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calendar`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recipes-static`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recipes-showcase`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/menu-benefits`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/userportal`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  // Diet plan pages
  const dietPlans = [
    'mediterranean-challenge',
    'family-meal-plan',
    'monthly-subscription',
    'keto',
    'vegan',
    'paleo',
    'vegetarian',
    'intermittent-fasting'
  ]

  const dietPages = dietPlans.map(plan => ({
    url: `${baseUrl}/diets/${plan}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Plan pages
  const planPages = [
    'wellness-transformation',
    'custom-family',
    'monthly-calendar'
  ].map(plan => ({
    url: `${baseUrl}/plans/${plan}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Admin pages (noindex, but include for completeness)
  const adminPages = [
    {
      url: `${baseUrl}/admin`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/admin/recipes`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.1,
    },
  ]

  return [
    ...staticPages,
    ...dietPages,
    ...planPages,
    ...adminPages
  ]
}