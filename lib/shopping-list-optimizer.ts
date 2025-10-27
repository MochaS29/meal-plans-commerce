/**
 * Shopping List Optimization Library
 * Groups ingredients by store sections and optimizes quantities
 */

export interface IngredientItem {
  name: string
  amount: number
  unit: string
  category?: string
  notes?: string
}

export interface OptimizedShoppingList {
  [category: string]: IngredientItem[]
}

/**
 * Store section categories (ordered by typical store layout)
 */
export const STORE_SECTIONS = {
  produce: 'Produce & Fresh Vegetables',
  meat: 'Meat & Seafood',
  dairy: 'Dairy & Eggs',
  bakery: 'Bakery & Bread',
  pantry: 'Pantry Staples',
  grains: 'Grains & Pasta',
  canned: 'Canned & Jarred Goods',
  frozen: 'Frozen Foods',
  spices: 'Spices & Seasonings',
  condiments: 'Condiments & Sauces',
  beverages: 'Beverages',
  snacks: 'Snacks',
  other: 'Other Items'
} as const

/**
 * Ingredient categorization mapping
 * TODO: USER INPUT NEEDED - Expand this list with your commonly used ingredients
 */
const INGREDIENT_CATEGORIES: Record<string, keyof typeof STORE_SECTIONS> = {
  // Produce
  'tomato': 'produce',
  'tomatoes': 'produce',
  'onion': 'produce',
  'onions': 'produce',
  'garlic': 'produce',
  'lettuce': 'produce',
  'spinach': 'produce',
  'kale': 'produce',
  'carrot': 'produce',
  'carrots': 'produce',
  'bell pepper': 'produce',
  'peppers': 'produce',
  'cucumber': 'produce',
  'zucchini': 'produce',
  'broccoli': 'produce',
  'cauliflower': 'produce',
  'mushrooms': 'produce',
  'avocado': 'produce',
  'lemon': 'produce',
  'lime': 'produce',
  'apple': 'produce',
  'banana': 'produce',
  'berries': 'produce',

  // Meat & Seafood
  'chicken': 'meat',
  'beef': 'meat',
  'pork': 'meat',
  'turkey': 'meat',
  'salmon': 'meat',
  'shrimp': 'meat',
  'fish': 'meat',
  'ground beef': 'meat',
  'ground turkey': 'meat',

  // Dairy
  'milk': 'dairy',
  'cheese': 'dairy',
  'yogurt': 'dairy',
  'butter': 'dairy',
  'cream': 'dairy',
  'eggs': 'dairy',
  'sour cream': 'dairy',
  'cottage cheese': 'dairy',

  // Bakery
  'bread': 'bakery',
  'tortillas': 'bakery',
  'buns': 'bakery',
  'pita': 'bakery',

  // Pantry
  'flour': 'pantry',
  'sugar': 'pantry',
  'baking powder': 'pantry',
  'baking soda': 'pantry',
  'salt': 'pantry',
  'pepper': 'pantry',
  'oil': 'pantry',
  'olive oil': 'pantry',
  'coconut oil': 'pantry',
  'honey': 'pantry',
  'maple syrup': 'pantry',
  'vanilla extract': 'pantry',

  // Grains & Pasta
  'rice': 'grains',
  'pasta': 'grains',
  'quinoa': 'grains',
  'oats': 'grains',
  'couscous': 'grains',
  'noodles': 'grains',

  // Canned & Jarred
  'beans': 'canned',
  'chickpeas': 'canned',
  'black beans': 'canned',
  'tomato sauce': 'canned',
  'diced tomatoes': 'canned',
  'coconut milk': 'canned',
  'tuna': 'canned',
  'peanut butter': 'canned',
  'almond butter': 'canned',

  // Frozen
  'frozen vegetables': 'frozen',
  'frozen fruit': 'frozen',
  'ice cream': 'frozen',

  // Spices
  'basil': 'spices',
  'oregano': 'spices',
  'cumin': 'spices',
  'paprika': 'spices',
  'cinnamon': 'spices',
  'ginger': 'spices',
  'turmeric': 'spices',
  'chili powder': 'spices',
  'garlic powder': 'spices',
  'onion powder': 'spices',

  // Condiments
  'ketchup': 'condiments',
  'mustard': 'condiments',
  'mayonnaise': 'condiments',
  'soy sauce': 'condiments',
  'hot sauce': 'condiments',
  'worcestershire': 'condiments',
  'vinegar': 'condiments',
  'salsa': 'condiments',

  // Beverages
  'coffee': 'beverages',
  'tea': 'beverages',
  'juice': 'beverages',
  'wine': 'beverages',
  'broth': 'beverages',
  'stock': 'beverages'
}

