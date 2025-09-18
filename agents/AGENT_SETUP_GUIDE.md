# 🤖 Agent System Setup Guide for Mocha's MindLab

## 📁 Current File Structure

```
meal-plans-commerce/
├── agents/                          # All agent-related code
│   ├── docker-compose.yml          # Main orchestration file (✅ Created)
│   ├── .env.example                # Environment variables template
│   │
│   ├── project-manager/            # Project Manager Agent
│   │   ├── Dockerfile             # ✅ Created
│   │   ├── requirements.txt      # ✅ Created
│   │   ├── src/
│   │   │   ├── main.py
│   │   │   ├── orchestrator.py
│   │   │   ├── task_manager.py
│   │   │   └── communication.py
│   │   └── README.md
│   │
│   ├── social-seo-agent/          # Marketing Agent
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── src/
│   │   │   ├── main.py
│   │   │   ├── social_media.py
│   │   │   ├── seo_analyzer.py
│   │   │   └── content_generator.py
│   │   └── README.md
│   │
│   ├── menu-planner/              # Menu Planning Agent
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── src/
│   │   │   ├── main.py
│   │   │   ├── calendar_generator.py
│   │   │   ├── recipe_optimizer.py
│   │   │   └── nutrition_analyzer.py
│   │   └── README.md
│   │
│   ├── scheduler/                 # Cron Scheduler
│   │   ├── Dockerfile
│   │   ├── crontab
│   │   └── scripts/
│   │
│   └── agent-ui/                  # Web Dashboard
│       ├── Dockerfile
│       ├── package.json
│       └── src/
```

## 🚀 What You Need to Do

### 1. **Git Repository Structure**

You have two options:

#### Option A: Monorepo (Recommended)
```bash
# Single repository for everything
mindlab-meal-ecosystem/
├── web/                 # Your current Next.js site
├── agents/              # All agents
├── shared/              # Shared code
└── infrastructure/      # Docker, K8s configs
```

#### Option B: Multiple Repositories
```bash
# Separate repos for each component
mochasmindlab/meal-plans-web        # E-commerce site
mochasmindlab/meal-plans-agents     # Agent system
mochasmindlab/meal-plans-shared     # Shared libraries
```

### 2. **Environment Variables Needed**

Create `.env` file in the agents folder:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mindlab_agents
REDIS_URL=redis://localhost:6379

# AI Services
OPENAI_API_KEY=sk-...              # Get from OpenAI
ANTHROPIC_API_KEY=sk-ant-...       # Get from Anthropic

# Social Media
TWITTER_API_KEY=                   # From Twitter Developer
TWITTER_API_SECRET=
INSTAGRAM_USERNAME=                # Your Instagram
INSTAGRAM_PASSWORD=
FACEBOOK_PAGE_TOKEN=               # From Facebook Developer

# SEO Tools
SERPAPI_KEY=                       # From SerpAPI for Google rankings
GOOGLE_ANALYTICS_KEY=              # From Google Analytics

# Monitoring
SLACK_WEBHOOK_URL=                 # For notifications
GRAFANA_PASSWORD=admin

# AWS (for file storage)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET=mindlab-meal-plans

# Nutrition API
NUTRITION_API_KEY=                 # From Nutritionix or similar
```

### 3. **Local Development Setup**

```bash
# 1. Navigate to agents directory
cd meal-plans-commerce/agents

# 2. Copy environment template
cp .env.example .env
# Edit .env with your actual keys

# 3. Start the agent system
docker-compose up -d

# 4. View logs
docker-compose logs -f

# 5. Access monitoring dashboard
# Grafana: http://localhost:3001 (admin/admin)
# RabbitMQ: http://localhost:15672 (admin/admin)
# Agent UI: http://localhost:3002
```

### 4. **Cloud Deployment Options**

#### Option A: AWS (Most Scalable)
- Use ECS for container orchestration
- RDS for PostgreSQL
- ElastiCache for Redis
- S3 for file storage
- CloudWatch for monitoring

#### Option B: DigitalOcean (Cost-Effective)
- Kubernetes cluster for agents
- Managed PostgreSQL
- Managed Redis
- Spaces for object storage

#### Option C: Railway/Render (Simplest)
- One-click Docker deployments
- Managed databases included
- Built-in monitoring

### 5. **GitHub Actions for CI/CD**

Create `.github/workflows/deploy-agents.yml`:

```yaml
name: Deploy Agents

on:
  push:
    branches: [main]
    paths:
      - 'agents/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to ECS
        run: |
          docker-compose -f agents/docker-compose.yml build
          docker-compose -f agents/docker-compose.yml push
          aws ecs update-service --cluster mindlab --service agents --force-new-deployment
```

## 📊 Agent Capabilities

### Project Manager Agent
- **Monitors:** All other agents
- **Tasks:** Daily reports, error handling, task distribution
- **Schedule:** Always running

### Social Media & SEO Agent
- **Posts:** 3x daily to social media
- **Analyzes:** SEO rankings weekly
- **Generates:** Blog content monthly
- **Schedule:** Runs every 4 hours

### Menu Planning Agent
- **Creates:** New calendars on the 25th of each month
- **Updates:** Recipes based on seasonality
- **Analyzes:** User feedback and preferences
- **Schedule:** Daily at 2 AM

## 🔧 Immediate Next Steps

1. **Create GitHub Repository**
   ```bash
   gh repo create mochasmindlab/meal-plans-agents --public
   git init
   git add .
   git commit -m "Initial agent system setup"
   git push -u origin main
   ```

2. **Get Required API Keys**
   - OpenAI: https://platform.openai.com/api-keys
   - Stripe: Already have
   - Social Media: Developer portals
   - Nutrition: https://www.nutritionix.com/business/api

3. **Test Locally**
   ```bash
   # Start just the database first
   docker-compose up -d postgres redis

   # Then start one agent
   docker-compose up project-manager

   # If working, start all
   docker-compose up -d
   ```

4. **Set Up Monitoring**
   - Grafana dashboards for metrics
   - Slack notifications for errors
   - Daily email reports

## 🎯 Benefits of This Setup

1. **Autonomous Operation**
   - Agents run without your input
   - Self-healing on errors
   - Automatic retries

2. **Scalable**
   - Add more agents easily
   - Handle growth automatically
   - Cloud-ready architecture

3. **Observable**
   - See what agents are doing
   - Track performance metrics
   - Get alerts on issues

4. **Cost-Effective**
   - Only pay for what you use
   - Efficient resource usage
   - Can start small and scale

## 📝 Example Agent Task Flow

```mermaid
graph TD
    A[Scheduler: 1st of Month] --> B[Menu Planner: Generate Calendar]
    B --> C[Project Manager: Validate Calendar]
    C --> D[Store in Database]
    D --> E[Email to Subscribers]
    D --> F[Social Media: Post Preview]
    F --> G[SEO Agent: Create Blog Post]
    G --> H[Project Manager: Report Success]
```

## 🚦 Quick Commands

```bash
# View all running agents
docker ps

# Stop all agents
docker-compose down

# Restart specific agent
docker-compose restart menu-planner

# View agent logs
docker logs mindlab-menu-planner -f

# Execute command in agent
docker exec -it mindlab-project-manager bash

# Backup database
docker exec mindlab-db pg_dump -U postgres mindlab_agents > backup.sql
```

## ⚠️ Important Considerations

1. **Security**
   - Never commit .env files
   - Use secrets management in production
   - Rotate API keys regularly

2. **Costs**
   - OpenAI API: ~$20-50/month for agents
   - Cloud hosting: ~$50-100/month
   - Database: ~$15-25/month

3. **Maintenance**
   - Weekly log reviews
   - Monthly dependency updates
   - Quarterly architecture review

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Agent not starting | Check logs: `docker logs <container>` |
| Database connection failed | Verify DATABASE_URL in .env |
| API rate limits | Implement retry logic with exponential backoff |
| High memory usage | Adjust Docker resource limits |
| Agents not communicating | Check RabbitMQ connection |

## 📞 Support Resources

- Docker docs: https://docs.docker.com
- PostgreSQL: https://www.postgresql.org/docs
- RabbitMQ: https://www.rabbitmq.com/documentation
- Your monitoring: http://localhost:3001

---

**Next Action:** Let me know which deployment option you prefer (AWS/DigitalOcean/Railway) and I'll create the specific deployment scripts for that platform!