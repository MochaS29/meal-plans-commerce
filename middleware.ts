import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Protected routes that require authentication
const protectedRoutes = [
  '/userportal',
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

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow demo mode in development
  const isDevelopment = process.env.NODE_ENV === 'development';
  const demoModeCookie = request.cookies.get('demo_mode');
  const demoMode = demoModeCookie || isDevelopment;

  // Check if this is a protected route
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !demoMode) {
    // Check for session cookie (JWT-based authentication)
    const sessionCookie = request.cookies.get('session');

    let isAuthenticated = false;

    if (sessionCookie) {
      try {
        // Verify JWT token
        const { payload } = await jwtVerify(sessionCookie.value, secret);
        isAuthenticated = !!payload.userId;
      } catch (error) {
        // Invalid or expired token
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated) {
      // For API routes, return JSON error
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          {
            error: 'Authentication required',
            message: 'Please log in to access this resource',
            redirectUrl: '/login'
          },
          { status: 401 }
        );
      }

      // For page routes, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/userportal/:path*',
    '/meal-plans/:path*',
    '/api/meal-plans/:path*',
    '/api/shopping-list/:path*',
    '/api/recipes/:path*',
    '/weekly-menu/:path*',
    '/meal-prep-guide/:path*'
  ]
};