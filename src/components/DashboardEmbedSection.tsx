import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Activity, ArrowRight, CheckCircle, ExternalLink, Zap, Gauge, Eye, X, Settings, Lightbulb, AlertTriangle, Users, TrendingDown, UserMinus, Clock, Info, Database, Brain } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import CollapsibleSection from './CollapsibleSection';
import CRMGoalsAnimation from './CRMGoalsAnimation';
import { EMBED_URLS } from '../constants/embedUrls';

const DashboardEmbedSection: React.FC = () => {
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
        console.warn('Dashboard iframe load timeout after 30 seconds');
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
    console.error('Dashboard iframe failed to load');
  };

  const dashboardFeatures = [
    {
      title: "Real-Time Analytics",
      description: "Live dashboard updates with instant metrics and KPI tracking across all business functions",
      icon: <Activity className="text-blue-400" size={24} />,
      benefits: [
        "Live data streaming and instant updates",
        "Custom KPI dashboards and alerts",
        "Real-time performance monitoring",
        "Automated report generation and scheduling"
      ]
    },
    {
      title: "Advanced Visualizations",
      description: "Interactive charts, graphs, and data visualizations with drill-down capabilities",
      icon: <BarChart3 className="text-purple-400" size={24} />,
      benefits: [
        "Interactive charts with drill-down features",
        "Custom dashboard layouts and themes",
        "Data export and sharing capabilities",
        "Mobile-responsive visualization design"
      ]
    },
    {
      title: "Performance Monitoring",
      description: "Comprehensive system health monitoring with predictive analytics and alerting",
      icon: <Gauge className="text-green-400" size={24} />,
      benefits: [
        "System performance and uptime tracking",
        "Predictive maintenance and alerts",
        "Resource utilization monitoring",
        "Custom threshold and notification setup"
      ]
    },
    {
      title: "Business Intelligence",
      description: "AI-powered insights and recommendations based on your data patterns and trends",
      icon: <TrendingUp className="text-amber-400" size={24} />,
      benefits: [
        "AI-driven insights and recommendations",
        "Trend analysis and forecasting",
        "Competitive intelligence integration",
        "Automated anomaly detection"
      ]
    }
  ];

  const dashboardStats = [
    { value: "99.9%", label: "Uptime reliability", icon: <Activity size={18} className="text-blue-400" /> },
    { value: "<1s", label: "Real-time updates", icon: <Zap size={18} className="text-green-400" /> },
    { value: "50+", label: "Visualization types", icon: <PieChart size={18} className="text-purple-400" /> },
    { value: "95%", label: "User adoption rate", icon: <Eye size={18} className="text-amber-400" /> }
  ];

  const dashboardGoals = [
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
    }
  ];

  return (
    <section id="dashboard" className="py-20 px-4 relative overflow-hidden">
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
          className="absolute top-1/4 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"
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
              className="inline-flex items-center bg-orange-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-md border border-orange-500/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(249, 115, 22, 0.3)",
                borderColor: "rgba(249, 115, 22, 0.4)"
              }}
              transition={{ duration: 0.2 }}
            >
              <BarChart3 className="text-orange-400 mr-2" size={18} />
              <span className="text-white font-medium">AI-Powered Dashboard</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Intelligence at Your Fingertips
            </motion.h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Smart CRM's AI-powered dashboard delivers real-time insights, predictive analytics, and intelligent visualizations to transform your data into actionable intelligence.
            </p>
          </div>
        </AnimatedElement>

        {/* CRM Goals Animation */}
        <CRMGoalsAnimation
          title="What are you looking for in a Dashboard?"
          subtitle="Select your primary goal to see how SmartCRM's AI Dashboard delivers results"
          goals={dashboardGoals}
          ctaText="Get SmartCRM Dashboard"
        />

        {/* The Challenges of Traditional Dashboard Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <AnimatedElement animation="slideUp" delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">The Challenges of Traditional Dashboard Management</h3>

              {[
                {
                  icon: <BarChart3 className="text-amber-400" size={24} />,
                  title: "Static Reports & Manual Updates",
                  description: "Dashboards become outdated within hours, requiring constant manual refresh and data entry to maintain accuracy."
                },
                {
                  icon: <TrendingUp className="text-red-400" size={24} />,
                  title: "No Predictive Intelligence",
                  description: "Traditional dashboards show what happened, but provide no insights into what's likely to happen or optimal actions."
                },
                {
                  icon: <Activity className="text-orange-400" size={24} />,
                  title: "Overwhelming Data Complexity",
                  description: "Users are buried in metrics without clear prioritization or actionable recommendations from the system."
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
                >
                  <div className="flex items-start">
                    <motion.div
                      className="bg-amber-500/20 p-3 rounded-lg mr-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
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
                <h3 className="text-xl font-semibold text-white">The Real Problem: Dashboards Without Intelligence</h3>
              </div>

              <p className="text-white/80 text-lg">
                Most dashboard systems are glorified report viewers. They display data but provide no intelligence
                about trends, predictions, or optimal business decisions.
              </p>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-white font-medium mb-3">Why Traditional Dashboards Fail:</h4>
                <ul className="space-y-3">
                  {[
                    "Built for reporting, not decision intelligence",
                    "Requires constant manual updates and maintenance",
                    "No predictive capabilities or trend analysis",
                    "Overwhelming data without clear priorities",
                    "No automated insights or recommendations"
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
                  <span>Smart CRM's AI Dashboard Approach:</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    "Real-time AI-powered analytics and insights",
                    "Predictive intelligence with automated recommendations",
                    "Intelligent data prioritization and trend analysis",
                    "Automated report generation and distribution",
                    "Interactive visualizations with drill-down capabilities"
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
                href="#dashboard-demo"
                className="inline-flex items-center text-blue-400 font-medium mt-4 group"
                whileHover={{ x: 5 }}
              >
                <span>See Smart CRM's AI Dashboard in action</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </motion.a>
            </div>
          </AnimatedElement>
        </div>

        {/* Dashboard Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {dashboardFeatures.map((feature, idx) => (
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

        {/* Dashboard Stats */}
        <AnimatedElement animation="fadeIn" delay={0.6}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Dashboard Performance Impact</h3>
              <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {dashboardStats.map((stat, idx) => (
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
                    className="text-2xl font-bold text-orange-400 block mb-1"
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
                  onClick={() => {
                    const card = document.getElementById(`dashboard-stat-${stat.id}`);
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
                  layoutId={`dashboard-stat-card-${stat.id}`}
                >
                  <motion.div className="p-6" layoutId={`dashboard-stat-content-${stat.id}`}>
                    <motion.div
                      className={`h-12 w-12 rounded-full bg-${stat.color}-500/20 flex items-center justify-center mx-auto mb-4`}
                      layoutId={`dashboard-stat-icon-${stat.id}`}
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
                      layoutId={`dashboard-stat-value-${stat.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      {stat.value}
                    </motion.span>

                    <motion.span
                      className="text-white/70 text-sm"
                      layoutId={`dashboard-stat-label-${stat.id}`}
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

        {/* Traditional vs Smart Dashboard Comparison */}
        <AnimatedElement animation="fadeIn" delay={0.8}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-12 relative">
            <InteractiveFloatingButton
              text="Compare Solutions"
              position="top-right"
              color="green"
              delay={2}
            />

            <h4 className="text-xl font-semibold text-white mb-6 text-center">Traditional Dashboard vs Smart CRM AI Dashboard</h4>

            <div className="relative mb-8">
              {/* Connection Line */}
              <div className="hidden md:block absolute left-[50%] top-10 bottom-0 w-px bg-white/10" />

              {[
                {
                  traditional: "Static reports updated manually weekly or monthly",
                  smart: "Real-time AI-powered dashboards with instant updates",
                  traditionalIcon: <BarChart3 size={20} className="text-red-400" />,
                  smartIcon: <Activity size={20} className="text-green-400" />
                },
                {
                  traditional: "No predictive insights or trend analysis",
                  smart: "AI-driven predictions and automated trend detection",
                  traditionalIcon: <TrendingUp size={20} className="text-red-400" />,
                  smartIcon: <Gauge size={20} className="text-green-400" />
                },
                {
                  traditional: "Complex interfaces requiring training and expertise",
                  smart: "Intuitive AI-guided interfaces with smart recommendations",
                  traditionalIcon: <X size={20} className="text-red-400" />,
                  smartIcon: <CheckCircle size={20} className="text-green-400" />
                },
                {
                  traditional: "Limited customization and rigid layouts",
                  smart: "Fully customizable with AI-suggested optimizations",
                  traditionalIcon: <Settings size={20} className="text-red-400" />,
                  smartIcon: <Lightbulb size={20} className="text-green-400" />
                }
              ].map((comparison, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative">
                  {/* Left Side: Traditional Dashboard */}
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
                        <h5 className="text-white text-md font-medium mb-1">Traditional Dashboard</h5>
                        <p className="text-white/70 text-sm">{comparison.traditional}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connection Dot */}
                  <div className="hidden md:block absolute left-[50%] top-8 w-4 h-4 rounded-full bg-white/10 transform -translate-x-1/2" />

                  {/* Right Side: Smart CRM Dashboard */}
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
                        <h5 className="text-white text-md font-medium mb-1">Smart CRM AI Dashboard</h5>
                        <p className="text-white/70 text-sm">{comparison.smart}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* ROI Impact Visualization */}
            <motion.div
              className="bg-gradient-to-r from-orange-900/30 to-blue-900/30 rounded-lg p-5 border border-orange-500/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-medium text-white mb-3">Real Business Impact with AI Dashboard</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { value: "+85%", label: "Faster Decision Making", color: "green" },
                  { value: "-60%", label: "Time to Insights", color: "blue" },
                  { value: "+120%", label: "Data Utilization", color: "purple" },
                  { value: "3.5x", label: "Predictive Accuracy", color: "amber" }
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
        </AnimatedElement>


        {/* Embedded Application Section */}
        <AnimatedElement animation="fadeIn" delay={0.8}>
          <motion.div
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 relative overflow-hidden"
            whileHover={{
              borderColor: "rgba(249, 115, 22, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }}
          >
            <InteractiveFloatingButton
              text="Try Live Demo"
              position="top-right"
              color="amber"
              delay={1}
            />

            {/* Background glow effect */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"
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
              <h3 className="text-2xl font-semibold text-white mb-4">Experience Smart Dashboard Analytics</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                See how AI transforms your data into intelligent insights with real-time analytics and predictive visualizations.
              </p>

              <motion.button
                onClick={() => setShowEmbed(!showEmbed)}
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors shadow-lg font-medium mb-6"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{showEmbed ? "Hide Demo" : "View Live Demo"}</span>
                <ExternalLink className="ml-2" size={18} />
              </motion.button>
            </div>

            {/* Dashboard Features Description */}
            <p className="text-white/80 text-lg mb-6 max-w-3xl mx-auto text-center">
              Experience AI-powered dashboards with: <span className="font-medium text-orange-400">Real-Time Updates</span> (live data streaming), <span className="font-medium text-blue-400">Predictive Analytics</span> (trend forecasting), <span className="font-medium text-purple-400">Interactive Visualizations</span> (drill-down charts), and <span className="font-medium text-green-400">Smart Alerts</span> (automated notifications).
            </p>

            {/* Dashboard Widgets Description */}
            <p className="text-white/80 text-lg mb-6 max-w-3xl mx-auto text-center">
              The AI Dashboard features <span className="font-medium text-orange-400">12 specialized widgets</span> for comprehensive business intelligence: <span className="font-medium text-white">KPI Cards, Trend Charts, Performance Gauges, Predictive Forecasts, Real-Time Alerts, Custom Metrics, Comparative Analysis, Goal Tracking, Anomaly Detection, Automated Reports, Data Quality Scores, and Executive Summary.</span>
            </p>

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
                      <span className="text-white/70 text-sm">Smart CRM Dashboard Analytics</span>
                      <div className="flex items-center space-x-2">
                        {!isIframeLoaded && (
                          <div className="flex items-center text-white/60 text-sm">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-400 mr-2"></div>
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
                          src={EMBED_URLS.dashboard}
                          className="absolute top-0 left-0 w-full h-full rounded-lg border border-white/10 bg-gray-900"
                          onLoad={handleIframeLoad}
                          onError={handleIframeError}
                          title="Smart CRM Dashboard Analytics Demo"
                          allow="fullscreen; display-capture"
                          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads allow-presentation"
                          referrerPolicy="no-referrer-when-downgrade"
                          loading="lazy"
                          importance="high"
                        />
                      )}

                      {!isIframeLoaded && !iframeError && !loadTimeout && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
                          <div className="text-center p-8 max-w-lg">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-6"></div>
                            <h4 className="text-white text-xl font-semibold mb-3">Loading Dashboard Demo</h4>
                            <p className="text-white/70 mb-6">The Replit server may take 30-60 seconds to wake up on first load...</p>
                            {retryCount > 0 && (
                              <p className="text-orange-400 text-sm mb-4">Retry attempt {retryCount} of 3</p>
                            )}
                            <motion.button
                              onClick={() => window.open(EMBED_URLS.dashboard, '_blank')}
                              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Open Dashboard in New Tab
                            </motion.button>
                            <p className="text-white/50 text-sm mt-4">If the dashboard doesn't load here, try opening it in a new tab</p>
                          </div>
                        </div>
                      )}

                      {(iframeError || loadTimeout) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
                          <div className="text-center p-8 max-w-lg">
                            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <BarChart3 className="text-orange-400" size={32} />
                            </div>
                            <h4 className="text-white text-xl font-semibold mb-2">
                              {loadTimeout ? 'Dashboard Taking Longer Than Expected' : 'Demo Temporarily Unavailable'}
                            </h4>
                            <p className="text-white/70 mb-6 max-w-md">
                              {loadTimeout
                                ? 'The Replit server is taking longer than expected to respond. This is normal on first load.'
                                : 'The dashboard demo is currently offline. This may be due to maintenance or server updates.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                              {retryCount < 3 && (
                                <motion.button
                                  onClick={handleRetry}
                                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {retryCount > 0 ? `Retry Again (${retryCount}/3)` : 'Retry Connection'}
                                </motion.button>
                              )}
                              <motion.button
                                onClick={() => window.open(EMBED_URLS.dashboard, '_blank')}
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
                    className="bg-gradient-to-r from-orange-900/30 to-blue-900/30 rounded-lg p-6 border border-orange-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">🚀 Complete Smart CRM Dashboard Features & Instructions</h4>

                    <div className="space-y-2">
                      <CollapsibleSection
                        title="📊 AI Dashboard Features & Functions"
                        variant="primary"
                        icon={<BarChart3 size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li><strong>Real-Time Analytics:</strong> Live data streaming with instant updates</li>
                          <li><strong>Advanced Visualizations:</strong> Interactive charts and graphs</li>
                          <li><strong>Performance Monitoring:</strong> System health and uptime tracking</li>
                          <li><strong>Business Intelligence:</strong> AI-powered insights and recommendations</li>
                          <li><strong>Custom Dashboards:</strong> Personalized layouts and widgets</li>
                          <li><strong>Predictive Analytics:</strong> Trend forecasting and anomaly detection</li>
                          <li><strong>Data Export:</strong> Multiple format support (PDF, CSV, Excel)</li>
                          <li><strong>Mobile Optimization:</strong> Responsive design for all devices</li>
                          <li><strong>Alert System:</strong> Custom notifications and thresholds</li>
                          <li><strong>Collaboration Tools:</strong> Shared dashboards and commenting</li>
                          <li><strong>Historical Analysis:</strong> Time-series data and comparisons</li>
                          <li><strong>Integration Hub:</strong> Connect with external data sources</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="🎯 How to Use Dashboard Overview"
                        variant="secondary"
                        icon={<Activity size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• <strong>Real-Time Metrics:</strong> Live updating KPI cards and counters</li>
                          <li>• <strong>Interactive Charts:</strong> Click and hover for detailed insights</li>
                          <li>• <strong>Custom Widgets:</strong> Drag-and-drop dashboard customization</li>
                          <li>• <strong>Time Filters:</strong> Historical data analysis and comparisons</li>
                          <li>• <strong>Alert Indicators:</strong> Visual notifications for important changes</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="📈 Chart Interactions Guide"
                        variant="secondary"
                        icon={<TrendingUp size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• Click chart elements to drill down into data</li>
                          <li>• Hover over data points for detailed tooltips</li>
                          <li>• Use zoom and pan controls for detailed analysis</li>
                          <li>• Export charts as images or data files</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="⚙️ Customization Features"
                        variant="secondary"
                        icon={<Settings size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• <strong>Widget Library:</strong> Add new charts and metrics</li>
                          <li>• <strong>Layout Editor:</strong> Rearrange and resize dashboard elements</li>
                          <li>• <strong>Theme Selector:</strong> Choose from multiple visual themes</li>
                          <li>• <strong>Filter Builder:</strong> Create custom data filters and segments</li>
                          <li>• <strong>Alert Setup:</strong> Configure notifications and thresholds</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="💡 Dashboard Pro Tips"
                        variant="success"
                        icon={<Lightbulb size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• Set up automated reports for regular stakeholders</li>
                          <li>• Use predictive analytics to identify trends early</li>
                          <li>• Create role-specific dashboards for different teams</li>
                          <li>• Monitor key metrics with custom alert thresholds</li>
                          <li>• Share insights through scheduled email reports</li>
                        </ul>
                      </CollapsibleSection>
                    </div>

                    <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <h5 className="text-lg font-medium text-blue-300 mb-2">💡 Getting Started:</h5>
                      <p className="text-white/80 text-sm">
                        <strong>Step 1:</strong> Explore the live dashboard above to see real-time analytics<br/>
                        <strong>Step 2:</strong> Click on different charts to see interactive drill-down features<br/>
                        <strong>Step 3:</strong> Try customizing the dashboard layout and widgets<br/>
                        <strong>Step 4:</strong> Set up custom alerts and notification preferences<br/>
                        <strong>Step 5:</strong> Create and share automated reports with your team
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
              className="bg-gradient-to-br from-orange-600/20 to-blue-600/20 backdrop-blur-md rounded-xl p-8 border border-orange-500/30"
              whileHover={{
                borderColor: "rgba(249, 115, 22, 0.4)",
                backgroundColor: "rgba(249, 115, 22, 0.1)"
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Transform Your Data into Intelligence</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Unlock the power of AI-driven analytics with real-time insights, predictive intelligence, and automated reporting.
              </p>

              <motion.button
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors shadow-lg font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Smart CRM Dashboard</span>
                <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </motion.div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default DashboardEmbedSection;