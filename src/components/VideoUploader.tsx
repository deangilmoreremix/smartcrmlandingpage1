import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, X, Check, AlertTriangle, Loader2, Play, FileVideo } from 'lucide-react';
import { uploadVideo } from '../utils/mediaStorage';

interface VideoUploaderProps {
  onVideoUploaded?: (videoData: any) => void;
  maxSizeMB?: number;
  className?: string;
  folder?: string;
  userId?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  onVideoUploaded,
  maxSizeMB = 100,
  className = '',
  folder = 'webinars',
  userId
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Handle file upload
  const handleUpload = useCallback(async (file: File) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Only video files are allowed');
      return;
    }
    
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }
    
    setUploading(true);
    setError(null);
    setSuccess(false);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
      
      // Upload video
      const result = await uploadVideo(file, userId, {
        folder: folder,
        originalName: file.name,
        uploadedAt: new Date().toISOString()
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setUploadedVideo(result.record);
      setSuccess(true);
      
      if (onVideoUploaded) {
        onVideoUploaded(result.record);
      }
    } catch (error) {
      console.error('Video upload error:', error);
      setError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [maxSizeMB, folder, userId, onVideoUploaded]);
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };
  
  // Handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);
  
  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  }, [handleUpload]);
  
  return (
    <div className={`${className}`}>
      {!uploadedVideo ? (
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive 
              ? 'border-blue-500 bg-blue-500/10' 
              : 'border-white/20 bg-white/5 hover:bg-white/10'
          }`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className={`p-4 rounded-full mb-4 ${dragActive ? 'bg-blue-500/20' : 'bg-white/10'}`}
              animate={dragActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: dragActive ? Infinity : 0 }}
            >
              <Video size={32} className={dragActive ? 'text-blue-400' : 'text-white/70'} />
            </motion.div>
            
            <h3 className="text-white font-medium mb-2">Upload Webinar Video</h3>
            <p className="text-white/60 text-sm mb-4">
              {dragActive ? 'Drop your video here' : 'Drag and drop or click to browse'}
            </p>
            <p className="text-white/40 text-xs mb-4">
              Supports MP4, WebM, MOV, AVI (Max size: {maxSizeMB}MB)
            </p>
            
            <label className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer inline-flex items-center">
              <Upload size={18} className="mr-2" />
              Choose Video File
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="sr-only"
                disabled={uploading}
              />
            </label>
            
            {uploading && (
              <div className="mt-6 w-full max-w-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Uploading...</span>
                  <span className="text-white/60 text-sm">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <motion.div 
          className="bg-white/5 rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start">
            <div className="p-3 bg-green-500/20 rounded-lg mr-4">
              <FileVideo size={24} className="text-green-400" />
            </div>
            <div className="flex-grow">
              <h3 className="text-white font-medium mb-1">{uploadedVideo.original_name}</h3>
              <p className="text-white/60 text-sm mb-3">
                {(uploadedVideo.file_size / (1024 * 1024)).toFixed(1)}MB • {uploadedVideo.mime_type}
              </p>
              
              <div className="flex gap-3">
                <motion.button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={16} className="mr-2" />
                  Preview
                </motion.button>
                
                <motion.button
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUploadedVideo(null)}
                >
                  Upload Another
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {error && (
        <motion.div 
          className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-white flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle size={16} className="text-red-400 mr-2" />
          {error}
        </motion.div>
      )}
      
      {success && !error && (
        <motion.div 
          className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-sm text-white flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Check size={16} className="text-green-400 mr-2" />
          Video uploaded successfully!
        </motion.div>
      )}
    </div>
  );
};

export default VideoUploader;