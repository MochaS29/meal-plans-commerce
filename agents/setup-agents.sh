#!/bin/bash
# setup-agents.sh
# Complete setup script for the meal planning agent system

echo "🚀 Setting up Automated Meal Planning Agent System..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Docker and Docker Compose are installed"

# Create necessary directories
echo ""
echo "📁 Creating directory structure..."
mkdir -p meal-planning/{data,logs}
mkdir -p social-media/{data,logs}
mkdir -p analytics/{data,logs}
mkdir -p monitoring/{prometheus,grafana/dashboards}
mkdir -p nginx/ssl

print_status "Directory structure created"

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
# Database
DB_PASSWORD=your_secure_password_here
POSTGRES_PASSWORD=your_secure_password_here

# Redis
REDIS_PASSWORD=your_redis_password_here

# RabbitMQ
RABBITMQ_PASSWORD=admin

# API Keys (Optional - add your own)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
TWITTER_API_KEY=
INSTAGRAM_API_KEY=
FACEBOOK_API_KEY=
GOOGLE_ANALYTICS_KEY=

# Monitoring
GRAFANA_PASSWORD=admin

# Security
SECRET_KEY=your-secret-key-here
EOF
    print_status ".env file created - Please update with your API keys"
else
    print_warning ".env file already exists - skipping"
fi

# Create nginx configuration
echo ""
echo "🔧 Creating nginx configuration..."
cat > nginx/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream meal_planning {
        server meal-planning-api:5000;
    }

    upstream social_media {
        server social-media-agent:5000;
    }

    upstream analytics {
        server analytics-agent:5000;
    }

    server {
        listen 80;
        server_name localhost;

        location /api/meal-planning/ {
            proxy_pass http://meal_planning/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /api/social-media/ {
            proxy_pass http://social_media/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /api/analytics/ {
            proxy_pass http://analytics/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /health {
            access_log off;
            add_header 'Content-Type' 'text/plain';
            return 200 "healthy\n";
        }
    }
}
EOF
print_status "Nginx configuration created"

# Create Prometheus configuration
echo ""
echo "📊 Creating monitoring configuration..."
cat > monitoring/prometheus/prometheus.yml << 'EOF'
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'meal-planning-agent'
    static_configs:
      - targets: ['meal-planning-api:5000']

  - job_name: 'social-media-agent'
    static_configs:
      - targets: ['social-media-agent:5000']

  - job_name: 'analytics-agent'
    static_configs:
      - targets: ['analytics-agent:5000']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis:6379']

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres:5432']
EOF
print_status "Prometheus configuration created"

# Build and start services
echo ""
echo "🏗️ Building Docker images..."
docker-compose build

echo ""
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo ""
echo "🔍 Checking service status..."
docker-compose ps

# Display access information
echo ""
echo "✅ Setup complete!"
echo ""
echo "📌 Access Points:"
echo "   • Meal Planning API: http://localhost:5001"
echo "   • Social Media Agent: http://localhost:5002"
echo "   • Analytics Agent: http://localhost:5003"
echo "   • RabbitMQ Management: http://localhost:15672 (admin/admin)"
echo "   • Grafana Dashboard: http://localhost:3000 (admin/admin)"
echo "   • Prometheus: http://localhost:9090"
echo ""
echo "📝 Next Steps:"
echo "   1. Update the .env file with your API keys"
echo "   2. Test the meal planning API:"
echo "      curl http://localhost:5001/api/menu_types"
echo "   3. Generate your first meal plan:"
echo "      curl -X POST http://localhost:5001/api/generate_meal_plan \\"
echo "        -H 'Content-Type: application/json' \\"
echo "        -d '{\"menu_type\": \"mediterranean\", \"month\": 12, \"year\": 2024}'"
echo ""
echo "💡 Tips:"
echo "   • View logs: docker-compose logs -f meal-planning-api"
echo "   • Stop services: docker-compose down"
echo "   • Restart services: docker-compose restart"
echo "   • Remove everything: docker-compose down -v"
echo ""
echo "🎉 Your meal planning agent system is ready!"