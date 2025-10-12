import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, TrendingUp, Star, Rocket, Award } from 'lucide-react';

const ScrollingBanner: React.FC = () => {
  const messages = [
    { icon: Rocket, text: "SMART CRM IS NOW LIVE", badge: "JUST LAUNCHED", color: "text-blue-300" },
    { icon: Sparkles, text: "Revolutionary GPT-5 AI Integration", badge: "BREAKTHROUGH", color: "text-purple-300" },
    { icon: TrendingUp, text: "40% Revenue Increase Proven", badge: "REAL RESULTS", color: "text-green-300" },
    { icon: Zap, text: "94.6% AI Accuracy", badge: "CUTTING-EDGE", color: "text-yellow-300" },
    { icon: Award, text: "Trusted by 500+ Companies", badge: "PROVEN", color: "text-blue-300" },
    { icon: Star, text: "Transform Your Business Today", badge: "AI-POWERED", color: "text-purple-300" },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 py-3 overflow-hidden relative z-50">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: 'linear'
        }}
      />

      {/* Sparkle effects */}
      <motion.div
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 * i}%`,
              top: '50%',
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              x: [0, 100, 200],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Scrolling text */}
      <div className="flex justify-center items-center relative z-10">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            repeat: Infinity,
            duration: 80,
            ease: 'linear'
          }}
          className="flex items-center whitespace-nowrap gap-8"
        >
          {Array(3).fill(messages).flat().map((message, index) => {
            const Icon = message.icon;
            return (
              <div key={index} className="flex items-center gap-4">
                <motion.div
                  className="flex items-center text-white bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/20"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <Icon className={`${message.color} mr-2`} size={16} />
                  <span className="font-bold text-sm">{message.text}</span>
                </motion.div>

                <motion.div
                  className="flex items-center text-white bg-gradient-to-r from-yellow-500/30 to-orange-500/30 px-3 py-1 rounded-full border border-yellow-400/40"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles size={12} className="text-yellow-300 mr-1.5" />
                  <span className="text-xs font-bold text-yellow-200">{message.badge}</span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollingBanner;