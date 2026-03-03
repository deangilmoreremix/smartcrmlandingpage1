import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env';
import { logError, logWarning, ErrorSeverity } from './errorLogger';

let supabaseClient: SupabaseClient | null = null;

/**
 * Gets or creates a Supabase client instance
 * Uses validated environment configuration
 */
export const getSupabaseClient = (): SupabaseClient | null => {
  if (supabaseClient) {
    return supabaseClient;
  }

  try {
    const { url, anonKey } = env.supabase;

    supabaseClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          'X-Client-Info': 'smart-crm-web',
        },
      },
    });

    return supabaseClient;
  } catch (error) {
    logError(
      error instanceof Error ? error : new Error('Failed to initialize Supabase client'),
      ErrorSeverity.CRITICAL,
      {
        component: 'supabaseClient',
        action: 'initialization',
      }
    );
    return null;
  }
};

export const getInstructorImageUrl = async (): Promise<string | null> => {
  const supabase = getSupabaseClient();
  if (!supabase) {
    logWarning('Supabase client not available for fetching instructor image', {
      component: 'supabaseClient',
      action: 'getInstructorImageUrl',
    });
    return null;
  }

  try {
    // List all files in the avatar bucket to find instructor images
    const { data: files, error: listError } = await supabase.storage
      .from('avatar')
      .list('', {
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (listError) {
      logError(
        new Error(`Error listing avatar files: ${listError.message}`),
        ErrorSeverity.MEDIUM,
        {
          component: 'supabaseClient',
          action: 'getInstructorImageUrl',
          metadata: { error: listError },
        }
      );
      return null;
    }

    // Find the most recent instructor image
    const instructorFile = files?.find(file =>
      file.name.startsWith('instructor-') || file.name === 'instructor.jpg'
    );

    if (!instructorFile) {
      logWarning('No instructor image found in avatar bucket', {
        component: 'supabaseClient',
        action: 'getInstructorImageUrl',
      });
      return null;
    }

    // Get the public URL for the found file
    const { data } = supabase.storage
      .from('avatar')
      .getPublicUrl(instructorFile.name);

    return data?.publicUrl || null;
  } catch (error) {
    logError(
      error instanceof Error ? error : new Error('Unexpected error fetching instructor image'),
      ErrorSeverity.MEDIUM,
      {
        component: 'supabaseClient',
        action: 'getInstructorImageUrl',
      }
    );
    return null;
  }
};
