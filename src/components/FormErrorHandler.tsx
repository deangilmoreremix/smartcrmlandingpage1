import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, Network, Server } from 'lucide-react';

interface FormErrorHandlerProps {
  error: Error | string | null;
  retry?: () => void;
  className?: string;
}

const FormErrorHandler: React.FC<FormErrorHandlerProps> = ({
  error,
  retry,
  className = ''
}) => {
  if (!error) return null;
  
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  // Determine error type to provide helpful context
  const isNetworkError = 
    errorMessage.includes('network') || 
    errorMessage.includes('fetch') ||
    errorMessage.includes('connection') ||
    errorMessage.includes('offline');
    
  const isServerError = 
    errorMessage.includes('500') || 
    errorMessage.includes('server') ||
    errorMessage.includes('unavailable');

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`bg-red-500/20 border border-red-500/30 rounded-lg p-4 ${className}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            {isNetworkError ? (
              <Network className="text-red-400" size={20} />
            ) : isServerError ? (
              <Server className="text-red-400" size={20} />
            ) : (
              <AlertOctagon className="text-red-400" size={20} />
            )}
          </div>
          
          <div className="flex-grow">
            <h3 className="text-white font-medium text-sm">
              {isNetworkError ? 'Network Error' : 
               isServerError ? 'Server Error' : 
               'Form Submission Failed'}
            </h3>
            
            <p className="text-white/80 text-xs mt-1">{errorMessage}</p>
            
            {isNetworkError && (
              <p className="text-white/60 text-xs mt-2">
                Please check your internet connection and try again.
              </p>
            )}
            
            {isServerError && (
              <p className="text-white/60 text-xs mt-2">
                Our server is experiencing issues. Please try again in a few moments.
              </p>
            )}
            
            {retry && (
              <motion.button
                className="mt-3 px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white"
                onClick={retry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormErrorHandler;