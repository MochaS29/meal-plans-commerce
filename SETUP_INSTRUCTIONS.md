# 🚀 Setup Instructions for Mocha's MindLab Meal Plans

## Prerequisites
- Node.js 18+ and npm
- PostgreSQL or Supabase account
- Stripe account
- Vercel account (for deployment)
- OpenAI API key (for AI features)

## 🔧 What You Need From Stripe

### 1. Create a Stripe Account
1. Go to https://stripe.com and sign up
2. Complete your business profile
3. Note your country/region for tax settings

### 2. Get Your API Keys
1. Go to **Developers → API keys** in Stripe Dashboard
2. Copy your **Publishable key** (starts with `pk_`)
3. Copy your **Secret key** (starts with `sk_`)

### 3. Create Products and Prices
In Stripe Dashboard, go to **Products** and create:

#### Product 1: 30-Day Mediterranean Challenge
- **Name**: 30-Day Mediterranean Challenge
- **Description**: Complete transformation package with printable calendar...
- **Price**: $79.00 (one-time)
- **Copy the Price ID** (starts with `price_`)

#### Product 2: Custom Family Meal Plan
- **Name**: Custom Family Meal Plan
- **Description**: Personalized meal planning for your family...
- **Price**: $149.00 (one-time)
- **Copy the Price ID**

#### Product 3: Monthly Meal Calendar Access
- **Name**: Monthly Meal Calendar Access
- **Description**: Subscribe for fresh meal plans every month...
- **Price**: $29.00 (recurring monthly)
- **Copy the Price ID**

### 4. Set Up Webhook
1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (starts with `whsec_`)

## 🌐 What You Need From Vercel

### 1. Deploy the Site
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to link to your Vercel account
```

### 2. Add Environment Variables
In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PRICE_MEDITERRANEAN=price_...
NEXT_PUBLIC_STRIPE_PRICE_CUSTOM_FAMILY=price_...
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY=price_...
RESEND_API_KEY=re_...
OPENAI_API_KEY=sk-...
```

### 3. Add Custom Domain (Optional)
1. Go to **Settings → Domains**
2. Add your domain (e.g., `meals.mochasmindlab.com`)
3. Follow DNS configuration instructions

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to https://supabase.com and create account
2. Create new project
3. Copy connection string from Settings → Database

### 2. Run Database Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase
supabase init

# Link to your project
supabase link --project-ref your-project-id

# Run migrations
supabase db push
```

## 📧 Email Setup (Resend)

### 1. Create Resend Account
1. Go to https://resend.com and sign up
2. Verify your domain
3. Get API key from dashboard

### 2. Configure Email Templates
Email templates are automatically configured in the codebase.

## 🤖 AI Setup (Optional for Now)

### 1. OpenAI API
1. Go to https://platform.openai.com
2. Create API key
3. Add to environment variables

### 2. Set Up Scheduled Jobs (Later)
We'll use GitHub Actions or Vercel Cron Jobs to run monthly calendar generation.

## 🚀 Quick Start

### Local Development
```bash
# Clone repository
git clone https://github.com/yourusername/meal-plans-commerce.git
cd meal-plans-commerce

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your actual keys in .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

### Test Stripe Integration
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 📱 Future Mobile App Setup

The architecture is designed to support a mobile app:

1. **API Endpoint**: The Next.js API routes can serve the mobile app
2. **Authentication**: Supabase Auth works across web and mobile
3. **Real-time Updates**: Supabase provides real-time subscriptions
4. **Offline Support**: The app will cache meal plans locally

## 🔄 AI Agent Automation (Future)

### Monthly Calendar Generation
1. AI agent runs on the 1st of each month
2. Generates calendars for all diet types
3. Stores in database
4. Notifies subscribers
5. No manual intervention required

### Setup for Automation
```yaml
# Will be added to .github/workflows/
name: Generate Monthly Calendars
on:
  schedule:
    - cron: '0 0 1 * *'
```

## 📊 Monitoring

### Stripe Dashboard
- Monitor payments
- View customer data
- Track subscriptions

### Vercel Dashboard
- View deployment status
- Monitor function logs
- Track analytics

### Supabase Dashboard
- Database management
- User authentication
- Real-time subscriptions

## 🆘 Troubleshooting

### Stripe Issues
- Verify webhook endpoint is accessible
- Check webhook signing secret
- Ensure products have price IDs

### Vercel Issues
- Check environment variables are set
- Verify build logs for errors
- Ensure domain DNS is configured

### Database Issues
- Check connection string
- Verify migrations have run
- Check Supabase service key

## 📞 Support Channels

- **Stripe Support**: https://support.stripe.com
- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support
- **Your Support**: support@mochasmindlab.com

## ✅ Checklist

Before going live:
- [ ] Stripe account verified
- [ ] Products and prices created
- [ ] Webhook configured
- [ ] Environment variables set in Vercel
- [ ] Database migrations run
- [ ] Email domain verified
- [ ] Test purchase completed
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Privacy policy and terms added

## 🎉 Launch!

Once everything is configured:
1. Switch Stripe to live mode
2. Update environment variables with live keys
3. Redeploy to Vercel
4. Announce your launch!

---

**Next Steps**: After launch, we'll add:
- Mobile app development
- AI calendar generation
- Advanced analytics
- Customer portal enhancements