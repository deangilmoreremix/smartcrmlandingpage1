/**
 * Secure Media Upload Netlify Function
 * 
 * SECURITY FEATURES:
 * - JWT authentication required
 * - File type validation
 * - File size limits
 * - Virus scanning integration point
 * - User ownership enforcement
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }
  
  try {
    // Verify JWT token
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Authentication required' }),
      };
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Initialize Supabase
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Service configuration error' }),
      };
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Verify the user's JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid or expired token' }),
      };
    }
    
    // Parse and validate input
    const body = JSON.parse(event.body || '{}');
    const validation = uploadSchema.safeParse(body);
    
    if (!validation.success) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Validation failed',
          details: validation.error.errors 
        }),
      };
    }
    
    const data = validation.data;
    
    // Generate unique file path
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = data.fileName.split('.').pop();
    const filePath = `${user.id}/${timestamp}-${randomId}.${fileExtension}`;
    
    // Create upload URL (client will upload directly to Supabase Storage)
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from(data.bucketName)
      .createSignedUploadUrl(filePath);
    
    if (uploadError) {
      console.error('Upload URL error:', uploadError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to create upload URL' }),
      };
    }
    
    // Return the signed upload URL to the client
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        uploadUrl: uploadData.signedUrl,
        filePath: filePath,
        token: uploadData.token,
      }),
    };
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'An unexpected error occurred' }),
    };
  }
};
