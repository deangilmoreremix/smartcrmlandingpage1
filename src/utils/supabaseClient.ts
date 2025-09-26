import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for the entire app
let supabaseInstance: any = null;

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    // Supabase credentials are not available
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
};

// Get the instructor image URL
export const getInstructorImageUrl = async (): Promise<string | null> => {
  // Default image to use if we can't get one from storage
  const defaultImage = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1600";
  
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return defaultImage;
    
    // Try to get files from the avatar bucket
    const { data: files, error } = await supabase.storage.from('avatar').list();
    
    if (error || !files || files.length === 0) {
      // No files found in avatar bucket
      return defaultImage;
    }
    
    // Get the public URL for the first file
    const { data: urlData } = supabase.storage.from('avatar').getPublicUrl(files[0].name);
    
    if (!urlData?.publicUrl) {
      console.warn("Could not get public URL for avatar");
      return defaultImage;
    }
    
    return urlData.publicUrl;
  } catch (err) {
    console.error("Error getting instructor image:", err);
    return defaultImage;
  }
};