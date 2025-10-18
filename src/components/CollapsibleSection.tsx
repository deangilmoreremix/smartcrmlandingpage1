import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
  icon?: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  variant = 'primary',
  icon
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const variantStyles = {
    primary: {
      header: 'bg-orange-500/20 border-orange-500/30',
      hover: 'hover:bg-orange-500/30',
      icon: 'text-orange-400'
    },
    secondary: {
      header: 'bg-blue-500/20 border-blue-500/30',
      hover: 'hover:bg-blue-500/30',
      icon: 'text-blue-400'
    },
    success: {
      header: 'bg-green-500/20 border-green-500/30',
      hover: 'hover:bg-green-500/30',
      icon: 'text-green-400'
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className="mb-4">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-4 rounded-lg border backdrop-blur-md transition-all duration-200 ${styles.header} ${styles.hover}`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={styles.icon}
            >
              {icon}
            </motion.div>
          )}
          <h6 className="text-white font-medium text-left">{title}</h6>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-white/70"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 mt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;