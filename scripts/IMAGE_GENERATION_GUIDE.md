# AI Recipe Image Generation Guide

This guide explains how to generate AI-powered images for your recipes using Google's Gemini AI (Imagen).

## Prerequisites

### 1. Get Google AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### 2. Add API Key to Environment

Add to your `.env.local` file:

```bash
# Google Gemini AI for image generation
GOOGLE_AI_API_KEY=your-api-key-here
```

### 3. Set Up Supabase Storage

1. Go to your Supabase dashboard: https://app.supabase.com/project/rnvowqoqqcrimrybuiea/storage
2. Create a new bucket called `recipe-images`
3. Set it to **Public** (so images can be accessed via URLs)
4. Configure CORS if needed for your domain

### 4. Apply Database Migrations

Before generating images, make sure the `images` table exists:

1. Go to Supabase SQL Editor: https://app.supabase.com/project/rnvowqoqqcrimrybuiea/sql
2. Run the migration: `supabase/migrations/002_create_images_table.sql`
3. Run the helper functions: `supabase/migrations/003_helper_functions.sql`

Or manually copy and paste the SQL from those files into the SQL Editor.

## Usage

### Basic Usage (Generate 30 Images)

Generate images for one month's worth of recipes (default: 30 recipes):

```bash
PORT=3002 node scripts/generate-recipe-images.js
```

### Custom Batch Size

Generate a specific number of images:

```bash
# Generate 10 images
PORT=3002 node scripts/generate-recipe-images.js 10

# Generate 50 images
PORT=3002 node scripts/generate-recipe-images.js 50

# Generate 100 images
PORT=3002 node scripts/generate-recipe-images.js 100
```

## How It Works

### 1. Recipe Selection

The script automatically:
- Finds recipes that don't have images yet
- Selects the requested number of recipes
- Skips recipes that already have images

### 2. Image Generation

For each recipe:
1. Creates an optimized food photography prompt
2. Calls Google's Gemini AI (Imagen) to generate the image
3. Falls back to DALL-E 3 if Gemini fails (if OpenAI key is configured)
4. Downloads the generated image

### 3. Image Storage

1. Uploads the image to Supabase Storage (`recipe-images` bucket)
2. Saves metadata to the `images` table:
   - Links to recipe via `entity_type='recipe'` and `entity_id=recipe.id`
   - Marks as primary image (`is_primary=true`)
   - Stores generation metadata (prompt, AI model used, etc.)

### 4. Progress Tracking

The script shows:
- Current progress (recipe X of Y)
- Success/failure status for each recipe
- Overall summary at the end
- Remaining recipes to process

## Rate Limits

### Google Gemini (Free Tier)
- 15 requests per minute
- 1,500 requests per day

The script includes a 5-second delay between requests to stay within rate limits.

### Cost Estimates

**Google Gemini (Free Tier):**
- First 1,500 images per day: FREE
- After that: Check Google AI Studio pricing

**DALL-E 3 (Fallback):**
- Standard quality: $0.040 per image
- HD quality: $0.080 per image

## Example Workflow

### Generate Images for All Recipes Over Time

You have 3,586 recipes. Here's how to add images gradually:

**Week 1:** Generate 30 images (one month's worth)
```bash
PORT=3002 node scripts/generate-recipe-images.js 30
```

**Week 2:** Generate another 30 images
```bash
PORT=3002 node scripts/generate-recipe-images.js 30
```

**Continue until complete:** The script will automatically track progress

**Or bulk generate:** If you want to generate all images at once:
```bash
# This will take ~5 hours due to rate limits
PORT=3002 node scripts/generate-recipe-images.js 1500  # Daily limit
```

## Monitoring Progress

Check your progress at any time:

```bash
# Run the script to see current stats
PORT=3002 node scripts/generate-recipe-images.js 0
```

Or check the database directly:

```sql
-- Total recipes
SELECT COUNT(*) FROM recipes;

-- Recipes with images
SELECT COUNT(DISTINCT entity_id)
FROM images
WHERE entity_type = 'recipe';

-- Progress percentage
SELECT
  ROUND(
    (SELECT COUNT(DISTINCT entity_id) FROM images WHERE entity_type = 'recipe')::numeric
    /
    (SELECT COUNT(*) FROM recipes)::numeric
    * 100,
    2
  ) as progress_percent;
```

## Troubleshooting

### "Google AI API key not configured"

**Solution:** Add `GOOGLE_AI_API_KEY` to `.env.local`

### "Supabase Storage bucket not found"

**Solution:** Create the `recipe-images` bucket in Supabase Storage and make it public

### "Rate limit exceeded"

**Solution:** Wait 1 minute and try again, or reduce batch size

### "Failed to upload image"

**Causes:**
- Bucket doesn't exist
- Bucket is not public
- Storage quota exceeded

**Solution:** Check Supabase Storage settings and quota

### Images not appearing in the app

**Solution:**
1. Verify images were saved: Check `images` table in Supabase
2. Check if `is_primary=true` is set
3. Verify Storage bucket is public
4. Check your app's image loading logic

## Advanced Configuration

### Use DALL-E 3 Instead of Gemini

Add OpenAI API key to `.env.local`:

```bash
OPENAI_API_KEY=sk-...
```

The script will automatically use DALL-E 3 as fallback if Gemini fails.

### Customize Image Prompts

Edit `lib/ai-image-generator.ts` and modify the `createFoodImagePrompt` function to customize how prompts are generated.

### Change Image Size

Modify the generation parameters in `lib/ai-image-generator.ts`:

```typescript
// For DALL-E 3
size: '1024x1024' // or '1792x1024' or '1024x1792'

// For Gemini
aspectRatio: '1:1' // or '16:9' or '9:16'
```

## API Endpoint

You can also generate images via API:

```bash
curl -X POST http://localhost:3002/api/generate-images \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -d '{
    "recipeId": "uuid-here",
    "recipeName": "Mediterranean Quinoa Bowl",
    "description": "A healthy quinoa bowl with fresh vegetables",
    "mealType": "lunch",
    "dietType": "mediterranean"
  }'
```

## Files Reference

- **Image Generator:** `lib/ai-image-generator.ts`
- **Script:** `scripts/generate-recipe-images.js`
- **API Endpoint:** `app/api/generate-images/route.ts`
- **Database Migration:** `supabase/migrations/002_create_images_table.sql`

## Next Steps

After generating images:

1. **View in Admin Panel:** Check your recipes in the admin dashboard
2. **Display in App:** Use the `get_complete_recipe(uuid)` SQL function to fetch recipes with images
3. **Generate More:** Continue running the script weekly to add more images

## Support

If you encounter issues:
1. Check server logs: Look at terminal where `npm run dev` is running
2. Check Supabase logs: Go to Supabase Dashboard > Logs
3. Verify API keys are correct
4. Ensure server is running on port 3002
