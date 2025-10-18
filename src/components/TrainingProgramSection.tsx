import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookOpen, Star, Check, CheckCircle, Gift, Zap, PlusCircle, ArrowRight, Users, Award, CloudLightning as Lightning, BrainCircuit, Sparkles, Lightbulb, BadgeCheck, User, Mail, AlertTriangle, Clock, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedElement from './AnimatedElement';
import EmailSubscribe from './EmailSubscribe';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import { SignupContext } from '../App';
import { getInstructorImageUrl } from '../utils/supabaseClient';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface TrainingDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  color: string;
  date: string;
}

const trainingDays: TrainingDay[] = [
  {
    day: 1,
    title: "The Broken Sales Process & Why It's Costing You",
    description: "Discover why traditional CRM systems are failing sales teams and learn the hidden costs of manual data entry that's destroying your productivity.",
    highlights: [
      'Uncover the true cost of CRM data entry on your sales team',
      "See why 67% of CRM implementations fail to meet expectations",
      "Learn how Smart CRM eliminates 70% of manual administrative work"
    ],
    icon: <AlertTriangle size={28} />,
    color: "blue",
    date: "October 19, 2025"
  },
  {
    day: 2,
    title: "Automate, Personalize, and Scale Your Sales",
    description: "See how AI-powered automation can transform your sales process, making personalization scalable without increasing workload.",
    highlights: [
      'Break the "I don\'t have time" myth once and for all',
      "Watch how AI handles scoring, follow-ups, and meetings for you",
      "See the automation that boosted sales 32% for Jennifer's team"
    ],
    icon: <BrainCircuit size={28} />,
    color: "purple",
    date: "October 20, 2025"
  },
  {
    day: 3,
    title: "Your Future Sales System + Smart CRM Offer Reveal",
    description: "Learn how to build a predictable sales system that generates consistent revenue without constant manual effort.",
    highlights: [
      'Discover "The Client Engine System" and how to make sales predictable',
      "See real customer transformations and how to start your own",
      "Get exclusive bonuses + special Smart CRM pricing for attendees"
    ],
    icon: <Lightning size={28} />,
    color: "green",
    date: "October 21, 2025"
  }
];

const TrainingProgramSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const { openSignupModal } = useContext(SignupContext);
  const [instructorImage, setInstructorImage] = useState<string>("https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1600");

  // Fetch instructor image from Supabase
  useEffect(() => {
    const fetchInstructorImage = async () => {
      try {
        const imageUrl = await getInstructorImageUrl();
        if (imageUrl) {
          setInstructorImage(imageUrl);
        }
      } catch (error) {
        console.error("Failed to fetch instructor image:", error);
      }
    };

    fetchInstructorImage();
  }, []);

  return (
    <section id="training" className="py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-black/80 pointer-events-none" />

      {/* Animated floating icons */}
      <AnimatedIconsGroup
        section="ai"
        iconCount={14}
        animations={['bounce', 'pulse', 'orbit']}
        density="high"
      />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 15,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full px-4 py-2 backdrop-blur-md border border-blue-500/30 mb-4"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
            >
              <Calendar className="text-blue-400 mr-2" size={18} />
              <span className="text-white font-medium">Limited-Time Training Event</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-4 text-white"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                3-Day Smart CRM Masterclass
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Join CRM expert Dean Gilmore for a transformative 3-day training on October 19-21, 2025 to revolutionize your sales process using Smart CRM technology
            </motion.p>
          </div>
        </AnimatedElement>

        {/* Training Days Tabs */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              {trainingDays.map((day) => (
                <motion.button
                  key={day.day}
                  className={`px-5 py-3 rounded-lg text-sm md:text-base font-medium flex items-center ${
                    activeDay === day.day
                      ? `bg-${day.color}-600 text-white shadow-lg`
                      : 'text-white/70 hover:text-white'
                  }`}
                  onClick={() => setActiveDay(day.day)}
                  whileHover={{ scale: activeDay !== day.day ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                    activeDay === day.day ? 'bg-white/20' : 'bg-white/10'
                  } mr-2 text-xs`}>
                    {day.day}
                  </span>
                  <span className="hidden sm:inline">Day {day.day}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {trainingDays.map((day) => (
              activeDay === day.day && (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                >
                  {/* Day Content */}
                  <div className={`bg-gradient-to-br from-black to-${day.color}-900/20 backdrop-blur-md rounded-xl p-8 border border-${day.color}-500/30 relative`}>

                    {/* Day Header */}
                    <div className="flex items-center mb-6">
                      <motion.div
                        className={`p-3 rounded-full bg-${day.color}-500/20 mr-4`}
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
                      >
                        {day.icon}
                      </motion.div>
                      <div>
                        <div className="flex items-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs text-${day.color}-400 bg-${day.color}-500/20 mr-2`}>Day {day.day}</span>
                          {day.day === 2 && (
                            <motion.span
                              className="px-2.5 py-0.5 rounded-full text-xs bg-gradient-to-r from-purple-400/20 to-purple-500/20 text-purple-400"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Advanced
                            </motion.span>
                          )}
                          {day.day === 3 && (
                            <motion.span
                              className="px-2.5 py-0.5 rounded-full text-xs bg-gradient-to-r from-green-400/20 to-green-500/20 text-green-400"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Implementation
                            </motion.span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-white mt-1">{day.title}</h3>
                      </div>
                    </div>

                    {/* Day Description */}
                    <p className="text-white/80 text-lg mb-8">{day.description}</p>

                    {/* Day Highlights */}
                    <div className="space-y-4">
                      <h4 className="text-white font-medium flex items-center">
                        <Star className={`text-${day.color}-400 mr-2`} size={16} />
                        <span>What You'll Learn:</span>
                      </h4>

                      <div className="space-y-3">
                        {day.highlights.map((highlight, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 + 0.3 }}
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex-shrink-0 mt-1 relative">
                              <motion.div
                                className={`absolute inset-0 bg-${day.color}-500/30 rounded-full blur-sm opacity-0 group-hover:opacity-100`}
                                animate={{ scale: [0.8, 1.2, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <CheckCircle className={`text-${day.color}-400 relative z-10`} size={18} />
                            </div>
                            <span className="ml-3 text-white/90">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Session Time */}
                    <motion.div
                      className={`mt-8 pt-6 border-t border-white/10 flex items-center`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Calendar className="text-white/60 mr-2" size={16} />
                      <span className="text-white/60 text-sm">Live Training: 3:00 PM EST</span>
                      <div className="ml-auto">
                        <span className={`px-3 py-1 rounded-full text-xs bg-${day.color}-500/20 text-${day.color}-400`}>
                          {day.date}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Day Visual */}
                  <div>
                    {/* Featured Testimonial */}
                    <div className={`bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-6`}>
                      <div className="flex items-start">
                        <div className="relative">
                          <motion.div
                            className={`absolute inset-0 bg-${day.color}-500/30 rounded-full blur-md`}
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <img
                            src={day.day === 1
                              ? "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=150"
                              : day.day === 2
                              ? "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150"
                              : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                            }
                            alt="Testimonial"
                            className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-white/20 relative z-10"
                          />
                        </div>

                        <div className="ml-4">
                          <div className="flex mb-2">
                            {[1,2,3,4,5].map((star) => (
                              <motion.div
                                key={star}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + (star * 0.1) }}
                              >
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                              </motion.div>
                            ))}
                          </div>

                          <motion.p
                            className="text-white/80 italic text-sm mb-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            "{day.day === 1
                              ? "Day 1 opened my eyes to how much time we were wasting with our old CRM. The data entry alone was eating 40% of our week!"
                              : day.day === 2
                              ? "The automation strategies from Day 2 saved my team 15+ hours per week. We're closing deals faster than ever with the AI tools Dean showed us."
                              : "The Client Engine System is brilliant! I implemented it the very next day and saw results within a week. The special pricing made it a no-brainer investment."}"
                          </motion.p>

                          <div className="flex justify-between items-center">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <p className="text-white font-medium text-sm">
                                {day.day === 1 ? "Sarah M." : day.day === 2 ? "Jennifer K." : "Michael T."}
                              </p>
                              <p className="text-white/60 text-xs">
                                {day.day === 1 ? "VP of Sales" : day.day === 2 ? "Sales Manager" : "Agency Owner"}
                              </p>
                            </motion.div>

                            <motion.div
                              className={`px-3 py-1 rounded-full text-xs bg-${day.color}-500/20 text-${day.color}-400`}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              {day.day === 1 ? "70% time saved" : day.day === 2 ? "+32% sales" : "3.5x ROI"}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visual Content */}
                    <div className={`bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 mb-6 relative aspect-video`}>
                      <img
                        src={day.day === 1
                          ? "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                          : day.day === 2
                          ? "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200"
                          : "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        }
                        alt={`Day ${day.day} Training`}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 flex flex-col justify-end p-6">
                        <motion.div
                          className={`p-3 ${day.color === "blue" ? "bg-blue-500" : day.color === "purple" ? "bg-purple-500" : "bg-green-500"} rounded-lg w-fit mb-4`}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                          {day.day === 1
                            ? <AlertTriangle className="text-white" size={24} />
                            : day.day === 2
                            ? <Sparkles className="text-white" size={24} />
                            : <BadgeCheck className="text-white" size={24} />
                          }
                        </motion.div>

                        <h4 className="text-xl font-bold text-white">
                          {day.day === 1
                            ? "Traditional CRM Problems"
                            : day.day === 2
                            ? "AI-Powered Sales Automation"
                            : "The Client Engine System"}
                        </h4>
                        <p className="text-white/80">
                          {day.day === 1
                            ? "Identify what's costing you sales"
                            : day.day === 2
                            ? "Work smarter with AI doing the heavy lifting"
                            : "Build a predictable revenue system that scales"}
                        </p>
                      </div>

                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white font-medium text-sm flex items-center">
                        <Calendar className="mr-2" size={14} />
                        <span>Day {day.day} Preview</span>
                      </div>
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-2 gap-3">
                      {(day.day === 1 ? [
                        { icon: <AlertTriangle size={18} />, text: "Hidden CRM Costs" },
                        { icon: <Clock size={18} />, text: "Time Waste Analysis" },
                        { icon: <TrendingDown size={18} />, text: "Failed Implementations" },
                        { icon: <Check size={18} />, text: "Smart Solutions" }
                      ] : day.day === 2 ? [
                        { icon: <Lightning size={18} />, text: "Time-Saving Automations" },
                        { icon: <User size={18} />, text: "Personalization at Scale" },
                        { icon: <Star size={18} />, text: "Lead Scoring" },
                        { icon: <Check size={18} />, text: "32% Sales Boost Blueprint" }
                      ] : [
                        { icon: <Gift size={18} />, text: "Special Pricing" },
                        { icon: <PlusCircle size={18} />, text: "Exclusive Bonuses" },
                        { icon: <Zap size={18} />, text: "Implementation Plan" },
                        { icon: <Lightbulb size={18} />, text: "Success Roadmap" }
                      ]).map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className={`p-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10`}
                          whileHover={{
                            y: -5,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            borderColor: `rgba(${
                              day.color === 'purple' ? '139, 92, 246' : '34, 197, 94'
                            }, 0.3)`
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 + 0.5 }}
                          onHoverStart={() => setIsHovering(idx)}
                          onHoverEnd={() => setIsHovering(null)}
                        >
                          <div className="flex items-center">
                            <motion.div
                              className={`p-2 rounded-full bg-${day.color}-500/20 mr-3`}
                              animate={isHovering === idx ? {
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              } : {}}
                              transition={{ duration: 1 }}
                            >
                              {feature.icon}
                            </motion.div>
                            <span className="text-white/80 text-sm">{feature.text}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Why Attend Section */}
        <AnimatedElement animation="fadeIn" delay={0.3}>
          <div className="mb-16 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-md rounded-xl p-8 border border-blue-500/30">
            <div className="flex items-center mb-6">
              <motion.div
                className="p-3 bg-blue-500/20 rounded-full mr-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Gift size={24} className="text-blue-400" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white">Why Attend?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className="p-2 rounded-full bg-amber-500/20 mr-3"
                    whileHover={{ rotate: 15 }}
                  >
                    <Award size={20} className="text-amber-400" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-white">Expert Training</h4>
                </div>
                <p className="text-white/70 mb-4">3 Days of high-impact training from Dean Gilmore, who has helped over 500 businesses transform their sales processes.</p>

                <motion.div
                  className="flex items-center text-amber-400 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <Star size={16} className="mr-1.5" />
                  <span>20+ years of CRM implementation experience</span>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className="p-2 rounded-full bg-blue-500/20 mr-3"
                    whileHover={{ rotate: 15 }}
                  >
                    <Zap size={20} className="text-blue-400" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-white">AI-Powered Tools</h4>
                </div>
                <p className="text-white/70 mb-4">Discover 20+ AI-powered CRM tools revealed live during the training that will revolutionize your approach to sales.</p>

                <motion.div
                  className="flex items-center text-blue-400 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <Lightning size={16} className="mr-1.5" />
                  <span>Cutting-edge technology demonstrations</span>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className="p-2 rounded-full bg-green-500/20 mr-3"
                    whileHover={{ rotate: 15 }}
                  >
                    <Users size={20} className="text-green-400" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-white">Proven Results</h4>
                </div>
                <p className="text-white/70 mb-4">See real user case studies with documented before-and-after results that demonstrate the power of Smart CRM implementation.</p>

                <motion.div
                  className="flex items-center text-green-400 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <CheckCircle size={16} className="mr-1.5" />
                  <span>32-46% average sales increase</span>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className="p-2 rounded-full bg-purple-500/20 mr-3"
                    whileHover={{ rotate: 15 }}
                  >
                    <Gift size={20} className="text-purple-400" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-white">Exclusive Bonuses</h4>
                </div>
                <p className="text-white/70 mb-4">Get exclusive Smart CRM access with special attendee pricing, plus bonus onboarding session and priority support included.</p>

                <motion.div
                  className="flex items-center text-purple-400 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <PlusCircle size={16} className="mr-1.5" />
                  <span>$997 value in free bonuses</span>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="text-center p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
              whileHover={{
                borderColor: "rgba(59, 130, 246, 0.4)",
                backgroundColor: "rgba(59, 130, 246, 0.15)"
              }}
            >
              <motion.p
                className="text-xl font-medium text-white mb-4"
                animate={{
                  color: ["#ffffff", "#93c5fd", "#ffffff"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Limited to 200 attendees per session — Reserve your spot now!
              </motion.p>

              <motion.button
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg transition-colors group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openSignupModal('masterclass')}
              >
                <span>Register for Free Masterclass</span>
                <ArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" size={18} />
              </motion.button>

              <motion.p
                className="text-white/60 mt-4 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-blue-400">87% of attendees</span> report implementing the strategies within 7 days
              </motion.p>
            </motion.div>
          </div>
        </AnimatedElement>

        {/* Instructor Info */}
        <AnimatedElement animation="fadeIn" delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10"
                whileHover={{
                  y: -5,
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
              >
                <div className="relative">
                  <img
                    src={instructorImage}
                    alt="Dean Gilmore"
                    className="w-full aspect-[4/3] object-cover"
                    onError={(e) => {
                      console.error("Error loading instructor image:", e);
                      e.currentTarget.src = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1600";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <Link to="/instructor-profile">
                    <motion.div
                      className="absolute bottom-4 left-4 px-3 py-1.5 bg-blue-600/80 backdrop-blur-sm rounded-full text-white text-sm font-medium cursor-pointer"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(37, 99, 235, 0.9)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Meet Your Instructor</span>
                    </motion.div>
                  </Link>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Dean Gilmore</h3>
                  <p className="text-white/70 text-sm mb-4">Serial AI Automation Entrepreneur & Video Personalization Innovator</p>

                  <div className="flex items-center mb-4">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="ml-2 text-white/60 text-xs">500+ Five‑Star Reviews</span>
                  </div>

                  <p className="text-white/70 text-sm">
                    Leveraging 22+ years of pioneering CRM and sales‑automation strategies, Dean has built and scaled platforms like Smart CRM, TrustScout.ai, and VideoRemix—helping businesses of all sizes unlock over $75 million in new revenue through streamlined pipelines, AI‑powered personalization, and turnkey automated workflows.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-2">
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 h-full"
                whileHover={{
                  y: -5,
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
              >
                <h3 className="text-xl font-bold text-white mb-4">What Past Attendees Are Saying</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      quote: "The masterclass completely transformed my sales approach. I implemented the Client Engine System and saw a 46% increase in closed deals within 30 days.",
                      author: "Jason T.",
                      role: "Sales Director"
                    },
                    {
                      quote: "Dean's Smart CRM training finally solved our team's adoption problems. The automation workflows alone saved us 23 hours per week across our team.",
                      author: "Rachel K.",
                      role: "Revenue Operations"
                    },
                    {
                      quote: "I was skeptical about another CRM training, but this was different. The AI tools Dean demonstrated are game-changing, and implementation was surprisingly easy.",
                      author: "Mark S.",
                      role: "Business Owner"
                    },
                    {
                      quote: "As someone who's tried every CRM out there, I can confidently say Smart CRM is different. The training showed me exactly how to make it work for my specific business.",
                      author: "Diana L.",
                      role: "Agency Founder"
                    }
                  ].map((testimonial, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                      whileHover={{
                        y: -3,
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.4 }}
                    >
                      <p className="text-white/80 text-sm italic mb-3">"{testimonial.quote}"</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white text-sm font-medium">{testimonial.author}</p>
                          <p className="text-white/60 text-xs">{testimonial.role}</p>
                        </div>
                        <div className="flex">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                  <div className="flex items-center">
                    <motion.div
                      className="p-2 bg-blue-500/20 rounded-full mr-3"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles size={18} className="text-blue-400" />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-medium">Satisfaction Guarantee</h4>
                      <p className="text-white/70 text-sm">If you don't get value from the masterclass, we'll refund your Smart CRM subscription in full.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedElement>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.h3
            className="text-3xl font-bold text-white mb-6"
            animate={{
              color: ["#ffffff", "#93c5fd", "#ffffff"]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            Join 500+ Businesses Already Registered
          </motion.h3>

          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold text-lg shadow-lg transition-colors group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openSignupModal('masterclass')}
          >
            <span>Secure Your Spot Now</span>
            <ArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>

          <motion.p
            className="text-white/60 mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-blue-400 font-medium">Limited time:</span> Register now for the October 19-21 masterclass and get the Smart CRM Implementation Guide ($197 value) for free
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingProgramSection;