# 🚀 Production Launch Checklist

## Critical Tasks (Must Complete Before Launch)

### 1. ⚠️ Enable Supabase RLS Security
**Status:** Ready to implement
- [ ] Run the SQL script in `supabase-rls-setup.sql` in Supabase SQL Editor
- [ ] Verify all tables show "RLS enabled"
- [ ] Test that policies are working correctly
**Why:** Without RLS, anyone can access all your database data

### 2. 📧 Complete Email Domain Verification
**Status:** Waiting for DNS propagation
- [ ] Complete domain verification with Resend for `recipes@mochasmindlab.com`
- [ ] Update `EMAIL_FROM` in `.env.local` from `onboarding@resend.dev` to `recipes@mochasmindlab.com`
- [ ] Test email delivery with custom domain
**Why:** Currently using Resend sandbox which has limitations

### 3. 💳 Switch to Stripe Live Mode
**Status:** Ready when you are
- [ ] Get your Stripe live keys from https://dashboard.stripe.com/apikeys
- [ ] Update in `.env.local`:
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = your live publishable key
  - `STRIPE_SECRET_KEY` = your live secret key (KEEP SECURE!)
- [ ] Create production webhook endpoint in Stripe Dashboard
- [ ] Update `STRIPE_WEBHOOK_SECRET` with production webhook secret
**Why:** Currently using test keys - no real payments possible

### 4. 🔐 Secure Environment Variables in Vercel
**Status:** Ready to configure
- [ ] Go to Vercel project settings
- [ ] Add all production environment variables
- [ ] Remove any test/development values
- [ ] Ensure sensitive keys are marked as secret
**Why:** Production secrets must be secure and not in code

### 5. 🌐 Configure Production Domain
**Status:** Needs setup
- [ ] Purchase domain if not already owned (e.g., mindfulmealplan.com)
- [ ] Add custom domain in Vercel settings
- [ ] Update DNS records as instructed by Vercel
- [ ] Update `NEXT_PUBLIC_DOMAIN` in environment variables
**Why:** Currently using Vercel subdomain

## Important Tasks (Highly Recommended)

### 6. 🛡️ Set Up Rate Limiting
**Status:** Not implemented
- [ ] Implement rate limiting on API endpoints
- [ ] Add rate limiting for:
  - Recipe generation endpoint
  - Stripe webhook endpoint
  - Health check endpoints
- [ ] Consider using Vercel Edge Config or Upstash Redis
**Why:** Prevents abuse and excessive API costs

### 7. 💾 Configure Backups
**Status:** Not configured
- [ ] Enable Supabase automatic backups (Pro plan)
- [ ] Set up database backup schedule
- [ ] Document recovery procedures
- [ ] Test restore process
**Why:** Critical for disaster recovery

### 8. 📊 Set Up Analytics
**Status:** Partially configured
- [ ] Get Google Analytics GA4 ID
- [ ] Update `NEXT_PUBLIC_GA_ID` in environment variables
- [ ] Set up conversion tracking for purchases
- [ ] Configure Google Search Console
- [ ] Add site verification codes
**Why:** Track performance and user behavior

### 9. 🔍 SEO & Meta Tags
**Status:** Basic implementation
- [ ] Add proper meta descriptions to all pages
- [ ] Create and submit sitemap.xml
- [ ] Add robots.txt file
- [ ] Implement Open Graph tags for social sharing
- [ ] Add structured data for recipes
**Why:** Improve search visibility and social sharing

### 10. 📱 Mobile Testing
**Status:** Needs verification
- [ ] Test all pages on mobile devices
- [ ] Verify payment flow works on mobile
- [ ] Check PDF generation on mobile
- [ ] Test email rendering on mobile clients
**Why:** Many users will access via mobile

## Additional Tasks (Nice to Have)

### 11. 🎯 Purchase History & User Dashboard
**Status:** Not implemented
- [ ] Create user dashboard page
- [ ] Show purchase history
- [ ] Allow re-downloading of purchased PDFs
- [ ] Add user profile management
**Why:** Better user experience for returning customers

### 12. 💬 Customer Support System
**Status:** Not implemented
- [ ] Set up support email address
- [ ] Create FAQ page
- [ ] Add contact form
- [ ] Consider adding Intercom or similar chat widget
**Why:** Handle customer inquiries efficiently

### 13. 📈 Performance Optimization
**Status:** Not optimized
- [ ] Optimize images (use next/image optimization)
- [ ] Implement caching strategies
- [ ] Optimize database queries
- [ ] Add loading states for better UX
- [ ] Consider CDN for static assets
**Why:** Faster site = better conversions

### 14. 📝 Legal Pages
**Status:** Not created
- [ ] Create Terms of Service page
- [ ] Create Privacy Policy page
- [ ] Create Refund Policy page
- [ ] Add cookie consent banner (if needed)
- [ ] Ensure GDPR compliance
**Why:** Legal requirement in many jurisdictions

### 15. 🧪 Comprehensive Testing
**Status:** Basic testing done
- [ ] Create automated test suite
- [ ] Test all user flows end-to-end
- [ ] Load testing for expected traffic
- [ ] Security testing (OWASP Top 10)
- [ ] Cross-browser testing
**Why:** Catch issues before customers do

## Pre-Launch Final Checks

### Last 24 Hours Before Launch
- [ ] Take full backup of everything
- [ ] Test complete purchase flow with real credit card
- [ ] Verify emails are being sent and received
- [ ] Check all monitoring systems are active
- [ ] Ensure error tracking is working
- [ ] Have rollback plan ready
- [ ] Prepare launch announcement

### Monitoring Post-Launch
- [ ] Monitor error rates closely for first 48 hours
- [ ] Check email delivery rates
- [ ] Watch for any security alerts
- [ ] Monitor page load times
- [ ] Track conversion rates
- [ ] Be ready to respond to customer issues

## Environment Variables Summary

### Required for Production
```env
# Stripe (LIVE keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://rnvowqoqqcrimrybuiea.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Email (update after domain verification)
RESEND_API_KEY=re_...
EMAIL_FROM=recipes@mochasmindlab.com

# Domain
NEXT_PUBLIC_DOMAIN=https://yourdomain.com

# AI Services (at least one)
ANTHROPIC_API_KEY=sk-ant-...
REPLICATE_API_TOKEN=r8_...

# Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_...

# Security
ADMIN_API_KEY=your-secure-key
JWT_SECRET=your-secure-jwt-secret
```

## Priority Order

1. **Day 1:** Enable RLS, Complete email verification
2. **Day 2:** Switch to Stripe live keys, Set up production domain
3. **Day 3:** Configure Vercel environment, Test everything
4. **Day 4:** Add legal pages, Set up analytics
5. **Launch Day:** Final testing, Go live, Monitor closely

## Questions to Answer Before Launch

1. **Pricing:** Are your prices final? Any launch promotions?
2. **Support:** Who handles customer emails? Response time?
3. **Scale:** Expected traffic? Can your AI API handle it?
4. **Legal:** Do you need specific compliance (GDPR, CCPA)?
5. **Marketing:** Launch strategy? Email list? Social media?

## Estimated Timeline

- **Minimum to go live:** 2-3 days (critical tasks only)
- **Recommended:** 1 week (critical + important tasks)
- **Ideal:** 2 weeks (all tasks except nice-to-haves)

---

Remember: It's better to launch with critical items done and iterate than to delay indefinitely for perfection!