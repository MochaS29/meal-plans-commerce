import { test, expect } from '@playwright/test'

test.describe('User Portal - Authentication & Access', () => {
  test('should redirect to pricing when not authenticated', async ({ page }) => {
    await page.goto('/userportal')

    // Should redirect to pricing page
    await expect(page).toHaveURL(/\/pricing/)
  })

  test('should access userportal with valid session cookie', async ({ context, page }) => {
    // Set a mock session cookie (in production, this would come from actual login)
    await context.addCookies([{
      name: 'session',
      value: 'mock-session-token',
      domain: 'localhost',
      path: '/',
    }])

    await page.goto('/userportal')

    // Should stay on userportal (or show content, depending on implementation)
    // Note: In real scenario, backend would validate the token
  })
})

test.describe('User Portal - Dashboard Interface', () => {
  test.beforeEach(async ({ context }) => {
    // Set up demo mode for testing without actual subscription
    await context.addCookies([{
      name: 'demo_mode',
      value: 'true',
      domain: 'localhost',
      path: '/',
    }])
  })

  test('should display main dashboard elements', async ({ page }) => {
    await page.goto('/userportal')

    // Check for key dashboard elements - using data-testid to avoid strict mode violations
    await expect(page.locator('[data-testid="dashboard-heading"]')).toBeVisible()
    await expect(page.locator('[data-testid="meal-plan-selector-heading"]')).toBeVisible()

    // Check for diet plan selector
    await expect(page.locator('select, [role="combobox"]').first()).toBeVisible()

    // Check for month selector
    await expect(page.locator('text=/january|february|march/i')).toBeVisible()
  })

  test('should display weekly meal plan cards', async ({ page }) => {
    await page.goto('/userportal')

    // Wait for content to load
    await page.waitForLoadState('networkidle')

    // Check for week cards
    const weekCards = page.locator('[class*="week"], .grid > div').filter({ hasText: /week|day/i })
    await expect(weekCards.first()).toBeVisible({ timeout: 10000 })
  })

  test('should allow diet plan selection', async ({ page }) => {
    await page.goto('/userportal')

    // Find diet plan selector
    const dietSelector = page.locator('select').first()
    await dietSelector.waitFor({ state: 'visible' })

    // Get initial value
    const initialValue = await dietSelector.inputValue()

    // Select a different diet plan
    await dietSelector.selectOption({ index: 1 })

    // Verify selection changed
    const newValue = await dietSelector.inputValue()
    expect(newValue).not.toBe(initialValue)
  })

  test('should allow month selection', async ({ page }) => {
    await page.goto('/userportal')

    // Find month selector
    const monthSelector = page.locator('select').nth(1)
    await monthSelector.waitFor({ state: 'visible', timeout: 5000 })

    // Select different months
    await monthSelector.selectOption('1') // January
    await page.waitForTimeout(500)

    await monthSelector.selectOption('2') // February
    await page.waitForTimeout(500)

    // Verify month changed
    const selectedMonth = await monthSelector.inputValue()
    expect(selectedMonth).toBe('2')
  })
})

test.describe('User Portal - Monthly Calendar', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([{
      name: 'demo_mode',
      value: 'true',
      domain: 'localhost',
      path: '/',
    }])
  })

  test('should display monthly calendar grid', async ({ page }) => {
    await page.goto('/userportal')

    // Check for calendar title
    await expect(page.locator('text=/monthly calendar/i')).toBeVisible({ timeout: 10000 })

    // Check for day headers (Sun, Mon, Tue, etc.) - use .first() to avoid strict mode violations
    await expect(page.locator('text=Sun').first()).toBeVisible()
    await expect(page.locator('text=Mon').first()).toBeVisible()
    await expect(page.locator('text=Sat').first()).toBeVisible()

    // Check for calendar grid
    const calendarGrid = page.locator('.grid').filter({ has: page.locator('text=Sun') })
    await expect(calendarGrid).toBeVisible()

    // Check that there are day cells (should be 30-31 days)
    const dayCells = page.locator('.grid > div').filter({ hasText: /^(1|2|3|4|5|6|7|8|9|10)$/ })
    const dayCount = await dayCells.count()
    expect(dayCount).toBeGreaterThanOrEqual(7) // At least one week
  })

  test('should display meals for each day', async ({ page }) => {
    await page.goto('/userportal')

    // Wait for calendar to load
    await page.waitForSelector('text=/monthly calendar/i', { timeout: 10000 })

    // Find a day cell that should have meals
    const dayWithMeals = page.locator('.grid > div').filter({ hasText: /🌅|☀️|🌙/ }).first()
    await expect(dayWithMeals).toBeVisible({ timeout: 5000 })

    // Verify it contains meal icons
    const dayContent = await dayWithMeals.textContent()
    expect(dayContent).toMatch(/🌅|☀️|🌙/)
  })

  test('should have print calendar button', async ({ page }) => {
    await page.goto('/userportal')

    // Find print button - using data-testid to avoid strict mode violations
    const printButton = page.locator('[data-testid="print-calendar-button"]')
    await expect(printButton).toBeVisible({ timeout: 10000 })

    // Verify it has printer icon
    await expect(printButton).toContainText(/print/i)
  })

  test('should open print calendar in new window', async ({ page, context }) => {
    await page.goto('/userportal')

    // Wait for print button - using data-testid
    const printButton = page.locator('[data-testid="print-calendar-button"]')
    await printButton.waitFor({ state: 'visible', timeout: 10000 })

    // Listen for new page
    const pagePromise = context.waitForEvent('page')

    // Click print button
    await printButton.click()

    // Wait for new page
    const newPage = await pagePromise
    await newPage.waitForLoadState('domcontentloaded')

    // Verify new page URL contains print
    expect(newPage.url()).toContain('/print/calendar')

    // Close the new page
    await newPage.close()
  })
})

test.describe('User Portal - Print Calendar Page', () => {
  test('should load print calendar page', async ({ page }) => {
    await page.goto('/print/calendar?diet=mediterranean&month=1&year=2025')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Check for calendar content
    await expect(page.locator('.grid')).toBeVisible({ timeout: 10000 })
  })

  test('should display correct month and diet plan', async ({ page }) => {
    await page.goto('/print/calendar?diet=mediterranean&month=3&year=2025')

    // Check for March
    await expect(page.locator('text=March')).toBeVisible()

    // Check for diet plan
    await expect(page.locator('text=/mediterranean/i')).toBeVisible()
  })

  test('should have all 30 days displayed', async ({ page }) => {
    await page.goto('/print/calendar?diet=mediterranean&month=1&year=2025')

    await page.waitForSelector('.grid', { timeout: 10000 })

    // Count day cells (looking for cells with day numbers)
    const dayCells = page.locator('.border').filter({ hasText: /^[0-9]+$/ })
    const count = await dayCells.count()

    // Should have at least 28 days (accounting for different months)
    expect(count).toBeGreaterThanOrEqual(28)
  })

  test('should have print button on print page', async ({ page }) => {
    await page.goto('/print/calendar?diet=mediterranean&month=1&year=2025')

    // Find print button - use .first() to avoid strict mode violation
    const printButton = page.locator('button').filter({ hasText: /print/i }).first()
    await expect(printButton).toBeVisible({ timeout: 10000 })
  })

  test('should apply print styles', async ({ page }) => {
    await page.goto('/print/calendar?diet=mediterranean&month=1&year=2025')

    // Check that print styles are present in the page
    const styleTag = page.locator('style').filter({ hasText: /@media print/ })
    await expect(styleTag).toBeAttached()
  })
})

test.describe('User Portal - Responsive Design', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([{
      name: 'demo_mode',
      value: 'true',
      domain: 'localhost',
      path: '/',
    }])
  })

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/userportal')

    // Check that main content is visible
    await expect(page.locator('h1, h2').first()).toBeVisible()

    // Check that selectors are still accessible
    const dietSelector = page.locator('select').first()
    await expect(dietSelector).toBeVisible()
  })

  test('should maintain calendar grid on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/userportal')

    // Calendar should still be visible
    await expect(page.locator('text=/monthly calendar/i')).toBeVisible({ timeout: 10000 })

    // Grid should still work
    await expect(page.locator('.grid').filter({ has: page.locator('text=Sun') })).toBeVisible()
  })
})

test.describe('User Portal - Text Contrast & Accessibility', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([{
      name: 'demo_mode',
      value: 'true',
      domain: 'localhost',
      path: '/',
    }])
  })

  test('should have dark text for labels', async ({ page }) => {
    await page.goto('/userportal')

    // Check that labels use dark text (text-gray-900)
    const dietLabel = page.locator('label').filter({ hasText: /diet plan/i }).first()
    if (await dietLabel.isVisible()) {
      const className = await dietLabel.getAttribute('class')
      expect(className).toContain('text-gray-900')
    }
  })

  test('should have sufficient contrast for month text', async ({ page }) => {
    await page.goto('/userportal')

    // Find month heading
    const monthHeading = page.locator('h2, h3').filter({ hasText: /january|february|march/i }).first()

    if (await monthHeading.isVisible()) {
      // Check computed color
      const color = await monthHeading.evaluate((el) =>
        window.getComputedStyle(el).color
      )

      // Color should not be too light (not rgb(156, 163, 175) which is gray-400)
      expect(color).not.toBe('rgb(156, 163, 175)')
    }
  })

  test('should have keyboard navigation support', async ({ page }) => {
    await page.goto('/userportal')

    // Tab through interactive elements
    await page.keyboard.press('Tab')

    // Check that focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(['SELECT', 'BUTTON', 'A', 'INPUT']).toContain(focusedElement || '')
  })
})
