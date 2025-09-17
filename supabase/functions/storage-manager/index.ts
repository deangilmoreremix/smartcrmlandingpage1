import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Initialize Supabase client
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').filter(Boolean);
    const endpoint = path.length >= 3 ? path[2] : '';
    
    const supabase = getSupabaseClient();
    
    if (req.method === "POST" && endpoint === "create-buckets") {
      // Create required storage buckets
      return await createStorageBuckets(supabase);
    }
    else if (req.method === "GET" && endpoint === "bucket-status") {
      // Check status of storage buckets
      return await checkBucketStatus(supabase);
    }
    else if (req.method === "POST" && endpoint === "setup-policies") {
      // Set up storage policies
      const { bucket } = await req.json();
      return await setupStoragePolicies(supabase, bucket);
    }
    else if (req.method === "GET" && endpoint === "list-files") {
      // List files in a bucket
      const bucket = url.searchParams.get("bucket");
      const folder = url.searchParams.get("folder");
      return await listFiles(supabase, bucket, folder);
    }
    else if (req.method === "POST" && endpoint === "optimize-storage") {
      // Optimize storage usage
      const userId = url.searchParams.get("userId");
      return await optimizeStorage(supabase, userId);
    }
    
    return new Response(JSON.stringify({ error: "Endpoint not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error("Error in storage-manager function:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Create required storage buckets
async function createStorageBuckets(supabase: any) {
  try {
    const buckets = [
      { 
        name: 'videos', 
        public: true,
        fileSizeLimit: 104857600, // 100MB
        allowedMimeTypes: ['video/mp4', 'video/webm', 'video/mov', 'video/avi']
      },
      { 
        name: 'images', 
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      },
      { 
        name: 'avatar', 
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      },
      { 
        name: 'documents', 
        public: false,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ['application/pdf', 'text/plain', 'application/msword']
      }
    ];
    
    const results = [];
    
    for (const bucket of buckets) {
      try {
        const { data, error } = await supabase.storage.createBucket(bucket.name, {
          public: bucket.public,
          fileSizeLimit: bucket.fileSizeLimit,
          allowedMimeTypes: bucket.allowedMimeTypes
        });
        
        if (error && !error.message.includes('already exists')) {
          console.warn(`Error creating bucket ${bucket.name}:`, error);
          results.push({ bucket: bucket.name, status: 'error', error: error.message });
        } else {
          results.push({ bucket: bucket.name, status: 'success', data });
        }
      } catch (err) {
        results.push({ bucket: bucket.name, status: 'error', error: err.message });
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      results: results
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Bucket creation failed: ${error.message}`);
  }
}

// Check status of storage buckets
async function checkBucketStatus(supabase: any) {
  try {
    const requiredBuckets = ['videos', 'images', 'avatar', 'documents'];
    const results = [];
    
    for (const bucketName of requiredBuckets) {
      try {
        const { data, error } = await supabase.storage.getBucket(bucketName);
        
        if (error) {
          results.push({ bucket: bucketName, exists: false, error: error.message });
        } else {
          results.push({ bucket: bucketName, exists: true, config: data });
        }
      } catch (err) {
        results.push({ bucket: bucketName, exists: false, error: err.message });
      }
    }
    
    return new Response(JSON.stringify({
      buckets: results,
      allBucketsExist: results.every(r => r.exists)
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Bucket status check failed: ${error.message}`);
  }
}

// Set up storage policies for a bucket
async function setupStoragePolicies(supabase: any, bucket: string) {
  try {
    // Note: In a real implementation, you would set up RLS policies
    // This is a placeholder that would execute SQL commands to create policies
    
    const policies = {
      videos: [
        "Users can upload their own videos",
        "Users can view their own videos", 
        "Users can delete their own videos"
      ],
      images: [
        "Users can upload images",
        "Public can view images",
        "Users can delete their own images"
      ],
      avatar: [
        "Users can upload avatars",
        "Public can view avatars",
        "Users can update their own avatars"
      ],
      documents: [
        "Users can upload documents",
        "Users can view their own documents",
        "Users can delete their own documents"
      ]
    };
    
    return new Response(JSON.stringify({
      success: true,
      bucket: bucket,
      policies: policies[bucket as keyof typeof policies] || [],
      message: "Storage policies would be configured here"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Policy setup failed: ${error.message}`);
  }
}

// List files in a bucket
async function listFiles(supabase: any, bucket: string | null, folder: string | null) {
  try {
    if (!bucket) {
      throw new Error("Bucket parameter is required");
    }
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder || '', {
        limit: 100,
        offset: 0
      });
    
    if (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
    
    return new Response(JSON.stringify({
      files: data || [],
      bucket: bucket,
      folder: folder || 'root'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`File listing failed: ${error.message}`);
  }
}

// Optimize storage usage for a user
async function optimizeStorage(supabase: any, userId: string | null) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    
    // Get user's video uploads
    const { data: videos, error: videosError } = await supabase
      .from('video_uploads')
      .select('*')
      .eq('user_id', userId);
    
    if (videosError) {
      throw new Error(`Failed to get user videos: ${videosError.message}`);
    }
    
    // Calculate current usage
    const totalSize = videos?.reduce((sum: number, video: any) => sum + (video.file_size || 0), 0) || 0;
    const videoCount = videos?.length || 0;
    
    // Update or insert storage usage record
    const { error: usageError } = await supabase
      .from('user_storage_usage')
      .upsert({
        user_id: userId,
        total_size: totalSize,
        video_count: videoCount,
        last_updated: new Date().toISOString()
      });
    
    if (usageError) {
      throw new Error(`Failed to update storage usage: ${usageError.message}`);
    }
    
    return new Response(JSON.stringify({
      success: true,
      totalSize: totalSize,
      videoCount: videoCount,
      optimized: true
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Storage optimization failed: ${error.message}`);
  }
}