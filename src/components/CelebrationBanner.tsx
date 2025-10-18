import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Sparkles, Star, Users, ArrowRight, X, Calendar } from 'lucide-react';
import CanvasConfetti from './CanvasConfetti';

interface CelebrationBannerProps {
  onClose?: () => void;
  autoHide?: boolean; // automatically hide after a certain time
  autoHideDelay?: number; // in milliseconds
  showConfetti?: boolean;
}

const CelebrationBanner: React.FC<CelebrationBannerProps> = ({
  onClose,
  autoHide = true,
  autoHideDelay = 15000,
  showConfetti = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showConfettiEffect, setShowConfettiEffect] = useState(showConfetti);
  
  useEffect(() => {
    // Auto-hide the banner after specified delay
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoHideDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  return (
    <>
      {/* Show confetti effect when banner is displayed */}
      {showConfettiEffect && <CanvasConfetti />}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-4 sm:w-96 z-50"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl overflow-hidden relative">
              <motion.div 
                className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.div 
                className="absolute -bottom-20 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />
              
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
                aria-label="Close banner"
              >
                <X size={18} />
              </button>
              
              <div className="p-4 relative z-10">
                <div className="flex items-start mb-3">
                  <motion.div
                    className="p-2 rounded-full bg-white/20 mr-3 flex-shrink-0"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <PartyPopper className="text-yellow-300" size={24} />
                  </motion.div>
                  <div>
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Star className="text-yellow-300 mr-1" size={16} fill="currentColor" />
                      <Star className="text-yellow-300 mr-1" size={16} fill="currentColor" />
                      <Star className="text-yellow-300" size={16} fill="currentColor" />
                    </motion.div>
                    <motion.h3
                      className="text-xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Registration Successful!
                    </motion.h3>
                    <motion.p 
                      className="text-white/90 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      You're all set for the Smart CRM Masterclass
                    </motion.p>
                  </div>
                </div>
                
                <motion.div
                  className="bg-white/10 rounded-lg p-3 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center">
                    <Calendar className="text-white mr-2 flex-shrink-0" size={16} />
                    <p className="text-white/90 text-sm">
                      <span className="font-semibold">October 17-19, 2025</span> - All days at 3:00 PM EST
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Users className="text-blue-200 mr-2" size={16} />
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div 
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="ml-2 text-white/80 text-xs">
                    You've joined 87 others today!
                  </span>
                </motion.div>
                
                <motion.div
                  className="bg-white/10 rounded-lg p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-start">
                    <Sparkles className="text-yellow-300 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    <p className="text-white/90 text-sm">
                      Check your email for masterclass details and a calendar invitation
                    </p>
                  </div>
                </motion.div>
                
                <motion.button
                  className="w-full py-2 px-4 bg-white text-blue-700 hover:bg-blue-50 font-medium rounded-lg flex items-center justify-center group mt-3"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={handleClose}
                >
                  <span>Got it, thanks!</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CelebrationBanner;