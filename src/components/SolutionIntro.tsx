import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, ArrowRight, Zap, Shield, BarChart, Users, Clock, Mail, BrainCircuit, Calendar, Workflow, Cloud, Check } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import { SignupContext } from '../App';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import JVZooBuyButton from './JVZooBuyButton';
import JVZooNoThanksButton from './JVZooNoThanksButton';

// Define detailed information for each CRM option
interface CrmOptionDetail {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  stats: { value: string; label: string }[];
  relatedFeatures: string[];
}

const crmOptionDetails: Record<string, CrmOptionDetail> = {
  "Reduce manual data entry": {
    icon: <Zap className="text-blue-400" />,
    title: "AI-Powered Data Automation",
    description: "Smart CRM's AI automatically captures and organizes customer data from emails, calls, and meetings, freeing your team from repetitive data entry.",
    benefits: [
      "Automatic email and calendar sync",
      "Meeting transcription and summarization",
      "Intelligent data extraction from documents",
      "Automated contact enrichment"
    ],
    stats: [
      { value: "70%", label: "Reduction in manual data entry" },
      { value: "15hrs", label: "Saved per rep each week" },
      { value: "99.8%", label: "Data accuracy rate" }
    ],
    relatedFeatures: ["Email Intelligence", "Smart Capture", "Meeting Assistant"]
  },
  "Improve sales forecasting": {
    icon: <BarChart className="text-purple-400" />,
    title: "Predictive Sales Forecasting",
    description: "Leverage AI-powered analytics to predict sales outcomes with unprecedented accuracy, helping you make data-driven decisions with confidence.",
    benefits: [
      "ML-based deal probability scoring",
      "Dynamic forecast adjustments",
      "Historical pattern recognition",
      "Multiple forecast scenarios"
    ],
    stats: [
      { value: "92%", label: "Forecast accuracy" },
      { value: "3.5x", label: "More reliable projections" },
      { value: "28%", label: "Reduction in forecast variance" }
    ],
    relatedFeatures: ["Revenue Intelligence", "Prediction Engine", "Pipeline Analytics"]
  },
  "Enhance customer insights": {
    icon: <BrainCircuit className="text-green-400" />,
    title: "360° Customer Intelligence",
    description: "Gain a complete understanding of your customers through AI-analyzed relationship patterns, sentiment trends, and behavioral insights.",
    benefits: [
      "Relationship strength scoring",
      "Sentiment analysis across communications",
      "Purchase pattern identification",
      "Next-best-action recommendations"
    ],
    stats: [
      { value: "42%", label: "Increase in customer retention" },
      { value: "3.2x", label: "Higher upsell/cross-sell rates" },
      { value: "67%", label: "Better customer need identification" }
    ],
    relatedFeatures: ["Relationship Intelligence", "Sentiment Analysis", "Customer Journey Mapping"]
  },
  "Boost team adoption": {
    icon: <Users className="text-amber-400" />,
    title: "Intuitive User Experience",
    description: "Smart CRM's intuitive design and personalized workflows make adoption effortless, ensuring your entire team embraces the platform from day one.",
    benefits: [
      "Role-based personalized interfaces",
      "Interactive onboarding guides",
      "Minimal training requirements",
      "Customizable user experiences"
    ],
    stats: [
      { value: "94%", label: "User adoption rate" },
      { value: "<1hr", label: "Average training time needed" },
      { value: "89%", label: "Users report improved productivity" }
    ],
    relatedFeatures: ["Smart Workflows", "Guided Onboarding", "Personalized Dashboards"]
  },
  "Integrate with existing tools": {
    icon: <Cloud className="text-blue-400" />,
    title: "Seamless Integrations",
    description: "Connect Smart CRM with your existing tech stack through our extensive integration marketplace and powerful API, creating a unified workflow ecosystem.",
    benefits: [
      "Two-way data synchronization",
      "No-code integration builder",
      "Pre-built connectors for popular tools",
      "Custom API access"
    ],
    stats: [
      { value: "150+", label: "Pre-built integrations" },
      { value: "100%", label: "API coverage" },
      { value: "5min", label: "Average integration setup time" }
    ],
    relatedFeatures: ["Integration Marketplace", "Workflow Connectors", "API Platform"]
  },
  "Increase close rates": {
    icon: <Clock className="text-green-400" />,
    title: "Sales Acceleration",
    description: "Accelerate your sales cycle with AI-guided selling, automated follow-ups, and intelligent opportunity management to close more deals faster.",
    benefits: [
      "AI-powered deal coaching",
      "Automated follow-up sequences",
      "Competitive intelligence",
      "Sales playbook automation"
    ],
    stats: [
      { value: "29%", label: "Higher win rates" },
      { value: "38%", label: "Faster sales cycles" },
      { value: "41%", label: "Increase in deal size" }
    ],
    relatedFeatures: ["Deal Intelligence", "Smart Sequences", "Guided Selling"]
  }
};

