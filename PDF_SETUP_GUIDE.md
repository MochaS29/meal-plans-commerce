# PDF Generation & Caching Setup Guide

This guide walks through setting up the PDF generation and caching system for Mindful Meal Plan.

## Overview

The system generates beautiful, comprehensive meal plan PDFs with:
- 📅 Monthly calendar with recipes assigned to each day
- 🛒 Weekly shopping lists (categorized by food type)
- 📖 Complete recipe book with detailed instructions
- 🍳 Sunday meal prep guide

**Smart Caching**: PDFs with identical recipe combinations are automatically reused across customers, reducing costs and improving performance.

## Setup Steps

### 1. Apply Supabase Migration

The database schema for PDF caching needs to be created in Supabase.

**Steps:**
1. Go to your Supabase Dashboard → SQL Editor
2. Open the migration file: `supabase/migrations/003_create_meal_plan_pdfs_table.sql`
3. Copy and paste the entire contents into the SQL Editor
4. Click "Run" to execute the migration

This creates two tables:
- `meal_plan_pdfs` - Stores PDF metadata (URL, recipe hash, usage stats)
- `customer_meal_plans` - Links customers to their purchased PDFs

### 2. Set Up Vercel Blob Storage

PDFs are stored in Vercel Blob (not Supabase) for optimal performance and CDN delivery.

