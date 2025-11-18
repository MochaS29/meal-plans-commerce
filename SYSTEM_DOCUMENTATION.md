# 🏗️ Complete System Documentation

## Mocha's MindLab - AI-Powered Meal Plans E-Commerce Platform

**Version**: 2.0
**Last Updated**: November 18, 2025
**Purpose**: Complete blueprint for recreating the entire platform from scratch

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture](#2-architecture)
3. [Database Schema](#3-database-schema)
4. [API Endpoints](#4-api-endpoints)
5. [Meal Plan Generation Workflow](#5-meal-plan-generation-workflow)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [Payment Processing](#7-payment-processing)
8. [AI Integration](#8-ai-integration)
9. [Environment Setup](#9-environment-setup)
10. [Deployment Guide](#10-deployment-guide)
11. [Testing & Verification](#11-testing--verification)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. System Overview

### 1.1 What This Platform Does

An AI-powered e-commerce platform that sells personalized monthly meal plans. Customers select a diet type, customize their preferences, purchase via Stripe, and receive a professionally designed PDF with 42+ recipes tailored to their needs.

### 1.2 Core Features

- **8 Diet Plan Types**: Mediterranean, Keto, Vegan, Paleo, Vegetarian, Intermittent Fasting, Family Focused, Global Cuisine
- **Flexible Pricing**: $59 one-time or $29/month subscription
- **AI-Powered Personalization**: Claude generates recipes based on family size, allergies, preferences
- **Background Processing**: Meal plans generated asynchronously (2-4 hours)
- **Beautiful PDFs**: Professional design with cover images, full recipes, nutrition info
- **Historical Access**: Users can access all previously purchased months
- **Admin Dashboard**: Manage recipes, view sales, track generation jobs

### 1.3 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 15 (App Router), React 18, TypeScript | Server-rendered pages, API routes |
| **Styling** | Tailwind CSS, Framer Motion | Responsive design, animations |
| **Database** | Supabase (PostgreSQL) | User data, recipes, meal plans |
| **Payments** | Stripe Checkout & Subscriptions | Payment processing, webhooks |
| **AI - Recipes** | Claude 3 Haiku (Anthropic) | Recipe generation |
| **AI - Images** | Replicate (FLUX-schnell) | Food photography generation |
| **PDF Generation** | PDFKit | Professional meal plan PDFs |
| **Storage** | Supabase Storage + Vercel Blob | Recipe images, PDFs |
| **Authentication** | JWT with jose library | Session management |
| **Deployment** | Vercel | Serverless hosting, auto-deploy |
| **Cron Jobs** | Vercel Cron | Background meal plan processing |

### 1.4 User Flows

#### Customer Journey

```
1. Browse diet plans → /diets/{slug}
2. Click "Get Started" → /plans/customize
3. Select diet type, family size, preferences
4. Choose pricing (one-time or subscription)
5. Stripe Checkout → payment
6. Webhook creates meal_plan_job
7. Background processing (2-4 hours)
   - Generate 42 recipes with Claude AI
   - Generate food images with Replicate
   - Create PDF
8. Email with PDF link sent
9. Access via /dashboard
10. Lifetime access to purchased plans
```

#### Admin Journey

```
1. Login → /admin
2. View sales dashboard
3. Browse recipes → /admin/recipes
4. Generate new recipes on-demand
5. Export customer data
6. Monitor meal plan job status
```

---

## 2. Architecture

### 2.1 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  Next.js 15 + React 18 + Tailwind CSS                          │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────────┐  │
│  │  Public  │ Customer │  Admin   │  Auth    │   Checkout   │  │
│  │  Pages   │Dashboard │Dashboard │  Pages   │   Stripe     │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER (Next.js)                      │
│  /app/api/*  - Serverless API Routes                           │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────────┐  │
│  │  Auth    │ Payments │  Recipes │  Meal    │    Cron      │  │
│  │  APIs    │  Stripe  │  APIs    │  Plans   │    Jobs      │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                       │
│  /lib/* - Core application logic                               │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────────┐  │
│  │   Auth   │  Stripe  │ Recipe   │  Image   │     PDF      │  │
│  │ (JWT)    │  Client  │Generator │Generator │   Generator  │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     EXTERNAL SERVICES                           │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────────┐  │
│  │ Supabase │  Stripe  │ Claude   │Replicate │    Vercel    │  │
│  │PostgreSQL│ Payments │   AI     │  Images  │    Blob      │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow - Meal Plan Generation

```
PURCHASE → WEBHOOK → JOB CREATION → PROCESSING → DELIVERY
   ↓          ↓            ↓              ↓          ↓
Stripe    Creates      Queues in    Cron runs   Email
Checkout  database     meal_plan    every 10    with PDF
          record       _jobs        minutes     link
```

### 2.3 Directory Structure

```
meal-plans-commerce/
├── app/                          # Next.js 15 App Router
│   ├── (public)/                # Public pages
│   │   ├── page.tsx            # Homepage
│   │   ├── pricing/            # Pricing page
│   │   ├── calendar/           # Sample calendar
│   │   └── diets/[slug]/       # Diet plan pages
│   ├── admin/                  # Admin dashboard
│   │   ├── page.tsx           # Sales dashboard
│   │   └── recipes/           # Recipe management
│   ├── dashboard/             # Customer portal
│   │   └── page.tsx          # User's meal plans
│   ├── login/                # Authentication
│   ├── plans/                # Plan selection
│   │   └── customize/        # Customization page
│   └── api/                  # API routes (34 endpoints)
│       ├── auth/             # Login, signup, magic links
│       ├── stripe-webhook/   # Payment webhooks
│       ├── meal-plans/       # Meal plan APIs
│       ├── cron/             # Background jobs
│       └── admin/            # Admin APIs
├── components/               # React components
│   ├── Header.tsx           # Site navigation
│   ├── Footer.tsx           # Site footer
│   └── CheckoutButton.tsx  # Stripe integration
├── lib/                     # Core business logic
│   ├── stripe.ts           # Stripe configuration
│   ├── supabase.ts         # Database client
│   ├── auth.ts             # JWT authentication
│   ├── ai-recipe-generator.ts      # Claude integration
│   ├── ai-image-generator.ts       # Replicate integration
│   ├── pdf-generator.ts            # PDF creation
│   ├── recipeFiltering.ts          # Ingredient filtering
│   └── hybrid-recipe-selector.ts   # Recipe selection logic
├── supabase/               # Database migrations
│   └── migrations/         # SQL schema files
├── public/                 # Static assets
└── __tests__/             # Test files
```

---

## 3. Database Schema

### 3.1 Core Tables

#### 3.1.1 users

User accounts and authentication.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    stripe_customer_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);
```

#### 3.1.2 purchases

Order history and transactions.

```sql
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,      -- Amount in cents
    currency VARCHAR(3) DEFAULT 'usd',
    status VARCHAR(50) DEFAULT 'pending',  -- pending, completed, failed
    diet_plan TEXT,              -- Diet type purchased
    pdf_url TEXT,                -- Link to generated PDF
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_stripe_session_id ON purchases(stripe_session_id);
CREATE INDEX idx_purchases_status ON purchases(status);
```

#### 3.1.3 subscriptions

Recurring subscription tracking.

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',  -- active, cancelled, past_due
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

#### 3.1.4 meal_plan_jobs

**CRITICAL TABLE** - Background job queue for meal plan generation.

```sql
CREATE TABLE meal_plan_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Customer identification
    customer_email TEXT NOT NULL,
    stripe_session_id TEXT NOT NULL UNIQUE,
    product_type TEXT NOT NULL CHECK (product_type IN ('one_time', 'subscription')),

    -- Customization data
    diet_type TEXT NOT NULL,
    family_size INTEGER DEFAULT 4,
    dietary_needs JSONB DEFAULT '[]'::jsonb,
    allergies TEXT,              -- "no kiwi, no peppers"
    preferences TEXT,            -- "less fish, more red meat"
    customizations JSONB DEFAULT '{}'::jsonb,

    -- Processing status
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    error_message TEXT,

    -- Recipe tracking
    recipe_count INTEGER,
    pdf_url TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processing_started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,

    -- Meal plan period
    month INTEGER,               -- 1-12
    year INTEGER,                -- e.g., 2025
    days_in_month INTEGER,       -- 28, 29, 30, or 31

    -- Multi-phase processing
    current_phase INTEGER DEFAULT 1,
    total_phases INTEGER DEFAULT 5,
    generated_recipes JSONB DEFAULT '[]'::jsonb,  -- Array of recipe objects
    phase_progress TEXT DEFAULT '',

    CONSTRAINT fk_customer_email FOREIGN KEY (customer_email)
        REFERENCES users(email) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_meal_plan_jobs_status ON meal_plan_jobs(status);
CREATE INDEX idx_meal_plan_jobs_customer_email ON meal_plan_jobs(customer_email);
CREATE INDEX idx_meal_plan_jobs_created_at ON meal_plan_jobs(created_at);
CREATE INDEX idx_meal_plan_jobs_stripe_session ON meal_plan_jobs(stripe_session_id);
```

**generated_recipes JSONB Structure**:

```json
[
  {
    "id": "uuid",
    "name": "Recipe Name",
    "description": "Brief description",
    "meal_type": "dinner|breakfast|dessert",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy|medium|hard",
    "image_url": "https://...supabase.co/.../image.jpg",
    "recipe_ingredients": [
      {
        "ingredient": "chicken breast",
        "amount": "1",
        "unit": "pound"
      }
    ],
    "recipe_instructions": [
      {
        "step_number": 1,
        "instruction": "Preheat oven to 375°F"
      }
    ],
    "recipe_nutrition": [
      {
        "calories": 450,
        "protein": 35,
        "carbs": 20,
        "fat": 25,
        "fiber": 5
      }
    ]
  }
]
```

#### 3.1.5 recipes

AI-generated recipe library (for admin browsing and reuse).

```sql
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    prep_time INTEGER,         -- Minutes
    cook_time INTEGER,         -- Minutes
    servings INTEGER DEFAULT 4,
    difficulty TEXT,           -- easy, medium, hard
    diet_plans TEXT[],         -- Array: ['mediterranean', 'keto']
    meal_type TEXT,            -- breakfast, lunch, dinner, dessert
    image_url TEXT,            -- Replicate-generated image
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_recipes_diet_plans ON recipes USING GIN(diet_plans);
CREATE INDEX idx_recipes_meal_type ON recipes(meal_type);
```

#### 3.1.6 recipe_ingredients

Ingredients for each recipe.

```sql
CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient TEXT NOT NULL,
    amount TEXT,               -- "1", "1/2", "2"
    unit TEXT,                 -- "cup", "pound", "tablespoon"
    notes TEXT,
    order_index INTEGER
);

CREATE INDEX idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
```

#### 3.1.7 recipe_instructions

Step-by-step cooking instructions.

```sql
CREATE TABLE recipe_instructions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    instruction TEXT NOT NULL
);

CREATE INDEX idx_recipe_instructions_recipe_id ON recipe_instructions(recipe_id);
```

#### 3.1.8 recipe_nutrition

Nutritional information per serving.

```sql
CREATE TABLE recipe_nutrition (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    calories INTEGER,
    protein DECIMAL,           -- Grams
    carbs DECIMAL,             -- Grams
    fat DECIMAL,               -- Grams
    fiber DECIMAL              -- Grams
);

CREATE INDEX idx_recipe_nutrition_recipe_id ON recipe_nutrition(recipe_id);
```

### 3.2 Database Relationships

```
users (1) ──< purchases (many)
users (1) ──< subscriptions (many)
users (1) ──< meal_plan_jobs (many)

recipes (1) ──< recipe_ingredients (many)
recipes (1) ──< recipe_instructions (many)
recipes (1) ──< recipe_nutrition (1)

meal_plan_jobs.generated_recipes → JSONB array (denormalized for performance)
```

### 3.3 Row Level Security (RLS)

```sql
-- Users can only see their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plan_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON users FOR SELECT
    USING (auth.uid()::TEXT = id::TEXT);

CREATE POLICY "Users can view own purchases"
    ON purchases FOR SELECT
    USING (user_id::TEXT = auth.uid()::TEXT);

CREATE POLICY "Users can view own meal plan jobs"
    ON meal_plan_jobs FOR SELECT
    USING (customer_email = auth.jwt() ->> 'email');
```

---

## 4. API Endpoints

### 4.1 Authentication APIs

#### POST /api/auth/signup
Create new user account.

**Request**:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "secure-password"
}
```

**Response**:
```json
{
  "success": true,
  "user": { "id": "uuid", "email": "user@example.com" }
}
```

#### POST /api/auth/login
Authenticate user and create session.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "secure-password"
}
```

**Response**:
```json
{
  "success": true,
  "session": "jwt-token"
}
```

Sets `session` cookie with JWT token.

#### POST /api/auth/logout
Destroy user session.

**Response**:
```json
{
  "success": true
}
```

#### POST /api/auth/magic-link
Send passwordless login link via email.

**Request**:
```json
{
  "email": "user@example.com"
}
```

### 4.2 Payment APIs

#### POST /api/create-checkout-session
Create Stripe Checkout session for purchase.

**Request**:
```json
{
  "priceType": "one_time" | "subscription",
  "dietType": "mediterranean",
  "familySize": 5,
  "dietaryNeeds": ["kid-friendly"],
  "allergies": "no kiwi, no peppers",
  "preferences": "less fish, more red meat"
}
```

**Response**:
```json
{
  "sessionId": "cs_live_...",
  "url": "https://checkout.stripe.com/..."
}
```

#### POST /api/stripe-webhook
Receive Stripe webhook events.

**Events Handled**:
- `checkout.session.completed` - Create meal_plan_job
- `customer.subscription.updated` - Update subscription status
- `customer.subscription.deleted` - Cancel subscription

### 4.3 Meal Plan APIs

#### GET /api/meal-plans?listAll=true
**NEW** - List all meal plans for authenticated user.

**Response**:
```json
{
  "mealPlans": [
    {
      "id": "uuid",
      "dietType": "family-focused",
      "month": 11,
      "year": 2025,
      "recipeCount": 42,
      "pdfUrl": "https://...pdf",
      "displayName": "family-focused - November 2025"
    }
  ],
  "total": 2
}
```

#### GET /api/meal-plans?menuType=X&month=Y&year=Z
Get specific meal plan by diet type, month, and year.

**Response**:
```json
{
  "title": "Family-Focused - November 2025",
  "menuType": "family-focused",
  "month": 11,
  "year": 2025,
  "dailyMeals": {
    "day_1": {
      "date": "2025-11-01",
      "dinner": {
        "name": "Cheesy Beef Taco Bake",
        "calories": 520,
        "protein": "32g",
        "prepTime": "15 min",
        "cookTime": "30 min"
      }
    }
  },
  "bonusRecipes": {
    "breakfasts": [...],
    "desserts": [...]
  },
  "isPersonalized": true
}
```

#### POST /api/generate-recipes
Generate new recipes with Claude AI (admin only).

**Request**:
```json
{
  "action": "single" | "batch",
  "dietType": "mediterranean",
  "mealType": "dinner",
  "count": 5
}
```

### 4.4 Cron Jobs (Background Processing)

#### POST /api/cron/process-meal-plans
Process pending meal plan jobs (runs every 10 minutes).

**Workflow**:
1. Find pending jobs (status='pending' OR status='processing')
2. For each job:
   - Generate 8-10 recipes per phase (5 phases total = 42 recipes)
   - Generate food images with Replicate
   - Upload images to Supabase Storage
   - Update `generated_recipes` JSONB array
   - Track progress in `current_phase` and `phase_progress`
3. After all phases complete:
   - Generate PDF with all recipes
   - Upload PDF to Vercel Blob
   - Send email with PDF link
   - Mark job as 'completed'

**Rate Limits**:
- Max 1 job processed per run (to avoid timeout)
- Max 10 minutes execution time

### 4.5 Admin APIs

#### GET /api/admin/recipes
List all recipes with filtering.

**Query Params**:
- `dietType` - Filter by diet type
- `mealType` - Filter by meal type
- `limit` - Max results (default: 50)

#### POST /api/admin/login
Admin authentication (separate from customer auth).

**Request**:
```json
{
  "adminKey": "your-admin-api-key"
}
```

---

## 5. Meal Plan Generation Workflow

### 5.1 Complete End-to-End Process

```
┌──────────────────────────────────────────────────────────────────┐
│ PHASE 0: PURCHASE                                                │
│ ────────────────────────────────────────────────────────────────│
│ 1. User selects diet type, family size, preferences             │
│ 2. Stripe Checkout created with metadata                        │
│ 3. User completes payment                                        │
│ 4. Stripe webhook fires: checkout.session.completed             │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ PHASE 1: JOB CREATION (Immediate)                               │
│ ────────────────────────────────────────────────────────────────│
│ File: app/api/stripe-webhook/route.ts                          │
│                                                                  │
│ 1. Extract metadata from Stripe session                         │
│ 2. Create meal_plan_jobs record:                               │
│    - status: 'pending'                                          │
│    - customer_email, diet_type, family_size                    │
│    - allergies, preferences from metadata                       │
│    - month, year (current or next month)                        │
│ 3. Create purchases record                                      │
│ 4. Send confirmation email                                      │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ PHASE 2-6: RECIPE GENERATION (Background, 2-4 hours)            │
│ ────────────────────────────────────────────────────────────────│
│ File: app/api/cron/process-meal-plans/route.ts                 │
│ Triggered: Every 10 minutes via Vercel Cron                     │
│                                                                  │
│ FOR EACH PHASE (5 phases total):                               │
│                                                                  │
│ 1. Query pending jobs:                                          │
│    WHERE status IN ('pending', 'processing')                    │
│    ORDER BY created_at ASC                                      │
│    LIMIT 1                                                      │
│                                                                  │
│ 2. Update status to 'processing'                                │
│                                                                  │
│ 3. Determine recipes needed for this phase:                     │
│    Phase 1: 10 dinner recipes                                  │
│    Phase 2: 10 dinner recipes                                  │
│    Phase 3: 10 dinner recipes                                  │
│    Phase 4: 7 breakfast + 5 dessert recipes                    │
│    Phase 5: None (PDF generation only)                         │
│                                                                  │
│ 4. FOR EACH RECIPE in phase:                                   │
│                                                                  │
│    a. Build AI prompt:                                          │
│       - Diet type requirements                                  │
│       - Family size (multiply servings)                         │
│       - Allergies (hard filter - 0% tolerance)                  │
│       - "less X" preferences (~10% usage)                       │
│       - "more X" preferences (increased usage)                  │
│                                                                  │
│    b. Call Claude AI (lib/ai-recipe-generator.ts):            │
│       ```typescript                                             │
│       const recipe = await generateRecipeWithClaude({          │
│         dietType: 'family-focused',                            │
│         mealType: 'dinner',                                    │
│         servings: 5,                                           │
│         avoidIngredients: ['kiwi', 'peppers'],                │
│         reduceIngredients: ['fish', 'dairy'],                 │
│         increaseIngredients: ['red meat']                     │
│       })                                                        │
│       ```                                                       │
│                                                                  │
│    c. Parse Claude response → structured JSON                  │
│                                                                  │
│    d. Generate food image (lib/ai-image-generator.ts):        │
│       - Call Replicate FLUX-schnell model                     │
│       - Receive ReadableStream                                 │
│       - Read stream chunks → buffer                            │
│       - Convert to base64                                      │
│                                                                  │
│    e. Upload image to Supabase Storage:                       │
│       ```typescript                                             │
│       const { data } = await supabase.storage                  │
│         .from('recipe-images')                                 │
│         .upload(`recipes/${recipeId}/image.jpg`, buffer)      │
│       ```                                                       │
│                                                                  │
│    f. Get public URL for image                                │
│                                                                  │
│    g. Add to generated_recipes array:                          │
│       ```sql                                                    │
│       UPDATE meal_plan_jobs                                    │
│       SET generated_recipes = generated_recipes || $1::jsonb   │
│       WHERE id = $2                                            │
│       ```                                                       │
│                                                                  │
│    h. Delay 2 seconds (rate limiting)                          │
│                                                                  │
│ 5. Increment current_phase                                      │
│ 6. Update phase_progress text                                   │
│ 7. If current_phase > total_phases → Continue to Phase 7       │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ PHASE 7: PDF GENERATION                                         │
│ ────────────────────────────────────────────────────────────────│
│ File: lib/pdf-generator.ts                                      │
│                                                                  │
│ 1. Fetch all recipes from generated_recipes JSONB               │
│                                                                  │
│ 2. Create PDF with PDFKit:                                     │
│    - Cover page with title, month/year                         │
│    - Table of contents                                         │
│    - 30-day calendar (1 dinner per day)                        │
│    - Full recipes with:                                        │
│      * Food photography image                                  │
│      * Ingredients list                                        │
│      * Step-by-step instructions                               │
│      * Nutrition facts                                         │
│    - Bonus breakfast recipes (7)                               │
│    - Bonus dessert recipes (5)                                 │
│                                                                  │
│ 3. Upload PDF to Vercel Blob Storage:                          │
│    ```typescript                                                │
│    const blob = await put(filename, pdfBuffer, {              │
│      access: 'public'                                          │
│    })                                                           │
│    ```                                                          │
│                                                                  │
│ 4. Update meal_plan_jobs:                                      │
│    - pdf_url = blob.url                                        │
│    - status = 'completed'                                      │
│    - completed_at = NOW()                                      │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ PHASE 8: EMAIL DELIVERY                                         │
│ ────────────────────────────────────────────────────────────────│
│ 1. Send email to customer_email                                │
│ 2. Email contains:                                              │
│    - Subject: "Your [Diet Type] Meal Plan is Ready!"          │
│    - PDF download link                                         │
│    - Login link to dashboard                                   │
│    - Welcome message                                            │
└──────────────────────────────────────────────────────────────────┘
```

### 5.2 Ingredient Filtering System

**Three-Tiered Filtering** (documented in INGREDIENT_FILTERING_SYSTEM.md):

1. **Hard Filters ("no X")** - 0% tolerance
   - "no kiwi" → Claude MUST NOT include kiwi
   - Applied via `avoidIngredients` parameter
   - Recipe rejected if it contains avoided ingredients

2. **Reduce Preferences ("less X")** - ~10% usage
   - "less fish" → Reduce fish recipes by 90%
   - Applied via `reduceIngredients` parameter
   - Only ~10% of recipes will use fish

3. **Increase Preferences ("more X")** - Increased usage
   - "more red meat" → Increase red meat recipes
   - Applied via `increaseIngredients` parameter
   - More recipes feature red meat prominently

**Implementation**:
```typescript
// lib/recipeFiltering.ts
export function categorizePreferences(preferences: string) {
  const avoid = extractIngredients(preferences, /no\s+([^,]+)/gi)
  const reduce = extractIngredients(preferences, /less\s+([^,]+)/gi)
  const increase = extractIngredients(preferences, /more\s+([^,]+)/gi)

  return { avoid, reduce, increase }
}
```

### 5.3 Error Handling

**Job Failure Scenarios**:

1. **Claude API Error**
   - Retry up to 3 times
   - If still fails, mark job as 'failed'
   - Store error in `error_message` column

2. **Replicate Rate Limit**
   - Delay 12 seconds between requests
   - If account < $5 credit: 6 requests/minute limit
   - Add funds to avoid rate limits

3. **PDF Generation Error**
   - Retry once
   - If fails, mark job as 'failed'
   - Email support notification

4. **Timeout (>10 minutes)**
   - Vercel Cron has 10-minute max
   - Job stays in 'processing' state
   - Next cron run picks it up and continues

---

## 6. Authentication & Authorization

### 6.1 JWT-Based Sessions

**Library**: `jose` (JWT verification)

**Flow**:
```typescript
// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose'

// Create session after login
const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const token = await new SignJWT({ email: user.email, id: user.id })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('7d')
  .sign(secret)

// Set cookie
response.cookies.set('session', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7 // 7 days
})

// Verify session
const { payload } = await jwtVerify(token, secret)
const userEmail = payload.email as string
```

### 6.2 Protected Routes

**Middleware**: Check session cookie in API routes

```typescript
// Example: /api/meal-plans/route.ts
async function getUserEmail(request: NextRequest): Promise<string | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session')?.value

  if (!sessionToken) return null

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const { payload } = await jwtVerify(sessionToken, secret)

  return payload.email as string || null
}
```

### 6.3 Admin Authentication

**Separate from customer auth** - uses API key.

```typescript
// app/api/admin/verify/route.ts
const adminKey = request.headers.get('Authorization')?.replace('Bearer ', '')

if (adminKey !== process.env.ADMIN_API_KEY) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

---

## 7. Payment Processing

### 7.1 Stripe Configuration

**Products in Stripe Dashboard**:

| Product | Price | Type | Stripe Price ID |
|---------|-------|------|----------------|
| One-Time Meal Plan | $59 | one_time | price_xxx |
| Monthly Subscription | $29/month | recurring | price_yyy |

**Metadata Passed to Stripe**:
```typescript
metadata: {
  dietType: 'family-focused',
  familySize: '5',
  dietaryNeeds: 'kid-friendly',
  allergies: 'no kiwi, no peppers',
  preferences: 'less fish, more red meat'
}
```

### 7.2 Webhook Configuration

**Endpoint**: `https://your-domain.com/api/stripe-webhook`

**Events**:
- `checkout.session.completed` - Payment succeeded
- `customer.subscription.updated` - Subscription changed
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_succeeded` - Recurring payment

**Verification**:
```typescript
import Stripe from 'stripe'

const sig = request.headers.get('stripe-signature')!
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

const event = stripe.webhooks.constructEvent(
  await request.text(),
  sig,
  webhookSecret
)
```

### 7.3 Customer Portal

**Stripe Customer Portal** - Manage subscriptions

```typescript
// app/portal/page.tsx
const session = await stripe.billingPortal.sessions.create({
  customer: user.stripe_customer_id,
  return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`
})

// Redirect to Stripe portal
redirect(session.url)
```

---

## 8. AI Integration

### 8.1 Claude AI (Recipe Generation)

**Model**: `claude-3-haiku-20240307`
**Cost**: ~$0.001 per recipe
**Library**: `@anthropic-ai/sdk`

**File**: `lib/ai-recipe-generator.ts`

**Prompt Template**:
```
You are a professional chef and nutritionist creating personalized recipes for a [DIET_TYPE] diet.

REQUIREMENTS:
- Servings: [FAMILY_SIZE]
- Meal type: [MEAL_TYPE]
- HARD RULES - NEVER include: [ALLERGIES]
- Reduce these ingredients (use in ~10% of recipes): [REDUCE_INGREDIENTS]
- Increase these ingredients (feature prominently): [INCREASE_INGREDIENTS]

NUTRITION TARGETS:
- Calories: [CALORIE_RANGE]
- Protein: [PROTEIN_TARGET]g

Return JSON with:
{
  "name": "Recipe name",
  "description": "Brief description",
  "prep_time": 15,
  "cook_time": 30,
  "servings": 4,
  "difficulty": "easy|medium|hard",
  "ingredients": [
    { "ingredient": "chicken breast", "amount": "1", "unit": "pound" }
  ],
  "instructions": [
    { "step": 1, "text": "Preheat oven to 375°F" }
  ],
  "nutrition": {
    "calories": 450,
    "protein": 35,
    "carbs": 20,
    "fat": 25,
    "fiber": 5
  }
}
```

**Implementation**:
```typescript
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const message = await anthropic.messages.create({
  model: 'claude-3-haiku-20240307',
  max_tokens: 2048,
  messages: [{
    role: 'user',
    content: prompt
  }]
})

const recipe = JSON.parse(message.content[0].text)
```

### 8.2 Replicate (Image Generation)

**Model**: `black-forest-labs/flux-schnell`
**Cost**: ~$0.003 per image
**Library**: `replicate`

**File**: `lib/ai-image-generator.ts`

**CRITICAL FIX** (November 2025) - Stream Handling:

Replicate API changed from returning URLs to returning `ReadableStream` objects.

```typescript
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
})

const output = await replicate.run('black-forest-labs/flux-schnell', {
  input: {
    prompt: `Professional food photography of ${recipeName}, ${description}`,
    num_outputs: 1,
    aspect_ratio: '1:1',
    output_format: 'jpg',
    output_quality: 90
  }
}) as any[]

const firstOutput = output[0]

// NEW: Handle stream output (ReadableStream)
if (firstOutput && typeof firstOutput === 'object' && firstOutput[Symbol.asyncIterator]) {
  const chunks: Uint8Array[] = []

  // Read all chunks from the stream
  for await (const chunk of firstOutput) {
    chunks.push(chunk)
  }

  // Concatenate all chunks into a single buffer
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  const buffer = new Uint8Array(totalLength)
  let offset = 0

  for (const chunk of chunks) {
    buffer.set(chunk, offset)
    offset += chunk.length
  }

  // Return base64 encoded image
  return {
    url: '',
    base64: Buffer.from(buffer).toString('base64')
  }
}

// Handle URL output (old API or fallback)
if (typeof firstOutput === 'string') {
  return { url: firstOutput }
}
```

**Upload to Supabase**:
```typescript
const { data, error } = await supabase.storage
  .from('recipe-images')
  .upload(`recipes/${recipeId}/image.jpg`, Buffer.from(base64, 'base64'), {
    contentType: 'image/jpeg',
    upsert: false
  })

const { data: { publicUrl } } = supabase.storage
  .from('recipe-images')
  .getPublicUrl(filename)
```

**Rate Limits**:
- Standard account (<$5 credit): 6 requests/minute
- Delay 12 seconds between requests
- Add funds to increase limit

### 8.3 PDF Generation

**Library**: `pdfkit`
**File**: `lib/pdf-generator.ts`

**Structure**:
```typescript
import PDFDocument from 'pdfkit'

const doc = new PDFDocument({ size: 'A4', margin: 50 })

// Cover page
doc.fontSize(36).text('Family-Focused Meal Plan')
doc.fontSize(24).text('November 2025')

// 30-day calendar
for (let day = 1; day <= 30; day++) {
  const recipe = dailyMeals[`day_${day}`]
  doc.fontSize(14).text(`Day ${day}: ${recipe.dinner.name}`)
}

// Full recipes with images
recipes.forEach(recipe => {
  doc.addPage()

  // Recipe image
  if (recipe.image_url) {
    const imageBuffer = await fetch(recipe.image_url).then(r => r.arrayBuffer())
    doc.image(Buffer.from(imageBuffer), { width: 400 })
  }

  // Recipe details
  doc.fontSize(24).text(recipe.name)
  doc.fontSize(12).text(recipe.description)

  // Ingredients
  recipe.ingredients.forEach(ing => {
    doc.text(`• ${ing.amount} ${ing.unit} ${ing.ingredient}`)
  })

  // Instructions
  recipe.instructions.forEach(step => {
    doc.text(`${step.step_number}. ${step.text}`)
  })
})

doc.end()

// Upload to Vercel Blob
const { url } = await put(filename, doc, { access: 'public' })
```

---

## 9. Environment Setup

### 9.1 Required Environment Variables

```env
# Stripe (https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase (https://app.supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DATABASE_URL=postgresql://...

# AI - Claude (https://console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-api03-...

# AI - Replicate (https://replicate.com/account/api-tokens)
REPLICATE_API_TOKEN=r8_...

# Admin & Security
ADMIN_API_KEY=your-secure-random-string-min-32-chars
JWT_SECRET=your-super-secret-jwt-key-min-64-chars

# Domain
NEXT_PUBLIC_DOMAIN=http://localhost:3000  # Development
# NEXT_PUBLIC_DOMAIN=https://your-domain.com  # Production

# Email (optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 9.2 Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/yourusername/meal-plans-commerce.git
cd meal-plans-commerce

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Set up database
# Go to Supabase dashboard → SQL Editor
# Run migrations in order:
# - supabase/migrations/001_initial_schema.sql
# - supabase/migrations/007_meal_plan_jobs.sql
# - scripts/add-multi-phase-support.sql

# 5. Create Supabase Storage bucket
# Go to Storage → Create bucket: "recipe-images" (public)

# 6. Run development server
npm run dev

# 7. Open browser
# http://localhost:3000
```

---

## 10. Deployment Guide

### 10.1 Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Add environment variables in Vercel Dashboard
# Settings → Environment Variables
# Copy all from .env.local

# 5. Set up Vercel Cron
# Create vercel.json:
{
  "crons": [
    {
      "path": "/api/cron/process-meal-plans",
      "schedule": "*/10 * * * *"
    }
  ]
}

# 6. Deploy again to activate cron
vercel --prod
```

### 10.2 Configure Stripe Webhook

```bash
# 1. Get your production URL from Vercel
https://your-app.vercel.app

# 2. Go to Stripe Dashboard → Webhooks
# Add endpoint: https://your-app.vercel.app/api/stripe-webhook

# 3. Select events:
# - checkout.session.completed
# - customer.subscription.updated
# - customer.subscription.deleted
# - invoice.payment_succeeded

# 4. Copy webhook secret → Add to Vercel env vars
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 10.3 Database Migrations

```sql
-- Run in Supabase SQL Editor in order:

-- 1. Initial schema
\i supabase/migrations/001_initial_schema.sql

-- 2. Meal plan jobs
\i supabase/migrations/007_meal_plan_jobs.sql

-- 3. Multi-phase support
\i scripts/add-multi-phase-support.sql

-- 4. Verify tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Expected output:
-- users
-- purchases
-- subscriptions
-- meal_plan_jobs
-- recipes
-- recipe_ingredients
-- recipe_instructions
-- recipe_nutrition
```

---

## 11. Testing & Verification

### 11.1 Test Checklist

**Database Setup**:
- [ ] All tables created
- [ ] Indexes created
- [ ] RLS policies enabled
- [ ] Foreign keys working

**Authentication**:
- [ ] Signup creates user
- [ ] Login returns JWT
- [ ] Session cookie set correctly
- [ ] Protected routes check auth

**Payments**:
- [ ] Stripe Checkout redirects correctly
- [ ] Webhook receives events
- [ ] meal_plan_jobs created on purchase
- [ ] Metadata passed correctly

**Meal Plan Generation**:
- [ ] Cron job triggers every 10 minutes
- [ ] Recipe generation with Claude works
- [ ] Image generation with Replicate works
- [ ] Images uploaded to Supabase
- [ ] PDF generation works
- [ ] PDF uploaded to Vercel Blob
- [ ] Email sent on completion

**Frontend**:
- [ ] Homepage loads
- [ ] Diet pages display correctly
- [ ] Customize page saves preferences
- [ ] Dashboard shows user's plans
- [ ] Historical meal plans accessible

### 11.2 Test Scripts

**Check Database**:
```bash
node check-user-meal-plans.js
# Shows user's meal plans and purchases

node check-job-structure.js
# Displays meal_plan_jobs table structure

node test-list-meal-plans.js
# Tests historical meal plan API
```

**Test Meal Plan Generation**:
```bash
# Create test purchase in Stripe Dashboard
# Or use Stripe test mode checkout

# Monitor cron job logs in Vercel Dashboard:
# Deployments → Functions → /api/cron/process-meal-plans

# Check job status:
node -e "
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
(async () => {
  const { data } = await supabase.from('meal_plan_jobs')
    .select('*').order('created_at', { ascending: false }).limit(1);
  console.log(data[0]);
})();
"
```

### 11.3 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Images missing in PDFs | Replicate stream not handled | See IMAGE_GENERATION_FIX.md |
| User portal empty | API querying wrong table | Update to query meal_plan_jobs |
| Cron not running | Vercel cron not configured | Add vercel.json with cron config |
| Rate limit errors | Replicate account <$5 | Add funds or increase delay |
| PDF not generated | Timeout (>10 min) | Split into phases, process incrementally |
| Webhook not firing | Wrong endpoint URL | Check Stripe dashboard webhook config |

---

## 12. Troubleshooting

### 12.1 Debugging Workflow

**Check Logs**:
```bash
# Vercel function logs
vercel logs --follow

# Filter by function
vercel logs /api/cron/process-meal-plans

# Check errors only
vercel logs --level error
```

**Database Queries**:
```sql
-- Check pending jobs
SELECT id, customer_email, status, current_phase, created_at
FROM meal_plan_jobs
WHERE status IN ('pending', 'processing')
ORDER BY created_at ASC;

-- Check failed jobs
SELECT id, customer_email, error_message, created_at
FROM meal_plan_jobs
WHERE status = 'failed'
ORDER BY created_at DESC;

-- Check recipe count
SELECT id, customer_email, recipe_count,
       jsonb_array_length(generated_recipes) as actual_count
FROM meal_plan_jobs
WHERE status = 'completed';
```

**API Testing**:
```bash
# Test meal plan API
curl https://your-domain.com/api/meal-plans?listAll=true \
  -H "Cookie: session=YOUR_JWT_TOKEN"

# Test admin API
curl https://your-domain.com/api/admin/recipes \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY"

# Test health endpoint
curl https://your-domain.com/api/health
```

### 12.2 Performance Optimization

**Database**:
- Ensure indexes exist on frequently queried columns
- Use `EXPLAIN ANALYZE` to check query performance
- Consider connection pooling for high traffic

**API Routes**:
- Cache static data with Next.js caching
- Use Vercel Edge Functions for global distribution
- Implement rate limiting on public endpoints

**Image Delivery**:
- Use Supabase CDN for recipe images
- Optimize image sizes (max 1MB per image)
- Consider WebP format for better compression

### 12.3 Monitoring

**Key Metrics**:
- Meal plan generation success rate (target: >95%)
- Average generation time (target: <4 hours)
- API response times (target: <500ms)
- Error rate (target: <1%)
- Stripe conversion rate

**Alerts**:
- Failed meal plan jobs (immediate)
- Replicate API errors (immediate)
- Low credit balance (warning at <$5)
- Webhook failures (immediate)

---

## Appendices

### A. Database ERD

```
┌─────────────┐         ┌──────────────┐         ┌──────────────────┐
│    users    │─────<───│  purchases   │         │  subscriptions   │
├─────────────┤         ├──────────────┤         ├──────────────────┤
│ id (PK)     │         │ id (PK)      │         │ id (PK)          │
│ email       │         │ user_id (FK) │         │ user_id (FK)     │
│ stripe_id   │         │ session_id   │         │ stripe_sub_id    │
└─────────────┘         │ amount       │         │ status           │
       │                │ diet_plan    │         └──────────────────┘
       │                └──────────────┘
       │
       │                ┌──────────────────────────────┐
       └────────<───────│    meal_plan_jobs            │
                        ├──────────────────────────────┤
                        │ id (PK)                      │
                        │ customer_email (FK)          │
                        │ diet_type                    │
                        │ family_size                  │
                        │ month, year                  │
                        │ status                       │
                        │ generated_recipes (JSONB)    │
                        │ pdf_url                      │
                        └──────────────────────────────┘

┌─────────────┐         ┌────────────────────┐
│   recipes   │─────<───│ recipe_ingredients │
├─────────────┤         ├────────────────────┤
│ id (PK)     │         │ id (PK)            │
│ name        │         │ recipe_id (FK)     │
│ diet_plans[]│         │ ingredient         │
│ meal_type   │         │ amount, unit       │
│ image_url   │         └────────────────────┘
└─────────────┘
       │                ┌────────────────────┐
       ├────────<───────│recipe_instructions │
       │                ├────────────────────┤
       │                │ id (PK)            │
       │                │ recipe_id (FK)     │
       │                │ step_number        │
       │                │ instruction        │
       │                └────────────────────┘
       │
       │                ┌────────────────────┐
       └────────<───────│ recipe_nutrition   │
                        ├────────────────────┤
                        │ id (PK)            │
                        │ recipe_id (FK)     │
                        │ calories, protein  │
                        │ carbs, fat, fiber  │
                        └────────────────────┘
```

### B. API Endpoint Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/signup | Public | Create account |
| POST | /api/auth/login | Public | Login |
| POST | /api/auth/logout | User | Logout |
| POST | /api/create-checkout-session | Public | Start purchase |
| POST | /api/stripe-webhook | Stripe | Payment events |
| GET | /api/meal-plans?listAll=true | User | List all plans |
| GET | /api/meal-plans?menuType=X&month=Y&year=Z | User | Get specific plan |
| POST | /api/cron/process-meal-plans | Cron | Generate meal plans |
| GET | /api/admin/recipes | Admin | List recipes |
| POST | /api/generate-recipes | Admin | Generate recipes |

### C. File Locations

**Critical Files**:
- `app/api/meal-plans/route.ts` - Meal plan API (historical access)
- `app/api/stripe-webhook/route.ts` - Payment processing
- `app/api/cron/process-meal-plans/route.ts` - Background job processor
- `lib/ai-recipe-generator.ts` - Claude integration
- `lib/ai-image-generator.ts` - Replicate integration (stream fix)
- `lib/pdf-generator.ts` - PDF creation
- `lib/recipeFiltering.ts` - Ingredient filtering logic
- `lib/hybrid-recipe-selector.ts` - Recipe selection

**Documentation**:
- `README.md` - Overview and quick start
- `SYSTEM_DOCUMENTATION.md` - This file (complete system)
- `IMAGE_GENERATION_FIX.md` - Replicate stream handling
- `INGREDIENT_FILTERING_SYSTEM.md` - Three-tiered filtering
- `HISTORICAL_MEAL_PLANS.md` - Historical access feature

---

**Last Updated**: November 18, 2025
**Version**: 2.0
**Status**: ✅ Production Ready

**Built with 💜 by Mocha's MindLab**
