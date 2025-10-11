# 🔍 Monitoring System

## Overview
Comprehensive monitoring and alerting system for the Mindful Meal Plans platform.

## Endpoints

### Health Check
**GET** `/api/health`
- Full system health check with response times
- Database, Stripe, and Email service status
- Memory usage and uptime metrics

### Status Dashboard
**GET** `/api/status`
- Error frequency monitoring
- Service-level status tracking
- Recent error summaries

## Features

### ✅ Error Tracking
- **Webhook failures** - Automatic alerts after 5 failures in 10 minutes
- **Email failures** - Alerts after 3 failures in 10 minutes
- **Database errors** - Critical alerts after 2 errors in 5 minutes

### ✅ Performance Monitoring
- Response time tracking for all endpoints
- Purchase completion metrics
- Memory and uptime monitoring

### ✅ Automatic Alerting
- Email alerts to `admin@mochasmindlab.com`
- Severity levels: low, medium, high, critical
- Context-rich error reports with timestamps

## Alert Thresholds

| Service | Threshold | Time Window | Severity |
|---------|-----------|-------------|----------|
| Webhook | 5 errors | 10 minutes | Critical |
| Email | 3 errors | 10 minutes | High |
| Database | 2 errors | 5 minutes | Critical |

## Usage Examples

### Manual Health Check
```bash
curl https://mindfulmealplan.com/api/health
```

### Monitor Status
```bash
curl https://mindfulmealplan.com/api/status
```

### Production Monitoring
- Set up external monitoring (Pingdom, UptimeRobot) to hit `/api/health` every 5 minutes
- Configure alerts when health check returns 503 status
- Monitor response times > 5 seconds

## Environment Variables
No additional environment variables required - uses existing email and database configs.

## Future Enhancements
- [ ] Integration with external monitoring services (Datadog, Sentry)
- [ ] Slack webhook alerts
- [ ] Performance trend analysis
- [ ] Custom dashboard UI
- [ ] Database performance metrics
- [ ] User activity tracking