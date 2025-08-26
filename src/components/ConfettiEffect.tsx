import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '../hooks/useWindowSize';

interface ConfettiEffectProps {
  duration?: number; // Duration in ms
  particleCount?: number;
  spread?: number;
  gravity?: number;
  recycle?: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  duration = 5000,
  particleCount = 200,
  spread = 70,
  gravity = 0.8,
  recycle = false
}) => {
  const [isActive, setIsActive] = useState(true);
  const { width, height } = useWindowSize();
  
  useEffect(() => {
    // Cleanup after duration
    if (!recycle) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, recycle]);
  
  if (!isActive) return null;
  
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={particleCount}
      recycle={recycle}
      gravity={gravity}
      confettiSource={{
        x: width ? width / 2 : 0,
        y: height ? 0 : 0,
        w: 0,
        h: 0
      }}
      tweenDuration={duration}
      spread={spread}
      colors={[
        '#3B82F6', // blue-500
        '#8B5CF6', // purple-500
        '#EC4899', // pink-500
        '#10B981', // green-500
        '#F59E0B', // amber-500
        '#6366F1', // indigo-500
      ]}
    />
  );
};

export default ConfettiEffect;