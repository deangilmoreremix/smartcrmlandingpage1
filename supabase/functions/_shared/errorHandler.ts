/**
 * Centralized Error Handling for Edge Functions
 * Provides consistent error responses and logging
 */

export interface ErrorResponse {
  error: string;
  message: string;
  code?: string;
  details?: unknown;
  timestamp: string;
  requestId?: string;
}

export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
}

export class AppError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, ErrorCode.AUTHENTICATION_ERROR, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, ErrorCode.AUTHORIZATION_ERROR, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, ErrorCode.NOT_FOUND, 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, ErrorCode.CONFLICT, 409, details);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, ErrorCode.RATE_LIMIT_EXCEEDED, 429);
    this.name = 'RateLimitError';
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string) {
    super(`${service} service error: ${message}`, ErrorCode.EXTERNAL_SERVICE_ERROR, 502);
    this.name = 'ExternalServiceError';
  }
}

/**
 * Formats error for JSON response
 */
export function formatErrorResponse(
  error: Error,
  requestId?: string
): ErrorResponse {
  const timestamp = new Date().toISOString();

  if (error instanceof AppError) {
    return {
      error: error.name,
      message: error.message,
      code: error.code,
      details: error.details,
      timestamp,
      requestId,
    };
  }

  // For unknown errors, don't expose internal details in production
  const isDevelopment = Deno.env.get('DENO_ENV') === 'development';

  return {
    error: 'InternalError',
    message: isDevelopment ? error.message : 'An internal error occurred',
    code: ErrorCode.INTERNAL_ERROR,
    details: isDevelopment ? error.stack : undefined,
    timestamp,
    requestId,
  };
}

/**
 * Creates error response with proper headers
 */
export function createErrorResponse(
  error: Error,
  corsHeaders: Record<string, string>,
  requestId?: string
): Response {
  const errorResponse = formatErrorResponse(error, requestId);
  const statusCode = error instanceof AppError ? error.statusCode : 500;

  // Log error (in production, this would go to logging service)
  console.error(JSON.stringify({
    level: 'error',
    timestamp: errorResponse.timestamp,
    error: errorResponse.error,
    message: errorResponse.message,
    code: errorResponse.code,
    statusCode,
    requestId,
    stack: error.stack,
  }));

  return new Response(JSON.stringify(errorResponse), {
    status: statusCode,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Wraps async handler with error handling
 */
export function withErrorHandler(
  handler: (req: Request) => Promise<Response>,
  corsHeaders: Record<string, string>
): (req: Request) => Promise<Response> {
  return async (req: Request): Promise<Response> => {
    const requestId = crypto.randomUUID();

    try {
      // Add request ID to headers
      const response = await handler(req);
      response.headers.set('X-Request-ID', requestId);
      return response;
    } catch (error) {
      return createErrorResponse(
        error instanceof Error ? error : new Error(String(error)),
        corsHeaders,
        requestId
      );
    }
  };
}

/**
 * Logs structured information
 */
export function logInfo(message: string, metadata?: Record<string, unknown>): void {
  console.log(JSON.stringify({
    level: 'info',
    timestamp: new Date().toISOString(),
    message,
    ...metadata,
  }));
}

/**
 * Logs structured warnings
 */
export function logWarning(message: string, metadata?: Record<string, unknown>): void {
  console.warn(JSON.stringify({
    level: 'warning',
    timestamp: new Date().toISOString(),
    message,
    ...metadata,
  }));
}

/**
 * Logs structured errors
 */
export function logError(
  error: Error,
  metadata?: Record<string, unknown>
): void {
  console.error(JSON.stringify({
    level: 'error',
    timestamp: new Date().toISOString(),
    error: error.name,
    message: error.message,
    stack: error.stack,
    ...metadata,
  }));
}
