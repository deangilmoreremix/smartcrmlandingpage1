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
    if (!supabase) {
      console.warn("Supabase client not available");
      return defaultImage;
    }

    console.log("Attempting to get instructor image from Supabase...");

    // First, check if the file exists
    const { data: files, error: listError } = await supabase.storage.from('avatar').list('', {
      limit: 100,
      offset: 0
    });

    if (listError) {
      console.error("Error listing files in avatar bucket:", listError);
      return defaultImage;
    }

    console.log("Files in avatar bucket:", files?.map((f: any) => f.name));

    const instructorFile = files?.find((file: any) => file.name === 'instructor-1747337582893.jpg');
    if (!instructorFile) {
      console.warn("instructor-1747337582893.jpg not found in avatar bucket. Available files:", files?.map((f: any) => f.name));
      return defaultImage;
    }

    // Get the public URL for the instructor image
    const { data: urlData } = supabase.storage.from('avatar').getPublicUrl('instructor-1747337582893.jpg');

    if (!urlData?.publicUrl) {
      console.warn("Could not get public URL for dean-gilmore.jpg");
      return defaultImage;
    }

    console.log("Successfully got instructor image URL:", urlData.publicUrl);
    return urlData.publicUrl;
  } catch (err) {
    console.error("Error getting instructor image:", err);
    return defaultImage;
  }
};