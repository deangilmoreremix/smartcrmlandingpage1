/**
 * Rate Limiting Utility for Edge Functions
 * Implements token bucket algorithm for rate limiting
 */

import { RateLimitError } from './errorHandler.ts';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (req: Request) => string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: number | null = null;

  constructor(
    private config: RateLimitConfig
  ) {
    // Cleanup old entries every minute
    this.startCleanup();
  }

  /**
   * Gets rate limit key from request
   */
  private getKey(req: Request): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(req);
    }

    // Default: use IP address or X-Forwarded-For header
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0]?.trim() : 'unknown';

    return `ratelimit:${ip}`;
  }

  /**
   * Checks if request should be rate limited
   */
  async checkLimit(req: Request): Promise<void> {
    const key = this.getKey(req);
    const now = Date.now();

    const entry = this.store.get(key);

    if (!entry || now > entry.resetTime) {
      // First request or window expired, create new entry
      this.store.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      return;
    }

    if (entry.count >= this.config.maxRequests) {
      const resetIn = Math.ceil((entry.resetTime - now) / 1000);
      throw new RateLimitError(
        `Rate limit exceeded. Try again in ${resetIn} seconds.`
      );
    }

    // Increment count
    entry.count++;
    this.store.set(key, entry);
  }

  /**
   * Gets remaining requests for debugging
   */
  getRemaining(req: Request): number {
    const key = this.getKey(req);
    const entry = this.store.get(key);

    if (!entry || Date.now() > entry.resetTime) {
      return this.config.maxRequests;
    }

    return Math.max(0, this.config.maxRequests - entry.count);
  }

  /**
   * Starts cleanup interval
   */
  private startCleanup(): void {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.store.entries()) {
        if (now > entry.resetTime) {
          this.store.delete(key);
        }
      }
    }, 60000) as unknown as number;
  }

  /**
   * Stops cleanup interval
   */
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

/**
 * Creates a rate limiter middleware
 */
export function createRateLimiter(config: RateLimitConfig) {
  const limiter = new RateLimiter(config);

  return async (req: Request): Promise<void> => {
    await limiter.checkLimit(req);
  };
}

/**
 * Common rate limit configurations
 */
export const RateLimitPresets = {
  // Strict: 10 requests per minute
  strict: {
    maxRequests: 10,
    windowMs: 60000,
  },
  // Standard: 60 requests per minute
  standard: {
    maxRequests: 60,
    windowMs: 60000,
  },
  // Generous: 120 requests per minute
  generous: {
    maxRequests: 120,
    windowMs: 60000,
  },
  // Registration: 5 requests per 15 minutes
  registration: {
    maxRequests: 5,
    windowMs: 900000,
  },
};

/**
 * Creates rate limiter with IP-based key
 */
export function createIpRateLimiter(maxRequests: number, windowMs: number) {
  return createRateLimiter({
    maxRequests,
    windowMs,
    keyGenerator: (req: Request) => {
      const forwarded = req.headers.get('x-forwarded-for');
      const ip = forwarded ? forwarded.split(',')[0]?.trim() : 'unknown';
      return `ip:${ip}`;
    },
  });
}

/**
 * Creates rate limiter with email-based key
 */
export function createEmailRateLimiter(maxRequests: number, windowMs: number) {
  return createRateLimiter({
    maxRequests,
    windowMs,
    keyGenerator: (req: Request) => {
      // Extract email from request body
      const url = new URL(req.url);
      const email = url.searchParams.get('email');
      return `email:${email || 'unknown'}`;
    },
  });
}
