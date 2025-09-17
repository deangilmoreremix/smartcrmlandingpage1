import React, { useRef, useState, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SignupContext } from '../App';

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgImage?: string;
  overlayColor?: string;
  speed?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  bgImage = "https://images.pexels.com/photos/7709020/pexels-photo-7709020.jpeg?auto=compress&cs=tinysrgb&w=1600",
  overlayColor = "rgba(0, 0, 0, 0.7)",
  speed = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { openSignupModal } = useContext(SignupContext);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div 
      ref={containerRef} 
      className="relative overflow-hidden py-24 md:py-32"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-200"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          y,
          opacity,
          transform: isHovering ? `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)` : "none"
        }}
      />
      
      <motion.div 
        className="absolute inset-0 z-10" 
        style={{ 
          backgroundColor: overlayColor,
          backdropFilter: "blur(1px)"
        }}
        whileHover={{ backdropFilter: "blur(2px)" }}
      />
      
      <motion.div 
        className="relative z-20 w-full h-full"
        style={{ 
          transform: isHovering ? `perspective(1000px) translateZ(50px)` : "none",
          transition: "transform 0.2s ease-out"
        }}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && 
              child.type === 'div' &&
              child.props.children && 
              React.isValidElement(child.props.children[2]) && 
              (child.props.children[2].props.children === "Start Your Transformation" ||
               child.props.children[2].props.children === "Schedule a Demo")) {
            
            // Create a clone of the child with modified button behavior
            return React.cloneElement(child as React.ReactElement, {}, 
              child.props.children[0], // title
              child.props.children[1], // description
              React.cloneElement(child.props.children[2] as React.ReactElement, {
                onClick: () => openSignupModal('early-access'),
                children: "Join September 21-23 Masterclass"
              })
            );
          }
          return child;
        })}
      </motion.div>
      
      {/* Interactive elements */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <motion.div 
          className="absolute w-40 h-40 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)",
            left: `calc(${(mousePosition.x + 0.5) * 100}% - 80px)`, 
            top: `calc(${(mousePosition.y + 0.5) * 100}% - 80px)`,
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.3s ease-out"
          }}
        />
      </div>
    </motion.div>
  );
};

export default ParallaxSection;