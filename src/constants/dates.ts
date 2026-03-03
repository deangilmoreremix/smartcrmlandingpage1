export const WEBINAR_DATE = {
  DATE: 'March 10, 2026',
  TIME: '3:00 PM EST',
  FULL: 'March 10, 2026 at 3:00 PM EST',
  SHORT: 'Mar 10, 2026',
  SHORT_WITH_TIME: 'Mar 10, 2026 at 3:00 PM EST',
  DAY_OF_WEEK: 'Tuesday',
} as const;

export const SALE_END_DATE = new Date('2026-03-09T23:59:59-05:00');
export const LAUNCH_DATE = new Date('2026-03-10T15:00:00-05:00');

export const EVENT_DESCRIPTIONS = {
  WEBINAR_FULL: `Live webinar on ${WEBINAR_DATE.FULL}`,
  WEBINAR_SHORT: `Free webinar on ${WEBINAR_DATE.SHORT}`,
  WEBINAR_TITLE: 'Smart CRM: Revolutionize Your Customer Relationships with AI',
  WEBINAR_DESCRIPTION: 'Join us for an exclusive live demonstration of Smart CRM and learn how AI-powered automation can transform your sales process, boost productivity, and close more deals.',
} as const;
