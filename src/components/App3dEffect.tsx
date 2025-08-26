import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface App3dEffectProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

const App3dEffect: React.FC<App3dEffectProps> = ({ 
  children, 
  depth = 20, 
  className = ''
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateYValue = ((x - centerX) / centerX) * depth;
    const rotateXValue = ((centerY - y) / centerY) * depth;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative perspective ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default App3dEffect;