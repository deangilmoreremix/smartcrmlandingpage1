import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, FileText, Loader2, Check, AlertTriangle, Play, Calendar } from 'lucide-react';
import VideoUploader from './VideoUploader';
import { uploadWebinarVideo, generateWebinarSummary, extractWebinarChapters } from '../utils/webinarApi';

interface WebinarUploadManagerProps {
  onUploadComplete?: (webinarDay: number) => void;
  className?: string;
}

const WebinarUploadManager: React.FC<WebinarUploadManagerProps> = ({
  onUploadComplete,
  className = ''
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [webinarTitle, setWebinarTitle] = useState('');
  const [processing, setProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const webinarTitles = {
    1: "The Broken Sales Process & Why It's Costing You",
    2: "Automate, Personalize, and Scale Your Sales", 
    3: "Your Future Sales System + Smart CRM Offer Reveal"
  };
  
  // Auto-set title based on selected day
  React.useEffect(() => {
    setWebinarTitle(webinarTitles[selectedDay as keyof typeof webinarTitles] || '');
  }, [selectedDay]);
  
  const handleVideoUpload = async (videoData: any) => {
    setProcessing(true);
    setError(null);
    
    try {
      // The video file upload is handled by VideoUploader
      // Now we need to process it for transcript, summary, chapters
      console.log('Video uploaded successfully:', videoData);
      
      // In a real implementation, you would:
      // 1. Get the video URL from the upload
      // 2. Call your AI processing functions
      // 3. Generate transcript, summary, and chapters
      
      setProcessedData({
        videoId: videoData.id,
        day: selectedDay,
        title: webinarTitle
      });
      
      if (onUploadComplete) {
        onUploadComplete(selectedDay);
      }
    } catch (err: any) {
      setError(err.message || 'Processing failed');
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <div className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 ${className}`}>
      <div className="flex items-center mb-6">
        <Upload className="text-blue-400 mr-3" size={24} />
        <h2 className="text-xl font-bold text-white">Upload Webinar Video</h2>
      </div>
      
      <div className="space-y-6">
        {/* Day Selection */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Webinar Day</label>
          <div className="flex gap-2">
            {[1, 2, 3].map((day) => (
              <motion.button
                key={day}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedDay === day 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                onClick={() => setSelectedDay(day)}
                whileHover={{ scale: selectedDay !== day ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
              >
                Day {day}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Title Input */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Webinar Title</label>
          <input
            type="text"
            value={webinarTitle}
            onChange={(e) => setWebinarTitle(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="Enter webinar title"
          />
        </div>
        
        {/* Video Upload */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Video File</label>
          <VideoUploader
            onVideoUploaded={handleVideoUpload}
            folder={`webinar-day-${selectedDay}`}
            maxSizeMB={500} // Large file support for webinars
          />
        </div>
        
        {/* Processing Status */}
        {processing && (
          <motion.div 
            className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center">
              <Loader2 className="animate-spin text-blue-400 mr-3" size={20} />
              <div>
                <p className="text-white font-medium">Processing webinar...</p>
                <p className="text-white/70 text-sm">Generating transcript, summary, and chapters</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Success State */}
        {processedData && !processing && (
          <motion.div 
            className="bg-green-500/20 border border-green-500/30 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center">
              <Check className="text-green-400 mr-3" size={20} />
              <div>
                <p className="text-white font-medium">Webinar uploaded successfully!</p>
                <p className="text-white/70 text-sm">Day {processedData.day} is now available for viewing</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Error State */}
        {error && (
          <motion.div 
            className="bg-red-500/20 border border-red-500/30 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center">
              <AlertTriangle className="text-red-400 mr-3" size={20} />
              <div>
                <p className="text-white font-medium">Upload failed</p>
                <p className="text-white/70 text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Instructions */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Upload Instructions</h4>
          <ol className="text-white/70 text-sm space-y-1 list-decimal ml-5">
            <li>Select the webinar day (1, 2, or 3)</li>
            <li>Enter or confirm the webinar title</li>
            <li>Upload the video file (MP4, WebM, MOV supported)</li>
            <li>Wait for AI processing to complete</li>
            <li>The webinar will be available on the recap page</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default WebinarUploadManager;