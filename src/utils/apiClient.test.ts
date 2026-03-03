import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ApiClient,
  ApiError,
  TimeoutError,
  success,
  failure,
  createError,
} from './apiClient';

vi.mock('./errorLogger', () => ({
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

describe('Result type helpers', () => {
  it('success() wraps data correctly', () => {
    const result = success({ id: 1 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual({ id: 1 });
    }
  });

  it('failure() wraps error correctly', () => {
    const err = createError('TEST_ERROR', 'Something failed', 500);
    const result = failure(err);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('TEST_ERROR');
      expect(result.error.message).toBe('Something failed');
      expect(result.error.status).toBe(500);
    }
  });
});

describe('createError()', () => {
  it('creates an AppError with all fields', () => {
    const err = createError('CODE', 'msg', 404, { detail: true });
    expect(err.code).toBe('CODE');
    expect(err.message).toBe('msg');
    expect(err.status).toBe(404);
    expect(err.details).toEqual({ detail: true });
  });

  it('creates an AppError with optional fields omitted', () => {
    const err = createError('CODE', 'msg');
    expect(err.code).toBe('CODE');
    expect(err.status).toBeUndefined();
    expect(err.details).toBeUndefined();
  });
});

describe('ApiError', () => {
  it('extends Error with status and data', () => {
    const err = new ApiError('Not found', 404, undefined, { id: 'missing' });
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('ApiError');
    expect(err.message).toBe('Not found');
    expect(err.status).toBe(404);
    expect(err.data).toEqual({ id: 'missing' });
  });
});

describe('TimeoutError', () => {
  it('extends Error with default message', () => {
    const err = new TimeoutError();
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('TimeoutError');
    expect(err.message).toBe('Request timeout');
  });

  it('accepts custom message', () => {
    const err = new TimeoutError('Custom timeout');
    expect(err.message).toBe('Custom timeout');
  });
});

describe('ApiClient', () => {
  let client: ApiClient;

  beforeEach(() => {
    client = new ApiClient({
      baseUrl: 'https://api.test.com',
      timeout: 5000,
      maxRetries: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('makes successful GET request', async () => {
    const mockData = { id: 1, name: 'Test' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve(mockData),
    });

    const result = await client.get('/users/1');
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.test.com/users/1',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('makes successful POST request with body', async () => {
    const requestData = { name: 'New User' };
    const responseData = { id: 2, name: 'New User' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve(responseData),
    });

    const result = await client.post('/users', requestData);
    expect(result).toEqual(responseData);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.test.com/users',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(requestData),
      })
    );
  });

  it('handles HTTP errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve({ error: 'Not found' }),
    });

    await expect(client.get('/nonexistent')).rejects.toThrow(ApiError);
  });

  it('handles non-JSON responses as text', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'text/plain' }),
      text: () => Promise.resolve('plain text response'),
    });

    const result = await client.get('/text-endpoint');
    expect(result).toBe('plain text response');
  });

  it('uses absolute URLs as-is', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve({}),
    });

    await client.get('https://other-api.com/data');
    expect(fetch).toHaveBeenCalledWith(
      'https://other-api.com/data',
      expect.anything()
    );
  });

  describe('safeRequest()', () => {
    it('returns success Result on OK response', async () => {
      const mockData = { id: 1 };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(mockData),
      });

      const result = await client.safeGet('/test');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(mockData);
      }
    });

    it('returns failure Result on HTTP error', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Headers(),
        json: () => Promise.resolve({ error: 'server error' }),
      });

      const result = await client.safeGet('/fail');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('API_ERROR');
        expect(result.error.status).toBe(500);
      }
    });

    it('returns failure Result on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

      const result = await client.safeGet('/network-fail');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNKNOWN_ERROR');
      }
    });
  });

  describe('safeJsonParse()', () => {
    it('parses valid JSON', () => {
      const result = ApiClient.safeJsonParse('{"key":"value"}');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual({ key: 'value' });
      }
    });

    it('returns failure for invalid JSON', () => {
      const result = ApiClient.safeJsonParse('not json');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('JSON_PARSE_ERROR');
      }
    });
  });

  describe('retry logic', () => {
    it('retries on retryable status codes', async () => {
      const retryClient = new ApiClient({
        baseUrl: 'https://api.test.com',
        maxRetries: 2,
        retryDelay: 10,
      });

      let callCount = 0;
      global.fetch = vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount < 3) {
          return Promise.resolve({
            ok: false,
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers(),
            json: () => Promise.resolve({}),
          });
        }
        return Promise.resolve({
          ok: true,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: () => Promise.resolve({ success: true }),
        });
      });

      const result = await retryClient.get('/flaky');
      expect(result).toEqual({ success: true });
      expect(callCount).toBe(3);
    });
  });
});
