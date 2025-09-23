import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require subscription
const protectedRoutes = [
  '/dashboard',
  '/meal-plans',
  '/api/meal-plans',
  '/api/shopping-list',
  '/api/recipes',
  '/weekly-menu',
  '/meal-prep-guide'
];

// Demo/preview routes that are always accessible
const previewRoutes = [
  '/calendar', // Sample calendar view
  '/shopping-list', // Sample shopping list
  '/recipes', // Sample recipes
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected route
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected) {
    // Check for subscription cookie or session
    const subscriptionToken = request.cookies.get('subscription_token');
    const stripeCustomerId = request.cookies.get('stripe_customer_id');

    // For API routes, return JSON error
    if (pathname.startsWith('/api/')) {
      if (!subscriptionToken && !stripeCustomerId) {
        return NextResponse.json(
          {
            error: 'Subscription required',
            message: 'Please subscribe to access meal plans and recipes',
            redirectUrl: '/pricing'
          },
          { status: 403 }
        );
      }
    }

    // For page routes, redirect to pricing
    if (!subscriptionToken && !stripeCustomerId) {
      const url = request.nextUrl.clone();
      url.pathname = '/pricing';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/meal-plans/:path*',
    '/api/meal-plans/:path*',
    '/api/shopping-list/:path*',
    '/api/recipes/:path*',
    '/weekly-menu/:path*',
    '/meal-prep-guide/:path*'
  ]
};