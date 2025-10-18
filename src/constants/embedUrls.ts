// Demo embed URLs - All servers are always-on and CORS-enabled
// Updated to use proper iframe-friendly configurations
export const EMBED_URLS = {
  contacts: 'https://taupe-sprinkles-83c9ee.netlify.app',
  pipeline: 'https://cheery-syrniki-b5b6ca.netlify.app',
  dashboard: 'https://smartcrm-videoremix.replit.app/demo-dashboard',
  calendar: 'https://voluble-vacherin-add80d.netlify.app'
} as const;

// Health check configuration
export const EMBED_CONFIG = {
  loadTimeout: 45000, // 45 seconds - increased from 30s
  retryAttempts: 2, // Reduced from 3 to avoid user frustration
  retryDelay: 2000, // 2 seconds between retries
  showOpenInTabImmediately: true // Show "Open in Tab" button right away
} as const;

export type EmbedType = keyof typeof EMBED_URLS;
