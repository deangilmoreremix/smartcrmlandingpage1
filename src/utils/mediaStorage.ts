import { getSupabaseClient } from './supabaseClient';

// Types for media operations
export interface UploadOptions {
  bucket?: string;
  folder?: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

// Default upload options
const defaultUploadOptions: UploadOptions = {
  bucket: 'images',
  folder: 'general',
  maxSizeMB: 10,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
};

// Upload file to Supabase storage
export const uploadMedia = async (
  file: File, 
  options: UploadOptions = {}
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase client not available');
    }
    
    const opts = { ...defaultUploadOptions, ...options };
    
    // Validate file size
    if (file.size > (opts.maxSizeMB! * 1024 * 1024)) {
      throw new Error(`File size exceeds ${opts.maxSizeMB}MB limit`);
    }
    
    // Validate file type
    if (opts.allowedTypes && !opts.allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed`);
    }
    
    // Generate unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = opts.folder ? `${opts.folder}/${fileName}` : fileName;
    
    // Upload file
    const { error: uploadError } = await supabase.storage
      .from(opts.bucket!)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }
    
    // Get public URL
    const { data } = supabase.storage
      .from(opts.bucket!)
      .getPublicUrl(filePath);
    
    return {
      success: true,
      url: data.publicUrl
    };
  } catch (error) {
    console.error('Media upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

// Upload video with metadata tracking
export const uploadVideo = async (
  file: File,
  userId?: string,
  metadata: Record<string, any> = {}
): Promise<{ success: boolean; record?: any; error?: string }> => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase client not available');
    }
    
    // Validate video file
    if (!file.type.startsWith('video/')) {
      throw new Error('Only video files are allowed');
    }
    
    // Upload video using media upload function
    const uploadResult = await uploadMedia(file, {
      bucket: 'videos',
      folder: 'webinars',
      maxSizeMB: 100,
      allowedTypes: ['video/mp4', 'video/webm', 'video/mov', 'video/avi']
    });
    
    if (!uploadResult.success) {
      throw new Error(uploadResult.error);
    }
    
    // Create database record
    const { data, error } = await supabase
      .from('video_uploads')
      .insert({
        user_id: userId,
        file_name: file.name.split('/').pop(),
        original_name: file.name,
        file_path: uploadResult.url!.split('/').pop(), // Extract path from URL
        file_size: file.size,
        mime_type: file.type,
        status: 'uploaded',
        metadata: metadata,
        upload_source: 'web'
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(`Database record creation failed: ${error.message}`);
    }
    
    return {
      success: true,
      record: data
    };
  } catch (error) {
    console.error('Video upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Video upload failed'
    };
  }
};

// Get user's media files
export const getUserMedia = async (
  userId: string,
  bucket: string = 'images'
): Promise<{ success: boolean; files?: MediaFile[]; error?: string }> => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase client not available');
    }
    
    // Get video uploads for user
    const { data, error } = await supabase
      .from('video_uploads')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Failed to get media files: ${error.message}`);
    }
    
    // Transform to MediaFile format
    const files: MediaFile[] = (data || []).map((record: any) => ({
      id: record.id,
      name: record.original_name,
      url: record.file_path,
      size: record.file_size,
      type: record.mime_type,
      uploadedAt: record.created_at
    }));
    
    return {
      success: true,
      files: files
    };
  } catch (error) {
    console.error('Get media error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get media files'
    };
  }
};

// Delete media file
export const deleteMedia = async (
  fileId: string,
  filePath: string,
  bucket: string = 'images'
): Promise<{ success: boolean; error?: string }> => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase client not available');
    }
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
    
    if (storageError) {
      console.warn('Storage deletion warning:', storageError);
    }
    
    // Delete from database
    const { error: dbError } = await supabase
      .from('video_uploads')
      .delete()
      .eq('id', fileId);
    
    if (dbError) {
      throw new Error(`Database deletion failed: ${dbError.message}`);
    }
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Delete media error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed'
    };
  }
};

// Check storage usage for user
export const getStorageUsage = async (
  userId: string
): Promise<{ success: boolean; usage?: any; error?: string }> => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase client not available');
    }
    
    const { data, error } = await supabase
      .from('user_storage_usage')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to get storage usage: ${error.message}`);
    }
    
    return {
      success: true,
      usage: data || {
        total_size: 0,
        video_count: 0,
        storage_limit: 2147483648, // 2GB
        subscription_tier: 'free'
      }
    };
  } catch (error) {
    console.error('Storage usage error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get storage usage'
    };
  }
};