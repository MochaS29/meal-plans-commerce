# 📚 Recipe Library Setup & Management

## Overview
The recipe library system provides a hybrid approach to recipe management:
- **Master Database**: Pre-generated recipes stored in Supabase
- **Fresh Content**: ~25% new recipes generated each month for variety
- **Customer Tracking**: Ensures customers don't get duplicate recipes
- **Continuous Growth**: Library expands as new recipes are generated

## Initial Setup

### 1. Create Customer Tracking Table
Run this SQL in your Supabase dashboard:

```bash
# Go to: https://supabase.com/dashboard/project/rnvowqoqqcrimrybuiea/sql/new
# Paste the contents of:
scripts/create-customer-tracking-table.sql
```

### 2. Populate Initial Recipe Library

#### Option A: Quick Population (Uses existing script)
```bash
# This generates recipes through your API
# Requires server to be running
npm run dev

# In another terminal:
node scripts/populate-library-with-ai.js
```

This will generate:
- 112 recipes per diet type (4 months worth)
- 6 diet types (Mediterranean, Keto, Vegan, Paleo, Vegetarian, Family)
- Total: 672 recipes

⏱️ Estimated time: 30-60 minutes
💰 AI API cost: ~$5-10 depending on your provider

#### Option B: Direct Database Population (Faster)
```bash
# This bypasses the API and generates directly
node scripts/populate-recipe-library.js
```

## How It Works

### For New Customers
When a customer orders a monthly menu:

1. **Library Selection (75%)**
   - System selects recipes from existing library
   - Ensures variety by tracking what each customer has received
   - Uses `get_fresh_recipes_for_customer()` function

2. **Fresh Generation (25%)**
   - Generates new recipes specifically for this order
   - These are saved to the library for future use
   - Ensures continuous library growth

3. **Customer Tracking**
   - Records which recipes were sent to which customer
   - Prevents duplicate recipes in future months
   - Tracks in `customer_recipes` table

### Recipe Distribution Example
For a monthly menu (28 recipes):
- 21 recipes from library (75%)
- 7 newly generated (25%)
- All organized by meal type (breakfast, lunch, dinner, snack)

## Admin Management

### View Recipe Library
```
https://mindfulmealplan.com/admin/recipes
```

Features:
- Search and filter by diet type
- View full recipe details
- Export to CSV
- Delete unwanted recipes

### Generate More Recipes
From admin panel:
1. Go to Admin Dashboard
2. Click "Generate Recipes"
3. Select diet type and quantity
4. Recipes are added to library automatically

### Monitor Library Growth
```sql
-- Check recipes per diet
SELECT
  dp.name as diet_plan,
  COUNT(DISTINCT r.id) as recipe_count
FROM diet_plans dp
LEFT JOIN recipes r ON dp.id = ANY(r.diet_plan_ids)
GROUP BY dp.name
ORDER BY recipe_count DESC;

-- Check customer variety
SELECT * FROM customer_recipe_stats;

-- Check recipe popularity
SELECT * FROM recipe_popularity LIMIT 20;
```

## Customer Benefits

### Month 1
- Customer receives 28 recipes
- 75% from curated library
- 25% freshly generated
- All recipes saved for their profile

### Month 2+
- System checks what customer already received
- Selects different recipes from library
- Generates new ones for variety
- Continuous fresh content

### Long-term
- Customers never receive duplicate recipes
- Library grows from ~672 to 1000s of recipes
- Better variety and options over time

## Maintenance

### Weekly Tasks
- Check library size per diet type
- Monitor AI generation costs
- Review customer satisfaction

### Monthly Tasks
- Analyze recipe popularity
- Remove poorly rated recipes
- Ensure balanced meal type distribution

### Quarterly Tasks
- Bulk generate seasonal recipes
- Update recipe categories
- Optimize AI prompts for better recipes

## API Endpoints

### Generate Recipes (Admin)
```javascript
POST /api/generate-recipes
{
  "action": "single",
  "dietType": "mediterranean",
  "mealType": "dinner"
}
```

### Bulk Generate (Admin)
```javascript
POST /api/generate-recipes
{
  "action": "bulk",
  "dietType": "mediterranean",
  "monthsToGenerate": 4
}
```

### Get Hybrid Menu (Customer)
```javascript
import { getMonthlyMenuWithHybridSelection } from '@/lib/hybrid-recipe-selector'

const menu = await getMonthlyMenuWithHybridSelection('mediterranean', 1)
// Returns 4 weeks of recipes with mix of library + new
```

## Cost Optimization

### Reduce AI Costs
- Pre-generate during off-peak hours
- Batch generation for efficiency
- Cache and reuse popular recipes
- Increase library percentage (e.g., 80/20 instead of 75/25)

### Storage Optimization
- Regular cleanup of incomplete recipes
- Archive old, unused recipes
- Compress recipe images

## Troubleshooting

### No recipes showing in library
1. Check Supabase connection
2. Verify tables exist (recipes, recipe_ingredients, etc.)
3. Run test generation

### Duplicate recipes for customers
1. Check customer_recipes table
2. Verify customer ID consistency
3. Review tracking logic

### Generation failures
1. Check AI API keys
2. Monitor rate limits
3. Review error logs

## Future Enhancements

1. **Smart Recommendations**
   - ML-based recipe suggestions
   - Dietary preference learning
   - Seasonal adjustments

2. **Community Features**
   - Customer recipe ratings
   - Recipe sharing
   - Custom recipe submissions

3. **Advanced Tracking**
   - Nutritional goals tracking
   - Ingredient preference learning
   - Shopping list optimization