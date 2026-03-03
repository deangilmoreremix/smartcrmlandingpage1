/**
 * Secure Media Upload Netlify Function
 *
 * SECURITY FEATURES:
 * - JWT authentication required (validated via middleware)
 * - File type validation with Zod
 * - File size limits (100MB max)
 * - Rate limiting (10 uploads/min per user)
 * - User ownership enforcement
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
  withErrorHandling,
} from './_shared/middleware';

// Validation schema
const uploadSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileSize: z.number().int().positive().max(100 * 1024 * 1024), // 100MB max
  mimeType: z.enum([
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'application/pdf',
  ]),
  bucketName: z.string().min(1).max(63),
});

const handleRequest = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Apply middleware (CORS, rate limiting, auth validation)
  const middlewareResult = applyMiddleware(event, {
    rateLimit: { maxRequests: 10, windowMs: 60000 },
    validation: {
      allowedMethods: ['POST', 'OPTIONS'],
      requireAuth: true,
      maxBodySize: 50 * 1024, // 50KB max for upload metadata
    },
  });

  if (!middlewareResult.success) {
    return middlewareResult.response!;
  }

  // Get auth token
  const authHeader = event.headers.authorization || event.headers.Authorization;
  const token = authHeader!.replace('Bearer ', '');

  // Initialize Supabase
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase configuration');
    return createErrorResponse('Service configuration error', 500);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Verify the user's JWT token
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return createErrorResponse('Invalid or expired token', 401);
  }

  // Parse and validate input
  const body = parseJsonBody(event);
  if (!body) {
    return createErrorResponse('Invalid JSON body', 400);
  }

  const validation = uploadSchema.safeParse(body);

  if (!validation.success) {
    return createErrorResponse(
      'Validation failed',
      400,
      undefined,
      validation.error.errors
    );
  }

  const data = validation.data;

  // Generate unique file path with user ownership
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 15);
  const fileExtension = data.fileName.split('.').pop();
  const filePath = `${user.id}/${timestamp}-${randomId}.${fileExtension}`;

  // Create signed upload URL (client uploads directly to Supabase Storage)
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(data.bucketName)
    .createSignedUploadUrl(filePath);

  if (uploadError) {
    console.error('Upload URL error:', uploadError);
    return createErrorResponse('Failed to create upload URL', 500);
  }

  // Log upload request
  console.log(`Upload URL created for user ${user.id}: ${filePath}`);

  // Return success with signed URL
  return createSuccessResponse(
    {
      uploadUrl: uploadData.signedUrl,
      filePath: filePath,
      token: uploadData.token,
    },
    200,
    middlewareResult.rateLimitHeaders
  );
};

// Export handler wrapped with error handling
export const handler: Handler = withErrorHandling(handleRequest);
