import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { createClient } from '@supabase/supabase-js';

// Get user email from session cookie
async function getUserEmail(request: NextRequest): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session')?.value;

    if (!sessionToken) {
      return null;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');
    const { payload } = await jwtVerify(sessionToken, secret);

    return payload.email as string || null;
  } catch (error) {
    console.log('Could not verify session:', error);
    return null;
  }
}

// Check if user has purchased access to this specific diet type AND month
async function checkUserAccess(email: string, menuType: string, month?: string, year?: string): Promise<boolean> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.log('Supabase not configured');
      return false;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // OPTION 1: Check customer_meal_plans for specific month/year access
    // This table tracks which exact meal plans were generated for this customer
    if (month && year) {
      const { data: mealPlans, error: mpError } = await supabase
        .from('customer_meal_plans')
        .select('id, diet_type, purchase_date')
        .eq('customer_email', email.toLowerCase());

      if (!mpError && mealPlans && mealPlans.length > 0) {
        const normalizedMenuType = menuType.toLowerCase().trim().replace(/\s+/g, '-');

        // Check if they have a meal plan for this diet type and month
        const hasSpecificPlan = mealPlans.some((plan: any) => {
          const planDiet = plan.diet_type.toLowerCase().trim().replace(/\s+/g, '-');
          const purchaseDate = new Date(plan.purchase_date);
          const purchaseMonth = (purchaseDate.getMonth() + 1).toString();
          const purchaseYear = purchaseDate.getFullYear().toString();

          const dietMatches = planDiet === normalizedMenuType ||
                             planDiet.includes(normalizedMenuType) ||
                             normalizedMenuType.includes(planDiet);

          // For one-time purchases: only access the specific month purchased
          // For subscriptions: access current month and all past months
          const monthMatches = purchaseMonth === month && purchaseYear === year;

          return dietMatches && monthMatches;
        });

        if (hasSpecificPlan) {
          console.log(`✅ ACCESS GRANTED: ${email} has meal plan for ${menuType} ${month}/${year}`);
          return true;
        }
      }
    }

    // OPTION 2: Fallback to checking purchases (for subscriptions or broader access)
    const { data: user, error: userError } = await supabase
      .from('users')
      .select(`
        id,
        user_purchases (
          product_id,
          product_name,
          diet_plan,
          status,
          purchased_at
        )
      `)
      .eq('email', email.toLowerCase())
      .single();

    if (userError || !user) {
      console.log(`🚫 User not found: ${email}`);
      return false;
    }

    // Check if user has purchased this diet type
    const purchases = user.user_purchases || [];
    const normalizedMenuType = menuType.toLowerCase().trim().replace(/\s+/g, '-');

    const hasAccess = purchases.some((purchase: any) => {
      if (purchase.status !== 'completed') return false;

      if (purchase.diet_plan) {
        const purchasedDiet = purchase.diet_plan.toLowerCase().trim().replace(/\s+/g, '-');
        const requestedDiet = normalizedMenuType;

        if (purchasedDiet === requestedDiet) return true;
        if (purchasedDiet.includes(requestedDiet)) return true;
        if (requestedDiet.includes(purchasedDiet)) return true;
      }

      return false;
    });

    console.log(`Access check for ${email} - ${menuType}: ${hasAccess ? '✅ GRANTED' : '🚫 DENIED'}`);
    console.log(`Purchased diet plans:`, purchases.map((p: any) => p.diet_plan).join(', '));

    return hasAccess;
  } catch (error) {
    console.error('Error checking user access:', error);
    return false;
  }
}

// Get customer's personalized meal plan from database
async function getCustomerMealPlan(email: string, menuType: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.log('Supabase not configured');
      return null;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get customer's meal plan
    const { data: customerPlans, error: cpError } = await supabase
      .from('customer_meal_plans')
      .select(`
        *,
        meal_plan_pdfs (
          id,
          plan_type,
          recipe_ids,
          recipe_count
        )
      `)
      .eq('customer_email', email)
      .order('purchase_date', { ascending: false })
      .limit(1);

    if (cpError || !customerPlans || customerPlans.length === 0) {
      console.log(`No meal plan found for ${email}`);
      return null;
    }

    const customerPlan = customerPlans[0];
    const mealPlanPdf = customerPlan.meal_plan_pdfs;

    if (!mealPlanPdf || !mealPlanPdf.recipe_ids || mealPlanPdf.recipe_ids.length === 0) {
      console.log('Meal plan has no recipe IDs');
      return null;
    }

    // Check if plan type matches request (case-insensitive, flexible matching)
    const planSlug = mealPlanPdf.plan_type.toLowerCase().replace(/\s+/g, '-');
    const requestedType = menuType.toLowerCase();

    // Allow flexible matching: "mediterranean-diet" matches "mediterranean"
    if (!planSlug.includes(requestedType) && !requestedType.includes(planSlug)) {
      console.log(`Plan type mismatch: ${planSlug} vs ${menuType}`);
      return null;
    }

    console.log(`✅ Found personalized meal plan for ${email}: ${mealPlanPdf.recipe_count} recipes`);

    // Fetch all the recipes
    const { data: recipes, error: recipeError } = await supabase
      .from('recipes')
      .select(`
        id,
        name,
        description,
        prep_time,
        cook_time,
        servings,
        difficulty,
        meal_type,
        recipe_ingredients (
          ingredient,
          amount,
          unit
        ),
        recipe_nutrition (
          calories,
          protein
        )
      `)
      .in('id', mealPlanPdf.recipe_ids);

    if (recipeError || !recipes) {
      console.error('Error fetching recipes:', recipeError);
      return null;
    }

    console.log(`✅ Fetched ${recipes.length} recipes from database`);

    // Build calendar structure from customer's recipes
    return buildCalendarFromRecipes(recipes, menuType);

  } catch (error) {
    console.error('Error getting customer meal plan:', error);
    return null;
  }
}

