/**
 * Secure Webinar Registration Netlify Function
 * 
 * SECURITY FEATURES:
 * - Input validation with Zod
 * - Rate limiting per IP
 * - Service role key used server-side only
 * - CORS headers
 * - Error sanitization (no sensitive info exposed)
 * - Audit logging
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

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

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Handler
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }
  
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }
  
  try {
    // Get client IP for rate limiting
    const clientIp = event.headers['x-forwarded-for']?.split(',')[0] || 
                     event.headers['client-ip'] || 
                     'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return {
        statusCode: 429,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Too many requests. Please try again later.' 
        }),
      };
    }
    
    // Parse and validate input
    const body = JSON.parse(event.body || '{}');
    const validation = registrationSchema.safeParse(body);
    
    if (!validation.success) {
      const errors = validation.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Validation failed',
          details: errors 
        }),
      };
    }
    
    const data: RegistrationInput = validation.data;
    
    // Initialize Supabase with service role key (server-side only!)
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Service configuration error' }),
      };
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
        return {
          statusCode: 409,
          headers: corsHeaders,
          body: JSON.stringify({ 
            error: 'This email is already registered for the webinar.' 
          }),
        };
      }
      
      console.error('Database error:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to process registration' }),
      };
    }
    
    // Log successful registration (for analytics)
    console.log(`New registration: ${data.email} from ${clientIp}`);
    
    // Return success response
    return {
      statusCode: 201,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        registrationId: registration.id,
        message: 'Registration successful',
      }),
    };
    
  } catch (error) {
    console.error('Unexpected error:', error);
    
    // Don't expose internal errors to client
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'An unexpected error occurred. Please try again.' 
      }),
    };
  }
};
