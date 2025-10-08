import React, { useState, useContext } from 'react';
import { Clock, Users, Tag, Gift, Check, X, AlertTriangle, Calendar, BookOpen, Star, User, Mail, Zap, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import { SignupContext } from '../App';
import AnimatedIconsGroup from './AnimatedIconsGroup';

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
                Smart CRM: Final Days of 7-Day Sale
              </motion.h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Don't miss your chance to get Smart CRM at special pricing. Transform your business with AI-powered customer relationship management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: <Zap className="text-blue-400" size={24} />,
                  title: "AI-Powered Features",
                  description: "Advanced AI automation, predictive analytics, and intelligent insights to transform your sales process."
                },
                {
                  icon: <BookOpen className="text-green-400" size={24} />,
                  title: "Free Expert Training",
                  description: "Exclusive 3-day masterclass on September 10-12, 2025 included with your Smart CRM purchase."
                },
                {
                  icon: <Gift className="text-purple-400" size={24} />,
                  title: "Implementation Support",
                  description: "Get dedicated onboarding, templates, and guides to ensure successful Smart CRM implementation."
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
                        {index === 0 ? "Multi-model AI from OpenAI and Google" : 
                         index === 1 ? "Live training September 10-11, 2025 at 3PM EDT" :
                         "Dedicated success manager included"}
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
                        color: ['#ffffff', '#ef4444', '#ffffff']
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                      Special sale pricing ends September 27th - only 6 days left!
                    </motion.p>
                  </div>
                  <p className="text-white/60 text-sm ml-7">Prices return to regular rates after the sale ends.</p>
                </div>
                
                <motion.div 
                  className="w-full md:w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <button
                    onClick={() => openSignupModal('early-access')}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Get Smart CRM Now
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
                  "The Smart CRM masterclass was one of the most valuable 90 minutes I've spent on professional development. 
                  The strategies I learned helped us increase our sales team efficiency by 42% in just one month."
                </p>
                <p className="text-white font-medium mt-2">
                  — Sarah Johnson, VP of Sales at TechGrowth Inc.
                </p>
              </motion.div>
              
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openSignupModal('early-access')}
              >
                Get Smart CRM - Special Pricing
              </motion.button>
              <motion.p 
                className="text-white/60 text-sm mt-4"
                animate={{ 
                  color: ['rgba(255,255,255,0.6)', 'rgba(239,68,68,0.8)', 'rgba(255,255,255,0.6)']
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                Special sale ends September 27, 2025 - free masterclass included (Sep 21-23)
              </motion.p>
            </div>
          </motion.div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default FinalCta;