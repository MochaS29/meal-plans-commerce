# 🔧 USER INPUTS REQUIRED - Configuration Checklist

This document tracks all inputs, content, and configuration you need to provide to complete Phase 1 & 2 features.

---

## ✅ PHASE 1: User Preferences Foundation

### 1. Database Migration (REQUIRED)
**File:** `supabase/migrations/004_create_user_preferences.sql`

**Action Required:**
1. Go to https://supabase.com/dashboard
2. Navigate to your project → SQL Editor
3. Copy the entire contents of `004_create_user_preferences.sql`
4. Run the SQL to create the `user_preferences` table
5. Verify the table exists in Table Editor

**Status:** ⏳ PENDING

---

### 2. Integrate Preferences Form into User Portal (OPTIONAL - UX Enhancement)
**File:** `app/userportal/page.tsx`

**Action Required:**
Add a "Preferences" tab or button to show the preferences form:

```tsx
import PreferencesForm from '@/components/PreferencesForm'

// Add a button/tab in your user portal:
<button onClick={() => setActiveTab('preferences')}>
  ⚙️ My Preferences
</button>

// Show the form:
{activeTab === 'preferences' && <PreferencesForm />}
```

**Status:** ⏳ OPTIONAL

---

## ✅ PHASE 2: AI Features & Member Resources

### 3. Anthropic API Key (REQUIRED for AI Chatbot)
**File:** `.env.local`

**Action Required:**
1. Go to https://console.anthropic.com/settings/keys
2. Create a new API key
3. Add to `.env.local`:

```bash
# Anthropic Claude API for Recipe Q&A Chatbot
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
```

**Cost Estimate:**
- ~$0.003 per conversation (4-5 messages)
- ~$3-10/month for moderate usage (1000-3000 questions)

