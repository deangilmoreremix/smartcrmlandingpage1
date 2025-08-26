import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ZapOff } from 'lucide-react';

interface AnimationToggleProps {
  className?: string;
}

const AnimationToggle: React.FC<AnimationToggleProps> = ({ className = '' }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Check user's prefers-reduced-motion setting and localStorage on component mount
  useEffect(() => {
    // Check for saved preference
    const savedPreference = localStorage.getItem('smartCRM_animationsEnabled');
    if (savedPreference !== null) {
      setAnimationsEnabled(savedPreference === 'true');
    } else {
      // Check system preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setAnimationsEnabled(false);
      }
    }
    
    // Update global CSS class for animation control
    document.documentElement.classList.toggle('reduce-animations', !animationsEnabled);
  }, []);
  
  // Update when setting changes
  useEffect(() => {
    localStorage.setItem('smartCRM_animationsEnabled', animationsEnabled.toString());
    document.documentElement.classList.toggle('reduce-animations', !animationsEnabled);
    
    // Broadcast event for other components to react to
    window.dispatchEvent(new CustomEvent('animationPreferenceChanged', { 
      detail: { animationsEnabled } 
    }));
  }, [animationsEnabled]);

  return (
    <motion.button
      className={`fixed bottom-4 left-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg ${className}`}
      onClick={() => setAnimationsEnabled(!animationsEnabled)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={animationsEnabled ? "Disable animations" : "Enable animations"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      {animationsEnabled ? (
        <Sparkles className="text-blue-400" size={20} />
      ) : (
        <ZapOff className="text-white/70" size={20} />
      )}
      <span className="sr-only">{animationsEnabled ? "Disable animations" : "Enable animations"}</span>
    </motion.button>
  );
};

export default AnimationToggle;