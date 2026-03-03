/**
 * Centralized Error Logging Utility
 * Provides structured error logging with support for external error tracking services
 */

import { env } from '../config/env';

export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface LoggedError {
  message: string;
  severity: ErrorSeverity;
  timestamp: string;
  environment: string;
  context?: ErrorContext;
  stack?: string;
  error?: Error;
}

class ErrorLogger {
  private errors: LoggedError[] = [];
  private maxStoredErrors = 100;

  /**
   * Logs an error with context
   */
  logError(
    error: Error | string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context?: ErrorContext
  ): void {
    const errorObj = typeof error === 'string' ? new Error(error) : error;

    const loggedError: LoggedError = {
      message: errorObj.message,
      severity,
      timestamp: new Date().toISOString(),
      environment: env.app.environment,
      context,
      stack: errorObj.stack,
      error: errorObj,
    };

    // Store error in memory (for debugging)
    this.errors.push(loggedError);
    if (this.errors.length > this.maxStoredErrors) {
      this.errors.shift();
    }

    // Console logging (different formats for dev/prod)
    if (env.app.isDevelopment) {
      console.group(`🔴 [${severity.toUpperCase()}] ${errorObj.message}`);
      console.error('Error:', errorObj);
      if (context) {
        console.log('Context:', context);
      }
      if (errorObj.stack) {
        console.log('Stack:', errorObj.stack);
      }
      console.groupEnd();
    } else {
      // Structured JSON logging for production
      console.error(JSON.stringify(loggedError));
    }

    // Send to external error tracking service
    this.sendToErrorTrackingService(loggedError);

    // For critical errors in production, could trigger additional alerts
    if (severity === ErrorSeverity.CRITICAL && env.app.isProduction) {
      this.handleCriticalError(loggedError);
    }
  }

  /**
   * Logs a warning
   */
  logWarning(message: string, context?: ErrorContext): void {
    if (env.app.isDevelopment) {
      console.warn(`⚠️  ${message}`, context || '');
    } else {
      console.warn(JSON.stringify({
        level: 'warning',
        message,
        timestamp: new Date().toISOString(),
        context,
      }));
    }
  }

  /**
   * Logs informational message
   */
  logInfo(message: string, context?: ErrorContext): void {
    if (env.app.isDevelopment) {
      console.log(`ℹ️  ${message}`, context || '');
    } else {
      console.log(JSON.stringify({
        level: 'info',
        message,
        timestamp: new Date().toISOString(),
        context,
      }));
    }
  }

  /**
   * Gets recent errors (useful for debugging)
   */
  getRecentErrors(count: number = 10): LoggedError[] {
    return this.errors.slice(-count);
  }

  /**
   * Clears stored errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Sends error to external tracking service (Sentry, DataDog, etc.)
   * TODO: Integrate with your error tracking service
   */
  private sendToErrorTrackingService(error: LoggedError): void {
    // In production, integrate with services like:
    // - Sentry: Sentry.captureException(error.error, { contexts: error.context })
    // - DataDog: DD_LOGS.logger.error(error.message, error)
    // - LogRocket: LogRocket.captureException(error.error)

    // For now, we'll use a placeholder
    if (env.app.isProduction) {
      // Example integration point
      // this.sendToSentry(error);
    }
  }

  /**
   * Handles critical errors that need immediate attention
   */
  private handleCriticalError(error: LoggedError): void {
    // In production, this could:
    // - Send alerts to PagerDuty/OpsGenie
    // - Send notifications to Slack/Teams
    // - Trigger automated rollback if needed
    // - Create incident in incident management system

    // For now, log to console
    console.error('CRITICAL ERROR DETECTED:', error);
  }

  /**
   * Creates a error boundary handler
   */
  createErrorBoundaryHandler() {
    return (error: Error, errorInfo: { componentStack: string }) => {
      this.logError(error, ErrorSeverity.HIGH, {
        component: 'ErrorBoundary',
        metadata: {
          componentStack: errorInfo.componentStack,
        },
      });
    };
  }

  /**
   * Creates a promise rejection handler
   */
  setupGlobalErrorHandlers(): void {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        ErrorSeverity.HIGH,
        {
          action: 'unhandledRejection',
          metadata: { promise: event.promise },
        }
      );
    });

    // Handle global errors
    window.addEventListener('error', (event) => {
      this.logError(
        event.error || new Error(event.message),
        ErrorSeverity.HIGH,
        {
          action: 'globalError',
          metadata: {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
          },
        }
      );
    });
  }
}

// Create singleton instance
export const errorLogger = new ErrorLogger();

// Setup global handlers
if (typeof window !== 'undefined') {
  errorLogger.setupGlobalErrorHandlers();
}

// Export convenience functions
export const logError = errorLogger.logError.bind(errorLogger);
export const logWarning = errorLogger.logWarning.bind(errorLogger);
export const logInfo = errorLogger.logInfo.bind(errorLogger);
