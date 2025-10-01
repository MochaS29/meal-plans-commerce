# 🚀 Vercel Deployment Guide for MindfulMealPlan.com

## 📋 Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub repository with your code
- All API keys and credentials ready

## 🔧 Step 1: Connect to Your Existing Vercel Project

Since you already have "meal-plans-commerce" project on Vercel:

### Option A: Link via CLI
```bash
npm i -g vercel
vercel link
# Choose "Link to existing project"
# Select "meal-plans-commerce"
```

### Option B: Push to GitHub
If your Vercel project is already connected to GitHub:
```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```
This will automatically trigger a deployment.

## 🔑 Step 2: Add Environment Variables

### Navigate to Environment Variables Settings
1. In Vercel Dashboard, select your project
2. Go to "Settings" tab
3. Click "Environment Variables" in the left sidebar

### Add Each Variable One by One

Copy and paste each of these environment variables:

#### 1️⃣ Stripe Configuration
```
Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_live_51S8Qa0HpQk3HgWlVwfNgjEUAVI3EXqD037FobkzCxVJZAgfvcMV0OnLRhAtDtnFOFX3sCbWsrh5eYvcyXGKVRlJQ00mA6fIsU1
Environment: Production, Preview, Development
```

```
Name: STRIPE_SECRET_KEY
Value: [YOUR LIVE STRIPE SECRET KEY - GET FROM STRIPE DASHBOARD]
Environment: Production, Preview, Development
⚠️ IMPORTANT: Use your LIVE secret key, not the test one!
```

```
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_[YOUR WEBHOOK SECRET FROM STRIPE]
Environment: Production, Preview, Development
```

**To get Stripe Webhook Secret:**
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
5. Copy the signing secret that starts with `whsec_`

