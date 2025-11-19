import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const menuType = searchParams.get('menuType');
  const month = searchParams.get('month') || '11';
  const year = searchParams.get('year') || '2025';
  const week = searchParams.get('week');
  const type = searchParams.get('type'); // 'weekly' or 'bonus'

  if (!menuType) {
    return NextResponse.json(
      { error: 'Menu type is required' },
      { status: 400 }
    );
  }

  try {
    // First, try to get personalized meal plan from the meal-plans API
    const baseUrl = request.url.split('/api/')[0];
    const mealPlanUrl = `${baseUrl}/api/meal-plans?menuType=${menuType}&month=${month}&year=${year}`;

    let mealPlan: any = null;
    try {
      const mealPlanResponse = await fetch(mealPlanUrl, {
        headers: request.headers // Pass through auth headers
      });

      if (mealPlanResponse.ok) {
        mealPlan = await mealPlanResponse.json();
      }
    } catch (err) {
      console.log('Could not fetch personalized meal plan, falling back to static');
    }

    // Fallback to static file if no personalized plan
    if (!mealPlan || mealPlan.error) {
      const filename = `${menuType}-${year}-${month.padStart(2, '0')}.json`;
      const filePath = path.join(process.cwd(), 'data', 'meal-plans', filename);
      const data = await fs.readFile(filePath, 'utf-8');
      mealPlan = JSON.parse(data);
    }

    // Handle BONUS shopping list request
    if (type === 'bonus') {
      const bonusShoppingList = mealPlan.bonusShoppingList || {};
      return NextResponse.json({
        menuType,
        month,
        year,
        type: 'bonus',
        shoppingList: bonusShoppingList.bonus_recipes || []
      });
    }

    // Handle weekly shopping lists
    const shoppingLists = mealPlan.weeklyShoppingLists || {};

    if (week) {
      // Return specific week's shopping list
      const weekKey = `week_${week}`;
      if (!shoppingLists[weekKey]) {
        return NextResponse.json(
          { error: 'Shopping list not found for the specified week' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        menuType,
        month,
        year,
        week,
        shoppingList: shoppingLists[weekKey]
      });
    }

    // Return all shopping lists for the month
    return NextResponse.json({
      menuType,
      month,
      year,
      shoppingLists
    });
  } catch (error) {
    console.error('Error loading shopping list:', error);
    return NextResponse.json(
      { error: 'Shopping list not found' },
      { status: 404 }
    );
  }
}