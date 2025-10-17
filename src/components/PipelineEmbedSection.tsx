import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, TrendingUp, Target, Award, ArrowRight, CheckCircle, ExternalLink, Zap, BarChart3, Users, X, Settings, Lightbulb, Activity, Database, Brain } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import CollapsibleSection from './CollapsibleSection';
import CRMGoalsAnimation from './CRMGoalsAnimation';
import { EMBED_URLS } from '../constants/embedUrls';

const PipelineEmbedSection: React.FC = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showEmbed, setShowEmbed] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (showEmbed && !isIframeLoaded && !iframeError) {
      timeoutRef.current = setTimeout(() => {
        setLoadTimeout(true);
        console.warn('Pipeline iframe load timeout after 30 seconds');
      }, 30000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [showEmbed, isIframeLoaded, iframeError, iframeKey]);

  const handleRetry = () => {
    setIframeError(false);
    setLoadTimeout(false);
    setIsIframeLoaded(false);
    setRetryCount(prev => prev + 1);
    setIframeKey(prev => prev + 1);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
    setIframeError(false);
    setLoadTimeout(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleIframeError = () => {
    setIframeError(true);
    setLoadTimeout(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    console.error('Pipeline iframe failed to load');
  };

  const pipelineFeatures = [
    {
      title: "AI Deal Intelligence",
      description: "Win/loss predictions and red-flag detection across your entire pipeline",
      icon: <Target className="text-blue-400" size={24} />,
      benefits: [
        "Real-time win probability scoring",
        "Risk alerts and bottleneck identification",
        "Timeline predictions and optimal next steps",
        "Competitive intelligence and market insights"
      ]
    },
    {
      title: "Kanban Board",
      description: "Drag-and-drop deal management with visual pipeline progression",
      icon: <GitBranch className="text-purple-400" size={24} />,
      benefits: [
        "Intuitive drag-and-drop interface",
        "Stage-based workflow visualization",
        "Custom pipeline configurations",
        "Real-time collaboration features"
      ]
    },
    {
      title: "Gamification",
      description: "Leaderboards, achievements, and points system to boost team performance",
      icon: <Award className="text-green-400" size={24} />,
      benefits: [
        "Team leaderboards and performance tracking",
        "Achievement badges and milestones",
        "Streak tracking and motivation tools",
        "Points system with leveling mechanics"
      ]
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive reporting with conversion rates and sales velocity metrics",
      icon: <BarChart3 className="text-amber-400" size={24} />,
      benefits: [
        "Conversion rate analysis by stage",
        "Sales velocity and time-to-close metrics",
        "Forecast accuracy and pipeline health",
        "Custom reporting and dashboard creation"
      ]
    }
  ];

  const pipelineStats = [
    { value: "41%", label: "Higher win rates", icon: <TrendingUp size={18} className="text-green-400" /> },
    { value: "3.2x", label: "Faster sales cycles", icon: <Zap size={18} className="text-blue-400" /> },
    { value: "$2.1M", label: "Average deal size increase", icon: <BarChart3 size={18} className="text-purple-400" /> },
    { value: "94%", label: "Team engagement", icon: <Users size={18} className="text-amber-400" /> }
  ];

  const pipelineGoals = [
    {
      id: "improve-forecasting",
      title: "Improve Sales Forecasting",
      icon: <TrendingUp className="text-green-400" size={24} />,
      description: "AI-powered predictions with 85%+ accuracy for better planning",
      primaryColor: "green",
      features: [
        "Predictive analytics engine",
        "Win/loss probability scoring",
        "Real-time forecast updates",
        "Scenario planning tools"
      ],
      benefits: [
        "41% higher win rates",
        "3.5x more accurate predictions",
        "Better resource allocation",
        "Improved revenue planning"
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
      id: "streamline-deals",
      title: "Streamline Deal Management",
      icon: <Target className="text-blue-400" size={24} />,
      description: "Advanced deal tracking and management for faster closes",
      primaryColor: "blue",
      features: [
        "Kanban board visualization",
        "Automated stage progression",
        "Deal risk monitoring",
        "Custom pipeline workflows"
      ],
      benefits: [
        "3.2x faster sales cycles",
        "$2.1M average deal size increase",
        "Better pipeline visibility",
        "Improved deal conversion"
      ]
    }
  ];

  return (
    <section id="pipeline" className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/20 pointer-events-none" />

      {/* Animated floating icons */}
      <AnimatedIconsGroup
        section="features"
        iconCount={10}
        animations={['bounce', 'pulse', 'rotate', 'orbit']}
      />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-0 w-64 h-64 bg-green-600/10 rounded-full blur-3xl"
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
          className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
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
              className="inline-flex items-center bg-green-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-md border border-green-500/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(34, 197, 94, 0.3)",
                borderColor: "rgba(34, 197, 94, 0.4)"
              }}
              transition={{ duration: 0.2 }}
            >
              <GitBranch className="text-green-400 mr-2" size={18} />
              <span className="text-white font-medium">Enhanced Pipeline Deals</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Where Every Opportunity Gets Optimized
            </motion.h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Smart CRM's enhanced pipeline transforms how you track, score, and close deals with AI-powered insights and gamified performance.
            </p>
          </div>
        </AnimatedElement>

        {/* CRM Goals Animation */}
        <CRMGoalsAnimation
          title="What are you looking for in Pipeline Management?"
          subtitle="Select your primary goal to see how SmartCRM's AI Pipeline delivers results"
          goals={pipelineGoals}
          ctaText="Get SmartCRM Pipeline"
        />

        {/* Pipeline Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pipelineFeatures.map((feature, idx) => (
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

        {/* Pipeline Stats */}
        <AnimatedElement animation="fadeIn" delay={0.6}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Pipeline Performance Impact</h3>
              <div className="w-24 h-1 bg-green-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {pipelineStats.map((stat, idx) => (
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
                    className="text-2xl font-bold text-green-400 block mb-1"
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

        {/* Embedded Application Section */}
        <AnimatedElement animation="fadeIn" delay={0.8}>
          <motion.div
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 relative overflow-hidden"
            whileHover={{
              borderColor: "rgba(34, 197, 94, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }}
          >
            <InteractiveFloatingButton
              text="Try Live Demo"
              position="top-right"
              color="green"
              delay={1}
            />

            {/* Background glow effect */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"
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
              <h3 className="text-2xl font-semibold text-white mb-4">Experience Enhanced Pipeline Management</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                See how AI transforms your sales pipeline into a dynamic, intelligent deal management system.
              </p>

              <motion.button
                onClick={() => setShowEmbed(!showEmbed)}
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors shadow-lg font-medium mb-6"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" }}
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
                      <span className="text-white/70 text-sm">Smart CRM Pipeline Deals Management</span>
                      <div className="flex items-center space-x-2">
                        {!isIframeLoaded && (
                          <div className="flex items-center text-white/60 text-sm">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
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
                    <div className="relative w-full" style={{ minHeight: '600px', height: 'min(800px, 80vh)' }}>
                      {!iframeError && !loadTimeout && (
                        <iframe
                          key={iframeKey}
                          src={EMBED_URLS.pipeline}
                          className="absolute top-0 left-0 w-full h-full rounded-lg border border-white/10"
                          onLoad={handleIframeLoad}
                          onError={handleIframeError}
                          title="Smart CRM Pipeline Deals Management Demo"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; picture-in-picture"
                          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads allow-presentation allow-top-navigation-by-user-activation allow-storage-access-by-user-activation"
                          referrerPolicy="origin-when-cross-origin"
                          loading="eager"
                          importance="high"
                        />
                      )}

                      {!isIframeLoaded && !iframeError && !loadTimeout && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
                          <div className="text-center p-8 max-w-lg">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-6"></div>
                            <h4 className="text-white text-xl font-semibold mb-3">Loading Pipeline Demo</h4>
                            <p className="text-white/70 mb-6">Setting up your pipeline management interface...</p>
                            {retryCount > 0 && (
                              <p className="text-green-400 text-sm mb-4">Retry attempt {retryCount} of 3</p>
                            )}
                            <motion.button
                              onClick={() => window.open(EMBED_URLS.pipeline, '_blank')}
                              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Open Pipeline in New Tab
                            </motion.button>
                          </div>
                        </div>
                      )}

                      {(iframeError || loadTimeout) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
                          <div className="text-center p-8 max-w-lg">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Target className="text-green-400" size={32} />
                            </div>
                            <h4 className="text-white text-xl font-semibold mb-2">
                              {loadTimeout ? 'Pipeline Taking Longer Than Expected' : 'Demo Temporarily Unavailable'}
                            </h4>
                            <p className="text-white/70 mb-6 max-w-md">
                              {loadTimeout
                                ? 'The pipeline demo is taking longer than expected to load. Please wait or try opening in a new tab.'
                                : 'The pipeline demo is currently offline. This may be due to maintenance or server updates.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                              {retryCount < 3 && (
                                <motion.button
                                  onClick={handleRetry}
                                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {retryCount > 0 ? `Retry Again (${retryCount}/3)` : 'Retry Connection'}
                                </motion.button>
                              )}
                              <motion.button
                                onClick={() => window.open(EMBED_URLS.pipeline, '_blank')}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Open in New Tab
                              </motion.button>
                            </div>
                            {retryCount >= 3 && (
                              <p className="text-white/60 text-sm mt-4">Maximum retries reached. Please try opening in a new tab or contact support.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.div
                    className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">🚀 Complete Smart CRM Pipeline Features & Instructions</h4>

                    <div className="space-y-2">
                      <CollapsibleSection
                        title="📊 AI Pipeline Features & Functions"
                        variant="primary"
                        icon={<Target size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li><strong>AI Deal Intelligence:</strong> Win/loss predictions with GPT-5 analysis</li>
                          <li><strong>Kanban Board:</strong> Drag-and-drop deal management system</li>
                          <li><strong>Deal Scoring:</strong> Real-time probability analysis (0-100%)</li>
                          <li><strong>Risk Alerts:</strong> Early warning system for deal issues</li>
                          <li><strong>Timeline Predictions:</strong> Optimal close date forecasting</li>
                          <li><strong>Competitive Intelligence:</strong> Market analysis and insights</li>
                          <li><strong>Gamification:</strong> Leaderboards, achievements, and points</li>
                          <li><strong>Team Collaboration:</strong> Real-time updates and notifications</li>
                          <li><strong>Advanced Analytics:</strong> Conversion rates and sales velocity</li>
                          <li><strong>Custom Reporting:</strong> Dashboard creation and sharing</li>
                          <li><strong>Forecasting:</strong> Revenue projections and pipeline health</li>
                          <li><strong>Automation Rules:</strong> Smart follow-ups and task assignments</li>
                          <li><strong>Integration Hub:</strong> Connect with email, calendar, and tools</li>
                          <li><strong>Mobile Access:</strong> Full pipeline management on mobile</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="🎯 Deal Cards Overview"
                        variant="secondary"
                        icon={<GitBranch size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• <strong>AI Score Badge:</strong> Green/yellow/red probability indicator</li>
                          <li>• <strong>Value Display:</strong> Deal amount with currency formatting</li>
                          <li>• <strong>Stage Indicator:</strong> Current position in sales funnel</li>
                          <li>• <strong>Time Indicators:</strong> Days in stage and total age</li>
                          <li>• <strong>Priority Flags:</strong> Hot deals and risk alerts</li>
                          <li>• <strong>Owner Avatar:</strong> Assigned team member photo</li>
                          <li>• <strong>Activity Badge:</strong> Recent updates and interactions</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="📋 Deal Detail View Features"
                        variant="secondary"
                        icon={<Activity size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• <strong>Overview Tab:</strong> AI score, value, stage, and quick actions</li>
                          <li>• <strong>Intelligence Tab:</strong> Win probability and risk analysis</li>
                          <li>• <strong>Activities Tab:</strong> Complete interaction timeline</li>
                          <li>• <strong>Documents Tab:</strong> Proposals, contracts, and attachments</li>
                          <li>• <strong>Automation Tab:</strong> Active workflows and sequences</li>
                          <li>• <strong>Analytics Tab:</strong> Performance metrics and forecasting</li>
                          <li>• <strong>Team Tab:</strong> Collaboration and task assignments</li>
                          <li>• <strong>Settings Tab:</strong> Custom fields and deal configuration</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="⚙️ Kanban Board Features"
                        variant="secondary"
                        icon={<Settings size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• Drag deals between stages to update progress</li>
                          <li>• Visual pipeline flow with bottleneck identification</li>
                          <li>• Stage limits and capacity management</li>
                          <li>• Custom stage creation and configuration</li>
                          <li>• Real-time collaboration and updates</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="💡 Pipeline Management Pro Tips"
                        variant="success"
                        icon={<Lightbulb size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• Use filters to focus on high-value or at-risk deals</li>
                          <li>• Set up automated follow-ups for stalled deals</li>
                          <li>• Review AI insights weekly for strategy updates</li>
                          <li>• Monitor team performance through leaderboards</li>
                          <li>• Use forecasting tools for accurate revenue projections</li>
                        </ul>
                      </CollapsibleSection>
                    </div>

                    <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <h5 className="text-lg font-medium text-blue-300 mb-2">💡 Getting Started:</h5>
                      <p className="text-white/80 text-sm">
                        <strong>Step 1:</strong> Browse the deal cards above to see AI scoring in action<br/>
                        <strong>Step 2:</strong> Click any deal card to explore the detailed deal view<br/>
                        <strong>Step 3:</strong> Try dragging deals between stages on the Kanban board<br/>
                        <strong>Step 4:</strong> Use filters and search to find specific deals<br/>
                        <strong>Step 5:</strong> Check the analytics dashboard for pipeline insights<br/>
                        <strong>Step 6:</strong> Set up automation rules for follow-up sequences
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
              className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-md rounded-xl p-8 border border-green-500/30"
              whileHover={{
                borderColor: "rgba(34, 197, 94, 0.4)",
                backgroundColor: "rgba(34, 197, 94, 0.1)"
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Accelerate Your Sales Pipeline</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Transform your deal management with AI-powered insights, gamification, and intelligent automation.
              </p>

              <motion.button
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors shadow-lg font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Smart CRM Pipeline</span>
                <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </motion.div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default PipelineEmbedSection;