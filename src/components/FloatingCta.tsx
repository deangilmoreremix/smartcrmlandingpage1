import React, { useEffect, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Star, Gift, Zap, TrendingUp, Users, ChevronDown, ChevronUp, Award, Shield, Sparkles } from 'lucide-react';
import { SignupContext } from '../App';
// import JVZooBuyButton from './JVZooBuyButton';
import { LAUNCH_DATE, WEBINAR_DATE } from '../constants/dates';
import { trackPopupInteraction, calculateTimeToConversion } from '../utils/popupAnalytics';

const FloatingCta: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(47);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [recentSignups, setRecentSignups] = useState(0);
  const { openSignupModal } = useContext(SignupContext);
  
  useEffect(() => {
    // Countdown timer logic
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = LAUNCH_DATE.getTime() - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const countdownInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    // Simulate spots decreasing and recent signups
    const spotsInterval = setInterval(() => {
      setSpotsLeft(prev => {
        const newSpots = prev - 1;
        if (newSpots <= 15) return prev;
        setRecentSignups(Math.floor(Math.random() * 3) + 1);
        return newSpots;
      });
    }, Math.random() * 30000 + 20000);

    return () => clearInterval(spotsInterval);
  }, []);

  useEffect(() => {
    // Check session storage for dismissal
    const dismissed = sessionStorage.getItem('floatingCtaDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show CTA after scrolling down 50% of the viewport height
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5 && !isDismissed) {
        setIsVisible(true);
      }
    };

    // Set timeout to show CTA after 8 seconds
    const timeout = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 8000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [isDismissed]);

  useEffect(() => {
    if (isVisible && !isDismissed) {
      trackPopupInteraction({
        interactionType: 'view',
        popupVariant: 'floating_cta_enhanced',
        spotsRemaining: spotsLeft,
        daysRemaining: timeLeft.days
      });
    }
  }, [isVisible]);
  
  const handleDismiss = () => {
    trackPopupInteraction({
      interactionType: 'dismiss',
      popupVariant: 'floating_cta_enhanced',
      spotsRemaining: spotsLeft,
      daysRemaining: timeLeft.days
    });
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('floatingCtaDismissed', 'true');
  };

  const handleCtaClick = () => {
    trackPopupInteraction({
      interactionType: 'click_cta',
      popupVariant: 'floating_cta_enhanced',
      spotsRemaining: spotsLeft,
      daysRemaining: timeLeft.days
    });
    openSignupModal('early-access');
    setIsVisible(false);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      trackPopupInteraction({
        interactionType: 'expand',
        popupVariant: 'floating_cta_enhanced',
        spotsRemaining: spotsLeft,
        daysRemaining: timeLeft.days
      });
    }
  };
  
  const urgencyLevel = timeLeft.days <= 2 ? 'high' : timeLeft.days <= 4 ? 'medium' : 'low';
  const urgencyColor = urgencyLevel === 'high' ? 'from-red-600 to-red-700' : urgencyLevel === 'medium' ? 'from-orange-600 to-orange-700' : 'from-blue-600 to-blue-700';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 max-w-sm w-full mx-4 md:mx-0"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className={`bg-gradient-to-br ${urgencyColor} text-white rounded-2xl shadow-2xl overflow-hidden relative`}>
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />

            {/* Urgency badge */}
            <div className="absolute top-3 left-3 z-10">
              <motion.div
                className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: ['0 0 0 0 rgba(250, 204, 21, 0.7)', '0 0 0 8px rgba(250, 204, 21, 0)', '0 0 0 0 rgba(250, 204, 21, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={12} className="mr-1" />
                {timeLeft.days} DAYS LEFT
              </motion.div>
            </div>

            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 z-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>

            <div className="p-5 pt-12 relative z-[1]">
              {/* Recent signup notification */}
              <AnimatePresence>
                {recentSignups > 0 && (
                  <motion.div
                    className="bg-green-500/20 border border-green-400/30 rounded-lg px-3 py-2 mb-3 flex items-center text-xs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Users size={14} className="mr-2" />
                    {recentSignups} {recentSignups === 1 ? 'person' : 'people'} just registered
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-xl font-bold mb-2">
                Free Webinar: Oct 17th
              </h3>
              <p className="text-white/90 text-sm mb-3">
                Join our live webinar and discover how AI can transform your CRM. Limited seats!
              </p>

              {/* Countdown timer - compact version */}
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                <div className="flex items-center justify-center text-xs text-white/70 mb-1">
                  <Clock size={12} className="mr-1" />
                  Webinar starts in:
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="text-lg font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] text-white/60">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] text-white/60">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] text-white/60">Mins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] text-white/60">Secs</div>
                  </div>
                </div>
              </div>

              {/* Key benefits */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start text-xs">
                  <Zap size={14} className="mr-2 mt-0.5 text-yellow-300 flex-shrink-0" />
                  <span className="text-white/90">Live demo of AI-powered automation</span>
                </div>
                <div className="flex items-start text-xs">
                  <TrendingUp size={14} className="mr-2 mt-0.5 text-green-300 flex-shrink-0" />
                  <span className="text-white/90">Expert Q&A session included</span>
                </div>
                <div className="flex items-start text-xs">
                  <Gift size={14} className="mr-2 mt-0.5 text-pink-300 flex-shrink-0" />
                  <span className="text-white/90">100% Free - {WEBINAR_DATE.FULL}</span>
                </div>
              </div>

              {/* Expandable section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="bg-white/10 rounded-lg p-3 space-y-2">
                      <div className="text-xs font-semibold mb-2 flex items-center">
                        <Star size={12} className="mr-1 text-yellow-300" />
                        What You'll Learn:
                      </div>
                      <div className="space-y-1.5 text-xs text-white/80">
                        <div className="flex items-start">
                          <Award size={12} className="mr-2 mt-0.5 flex-shrink-0" />
                          <span>Live GPT-5 AI integration demo</span>
                        </div>
                        <div className="flex items-start">
                          <Award size={12} className="mr-2 mt-0.5 flex-shrink-0" />
                          <span>Predictive analytics & forecasting techniques</span>
                        </div>
                        <div className="flex items-start">
                          <Award size={12} className="mr-2 mt-0.5 flex-shrink-0" />
                          <span>Automated workflow strategies</span>
                        </div>
                        <div className="flex items-start">
                          <Award size={12} className="mr-2 mt-0.5 flex-shrink-0" />
                          <span>Implementation guidance & best practices</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/20">
                        <div className="flex items-center justify-between text-sm font-bold">
                          <span>Registration:</span>
                          <span className="text-green-300">100% Free</span>
                        </div>
                        <div className="text-xs text-white/70 mt-1">
                          Limited seats - Register now!
                        </div>
                      </div>
                    </div>

                    {/* Trust elements */}
                    <div className="mt-3 flex items-center justify-center space-x-3 text-xs text-white/70">
                      <div className="flex items-center">
                        <Shield size={12} className="mr-1" />
                        Secure
                      </div>
                      <div className="w-px h-3 bg-white/30" />
                      <div className="flex items-center">
                        <Award size={12} className="mr-1" />
                        Guaranteed
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scarcity indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/70">Spots remaining:</span>
                  <motion.span
                    className="font-bold"
                    animate={{ color: spotsLeft <= 25 ? ['#fff', '#ef4444', '#fff'] : '#fff' }}
                    transition={{ duration: 1, repeat: spotsLeft <= 25 ? Infinity : 0 }}
                  >
                    {spotsLeft}/100
                  </motion.span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className={`h-full ${spotsLeft <= 25 ? 'bg-red-500' : 'bg-green-400'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${spotsLeft}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <motion.button
                onClick={handleCtaClick}
                className="w-full py-3 px-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-sm"
                whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                type="button"
              >
                Register for Free Webinar
              </motion.button>

              {/* Learn more toggle */}
              <button
                onClick={handleExpand}
                className="w-full mt-2 text-xs text-white/70 hover:text-white flex items-center justify-center transition-colors"
              >
                {isExpanded ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp size={14} className="ml-1" />
                  </>
                ) : (
                  <>
                    <span>Learn more</span>
                    <ChevronDown size={14} className="ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCta;