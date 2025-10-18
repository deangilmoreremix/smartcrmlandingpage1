import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertCircle } from 'lucide-react';

interface RegistrationProgressProps {
  spotsTotal: number;
  spotsRemaining: number;
  variant?: 'full' | 'compact';
}

const RegistrationProgress: React.FC<RegistrationProgressProps> = ({
  spotsTotal,
  spotsRemaining,
  variant = 'full'
}) => {
  const spotsFilled = spotsTotal - spotsRemaining;
  const percentageFilled = (spotsFilled / spotsTotal) * 100;
  const isAlmostFull = percentageFilled >= 75;
  const isCritical = percentageFilled >= 90;

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Users size={16} className={isCritical ? 'text-red-400' : isAlmostFull ? 'text-orange-400' : 'text-blue-400'} />
          <span className="text-white/80">
            <span className="font-bold text-white">{spotsRemaining}</span> spots left
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isCritical && <AlertCircle size={14} className="text-red-400" />}
          <span className={`text-xs font-medium ${isCritical ? 'text-red-400' : isAlmostFull ? 'text-orange-400' : 'text-green-400'}`}>
            {Math.round(percentageFilled)}% full
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`rounded-lg border p-4 ${
        isCritical
          ? 'bg-red-600/10 border-red-500/30'
          : isAlmostFull
          ? 'bg-orange-600/10 border-orange-500/30'
          : 'bg-blue-600/10 border-blue-500/30'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users size={20} className={isCritical ? 'text-red-400' : isAlmostFull ? 'text-orange-400' : 'text-blue-400'} />
          <div>
            <div className="text-white font-semibold">
              <span className="text-2xl">{spotsRemaining}</span>
              <span className="text-sm text-white/70 ml-1">/ {spotsTotal} spots</span>
            </div>
            <div className="text-xs text-white/60">Available seats remaining</div>
          </div>
        </div>
        {isCritical && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1 text-red-400 text-xs font-semibold"
          >
            <AlertCircle size={14} />
            Almost Full!
          </motion.div>
        )}
      </div>

      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${
            isCritical
              ? 'bg-gradient-to-r from-red-600 to-red-500'
              : isAlmostFull
              ? 'bg-gradient-to-r from-orange-600 to-orange-500'
              : 'bg-gradient-to-r from-blue-600 to-blue-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentageFilled}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 bg-white/30"
          style={{ width: `${percentageFilled}%` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-white/60">
          {spotsFilled} registered
        </span>
        <span className={`font-semibold ${
          isCritical ? 'text-red-400' : isAlmostFull ? 'text-orange-400' : 'text-green-400'
        }`}>
          {Math.round(percentageFilled)}% full
        </span>
      </div>

      {isAlmostFull && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-white/10"
        >
          <div className="flex items-start gap-2">
            <TrendingUp size={14} className={isCritical ? 'text-red-400 mt-0.5' : 'text-orange-400 mt-0.5'} />
            <p className="text-xs text-white/80">
              {isCritical
                ? 'Only a few spots left! Register now to secure your place.'
                : 'Filling up fast! Don\'t miss out on this exclusive training.'}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RegistrationProgress;
