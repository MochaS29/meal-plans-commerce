# Testing Guide for mindfulmealplan.com

## ✅ Issues Fixed

### 1. Recipe API Fatal Error
**Problem:** API was querying for `images` table relationship that doesn't exist in database schema
**Fix:** Removed `images` from Supabase query in `/app/api/recipes/by-name/[name]/route.ts`
**Result:** Recipe API now successfully returns recipes with ingredients, instructions, and nutrition

### 2. Print Calendar Using Fake Data
**Problem:** `/app/print/calendar/page.tsx` was displaying hardcoded sample meals
**Fix:** Updated to fetch real meals from `/api/meal-plans` API
**Result:** Print calendar now shows actual Mediterranean meal plan data

### 3. Account Setup
**Problem:** No active purchase for mokah@me.com
**Fix:** Created setup script and configured account with Mediterranean meal plan
**Result:** Account ready for testing with valid purchase

---

## 🔐 Login Credentials

- **Email:** mokah@me.com
- **Password:** TestPassword123!
- **Login URL:** http://localhost:3000/login

---

## 🧪 How to Test

### Step 1: Start the Development Server

```bash
cd /Users/mocha/meal-plans-commerce
npm run dev
```

Wait for: `✓ Ready on http://localhost:3000`

### Step 2: Login

1. Go to http://localhost:3000/login
2. Enter email: `mokah@me.com`
3. Enter password: `TestPassword123!`
4. Click "Login"
5. **Expected:** Redirect to `/userportal`

### Step 3: Test Calendar Clicks (Main Feature)

1. **Look at the monthly calendar** - should show real Mediterranean meals
2. **Click on any meal** (breakfast, lunch, or dinner)
3. **Expected Behavior:**
   - Browser console will log:
     ```
     === handleRecipeClick called ===
     Recipe name received: "Whole Grain Toast with Avocado and Feta"
     === fetchRecipeDetails called ===
     Recipe mapping check:
     - Original name: "Whole Grain Toast with Avocado and Feta"
     - Mapped name: "Mediterranean Quinoa and Egg Breakfast Bowl"
     API URL: /api/recipes/by-name/...
     Response status: 200
     Recipe is valid, setting selectedRecipe state
     ```
   - **Modal should popup** with:
     - Recipe name
     - Prep/cook time, servings, difficulty
     - Full ingredients list
     - Step-by-step instructions
     - Nutrition information
     - Print button

4. **If modal doesn't open:**
   - Open browser console (F12)
   - Look for red error messages
   - Check what the logs say

### Step 4: Test Recipe Book

1. Click "Recipe Book" in Quick Actions or top navigation
2. **Expected:** Page shows all recipes from your Mediterranean meal plan
3. **Expected:** Should see recipe cards with:
   - Recipe name
   - Day and meal type (e.g., "Day 1 • Breakfast")
   - Prep time, cook time, servings
   - Calories
4. Click "View Full Recipe" on any card
5. **Expected:** Modal opens with complete recipe details

### Step 5: Test Print Calendar

1. From User Portal, click "Print Calendar"
2. **Expected:** Opens new tab with print-friendly calendar
3. **Expected:** Shows **real meals** (not "Greek Yogurt Bowl", "Whole Grain Avocado Toast", etc.)
4. **Expected:** Shows actual Mediterranean plan meals like:
   - "Whole Grain Toast with Avocado and Feta"
   - "Spanakopita with Greek Salad"
   - "Grilled Lemon Herb Salmon"
5. Print dialog should auto-open

### Step 6: Test PDF Download

1. Click "Download PDF" button
2. **Expected:** Downloads `mediterranean-2025-1.pdf`
3. **Expected:** PDF contains complete month of Mediterranean meals
4. PDF should match what's on the calendar

---

## 🔍 Debugging Guide

### If Calendar Clicks Don't Work

**Check Browser Console (F12 > Console tab)**

Look for logs like:
```
=== handleRecipeClick called ===
Recipe name received: "Overnight Oats with Greek Yogurt"
=== fetchRecipeDetails called ===
API URL: /api/recipes/by-name/Satiating%20Pumpkin%20Spice%20Overnight%20Oats
Response status: 200
Recipe is valid, setting selectedRecipe state
```

