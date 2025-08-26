import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Upload, Check, AlertTriangle, Loader2, Image } from 'lucide-react';
import { motion } from 'framer-motion';

const StorageBucketSetup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [supabase, setSupabase] = useState<any | null>(null);
  
  useEffect(() => {
    const initializeSupabase = () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          setMessage({
            type: 'error',
            text: "Supabase configuration is missing. Please connect to Supabase first."
          });
          return null;
        }
        
        return createClient(supabaseUrl, supabaseAnonKey);
      } catch (err: any) {
        console.error("Error initializing Supabase client:", err);
        setMessage({
          type: 'error',
          text: "Failed to initialize database connection."
        });
        return null;
      }
    };
    
    const client = initializeSupabase();
    setSupabase(client);
  }, []);
  
  const checkBuckets = async () => {
    if (!supabase) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      // Check avatar bucket
      const { data: avatarBucket, error: avatarError } = await supabase
        .storage
        .getBucket('avatar');
      
      // Check images bucket
      const { data: imagesBucket, error: imagesError } = await supabase
        .storage
        .getBucket('images');
      
      if (avatarError) {
        console.error("Avatar bucket error:", avatarError);
      }
      
      if (imagesError) {
        console.error("Images bucket error:", imagesError);
      }
      
      if (avatarBucket && imagesBucket) {
        setMessage({
          type: 'success',
          text: "Storage buckets are properly configured! You can now upload images."
        });
      } else {
        setMessage({
          type: 'error',
          text: `Missing buckets: ${!avatarBucket ? 'avatar' : ''} ${!imagesBucket ? 'images' : ''}`
        });
      }
    } catch (err: any) {
      console.error("Error checking buckets:", err);
      setMessage({
        type: 'error',
        text: `Failed to check storage buckets: ${err.message}`
      });
    } finally {
      setLoading(false);
    }
  };
  
  const uploadSampleImage = async () => {
    if (!supabase) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      // Create a simple canvas with some text
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1e3a8a'; // Blue background
        ctx.fillRect(0, 0, 400, 300);
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Dean Gilmore', 200, 120);
        ctx.fillStyle = '#60a5fa';
        ctx.font = '16px Arial';
        ctx.fillText('CRM Strategy Expert & Author', 200, 150);
      }
      
      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });
      
      if (!blob) {
        throw new Error("Failed to create image");
      }
      
      // Upload to avatar bucket
      const fileName = `sample-instructor-${Date.now()}.png`;
      
      const { error: uploadError } = await supabase
        .storage
        .from('avatar')
        .upload(fileName, blob);
      
      if (uploadError) {
        throw new Error(`Upload error: ${uploadError.message}`);
      }
      
      // Get the URL for the uploaded image
      const { data: urlData } = supabase
        .storage
        .from('avatar')
        .getPublicUrl(fileName);
      
      setMessage({
        type: 'success',
        text: `Sample image uploaded successfully to avatar bucket! The image is now available at: ${urlData.publicUrl}`
      });
    } catch (err: any) {
      console.error("Error uploading sample image:", err);
      setMessage({
        type: 'error',
        text: `Failed to upload sample image: ${err.message}`
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-8 mb-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Storage Bucket Setup</h2>
      
      <div className="space-y-4">
        <p className="text-white/80">
          This utility helps verify and test your Supabase storage configuration for image uploads.
        </p>
        
        <div className="flex gap-3">
          <motion.button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkBuckets}
            disabled={loading || !supabase}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : (
              <Image className="mr-2" size={18} />
            )}
            Check Storage Buckets
          </motion.button>
          
          <motion.button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={uploadSampleImage}
            disabled={loading || !supabase}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : (
              <Upload className="mr-2" size={18} />
            )}
            Upload Sample Image
          </motion.button>
        </div>
        
        {message && (
          <motion.div
            className={`p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-red-500/20 border border-red-500/30'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center">
              {message.type === 'success' ? (
                <Check size={18} className="text-green-400 mr-2 flex-shrink-0" />
              ) : (
                <AlertTriangle size={18} className="text-red-400 mr-2 flex-shrink-0" />
              )}
              <p className="text-white text-sm">{message.text}</p>
            </div>
          </motion.div>
        )}
        
        {!supabase && (
          <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-sm">
              Please connect to Supabase using the "Connect to Supabase" button in the top right to continue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageBucketSetup;