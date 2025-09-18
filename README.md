# 🍽️ Mocha's MindLab - AI-Powered Meal Plans Commerce

A complete e-commerce platform for selling AI-generated monthly meal plans with automated agent system for content generation, social media marketing, and analytics.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Stripe](https://img.shields.io/badge/Stripe-Integrated-purple)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![AI](https://img.shields.io/badge/AI-Claude%20%26%20OpenAI-green)

## 🌟 Features

### E-Commerce Platform
- **Multiple Diet Types** - Mediterranean, Intermittent Fasting (16:8), Keto, Family-Friendly
- **AI-Powered Generation** - Claude/OpenAI powered recipe and meal plan creation
- **Beautiful Landing Page** - Mocha's MindLab branded design with sophisticated color palette
- **Interactive Calendar** - 30-day meal planning calendar with daily meal details
- **Smart Shopping Lists** - Organized by grocery sections with cost estimates
- **Recipe Collection** - 100+ recipes with nutritional info and prep guides
- **Stripe Integration** - Secure payment processing for one-time and subscription plans
- **Mobile Responsive** - Works perfectly on all devices

### AI Agent System
- **Enhanced Meal Planning Agent** - AI-powered recipe generation with Claude/OpenAI
- **Smart Shopping Lists** - Intelligent categorization and deduplication
- **Meal Prep Guides** - Time-optimized prep strategies
- **Social Media Agent** - Automated marketing and content optimization
- **Analytics Agent** - Customer insights and performance tracking
- **Fallback System** - Template-based generation when AI is unavailable

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose (for agents)
- Python 3.9+ (for agent system)
- Stripe account
- PostgreSQL or Supabase account
- OpenAI or Anthropic API key (for AI generation)

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
# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Database
DATABASE_URL=postgresql://...

# Email
RESEND_API_KEY=re_...

# AI Services (at least one required for AI features)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Redis (for caching)
REDIS_URL=redis://localhost:6379

# RabbitMQ (for agent communication)
RABBITMQ_URL=amqp://admin:admin@localhost:5672
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## 📱 Available Pages

- `/` - Homepage with product offerings
- `/mediterranean` - Mediterranean diet details and benefits
- `/intermittent-fasting` - IF 16:8 protocol and meal timing
- `/calendar` - Interactive 30-day meal calendar
- `/shopping-list` - Weekly shopping lists with tips
- `/recipes` - Recipe collection showcase
- `/plans/:id` - Individual product pages
- `/success` - Payment success page
- `/portal` - Customer portal

## 🏗️ Project Structure

```
meal-plans-commerce/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── calendar/          # Calendar page
│   ├── shopping-list/     # Shopping list page
│   ├── recipes/           # Recipe collection page
│   └── page.tsx          # Homepage
├── components/            # React components
├── lib/                   # Utility functions
│   ├── stripe.ts         # Stripe configuration
│   ├── products.ts       # Product definitions
│   └── utils.ts          # Helper functions
├── agents/               # AI agent system
│   ├── docker-compose.yml
│   └── [agent folders]
├── public/               # Static assets
└── package.json         # Dependencies

```

## 💳 Stripe Setup

### Create Products in Stripe Dashboard

1. **30-Day Mediterranean Challenge** - $79 (one-time)
2. **Custom Family Meal Plan** - $149 (one-time)
3. **Monthly Meal Calendar Access** - $29/month (subscription)

### Configure Webhook
- Endpoint: `https://your-domain.com/api/webhooks/stripe`
- Events: `checkout.session.completed`, `customer.subscription.*`

## 🤖 AI Agents Setup

### Quick Setup
```bash
# Run setup script
cd agents
./setup-agents.sh
```

### Manual Setup
```bash
# Start all services
cd agents
docker-compose up -d

# Or start specific agent
docker-compose up meal-planning-api -d
```

### API Endpoints
| Service | Port | Description |
|---------|------|-------------|
| Meal Planning API | 5001 | AI-powered meal plan generation |
| Social Media Agent | 5002 | Marketing automation |
| Analytics Agent | 5003 | Performance tracking |
| Grafana | 3000 | Monitoring dashboard |
| RabbitMQ | 15672 | Message queue management |
| Prometheus | 9090 | Metrics collection |

### Generate Meal Plans

**Via CLI**:
```bash
cd agents/meal-planning
python run_agent.py mediterranean --month 12 --year 2024
```

**Via API**:
```bash
curl -X POST http://localhost:5001/api/generate_meal_plan \
  -H "Content-Type: application/json" \
  -d '{"menu_type": "mediterranean", "month": 12, "year": 2024}'
```

**With AI Enhancement**:
```python
from enhanced_agent import EnhancedMealPlanningAgent

agent = EnhancedMealPlanningAgent()
plan = await agent.generate_ai_monthly_plan(
    menu_type="mediterranean",
    month=12,
    year=2024,
    use_ai=True  # Enable AI generation
)
```

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

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Payments**: Stripe Checkout & Customer Portal
- **Database**: PostgreSQL with Prisma
- **AI Integration**: Claude (Anthropic), GPT-4 (OpenAI)
- **AI Agents**: Python 3.9+, Flask, AsyncIO
- **Caching**: Redis
- **Message Queue**: RabbitMQ
- **Containerization**: Docker, Docker Compose
- **Monitoring**: Grafana, Prometheus

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `RESEND_API_KEY` | Email service API key | Yes |
| `OPENAI_API_KEY` | OpenAI API key | No |
| `NEXT_PUBLIC_APP_URL` | Your domain URL | Yes |

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

## 📦 Agent System Architecture

```
agents/
├── meal-planning/
│   ├── meal_planning_agent.py    # Core agent logic
│   ├── ai_menu_generator.py      # AI recipe generation
│   ├── enhanced_agent.py         # Enhanced AI integration
│   ├── api.py                    # Flask API server
│   ├── run_agent.py              # CLI interface
│   └── requirements.txt          # Python dependencies
├── social-media/
│   └── social_agent.py           # Marketing automation
├── analytics/
│   └── analytics_agent.py        # Data analysis
├── docker-compose.yml            # Service orchestration
└── setup-agents.sh              # Quick setup script
```

---

**Built with 💜 by Mocha's MindLab**

Transform your health with authentic Mediterranean meal planning!
