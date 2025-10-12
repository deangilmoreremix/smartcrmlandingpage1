import React from 'react';

interface JVZooBuyButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const JVZooBuyButton: React.FC<JVZooBuyButtonProps> = ({ children, className = '', onClick }) => {
  return (
    <a
      href="https://www.jvzoo.com/b/114709/426193/99"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ textDecoration: 'none' }}
      onClick={onClick}
    >
      <img
        src="https://i.jvzoo.com/114709/426193/99"
        alt="SmartCRM Main"
        width="1"
        height="1"
        style={{ display: 'none' }}
      />
      {children}
    </a>
  );
};

export default JVZooBuyButton;
