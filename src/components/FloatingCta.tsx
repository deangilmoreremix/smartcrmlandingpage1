import React, { useEffect, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SignupContext } from '../App';

const FloatingCta: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { openSignupModal } = useContext(SignupContext);
  
  useEffect(() => {
    // Show CTA after scrolling down 75% of the viewport height
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.75 && !isDismissed) {
        setIsVisible(true);
      }
    };
    
    // Set timeout to show CTA after just 5 seconds (reduced from 15s for testing)
    const timeout = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 5000);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [isDismissed]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };
  
  const handleCtaClick = () => {
    openSignupModal('early-access');
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl p-5 max-w-xs">
            <button 
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-white/70 hover:text-white"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>
            
            <h3 className="text-lg font-bold mb-2">Smart CRM Special Sale - 6 Days Only</h3>
            <p className="text-white/80 text-sm mb-4">
              Get Smart CRM at special pricing through October 18th. Includes free masterclass on October 14-16, 2025 at 3:00 PM EST plus AI-powered automation features.
            </p>
            <motion.button
              className="w-full py-2 px-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCtaClick}
            >
              Get Smart CRM Now
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCta;