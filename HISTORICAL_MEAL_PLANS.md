# 📅 Historical Meal Plans Access

## Overview

Users can now access all their previously purchased meal plans from any month/year, ensuring lifetime access to all their meal plan purchases.

## How It Works

### Database Structure

Each `meal_plan_jobs` record stores:
- `diet_type` - The diet plan type (e.g., "family-focused", "vegetarian")
- `month` - Month number (1-12)
- `year` - Year (e.g., 2025)
- `customer_email` - User's email
- `generated_recipes` - Array of 42 personalized recipes
- `pdf_url` - Link to downloadable PDF

### API Endpoints

#### 1. List All Meal Plans

Get all meal plans for the authenticated user:

```bash
GET /api/meal-plans?listAll=true
```

**Response:**
```json
{
  "mealPlans": [
    {
      "id": "36f06174-6620-4995-9306-a267ae4c4fe0",
      "dietType": "family-focused",
      "month": 11,
      "year": 2025,
      "createdAt": "2025-11-18T00:49:01.461Z",
      "recipeCount": 42,
      "pdfUrl": "https://...pdf",
      "displayName": "family-focused - November 2025"
    },
    {
      "id": "5dfe7d85-327a-4af1-a315-405ea83c3ed8",
      "dietType": "vegetarian",
      "month": 11,
      "year": 2025,
      "createdAt": "2025-11-17T21:21:49.414Z",
      "recipeCount": 19,
      "pdfUrl": "https://...pdf",
      "displayName": "vegetarian - November 2025"
    }
  ],
  "total": 2
}
```

#### 2. Get Specific Meal Plan

Retrieve a specific meal plan by diet type, month, and year:

```bash
GET /api/meal-plans?menuType=family-focused&month=11&year=2025
```

**Response:**
```json
{
  "title": "Family-Focused - November 2025",
  "description": "Your personalized meal plan with recipes selected just for you",
  "menuType": "family-focused",
  "month": 11,
  "year": 2025,
  "dailyMeals": {
    "day_1": {
      "date": "2025-11-01",
      "dinner": {
        "name": "Cheesy Beef Taco Bake",
        "calories": 520,
        "protein": "32g",
        "prepTime": "15 min",
        "cookTime": "30 min",
        "difficulty": "medium"
      }
    },
    // ... days 2-30
  },
  "bonusRecipes": {
    "breakfasts": [...],
    "desserts": [...]
  },
  "isPersonalized": true
}
```

### Filtering Logic

The API uses a two-tier matching system:

**Tier 1 - Exact Match:**
- Matches diet type + month + year exactly
- Returns the specific meal plan requested

**Tier 2 - Fallback:**
- If no exact match, returns most recent plan for that diet type
- Ensures users can always access their content

### Frontend Integration

#### Example: User Dashboard

```typescript
// Fetch all meal plans
const response = await fetch('/api/meal-plans?listAll=true');
const { mealPlans } = await response.json();

// Display as a list or dropdown
mealPlans.forEach(plan => {
  console.log(`${plan.displayName} - ${plan.recipeCount} recipes`);
  console.log(`PDF: ${plan.pdfUrl}`);
});
```

#### Example: Month Selector

```typescript
// User selects a specific month
const selectedPlan = mealPlans.find(
  plan => plan.month === 11 && plan.year === 2025
);

// Fetch full meal plan with recipes
const fullPlan = await fetch(
  `/api/meal-plans?menuType=${selectedPlan.dietType}&month=${selectedPlan.month}&year=${selectedPlan.year}`
);
const mealPlanData = await fullPlan.json();
```

## Use Cases

### 1. Subscription Users

Subscription users get a new meal plan every month:
- **November 2025**: Mediterranean plan
- **December 2025**: Mediterranean plan (new recipes)
- **January 2026**: Mediterranean plan (new recipes)

Users can access ALL previous months:
```bash
GET /api/meal-plans?menuType=mediterranean&month=11&year=2025  # November plan
GET /api/meal-plans?menuType=mediterranean&month=12&year=2025  # December plan
GET /api/meal-plans?menuType=mediterranean&month=1&year=2026   # January plan
```

### 2. One-Time Purchase Users

One-time purchase users get one meal plan:
- **November 2025**: Keto plan

They have lifetime access:
```bash
GET /api/meal-plans?menuType=keto&month=11&year=2025  # Always accessible
```

### 3. Multiple Diet Types

Users who purchase multiple diet types:
- **November 2025**: Family-focused plan
- **November 2025**: Vegetarian plan

Both are accessible:
```bash
GET /api/meal-plans?menuType=family-focused&month=11&year=2025
GET /api/meal-plans?menuType=vegetarian&month=11&year=2025
```

## Authentication

All endpoints require a valid session cookie. The API automatically:
1. Extracts JWT token from session cookie
2. Verifies email from token
3. Filters meal plans to only show user's purchases

## Security

- Users can only access their own meal plans
- Email verification via JWT prevents unauthorized access
- Server-side filtering ensures data isolation

## Database Query

Behind the scenes, the API queries:

```sql
SELECT * FROM meal_plan_jobs
WHERE customer_email = 'user@example.com'
  AND status = 'completed'
  AND diet_type = 'family-focused'
  AND month = 11
  AND year = 2025
ORDER BY created_at DESC;
```

## Future Enhancements

### Planned Features

1. **Meal Plan Calendar View**
   - Visual calendar showing all purchased months
   - Click to view specific month

2. **Favorite Recipes**
   - Mark recipes as favorites across all months
   - View favorites collection

3. **Recipe Search**
   - Search across all meal plans
   - Filter by ingredients, diet type, etc.

4. **Export History**
   - Download all PDFs as a zip file
   - Export recipes to CSV/JSON

5. **Meal Plan Comparison**
   - Compare recipes between months
   - See what's new this month

---

**Date Created**: November 18, 2025
**Status**: ✅ Implemented and Tested
**Related Files**:
- `/app/api/meal-plans/route.ts` - API implementation
- `/test-list-meal-plans.js` - Test script
