import { Page } from '@playwright/test'

export async function mockLogin(page: Page) {
  // Mock the login API to return success
  await page.route('**/api/simple-login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: 'Login successful!',
        redirect: '/userportal',
        user: {
          id: 'test-user-123',
          email: 'mocha.shmigelsky@gmail.com',
          name: 'Test User',
          purchases: [
            {
              productId: 'monthly-subscription',
              productName: 'Monthly Subscription',
              dietPlan: 'mediterranean',
              status: 'completed',
              purchaseDate: new Date().toISOString()
            }
          ]
        }
      }),
      headers: {
        'Set-Cookie': 'session=test-session-token; Path=/; HttpOnly; SameSite=Lax'
      }
    })
  })

  // Also mock the user portal API endpoints
  await page.route('**/api/user/meal-plans', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        mealPlans: [
          {
            id: 'test-plan-1',
            month: new Date().toISOString().slice(0, 7),
            dietType: 'mediterranean',
            recipes: []
          }
        ]
      })
    })
  })
}

export async function login(page: Page) {
  // Set up mocks first
  await mockLogin(page)

  // Now perform login
  await page.goto('/login')
  await page.fill('input[type="email"]', 'mocha.shmigelsky@gmail.com')
  await page.fill('input[type="password"]', 'test-password')
  await page.click('button[type="submit"]')

  // Wait for either success message or redirect
  try {
    await Promise.race([
      page.waitForURL(/\/userportal/, { timeout: 3000 }),
      page.waitForSelector('text="Login successful!"', { timeout: 3000 })
    ])
  } catch {
    // If redirect doesn't happen, navigate manually
    await page.goto('/userportal')
  }

  // Ensure we're on userportal
  if (!page.url().includes('/userportal')) {
    await page.goto('/userportal')
  }
}
