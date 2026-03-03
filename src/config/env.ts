/**
 * Environment Variable Validation and Configuration
 * Provides type-safe access to environment variables with validation
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

  // Check Supabase configuration
  if (!import.meta.env.VITE_SUPABASE_URL) {
    errors.push('VITE_SUPABASE_URL is not defined');
  }

  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    errors.push('VITE_SUPABASE_ANON_KEY is not defined');
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

  if (errors.length > 0) {
    const errorMessage = [
      'Environment configuration errors detected:',
      ...errors.map(e => `  - ${e}`),
      '',
      'Please check your .env file and ensure all required variables are set correctly.',
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
