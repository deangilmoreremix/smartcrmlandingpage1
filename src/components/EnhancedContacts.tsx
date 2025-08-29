import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Contact, Database, Zap, CheckCircle, ExternalLink, Maximize2 } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';

const EnhancedContacts: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openInNewTab = () => {
    window.open('https://taupe-sprinkles-83c9ee.netlify.app', '_blank');
  };

  return (
    <>
      <section id="enhanced-contacts" className="py-20 px-4 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-black/80 pointer-events-none" />
        
        {/* Animated floating icons */}
        <AnimatedIconsGroup 
          section="features" 
          iconCount={8}
          animations={['pulse', 'rotate', 'bounce']} 
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
                <span className="text-white font-medium">Live Interactive Demo</span>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Enhanced Contacts Module</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Experience Smart CRM's intelligent contact management system in action. See how AI transforms traditional contact databases into relationship intelligence hubs.
              </p>
            </div>
          </AnimatedElement>
          
          {/* Benefits Grid */}
          <AnimatedElement animation="fadeIn" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <Database className="text-blue-400" size={24} />,
                  title: "AI-Powered Contact Intelligence",
                  description: "Automatic contact enrichment and relationship mapping that builds comprehensive customer profiles."
                },
                {
                  icon: <Zap className="text-purple-400" size={24} />,
                  title: "Smart Contact Management",
                  description: "Intelligent contact organization with automated categorization, duplicate detection, and data validation."
                },
                {
                  icon: <Users className="text-green-400" size={24} />,
                  title: "360° Relationship View",
                  description: "Complete interaction history, communication patterns, and relationship strength scoring for every contact."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
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
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/70">{benefit.description}</p>
                  
                  <motion.div
                    className="mt-4 pt-4 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="flex items-start space-x-1">
                      <CheckCircle size={14} className="text-green-400 mt-0.5" />
                      <p className="text-white/60 text-xs">
                        {index === 0 ? "Powered by multiple AI models for maximum accuracy" : 
                         index === 1 ? "Saves 2+ hours per week on contact maintenance" :
                         "Real-time updates across all connected platforms"}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </AnimatedElement>

          {/* Interactive Demo Container */}
          <AnimatedElement animation="scale" delay={0.4}>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
              <InteractiveFloatingButton 
                text="Try Interactive Demo" 
                position="top-right"
                color="blue"
                delay={1}
              />
              
              {/* Demo Header */}
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Live Contacts Demo</h3>
                    <p className="text-white/70">
                      This is a fully functional demonstration of Smart CRM's Enhanced Contacts module. 
                      Interact with the interface to see how it works in real-time.
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center text-sm"
                      onClick={toggleFullscreen}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Maximize2 size={16} className="mr-2" />
                      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    </motion.button>
                    
                    <motion.button
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center text-sm"
                      onClick={openInNewTab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Open in New Tab
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Iframe Container */}
              <div className={`relative ${isFullscreen ? 'h-screen' : 'h-[600px] md:h-[700px]'} transition-all duration-300`}>
                <iframe
                  src="https://taupe-sprinkles-83c9ee.netlify.app"
                  title="Smart CRM Enhanced Contacts Module"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)'
                  }}
                />
                
                {/* Loading Overlay (will disappear once iframe loads) */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-white font-medium">Loading Contacts Module...</p>
                    <p className="text-white/60 text-sm">Preparing your interactive demo</p>
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
                      <p className="text-white font-medium text-sm">Fully Interactive Demo</p>
                      <p className="text-white/60 text-xs">All features are functional and responsive</p>
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

          {/* Feature Highlights */}
          <AnimatedElement animation="fadeIn" delay={0.6}>
            <div className="mt-12 bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Key Features Demonstrated Above
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    feature: "Smart Contact Search",
                    description: "AI-powered semantic search that understands context and relationships"
                  },
                  {
                    feature: "Automatic Data Enrichment", 
                    description: "Contact profiles automatically enhanced with social and business data"
                  },
                  {
                    feature: "Relationship Intelligence",
                    description: "Visual relationship mapping and interaction history tracking"
                  },
                  {
                    feature: "Real-time Collaboration",
                    description: "Team members can collaborate on contact management in real-time"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                    whileHover={{ 
                      y: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(59, 130, 246, 0.3)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                  >
                    <h4 className="text-white font-medium mb-2 text-sm">{item.feature}</h4>
                    <p className="text-white/60 text-xs">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <motion.button 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openInNewTab}
                >
                  <span>Explore Full Contacts Module</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </motion.button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          className="fixed inset-0 bg-black z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="h-full flex flex-col">
            <div className="bg-gray-900 p-4 flex justify-between items-center border-b border-gray-700">
              <h3 className="text-white font-medium">Smart CRM Enhanced Contacts - Fullscreen Demo</h3>
              <div className="flex gap-3">
                <motion.button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center text-sm"
                  onClick={openInNewTab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={16} className="mr-2" />
                  Open in New Tab
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                  onClick={toggleFullscreen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Exit Fullscreen
                </motion.button>
              </div>
            </div>
            
            <div className="flex-1">
              <iframe
                src="https://taupe-sprinkles-83c9ee.netlify.app"
                title="Smart CRM Enhanced Contacts Module - Fullscreen"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default EnhancedContacts;