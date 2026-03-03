/**
 * Health Check Endpoint
 *
 * Provides system health status for monitoring and alerting:
 * - Environment variable validation
 * - Supabase connectivity check
 * - Service availability
 *
 * Usage:
 * GET /.netlify/functions/health
 *
 * Returns:
 * 200 - System healthy
 * 503 - System degraded or unhealthy
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import {
  applyMiddleware,
  createSuccessResponse,
  createErrorResponse,
} from './_shared/middleware';

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  checks: {
    environment: HealthCheck;
    supabase: HealthCheck;
  };
  uptime?: number;
}

interface HealthCheck {
  status: 'pass' | 'fail';
  message?: string;
  responseTime?: number;
}

// Track process start time for uptime
const startTime = Date.now();

/**
 * Check environment variables
 */
function checkEnvironment(): HealthCheck {
  const requiredVars = [
    'SUPABASE_URL',
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
  ];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    return {
      status: 'fail',
      message: `Missing environment variables: ${missing.join(', ')}`,
    };
  }

  // Check for dangerous exposures
  const envKeys = Object.keys(process.env);
  const dangerous = envKeys.filter((key) =>
    key.startsWith('VITE_') &&
    (key.includes('SERVICE_ROLE') || key.includes('SECRET'))
  );

  if (dangerous.length > 0) {
    return {
      status: 'fail',
      message: `Dangerous environment variable exposure: ${dangerous.join(', ')}`,
    };
  }

  return {
    status: 'pass',
    message: 'All required environment variables present',
  };
}

/**
 * Check Supabase connectivity
 */
async function checkSupabase(): Promise<HealthCheck> {
  const startTime = Date.now();

  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        status: 'fail',
        message: 'Supabase configuration missing',
        responseTime: Date.now() - startTime,
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Simple connectivity check - query a table (any table)
    const { error } = await supabase
      .from('webinar_registrations')
      .select('id')
      .limit(1);

    const responseTime = Date.now() - startTime;

    if (error) {
      // If it's a permission error, connection is OK but RLS is working
      if (error.code === 'PGRST301' || error.message.includes('permission')) {
        return {
          status: 'pass',
          message: 'Supabase connection OK (RLS active)',
          responseTime,
        };
      }

      return {
        status: 'fail',
        message: `Supabase error: ${error.message}`,
        responseTime,
      };
    }

    return {
      status: 'pass',
      message: 'Supabase connection successful',
      responseTime,
    };
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
      responseTime: Date.now() - startTime,
    };
  }
}

/**
 * Determine overall health status
 */
function determineOverallStatus(checks: HealthCheckResult['checks']): HealthCheckResult['status'] {
  const values = Object.values(checks);

  if (values.every((check) => check.status === 'pass')) {
    return 'healthy';
  }

  if (values.some((check) => check.status === 'fail')) {
    return 'unhealthy';
  }

  return 'degraded';
}

/**
 * Main handler
 */
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Apply middleware (CORS, rate limiting)
  const middlewareResult = applyMiddleware(event, {
    rateLimit: { maxRequests: 20, windowMs: 60000 }, // Allow more requests for health checks
    validation: { allowedMethods: ['GET', 'OPTIONS'] },
  });

  if (!middlewareResult.success) {
    return middlewareResult.response!;
  }

  try {
    // Run health checks
    const envCheck = checkEnvironment();
    const supabaseCheck = await checkSupabase();

    const result: HealthCheckResult = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      checks: {
        environment: envCheck,
        supabase: supabaseCheck,
      },
      uptime: Math.floor((Date.now() - startTime) / 1000),
    };

    // Determine overall status
    result.status = determineOverallStatus(result.checks);

    // Return appropriate status code
    const statusCode = result.status === 'healthy' ? 200 : 503;

    return createSuccessResponse(result, statusCode, middlewareResult.rateLimitHeaders);
  } catch (error) {
    console.error('Health check error:', error);

    return createErrorResponse(
      'Health check failed',
      503,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};