const SolutionIntro: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>([]);
  const [showDetailedContent, setShowDetailedContent] = useState(false);
  const { openSignupModal } = useContext(SignupContext);

  const lookingForOptions = [
    "Reduce manual data entry",
    "Improve sales forecasting",
    "Enhance customer insights",
    "Boost team adoption",
    "Integrate with existing tools",
    "Increase close rates"
  ];

  const toggleLookingFor = (option: string) => {
    if (selectedLookingFor.includes(option)) {
      setSelectedLookingFor(prev => prev.filter(item => item !== option));
    } else {
      setSelectedLookingFor(prev => [...prev, option]);
    }

    // Show detailed content when at least one option is selected
    setShowDetailedContent(true);
  };

  // Calculate how many options are showing detailed content
  const activeOptionsCount = selectedLookingFor.length;

  return (
    <section id="solution" className="py-20 px-4 relative bg-gradient-to-b from-blue-950/70 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 9,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Animated floating icons themed for solution section */}
      <AnimatedIconsGroup 
        section="features" 
        iconCount={12} 
        animations={['bounce', 'pulse', 'rotate', 'orbit']} 
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center bg-blue-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-md border border-blue-500/30"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                borderColor: "rgba(59, 130, 246, 0.4)"
              }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="text-blue-400 mr-2" size={18} />
              <span className="text-white font-medium">Introducing Smart CRM</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              The Intelligent Solution Your Team Deserves
            </motion.h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Smart CRM revolutionizes how your team connects with customers through AI-powered insights, 
              seamless integrations, and workflow automation that actually works.
            </p>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Zap className="text-blue-400" size={32} />,
              title: "70% Less Data Entry",
              description: "Automatic logging of emails, calls, and meetings so your team can focus on building relationships."
            },
            {
              icon: <BrainCircuit className="text-purple-400" size={32} />,
              title: "AI-Powered Insights",
              description: "Predictive intelligence that helps you understand customer needs before they even express them."
            },
            {
              icon: <Shield className="text-green-400" size={32} />,
              title: "Enterprise Security",
              description: "SOC 2 compliance, end-to-end encryption, and advanced security controls to protect your data."
            }
          ].map((card, idx) => (
            <AnimatedElement key={idx} animation="slideUp" delay={0.2 + (idx * 0.2)}>
              <motion.div 
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center h-full relative overflow-hidden"
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)",
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredCard(idx)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Add glow effect when hovered */}
                {hoveredCard === idx && (
                  <motion.div 
                    className="absolute inset-0 bg-blue-600/5 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.5, 0],
                      scale: [0.8, 1.1, 1]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
                
                <motion.div 
                  className="inline-flex items-center justify-center p-3 bg-white/10 rounded-lg mb-4"
                  whileHover={{ scale: 1.1 }}
                  animate={hoveredCard === idx ? { 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-white/70">{card.description}</p>
                
                {/* Add reveal effect when hovered */}
                <motion.div
                  className="mt-4 pt-4 border-t border-white/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={hoveredCard === idx ? {
                    opacity: 1,
                    height: 'auto'
                  } : {
                    opacity: 0,
                    height: 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <JVZooBuyButton className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full inline-block text-center">
                    Get Smart CRM
                  </JVZooBuyButton>
                </motion.div>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>
        
        {/* Enhanced Interactive "What are you looking for" section */}
        <AnimatedElement animation="fadeIn" delay={0.7}>
          <motion.div
            className="mb-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 relative overflow-hidden"
            whileHover={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
          >
            <InteractiveFloatingButton 
              text="Select Your Needs" 
              position="top-right"
              color="purple"
            />
            
            {/* Background elements */}
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <h3 className="text-xl font-semibold text-white mb-5 text-center relative z-10">
              What are you looking for in a CRM?
              <motion.div 
                className="w-24 h-1 bg-blue-500 mx-auto rounded-full mt-3"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 1 }}
              />
            </h3>
            
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {lookingForOptions.map((option, idx) => (
                <motion.button
                  key={idx}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    selectedLookingFor.includes(option)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => toggleLookingFor(option)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <span className="flex items-center">
                    {selectedLookingFor.includes(option) && <Check size={14} className="mr-1" />}
                    {option}
                  </span>
                </motion.button>
              ))}
            </div>
            
            <AnimatePresence>
              {selectedLookingFor.length > 0 && showDetailedContent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-t border-white/10 pt-6"
                >
                  {/* Custom recommendation message based on selections */}
                  <div className="text-center mb-6">
                    <motion.div 
                      className="inline-flex items-center gap-2 mb-2"
                      animate={{ 
                        scale: [1, 1.03, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="text-blue-400" size={18} />
                      <h4 className="text-xl font-semibold text-white">
                        {activeOptionsCount > 3 
                          ? "Smart CRM is Perfect for Your Needs!" 
                          : activeOptionsCount > 1 
                            ? "Smart CRM is Ideal for Your Requirements" 
                            : "Smart CRM Addresses Your Need"}
                      </h4>
                    </motion.div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                      {activeOptionsCount > 3 
                        ? "You've identified multiple key needs that Smart CRM was specifically designed to address. Our comprehensive platform excels in these areas:"
                        : activeOptionsCount > 1 
                          ? "Based on your selections, Smart CRM offers powerful capabilities that address these specific needs:"
                          : "Based on your selection, here's how Smart CRM can help:"}
                    </p>
                  </div>

                  {/* Detailed content for selected options */}
                  <div className={`grid grid-cols-1 ${activeOptionsCount > 2 ? 'md:grid-cols-2' : ''} gap-6 mb-6 relative`}>
                    <InteractiveFloatingButton 
                      text="Hover for Stats" 
                      position="top-right"
                      color="green"
                      delay={2}
                      size="small"
                    />
                    
                    {selectedLookingFor.map((option, index) => {
                      const details = crmOptionDetails[option];
                      return (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-br from-black to-blue-900/10 backdrop-blur-md rounded-xl p-5 border border-blue-500/20 relative overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          layoutId={`option-details-${option}`}
                        >
                          {/* Background glow effect */}
                          <motion.div 
                            className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" 
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          
                          <div className="flex items-start gap-4">
                            <motion.div 
                              className="p-3 rounded-lg bg-blue-500/20 flex-shrink-0"
                              animate={{ 
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                            >
                              {details.icon}
                            </motion.div>
                            
                            <div>
                              <h5 className="text-lg font-semibold text-white mb-2">{details.title}</h5>
                              <p className="text-white/70 text-sm mb-4">{details.description}</p>
                              
                              <div className="mb-4">
                                <h6 className="text-blue-400 text-sm font-medium mb-2">Key Benefits:</h6>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {details.benefits.map((benefit, idx) => (
                                    <motion.div 
                                      key={idx} 
                                      className="flex items-start"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.3 + idx * 0.1 }}
                                    >
                                      <Check size={14} className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                                      <span className="text-white/80 text-sm">{benefit}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-3 mb-4">
                                {details.stats.map((stat, idx) => (
                                  <motion.div 
                                    key={idx}
                                    className="bg-white/10 rounded-lg px-3 py-2 text-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + idx * 0.1 }}
                                  >
                                    <motion.p 
                                      className="text-xl font-bold text-blue-400"
                                      animate={{ 
                                        scale: [1, 1.1, 1],
                                      }}
                                      transition={{ duration: 2, delay: idx, repeat: Infinity, repeatDelay: 4 }}
                                    >
                                      {stat.value}
                                    </motion.p>
                                    <p className="text-white/60 text-xs">{stat.label}</p>
                                  </motion.div>
                                ))}
                              </div>
                              
                              <div>
                                <h6 className="text-blue-400 text-xs font-medium mb-2">Related Features:</h6>
                                <div className="flex flex-wrap gap-2">
                                  {details.relatedFeatures.map((feature, idx) => (
                                    <motion.span 
                                      key={idx}
                                      className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.7 + idx * 0.1 }}
                                      whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                                    >
                                      {feature}
                                    </motion.span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Custom recommendation section */}
                  <motion.div
                    className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-xl font-semibold text-white mb-3">Your Personalized Smart CRM Solution</h4>
                    
                    <p className="text-white/80 mb-6">
                      {selectedLookingFor.length === 1 
                        ? `Based on your interest in ${selectedLookingFor[0].toLowerCase()}, we've crafted a solution that focuses on ${crmOptionDetails[selectedLookingFor[0]].title.toLowerCase()}.` 
                        : `Based on your priorities, we've designed a Smart CRM solution that combines ${selectedLookingFor.length} powerful capabilities to transform your customer relationships.`}
                    </p>
                    
                    <div className="flex justify-center mb-6 flex-wrap gap-3">
                      {selectedLookingFor.map((option, idx) => (
                        <motion.div 
                          key={idx}
                          className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 flex items-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                        >
                          {crmOptionDetails[option].icon}
                          <span className="ml-2 text-white text-sm">{option}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mb-6">
                      <motion.div
                        className="relative h-2.5 bg-white/10 rounded-full overflow-hidden w-full max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${Math.min(100, selectedLookingFor.length * 20)}%` }}
                          transition={{ delay: 0.8, duration: 1 }}
                        />
                      </motion.div>
                      <p className="text-white/60 text-xs mt-2">
                        {selectedLookingFor.length < 3 
                          ? "Add more selections to see our full range of capabilities" 
                          : selectedLookingFor.length < 5 
                            ? "Great selection! Your solution is taking shape" 
                            : "Perfect match! Smart CRM addresses all your needs"}
                      </p>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <JVZooBuyButton>
                        <motion.button
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium"
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                        >
                          Get Smart CRM
                        </motion.button>
                      </JVZooBuyButton>
                      <p className="text-white/60 text-sm mt-3">
                        See how Smart CRM addresses
                        {selectedLookingFor.length > 1
                          ? ` all ${selectedLookingFor.length} of your priorities`
                          : ` your ${selectedLookingFor[0].toLowerCase()} need`}
                        in a personalized demonstration
                      </p>
                      <div className="mt-3">
                        <JVZooNoThanksButton />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatedElement>
        
        <AnimatedElement animation="fadeIn" delay={0.8}>
          <div className="text-center">
            <motion.a 
              href="#how-it-works" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg font-medium">See how it works</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </motion.a>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default SolutionIntro;