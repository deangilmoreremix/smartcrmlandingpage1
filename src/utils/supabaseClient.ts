import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not configured');
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
};

export const getInstructorImageUrl = async (): Promise<string | null> => {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    // List all files in the avatar bucket to find instructor images
    const { data: files, error: listError } = await supabase.storage
      .from('avatar')
      .list('', {
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (listError) {
      console.error('Error listing files:', listError);
      return null;
    }

    // Find the most recent instructor image
    const instructorFile = files?.find(file =>
      file.name.startsWith('instructor-') || file.name === 'instructor.jpg'
    );

    if (!instructorFile) {
      return null;
    }

    // Get the public URL for the found file
    const { data } = supabase.storage
      .from('avatar')
      .getPublicUrl(instructorFile.name);

    return data?.publicUrl || null;
  } catch (error) {
    console.error('Error fetching instructor image:', error);
    return null;
  }
};
