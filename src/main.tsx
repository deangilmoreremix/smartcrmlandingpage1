import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';
import { initScrollAnimations, initHoverEffects } from './utils/animation.ts';
import { shouldReduceEffects } from './utils/deviceDetection.ts';
import { HelmetProvider } from 'react-helmet-async';

// Component that initializes animations after mount
const AnimatedApp = () => {
  useEffect(() => {
    // Check if we should reduce effects
    shouldReduceEffects().then(shouldReduce => {
      if (shouldReduce) {
        document.documentElement.classList.add('reduce-animations');
        localStorage.setItem('smartCRM_animationsEnabled', 'false');
      } else {
        // Only initialize animations if we're not reducing effects
        initScrollAnimations();
        initHoverEffects();
      }
    });

    // Listen for network status changes
    const handleOnline = () => {
      console.log('Network connection restored');
      // Notify user
      if (window.dispatchEvent) {
        window.dispatchEvent(
          new CustomEvent('showFeedback', {
            detail: {
              message: 'Network connection restored',
              type: 'success',
              duration: 3000
            }
          })
        );
      }
    };

    const handleOffline = () => {
      console.log('Network connection lost');
      // Notify user
      if (window.dispatchEvent) {
        window.dispatchEvent(
          new CustomEvent('showFeedback', {
            detail: {
              message: 'Network connection lost. Some features may be unavailable.',
              type: 'warning',
              duration: 0 // Stay until connection is restored
            }
          })
        );
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  );
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AnimatedApp />
    </StrictMode>
  </BrowserRouter>
);