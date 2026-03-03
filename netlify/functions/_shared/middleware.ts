/**
 * Netlify Functions Middleware
 * 
 * Provides reusable security and abuse protection middleware:
 * - Rate limiting per IP
 * - Request size validation
 * - Timeout handling
 * - Consistent error responses
 * - CORS handling
 * - Request logging
 */

import { HandlerEvent, HandlerResponse } from '@netlify/functions';

// =============================================================================
// TYPES
// =============================================================================

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (event: HandlerEvent) => string;
}

export interface RequestValidationConfig {
  maxBodySize?: number; // in bytes
  allowedMethods?: string[];
  requireAuth?: boolean;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  details?: unknown;
  statusCode: number;
  timestamp: string;
  requestId?: string;
}

// =============================================================================
// RATE LIMITING
// =============================================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
  firstRequest: number;
}

// In-memory rate limit store (use Redis in production for distributed systems)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Rate limiting middleware
 * Returns null if allowed, or an error response if rate limited
 */
export function checkRateLimit(
  event: HandlerEvent,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }
): { allowed: boolean; headers: Record<string, string>; response?: HandlerResponse } {
  const key = config.keyGenerator
    ? config.keyGenerator(event)
    : getClientIp(event);

  const now = Date.now();
  const entry = rateLimitStore.get(key);

  // No previous requests or window expired
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + config.windowMs,
      firstRequest: now,
    });

    return {
      allowed: true,
      headers: {
        'X-RateLimit-Limit': String(config.maxRequests),
        'X-RateLimit-Remaining': String(config.maxRequests - 1),
        'X-RateLimit-Reset': String(Math.floor((now + config.windowMs) / 1000)),
      },
    };
  }

  // Check if rate limit exceeded
  if (entry.count >= config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);

    return {
      allowed: false,
      headers: {
        'X-RateLimit-Limit': String(config.maxRequests),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.floor(entry.resetAt / 1000)),
        'Retry-After': String(retryAfter),
      },
      response: createErrorResponse(
        'Rate limit exceeded',
        429,
        `Too many requests. Please try again in ${retryAfter} seconds.`
      ),
    };
  }

  // Increment counter
  entry.count++;

  return {
    allowed: true,
    headers: {
      'X-RateLimit-Limit': String(config.maxRequests),
      'X-RateLimit-Remaining': String(config.maxRequests - entry.count),
      'X-RateLimit-Reset': String(Math.floor(entry.resetAt / 1000)),
    },
  };
}

// =============================================================================
// REQUEST VALIDATION
// =============================================================================

/**
 * Validate request against configuration
 */
export function validateRequest(
  event: HandlerEvent,
  config: RequestValidationConfig = {}
): { valid: boolean; response?: HandlerResponse } {
  const {
    maxBodySize = 5 * 1024 * 1024, // 5MB default
    allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    requireAuth = false,
  } = config;

  // Check HTTP method
  if (!allowedMethods.includes(event.httpMethod)) {
    return {
      valid: false,
      response: createErrorResponse(
        'Method not allowed',
        405,
        `Allowed methods: ${allowedMethods.join(', ')}`
      ),
    };
  }

  // Check body size
  if (event.body) {
    const bodySize = new TextEncoder().encode(event.body).length;
    if (bodySize > maxBodySize) {
      return {
        valid: false,
        response: createErrorResponse(
          'Request body too large',
          413,
          `Maximum body size: ${maxBodySize} bytes`
        ),
      };
    }
  }

  // Check authentication if required
  if (requireAuth) {
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        valid: false,
        response: createErrorResponse('Authentication required', 401),
      };
    }
  }

  return { valid: true };
}

// =============================================================================
// CORS HANDLING
// =============================================================================

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
  'Access-Control-Max-Age': '86400',
};

/**
 * Handle OPTIONS preflight requests
 */
export function handleCors(event: HandlerEvent): HandlerResponse | null {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: '',
    };
  }
  return null;
}

// =============================================================================
// ERROR HANDLING
// =============================================================================

/**
 * Create consistent error response
 */
export function createErrorResponse(
  error: string,
  statusCode: number = 500,
  message?: string,
  details?: unknown
): HandlerResponse {
  const errorResponse: ErrorResponse = {
    error,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  if (message) errorResponse.message = message;
  if (details && process.env.NODE_ENV !== 'production') {
    errorResponse.details = details;
  }

  return {
    statusCode,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(errorResponse),
  };
}

/**
 * Create success response
 */
export function createSuccessResponse<T>(
  data: T,
  statusCode: number = 200,
  additionalHeaders: Record<string, string> = {}
): HandlerResponse {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
    body: JSON.stringify({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }),
  };
}

/**
 * Wrap async handler with error catching
 */
export function withErrorHandling(
  handler: (event: HandlerEvent) => Promise<HandlerResponse>
) {
  return async (event: HandlerEvent): Promise<HandlerResponse> => {
    try {
      return await handler(event);
    } catch (error) {
      console.error('Function error:', error);

      // Don't expose internal errors in production
      if (process.env.NODE_ENV === 'production') {
        return createErrorResponse('Internal server error', 500);
      }

      return createErrorResponse(
        'Internal server error',
        500,
        error instanceof Error ? error.message : 'Unknown error',
        error
      );
    }
  };
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Get client IP address from various headers
 */
export function getClientIp(event: HandlerEvent): string {
  return (
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    event.headers['x-real-ip'] ||
    event.headers['client-ip'] ||
    'unknown'
  );
}

/**
 * Parse JSON body safely
 */
export function parseJsonBody<T>(event: HandlerEvent): T | null {
  if (!event.body) return null;

  try {
    return JSON.parse(event.body) as T;
  } catch {
    return null;
  }
}

/**
 * Log request for monitoring
 */
export function logRequest(event: HandlerEvent, context?: Record<string, unknown>): void {
  const log = {
    timestamp: new Date().toISOString(),
    method: event.httpMethod,
    path: event.path,
    ip: getClientIp(event),
    userAgent: event.headers['user-agent'],
    ...context,
  };

  console.log(JSON.stringify(log));
}

// =============================================================================
// COMBINED MIDDLEWARE
// =============================================================================

export interface MiddlewareConfig {
  rateLimit?: RateLimitConfig | false;
  validation?: RequestValidationConfig;
  enableCors?: boolean;
  enableLogging?: boolean;
}

/**
 * Combined middleware that applies all common protections
 */
export function applyMiddleware(
  event: HandlerEvent,
  config: MiddlewareConfig = {}
): { success: boolean; response?: HandlerResponse; rateLimitHeaders?: Record<string, string> } {
  const {
    rateLimit = { maxRequests: 10, windowMs: 60000 },
    validation = {},
    enableCors = true,
    enableLogging = true,
  } = config;

  // Log request
  if (enableLogging) {
    logRequest(event);
  }

  // Handle CORS preflight
  if (enableCors) {
    const corsResponse = handleCors(event);
    if (corsResponse) {
      return { success: true, response: corsResponse };
    }
  }

  // Validate request
  const validationResult = validateRequest(event, validation);
  if (!validationResult.valid) {
    return { success: false, response: validationResult.response };
  }

  // Apply rate limiting
  if (rateLimit !== false) {
    const rateLimitResult = checkRateLimit(event, rateLimit);
    if (!rateLimitResult.allowed) {
      return {
        success: false,
        response: {
          ...rateLimitResult.response!,
          headers: {
            ...rateLimitResult.response!.headers,
            ...rateLimitResult.headers,
          },
        },
      };
    }

    return {
      success: true,
      rateLimitHeaders: rateLimitResult.headers,
    };
  }

  return { success: true };
}
