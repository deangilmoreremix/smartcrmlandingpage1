import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
  timestamp: number;
  autoHide?: boolean;
  duration?: number;
}

export const useMessageQueue = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((
    type: Message['type'],
    title: string,
    description?: string,
    autoHide: boolean = true,
    duration: number = 5000
  ) => {
    const message: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      description,
      timestamp: Date.now(),
      autoHide,
      duration
    };

    setMessages(prev => [...prev, message]);

    // Auto-remove message after duration if autoHide is true
    if (autoHide) {
      setTimeout(() => {
        removeMessage(message.id);
      }, duration);
    }

    return message.id;
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const addSuccess = useCallback((title: string, description?: string) => {
    return addMessage('success', title, description);
  }, [addMessage]);

  const addError = useCallback((title: string, description?: string) => {
    return addMessage('error', title, description, false); // Don't auto-hide errors
  }, [addMessage]);

  const addInfo = useCallback((title: string, description?: string) => {
    return addMessage('info', title, description);
  }, [addMessage]);

  const addWarning = useCallback((title: string, description?: string) => {
    return addMessage('warning', title, description);
  }, [addMessage]);

  return {
    messages,
    addMessage,
    removeMessage,
    clearMessages,
    addSuccess,
    addError,
    addInfo,
    addWarning
  };
};