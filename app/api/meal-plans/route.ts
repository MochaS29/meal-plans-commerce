import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

  try {
    // Construct filename
    const filename = `${menuType}-${year}-${month.padStart(2, '0')}.json`;
    const filePath = path.join(process.cwd(), 'data', 'meal-plans', filename);
    
    console.log('Attempting to read:', filePath);
    console.log('Working directory:', process.cwd());

    // Read the meal plan data
    const data = await fs.readFile(filePath, 'utf-8');
    const mealPlan = JSON.parse(data);
    
    console.log('Successfully loaded meal plan:', mealPlan.title);

    return NextResponse.json(mealPlan);
  } catch (error) {
    console.error('Error loading meal plan:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorCode = error instanceof Error && 'code' in error ? (error as any).code : '';
    console.error('Error details:', errorMessage, errorCode);

    // If file doesn't exist, return a not found response
    return NextResponse.json(
      { error: 'Meal plan not found for the specified menu type and date', details: errorMessage },
      { status: 404 }
    );
  }
}