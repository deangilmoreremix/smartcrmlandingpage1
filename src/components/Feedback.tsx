import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, X, Info } from 'lucide-react';

type FeedbackType = 'success' | 'error' | 'info' | 'warning';

interface FeedbackProps {
  message: string;
  type?: FeedbackType;
  duration?: number; // in milliseconds
  onClose?: () => void;
}

// For controlling feedback from anywhere in the app
type FeedbackOptions = {
  message: string;
  type?: FeedbackType;
  duration?: number;
};

export const showFeedback = (options: FeedbackOptions) => {
  const event = new CustomEvent('showFeedback', {
    detail: options
  });
  window.dispatchEvent(event);
};

const Feedback: React.FC<FeedbackProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (duration > 0) {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, duration);
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };
  
  // Map type to icon and styles
  const getTypeStyles = () => {
    switch(type) {
      case 'success':
        return {
          icon: <Check size={18} />,
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          text: 'text-green-400'
        };
      case 'error':
        return {
          icon: <AlertCircle size={18} />,
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          text: 'text-red-400'
        };
      case 'warning':
        return {
          icon: <AlertCircle size={18} />,
          bg: 'bg-amber-500/20',
          border: 'border-amber-500/30',
          text: 'text-amber-400'
        };
      case 'info':
      default:
        return {
          icon: <Info size={18} />,
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/30',
          text: 'text-blue-400'
        };
    }
  };
  
  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md w-full mx-auto ${styles.bg} backdrop-blur-md ${styles.border} border rounded-lg shadow-lg z-50 px-4 py-3`}
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="flex items-start">
            <div className={`mt-0.5 mr-3 flex-shrink-0 ${styles.text}`}>
              {styles.icon}
            </div>
            
            <div className="flex-grow mr-2">
              <p className="text-white">{message}</p>
            </div>
            
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-white/20"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              style={{ borderBottomLeftRadius: '0.5rem' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Feedback container component that listens for events
export const FeedbackContainer: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Array<FeedbackProps & { id: number }>>([]);
  let nextId = 0;
  
  useEffect(() => {
    const handleShowFeedback = (event: CustomEvent<FeedbackOptions>) => {
      const id = nextId++;
      setFeedbacks(prev => [...prev, { id, ...event.detail }]);
    };
    
    window.addEventListener('showFeedback', handleShowFeedback as EventListener);
    
    return () => {
      window.removeEventListener('showFeedback', handleShowFeedback as EventListener);
    };
  }, []);
  
  const handleClose = (id: number) => {
    setFeedbacks(prev => prev.filter(feedback => feedback.id !== id));
  };

  return (
    <>
      {feedbacks.map(({ id, message, type, duration }) => (
        <Feedback
          key={id}
          message={message}
          type={type}
          duration={duration}
          onClose={() => handleClose(id)}
        />
      ))}
    </>
  );
};

export default Feedback;