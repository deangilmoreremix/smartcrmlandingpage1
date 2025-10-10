import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 40, 
  className = '' 
}) => {
  const iconVariants = {
    hidden: { rotate: 0, scale: 1 },
    animate: {
      rotate: [0, 5, -5, 0],
      scale: [1, 1.15, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        {/* Outer glow pulse */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-blue-500/40 rounded-lg blur-xl"
          initial={{ scale: 0.8 }}
          animate={{
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-400/50 rounded-lg blur-md"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Icon */}
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate="animate"
          className="relative z-10"
        >
          <Brain size={size} className="text-blue-400" style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' }} />
        </motion.div>
      </div>
      <div className="ml-3 flex flex-col">
        <span className="font-bold text-xl text-white">Smart CRM</span>
        <motion.span
          className="text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Powered by GPT-5
        </motion.span>
      </div>
    </div>
  );
};

export default AnimatedLogo;