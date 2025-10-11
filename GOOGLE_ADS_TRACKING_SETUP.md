# Google Ads Conversion Tracking Setup Guide

## Overview

Your landing pages now have Google Ads conversion tracking fully integrated. This tracks:
- **Purchases** - When users complete checkout
- **Lead captures** - When users submit email on /free-meal-plan
- **Begin checkout** - When users click checkout buttons
- **Page views** - All page navigation

## Setup Instructions

### 1. Get Your Google Ads Conversion IDs

1. Go to [Google Ads](https://ads.google.com)
2. Click **Tools & Settings** → **Conversions**
3. Click **+ New conversion action**
4. Create these conversion actions:

#### Purchase Conversion
- Goal: **Purchase**
- Value: Use transaction-specific value
- Count: **Every**
- Click-through conversion window: **30 days**

#### Lead Capture Conversion
- Goal: **Submit lead form**
- Value: **$5** (estimated)
- Count: **One**
- Click-through conversion window: **30 days**

#### Begin Checkout Conversion
- Goal: **Add to cart**
- Value: Use transaction-specific value
- Count: **Every**
- Click-through conversion window: **7 days**

### 2. Add Your Conversion IDs to .env.local

```bash
# Google Ads Configuration
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

# Replace these with your actual conversion labels from Google Ads
# You'll get these when you create each conversion action
NEXT_PUBLIC_PURCHASE_LABEL=abc123def456
NEXT_PUBLIC_LEAD_LABEL=xyz789uvw321
NEXT_PUBLIC_BEGIN_CHECKOUT_LABEL=qrs456tuv789
```

### 3. Update GoogleAdsTracking.tsx with Real Labels

Open `/components/GoogleAdsTracking.tsx` and replace the placeholder labels:

```typescript
// Line 27 - Purchase tracking
trackConversion('PURCHASE_CONVERSION_LABEL', amount)
// Replace with:
trackConversion(process.env.NEXT_PUBLIC_PURCHASE_LABEL || 'PURCHASE_CONVERSION_LABEL', amount)

// Line 43 - Lead tracking
trackConversion('LEAD_CONVERSION_LABEL', 5)
// Replace with:
trackConversion(process.env.NEXT_PUBLIC_LEAD_LABEL || 'LEAD_CONVERSION_LABEL', 5)

// Line 56 - Begin checkout tracking
trackConversion('ADD_TO_CART_CONVERSION_LABEL', amount)
// Replace with:
trackConversion(process.env.NEXT_PUBLIC_BEGIN_CHECKOUT_LABEL || 'ADD_TO_CART_CONVERSION_LABEL', amount)

// Line 69 - Begin checkout (secondary)
trackConversion('BEGIN_CHECKOUT_CONVERSION_LABEL', amount)
// Replace with:
trackConversion(process.env.NEXT_PUBLIC_BEGIN_CHECKOUT_LABEL || 'BEGIN_CHECKOUT_CONVERSION_LABEL', amount)
```

## Tracked Events

### Automatic Tracking

These events are tracked automatically across all pages:

1. **Page Views** - Every page load sends a page_view event
2. **Google Ads Global Tag** - Loads on all pages for remarketing

### Landing Page Tracking

All 4 landing pages (`/lp/personalized`, `/lp/keto`, `/lp/family`, `/free-meal-plan`) include:
- Google Ads global site tag
- Automatic page view tracking
- Enhanced ecommerce events

### Conversion Tracking

#### 1. **Email Lead Capture** (`/free-meal-plan`)
**Triggers:** When user submits email form

**Function:** `trackLeadCapture('free-meal-plan')`

**Events sent:**
- `conversion` with label LEAD_CONVERSION_LABEL
- `generate_lead` with value: $5
- Lead source: 'free-meal-plan'

**Code location:** `/app/free-meal-plan/page.tsx:17`

#### 2. **Begin Checkout** (All landing pages)
**Triggers:** When user clicks any checkout button

**Function:** `trackBeginCheckout(productId, amount)`

**Events sent:**
- `conversion` with label BEGIN_CHECKOUT_CONVERSION_LABEL
- `begin_checkout` with product details
- Transaction value included

**Code location:** `/components/CheckoutButton.tsx:35`

#### 3. **Purchase Completion** (Success page)
**Triggers:** After successful Stripe checkout

**Function:** `trackPurchase(amount, productId)`

**Events sent:**
- `conversion` with label PURCHASE_CONVERSION_LABEL
- `purchase` event with full transaction details
- Transaction ID, value, items array

**To implement:** Add this to `/app/success/page.tsx`

## Testing Conversion Tracking

### 1. Use Google Tag Assistant

1. Install [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore)
2. Visit your landing pages (http://localhost:3003/lp/personalized)
3. Tag Assistant will show if tags are firing correctly

### 2. Check Browser Console

Open Developer Tools → Console. You'll see:
```
🎯 Conversion tracked: LEAD_CONVERSION_LABEL $5
```

### 3. Google Ads Real-Time Reports

1. Go to Google Ads → **Tools & Settings** → **Conversions**
2. Click on any conversion action
3. View **Real-time reports** (may take 3-24 hours to show)

## Verifying Setup

### Check Tag is Loaded

Open any landing page and check the Network tab for:
```
https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX
```

### Test Conversions

1. **Test Lead Capture:**
   - Go to http://localhost:3003/free-meal-plan
   - Submit email form
   - Check console for: `🎯 Conversion tracked: LEAD_CONVERSION_LABEL $5`

2. **Test Begin Checkout:**
   - Go to any landing page pricing section
   - Click "Start Now →" or "Select"
   - Check console for: `🎯 Conversion tracked: BEGIN_CHECKOUT_CONVERSION_LABEL $29`

3. **Test Purchase** (requires Stripe setup):
   - Complete a test purchase
   - On success page, check for purchase event

## Enhanced Ecommerce Tracking

All conversion events also send enhanced ecommerce data:

```javascript
{
  transaction_id: "1728244800000-monthly-calendar",
  value: 29.00,
  currency: "USD",
  items: [{
    item_id: "monthly-calendar",
    item_name: "Monthly Wellness Journey",
    price: 29.00,
    quantity: 1
  }]
}
```

This allows you to:
- Track revenue by product
- See which products convert best
- Analyze cart abandonment
- Create dynamic remarketing campaigns

## Google Ads Campaign Integration

### Linking Conversions to Campaigns

In your Google Ads campaigns:

1. **Search Campaigns:**
   - Optimize for "Purchase" conversions
   - Bid strategy: Target ROAS or Maximize Conversions

2. **Display Remarketing:**
   - Target users who triggered "Begin Checkout" but didn't purchase
   - Use cart abandonment audience

3. **Lead Gen Campaigns:**
   - Optimize for "Lead Capture" conversions
   - Lower CPA target ($50-100)

### Import Conversions from Analytics

If you also use Google Analytics 4:

1. Link GA4 to Google Ads
2. Import GA4 conversion events as Google Ads conversions
3. Compare tracking accuracy

## Troubleshooting

### Conversions Not Showing

1. **Check .env.local** - Make sure `NEXT_PUBLIC_GOOGLE_ADS_ID` is set
2. **Verify conversion labels** - Labels must match exactly from Google Ads
3. **Wait 3-24 hours** - Conversions can take time to appear
4. **Check ad blockers** - Disable browser ad blockers for testing

### Duplicate Tracking

If you see duplicate events:
- Only include GoogleAdsTracking component once (it's in `layout.tsx`)
- Don't call tracking functions twice

### Tags Not Loading

1. Check browser console for errors
2. Verify Google Ads ID format: `AW-XXXXXXXXXX`
3. Ensure Next.js Script components are rendering

## Production Deployment

### Before Going Live

1. ✅ Replace all conversion labels with real ones from Google Ads
2. ✅ Add environment variables to Vercel/hosting platform
3. ✅ Test conversions on staging environment
4. ✅ Verify Google Tag Assistant shows green checkmark
5. ✅ Set up conversion alerts in Google Ads

### Vercel Environment Variables

In Vercel dashboard:

1. Go to Project → Settings → Environment Variables
2. Add these variables for Production:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
   NEXT_PUBLIC_PURCHASE_LABEL=abc123def456
   NEXT_PUBLIC_LEAD_LABEL=xyz789uvw321
   NEXT_PUBLIC_BEGIN_CHECKOUT_LABEL=qrs456tuv789
   ```

3. Redeploy after adding variables

## Monitoring & Optimization

### Key Metrics to Track

| Metric | Target | Where to Find |
|--------|--------|---------------|
| Conversion Rate | 2-5% | Google Ads → Campaigns |
| Cost Per Lead | $50-100 | Google Ads → Conversions |
| Cost Per Purchase | $120-160 | Google Ads → Conversions |
| ROAS | 2:1+ | Google Ads → Reports |

### Weekly Optimization Tasks

1. **Review conversion data** - Which campaigns drive conversions?
2. **Check search terms** - Add negative keywords
3. **Adjust bids** - Increase bids on high-converting keywords
4. **Test ad copy** - A/B test headlines and descriptions
5. **Analyze landing page performance** - Which LP converts best?

## Additional Resources

- [Google Ads Conversion Tracking Guide](https://support.google.com/google-ads/answer/1722022)
- [Enhanced Ecommerce Tracking](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Google Tag Manager Setup](https://tagmanager.google.com/)

## Support

If you encounter issues:
1. Check Google Ads Help Center
2. Use Google Tag Assistant for debugging
3. Review browser console for errors
4. Contact Google Ads support for account-specific issues
