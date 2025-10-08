import React, { useState, useEffect, useContext } from 'react';
import { Clock, Users, Tag, Gift, Check, X, AlertTriangle, Calendar, BookOpen, Star, User, Mail, Zap, BarChart3 } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import { SignupContext } from '../App';
import { handleFormSubmission } from '../utils/formHelpers';
import CanvasConfetti from './CanvasConfetti';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface UrgencySectionProps {
  launchDate: Date;
}

const UrgencySection: React.FC<UrgencySectionProps> = ({ launchDate }) => {
  const [spotsLeft, setSpotsLeft] = useState(50);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { openSignupModal, setHasSignedUp } = useContext(SignupContext);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Simulate spots decreasing over time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
      
      // Every 5-15 seconds, reduce spots by 1 to create urgency
      if (timeElapsed % Math.floor(Math.random() * 10 + 5) === 0 && spotsLeft > 3) {
        setSpotsLeft(prev => prev - 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeElapsed, spotsLeft]);

  return (
    <section className="py-20 px-4 relative">
      {/* Show confetti animation on successful registration */}
      {showConfetti && <CanvasConfetti />}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-blue-950/30 pointer-events-none" />
      
      {/* Animated floating icons for urgency section */}
      <AnimatedIconsGroup 
        section="pricing" 
        iconCount={15}
        animations={['bounce', 'pulse', 'orbit', 'random']} 
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
                Smart CRM: 7-Day Special Sale
              </motion.h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Get Smart CRM at special pricing during our limited 7-day sale (September 21-27, 2025). Transform your business with AI-powered customer relationship management.
              </p>
            </div>
            
            <div className="mb-10">
              <div className="text-center mb-3">
                <div className="inline-flex items-center bg-red-600/30 rounded-full px-4 py-1 backdrop-blur-md border border-red-500/30">
                  <Tag className="text-red-400 mr-2" size={14} />
                  <span className="text-white/90 text-sm">Sale ends in:</span>
                </div>
              </div>
              <CountdownTimer 
                targetDate={launchDate} 
                onComplete={() => console.log('Sale ended!')} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: <Zap className="text-blue-400" size={24} />,
                  title: "AI-Powered Automation",
                  description: "Reduce manual data entry by 70% with our advanced AI automation features."
                },
                {
                  icon: <BarChart3 className="text-purple-400" size={24} />,
                  title: "Predictive Analytics",
                  description: "Get 95% accurate sales forecasting with our multi-model AI intelligence."
                },
                {
                  icon: <Gift className="text-purple-400" size={24} />,
                  title: "Free Live Masterclass",
                  description: "Exclusive 3-day training on September 10-12, 2025 included with your purchase."
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
                        {index === 0 ? "Automate workflows with natural language commands" : 
                         index === 1 ? "Machine learning models predict deal outcomes" :
                         "Expert-led training on September 10-11, 2025 at 3PM EDT"}
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
                      Sale ends in just a few days - September 27th at midnight!
                    </motion.p>
                  </div>
                  <p className="text-white/60 text-sm ml-7">Return to regular pricing after the sale ends.</p>
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
                  "Smart CRM's AI automation has completely transformed our sales process. We've reduced data entry by 70% and increased our deal closure rate by 42% since implementation."
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
                Special sale pricing ends September 27, 2025 - includes free masterclass (Sep 21-23)
              </motion.p>
            </div>
          </motion.div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default UrgencySection;