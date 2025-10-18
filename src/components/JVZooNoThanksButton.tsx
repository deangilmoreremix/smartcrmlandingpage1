import React from 'react';

interface JVZooNoThanksButtonProps {
  className?: string;
  text?: string;
}

const JVZooNoThanksButton: React.FC<JVZooNoThanksButtonProps> = ({
  className = '',
  text = "No Thanks, I'll Pass on SmartCRM"
}) => {
  return (
    <a
      href="https://www.jvzoo.com/nothanks/426193"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block px-6 py-3 text-gray-400 bg-gray-100 border border-gray-300 rounded-lg text-sm hover:bg-gray-200 hover:text-gray-500 transition-colors mt-4 ${className}`}
      style={{ textDecoration: 'none' }}
    >
      {text}
    </a>
  );
};

export default JVZooNoThanksButton;
