'use client'

import Script from 'next/script'

interface GoogleAdsTrackingProps {
  conversionId?: string
}

export default function GoogleAdsTracking({ conversionId }: GoogleAdsTrackingProps) {
  const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-XXXXXXXXXX'

  return (
    <>
      {/* Google Ads Global Site Tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  )
}

// Conversion tracking functions
export const trackConversion = (conversionLabel: string, value?: number) => {
  const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-XXXXXXXXXX'

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      value: value,
      currency: 'USD'
    })
    console.log('🎯 Conversion tracked:', conversionLabel, value ? `$${value}` : '')
  }
}

// Specific conversion tracking functions
export const trackPurchase = (amount: number, productId: string) => {
  trackConversion('PURCHASE_CONVERSION_LABEL', amount)

  // Also track as enhanced ecommerce event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: `${Date.now()}-${productId}`,
      value: amount,
      currency: 'USD',
      items: [{
        item_id: productId,
        item_name: productId,
        price: amount,
        quantity: 1
      }]
    })
  }
}

export const trackLeadCapture = (source: string = 'free-meal-plan') => {
  trackConversion('LEAD_CONVERSION_LABEL', 5)

  // Track as lead event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      value: 5,
      currency: 'USD',
      lead_source: source
    })
  }
}

export const trackAddToCart = (productId: string, amount: number) => {
  trackConversion('ADD_TO_CART_CONVERSION_LABEL', amount)

  // Track as add_to_cart event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      value: amount,
      currency: 'USD',
      items: [{
        item_id: productId,
        item_name: productId,
        price: amount,
        quantity: 1
      }]
    })
  }
}

export const trackBeginCheckout = (productId: string, amount: number) => {
  trackConversion('BEGIN_CHECKOUT_CONVERSION_LABEL', amount)

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      value: amount,
      currency: 'USD',
      items: [{
        item_id: productId,
        item_name: productId,
        price: amount,
        quantity: 1
      }]
    })
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: url
    })
  }
}

export const trackViewPricing = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'view_pricing', {
      event_category: 'engagement',
      event_label: 'pricing_section_view'
    })
  }
}

export const trackCTAClick = (ctaLocation: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: ctaLocation
    })
  }
}
