'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId?: string
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const GA_TRACKING_ID = gaId || process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  )
}

// Analytics tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
    console.log('📊 Analytics event:', { action, category, label, value })
  }
}

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
      page_title: title || document.title
    })
  }
}

export const trackPurchaseGA = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'USD',
      items: items
    })
  }
}

export const trackBeginCheckoutGA = (value: number, items: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: value,
      items: items
    })
  }
}

export const trackAddToCartGA = (value: number, items: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: value,
      items: items
    })
  }
}

export const trackViewItem = (itemId: string, itemName: string, category: string, value: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'view_item', {
      currency: 'USD',
      value: value,
      items: [{
        item_id: itemId,
        item_name: itemName,
        item_category: category,
        price: value,
        quantity: 1
      }]
    })
  }
}

export const trackGenerateLead = (value: number = 5, leadSource: string = 'free-meal-plan') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      value: value,
      currency: 'USD',
      lead_source: leadSource
    })
  }
}

export const trackSignUp = (method: string = 'email') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'sign_up', {
      method: method
    })
  }
}

export const trackLogin = (method: string = 'email') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'login', {
      method: method
    })
  }
}

export const trackSearch = (searchTerm: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'search', {
      search_term: searchTerm
    })
  }
}

export const trackCustomEvent = (eventName: string, parameters: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters)
  }
}