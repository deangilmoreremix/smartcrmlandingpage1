import { getSupabaseClient } from './supabaseClient';

interface PopupInteractionData {
  interactionType: 'view' | 'expand' | 'dismiss' | 'click_cta' | 'conversion';
  popupVariant?: string;
  timeOnPage?: number;
  scrollDepth?: number;
  spotsRemaining?: number;
  daysRemaining?: number;
  deviceType?: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  referrerSource?: string;
}

interface PopupConversionData {
  email?: string;
  conversionType: 'purchase' | 'signup' | 'masterclass' | 'early_access';
  timeToConversion?: number;
  popupVariant?: string;
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('popup_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('popup_session_id', sessionId);
  }
  return sessionId;
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'unknown' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width >= 1024) return 'desktop';
  return 'unknown';
}

function getTimeOnPage(): number {
  const navigationStart = performance.timing?.navigationStart || Date.now();
  return Math.floor((Date.now() - navigationStart) / 1000);
}

function getScrollDepth(): number {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  return Math.min(Math.floor(scrollPercentage), 100);
}

export async function trackPopupInteraction(data: PopupInteractionData): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn('Supabase client not available for tracking');
      return;
    }

    const sessionId = getSessionId();
    const deviceType = data.deviceType || getDeviceType();
    const timeOnPage = data.timeOnPage || getTimeOnPage();
    const scrollDepth = data.scrollDepth || getScrollDepth();
    const referrerSource = data.referrerSource || document.referrer || 'direct';

    const { error } = await supabase
      .from('popup_interactions')
      .insert({
        session_id: sessionId,
        interaction_type: data.interactionType,
        popup_variant: data.popupVariant || 'floating_cta',
        time_on_page: timeOnPage,
        scroll_depth: scrollDepth,
        spots_remaining: data.spotsRemaining,
        days_remaining: data.daysRemaining,
        device_type: deviceType,
        referrer_source: referrerSource
      });

    if (error) {
      console.error('Error tracking popup interaction:', error);
    }
  } catch (err) {
    console.error('Failed to track popup interaction:', err);
  }
}

export async function trackPopupConversion(data: PopupConversionData): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn('Supabase client not available for tracking');
      return;
    }

    const sessionId = getSessionId();

    const { error } = await supabase
      .from('popup_conversions')
      .insert({
        session_id: sessionId,
        email: data.email,
        conversion_type: data.conversionType,
        time_to_conversion: data.timeToConversion || 0,
        popup_variant: data.popupVariant || 'floating_cta'
      });

    if (error) {
      console.error('Error tracking popup conversion:', error);
    }
  } catch (err) {
    console.error('Failed to track popup conversion:', err);
  }
}

export async function getPopupAnalytics(startDate?: Date, endDate?: Date) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn('Supabase client not available for analytics');
      return null;
    }

    let query = supabase
      .from('popup_interactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }
    if (endDate) {
      query = query.lte('created_at', endDate.toISOString());
    }

    const { data: interactions, error: interactionsError } = await query;

    if (interactionsError) {
      console.error('Error fetching interactions:', interactionsError);
      return null;
    }

    const { data: conversions, error: conversionsError } = await supabase
      .from('popup_conversions')
      .select('*')
      .order('created_at', { ascending: false });

    if (conversionsError) {
      console.error('Error fetching conversions:', conversionsError);
      return { interactions, conversions: [] };
    }

    return { interactions, conversions };
  } catch (err) {
    console.error('Failed to fetch popup analytics:', err);
    return null;
  }
}

export function calculateConversionRate(views: number, conversions: number): number {
  if (views === 0) return 0;
  return (conversions / views) * 100;
}

export function getPopupSessionStart(): number {
  const sessionStart = sessionStorage.getItem('popup_session_start');
  if (!sessionStart) {
    const now = Date.now();
    sessionStorage.setItem('popup_session_start', now.toString());
    return now;
  }
  return parseInt(sessionStart, 10);
}

export function calculateTimeToConversion(): number {
  const sessionStart = getPopupSessionStart();
  return Math.floor((Date.now() - sessionStart) / 1000);
}
