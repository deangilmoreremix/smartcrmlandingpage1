import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BrainCircuit, Mail, MessageSquare, Search, Star, ArrowRight, CheckCircle, ExternalLink, Zap, X, Settings, Lightbulb, Target, TrendingDown, UserMinus, Clock, Info, Database, TrendingUp, Brain } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import CollapsibleSection from './CollapsibleSection';
import CRMGoalsAnimation from './CRMGoalsAnimation';

const ContactsEmbedSection: React.FC = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showEmbed, setShowEmbed] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const contactsFeatures = [
    {
      title: "AI Contact Scoring",
      description: "Multi-model scoring system with GPT-5 + Gemini for 0-100 scale intelligence",
      icon: <BrainCircuit className="text-blue-400" size={24} />,
      benefits: [
        "Behavioral insights and communication preferences",
        "Psychological profiles and risk tolerance analysis",
        "Relationship mapping and influence strength",
        "Real-time scoring updates and recommendations"
      ]
    },
    {
      title: "Smart Enrichment",
      description: "Automatically fill gaps in contact data with AI-powered research",
      icon: <Search className="text-purple-400" size={24} />,
      benefits: [
        "Web and news research integration",
        "LinkedIn and social profile discovery",
        "Market trend content and competitive intelligence",
        "Citation badges with source verification"
      ]
    },
    {
      title: "Communication Tools",
      description: "AI-powered email composers and social messaging generators",
      icon: <Mail className="text-green-400" size={24} />,
      benefits: [
        "Context-aware email drafts with tone options",
        "Social message generator for LinkedIn and WhatsApp",
        "Objection handler with 50+ common responses",
        "Subject line optimizer with A/B testing"
      ]
    },
    {
      title: "Bulk Processing",
      description: "Process hundreds of contacts simultaneously with AI analysis",
      icon: <Users className="text-amber-400" size={24} />,
      benefits: [
        "CSV/JSON import with validation and error reports",
        "Bulk scoring and enrichment operations",
        "Automated tagging and segmentation",
        "Batch communication campaigns"
      ]
    }
  ];

  const contactStats = [
    { value: "10,000+", label: "Contacts analyzed daily", icon: <Users size={18} className="text-blue-400" /> },
    { value: "95%", label: "Data accuracy rate", icon: <CheckCircle size={18} className="text-green-400" /> },
    { value: "3.5x", label: "Faster lead qualification", icon: <Zap size={18} className="text-purple-400" /> },
    { value: "89%", label: "User satisfaction", icon: <Star size={18} className="text-amber-400" /> }
  ];

  const contactsGoals = [
    {
      id: "reduce-manual-data",
      title: "Reduce Manual Data Entry",
      icon: <Database className="text-blue-400" size={24} />,
      description: "SmartCRM eliminates 70% of manual data entry with AI-powered automation",
      primaryColor: "blue",
      features: [
        "AI Auto-Enrichment from web research",
        "Smart data capture and validation",
        "Automated workflow triggers",
        "Bulk processing and imports"
      ],
      benefits: [
        "Save 2.5 hours weekly per rep",
        "95% data accuracy improvement",
        "Reduced human error",
        "Focus on selling, not data entry"
      ]
    },
    {
      id: "enhance-insights",
      title: "Enhance Customer Insights",
      icon: <Brain className="text-purple-400" size={24} />,
      description: "360° customer intelligence with AI relationship mapping",
      primaryColor: "purple",
      features: [
        "Relationship intelligence scoring",
        "Behavioral analysis tracking",
        "Communication pattern insights",
        "Automated customer profiling"
      ],
      benefits: [
        "3.5x more effective interactions",
        "Better customer retention",
        "Personalized engagement",
        "Predictive churn prevention"
      ]
    },
    {
      id: "boost-adoption",
      title: "Boost Team Adoption",
      icon: <Users className="text-amber-400" size={24} />,
      description: "94% adoption rate with intuitive design and gamification",
      primaryColor: "amber",
      features: [
        "Intuitive drag-and-drop interface",
        "Gamification and leaderboards",
        "Mobile-optimized experience",
        "Smart onboarding tutorials"
      ],
      benefits: [
        "94% user adoption rate",
        "Faster team ramp-up",
        "Higher user satisfaction",
        "Reduced training costs"
      ]
    },
    {
      id: "improve-organization",
      title: "Improve Contact Organization",
      icon: <Search className="text-green-400" size={24} />,
      description: "Advanced organization and search capabilities for better contact management",
      primaryColor: "green",
      features: [
        "Advanced search and filtering",
        "Smart tagging and categorization",
        "Duplicate detection and merging",
        "Custom fields and segmentation"
      ],
      benefits: [
        "Find contacts instantly",
        "Eliminate duplicate entries",
        "Better lead segmentation",
        "Improved data organization"
      ]
    }
  ];

  return (
    <section id="contacts" className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/20 pointer-events-none" />

      {/* Animated floating icons */}
      <AnimatedIconsGroup
        section="ai"
        iconCount={10}
        animations={['bounce', 'pulse', 'rotate', 'orbit']}
      />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center bg-purple-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-md border border-purple-500/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(139, 92, 246, 0.3)",
                borderColor: "rgba(139, 92, 246, 0.4)"
              }}
              transition={{ duration: 0.2 }}
            >
              <Users className="text-purple-400 mr-2" size={18} />
              <span className="text-white font-medium">AI-Driven Contact Management</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Turn Static Lists into Living Intelligence
            </motion.h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Smart CRM's AI-powered contact management transforms how you connect with customers through intelligent scoring, automated enrichment, and predictive insights.
            </p>
          </div>
        </AnimatedElement>

        {/* CRM Goals Animation */}
        <CRMGoalsAnimation
          title="What are you looking for in Contact Management?"
          subtitle="Select your primary goal to see how SmartCRM's AI Contacts deliver results"
          goals={contactsGoals}
          ctaText="Get SmartCRM Contacts"
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactsFeatures.map((feature, idx) => (
            <AnimatedElement key={idx} animation="slideUp" delay={0.2 + (idx * 0.2)}>
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 h-full"
                whileHover={{
                  y: -10,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="p-3 bg-white/10 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 mb-4">{feature.description}</p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIdx) => (
                    <motion.li
                      key={benefitIdx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: benefitIdx * 0.1 }}
                    >
                      <CheckCircle size={14} className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>

        {/* Contact Stats */}
        <AnimatedElement animation="fadeIn" delay={0.6}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Contact Intelligence Impact</h3>
              <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {contactStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/10 rounded-lg p-4 text-center"
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: idx * 0.1, duration: 0.3 }
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 4, delay: idx, repeat: Infinity }}
                  >
                    {stat.icon}
                  </motion.div>

                  <motion.span
                    className="text-2xl font-bold text-purple-400 block mb-1"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, delay: idx * 0.2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-white/70 text-sm">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedElement>

        {/* The CRM Reality Statistics */}
        <AnimatedElement animation="fadeIn" delay={0.8}>
          <div className="text-center mt-10 max-w-5xl mx-auto relative">
            <InteractiveFloatingButton
              text="Click Stats for Details"
              position="top-right"
              color="purple"
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
                  onClick={() => {
                    const card = document.getElementById(`contacts-stat-${stat.id}`);
                    if (card) {
                      const details = card.querySelector('.stat-details');
                      if (details) {
                        details.classList.toggle('hidden');
                      }
                    }
                  }}
                  whileHover={{
                    y: -8,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderColor: `rgba(${stat.color === "red" ? "239, 68, 68" : "59, 130, 246"}, 0.4)`
                  }}
                  layoutId={`contacts-stat-card-${stat.id}`}
                >
                  <motion.div className="p-6" layoutId={`contacts-stat-content-${stat.id}`}>
                    <motion.div
                      className={`h-12 w-12 rounded-full bg-${stat.color}-500/20 flex items-center justify-center mx-auto mb-4`}
                      layoutId={`contacts-stat-icon-${stat.id}`}
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
                      layoutId={`contacts-stat-value-${stat.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      {stat.value}
                    </motion.span>

                    <motion.span
                      className="text-white/70 text-sm"
                      layoutId={`contacts-stat-label-${stat.id}`}
                    >
                      {stat.label}
                    </motion.span>

                    <motion.div
                      className="mt-3 text-blue-400 text-sm flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <span>Learn more</span>
                      <motion.div
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={14} className="ml-1" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <div className="stat-details hidden bg-white/5 p-4 border-t border-white/10">
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedElement>

        {/* Embedded Application Section */}
        <AnimatedElement animation="fadeIn" delay={0.8}>
          <motion.div
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 relative overflow-hidden"
            whileHover={{
              borderColor: "rgba(139, 92, 246, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }}
          >
            <InteractiveFloatingButton
              text="Try Live Demo"
              position="top-right"
              color="purple"
              delay={1}
            />

            {/* Background glow effect */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
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

            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Experience Smart Contact Management</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                See how AI transforms your contact database into a powerful relationship intelligence platform.
              </p>

              <motion.button
                onClick={() => setShowEmbed(!showEmbed)}
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors shadow-lg font-medium mb-6"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{showEmbed ? "Hide Demo" : "View Live Demo"}</span>
                <ExternalLink className="ml-2" size={18} />
              </motion.button>
            </div>

            <AnimatePresence>
              {showEmbed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="bg-black/50 rounded-lg p-4 mb-4 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 text-sm">Smart CRM Contacts Management</span>
                      <div className="flex items-center space-x-2">
                        {!isIframeLoaded && (
                          <div className="flex items-center text-white/60 text-sm">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400 mr-2"></div>
                            Loading demo...
                          </div>
                        )}
                        <button
                          onClick={() => setShowEmbed(false)}
                          className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                          title="Close demo"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="relative w-full" style={{ height: '800px' }}>
                      {!iframeError ? (
                        <iframe
                          src="https://taupe-sprinkles-83c9ee.netlify.app"
                          className="absolute top-0 left-0 w-full h-full rounded-lg border border-white/10"
                          onLoad={() => {
                            setIsIframeLoaded(true);
                            setIframeError(false);
                          }}
                          onError={() => setIframeError(true)}
                          title="Smart CRM Contacts Management Demo"
                          allow="fullscreen"
                          scrolling="yes"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
                          <div className="text-center p-8">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Users className="text-purple-400" size={32} />
                            </div>
                            <h4 className="text-white text-xl font-semibold mb-2">Demo Temporarily Unavailable</h4>
                            <p className="text-white/70 mb-4 max-w-md">The contacts demo is currently offline. This may be due to maintenance or server updates.</p>
                            <div className="space-y-2">
                              <motion.button
                                onClick={() => {
                                  setIframeError(false);
                                  setIsIframeLoaded(false);
                                }}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Retry Connection
                              </motion.button>
                              <p className="text-white/60 text-sm mt-2">Or contact us for a personalized demo</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.div
                    className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">🚀 Complete Smart CRM Contacts Features & Instructions</h4>

                    <div className="space-y-2">
                      <CollapsibleSection
                        title="📊 AI Contact Features & Functions"
                        variant="primary"
                        icon={<BrainCircuit size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li><strong>AI Contact Scoring:</strong> GPT-5 + Gemini multi-model analysis (0-100 scale)</li>
                          <li><strong>Behavioral Insights:</strong> Communication preferences & timing analysis</li>
                          <li><strong>Psychological Profiles:</strong> Personality traits & risk tolerance</li>
                          <li><strong>Relationship Mapping:</strong> Network connections & influence strength</li>
                          <li><strong>Smart Enrichment:</strong> Auto-fill missing data from web research</li>
                          <li><strong>LinkedIn Discovery:</strong> Automatic social profile finding</li>
                          <li><strong>Market Intelligence:</strong> Competitive analysis & trending topics</li>
                          <li><strong>Email Composer:</strong> Context-aware drafts with tone options</li>
                          <li><strong>Social Generator:</strong> LinkedIn, Twitter, WhatsApp content</li>
                          <li><strong>Objection Handler:</strong> 50+ common objection responses</li>
                          <li><strong>Subject Optimizer:</strong> A/B testing for email subjects</li>
                          <li><strong>Bulk Processing:</strong> CSV/JSON import with validation</li>
                          <li><strong>Auto-Tagging:</strong> Smart categorization & segmentation</li>
                          <li><strong>Meeting Prep:</strong> AI-generated agendas & talking points</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="🎯 Contact Card Tools Guide"
                        variant="secondary"
                        icon={<Users size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• <strong>AI Score Badge:</strong> Green/yellow/red indicator (hover for details)</li>
                          <li>• <strong>Quick Actions:</strong> Email, Call, Meeting, Task buttons</li>
                          <li>• <strong>AI Toolbar:</strong> Lead Score, Email AI, Auto-Enrich icons</li>
                          <li>• <strong>Hot/Cold Indicator:</strong> Animated interest level badge</li>
                          <li>• <strong>Last Connected:</strong> Timestamp with contact frequency</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="📋 Detailed View Features"
                        variant="secondary"
                        icon={<Target size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• <strong>Overview Tab:</strong> AI score, heat level, quick actions</li>
                          <li>• <strong>Journey Tab:</strong> Visual timeline of all interactions</li>
                          <li>• <strong>Analytics Tab:</strong> Engagement charts & performance metrics</li>
                          <li>• <strong>Communication Tab:</strong> Unified inbox (email, SMS, calls)</li>
                          <li>• <strong>Automation Tab:</strong> Active workflows & new automation setup</li>
                          <li>• <strong>Sales Intelligence:</strong> Win probability & discovery questions</li>
                          <li>• <strong>AI Insights Tab:</strong> Conversion probability & risk warnings</li>
                          <li>• <strong>Email Tab:</strong> AI composer, subject optimizer, thread history</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="⚙️ Advanced Contact Management"
                        variant="secondary"
                        icon={<Settings size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• Click anywhere on contact card to open detailed view</li>
                          <li>• Shows full contact profile with AI insights</li>
                          <li>• Access to complete communication history</li>
                          <li>• View relationship timeline and interactions</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="💡 Contact Management Pro Tips"
                        variant="success"
                        icon={<Lightbulb size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• Use filters to focus on high-value contacts</li>
                          <li>• Set up automated follow-ups for hot leads</li>
                          <li>• Review AI insights weekly for strategy updates</li>
                          <li>• Export filtered lists for targeted campaigns</li>
                          <li>• Monitor contact health scores for churn prevention</li>
                        </ul>
                      </CollapsibleSection>
                    </div>

                    <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <h5 className="text-lg font-medium text-blue-300 mb-2">💡 Getting Started:</h5>
                      <p className="text-white/80 text-sm">
                        <strong>Step 1:</strong> Browse the contact cards above to see AI scoring in action<br/>
                        <strong>Step 2:</strong> Click any contact card to explore the detailed view<br/>
                        <strong>Step 3:</strong> Try the AI tools (Email Composer, Auto-Enrich, etc.)<br/>
                        <strong>Step 4:</strong> Use filters and search to find specific contacts<br/>
                        <strong>Step 5:</strong> Set up automation rules for follow-up sequences
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatedElement>

        {/* CTA Section */}
        <AnimatedElement animation="fadeIn" delay={1}>
          <div className="text-center mt-12">
            <motion.div
              className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-xl p-8 border border-purple-500/30"
              whileHover={{
                borderColor: "rgba(139, 92, 246, 0.4)",
                backgroundColor: "rgba(139, 92, 246, 0.1)"
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Transform Your Contact Management</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Join thousands of businesses using AI to turn static contact lists into dynamic relationship intelligence.
              </p>

              <motion.button
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors shadow-lg font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Smart CRM Contacts</span>
                <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </motion.div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default ContactsEmbedSection;