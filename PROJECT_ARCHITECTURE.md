# 🏗️ Mocha's MindLab Meal Plans - Complete Architecture

## 🎯 Overview

A multi-platform ecosystem for Mediterranean meal planning with AI-powered calendar generation, supporting web, mobile, and automated content creation.

```
┌─────────────────────────────────────────────────────────────┐
│                     Mocha's MindLab Ecosystem               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Web App    │  │  Mobile App  │  │   AI Agent   │    │
│  │   (Next.js)  │  │(React Native)│  │  (Python)    │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                  │                  │            │
│  ┌──────┴──────────────────┴──────────────────┴───────┐   │
│  │              API Gateway (Express/NestJS)           │   │
│  └──────────────────────┬───────────────────────────┘   │
│                         │                                │
│  ┌──────────────────────┼───────────────────────────┐   │
│  │   ┌────────────┐    │    ┌────────────┐        │   │
│  │   │ PostgreSQL │────┼────│   Redis    │        │   │
│  │   └────────────┘    │    └────────────┘        │   │
│  │                      │                           │   │
│  │   ┌────────────┐    │    ┌────────────┐        │   │
│  │   │   Supabase │────┼────│     S3     │        │   │
│  │   └────────────┘         └────────────┘        │   │
│  └───────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Repository Structure

```
mindlab-meal-ecosystem/
├── apps/
│   ├── web/                    # Next.js e-commerce site
│   ├── mobile/                  # React Native app
│   ├── api/                     # API Gateway (NestJS)
│   └── ai-calendar-generator/   # Python AI service
│
├── packages/
│   ├── shared-types/            # TypeScript types
│   ├── database/                # Prisma schemas & migrations
│   ├── ui-components/           # Shared React components
│   ├── utils/                   # Shared utilities
│   └── meal-data/               # Meal/recipe data models
│
├── services/
│   ├── calendar-service/        # Calendar generation logic
│   ├── payment-service/         # Stripe integration
│   ├── email-service/           # Email delivery (Resend)
│   ├── auth-service/            # Authentication (Supabase)
│   └── storage-service/         # File storage (S3)
│
├── infrastructure/
│   ├── docker/                  # Docker configurations
│   ├── k8s/                     # Kubernetes manifests
│   ├── terraform/               # Infrastructure as Code
│   └── ci-cd/                   # GitHub Actions workflows
│
├── ai-agents/
│   ├── calendar-creator/        # AI calendar generation
│   ├── recipe-optimizer/        # Recipe optimization AI
│   ├── nutrition-analyzer/      # Nutritional analysis
│   └── shopping-list-generator/ # Smart shopping lists
│
└── docs/
    ├── api/                     # API documentation
    ├── deployment/              # Deployment guides
    ├── ai-agents/               # AI agent instructions
    └── development/             # Development guides
```

## 🔧 Technology Stack

### Core Technologies
- **Monorepo Tool**: Turborepo or Nx
- **Package Manager**: pnpm (efficient for monorepos)
- **TypeScript**: Shared across all JavaScript projects
- **Database**: PostgreSQL (primary) + Redis (caching)
- **Authentication**: Supabase Auth
- **File Storage**: AWS S3 or Supabase Storage
- **AI/ML**: OpenAI API + Custom Python models

### Service Architecture

#### 1. Web Application (apps/web)
```typescript
// apps/web/package.json
{
  "name": "@mindlab/web",
  "dependencies": {
    "@mindlab/shared-types": "workspace:*",
    "@mindlab/ui-components": "workspace:*",
    "@mindlab/utils": "workspace:*",
    "next": "^14.0.0",
    "stripe": "^14.0.0"
  }
}
```

#### 2. Mobile Application (apps/mobile)
```typescript
// apps/mobile/package.json
{
  "name": "@mindlab/mobile",
  "dependencies": {
    "@mindlab/shared-types": "workspace:*",
    "@mindlab/ui-components": "workspace:*",
    "react-native": "^0.73.0",
    "expo": "^50.0.0"
  }
}
```

#### 3. API Gateway (apps/api)
```typescript
// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API Documentation
  const config = new DocumentBuilder()
    .setTitle('MindLab Meal Plans API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
}
```

## 🤖 AI Agent Configuration

### Calendar Generation Agent
```python
# ai-agents/calendar-creator/agent.py
import os
from datetime import datetime, timedelta
from typing import List, Dict
import openai
from supabase import create_client
import json

