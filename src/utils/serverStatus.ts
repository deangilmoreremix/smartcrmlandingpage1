/**
 * Utility functions for checking server status and waking up sleeping servers
 */

export interface ServerStatusResult {
  status: 'online' | 'offline' | 'checking' | 'waking';
  message?: string;
  responseTime?: number;
}

/**
 * Check if a server is online by making a HEAD request
 * @param url The URL to check
 * @param timeout Timeout in milliseconds (default: 10000)
 */
export async function checkServerStatus(
  url: string,
  timeout: number = 10000
): Promise<ServerStatusResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const startTime = Date.now();

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      mode: 'no-cors',
      cache: 'no-store'
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    return {
      status: 'online',
      responseTime,
      message: `Server responded in ${responseTime}ms`
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          status: 'offline',
          message: `Server did not respond within ${timeout}ms`
        };
      }
      return {
        status: 'offline',
        message: error.message
      };
    }
    return {
      status: 'offline',
      message: 'Unknown error occurred'
    };
  }
}

/**
 * Wake up a sleeping server by sending a request
 * @param url The URL to wake up
 * @param maxRetries Maximum number of retry attempts (default: 3)
 * @param retryDelay Delay between retries in milliseconds (default: 3000)
 */
export async function wakeUpServer(
  url: string,
  maxRetries: number = 3,
  retryDelay: number = 3000,
  onProgress?: (progress: number, message: string) => void
): Promise<ServerStatusResult> {
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    const progressPercent = (attempt / maxRetries) * 100;

    onProgress?.(
      progressPercent,
      `Waking up server... (Attempt ${attempt}/${maxRetries})`
    );

    try {
      // Send a GET request to wake up the server
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-store'
      });

      // Wait for the server to fully wake up
      await new Promise(resolve => setTimeout(resolve, retryDelay));

      // Check if the server is now online
      const status = await checkServerStatus(url, 15000);

      if (status.status === 'online') {
        onProgress?.(100, 'Server is now online!');
        return status;
      }
    } catch (error) {
      console.warn(`Wake-up attempt ${attempt} failed:`, error);
    }

    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return {
    status: 'offline',
    message: `Failed to wake up server after ${maxRetries} attempts`
  };
}

/**
 * Open URL in a new tab with server wake-up check
 * @param url The URL to open
 */
export async function openUrlWithWakeUp(url: string): Promise<void> {
  // Try to wake up the server first
  const status = await checkServerStatus(url, 5000);

  if (status.status === 'offline') {
    // Server is offline, try to wake it up
    await wakeUpServer(url, 1, 2000);
  }

  // Open the URL in a new tab
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');

  if (!newWindow) {
    console.error('Failed to open new window. Popup may be blocked.');
  }
}

/**
 * Determine if a URL is likely to need wake-up (e.g., Replit servers)
 * @param url The URL to check
 */
export function needsWakeUp(url: string): boolean {
  const wakeUpDomains = [
    'replit.app',
    'repl.co',
    'replit.dev'
  ];

  return wakeUpDomains.some(domain => url.includes(domain));
}
