# 🧪 Testing Workflow - Bug Found → Test Added

## Purpose

**Every bug found in manual testing or production MUST result in a new automated test.** This prevents regressions and ensures the bug never happens again.

---

## Table of Contents

1. [Quick Workflow](#quick-workflow)
2. [Bug Categories](#bug-categories)
3. [When to Write Tests](#when-to-write-tests)
4. [Test Templates](#test-templates)
5. [Test Coverage Gaps](#test-coverage-gaps)
6. [Running Tests](#running-tests)

---

## Quick Workflow

### When You Find a Bug

```
┌─────────────────────────────────────────────┐
│ 1. Document the Bug                         │
│    - What broke?                            │
│    - How to reproduce?                      │
│    - Expected vs actual behavior?           │
└─────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│ 2. Fix the Bug                              │
│    - Make the code changes                  │
│    - Test manually to verify fix            │
└─────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│ 3. Write Automated Test                     │
│    - Create test that would have caught it  │
│    - Use templates in this document         │
│    - Add to appropriate test file           │
└─────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│ 4. Verify Test Fails Without Fix            │
│    - Revert your fix temporarily            │
│    - Run the test → should FAIL             │
│    - Re-apply fix                           │
│    - Run test → should PASS                 │
└─────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│ 5. Commit Both Fix + Test Together          │
│    - git add (fixed files + test file)      │
│    - git commit "Fix: [bug] + Add test"     │
└─────────────────────────────────────────────┘
```

---

## Bug Categories

### Category 1: UI/UX Bugs

**Example**: Button not working, form not submitting, wrong text displayed

**Test Type**: E2E Test (Playwright)
**File Location**: `e2e/[feature].spec.ts`

**Template**:
```typescript
test('should [describe expected behavior]', async ({ page }) => {
  // Navigate to page
  await page.goto('/path/to/page')

  // Perform actions that triggered the bug
  await page.locator('[data-testid="button-id"]').click()

  // Assert expected outcome
  await expect(page.locator('[data-testid="result"]')).toBeVisible()
})
```

### Category 2: API Bugs

**Example**: Endpoint returning wrong data, authentication failing

**Test Type**: Unit Test (Jest)
**File Location**: `__tests__/api/[endpoint].test.ts`

**Template**:
```typescript
import { GET } from '@/app/api/endpoint/route'
import { NextRequest } from 'next/server'

describe('API /api/endpoint', () => {
  it('should [describe expected behavior]', async () => {
    const request = new NextRequest('http://localhost:3000/api/endpoint')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('expectedField')
  })
})
```

### Category 3: Business Logic Bugs

**Example**: Recipe filtering wrong, pricing calculation incorrect

**Test Type**: Unit Test (Jest)
**File Location**: `__tests__/lib/[module].test.ts`

**Template**:
```typescript
import { functionName } from '@/lib/module'

describe('functionName()', () => {
  it('should [describe expected behavior]', () => {
    const input = { /* test input */ }
    const result = functionName(input)

    expect(result).toEqual(expectedOutput)
  })
})
```

### Category 4: Database/Data Bugs

**Example**: Query returning wrong results, missing records

**Test Type**: Integration Test
**File Location**: `__tests__/integration/[feature].test.ts`

**Template**:
```typescript
import { createClient } from '@supabase/supabase-js'

describe('Database: [feature]', () => {
  it('should [describe expected behavior]', async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from('table_name')
      .select('*')
      .eq('field', 'value')

    expect(error).toBeNull()
    expect(data).toHaveLength(expectedCount)
  })
})
```

---

## When to Write Tests

### ✅ ALWAYS Write Tests For:

1. **Buttons Not Working**
   - Click events not firing
   - Wrong navigation
   - Missing functionality

2. **Forms Not Submitting**
   - Validation failures
   - Data not saving
   - Incorrect error messages

3. **Authentication Issues**
   - Login failing
   - Session expiring incorrectly
   - Protected routes accessible without auth

4. **Payment/Checkout Bugs**
   - Stripe checkout not opening
   - Wrong amount charged
   - Metadata not passed correctly

5. **Data Display Issues**
   - Wrong data shown
   - Missing fields
   - Incorrect calculations

6. **API Response Errors**
   - 404/500 errors
   - Wrong data format
   - Missing fields in response

### 📝 Document (But Maybe Not Test):

1. **Visual/Design Issues**
   - Color slightly off
   - Font size preference
   - Spacing adjustments

2. **Performance Issues**
   - Page loading slowly (unless >3 seconds)
   - Minor optimization opportunities

3. **Content Changes**
   - Typos
   - Wording improvements

---

## Test Templates

### Template 1: Button Click Test

**Use When**: Button found not working during manual testing

```typescript
// File: e2e/[page-name].spec.ts

test('should [action] when [button name] is clicked', async ({ page }) => {
  await page.goto('/page-url')

  // Find button by data-testid (preferred) or text
  const button = page.locator('[data-testid="button-id"]')
  await expect(button).toBeVisible()
  await expect(button).toBeEnabled()

  // Click button
  await button.click()

  // Assert result (choose one or more):

  // Option 1: Navigation occurred
  await expect(page).toHaveURL(/expected-url/)

  // Option 2: Content appeared/changed
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible()

  // Option 3: API call made (check network)
  await page.waitForResponse(response =>
    response.url().includes('/api/endpoint') && response.status() === 200
  )

  // Option 4: State changed
  const newText = await page.locator('[data-testid="element"]').textContent()
  expect(newText).toBe('Expected Text')
})
```

### Template 2: Form Submission Test

**Use When**: Form found not submitting correctly

```typescript
// File: e2e/[feature].spec.ts

test('should submit form with valid data', async ({ page }) => {
  await page.goto('/form-page')

  // Fill form fields
  await page.fill('[data-testid="input-email"]', 'test@example.com')
  await page.fill('[data-testid="input-name"]', 'John Doe')
  await page.check('[data-testid="checkbox-terms"]')

  // Submit form
  const submitButton = page.locator('[data-testid="submit-button"]')
  await submitButton.click()

  // Assert success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible()

  // OR verify navigation
  await expect(page).toHaveURL(/success/)
})

test('should show validation errors for invalid data', async ({ page }) => {
  await page.goto('/form-page')

  // Submit without filling
  const submitButton = page.locator('[data-testid="submit-button"]')
  await submitButton.click()

  // Assert error messages
  await expect(page.locator('[data-testid="error-email"]')).toContainText('required')
})
```

### Template 3: API Endpoint Test

**Use When**: API returning wrong data or failing

```typescript
// File: __tests__/api/[endpoint-name].test.ts

import { GET, POST } from '@/app/api/endpoint/route'
import { NextRequest } from 'next/server'

describe('GET /api/endpoint', () => {
  it('should return expected data structure', async () => {
    const request = new NextRequest('http://localhost:3000/api/endpoint?param=value')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toMatchObject({
      expectedField: expect.any(String),
      expectedArray: expect.arrayContaining([expect.any(Object)])
    })
  })

  it('should handle missing parameters', async () => {
    const request = new NextRequest('http://localhost:3000/api/endpoint')

    const response = await GET(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data).toHaveProperty('error')
  })
})

describe('POST /api/endpoint', () => {
  it('should create resource with valid data', async () => {
    const request = new NextRequest('http://localhost:3000/api/endpoint', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', value: 123 })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data).toHaveProperty('id')
  })
})
```

### Template 4: Business Logic Test

**Use When**: Function returning wrong result

```typescript
// File: __tests__/lib/[module-name].test.ts

import { functionName } from '@/lib/module'

describe('functionName()', () => {
  it('should handle normal case correctly', () => {
    const input = { /* valid input */ }
    const result = functionName(input)

    expect(result).toEqual(expectedOutput)
  })

  it('should handle edge case: empty input', () => {
    const result = functionName({})

    expect(result).toEqual(defaultValue)
  })

  it('should handle edge case: null/undefined', () => {
    expect(() => functionName(null)).not.toThrow()
  })

  it('should handle invalid input gracefully', () => {
    const invalidInput = { /* bad data */ }

    expect(() => functionName(invalidInput)).toThrow('Expected error message')
  })
})
```

### Template 5: Authentication Test

**Use When**: Login/auth bugs found

```typescript
// File: e2e/authentication.spec.ts

test('should login successfully with valid credentials', async ({ page }) => {
  await page.goto('/login')

  await page.fill('[data-testid="email"]', 'test@example.com')
  await page.fill('[data-testid="password"]', 'ValidPassword123')
  await page.click('[data-testid="login-button"]')

  // Should redirect to dashboard
  await expect(page).toHaveURL(/\/dashboard/)

  // Should have session cookie
  const cookies = await page.context().cookies()
  const sessionCookie = cookies.find(c => c.name === 'session')
  expect(sessionCookie).toBeDefined()
})

test('should show error for invalid credentials', async ({ page }) => {
  await page.goto('/login')

  await page.fill('[data-testid="email"]', 'wrong@example.com')
  await page.fill('[data-testid="password"]', 'WrongPassword')
  await page.click('[data-testid="login-button"]')

  // Should show error
  await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid')

  // Should stay on login page
  await expect(page).toHaveURL(/\/login/)
})

test('should redirect to login when accessing protected route', async ({ page }) => {
  await page.goto('/dashboard')

  // Should redirect to login
  await expect(page).toHaveURL(/\/login/)
})
```

---

## Test Coverage Gaps

### Current Coverage Analysis

Based on SYSTEM_DOCUMENTATION.md, here are areas needing more tests:

#### ✅ Well-Tested Areas

1. **Public Pages** (`e2e/purchase-flow.spec.ts`)
   - Homepage ✅
   - Diet plan pages ✅
   - Calendar page ✅
   - Pricing page ✅

2. **User Portal** (`e2e/user-portal.spec.ts`)
   - Dashboard ✅
   - Month selection ✅
   - Calendar display ✅
   - Print functionality ✅

#### ❌ Missing/Weak Test Areas

1. **Meal Plan Generation Workflow**
   - [ ] Stripe webhook creates meal_plan_jobs correctly
   - [ ] Cron job processes jobs in correct order
   - [ ] Recipe generation with Claude AI
   - [ ] Image generation with Replicate
   - [ ] PDF generation and upload
   - [ ] Email delivery

2. **Historical Meal Plan Access** (NEW FEATURE - Nov 2025)
   - [ ] API `/api/meal-plans?listAll=true` returns user's plans
   - [ ] API filters by month/year correctly
   - [ ] Fallback to most recent plan works
   - [ ] User can select previous months in UI

3. **Ingredient Filtering** (NEW FEATURE - Nov 2025)
   - [ ] "no X" hard filter (0% tolerance)
   - [ ] "less X" reduce filter (~10% usage)
   - [ ] "more X" increase preference
   - [ ] Recipes respect all filters

4. **Customize Page**
   - [ ] Diet selection saves to checkout metadata
   - [ ] Family size increases recipe servings
   - [ ] Allergies passed to Stripe
   - [ ] Preferences passed to Stripe
   - [ ] Checkout button creates session correctly

5. **Admin Panel**
   - [ ] Recipe library displays all recipes
   - [ ] Search/filter recipes works
   - [ ] Generate recipe button works
   - [ ] Delete recipe works
   - [ ] Sales dashboard shows correct metrics

6. **Image Generation** (CRITICAL - Recently Fixed)
   - [ ] Replicate stream handling works
   - [ ] Base64 encoding correct
   - [ ] Supabase upload successful
   - [ ] Image URLs returned correctly
   - [ ] Fallback to DALL-E/Imagen if Replicate fails

---

## Running Tests

### Run All Tests

```bash
# Run all unit tests
npm test

# Run all e2e tests
npm run test:e2e

# Run specific test file
npm test -- generate-recipes.test.ts

# Run e2e in headed mode (see browser)
npm run test:e2e -- --headed

# Run tests in watch mode
npm test -- --watch
```

### Test Before Commit

**Git Hook** - Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "Running tests before commit..."

# Run unit tests
npm test -- --passWithNoTests

# Run e2e tests (optional - slower)
# npm run test:e2e

if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Commit aborted."
  exit 1
fi

echo "✅ All tests passed!"
```

---

## Real-World Examples

### Example 1: Button Not Working Bug

**Bug Found**: "Get Started" button on pricing page doesn't navigate to /plans/customize

**Steps Taken**:

1. **Document**: Button click does nothing, expected navigation to /plans/customize

2. **Fix**:
   ```typescript
   // BEFORE (broken)
   <button>Get Started</button>

   // AFTER (fixed)
   <Link href="/plans/customize">
     <button>Get Started</button>
   </Link>
   ```

3. **Write Test**:
   ```typescript
   // File: e2e/purchase-flow.spec.ts

   test('should navigate to customize page when Get Started clicked', async ({ page }) => {
     await page.goto('/pricing')

     const getStartedButton = page.locator('[data-testid="get-started-one-time"]')
     await expect(getStartedButton).toBeVisible()

     await getStartedButton.click()

     // Should navigate to customize page
     await expect(page).toHaveURL(/\/plans\/customize/)
   })
   ```

4. **Verify**: Revert fix → test FAILS ✅, Re-apply fix → test PASSES ✅

5. **Commit**: `git commit -m "Fix: Get Started button navigation + Add e2e test"`

### Example 2: API Returning Wrong Data

**Bug Found**: `/api/meal-plans?listAll=true` returns plans for all users, not just authenticated user

**Steps Taken**:

1. **Document**: API leaking data from other users

2. **Fix**:
   ```typescript
   // BEFORE (broken)
   const { data: jobs } = await supabase
     .from('meal_plan_jobs')
     .select('*')

   // AFTER (fixed)
   const { data: jobs } = await supabase
     .from('meal_plan_jobs')
     .select('*')
     .eq('customer_email', userEmail)  // ← Added filter
   ```

3. **Write Test**:
   ```typescript
   // File: __tests__/api/meal-plans.test.ts

   test('should return only authenticated user meal plans', async () => {
     // Create mock request with session cookie
     const request = new NextRequest('http://localhost:3000/api/meal-plans?listAll=true', {
       headers: {
         Cookie: 'session=MOCK_JWT_FOR_USER_A'
       }
     })

     const response = await GET(request)
     const data = await response.json()

     // Should only return USER_A's plans
     expect(data.mealPlans).toHaveLength(2)  // USER_A has 2 plans
     expect(data.mealPlans.every(p =>
       p.email === 'userA@example.com'
     )).toBe(true)
   })
   ```

4. **Verify**: Without fix → test FAILS ✅, With fix → test PASSES ✅

5. **Commit**: `git commit -m "Security: Fix meal plans data leak + Add API test"`

---

## Best Practices

### ✅ DO

1. **Write tests IMMEDIATELY after finding bug** - Don't wait
2. **Test should fail without your fix** - Verify it catches the bug
3. **Use data-testid for stable selectors** - `[data-testid="button-id"]`
4. **Test both success and error cases**
5. **Keep tests simple and focused** - One assertion per test when possible
6. **Add descriptive test names** - "should [expected behavior]"
7. **Commit fix + test together** - Never commit one without the other

### ❌ DON'T

1. **Skip writing test because "it's obvious"** - Bugs happen!
2. **Write test that depends on other tests** - Each test should be independent
3. **Use brittle selectors** - Avoid CSS classes that might change
4. **Test implementation details** - Test behavior, not internal code
5. **Write flaky tests** - If test fails randomly, fix it before committing
6. **Forget to run tests before push** - Always run `npm test`

---

## Tracking Test Coverage

### View Coverage Report

```bash
# Generate coverage report
npm run test:coverage

# Open coverage report
open coverage/lcov-report/index.html
```

### Coverage Goals

| Component | Current | Target |
|-----------|---------|--------|
| API Routes | ~30% | 80% |
| Business Logic | ~20% | 90% |
| UI Components | ~60% | 75% |
| Integration | ~10% | 60% |

---

## Questions?

**"What if the bug is hard to reproduce?"**
- Create a test with the specific conditions that trigger it
- Use mocks/fixtures to simulate the scenario
- Document the reproduction steps in test comments

**"What if I don't know how to write the test?"**
- Use templates in this document
- Look at similar existing tests
- Ask team member for help
- Document the bug in GitHub Issue if stuck

**"What if the test is too slow?"**
- Unit tests should be <100ms
- E2E tests can be slower (<5s per test)
- Use mocks to speed up external API calls
- Group related tests in same describe block

---

**Last Updated**: November 18, 2025
**Maintained By**: Development Team
**Review Frequency**: Monthly

