import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { EnhancedMealPlanPDFGenerator } from '@/lib/pdf-generator-enhanced';

export async function GET(request: NextRequest) {
  // Check authentication (session cookie, subscription token, or Stripe customer ID)
  const sessionCookie = request.cookies.get('session');
  const subscriptionToken = request.cookies.get('subscription_token');
  const stripeCustomerId = request.cookies.get('stripe_customer_id');

  // For demo purposes, allow if pricing=demo parameter is present
  const searchParams = request.nextUrl.searchParams;
  const isDemoMode = searchParams.get('demo') === 'true';

  // Allow access if user has any form of authentication
  const isAuthenticated = isDemoMode || sessionCookie || subscriptionToken || stripeCustomerId;

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Authentication required to download PDF' },
      { status: 403 }
    );
  }

  const menuType = searchParams.get('menuType');
  const month = searchParams.get('month') || '1';
  const year = searchParams.get('year') || '2025';
  const week = searchParams.get('week'); // Optional: 1, 2, 3, or 4

  if (!menuType) {
    return NextResponse.json(
      { error: 'Menu type is required' },
      { status: 400 }
    );
  }

  try {
    let mealPlan;

    // Try to fetch personalized meal plan from API (for authenticated users)
    if (!isDemoMode) {
      try {
        const baseUrl = request.nextUrl.origin;
        const mealPlanUrl = `${baseUrl}/api/meal-plans?menuType=${menuType}&month=${month}&year=${year}`;

        // Forward the session cookie to the meal-plans API
        const response = await fetch(mealPlanUrl, {
          headers: {
            'Cookie': request.headers.get('cookie') || ''
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isPersonalized) {
            console.log('Using personalized meal plan for PDF generation');
            mealPlan = data;
          }
        }
      } catch (error) {
        console.log('Could not fetch personalized meal plan, falling back to static');
      }
    }

    // Fall back to static JSON file if no personalized plan
    if (!mealPlan) {
      const filename = `${menuType}-${year}-${month.padStart(2, '0')}.json`;
      const filePath = path.join(process.cwd(), 'data', 'meal-plans', filename);

      const data = await fs.readFile(filePath, 'utf-8');
      mealPlan = JSON.parse(data);
      console.log('Using static meal plan for PDF generation');
    }

    // Filter to specific week if requested
    if (week && mealPlan.dailyMeals) {
      const weekNum = parseInt(week);
      const startDay = (weekNum - 1) * 7 + 1; // Week 1: 1, Week 2: 8, Week 3: 15, Week 4: 22
      const endDay = Math.min(weekNum * 7, 30); // Week 1: 7, Week 2: 14, Week 3: 21, Week 4: 28/30

      console.log(`Filtering to week ${weekNum}: days ${startDay}-${endDay}`);

      const filteredDailyMeals: any = {};
      for (let day = startDay; day <= endDay; day++) {
        const dayKey = `day_${day}`;
        if (mealPlan.dailyMeals[dayKey]) {
          filteredDailyMeals[dayKey] = mealPlan.dailyMeals[dayKey];
        }
      }

      mealPlan = {
        ...mealPlan,
        title: `${mealPlan.title} - Week ${weekNum}`,
        dailyMeals: filteredDailyMeals
      };
    }

    // Generate PDF
    const pdfGenerator = new EnhancedMealPlanPDFGenerator();
    const pdfBlob = await pdfGenerator.generateMealPlanPDF(mealPlan, {
      name: searchParams.get('userName') || undefined,
      email: searchParams.get('userEmail') || undefined
    });

    // Convert blob to buffer for Next.js response
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set headers for PDF download
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set(
      'Content-Disposition',
      `attachment; filename="${menuType}-${year}-${month}.pdf"`
    );

    return new NextResponse(buffer, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}