import { WEBINAR_DATE } from '../constants/dates';

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  url?: string;
}

export const generateICS = (event: CalendarEvent): string => {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeString = (str: string): string => {
    return str.replace(/[,;\\]/g, '\\$&').replace(/\n/g, '\\n');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Smart CRM//Webinar Registration//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(event.startTime)}`,
    `DTEND:${formatDate(event.endTime)}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `UID:${Date.now()}@smartcrm.com`,
    `SUMMARY:${escapeString(event.title)}`,
    `DESCRIPTION:${escapeString(event.description)}`,
    `LOCATION:${escapeString(event.location)}`,
    event.url ? `URL:${event.url}` : '',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Webinar starts in 24 hours',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Webinar starts in 1 hour',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(line => line !== '').join('\r\n');

  return icsContent;
};

export const downloadICSFile = (event: CalendarEvent, fileName: string = 'smart-crm-webinar.ics'): void => {
  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

export const getGoogleCalendarUrl = (event: CalendarEvent): string => {
  const formatGoogleDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${formatGoogleDate(event.startTime)}/${formatGoogleDate(event.endTime)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const getOutlookCalendarUrl = (event: CalendarEvent): string => {
  const formatOutlookDate = (date: Date): string => {
    return date.toISOString();
  };

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: formatOutlookDate(event.startTime),
    enddt: formatOutlookDate(event.endTime),
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

export const getWebinarCalendarEvent = (): CalendarEvent => {
  const startTime = new Date('2025-10-13T15:00:00-05:00');
  const endTime = new Date('2025-10-13T16:30:00-05:00');

  return {
    title: 'Smart CRM: Revolutionize Your Customer Relationships with AI',
    description: `Join us for an exclusive live webinar where you'll discover how Smart CRM can transform your sales process through AI-powered automation.

What you'll learn:
• Live demonstration of AI-powered lead management
• Real-time sales automation in action
• Predictive analytics and forecasting techniques
• Multi-model AI capabilities
• Personalized CRM implementation strategies
• Q&A session with Smart CRM experts

Webinar Link: [Link will be sent 24 hours before the event]

We look forward to seeing you there!`,
    location: 'Online Webinar (Link will be provided)',
    startTime,
    endTime,
    url: 'https://smartcrm.com/webinar'
  };
};

export const trackCalendarDownload = async (email: string, calendarType: string) => {
  try {
    console.log(`Calendar download tracked: ${email} - ${calendarType}`);
  } catch (error) {
    console.error('Failed to track calendar download:', error);
  }
};
