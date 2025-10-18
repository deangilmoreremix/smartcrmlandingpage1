import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

export interface AnimatedFloatingIconProps {
  icon: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  animation?: 'bounce' | 'pulse' | 'rotate' | 'orbit' | 'random';
  delay?: number;
  duration?: number;
  zIndex?: number;
  opacity?: number;
  glow?: boolean;
  glowColor?: string;
  onClick?: () => void;
}

const AnimatedFloatingIcon: React.FC<AnimatedFloatingIconProps> = ({
  icon,
  size = 'medium',
  color = 'text-blue-400',
  position = { top: '20%', right: '10%' },
  animation = 'bounce',
  delay = 0,
  duration = 4,
  zIndex = 10,
  opacity = 0.8,
  glow = false,
  glowColor = 'rgba(59, 130, 246, 0.5)',
  onClick
}) => {
  const [randomPosition, setRandomPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // For random animation, generate random positions
    if (animation === 'random') {
      const randomizePosition = () => {
        setRandomPosition({
          x: Math.random() * 20 - 10, // -10 to 10
          y: Math.random() * 20 - 10  // -10 to 10
        });
        
        // Set timeout for next position change
        setTimeout(randomizePosition, duration * 1000 * Math.random());
      };
      
      randomizePosition();
    }
  }, [animation, duration]);
  
  // Size mapping
  const sizeMap = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  // Animation variants based on type
  const getAnimationVariants = () => {
    switch (animation) {
      case 'bounce':
        return {
          animate: {
            y: [0, -15, 0],
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay
            }
          }
        };
        
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.2, 1],
            opacity: [opacity, opacity * 1.2, opacity],
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay
            }
          }
        };
        
      case 'rotate':
        return {
          animate: {
            rotate: [0, 360],
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay
            }
          }
        };
        
      case 'orbit':
        return {
          animate: {
            x: [0, 20, 0, -20, 0],
            y: [0, 20, 0, -20, 0],
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay
            }
          }
        };
        
      case 'random':
        return {
          animate: {
            x: randomPosition.x,
            y: randomPosition.y,
            transition: {
              duration: duration / 2,
              ease: "easeInOut"
            }
          }
        };
        
      default:
        return {
          animate: {
            y: [0, -15, 0],
            transition: {
              duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay
            }
          }
        };
    }
  };

  return (
    <motion.div
      className={`absolute ${sizeMap[size]} pointer-events-auto ${color}`}
      style={{
        ...position,
        zIndex,
        opacity,
        cursor: onClick ? 'pointer' : 'default'
      }}
      {...getAnimationVariants()}
      whileHover={{ scale: 1.2 }}
      onClick={onClick}
    >
      {/* Glow effect if enabled */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-full blur-lg"
          style={{ backgroundColor: glowColor }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: duration * 0.8,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      )}
      
      {/* Actual icon */}
      <div className="relative">
        {icon}
      </div>
    </motion.div>
  );
};

export default AnimatedFloatingIcon;