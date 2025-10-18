export const EMBED_URLS = {
  contacts: 'https://taupe-sprinkles-83c9ee.netlify.app',
  pipeline: 'https://cheery-syrniki-b5b6ca.netlify.app',
  dashboard: 'https://smartcrm-videoremix.replit.app/demo-dashboard',
  calendar: 'https://voluble-vacherin-add80d.netlify.app'
} as const;

export type EmbedType = keyof typeof EMBED_URLS;
