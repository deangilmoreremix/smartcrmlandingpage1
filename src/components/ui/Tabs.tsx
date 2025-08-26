import React, { createContext, useContext, useState } from 'react';

// Create context
type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

// Hook for child components to get the context
export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

// Main Tabs component
interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  children,
  className = '',
}) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

// TabsList component
interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {children}
    </div>
  );
};

// TabsTrigger component
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className = '',
}) => {
  const { value: selectedValue, onValueChange } = useTabsContext();
  
  return (
    <button
      className={className}
      onClick={() => onValueChange(value)}
      aria-selected={selectedValue === value}
      role="tab"
    >
      {children}
    </button>
  );
};

// TabsContent component
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className = '',
}) => {
  const { value: selectedValue } = useTabsContext();
  
  if (selectedValue !== value) return null;
  
  return (
    <div
      className={className}
      role="tabpanel"
    >
      {children}
    </div>
  );
};