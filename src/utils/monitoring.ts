/**
 * Monitoring and Observability Utilities
 * Tracks performance metrics, user actions, and business events
 */

import { env } from '../config/env';
import { logInfo } from './errorLogger';

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface UserAction {
  action: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

export interface BusinessEvent {
  event: string;
  properties: Record<string, unknown>;
  timestamp: string;
}

class MonitoringService {
  private metrics: PerformanceMetric[] = [];
  private maxStoredMetrics = 100;

  /**
   * Tracks a performance metric
   */
  trackMetric(
    name: string,
    value: number,
    unit: 'ms' | 'bytes' | 'count' = 'ms',
    metadata?: Record<string, unknown>
  ): void {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: new Date().toISOString(),
      metadata,
    };

    this.metrics.push(metric);
    if (this.metrics.length > this.maxStoredMetrics) {
      this.metrics.shift();
    }

    // Log in development
    if (env.app.isDevelopment) {
      console.log(`📊 Metric: ${name} = ${value}${unit}`, metadata || '');
    }

    // Send to analytics service in production
    if (env.app.isProduction) {
      this.sendToAnalytics(metric);
    }
  }

  /**
   * Tracks user action
   */
  trackAction(action: UserAction): void {
    logInfo('User action tracked', {
      action: action.action,
      category: action.category,
      label: action.label,
      value: action.value,
    });

    if (env.app.isProduction) {
      // Send to analytics service (Google Analytics, Mixpanel, etc.)
      // Example: gtag('event', action.action, { ... })
    }
  }

  /**
   * Tracks business event
   */
  trackEvent(event: string, properties: Record<string, unknown> = {}): void {
    const businessEvent: BusinessEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
    };

    logInfo('Business event tracked', {
      event,
      properties,
    });

    if (env.app.isProduction) {
      // Send to analytics service
      // Example: analytics.track(event, properties)
    }
  }

  /**
   * Tracks page view
   */
  trackPageView(path: string, title?: string): void {
    this.trackEvent('page_view', {
      path,
      title: title || document.title,
      referrer: document.referrer,
    });
  }

  /**
   * Tracks Core Web Vitals
   */
  trackWebVitals(): void {
    if (typeof window === 'undefined') return;

    // First Contentful Paint (FCP)
    this.observePerformanceEntry('paint', entries => {
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.trackMetric('FCP', entry.startTime, 'ms');
        }
      });
    });

    // Largest Contentful Paint (LCP)
    this.observePerformanceEntry('largest-contentful-paint', entries => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        this.trackMetric('LCP', lastEntry.startTime, 'ms');
      }
    });

    // First Input Delay (FID)
    this.observePerformanceEntry('first-input', entries => {
      entries.forEach(entry => {
        const fidEntry = entry as PerformanceEventTiming;
        if (fidEntry.processingStart) {
          const fid = fidEntry.processingStart - fidEntry.startTime;
          this.trackMetric('FID', fid, 'ms');
        }
      });
    });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    this.observePerformanceEntry('layout-shift', entries => {
      entries.forEach(entry => {
        const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
          clsValue += layoutShiftEntry.value;
        }
      });
      this.trackMetric('CLS', clsValue, 'count');
    });
  }

  /**
   * Observes performance entries
   */
  private observePerformanceEntry(
    type: string,
    callback: (entries: PerformanceEntry[]) => void
  ): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver(list => {
        callback(list.getEntries());
      });
      observer.observe({ type, buffered: true });
    } catch {
      // Silently fail if observer not supported
    }
  }

  /**
   * Measures function execution time
   */
  async measureAsync<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: Record<string, unknown>
  ): Promise<T> {
    const startTime = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - startTime;
      this.trackMetric(name, duration, 'ms', metadata);
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      this.trackMetric(`${name}_error`, duration, 'ms', {
        ...metadata,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  /**
   * Measures synchronous function execution time
   */
  measure<T>(
    name: string,
    fn: () => T,
    metadata?: Record<string, unknown>
  ): T {
    const startTime = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - startTime;
      this.trackMetric(name, duration, 'ms', metadata);
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      this.trackMetric(`${name}_error`, duration, 'ms', {
        ...metadata,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  /**
   * Gets recent metrics
   */
  getRecentMetrics(count: number = 10): PerformanceMetric[] {
    return this.metrics.slice(-count);
  }

  /**
   * Clears stored metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * Sends metric to analytics service
   */
  private sendToAnalytics(metric: PerformanceMetric): void {
    // Placeholder for analytics integration
    // Examples:
    // - Google Analytics: gtag('event', 'performance', { metric_name: metric.name, value: metric.value })
    // - DataDog: DD_RUM.addTiming(metric.name, metric.value)
    // - New Relic: newrelic.addPageAction(metric.name, { value: metric.value })
  }

  /**
   * Tracks API request performance
   */
  trackApiRequest(
    method: string,
    url: string,
    duration: number,
    status: number,
    success: boolean
  ): void {
    this.trackMetric(`api_${method.toLowerCase()}_${success ? 'success' : 'error'}`, duration, 'ms', {
      url,
      status,
      method,
    });
  }
}

// Create singleton instance
export const monitoring = new MonitoringService();

// Setup Web Vitals tracking on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    monitoring.trackWebVitals();
  });
}

// Export convenience functions
export const trackMetric = monitoring.trackMetric.bind(monitoring);
export const trackAction = monitoring.trackAction.bind(monitoring);
export const trackEvent = monitoring.trackEvent.bind(monitoring);
export const trackPageView = monitoring.trackPageView.bind(monitoring);
export const measureAsync = monitoring.measureAsync.bind(monitoring);
export const measure = monitoring.measure.bind(monitoring);
