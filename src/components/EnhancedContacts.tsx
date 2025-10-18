import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowRight, Contact, Database, Zap, CheckCircle, ExternalLink, Play, Search, Filter, Grid, User, Mail, Building, Phone, Tag, AlertTriangle, Clock, TrendingDown, UserMinus, X, Info, Activity, BarChart2, DollarSign, FileText, Shield, BrainCircuit, MessageSquare, BarChart3, Image } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import JVZooBuyButton from './JVZooBuyButton';
import { EMBED_URLS } from '../constants/embedUrls';

const EnhancedContacts: React.FC = () => {
  const [expandedStatCard, setExpandedStatCard] = useState<string | null>(null);
  const [hoveredProblem, setHoveredProblem] = useState<number | null>(null);

  const openInNewTab = () => {
    window.open(EMBED_URLS.contacts, '_blank');
  };

  const toggleStatCard = (cardId: string) => {
    if (expandedStatCard === cardId) {
      setExpandedStatCard(null);
    } else {
      setExpandedStatCard(cardId);
    }
  };

  return (
    <section id="enhanced-contacts" className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-black/80 pointer-events-none" />
      
      {/* Animated floating icons */}
      <AnimatedIconsGroup 
        section="features" 
        iconCount={12}
        animations={['pulse', 'rotate', 'bounce', 'orbit']} 
        density="medium"
      />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" 
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{
            duration: 12,
            delay: 1,
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
              <Contact className="text-blue-400 mr-2" size={18} />
              <span className="text-white font-medium">Contact Management Revolution</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">The Contact Management Problem</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Traditional contact management creates more busywork than business value. Smart CRM's Enhanced Contacts module changes everything.
            </p>
          </div>
        </AnimatedElement>

        {/* The Challenges of Traditional Contact Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <AnimatedElement animation="slideUp" delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">The Challenges of Traditional Contact Management</h3>
              
              {[
                {
                  icon: <Clock className="text-amber-400" size={24} />,
                  title: "Manual Data Entry Overload",
                  description: "Sales teams spend 2-3 hours daily updating contact records manually, reducing time for actual selling activities."
                },
                {
                  icon: <TrendingDown className="text-red-400" size={24} />,
                  title: "Outdated Information",
                  description: "Contact databases become stale within weeks, with 60% of business contact data becoming obsolete annually."
                },
                {
                  icon: <UserMinus className="text-orange-400" size={24} />,
                  title: "Lack of Relationship Intelligence",
                  description: "Traditional systems store data but provide no insights into relationship strength, engagement patterns, or optimal communication timing."
                }
              ].map((problem, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                  whileHover={{ 
                    y: -5,
                    backgroundColor: "rgba(255, 255, 255, 0.08)", 
                    borderColor: "rgba(255, 255, 255, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={() => setHoveredProblem(index)}
                  onHoverEnd={() => setHoveredProblem(null)}
                >
                  <div className="flex items-start">
                    <motion.div 
                      className="bg-amber-500/20 p-3 rounded-lg mr-4"
                      animate={hoveredProblem === index ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {problem.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{problem.title}</h4>
                      <p className="text-white/70">{problem.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="slideUp" delay={0.4}>
            <div className="bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-md rounded-xl p-8 border border-white/10 space-y-6">
              <div className="flex items-center mb-2">
                <AlertTriangle className="text-amber-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">The Real Problem: Contacts are Static, Not Smart</h3>
              </div>
              
              <p className="text-white/80 text-lg">
                Most contact management systems are glorified address books. They store information but provide no intelligence 
                about relationships, engagement patterns, or optimal interaction strategies.
              </p>
              
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-white font-medium mb-3">Why Traditional Contact Management Fails:</h4>
                <ul className="space-y-3">
                  {[
                    "Built for storage, not relationship intelligence",
                    "Requires constant manual updates and maintenance",
                    "No insights into communication effectiveness",
                    "Siloed data that doesn't connect across touchpoints",
                    "No predictive capabilities for relationship health"
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
                  <span>Smart CRM's Enhanced Contacts Approach:</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    "AI-powered contact intelligence with relationship scoring",
                    "Automatic data enrichment from multiple sources", 
                    "Real-time interaction tracking and analysis",
                    "Predictive insights for optimal engagement timing",
                    "360° relationship view with complete history"
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
                href="#enhanced-contacts-demo"
                className="inline-flex items-center text-blue-400 font-medium mt-4 group"
                whileHover={{ x: 5 }}
              >
                <span>See Smart CRM's Enhanced Contacts in action</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </motion.a>
            </div>
          </AnimatedElement>
        </div>

        {/* Contact Management Reality Statistics */}
        <AnimatedElement animation="fadeIn" delay={0.6}>
          <div className="text-center mb-12 max-w-5xl mx-auto relative">
            <InteractiveFloatingButton 
              text="Click Stats for Details" 
              position="top-right"
              color="amber"
              delay={1}
            />
            
            <h3 className="text-2xl font-semibold text-white mb-8 relative inline-block">
              The Contact Management Reality
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
                  id: "outdated-contacts",
                  value: "60%",
                  label: "of contact data becomes outdated within 12 months",
                  icon: <TrendingDown size={24} />,
                  color: "red",
                  details: [
                    "Business contacts change jobs every 18 months on average",
                    "Email addresses change or become inactive quarterly",
                    "Phone numbers and job titles frequently become obsolete",
                    "Outdated data leads to failed outreach and missed opportunities"
                  ]
                },
                {
                  id: "manual-updates",
                  value: "2.5hrs",
                  label: "spent weekly per sales rep on manual contact updates",
                  icon: <Clock size={24} />,
                  color: "red",
                  details: [
                    "Researching contact information takes 45 minutes daily",
                    "Updating CRM records manually consumes 30 minutes per day",
                    "Finding and organizing duplicate contacts wastes 20 minutes daily",
                    "Verifying contact accuracy requires 15 minutes of daily effort"
                  ]
                },
                {
                  id: "missed-opportunities",
                  value: "31%",
                  label: "of sales opportunities missed due to poor contact intelligence",
                  icon: <UserMinus size={24} />,
                  color: "red",
                  details: [
                    "Lack of relationship context leads to inappropriate outreach timing",
                    "Missing decision-maker information delays deal progression",
                    "No engagement scoring results in pursuing uninterested prospects",
                    "Poor contact segmentation reduces campaign effectiveness by 40%"
                  ]
                }
              ].map((stat, idx) => (
                <motion.div 
                  key={stat.id}
                  className={`bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-${stat.color}-500/30 cursor-pointer relative`}
                  onClick={() => toggleStatCard(stat.id)}
                  whileHover={{ 
                    y: -8,
                    backgroundColor: "rgba(255, 255, 255, 0.08)", 
                    borderColor: `rgba(${stat.color === "red" ? "239, 68, 68" : "59, 130, 246"}, 0.4)`
                  }}
                  layoutId={`stat-card-container-${stat.id}`}
                >
                  <motion.div className="p-6" layoutId={`stat-card-content-${stat.id}`}>
                    <motion.div 
                      className={`h-12 w-12 rounded-full bg-${stat.color}-500/20 flex items-center justify-center mx-auto mb-4`}
                      layoutId={`stat-card-icon-${stat.id}`}
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
                      layoutId={`stat-card-value-${stat.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      {stat.value}
                    </motion.span>
                    
                    <motion.span 
                      className="text-white/70 text-sm"
                      layoutId={`stat-card-label-${stat.id}`}
                    >
                      {stat.label}
                    </motion.span>
                    
                    <motion.div
                      className="mt-3 text-blue-400 text-sm flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <span>{expandedStatCard === stat.id ? "Show less" : "Learn more"}</span>
                      <motion.div
                        animate={expandedStatCard === stat.id ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={14} className="ml-1" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  
                  <AnimatePresence>
                    {expandedStatCard === stat.id && (
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
          </div>
        </AnimatedElement>

        {/* Traditional vs Smart CRM Contact Management Comparison */}
        <AnimatedElement animation="fadeIn" delay={0.8}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-12 relative">
            <InteractiveFloatingButton 
              text="Compare Solutions" 
              position="top-right"
              color="green"
              delay={2}
            />
            
            <h4 className="text-xl font-semibold text-white mb-6 text-center">Traditional Contact Management vs Smart CRM Enhanced Contacts</h4>
            
            <div className="relative mb-8">
              {/* Connection Line */}
              <div className="hidden md:block absolute left-[50%] top-10 bottom-0 w-px bg-white/10" />
              
              {[
                {
                  traditional: "Manual contact updates require 15+ minutes per record",
                  smart: "AI automatically enriches contacts with 200+ data points in seconds",
                  traditionalIcon: <Clock size={20} className="text-red-400" />,
                  smartIcon: <Zap size={20} className="text-green-400" />
                },
                {
                  traditional: "No relationship intelligence or engagement insights",
                  smart: "AI relationship scoring with engagement pattern analysis",
                  traditionalIcon: <Database size={20} className="text-red-400" />,
                  smartIcon: <Activity size={20} className="text-green-400" />
                },
                {
                  traditional: "Static contact records with no predictive capabilities",
                  smart: "Predictive contact intelligence with next-best-action recommendations",
                  traditionalIcon: <UserMinus size={20} className="text-red-400" />,
                  smartIcon: <CheckCircle size={20} className="text-green-400" />
                },
                {
                  traditional: "Duplicate contacts create confusion and wasted effort",
                  smart: "Intelligent duplicate detection and automatic contact merging",
                  traditionalIcon: <X size={20} className="text-red-400" />,
                  smartIcon: <Shield size={20} className="text-green-400" />
                }
              ].map((comparison, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative">
                  {/* Left Side: Traditional Contact Management */}
                  <motion.div 
                    className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-red-500/20"
                    whileHover={{ x: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <div className="flex items-start">
                      <div className="p-2 bg-red-500/20 rounded-lg mr-3 flex-shrink-0">
                        {comparison.traditionalIcon}
                      </div>
                      <div className="flex-1">
                        <h5 className="text-white text-md font-medium mb-1">Traditional System</h5>
                        <p className="text-white/70 text-sm">{comparison.traditional}</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Connection Dot */}
                  <div className="hidden md:block absolute left-[50%] top-8 w-4 h-4 rounded-full bg-white/10 transform -translate-x-1/2" />
                  
                  {/* Right Side: Smart CRM Enhanced Contacts */}
                  <motion.div 
                    className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-green-500/20"
                    whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx + 0.1 }}
                  >
                    <div className="flex items-start">
                      <div className="p-2 bg-green-500/20 rounded-lg mr-3 flex-shrink-0">
                        {comparison.smartIcon}
                      </div>
                      <div className="flex-1">
                        <h5 className="text-white text-md font-medium mb-1">Smart CRM Enhanced Contacts</h5>
                        <p className="text-white/70 text-sm">{comparison.smart}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>

        {/* ROI Impact Visualization */}
        <AnimatedElement animation="fadeIn" delay={1.0}>
          <motion.div 
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-500/30 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium text-white mb-4 text-center">Real Business Impact with Enhanced Contacts</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { value: "+73%", label: "Contact Data Accuracy", color: "green" },
                { value: "-68%", label: "Manual Update Time", color: "blue" },
                { value: "+45%", label: "Lead Response Rates", color: "purple" },
                { value: "4.2x", label: "Relationship Intelligence", color: "amber" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/10 rounded-lg p-4 text-center"
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
        </AnimatedElement>

        {/* Enhanced Contacts Features Grid */}
        <AnimatedElement animation="fadeIn" delay={1.2}>
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Smart CRM Contacts Module: Key Features</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { // Card 1: AI-Powered Contact Intelligence
                  icon: <BrainCircuit className="text-blue-400" size={32} />,
                  title: "AI-Powered Contact Intelligence",
                  description: "Transform raw contact data into actionable insights with multi-model AI analysis and real-time web research.",
                  features: ["Advanced Contact Scoring", "Intelligent Contact Enrichment", "Smart Categorization", "Relationship Mapping", "Bulk Analysis"]
                },
                { // Card 2: AI Communication & Content Tools
                  icon: <MessageSquare className="text-purple-400" size={32} />,
                  title: "AI Communication & Content Tools",
                  description: "Streamline and optimize all forms of communication and content creation with AI-driven assistance.",
                  features: ["AI Email Composer", "Smart Social Messaging", "Objection Handler", "Subject Line Generator", "Meeting Summary Generator", "Communication Optimizer"]
                },
                { // Card 3: AI Sales & Deal Intelligence
                  icon: <BarChart3 className="text-green-400" size={32} />,
                  title: "AI Sales & Deal Intelligence",
                  description: "Accelerate sales cycles and improve forecasting accuracy with AI-powered strategies and real-time deal analysis.",
                  features: ["Live Deal Analysis", "Adaptive Playbook Generator", "Discovery Questions Generator", "Sales Forecasting"]
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 h-full"
                  whileHover={{ 
                    y: -10, 
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(255, 255, 255, 0.3)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                > 
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 mx-auto"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 text-center">{feature.title}</h3>
                  <p className="text-white/70 mb-4 text-center">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.features.map((featureItem, idx) => (
                      <motion.div 
                        key={idx}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx + 0.5 }}
                        whileHover={{ x: 3 }}
                      >
                        <CheckCircle size={14} className="text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{featureItem}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Gemini AI Image Generation Section */}
            <motion.div
              className="mt-12 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl p-6 border border-blue-500/30"
              whileHover={{ 
                y: -5, 
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(59, 130, 246, 0.3)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-start">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 mr-4 flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Image className="text-amber-400" size={32} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Gemini AI Image Generation with Smart Branding</h3>
                  <p className="text-white/70 mb-4">Generate personalized visuals for contact outreach, profile pictures, or marketing materials directly within SmartCRM, powered by Gemini 2.5 Flash.</p>
                  <div className="space-y-2">
                    {[
                      "SmartCRM Prompt Templates",
                      "Advanced Image Generation",
                      "Supabase Storage Integration (with thumbnails)",
                      "Saved Images Gallery",
                      "History Management",
                      "Smart Branding"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center text-white/80 text-sm">
                        <CheckCircle size={14} className="text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedElement>

        {/* Interactive Demo Container */}
        <AnimatedElement animation="scale" delay={1.4}>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative" id="enhanced-contacts-demo">
            <InteractiveFloatingButton 
              text="Try Interactive Demo" 
              position="top-right"
              color="blue"
              delay={1}
            />

            {/* Contact Card Enhancements */}
            <p className="text-white/80 text-lg mb-6 max-w-3xl mx-auto text-center">
              Experience enhanced contact cards with: <span className="font-medium text-blue-400">AI Score Display</span> (color-coded), <span className="font-medium text-purple-400">Interest Level Tracking</span> (Hot/Medium/Low/Cold), <span className="font-medium text-green-400">Source Tracking</span> (visual badges), <span className="font-medium text-amber-400">Customizable AI Toolbar</span>, and <span className="font-medium text-red-400">Quick Actions</span> (Email, Call, View).
            </p>

            {/* Contact Detail View Features */}
            <p className="text-white/80 text-lg mb-6 max-w-3xl mx-auto text-center">
              The Contact Detail View now features <span className="font-medium text-blue-400">8 specialized tabs</span> for a 360-degree understanding of your contacts: <span className="font-medium text-white">Overview, Journey, Analytics, Communication, Automation, Sales Intelligence, AI Insights, and Email.</span>
            </p>




            
            {/* Demo Header */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 border-b border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Live Enhanced Contacts Demo</h3>
                  <p className="text-white/70">
                    Experience Smart CRM's Enhanced Contacts module with AI-powered contact intelligence, 
                    automated enrichment, and real-time collaboration features.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center font-medium shadow-lg"
                    onClick={openInNewTab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} className="mr-2" />
                    Launch Live Demo
                  </motion.button>
                  
                  <JVZooBuyButton>
                    <motion.button
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight size={18} className="mr-2" />
                      Get Smart CRM - $97
                    </motion.button>
                  </JVZooBuyButton>
                </div>
              </div>
            </div>

            {/* Interactive Demo Preview */}
            <div className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-blue-900/80 to-purple-900/80 overflow-hidden">
              {/* Mock CRM Interface */}
              <div className="absolute inset-0 p-6">
                {/* Header Bar */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Contact className="text-blue-400 mr-3" size={24} />
                      <h4 className="text-white font-bold text-lg">Enhanced Contacts</h4>
                      <motion.div
                        className="ml-3 px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-400"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        AI-Powered
                      </motion.div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-white/10 rounded-lg px-3 py-1.5">
                        <Search size={16} className="text-white/60 mr-2" />
                        <span className="text-white/60 text-sm">Search contacts...</span>
                      </div>
                      <Filter className="text-white/60" size={18} />
                      <Grid className="text-blue-400" size={18} />
                    </div>
                  </div>
                </div>
                
                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "VP of Sales",
                      company: "TechGrowth Inc.", 
                      email: "sarah@techgrowth.com",
                      phone: "+1 (555) 234-5678",
                      score: 95,
                      tags: ["Hot Lead", "Enterprise"],
                      lastContact: "2 days ago",
                      color: "green"
                    },
                    {
                      name: "Marcus Chen",
                      role: "Sales Director", 
                      company: "Innovate Solutions",
                      email: "marcus@innovatesol.com",
                      phone: "+1 (555) 345-6789",
                      score: 87,
                      tags: ["Qualified", "Follow-up"],
                      lastContact: "1 week ago",
                      color: "yellow"
                    },
                    {
                      name: "Priya Patel",
                      role: "Customer Success",
                      company: "GlobalServe",
                      email: "priya@globalserve.com", 
                      phone: "+1 (555) 456-7890",
                      score: 78,
                      tags: ["Customer", "Renewal"],
                      lastContact: "Today",
                      color: "blue"
                    },
                    {
                      name: "James Williams",
                      role: "CRO",
                      company: "FastGrow Enterprises",
                      email: "james@fastgrow.com",
                      phone: "+1 (555) 567-8901", 
                      score: 92,
                      tags: ["Decision Maker", "Priority"],
                      lastContact: "3 days ago",
                      color: "green"
                    },
                    {
                      name: "Emma Rodriguez",
                      role: "Sales Operations",
                      company: "NexGen Services",
                      email: "emma@nexgen.com",
                      phone: "+1 (555) 678-9012",
                      score: 84,
                      tags: ["Prospect", "Demo Scheduled"],
                      lastContact: "5 days ago",
                      color: "yellow"
                    },
                    {
                      name: "Michael Weber",
                      role: "Business Development",
                      company: "MediCare Solutions",
                      email: "michael@medicare.com",
                      phone: "+1 (555) 789-0123",
                      score: 89,
                      tags: ["Healthcare", "Compliance"],
                      lastContact: "1 day ago",
                      color: "green"
                    }
                  ].map((contact, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 cursor-pointer"
                      whileHover={{ 
                        y: -5, 
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderColor: "rgba(59, 130, 246, 0.4)"
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.5 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">{contact.name}</h5>
                            <p className="text-white/60 text-xs">{contact.role}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          contact.score >= 90 ? 'bg-green-500/20 text-green-400' :
                          contact.score >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {contact.score}%
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center text-white/60 text-xs">
                          <Building size={12} className="mr-2" />
                          <span>{contact.company}</span>
                        </div>
                        <div className="flex items-center text-white/60 text-xs">
                          <Mail size={12} className="mr-2" />
                          <span>{contact.email}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {contact.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="bg-white/20 text-white/80 text-[10px] px-1.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-white/50 text-xs">
                        Last contact: {contact.lastContact}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Overlay with CTA */}
              <motion.div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-blue-600/80 flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play size={36} className="text-white ml-1" />
                  </motion.div>
                  
                  <h4 className="text-2xl font-bold text-white mb-3">
                    Experience the Full Enhanced Contacts Module
                  </h4>
                  <p className="text-white/80 mb-6 max-w-md">
                    Click below to explore the complete Enhanced Contacts module with all interactive features, 
                    AI-powered search, and real-time collaboration tools.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.button
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center font-medium shadow-lg"
                      onClick={openInNewTab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} className="mr-2" />
                      Launch Interactive Demo
                    </motion.button>
                    
                    <JVZooBuyButton>
                      <motion.button
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight size={18} className="mr-2" />
                        Get Smart CRM - $97
                      </motion.button>
                    </JVZooBuyButton>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Demo Footer */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="text-green-400" size={16} />
                  </motion.div>
                  <div>
                    <p className="text-white font-medium text-sm">Live Demo Available</p>
                    <p className="text-white/60 text-xs">Click "Launch Interactive Demo" to interact with all features</p>
                  </div>
                </div>
                
                <div className="flex items-center text-white/60 text-xs">
                  <Database className="mr-2" size={14} />
                  <span>Powered by Smart CRM's Enhanced Contacts Engine</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Final Call to Action */}
        <AnimatedElement animation="fadeIn" delay={1.6}>
          <div className="text-center mt-16">
            <p className="text-white/80 text-lg mb-6">
              Transform your contact management from a static database into an intelligent relationship hub.
            </p>
            
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <JVZooBuyButton>
                <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group">
                  <span>Get Smart CRM - $97</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </JVZooBuyButton>
            </motion.div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default EnhancedContacts;