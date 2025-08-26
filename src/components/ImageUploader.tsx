import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Upload, Image, X, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onImageUploaded?: (url: string) => void;
  folder?: string;
  maxSizeMB?: number;
  width?: string;
  height?: string;
  className?: string;
  defaultImageUrl?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  folder = 'instructor-images',
  maxSizeMB = 5,
  width = '100%',
  height = 'auto',
  className = '',
  defaultImageUrl
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Initialize Supabase client
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Handle file upload
  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }
    
    setUploading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (uploadError) {
        throw new Error(uploadError.message);
      }
      
      // Get public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
        
      const publicUrl = data.publicUrl;
      
      setImageUrl(publicUrl);
      setSuccess(true);
      
      // Notify parent component about the new image URL
      if (onImageUploaded) {
        onImageUploaded(publicUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error instanceof Error ? error.message : 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };
  
  const handleRemoveImage = async () => {
    if (!imageUrl) return;
    
    try {
      // Extract file path from URL
      const storageUrl = supabaseUrl + '/storage/v1/object/public/images/';
      const filePath = imageUrl.replace(storageUrl, '');
      
      setUploading(true);
      
      // Delete the file from storage
      const { error } = await supabase.storage
        .from('images')
        .remove([filePath]);
        
      if (error) {
        throw error;
      }
      
      setImageUrl(null);
      setSuccess(false);
      
      // Notify parent component
      if (onImageUploaded) {
        onImageUploaded('');
      }
    } catch (error) {
      console.error('Error removing image:', error);
      setError('Error removing image');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className={`${className}`}>
      {imageUrl ? (
        <div className="relative group">
          <img 
            src={imageUrl} 
            alt="Uploaded preview" 
            style={{ width, height }} 
            className="rounded-lg object-cover"
          />
          <motion.div 
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg"
            whileHover={{ opacity: 1 }}
          >
            <div className="p-2">
              <button 
                onClick={handleRemoveImage}
                className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full"
                disabled={uploading}
              >
                {uploading ? <Loader2 className="animate-spin" size={16} /> : <X size={16} />}
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center bg-white/5 hover:bg-white/10 transition-colors"
          style={{ width, minHeight: '200px' }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-4">
              <div className="p-3 bg-white/10 rounded-full">
                <Image size={24} className="text-white/70" />
              </div>
            </div>
            <p className="text-white font-medium mb-2">Upload Instructor Image</p>
            <p className="text-white/60 text-sm mb-4">Click to browse or drag and drop</p>
            <p className="text-white/40 text-xs">(Max size: {maxSizeMB}MB)</p>
            
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            
            {uploading && (
              <div className="mt-4 flex items-center text-white/60">
                <Loader2 className="animate-spin mr-2" size={16} />
                <span>Uploading...</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <motion.div 
          className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-white flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle size={14} className="text-red-400 mr-2" />
          {error}
        </motion.div>
      )}
      
      {success && !error && (
        <motion.div 
          className="mt-2 p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-sm text-white flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Check size={14} className="text-green-400 mr-2" />
          Image uploaded successfully
        </motion.div>
      )}
    </div>
  );
};

export default ImageUploader;