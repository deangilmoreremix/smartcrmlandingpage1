import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, ArrowRight, Zap, Shield, BarChart, Users, Clock, Mail, BrainCircuit, Calendar, Workflow, Cloud } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import { SignupContext } from '../App';
import AnimatedIconsGroup from './AnimatedIconsGroup';

// Icon components
const ChevronLeft = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const Filter = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const { openSignupModal } = useContext(SignupContext);

  // Auto-advance steps every 5 seconds if user isn't interacting
  useEffect(() => {
    if (!isAutoAdvancing) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoAdvancing]);

  // Pause auto-advance when user interacts, resume after 10 seconds of inactivity
  useEffect(() => {
    if (expandedStep !== null || hoverIndex !== null) {
      setIsAutoAdvancing(false);
    } else {
      const timeout = setTimeout(() => {
        setIsAutoAdvancing(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [expandedStep, hoverIndex]);

  const steps = [
    {
      number: "1",
      title: "AI Analyzes Your Business",
      description: "Our intelligent system learns your specific business patterns, customer preferences, and sales cycles to create a personalized CRM experience.",
      icon: <BrainCircuit className="text-blue-400" size={32} />,
      details: [
        "Automatic pattern recognition across your customer data",
        "Identifies key metrics specifically relevant to your industry",
        "Creates custom AI models trained for your unique business context",
        "Continuously learns and improves as you use the system"
      ],
      color: "blue",
      animation: {
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1]
      }
    },
    {
      number: "2",
      title: "Intelligent Automation",
      description: "Smart CRM eliminates repetitive tasks by automatically capturing, organizing, and prioritizing all customer interactions.",
      icon: <Cloud className="text-purple-400" size={32} />,
      details: [
        "Automatic email and call logging without manual data entry",
        "Intelligent meeting transcription and summary creation",
        "Smart follow-up scheduling based on interaction contexts",
        "Automated data enrichment from multiple sources"
      ],
      color: "purple",
      animation: {
        y: [0, -5, 0, 5, 0],
        filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
      }
    },
    {
      number: "3",
      title: "Strategic Insights",
      description: "Transform raw data into actionable intelligence with AI-powered analytics that surface opportunities your team would otherwise miss.",
      icon: <BarChart className="text-green-400" size={32} />,
      details: [
        "Predictive opportunity scoring to focus on winnable deals",
        "Relationship health metrics to prevent customer churn",
        "Actionable recommendations for next-best-steps",
        "Competitive intelligence and strategic positioning suggestions"
      ],
      color: "green",
      animation: {
        y: [0, 5, 0],
        x: [0, 5, 0]
      }
    },
    {
      number: "4",
      title: "Accelerated Results",
      description: "Close more deals with less effort as Smart CRM's AI highlights the highest-value opportunities and suggests optimal engagement strategies.",
      icon: <Zap className="text-amber-400" size={32} />,
      details: [
        "Revenue acceleration through optimized sales processes",
        "Intelligent pipeline management with prioritized opportunities",
        "A/B tested outreach recommendations for higher response rates",
        "Comprehensive customer journey tracking and optimization"
      ],
      color: "amber",
      animation: {
        scale: [1, 1.2, 1],
        rotate: [0, 5, 0, -5, 0]
      }
    }
  ];

  const toggleStepDetails = (index: number) => {
    if (expandedStep === index) {
      setExpandedStep(null);
    } else {
      setExpandedStep(index);
    }
  };

  // Each feature category showcases different Smart CRM capabilities
  const featureCategories = [
    {
      name: "Sales Acceleration",
      icon: <Cpu size={24} className="text-blue-400" />,
      features: ["Deal intelligence", "Sales playbooks", "Pipeline optimization", "Revenue forecasting"]
    },
    {
      name: "Customer Insights",
      icon: <Users size={24} className="text-purple-400" />,
      features: ["Relationship scoring", "Sentiment analysis", "Engagement tracking", "Churn prediction"]
    },
    {
      name: "Workflow Intelligence",
      icon: <Workflow size={24} className="text-green-400" />,
      features: ["Task prioritization", "Time optimization", "Meeting preparation", "Follow-up automation"]
    },
    {
      name: "Data Intelligence",
      icon: <Database size={24} className="text-amber-400" />,
      features: ["Data enrichment", "Lead scoring", "Contact management", "Account mapping"]
    }
  ];

  // Success metrics that illustrate results
  const successMetrics = [
    { value: "68%", label: "Less administrative work", icon: <Clock size={18} className="text-blue-400" /> },
    { value: "41%", label: "Higher win rates", icon: <ChevronRight size={18} className="text-green-400" /> },
    { value: "3.2x", label: "More customer touchpoints", icon: <Users size={18} className="text-purple-400" /> },
    { value: "57%", label: "Improved data accuracy", icon: <Check size={18} className="text-amber-400" /> }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/20 pointer-events-none" />
      
      {/* Animated floating icons themed for the how-it-works section */}
      <AnimatedIconsGroup 
        section="features" 
        iconCount={10}
        animations={['rotate', 'orbit', 'pulse']} 
        density="medium"
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" 
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" 
          animate={{ 
            x: [0, -20, 0],
            y: [0, 40, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 18,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <AnimatedElement animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How Smart CRM Works</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From implementation to transformative results in four intelligent steps
            </p>
          </AnimatedElement>
        </div>
        
        <div className="relative mb-20">
          {/* Enhanced Progress indicator with glow effect */}
          <div className="absolute top-32 left-0 right-0 h-2 bg-white/5 hidden md:block rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
              style={{ backgroundSize: "200% 200%" }}
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 0%"],
                width: `${((activeStep + 1) / steps.length) * 100}%` 
              }}
              transition={{ 
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                width: { duration: 0.5, ease: "easeInOut" }
              }}
            />
          </div>
          
          {steps.map((_, index) => (
            <motion.div 
              key={index}
              className="absolute hidden md:block"
              style={{ 
                left: `${(index / (steps.length - 1)) * 100}%`,
                top: "30px",
                transform: "translateX(-50%)"
              }}
            >
              <motion.div
                className={`relative w-10 h-10 rounded-full ${
                  activeStep >= index 
                    ? `bg-${steps[index].color}-600 text-white` 
                    : 'bg-white/10 text-white/60'
                } flex items-center justify-center text-lg font-bold z-10`}
                animate={
                  activeStep === index 
                    ? { 
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 0 10px rgba(59, 130, 246, 0.3)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      } 
                    : {}
                }
                transition={{ 
                  duration: 2, 
                  repeat: activeStep === index ? Infinity : 0,
                  repeatDelay: 1 
                }}
              >
                {steps[index].number}
                
                {activeStep === index && (
                  <motion.div 
                    className={`absolute inset-0 rounded-full bg-${steps[index].color}-500 opacity-50 blur-sm`}
                    animate={{ 
                      scale: [0.8, 1.5, 0.8],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <AnimatedElement key={index} animation="slideUp" delay={index * 0.2}>
                <motion.div 
                  className={`relative bg-white/5 backdrop-blur-md rounded-xl p-8 border ${
                    activeStep >= index ? `border-${step.color}-500/30` : 'border-white/10'
                  } text-center h-full`}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: `0 10px 30px -5px rgba(${
                      step.color === 'blue' ? '59, 130, 246' : 
                      step.color === 'purple' ? '139, 92, 246' : 
                      step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
                    }, 0.2)`,
                    borderColor: `rgba(${
                      step.color === 'blue' ? '59, 130, 246' : 
                      step.color === 'purple' ? '139, 92, 246' : 
                      step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
                    }, 0.4)`,
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setActiveStep(index);
                    toggleStepDetails(index);
                  }}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {/* Mobile-only step number */}
                  <div className="md:hidden mb-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                      activeStep >= index ? `bg-${step.color}-600` : 'bg-white/10'
                    } text-white text-sm font-bold`}>
                      {step.number}
                    </span>
                  </div>
                  
                  <div className="mt-4 mb-4 flex justify-center">
                    <motion.div
                      animate={activeStep === index ? step.animation : {}}
                      transition={{ duration: 3, repeat: activeStep === index ? Infinity : 0, repeatDelay: 1 }}
                      className={`p-3 rounded-xl ${activeStep === index ? `bg-${step.color}-500/30` : 'bg-white/10'}`}
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    className="text-xl font-semibold text-white mb-3"
                    animate={activeStep === index ? { 
                      color: [
                        "#ffffff", 
                        step.color === 'blue' ? "#60a5fa" : 
                        step.color === 'purple' ? "#a78bfa" : 
                        step.color === 'green' ? "#4ade80" : 
                        "#fbbf24", 
                        "#ffffff"
                      ] 
                    } : {}}
                    transition={{ duration: 3, repeat: activeStep === index ? Infinity : 0 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  <p className="text-white/70 mb-4">{step.description}</p>
                  
                  {expandedStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10 text-left"
                    >
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.3 }}
                          >
                            <motion.div 
                              className={`min-w-5 h-5 rounded-full bg-${step.color}-500/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0`}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                              <Check size={12} className={`text-${step.color}-400`} />
                            </motion.div>
                            <span className="text-white/80 text-sm">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <motion.div 
                        className={`w-full h-1 bg-${step.color}-500/30 rounded-full mt-4 overflow-hidden`}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                      >
                        <motion.div 
                          className={`h-full bg-${step.color}-500`}
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {expandedStep !== index && (
                    <motion.button
                      className={`mt-4 text-${step.color}-400 text-sm flex items-center justify-center mx-auto`}
                      whileHover={{ x: 3 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoverIndex === index || activeStep === index ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>See details</span>
                      <ChevronRight size={14} className="ml-1" />
                    </motion.button>
                  )}
                  
                  {/* Animated border effect when active */}
                  {activeStep === index && (
                    <>
                      <motion.div className="absolute -top-0.5 -bottom-0.5 -left-0.5 w-0.5 rounded-full" 
                        initial={{ height: 0, backgroundColor: `rgba(${
                          step.color === 'blue' ? '59, 130, 246' : 
                          step.color === 'purple' ? '139, 92, 246' : 
                          step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
                        }, 0.5)` }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div className="absolute -top-0.5 -right-0.5 w-0.5 rounded-full" 
                        initial={{ height: 0, backgroundColor: `rgba(${
                          step.color === 'blue' ? '59, 130, 246' : 
                          step.color === 'purple' ? '139, 92, 246' : 
                          step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
                        }, 0.5)` }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                      <motion.div className="absolute -top-0.5 -left-0.5 -right-0.5 h-0.5 rounded-full" 
                        initial={{ width: 0, backgroundColor: `rgba(${
                          step.color === 'blue' ? '59, 130, 246' : 
                          step.color === 'purple' ? '139, 92, 246' : 
                          step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
                        }, 0.5)` }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                      <motion.div className="absolute -bottom-0.5 -left-0.5 -right-0.5 h-0.5 rounded-full" 
                        initial={{ width: 0, backgroundColor: `rgba(${
                          step.color === 'blue' ? '59, 130, 246' : 
                          step.color === 'purple' ? '139, 92, 246' : 
                          step.color === 'green' ? '34, 197, 94' : '245, 158, 11'
                        }, 0.5)` }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </>
                  )}
                </motion.div>
              </AnimatedElement>
            ))}
          </div>
        </div>
        
        {/* New Feature Category Showcase */}
        <AnimatedElement animation="fadeIn" delay={0.4}>
          <div className="mb-20">
            <motion.div 
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8"
              whileHover={{ 
                borderColor: "rgba(59, 130, 246, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }}
            >
              <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl" />
                    <Sparkles className="text-blue-400 relative z-10" size={28} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white ml-3">Intelligent Features by Category</h3>
                </div>
                <p className="text-white/70 max-w-3xl mx-auto">
                  Smart CRM's AI-powered capabilities transform every aspect of customer relationship management, whether you're a solopreneur or managing a global team.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featureCategories.map((category, idx) => (
                  <motion.div 
                    key={idx}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                    whileHover={{ 
                      y: -10,
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {category.icon}
                    </motion.div>
                    
                    <h4 className="text-lg font-semibold text-white mb-3">{category.name}</h4>
                    
                    <ul className="space-y-2">
                      {category.features.map((feature, featureIdx) => (
                        <motion.li 
                          key={featureIdx}
                          className="flex items-center text-white/70 text-sm"
                          whileHover={{ x: 3 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (idx * 0.1) + (featureIdx * 0.05) + 0.5, duration: 0.3 }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"
                            whileHover={{ scale: 2 }}
                            transition={{ duration: 0.2 }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.button
                      className="mt-4 text-sm text-blue-400 flex items-center"
                      whileHover={{ x: 3 }}
                    >
                      Learn more
                      <ChevronRight size={14} className="ml-1" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
              
              {/* Feature Connection Lines (desktop only) */}
              <div className="hidden lg:block relative h-2 my-8">
                <motion.div 
                  className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px bg-white/20"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />
                
                <motion.div className="absolute left-1/4 top-0 w-px h-8 -mt-4 bg-white/20"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
                
                <motion.div className="absolute left-2/4 top-0 w-px h-8 -mt-4 bg-white/20"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />
                
                <motion.div className="absolute left-3/4 top-0 w-px h-8 -mt-4 bg-white/20"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                />
              </div>
              
              {/* Success Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {successMetrics.map((metric, idx) => (
                  <motion.div 
                    key={idx}
                    className="bg-white/5 backdrop-blur-md rounded-lg p-4 text-center"
                    whileHover={{ 
                      y: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ duration: 4, delay: idx, repeat: Infinity }}
                    >
                      {metric.icon}
                    </motion.div>
                    
                    <motion.div 
                      className="text-2xl font-bold text-white mb-1"
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, delay: idx * 0.2, repeat: Infinity, repeatDelay: 5 }}
                    >
                      {metric.value}
                    </motion.div>
                    <p className="text-white/60 text-xs">{metric.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </AnimatedElement>
        
        {/* Enhanced Implementation Support Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.6}>
            <div className="mb-10 relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-50"
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                style={{ backgroundSize: "200% 100%" }}
              />
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="md:w-1/2">
                    <div className="flex items-center justify-center md:justify-start mb-4">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl" />
                        <UserCheck className="text-blue-400 relative z-10" size={28} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white ml-3">Smart CRM Implementation</h3>
                    </div>
                    
                    <p className="text-white/80 text-lg mb-6">
                      Whether you're a solo entrepreneur or managing enterprise teams, our onboarding experts will ensure smooth implementation tailored to your specific needs.
                    </p>
                    
                    <div className="hidden md:block">
                      <motion.button 
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group"
                        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openSignupModal('early-access')}
                      >
                        <span>Get Smart CRM</span>
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          icon: <Palette size={20} className="text-purple-400" />,
                          title: "Personalized Setup",
                          description: "Custom configuration for your specific workflows"
                        },
                        {
                          icon: <Database size={20} className="text-green-400" />,
                          title: "Data Migration",
                          description: "Seamless import from your existing systems"
                        },
                        {
                          icon: <BookOpen size={20} className="text-amber-400" />,
                          title: "User Training",
                          description: "Comprehensive onboarding for your entire team"
                        },
                        {
                          icon: <Search size={20} className="text-blue-400" />,
                          title: "Ongoing Support",
                          description: "Dedicated success manager for your journey"
                        }
                      ].map((service, idx) => (
                        <motion.div 
                          key={idx}
                          className="bg-white/10 rounded-lg p-4 border border-white/10"
                          whileHover={{ 
                            y: -5, 
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            borderColor: "rgba(255, 255, 255, 0.3)"
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                        >
                          <motion.div
                            className="p-2 bg-white/10 rounded-lg inline-block mb-2"
                            whileHover={{ rotate: 15 }}
                          >
                            {service.icon}
                          </motion.div>
                          <h4 className="text-white font-medium text-sm">{service.title}</h4>
                          <p className="text-white/60 text-xs mt-1">{service.description}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Success rate indicator */}
                    <motion.div 
                      className="mt-4 bg-white/5 rounded-lg p-3 border border-white/10"
                      whileHover={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60 text-xs">Implementation success rate</span>
                        <span className="text-white font-medium text-sm">98%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: "98%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="md:hidden mt-6">
                  <motion.button 
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group w-full justify-center"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openSignupModal('early-access')}
                  >
                    <span>Register Now</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </AnimatedElement>
          
          {/* Testimonial Highlight */}
          <AnimatedElement animation="fadeIn" delay={0.8}>
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 max-w-3xl mx-auto border border-white/10"
              whileHover={{ 
                borderColor: "rgba(59, 130, 246, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }}
            >
              <div className="flex items-start">
                <motion.div
                  className="text-blue-500/20 transform -translate-y-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>
                <div className="ml-4">
                  <motion.p 
                    className="text-white/80 text-lg italic mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    "Smart CRM's implementation was the smoothest I've experienced in 15 years of sales leadership. Within two weeks, our entire team was up and running with full adoption—something I've never seen with other CRM platforms."
                  </motion.p>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      M
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">Michael Thompson</p>
                      <p className="text-white/60 text-sm">VP of Sales, TechInnovate Inc.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatedElement>

          {/* Final CTA Button */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <motion.button 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full shadow-lg font-bold text-lg group"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openSignupModal('early-access')}
            >
              <span>Transform Your Customer Relationships</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              >
                <ArrowRight className="ml-2 group-hover:translate-x-1" size={20} />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Additional icon components
const Palette = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const Database = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const BookOpen = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const Search = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserCheck = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const ChevronRight = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Sparkles = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const Check = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Cpu = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

export default HowItWorks;