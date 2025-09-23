import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const menuType = searchParams.get('menuType');
  const month = searchParams.get('month') || '1';
  const year = searchParams.get('year') || '2025';
  const week = searchParams.get('week');

  if (!menuType) {
    return NextResponse.json(
      { error: 'Menu type is required' },
      { status: 400 }
    );
  }

  try {
    // Construct filename
    const filename = `${menuType}-${year}-${month.padStart(2, '0')}.json`;
    const filePath = path.join(process.cwd(), 'data', 'meal-plans', filename);

    // Read the meal plan data
    const data = await fs.readFile(filePath, 'utf-8');
    const mealPlan = JSON.parse(data);

    // Extract shopping lists
    const shoppingLists = mealPlan.weeklyShoppingLists || {};

    if (week) {
      // Return specific week's shopping list
      const weekKey = `week${week}`;
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