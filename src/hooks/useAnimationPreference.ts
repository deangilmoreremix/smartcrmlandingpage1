import { useState, useEffect } from 'react';

export const useAnimationPreference = () => {
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(() => {
    // Get initial value from localStorage if available
    const savedPreference = localStorage.getItem('smartCRM_animationsEnabled');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    // Otherwise, check for system preference
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Listen for changes to the animation preference
  useEffect(() => {
    const handlePreferenceChange = (e: CustomEvent) => {
      setAnimationsEnabled(e.detail.animationsEnabled);
    };

    window.addEventListener(
      'animationPreferenceChanged', 
      handlePreferenceChange as EventListener
    );

    return () => {
      window.removeEventListener(
        'animationPreferenceChanged', 
        handlePreferenceChange as EventListener
      );
    };
  }, []);

  // Listen for changes to system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      // Only update if there's no saved preference
      if (localStorage.getItem('smartCRM_animationsEnabled') === null) {
        setAnimationsEnabled(!e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return { animationsEnabled };
};