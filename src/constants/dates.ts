export const WEBINAR_DATE = {
  DATE: 'November 15, 2025',
  TIME: '3:00 PM EST',
  FULL: 'November 15, 2025 at 3:00 PM EST',
  SHORT: 'Nov 15, 2025',
  SHORT_WITH_TIME: 'Nov 15, 2025 at 3:00 PM EST',
  DAY_OF_WEEK: 'Friday',
} as const;

export const SALE_END_DATE = new Date('2025-11-19T23:59:59-05:00');
export const LAUNCH_DATE = new Date('2025-11-15T15:00:00-05:00');

export const EVENT_DESCRIPTIONS = {
  WEBINAR_FULL: `Live webinar on ${WEBINAR_DATE.FULL}`,
  WEBINAR_SHORT: `Free webinar on ${WEBINAR_DATE.SHORT}`,
  WEBINAR_TITLE: 'Smart CRM: Revolutionize Your Customer Relationships with AI',
  WEBINAR_DESCRIPTION: 'Join us for an exclusive live demonstration of Smart CRM and learn how AI-powered automation can transform your sales process, boost productivity, and close more deals.',
} as const;
