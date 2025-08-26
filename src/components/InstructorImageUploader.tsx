import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, User, AlertTriangle, Check, Camera, X, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { getInstructorImageUrl } from '../utils/supabaseClient';

interface InstructorImageUploaderProps {
  onImageUploaded?: (url: string) => void;
  initialImageUrl?: string | null;
}

const InstructorImageUploader: React.FC<InstructorImageUploaderProps> = ({
  onImageUploaded,
  initialImageUrl
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [supabase, setSupabase] = useState<any | null>(null);
  
  // Initialize Supabase client
  useEffect(() => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        setError("Supabase configuration is missing. Please connect to Supabase first.");
        return;
      }
      
      const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
      setSupabase(supabaseClient);
      
      // If no initialImageUrl was provided, try to fetch the current instructor image
      if (!initialImageUrl) {
        getInstructorImageUrl().then(url => {
          if (url) setImageUrl(url);
        });
      }
    } catch (err: any) {
      console.error("Error initializing Supabase client:", err);
      setError("Failed to initialize database connection.");
    }
  }, [initialImageUrl]);

  useEffect(() => {
    // Update image URL if initialImageUrl changes
    if (initialImageUrl) {
      setImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    if (!supabase) {
      setError('Storage connection not available');
      return;
    }
    
    try {
      setUploading(true);
      setError(null);
      setSuccess(false);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `instructor-${Date.now()}.${fileExt}`;
      
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatar')
        .upload(fileName, file);
      
      if (uploadError) {
        throw new Error(uploadError.message);
      }
      
      // Get public URL
      const { data } = supabase
        .storage
        .from('avatar')
        .getPublicUrl(fileName);
      
      const publicUrl = data.publicUrl;
      console.log("Uploaded new instructor image:", publicUrl);
      
      setImageUrl(publicUrl);
      setSuccess(true);
      
      if (onImageUploaded) {
        onImageUploaded(publicUrl);
      }
    } catch (err: any) {
      console.error("Error uploading image:", err);
      setError(err.message || 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };
  
  const removeImage = async () => {
    if (!imageUrl || !supabase) return;
    
    try {
      setUploading(true);
      
      // Extract the file path from the URL
      const urlWithoutParams = imageUrl.split('?')[0];
      const pathParts = urlWithoutParams.split('/');
      const fileName = pathParts[pathParts.length - 1];
      
      // Delete the file from storage
      const { error } = await supabase
        .storage
        .from('avatar')
        .remove([fileName]);
      
      if (error) {
        throw error;
      }
      
      setImageUrl(null);
      setSuccess(false);
      
      if (onImageUploaded) {
        onImageUploaded('');
      }
    } catch (err: any) {
      console.error("Error removing image:", err);
      setError(err.message || 'Error removing image');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="relative aspect-[4/3] w-full">
      {imageUrl ? (
        <div className="relative group">
          <img 
            src={imageUrl}
            alt="Instructor"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Error loading image:", e);
              setError("Failed to load image.");
              e.currentTarget.src = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1600";
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
            <div className="absolute bottom-4 left-0 w-full px-4">
              <h3 className="text-white font-bold text-xl">Dean Gilmore</h3>
              <p className="text-white/80 text-sm">CRM Strategy Expert & Author</p>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex gap-2">
              <motion.button
                className="p-2 bg-red-600 text-white rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={removeImage}
                disabled={uploading}
              >
                {uploading ? <Loader2 className="animate-spin" size={18} /> : <X size={18} />}
              </motion.button>
              
              <motion.label
                className="p-2 bg-blue-600 text-white rounded-full cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={18} />
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </motion.label>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center h-full">
          <motion.div
            className="p-3 bg-white/10 rounded-full mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Upload size={24} className="text-blue-400" />
          </motion.div>
          
          <p className="text-white font-medium mb-2">Upload Instructor Image</p>
          <p className="text-white/60 text-sm mb-4">Drag and drop or click to browse</p>
          
          <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer flex items-center">
            <Upload size={16} className="mr-2" />
            Browse Files
            <input
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
      )}
      
      {error && (
        <motion.div
          className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-white flex items-center absolute bottom-0 left-0 right-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle size={18} className="text-red-400 mr-2" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}
      
      {success && !error && (
        <motion.div
          className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-white flex items-center absolute bottom-0 left-0 right-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Check size={18} className="text-green-400 mr-2" />
          <p className="text-sm">Image uploaded successfully!</p>
        </motion.div>
      )}
      
      {uploading && (
        <motion.div 
          className="absolute inset-0 bg-black/70 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.div 
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-white font-medium">Uploading image...</p>
            <p className="text-white/60 text-sm">Please wait</p>
          </div>
        </motion.div>
      )}
      
      {!supabase && (
        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg absolute bottom-0 left-0 right-0">
          <p className="text-yellow-400 text-sm">
            Please connect to Supabase using the "Connect to Supabase" button in the top right to enable image uploads.
          </p>
        </div>
      )}
    </div>
  );
};

export default InstructorImageUploader;