**Steps:**
1. Go to your Vercel project dashboard
2. Navigate to: **Storage** → **Blob**
3. Click "Create Blob Store" (if you don't have one already)
4. Copy the `BLOB_READ_WRITE_TOKEN` from the store settings
5. Add to your `.env.local` file:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

### 3. Verify Environment Variables

Ensure you have all required environment variables in `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

## Testing the System

### Test 1: Basic PDF Generation

Generate a single PDF to verify the system works:

```bash
npx tsx scripts/test-pdf-generation.ts
```

Expected output:
```
✅ Fetched 30 recipes
🎨 Generating PDF...
✅ PDF Generation Complete!
📄 PDF URL: https://...
```

### Test 2: PDF Caching

Test the caching system to see PDF reuse in action:

```bash
npx tsx scripts/test-pdf-caching.ts
```

This test:
1. Generates a PDF for Customer 1 with 30 recipes
2. Generates a PDF for Customer 2 with the SAME 30 recipes (should reuse)
3. Generates a PDF for Customer 3 with DIFFERENT recipes (should create new)

Expected output:
```
TEST 1: Generate New PDF
✅ PDF 1 Generated: https://...

TEST 2: Reuse Existing PDF (Same Recipes)
♻️  Found existing PDF! Reusing instead of generating new one
📊 This PDF has been reused 0 times before
✅ SUCCESS! PDFs are identical (caching worked!)

TEST 3: Generate New PDF (Different Recipes)
🎨 No existing PDF found. Generating new meal plan...
✅ SUCCESS! Different recipes generated different PDF
```

## How It Works

### PDF Caching Logic

When a customer purchases a meal plan:

1. **Hash Generation**: Recipe IDs are sorted and hashed (SHA-256)
2. **Cache Lookup**: System checks if a PDF with this hash already exists
3. **Reuse or Generate**:
   - **If found**: Return existing PDF URL, update usage stats
   - **If not found**: Generate new PDF, upload to Vercel Blob, save metadata

```typescript
// Example: Two customers get the same PDF
Customer A: [recipe1, recipe2, recipe3] → Hash: abc123 → Generates PDF
Customer B: [recipe1, recipe2, recipe3] → Hash: abc123 → Reuses PDF (instant!)
Customer C: [recipe4, recipe5, recipe6] → Hash: def456 → Generates new PDF
```

### Benefits

✅ **Cost Savings**: Fewer PDF generations = lower compute costs
✅ **Performance**: Instant delivery for cached PDFs (no wait time)
✅ **Storage Efficiency**: No duplicate PDFs in storage
✅ **Analytics**: Track which recipe combinations are most popular

## PDF Contents

Each generated PDF includes:

### 1. Cover Page
- Meal plan title (e.g., "Mediterranean Diet Meal Plan")
- Customer name/email
- Generation date

### 2. Monthly Calendar
- 30 days of meals organized by week
- Recipe names with prep/cook times
- Easy-to-scan weekly view

### 3. Weekly Shopping Lists
- Ingredients grouped by category:
  - Proteins
  - Vegetables
  - Fruits
  - Grains & Starches
  - Dairy
  - Pantry items
  - Herbs & Spices
- Automatically deduplicated per week

### 4. Recipe Book
- Full recipe details for all 30 meals:
  - Ingredients with quantities
  - Step-by-step instructions
  - Nutrition information
  - Prep/cook times and difficulty

### 5. Sunday Prep Guide
- Tips for meal prepping on Sundays
- Tasks grouped by category:
  - Wash & chop vegetables
  - Cook grains & proteins
  - Prep ingredients
  - Organization tips

## Database Schema

### `meal_plan_pdfs` Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| pdf_url | TEXT | Vercel Blob URL |
| diet_plan_id | UUID | Reference to diet_plans |
| plan_type | TEXT | "Mediterranean Diet", etc. |
| recipe_ids | UUID[] | Array of recipe IDs |
| recipe_hash | TEXT | SHA-256 hash for matching |
| recipe_count | INTEGER | Number of recipes (30) |
| file_size_bytes | INTEGER | PDF file size |
| page_count | INTEGER | Number of pages |
| times_reused | INTEGER | Reuse counter |
| last_used_at | TIMESTAMPTZ | Last reuse timestamp |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Auto-updated |

### `customer_meal_plans` Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| customer_email | TEXT | Customer email |
| meal_plan_pdf_id | UUID | Reference to meal_plan_pdfs |
| stripe_session_id | TEXT | Stripe checkout session |
| purchase_date | TIMESTAMPTZ | Purchase timestamp |
| created_at | TIMESTAMPTZ | Creation timestamp |

## Querying the Data

### Get all PDFs for a customer

```sql
SELECT
  mp.*,
  cp.purchase_date,
  cp.stripe_session_id
FROM customer_meal_plans cp
JOIN meal_plan_pdfs mp ON cp.meal_plan_pdf_id = mp.id
WHERE cp.customer_email = 'customer@example.com'
ORDER BY cp.purchase_date DESC;
```

### Find most reused PDFs

```sql
SELECT
  plan_type,
  recipe_count,
  times_reused,
  file_size_bytes,
  created_at
FROM meal_plan_pdfs
ORDER BY times_reused DESC
LIMIT 10;
```

### Get cache hit rate

```sql
SELECT
  COUNT(*) as total_customers,
  COUNT(DISTINCT meal_plan_pdf_id) as unique_pdfs,
  ROUND(100.0 * COUNT(DISTINCT meal_plan_pdf_id) / COUNT(*), 2) as cache_miss_rate
FROM customer_meal_plans;
```

## Integration with Checkout

When integrating with your Stripe checkout flow:

```typescript
import { generateAndUploadMealPlan } from '@/lib/storage';

// In your webhook handler after successful payment
const pdfUrl = await generateAndUploadMealPlan(
  customerEmail,
  planType,
  stripeSessionId,
  selectedRecipes,
  dietPlanId // optional
);

// Send email with PDF link
await sendMealPlanEmail(customerEmail, planType, pdfUrl);
```

## Troubleshooting

### PDF generation fails

**Error**: `Missing Supabase environment variables`
**Fix**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in `.env.local`

---

**Error**: `Failed to upload PDF to storage`
**Fix**: Verify `BLOB_READ_WRITE_TOKEN` is set and valid in `.env.local`

---

**Error**: `relation "meal_plan_pdfs" does not exist`
**Fix**: Run the Supabase migration (see Step 1 above)

### Caching not working

If PDFs aren't being reused:
1. Check that recipe IDs are being sorted consistently
2. Verify the recipe hash is being calculated correctly
3. Check Supabase logs for any database errors
4. Ensure `plan_type` matches exactly (case-sensitive)

### Development mode

In development without `BLOB_READ_WRITE_TOKEN`, the system returns mock URLs:

```
📁 Would upload PDF: meal-plans/test-session-123.pdf
✅ PDF URL: https://mock-storage.vercel.app/meal-plans/test-session-123.pdf
```

This is normal and allows testing without Vercel Blob configured.

## Production Checklist

Before deploying to production:

- [ ] Supabase migration applied
- [ ] Vercel Blob storage created
- [ ] `BLOB_READ_WRITE_TOKEN` added to Vercel environment variables
- [ ] Test PDF generation works
- [ ] Test PDF caching works
- [ ] Stripe webhook integrated with PDF generation
- [ ] Email delivery tested with PDF links
- [ ] Database backups configured

## Next Steps

1. **Apply the Supabase migration** (Step 1 above)
2. **Set up Vercel Blob storage** (Step 2 above)
3. **Run the test scripts** to verify everything works
4. **Integrate with your checkout flow** to generate PDFs on purchase

Once setup is complete, your customers will receive beautiful, professional meal plan PDFs instantly!
