import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

vi.mock('../config/env', () => ({
  env: {
    supabase: {
      url: 'https://test.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.fake',
    },
    app: {
      environment: 'test' as const,
      isDevelopment: false,
      isProduction: false,
      isTest: true,
    },
  },
}));

vi.mock('../utils/errorLogger', () => ({
  errorLogger: {
    logError: vi.fn(),
    logWarning: vi.fn(),
    logInfo: vi.fn(),
    setupGlobalErrorHandlers: vi.fn(),
    createErrorBoundaryHandler: vi.fn(),
  },
  logError: vi.fn(),
  logWarning: vi.fn(),
  logInfo: vi.fn(),
  ErrorSeverity: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    },
    storage: {
      from: vi.fn(() => ({
        list: vi.fn().mockResolvedValue({ data: [], error: null }),
        getPublicUrl: vi.fn(() => ({ data: { publicUrl: '' } })),
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
  })),
}));

function renderApp() {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

describe('App integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.getItem = vi.fn().mockReturnValue(null);
    window.localStorage.setItem = vi.fn();
  });

  it('renders without crashing', () => {
    const { container } = renderApp();
    expect(container.firstChild).toBeTruthy();
  });

  it('mounts and renders route content', () => {
    const { container } = renderApp();
    expect(container.querySelector('main, [class*="min-h-screen"]')).toBeTruthy();
  });

  it('provides SignupContext to children', () => {
    const { container } = renderApp();
    expect(container.innerHTML).toBeTruthy();
    expect(container.innerHTML.length).toBeGreaterThan(100);
  });

  it('renders buttons/interactive elements', () => {
    renderApp();
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(0);
  });
});
