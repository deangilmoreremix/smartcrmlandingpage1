import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Zap, ArrowRight, CheckCircle, ExternalLink, Target, Settings, Lightbulb, Activity, X } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import CollapsibleSection from './CollapsibleSection';
import { EMBED_URLS } from '../constants/embedUrls';
import JVZooBuyButton from './JVZooBuyButton';

const AICalendarSection: React.FC = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const calendarFeatures = [
    {
      title: "AI Meeting Intelligence",
      description: "Smart scheduling with optimal time slots, participant analysis, and meeting outcome predictions",
      icon: <Calendar className="text-blue-400" size={24} />,
      benefits: [
        "Optimal meeting time recommendations",
        "Participant availability analysis",
        "Meeting outcome probability scoring",
        "Automated follow-up scheduling"
      ]
    },
    {
      title: "Time Optimization",
      description: "AI-powered time management with focus blocks, productivity analysis, and smart reminders",
      icon: <Clock className="text-purple-400" size={24} />,
      benefits: [
        "Focus time block scheduling",
        "Productivity pattern analysis",
        "Smart meeting duration optimization",
        "Automated time tracking and reporting"
      ]
    },
    {
      title: "Team Coordination",
      description: "Advanced collaboration features with resource booking, team availability, and conflict resolution",
      icon: <Users className="text-green-400" size={24} />,
      benefits: [
        "Resource and room booking automation",
        "Team availability synchronization",
        "Meeting conflict detection and resolution",
        "Cross-team collaboration scheduling"
      ]
    },
    {
      title: "Smart Automation",
      description: "Intelligent workflow automation with recurring meetings, follow-ups, and task assignments",
      icon: <Zap className="text-amber-400" size={24} />,
      benefits: [
        "Automated recurring meeting setup",
        "Smart follow-up and reminder systems",
        "Task assignment and deadline tracking",
        "Workflow integration and notifications"
      ]
    }
  ];

  const calendarStats = [
    { value: "65%", label: "Time saved on scheduling", icon: <Clock size={18} className="text-blue-400" /> },
    { value: "40%", label: "Fewer meeting conflicts", icon: <Users size={18} className="text-green-400" /> },
    { value: "3x", label: "Faster meeting setup", icon: <Zap size={18} className="text-purple-400" /> },
    { value: "92%", label: "Meeting attendance rate", icon: <Target size={18} className="text-amber-400" /> }
  ];

  return (
    <section id="calendar" className="py-20 px-4 relative overflow-hidden">
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
          className="absolute top-1/4 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"
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
              className="inline-flex items-center bg-cyan-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-md border border-cyan-500/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(6, 182, 212, 0.3)",
                borderColor: "rgba(6, 182, 212, 0.4)"
              }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="text-cyan-400 mr-2" size={18} />
              <span className="text-white font-medium">AI-Powered Calendar</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Intelligent Time Management
            </motion.h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Smart CRM's AI calendar transforms how you schedule, optimize, and manage your time with intelligent meeting coordination and productivity insights.
            </p>
          </div>
        </AnimatedElement>

        {/* Calendar Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {calendarFeatures.map((feature, idx) => (
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

        {/* Calendar Stats */}
        <AnimatedElement animation="fadeIn" delay={0.6}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Calendar Intelligence Impact</h3>
              <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {calendarStats.map((stat, idx) => (
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
                    className="text-2xl font-bold text-cyan-400 block mb-1"
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
              borderColor: "rgba(6, 182, 212, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }}
          >
            <InteractiveFloatingButton
              text="Try Live Demo"
              position="top-right"
              color="blue"
              delay={1}
            />

            {/* Background glow effect */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
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
              <h3 className="text-2xl font-semibold text-white mb-4">Experience AI Calendar Intelligence</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                See how AI transforms your scheduling into an intelligent time management system with smart coordination and productivity insights.
              </p>

              <motion.button
                onClick={() => setShowEmbed(!showEmbed)}
                className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full transition-colors shadow-lg font-medium mb-6"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.4)" }}
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
                      <span className="text-white/70 text-sm">Smart CRM AI Calendar Intelligence</span>
                      <div className="flex items-center space-x-2">
                        {!isIframeLoaded && (
                          <div className="flex items-center text-white/60 text-sm">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400 mr-2"></div>
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
                    <div className="iframe-responsive-container">
                      <iframe
                        src={EMBED_URLS.calendar}
                        className="absolute top-0 left-0 w-full h-full rounded-lg border border-white/10"
                        onLoad={() => setIsIframeLoaded(true)}
                        title="Smart CRM AI Calendar Intelligence Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; picture-in-picture"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads allow-presentation allow-top-navigation-by-user-activation allow-storage-access-by-user-activation"
                        referrerPolicy="origin-when-cross-origin"
                        loading="eager"
                        importance="high"
                      />
                    </div>
                  </div>

                  <motion.div
                    className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">🚀 Complete Smart CRM Calendar Features & Instructions</h4>

                    <div className="space-y-2">
                      <CollapsibleSection
                        title="📅 AI Calendar Features & Functions"
                        variant="primary"
                        icon={<Calendar size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li><strong>Smart Scheduling:</strong> AI-powered optimal time slot recommendations</li>
                          <li><strong>Meeting Intelligence:</strong> Participant analysis and outcome predictions</li>
                          <li><strong>Time Optimization:</strong> Focus blocks and productivity pattern analysis</li>
                          <li><strong>Team Coordination:</strong> Resource booking and availability sync</li>
                          <li><strong>Conflict Resolution:</strong> Automated meeting conflict detection</li>
                          <li><strong>Smart Reminders:</strong> Context-aware notifications and follow-ups</li>
                          <li><strong>Workflow Automation:</strong> Recurring meetings and task assignments</li>
                          <li><strong>Integration Hub:</strong> Connect with email, tasks, and tools</li>
                          <li><strong>Mobile Optimization:</strong> Full calendar management on mobile</li>
                          <li><strong>Analytics Dashboard:</strong> Time tracking and productivity insights</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="⚡ Quick Scheduling Features"
                        variant="secondary"
                        icon={<Zap size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• <strong>Smart Time Finder:</strong> AI suggests optimal meeting times</li>
                          <li>• <strong>Participant Analysis:</strong> Best times based on response patterns</li>
                          <li>• <strong>Duration Optimization:</strong> Recommended meeting lengths</li>
                          <li>• <strong>Buffer Time:</strong> Automatic travel and preparation time</li>
                          <li>• <strong>Time Zone Intelligence:</strong> Global team coordination</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="👥 Team Collaboration Tools"
                        variant="secondary"
                        icon={<Users size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• <strong>Resource Booking:</strong> Meeting rooms and equipment</li>
                          <li>• <strong>Team Availability:</strong> Real-time schedule synchronization</li>
                          <li>• <strong>Meeting Templates:</strong> Pre-configured meeting types</li>
                          <li>• <strong>Guest Management:</strong> External participant coordination</li>
                          <li>• <strong>Meeting Series:</strong> Automated recurring meeting setup</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="⚙️ Advanced Calendar Settings"
                        variant="secondary"
                        icon={<Settings size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• <strong>Working Hours:</strong> Custom availability and time zones</li>
                          <li>• <strong>Meeting Preferences:</strong> Duration limits and buffer times</li>
                          <li>• <strong>Notification Settings:</strong> Custom alerts and reminders</li>
                          <li>• <strong>Integration Rules:</strong> Auto-sync with external calendars</li>
                          <li>• <strong>Privacy Controls:</strong> Visibility and sharing permissions</li>
                        </ul>
                      </CollapsibleSection>

                      <CollapsibleSection
                        title="💡 Calendar Management Pro Tips"
                        variant="success"
                        icon={<Lightbulb size={18} />}
                      >
                        <ul className="text-white/80 text-sm space-y-2">
                          <li>• Set up focus blocks for deep work sessions</li>
                          <li>• Use AI scheduling for optimal meeting times</li>
                          <li>• Review productivity analytics weekly</li>
                          <li>• Automate recurring meetings and follow-ups</li>
                          <li>• Sync with team calendars for better coordination</li>
                        </ul>
                      </CollapsibleSection>
                    </div>

                    <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <h5 className="text-lg font-medium text-blue-300 mb-2">💡 Getting Started:</h5>
                      <p className="text-white/80 text-sm">
                        <strong>Step 1:</strong> Connect your calendar and set your working hours<br/>
                        <strong>Step 2:</strong> Try the AI scheduling assistant for a new meeting<br/>
                        <strong>Step 3:</strong> Set up focus blocks for productive work time<br/>
                        <strong>Step 4:</strong> Configure team availability and resource booking<br/>
                        <strong>Step 5:</strong> Review analytics to optimize your time management
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
              className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-md rounded-xl p-8 border border-cyan-500/30"
              whileHover={{
                borderColor: "rgba(6, 182, 212, 0.4)",
                backgroundColor: "rgba(6, 182, 212, 0.1)"
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Master Your Time with AI</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Transform your scheduling with AI-powered calendar intelligence, smart coordination, and productivity optimization.
              </p>

              <JVZooBuyButton>
                <motion.button
                  className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full transition-colors shadow-lg font-medium"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get Smart CRM - $97</span>
                  <ArrowRight className="ml-2" size={18} />
                </motion.button>
              </JVZooBuyButton>
            </motion.div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default AICalendarSection;