export const shouldReduceEffects = async (): Promise<boolean> => {
  const userPreference = localStorage.getItem('smartCRM_animationsEnabled');
  if (userPreference !== null) {
    return userPreference === 'false';
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return true;
  }

  const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  if (isLowEndDevice) {
    return true;
  }

  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      return true;
    }
  }

  return false;
};
