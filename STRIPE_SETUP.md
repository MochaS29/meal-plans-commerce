# Stripe Payment Setup

## ⚠️ IMPORTANT: You're Using LIVE Keys

You've configured **LIVE** Stripe keys, which means:
- Real payments will be processed
- Real cards will be charged
- You'll receive actual money

## Required: Add Your Secret Key

You still need to add your **LIVE SECRET KEY** to `.env.local`:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Live Secret Key** (starts with `sk_live_`)
3. Update `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_live_YOUR_ACTUAL_SECRET_KEY_HERE
   ```

## For Production Deployment (Vercel)

Add these environment variables in Vercel:
1. Go to your project settings in Vercel
2. Navigate to Environment Variables
3. Add:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Your pk_live key
   - `STRIPE_SECRET_KEY` = Your sk_live key
   - `NEXT_PUBLIC_DOMAIN` = Your actual domain (e.g., https://yourdomain.com)

## Testing Your Integration

Since you're using LIVE keys, be careful with testing:
- Use small amounts (like $1) for test purchases
- Consider creating test products with low prices
- Remember you'll be charged Stripe fees on live transactions

## Switching to Test Mode (Recommended for Development)

For development, consider using TEST keys instead:
1. Get test keys from Stripe Dashboard
2. Replace in `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. Use test card numbers like `4242 4242 4242 4242`

## Security Notes

- **NEVER** commit your secret key to Git
- `.env.local` is already in `.gitignore`
- Only share your publishable key (pk_) publicly
- Keep your secret key (sk_) absolutely private

## Next Steps

1. Add your secret key to `.env.local`
2. Restart your development server
3. Test the checkout flow carefully
4. Deploy to Vercel with production environment variables