#### 2️⃣ Supabase Database
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://rnvowqoqqcrimrybuiea.supabase.co
Environment: Production, Preview, Development
```

```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJudm93cW9xcWNyaW1yeWJ1aWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzY0NTcsImV4cCI6MjA3NDc1MjQ1N30.bng24o5M8xuXgnxslOVS1Mv124kF6V0IYL2kLCKgbqw
Environment: Production, Preview, Development
```

```
Name: DATABASE_URL
Value: [YOUR SUPABASE DATABASE URL]
Environment: Production, Preview, Development
```

**To get Database URL:**
1. Go to https://app.supabase.com/project/rnvowqoqqcrimrybuiea/settings/database
2. Copy the "Connection string" under "Connection Pooling"
3. Replace [YOUR-PASSWORD] with your database password

#### 3️⃣ AI Configuration (Claude)
```
Name: ANTHROPIC_API_KEY
Value: [YOUR ANTHROPIC API KEY - GET FROM ANTHROPIC CONSOLE]
Environment: Production, Preview, Development
```

#### 4️⃣ Security Keys
```
Name: ADMIN_API_KEY
Value: [GENERATE A STRONG RANDOM STRING - USE https://randomkeygen.com/]
Environment: Production, Preview, Development
⚠️ IMPORTANT: Don't use the test key from development!
```

```
Name: JWT_SECRET
Value: [GENERATE ANOTHER STRONG RANDOM STRING]
Environment: Production, Preview, Development
⚠️ IMPORTANT: Must be different from ADMIN_API_KEY!
```

#### 5️⃣ Domain Configuration
```
Name: NEXT_PUBLIC_DOMAIN
Value: https://[your-project-name].vercel.app
Environment: Production, Preview, Development
```

After adding custom domain:
```
Name: NEXT_PUBLIC_DOMAIN
Value: https://mindfulmealplan.com
Environment: Production only
```

## 🔄 Step 3: Trigger Redeployment

After adding all environment variables:

1. Go to "Deployments" tab
2. Click on the three dots next to the latest deployment
3. Click "Redeploy"
4. Select "Use existing Build Cache" → "No"
5. Click "Redeploy"

## ✅ Step 4: Verify Deployment

Check these endpoints to ensure everything works:

1. **Homepage**: `https://your-domain.vercel.app`
   - Should load without errors
   - Check console for any API errors

2. **Admin Panel**: `https://your-domain.vercel.app/admin`
   - Should show admin dashboard
   - Test recipe generation

3. **API Health Check**: `https://your-domain.vercel.app/api/generate-recipes`
   - Should return recipe statistics

## 🌐 Step 5: Add Custom Domain - mindfulmealplan.com

1. Go to Settings → Domains
2. Add your domain: `mindfulmealplan.com`
3. Also add: `www.mindfulmealplan.com`
4. Follow DNS configuration instructions:
   - Add A record: @ → 76.76.21.21
   - Add CNAME: www → cname.vercel-dns.com
5. Update `NEXT_PUBLIC_DOMAIN` environment variable to `https://mindfulmealplan.com`

## 🛠️ Step 6: Production Checklist

### Before Going Live:

- [ ] Switch Stripe to LIVE mode
- [ ] Update Stripe webhook URL to production domain
- [ ] Enable Supabase Row Level Security:
  ```sql
  -- Run in Supabase SQL editor
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
  ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
  ```
- [ ] Test checkout with real credit card (you can refund yourself)
- [ ] Set up domain email for support
- [ ] Configure Google Analytics (optional)

## 🚨 Troubleshooting

### Common Issues:

**Build Fails:**
- Check all environment variables are added
- Ensure no typos in variable names
- Check build logs for specific errors

**Stripe Not Working:**
- Verify webhook endpoint is configured in Stripe
- Check webhook secret is correct
- Ensure using LIVE keys, not TEST

**Database Connection Failed:**
- Check DATABASE_URL has correct password
- Verify Supabase project is not paused
- Check connection pooling is enabled

**Recipe Generation Not Working:**
- Verify ANTHROPIC_API_KEY is valid
- Check rate limits on Claude API
- Ensure ADMIN_API_KEY is set

## 📊 Environment Variables Summary

Here's a checklist of all required variables:

| Variable | Added | Production Value Set |
|----------|-------|---------------------|
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | ☐ | ☐ |
| STRIPE_SECRET_KEY | ☐ | ☐ |
| STRIPE_WEBHOOK_SECRET | ☐ | ☐ |
| NEXT_PUBLIC_SUPABASE_URL | ☐ | ☐ |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | ☐ | ☐ |
| DATABASE_URL | ☐ | ☐ |
| ANTHROPIC_API_KEY | ☐ | ☐ |
| ADMIN_API_KEY | ☐ | ☐ |
| JWT_SECRET | ☐ | ☐ |
| NEXT_PUBLIC_DOMAIN | ☐ | ☐ |

## 🎉 Launch Checklist

Once deployed successfully:

1. **Test Critical Flows:**
   - [ ] Browse diet plans
   - [ ] Complete test purchase
   - [ ] Access customer dashboard
   - [ ] Generate recipe in admin
   - [ ] View recipe library

2. **Monitor:**
   - [ ] Check Vercel Functions logs
   - [ ] Monitor Stripe dashboard
   - [ ] Watch Supabase metrics
   - [ ] Track Claude API usage

3. **Announce:**
   - [ ] Update social media
   - [ ] Send launch email
   - [ ] Enable customer support

## 💡 Pro Tips

1. **Use Environment Groups**: Create different sets for staging vs production
2. **Enable Automatic Deployments**: Push to main = auto deploy
3. **Set Up Alerts**: Configure Vercel monitoring alerts
4. **Use Preview Deployments**: Test PRs before merging
5. **Enable Speed Insights**: Free performance monitoring

## 📞 Support Resources

- **Vercel Support**: https://vercel.com/support
- **Vercel Docs**: https://vercel.com/docs
- **Status Page**: https://www.vercel-status.com/
- **Community**: https://github.com/vercel/next.js/discussions

---

**Ready to go live?** Follow this guide step by step and your meal plans platform will be running on Vercel in minutes! 🚀

Last Updated: September 30, 2025