// Build calendar structure from recipes with intelligent meal type distribution
function buildCalendarFromRecipes(recipes: any[], menuType: string) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  // Separate recipes by meal type
  const breakfastRecipes = recipes.filter(r => r.meal_type === 'breakfast' || r.meal_type === 'any');
  const lunchRecipes = recipes.filter(r => r.meal_type === 'lunch' || r.meal_type === 'any');
  const dinnerRecipes = recipes.filter(r => r.meal_type === 'dinner' || r.meal_type === 'any');

  // Fallback to all recipes if a category is empty
  const breakfastPool = breakfastRecipes.length > 0 ? breakfastRecipes : recipes;
  const lunchPool = lunchRecipes.length > 0 ? lunchRecipes : recipes;
  const dinnerPool = dinnerRecipes.length > 0 ? dinnerRecipes : recipes;

  console.log(`📊 Recipe distribution: ${breakfastPool.length} breakfast, ${lunchPool.length} lunch, ${dinnerPool.length} dinner`);

  // Organize recipes into 30 days with proper meal type distribution
  const dailyMeals: any = {};

  for (let day = 1; day <= 30; day++) {
    const dayKey = `day_${day}`;

    // Rotate through appropriate recipe pools
    const breakfast = breakfastPool[(day - 1) % breakfastPool.length];
    const lunch = lunchPool[(day - 1) % lunchPool.length];
    const dinner = dinnerPool[(day - 1) % dinnerPool.length];

    dailyMeals[dayKey] = {
      date: `2025-01-${day.toString().padStart(2, '0')}`,
      breakfast: {
        name: breakfast.name,
        calories: breakfast.recipe_nutrition?.[0]?.calories || 0,
        protein: breakfast.recipe_nutrition?.[0]?.protein ? `${breakfast.recipe_nutrition[0].protein}g` : '0g',
        prepTime: `${breakfast.prep_time || 0} min`
      },
      lunch: {
        name: lunch.name,
        calories: lunch.recipe_nutrition?.[0]?.calories || 0,
        protein: lunch.recipe_nutrition?.[0]?.protein ? `${lunch.recipe_nutrition[0].protein}g` : '0g',
        prepTime: `${lunch.prep_time || 0} min`
      },
      dinner: {
        name: dinner.name,
        calories: dinner.recipe_nutrition?.[0]?.calories || 0,
        protein: dinner.recipe_nutrition?.[0]?.protein ? `${dinner.recipe_nutrition[0].protein}g` : '0g',
        prepTime: `${dinner.prep_time || 0} min`
      }
    };
  }

  return {
    title: `${menuType.charAt(0).toUpperCase() + menuType.slice(1)} - ${monthNames[0]} 2025`,
    description: 'Your personalized meal plan with recipes selected just for you',
    menuType: menuType,
    month: 1,
    year: 2025,
    dailyMeals,
    isPersonalized: true // Flag to indicate this is customer-specific
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const menuType = searchParams.get('menuType');
  const month = searchParams.get('month') || '1';
  const year = searchParams.get('year') || '2025';

  if (!menuType) {
    // Return list of available menu types
    return NextResponse.json({
      menuTypes: [
        'mediterranean',
        'intermittent-fasting',
        'family-focused',
        'paleo',
        'vegetarian',
        'vegan',
        'global-cuisine'
      ]
    });
  }

  // Try to get user's personalized meal plan first
  const userEmail = await getUserEmail(request);

  if (userEmail) {
    console.log(`🔍 Checking for personalized meal plan for: ${userEmail}`);
    console.log(`   Diet: ${menuType}, Month: ${month}, Year: ${year}`);

    // Check if user has purchased access to this specific month/year
    const hasAccess = await checkUserAccess(userEmail, menuType, month, year);

    if (!hasAccess) {
      console.log(`🚫 User ${userEmail} does not have access to ${menuType} ${month}/${year}`);
      return NextResponse.json(
        {
          error: 'Access denied',
          message: `You have not purchased the ${menuType} meal plan for ${month}/${year}. Please purchase it to access this content.`,
          purchased: false,
          requestedMonth: `${month}/${year}`
        },
        { status: 403 }
      );
    }

    const personalizedPlan = await getCustomerMealPlan(userEmail, menuType);

    if (personalizedPlan) {
      console.log(`✅ Returning personalized meal plan for ${userEmail}`);
      return NextResponse.json(personalizedPlan);
    } else {
      console.log(`⚠️  No personalized plan found, falling back to static JSON`);
    }
  } else {
    console.log('ℹ️  No user session, using static meal plan');
  }

  // Fall back to static JSON file (for demos or unauthenticated users)
  try {
    const filename = `${menuType}-${year}-${month.padStart(2, '0')}.json`;
    const filePath = path.join(process.cwd(), 'data', 'meal-plans', filename);

    console.log('Loading static meal plan:', filePath);

    const data = await fs.readFile(filePath, 'utf-8');
    const mealPlan = JSON.parse(data);

    console.log('Successfully loaded static meal plan:', mealPlan.title);

    return NextResponse.json({
      ...mealPlan,
      isPersonalized: false // Flag to indicate this is static
    });
  } catch (error) {
    console.error('Error loading meal plan:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { error: 'Meal plan not found for the specified menu type and date', details: errorMessage },
      { status: 404 }
    );
  }
}
