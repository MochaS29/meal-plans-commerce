# 📋 PRE-LAUNCH CHECKLIST - Mindful Meal Plan

## Current Status

### ✅ DATABASE & CONTENT (Complete)
- [x] **851 recipes** with all images generated
- [x] **8 diet plans** configured
- [x] Privacy Policy page exists (`/app/privacy/page.tsx`)
- [x] Terms of Service page exists (`/app/terms/page.tsx`)

---

## 🔴 CRITICAL - PAYMENT & SECURITY

### Stripe Production Setup ⚠️ REQUIRED

- [ ] Regenerate Stripe Live secret key (current one in `.env.local` is commented out)
- [ ] Update `.env.local` with live keys:
  ```env
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51S8Qa0HpQk3HgWlVwfNgjEUAVI3EXqD037FobkzCxVJZAgfvcMV0OnLRhAtDtnFOFX3sCbWsrh5eYvcyXGKVRlJQ00mA6fIsU1
  STRIPE_SECRET_KEY=sk_live_[REGENERATED_KEY_HERE]
  ```
- [ ] Activate Stripe account (complete business verification)
- [ ] Configure Stripe webhook for production:
  - [ ] Go to https://dashboard.stripe.com/webhooks
  - [ ] Add endpoint: `https://mindfulmealplan.com/api/stripe-webhook`
  - [ ] Select events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
  - [ ] Copy webhook secret to `.env.local`: `STRIPE_WEBHOOK_SECRET`

### Environment Variables on Vercel

**Commerce App** (mindfulmealplan.com)
- [ ] Add all production environment variables to Vercel:
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (LIVE)
  - [ ] `STRIPE_SECRET_KEY` (LIVE)
  - [ ] `STRIPE_WEBHOOK_SECRET` (production webhook)
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `JWT_SECRET` (new secure value)
  - [ ] `RESEND_API_KEY`
  - [ ] `EMAIL_FROM`
  - [ ] `ANTHROPIC_API_KEY`
  - [ ] `GOOGLE_AI_API_KEY`
  - [ ] `REPLICATE_API_TOKEN`
  - [ ] `ADMIN_API_KEY` (new secure value)
  - [ ] `NEXT_PUBLIC_DOMAIN=https://mindfulmealplan.com`

**Admin Portal** (admin.mindfulmealplan.com)
- [ ] Add all environment variables to Vercel:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `JWT_SECRET` (same as commerce app)
  - [ ] `ADMIN_USERNAME` (new secure username)
  - [ ] `ADMIN_PASSWORD` (new secure password)

### Security

- [ ] Change `ADMIN_USERNAME` from default `admin`
- [ ] Change `ADMIN_PASSWORD` from default (currently uses `ADMIN_API_KEY`)
- [ ] Generate new strong `JWT_SECRET` (use: `openssl rand -base64 32`)
- [ ] Generate new `ADMIN_API_KEY` (use: `openssl rand -hex 32`)
- [ ] Verify admin middleware is protecting `/admin` routes
- [ ] Test that customers cannot access admin portal with their credentials

---

## 🚀 DEPLOYMENT

### Vercel Setup - Commerce App

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
6. [ ] Go to **Settings → Domains**:
   - [ ] Add domain: `mindfulmealplan.com` → Production (`production` branch)
   - [ ] Add domain: `www.mindfulmealplan.com` → Redirect to `mindfulmealplan.com`
   - [ ] Add domain: `staging.mindfulmealplan.com` → Preview (`staging` branch)
7. [ ] Add all environment variables in **Settings → Environment Variables**

### Vercel Setup - Admin Portal

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
   - [ ] Add domain: `admin.mindfulmealplan.com` → Production (`production` branch)
   - [ ] Add domain: `staging.admin.mindfulmealplan.com` → Preview (`staging` branch)
7. [ ] Add all environment variables in **Settings → Environment Variables**

### DNS Configuration

In your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.):

```
Type    Name      Value                      TTL
─────────────────────────────────────────────────
A       @         76.76.21.21                Auto
CNAME   www       cname.vercel-dns.com.      Auto
CNAME   admin     cname.vercel-dns.com.      Auto
CNAME   staging   cname.vercel-dns.com.      Auto
```

- [ ] Add DNS records to domain registrar
- [ ] Wait for DNS propagation (can take 24-48 hours)
- [ ] Verify SSL certificates issued automatically by Vercel

**Note:** Vercel provides the exact DNS records after you add the domain. Use those values.

---

## 📧 EMAIL & NOTIFICATIONS

### Resend Email Service

