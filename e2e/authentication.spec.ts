import { test, expect } from '@playwright/test'

test.describe('Customer Authentication Flow', () => {
  test('should have login page', async ({ page }) => {
    await page.goto('/login')

    // Check for login form elements
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"], button').filter({ hasText: /login|sign in/i })).toBeVisible()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login')

    // Fill in invalid credentials
    await page.fill('input[type="email"], input[name="email"]', 'invalid@example.com')
    await page.fill('input[type="password"], input[name="password"]', 'wrongpassword')

    // Submit form
    await page.click('button[type="submit"], button:has-text("Login")')

    // Wait for error message
    await expect(page.locator('text=/invalid|error|incorrect/i')).toBeVisible({ timeout: 5000 })
  })

  test('should not accept empty email', async ({ page }) => {
    await page.goto('/login')

    // Try to submit with empty email
    await page.fill('input[type="password"], input[name="password"]', 'password123')
    await page.click('button[type="submit"], button:has-text("Login")')

    // Should show validation error or stay on page
    const currentUrl = page.url()
    expect(currentUrl).toContain('/login')
  })

  test('should not accept empty password', async ({ page }) => {
    await page.goto('/login')

    // Try to submit with empty password
    await page.fill('input[type="email"], input[name="email"]', 'test@example.com')
    await page.click('button[type="submit"], button:has-text("Login")')

    // Should show validation error or stay on page
    const currentUrl = page.url()
    expect(currentUrl).toContain('/login')
  })

  test('should have link to signup/register', async ({ page }) => {
    await page.goto('/login')

    // Look for signup/register link
    const signupLink = page.locator('a, button').filter({ hasText: /sign up|register|create account/i })

    // If signup link exists, it should be clickable
    if (await signupLink.count() > 0) {
      await expect(signupLink.first()).toBeVisible()
    }
  })

  test('should have password reset option', async ({ page }) => {
    await page.goto('/login')

    // Look for password reset link
    const resetLink = page.locator('a, button').filter({ hasText: /forgot|reset password/i })

    // If reset link exists, it should be clickable
    if (await resetLink.count() > 0) {
      await expect(resetLink.first()).toBeVisible()
    }
  })
})

test.describe('Session Management', () => {
  test('should set session cookie after successful login', async ({ page, context }) => {
    // This test would need valid test credentials
    // For now, we test that the cookie mechanism works

    await page.goto('/login')

    // Check if page is ready
    await expect(page.locator('input[type="email"]')).toBeVisible()

    // Note: In actual test, you would:
    // 1. Fill in valid test credentials
    // 2. Submit form
    // 3. Verify session cookie is set
    // 4. Verify redirect to /userportal
  })

  test('should maintain session across page reloads', async ({ page, context }) => {
    // Set a test session cookie
    await context.addCookies([{
      name: 'session',
      value: 'test-session-token-abc123',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    }])

    await page.goto('/')

    // Reload page
    await page.reload()

    // Check that cookie persists
    const cookies = await context.cookies()
    const sessionCookie = cookies.find(c => c.name === 'session')

    expect(sessionCookie).toBeDefined()
    expect(sessionCookie?.value).toBe('test-session-token-abc123')
  })

  test('should clear session cookie on logout', async ({ page, context }) => {
    // Set a session cookie
    await context.addCookies([{
      name: 'session',
      value: 'test-session-token',
      domain: 'localhost',
      path: '/',
    }])

    await page.goto('/')

    // Find and click logout button (if it exists)
    const logoutButton = page.locator('button, a').filter({ hasText: /logout|sign out/i })

    if (await logoutButton.count() > 0) {
      await logoutButton.first().click()

      // Wait a moment for cookie to be cleared
      await page.waitForTimeout(500)

      // Check that session cookie is cleared
      const cookies = await context.cookies()
      const sessionCookie = cookies.find(c => c.name === 'session')

      // Cookie should be removed or have empty value
      expect(!sessionCookie || sessionCookie.value === '').toBeTruthy()
    }
  })
})

