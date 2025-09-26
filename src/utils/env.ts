// Environment variable validation and utilities

interface EnvConfig {
  VITE_SUPABASE_URL: string
  VITE_SUPABASE_ANON_KEY: string
  VITE_APP_ENV?: string
  VITE_API_BASE_URL?: string
}

class EnvValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EnvValidationError'
  }
}

/**
 * Validates that all required environment variables are present
 */
export function validateEnvironment(): EnvConfig {
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
  ] as const

  const missingVars: string[] = []

  for (const varName of requiredVars) {
    if (!import.meta.env[varName]) {
      missingVars.push(varName)
    }
  }

  if (missingVars.length > 0) {
    throw new EnvValidationError(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    )
  }

  return {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  }
}

/**
 * Gets the current environment (development, staging, production)
 */
export function getEnvironment(): string {
  return import.meta.env.VITE_APP_ENV || import.meta.env.MODE || 'development'
}

/**
 * Checks if we're in development mode
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development'
}

/**
 * Checks if we're in production mode
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production'
}

/**
 * Checks if we're in staging mode
 */
export function isStaging(): boolean {
  return getEnvironment() === 'staging'
}

/**
 * Gets the API base URL with fallback
 */
export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL || 'https://api.smartcrm.com'
}

/**
 * Gets Supabase configuration
 */
export function getSupabaseConfig() {
  const env = validateEnvironment()
  return {
    url: env.VITE_SUPABASE_URL,
    anonKey: env.VITE_SUPABASE_ANON_KEY,
  }
}

// Validate environment on module load
let envConfig: EnvConfig

try {
  envConfig = validateEnvironment()
} catch (error) {
  if (isDevelopment()) {
    console.warn('Environment validation failed:', error)
    // In development, provide fallback values
    envConfig = {
      VITE_SUPABASE_URL: 'https://fallback.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'fallback-anon-key',
      VITE_APP_ENV: 'development',
    }
  } else {
    // In production, re-throw the error
    throw error
  }
}

export { envConfig }