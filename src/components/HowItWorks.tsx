import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Cloud, BarChart, Zap, Users, Workflow, Clock, ArrowRight } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import { SignupContext } from '../App';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import StepCard from './HowItWorks/StepCard';
import FeatureCategory from './HowItWorks/FeatureCategory';
import SuccessMetrics from './HowItWorks/SuccessMetrics';
import ImplementationSection from './HowItWorks/ImplementationSection';
import WorkflowShowcase from './WorkflowShowcase';
// Additional icon components
const Palette = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const Database = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const BookOpen = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const Search = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserCheck = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const ChevronRight = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Sparkles = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const Check = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Cpu = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

// Icon components
const ChevronLeft = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const Filter = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const HowItWorks: React.FC = React.memo(() => {
  const [activeStep, setActiveStep] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { openSignupModal } = useContext(SignupContext);

  // Auto-advance steps every 5 seconds if user isn't interacting
  useEffect(() => {
    if (!isAutoAdvancing) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoAdvancing]);

  // Pause auto-advance when user interacts, resume after 10 seconds of inactivity
  useEffect(() => {
    if (expandedStep !== null || hoverIndex !== null) {
      setIsAutoAdvancing(false);
    } else {
      const timeout = setTimeout(() => {
        setIsAutoAdvancing(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [expandedStep, hoverIndex]);

  const steps = [
    {
      number: "1",
      title: "AI Analyzes Your Business",
      description: "Our intelligent system learns your specific business patterns, customer preferences, and sales cycles to create a personalized CRM experience.",
      icon: <BrainCircuit className="text-blue-400" size={32} />,
      details: [
        "Automatic pattern recognition across your customer data",
        "Identifies key metrics specifically relevant to your industry",
        "Creates custom AI models trained for your unique business context",
        "Continuously learns and improves as you use the system"
      ],
      color: "blue",
      animation: {
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1]
      }
    },
    {
      number: "2",
      title: "Intelligent Automation",
      description: "Smart CRM eliminates repetitive tasks by automatically capturing, organizing, and prioritizing all customer interactions.",
      icon: <Cloud className="text-purple-400" size={32} />,
      details: [
        "Automatic email and call logging without manual data entry",
        "Intelligent meeting transcription and summary creation",
        "Smart follow-up scheduling based on interaction contexts",
        "Automated data enrichment from multiple sources"
      ],
      color: "purple",
      animation: {
        y: [0, -5, 0, 5, 0],
        filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
      }
    },
    {
      number: "3",
      title: "Strategic Insights",
      description: "Transform raw data into actionable intelligence with AI-powered analytics that surface opportunities your team would otherwise miss.",
      icon: <BarChart className="text-green-400" size={32} />,
      details: [
        "Predictive opportunity scoring to focus on winnable deals",
        "Relationship health metrics to prevent customer churn",
        "Actionable recommendations for next-best-steps",
        "Competitive intelligence and strategic positioning suggestions"
      ],
      color: "green",
      animation: {
        y: [0, 5, 0],
        x: [0, 5, 0]
      }
    },
    {
      number: "4",
      title: "Accelerated Results",
      description: "Close more deals with less effort as Smart CRM's AI highlights the highest-value opportunities and suggests optimal engagement strategies.",
      icon: <Zap className="text-amber-400" size={32} />,
      details: [
        "Revenue acceleration through optimized sales processes",
        "Intelligent pipeline management with prioritized opportunities",
        "A/B tested outreach recommendations for higher response rates",
        "Comprehensive customer journey tracking and optimization"
      ],
      color: "amber",
      animation: {
        scale: [1, 1.2, 1],
        rotate: [0, 5, 0, -5, 0]
      }
    }
  ];

  const toggleStepDetails = (index: number) => {
    if (expandedStep === index) {
      setExpandedStep(null);
    } else {
      setExpandedStep(index);
    }
  };

  const toggleCategoryDetails = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  // Each feature category showcases different Smart CRM capabilities
  const featureCategories = [
    {
      name: "Sales Acceleration",
      icon: <Cpu size={24} className="text-blue-400" />,
      features: ["Deal intelligence", "Sales playbooks", "Pipeline optimization", "Revenue forecasting"],
      detailedContent: {
        description: "Transform your sales process with AI-powered acceleration that identifies opportunities, optimizes strategies, and predicts outcomes with unprecedented accuracy.",
        benefits: [
          "41% higher win rates through predictive deal intelligence",
          "3.2x faster sales cycles with automated optimization",
          "$2.1M average increase in deal size per rep",
          "85%+ accuracy in revenue forecasting"
        ],
        features: [
          {
            title: "Deal Intelligence",
            description: "AI analyzes deal patterns, competitor actions, and customer signals to predict win probability and optimal next steps.",
            impact: "Identifies at-risk deals 14 days earlier than traditional methods"
          },
          {
            title: "Sales Playbooks",
            description: "Dynamic, AI-generated playbooks that adapt to each prospect's unique profile and behavior patterns.",
            impact: "Personalized strategies for every deal scenario"
          },
          {
            title: "Pipeline Optimization",
            description: "Real-time pipeline analysis with bottleneck identification and automated deal routing.",
            impact: "Eliminates 65% of manual pipeline management tasks"
          },
          {
            title: "Revenue Forecasting",
            description: "Multi-scenario forecasting with 91% accuracy, considering market conditions and deal velocity.",
            impact: "Reduces forecasting variance by 75%"
          }
        ]
      }
    },
    {
      name: "Customer Insights",
      icon: <Users size={24} className="text-purple-400" />,
      features: ["Relationship scoring", "Sentiment analysis", "Engagement tracking", "Churn prediction"],
      detailedContent: {
        description: "Understand your customers like never before with AI-driven insights that reveal hidden patterns, predict behavior, and guide relationship-building strategies.",
        benefits: [
          "3.5x more effective customer interactions",
          "94% improvement in customer retention rates",
          "Personalized engagement strategies for every customer",
          "Predictive churn prevention with 89% accuracy"
        ],
        features: [
          {
            title: "Relationship Scoring",
            description: "Multi-dimensional scoring (0-100) combining engagement, value, loyalty, and growth potential.",
            impact: "Prioritizes high-value relationships automatically"
          },
          {
            title: "Sentiment Analysis",
            description: "Real-time analysis of all customer communications to detect mood, intent, and satisfaction levels.",
            impact: "Identifies satisfaction issues before they escalate"
          },
          {
            title: "Engagement Tracking",
            description: "Comprehensive tracking of all touchpoints across email, calls, meetings, and social media.",
            impact: "Creates complete customer journey visibility"
          },
          {
            title: "Churn Prediction",
            description: "Early warning system that predicts churn risk with behavioral and sentiment indicators.",
            impact: "Reduces churn by 67% through proactive intervention"
          }
        ]
      }
    },
    {
      name: "Workflow Intelligence",
      icon: <Workflow size={24} className="text-green-400" />,
      features: ["Task prioritization", "Time optimization", "Meeting preparation", "Follow-up automation"],
      detailedContent: {
        description: "Streamline your daily workflow with AI that prioritizes tasks, optimizes your time, and automates repetitive processes to focus on what matters most.",
        benefits: [
          "68% reduction in administrative work time",
          "3.2x more customer touchpoints per day",
          "94% improvement in meeting productivity",
          "57% increase in overall time utilization"
        ],
        features: [
          {
            title: "Task Prioritization",
            description: "AI analyzes task urgency, impact, and your work patterns to create optimal daily task lists.",
            impact: "Ensures critical tasks are never missed"
          },
          {
            title: "Time Optimization",
            description: "Smart scheduling that finds optimal meeting times and creates focus blocks for deep work.",
            impact: "Maximizes productive time utilization"
          },
          {
            title: "Meeting Preparation",
            description: "Automated agenda creation, background research, and talking point generation for every meeting.",
            impact: "Reduces preparation time by 75%"
          },
          {
            title: "Follow-up Automation",
            description: "Intelligent follow-up sequences that adapt based on meeting outcomes and customer responses.",
            impact: "Increases follow-up response rates by 40%"
          }
        ]
      }
    },
    {
      name: "Data Intelligence",
      icon: <Database size={24} className="text-amber-400" />,
      features: ["Data enrichment", "Lead scoring", "Contact management", "Account mapping"],
      detailedContent: {
        description: "Transform raw data into actionable intelligence with AI-powered enrichment, scoring, and management that ensures data quality and strategic insights.",
        benefits: [
          "95% improvement in data accuracy and completeness",
          "3.5x faster lead qualification process",
          "Elimination of duplicate and outdated records",
          "Strategic account mapping for better targeting"
        ],
        features: [
          {
            title: "Data Enrichment",
            description: "Automatic gap-filling using web research, LinkedIn data, and market intelligence sources.",
            impact: "Enriches contact data by 85% automatically"
          },
          {
            title: "Lead Scoring",
            description: "Multi-model scoring combining firmographic, technographic, and behavioral data.",
            impact: "Increases qualified lead conversion by 60%"
          },
          {
            title: "Contact Management",
            description: "Intelligent deduplication, relationship mapping, and lifecycle management.",
            impact: "Maintains clean, accurate contact databases"
          },
          {
            title: "Account Mapping",
            description: "Visual organization charts and relationship mapping for account-based marketing.",
            impact: "Improves account penetration by 45%"
          }
        ]
      }
    }
  ];

  // Success metrics that illustrate results
  const successMetrics = [
    { value: "68%", label: "Less administrative work", icon: <Clock size={18} className="text-blue-400" /> },
    { value: "41%", label: "Higher win rates", icon: <ChevronRight size={18} className="text-green-400" /> },
    { value: "3.2x", label: "More customer touchpoints", icon: <Users size={18} className="text-purple-400" /> },
    { value: "57%", label: "Improved data accuracy", icon: <Check size={18} className="text-amber-400" /> }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/20 pointer-events-none" />
      
      {/* Animated floating icons themed for the how-it-works section */}
      <AnimatedIconsGroup 
        section="features" 
        iconCount={10}
        animations={['rotate', 'orbit', 'pulse']} 
        density="medium"
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" 
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" 
          animate={{ 
            x: [0, -20, 0],
            y: [0, 40, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 18,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <AnimatedElement animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How Smart CRM Works</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From implementation to transformative results in four intelligent steps
            </p>
          </AnimatedElement>
        </div>
        
        <div className="relative mb-20">
          {/* Enhanced Progress indicator with glow effect */}
          <div className="absolute top-32 left-0 right-0 h-2 bg-white/5 hidden md:block rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
              style={{ backgroundSize: "200% 200%" }}
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 0%"],
                width: `${((activeStep + 1) / steps.length) * 100}%` 
              }}
              transition={{ 
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                width: { duration: 0.5, ease: "easeInOut" }
              }}
            />
          </div>
          
          {steps.map((_, index) => (
            <motion.div 
              key={index}
              className="absolute hidden md:block"
              style={{ 
                left: `${(index / (steps.length - 1)) * 100}%`,
                top: "30px",
                transform: "translateX(-50%)"
              }}
            >
              <motion.div
                className={`relative w-10 h-10 rounded-full ${
                  activeStep >= index 
                    ? `bg-${steps[index].color}-600 text-white` 
                    : 'bg-white/10 text-white/60'
                } flex items-center justify-center text-lg font-bold z-10`}
                animate={
                  activeStep === index 
                    ? { 
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 0 10px rgba(59, 130, 246, 0.3)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      } 
                    : {}
                }
                transition={{ 
                  duration: 2, 
                  repeat: activeStep === index ? Infinity : 0,
                  repeatDelay: 1 
                }}
              >
                {steps[index].number}
                
                {activeStep === index && (
                  <motion.div 
                    className={`absolute inset-0 rounded-full bg-${steps[index].color}-500 opacity-50 blur-sm`}
                    animate={{ 
                      scale: [0.8, 1.5, 0.8],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <AnimatedElement key={index} animation="slideUp" delay={index * 0.2}>
                <StepCard
                  step={step}
                  index={index}
                  activeStep={activeStep}
                  expandedStep={expandedStep}
                  onClick={() => {
                    setActiveStep(index);
                    toggleStepDetails(index);
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              </AnimatedElement>
            ))}
          </div>
        </div>
        
        {/* New Feature Category Showcase */}
        <AnimatedElement animation="fadeIn" delay={0.4}>
          <div className="mb-20">
            <motion.div 
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8"
              whileHover={{ 
                borderColor: "rgba(59, 130, 246, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }}
            >
              <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl" />
                    <Sparkles className="text-blue-400 relative z-10" size={28} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white ml-3">Intelligent Features by Category</h3>
                </div>
                <p className="text-white/70 max-w-3xl mx-auto">
                  Smart CRM's AI-powered capabilities transform every aspect of customer relationship management, whether you're a solopreneur or managing a global team.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featureCategories.map((category, idx) => (
                  <FeatureCategory
                    key={idx}
                    category={category}
                    index={idx}
                    expandedCategory={expandedCategory}
                    onToggle={toggleCategoryDetails}
                  />
                ))}
              </div>
              
              {/* Feature Connection Lines (desktop only) */}
              <div className="hidden lg:block relative h-2 my-8">
                <motion.div 
                  className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px bg-white/20"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />
                
                <motion.div className="absolute left-1/4 top-0 w-px h-8 -mt-4 bg-white/20"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
                
                <motion.div className="absolute left-2/4 top-0 w-px h-8 -mt-4 bg-white/20"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />
                
                <motion.div className="absolute left-3/4 top-0 w-px h-8 -mt-4 bg-white/20"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                />
              </div>
              
              {/* Success Metrics Row */}
              <SuccessMetrics metrics={successMetrics} />
            </motion.div>
          </div>
        </AnimatedElement>

        {/* Workflow Showcase Section - moved from standalone to nested within How It Works */}
        <div className="mt-20">
          <WorkflowShowcase />
        </div>

        {/* Enhanced Implementation Support Section */}
        <ImplementationSection openSignupModal={openSignupModal} />
      </div>
    </section>
  );
});


export default HowItWorks;