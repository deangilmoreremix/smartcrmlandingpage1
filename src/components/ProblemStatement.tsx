import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, ArrowRight, BarChart2, Clock, DollarSign, X, Info, Activity, TrendingDown, UserMinus, UserX, Database, Cpu } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';

const ProblemStatement: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  const toggleCard = (cardId: string) => {
    if (expandedCard === cardId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardId);
    }
  };
  
  return (
    <section id="problem" className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/20 pointer-events-none" />
      
      {/* Animated floating icons */}
      <AnimatedIconsGroup 
        section="features" 
        iconCount={6} 
        animations={['bounce', 'pulse', 'rotate', 'orbit']} 
      />
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" 
          animate={{ 
            y: [0, 20, 0],
            x: [0, 15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 -right-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl" 
          animate={{ 
            y: [0, -20, 0],
            x: [0, -15, 0]
          }}
          transition={{
            duration: 9,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">The Smart CRM Challenge</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Traditional CRM systems promise a lot but often create more problems than they solve.
            </p>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
          <AnimatedElement animation="slideUp" delay={0.2}>
            <div className="space-y-6">
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                whileHover={{ 
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.08)", 
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start">
                  <div className="bg-amber-500/20 p-3 rounded-lg mr-4">
                    <Clock className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Time-Consuming Data Entry</h3>
                    <p className="text-white/70">
                      Sales reps spend up to 65% of their time on non-selling activities, with manual data entry being the biggest culprit.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                whileHover={{ 
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.08)", 
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <BarChart2 className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Inaccurate Forecasts</h3>
                    <p className="text-white/70">
                      Traditional CRMs rely on manual inputs and outdated data, leading to forecasts that are off by an average of 34%.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                whileHover={{ 
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.08)", 
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start">
                  <div className="bg-red-500/20 p-3 rounded-lg mr-4">
                    <DollarSign className="text-red-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Poor ROI</h3>
                    <p className="text-white/70">
                      Companies spend an average of $1,500 per user annually on CRM systems with only 26% seeing tangible ROI.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="slideUp" delay={0.4}>
            <div className="bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-md rounded-xl p-8 border border-white/10 space-y-6">
              <div className="flex items-center mb-2">
                <AlertTriangle className="text-amber-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">The Real Problem</h3>
              </div>
              
              <p className="text-white/80 text-lg">
                Current CRM systems were built for managers to track activity, not for sales teams to build relationships with AI. 
                They've become data repositories rather than productivity tools.
              </p>
              
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-white font-medium mb-3">Why Traditional CRMs Fail:</h4>
                <ul className="space-y-3">
                  {[
                    "Designed as databases, not relationship tools with AI",
                    "Excessive manual data entry creates adoption barriers",
                    "Lack of true intelligence and actionable insights",
                    "Poor integration with modern business tools",
                    "Complex interfaces require extensive training"
                  ].map((point, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="h-6 w-6 rounded-full border border-red-500/50 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                        <X size={12} className="text-red-400" />
                      </div>
                      <span className="text-white/70">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-white font-medium flex items-center mb-3">
                  <span>The Solution Businesses Need:</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    "A Smart CRM that works for the sales team, not against them",
                    "Intelligence with AI that creates insights from existing data",
                    "Automation that eliminates manual data entry",
                    "Seamless integration with existing workflows"
                  ].map((point, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle size={18} className="text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <motion.a
                href="#solution"
                className="inline-flex items-center text-blue-400 font-medium mt-4 group"
                whileHover={{ x: 5 }}
              >
                <span>Discover the Smart Smart CRM solution with AI</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </motion.a>
            </div>
          </AnimatedElement>
        </div>
        
        <AnimatedElement animation="fadeIn" delay={0.6}>
          <div className="text-center mt-10 max-w-5xl mx-auto relative">
            <InteractiveFloatingButton 
              text="Click Stats for Details" 
              position="top-right"
              color="amber"
              delay={1}
            />
            
            <h3 className="text-2xl font-semibold text-white mb-8 relative inline-block">
              The CRM Reality
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-500"
                initial={{ width: 0, left: "50%" }}
                whileInView={{ width: "100%", left: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </h3>
            
            {/* Enhanced Stats with Animations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  id: "failed-implementations",
                  value: "67%",
                  label: "of CRM implementations fail to meet business expectations",
                  icon: <TrendingDown size={24} />,
                  color: "red",
                  details: [
                    "Poor user adoption is the #1 reason for failure",
                    "Inadequate training contributes to 22% of failures",
                    "Complex interfaces lead to abandonment",
                    "Data quality issues impact business decisions"
                  ]
                },
                {
                  id: "adoption-rate",
                  value: "30%",
                  label: "average adoption rate for traditional CRM systems",
                  icon: <UserMinus size={24} />,
                  color: "red",
                  details: [
                    "Sales reps avoid systems that create extra work",
                    "Only 13% of sales reps find value in their current CRM",
                    "40% of companies struggle with CRM user adoption",
                    "Teams revert to spreadsheets and personal systems"
                  ]
                },
                {
                  id: "selling-time",
                  value: "23%",
                  label: "of sales reps' time spent on actual selling activities",
                  icon: <Clock size={24} />,
                  color: "red",
                  details: [
                    "Manual data entry consumes 32% of sales reps' time",
                    "Finding and organizing information takes 19% of time",
                    "Only 35% of CRM data is actively used for decision-making",
                    "Teams spend 9.1 hours per week on CRM-related admin tasks"
                  ]
                }
              ].map((stat, idx) => (
                <motion.div 
                  key={stat.id}
                  className={`bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-${stat.color}-500/30 cursor-pointer relative`}
                  onClick={() => toggleCard(stat.id)}
                  whileHover={{ 
                    y: -8,
                    backgroundColor: "rgba(255, 255, 255, 0.08)", 
                    borderColor: `rgba(${stat.color === "red" ? "239, 68, 68" : "59, 130, 246"}, 0.4)`
                  }}
                  layoutId={`card-container-${stat.id}`}
                >
                  <motion.div className="p-6" layoutId={`card-content-${stat.id}`}>
                    <motion.div 
                      className={`h-12 w-12 rounded-full bg-${stat.color}-500/20 flex items-center justify-center mx-auto mb-4`}
                      layoutId={`card-icon-${stat.id}`}
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
                    >
                      {stat.icon}
                    </motion.div>
                    
                    <motion.span 
                      className={`text-${stat.color}-400 text-3xl font-bold block mb-2`}
                      layoutId={`card-value-${stat.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      {stat.value}
                    </motion.span>
                    
                    <motion.span 
                      className="text-white/70 text-sm"
                      layoutId={`card-label-${stat.id}`}
                    >
                      {stat.label}
                    </motion.span>
                    
                    <motion.div
                      className="mt-3 text-blue-400 text-sm flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <span>{expandedCard === stat.id ? "Show less" : "Learn more"}</span>
                      <motion.div
                        animate={expandedCard === stat.id ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={14} className="ml-1" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  
                  <AnimatePresence>
                    {expandedCard === stat.id && (
                      <motion.div 
                        className="bg-white/5 p-4 border-t border-white/10"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ul className="space-y-2">
                          {stat.details.map((detail, detailIdx) => (
                            <motion.li 
                              key={detailIdx}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * detailIdx }}
                            >
                              <Info size={12} className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-white/70 text-xs">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            {/* New: Traditional CRM vs Smart CRM Comparison */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8 relative">
              <InteractiveFloatingButton 
                text="Compare Solutions" 
                position="top-right"
                color="green"
                delay={3}
              />
              
              <h4 className="text-xl font-semibold text-white mb-6">Traditional CRM vs Smart Smart CRM with AI</h4>
              
              <div className="relative mb-8">
                {/* Connection Line */}
                <div className="absolute left-[50%] top-10 bottom-0 w-px bg-white/10" />
                
                {[
                  {
                    traditional: "Manual data entry consumes 32% of sales time",
                    smart: "AI automates data capture reducing entry time by 70%",
                    traditionalIcon: <Database size={20} className="text-red-400" />,
                    smartIcon: <Cpu size={20} className="text-green-400" />
                  },
                  {
                    traditional: "Static dashboards with outdated information",
                    smart: "Real-time dashboards with predictive AI insights",
                    traditionalIcon: <BarChart2 size={20} className="text-red-400" />,
                    smartIcon: <Activity size={20} className="text-green-400" />
                  },
                  {
                    traditional: "30% average user adoption rate",
                    smart: "94% user adoption with intuitive AI design",
                    traditionalIcon: <UserX size={20} className="text-red-400" />,
                    smartIcon: <CheckCircle size={20} className="text-green-400" />
                  }
                ].map((comparison, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative">
                    {/* Left Side: Traditional CRM */}
                    <motion.div 
                      className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-red-500/20"
                      whileHover={{ x: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-red-500/20 rounded-lg mr-3">
                          {comparison.traditionalIcon}
                        </div>
                        <div className="flex-1">
                          <h5 className="text-white text-md font-medium mb-1">Traditional CRM</h5>
                          <p className="text-white/70 text-sm">{comparison.traditional}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Connection Dot */}
                    <div className="absolute left-[50%] top-8 w-4 h-4 rounded-full bg-white/10 transform -translate-x-1/2" />
                    
                    {/* Right Side: Smart CRM */}
                    <motion.div 
                      className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-green-500/20"
                      whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx + 0.1 }}
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-green-500/20 rounded-lg mr-3">
                          {comparison.smartIcon}
                        </div>
                        <div className="flex-1">
                          <h5 className="text-white text-md font-medium mb-1">Smart Smart CRM with AI</h5>
                          <p className="text-white/70 text-sm">{comparison.smart}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
              
              {/* New: ROI Impact Visualization */}
              <motion.div 
                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-5 border border-blue-500/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-medium text-white mb-3">Real Business Impact with AI</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { value: "+42%", label: "Higher Win Rates", color: "green" },
                    { value: "-68%", label: "Less Admin Work", color: "blue" },
                    { value: "+57%", label: "Data Accuracy", color: "purple" },
                    { value: "3.8x", label: "ROI Improvement", color: "amber" }
                  ].map((metric, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/10 rounded-lg p-3 text-center"
                      whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: 0.2 + idx * 0.1, duration: 0.3 }
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.span
                        className={`text-${metric.color}-400 text-2xl font-bold block`}
                        animate={{ 
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 2, delay: idx * 0.5, repeat: Infinity, repeatDelay: 3 }}
                      >
                        {metric.value}
                      </motion.span>
                      <span className="text-white/70 text-sm">{metric.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <p className="text-white/80 text-lg">
              It's time for a Smart CRM with AI that actually helps sales teams sell more, rather than just creating more administrative work.
            </p>
            
            <motion.div
              className="mt-8 inline-block"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#solution"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group"
              >
                <span>Discover the Smart Smart CRM Solution with AI</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </a>
            </motion.div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default ProblemStatement;