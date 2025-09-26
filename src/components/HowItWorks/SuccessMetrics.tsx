import React from 'react';
import { motion } from 'framer-motion';

interface SuccessMetricsProps {
  metrics: Array<{
    value: string;
    label: string;
    icon: React.ReactNode;
  }>;
}

const SuccessMetrics: React.FC<SuccessMetricsProps> = React.memo(({ metrics }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          className="bg-white/5 backdrop-blur-md rounded-lg p-4 text-center"
          whileHover={{
            y: -5,
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
        >
          <motion.div
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ duration: 4, delay: idx, repeat: Infinity }}
          >
            {metric.icon}
          </motion.div>

          <motion.div
            className="text-2xl font-bold text-white mb-1"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, delay: idx * 0.2, repeat: Infinity, repeatDelay: 5 }}
          >
            {metric.value}
          </motion.div>
          <p className="text-white/60 text-xs">{metric.label}</p>
        </motion.div>
      ))}
    </div>
  );
});

SuccessMetrics.displayName = 'SuccessMetrics';

export default SuccessMetrics;