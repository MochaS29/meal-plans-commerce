import Script from 'next/script'

interface StructuredDataProps {
  type?: 'website' | 'product' | 'service' | 'article' | 'recipe' | 'organization'
  data?: Record<string, any>
}

export default function StructuredData({ type = 'website', data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type === 'website' ? 'WebSite' : 'Service',
    }

    switch (type) {
      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: 'Mindful Meal Plan',
          description: 'AI-powered personalized meal planning with 3,586+ recipes across Mediterranean, Keto, Vegan, and more diets',
          url: 'https://mindfulmealplan.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://mindfulmealplan.com/recipes?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: "Mocha's MindLab Inc.",
            url: 'https://mochasmindlab.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://mindfulmealplan.com/logo.png',
              width: 512,
              height: 512
            }
          }
        }

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: "Mocha's MindLab Inc.",
          alternateName: 'Mindful Meal Plan',
          url: 'https://mindfulmealplan.com',
          logo: 'https://mindfulmealplan.com/logo.png',
          description: 'AI-powered personalized meal planning service providing custom nutrition plans for healthy living',
          foundingDate: '2024',
          founders: [
            {
              '@type': 'Person',
              name: 'Mocha'
            }
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-XXX-XXX-XXXX',
            contactType: 'customer service',
            email: 'support@mindfulmealplan.com',
            availableLanguage: 'English'
          },
          sameAs: [
            'https://twitter.com/mindfulmealplan',
            'https://facebook.com/mindfulmealplan',
            'https://instagram.com/mindfulmealplan'
          ],
          offers: {
            '@type': 'Offer',
            category: 'Meal Planning Service',
            description: 'Personalized meal plans with recipes and shopping lists'
          }
        }

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Personalized Meal Planning',
          description: 'AI-powered custom meal plans with 3,586+ recipes, shopping lists, and nutrition tracking',
          provider: {
            '@type': 'Organization',
            name: "Mocha's MindLab Inc.",
            url: 'https://mindfulmealplan.com'
          },
          serviceType: 'Meal Planning',
          category: 'Health & Wellness',
          offers: [
            {
              '@type': 'Offer',
              name: '30-Day Mediterranean Challenge',
              description: 'Complete Mediterranean diet meal plan with recipes and shopping lists',
              price: '79',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: 'https://mindfulmealplan.com/plans/mediterranean-challenge'
            },
            {
              '@type': 'Offer',
              name: 'Custom Family Meal Plan',
              description: 'Personalized family meal planning with dietary preferences',
              price: '149',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: 'https://mindfulmealplan.com/plans/family-meal-plan'
            },
            {
              '@type': 'Offer',
              name: 'Monthly Meal Calendar Access',
              description: 'Subscription to monthly meal calendars and recipe updates',
              price: '29',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '29',
                priceCurrency: 'USD',
                unitCode: 'MON'
              },
              availability: 'https://schema.org/InStock',
              url: 'https://mindfulmealplan.com/plans/monthly-subscription'
            }
          ],
          areaServed: {
            '@type': 'Country',
            name: 'United States'
          },
          audience: {
            '@type': 'Audience',
            audienceType: 'Health-conscious individuals and families'
          }
        }

      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data?.name || 'Meal Plan',
          description: data?.description || 'Personalized meal planning service',
          brand: {
            '@type': 'Brand',
            name: 'Mindful Meal Plan'
          },
          offers: {
            '@type': 'Offer',
            price: data?.price || '79',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: "Mocha's MindLab Inc."
            }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            bestRating: '5',
            worstRating: '1',
            ratingCount: '247'
          },
          review: [
            {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5'
              },
              author: {
                '@type': 'Person',
                name: 'Sarah M.'
              },
              reviewBody: 'Lost 15 pounds in 2 months! The meal plans are delicious and easy to follow.'
            }
          ]
        }

      case 'recipe':
        return {
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          name: data?.name || 'Healthy Recipe',
          description: data?.description || 'Nutritious and delicious recipe',
          image: data?.image || 'https://mindfulmealplan.com/recipe-default.jpg',
          author: {
            '@type': 'Organization',
            name: "Mocha's MindLab Inc."
          },
          cookTime: data?.cookTime || 'PT30M',
          prepTime: data?.prepTime || 'PT15M',
          totalTime: data?.totalTime || 'PT45M',
          recipeYield: data?.servings || '4 servings',
          nutrition: {
            '@type': 'NutritionInformation',
            calories: data?.calories || '350 calories',
            proteinContent: data?.protein || '25g',
            carbohydrateContent: data?.carbs || '30g',
            fatContent: data?.fat || '15g'
          },
          recipeIngredient: data?.ingredients || [],
          recipeInstructions: data?.instructions?.map((instruction: string, index: number) => ({
            '@type': 'HowToStep',
            text: instruction,
            position: index + 1
          })) || [],
          recipeCategory: data?.category || 'Main Course',
          recipeCuisine: data?.cuisine || 'Mediterranean',
          keywords: data?.keywords || 'healthy, nutritious, easy'
        }

      default:
        return { ...baseData, ...data }
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2)
      }}
      strategy="afterInteractive"
    />
  )
}

// Breadcrumb structured data component
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData, null, 2)
      }}
      strategy="afterInteractive"
    />
  )
}

// FAQ structured data component
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2)
      }}
      strategy="afterInteractive"
    />
  )
}