# 💰 Meal Plan Generation Cost Breakdown

*Last Updated: November 6, 2025*

## Overview

This document provides a detailed breakdown of all costs associated with generating and delivering personalized meal plans to customers.

---

## Meal Plan Structure

- **Duration:** 30-day meal calendar
- **Recipes per plan:** 30 recipes (1 per day)
- **AI Generation Strategy:** 25% new recipes (8 recipes) + 75% from library (22 existing recipes)
- **Recipe Selection:** Hybrid system balances variety with cost efficiency

---

## Cost Per Customer

### 1. AI Recipe Generation (Claude 3 Haiku)

**8 new recipes generated per customer**

| Component | Details | Calculation | Cost |
|-----------|---------|-------------|------|
| **Input Tokens** | 1,000 tokens per recipe × 8 recipes | 8,000 tokens × $0.25/1M | $0.002 |
| **Output Tokens** | 2,000 tokens per recipe × 8 recipes | 16,000 tokens × $1.25/1M | $0.020 |
| **Total Recipe Generation** | Claude 3 Haiku API | | **$0.022** |

**Processing Time:** 2-3 seconds per recipe = **16-24 seconds total**

---

### 2. AI Image Generation (Replicate Flux-Schnell)

**8 images for new recipes**

| Component | Details | Calculation | Cost |
|-----------|---------|-------------|------|
| **Image Generation** | Flux-schnell model | 8 images × $0.003 | $0.024 |
| **Total Image Generation** | | | **$0.024** |

**Processing Time:** 3-5 seconds per image = **24-40 seconds total**

---

### 3. Database Storage (Supabase)

**All storage within free tier limits**

| Resource | Usage per Customer | Free Tier Limit | Cost |
|----------|-------------------|-----------------|------|
| **Recipe Data** | ~80 KB (8 recipes with ingredients, instructions, nutrition) | 500 MB database | $0.000 |
| **Image Storage** | External URLs (hosted by Replicate) | 1 GB file storage | $0.000 |
| **Meal Plan Jobs** | ~2 KB per job record | Included in database | $0.000 |
| **Total Database** | | | **$0.000** |

---

### 4. PDF Generation & Delivery

| Resource | Details | Cost |
|----------|---------|------|
| **PDF Generation** | Server-side (jsPDF) | $0.000 |
| **Email Delivery** | Resend API (free tier: 3,000/month) | $0.000* |
| **Total PDF & Email** | | **$0.000** |

*Free for first 3,000 emails/month. After: $0.001 per email ($1/1,000 emails)

---

## 📊 TOTAL COST PER CUSTOMER

| Category | Cost | Time |
|----------|------|------|
| AI Recipe Generation | $0.022 | 16-24 sec |
| AI Image Generation | $0.024 | 24-40 sec |
| Database Storage | $0.000 | Instant |
| PDF & Email | $0.000 | 5-10 sec |
| **TOTAL** | **$0.046** | **45-74 sec** |

---

## 💸 Revenue & Profit Analysis

### One-Time Purchase ($59)

| Item | Amount | Percentage |
|------|--------|------------|
| **Revenue** | $59.00 | 100.0% |
| AI Costs | -$0.05 | 0.1% |
| Stripe Fee (2.9% + $0.30) | -$2.01 | 3.4% |
| **Net Profit** | **$56.94** | **96.5%** |

**Profit Margin:** 96.5%

---

### Monthly Subscription ($29)

| Item | Amount | Percentage |
|------|--------|------------|
| **Revenue** | $29.00 | 100.0% |
| AI Costs | -$0.05 | 0.2% |
| Stripe Fee (2.9% + $0.30) | -$1.14 | 3.9% |
| **Net Profit** | **$27.81** | **95.9%** |

**Profit Margin:** 95.9%

**Monthly Recurring Revenue (MRR) Value:**
- Average customer lifetime: 6 months
- Lifetime value per subscriber: $166.86

---

## 📈 Scaling Economics

### Cost Scaling at Different Customer Volumes

| Customers/Month | Total AI Cost | One-Time Revenue ($59) | Subscription Revenue ($29) | Net Profit ($59) | Net Profit ($29) |
|-----------------|---------------|------------------------|----------------------------|------------------|------------------|
| **10** | $0.46 | $590 | $290 | $569.40 | $278.10 |
| **50** | $2.30 | $2,950 | $1,450 | $2,847.00 | $1,390.50 |
| **100** | $4.60 | $5,900 | $2,900 | $5,694.00 | $2,781.00 |
| **250** | $11.50 | $14,750 | $7,250 | $14,235.00 | $6,952.50 |
| **500** | $23.00 | $29,500 | $14,500 | $28,470.00 | $13,905.00 |
| **1,000** | $46.00 | $59,000 | $29,000 | $56,940.00 | $27,810.00 |

