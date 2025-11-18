# 🎯 Ingredient Filtering System

## Overview

The meal plan generation system implements a **three-tiered filtering approach** for customer preferences, ensuring precise control over which ingredients appear in recipes.

## Filtering Tiers

### 1. 🚨 **Allergies** (Hard Filter - 0% Allowed)

**Purpose**: Complete exclusion for medical/safety reasons

**How to Specify**: Input in the "Allergies" field during checkout or preferences

**Examples**:
- `peanuts`
- `shellfish`
- `dairy`
- `gluten`

**Behavior**:
- ✅ **0%** of recipes will contain the allergen
- ❌ Complete exclusion from ingredient lists
- 🔍 Checked in: recipe name, description, AND full ingredients list
- 🤖 AI is instructed: "NEVER use these ingredients (0% allowed)"

---

### 2. 🛑 **"No X"** or **"Avoid X"** (Hard Filter - 0% Allowed)

**Purpose**: Strong dislikes or dietary preferences (not medical)

**How to Specify**: Input in the "Preferences" field using these patterns:
- `no peppers`
- `avoid mushrooms`
- `don't want onions`
- `hate cilantro`
- `dislike olives`

**Examples**:
```
Preferences: no peppers, avoid mushrooms, hate cilantro
```

**Behavior**:
- ✅ **0%** of recipes will contain these ingredients
- ❌ Treated identically to allergies (complete exclusion)
- 🔍 Checked in: recipe name, description, AND full ingredients list
- 🤖 AI is instructed: "NEVER use these ingredients (0% allowed)"

---

### 3. ⚖️ **"Less X"** or **"Reduce X"** (Soft Filter - ~10% Allowed)

**Purpose**: Prefer less of an ingredient but okay with occasional use

**How to Specify**: Input in the "Preferences" field using these patterns:
- `less fish`
- `fewer carbs`
- `reduce chicken`
- `limit beef`

**Examples**:
```
Preferences: less fish, reduce red meat
```

**Behavior**:
- ✅ **~10%** of recipes may contain these ingredients
- ⚖️ System keeps only 10% of recipes with the ingredient
- 🔍 Recipe generation: AI uses these ingredients "sparingly (only if truly necessary)"
- 📊 Post-filtering: Recipes are sorted, and only top 10% with the ingredient are kept

---

### 4. ✨ **"More X"** or **"Prefer X"** (Positive Weight)

**Purpose**: Encourage inclusion of certain ingredients

**How to Specify**: Input in the "Preferences" field using these patterns:
- `more vegetables`
- `prefer chicken`
- `like salmon`
- `love sweet potatoes`
- `want quinoa`

**Examples**:
```
Preferences: more vegetables, prefer chicken, love sweet potatoes
```

**Behavior**:
- ✅ AI tries to include these ingredients when appropriate
- 🎯 Positive scoring in recipe selection
- 🤖 AI is instructed: "Try to include these ingredients when possible"

---

## Example Preferences Input

### Combined Preferences
```
Allergies: peanuts, shellfish

Preferences: no peppers, less fish, more vegetables, prefer chicken
```

**Result**:
- 🚨 **0%** peanuts (allergy)
- 🚨 **0%** shellfish (allergy)
- 🛑 **0%** peppers (hard "no")
- ⚖️ **~10%** fish (soft "less")
- ✨ Increased chicken presence (positive "prefer")
- ✨ Increased vegetable presence (positive "more")

---

## Technical Implementation

### 1. Parsing (`parsePreferencesWithWeights`)

Located in: `app/api/cron/process-meal-plans/route.ts`

```typescript
function parsePreferencesWithWeights(text: string): {
  avoid: string[]   // "no X", "avoid X"
  reduce: string[]  // "less X", "reduce X"
  preferred: string[] // "more X", "prefer X"
}
```

**Patterns Matched**:
- **Avoid**: `/(?:no|avoid|don't want|hate|dislike)\s+([a-z\s]+?)(?:,|and|;|\.|$)/gi`
- **Reduce**: `/(?:less|fewer|reduce|limit)\s+([a-z\s]+?)(?:,|and|;|\.|$)/gi`
- **Prefer**: `/(?:more|prefer|like|love|want)\s+([a-z\s]+?)(?:,|and|;|\.|$)/gi`

### 2. Filtering Functions

#### `filterByAllergens()` - Checks ingredients list
```typescript
// Checks: recipe name, description, AND ingredients array
// Returns: Recipes with 0% of allergen
// Special handling: "pepper" vs "peppercorn"
```

#### `filterByAvoidIngredients()` - Handles "no X"
```typescript
// Checks: recipe name, description, AND ingredients array
// Returns: Recipes with 0% of avoided ingredient
// Behavior: Identical to allergen filtering
```

#### `applyReduceFilter()` - Handles "less X"
```typescript
// Steps:
// 1. Separates recipes into two groups (with/without reduce ingredient)
// 2. Calculates target: Math.ceil(totalRecipes * 0.1)
// 3. Keeps only 10% of recipes with the ingredient
// 4. Keeps ALL recipes without the ingredient
// Returns: Combined list
```

### 3. AI Recipe Generation

Located in: `lib/ai-recipe-generator.ts`

```typescript
interface RecipeParams {
  avoidIngredients?: string[]    // 0% allowed
  reduceIngredients?: string[]   // Use sparingly
  preferredIngredients?: string[] // Try to include
}
```

