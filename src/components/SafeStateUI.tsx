/**
 * Safe State UI Components
 * Reusable loading, error, and empty state components
 */

import React from 'react';
import { Loader2, AlertCircle, Inbox, RefreshCw } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export function LoadingState({
  message = 'Loading...',
  size = 'md',
  fullScreen = false,
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerClasses = fullScreen
    ? 'min-h-screen flex items-center justify-center'
    : 'flex items-center justify-center py-12';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <Loader2
          className={`${sizeClasses[size]} animate-spin text-blue-500 mx-auto mb-4`}
        />
        <p className="text-white/60 text-sm">{message}</p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  error?: Error | null;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export function ErrorState({
  error,
  message = 'Something went wrong',
  onRetry,
  fullScreen = false,
}: ErrorStateProps) {
  const containerClasses = fullScreen
    ? 'min-h-screen flex items-center justify-center p-4'
    : 'flex items-center justify-center py-12 px-4';

  const displayMessage = error?.message || message;

  return (
    <div className={containerClasses}>
      <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="text-red-400" size={24} />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Error</h3>
        <p className="text-white/70 text-sm mb-4">{displayMessage}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  fullScreen?: boolean;
}

export function EmptyState({
  icon,
  title = 'No data available',
  message = 'There is no data to display at this time.',
  action,
  fullScreen = false,
}: EmptyStateProps) {
  const containerClasses = fullScreen
    ? 'min-h-screen flex items-center justify-center p-4'
    : 'flex items-center justify-center py-12 px-4';

  return (
    <div className={containerClasses}>
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon || <Inbox className="text-white/40" size={32} />}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/60 text-sm mb-4">{message}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}

interface SafeDataDisplayProps<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  isEmpty: boolean;
  onRetry?: () => void;
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  emptyTitle?: string;
  fullScreen?: boolean;
  children: (data: T) => React.ReactNode;
}

/**
 * Wrapper component that handles all safe states automatically
 */
export function SafeDataDisplay<T>({
  data,
  loading,
  error,
  isEmpty,
  onRetry,
  loadingMessage,
  errorMessage,
  emptyMessage,
  emptyTitle,
  fullScreen = false,
  children,
}: SafeDataDisplayProps<T>) {
  if (loading) {
    return <LoadingState message={loadingMessage} fullScreen={fullScreen} />;
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        message={errorMessage}
        onRetry={onRetry}
        fullScreen={fullScreen}
      />
    );
  }

  if (isEmpty || !data) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        action={onRetry ? { label: 'Retry', onClick: onRetry } : undefined}
        fullScreen={fullScreen}
      />
    );
  }

  return <>{children(data)}</>;
}

/**
 * Inline loading spinner for smaller UI elements
 */
export function InlineLoader({ className = '' }: { className?: string }) {
  return <Loader2 className={`animate-spin ${className}`} size={16} />;
}

/**
 * Skeleton loader for content placeholders
 */
export function SkeletonLoader({
  count = 1,
  height = 'h-4',
  className = '',
}: {
  count?: number;
  height?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${height} bg-white/10 rounded animate-pulse`}
        />
      ))}
    </div>
  );
}
