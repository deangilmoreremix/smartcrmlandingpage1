import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'stagger';
  once?: boolean;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  animation = 'fadeIn',
  once = true,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay } 
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration, 
          delay,
          ease: [0.25, 0.1, 0.25, 1.0] 
        } 
      }
    },
    slideIn: {
      hidden: { opacity: 0, x: -50 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration, 
          delay,
          ease: [0.25, 0.1, 0.25, 1.0] 
        } 
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration, 
          delay,
          ease: [0.25, 0.1, 0.25, 1.0] 
        } 
      }
    },
    stagger: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration, 
          delay,
          staggerChildren: 0.1,
          ease: [0.25, 0.1, 0.25, 1.0] 
        } 
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={animations[animation]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;