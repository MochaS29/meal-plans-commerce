# 🍽️ Mocha's MindLab - AI-Powered Meal Plans E-Commerce Platform

A full-stack Next.js 15 e-commerce platform for selling personalized meal plans, featuring AI-powered recipe generation with Claude, Stripe payment processing, comprehensive admin dashboard, and automated testing suite.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Stripe](https://img.shields.io/badge/Stripe-Integrated-purple)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![Claude AI](https://img.shields.io/badge/AI-Claude%203%20Haiku-orange)
![Tests](https://img.shields.io/badge/Tests-Jest%20%26%20Playwright-red)

## 🌟 Features

### Customer Features
- **6 Specialized Diet Plans** - Mediterranean, Keto, Vegan, Paleo, Vegetarian, Family Recipes (with 3,586+ recipes ready)
- **Hybrid Recipe System** - 75% curated library recipes + 25% freshly generated for variety
- **30-Day Meal Plans** - Complete monthly meal calendars with personalized recipe selection
- **Smart Recipe Tracking** - Never receive duplicate recipes, perfect for returning customers
- **Instant PDF Delivery** - Beautiful meal plan PDFs generated and delivered automatically
- **AI-Powered Variety** - Fresh recipes added to library with every customer order
- **Secure Payments** - Stripe Checkout integration with automated fulfillment
- **Mobile Responsive** - Fully optimized for all devices and screen sizes

### Admin Features
- **Sales Dashboard** - Real-time revenue tracking, customer metrics, and subscription analytics
- **Recipe Library** - Browse, search, filter, and manage all AI-generated recipes
- **AI Recipe Generator** - On-demand recipe generation for any diet plan with one click
- **Customer Management** - Export customer data to CSV, view purchase history
- **Content Management** - Edit meal plans, pricing, and site content
- **Bulk Operations** - Generate months of recipes at once for all diet plans
- **Analytics** - Track recipe generation, customer engagement, and API usage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Stripe account (for payments)
- Supabase account (for database)
- Anthropic API key (for Claude AI recipe generation)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mochasmindlab/meal-plans-commerce.git
cd meal-plans-commerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Stripe (get from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase (get from https://app.supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
DATABASE_URL=postgresql://...

# AI Recipe Generation (get from https://console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-api03-...

# Admin & Security
ADMIN_API_KEY=your-secure-random-string
JWT_SECRET=your-super-secret-jwt-key

# Domain
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

4. **Set up the database**

Run the Supabase migration (copy from `/supabase/migrations/001_initial_schema.sql`):
```bash
# Via Supabase Dashboard SQL editor or CLI
supabase db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## 📱 Available Pages

### Public Pages
- `/` - Homepage with all diet plans and pricing
- `/diets/[slug]` - Individual diet plan pages (mediterranean, keto, vegan, etc.)
- `/pricing` - Compare all meal plans and pricing options
- `/calendar` - Sample 30-day meal calendar
- `/recipes` - Browse recipe collection
- `/menu-benefits` - Why meal planning works
- `/login` - User authentication

### Customer Pages
- `/dashboard` - Personal dashboard with purchases and meal plans
- `/success` - Payment success confirmation
- `/portal` - Stripe customer portal for subscription management

### Admin Pages
- `/admin` - Admin dashboard with sales metrics
- `/admin/recipes` - Recipe library management
- `/admin/settings` - Site configuration (coming soon)

## 🏗️ Project Structure

```
meal-plans-commerce/
├── app/                           # Next.js 15 App Router
│   ├── admin/                    # Admin dashboard & tools
│   │   ├── page.tsx             # Sales dashboard
│   │   └── recipes/             # Recipe library
│   ├── api/                     # API routes
│   │   ├── admin/               # Admin endpoints
│   │   ├── generate-recipes/    # AI recipe generation
│   │   ├── stripe/              # Payment processing
│   │   └── user/                # User management
│   ├── dashboard/               # Customer dashboard
│   ├── diets/                   # Diet plan pages
│   └── page.tsx                 # Homepage
├── components/                   # Reusable React components
│   ├── Header.tsx               # Site navigation
│   ├── Footer.tsx               # Site footer
│   └── CheckoutButton.tsx      # Stripe checkout
├── lib/                         # Utility functions & configs
│   ├── stripe.ts                # Stripe configuration
│   ├── supabase.ts              # Database client
│   ├── ai-recipe-generator.ts  # Claude AI integration
│   └── auth.ts                  # JWT authentication
├── supabase/                    # Database migrations
│   └── migrations/              # SQL schema files
├── __tests__/                   # Test files
├── public/                      # Static assets
└── package.json                 # Dependencies
```

## 💳 Stripe Setup

### Create Products in Stripe Dashboard

1. **30-Day Mediterranean Challenge** - $79 (one-time)
2. **Custom Family Meal Plan** - $149 (one-time)
3. **Monthly Meal Calendar Access** - $29/month (subscription)

### Configure Webhook
- Endpoint: `https://your-domain.com/api/webhooks/stripe`
- Events: `checkout.session.completed`, `customer.subscription.*`

## 🧪 Testing

### Run Tests
```bash
# Unit & Component Tests
npm test

# E2E Tests with Playwright
npm run test:e2e

# Test Coverage Report
npm run test:coverage

# Accessibility Tests
npm run test:a11y
```

### Test Structure
- Unit tests for API endpoints
- Component tests for UI elements
- E2E tests for critical user flows
- Visual regression tests
- Accessibility compliance tests

## 🤖 AI Recipe Generation

The platform uses Claude 3 Haiku for generating unique recipes on-demand.

### Generate Recipes via Admin Panel
1. Go to `/admin`
2. Click any diet type button in the AI Recipe Generator section
3. Recipe is generated and saved to database automatically

### Generate Recipes via API
```bash
# Generate a single recipe
curl -X POST http://localhost:3000/api/generate-recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -d '{"action":"single","dietType":"mediterranean","mealType":"dinner"}'

# Generate batch recipes
curl -X POST http://localhost:3000/api/generate-recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -d '{"action":"batch","dietType":"keto","count":5}'
```

### Recipe Library Management
- View all recipes at `/admin/recipes`
- Search and filter by diet type
- Export recipes to CSV
- Delete unwanted recipes
- View full recipe details including nutrition

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Add environment variables in Vercel Dashboard**

### Deploy with Docker

```bash
docker build -t meal-plans-commerce .
docker run -p 3000:3000 meal-plans-commerce
```

## 🎨 Customization

### Colors (Tailwind Config)
- **Purple**: `#9333ea` - Primary brand color
- **Teal**: `#14b8a6` - Secondary accent
- **Pink**: `#ec4899` - Highlight color
- **Coral**: `#f97316` - Call-to-action

### Products
Edit `lib/products.ts` to modify meal plans and pricing.

### Adding New Diet Types

1. **Add to agent configuration**:
```python
# agents/meal-planning/meal_planning_agent.py
MENU_CONFIGS["your_diet"] = MenuConfig(
    name="Your Diet",
    calories_range=(1400, 1600),
    protein_target=100,
    special_requirements=["requirement1"]
)
```

2. **Create frontend page**:
```bash
mkdir app/your-diet
# Create page.tsx with diet details
```

3. **Update products**:
```typescript
// lib/products.ts
export const products = [
  // ... existing
  {
    id: 'your-diet',
    name: 'Your Diet Plan',
    price: 79
  }
]
```

## 📊 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe Checkout & Subscriptions
- **AI**: Claude 3 Haiku (Anthropic) for recipe generation
- **Authentication**: JWT tokens with jose library
- **Testing**: Jest, React Testing Library, Playwright
- **Deployment**: Vercel (recommended) or Docker

## 📊 Database Schema

### Main Tables
- `users` - Customer accounts and authentication
- `purchases` - Order history and transactions
- `diet_plans` - Available meal plan types
- `recipes` - AI-generated recipe collection
- `recipe_ingredients` - Ingredient lists with quantities
- `recipe_instructions` - Step-by-step cooking directions
- `recipe_nutrition` - Nutritional information per serving

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook endpoint secret | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ANTHROPIC_API_KEY` | Claude AI API key | Yes |
| `ADMIN_API_KEY` | Admin endpoint protection | Yes |
| `JWT_SECRET` | JWT token signing secret | Yes |
| `NEXT_PUBLIC_DOMAIN` | Your domain URL | Yes |

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Stripe checkout not working | Check API keys and webhook configuration |
| Database connection error | Verify DATABASE_URL format |
| Styling not loading | Clear `.next` folder and rebuild |
| Docker containers not starting | Check port availability and logs |
| AI generation fails | Check API keys and rate limits |
| Port already in use | Change port in docker-compose.yml |
| Recipe not found | Verify recipe ID format: `{menu_type}_{category}_{number}` |
| Memory issues with large plans | Increase Docker memory limit |

## 📈 Analytics & Monitoring

- **Vercel Analytics** - Built-in performance monitoring
- **Stripe Dashboard** - Payment analytics
- **Grafana** - Agent system monitoring
- **Google Analytics** - User behavior tracking

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 🆘 Support

- **Email**: support@mochasmindlab.com
- **Documentation**: [docs.mochasmindlab.com](https://docs.mochasmindlab.com)
- **Issues**: [GitHub Issues](https://github.com/mochasmindlab/meal-plans-commerce/issues)

## 🙏 Acknowledgments

- Mediterranean diet research and authentic recipes
- Next.js and Vercel teams for amazing tools
- Stripe for payment infrastructure
- Anthropic (Claude) and OpenAI (GPT-4) for AI capabilities
- Our community of health-conscious users

## ⚡ Performance & Security

### Performance
- Server-side rendering with Next.js 15
- Image optimization with Next/Image
- Code splitting and lazy loading
- API route caching
- Database connection pooling

### Security
- JWT authentication for protected routes
- API key protection for admin endpoints
- Rate limiting on recipe generation
- Secure environment variable handling
- SQL injection prevention with Supabase
- XSS protection with React
- HTTPS enforcement in production

---

**Built with 💜 by Mocha's MindLab**

Transform your health with authentic Mediterranean meal planning!
