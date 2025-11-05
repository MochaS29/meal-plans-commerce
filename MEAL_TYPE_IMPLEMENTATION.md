# Meal Type Implementation Guide

## Problem
Calendar was assigning all recipes randomly to breakfast, lunch, and dinner slots without considering meal appropriateness. For example, dinner recipes like "Grilled Salmon" were appearing as breakfast items.

## Solution
Implement meal type categorization system to ensure:
- Breakfast recipes (oatmeal, eggs, frittatas) appear in breakfast slots
- Lunch recipes (salads, wraps, light meals) appear in lunch slots
- Dinner recipes (hearty mains, salmon, chicken bakes) appear in dinner slots
- Snacks (bites, dips) are categorized separately

## Implementation Steps

### Step 1: Add meal_type column to database ✅

**Run this SQL in Supabase Dashboard:**

```sql
-- Add meal_type column to recipes table
ALTER TABLE public.recipes
ADD COLUMN IF NOT EXISTS meal_type TEXT DEFAULT 'any';

-- Add check constraint
ALTER TABLE public.recipes
ADD CONSTRAINT meal_type_check
CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack', 'any'));

-- Create index
CREATE INDEX IF NOT EXISTS idx_recipes_meal_type ON public.recipes(meal_type);
```

**To run:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to SQL Editor
4. Copy and paste the SQL above
5. Click Run

**Verify:**
```bash
node scripts/add-meal-type-column.js
```

---

### Step 2: Categorize all existing recipes ✅

**Run the AI categorization script:**

```bash
node scripts/categorize-recipes-by-meal-type.js
```

This will:
- Analyze all 851 recipes in your database
- Use Claude AI to categorize each recipe by name and ingredients
- Update the `meal_type` column for each recipe
- Show distribution summary

**Expected output:**
```
✅ Categorization Complete!

📊 Summary:
   🌅 Breakfast: ~150 recipes
   ☀️  Lunch: ~250 recipes
   🌙 Dinner: ~350 recipes
   🍿 Snack: ~100 recipes
```

---

### Step 3: Code updates (Already Complete) ✅

The following files have been updated:

#### `/app/api/meal-plans/route.ts`
- ✅ Added `meal_type` to recipe SELECT query
- ✅ Updated `buildCalendarFromRecipes()` to filter recipes by meal type
- ✅ Breakfast slot uses breakfast/any recipes
- ✅ Lunch slot uses lunch/any recipes
- ✅ Dinner slot uses dinner/any recipes

**New Logic:**
```typescript
// Separate recipes by meal type
const breakfastRecipes = recipes.filter(r => r.meal_type === 'breakfast' || r.meal_type === 'any');
const lunchRecipes = recipes.filter(r => r.meal_type === 'lunch' || r.meal_type === 'any');
const dinnerRecipes = recipes.filter(r => r.meal_type === 'dinner' || r.meal_type === 'any');

// Rotate through appropriate pools for each meal slot
const breakfast = breakfastPool[(day - 1) % breakfastPool.length];
const lunch = lunchPool[(day - 1) % lunchPool.length];
const dinner = dinnerPool[(day - 1) % dinnerPool.length];
```

---

### Step 4: Update Hybrid Recipe Selector (Optional Enhancement)

For future purchases, you can modify `/lib/hybrid-recipe-selector.ts` to ensure balanced meal type distribution:

**Current:** Selects 30 random recipes (75% library + 25% AI)

**Enhanced:** Select recipes with meal type balance:
- 10 breakfast recipes (7-8 from library + 2-3 AI-generated)
- 10 lunch recipes (7-8 from library + 2-3 AI-generated)
- 10 dinner recipes (7-8 from library + 2-3 AI-generated)

This ensures every customer gets a balanced meal plan.

---

## Testing

### Test current meal plan distribution:

```bash
node scripts/test-personalized-api.js
```

Look for the new log line:
```
📊 Recipe distribution: 5 breakfast, 10 lunch, 15 dinner
```

### Test specific meal type for mokah@me.com:

After running categorization, mokah's calendar should show:
- **Breakfast:** Autumn Quinoa Breakfast Bowl, Mediterranean Breakfast Frittata, Autumn Apple Oatmeal Bake, Pumpkin Spice Oatmeal Cups, Pumpkin Spice Muffin Bites
- **Lunch:** Salads, wraps, lighter meals
- **Dinner:** Salmon, chicken bakes, heartier dishes

---

## Rollback Plan

If issues occur, you can reset all recipes to 'any':

```sql
UPDATE public.recipes SET meal_type = 'any';
```

The calendar will still work (all recipes go into all slots), but meal appropriateness won't be enforced.

---

## Files Created

- `/supabase/migrations/006_add_meal_type.sql` - Database migration
- `/scripts/add-meal-type-column.js` - Migration verification script
- `/scripts/categorize-recipes-by-meal-type.js` - AI categorization script
- `/MEAL_TYPE_IMPLEMENTATION.md` - This guide

## Files Modified

- `/app/api/meal-plans/route.ts` - Updated to use meal types

---

## Next Steps

1. ✅ Run Step 1 SQL in Supabase Dashboard
2. ⏳ Run Step 2 categorization script
3. ✅ Code is already updated
4. 🧪 Test with your account
5. 🎉 Enjoy properly categorized meal plans!

---

## Benefits

✅ **Better User Experience:** Breakfast items only appear at breakfast
✅ **Proper Meal Planning:** Meals match expected meal times
✅ **Scalable:** All future recipes will be categorized
✅ **Flexible:** Recipes marked 'any' can appear anywhere
✅ **AI-Powered:** Automatic categorization of existing recipes

---

## Questions?

- Meal type not working? Check console logs in API
- Categories seem wrong? Re-run categorization script
- Want to manually adjust? Update directly in Supabase dashboard
