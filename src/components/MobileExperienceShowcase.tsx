import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Check, Globe, Wifi, WifiOff, Zap, Clock, Mail, Calendar, ArrowRight } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import App3dEffect from './App3dEffect';
import InteractiveFloatingButton from './InteractiveFloatingButton';

// Icon components - moved to the top to fix reference errors
const Volume2 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

const Camera = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

const BarChart2 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const FileText = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const Bell = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const Battery = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
    <line x1="22" y1="11" x2="22" y2="13"></line>
  </svg>
);

const ThumbsUp = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
);

const ChevronDown = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const AppleIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" />
    <path d="m15.7 10.4-.9.4" />
    <path d="m9.2 13.2.9.4" />
    <path d="m12.8 7.7-.4.9" />
    <path d="m11.6 15.4.4.9" />
    <path d="m10.5 10.4-2.7-1.2" />
    <path d="m16.2 14.8-2.7-1.2" />
    <path d="m10.7 8.7-1.3-2.6" />
    <path d="m14.6 17.9-1.4-2.6" />
  </svg>
);

const AndroidIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 16V7c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4h-3"></path>
    <path d="M14 2v2"></path>
    <path d="M10 2v2"></path>
    <path d="M10 22a2 2 0 0 1-3 0c-.67-1.5-.67-3 0-4a2 2 0 0 1 3 0"></path>
  </svg>
);

const MessageSquare = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

interface MobileFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  screenshot?: string;
  benefits: string[];
}

const mobileFeatures: MobileFeature[] = [
  {
    id: 'offline-sync',
    title: 'Work Offline, Sync Later',
    description: 'Continue working without internet connection. All changes automatically sync when you\'re back online.',
    icon: <WifiOff size={24} className="text-blue-400" />,
    screenshot: 'https://images.pexels.com/photos/6633867/pexels-photo-6633867.jpeg?auto=compress&cs=tinysrgb&w=1600',
    benefits: [
      'Update records during client visits without cell coverage',
      'Add notes while on flights or in remote areas',
      'Queue up emails to send when connectivity returns',
      'Automatic background synchronization'
    ]
  },
  {
    id: 'voice-commands',
    title: 'Voice Commands & Dictation',
    description: 'Add notes, create tasks, and navigate your CRM hands-free with voice commands and dictation.',
    icon: <Volume2 size={24} className="text-purple-400" />,
    screenshot: 'https://images.pexels.com/photos/7709020/pexels-photo-7709020.jpeg?auto=compress&cs=tinysrgb&w=1600',
    benefits: [
      'Dictate meeting notes while driving between appointments',
      'Create follow-up tasks using natural language commands',
      'Search your CRM with voice queries',
      'Transcribe customer calls directly into contact records'
    ]
  },
  {
    id: 'location-aware',
    title: 'Location Intelligence',
    description: 'Get proximity alerts for nearby customers and optimize your route for sales visits.',
    icon: <Globe size={24} className="text-green-400" />,
    screenshot: 'https://images.pexels.com/photos/7713177/pexels-photo-7713177.jpeg?auto=compress&cs=tinysrgb&w=1600',
    benefits: [
      'Notifications when near customer locations',
      'Route optimization for multiple client visits',
      'Navigation integration with Google or Apple Maps',
      'Location-based task reminders'
    ]
  },
  {
    id: 'business-card',
    title: 'Business Card Scanner',
    description: 'Instantly capture and create contacts from business cards with our AI-powered scanner.',
    icon: <Camera size={24} className="text-amber-400" />,
    screenshot: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=1600',
    benefits: [
      'OCR technology extracts all card details automatically',
      'Creates new contact record with zero typing',
      'Works in various lighting conditions',
      'AI enhancement of low-quality images'
    ]
  },
  {
    id: 'mobile-dashboard',
    title: 'Mobile-Optimized Dashboards',
    description: 'View your key metrics and performance indicators with dashboards designed specifically for mobile.',
    icon: <BarChart2 size={24} className="text-red-400" />,
    screenshot: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1600',
    benefits: [
      'At-a-glance performance metrics',
      'Simplified visualizations for small screens',
      'Customizable mobile dashboard',
      'Real-time data updates'
    ]
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions & Shortcuts',
    description: 'Perform common tasks with a single tap using customizable quick actions and widgets.',
    icon: <Zap size={24} className="text-blue-400" />,
    screenshot: 'https://images.pexels.com/photos/6481991/pexels-photo-6481991.jpeg?auto=compress&cs=tinysrgb&w=1600',
    benefits: [
      'One-tap actions for common workflows',
      'Customizable action buttons',
      'Home screen widgets for key metrics',
      'Recently accessed contacts and deals'
    ]
  },
  {
    id: 'document-capture',
    title: 'Document Capture & Annotation',
    description: 'Scan documents, annotate PDFs, and attach files directly to your CRM records.',
    icon: <FileText size={24} className="text-yellow-400" />,
    screenshot: 'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=1600',
    benefits: [
      'Scan and OCR paper documents',
      'Digital signature capture',
      'PDF annotation tools',
      'Direct attachment to contacts and opportunities'
    ]
  },
  {
    id: 'notifications',
    title: 'Smart Notifications',
    description: 'Get intelligent alerts about important updates, tasks, and opportunities that need attention.',
    icon: <Bell size={24} className="text-purple-400" />,
    screenshot: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1600',
    benefits: [
      'AI-prioritized notifications based on importance',
      'Deal update alerts',
      'Task due reminders',
      'Customer engagement notifications'
    ]
  }
];

const MobileExperienceShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>(mobileFeatures[0].id);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  
  const currentFeature = mobileFeatures.find(f => f.id === activeFeature);
  
  return (
    <section id="mobile-experience" className="py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-black/80 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Smart CRM Mobile Experience</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Access your CRM anytime, anywhere with our powerful mobile apps for iOS and Android
            </p>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Mobile Device Preview */}
          <AnimatedElement animation="scale" delay={0.2}>
            <div className="flex justify-center relative">
              <InteractiveFloatingButton 
                text="Interactive Preview" 
                position="top-right" 
                color="green"
                delay={1}
              />
              
              <App3dEffect depth={10} className="max-w-xs">
                <div className="relative rounded-[40px] border-[14px] border-black bg-black shadow-xl">
                  {/* Screen Content */}
                  <div className="relative rounded-[26px] overflow-hidden bg-gray-900 aspect-[9/19.5] w-full">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 bg-black py-2 px-4 flex justify-between items-center z-10">
                      <div className="text-white text-xs">9:41</div>
                      <div className="flex items-center space-x-2">
                        <Wifi size={12} className="text-white" />
                        <Battery size={12} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Phone "Notch" */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl z-20"></div>
                    
                    {/* App Content */}
                    <AnimatePresence mode="wait">
                      {currentFeature && (
                        <motion.div
                          key={currentFeature.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full pt-8"
                        >
                          {currentFeature.screenshot ? (
                            <img 
                              src={currentFeature.screenshot} 
                              alt={currentFeature.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-b from-blue-800 to-blue-900 flex items-center justify-center">
                              <div className="text-white text-center">
                                <Smartphone size={40} className="mx-auto mb-2" />
                                <p>{currentFeature.title}</p>
                              </div>
                            </div>
                          )}
                          
                          {/* Mobile Feature Label */}
                          <motion.div 
                            className="absolute bottom-4 left-2 right-2 bg-black/70 backdrop-blur-md rounded-xl p-3"
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <div className="flex items-center">
                              <motion.div
                                animate={{ 
                                  rotate: [0, 10, -10, 0],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
                              >
                                {currentFeature.icon}
                              </motion.div>
                              <div>
                                <h3 className="text-white font-medium text-sm">{currentFeature.title}</h3>
                                <p className="text-white/70 text-xs">{currentFeature.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Home Button/Indicator */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full"></div>
                </div>
              </App3dEffect>
            </div>
          </AnimatedElement>
          
          {/* Feature Selection */}
          <AnimatedElement animation="slideUp" delay={0.3}>
            <div className="space-y-4 relative">
              <InteractiveFloatingButton 
                text="Select Features" 
                position="top-right" 
                color="blue"
                delay={3}
              />
              
              <h3 className="text-2xl font-semibold text-white mb-6">Key Mobile Features</h3>
              
              {/* Feature Selection Buttons */}
              <div className="space-y-3">
                {mobileFeatures.slice(0, showAllFeatures ? mobileFeatures.length : 4).map((feature) => (
                  <motion.button
                    key={feature.id}
                    className={`w-full flex items-start p-4 rounded-lg text-left transition-all ${
                      activeFeature === feature.id 
                        ? 'bg-blue-600/20 border border-blue-500/40' 
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                    onClick={() => setActiveFeature(feature.id)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className={`p-2 rounded-lg ${
                        activeFeature === feature.id 
                          ? 'bg-blue-500/30' 
                          : 'bg-white/10'
                      } mr-3 mt-0.5`}
                      animate={activeFeature === feature.id ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: activeFeature === feature.id ? Infinity : 0 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h4 className={`font-medium ${
                        activeFeature === feature.id 
                          ? 'text-white' 
                          : 'text-white/80'
                      }`}>
                        {feature.title}
                      </h4>
                      <p className={`text-sm ${
                        activeFeature === feature.id 
                          ? 'text-white/80' 
                          : 'text-white/60'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Show More/Less Button */}
              {mobileFeatures.length > 4 && (
                <motion.button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="text-blue-400 mt-2 flex items-center text-sm"
                  whileHover={{ x: 5 }}
                >
                  {showAllFeatures ? 'Show Less Features' : 'Show More Features'} 
                  <ChevronDown className={`ml-1 transform ${showAllFeatures ? 'rotate-180' : ''}`} size={14} />
                </motion.button>
              )}
            </div>
          </AnimatedElement>
        </div>
        
        {/* Feature Benefits Section */}
        {currentFeature && (
          <AnimatedElement animation="fadeIn" delay={0.4}>
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 max-w-4xl mx-auto relative">
              <InteractiveFloatingButton 
                text="View Benefits" 
                position="top-right" 
                color="amber"
                size="small"
                delay={5}
              />
              
              <motion.h3 
                className="text-xl font-semibold text-white mb-4 flex items-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ThumbsUp className="text-blue-400 mr-2" size={20} />
                Benefits of {currentFeature.title}
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentFeature.benefits.map((benefit, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <Check className="text-green-400 mr-3 mt-1" size={16} />
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="text-white/60 text-sm">
                  Available on iOS and Android devices
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AppleIcon size={20} />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AndroidIcon size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </AnimatedElement>
        )}
        
        {/* Mobile Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {[
            {
              value: "95%",
              label: "User Satisfaction",
              icon: <ThumbsUp className="text-green-400" size={20} />,
              description: "Mobile app user satisfaction rating"
            },
            {
              value: "42%",
              label: "More Updates",
              icon: <Zap className="text-blue-400" size={20} />,
              description: "Increase in data updates with mobile access"
            },
            {
              value: "28%",
              label: "Faster Deal Closure",
              icon: <Clock className="text-amber-400" size={20} />,
              description: "Reduction in sales cycle time with mobile access"
            },
            {
              value: "3.2x",
              label: "More Customer Interactions",
              icon: <MessageSquare className="text-purple-400" size={20} />,
              description: "Increase in customer touchpoints"
            }
          ].map((stat, idx) => (
            <AnimatedElement key={idx} animation="slideUp" delay={0.2 + (idx * 0.1)}>
              <motion.div 
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 text-center"
                whileHover={{ 
                  y: -10,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-white mb-2"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                <p className="text-white/50 text-xs mt-1">{stat.description}</p>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <motion.button 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Try Smart CRM Mobile</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default MobileExperienceShowcase;