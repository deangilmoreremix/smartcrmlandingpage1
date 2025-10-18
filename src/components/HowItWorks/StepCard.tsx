import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface StepCardProps {
  step: {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    details: string[];
    color: string;
    animation: any;
  };
  index: number;
  activeStep: number;
  expandedStep: number | null;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const StepCard: React.FC<StepCardProps> = React.memo(({
  step,
  index,
  activeStep,
  expandedStep,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <motion.div
      className={`relative bg-white/5 backdrop-blur-md rounded-xl p-8 border ${
        activeStep >= index ? `border-${step.color}-500/30` : 'border-white/10'
      } text-center h-full`}
      whileHover={{
        y: -10,
        boxShadow: `0 10px 30px -5px rgba(${
          step.color === 'blue' ? '59, 130, 246' :
          step.color === 'purple' ? '139, 92, 246' :
          step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
        }, 0.2)`,
        borderColor: `rgba(${
          step.color === 'blue' ? '59, 130, 246' :
          step.color === 'purple' ? '139, 92, 246' :
          step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
        }, 0.4)`,
      }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Mobile-only step number */}
      <div className="md:hidden mb-4">
        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
          activeStep >= index ? `bg-${step.color}-600` : 'bg-white/10'
        } text-white text-sm font-bold`}>
          {step.number}
        </span>
      </div>

      <div className="mt-4 mb-4 flex justify-center">
        <motion.div
          animate={activeStep === index ? step.animation : {}}
          transition={{ duration: 3, repeat: activeStep === index ? Infinity : 0, repeatDelay: 1 }}
          className={`p-3 rounded-xl ${activeStep === index ? `bg-${step.color}-500/30` : 'bg-white/10'}`}
        >
          {step.icon}
        </motion.div>
      </div>

      <motion.h3
        className="text-xl font-semibold text-white mb-3"
        animate={activeStep === index ? {
          color: [
            "#ffffff",
            step.color === 'blue' ? "#60a5fa" :
            step.color === 'purple' ? "#a78bfa" :
            step.color === 'green' ? "#4ade80" :
            "#fbbf24",
            "#ffffff"
          ]
        } : {}}
        transition={{ duration: 3, repeat: activeStep === index ? Infinity : 0 }}
      >
        {step.title}
      </motion.h3>

      <p className="text-white/70 mb-4">{step.description}</p>

      {expandedStep === index && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-white/10 text-left"
        >
          <ul className="space-y-3">
            {step.details.map((detail, idx) => (
              <motion.li
                key={idx}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
              >
                <motion.div
                  className={`min-w-5 h-5 rounded-full bg-${step.color}-500/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <CheckCircle size={12} className={`text-${step.color}-400`} />
                </motion.div>
                <span className="text-white/80 text-sm">{detail}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className={`w-full h-1 bg-${step.color}-500/30 rounded-full mt-4 overflow-hidden`}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className={`h-full bg-${step.color}-500`}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}

      {expandedStep !== index && (
        <motion.button
          className={`mt-4 text-${step.color}-400 text-sm flex items-center justify-center mx-auto`}
          whileHover={{ x: 3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span>See details</span>
          <motion.div
            animate={{ rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </motion.div>
        </motion.button>
      )}

      {/* Animated border effect when active */}
      {activeStep === index && (
        <>
          <motion.div className="absolute -top-0.5 -bottom-0.5 -left-0.5 w-0.5 rounded-full"
            initial={{ height: 0, backgroundColor: `rgba(${
              step.color === 'blue' ? '59, 130, 246' :
              step.color === 'purple' ? '139, 92, 246' :
              step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
            }, 0.5)` }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <motion.div className="absolute -top-0.5 -right-0.5 w-0.5 rounded-full"
            initial={{ height: 0, backgroundColor: `rgba(${
              step.color === 'blue' ? '59, 130, 246' :
              step.color === 'purple' ? '139, 92, 246' :
              step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
            }, 0.5)` }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div className="absolute -top-0.5 -left-0.5 -right-0.5 h-0.5 rounded-full"
            initial={{ width: 0, backgroundColor: `rgba(${
              step.color === 'blue' ? '59, 130, 246' :
              step.color === 'purple' ? '139, 92, 246' :
              step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
            }, 0.5)` }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.div className="absolute -bottom-0.5 -left-0.5 -right-0.5 h-0.5 rounded-full"
            initial={{ width: 0, backgroundColor: `rgba(${
              step.color === 'blue' ? '59, 130, 246' :
              step.color === 'purple' ? '139, 92, 246' :
              step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
            }, 0.5)` }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </>
      )}
    </motion.div>
  );
});

StepCard.displayName = 'StepCard';

export default StepCard;