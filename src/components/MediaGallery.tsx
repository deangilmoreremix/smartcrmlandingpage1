import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Trash2, Eye, Download, Upload, Grid, List, Search, Filter } from 'lucide-react';
import { getUserMedia, deleteMedia, MediaFile } from '../utils/mediaStorage';

interface MediaGalleryProps {
  userId?: string;
  bucket?: string;
  onMediaSelect?: (file: MediaFile) => void;
  allowUpload?: boolean;
  allowDelete?: boolean;
  className?: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  userId,
  bucket = 'images',
  onMediaSelect,
  allowUpload = true,
  allowDelete = true,
  className = ''
}) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  
  // Load media files
  const loadMedia = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await getUserMedia(userId, bucket);
      
      if (result.success) {
        setFiles(result.files || []);
      } else {
        setError(result.error || 'Failed to load media');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load media');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadMedia();
  }, [userId, bucket]);
  
  // Filter files based on search
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle file deletion
  const handleDelete = async (file: MediaFile) => {
    try {
      const result = await deleteMedia(file.id, file.url.split('/').pop() || '', bucket);
      
      if (result.success) {
        setFiles(prev => prev.filter(f => f.id !== file.id));
        if (selectedFile?.id === file.id) {
          setSelectedFile(null);
        }
      } else {
        setError(result.error || 'Failed to delete file');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete file');
    }
  };
  
  // Handle file selection
  const handleSelect = (file: MediaFile) => {
    setSelectedFile(file);
    if (onMediaSelect) {
      onMediaSelect(file);
    }
  };
  
  return (
    <div className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Media Gallery</h3>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-white/50" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 w-40"
            />
          </div>
          
          {/* View toggle */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <motion.button
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-white/60'}`}
              onClick={() => setViewMode('grid')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Grid size={16} />
            </motion.button>
            <motion.button
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-white/60'}`}
              onClick={() => setViewMode('list')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <List size={16} />
            </motion.button>
          </div>
          
          {allowUpload && (
            <motion.button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('Upload new file')}
            >
              <Upload size={16} className="mr-2" />
              Upload
            </motion.button>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-white/60">Loading media files...</span>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            {bucket === 'videos' ? <Video size={24} className="text-white/40" /> : <Image size={24} className="text-white/40" />}
          </div>
          <p className="text-white/60">No {bucket === 'videos' ? 'videos' : 'images'} found</p>
          {searchQuery && (
            <p className="text-white/40 text-sm mt-2">Try adjusting your search terms</p>
          )}
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
          : "space-y-3"
        }>
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file.id}
              className={`bg-white/5 rounded-lg border border-white/10 overflow-hidden cursor-pointer ${
                viewMode === 'list' ? 'p-4' : 'aspect-square'
              }`}
              whileHover={{ 
                y: -5, 
                backgroundColor: "rgba(255, 255, 255, 0.1)" 
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelect(file)}
            >
              {viewMode === 'grid' ? (
                <div className="relative h-full">
                  {file.type.startsWith('video/') ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Video size={32} className="text-white/40" />
                    </div>
                  ) : (
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-medium truncate">{file.name}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-white/70 text-xs">
                          {(file.size / (1024 * 1024)).toFixed(1)}MB
                        </span>
                        
                        {allowDelete && (
                          <motion.button
                            className="p-1 bg-red-500/20 hover:bg-red-500/40 rounded text-red-400"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(file);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 size={12} />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                    {file.type.startsWith('video/') ? (
                      <Video size={20} className="text-white/60" />
                    ) : (
                      <Image size={20} className="text-white/60" />
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-white font-medium">{file.name}</p>
                    <p className="text-white/60 text-sm">
                      {(file.size / (1024 * 1024)).toFixed(1)}MB • {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      className="p-2 text-white/60 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={16} />
                    </motion.button>
                    
                    {allowDelete && (
                      <motion.button
                        className="p-2 text-red-400 hover:text-red-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
      
      {/* File preview modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              className="bg-white/10 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedFile.name}</h3>
                  <p className="text-white/60">
                    {(selectedFile.size / (1024 * 1024)).toFixed(1)}MB • 
                    Uploaded {new Date(selectedFile.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-2 hover:bg-white/10 rounded-full text-white/70"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-4">
                {selectedFile.type.startsWith('video/') ? (
                  <video 
                    src={selectedFile.url} 
                    controls 
                    className="w-full rounded-lg"
                    style={{ maxHeight: '60vh' }}
                  />
                ) : (
                  <img 
                    src={selectedFile.url} 
                    alt={selectedFile.name}
                    className="w-full rounded-lg object-contain"
                    style={{ maxHeight: '60vh' }}
                  />
                )}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedFile(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                >
                  Close
                </button>
                
                <div className="flex gap-3">
                  <motion.button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(selectedFile.url, '_blank')}
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </motion.button>
                  
                  {allowDelete && (
                    <motion.button
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleDelete(selectedFile);
                        setSelectedFile(null);
                      }}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Add missing X icon component
const X = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default MediaGallery;