class MealCalendarGenerator:
    """
    Autonomous AI agent for generating monthly meal calendars
    """

    def __init__(self):
        self.openai_client = openai.Client(api_key=os.getenv("OPENAI_API_KEY"))
        self.supabase = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_KEY")
        )

    def generate_monthly_calendar(self,
                                 diet_type: str,
                                 dietary_restrictions: List[str],
                                 month: str,
                                 year: int) -> Dict:
        """
        Generate a complete monthly meal calendar
        """

        prompt = self._build_prompt(diet_type, dietary_restrictions, month, year)

        response = self.openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {
                    "role": "system",
                    "content": "You are a Mediterranean diet expert and meal planning specialist."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={ "type": "json_object" }
        )

        calendar_data = json.loads(response.choices[0].message.content)

        # Store in database
        self._store_calendar(calendar_data)

        # Generate shopping lists
        self._generate_shopping_lists(calendar_data)

        # Calculate nutrition
        self._calculate_nutrition(calendar_data)

        return calendar_data

    def run_monthly_generation(self):
        """
        Automated monthly calendar generation for all diet types
        """
        diet_types = ["mediterranean", "mediterranean-vegetarian",
                     "mediterranean-pescatarian", "mediterranean-family"]

        next_month = datetime.now() + timedelta(days=30)

        for diet_type in diet_types:
            calendar = self.generate_monthly_calendar(
                diet_type=diet_type,
                dietary_restrictions=[],
                month=next_month.strftime("%B"),
                year=next_month.year
            )

            # Notify subscribers
            self._notify_subscribers(diet_type, calendar)
```

### Agent Automation Setup
```yaml
# .github/workflows/ai-calendar-generation.yml
name: Monthly Calendar Generation

on:
  schedule:
    - cron: '0 0 1 * *'  # Run on the 1st of each month
  workflow_dispatch:      # Allow manual trigger

jobs:
  generate-calendars:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'

    - name: Install dependencies
      run: |
        pip install -r ai-agents/requirements.txt

    - name: Generate Monthly Calendars
      env:
        OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
        SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
      run: |
        python ai-agents/calendar-creator/run_monthly.py

    - name: Notify Success
      if: success()
      run: |
        curl -X POST ${{ secrets.WEBHOOK_URL }} \
          -H 'Content-Type: application/json' \
          -d '{"text":"✅ Monthly calendars generated successfully"}'
```

## 🗄️ Database Schema

```prisma
// packages/database/prisma/schema.prisma

