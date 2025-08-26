import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Building, Clock, Zap, Mail, Calendar, BarChart, Check, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import { SignupContext } from '../App';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  workflowSteps: WorkflowStep[];
}

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  timeSaved: string;
  features: string[];
  imageSrc?: string;
  automatedLabel?: string;
}

// Define roles with their workflows
const roles: Role[] = [
  {
    id: "sales-rep",
    title: "Sales Representative",
    description: "Day-to-day workflow for sales reps using Smart CRM to manage prospects and opportunities.",
    icon: <User size={24} />,
    color: "blue",
    workflowSteps: [
      {
        id: "morning-review",
        title: "Morning Dashboard Review",
        description: "Quick overview of today's priorities, tasks, and opportunities that need attention.",
        timeLabel: "8:00 AM",
        timeSaved: "15 minutes saved daily",
        automatedLabel: "AI-prioritized daily agenda",
        features: ["Smart Task Prioritization", "Deal Health Scoring", "Follow-up Reminders"],
        imageSrc: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "email-triage",
        title: "Email Communication",
        description: "Respond to customer emails with AI-assisted templates and suggestions.",
        timeLabel: "9:30 AM",
        timeSaved: "45 minutes saved daily",
        automatedLabel: "Auto-categorized emails",
        features: ["Email Intelligence", "Smart Templates", "Sentiment Analysis"],
        imageSrc: "https://images.pexels.com/photos/6893933/pexels-photo-6893933.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "customer-calls",
        title: "Customer Calls",
        description: "Make calls with real-time coaching, automated note-taking, and follow-up scheduling.",
        timeLabel: "11:00 AM",
        timeSaved: "30 minutes saved per call",
        automatedLabel: "AI call coaching",
        features: ["Call Scripting", "Real-time Coaching", "Automated Note Taking"],
        imageSrc: "https://images.pexels.com/photos/7709020/pexels-photo-7709020.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "opportunity-management",
        title: "Opportunity Management",
        description: "Update deal stages, add notes, and create follow-up tasks without manual data entry.",
        timeLabel: "2:00 PM",
        timeSaved: "1 hour saved daily",
        automatedLabel: "Pipeline automation",
        features: ["Voice Commands", "Mobile Updates", "Activity Capture"],
        imageSrc: "https://images.pexels.com/photos/8867431/pexels-photo-8867431.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "proposal-generation",
        title: "Proposal Generation",
        description: "Create personalized proposals with auto-populated customer data and pricing.",
        timeLabel: "4:00 PM",
        timeSaved: "2 hours saved per proposal",
        automatedLabel: "AI-generated content",
        features: ["Smart Proposal Generator", "Template Library", "Electronic Signatures"],
        imageSrc: "https://images.pexels.com/photos/5387282/pexels-photo-5387282.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    id: "sales-manager",
    title: "Sales Manager",
    description: "How sales leaders use Smart CRM to coach their team and optimize the sales process.",
    icon: <Users size={24} />,
    color: "purple",
    workflowSteps: [
      {
        id: "team-performance",
        title: "Team Performance Review",
        description: "Analyze team metrics, identify coaching opportunities, and spot potential issues.",
        timeLabel: "8:30 AM",
        timeSaved: "45 minutes saved daily",
        automatedLabel: "Automated performance metrics",
        features: ["Performance Dashboards", "Coaching Insights", "Forecast Analytics"],
        imageSrc: "https://images.pexels.com/photos/7688376/pexels-photo-7688376.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "pipeline-review",
        title: "Pipeline Review",
        description: "Analyze deal flow, identify bottlenecks, and reallocate resources as needed.",
        timeLabel: "10:00 AM",
        timeSaved: "1 hour saved weekly",
        automatedLabel: "AI forecasting",
        features: ["Pipeline Visualization", "Bottleneck Detection", "Resource Optimization"],
        imageSrc: "https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "team-meetings",
        title: "Team Meetings",
        description: "Run effective meetings with AI-generated agendas and automatic action item tracking.",
        timeLabel: "1:00 PM",
        timeSaved: "30 minutes per meeting",
        automatedLabel: "Meeting intelligence",
        features: ["Meeting Agenda Generator", "Action Item Tracking", "Performance Updates"],
        imageSrc: "https://images.pexels.com/photos/6457524/pexels-photo-6457524.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "coaching-sessions",
        title: "Coaching Sessions",
        description: "Personalized coaching based on AI-analyzed call recordings and customer interactions.",
        timeLabel: "3:00 PM",
        timeSaved: "1 hour per coaching session",
        automatedLabel: "AI-powered coaching insights",
        features: ["Call Analytics", "Sentiment Tracking", "Improvement Recommendations"],
        imageSrc: "https://images.pexels.com/photos/3810756/pexels-photo-3810756.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "forecast-reporting",
        title: "Forecasting & Reporting",
        description: "Generate accurate forecasts and executive reports with minimal manual work.",
        timeLabel: "5:00 PM",
        timeSaved: "3 hours saved weekly",
        automatedLabel: "Automated reporting",
        features: ["Predictive Forecasting", "Custom Report Builder", "Automated Delivery"],
        imageSrc: "https://images.pexels.com/photos/7688426/pexels-photo-7688426.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    id: "revenue-ops",
    title: "Revenue Operations",
    description: "How RevOps professionals use Smart CRM to optimize processes and technology.",
    icon: <Building size={24} />,
    color: "green",
    workflowSteps: [
      {
        id: "system-monitoring",
        title: "System Performance Monitoring",
        description: "Review system health, adoption metrics, and data quality alerts.",
        timeLabel: "8:00 AM",
        timeSaved: "30 minutes saved daily",
        automatedLabel: "Automated monitoring",
        features: ["Adoption Analytics", "Data Quality Scoring", "System Health Dashboards"],
        imageSrc: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "process-optimization",
        title: "Sales Process Optimization",
        description: "Analyze conversion rates between stages and optimize the sales process.",
        timeLabel: "10:30 AM",
        timeSaved: "2 hours saved weekly",
        automatedLabel: "AI process recommendations",
        features: ["Conversion Analytics", "Process Mapping", "Bottleneck Identification"],
        imageSrc: "https://images.pexels.com/photos/6956892/pexels-photo-6956892.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "automation-workflow",
        title: "Automation Workflow Building",
        description: "Create and refine automated workflows for lead routing, task creation, and approvals.",
        timeLabel: "1:00 PM",
        timeSaved: "3 hours saved per workflow",
        automatedLabel: "Visual workflow builder",
        features: ["No-Code Automation", "Trigger Configuration", "A/B Testing"],
        imageSrc: "https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "data-management",
        title: "Data Management & Enrichment",
        description: "Maintain data quality through automated cleansing, deduplication, and enrichment.",
        timeLabel: "3:00 PM",
        timeSaved: "5+ hours saved weekly",
        automatedLabel: "Automated data cleansing",
        features: ["Duplicate Detection", "Data Enrichment", "Field Standardization"],
        imageSrc: "https://images.pexels.com/photos/4342098/pexels-photo-4342098.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "cross-system-integration",
        title: "Cross-System Integration",
        description: "Manage data flow between Smart CRM and other business systems.",
        timeLabel: "4:30 PM",
        timeSaved: "10+ hours saved weekly",
        automatedLabel: "Self-monitoring integrations",
        features: ["API Management", "Error Handling", "Data Transformation"],
        imageSrc: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  }
];

const WorkflowShowcase: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>(roles[0].id);
  const [activeStep, setActiveStep] = useState<string>(roles[0].workflowSteps[0].id);
  const [isExpanded, setIsExpanded] = useState(false);
  const { openSignupModal } = useContext(SignupContext);
  
  const currentRole = roles.find(role => role.id === selectedRole);
  const currentStep = currentRole?.workflowSteps.find(step => step.id === activeStep);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <section id="workflow-showcase" className="py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/30 pointer-events-none" />
      
      {/* Animated floating icons for workflow section */}
      <AnimatedIconsGroup 
        section="features" 
        iconCount={15} 
        animations={['rotate', 'pulse', 'bounce', 'random']} 
        density="medium"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">A Day in the Life with Smart CRM</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See how Smart CRM transforms daily workflows for different roles in your organization
            </p>
          </div>
        </AnimatedElement>
        
        {/* Role Selection Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/10 p-1 rounded-full">
            {roles.map((role) => (
              <motion.button
                key={role.id}
                className={`px-5 py-2 rounded-full text-sm font-medium flex items-center ${
                  selectedRole === role.id ? `bg-${role.color}-600 text-white` : 'text-white/70 hover:text-white'
                }`}
                onClick={() => {
                  setSelectedRole(role.id);
                  setActiveStep(role.workflowSteps[0].id);
                  setIsExpanded(false);
                }}
                whileHover={{ scale: selectedRole !== role.id ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{role.icon}</span>
                <span>{role.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {currentRole && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Workflow Timeline Sidebar */}
            <div>
              <AnimatedElement animation="slideUp" delay={0.2}>
                <div className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 ${
                  isExpanded ? 'h-auto' : 'h-auto lg:h-[500px]'
                } overflow-hidden relative`}>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <motion.div
                      className={`p-2 rounded-full bg-${currentRole.color}-500/20 mr-3`}
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
                    >
                      {currentRole.icon}
                    </motion.div>
                    <span>{currentRole.title} Workflow</span>
                  </h3>
                  
                  <p className="text-white/70 mb-6">{currentRole.description}</p>
                  
                  {/* Timeline */}
                  <div className="relative mb-4">
                    <div className="absolute left-3.5 top-0 bottom-0 w-px bg-white/10" />
                    
                    {currentRole.workflowSteps.map((step, index) => {
                      const isActive = step.id === activeStep;
                      return (
                        <motion.div 
                          key={step.id}
                          className={`relative mb-4 pl-8 ${index >= 4 && !isExpanded ? 'lg:opacity-50' : ''}`}
                          whileHover={{ x: 3 }}
                        >
                          {/* Timeline dot */}
                          <motion.div 
                            className={`absolute left-0 w-7 h-7 rounded-full ${
                              isActive 
                                ? `bg-${currentRole.color}-600 text-white` 
                                : 'bg-white/10 text-white/50'
                            } flex items-center justify-center z-10`}
                            animate={isActive ? {
                              scale: [1, 1.2, 1],
                              backgroundColor: [
                                `rgba(${currentRole.color === 'blue' ? '37, 99, 235' : currentRole.color === 'purple' ? '124, 58, 237' : '16, 185, 129'}, 0.6)`, 
                                `rgba(${currentRole.color === 'blue' ? '37, 99, 235' : currentRole.color === 'purple' ? '124, 58, 237' : '16, 185, 129'}, 1)`, 
                                `rgba(${currentRole.color === 'blue' ? '37, 99, 235' : currentRole.color === 'purple' ? '124, 58, 237' : '16, 185, 129'}, 0.6)`
                              ]
                            } : {}}
                            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                          >
                            <Clock size={14} />
                          </motion.div>
                          
                          <button 
                            className={`block w-full text-left py-2 px-3 rounded-lg ${
                              isActive 
                                ? `bg-${currentRole.color}-500/20 border border-${currentRole.color}-500/40` 
                                : 'hover:bg-white/5'
                            }`}
                            onClick={() => setActiveStep(step.id)}
                          >
                            <div className="flex justify-between items-center">
                              <span className={`text-sm ${
                                isActive ? `text-${currentRole.color}-400` : 'text-white/50'
                              }`}>
                                {step.timeLabel}
                              </span>
                              {step.automatedLabel && (
                                <span className="bg-white/10 text-white/70 text-[10px] px-1.5 py-0.5 rounded">
                                  {step.automatedLabel}
                                </span>
                              )}
                            </div>
                            <h4 className="text-white font-medium mt-1">{step.title}</h4>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {currentRole.workflowSteps.length > 4 && (
                    <motion.button
                      className={`w-full text-${currentRole.color}-400 text-sm flex items-center justify-center mt-2`}
                      onClick={toggleExpanded}
                      whileHover={{ y: isExpanded ? 0 : -2 }}
                    >
                      {isExpanded ? 'Show Less' : 'View Full Day'}
                      <ChevronRight className={`ml-1 transform ${isExpanded ? 'rotate-90' : ''}`} size={14} />
                    </motion.button>
                  )}
                </div>
              </AnimatedElement>
              
              {/* Productivity Stats Card */}
              <AnimatedElement animation="fadeIn" delay={0.4}>
                <motion.div 
                  className={`mt-6 bg-gradient-to-br from-${currentRole.color}-900/30 to-${currentRole.color === 'blue' ? 'purple' : currentRole.color === 'purple' ? 'blue' : 'blue'}-900/30 backdrop-blur-md rounded-xl border border-${currentRole.color}-500/30 p-6`}
                  whileHover={{ 
                    y: -5,
                    boxShadow: `0 10px 25px -5px rgba(${currentRole.color === 'blue' ? '59, 130, 246' : currentRole.color === 'purple' ? '139, 92, 246' : '16, 185, 129'}, 0.3)`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-semibold mb-4">Productivity Impact</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/70 text-sm">Time Saved</span>
                        <span className="text-white font-medium">70%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full bg-${currentRole.color}-500`}
                          initial={{ width: 0 }}
                          animate={{ width: '70%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/70 text-sm">Administrative Work</span>
                        <span className="text-white font-medium">-65%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          transition={{ duration: 1, delay: 0.6 }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/70 text-sm">Customer Interactions</span>
                        <span className="text-white font-medium">+45%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full bg-${currentRole.color === 'green' ? 'blue' : currentRole.color === 'blue' ? 'purple' : 'green'}-500`}
                          initial={{ width: 0 }}
                          animate={{ width: '45%' }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-white/10 mt-4">
                      <span className="text-white font-medium">Overall Productivity: </span>
                      <span className="text-green-400 font-bold">+62%</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatedElement>
            </div>
            
            {/* Main Workflow Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep && (
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 h-full"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                      {/* Step Details */}
                      <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="mb-6">
                          <div className="flex items-center">
                            <motion.div
                              className={`p-2 rounded-full bg-${currentRole.color}-500/20 mr-3`}
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
                            >
                              <Clock className="h-6 w-6" />
                            </motion.div>
                            <div>
                              <span className={`text-${currentRole.color}-400 text-sm`}>{currentStep.timeLabel}</span>
                              <h2 className="text-2xl font-bold text-white">{currentStep.title}</h2>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-white/80 mb-6">{currentStep.description}</p>
                        
                        <div className="bg-white/5 rounded-lg p-4 mb-6">
                          <div className="flex items-center mb-3">
                            <Zap className={`text-${currentRole.color}-400 mr-2`} size={16} />
                            <h3 className="text-white font-medium">Time Savings</h3>
                          </div>
                          <p className={`text-${currentRole.color}-400 font-bold text-lg`}>{currentStep.timeSaved}</p>
                        </div>
                        
                        {/* Step Features */}
                        <div>
                          <h3 className="text-white font-medium mb-3">Key Features Used</h3>
                          <div className="space-y-3">
                            {currentStep.features.map((feature, idx) => (
                              <motion.div 
                                key={idx} 
                                className="flex items-center bg-white/5 p-3 rounded-lg"
                                whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.3 }}
                              >
                                <Check className={`text-${currentRole.color}-400 mr-3`} size={16} />
                                <span className="text-white/80 text-sm">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Step Visual */}
                      <div className="lg:col-span-3 order-1 lg:order-2">
                        <motion.div 
                          className="rounded-xl overflow-hidden border border-white/10 mb-4"
                          whileHover={{ scale: 1.02 }}
                        >
                          {currentStep.imageSrc && (
                            <img 
                              src={currentStep.imageSrc} 
                              alt={currentStep.title} 
                              className="w-full h-64 object-cover"
                            />
                          )}
                        </motion.div>
                        
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <h3 className="text-white font-medium mb-3">How Smart CRM Makes This Better</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                              {
                                icon: <Zap size={16} />,
                                title: "Automation",
                                description: "Reduces manual tasks and streamlines workflow"
                              },
                              {
                                icon: <BrainCircuit size={16} />,
                                title: "AI Insights",
                                description: "Provides intelligent recommendations based on data"
                              },
                              {
                                icon: <Calendar size={16} />,
                                title: "Time Savings",
                                description: "Frees up time for high-value activities"
                              }
                            ].map((benefit, idx) => (
                              <motion.div
                                key={idx}
                                className="bg-white/10 rounded-lg p-3"
                                whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                              >
                                <motion.div 
                                  className={`p-1.5 rounded-full bg-${currentRole.color}-500/20 w-fit mb-2`}
                                  whileHover={{ rotate: 15 }}
                                >
                                  {benefit.icon}
                                </motion.div>
                                <h4 className="text-white text-sm font-medium mb-1">{benefit.title}</h4>
                                <p className="text-white/60 text-xs">{benefit.description}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Navigation */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                      <div className="flex items-center">
                        <MessageSquare className="text-white/60 mr-2" size={16} />
                        <span className="text-white/60 text-sm">
                          Step {currentRole.workflowSteps.findIndex(s => s.id === currentStep.id) + 1} of {currentRole.workflowSteps.length}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <PrevStepButton 
                          role={currentRole} 
                          currentStepId={currentStep.id} 
                          onStepChange={setActiveStep}
                        />
                        <NextStepButton 
                          role={currentRole} 
                          currentStepId={currentStep.id} 
                          onStepChange={setActiveStep}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <motion.p 
            className="text-xl text-white/80 mb-6 max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            Experience how Smart CRM can transform productivity for every role in your organization.
          </motion.p>
          
          <motion.button 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openSignupModal('masterclass')}
          >
            <span>Get Smart CRM</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Helper components
interface StepButtonProps {
  role: Role;
  currentStepId: string;
  onStepChange: (stepId: string) => void;
}

const NextStepButton: React.FC<StepButtonProps> = ({ role, currentStepId, onStepChange }) => {
  const currentIndex = role.workflowSteps.findIndex(step => step.id === currentStepId);
  const isLastStep = currentIndex === role.workflowSteps.length - 1;
  
  const handleNext = () => {
    if (!isLastStep) {
      onStepChange(role.workflowSteps[currentIndex + 1].id);
    }
  };
  
  return (
    <motion.button
      className={`px-4 py-2 rounded-lg flex items-center ${
        isLastStep 
          ? 'bg-white/5 text-white/40 cursor-not-allowed' 
          : `bg-${role.color}-600 text-white hover:bg-${role.color}-700`
      }`}
      onClick={handleNext}
      whileHover={!isLastStep ? { scale: 1.05 } : {}}
      whileTap={!isLastStep ? { scale: 0.95 } : {}}
      disabled={isLastStep}
    >
      <span>Next Step</span>
      <ChevronRight size={16} className="ml-1" />
    </motion.button>
  );
};

const PrevStepButton: React.FC<StepButtonProps> = ({ role, currentStepId, onStepChange }) => {
  const currentIndex = role.workflowSteps.findIndex(step => step.id === currentStepId);
  const isFirstStep = currentIndex === 0;
  
  const handlePrev = () => {
    if (!isFirstStep) {
      onStepChange(role.workflowSteps[currentIndex - 1].id);
    }
  };
  
  return (
    <motion.button
      className={`px-4 py-2 rounded-lg flex items-center ${
        isFirstStep 
          ? 'bg-white/5 text-white/40 cursor-not-allowed' 
          : 'bg-white/10 text-white hover:bg-white/20'
      }`}
      onClick={handlePrev}
      whileHover={!isFirstStep ? { scale: 1.05 } : {}}
      whileTap={!isFirstStep ? { scale: 0.95 } : {}}
      disabled={isFirstStep}
    >
      <ChevronLeft size={16} className="mr-1" />
      <span>Previous Step</span>
    </motion.button>
  );
};

// Icon components
const ChevronLeft = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const BrainCircuit = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default WorkflowShowcase;