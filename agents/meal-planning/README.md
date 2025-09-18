# Meal Planning Agent

An intelligent agent that automatically generates complete monthly meal plans with recipes, shopping lists, and meal prep guides.

## Features

- 🍽️ **Multi-Diet Support**: Mediterranean, Intermittent Fasting (16:8), Keto, Family-Friendly
- 📅 **Complete Monthly Plans**: 30+ days of curated meals
- 🛒 **Smart Shopping Lists**: Organized by grocery store sections with cost estimates
- 👨‍🍳 **Meal Prep Guides**: Weekly prep strategies with time estimates
- 🤖 **Automated Generation**: Schedule automatic monthly plan creation
- 🌐 **RESTful API**: Easy integration with web and mobile apps
- 📊 **Nutrition Tracking**: Detailed calorie and macro information

## Quick Start

### Using Docker (Recommended)

1. **Build and run with Docker Compose**:
```bash
cd agents
docker-compose up meal-planning-api -d
```

2. **Access the API**:
```bash
curl http://localhost:5001/api/menu_types
```

### Manual Setup

1. **Install dependencies**:
```bash
pip install -r requirements.txt
```

2. **Run the agent CLI**:
```bash
python run_agent.py mediterranean --month 12 --year 2024
```

3. **Start the API server**:
```bash
python api.py
```

## API Endpoints

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate_meal_plan` | POST | Generate new meal plan |
| `/api/menu_types` | GET | Get available menu types |
| `/api/recipes/<menu_type>` | GET | Get recipes by type |
| `/api/recipe/<menu_type>/<recipe_id>` | GET | Get specific recipe |
| `/api/shopping_list` | POST | Generate shopping list |
| `/api/prep_guide` | POST | Get meal prep guide |
| `/api/nutrition_targets/<menu_type>` | GET | Get nutrition targets |
| `/api/plans` | GET | List generated plans |
| `/api/download_plan/<filename>` | GET | Download plan as JSON |

### Example API Calls

**Generate Mediterranean Meal Plan**:
```bash
curl -X POST http://localhost:5001/api/generate_meal_plan \
  -H "Content-Type: application/json" \
  -d '{
    "menu_type": "mediterranean",
    "month": 12,
    "year": 2024
  }'
```

**Get Shopping List for Week 1**:
```bash
curl -X POST http://localhost:5001/api/shopping_list \
  -H "Content-Type: application/json" \
  -d '{
    "menu_type": "mediterranean",
    "week_number": 1,
    "month": 12,
    "year": 2024
  }'
```

## CLI Usage

### Basic Usage

Generate a Mediterranean meal plan for the current month:
```bash
python run_agent.py mediterranean
```

Generate an Intermittent Fasting plan for December 2024:
```bash
python run_agent.py intermittent_fasting --month 12 --year 2024
```

### Advanced Options

Save with custom filename:
```bash
python run_agent.py mediterranean --output my_meal_plan.json
```

Get detailed output:
```bash
python run_agent.py mediterranean --format detailed
```

Quiet mode (minimal output):
```bash
python run_agent.py mediterranean --quiet
```

## Menu Types

### Mediterranean
- **Focus**: Heart-healthy, anti-inflammatory
- **Calories**: 1400-1500 per day
- **Protein**: 80-100g per day
- **Features**:
  - Greek, Italian, Spanish, Turkish cuisines
  - 3 fish meals per week minimum
  - Daily legumes and vegetables
  - Olive oil as primary fat

### Intermittent Fasting (16:8)
- **Focus**: Metabolic optimization
- **Eating Window**: 12:00 PM - 8:00 PM
- **Calories**: 1400-1600 per day
- **Protein**: 100g per day
- **Features**:
  - High-protein break-fast meals
  - Anti-inflammatory ingredients
  - 4-phase progression system
  - Optimized meal timing

### Keto
- **Focus**: Ketogenic state maintenance
- **Macros**: 70% fat, 25% protein, 5% carbs
- **Net Carbs**: <20g per day
- **Calories**: 1200-1500 per day

### Family-Friendly
- **Focus**: Kid-approved meals
- **Calories**: 1600-2000 per day
- **Features**:
  - 80% kid-friendly recipes
  - Max 30-minute weeknight prep
  - Budget-conscious options

## Configuration

### Environment Variables

Create a `.env` file with:
```env
# Optional AI Integration
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here

# Database
DATABASE_URL=postgresql://user:pass@localhost/meal_plans

# Redis (for caching)
REDIS_URL=redis://localhost:6379
```

### Customizing Recipes

Add new recipes to `meal_planning_agent.py`:
```python
Recipe(
    id="custom_001",
    name="Your Recipe Name",
    category="breakfast",
    cuisine="Mediterranean",
    prep_time="15 minutes",
    calories=350,
    protein="20g",
    ingredients=[...],
    instructions=[...]
)
```

## Integration

### With Next.js App

```typescript
// Example integration with your Next.js app
async function generateMealPlan(menuType: string) {
  const response = await fetch('http://localhost:5001/api/generate_meal_plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      menu_type: menuType,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    })
  });

  const data = await response.json();
  return data.plan;
}
```

### Webhook Integration

The agent can send webhooks when plans are generated:
```python
# Configure in api.py
WEBHOOK_URL = "https://your-app.com/webhook/meal-plan"
```

## Testing

Run tests:
```bash
pytest test_agent.py -v
```

Test specific functionality:
```bash
pytest test_agent.py::TestMealPlanningAgent::test_generate_monthly_plan -v
```

## Monitoring

### Health Check
```bash
curl http://localhost:5001/health
```

### Logs
```bash
docker-compose logs -f meal-planning-api
```

### Metrics
Access Grafana dashboard at http://localhost:3000

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Change port in api.py or docker-compose.yml
   PORT=5002 python api.py
   ```

2. **Recipe not found**:
   - Check recipe ID format: `{menu_type}_{category}_{number}`
   - Verify recipe exists in database

3. **Memory issues with large plans**:
   - Increase Docker memory limit
   - Use pagination for API responses

## Architecture

```
meal-planning-agent/
├── meal_planning_agent.py  # Core agent logic
├── api.py                   # Flask API server
├── run_agent.py            # CLI interface
├── requirements.txt        # Python dependencies
├── Dockerfile             # Container definition
├── data/                  # Generated meal plans
└── logs/                  # Application logs
```

## Contributing

1. Add new recipes to the database
2. Implement additional menu types
3. Enhance nutrition calculations
4. Add multilingual support

## License

Part of Mocha's MindLab Inc. meal planning platform.

## Support

For issues or questions:
- Check logs: `docker-compose logs meal-planning-api`
- API docs: http://localhost:5001/
- Health check: http://localhost:5001/health