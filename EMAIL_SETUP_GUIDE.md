# 📧 Email Service Setup Guide

Your meal plan system has beautiful email templates ready but needs email service configuration to deliver them to customers.

## 🎯 Current Email Features

### Automated Emails After Purchase:
1. **Welcome Email** - Immediate confirmation of purchase
2. **Meal Plan Email** - Contains PDF download link and instructions

### Email Templates Include:
- Beautiful HTML design with your branding
- Personalized customer name
- Diet plan type confirmation
- PDF download button
- Getting started instructions
- Subscription management (if applicable)

## 🛠️ Email Service Options

### Option 1: Resend (Recommended) ⭐
**Best for**: Production use, great deliverability, developer-friendly

**Setup Steps:**
1. **Create Resend account**: https://resend.com
2. **Verify your domain**: Add DNS records for better deliverability
3. **Get API key**: From Resend dashboard
4. **Add to environment**:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=noreply@yourdomain.com
   ```

**Pricing**: 100 emails/day free, then $20/month for 10k emails

### Option 2: Development Mode (Current)
**Best for**: Testing and development

**What happens**: Emails are logged to console instead of sent
```bash
📧 Email would be sent: {
  to: 'customer@email.com',
  subject: 'Your Meal Plan is Ready!',
  attachmentsCount: 0
}
```

### Option 3: Alternative Email Services
**Other options you could integrate**:
- **SendGrid** - Enterprise-grade
- **Mailgun** - Developer-focused
- **Amazon SES** - AWS integration
- **Postmark** - Transactional specialist

## 🚀 Quick Resend Setup

### 1. Create Resend Account
- Go to https://resend.com
- Sign up with your email
- Verify your account

### 2. Add Domain (Recommended)
- Go to "Domains" in dashboard
- Add your domain (e.g., mindfulmealplan.com)
- Add the DNS records they provide
- Wait for verification (can take a few hours)

### 3. Get API Key
- Go to "API Keys" in dashboard
- Create new API key
- Copy the key (starts with `re_`)

### 4. Update Environment Variables
Add to your `.env.local`:
```bash
# Resend Email Service
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=noreply@yourdomain.com
```

### 5. Test Email System
```bash
# Start your server
npm run dev

# Test with a purchase (or run test script)
node scripts/test-email-system.js
```

## 📬 Email Templates Preview

### Welcome Email:
- **Subject**: "Welcome to Your Meal Planning Journey! 🌟"
- **Content**: Welcome message, account details, next steps
- **Style**: Teal/amber gradient header, clean design

### Meal Plan Email:
- **Subject**: "Your [Diet Type] Meal Plan is Ready! 🎉"
- **Content**: Download button, what's included, getting started
- **PDF Link**: Secure download link (expires in 7 days)

## 🧪 Testing Emails

### Test Email Delivery:
```bash
# Run email test (will be created)
node scripts/test-email-system.js
```

### Check Email Logs:
```bash
# Watch server logs for email activity
npm run dev
# Look for: "📧 Email would be sent:" or "✅ Email sent successfully:"
```

### Verify PDF Links:
- Email contains download URL
- PDF should be accessible
- Link expires after 7 days

## 🔒 Security & Best Practices

### Domain Authentication:
- **SPF Record**: Helps prevent spam
- **DKIM**: Cryptographic authentication
- **DMARC**: Email policy enforcement

### Email Content:
- ✅ Personalized with customer name
- ✅ Clear call-to-action buttons
- ✅ Mobile-responsive design
- ✅ Professional branding
- ✅ Unsubscribe links (for subscriptions)

### Rate Limiting:
- Built into email service
- Resend: 10 emails/second max
- Automatic retry on failures

## 💰 Cost Breakdown

### Resend Pricing:
- **Free Tier**: 100 emails/day, 3k/month
- **Pro**: $20/month for 10k emails
- **Growth**: $100/month for 100k emails

### Example Monthly Costs:
- **10 customers/day**: Free tier sufficient
- **100 customers/day**: $20/month
- **500 customers/day**: $100/month

## 🚨 Current Issue & Quick Fix

**Right Now**: Customers complete purchases but don't receive emails

**Quick Fix Options**:

1. **Enable Resend** (5 minutes):
   - Add API key to `.env.local`
   - Customers immediately get emails

2. **Use Development Mode** (0 minutes):
   - Emails logged to console
   - Manual PDF delivery if needed

3. **Alternative Service** (15 minutes):
   - Choose different email provider
   - Update email service in `lib/email.ts`

## 📋 Email Setup Checklist

- [ ] Choose email service (Resend recommended)
- [ ] Create account and verify
- [ ] Get API key
- [ ] Add domain (optional but recommended)
- [ ] Update environment variables
- [ ] Test email delivery
- [ ] Verify PDF download links work
- [ ] Check spam folder behavior
- [ ] Set up monitoring/alerts

## 🛠️ Next Steps

**To enable emails right now:**

1. **Quick Setup** (5 minutes):
   ```bash
   # Add to .env.local
   RESEND_API_KEY=re_your_key_here
   EMAIL_FROM=noreply@mindfulmealplan.com
   ```

2. **Test Purchase Flow**:
   - Make test purchase
   - Check email delivery
   - Verify PDF download

3. **Monitor & Optimize**:
   - Watch delivery rates
   - Check spam placement
   - Optimize templates if needed

**Want me to help you set this up?** Just let me know which email service you'd prefer!