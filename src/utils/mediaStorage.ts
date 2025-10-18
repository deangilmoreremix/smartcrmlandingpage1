import { getSupabaseClient } from './supabaseClient';

export interface MediaFile {
  id: string;
  user_id?: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  bucket_name: string;
  public_url: string;
  upload_status: string;
  created_at: string;
}

export interface UploadResult {
  success: boolean;
  error?: string;
  record?: MediaFile;
  publicUrl?: string;
}

export const uploadVideo = async (
  file: File,
  userId?: string,
  metadata?: {
    folder?: string;
    originalName?: string;
    uploadedAt?: string;
  }
): Promise<UploadResult> => {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase client not initialized'
    };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const folder = metadata?.folder || 'videos';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('webinar-videos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: urlData } = supabase.storage
      .from('webinar-videos')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    const mediaRecord: Partial<MediaFile> = {
      user_id: userId,
      file_name: metadata?.originalName || file.name,
      file_path: filePath,
      file_size: file.size,
      mime_type: file.type,
      bucket_name: 'webinar-videos',
      public_url: publicUrl,
      upload_status: 'completed'
    };

    const { data: insertedRecord, error: dbError } = await supabase
      .from('media_files')
      .insert([mediaRecord])
      .select()
      .single();

    if (dbError) {
      console.warn('Failed to insert media record:', dbError);
    }

    return {
      success: true,
      record: insertedRecord || mediaRecord as MediaFile,
      publicUrl
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

export const uploadImage = async (
  file: File,
  bucket: 'avatar' | 'images' = 'images',
  folder?: string
): Promise<UploadResult> => {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase client not initialized'
    };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    return {
      success: true,
      publicUrl
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

export const getUserMedia = async (userId?: string): Promise<MediaFile[]> => {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  try {
    let query = supabase
      .from('media_files')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching media:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching media:', error);
    return [];
  }
};

export const deleteMedia = async (filePath: string, bucketName: string): Promise<boolean> => {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return false;
  }

  try {
    const { error: storageError } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (storageError) {
      throw storageError;
    }

    const { error: dbError } = await supabase
      .from('media_files')
      .delete()
      .eq('file_path', filePath);

    if (dbError) {
      console.warn('Failed to delete media record:', dbError);
    }

    return true;
  } catch (error) {
    console.error('Error deleting media:', error);
    return false;
  }
};

export const getVideosByCategory = async (category: string): Promise<MediaFile[]> => {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .eq('bucket_name', 'webinar-videos')
      .ilike('file_path', `%${category}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching videos:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};
