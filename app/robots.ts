import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mindfulmealplan.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/diets/',
          '/plans/',
          '/pricing',
          '/calendar',
          '/recipes',
          '/menu-benefits',
          '/login',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/success',
          '/portal',
          '/_next/',
          '/static/',
          '*.json',
          '/tmp/',
          '/temp/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/diets/',
          '/plans/',
          '/pricing',
          '/calendar',
          '/recipes',
          '/menu-benefits',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/success',
          '/portal',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/diets/',
          '/plans/',
          '/pricing',
          '/calendar',
          '/recipes',
          '/menu-benefits',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/success',
          '/portal',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}