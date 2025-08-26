/**
 * Device and browser capability detection utilities
 */

// Check if WebP is supported
export const checkWebpSupport = async (): Promise<boolean> => {
  if (!window.createImageBitmap) return false;

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  return createImageBitmap(blob)
    .then(() => true)
    .catch(() => false);
};

// Check if device is low powered
export const isLowPoweredDevice = (): boolean => {
  // This is a simple heuristic that can be improved
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const memory = (navigator as any).deviceMemory || 4; // Default to medium if not available
  const cores = navigator.hardwareConcurrency || 4; // Default to medium if not available
  
  // Consider low-powered if:
  // - Mobile device (touch points > 0)
  // - AND has low memory (≤ 2GB) OR few CPU cores (≤ 4)
  // This is a rough estimate and should be refined with real-world testing
  return (maxTouchPoints > 0) && (memory <= 2 || cores <= 2);
};

// Check if device is high-end
export const isHighEndDevice = (): boolean => {
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  
  return memory >= 8 && cores >= 8;
};

// Check if device supports WebGL (for 3D effects)
export const supportsWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

// Check if device has limited battery
export const hasLimitedBattery = async (): Promise<boolean> => {
  if ('getBattery' in navigator) {
    try {
      const battery: any = await (navigator as any).getBattery();
      
      // Consider battery limited if:
      // - Not charging AND below 25% capacity
      return !battery.charging && battery.level < 0.25;
    } catch (e) {
      return false; // If we can't access battery API, assume it's fine
    }
  }
  
  return false;
};

// Check if user has enabled data-saving mode
export const isDataSavingEnabled = (): boolean => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection && 'saveData' in connection) {
      return connection.saveData;
    }
  }
  
  return false;
};

// Check if device is on a slow connection
export const isSlowConnection = (): boolean => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection) {
      // Check connection type (2g is definitely slow)
      if (connection.type === 'cellular' && connection.effectiveType === '2g') {
        return true;
      }
      
      // Or check downlink speed (below 1 Mbps is considered slow)
      if (connection.downlink < 1) {
        return true;
      }
    }
  }
  
  return false;
};

// Combine all checks to determine if we should reduce animations and effects
export const shouldReduceEffects = async (): Promise<boolean> => {
  // Always respect user's explicit preference first
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return true;
  
  // Check local storage for user preference
  const userPreference = localStorage.getItem('smartCRM_animationsEnabled');
  if (userPreference === 'false') return true;
  
  // Then check device capabilities
  const isLowPower = isLowPoweredDevice();
  const limitedBattery = await hasLimitedBattery();
  const slowConnection = isSlowConnection();
  const dataSaving = isDataSavingEnabled();
  
  // If any of these are true, consider reducing effects
  return isLowPower || limitedBattery || slowConnection || dataSaving;
};