# Mindful Meal Plan - Workflows and Tools Documentation

## 🎯 Overview
This document outlines all workflows, tools, and integrations used in the Mindful Meal Plan platform with password-based authentication and Stripe integration.

## 📋 Table of Contents
- [Customer Workflows](#customer-workflows)
- [Authentication System](#authentication-system)
- [Stripe Integration](#stripe-integration)
- [Technical Stack](#technical-stack)
- [API Integrations](#api-integrations)
- [Development Tools](#development-tools)
- [Monitoring & Analytics](#monitoring--analytics)
- [Email System](#email-system)
- [Payment Processing](#payment-processing)
- [Database Schema](#database-schema)

---

## 🛒 Customer Workflows

### 1. Complete Purchase & Account Creation Flow
```
Customer visits site → Selects meal plan → Stripe checkout → Payment completes →
Webhook fires → User account created → PDF generated → Emails sent →
Customer gets login credentials → Permanent access to meal plans
```

**Detailed Steps:**
1. **Site Visit:** Customer browses /pricing page
2. **Plan Selection:** Clicks "Get Mediterranean Plan" ($39)
3. **Checkout:** POST /api/create-checkout-session creates Stripe session
4. **Payment:** Customer completes payment on Stripe's secure page
5. **Webhook:** Stripe sends checkout.session.completed event
6. **Account Creation:** System creates Supabase user + links Stripe customer
7. **PDF Generation:** Selects 30 recipes (75% library + 25% AI-generated)
8. **Email Delivery:** Welcome email + PDF download link sent
9. **Access:** Customer can login anytime with email/password
10. **Dashboard:** Shows purchase history and downloadable meal plans

**Tools Used:**
- Next.js 15 App Router (Frontend)
- Stripe Checkout (Payment processing)
- Stripe Webhooks (Event handling)
- Supabase PostgreSQL (User accounts & purchase history)
- Resend API (Email delivery)
- bcrypt (Password hashing)
- JWT (Session management)
- Hybrid Recipe Selector (AI + library recipes)
- PDF Generator (Meal plan creation)

### 2. Authentication Flow
```
Customer enters email → Magic link sent → Clicks link → JWT token created → Logged in
```

**Tools Used:**
- Magic link authentication (passwordless)
- JWT tokens for sessions
- Resend API for email delivery
- Next.js middleware for auth protection

### 3. Autonomous Recipe & Image Generation Workflow
```
Customer purchases → Stripe webhook fires → 30 recipes selected (70% library + 30% new) →
New recipes generated via AI → Auto image generation triggered → Customer tracked →
PDF created → Emails sent → Customer portal updated
```

**Workflow Details:**
1. **Purchase Event:** Stripe webhook `checkout.session.completed` fires
2. **Recipe Selection:** `selectRecipesForCustomer()` selects 30 recipes:
   - 70% from existing library (21 recipes)
   - 30% newly generated via AI (9 recipes)
3. **Automatic Image Generation:** Each new recipe triggers `generateRecipeImage()`
   - Non-blocking async execution
   - Cost: $0.003 per image (~$0.027 per customer)
4. **Customer Tracking:** Records saved to `customer_recipes` table
5. **PDF Generation:** All 30 recipes compiled into downloadable PDF
6. **Email Delivery:** Welcome email + meal plan download link sent
7. **Portal Access:** Customer can access all purchased recipes forever

**Tools Used:**
- Anthropic Claude API (Recipe generation - Haiku model)
- Replicate API (Image generation - FLUX-schnell model $0.003/image)
- Supabase PostgreSQL (Recipe storage & customer tracking)
- Hybrid Recipe Selector (70/30 split algorithm)
- Automatic Image Trigger (lib/ai-recipe-generator.ts:398-413)

**Test Coverage:** 12/12 tests passing (100% success rate)
- Recipe split validation (70/30)
- Database growth calculations
- Image generation cost validation
- Customer access tracking
- Data integrity checks
- Error handling scenarios

**Key Files:**
- `/lib/ai-recipe-generator.ts:398-413` - Auto image generation trigger
- `/app/api/stripe-webhook/route.ts:151-157` - 70/30 recipe split config
- `/lib/hybrid-recipe-selector.ts` - Recipe selection algorithm
- `/__tests__/autonomous-workflow.test.ts` - Complete test suite

---

## 🔧 Technical Stack

### Frontend
- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Components:** Custom React components
- **Icons:** Heroicons
- **PWA:** Service worker enabled

### Backend
- **Runtime:** Node.js
- **API:** Next.js API routes
- **Database:** Supabase PostgreSQL
- **File Storage:** Vercel Blob (planned)
- **Authentication:** JWT + Magic links

### Deployment
- **Platform:** Vercel
- **Environment:** Production + Development
- **CDN:** Vercel Edge Network
- **Domain:** mochasmindlab.com

---

## 🔌 API Integrations

### Payment Processing
- **Stripe Checkout:** Payment collection
- **Stripe Webhooks:** Event handling
- **Test Mode:** Currently using test keys
- **Products:** Multiple meal plan tiers

### Email Service
- **Provider:** Resend
- **API Key:** `re_dY5Q9cVD_6S3ojGcuKtAi1UrUEgVVQZcQ`
- **Sender:** `recipes@mochasmindlab.com`
- **Templates:** HTML email templates with beautiful styling
- **DNS Setup:** SPF, DKIM, DMARC configured

### AI Services
- **Primary:** Anthropic Claude API
  - Model: `claude-3-5-haiku-20241022`
  - Purpose: Recipe generation
- **Backup:** Google AI API
  - Model: Gemini
  - Purpose: Recipe generation fallback
- **Images:** Replicate API
  - Model: FLUX-schnell ($0.003/image)
  - Purpose: Recipe image generation

### Database
- **Supabase PostgreSQL**
- **Tables:** recipes, customers, purchases, meal_plans
- **Records:** 3,586+ recipes across multiple diet types
- **Connection:** Direct PostgreSQL connection string

---

## 🛠 Development Tools

### Local Development
```bash
npm run dev          # Start development server (port 3001)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # ESLint checking
npm run test         # Run tests
```

### Testing Scripts
```bash
node scripts/test-welcome-email.js     # Test welcome email
node scripts/test-meal-plan-email.js   # Test meal plan delivery
node scripts/generate-recipes.js       # Generate AI recipes
node scripts/populate-library-with-ai.js # Bulk recipe generation
```

### Environment Configuration
- **Development:** `.env.local`
- **Production:** Vercel environment variables
- **Database:** `.env` for local database URL

---

## 📊 Monitoring & Analytics

### Analytics
- **Google Analytics 4:** `G-XXXXXXXXXX`
- **Google Ads:** `AW-XXXXXXXXXX`
- **Conversion tracking:** Purchase events, leads
- **Ecommerce tracking:** Cart actions, purchases

### SEO
- **Meta tags:** Complete OpenGraph, Twitter Cards
- **Structured data:** JSON-LD for recipes, organization
- **Sitemap:** Dynamic generation at `/sitemap.xml`
- **Robots.txt:** Search engine directives

### Verification
- **Google Search Console:** Domain verification
- **Yandex Webmaster:** Optional verification
- **Facebook Domain:** Optional verification

---

## 📧 Email System

### Email Types
1. **Welcome Email**
   - Sent after successful purchase
   - Beautiful HTML template with branding
   - Includes customer name and subscription info

2. **Meal Plan Delivery**
   - Contains download link for PDF
   - Plan-specific messaging
   - Call-to-action for future purchases

### Email Configuration
```javascript
// Current setup
EMAIL_FROM=recipes@mochasmindlab.com
RESEND_API_KEY=re_dY5Q9cVD_6S3ojGcuKtAi1UrUEgVVQZcQ

// DNS Records
MX: mail.mochasmindlab.com
TXT: v=spf1 include:_spf.resend.com ~all
DKIM: Configured via Resend dashboard
DMARC: v=DMARC1; p=quarantine;
```

### Email Templates
- Responsive HTML design
- Brand colors and styling
- Emoji usage for engagement
- Mobile-optimized layout

---

## 💳 Payment Processing

### Stripe Configuration
- **Test Keys:** Currently active
- **Live Keys:** Ready for production
- **Webhook Endpoint:** `/api/stripe-webhook`
- **Events Handled:** `checkout.session.completed`

### Products & Pricing
- Mediterranean Challenge: $39
- Keto Kickstart: $39
- Plant-Based Power: $39
- Intermittent Fasting: $39
- Quick & Easy Meals: $29
- Family-Friendly: $34

### Payment Flow
1. Customer selects plan
2. Redirected to Stripe Checkout
3. Payment processed
4. Webhook triggers order fulfillment
5. Email sent with PDF download

---

## 🗄 Database Schema

### Tables
```sql
-- Recipes table
recipes (
  id: integer PRIMARY KEY
  title: text
  description: text
  ingredients: jsonb
  instructions: jsonb
  nutrition: jsonb
  diet_type: text
  prep_time: integer
  cook_time: integer
  servings: integer
  difficulty: text
  image_url: text
  created_at: timestamp
)

-- Customers table
customers (
  id: text PRIMARY KEY
  email: text UNIQUE
  name: text
  created_at: timestamp
  updated_at: timestamp
)

-- Purchases table
purchases (
  id: text PRIMARY KEY
  customer_id: text REFERENCES customers(id)
  stripe_session_id: text
  amount: integer
  plan_type: text
  status: text
  created_at: timestamp
)

-- Meal plans table
meal_plans (
  id: text PRIMARY KEY
  customer_id: text REFERENCES customers(id)
  plan_type: text
  recipes: jsonb
  pdf_url: text
  created_at: timestamp
)
```

### Data Management
- **Recipe Library:** 3,586 pre-generated recipes
- **Customer Data:** Email, purchase history, preferences
- **Purchase Tracking:** Complete transaction records
- **PDF Storage:** Links to generated meal plans

---

## 🔐 Security & Compliance

### Authentication
- Magic link authentication (passwordless)
- JWT tokens with expiration
- Secure session management
- No password storage required

### Data Protection
- Environment variables for sensitive data
- API key rotation capability
- Database connection encryption
- HTTPS everywhere

### Email Security
- SPF/DKIM/DMARC authentication
- Sender reputation management
- Anti-spam compliance
- Double opt-in capability

---

## 🚀 Deployment Workflow

### Development
1. Local development on `localhost:3001`
2. Environment variables in `.env.local`
3. Test mode for all integrations
4. Hot reload for rapid iteration

### Staging
1. Deploy to Vercel preview environment
2. Test with production-like data
3. Verify all integrations
4. Performance testing

### Production
1. Deploy to Vercel production
2. Switch to live API keys
3. Monitor error rates
4. Customer support ready

---

## 📞 Support & Maintenance

### Error Monitoring
- Console logging for debugging
- Stripe webhook event logging
- Email delivery tracking
- Database query monitoring

### Backup Procedures
- Supabase automated backups
- Environment variable backup
- Code repository in Git
- Regular data exports

### Updates & Maintenance
- Regular dependency updates
- Security patch management
- Performance optimization
- Feature enhancement pipeline

---

## 📈 Performance Metrics

### Key Performance Indicators
- **Conversion Rate:** Checkout completion %
- **Email Delivery:** Success rate and timing
- **Page Load Speed:** Core Web Vitals
- **Recipe Generation:** AI API response times
- **Customer Satisfaction:** Support ticket volume

### Optimization Targets
- Page load < 2 seconds
- Email delivery < 30 seconds
- PDF generation < 10 seconds
- 99.9% uptime target
- < 1% error rate

---

*Last Updated: October 2025*
*Version: 1.0*