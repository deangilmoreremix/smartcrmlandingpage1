/**
 * API Client with Retry Logic, Timeouts, and Error Handling
 * Production-grade HTTP client for reliable API communication with Result<T> pattern
 */

import { logError, logWarning, ErrorSeverity } from './errorLogger';

export interface ApiClientConfig {
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

export interface RequestConfig extends RequestInit {
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
  retryOn?: number[];
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timeout') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export interface AppError {
  code: string;
  message: string;
  status?: number;
  details?: unknown;
}

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppError };

export function createError(
  code: string,
  message: string,
  status?: number,
  details?: unknown
): AppError {
  return { code, message, status, details };
}

export function success<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function failure<T>(error: AppError): Result<T> {
  return { ok: false, error };
}

export class ApiClient {
  private baseUrl: string;
  private timeout: number;
  private maxRetries: number;
  private retryDelay: number;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl ?? '';
    this.timeout = config.timeout ?? 30000;
    this.maxRetries = config.maxRetries ?? 3;
    this.retryDelay = config.retryDelay ?? 1000;
    this.defaultHeaders = config.headers ?? {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Creates an AbortController with timeout
   */
  private createTimeoutController(timeout: number): AbortController {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller;
  }

  /**
   * Delays execution for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Determines if request should be retried
   */
  private shouldRetry(
    error: Error,
    attempt: number,
    maxRetries: number,
    retryOn: number[]
  ): boolean {
    if (attempt >= maxRetries) {
      return false;
    }

    // Retry on network errors
    if (error.name === 'TypeError' || error.name === 'NetworkError') {
      return true;
    }

    // Retry on timeout
    if (error instanceof TimeoutError) {
      return true;
    }

    // Retry on specific status codes
    if (error instanceof ApiError && error.status) {
      return retryOn.includes(error.status);
    }

    return false;
  }

  /**
   * Calculates retry delay with exponential backoff
   */
  private calculateRetryDelay(attempt: number, baseDelay: number): number {
    return baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
  }

  /**
   * Makes HTTP request with retry logic
   */
  async request<T = unknown>(
    url: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      timeout = this.timeout,
      maxRetries = this.maxRetries,
      retryDelay = this.retryDelay,
      retryOn = [408, 429, 500, 502, 503, 504],
      headers = {},
      ...fetchOptions
    } = config;

    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = this.createTimeoutController(timeout);

        const response = await fetch(fullUrl, {
          ...fetchOptions,
          headers: requestHeaders,
          signal: controller.signal,
        });

        // Handle non-2xx responses
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new ApiError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            response,
            errorData
          );
        }

        // Parse response
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          return await response.json();
        }

        return await response.text() as T;
      } catch (error) {
        // Handle abort/timeout
        if (error instanceof Error && error.name === 'AbortError') {
          lastError = new TimeoutError(
            `Request to ${fullUrl} timed out after ${timeout}ms`
          );
        } else if (error instanceof ApiError) {
          lastError = error;
        } else {
          lastError = error instanceof Error ? error : new Error(String(error));
        }

        // Check if we should retry
        if (this.shouldRetry(lastError, attempt, maxRetries, retryOn)) {
          const delay = this.calculateRetryDelay(attempt, retryDelay);

          logWarning(
            `Request failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`,
            {
              action: 'apiRequest',
              metadata: {
                url: fullUrl,
                attempt: attempt + 1,
                error: lastError.message,
              },
            }
          );

          await this.delay(delay);
          continue;
        }

        // No more retries, throw the error
        break;
      }
    }

    // Log the final error
    logError(
      lastError || new Error('Unknown API error'),
      ErrorSeverity.HIGH,
      {
        action: 'apiRequest',
        metadata: {
          url: fullUrl,
          method: config.method || 'GET',
          attempts: maxRetries + 1,
        },
      }
    );

    throw lastError;
  }

  /**
   * Convenience method for GET requests
   */
  async get<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  /**
   * Convenience method for POST requests
   */
  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Convenience method for PUT requests
   */
  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Convenience method for DELETE requests
   */
  async delete<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  /**
   * Convenience method for PATCH requests
   */
  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Safe request that returns Result<T> instead of throwing
   */
  async safeRequest<T = unknown>(
    url: string,
    config: RequestConfig = {}
  ): Promise<Result<T>> {
    try {
      const data = await this.request<T>(url, config);
      return success(data);
    } catch (error) {
      if (error instanceof ApiError) {
        return failure({
          code: 'API_ERROR',
          message: error.message,
          status: error.status,
          details: error.data,
        });
      }
      if (error instanceof TimeoutError) {
        return failure({
          code: 'TIMEOUT',
          message: error.message,
        });
      }
      return failure({
        code: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }

  /**
   * Safe GET request
   */
  async safeGet<T = unknown>(url: string, config?: RequestConfig): Promise<Result<T>> {
    return this.safeRequest<T>(url, { ...config, method: 'GET' });
  }

  /**
   * Safe POST request
   */
  async safePost<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<Result<T>> {
    return this.safeRequest<T>(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Safe PUT request
   */
  async safePut<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<Result<T>> {
    return this.safeRequest<T>(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Safe DELETE request
   */
  async safeDelete<T = unknown>(url: string, config?: RequestConfig): Promise<Result<T>> {
    return this.safeRequest<T>(url, { ...config, method: 'DELETE' });
  }

  /**
   * Safe PATCH request
   */
  async safePatch<T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<Result<T>> {
    return this.safeRequest<T>(url, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Safe JSON parsing that never throws
   */
  static safeJsonParse<T = unknown>(text: string): Result<T> {
    try {
      const data = JSON.parse(text);
      return success(data);
    } catch (error) {
      return failure({
        code: 'JSON_PARSE_ERROR',
        message: 'Failed to parse JSON',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

// Create default API client instance
export const apiClient = new ApiClient();
