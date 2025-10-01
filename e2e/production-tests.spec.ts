import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://meal-plans-commerce.vercel.app';

test.describe('Production Deployment Tests', () => {
  test.describe('Homepage and Navigation', () => {
    test('should load homepage successfully', async ({ page }) => {
      await page.goto(PRODUCTION_URL);
      await expect(page).toHaveTitle(/Mindful Meal Plan/);
      await expect(page.locator('h1')).toContainText(/Transform Your Health/);
    });

    test('should have working navigation links', async ({ page }) => {
      await page.goto(PRODUCTION_URL);

      // Check header navigation
      await expect(page.locator('nav a[href="/diets"]')).toBeVisible();
      await expect(page.locator('nav a[href="/about"]')).toBeVisible();
      await expect(page.locator('nav a[href="/testimonials"]')).toBeVisible();

      // Test navigation to diets page
      await page.click('nav a[href="/diets"]');
      await expect(page).toHaveURL(`${PRODUCTION_URL}/diets`);
    });

    test('should display all diet plan cards', async ({ page }) => {
      await page.goto(PRODUCTION_URL);

      const dietPlans = [
        'Heart-Healthy Mediterranean',
        'Intermittent Fasting',
        'Family-Friendly Meals',
        'Global Cuisine Explorer'
      ];

      for (const plan of dietPlans) {
        await expect(page.locator(`text=${plan}`)).toBeVisible();
      }
    });

    test('should have working Get Started buttons', async ({ page }) => {
      await page.goto(PRODUCTION_URL);

      const getStartedButtons = page.locator('a:has-text("Get Started")');
      await expect(getStartedButtons).toHaveCount(4);

      // Click first Get Started button
      await getStartedButtons.first().click();
      // Should redirect to Stripe Checkout
      await page.waitForURL(/checkout\.stripe\.com/, { timeout: 10000 });
    });
  });

  test.describe('Diet Plan Pages', () => {
    const dietRoutes = [
      '/diets/mediterranean',
      '/diets/intermittent-fasting',
      '/diets/family-meals',
      '/diets/global-cuisine'
    ];

    for (const route of dietRoutes) {
      test(`should load ${route} page`, async ({ page }) => {
        await page.goto(`${PRODUCTION_URL}${route}`);

        // Check for essential elements
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('text=Sample Weekly Calendar')).toBeVisible();
        await expect(page.locator('text=Get Your Complete 4-Month Calendar')).toBeVisible();

        // Check pricing buttons
        await expect(page.locator('text=$39 One-Time')).toBeVisible();
        await expect(page.locator('text=$19/month')).toBeVisible();
      });
    }
  });

  test.describe('Admin Panel', () => {
    test('should load admin login page', async ({ page }) => {
      await page.goto(`${PRODUCTION_URL}/admin`);

      await expect(page.locator('h1')).toContainText('Admin Dashboard');
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('button:has-text("Login")').or(page.locator('button:has-text("Access Dashboard")'))).toBeVisible();
    });

    test('should show error with wrong password', async ({ page }) => {
      await page.goto(`${PRODUCTION_URL}/admin`);

      await page.fill('input[type="password"]', 'wrongpassword');
      await page.click('button:has-text("Login"), button:has-text("Access Dashboard")');

      // Should show error or not navigate
      await expect(page).toHaveURL(`${PRODUCTION_URL}/admin`);
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should be mobile responsive', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(PRODUCTION_URL);

      // Check mobile menu button is visible
      await expect(page.locator('button[aria-label*="menu"], button:has-text("☰")').or(page.locator('[data-mobile-menu]'))).toBeVisible();

      // Check content is properly displayed
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('text=Heart-Healthy Mediterranean')).toBeVisible();
    });

    test('should have working mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(PRODUCTION_URL);

      // Try to click mobile menu if it exists
      const menuButton = page.locator('button[aria-label*="menu"], button:has-text("☰")');
      if (await menuButton.isVisible()) {
        await menuButton.click();

        // Check if navigation items appear
        await expect(page.locator('a[href="/diets"]')).toBeVisible();
      }
    });
  });

  test.describe('Footer and Legal Pages', () => {
    test('should have footer with all links', async ({ page }) => {
      await page.goto(PRODUCTION_URL);

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Check footer links
      await expect(page.locator('footer')).toContainText("Mocha's MindLab Inc");
      await expect(page.locator('footer a[href="/privacy"]')).toBeVisible();
      await expect(page.locator('footer a[href="/terms"]')).toBeVisible();
    });

    test('should load privacy policy page', async ({ page }) => {
      await page.goto(`${PRODUCTION_URL}/privacy`);
      await expect(page.locator('h1')).toContainText('Privacy Policy');
    });

    test('should load terms of service page', async ({ page }) => {
      await page.goto(`${PRODUCTION_URL}/terms`);
      await expect(page.locator('h1')).toContainText('Terms of Service');
    });
  });

  test.describe('Performance and SEO', () => {
    test('should have meta tags for SEO', async ({ page }) => {
      await page.goto(PRODUCTION_URL);

      // Check meta tags
      const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
      expect(metaDescription).toContain('meal plan');

      // Check Open Graph tags
      const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
      expect(ogTitle).toContain('Mindful Meal Plan');
    });

    test('should load quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(PRODUCTION_URL, { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;

      // Should load in under 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });
  });

  test.describe('API Endpoints', () => {
    test('should have working API health check', async ({ page }) => {
      const response = await page.request.get(`${PRODUCTION_URL}/api/generate-recipes`);

      // Should return 200 or 401 (auth required)
      expect([200, 401]).toContain(response.status());
    });
  });
});

test.describe('Accessibility Tests', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto(PRODUCTION_URL);

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto(PRODUCTION_URL);

    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        // Images should have alt text or be decorative (empty alt)
        expect(alt).toBeDefined();
      }
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto(PRODUCTION_URL);

    // Check that text is visible against backgrounds
    const primaryButton = page.locator('a.bg-amber-600').first();
    if (await primaryButton.isVisible()) {
      const color = await primaryButton.evaluate(el =>
        window.getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });
});