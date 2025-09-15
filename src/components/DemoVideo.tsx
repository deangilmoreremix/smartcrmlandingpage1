import React, { useState } from 'react';
import { Play, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';

interface DemoVideoProps {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
  description: string;
}

const DemoVideo: React.FC<DemoVideoProps> = ({ 
  thumbnailUrl, 
  videoUrl, 
  title, 
  description 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <AnimatedElement animation="scale" duration={0.7}>
      <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl">
        <div className="relative aspect-video">
          {!isPlaying ? (
            <>
              <img 
                src={thumbnailUrl} 
                alt={title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.button
                  className="w-20 h-20 rounded-full bg-blue-600/90 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                  onClick={handlePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={36} className="ml-2" />
                </motion.button>
              </div>
            </>
          ) : (
            <div className="w-full h-full">
              <iframe
                src={`${videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                title={title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          {isPlaying && (
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button 
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button 
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={() => window.open(videoUrl, '_blank')}
              >
                <Maximize2 size={18} />
              </button>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/70">{description}</p>
        </div>
      </div>
    </AnimatedElement>
  );
};

export default DemoVideo;