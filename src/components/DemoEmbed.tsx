import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, AlertCircle, RefreshCw, Maximize2, X, Info, Zap } from "lucide-react";
import { EMBED_URLS } from "../constants/embedUrls";

interface DemoEmbedProps {
  url?: string;
  title?: string;
  showControls?: boolean;
  autoLoad?: boolean;
  onLoad?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function DemoEmbed({
  url = EMBED_URLS.dashboard,
  title = "SmartCRM Demo Dashboard",
  showControls = true,
  autoLoad = true,
  onLoad,
  onError,
  className = ""
}: DemoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline' | 'waking'>('checking');
  const [wakingProgress, setWakingProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const MAX_RETRIES = 3;
  const LOAD_TIMEOUT = 60000; // 60 seconds for Replit

  useEffect(() => {
    if (autoLoad) {
      checkServerAndLoad();
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, [autoLoad]);

  const checkServerAndLoad = async () => {
    setServerStatus('checking');
    setError(null);

    // Start timeout watcher
    timerRef.current = window.setTimeout(() => {
      if (!loaded) {
        const timeoutError = "Demo is taking longer than expected to load. The Replit server may be waking up from sleep mode.";
        setError(timeoutError);
        onError?.(timeoutError);
        console.warn(timeoutError);
      }
    }, LOAD_TIMEOUT);

    // Check if it's a Replit URL that might need waking
    if (url.includes('replit.app')) {
      await wakeUpServer();
    } else {
      setServerStatus('online');
    }
  };

  const wakeUpServer = async () => {
    setServerStatus('waking');
    setWakingProgress(0);
    setError(null);

    // Progress animation
    progressIntervalRef.current = window.setInterval(() => {
      setWakingProgress(prev => {
        if (prev >= 90) return 90;
        return prev + 2;
      });
    }, 600);

    try {
      // Ping the server to wake it up
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Wait for server to fully wake
      await new Promise(resolve => setTimeout(resolve, 3000));

      setWakingProgress(100);
      setServerStatus('online');

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    } catch (error) {
      console.error('Failed to wake server:', error);
      setServerStatus('offline');
      setError('Unable to connect to demo server. Please try again.');
      onError?.('Server wake-up failed');

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  };

  const handleIframeLoad = () => {
    setLoaded(true);
    setError(null);
    setServerStatus('online');

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    onLoad?.();
  };

  const handleIframeError = () => {
    const errorMsg = "Failed to load demo. Please try again or open in a new tab.";
    setError(errorMsg);
    setLoaded(false);
    onError?.(errorMsg);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleRetry = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      setLoaded(false);
      setError(null);
      checkServerAndLoad();
    }
  };

  const openInNewTab = async () => {
    if (serverStatus === 'offline' || serverStatus === 'waking') {
      await wakeUpServer();
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 2000);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
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
      {/* Loading State */}
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 grid place-items-center text-white/80 text-sm bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 z-10"
          >
            <div className="text-center p-8 max-w-lg">
              {serverStatus === 'waking' ? (
                <>
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="rgba(249, 115, 22, 0.2)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="#f97316"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 60}`}
                        strokeDashoffset={`${2 * Math.PI * 60 * (1 - wakingProgress / 100)}`}
                        className="transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-orange-400 text-2xl font-bold">{Math.round(wakingProgress)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-3">
                    <Zap className="text-orange-400 mr-2" size={24} />
                    <h4 className="text-white text-xl font-semibold">Waking Up Server...</h4>
                  </div>
                  <p className="text-white/70 mb-4">Starting the Replit server. This usually takes 30-60 seconds.</p>
                </>
              ) : (
                <>
                  <div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full mb-4 mx-auto" />
                  <div className="mb-2">Loading SmartCRM Demo…</div>
                  <p className="text-white/60 text-xs">The server may take up to 60 seconds to wake up on first load</p>
                </>
              )}

              {retryCount > 0 && (
                <p className="text-orange-400 text-sm mt-4">Retry attempt {retryCount} of {MAX_RETRIES}</p>
              )}

              <div className="flex gap-3 justify-center mt-6">
                <motion.button
                  onClick={openInNewTab}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="mr-2" size={16} />
                  Open in New Tab
                </motion.button>

                {serverStatus !== 'waking' && (
                  <motion.button
                    onClick={wakeUpServer}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Zap className="mr-2" size={16} />
                    Wake Server
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 grid place-items-center bg-gradient-to-br from-gray-900 to-gray-800 z-10"
          >
            <div className="text-center p-8 max-w-lg">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-orange-400" size={32} />
              </div>
              <h4 className="text-white text-xl font-semibold mb-2">Connection Issue</h4>
              <p className="text-white/70 mb-6">{error}</p>

              <div className="bg-blue-900/30 rounded-lg p-4 mb-6 text-left">
                <h5 className="text-blue-300 font-medium mb-2 flex items-center text-sm">
                  <Info className="mr-2" size={16} />
                  What's happening?
                </h5>
                <ul className="text-white/70 text-xs space-y-1">
                  <li>• Replit servers sleep after 1 hour of inactivity</li>
                  <li>• Cold starts can take 30-90 seconds</li>
                  <li>• First wake-up attempt may timeout</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {retryCount < MAX_RETRIES && (
                  <motion.button
                    onClick={handleRetry}
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className="mr-2" size={18} />
                    {retryCount > 0 ? `Retry (${retryCount}/${MAX_RETRIES})` : 'Try Again'}
                  </motion.button>
                )}

                <motion.button
                  onClick={openInNewTab}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="mr-2" size={18} />
                  Open in Tab
                </motion.button>
              </div>

              {retryCount >= MAX_RETRIES && (
                <div className="mt-4 p-4 bg-amber-900/30 rounded-lg border border-amber-500/30">
                  <p className="text-amber-300 text-sm font-medium mb-2">Maximum retries reached</p>
                  <motion.button
                    onClick={() => {
                      setRetryCount(0);
                      handleRetry();
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm font-medium w-full"
                    whileHover={{ scale: 1.02 }}
                  >
                    Reset & Try Again
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={url}
        title={title}
        allow="fullscreen; display-capture"
        className="absolute inset-0 w-full h-full border-0"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads allow-presentation"
        loading="lazy"
      />

      {/* Controls Overlay */}
      {showControls && loaded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 flex gap-2 z-20"
        >
          <motion.button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Info"
          >
            <Info size={18} />
          </motion.button>

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

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 w-80 bg-black/90 backdrop-blur-md rounded-lg p-4 border border-white/10 z-20"
          >
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-white font-semibold text-sm">Demo Information</h5>
              <button
                onClick={() => setShowInfo(false)}
                className="text-white/70 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <div className="text-white/70 text-xs space-y-2">
              <p>This is a live interactive demo of SmartCRM Dashboard.</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Click on charts for details</li>
                <li>Real-time data updates</li>
                <li>Fully interactive interface</li>
                <li>Mobile responsive design</li>
              </ul>
              <p className="text-orange-400 font-medium mt-3">
                Server Status: {serverStatus === 'online' ? '🟢 Online' : '🟡 Initializing'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator for loaded state */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-4 z-20"
        >
          <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-green-500/30">
            <span className="text-green-400 text-xs font-medium">● Live Demo</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
