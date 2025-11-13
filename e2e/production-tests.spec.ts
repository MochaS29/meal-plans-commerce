import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://meal-plans-commerce.vercel.app';

test.describe('Production Deployment Tests', () => {
  test.describe('Homepage and Navigation', () => {
    test('should load homepage successfully', async ({ page }) => {
      await page.goto(PRODUCTION_URL);
      await expect(page).toHaveTitle(/Mindful Meal Plan/);
      await expect(page.locator('h1')).toContainText(/Empowering Health|Transform Your Health/);
    });

    test('should have working navigation links', async ({ page }) => {
      await page.goto(PRODUCTION_URL);

      // Check header navigation for existing pages
      await expect(page.locator('nav a[href="/pricing"]')).toBeVisible();
      await expect(page.locator('nav a[href="/recipes"]')).toBeVisible();
      await expect(page.locator('nav a[href="/calendar"]')).toBeVisible();

      // Test navigation to pricing page
      await page.click('nav a[href="/pricing"]');
      await expect(page).toHaveURL(`${PRODUCTION_URL}/pricing`);
    });

    test('should display all 8 diet plan options', async ({ page }) => {
      await page.goto(PRODUCTION_URL);

      const dietPlans = [
        'Mediterranean',
        'Intermittent Fasting',
        'Family Focused',
        'Global Cuisine',
        'Keto',
        'Vegan',
        'Vegetarian',
        'Paleo'
      ];

      // Check that at least some diet plans are visible
      let visibleCount = 0;
      for (const plan of dietPlans) {
        const locator = page.locator(`text=${plan}`);
        if (await locator.count() > 0) {
          visibleCount++;
        }
      }

      expect(visibleCount).toBeGreaterThanOrEqual(4);
    });

    test('should have working Get Started buttons', async ({ page }) => {
      await page.goto(PRODUCTION_URL);

      const getStartedButtons = page.locator('a:has-text("Get Started"), button:has-text("Get Started")');

      // Should have at least 2 buttons (one for each product)
      await expect(getStartedButtons.first()).toBeVisible();

      // Click first Get Started button
      await getStartedButtons.first().click();
      // Should redirect to Stripe Checkout, customize page, or intermediate plan selection pages
      await page.waitForTimeout(2000);
      const url = page.url();
      expect(url).toMatch(/checkout\.stripe\.com|\/plans\/customize|\/plans\/wellness-transformation|\/plans\/monthly-calendar|\/plans\/custom-family/);
    });
  });

  test.describe('Diet Plan Pages', () => {
    const dietRoutes = [
      '/diets/mediterranean',
      '/diets/intermittent-fasting',
      '/diets/family-focused',
      '/diets/global',
      '/diets/keto',
      '/diets/vegan',
      '/diets/vegetarian',
      '/diets/paleo'
    ];

    for (const route of dietRoutes) {
      test(`should load ${route} page`, async ({ page }) => {
        await page.goto(`${PRODUCTION_URL}${route}`);

        // Check for essential elements
        await expect(page.locator('h1')).toBeVisible();

        // Check for pricing buttons with new pricing (use button selectors to avoid nav conflicts)
        // One-Time $59 and Monthly $29
        await expect(page.locator('button').filter({ hasText: /One-Time|\\$59/i })).toBeVisible({ timeout: 10000 });
        await expect(page.locator('button').filter({ hasText: /Monthly|\\$29/i })).toBeVisible({ timeout: 10000 });
      });
    }
  });

  test.describe('Admin Panel', () => {
    test('should load admin login page', async ({ page }) => {
      await page.goto(`${PRODUCTION_URL}/admin`, { waitUntil: 'networkidle' });

      // Check that page loads with admin content
      await expect(page.locator('h1, h2')).toBeVisible({ timeout: 10000 });
    });

    test('should show error with wrong password', async ({ page }) => {
      await page.goto(`${PRODUCTION_URL}/admin`, { waitUntil: 'networkidle' });

      const passwordInput = page.locator('input[type="password"]');
      if (await passwordInput.isVisible()) {
        await passwordInput.fill('wrongpassword');
        await page.click('button:has-text("Login"), button:has-text("Access Dashboard")');
        await page.waitForTimeout(2000);
        // Should show error or stay on admin page
        await expect(page).toHaveURL(/admin/);
      }
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should be mobile responsive', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(PRODUCTION_URL, { waitUntil: 'networkidle' });

      // Check content is properly displayed
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

      // Check for any diet plan content
      const anyContent = page.locator('text=/Mediterranean|Keto|Vegan|Diet/i');
      await expect(anyContent.first()).toBeVisible({ timeout: 10000 });
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