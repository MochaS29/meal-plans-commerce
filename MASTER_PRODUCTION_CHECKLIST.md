# 🚀 MASTER PRODUCTION CHECKLIST - Mindful Meal Plan
*Merged from PRE_LAUNCH_CHECKLIST.md and PRODUCTION_CHECKLIST.md*

## Current Status Overview

### ✅ COMPLETED
- **851 recipes** with all images generated
- **8 diet plans** configured
- Privacy Policy page exists (`/app/privacy/page.tsx`)
- Terms of Service page exists (`/app/terms/page.tsx`)
- Monitoring system created and working
- Database schema fixed
- Webhook handling implemented
- PDF generation working

### ⏳ IN PROGRESS
- Email domain verification pending (recipes@mochasmindlab.com)

### ❌ NOT STARTED
- Still using Stripe test keys
- RLS not yet enabled on Supabase

---

## 🔴 CRITICAL TASKS - Must Complete Before Launch

### 1. ⚠️ Enable Supabase RLS Security
**[📍 Duplicate - appears in both checklists]**
**Status:** Ready to implement
- [ ] Run the SQL script in `supabase-rls-setup.sql` in Supabase SQL Editor
- [ ] Verify all tables show "RLS enabled"
- [ ] Test that policies are working correctly
- [ ] Check RLS status for users, purchases, subscriptions tables
- [ ] Verify admin access policies if needed
**Why:** Without RLS, anyone with your Supabase URL and anon key can read/write ALL data

### 2. 💳 Stripe Production Setup
**[📍 Duplicate - appears in both checklists with different details]**

#### From PRE_LAUNCH_CHECKLIST (more detailed):
- [ ] **REGENERATE** Stripe Live secret key (current one in `.env.local` is commented out and exposed)
- [ ] Update `.env.local` with live keys:
  ```env
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51S8Qa0HpQk3HgWlVwfNgjEUAVI3EXqD037FobkzCxVJZAgfvcMV0OnLRhAtDtnFOFX3sCbWsrh5eYvcyXGKVRlJQ00mA6fIsU1
  STRIPE_SECRET_KEY=sk_live_[REGENERATED_KEY_HERE]
  ```
- [ ] Activate Stripe account (complete business verification)
- [ ] Configure Stripe webhook for production:
  - [ ] Go to https://dashboard.stripe.com/webhooks
  - [ ] Add endpoint: `https://mindfulmealplan.com/api/stripe-webhook`
  - [ ] Select events:
    - `checkout.session.completed`
    - `customer.subscription.created`
    - `customer.subscription.updated`
    - `customer.subscription.deleted`
  - [ ] Copy webhook secret to `.env.local`: `STRIPE_WEBHOOK_SECRET`

#### From PRODUCTION_CHECKLIST (simpler):
- [ ] Get your Stripe live keys from https://dashboard.stripe.com/apikeys
- [ ] Update `STRIPE_WEBHOOK_SECRET` with production webhook secret

### 3. 📧 Complete Email Domain Verification
**[📍 Duplicate - appears in both checklists]**
**Status:** Waiting for DNS propagation
- [ ] Complete domain verification with Resend for `recipes@mochasmindlab.com`
- [ ] Update `EMAIL_FROM` in `.env.local` from `onboarding@resend.dev` to `recipes@mochasmindlab.com`
- [ ] Test email delivery with custom domain
**Why:** Currently using Resend sandbox which has limitations

### 4. 🔐 Environment Variables Configuration
**[📍 Duplicate - appears in both checklists with different organization]**

#### Commerce App Environment Variables (mindfulmealplan.com)
**From PRE_LAUNCH_CHECKLIST (complete list):**
- [ ] Add all production environment variables to Vercel:
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (LIVE)
  - [ ] `STRIPE_SECRET_KEY` (LIVE - regenerated)
  - [ ] `STRIPE_WEBHOOK_SECRET` (production webhook)
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `JWT_SECRET` (new secure value - generate with: `openssl rand -base64 32`)
  - [ ] `RESEND_API_KEY`
  - [ ] `EMAIL_FROM` (update after domain verification)
  - [ ] `ANTHROPIC_API_KEY`
  - [ ] `GOOGLE_AI_API_KEY`
  - [ ] `REPLICATE_API_TOKEN`
  - [ ] `ADMIN_API_KEY` (new secure value - generate with: `openssl rand -hex 32`)
  - [ ] `NEXT_PUBLIC_DOMAIN=https://mindfulmealplan.com`
  - [ ] `BLOB_READ_WRITE_TOKEN` (Vercel Blob Storage)

**From PRODUCTION_CHECKLIST (adds):**
- [ ] Ensure sensitive keys are marked as secret in Vercel
- [ ] Remove any test/development values

#### Admin Portal Environment Variables (admin.mindfulmealplan.com)
**[📍 Only in PRE_LAUNCH_CHECKLIST]**
- [ ] Add all environment variables to Vercel:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `JWT_SECRET` (same as commerce app)
  - [ ] `ADMIN_USERNAME` (new secure username, not 'admin')
  - [ ] `ADMIN_PASSWORD` (new secure password)

### 5. 🔒 Security Hardening
**[📍 From PRE_LAUNCH_CHECKLIST - more detailed]**
- [ ] Change `ADMIN_USERNAME` from default `admin`
- [ ] Change `ADMIN_PASSWORD` from default (currently uses `ADMIN_API_KEY`)
- [ ] Generate new strong `JWT_SECRET` (use: `openssl rand -base64 32`)
- [ ] Generate new `ADMIN_API_KEY` (use: `openssl rand -hex 32`)
- [ ] Verify admin middleware is protecting `/admin` routes
- [ ] Test that customers cannot access admin portal with their credentials

### 6. 🌐 Configure Production Domain
**[📍 Duplicate - different details in each]**

**From PRE_LAUNCH_CHECKLIST (Vercel-specific):**
- [ ] Go to **Settings → Domains** in Vercel:
  - [ ] Add domain: `mindfulmealplan.com` → Production (`production` branch)
  - [ ] Add domain: `www.mindfulmealplan.com` → Redirect to `mindfulmealplan.com`
  - [ ] Add domain: `staging.mindfulmealplan.com` → Preview (`staging` branch)

**From PRODUCTION_CHECKLIST (general):**
- [ ] Purchase domain if not already owned
- [ ] Update DNS records as instructed by Vercel
- [ ] Update `NEXT_PUBLIC_DOMAIN` in environment variables

---

## 🚀 DEPLOYMENT STEPS

### Vercel Setup - Commerce App
**[📍 From PRE_LAUNCH_CHECKLIST]**

1. [ ] Go to https://vercel.com/new
2. [ ] Click **Import** on `MochaS29/meal-plans-commerce`
3. [ ] Configure Project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. [ ] Click **Deploy**
5. [ ] Go to **Settings → Git**:
   - [ ] Production Branch: `production`
6. [ ] Add all environment variables in **Settings → Environment Variables**

### Vercel Setup - Admin Portal
**[📍 From PRE_LAUNCH_CHECKLIST - separate admin app]**

1. [ ] Go to https://vercel.com/new
2. [ ] Click **Import** on `MochaS29/meal-plans-admin`
3. [ ] Configure Project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. [ ] Click **Deploy**
5. [ ] Go to **Settings → Git**:
   - [ ] Production Branch: `production`
6. [ ] Go to **Settings → Domains**:
   - [ ] Add domain: `admin.mindfulmealplan.com`
7. [ ] Add all admin environment variables

---

## 🟡 IMPORTANT TASKS - Highly Recommended

### 7. 🛡️ Set Up Rate Limiting
**[📍 From PRODUCTION_CHECKLIST]**
**Status:** Not implemented
- [ ] Implement rate limiting on API endpoints
- [ ] Add rate limiting for:
  - Recipe generation endpoint
  - Stripe webhook endpoint
  - Health check endpoints
- [ ] Consider using Vercel Edge Config or Upstash Redis
**Why:** Prevents abuse and excessive API costs

### 8. 💾 Configure Backups
**[📍 From PRODUCTION_CHECKLIST]**
**Status:** Not configured
- [ ] Enable Supabase automatic backups (Pro plan)
- [ ] Set up database backup schedule
- [ ] Document recovery procedures
- [ ] Test restore process
**Why:** Critical for disaster recovery

### 9. 📊 Analytics & Tracking Setup
**[📍 From PRODUCTION_CHECKLIST with more detail]**
**Status:** Partially configured
- [ ] Get Google Analytics GA4 ID
- [ ] Update `NEXT_PUBLIC_GA_ID` in environment variables
- [ ] Set up conversion tracking for purchases
- [ ] Configure Google Search Console
- [ ] Add site verification codes:
  - [ ] `GOOGLE_SITE_VERIFICATION`
  - [ ] `YANDEX_VERIFICATION` (optional)
  - [ ] `FACEBOOK_DOMAIN_VERIFICATION` (optional)
- [ ] Google Ads Conversion Tracking (`NEXT_PUBLIC_GOOGLE_ADS_ID`)
**Why:** Track performance and user behavior

### 10. 🔍 SEO & Meta Tags
**[📍 From PRODUCTION_CHECKLIST]**
**Status:** Basic implementation
- [ ] Add proper meta descriptions to all pages
- [ ] Create and submit sitemap.xml
- [ ] Add robots.txt file
- [ ] Implement Open Graph tags for social sharing
- [ ] Add structured data for recipes
**Why:** Improve search visibility and social sharing

### 11. 📱 Mobile Testing
**[📍 From PRODUCTION_CHECKLIST]**
**Status:** Needs verification
- [ ] Test all pages on mobile devices
- [ ] Verify payment flow works on mobile
- [ ] Check PDF generation on mobile
- [ ] Test email rendering on mobile clients
**Why:** Many users will access via mobile