### Key Insights:
- ✅ AI costs scale linearly and remain negligible
- ✅ At 100 customers/month: $4.60 AI cost vs $8,475 net profit (0.05%)
- ✅ At 1,000 customers/month: $46 AI cost vs $84,750 net profit (0.05%)

---

## 💻 Infrastructure Costs

### Current Configuration (Hobby Plans)

| Service | Plan | Monthly Cost | Notes |
|---------|------|--------------|-------|
| **Vercel** | Hobby | $0 | Free hosting, 2 cron jobs/day |
| **Supabase** | Free | $0 | 500MB database, 1GB storage |
| **Resend (Email)** | Free | $0 | 3,000 emails/month included |
| **Domain** | Registered | ~$12/year | One-time annual cost |
| **Total Monthly** | | **$0** | Plus $1/month for domain |

### Recommended Upgrade Path (After Launch)

| Service | Upgrade To | Monthly Cost | Benefits |
|---------|------------|--------------|----------|
| **Vercel** | Pro | $20 | Unlimited cron jobs (every 5-15 min) |
| **Supabase** | Stay Free | $0 | Sufficient until 1,000+ customers |
| **Resend** | Stay Free | $0 | Sufficient for 3,000 emails/month |
| **Total Monthly** | | **$20** | Better customer experience |

**Upgrade Recommendation:** After 10-20 customers/month, upgrade Vercel to Pro ($20/month) for faster meal plan processing.

---

## 🚀 Break-Even Analysis

### To Cover Vercel Pro ($20/month):
- **One-Time Sales:** 1 customer at $59 = $56.94 profit (covers cost)
- **Subscriptions:** 1 customer at $29/month = $27.81 profit (covers cost)

**Conclusion:** First sale/subscription covers all infrastructure costs.

---

## 📋 Current Processing Configuration

### Cron Job Schedule (Vercel Hobby Plan)

```json
{
  "crons": [
    {
      "path": "/api/cron/process-meal-plans",
      "schedule": "0 9,21 * * *"
    }
  ]
}
```

**Processing Times:**
- 9:00 AM PST (12:00 PM EST)
- 9:00 PM PST (12:00 AM EST)

**Customer Experience:**
- Maximum wait time: 12 hours
- Average wait time: 6 hours
- Immediate "processing" email sent upon purchase
- PDF delivered via email when ready

### Alternative Options (If Needed):

1. **Immediate Processing** - Process in webhook (60 sec max), no cron needed
2. **External Cron Service** - Free services like cron-job.org for every 5-15 min
3. **Vercel Pro Upgrade** - Unlimited crons every 5 min ($20/month)

---

## 🎯 Cost Optimization Tips

1. **Recipe Library Growth**
   - As library grows, % of new recipes decreases automatically
   - Cost per customer drops over time
   - Current: 8 new recipes per customer
   - At scale (5,000+ recipes): ~3-5 new recipes per customer

2. **Batch Processing**
   - Process multiple customers in single cron run
   - No additional cost (already batched)

3. **Caching**
   - Popular recipes cached in memory
   - Reduces database queries
   - No additional cost

4. **Image Hosting**
   - Currently using Replicate URLs (no storage cost)
   - Alternative: Vercel Blob Storage if needed

---

## 📊 Financial Projections

### Year 1 Targets (Conservative)

| Metric | Month 1-3 | Month 4-6 | Month 7-12 | Total Year 1 |
|--------|-----------|-----------|------------|--------------|
| **Customers** | 10/mo | 25/mo | 50/mo | 450 |
| **AI Costs** | $1.38 | $3.45 | $13.80 | $66.90 |
| **Revenue Mix** | 70% one-time | 60% one-time | 50% one-time | - |
| **Gross Revenue** | $1,770 | $4,425 | $13,250 | $69,675 |
| **Net Profit** | $1,706 | $4,267 | $12,773 | $67,221 |

**ROI:** Infrastructure costs ($20/month Vercel Pro) = $240/year
**Net Profit After Infrastructure:** $66,981 (99.6% margin maintained)

---

## 🔄 Review & Optimization Schedule

- **Week 1-2:** Monitor twice-daily cron performance
- **Month 1:** Evaluate if processing delays impact conversions
- **Month 2:** Consider Vercel Pro upgrade if needed
- **Month 3:** Review AI cost trends as library grows
- **Month 6:** Optimize recipe generation ratio based on library size

---

## 📞 Questions or Concerns?

If you have questions about costs or want to optimize further:
- Review current AI spending in Anthropic dashboard
- Monitor Replicate usage at replicate.com/account
- Check Supabase metrics at app.supabase.com

**Last Review Date:** November 6, 2025
**Next Review Due:** December 2025 (after first month of production)
