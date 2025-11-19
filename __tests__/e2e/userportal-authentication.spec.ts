/**
 * E2E Test: User Portal Meal Plan Authentication (Nov 2025)
 *
 * Bug Found: Users couldn't see their purchased meal plans in user portal
 * Root Cause: fetch() calls missing credentials: 'include' option
 * Impact: Session cookies not sent to API, resulting in 401/403 errors
 * Fix: Added { credentials: 'include' } to all fetch calls in userportal/page.tsx
 *
 * This test ensures authentication works correctly for meal plan access.
 * Reference: TESTING_WORKFLOW.md - Bug-to-Test Process
 */

import { test, expect } from '@playwright/test'
import { login } from './helpers/auth-helper'

test.describe('User Portal Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Login using mocked authentication
    await login(page)
  })

  test('should load meal plans with authentication', async ({ page }) => {
    // Navigate to user portal
    await page.goto('/userportal')

    // Verify the meal plan selector is visible
    const mealPlanSelector = page.getByTestId('meal-plan-selector-heading')
    await expect(mealPlanSelector).toBeVisible()

    // Wait for meal plan data to load
    await page.waitForSelector('[data-testid="monthly-calendar-heading"]', {
      timeout: 10000
    })

    // Verify calendar is displayed
    const calendar = page.getByTestId('monthly-calendar-heading')
    await expect(calendar).toBeVisible()

    // Verify no "Access Denied" error message
    const accessDenied = page.locator('text="Access Denied"')
    await expect(accessDenied).not.toBeVisible()

    // Verify meal plan data loaded (should show recipe names, not "Loading...")
    await page.waitForTimeout(2000) // Give time for API call

    const loadingText = page.locator('text="Loading..."')
    await expect(loadingText).not.toBeVisible()

    // Verify at least one recipe is visible in the calendar
    const recipeButtons = page.locator('button:has-text("🍽️")')
    const count = await recipeButtons.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should send session cookies with API requests', async ({ page, context }) => {
    // Intercept API request to verify credentials are sent
    let credentialsIncluded = false

    await page.route('**/api/meal-plans**', (route) => {
      const headers = route.request().headers()

      // Check if Cookie header is present (indicates credentials: 'include' worked)
      if (headers['cookie']) {
        credentialsIncluded = true
      }

      route.continue()
    })

    // Navigate to user portal
    await page.goto('/userportal')

    // Wait for API call
    await page.waitForTimeout(2000)

    // Verify credentials were sent
    expect(credentialsIncluded).toBe(true)
  })

  test('should load shopping list with authentication', async ({ page }) => {
    await page.goto('/userportal')

    // Click the shopping list button
    const shoppingListButton = page.locator('button:has-text("Copy List")')
    await expect(shoppingListButton).toBeVisible()

    // Intercept shopping list API call
    let apiCalled = false
    await page.route('**/api/shopping-list**', (route) => {
      apiCalled = true
      route.continue()
    })

    await shoppingListButton.click()

    // Verify API was called
    await page.waitForTimeout(1000)
    expect(apiCalled).toBe(true)

    // Verify success message
    const copiedMessage = page.locator('text="Copied!"')
    await expect(copiedMessage).toBeVisible({ timeout: 3000 })
  })

  test('should load recipe details with authentication', async ({ page }) => {
    await page.goto('/userportal')

    // Wait for meal plan to load
    await page.waitForTimeout(3000)

    // Find a clickable recipe button (not disabled)
    const recipeButton = page.locator('button:has-text("🍽️")').first()

    // Click the recipe to open modal
    await recipeButton.click()

    // Verify recipe modal opens with data
    await expect(page.locator('.fixed.inset-0.bg-black\\/50')).toBeVisible()

    // Verify recipe details are loaded (ingredients, instructions)
    await expect(page.locator('text="Ingredients"')).toBeVisible()
    await expect(page.locator('text="Instructions"')).toBeVisible()
  })

  test('should handle diet plan selection with authentication', async ({ page }) => {
    await page.goto('/userportal')

    // Select a different diet plan
    const vegetarianButton = page.locator('button:has-text("Vegetarian")')
    await vegetarianButton.click()

    // Wait for new meal plan to load
    await page.waitForTimeout(2000)

    // Verify calendar updated (should not show error)
    const calendar = page.getByTestId('monthly-calendar-heading')
    await expect(calendar).toBeVisible()

    // Verify no access denied message
    const accessDenied = page.locator('text="Access Denied"')
    await expect(accessDenied).not.toBeVisible()
  })

  test('should handle month/year selection with authentication', async ({ page }) => {
    await page.goto('/userportal')

    // Change month selection
    const monthSelect = page.locator('select').first()
    await monthSelect.selectOption({ label: 'November' })

    // Wait for new meal plan to load
    await page.waitForTimeout(2000)

    // Verify calendar shows November
    await expect(page.locator('text="November"')).toBeVisible()
  })

  test('should download PDF with authentication', async ({ page }) => {
    await page.goto('/userportal')

    // Intercept PDF download request
    let pdfRequested = false
    await page.route('**/api/download-pdf**', (route) => {
      const headers = route.request().headers()

      // Verify credentials are sent
      if (headers['cookie']) {
        pdfRequested = true
      }

      route.continue()
    })

    // Click download PDF button
    const downloadButton = page.locator('button:has-text("Download PDF")')
    await downloadButton.click()

    // Verify PDF API was called with credentials
    await page.waitForTimeout(1000)
    expect(pdfRequested).toBe(true)
  })
})

test.describe('Authentication Error Handling', () => {
  test('should show error when not authenticated', async ({ page }) => {
    // Go to userportal without logging in
    await page.goto('/userportal')

    // Should either redirect to login or show access denied
    await page.waitForTimeout(2000)

    const currentUrl = page.url()
    const isOnLogin = currentUrl.includes('/login')
    const hasAccessDenied = await page.locator('text="Access Denied"').isVisible()

    // One of these should be true
    expect(isOnLogin || hasAccessDenied).toBe(true)
  })
})

/**
 * Regression Prevention Notes:
 *
 * Before Fix (app/userportal/page.tsx line 221):
 *   fetch(`/api/meal-plans?menuType=...`)
 *   ❌ No session cookie sent
 *   ❌ API returns 401/403
 *   ❌ User sees no meal plans
 *
 * After Fix:
 *   fetch(`/api/meal-plans?menuType=...`, { credentials: 'include' })
 *   ✅ Session cookie sent
 *   ✅ API authenticates user
 *   ✅ User sees their meal plans
 *
 * These tests ensure credentials are always included in API calls.
 * If these tests fail, DO NOT remove them - FIX THE CODE!
 */
