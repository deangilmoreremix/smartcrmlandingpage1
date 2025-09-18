import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Activity, ArrowRight, CheckCircle, ExternalLink, Zap, Gauge, Eye, X, Settings, Lightbulb } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import CollapsibleSection from './CollapsibleSection';

const DashboardEmbedSection: React.FC = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showEmbed, setShowEmbed] = useState(true);

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
                    <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '60%' }}>
                      <iframe
                        src="https://smartcrm-videoremix.replit.app/demo-dashboard"
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        onLoad={() => setIsIframeLoaded(true)}
                        title="Smart CRM Dashboard Analytics Demo"
                        allow="fullscreen"
                        scrolling="yes"
                      />
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