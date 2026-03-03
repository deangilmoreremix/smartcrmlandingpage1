import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { errorLogger, ErrorSeverity } from '../utils/errorLogger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: unknown[];
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  private resetTimeout: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error boundary when resetKeys change
    if (this.state.hasError && this.props.resetKeys) {
      const hasKeysChanged = this.props.resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );
      if (hasKeysChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error using centralized logger
    errorLogger.logError(
      error,
      ErrorSeverity.HIGH,
      {
        component: this.props.componentName || 'ErrorBoundary',
        action: 'componentRender',
        metadata: {
          componentStack: errorInfo.componentStack,
          errorCount: this.state.errorCount + 1,
        },
      }
    );

    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Auto-retry after 5 seconds if first error
    if (this.state.errorCount === 0) {
      this.resetTimeout = window.setTimeout(() => {
        this.resetErrorBoundary();
      }, 5000);
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
      this.resetTimeout = null;
    }
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  handleRetry = () => {
    this.resetErrorBoundary();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-xl border border-red-500/30 p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
              <p className="text-white/70 text-sm mb-2">
                We encountered an unexpected error. Our team has been notified and is working to fix this issue.
              </p>
              {this.state.errorCount === 1 && (
                <p className="text-blue-400 text-xs">
                  Attempting automatic recovery in 5 seconds...
                </p>
              )}
              {this.state.errorCount > 1 && (
                <p className="text-yellow-400 text-xs">
                  Error persists. Please try refreshing the page.
                </p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                aria-label="Try again"
              >
                <RefreshCw size={18} className="mr-2" />
                Try Again
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                aria-label="Go to homepage"
              >
                <Home size={18} className="mr-2" />
                Go Home
              </button>
            </div>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-white/60 text-sm cursor-pointer hover:text-white/80">
                  Error Details (Development Only)
                </summary>
                <div className="mt-3 p-3 bg-black/30 rounded text-xs text-red-300 font-mono overflow-auto max-h-32">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap mt-1">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;