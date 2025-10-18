import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Hand, TextCursor as Cursor, ChevronsRight } from 'lucide-react';

interface InteractiveFloatingButtonProps {
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  text?: string;
  delay?: number;
  color?: 'blue' | 'purple' | 'green' | 'amber' | 'red';
  size?: 'small' | 'medium' | 'large';
  icon?: 'click' | 'hand' | 'cursor' | 'chevrons';
  autoHide?: boolean;
  hideAfter?: number; // seconds until auto-hide
}

const InteractiveFloatingButton: React.FC<InteractiveFloatingButtonProps> = ({
  position = 'top-right',
  text = 'Click to interact',
  delay = 0,
  color = 'blue',
  size = 'medium',
  icon = 'click',
  autoHide = true,
  hideAfter = 15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Show button after specified delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    
    // Auto-hide after hideAfter seconds if autoHide is true
    let hideTimer: NodeJS.Timeout;
    if (autoHide) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, (delay + hideAfter) * 1000);
    }
    
    return () => {
      clearTimeout(showTimer);
      if (autoHide) clearTimeout(hideTimer);
    };
  }, [delay, autoHide, hideAfter]);

  // Map color to actual color values
  const colorMap = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
    purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
    green: 'from-green-500 to-green-600 shadow-green-500/25',
    amber: 'from-amber-500 to-amber-600 shadow-amber-500/25',
    red: 'from-red-500 to-red-600 shadow-red-500/25'
  };
  
  // Map size to actual size values
  const sizeMap = {
    small: 'text-xs py-1 px-2',
    medium: 'text-sm py-1.5 px-3',
    large: 'text-base py-2 px-4'
  };
  
  // Map position to actual position values
  const positionMap = {
    'top-right': 'top-2 right-2',
    'bottom-right': 'bottom-2 right-2',
    'top-left': 'top-2 left-2',
    'bottom-left': 'bottom-2 left-2'
  };
  
  // Icon component based on type
  const IconComponent = icon === 'click' ? MousePointerClick : 
                        icon === 'hand' ? Hand :
                        icon === 'chevrons' ? ChevronsRight : 
                        Cursor;

  if (!isVisible) return null;

  return (
    <motion.div
      className={`absolute ${positionMap[position]} z-50`}
      initial={{ opacity: 0, scale: 0.5, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 10 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <motion.div
        className={`bg-gradient-to-r ${colorMap[color]} ${sizeMap[size]} rounded-full flex items-center shadow-lg backdrop-blur-sm border border-white/20`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -5, 0],
          boxShadow: [
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <motion.div
          className="mr-1.5"
          animate={isHovering ? { 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          } : { 
            rotate: [0, 10, -10, 0] 
          }}
          transition={{
            duration: isHovering ? 0.5 : 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <IconComponent size={size === 'small' ? 12 : size === 'medium' ? 16 : 20} />
        </motion.div>
        <span className="font-medium whitespace-nowrap">{text}</span>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveFloatingButton;