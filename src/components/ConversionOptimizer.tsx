import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Users, TrendingUp, Zap, Check,
  AlertCircle, Award, Shield, Star, ArrowRight,
  Timer, DollarSign, Sparkles, Lock, Gift
} from 'lucide-react';
import AnimatedElement from './AnimatedElement';

interface ConversionOptimizerProps {
  onCtaClick?: () => void;
  ctaText?: string;
  urgencyEnabled?: boolean;
  socialProofEnabled?: boolean;
  guaranteeEnabled?: boolean;
  priceAnchoringEnabled?: boolean;
}

const ConversionOptimizer: React.FC<ConversionOptimizerProps> = ({
  onCtaClick,
  ctaText = "Get Smart CRM Now",
  urgencyEnabled = true,
  socialProofEnabled = true,
  guaranteeEnabled = true,
  priceAnchoringEnabled = true,
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 45 });
  const [recentPurchases, setRecentPurchases] = useState<string[]>([]);
  const [showPurchaseNotification, setShowPurchaseNotification] = useState(false);
  const [currentViewers, setCurrentViewers] = useState(127);

  const locations = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
    "San Francisco", "Miami", "Boston", "Seattle", "Austin",
    "Denver", "Atlanta", "Dallas", "Toronto", "London"
  ];

  useEffect(() => {
    if (!urgencyEnabled) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [urgencyEnabled]);

  useEffect(() => {
    if (!socialProofEnabled) return;

    const purchaseInterval = setInterval(() => {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const minutesAgo = Math.floor(Math.random() * 15) + 1;

      setRecentPurchases(prev => {
        const newPurchase = `Someone from ${randomLocation} purchased ${minutesAgo} min ago`;
        return [newPurchase, ...prev.slice(0, 4)];
      });

      setShowPurchaseNotification(true);
      setTimeout(() => setShowPurchaseNotification(false), 4000);
    }, 12000);

    const viewerInterval = setInterval(() => {
      setCurrentViewers(prev => {
        const change = Math.floor(Math.random() * 10) - 4;
        return Math.max(85, Math.min(180, prev + change));
      });
    }, 8000);

    return () => {
      clearInterval(purchaseInterval);
      clearInterval(viewerInterval);
    };
  }, [socialProofEnabled]);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <div className="relative">
      {urgencyEnabled && (
        <AnimatedElement animation="fade-up" delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-4 px-6 rounded-xl shadow-2xl mb-6 border-2 border-red-400"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <AlertCircle className="w-8 h-8 text-yellow-300" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg">Limited Time Offer Ending Soon!</h3>
                  <p className="text-sm text-red-100">Special launch pricing expires in:</p>
                </div>
              </div>

              <div className="flex gap-3">
                {[
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' }
                ].map((item, idx) => (
                  <React.Fragment key={item.label}>
                    <motion.div
                      className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[70px] text-center border border-white/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-3xl font-bold tabular-nums">{String(item.value).padStart(2, '0')}</div>
                      <div className="text-xs uppercase tracking-wider text-red-100">{item.label}</div>
                    </motion.div>
                    {idx < 2 && <div className="text-3xl font-bold self-center">:</div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatedElement>
      )}

      {socialProofEnabled && (
        <>
          <AnimatedElement animation="fade-up" delay={0.2}>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-green-300 rounded-xl p-6 mb-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 rounded-full p-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">Live Activity</h4>
                  <p className="text-sm text-gray-600">Join thousands of satisfied customers</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                    <span className="font-bold text-2xl text-gray-800">{currentViewers}</span>
                  </div>
                  <p className="text-sm text-gray-600">People viewing now</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-2xl text-gray-800">2,847</span>
                  </div>
                  <p className="text-sm text-gray-600">Customers this month</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-2xl text-gray-800">4.9/5</span>
                  </div>
                  <p className="text-sm text-gray-600">Average rating</p>
                </div>
              </div>
            </div>
          </AnimatedElement>

          <AnimatePresence>
            {showPurchaseNotification && recentPurchases.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="fixed bottom-6 left-6 z-50 bg-white rounded-lg shadow-2xl border-2 border-green-400 p-4 max-w-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-2">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">New Purchase!</p>
                    <p className="text-sm text-gray-600">{recentPurchases[0]}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {priceAnchoringEnabled && (
        <AnimatedElement animation="fade-up" delay={0.3}>
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-xl p-8 mb-6 shadow-2xl border-2 border-blue-400 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm"
              >
                SAVE 67%
              </motion.div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="text-yellow-400" />
                Special Launch Pricing
              </h3>

              <div className="flex items-end gap-4 mb-6">
                <div>
                  <p className="text-sm text-blue-200 line-through">Regular Price: $297/month</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">$97</span>
                    <span className="text-2xl text-blue-200">/month</span>
                  </div>
                  <p className="text-green-300 font-semibold mt-2">You save $200/month!</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "Unlimited contacts and deals",
                  "GPT-5 AI assistance included",
                  "All premium features unlocked",
                  "Priority support & training",
                  "No setup fees or hidden costs"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-blue-50">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={handleCtaClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-8 rounded-xl shadow-2xl flex items-center justify-center gap-3 text-lg group"
              >
                <Zap className="w-6 h-6 group-hover:animate-pulse" />
                {ctaText}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <p className="text-center text-blue-200 text-sm mt-4 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Secure checkout • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </AnimatedElement>
      )}

      {guaranteeEnabled && (
        <AnimatedElement animation="fade-up" delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-blue-200 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">30-Day Guarantee</h4>
              <p className="text-sm text-gray-600">100% money-back if you're not satisfied</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-green-200 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Proven Results</h4>
              <p className="text-sm text-gray-600">Join 500+ companies seeing real growth</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-purple-200 text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Bonus Training</h4>
              <p className="text-sm text-gray-600">$997 value included free with purchase</p>
            </div>
          </div>
        </AnimatedElement>
      )}
    </div>
  );
};

export default ConversionOptimizer;
