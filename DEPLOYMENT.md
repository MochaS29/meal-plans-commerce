# Deployment Guide

## 🚀 Complete Deployment Instructions

This guide covers deploying both the Next.js frontend to Vercel and the AI agent system to your infrastructure.

## Part 1: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (free tier works)
- GitHub account
- Stripe account with products configured

### Step 1: Push to GitHub
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: AI-powered meal planning platform"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/meal-plans-commerce.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Import Project**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select "Next.js" as framework

2. **Configure Environment Variables**:
   Add these in Vercel dashboard under Settings → Environment Variables:

   ```env
   # Required
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

   # Email (if using)
   RESEND_API_KEY=re_...

   # Optional (for future features)
   OPENAI_API_KEY=sk-...
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live at `your-project.vercel.app`

### Step 3: Configure Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

### Step 4: Set Up Stripe Webhooks

1. **In Stripe Dashboard**:
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

2. **Add webhook secret to Vercel**:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Part 2: Deploy Agent System

### Option A: Deploy to AWS (Recommended for Production)

#### Prerequisites
- AWS account
- AWS CLI configured
- Docker Hub account

#### Step 1: Build and Push Docker Images

```bash
cd agents

# Build and tag images
docker build -t your-dockerhub/meal-planning-agent ./meal-planning
docker build -t your-dockerhub/social-media-agent ./social-media
docker build -t your-dockerhub/analytics-agent ./analytics

# Push to Docker Hub
docker push your-dockerhub/meal-planning-agent
docker push your-dockerhub/social-media-agent
docker push your-dockerhub/analytics-agent
```

#### Step 2: Deploy to AWS ECS

1. **Create ECS Cluster**:
```bash
aws ecs create-cluster --cluster-name meal-planning-cluster
```

2. **Create Task Definitions**:
```bash
# Create task-definition.json for each service
# Then register:
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

3. **Create Services**:
```bash
aws ecs create-service \
  --cluster meal-planning-cluster \
  --service-name meal-planning-api \
  --task-definition meal-planning-task:1 \
  --desired-count 1
```

4. **Set Up Load Balancer**:
   - Create Application Load Balancer
   - Configure target groups for each service
   - Set up routing rules

#### Step 3: Configure RDS and ElastiCache

```bash
# Create RDS PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier meal-plans-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password YOUR_PASSWORD \
  --allocated-storage 20

# Create ElastiCache Redis cluster
aws elasticache create-cache-cluster \
  --cache-cluster-id meal-plans-cache \
  --engine redis \
  --cache-node-type cache.t3.micro \
  --num-cache-nodes 1
```

### Option B: Deploy to DigitalOcean (Budget-Friendly)

#### Step 1: Create Droplet

```bash
# Create Ubuntu 22.04 droplet (2GB RAM minimum)
doctl compute droplet create meal-planning-server \
  --image ubuntu-22-04-x64 \
  --size s-2vcpu-2gb \
  --region sfo3
```

#### Step 2: Install Docker and Docker Compose

```bash
# SSH into droplet
ssh root@your-droplet-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Step 3: Deploy Agent System

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/meal-plans-commerce.git
cd meal-plans-commerce/agents

# Create .env file
cp .env.example .env
nano .env  # Edit with your API keys

# Start services
docker-compose up -d

# Check status
docker-compose ps
```

#### Step 4: Set Up Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx

# Configure SSL with Let's Encrypt
sudo snap install certbot --classic
sudo certbot --nginx -d api.yourdomain.com