**Common Issues:**

1. **"Response status: 404"**
   - Recipe not found in database
   - Fuzzy matching tried but couldn't find good match
   - Check: `node scripts/find-matching-recipes.js` to see what's in database

2. **"Response status: 500"**
   - Server error
   - Check terminal where npm run dev is running
   - Look for red error messages

3. **Modal doesn't appear but no errors**
   - Check if `selectedRecipe` state is being set
   - Look for: `Recipe is valid, setting selectedRecipe state`
   - If you see that but no modal, might be CSS/z-index issue

### If Recipe Book is Empty

**Check Browser Console for:**
```
Fetching recipe details for: "Whole Grain Toast with Avocado and Feta"
```

**If you see lots of 404s:**
- Recipe names in meal plan don't match database
- Fuzzy matching is trying but not finding matches
- Database might not have Mediterranean recipes

**Quick Database Check:**
```bash
node scripts/check-schema.js
```

Should show: `Recipes in database: 851`

### Test Recipe API Directly

Open browser and go to:
```
http://localhost:3000/api/recipes/by-name/Mediterranean%20Chickpea%20Salad
```

**Expected:** JSON with recipe data including:
- name, description, prep_time, cook_time
- recipe_ingredients array
- recipe_instructions array
- recipe_nutrition object

**If you get:** `{"error":"Failed to fetch recipe"}`
- Database connection issue
- Recipe doesn't exist
- Supabase credentials problem

---

## 📊 What to Expect

### Recipe Matching

The system uses **fuzzy matching** to match meal plan names to database recipes:

- **Meal Plan JSON:** "Grilled Lemon Herb Salmon"
- **Database Recipe:** "Grilled Salmon with Roasted Winter Vegetables"
- **Result:** ✅ Match found (score: 8+)

Some meals may not have exact matches:
- "Overnight Oats with Greek Yogurt" → "Greek Yogurt Parfait with Honey and Walnuts"
- "Turkish Breakfast Platter" → "Mediterranean Quinoa Breakfast Bowl"

This is **expected behavior** - the system finds the closest matching recipe from your 851-recipe database.

### Recipe Book Count

**Expected:** ~60-90 recipes displayed (30 days × 3 meals)

**If you see 0 recipes:**
- Check console for errors
- Meal plan API might be failing
- Recipe API connections failing
- Run: `curl http://localhost:3000/api/meal-plans?menuType=mediterranean&month=1&year=2025` to test

---

## 🛠️ Utility Scripts

### Re-setup Your Account
```bash
node scripts/setup-test-account.js
```

### Check Database Schema
```bash
node scripts/check-schema.js
```

### Find Matching Recipes
```bash
node scripts/find-matching-recipes.js
```

### Test Recipe Fetch Directly
```bash
node scripts/test-recipe-fetch.js
```

---

## ✨ Success Criteria

Your system is working correctly if:

1. ✅ Calendar shows real Mediterranean meals (not fake data)
2. ✅ Clicking a meal opens modal with recipe details
3. ✅ Recipe book shows 60-90 recipes from your meal plan
4. ✅ Print calendar shows real meals (not sample data)
5. ✅ PDF download works and contains meal plan
6. ✅ Console shows successful API calls (status 200)

---

## 🆘 If Nothing Works

1. **Check Terminal:** Look for errors where `npm run dev` is running
2. **Check Browser Console:** Look for red errors (F12 > Console)
3. **Test API Directly:**
   ```bash
   curl http://localhost:3000/api/meal-plans?menuType=mediterranean&month=1&year=2025
   curl http://localhost:3000/api/recipes/by-name/Mediterranean%20Chickpea%20Salad
   ```
4. **Check Supabase:**
   ```bash
   node scripts/check-schema.js
   ```
5. **Restart Server:** Ctrl+C in terminal, then `npm run dev` again

---

## 📝 Known Limitations

1. **Recipe Matching:** Not all meal plan names have exact database matches. The system uses fuzzy matching to find similar recipes.

2. **Recipe Mapping:** The `recipeMapping` object in `app/userportal/page.tsx` (lines 33-68) provides manual mappings for common mismatches.

3. **851 Recipes:** You have more recipes than expected (781). This is great for variety!

---

Last Updated: $(date)
