import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { SimpleMealPlanPDFGenerator } from '@/lib/pdf-generator-simple';

export async function GET(request: NextRequest) {
  // Check authentication (would normally check session/cookie)
  const subscriptionToken = request.cookies.get('subscription_token');
  const stripeCustomerId = request.cookies.get('stripe_customer_id');

  // For demo purposes, allow if pricing=demo parameter is present
  const searchParams = request.nextUrl.searchParams;
  const isDemoMode = searchParams.get('demo') === 'true';

  if (!isDemoMode && !subscriptionToken && !stripeCustomerId) {
    return NextResponse.json(
      { error: 'Subscription required to download PDF' },
      { status: 403 }
    );
  }

  const menuType = searchParams.get('menuType');
  const month = searchParams.get('month') || '1';
  const year = searchParams.get('year') || '2025';

  if (!menuType) {
    return NextResponse.json(
      { error: 'Menu type is required' },
      { status: 400 }
    );
  }

  try {
    // Load the meal plan data
    const filename = `${menuType}-${year}-${month.padStart(2, '0')}.json`;
    const filePath = path.join(process.cwd(), 'data', 'meal-plans', filename);

    const data = await fs.readFile(filePath, 'utf-8');
    const mealPlan = JSON.parse(data);

    // Generate PDF
    const pdfGenerator = new SimpleMealPlanPDFGenerator();
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