/**
 * Safe Async Data Fetching Hook
 * Provides loading, error, retry, and empty states for async operations
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { logError, ErrorSeverity } from '../utils/errorLogger';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  isEmpty: boolean;
  retry: () => void;
  refetch: () => Promise<void>;
}

export interface UseSafeAsyncOptions<T> {
  initialData?: T;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
  retry?: number;
  retryDelay?: number;
  enabled?: boolean;
  checkEmpty?: (data: T) => boolean;
}

/**
 * Hook for safe async data fetching with automatic error handling
 */
export function useSafeAsync<T>(
  asyncFn: () => Promise<T>,
  deps: React.DependencyList = [],
  options: UseSafeAsyncOptions<T> = {}
): AsyncState<T> {
  const {
    initialData = null,
    onError,
    onSuccess,
    retry: maxRetries = 0,
    retryDelay = 1000,
    enabled = true,
    checkEmpty,
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async () => {
    if (!enabled) {
      return;
    }

    // Cancel previous request if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();

      if (isMountedRef.current) {
        setData(result);
        setError(null);
        setRetryCount(0);

        if (onSuccess) {
          onSuccess(result);
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));

      // Don't update state if component unmounted or request aborted
      if (!isMountedRef.current || error.name === 'AbortError') {
        return;
      }

      // Log error
      logError(error, ErrorSeverity.MEDIUM, {
        action: 'useSafeAsync',
        metadata: { retryCount, maxRetries },
      });

      // Retry logic
      if (retryCount < maxRetries) {
        setTimeout(() => {
          if (isMountedRef.current) {
            setRetryCount(prev => prev + 1);
          }
        }, retryDelay * Math.pow(2, retryCount));
      } else {
        setError(error);
        if (onError) {
          onError(error);
        }
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [asyncFn, enabled, onError, onSuccess, retryCount, maxRetries, retryDelay]);

  // Execute on mount and when dependencies change
  useEffect(() => {
    execute();

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [...deps, execute]);

  // Manual retry function
  const retry = useCallback(() => {
    setRetryCount(0);
    setError(null);
    execute();
  }, [execute]);

  // Refetch function (alias for retry with promise return)
  const refetch = useCallback(async () => {
    setRetryCount(0);
    setError(null);
    await execute();
  }, [execute]);

  // Check if data is empty
  const isEmpty = data === null ||
    (Array.isArray(data) && data.length === 0) ||
    (checkEmpty && data && checkEmpty(data));

  return {
    data,
    loading,
    error,
    isEmpty,
    retry,
    refetch,
  };
}

/**
 * Hook for safe async operations (mutations)
 */
export function useSafeMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseSafeAsyncOptions<TData> = {}
) {
  const { onError, onSuccess } = options;

  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);
        setData(result);

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));

        logError(error, ErrorSeverity.MEDIUM, {
          action: 'useSafeMutation',
        });

        setError(error);

        if (onError) {
          onError(error);
        }

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn, onError, onSuccess]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    mutate,
    data,
    loading,
    error,
    reset,
  };
}