**AI Prompt Instructions**:
```
NEVER use these ingredients (0% allowed): [avoidIngredients]
Use these ingredients sparingly (only if truly necessary): [reduceIngredients]
Try to include these ingredients when possible: [preferredIngredients]
```

---

## Special Ingredient Handling

### Peppers
```typescript
// Matches: "pepper", "bell pepper", "red pepper", "green pepper", "chili pepper"
// Excludes: "peppercorn"
if (ingredient.includes('pepper') && !ingredient.includes('peppercorn')) {
  return true // Contains pepper
}
```

### Olives
```typescript
// Matches: "olives", "black olives", "kalamata olives"
// Allows: "olive oil" (not filtered)
if (ingredient.includes('olive') && !ingredient.includes('olive oil')) {
  return true // Contains olives
}
```

---

## Data Flow

```
┌─────────────────────┐
│ Customer Input      │
│ Allergies: peanuts  │
│ Preferences:        │
│ no peppers,         │
│ less fish,          │
│ more chicken        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│ parsePreferencesWithWeights()               │
│ • avoid: ["peppers"]                        │
│ • reduce: ["fish"]                          │
│ • preferred: ["chicken"]                    │
│                                             │
│ allergyIngredients: ["peanuts"]             │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│ customerPreferences Object                  │
│ {                                           │
│   avoidIngredients: ["peanuts", "peppers"]  │
│   reduceIngredients: ["fish"]               │
│   preferredIngredients: ["chicken"]         │
│ }                                           │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│ AI Recipe Generation                        │
│ • Generates recipes with instructions       │
│ • NEVER uses: peanuts, peppers              │
│ • Sparingly uses: fish                      │
│ • Tries to include: chicken                 │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│ Post-Generation Filtering                   │
│ 1. filterByAllergens() → removes peanuts    │
│ 2. filterByAvoidIngredients() → removes     │
│    peppers                                  │
│ 3. applyReduceFilter() → limits fish to 10% │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│ Final Recipe Set                            │
│ • 0% peanuts                                │
│ • 0% peppers                                │
│ • ~10% fish (e.g., 3-4 recipes out of 42)   │
│ • Increased chicken presence                │
└─────────────────────────────────────────────┘
```

---

## Testing Examples

### Test Case 1: Hard Filter
**Input**: Allergies: `peanuts`, Preferences: `no peppers`
**Expected**: 0 recipes with peanuts, 0 recipes with peppers
**Verification**: Check all recipe ingredients for complete absence

### Test Case 2: Soft Filter
**Input**: Preferences: `less fish`
**Expected**: Maximum 10% of recipes contain fish
**Calculation**: If 42 total recipes → max 4-5 fish recipes
**Verification**: Count recipes containing fish in name/ingredients

### Test Case 3: Combined
**Input**:
- Allergies: `dairy`
- Preferences: `no mushrooms, less beef, more vegetables`

**Expected**:
- 0% dairy
- 0% mushrooms
- ~10% beef (4-5 recipes)
- Increased vegetable presence

---

## Configuration Files Modified

### 1. `app/api/cron/process-meal-plans/route.ts`
- ✅ `parsePreferencesWithWeights()` - Parses "no/less/more" patterns
- ✅ `filterByAllergens()` - Checks ingredients list for allergens
- ✅ `filterByAvoidIngredients()` - Hard 0% filter for "no X"
- ✅ `applyReduceFilter()` - Soft 10% filter for "less X"
- ✅ `applyFilters()` - Orchestrates all filtering tiers

### 2. `lib/ai-recipe-generator.ts`
- ✅ Added `reduceIngredients` parameter to `RecipeParams` interface
- ✅ Updated AI prompt with "use sparingly" instruction

### 3. `lib/hybrid-recipe-selector.ts`
- ✅ Added `reduceIngredients` to `RecipeSelectionConfig` interface
- ✅ Passes `reduceIngredients` to `generateRecipe()` calls

### 4. `lib/recipeFiltering.ts`
- ✅ Updated `checkForIngredients()` with smart pattern matching
- ✅ Made dislikes a hard filter (score = 0) instead of soft penalty

---

## Future Enhancements

### Potential Additions
1. **Quantity-based reduction**: Instead of 10%, allow user-specified percentages
   - Example: `less fish (5%)` or `reduce chicken (20%)`

2. **Meal-type specific preferences**:
   - Example: `no fish for breakfast, less fish for lunch, fish ok for dinner`

3. **Temporal preferences**:
   - Example: `more soup in winter, more salad in summer`

4. **Ingredient groups**:
   - Example: `less red meat` → automatically includes beef, pork, lamb

5. **Smart substitutions**:
   - Example: User says "no chicken" → AI suggests turkey or tofu as alternatives

---

## Maintenance Notes

- **Allergen patterns** are checked case-insensitively
- **Pepper filtering** specifically excludes "peppercorn" to avoid false positives
- **10% threshold** is calculated as `Math.ceil(totalRecipes * 0.1)` to ensure at least 1 recipe
- **Parsing is generous**: Accepts natural language like "don't want", "hate", "dislike"

---

## Support

For questions or issues related to ingredient filtering, reference:
- Implementation: `app/api/cron/process-meal-plans/route.ts:614-663`
- AI Integration: `lib/ai-recipe-generator.ts:25-34`
- Documentation: This file

Last Updated: November 17, 2025
