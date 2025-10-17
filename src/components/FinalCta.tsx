import React, { useState, useContext } from 'react';
import { Clock, Users, Tag, Gift, Check, X, TriangleAlert as AlertTriangle, Calendar, BookOpen, Star, User, Mail, Zap, ChartBar as BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import { SignupContext } from '../App';
import AnimatedIconsGroup from './AnimatedIconsGroup';
// import JVZooBuyButton from './JVZooBuyButton';
// import JVZooNoThanksButton from './JVZooNoThanksButton';

interface FinalCtaProps {}

const FinalCta: React.FC<FinalCtaProps> = () => {
  const [spotsLeft, setSpotsLeft] = useState(50);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { openSignupModal, setHasSignedUp } = useContext(SignupContext);
  
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-blue-950/30 pointer-events-none" />
      
      {/* Animated floating icons for the CTA section */}
      <AnimatedIconsGroup 
        section="pricing" 
        iconCount={18} 
        animations={['pulse', 'bounce', 'orbit', 'random']} 
        density="high"
      />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedElement animation="scale">
          <motion.div 
            className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-8 md:p-12 border border-blue-500/30 shadow-2xl backdrop-blur-md"
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
                  <Star className="text-yellow-400 mr-2" size={18} />
                </motion.div>
                <span className="text-white font-medium">Last Chance to Register</span>
              </motion.div>
              
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                Reserve Your Spot for the Live Webinar
              </motion.h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Join us on October 17th at 3:00 PM EST for an exclusive live demonstration of Smart CRM. See how AI can transform your business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: <Zap className="text-blue-400" size={24} />,
                  title: "Live AI Demo",
                  description: "Watch GPT-5 AI integration in action with real-time demonstrations of intelligent automation."
                },
                {
                  icon: <Star className="text-green-400" size={24} />,
                  title: "Expert Q&A Session",
                  description: "Get your specific questions answered by Smart CRM implementation specialists."
                },
                {
                  icon: <Gift className="text-purple-400" size={24} />,
                  title: "100% Free Access",
                  description: "No cost to attend. Learn valuable strategies you can implement immediately in your business."
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
                        {index === 0 ? "See predictive analytics and lead scoring live" :
                         index === 1 ? "Interactive discussion - bring your questions" :
                         "Recording available for all registrants"}
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
                    <AlertTriangle className="text-yellow-400 mr-2" size={20} />
                    <motion.p
                      className="text-white font-medium"
                      animate={{
                        color: ['#ffffff', '#3b82f6', '#ffffff']
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                      Webinar seats filling fast - only 87 spots remaining!
                    </motion.p>
                  </div>
                  <p className="text-white/60 text-sm ml-7">October 17th at 3:00 PM EST - Register now to secure your spot.</p>
                </div>

                <motion.div
                  className="w-full md:w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <button
                    onClick={() => openSignupModal('early-access')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg transition-colors inline-block text-center font-medium"
                  >
                    Register for Free Webinar
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
                  "The Smart CRM webinar was incredibly insightful. The live demonstrations showed exactly how AI can streamline our sales process.
                  I walked away with actionable strategies I implemented the very next day."
                </p>
                <p className="text-white font-medium mt-2">
                  — Sarah Johnson, VP of Sales at TechGrowth Inc.
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
                Reserve My Spot - 100% Free
              </motion.button>
              <motion.p
                className="text-white/60 text-sm mt-4"
                animate={{
                  color: ['rgba(255,255,255,0.6)', 'rgba(59,130,246,0.8)', 'rgba(255,255,255,0.6)']
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                October 17, 2025 at 3:00 PM EST - Limited seats available
              </motion.p>
            </div>
          </motion.div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default FinalCta;