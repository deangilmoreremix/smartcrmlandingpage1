import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Target, TrendingUp, Users, Database, BarChart3, ArrowRight, Database as DataIcon, Brain, Zap } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import { SignupContext } from '../App';

interface CRMGoal {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  benefits: string[];
  primaryColor: string;
}

interface CRMGoalsAnimationProps {
  title?: string;
  subtitle?: string;
  goals: CRMGoal[];
  ctaText?: string;
  onCtaClick?: () => void;
}

const CRMGoalsAnimation: React.FC<CRMGoalsAnimationProps> = ({
  title = "What are you looking for in a CRM?",
  subtitle = "Select your primary goal to see how SmartCRM delivers results",
  goals,
  ctaText = "Get SmartCRM Now",
  onCtaClick
}) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);
  const { openSignupModal } = React.useContext(SignupContext);

  const selectedGoalData = goals.find(goal => goal.id === selectedGoal);

  const handleGoalClick = (goalId: string) => {
    setSelectedGoal(selectedGoal === goalId ? null : goalId);
  };

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      openSignupModal?.('early-access');
    }
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-black pointer-events-none" />

      {/* Animated floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center bg-blue-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-md border border-blue-500/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                borderColor: "rgba(59, 130, 246, 0.4)"
              }}
              transition={{ duration: 0.2 }}
            >
              <Target className="text-blue-400 mr-2" size={18} />
              <span className="text-white font-medium">SmartCRM Goals</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
        </AnimatedElement>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {goals.map((goal, idx) => (
            <AnimatedElement key={goal.id} animation="slideUp" delay={0.1 + (idx * 0.1)}>
              <motion.div
                className={`relative bg-white/5 backdrop-blur-md rounded-xl border-2 p-6 h-full cursor-pointer transition-all duration-300 ${
                  selectedGoal === goal.id
                    ? `border-${goal.primaryColor}-400 bg-${goal.primaryColor}-500/10 shadow-lg shadow-${goal.primaryColor}-500/20`
                    : hoveredGoal === goal.id
                    ? `border-${goal.primaryColor}-400/50 bg-${goal.primaryColor}-500/5`
                    : 'border-white/10 hover:border-white/30'
                }`}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGoalClick(goal.id)}
                onHoverStart={() => setHoveredGoal(goal.id)}
                onHoverEnd={() => setHoveredGoal(null)}
              >
                <motion.div
                  className="flex flex-col items-center text-center mb-4"
                  animate={{
                    scale: selectedGoal === goal.id ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-${goal.primaryColor}-500/20 flex items-center justify-center mb-3`}
                    animate={{
                      rotate: selectedGoal === goal.id ? [0, 10, -10, 0] : 0,
                      scale: selectedGoal === goal.id ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {goal.icon}
                  </motion.div>

                  <h3 className="text-lg font-semibold text-white mb-2">{goal.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{goal.description}</p>
                </motion.div>

                {/* Selection Indicator */}
                <AnimatePresence>
                  {selectedGoal === goal.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-3 right-3"
                    >
                      <CheckCircle className={`w-6 h-6 text-${goal.primaryColor}-400`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {selectedGoalData && (
            <AnimatedElement animation="fadeIn" delay={0.2}>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-gradient-to-r from-${selectedGoalData.primaryColor}-900/30 to-${selectedGoalData.primaryColor}-800/30 backdrop-blur-md rounded-2xl border border-${selectedGoalData.primaryColor}-500/30 p-8 mb-8`}
              >
                <InteractiveFloatingButton
                  text="Explore Features"
                  position="top-right"
                  color={selectedGoalData.primaryColor === 'blue' ? 'blue' : selectedGoalData.primaryColor === 'green' ? 'green' : 'purple'}
                  delay={1}
                />

                <div className="flex items-start gap-6">
                  <motion.div
                    className={`w-20 h-20 rounded-xl bg-${selectedGoalData.primaryColor}-500/20 flex items-center justify-center flex-shrink-0`}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {selectedGoalData.icon}
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{selectedGoalData.title}</h3>
                    <p className="text-white/80 text-lg mb-6">{selectedGoalData.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Zap className="text-yellow-400 mr-2" size={20} />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {selectedGoalData.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * idx }}
                            >
                              <CheckCircle size={16} className={`text-${selectedGoalData.primaryColor}-400 mt-0.5 mr-3 flex-shrink-0`} />
                              <span className="text-white/90">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <TrendingUp className="text-green-400 mr-2" size={20} />
                          Business Benefits
                        </h4>
                        <ul className="space-y-2">
                          {selectedGoalData.benefits.map((benefit, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * idx + 0.2 }}
                            >
                              <CheckCircle size={16} className="text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                              <span className="text-white/90">{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedElement>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <AnimatedElement animation="fadeIn" delay={0.4}>
          <div className="text-center">
            <motion.button
              onClick={handleCtaClick}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/30"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{ctaText}</span>
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default CRMGoalsAnimation;