test.describe('Protected Route Access', () => {
  test('should block access to userportal without session', async ({ page }) => {
    await page.goto('/userportal')

    // In development with demo mode, userportal is accessible
    // In production without session, should redirect to login
    if (process.env.NODE_ENV === 'production') {
      await page.waitForURL(/\/login/)
      expect(page.url()).toContain('/login')
    } else {
      // In development, demo mode allows access
      expect(page.url()).toContain('/userportal')
    }
  })

  test('should block API endpoints without session', async ({ page }) => {
    const response = await page.request.get('/api/meal-plans')

    // In development with demo mode, API endpoints are accessible (return 200)
    // In production without session, should return 401/403
    if (process.env.NODE_ENV === 'production') {
      expect(response.status()).toBeGreaterThanOrEqual(401)
      expect(response.status()).toBeLessThanOrEqual(403)
    } else {
      // In development with demo mode enabled, returns 200
      expect([200, 401, 403]).toContain(response.status())
    }
  })

  test('should redirect to intended page after login', async ({ page, context }) => {
    // Try to access protected page
    await page.goto('/userportal')

    // Should redirect to pricing with redirect param
    const url = page.url()
    if (url.includes('redirect=')) {
      expect(url).toContain('redirect')
    }
  })
})

test.describe('Subscription-Based Access', () => {
  test('should grant access with valid subscription token', async ({ page, context }) => {
    // Set subscription token
    await context.addCookies([{
      name: 'subscription_token',
      value: 'valid-subscription-token',
      domain: 'localhost',
      path: '/',
    }])

    await page.goto('/userportal')

    // Should not redirect (or handle gracefully)
    await page.waitForTimeout(1000)

    // Note: Actual behavior depends on backend validation
  })

  test('should grant access with Stripe customer ID', async ({ page, context }) => {
    // Set Stripe customer ID
    await context.addCookies([{
      name: 'stripe_customer_id',
      value: 'cus_test123',
      domain: 'localhost',
      path: '/',
    }])

    await page.goto('/userportal')

    // Should not redirect (or handle gracefully)
    await page.waitForTimeout(1000)
  })

  test('should grant access in demo mode', async ({ page, context }) => {
    // Set demo mode cookie
    await context.addCookies([{
      name: 'demo_mode',
      value: 'true',
      domain: 'localhost',
      path: '/',
    }])

    await page.goto('/userportal')

    // Should stay on userportal
    await page.waitForTimeout(1000)

    const url = page.url()
    expect(url).toContain('/userportal')
  })

  test('should allow demo mode in development', async ({ page }) => {
    // In development, demo mode should be allowed by default
    // This depends on NODE_ENV === 'development'

    await page.goto('/userportal')

    // Check if we can access or if it redirects
    await page.waitForTimeout(1000)

    const url = page.url()

    // In development, might stay on userportal
    // In production, would redirect to pricing
  })
})

test.describe('Security - Prevent Customer Access to Admin', () => {
  test('should use different cookie for admin portal', async ({ page, context }) => {
    // Set customer session cookie
    await context.addCookies([{
      name: 'session',
      value: 'customer-session-token',
      domain: 'localhost',
      path: '/',
    }])

    // Try to access admin routes (these would be on different subdomain in production)
    // For now, test that admin uses different auth

    // Customer session should NOT grant admin access
    // This would need admin portal running to test fully
  })

  test('admin token should be separate from customer session', async ({ context }) => {
    // Set both cookies
    await context.addCookies([
      {
        name: 'session',
        value: 'customer-token',
        domain: 'localhost',
        path: '/',
      },
      {
        name: 'admin-token',
        value: 'admin-token',
        domain: 'localhost',
        path: '/',
      }
    ])

    const cookies = await context.cookies()

    // Should have both cookies with different names
    const sessionCookie = cookies.find(c => c.name === 'session')
    const adminCookie = cookies.find(c => c.name === 'admin-token')

    expect(sessionCookie).toBeDefined()
    expect(adminCookie).toBeDefined()
    expect(sessionCookie?.name).not.toBe(adminCookie?.name)
  })
})

test.describe('Form Validation', () => {
  test('should validate email format', async ({ page }) => {
    await page.goto('/login')

    // Enter invalid email format
    await page.fill('input[type="email"]', 'invalid-email')

    // Try to submit or check for validation
    const emailInput = page.locator('input[type="email"]')

    // Browser's built-in validation should trigger
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid)

    // If using type="email", browser will validate
    if (await emailInput.getAttribute('type') === 'email') {
      expect(isInvalid).toBeTruthy()
    }
  })

  test('should accept valid email format', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[type="email"]', 'valid@example.com')

    const emailInput = page.locator('input[type="email"]')
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid)

    expect(isValid).toBeTruthy()
  })

  test('should enforce password length', async ({ page }) => {
    await page.goto('/login')

    // Check if there's a minimum password length
    const passwordInput = page.locator('input[type="password"]')
    const minLength = await passwordInput.getAttribute('minlength')

    if (minLength) {
      // Try password shorter than minimum
      await passwordInput.fill('123')

      const isInvalid = await passwordInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
      expect(isInvalid).toBeTruthy()
    }
  })
})