# Update Nginx config
sudo nano /etc/nginx/sites-available/meal-planning
```

```nginx
server {
    listen 443 ssl;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location /meal-planning/ {
        proxy_pass http://localhost:5001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /social-media/ {
        proxy_pass http://localhost:5002/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /analytics/ {
        proxy_pass http://localhost:5003/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Enable and restart
sudo ln -s /etc/nginx/sites-available/meal-planning /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Option C: Deploy to Google Cloud Run (Serverless)

#### Step 1: Build and Push to Google Container Registry

```bash
# Configure gcloud
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Enable APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com

# Build and push
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/meal-planning-agent ./meal-planning
```

#### Step 2: Deploy to Cloud Run

```bash
gcloud run deploy meal-planning-api \
  --image gcr.io/YOUR_PROJECT_ID/meal-planning-agent \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="OPENAI_API_KEY=${OPENAI_API_KEY},ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}"
```

#### Step 3: Set Up Cloud SQL and Memorystore

```bash
# Create Cloud SQL PostgreSQL instance
gcloud sql instances create meal-plans-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=us-central1

# Create Memorystore Redis instance
gcloud redis instances create meal-plans-cache \
  --size=1 \
  --region=us-central1
```

## Part 3: Connect Frontend to Agent API

### Update Environment Variables in Vercel

Add your agent API endpoints:

```env
NEXT_PUBLIC_MEAL_PLANNING_API=https://api.yourdomain.com/meal-planning
NEXT_PUBLIC_SOCIAL_MEDIA_API=https://api.yourdomain.com/social-media
NEXT_PUBLIC_ANALYTICS_API=https://api.yourdomain.com/analytics
```

### Update API Calls in Frontend

```typescript
// lib/api.ts
export async function generateMealPlan(menuType: string, month: number, year: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MEAL_PLANNING_API}/api/generate_meal_plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ menu_type: menuType, month, year })
  });

  if (!response.ok) throw new Error('Failed to generate meal plan');
  return response.json();
}
```

## Part 4: Post-Deployment

### 1. Test Everything

```bash
# Test meal planning API
curl https://api.yourdomain.com/meal-planning/health

# Generate test meal plan
curl -X POST https://api.yourdomain.com/meal-planning/api/generate_meal_plan \
  -H "Content-Type: application/json" \
  -d '{"menu_type": "mediterranean", "month": 12, "year": 2024}'

# Test Stripe checkout
# Visit your site and click "Get Started"
```

### 2. Set Up Monitoring

#### Vercel Analytics
- Already included, check dashboard

#### Agent Monitoring
```bash
# Access Grafana
https://your-server:3000
# Default: admin/admin

# Access RabbitMQ Management
https://your-server:15672
# Default: admin/admin
```

### 3. Configure Backups

```bash
# Database backup script
cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker exec postgres pg_dump -U postgres meal_plans > backup_$DATE.sql
# Upload to S3 or other storage
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
EOF

chmod +x backup.sh

# Add to crontab (daily at 2 AM)
echo "0 2 * * * /root/backup.sh" | crontab -
```

### 4. Set Up Auto-Scaling (AWS)

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Resources": {
    "AutoScalingTarget": {
      "Type": "AWS::ApplicationAutoScaling::ScalableTarget",
      "Properties": {
        "ServiceNamespace": "ecs",
        "ResourceId": "service/meal-planning-cluster/meal-planning-api",
        "ScalableDimension": "ecs:service:DesiredCount",
        "MinCapacity": 1,
        "MaxCapacity": 10
      }
    },
    "AutoScalingPolicy": {
      "Type": "AWS::ApplicationAutoScaling::ScalingPolicy",
      "Properties": {
        "PolicyName": "cpu-scaling",
        "ServiceNamespace": "ecs",
        "ResourceId": "service/meal-planning-cluster/meal-planning-api",
        "ScalableDimension": "ecs:service:DesiredCount",
        "TargetTrackingScalingPolicyConfiguration": {
          "TargetValue": 75.0,
          "PredefinedMetricSpecification": {
            "PredefinedMetricType": "ECSServiceAverageCPUUtilization"
          }
        }
      }
    }
  }
}
```

## Troubleshooting

### Frontend Issues

| Issue | Solution |
|-------|----------|
| Build fails on Vercel | Check environment variables and build logs |
| Stripe checkout not working | Verify API keys and webhook configuration |
| 404 on custom pages | Clear Vercel cache and redeploy |

### Agent System Issues

| Issue | Solution |
|-------|----------|
| Containers not starting | Check logs: `docker-compose logs -f` |
| Database connection failed | Verify DATABASE_URL format and credentials |
| AI generation not working | Check API keys and rate limits |
| High memory usage | Increase server RAM or optimize code |

### Quick Fixes

```bash
# Restart all services
docker-compose restart

# View logs
docker-compose logs -f meal-planning-api

# Check container status
docker ps -a

# Clear Redis cache
docker exec -it redis redis-cli FLUSHALL

# Reset database
docker-compose down -v
docker-compose up -d
```

## Security Checklist

- [ ] All API keys in environment variables
- [ ] SSL certificates configured
- [ ] Database passwords strong and unique
- [ ] Firewall rules configured
- [ ] Regular security updates scheduled
- [ ] Backup strategy implemented
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention

## Support

For deployment issues:
- Frontend: Check Vercel documentation
- Agents: Review Docker logs
- Database: Check connection strings
- AI: Verify API keys and quotas

Need help? Contact: support@mochasmindlab.com