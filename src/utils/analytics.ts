/**
 * Analytics utility functions for tracking user interactions
 * This is a placeholder for a real analytics implementation
 */

interface TrackEventParams {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: any; // Additional custom properties
}

// Track page view - can be connected to Google Analytics, Mixpanel, etc.
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  try {
    // Example with Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag;
      
      gtag('config', 'UA-XXXXX-Y', {
        page_path: pagePath,
        page_title: pageTitle
      });
    }
    
    // Add other analytics providers here
    
    console.log(`[Analytics] Page View: ${pagePath}`);
  } catch (error) {
    console.error('[Analytics Error] Failed to track page view:', error);
  }
};

// Track events (button clicks, form submissions, etc.)
export const trackEvent = ({
  category,
  action,
  label,
  value,
  nonInteraction = false,
  ...customProps
}: TrackEventParams) => {
  try {
    // Example with Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag;
      
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        non_interaction: nonInteraction,
        ...customProps
      });
    }
    
    // Add other analytics providers here
    
    console.log(`[Analytics] Event: ${category} / ${action} / ${label || ''} ${value ? '/ ' + value : ''}`);
  } catch (error) {
    console.error('[Analytics Error] Failed to track event:', error);
  }
};

// Identify user
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  try {
    // Implementation would depend on your analytics provider
    console.log(`[Analytics] Identify user: ${userId}`, traits);
  } catch (error) {
    console.error('[Analytics Error] Failed to identify user:', error);
  }
};

// Track form submission
export const trackFormSubmission = (formName: string, formData: Record<string, any>) => {
  try {
    // Remove sensitive information
    const sanitizedData = { ...formData };
    delete sanitizedData.password;
    delete sanitizedData.creditCard;
    
    trackEvent({
      category: 'Form',
      action: 'Submit',
      label: formName,
      formName, // Custom property
      fields: Object.keys(sanitizedData).join(',') // Log submitted field names
    });
    
    console.log(`[Analytics] Form Submission: ${formName}`);
  } catch (error) {
    console.error('[Analytics Error] Failed to track form submission:', error);
  }
};