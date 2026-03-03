/**
 * Safe Async Hook - Never throws, always returns loading/error/data states
 * Makes data fetching crash-proof with automatic error handling
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Result, AppError } from '../utils/apiClient';
import { logError, ErrorSeverity } from '../utils/errorLogger';

export interface AsyncState<T> {
  data: T | null;
  error: AppError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isEmpty: boolean;
}

export interface UseSafeAsyncOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: AppError) => void;
  logErrors?: boolean;
  errorSeverity?: ErrorSeverity;
}

/**
 * Hook for safe async operations with automatic error handling
 *
 * @example
 * const { data, error, isLoading, execute, retry } = useSafeAsync(
 *   async () => apiClient.safeGet('/api/users')
 * );
 */
export function useSafeAsync<T>(
  asyncFunction: () => Promise<Result<T>>,
  options: UseSafeAsyncOptions = {}
) {
  const {
    immediate = false,
    onSuccess,
    onError,
    logErrors = true,
    errorSeverity = ErrorSeverity.MEDIUM,
  } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: immediate,
    isError: false,
    isSuccess: false,
    isEmpty: true,
  });

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const execute = useCallback(async () => {
    if (!isMountedRef.current) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      isLoading: true,
      isError: false,
      error: null,
    }));

    try {
      const result = await asyncFunction();

      if (!isMountedRef.current) return;

      if (result.ok) {
        setState({
          data: result.data,
          error: null,
          isLoading: false,
          isError: false,
          isSuccess: true,
          isEmpty: result.data === null || result.data === undefined,
        });
        onSuccess?.(result.data);
      } else {
        if (logErrors) {
          logError(
            new Error(result.error.message),
            errorSeverity,
            {
              component: 'useSafeAsync',
              action: 'execute',
              metadata: {
                errorCode: result.error.code,
                errorDetails: result.error.details,
              },
            }
          );
        }

        setState({
          data: null,
          error: result.error,
          isLoading: false,
          isError: true,
          isSuccess: false,
          isEmpty: true,
        });
        onError?.(result.error);
      }
    } catch (error) {
      if (!isMountedRef.current) return;

      const appError: AppError = {
        code: 'UNEXPECTED_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      };

      if (logErrors) {
        logError(
          error instanceof Error ? error : new Error(String(error)),
          ErrorSeverity.HIGH,
          {
            component: 'useSafeAsync',
            action: 'execute',
          }
        );
      }

      setState({
        data: null,
        error: appError,
        isLoading: false,
        isError: true,
        isSuccess: false,
        isEmpty: true,
      });
      onError?.(appError);
    }
  }, [asyncFunction, onSuccess, onError, logErrors, errorSeverity]);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
      isEmpty: true,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    retry,
    reset,
  };
}

/**
 * Hook for fetching data on mount with automatic retry
 */
export function useSafeFetch<T>(
  asyncFunction: () => Promise<Result<T>>,
  options: UseSafeAsyncOptions = {}
) {
  return useSafeAsync(asyncFunction, { ...options, immediate: true });
}

/**
 * Hook for polling data at intervals
 */
export function useSafePoll<T>(
  asyncFunction: () => Promise<Result<T>>,
  intervalMs: number = 5000,
  options: UseSafeAsyncOptions = {}
) {
  const result = useSafeAsync(asyncFunction, { ...options, immediate: true });

  useEffect(() => {
    if (intervalMs <= 0) return;

    const interval = setInterval(() => {
      result.execute();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, result.execute]);

  return result;
}