model User {
  id                String   @id @default(cuid())
  email             String   @unique
  name              String?
  subscriptionTier  String   @default("free")
  dietPreferences   Json
  allergies         String[]
  familySize        Int      @default(1)
  calendars         Calendar[]
  purchases         Purchase[]
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Calendar {
  id                String   @id @default(cuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  month             Int
  year              Int
  dietType          String
  meals             Json     // Stores complete meal plan
  shoppingLists     Json     // Weekly shopping lists
  nutritionSummary  Json
  generatedBy       String   // "ai" or "manual"
  createdAt         DateTime @default(now())

  @@unique([userId, month, year, dietType])
}

model Recipe {
  id                String   @id @default(cuid())
  name              String
  category          String   // breakfast, lunch, dinner, snack
  dietTypes         String[] // mediterranean, vegetarian, etc
  ingredients       Json
  instructions      Json
  nutritionPerServing Json
  prepTime          Int      // minutes
  cookTime          Int      // minutes
  servings          Int
  calories          Int
  imageUrl          String?
  tags              String[]
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([category, dietTypes])
}

model MealPlan {
  id                String   @id @default(cuid())
  name              String
  description       String
  price             Int      // in cents
  stripePriceId     String?
  type              String   // "one-time" or "subscription"
  features          Json
  active            Boolean  @default(true)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

## 🚀 Deployment Strategy

### Environment Variables Management
```bash
# .env.shared (committed - non-sensitive)
NODE_ENV=production
API_VERSION=v1
REDIS_PORT=6379

# .env.local (gitignored - sensitive)
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://...
SUPABASE_KEY=eyJ...
```

### Docker Compose for Development
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: mindlab_meals
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/mindlab_meals
      REDIS_URL: redis://redis:6379

  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - api

  ai-calendar:
    build:
      context: .
      dockerfile: ai-agents/calendar-creator/Dockerfile
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/mindlab_meals

volumes:
  postgres_data:
```

## 📱 Mobile App Integration

```typescript
// packages/shared-types/src/api.ts
export interface MealCalendarAPI {
  getCalendar(month: number, year: number): Promise<Calendar>;
  getRecipe(id: string): Promise<Recipe>;
  getShoppingList(weekNumber: number): Promise<ShoppingList>;
  trackMealCompletion(mealId: string): Promise<void>;
  getUserPreferences(): Promise<UserPreferences>;
  updateDietaryRestrictions(restrictions: string[]): Promise<void>;
}

// apps/mobile/src/services/api.ts
import { MealCalendarAPI } from '@mindlab/shared-types';

class MobileAPIService implements MealCalendarAPI {
  private baseURL = process.env.EXPO_PUBLIC_API_URL;

  async getCalendar(month: number, year: number) {
    const response = await fetch(`${this.baseURL}/calendar/${year}/${month}`, {
      headers: {
        'Authorization': `Bearer ${await this.getToken()}`
      }
    });
    return response.json();
  }

  // ... other methods
}
```

## 🔐 Security & Authentication

```typescript
// apps/api/src/auth/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AuthGuard implements CanActivate {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) return false;

    const { data: { user }, error } = await this.supabase.auth.getUser(token);

    if (error || !user) return false;

    request.user = user;
    return true;
  }
}
```

## 🎯 Implementation Phases

### Phase 1: Foundation (Current)
- ✅ E-commerce website with Stripe
- ✅ Basic meal plan products
- ⬜ Database setup with Supabase
- ⬜ User authentication

### Phase 2: AI Integration (Weeks 3-4)
- ⬜ AI calendar generation service
- ⬜ Recipe optimization engine
- ⬜ Automated monthly calendar creation
- ⬜ Smart shopping list generator

### Phase 3: Mobile App (Weeks 5-8)
- ⬜ React Native app setup
- ⬜ API gateway implementation
- ⬜ Offline support with local storage
- ⬜ Push notifications for meal reminders

### Phase 4: Advanced Features (Weeks 9-12)
- ⬜ Meal tracking and analytics
- ⬜ Social features (sharing, reviews)
- ⬜ Personalized AI recommendations
- ⬜ Integration with fitness trackers

## 🚦 Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/mochasmindlab/meal-ecosystem.git
cd meal-ecosystem
pnpm install

# Development
pnpm dev              # Start all services
pnpm dev:web          # Web only
pnpm dev:api          # API only
pnpm dev:mobile       # Mobile only

# AI Agents
pnpm ai:generate      # Generate new calendar
pnpm ai:optimize      # Optimize recipes
pnpm ai:analyze       # Analyze nutrition

# Testing
pnpm test             # Run all tests
pnpm test:e2e         # E2E tests
pnpm test:ai          # AI agent tests

# Deployment
pnpm build            # Build all apps
pnpm deploy:web       # Deploy web to Vercel
pnpm deploy:api       # Deploy API to Railway
pnpm deploy:ai        # Deploy AI to AWS Lambda
```

## 📚 AI Agent Instructions

### For Autonomous Calendar Generation:
1. Agent reads from `ai-agents/prompts/calendar-generation.md`
2. Checks database for existing recipes
3. Generates new combinations following Mediterranean principles
4. Validates nutritional requirements
5. Creates shopping lists automatically
6. Stores in database
7. Notifies subscribers

### For Recipe Optimization:
1. Analyzes user feedback and preferences
2. Adjusts recipes for dietary restrictions
3. Optimizes for seasonal ingredients
4. Balances nutrition across the week
5. Updates recipe database

This architecture allows AI agents to operate autonomously while maintaining consistency and quality across all platforms.