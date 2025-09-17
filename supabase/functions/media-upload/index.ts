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
  // Handle CORS preflight requests
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
    
    // API endpoints
    if (req.method === "POST" && endpoint === "upload-url") {
      // Generate pre-signed upload URL
      const { fileName, fileType, bucket, folder } = await req.json();
      return await generateUploadUrl(supabase, fileName, fileType, bucket, folder);
    }
    else if (req.method === "POST" && endpoint === "process-upload") {
      // Process uploaded file and create database record
      const { filePath, originalName, fileSize, mimeType, userId, bucket } = await req.json();
      return await processUpload(supabase, filePath, originalName, fileSize, mimeType, userId, bucket);
    }
    else if (req.method === "GET" && endpoint === "storage-info") {
      // Get storage usage information
      const userId = url.searchParams.get("userId");
      return await getStorageInfo(supabase, userId);
    }
    else if (req.method === "DELETE" && endpoint === "delete-file") {
      // Delete file from storage and database
      const { filePath, fileId, bucket } = await req.json();
      return await deleteFile(supabase, filePath, fileId, bucket);
    }
    
    return new Response(JSON.stringify({ error: "Endpoint not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error("Error in media-upload function:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Generate pre-signed upload URL
async function generateUploadUrl(supabase: any, fileName: string, fileType: string, bucket: string = "videos", folder: string = "uploads") {
  try {
    // Create unique file name
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = fileName.split('.').pop();
    const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;
    const filePath = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;
    
    // Generate signed URL for upload
    const { data: signedUrl, error } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(filePath);
    
    if (error) {
      throw new Error(`Failed to generate upload URL: ${error.message}`);
    }
    
    return new Response(JSON.stringify({
      uploadUrl: signedUrl.signedUrl,
      filePath: filePath,
      token: signedUrl.token
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Upload URL generation failed: ${error.message}`);
  }
}

// Process uploaded file and create database record
async function processUpload(supabase: any, filePath: string, originalName: string, fileSize: number, mimeType: string, userId: string | null, bucket: string) {
  try {
    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    if (!urlData?.publicUrl) {
      throw new Error("Failed to get public URL for uploaded file");
    }
    
    // Create database record
    let dbResult;
    
    if (bucket === "videos" || mimeType.startsWith("video/")) {
      // Insert into video_uploads table
      const { data, error } = await supabase
        .from('video_uploads')
        .insert({
          user_id: userId,
          file_name: filePath.split('/').pop(),
          original_name: originalName,
          file_path: filePath,
          file_size: fileSize,
          mime_type: mimeType,
          status: 'uploaded',
          upload_source: 'web'
        })
        .select()
        .single();
      
      if (error) throw error;
      dbResult = data;
    } else {
      // For other media types, you might want to create a general media table
      // or handle differently based on your needs
      console.log(`Processed ${mimeType} file: ${filePath}`);
    }
    
    return new Response(JSON.stringify({
      success: true,
      fileUrl: urlData.publicUrl,
      filePath: filePath,
      record: dbResult
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`File processing failed: ${error.message}`);
  }
}

// Get storage usage information
async function getStorageInfo(supabase: any, userId: string | null) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    
    // Get user storage usage
    const { data: storageData, error: storageError } = await supabase
      .from('user_storage_usage')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (storageError && storageError.code !== 'PGRST116') {
      throw storageError;
    }
    
    // Get file list for user
    const { data: filesData, error: filesError } = await supabase
      .from('video_uploads')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (filesError) {
      throw filesError;
    }
    
    return new Response(JSON.stringify({
      storageUsage: storageData || {
        total_size: 0,
        video_count: 0,
        storage_limit: 2147483648, // 2GB default
        subscription_tier: 'free'
      },
      files: filesData || []
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Failed to get storage info: ${error.message}`);
  }
}

// Delete file from storage and database
async function deleteFile(supabase: any, filePath: string, fileId: string, bucket: string = "videos") {
  try {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
    
    if (storageError) {
      throw new Error(`Failed to delete from storage: ${storageError.message}`);
    }
    
    // Delete from database
    const { error: dbError } = await supabase
      .from('video_uploads')
      .delete()
      .eq('id', fileId);
    
    if (dbError) {
      throw new Error(`Failed to delete from database: ${dbError.message}`);
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: "File deleted successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`File deletion failed: ${error.message}`);
  }
}