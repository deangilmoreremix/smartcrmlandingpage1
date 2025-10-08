export const SALE_DATES = {
  START: 'October 13, 2025',
  END: 'October 18, 2025',
  RANGE: 'October 13-18, 2025',
  END_TIME: 'October 18, 2025 at 11:59 PM EST',
  DURATION: '5-day',
} as const;

export const MASTERCLASS_DATES = {
  DATES: 'October 14-16, 2025',
  TIME: '3:00 PM EST',
  FULL: 'October 14-16, 2025 at 3:00 PM EST',
  DURATION: '3-day',
  SHORT: 'Oct 14-16, 2025',
  SHORT_WITH_TIME: 'Oct 14-16, 2025 at 3:00 PM EST',
} as const;

export const LAUNCH_DATE = new Date('2025-10-18T23:59:59-05:00');

export const EVENT_DESCRIPTIONS = {
  SALE_FULL: `${SALE_DATES.DURATION} sale (${SALE_DATES.RANGE})`,
  MASTERCLASS_FULL: `${MASTERCLASS_DATES.DURATION} training on ${MASTERCLASS_DATES.FULL}`,
  MASTERCLASS_SHORT: `Free masterclass on ${MASTERCLASS_DATES.SHORT}`,
  SALE_WITH_MASTERCLASS: `Get Smart CRM during our ${SALE_DATES.DURATION} sale (${SALE_DATES.RANGE}) and receive free access to our exclusive ${MASTERCLASS_DATES.DURATION} training on ${MASTERCLASS_DATES.DATES}`,
} as const;
