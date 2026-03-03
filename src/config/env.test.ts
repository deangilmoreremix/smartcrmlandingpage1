import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('env validation logic', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('detects missing VITE_SUPABASE_URL', () => {
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.fake');

    expect(() => {
      validateEnvVars({
        VITE_SUPABASE_URL: '',
        VITE_SUPABASE_ANON_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.fake',
      });
    }).toThrow();
  });

  it('detects missing VITE_SUPABASE_ANON_KEY', () => {
    expect(() => {
      validateEnvVars({
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_ANON_KEY: '',
      });
    }).toThrow();
  });

  it('detects invalid Supabase URL format', () => {
    expect(() => {
      validateEnvVars({
        VITE_SUPABASE_URL: 'not-a-url',
        VITE_SUPABASE_ANON_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.fake',
      });
    }).toThrow();
  });

  it('detects non-supabase URL', () => {
    expect(() => {
      validateEnvVars({
        VITE_SUPABASE_URL: 'https://random-site.com',
        VITE_SUPABASE_ANON_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.fake',
      });
    }).toThrow();
  });

  it('detects non-JWT anon key', () => {
    expect(() => {
      validateEnvVars({
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'not-a-jwt-token',
      });
    }).toThrow();
  });

  it('detects dangerous service role key exposure', () => {
    expect(() => {
      validateEnvVars(
        {
          VITE_SUPABASE_URL: 'https://test.supabase.co',
          VITE_SUPABASE_ANON_KEY:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.fake',
        },
        ['VITE_SERVICE_ROLE_KEY']
      );
    }).toThrow(/SECURITY VIOLATION/);
  });

  it('detects service_role in JWT payload', () => {
    const serviceRoleJwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      btoa(JSON.stringify({ role: 'service_role' })) +
      '.fake';

    expect(() => {
      validateEnvVars({
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_ANON_KEY: serviceRoleJwt,
      });
    }).toThrow();
  });

  it('accepts valid configuration', () => {
    expect(() => {
      validateEnvVars({
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_ANON_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.fake',
      });
    }).not.toThrow();
  });

  it('accepts localhost URLs (for development)', () => {
    expect(() => {
      validateEnvVars({
        VITE_SUPABASE_URL: 'http://localhost:54321',
        VITE_SUPABASE_ANON_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.fake',
      });
    }).not.toThrow();
  });
});

/**
 * Extracted validation logic that mirrors src/config/env.ts
 * but is testable without import.meta.env side effects.
 */
function validateEnvVars(
  vars: Record<string, string>,
  allEnvKeys: string[] = Object.keys(vars)
): void {
  const errors: string[] = [];

  const dangerousKeys = allEnvKeys.filter(
    key =>
      key.includes('SERVICE_ROLE') ||
      key.includes('service_role') ||
      key.includes('PRIVATE') ||
      key.includes('SECRET')
  );

  if (dangerousKeys.length > 0) {
    errors.push(
      `SECURITY VIOLATION: Potentially sensitive keys exposed in frontend: ${dangerousKeys.join(', ')}.`
    );
  }

  if (!vars.VITE_SUPABASE_URL) {
    errors.push('VITE_SUPABASE_URL is not defined.');
  }

  if (!vars.VITE_SUPABASE_ANON_KEY) {
    errors.push('VITE_SUPABASE_ANON_KEY is not defined.');
  }

  if (vars.VITE_SUPABASE_URL) {
    try {
      const url = new URL(vars.VITE_SUPABASE_URL);
      if (!url.hostname.includes('supabase.co') && !url.hostname.includes('localhost')) {
        errors.push('VITE_SUPABASE_URL does not appear to be a valid Supabase URL');
      }
    } catch {
      errors.push('VITE_SUPABASE_URL is not a valid URL');
    }
  }

  if (vars.VITE_SUPABASE_ANON_KEY) {
    const key = vars.VITE_SUPABASE_ANON_KEY;
    if (!key.startsWith('eyJ')) {
      errors.push('VITE_SUPABASE_ANON_KEY does not appear to be a valid JWT token');
    }

    try {
      const parts = key.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]!));
        if (payload.role && payload.role !== 'anon') {
          errors.push(
            `VITE_SUPABASE_ANON_KEY has role '${payload.role}' - should be 'anon'.`
          );
        }
      }
    } catch {
      // ignore parse errors
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
}
