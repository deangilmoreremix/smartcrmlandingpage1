import { useEffect } from 'react';
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
    // Defer animation initialization to prevent blocking render
    const initializeAnimations = async () => {
      // Check if we should reduce effects
      const shouldReduce = await shouldReduceEffects();
      if (shouldReduce) {
        document.documentElement.classList.add('reduce-animations');
        localStorage.setItem('smartCRM_animationsEnabled', 'false');
      } else {
        // Only initialize animations if we're not reducing effects
        // Defer to after page is interactive using requestIdleCallback
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            initScrollAnimations();
            initHoverEffects();
          }, { timeout: 2000 });
        } else {
          // Fallback: defer significantly to ensure page is loaded
          setTimeout(() => {
            initScrollAnimations();
            initHoverEffects();
          }, 500);
        }
      }
    };

    // Defer the entire initialization to avoid blocking initial render
    requestAnimationFrame(() => {
      initializeAnimations();
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
    <AnimatedApp />
  </BrowserRouter>
);