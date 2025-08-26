import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface CanvasConfettiProps {
  duration?: number; // Duration in ms
  particleCount?: number;
  spread?: number;
  origins?: Array<{ x: number; y: number }>;
  colors?: string[];
  zIndex?: number;
  staggered?: boolean;
}

const CanvasConfetti: React.FC<CanvasConfettiProps> = ({
  duration = 5000,
  particleCount = 250,
  spread = 180,
  origins = [
    { x: 0, y: 0.25 },
    { x: 0.1, y: 0.5 },
    { x: 0.25, y: 0.25 },
    { x: 0.4, y: 0.5 },
    { x: 0.5, y: 0.25 },
    { x: 0.6, y: 0.5 },
    { x: 0.75, y: 0.25 },
    { x: 0.9, y: 0.5 },
    { x: 1, y: 0.25 },
  ],
  colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#6366F1'],
  zIndex = 10000,
  staggered = true
}) => {
  const refAnimationInstance = useRef<confetti.CreateTypes | null>(null);
  
  useEffect(() => {
    // Create confetti instance
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = zIndex.toString();
    
    document.body.appendChild(canvas);
    
    refAnimationInstance.current = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });
    
    // Fire confetti from multiple origins for a full screen effect
    if (refAnimationInstance.current) {
      const fire = (origin: { x: number; y: number }, delay: number = 0) => {
        setTimeout(() => {
          refAnimationInstance.current?.({
            particleCount,
            spread,
            origin,
            colors,
            ticks: 300,
            gravity: 0.8,
            scalar: 1.5,
            drift: 2,
            shapes: ['square', 'circle'],
            disableForReducedMotion: true,
            angle: Math.random() * 360,
          });
        }, delay);
      };
      
      // Launch confetti from multiple origins, staggered if enabled
      origins.forEach((origin, index) => {
        fire(origin, staggered ? index * 150 : 0);
      });
      
      // Add a second wave for more density
      setTimeout(() => {
        origins.forEach((origin, index) => {
          fire({ 
            x: origin.x + 0.08 * Math.random() - 0.04,  
            y: origin.y + 0.08 * Math.random() - 0.04
          }, staggered ? index * 100 : 0);
        });
      }, 300);
      
      // Add a third wave for persistence
      setTimeout(() => {
        origins.slice(0, 4).forEach((origin, index) => {
          fire({ 
            x: Math.random(),  
            y: Math.random() * 0.5
          }, staggered ? index * 50 : 0);
        });
      }, 800);
    }
    
    // Clean up after duration
    const timer = setTimeout(() => {
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      refAnimationInstance.current = null;
    }, duration);
    
    return () => {
      clearTimeout(timer);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      refAnimationInstance.current = null;
    };
  }, [duration, particleCount, spread, origins, colors, zIndex, staggered]);
  
  // This component doesn't render anything visible
  return null;
};

export default CanvasConfetti;