**Status:** ⏳ REQUIRED (chatbot won't work without this)

---

### 4. Customize AI Chatbot System Prompt (OPTIONAL)
**File:** `app/api/recipe-qa/route.ts` (lines 57-85)

**Action Required:**
Edit the `systemPrompt` variable to match your brand voice:

```typescript
const systemPrompt = `You are an AI wellness chef assistant for [YOUR BRAND NAME].

Your expertise includes:
- [List your specific areas]

Guidelines:
- [Your tone and style]
- [Your specific recommendations]
`
```

**Status:** ⏳ OPTIONAL (works with defaults, but customize for your brand)

---

### 5. Member Resources Database Migration (REQUIRED)
**File:** `supabase/migrations/005_create_member_resources.sql`

**Action Required:**
1. Go to https://supabase.com/dashboard → SQL Editor
2. Copy the entire contents of `005_create_member_resources.sql`
3. Run the SQL to create `member_resources` and `member_resource_views` tables
4. Verify tables exist

**Status:** ⏳ REQUIRED

---

### 6. Create Member Resource Content (REQUIRED for $29/month value)
**Files:** Database entries in `member_resources` table

**Action Required:**
Replace placeholder content in the database with your actual guides. Use the Supabase dashboard or create an admin interface.

**Content Categories Needed:**
- **Meal Prep Guides** (3-5 articles)
  - Sunday meal prep strategies
  - Batch cooking techniques
  - Storage and reheating tips

- **Nutrition Guides** (3-5 articles)
  - Understanding macros
  - Reading nutrition labels
  - Portion control strategies

- **Cooking Techniques** (5-10 guides)
  - Knife skills
  - Cooking methods (sautéing, roasting, etc.)
  - Flavor building

- **Meal Planning Tips** (3-5 articles)
  - Budget meal planning
  - Family meal planning
  - Meal prep for dietary restrictions

**Content Format:** Markdown or HTML
**Recommended Length:** 500-1500 words each

**Status:** ⏳ REQUIRED (currently has placeholders)

---

### 7. Add Member Resources to User Portal (OPTIONAL - UX Enhancement)
**File:** `app/userportal/page.tsx` or create `app/resources/page.tsx`

**Action Required:**
Create a resources library page:

```tsx
'use client'
import { useEffect, useState } from 'react'

export default function ResourcesPage() {
  const [resources, setResources] = useState([])

  useEffect(() => {
    fetch('/api/member-resources')
      .then(r => r.json())
      .then(data => setResources(data.resources))
  }, [])

  return (
    <div>
      <h1>Member Resources</h1>
      {resources.map(resource => (
        <div key={resource.id}>
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <Link href={`/resources/${resource.slug}`}>Read More</Link>
        </div>
      ))}
    </div>
  )
}
```

**Status:** ⏳ OPTIONAL

---

## ✅ PHASE 3: Polish & Delivery Automation

### 11. Email Delivery with PDF Attachments (REQUIRED for automated delivery)
**File:** `lib/email-with-attachments.ts` (infrastructure ready)

**Action Required:**
Integrate email delivery into your Stripe webhook after successful payment:

```typescript
// In app/api/stripe-webhook/route.ts after payment.succeeded event:
import { sendMealPlanEmail } from '@/lib/email-with-attachments'
import { SimpleMealPlanPDFGenerator } from '@/lib/pdf-generator-simple'

// Generate PDF
const pdfGenerator = new SimpleMealPlanPDFGenerator()
const pdfBlob = await pdfGenerator.generateMealPlanPDF(mealPlanData, {
  name: customerName,
  email: customerEmail
})
const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer())

// Send email with PDF attachment
await sendMealPlanEmail({
  to: customerEmail,
  customerName: customerName,
  dietPlan: 'Mediterranean Diet',
  pdfBuffer: pdfBuffer,
  purchaseDetails: {
    productName: 'Mediterranean Meal Plan',
    amount: 7900,
    purchaseDate: new Date().toLocaleDateString()
  }
})
```

**What it does:**
- Automatically sends PDF calendar to customers after purchase
- Beautiful HTML email template included
- Supports attachments (PDF meal plans)

**Status:** ⏳ REQUIRED (infrastructure built, needs webhook integration)

---

### 12. Custom Domain Email (OPTIONAL - Professional branding)
**File:** `.env.local`

**Action Required:**
1. Verify your custom domain with Resend
2. Update EMAIL_FROM in `.env.local`:

```bash
# Change from:
EMAIL_FROM=Mindful Meal Plan <onboarding@resend.dev>

# To:
EMAIL_FROM=Mindful Meal Plan <recipes@mindfulmealplan.com>
# or
EMAIL_FROM=Mocha's MindLab <noreply@mochasmindlab.com>
```

**Benefits:**
- Professional branding
- Better email deliverability
- Customer trust

**Status:** ⏳ OPTIONAL (sandbox works fine for testing)

---

### 13. Shopping List Optimization (OPTIONAL - Better UX)
**File:** `lib/shopping-list-optimizer.ts` (infrastructure ready)

**Action Required:**
Integrate optimized shopping lists into your PDF generation:

```typescript
import {
  generateWeeklyShoppingList,
  generateShoppingListText
} from '@/lib/shopping-list-optimizer'

// In your PDF generator or meal plan API:
const weekRecipes = getRecipesForWeek(mealPlan, weekNumber)
const optimizedList = await generateWeeklyShoppingList(weekRecipes, familySize)
const printableList = generateShoppingListText(optimizedList)

// Add to PDF or display in UI
```

**What it does:**
- Groups ingredients by store section (Produce, Dairy, Meat, etc.)
- Combines duplicate ingredients (e.g., "2 cups milk" + "1 cup milk" = "3 cups milk")
- Optimizes shopping flow for efficiency

**Expand ingredient mapping:**
- Edit `INGREDIENT_CATEGORIES` in `lib/shopping-list-optimizer.ts`
- Add your commonly used ingredients

**Status:** ⏳ OPTIONAL (basic shopping lists work, this adds polish)

---

### 14. Nutritional Dashboard Display (OPTIONAL - Analytics)
**File:** `components/NutritionalDashboard.tsx` (component ready)

**Action Required:**
Add nutritional tracking to user portal:

```tsx
import NutritionalDashboard from '@/components/NutritionalDashboard'

// In app/userportal/page.tsx:
const weekData = await getUserWeeklyNutrition(userId, currentWeek)

<NutritionalDashboard
  weeklyData={weekData}
  dailyTarget={userPreferences.nutritionTargets}
  currentWeek={currentWeek}
/>
```

**What it displays:**
- Weekly calorie/macro averages
- Visual progress bars vs. targets
- Macronutrient distribution pie charts
- Wellness insights and tips

**Data needed:**
Create API to aggregate nutritional data from user's selected meals

**Status:** ⏳ OPTIONAL (nice-to-have analytics feature)

---

### 15. Connect User Preferences to Meal Plan Generation (IMPORTANT)
**Files:** Custom plan generation flow

**Action Required:**
Build the bridge between user preferences (Phase 1) and AI recipe generation:

1. **After custom plan purchase:**
   - Show PreferencesForm to collect family details
   - Store preferences in database

2. **When generating custom plan:**
   - Fetch user preferences from database
   - Pass to AI recipe generator
   - Filter recipes using `lib/recipeFiltering.ts`
   - Generate personalized PDF

**Pseudo-code:**
```typescript
// After $99 custom family plan purchase
const userPreferences = await getUserPreferences(userId)

// Use preferences to generate plan
const recipes = await generatePersonalizedRecipes({
  familySize: userPreferences.family_size,
  dietaryRestrictions: userPreferences.dietary_restrictions,
  allergies: userPreferences.allergies,
  kidFriendly: userPreferences.kid_friendly_required,
  maxPrepTime: userPreferences.max_prep_time
})

// Filter and score recipes
const filteredRecipes = filterAndScoreRecipes(recipes, userPreferences)

// Generate PDF and email
```

**Status:** ⏳ IMPORTANT (connects Phase 1 + 2 + 3)

---

### 16. Custom Plan Processing Workflow (REQUIRED for $99 plan)
**Files:** Background job or cron task

**Action Required:**
Implement 24-hour custom plan delivery workflow:

**Option A: Simple approach (manual)**
1. Customer purchases $99 custom plan
2. Email sent: "We'll deliver within 24 hours"
3. You manually generate plan using admin tools
4. You manually send email with PDF

**Option B: Automated approach (recommended)**
1. Customer purchases → preferences form shown
2. Preferences saved → AI generation job queued
3. 24 hours later → cron job generates plan
4. PDF generated → email sent automatically

**Recommended tools:**
- Vercel Cron Jobs (free tier: 1 job/day)
- Or: Supabase Edge Functions with pg_cron
- Or: Simple Node.js script run daily

**Status:** ⏳ REQUIRED (manual works, automation scales better)

---

## 📦 OPTIONAL ENHANCEMENTS

### 8. Install Anthropic SDK (if not already installed)
**Action Required:**
```bash
npm install @anthropic-ai/sdk
```

**Status:** ⏳ CHECK IF NEEDED

---

### 9. Subscription-Based Access Control (OPTIONAL)
**File:** `app/api/recipe-qa/route.ts` (lines 24-33)

**Action Required:**
Uncomment the subscription check code if you want to restrict AI chatbot to monthly subscribers only:

```typescript
const hasMonthlySubscription = session.purchases.some(p =>
  p.productId === 'monthly-calendar' && p.status === 'active'
)
if (!hasMonthlySubscription) {
  return NextResponse.json(
    { error: 'This feature is only available for monthly subscribers' },
    { status: 403 }
  )
}
```

**Status:** ⏳ OPTIONAL (currently available to all authenticated users)

---

### 10. Add Chatbot to User Portal (OPTIONAL)
**File:** `app/userportal/page.tsx` or `app/layout.tsx`

**Action Required:**
Import and render the chatbot component (it appears as a floating button):

```tsx
import RecipeQAChatbot from '@/components/RecipeQAChatbot'

// Add anywhere in your layout:
<RecipeQAChatbot />
```

**Status:** ⏳ OPTIONAL (chatbot component ready, just needs to be added to UI)

---

## 🎯 SUMMARY - What You Need To Do

### CRITICAL (App Won't Work Without These):
1. ✅ Apply `004_create_user_preferences.sql` migration
2. ✅ Apply `005_create_member_resources.sql` migration
3. ✅ Add `ANTHROPIC_API_KEY` to `.env.local`
4. ✅ Integrate email delivery into Stripe webhook (Phase 3)
5. ✅ Build custom plan processing workflow (manual or automated)

### IMPORTANT (Features Incomplete Without These):
6. ⏳ Create actual member resource content (replace placeholders)
7. ⏳ Connect user preferences to meal plan generation
8. ⏳ Add resources page to user portal UI
9. ⏳ Add chatbot component to user portal UI
10. ⏳ Add preferences form to user portal UI

### OPTIONAL (Polish & Enhancements):
11. ⏳ Integrate shopping list optimization
12. ⏳ Add nutritional dashboard to user portal
13. ⏳ Set up custom domain email
14. ⏳ Customize AI system prompt for your brand
15. ⏳ Add subscription-based access control

---

## 📁 FILES CREATED IN THIS BUILD

### Phase 1 - User Preferences:
```
supabase/migrations/004_create_user_preferences.sql
app/api/user/preferences/route.ts
lib/recipeFiltering.ts
components/PreferencesForm.tsx
```

### Phase 2 - AI & Resources:
```
app/api/recipe-qa/route.ts
supabase/migrations/005_create_member_resources.sql
app/api/member-resources/route.ts
app/api/member-resources/[slug]/route.ts
components/RecipeQAChatbot.tsx (created earlier)
```

### Phase 3 - Polish & Delivery:
```
lib/email-with-attachments.ts
lib/shopping-list-optimizer.ts
components/NutritionalDashboard.tsx
lib/pdf-generator.ts (already existed)
app/api/download-pdf/route.ts (already existed)
app/api/shopping-list/route.ts (already existed)
```

---

## 🚀 TESTING CHECKLIST

### Phase 1 - User Preferences:
- [ ] User preferences form loads and saves
- [ ] Preferences API returns data at `/api/user/preferences`
- [ ] Recipe filtering engine respects allergies/dietary restrictions

### Phase 2 - AI & Resources:
- [ ] AI chatbot responds to questions (requires API key)
- [ ] Member resources list appears at `/api/member-resources`
- [ ] Individual resources load at `/api/member-resources/[slug]`
- [ ] Resource views are tracked in database

### Phase 3 - Delivery & Polish:
- [ ] PDF generation works at `/api/download-pdf?menuType=mediterranean&month=1`
- [ ] Emails send with PDF attachments after purchase
- [ ] Shopping lists are optimized and grouped by store section
- [ ] Nutritional dashboard displays weekly averages
- [ ] Custom family plan workflow delivers within 24 hours

---

## 💡 NEED HELP?

- **Supabase Issues:** Check https://supabase.com/docs
- **Anthropic API Issues:** Check https://docs.anthropic.com
- **Content Ideas:** Look at competitor member areas for inspiration
- **Cost Concerns:** Start with lower AI usage limits and scale up

---

**Last Updated:** October 22, 2025
**Phase Status:** Phases 1, 2, & 3 infrastructure complete, awaiting user inputs and integration
