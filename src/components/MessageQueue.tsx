import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle, Info, X as CloseIcon } from 'lucide-react';
import { Message } from '../hooks/useMessageQueue';

interface MessageQueueProps {
  messages: Message[];
  onRemoveMessage: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
}

const MessageQueue: React.FC<MessageQueueProps> = ({
  messages,
  onRemoveMessage,
  position = 'top-right'
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'success':
        return <Check size={18} className="text-green-400" />;
      case 'error':
        return <X size={18} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-yellow-400" />;
      case 'info':
        return <Info size={18} className="text-blue-400" />;
      default:
        return <Info size={18} className="text-blue-400" />;
    }
  };

  const getMessageStyles = (type: Message['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30';
      case 'error':
        return 'bg-red-500/20 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'info':
        return 'bg-blue-500/20 border-blue-500/30';
      default:
        return 'bg-blue-500/20 border-blue-500/30';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 space-y-2 max-w-sm`}>
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: position.includes('right') ? 300 : position.includes('left') ? -300 : 0, y: position.includes('top') ? -50 : 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: position.includes('right') ? 300 : position.includes('left') ? -300 : 0, y: position.includes('top') ? -50 : 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`p-4 rounded-lg border backdrop-blur-md shadow-lg text-white ${getMessageStyles(message.type)}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {getMessageIcon(message.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {message.title}
                </p>
                {message.description && (
                  <p className="text-sm text-white/80 mt-1">
                    {message.description}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0 ml-3">
                <button
                  onClick={() => onRemoveMessage(message.id)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <CloseIcon size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageQueue;