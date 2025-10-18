import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Maximize2, X } from "lucide-react";

interface DemoEmbedProps {
  url?: string;
  title?: string;
  showControls?: boolean;
  className?: string;
}

export default function DemoEmbed({
  url = "https://smartcrm-videoremix.replit.app/demo-dashboard",
  title = "SmartCRM Demo Dashboard",
  showControls = true,
  className = ""
}: DemoEmbedProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const openInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1200px] mx-auto rounded-2xl overflow-hidden bg-gray-900 ${className}`}
      style={{ aspectRatio: '16/9' }}
    >
      {/* Iframe - Always Visible */}
      <iframe
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; picture-in-picture"
        className="absolute inset-0 w-full h-full border-0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads allow-presentation allow-top-navigation-by-user-activation allow-storage-access-by-user-activation"
        referrerPolicy="origin-when-cross-origin"
        loading="eager"
        importance="high"
      />

      {/* Controls Overlay */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 flex gap-2 z-20"
        >
          <motion.button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <X size={18} /> : <Maximize2 size={18} />}
          </motion.button>

          <motion.button
            onClick={openInNewTab}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Open in new tab"
          >
            <ExternalLink size={18} />
          </motion.button>
        </motion.div>
      )}

      {/* Live Demo Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-4 z-20"
      >
        <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-green-500/30">
          <span className="text-green-400 text-xs font-medium">● Live Demo</span>
        </div>
      </motion.div>
    </div>
  );
}