- [ ] Verify domain `mochasmindlab.com` in Resend dashboard (https://resend.com/domains)
- [ ] Add DNS records for domain verification:
  - [ ] SPF record: `v=spf1 include:_spf.resend.com ~all`
  - [ ] DKIM record (provided by Resend)
  - [ ] Domain verification TXT record (provided by Resend)
- [ ] Update `.env.local` and Vercel env vars:
  ```env
  EMAIL_FROM=recipes@mochasmindlab.com
  ```
- [ ] Test emails work:
  - [ ] Welcome email
  - [ ] Purchase confirmation email
  - [ ] Password reset email (if implemented)

---

## 🧪 TESTING

### End-to-End User Flow

- [ ] Test homepage loads correctly
- [ ] Test pricing page displays all plans
- [ ] Test signup flow (create new user account)
- [ ] Test email verification (if enabled)
- [ ] Test login flow with correct credentials
- [ ] Test login flow with incorrect credentials
- [ ] Test Stripe checkout flow:
  - [ ] Select a plan
  - [ ] Click "Subscribe"
  - [ ] Complete payment with test card: `4242 4242 4242 4242`
- [ ] Test subscription activation after payment
- [ ] Test access to `/userportal` after successful purchase
- [ ] Test meal plan selection (all 8 plans)
- [ ] Test calendar view displays correctly
- [ ] Test monthly calendar grid shows all 30 days
- [ ] Test print calendar functionality
- [ ] Test print recipe functionality
- [ ] Test shopping list generation
- [ ] Test shopping list print
- [ ] Test logout functionality
- [ ] Test protected routes redirect to login when not authenticated

### Admin Portal Testing

- [ ] Test admin login at `admin.mindfulmealplan.com/login`
- [ ] Test admin dashboard loads
- [ ] Test recipe management (view, create, edit, delete)
- [ ] Test menu creation and editing
- [ ] Test database viewer functionality
- [ ] Test that regular user credentials CANNOT access admin portal
- [ ] Test that admin can access all features

### Payment Testing

**With Test Mode:**
- [ ] Test successful payment: `4242 4242 4242 4242`
- [ ] Test declined card: `4000 0000 0000 0002`
- [ ] Test insufficient funds: `4000 0000 0000 9995`
- [ ] Test subscription webhook fires correctly
- [ ] Test user gets access immediately after payment
- [ ] Verify subscription appears in Stripe dashboard

**Before Going Live:**
- [ ] Switch to live Stripe keys
- [ ] Test with real card ($1 test transaction)
- [ ] Immediately refund test transaction
- [ ] Verify live webhook works

**Post-Launch:**
- [ ] Test subscription cancellation flow
- [ ] Test refund process
- [ ] Test failed payment handling

### Mobile Testing

- [ ] Test on iPhone (Safari)
- [ ] Test on iPhone (Chrome)
- [ ] Test on Android (Chrome)
- [ ] Test on Android (Samsung Internet)
- [ ] Test on tablet (iPad)
- [ ] Verify responsive design at various screen sizes
- [ ] Test navigation menu on mobile
- [ ] Test print functionality on mobile devices
- [ ] Test checkout flow on mobile

### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 📄 LEGAL & COMPLIANCE

### Privacy Policy

Review and update `/app/privacy/page.tsx` with:
- [ ] Cookie usage disclosure
- [ ] Payment processing disclosure (Stripe)
- [ ] Email collection disclosure (Resend)
- [ ] Analytics disclosure (if using Google Analytics)
- [ ] User data storage disclosure (Supabase)
- [ ] User rights (access, deletion, export)
- [ ] Contact information for privacy inquiries
- [ ] Effective date

### Terms of Service

Review and update `/app/terms/page.tsx` with:
- [ ] Subscription terms and conditions
- [ ] Refund policy (e.g., 30-day money-back guarantee)
- [ ] Cancellation policy (can cancel anytime)
- [ ] Content usage rights
- [ ] Liability limitations
- [ ] Dispute resolution
- [ ] Contact information
- [ ] Effective date

### Additional Legal

- [ ] **Cookie Consent Banner**: Add if required by jurisdiction (EU requires)
- [ ] **GDPR Compliance** (if targeting EU users):
  - [ ] Implement data export functionality
  - [ ] Implement account deletion functionality
  - [ ] Add consent checkboxes to signup
  - [ ] Update privacy policy with GDPR-specific language
- [ ] **CCPA Compliance** (if targeting California users):
  - [ ] Add "Do Not Sell My Info" link
  - [ ] Implement data disclosure requests

---

## 📊 ANALYTICS & MONITORING

### Google Analytics 4 (Optional but Recommended)

- [ ] Create GA4 property at https://analytics.google.com
- [ ] Get Measurement ID (format: `G-XXXXXXXXXX`)
- [ ] Add to `.env.local` and Vercel:
  ```env
  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
  ```
- [ ] Implement GA4 tracking code in app
- [ ] Test page view tracking works
- [ ] Set up conversion goals:
  - [ ] User signup
  - [ ] Subscription purchase
  - [ ] Plan selection
- [ ] Set up e-commerce tracking for revenue

### Error Monitoring (Optional)

- [ ] Consider adding Sentry (https://sentry.io)
- [ ] Set up error alerts to email/Slack
- [ ] Test error reporting works

### Uptime Monitoring

- [ ] Use Vercel Analytics (included with Vercel)
- [ ] Or set up UptimeRobot (https://uptimerobot.com) - Free
- [ ] Or use Pingdom
- [ ] Configure alerts for downtime

---

## 🎨 FINAL UI/UX REVIEW

### Navigation & Links

- [ ] Test all navigation links work correctly
- [ ] Test footer links work
- [ ] Test "Back" buttons work as expected
- [ ] Verify breadcrumbs (if any) are accurate

### Visual Quality

- [ ] Verify all recipe images load correctly (851 images)
- [ ] Check for broken image links
- [ ] Verify logo displays correctly
- [ ] Check brand consistency (colors, fonts)
- [ ] Test dark mode (if implemented)

### Content Review

- [ ] Proofread all copy for typos
- [ ] Verify all recipes have accurate nutrition info
- [ ] Check diet plan descriptions are accurate
- [ ] Verify pricing information is correct

### Accessibility

- [ ] Test keyboard navigation (Tab, Enter, Esc)
- [ ] Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- [ ] Verify color contrast ratios meet WCAG AA standards
- [ ] Add alt text to all images
- [ ] Ensure form labels are properly associated
- [ ] Test focus states are visible

### Meta & SEO

- [ ] Add/verify favicon (`/public/favicon.ico`)
- [ ] Add OpenGraph meta tags for social sharing:
  - [ ] `og:title`
  - [ ] `og:description`
  - [ ] `og:image`
  - [ ] `og:url`
- [ ] Add Twitter Card meta tags
- [ ] Verify page titles are descriptive
- [ ] Add meta descriptions to all pages
- [ ] Test social share preview (Facebook, Twitter, LinkedIn)

### Error Handling

- [ ] Test 404 page displays correctly
- [ ] Test error boundaries catch errors gracefully
- [ ] Verify loading states show for async operations
- [ ] Test form validation messages are clear

---

## 💰 BUSINESS SETUP

### Stripe Product Configuration

Create products and prices in Stripe Dashboard (https://dashboard.stripe.com/products):

- [ ] **Mediterranean Diet Plan**
  - [ ] Monthly price
  - [ ] Annual price (if offering)
- [ ] **Keto Diet Plan**
  - [ ] Monthly price
  - [ ] Annual price
- [ ] **Vegan Diet Plan**
  - [ ] Monthly price
  - [ ] Annual price
- [ ] **Paleo Diet Plan**
  - [ ] Monthly price
  - [ ] Annual price
- [ ] **Vegetarian Diet Plan**
  - [ ] Monthly price
  - [ ] Annual price
- [ ] **Intermittent Fasting Plan**
  - [ ] Monthly price
  - [ ] Annual price
- [ ] **Family Focused Plan**
  - [ ] Monthly price
  - [ ] Annual price
- [ ] **Global Cuisine Plan**
  - [ ] Monthly price
  - [ ] Annual price

### Pricing Strategy

- [ ] Determine subscription pricing ($9.99/mo, $14.99/mo, etc.)
- [ ] Decide if offering annual discount (e.g., 2 months free)
- [ ] Consider offering free trial period (7 days, 14 days)
- [ ] Update pricing page with final prices

### Stripe Settings

- [ ] Configure Stripe billing portal (https://dashboard.stripe.com/settings/billing/portal)
  - [ ] Allow customers to cancel subscriptions
  - [ ] Allow customers to update payment methods
  - [ ] Allow customers to view invoices
- [ ] Set up tax collection (if required by jurisdiction)
- [ ] Configure invoice settings (branding, footer text)
- [ ] Set up receipt emails

---

## 📢 MARKETING PREP

### Social Media

- [ ] Create Facebook page
- [ ] Create Instagram account
- [ ] Create Twitter/X account
- [ ] Create Pinterest account (great for recipes)
- [ ] Create LinkedIn company page
- [ ] Set up social media management tool (Buffer, Hootsuite)

### Launch Materials

- [ ] Write launch announcement
- [ ] Create launch email for existing contacts
- [ ] Prepare social media posts (5-10 posts)
- [ ] Create promotional graphics
- [ ] Record demo video (optional)

### Email Marketing

- [ ] Set up email marketing tool (Mailchimp, ConvertKit)
- [ ] Create welcome email sequence (3-5 emails)
- [ ] Create subscriber list segments
- [ ] Design email templates

### Launch Promotion

- [ ] Plan launch discount (e.g., 20% off first month)
- [ ] Set end date for launch promotion
- [ ] Create promo code in Stripe
- [ ] Update website with promotion banner

---

## ✅ FINAL CHECKLIST BEFORE GO-LIVE

### Pre-Launch Tasks

- [ ] **Backup database** from Supabase (export all tables)
- [ ] **Test on staging** environment first (`staging` branch)
- [ ] **Run security audit**:
  - [ ] Check for exposed secrets
  - [ ] Verify HTTPS is enforced
  - [ ] Test CORS settings
  - [ ] Verify API rate limiting
- [ ] **Load testing** (simulate 50-100 concurrent users)
  - [ ] Use Artillery, k6, or Apache JMeter
  - [ ] Test peak load scenarios
- [ ] **Change all test keys to production keys**:
  - [ ] Stripe live keys
  - [ ] Production webhook secrets
  - [ ] New admin credentials
- [ ] **Verify all webhook endpoints** are live and responding
- [ ] **Test real payment** with actual credit card (small amount)
- [ ] **Refund test payment** immediately

### Launch Day

- [ ] Deploy `production` branch to Vercel
- [ ] Verify DNS has propagated
- [ ] Verify SSL certificates are active
- [ ] Test complete user flow on live site
- [ ] Monitor error logs for first 2-4 hours
- [ ] Monitor Stripe dashboard for payments
- [ ] Be available for support questions

### Post-Launch (First 24 Hours)

- [ ] Monitor server logs for errors
- [ ] Monitor Stripe for successful payments
- [ ] Check email delivery success rate
- [ ] Monitor website uptime
- [ ] Respond to any customer support inquiries
- [ ] Track analytics for user signups and conversions

### Rollback Plan

If critical issues occur:
- [ ] Have Vercel rollback command ready
- [ ] Have database backup ready to restore
- [ ] Have emergency contact plan for team
- [ ] Consider maintenance mode page

---

## 🔥 IMMEDIATE PRIORITIES

**These MUST be done before accepting real payments:**

1. **✅ Switch Stripe to Live Mode**
   - Location: `.env.local` lines 4-5 and 8-9
   - Regenerate live secret key
   - Update webhook secret
   - **Cannot accept real payments without this**

2. **✅ Deploy to Vercel**
   - Deploy commerce app
   - Deploy admin portal
   - Configure environment variables
   - **Apps must be online**

3. **✅ Configure DNS**
   - Add A and CNAME records
   - Point `mindfulmealplan.com` to Vercel
   - Point `admin.mindfulmealplan.com` to Vercel
   - **Users need to access the site**

4. **✅ Test End-to-End Payment**
   - Complete full checkout with real card
   - Verify webhook fires
   - Verify user gets access
   - Refund test payment
   - **Ensure money flows correctly**

5. **✅ Set Up Email Domain**
   - Verify `mochasmindlab.com` in Resend
   - Add DNS records for email
   - Test emails send successfully
   - **Professional customer communications**

---

## 📅 ESTIMATED TIMELINE

**Day 1 (4-6 hours)**
- Stripe live mode setup
- Deploy to Vercel
- Configure DNS
- Set up environment variables

**Day 2 (4-6 hours)**
- Email domain verification
- Complete testing checklist
- Review legal pages
- UI/UX final review

**Day 3 (2-4 hours)**
- Load testing
- Security audit
- Final deployment to production
- Live payment test

**Day 4 (2-3 hours)**
- Monitor launch
- Fix any critical bugs
- Respond to support

**Total Estimated Time: 2-4 days** (assuming no major issues)

---

## 📞 SUPPORT & CONTACTS

**Stripe Support:** https://support.stripe.com
**Vercel Support:** https://vercel.com/support
**Supabase Support:** https://supabase.com/support
**Resend Support:** https://resend.com/support

---

## 📝 NOTES

- This checklist should be reviewed and updated regularly
- Cross off items as completed
- Add notes for any issues encountered
- Keep track of launch date and milestones

**Created:** October 20, 2025
**Last Updated:** October 20, 2025
**Target Launch Date:** _____________
