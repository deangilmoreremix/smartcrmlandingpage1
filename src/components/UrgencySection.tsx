import React, { useState, useEffect, useContext } from 'react';
import { Clock, Users, Calendar, Gift, Check, TriangleAlert as AlertTriangle, Zap, Video, CheckCircle } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import { SignupContext } from '../App';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import { WEBINAR_DATE } from '../constants/dates';

interface UrgencySectionProps {
  launchDate: Date;
}

const UrgencySection: React.FC<UrgencySectionProps> = ({ launchDate }) => {
  const [seatsLeft, setSeatsLeft] = useState(87);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { openSignupModal } = useContext(SignupContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);

      if (timeElapsed % Math.floor(Math.random() * 15 + 10) === 0 && seatsLeft > 15) {
        setSeatsLeft(prev => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeElapsed, seatsLeft]);

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-blue-950/30 pointer-events-none" />

      <AnimatedIconsGroup
        section="pricing"
        iconCount={15}
        animations={['bounce', 'pulse', 'orbit', 'random']}
        density="high"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedElement animation="scale">
          <motion.div
            className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-2xl p-8 md:p-12 border border-blue-500/30 shadow-2xl backdrop-blur-md"
            whileHover={{
              boxShadow: "0 10px 40px -5px rgba(59, 130, 246, 0.3)",
              borderColor: "rgba(59, 130, 246, 0.4)",
            }}
          >
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center bg-blue-500/20 rounded-full px-4 py-2 mb-6"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.3)"
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Video className="text-blue-400 mr-2" size={18} />
                </motion.div>
                <span className="text-white font-medium">Free Live Webinar - Limited Seats</span>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                Reserve Your Spot Today
              </motion.h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Join us for an exclusive live webinar on {WEBINAR_DATE.FULL} and discover how Smart CRM can revolutionize your business with AI-powered automation.
              </p>
            </div>

            <div className="mb-10">
              <div className="text-center mb-3">
                <div className="inline-flex items-center bg-blue-600/30 rounded-full px-4 py-1 backdrop-blur-md border border-blue-500/30">
                  <Calendar className="text-blue-400 mr-2" size={14} />
                  <span className="text-white/90 text-sm">Webinar starts in:</span>
                </div>
              </div>
              <CountdownTimer
                targetDate={launchDate}
                onComplete={() => console.log('Webinar started!')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: <Video className="text-blue-400" size={24} />,
                  title: "Live Demonstration",
                  description: "Watch Smart CRM in action with real-time examples and use cases."
                },
                {
                  icon: <Zap className="text-cyan-400" size={24} />,
                  title: "Learn AI Automation",
                  description: "Discover how to automate 70% of your manual data entry tasks."
                },
                {
                  icon: <CheckCircle className="text-green-400" size={24} />,
                  title: "Get Expert Advice",
                  description: "Interactive Q&A session with Smart CRM implementation specialists."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                  whileHover={{
                    y: -10,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(255, 255, 255, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex items-center mb-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: index + 2 }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <h3 className="text-white font-semibold ml-2">{benefit.title}</h3>
                  </motion.div>
                  <p className="text-white/70 text-sm">{benefit.description}</p>

                  <motion.div
                    className="mt-4 pt-4 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="flex items-start space-x-1">
                      <Check size={14} className="text-green-400 mt-0.5" />
                      <p className="text-white/60 text-xs">
                        {index === 0 ? "See real customer success stories and implementations" :
                         index === 1 ? "Learn step-by-step automation strategies" :
                         "Get answers to your specific business challenges"}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center">
                    <Users className="text-blue-400 mr-2" size={20} />
                    <motion.p
                      className="text-white font-medium"
                      animate={{
                        color: ['#ffffff', '#3b82f6', '#ffffff']
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                      Only {seatsLeft} seats remaining!
                    </motion.p>
                  </div>
                  <p className="text-white/60 text-sm ml-7">Seats are filling up fast - register now to secure your spot</p>
                </div>

                <motion.div
                  className="w-full md:w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <button
                    onClick={() => openSignupModal('early-access')}
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg transition-colors font-medium"
                  >
                    Register for Free
                  </button>
                </motion.div>
              </div>
            </div>

            <div className="text-center">
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-lg p-4 max-w-2xl mx-auto border border-white/10 mb-6"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              >
                <p className="text-white/80 text-sm">
                  "The Smart CRM webinar was incredibly valuable. I learned practical strategies I could implement immediately, and our sales process has never been more efficient."
                </p>
                <p className="text-white font-medium mt-2">
                  — Michael Chen, Sales Director at GrowthTech Solutions
                </p>
              </motion.div>

              <motion.button
                onClick={() => openSignupModal('early-access')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                Save My Seat - 100% Free
              </motion.button>
              <motion.p
                className="text-white/60 text-sm mt-4"
                animate={{
                  color: ['rgba(255,255,255,0.6)', 'rgba(59,130,246,0.8)', 'rgba(255,255,255,0.6)']
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                {WEBINAR_DATE.FULL} - Register now, only {seatsLeft} seats left!
              </motion.p>
            </div>
          </motion.div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default UrgencySection;
