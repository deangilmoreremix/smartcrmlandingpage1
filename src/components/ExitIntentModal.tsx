import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Star, Zap, ArrowRight, User, Mail, Building } from 'lucide-react';
import { SignupContext } from '../App';
import { handleFormSubmission } from '../utils/formHelpers';
import CanvasConfetti from './CanvasConfetti';

interface ExitIntentModalProps {
  title?: string; 
  subtitle?: string;
  cta?: string;
  delay?: number; // Minimum time on page before showing (in seconds)
  sessionTimeout?: number; // Time in minutes before showing modal again in same session
  onClose?: () => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  title = "Wait! Don't Miss This Opportunity",
  subtitle = "Get Smart CRM during our 5-day sale (October 17-21, 2025) and transform your customer relationships with AI-powered automation",
  cta = "Sign Up for Masterclass",
  delay = 5,
  sessionTimeout = 30,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTimeoutComplete, setIsTimeoutComplete] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  const { openSignupModal, setHasSignedUp } = useContext(SignupContext);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Check if user has dismissed modal recently
    const lastClosed = localStorage.getItem('exitIntentModalClosed');
    if (lastClosed) {
      const lastClosedTime = parseInt(lastClosed, 10);
      const currentTime = new Date().getTime();
      // If less than session timeout minutes have passed, don't show modal
      if ((currentTime - lastClosedTime) / (1000 * 60) < sessionTimeout) {
        return;
      }
    }

    // Set minimum time before exit intent can trigger
    const timeoutId = setTimeout(() => {
      setIsTimeoutComplete(true);
    }, delay * 1000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if cursor leaves through top of page
      if (e.clientY <= 5 && isTimeoutComplete && !hasClosed) {
        setIsVisible(true);
      }
    };

    // For mobile/tablet, detect back button or tab switching
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isTimeoutComplete && !hasClosed) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTimeoutComplete, hasClosed, sessionTimeout, delay]);

  const handleClose = () => {
    setIsVisible(false);
    setHasClosed(true);
    
    // Save that user has closed the modal
    localStorage.setItem('exitIntentModalClosed', new Date().getTime().toString());
    
    if (onClose) {
      onClose();
    }
  };

  const handleFormSubmit = () => {
    setShowConfetti(true);
    openSignupModal('masterclass');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {/* Show confetti effect on successful form submission */}
          {showConfetti && <CanvasConfetti />}
          
          <motion.div
            className="max-w-md w-full bg-gradient-to-br from-gray-900 to-blue-900/80 rounded-xl overflow-hidden shadow-2xl relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors z-10"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <motion.div 
              className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="p-6 md:p-8 relative z-[1]">
              <div className="mb-6 text-center">
                <motion.div
                  className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                >
                  <Gift size={28} className="text-blue-400" />
                </motion.div>
                
                <motion.h2 
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {title}
                </motion.h2>
                
                <motion.p 
                  className="text-white/70 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {subtitle}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button 
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-bold shadow-lg flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFormSubmit}
                >
                  {cta}
                </motion.button>
              </motion.div>
              
              <div className="mt-6 space-y-3">
                <motion.div 
                  className="flex items-center text-white/70 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Star className="text-yellow-400 mr-2" size={16} />
                  <span>Get Smart CRM with AI automation during special 5-day sale</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center text-white/70 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Zap className="text-blue-400 mr-2" size={16} />
                  <span>Reduce data entry by 70% with AI-powered automation</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center text-white/70 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Gift className="text-green-400 mr-2" size={16} />
                  <span>Free masterclass on October 17-19, 2025 included with purchase</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;