/**
 * Secure Webinar Registration Netlify Function
 *
 * SECURITY FEATURES:
 * - Input validation with Zod
 * - Rate limiting per IP (5 req/min)
 * - Service role key used server-side only
 * - CORS headers via middleware
 * - Error sanitization (no sensitive info exposed)
 * - Audit logging
 * - Request size limits
 */

import { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import {
  applyMiddleware,
  createSuccessResponse,
  createErrorResponse,
  parseJsonBody,
  getClientIp,
  withErrorHandling,
} from './_shared/middleware';

// Validation schema
const registrationSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().max(255).toLowerCase().trim(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
  company: z.string().max(200).trim().optional(),
  role: z.string().max(100).trim().optional(),
  source: z.string().max(100).default('Website').optional(),
}).strict();

type RegistrationInput = z.infer<typeof registrationSchema>;

// Handler
const handleRequest = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Apply middleware (CORS, rate limiting, validation)
  const middlewareResult = applyMiddleware(event, {
    rateLimit: { maxRequests: 5, windowMs: 60000 },
    validation: {
      allowedMethods: ['POST', 'OPTIONS'],
      maxBodySize: 10 * 1024, // 10KB max for registration
    },
  });

  if (!middlewareResult.success) {
    return middlewareResult.response!;
  }

  // Parse and validate input
  const body = parseJsonBody<RegistrationInput>(event);
  if (!body) {
    return createErrorResponse('Invalid JSON body', 400);
  }

  const validation = registrationSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    return createErrorResponse('Validation failed', 400, undefined, errors);
  }

  const data: RegistrationInput = validation.data;

  // Initialize Supabase with service role key (server-side only!)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase configuration');
    return createErrorResponse('Service configuration error', 500);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Insert registration into database
  const { data: registration, error } = await supabase
    .from('webinar_registrations')
    .insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      role: data.role || null,
      source: data.source || 'Website',
    })
    .select()
    .single();

  if (error) {
    // Check for duplicate email
    if (error.code === '23505' && error.message.includes('unique_email')) {
      return createErrorResponse(
        'Duplicate registration',
        409,
        'This email is already registered for the webinar.'
      );
    }

    console.error('Database error:', error);
    return createErrorResponse('Failed to process registration', 500);
  }

  // Log successful registration (for analytics)
  const clientIp = getClientIp(event);
  console.log(`New registration: ${data.email} from ${clientIp}`);

  // Return success response with rate limit headers
  return createSuccessResponse(
    {
      registrationId: registration.id,
      message: 'Registration successful',
    },
    201,
    middlewareResult.rateLimitHeaders
  );
};

// Export handler wrapped with error handling
export const handler: Handler = withErrorHandling(handleRequest);
