import React, { useState } from 'react';
import { Users, BarChart, Zap, Shield, Brain, Workflow, Calendar, Mail, PieChart, MessageSquare, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string[];
}

const features: Feature[] = [
  {
    icon: <Brain className="text-blue-400" />,
    title: "AI-Powered Insights",
    description: "Leverage machine learning to predict customer needs, identify sales opportunities, and receive smart recommendations on next best actions.",
    details: [
      "Automatically analyzes email sentiment and customer intent",
      "Predicts deal outcomes with 89% accuracy based on historical patterns",
      "Recommends optimal times to follow up based on customer engagement",
      "Identifies at-risk accounts before churn signals appear"
    ]
  },
  {
    icon: <BarChart className="text-yellow-400" />,
    title: "Advanced Analytics",
    description: "Visualize customer journey data and sales performance with customizable real-time dashboards that reveal hidden patterns and opportunities.",
    details: [
      "Interactive pipeline visualization with drag-and-drop forecasting",
      "Custom report builder with 50+ pre-built templates",
      "Automated weekly/monthly performance summaries",
      "Cohort analysis to track customer behavior over time"
    ]
  },
  {
    icon: <Shield className="text-green-400" />,
    title: "Enterprise Security",
    description: "Keep customer data secure with SOC 2 compliance, end-to-end encryption, regular security audits, and role-based access controls.",
    details: [
      "SOC 2 Type II and GDPR compliant",
      "End-to-end 256-bit AES encryption at rest and in transit",
      "Customizable role-based access controls",
      "Detailed audit logs for all user activities"
    ]
  },
  {
    icon: <Zap className="text-purple-400" />,
    title: "Seamless Integrations",
    description: "Connect with your existing tools including email, calendar, messaging, and productivity apps through our extensive integration marketplace.",
    details: [
      "Native integration with Gmail, Outlook, and Office 365",
      "Two-way sync with Slack, Teams, and Zoom",
      "Connect with 150+ apps including DocuSign, Mailchimp, and LinkedIn",
      "Open API for custom integrations with your proprietary tools"
    ]
  },
  {
    icon: <Users className="text-amber-400" />,
    title: "Customer 360° View",
    description: "Access complete customer history, interactions, and preferences in a unified interface that provides context for every conversation.",
    details: [
      "Unified timeline of all customer interactions across channels",
      "Automated relationship mapping between contacts and companies",
      "Social media profile enrichment and activity tracking",
      "Intelligent scoring of relationship strength and engagement"
    ]
  },
  {
    icon: <Workflow className="text-blue-400" />,
    title: "Automated Workflows",
    description: "Create custom workflows that automate repetitive tasks, follow-ups, and approvals to keep your team focused on high-value activities.",
    details: [
      "No-code workflow builder with drag-and-drop interface",
      "Multi-step automation triggers based on customer actions",
      "Automated lead routing based on custom rules",
      "Time-saving templates for common sales processes"
    ]
  },
  {
    icon: <Calendar className="text-green-400" />,
    title: "Smart Scheduling",
    description: "Let AI handle the back-and-forth of scheduling meetings with built-in calendar intelligence that finds the perfect time for everyone.",
    details: [
      "AI scheduling assistant that works via email",
      "Automated buffer time between meetings",
      "Timezone intelligence for global team coordination",
      "Smart rescheduling suggestions when conflicts arise"
    ]
  },
  {
    icon: <Mail className="text-purple-400" />,
    title: "Email Intelligence",
    description: "Automatically capture all customer communications with smart email parsing that extracts meaningful data without manual entry.",
    details: [
      "Auto-capture of all email conversations with customers",
      "Smart classification of emails by intent (question, objection, etc.)",
      "Follow-up reminders based on email response patterns",
      "AI-generated email templates personalized for each prospect"
    ]
  },
  {
    icon: <PieChart className="text-yellow-400" />,
    title: "Revenue Forecasting",
    description: "Make data-driven decisions with predictive forecasting that analyzes your pipeline and provides accurate revenue projections.",
    details: [
      "AI-powered forecasting with 91% accuracy",
      "Multiple forecast scenarios (conservative, expected, stretch)",
      "Visual pipeline analysis with bottleneck identification",
      "Customizable quota and goal tracking"
    ]
  },
  {
    icon: <MessageSquare className="text-amber-400" />,
    title: "Conversation AI",
    description: "Get real-time coaching during customer calls and generate follow-up emails that maintain your voice while saving you time.",
    details: [
      "Real-time call coaching with objection handling suggestions",
      "Automatic call recording and transcription",
      "AI-extracted action items and conversation summaries",
      "Smart email follow-ups based on conversation content"
    ]
  }
];

const FeatureShowcase: React.FC = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  const toggleFeatureDetails = (index: number) => {
    if (expandedFeature === index) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(index);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* Animated floating icons specific to feature showcase */}
      <AnimatedIconsGroup 
        section="features" 
        iconCount={15} 
        animations={['bounce', 'pulse', 'rotate']}
        density="high" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl transition-all duration-300 group"
            whileHover={{
              y: -10,
              boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.15)",
              borderColor: "rgba(59, 130, 246, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }}
            onHoverStart={() => setHoveredFeature(index)}
            onHoverEnd={() => setHoveredFeature(null)}
            onClick={() => toggleFeatureDetails(index)}
            style={{ cursor: 'pointer' }}
          >
            <motion.div 
              className="p-3 bg-white/10 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform"
              animate={hoveredFeature === index ? { 
                rotate: [0, 10, -10, 0],
                backgroundColor: "rgba(59, 130, 246, 0.2)"
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
            
            {expandedFeature !== index && (
              <motion.button
                className="mt-4 text-blue-400 text-sm flex items-center"
                whileHover={{ x: 3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredFeature === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <span>See details</span>
                <ChevronRight size={14} className="ml-1" />
              </motion.button>
            )}
            
            {expandedFeature === index && feature.details && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                    >
                      <div className="min-w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-white/80 text-sm">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  className="mt-4 text-blue-400 text-sm flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Learn more</span>
                  <ArrowRight size={14} className="ml-1" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureShowcase;