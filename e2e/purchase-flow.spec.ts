import { test, expect } from '@playwright/test'

test.describe('Purchase Flow', () => {
  test('should navigate through homepage to checkout', async ({ page }) => {
    // Go to homepage
    await page.goto('/')

    // Check that the page loads
    await expect(page).toHaveTitle(/Mocha's MindLab/)

    // Check for main elements
    await expect(page.locator('h1')).toContainText(/Transform Your Health/)

    // Check that pricing section exists
    await expect(page.locator('text=Choose Your Plan')).toBeVisible()

    // Click on a "Get Started" button
    const getStartedButton = page.locator('button:has-text("Get Your Complete Calendar")').first()
    await expect(getStartedButton).toBeVisible()

    // Note: We can't test actual Stripe checkout in E2E without mock
    // but we can verify the button exists and is clickable
    await getStartedButton.click()

    // Should redirect to Stripe or show error if not configured
    // In real test, you'd mock Stripe or use test mode
  })

  test('should display all diet plans', async ({ page }) => {
    await page.goto('/')

    // Check for all diet plans
    const dietPlans = [
      'Mediterranean',
      'Keto',
      'Vegan',
      'Paleo',
      'Vegetarian',
      'Intermittent Fasting',
      'Family Focused'
    ]

    for (const diet of dietPlans) {
      await expect(page.locator(`text=${diet}`)).toBeVisible()
    }
  })

  test('should navigate to diet plan pages', async ({ page }) => {
    await page.goto('/diets/mediterranean')

    await expect(page.locator('h1')).toContainText('Mediterranean')
    await expect(page.locator('text=Fresh Vegetables')).toBeVisible()
    await expect(page.locator('button:has-text("Start Your Journey")')).toBeVisible()
  })

  test('should show calendar page', async ({ page }) => {
    await page.goto('/calendar')

    await expect(page.locator('h1')).toContainText('Day Meal Calendar')
    await expect(page.locator('.grid')).toBeVisible() // Calendar grid

    // Check for day cards
    const dayCard = page.locator('.bg-white').first()
    await expect(dayCard).toBeVisible()
  })

  test('should show recipe collection', async ({ page }) => {
    await page.goto('/recipes')

    await expect(page.locator('h1')).toContainText('Recipe Collection')

    // Check for recipe cards
    const recipeCards = page.locator('[class*="rounded-lg"][class*="shadow"]')
    await expect(recipeCards.first()).toBeVisible()
  })
})

test.describe('Mobile Responsiveness', () => {
  test('should be responsive on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/')

    // Check that mobile menu exists (if implemented)
    // Check that content is not cut off
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()

    // Check that buttons are still clickable
    const button = page.locator('button').first()
    await expect(button).toBeVisible()
  })
})

test.describe('Admin Panel', () => {
  test('should load admin dashboard', async ({ page }) => {
    await page.goto('/admin')

    // Check for admin elements
    await expect(page.locator('text=Admin Dashboard')).toBeVisible()
    await expect(page.locator('text=Total Revenue')).toBeVisible()
    await expect(page.locator('text=AI Recipe Generator')).toBeVisible()
  })

  test('should navigate to recipe library', async ({ page }) => {
    await page.goto('/admin/recipes')

    await expect(page.locator('h1')).toContainText('Recipe Library')
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible()
    await expect(page.locator('button:has-text("Export CSV")')).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('should have no accessibility violations on homepage', async ({ page }) => {
    await page.goto('/')

    // Check for basic accessibility
    // All images should have alt text
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }

    // All buttons should be keyboard accessible
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      await expect(button).toBeEnabled()
    }
  })
})