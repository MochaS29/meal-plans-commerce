# Setup Guide for Meal Plans Commerce

This guide will help you set up the required external services (Resend, Supabase, and Vercel Blob) for the meal plans e-commerce platform.

## Quick Start

### 1. Resend (Email Service)

1. **Sign up at [Resend.com](https://resend.com)**
   - Free tier: 3,000 emails/month
   - No credit card required

2. **Get your API key**
   - Go to [API Keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Copy the key (starts with `re_`)

3. **Add to `.env.local`**
   ```env
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=noreply@yourdomain.com
   ```

4. **Verify your domain (optional but recommended)**
   - Go to [Domains](https://resend.com/domains)
   - Add your domain
   - Add the DNS records to your domain provider

### 2. Supabase (Database)

1. **Create account at [Supabase.com](https://supabase.com)**
   - Free tier: 500MB database, unlimited users
   - No credit card required

2. **Create a new project**
   - Click "New Project"
   - Choose a name and password
   - Select the region closest to you

3. **Get your credentials**
   - Go to Settings → API
   - Copy the **Project URL** and **anon public** key

4. **Add to `.env.local`**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
   ```

5. **Set up the database**
   - Go to SQL Editor in Supabase dashboard
   - Copy the contents of `supabase-schema.sql`
   - Paste and run the SQL
   - This creates all necessary tables and security policies

### 3. Vercel Blob (File Storage)

1. **Deploy to Vercel first** (if not already deployed)
   ```bash
   vercel
   ```

2. **Enable Blob Storage**
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to the "Storage" tab
   - Click "Create Database"
   - Choose "Blob"
   - Follow the setup wizard

3. **Get your token**
   - After creation, click on your Blob store
   - Go to ".env.local" tab
   - Copy the `BLOB_READ_WRITE_TOKEN`

4. **Add to `.env.local`**
   ```env
   BLOB_READ_WRITE_TOKEN=vercel_blob_your_token_here
   ```

### 4. Stripe Webhook

1. **Set up webhook endpoint**
   - Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
   - Click "Add endpoint"
   - Enter endpoint URL: `https://yourdomain.com/api/stripe-webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.deleted`

2. **Get webhook secret**
   - After creating the endpoint, click on it
   - Copy the "Signing secret" (starts with `whsec_`)

3. **Add to `.env.local`**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

## Testing Locally

### Test Stripe Webhooks Locally

1. **Install Stripe CLI**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows (using scoop)
   scoop install stripe

   # Linux
   # Download from https://github.com/stripe/stripe-cli/releases
   ```

2. **Login to Stripe**
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server**
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```

4. **Copy the webhook signing secret** displayed in the terminal and add to `.env.local`

### Test Email Sending

The email service will work in development mode even without credentials - it will log emails to the console instead of sending them.

## Complete `.env.local` Example

```env
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Your domain
NEXT_PUBLIC_DOMAIN=https://meal-plans-commerce.vercel.app

# Resend Email Service
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@meal-plans.com

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

## Verification Checklist

- [ ] Resend API key added to `.env.local`
- [ ] Supabase project created and credentials added
- [ ] Supabase database schema executed
- [ ] Vercel Blob storage enabled
- [ ] Stripe webhook endpoint created
- [ ] All environment variables added to Vercel dashboard

## Deployment

After setting up all services:

1. **Add environment variables to Vercel**
   ```bash
   vercel env add RESEND_API_KEY
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add BLOB_READ_WRITE_TOKEN
   vercel env add STRIPE_WEBHOOK_SECRET
   vercel env add EMAIL_FROM
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

## Troubleshooting

### Emails not sending
- Check Resend dashboard for API logs
- Verify domain is configured (if using custom domain)
- Check console logs in development

### Database errors
- Ensure Supabase schema was executed
- Check Supabase dashboard logs
- Verify RLS policies if getting permission errors

### PDF storage issues
- Ensure Vercel Blob is enabled for your project
- Check storage usage in Vercel dashboard
- Verify token has read/write permissions

### Webhook not working
- Use Stripe CLI to test locally
- Check webhook signing secret matches
- Verify endpoint URL is correct in Stripe dashboard

## Support

For issues or questions:
- Resend: [docs.resend.com](https://docs.resend.com)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Vercel Blob: [vercel.com/docs/storage/vercel-blob](https://vercel.com/docs/storage/vercel-blob)
- Stripe: [stripe.com/docs](https://stripe.com/docs)