/**
 * Categorize an ingredient by name
 */
function categorizeIngredient(ingredientName: string): keyof typeof STORE_SECTIONS {
  const lowerName = ingredientName.toLowerCase()

  // Check for exact matches
  if (INGREDIENT_CATEGORIES[lowerName]) {
    return INGREDIENT_CATEGORIES[lowerName]
  }

  // Check for partial matches (e.g., "cherry tomatoes" → "tomatoes")
  for (const [key, category] of Object.entries(INGREDIENT_CATEGORIES)) {
    if (lowerName.includes(key)) {
      return category
    }
  }

  // Default to other
  return 'other'
}

/**
 * Combine duplicate ingredients with different units
 * TODO: USER INPUT NEEDED - Add more unit conversions as needed
 */
function combineIngredients(items: IngredientItem[]): IngredientItem[] {
  const combined = new Map<string, IngredientItem>()

  for (const item of items) {
    const key = item.name.toLowerCase()

    if (combined.has(key)) {
      const existing = combined.get(key)!

      // If units match, add quantities
      if (existing.unit === item.unit) {
        existing.amount += item.amount
        if (item.notes && !existing.notes?.includes(item.notes)) {
          existing.notes = existing.notes ? `${existing.notes}, ${item.notes}` : item.notes
        }
      } else {
        // Different units - list separately with note
        const newName = `${item.name} (${item.unit})`
        combined.set(newName.toLowerCase(), item)
      }
    } else {
      combined.set(key, { ...item })
    }
  }

  return Array.from(combined.values())
}

/**
 * Optimize shopping list by grouping and combining ingredients
 */
export function optimizeShoppingList(ingredients: IngredientItem[]): OptimizedShoppingList {
  // Combine duplicate ingredients
  const combined = combineIngredients(ingredients)

  // Group by category
  const optimized: OptimizedShoppingList = {}

  for (const item of combined) {
    const category = item.category || categorizeIngredient(item.name)
    const sectionName = STORE_SECTIONS[category as keyof typeof STORE_SECTIONS]

    if (!optimized[sectionName]) {
      optimized[sectionName] = []
    }

    optimized[sectionName].push({
      ...item,
      category
    })
  }

  // Sort items within each category alphabetically
  for (const section of Object.keys(optimized)) {
    optimized[section].sort((a, b) => a.name.localeCompare(b.name))
  }

  return optimized
}

/**
 * Format ingredient for display
 */
export function formatIngredient(item: IngredientItem): string {
  const amount = item.amount % 1 === 0
    ? item.amount.toString()
    : item.amount.toFixed(2).replace(/\.?0+$/, '')

  let formatted = `${amount} ${item.unit} ${item.name}`

  if (item.notes) {
    formatted += ` (${item.notes})`
  }

  return formatted
}

/**
 * Generate printable shopping list text
 */
export function generateShoppingListText(optimized: OptimizedShoppingList): string {
  let text = '🛒 SHOPPING LIST\n\n'

  // Iterate sections in store order
  for (const [sectionKey, sectionName] of Object.entries(STORE_SECTIONS)) {
    if (optimized[sectionName] && optimized[sectionName].length > 0) {
      text += `\n${sectionName.toUpperCase()}\n`
      text += '─'.repeat(40) + '\n'

      for (const item of optimized[sectionName]) {
        text += `☐ ${formatIngredient(item)}\n`
      }
    }
  }

  return text
}

/**
 * Generate shopping list for specific week from meal plan
 */
export async function generateWeeklyShoppingList(
  recipes: any[],
  servings: number = 4
): Promise<OptimizedShoppingList> {
  const allIngredients: IngredientItem[] = []

  for (const recipe of recipes) {
    if (!recipe.ingredients) continue

    const scaleFactor = servings / (recipe.servings || 4)

    for (const ingredient of recipe.ingredients) {
      allIngredients.push({
        name: ingredient.item || ingredient.ingredient,
        amount: (parseFloat(ingredient.amount) || 1) * scaleFactor,
        unit: ingredient.unit || 'unit',
        notes: ingredient.notes
      })
    }
  }

  return optimizeShoppingList(allIngredients)
}

// TODO: USER INPUT NEEDED
// Example usage in your API:
/*
import { generateWeeklyShoppingList, generateShoppingListText } from '@/lib/shopping-list-optimizer'

// In your meal plan API or PDF generator:
const weekRecipes = getRecipesForWeek(mealPlan, weekNumber)
const optimizedList = await generateWeeklyShoppingList(weekRecipes, familySize)
const printableList = generateShoppingListText(optimizedList)

// Add to PDF or send via email
*/
