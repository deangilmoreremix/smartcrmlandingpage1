// Authentication utilities for Supabase Edge Functions

export interface AuthenticatedUser {
  id: string
  email: string
  role?: string
  aud: string
  sub: string
  iat: number
  exp: number
}

export interface AuthResult {
  user: AuthenticatedUser | null
  error: string | null
}

/**
 * Extract and validate JWT token from Authorization header
 */
export async function authenticateRequest(request: Request): Promise<AuthResult> {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return { user: null, error: 'Missing Authorization header' }
    }

    // Check for Bearer token format
    const tokenMatch = authHeader.match(/^Bearer (.+)$/)
    if (!tokenMatch) {
      return { user: null, error: 'Invalid Authorization header format. Expected: Bearer <token>' }
    }

    const token = tokenMatch[1]
    if (!token) {
      return { user: null, error: 'Empty token provided' }
    }

    // Validate JWT token structure
    const validation = validateJWTStructure(token)
    if (!validation.valid) {
      return { user: null, error: validation.error || 'Invalid JWT structure' }
    }

    // Decode and validate token payload
    const payload = decodeJWTPayload(token)
    if (!payload) {
      return { user: null, error: 'Invalid JWT token format' }
    }

    // Check token expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return { user: null, error: 'Token has expired' }
    }

    // Validate issuer and audience (basic checks)
    if (payload.iss && !payload.iss.includes('supabase')) {
      return { user: null, error: 'Invalid token issuer' }
    }

    // Create authenticated user object
    const user: AuthenticatedUser = {
      id: payload.sub,
      email: payload.email || '',
      role: payload.role || 'user',
      aud: payload.aud,
      sub: payload.sub,
      iat: payload.iat,
      exp: payload.exp,
    }

    return { user, error: null }
  } catch (error) {
    console.error('Authentication error:', error)
    return { user: null, error: 'Authentication failed' }
  }
}

/**
 * Validate basic JWT structure
 */
function validateJWTStructure(token: string): { valid: boolean; error?: string } {
  try {
    // JWT should have exactly 3 parts separated by dots
    const parts = token.split('.')
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid JWT format - must have 3 parts' }
    }

    // Each part should be base64url encoded
    for (const part of parts) {
      if (!isValidBase64Url(part)) {
        return { valid: false, error: 'Invalid JWT format - parts must be base64url encoded' }
      }
    }

    return { valid: true }
  } catch (error) {
    return { valid: false, error: 'JWT structure validation failed' }
  }
}

/**
 * Check if string is valid base64url
 */
function isValidBase64Url(str: string): boolean {
  try {
    // base64url uses different alphabet than regular base64
    const base64UrlRegex = /^[A-Za-z0-9_-]+$/
    return base64UrlRegex.test(str)
  } catch {
    return false
  }
}

/**
 * Decode JWT payload (without verification for now)
 * Note: In production, you should verify the signature using Supabase's public key
 */
function decodeJWTPayload(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    // Decode payload (second part)
    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))

    return JSON.parse(decoded)
  } catch (error) {
    console.error('Failed to decode JWT payload:', error)
    return null
  }
}

/**
 * Create authorization middleware for Supabase Edge Functions
 */
export function withAuth(handler: (request: Request, user: AuthenticatedUser) => Promise<Response>) {
  return async (request: Request): Promise<Response> => {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://smartcrm.com',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    // Authenticate the request
    const authResult = await authenticateRequest(request)

    if (authResult.error || !authResult.user) {
      return new Response(JSON.stringify({
        error: 'Authentication required',
        message: authResult.error || 'Invalid or missing authentication token',
        code: 'AUTH_REQUIRED'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://smartcrm.com',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    // Call the handler with authenticated user
    try {
      return await handler(request, authResult.user)
    } catch (error) {
      console.error('Handler error:', error)
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: 'An error occurred while processing your request',
        code: 'INTERNAL_ERROR'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://smartcrm.com',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }
  }
}

/**
 * Check if user has required role
 */
export function hasRole(user: AuthenticatedUser, requiredRole: string): boolean {
  return user.role === requiredRole || user.role === 'admin'
}

/**
 * Check if user has any of the required roles
 */
export function hasAnyRole(user: AuthenticatedUser, requiredRoles: string[]): boolean {
  return requiredRoles.includes(user.role || '') || user.role === 'admin'
}