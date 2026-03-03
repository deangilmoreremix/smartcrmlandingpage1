/**
 * Environment Variable Validation and Configuration
 *
 * SECURITY RULES:
 * 1. ONLY VITE_* prefixed variables are accessible in frontend code
 * 2. NEVER expose service_role keys to the frontend
 * 3. All required variables must be validated at startup
 * 4. Invalid configuration causes immediate failure (fail fast)
 *
 * USAGE:
 * import { env } from '../config/env';
 * const { url, anonKey } = env.supabase;
 *
 * For server-side (Netlify/Edge Functions), use process.env or Deno.env
 */

interface EnvironmentConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  app: {
    environment: 'development' | 'production' | 'test';
    isDevelopment: boolean;
    isProduction: boolean;
    isTest: boolean;
  };
}

class EnvironmentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvironmentError';
  }
}

/**
 * Validates that required environment variables are present
 */
function validateEnvironmentVariables(): void {
  const errors: string[] = [];
  const warnings: string[] = [];

  // CRITICAL: Check for service_role key exposure in frontend
  const allEnvKeys = Object.keys(import.meta.env);
  const dangerousKeys = allEnvKeys.filter(key =>
    key.includes('SERVICE_ROLE') ||
    key.includes('service_role') ||
    key.includes('PRIVATE') ||
    key.includes('SECRET')
  );

  if (dangerousKeys.length > 0) {
    errors.push(
      `SECURITY VIOLATION: Potentially sensitive keys exposed in frontend: ${dangerousKeys.join(', ')}. ` +
      'Service role keys, secrets, and private keys must NEVER be prefixed with VITE_!'
    );
  }

  // Check required Supabase configuration
  if (!import.meta.env.VITE_SUPABASE_URL) {
    errors.push(
      'VITE_SUPABASE_URL is not defined. ' +
      'Add it to your .env file or Netlify environment variables.'
    );
  }

  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    errors.push(
      'VITE_SUPABASE_ANON_KEY is not defined. ' +
      'Add it to your .env file or Netlify environment variables.'
    );
  }

  // Validate Supabase URL format
  if (import.meta.env.VITE_SUPABASE_URL) {
    try {
      const url = new URL(import.meta.env.VITE_SUPABASE_URL);
      if (!url.hostname.includes('supabase.co') && !url.hostname.includes('localhost')) {
        errors.push('VITE_SUPABASE_URL does not appear to be a valid Supabase URL');
      }
    } catch {
      errors.push('VITE_SUPABASE_URL is not a valid URL');
    }
  }

  // Validate Supabase key format (should look like a JWT)
  if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!key.startsWith('eyJ')) {
      errors.push('VITE_SUPABASE_ANON_KEY does not appear to be a valid JWT token');
    }

    // Check if it's likely the service role key (should be anon key)
    try {
      const parts = key.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.role && payload.role !== 'anon') {
          errors.push(
            `VITE_SUPABASE_ANON_KEY has role '${payload.role}' - should be 'anon'. ` +
            'NEVER expose the service_role key in client-side code!'
          );
        }
      }
    } catch {
      // If we can't parse it, that's okay - the validation above should catch invalid formats
    }
  }

  // Display warnings in development
  if (warnings.length > 0 && import.meta.env.DEV) {
    console.warn('='.repeat(80));
    console.warn('⚠️  ENVIRONMENT CONFIGURATION WARNINGS');
    console.warn('='.repeat(80));
    warnings.forEach(w => console.warn(`  - ${w}`));
    console.warn('='.repeat(80));
  }

  // Fail fast on errors
  if (errors.length > 0) {
    const errorMessage = [
      '',
      'Environment configuration errors detected:',
      '',
      ...errors.map(e => `  ❌ ${e}`),
      '',
      'RESOLUTION:',
      '  1. Check your .env file exists and has all required VITE_* variables',
      '  2. Restart the dev server after editing .env',
      '  3. For production, ensure Netlify environment variables are set',
      '  4. See .env.example for full setup instructions',
      '',
    ].join('\n');

    throw new EnvironmentError(errorMessage);
  }
}

/**
 * Gets the environment mode
 */
function getEnvironmentMode(): 'development' | 'production' | 'test' {
  const mode = import.meta.env.MODE;
  if (mode === 'test') return 'test';
  if (mode === 'production') return 'production';
  return 'development';
}

/**
 * Creates and validates the environment configuration
 */
function createEnvironmentConfig(): EnvironmentConfig {
  validateEnvironmentVariables();

  const environment = getEnvironmentMode();

  return {
    supabase: {
      url: import.meta.env.VITE_SUPABASE_URL,
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    app: {
      environment,
      isDevelopment: environment === 'development',
      isProduction: environment === 'production',
      isTest: environment === 'test',
    },
  };
}

// Create and export the validated config
let config: EnvironmentConfig;

try {
  config = createEnvironmentConfig();
} catch (error) {
  if (error instanceof EnvironmentError) {
    console.error('='.repeat(80));
    console.error('ENVIRONMENT CONFIGURATION ERROR');
    console.error('='.repeat(80));
    console.error(error.message);
    console.error('='.repeat(80));
  }
  throw error;
}

export const env = config;

// Re-export the error class for testing
export { EnvironmentError };