### 12. 🏃 Performance Optimization
**[📍 From PRODUCTION_CHECKLIST]**
**Status:** Not optimized
- [ ] Optimize images (use next/image optimization)
- [ ] Implement caching strategies
- [ ] Optimize database queries
- [ ] Add loading states for better UX
- [ ] Consider CDN for static assets
**Why:** Faster site = better conversions

---

## 🟢 ADDITIONAL TASKS - Nice to Have

### 13. 🎯 Purchase History & User Dashboard
**[📍 From PRODUCTION_CHECKLIST]**
**Status:** Not implemented
- [ ] Create user dashboard page
- [ ] Show purchase history
- [ ] Allow re-downloading of purchased PDFs
- [ ] Add user profile management
**Why:** Better user experience for returning customers

### 14. 💬 Customer Support System
**[📍 From PRODUCTION_CHECKLIST]**
**Status:** Not implemented
- [ ] Set up support email address
- [ ] Create FAQ page
- [ ] Add contact form
- [ ] Consider adding Intercom or similar chat widget
**Why:** Handle customer inquiries efficiently

### 15. 📝 Legal Pages & Compliance
**[📍 From PRODUCTION_CHECKLIST - expanded]**
**Status:** Partially created
- [x] Terms of Service page exists
- [x] Privacy Policy page exists
- [ ] Create Refund Policy page
- [ ] Add cookie consent banner (if needed)
- [ ] Ensure GDPR compliance
- [ ] Ensure CCPA compliance (if applicable)
**Why:** Legal requirement in many jurisdictions

### 16. 🧪 Comprehensive Testing
**[📍 From PRODUCTION_CHECKLIST]**
**Status:** Basic testing done
- [ ] Create automated test suite
- [ ] Test all user flows end-to-end
- [ ] Load testing for expected traffic
- [ ] Security testing (OWASP Top 10)
- [ ] Cross-browser testing
**Why:** Catch issues before customers do

---

## 📋 PRE-LAUNCH FINAL CHECKS

### Last 24 Hours Before Launch
**[📍 From PRODUCTION_CHECKLIST]**
- [ ] Take full backup of everything
- [ ] Test complete purchase flow with real credit card
- [ ] Verify emails are being sent and received
- [ ] Check all monitoring systems are active
- [ ] Ensure error tracking is working
- [ ] Have rollback plan ready
- [ ] Prepare launch announcement

### Production Testing
**[📍 From PRE_LAUNCH_CHECKLIST]**
- [ ] Complete test purchase with LIVE Stripe keys
- [ ] Verify webhook receives event
- [ ] Confirm email with PDF is sent
- [ ] Check database records are created
- [ ] Test subscription creation and cancellation
- [ ] Verify admin portal access control
- [ ] Test customer cannot access admin functions

### Monitoring Post-Launch
**[📍 From PRODUCTION_CHECKLIST]**
- [ ] Monitor error rates closely for first 48 hours
- [ ] Check email delivery rates
- [ ] Watch for any security alerts
- [ ] Monitor page load times
- [ ] Track conversion rates
- [ ] Be ready to respond to customer issues

---

## 🎯 PRIORITY ORDER

### Phase 1: Security & Payments (Days 1-2)
1. Enable RLS on Supabase
2. Regenerate and configure Stripe live keys
3. Set up production webhook
4. Generate new security keys (JWT, ADMIN_API)

### Phase 2: Deployment (Days 2-3)
5. Deploy commerce app to Vercel
6. Deploy admin portal to Vercel
7. Configure production domains
8. Add all environment variables

### Phase 3: Communications (Days 3-4)
9. Complete email domain verification
10. Test email delivery
11. Set up customer support email

### Phase 4: Testing & Optimization (Days 4-5)
12. Complete end-to-end testing
13. Mobile testing
14. Performance optimization
15. Set up analytics

### Phase 5: Launch Preparation (Day 6-7)
16. Final security review
17. Legal pages completion
18. Create backups
19. Prepare monitoring dashboards
20. Launch!

---

## 📊 ESTIMATED TIMELINE

- **Minimum viable launch:** 2-3 days (critical tasks only)
- **Recommended launch:** 1 week (critical + important tasks)
- **Ideal launch:** 2 weeks (all tasks except nice-to-haves)

---

## ⚠️ CRITICAL WARNINGS

1. **MUST regenerate Stripe secret key** - Current live key in comments may be compromised
2. **MUST enable RLS** - Database is completely open without it
3. **MUST change default admin credentials** - Security risk
4. **MUST verify email domain** - Or stay in sandbox mode with limitations

---

## 📝 NOTES

- This checklist merges PRE_LAUNCH_CHECKLIST.md (Oct 20) and PRODUCTION_CHECKLIST.md (Oct 27)
- Items marked with **[📍 Duplicate]** appear in both original checklists
- Items marked with **[📍 From PRE_LAUNCH_CHECKLIST]** only appear in that checklist
- Items marked with **[📍 From PRODUCTION_CHECKLIST]** only appear in that checklist
- The PRE_LAUNCH_CHECKLIST references a separate admin portal repository that may need deployment