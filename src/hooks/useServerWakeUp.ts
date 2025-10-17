import { useState, useCallback } from 'react';
import { checkServerStatus, wakeUpServer, ServerStatusResult } from '../utils/serverStatus';

export interface UseServerWakeUpResult {
  status: 'idle' | 'checking' | 'waking' | 'online' | 'offline';
  progress: number;
  message: string;
  checkStatus: (url: string) => Promise<ServerStatusResult>;
  wakeUp: (url: string) => Promise<ServerStatusResult>;
  reset: () => void;
}

/**
 * React hook for managing server wake-up state and operations
 */
export function useServerWakeUp(): UseServerWakeUpResult {
  const [status, setStatus] = useState<'idle' | 'checking' | 'waking' | 'online' | 'offline'>('idle');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const checkStatus = useCallback(async (url: string): Promise<ServerStatusResult> => {
    setStatus('checking');
    setMessage('Checking server status...');
    setProgress(0);

    const result = await checkServerStatus(url);

    setStatus(result.status as 'online' | 'offline');
    setMessage(result.message || '');

    return result;
  }, []);

  const wakeUp = useCallback(async (url: string): Promise<ServerStatusResult> => {
    setStatus('waking');
    setProgress(0);

    const result = await wakeUpServer(
      url,
      3,
      3000,
      (progressPercent, progressMessage) => {
        setProgress(progressPercent);
        setMessage(progressMessage);
      }
    );

    setStatus(result.status as 'online' | 'offline');
    setMessage(result.message || '');

    if (result.status === 'online') {
      setProgress(100);
    }

    return result;
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setProgress(0);
    setMessage('');
  }, []);

  return {
    status,
    progress,
    message,
    checkStatus,
    wakeUp,
    reset
  };
}
