import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ChartBar as BarChart3, TrendingUp, Zap, CircleCheck as CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import AnimatedElement from '../components/AnimatedElement';
import DemoEmbed from '../components/DemoEmbed';
import CollapsibleSection from '../components/CollapsibleSection';
import { SignupContext } from '../App';

const DemoPage: React.FC = () => {
  const { openSignupModal } = useContext(SignupContext);

  const demoFeatures = [
    {
      icon: <BarChart3 className="text-blue-400" size={24} />,
      title: "Real-Time Analytics",
      description: "Watch data update live as you interact with the dashboard"
    },
    {
      icon: <TrendingUp className="text-green-400" size={24} />,
      title: "Predictive Insights",
      description: "AI-powered forecasts and trend analysis in real-time"
    },
    {
      icon: <Zap className="text-orange-400" size={24} />,
      title: "Interactive Interface",
      description: "Click, hover, and explore every element of the dashboard"
    },
    {
      icon: <Sparkles className="text-purple-400" size={24} />,
      title: "Smart Visualizations",
      description: "Dynamic charts that adapt to your data and preferences"
    }
  ];

  const usageInstructions = [
    "Explore the KPI cards showing key business metrics",
    "Click on any chart to see detailed drill-down views",
    "Hover over data points for interactive tooltips",
    "Try the fullscreen mode for an immersive experience",
    "Open in a new tab to test all features independently"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <ScrollProgress />
      <Navbar />

      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
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
                <Sparkles className="text-orange-400 mr-2" size={18} />
                <span className="text-white font-medium">Live Interactive Demo</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                Experience SmartCRM Dashboard
              </motion.h1>

              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                See the power of AI-driven analytics in action. This is a fully interactive demo
                showcasing real-time data visualization, predictive insights, and intelligent automation.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {demoFeatures.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center bg-white/5 backdrop-blur-md rounded-lg px-4 py-3 border border-white/10"
                    whileHover={{
                      y: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderColor: "rgba(255, 255, 255, 0.2)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="mr-3">{feature.icon}</div>
                    <div className="text-left">
                      <div className="text-white font-medium text-sm">{feature.title}</div>
                      <div className="text-white/60 text-xs">{feature.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedElement>

          {/* Demo Embed Section */}
          <AnimatedElement animation="slideUp" delay={0.2}>
            <div className="mb-12">
              <DemoEmbed className="shadow-2xl" />
            </div>
          </AnimatedElement>

          {/* Usage Instructions */}
          <AnimatedElement animation="slideUp" delay={0.4}>
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="text-orange-400 mr-3" size={28} />
                How to Use This Demo
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Start Guide</h3>
                  <ul className="space-y-3">
                    {usageInstructions.map((instruction, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <CheckCircle size={18} className="text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70">{instruction}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-900/20 to-blue-900/20 rounded-lg p-6 border border-orange-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">What You'll See</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Live updating KPI metrics and performance indicators</li>
                    <li>• Interactive charts with drill-down capabilities</li>
                    <li>• Real-time data visualization and trend analysis</li>
                    <li>• AI-powered insights and recommendations</li>
                    <li>• Responsive design that works on all devices</li>
                    <li>• Custom dashboard layouts and widgets</li>
                  </ul>
                </div>
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-2">
                <CollapsibleSection
                  title="📊 Dashboard Features"
                  variant="primary"
                  icon={<BarChart3 size={18} />}
                >
                  <ul className="text-white/80 text-sm space-y-2">
                    <li><strong>Real-Time KPIs:</strong> Track revenue, users, conversion rates, and more</li>
                    <li><strong>Interactive Charts:</strong> Bar charts, line graphs, pie charts with drill-down</li>
                    <li><strong>Predictive Analytics:</strong> AI forecasts for sales and revenue trends</li>
                    <li><strong>Custom Widgets:</strong> Drag-and-drop dashboard customization</li>
                    <li><strong>Alert System:</strong> Automated notifications for threshold breaches</li>
                    <li><strong>Export Options:</strong> Download reports in PDF, CSV, Excel formats</li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection
                  title="🎯 Interactive Elements"
                  variant="secondary"
                  icon={<Zap size={18} />}
                >
                  <ul className="text-white/80 text-sm space-y-2">
                    <li>• Click on any metric card to see detailed breakdowns</li>
                    <li>• Hover over chart elements for instant data tooltips</li>
                    <li>• Use time filters to analyze historical trends</li>
                    <li>• Customize widget layouts with drag-and-drop</li>
                    <li>• Access contextual menus with right-click actions</li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection
                  title="💡 Pro Tips"
                  variant="success"
                  icon={<TrendingUp size={18} />}
                >
                  <ul className="text-white/80 text-sm space-y-2">
                    <li>• Try fullscreen mode for an immersive dashboard experience</li>
                    <li>• Open in a new tab to test all features independently</li>
                    <li>• The demo uses sample data that updates in real-time</li>
                    <li>• All interactions are tracked to show feature engagement</li>
                    <li>• Server may take 30-60 seconds to wake up on first load</li>
                  </ul>
                </CollapsibleSection>
              </div>
            </div>
          </AnimatedElement>

          {/* CTA Section */}
          <AnimatedElement animation="fadeIn" delay={0.6}>
            <motion.div
              className="bg-gradient-to-br from-orange-600/20 to-blue-600/20 backdrop-blur-md rounded-xl p-8 border border-orange-500/30 text-center"
              whileHover={{
                borderColor: "rgba(249, 115, 22, 0.4)",
                backgroundColor: "rgba(249, 115, 22, 0.1)"
              }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                This is just a glimpse of what SmartCRM can do. Get full access to AI-powered analytics,
                predictive insights, and intelligent automation tailored to your business needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => openSignupModal('early-access')}
                  className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors shadow-lg font-medium text-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="ml-2" size={20} />
                </motion.button>

                <motion.button
                  onClick={() => window.location.href = '/pricing'}
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors font-medium text-lg border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Pricing
                </motion.button>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {[
                  { value: "14 Days", label: "Free Trial" },
                  { value: "No Card", label: "Required" },
                  { value: "24/7", label: "Support" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white/5 rounded-lg p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="text-orange-400 text-2xl font-bold">{item.value}</div>
                    <div className="text-white/70 text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatedElement>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DemoPage;
