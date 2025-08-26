import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

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
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-blue-500/30 rounded-lg blur-xl"
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate="animate"
        >
          <Cpu size={size} className="text-blue-400 relative z-10" />
        </motion.div>
      </div>
      <span className="font-bold text-xl ml-2 text-white">Smart CRM</span>
    </div>
  );
};

export default AnimatedLogo;