import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, X, AlertTriangle, Eye } from 'lucide-react';

interface PerformanceMonitorProps {
  warningThreshold?: number; // FPS threshold for warning
  sampleSize?: number; // Number of frames to sample
  autoDisableThreshold?: number; // FPS threshold for auto-disabling animations
  className?: string;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  warningThreshold = 30,
  sampleSize = 60,
  autoDisableThreshold = 20,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fps, setFps] = useState<number | null>(null);
  const [shouldWarn, setShouldWarn] = useState(false);
  const [frameHistory, setFrameHistory] = useState<number[]>([]);
  
  useEffect(() => {
    let frameCount = 0;
    let lastTimestamp = performance.now();
    let rafId: number;
    
    const measurePerformance = (timestamp: number) => {
      // Calculate time since last frame
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      // Calculate current FPS (1000ms / elapsed time per frame)
      const currentFps = 1000 / elapsed;
      
      // Add to history
      setFrameHistory(prev => {
        const newHistory = [...prev, currentFps];
        // Keep only the last sampleSize frames
        if (newHistory.length > sampleSize) {
          return newHistory.slice(-sampleSize);
        }
        return newHistory;
      });
      
      // Update FPS every 10 frames
      frameCount++;
      if (frameCount >= 10) {
        frameCount = 0;
        setFps(prev => {
          // Use history to calculate average FPS
          const average = frameHistory.length > 0
            ? frameHistory.reduce((sum, fps) => sum + fps, 0) / frameHistory.length
            : (prev || 60);
          
          // Check if we should warn
          if (average < warningThreshold) {
            setShouldWarn(true);
            
            // If performance is really bad, consider auto-disabling animations
            if (average < autoDisableThreshold) {
              const animationsEnabled = localStorage.getItem('smartCRM_animationsEnabled');
              if (animationsEnabled !== 'false') {
                localStorage.setItem('smartCRM_animationsEnabled', 'false');
                // Broadcast event
                window.dispatchEvent(new CustomEvent('animationPreferenceChanged', { 
                  detail: { animationsEnabled: false } 
                }));
                
                // Show notification
                const notification = document.createElement('div');
                notification.className = 'fixed bottom-4 right-4 bg-yellow-600 text-white p-4 rounded-lg shadow-lg z-50';
                notification.innerHTML = `
                  <div class="flex items-center">
                    <span class="mr-2">⚠️</span>
                    <p>Animations have been disabled to improve performance.</p>
                  </div>
                `;
                document.body.appendChild(notification);
                
                // Remove after 5 seconds
                setTimeout(() => {
                  if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                  }
                }, 5000);
              }
            }
          } else {
            setShouldWarn(false);
          }
          
          return Math.round(average);
        });
      }
      
      // Continue measuring
      rafId = requestAnimationFrame(measurePerformance);
    };
    
    // Start measuring
    rafId = requestAnimationFrame(measurePerformance);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [warningThreshold, sampleSize, autoDisableThreshold]);
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  if (!isVisible) {
    return (
      <motion.button
        className={`fixed bottom-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg z-50 ${className}`}
        onClick={() => setIsVisible(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Show performance monitor"
      >
        <Eye className="text-white/70" size={18} />
      </motion.button>
    );
  }
  
  return (
    <motion.div 
      className={`fixed bottom-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg z-50 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Cpu size={16} className={shouldWarn ? 'text-amber-400 mr-2' : 'text-blue-400 mr-2'} />
          <h3 className="text-white text-sm font-medium">Performance</h3>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white/70 text-xs">FPS:</span>
          <span className={`text-sm font-medium ${shouldWarn ? 'text-amber-400' : 'text-white'}`}>
            {fps !== null ? fps : '...'}
          </span>
        </div>
        
        {shouldWarn && (
          <motion.div 
            className="flex items-center text-amber-400 text-xs bg-amber-500/10 p-2 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertTriangle size={12} className="mr-1 flex-shrink-0" />
            <span>Performance is below optimal levels. Consider disabling animations.</span>
          </motion.div>
        )}
        
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${shouldWarn ? 'bg-amber-400' : 'bg-green-400'}`}
            style={{ width: `${fps !== null ? Math.min(100, (fps / 60) * 100) : 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMonitor;