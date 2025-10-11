import { sendEmail } from '@/lib/email'

export interface ErrorReport {
  timestamp: string
  environment: string
  service: string
  error: string
  context?: Record<string, any>
  severity: 'low' | 'medium' | 'high' | 'critical'
  userId?: string
  sessionId?: string
}

export interface MetricData {
  timestamp: string
  metric: string
  value: number
  tags?: Record<string, string>
}

class MonitoringService {
  private errorThresholds = {
    webhook_failures: 5, // Alert after 5 webhook failures in 10 minutes
    email_failures: 3,   // Alert after 3 email failures in 10 minutes
    database_errors: 2,  // Alert after 2 database errors in 5 minutes
  }

  private recentErrors: ErrorReport[] = []
  private recentMetrics: MetricData[] = []

  // Log errors with context
  async logError(error: ErrorReport) {
    console.error('🚨 Error Report:', {
      ...error,
      timestamp: new Date().toISOString()
    })

    // Store in memory for threshold checking
    this.recentErrors.push({
      ...error,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    })

    // Clean old errors (keep last hour)
    const oneHourAgo = Date.now() - (60 * 60 * 1000)
    this.recentErrors = this.recentErrors.filter(
      err => new Date(err.timestamp).getTime() > oneHourAgo
    )

    // Check if we need to send alerts
    await this.checkAlertThresholds(error)

    // In production, you could also send to external services like:
    // - Sentry: Sentry.captureException(error)
    // - LogRocket: LogRocket.captureException(error)
    // - Datadog: DdTrace.captureException(error)
  }

  // Log performance metrics
  async logMetric(metric: MetricData) {
    console.log('📊 Metric:', {
      ...metric,
      timestamp: new Date().toISOString()
    })

    this.recentMetrics.push({
      ...metric,
      timestamp: new Date().toISOString()
    })

    // Keep last hour of metrics
    const oneHourAgo = Date.now() - (60 * 60 * 1000)
    this.recentMetrics = this.recentMetrics.filter(
      metric => new Date(metric.timestamp).getTime() > oneHourAgo
    )
  }

  // Check if we need to send alerts based on error frequency
  private async checkAlertThresholds(latestError: ErrorReport) {
    const tenMinutesAgo = Date.now() - (10 * 60 * 1000)
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000)

    // Count recent errors by service
    const recentWebhookErrors = this.recentErrors.filter(
      err => err.service === 'webhook' && new Date(err.timestamp).getTime() > tenMinutesAgo
    ).length

    const recentEmailErrors = this.recentErrors.filter(
      err => err.service === 'email' && new Date(err.timestamp).getTime() > tenMinutesAgo
    ).length

    const recentDatabaseErrors = this.recentErrors.filter(
      err => err.service === 'database' && new Date(err.timestamp).getTime() > fiveMinutesAgo
    ).length

    // Send alerts if thresholds exceeded
    if (recentWebhookErrors >= this.errorThresholds.webhook_failures) {
      await this.sendAlert('webhook', recentWebhookErrors, 'critical')
    }

    if (recentEmailErrors >= this.errorThresholds.email_failures) {
      await this.sendAlert('email', recentEmailErrors, 'high')
    }

    if (recentDatabaseErrors >= this.errorThresholds.database_errors) {
      await this.sendAlert('database', recentDatabaseErrors, 'critical')
    }
  }

  // Send alert emails to admin
  private async sendAlert(service: string, errorCount: number, severity: string) {
    const alertMessage = `
🚨 ALERT: ${service.toUpperCase()} SERVICE ISSUES

Severity: ${severity.toUpperCase()}
Error Count: ${errorCount} errors in the last 10 minutes
Environment: ${process.env.NODE_ENV}
Time: ${new Date().toISOString()}

Recent Errors:
${this.recentErrors
  .filter(err => err.service === service)
  .slice(-5)
  .map(err => `- ${err.timestamp}: ${err.error}`)
  .join('\n')}

Please check the application logs and health status:
${process.env.NEXT_PUBLIC_DOMAIN}/api/health

Best regards,
Mindful Meal Plans Monitoring System
    `.trim()

    try {
      await sendEmail({
        to: 'admin@mochasmindlab.com',
        subject: `🚨 ${severity.toUpperCase()}: ${service} service issues detected`,
        html: `<pre>${alertMessage}</pre>`
      })

      console.log(`✅ Alert sent for ${service} service issues`)
    } catch (error) {
      console.error('❌ Failed to send alert email:', error)
    }
  }

  // Get current system status
  getSystemStatus() {
    const now = Date.now()
    const fiveMinutesAgo = now - (5 * 60 * 1000)
    const tenMinutesAgo = now - (10 * 60 * 1000)

    const recentErrors = this.recentErrors.filter(
      err => new Date(err.timestamp).getTime() > fiveMinutesAgo
    )

    const criticalErrors = recentErrors.filter(err => err.severity === 'critical')
    const highErrors = recentErrors.filter(err => err.severity === 'high')

    return {
      status: criticalErrors.length > 0 ? 'critical' :
              highErrors.length > 0 ? 'degraded' : 'healthy',
      recentErrorCount: recentErrors.length,
      criticalErrorCount: criticalErrors.length,
      services: {
        webhook: this.getServiceStatus('webhook', tenMinutesAgo),
        email: this.getServiceStatus('email', tenMinutesAgo),
        database: this.getServiceStatus('database', fiveMinutesAgo),
      }
    }
  }

  private getServiceStatus(service: string, since: number) {
    const errors = this.recentErrors.filter(
      err => err.service === service && new Date(err.timestamp).getTime() > since
    )

    return {
      status: errors.length === 0 ? 'healthy' : 'error',
      errorCount: errors.length,
      lastError: errors.length > 0 ? errors[errors.length - 1] : null
    }
  }
}

// Export singleton instance
export const monitoring = new MonitoringService()

// Helper functions for common monitoring tasks
export async function trackWebhookError(error: string, context?: Record<string, any>) {
  await monitoring.logError({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    service: 'webhook',
    error,
    context,
    severity: 'high'
  })
}

export async function trackEmailError(error: string, context?: Record<string, any>) {
  await monitoring.logError({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    service: 'email',
    error,
    context,
    severity: 'medium'
  })
}

export async function trackDatabaseError(error: string, context?: Record<string, any>) {
  await monitoring.logError({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    service: 'database',
    error,
    context,
    severity: 'critical'
  })
}

export async function trackPurchaseMetric(amount: number, currency: string = 'usd') {
  await monitoring.logMetric({
    timestamp: new Date().toISOString(),
    metric: 'purchase_completed',
    value: amount,
    tags: { currency }
  })
}

export async function trackResponseTime(endpoint: string, timeMs: number) {
  await monitoring.logMetric({
    timestamp: new Date().toISOString(),
    metric: 'response_time',
    value: timeMs,
    tags: { endpoint }
  })
}