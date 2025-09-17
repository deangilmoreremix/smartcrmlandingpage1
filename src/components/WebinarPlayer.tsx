import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Settings } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
}

interface WebinarPlayerProps {
  videoUrl: string;
  title: string;
  chapters?: Chapter[];
  thumbnailUrl?: string;
  onTimeUpdate?: (currentTime: number) => void;
  className?: string;
}

const WebinarPlayer: React.FC<WebinarPlayerProps> = ({
  videoUrl,
  title,
  chapters = [],
  thumbnailUrl,
  onTimeUpdate,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [videoError, setVideoError] = useState<string | null>(null);
  
  // Convert time string (HH:MM:SS) to seconds
  const timeToSeconds = (timeStr: string): number => {
    const parts = timeStr.split(':').map(Number);
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  };
  
  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Update current chapter based on current time
  useEffect(() => {
    if (chapters.length > 0) {
      const current = chapters.find(chapter => {
        const start = timeToSeconds(chapter.startTime);
        const end = timeToSeconds(chapter.endTime);
        return currentTime >= start && currentTime < end;
      });
      setActiveChapter(current || null);
    }
  }, [currentTime, chapters]);
  
  // Video event handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      if (onTimeUpdate) {
        onTimeUpdate(time);
      }
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setVideoError(null);
    }
  };
  
  const handleVideoError = () => {
    setVideoError('Unable to load video. Please check the video URL or try again later.');
  };
  
  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };
  
  const handleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };
  
  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const jumpToChapter = (chapter: Chapter) => {
    const startTime = timeToSeconds(chapter.startTime);
    handleSeek(startTime);
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };
  
  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      handleSeek(newTime);
    }
  };
  
  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };
  
  // Don't render if no video URL
  if (!videoUrl) {
    return (
      <div className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden ${className}`}>
        <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <div className="text-center">
            <Play size={48} className="text-white/40 mx-auto mb-2" />
            <p className="text-white/60">Video not available</p>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-white/70 mt-2">This webinar recording will be available after the live session.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden ${className}`}>
      <div className="relative aspect-video bg-black">
        {videoError && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
            <div className="text-center">
              <AlertTriangle size={48} className="text-red-400 mx-auto mb-4" />
              <p className="text-white text-lg font-medium mb-2">Video Error</p>
              <p className="text-white/70">{videoError}</p>
            </div>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="w-full h-full"
          poster={thumbnailUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handleVideoError}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(true)} // Keep controls visible for now
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Play button overlay */}
        {!isPlaying && (
          <motion.div 
            className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
            onClick={handlePlayPause}
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={36} className="text-white ml-2" />
            </motion.div>
          </motion.div>
        )}
        
        {/* Video controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {/* Progress bar */}
              <div className="mb-4">
                <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden cursor-pointer">
                  <motion.div 
                    className="h-full bg-blue-500"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
              </div>
              
              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.button
                    className="text-white p-2 rounded-full hover:bg-white/20"
                    onClick={handlePlayPause}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </motion.button>
                  
                  <motion.button
                    className="text-white p-2 rounded-full hover:bg-white/20"
                    onClick={() => handleSkip(-10)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipBack size={20} />
                  </motion.button>
                  
                  <motion.button
                    className="text-white p-2 rounded-full hover:bg-white/20"
                    onClick={() => handleSkip(10)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipForward size={20} />
                  </motion.button>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      className="text-white p-2 rounded-full hover:bg-white/20"
                      onClick={handleMute}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </motion.button>
                    
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-20 accent-blue-500"
                    />
                  </div>
                  
                  <span className="text-white/70 text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Playback speed */}
                  <select
                    value={playbackRate}
                    onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                    className="bg-white/10 text-white text-sm rounded px-2 py-1 border border-white/20"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                  
                  <motion.button
                    className="text-white p-2 rounded-full hover:bg-white/20"
                    onClick={handleFullscreen}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Maximize2 size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Current chapter indicator */}
        {activeChapter && (
          <motion.div
            className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-white text-sm font-medium">{activeChapter.title}</p>
          </motion.div>
        )}
      </div>
      
      {/* Video info and chapters */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        
        {chapters.length > 0 && (
          <div className="mt-6">
            <h4 className="text-white font-medium mb-3">Chapters</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {chapters.map((chapter, index) => (
                <motion.button
                  key={chapter.id}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    activeChapter?.id === chapter.id 
                      ? 'bg-blue-500/20 border border-blue-500/40' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => jumpToChapter(chapter)}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium text-sm">{chapter.title}</p>
                      {chapter.description && (
                        <p className="text-white/60 text-xs mt-1">{chapter.description}</p>
                      )}
                    </div>
                    <span className="text-white/50 text-xs">{chapter.startTime}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebinarPlayer;