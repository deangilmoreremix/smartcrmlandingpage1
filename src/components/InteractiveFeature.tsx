import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, LineChart, Clipboard, Mail, Calendar } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';

interface FeaturePoint {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const features: FeaturePoint[] = [
  {
    title: 'Email Intelligence',
    description: 'Smart CRM automatically captures and analyzes all your emails, identifying key information and suggesting appropriate follow-ups.',
    icon: <Mail size={24} />,
    color: 'bg-blue-500'
  },
  {
    title: 'Meeting Insights',
    description: 'Record, transcribe, and extract action items from meetings with our AI-powered meeting assistant.',
    icon: <Calendar size={24} />,
    color: 'bg-purple-500'
  },
  {
    title: 'Opportunity Scoring',
    description: 'Our AI analyzes your deals and assigns probability scores based on similar deals you\'ve won in the past.',
    icon: <LineChart size={24} />,
    color: 'bg-green-500'
  },
  {
    title: 'Task Automation',
    description: 'Create powerful automations to handle repetitive tasks, from sending follow-ups to updating records.',
    icon: <Zap size={24} />,
    color: 'bg-yellow-500'
  },
  {
    title: 'Data Protection',
    description: 'Enterprise-grade security with role-based access controls, encryption, and compliance features.',
    icon: <Shield size={24} />,
    color: 'bg-red-500'
  },
  {
    title: 'Smart Templates',
    description: 'Use AI to generate personalized email templates that match your tone of voice and drive engagement.',
    icon: <Clipboard size={24} />,
    color: 'bg-amber-500'
  }
];

const InteractiveFeature: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  return (
    <section className="py-20 px-4 relative bg-gradient-to-b from-black to-blue-950/40">
      <div className="max-w-6xl mx-auto">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Interactive AI Features</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore how Smart CRM's AI features revolutionize your workflow
            </p>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 relative">
            <InteractiveFloatingButton 
              text="Click to Explore" 
              position="top-right"
              color="blue"
            />
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    activeFeature === index 
                      ? `${feature.color}/20 border border-${feature.color}/40` 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ x: activeFeature === index ? 0 : 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 text-white ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{feature.title}</h3>
                      {activeFeature === index && (
                        <motion.p
                          className="text-white/70 text-sm mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-6">
              <motion.button
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <span>See all AI features</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </motion.button>
            </div>
          </div>
          
          <AnimatedElement animation="scale">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-md border border-white/10 rounded-xl">
                <div className="p-8 h-full flex flex-col relative">
                  <div className={`p-3 ${features[activeFeature].color} rounded-lg w-fit mb-4`}>
                    {features[activeFeature].icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{features[activeFeature].title}</h3>
                  
                  <div className="flex-grow mb-6 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFeature}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <div className="bg-white/10 rounded-lg p-4 h-full">
                          <p className="text-white/80">
                            {features[activeFeature].description}
                          </p>
                          
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-white/70 text-sm">
                              Smart CRM users report saving 5+ hours weekly using our {features[activeFeature].title.toLowerCase()} feature.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <InteractiveFloatingButton 
                    text="Try Me" 
                    position="bottom-right"
                    color="green" 
                    delay={3}
                  />
                  
                  <motion.button
                    className={`px-6 py-3 ${features[activeFeature].color} text-white rounded-lg shadow-lg w-full`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try {features[activeFeature].title}
                  </motion.button>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeature;