import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ArrowRight, Check, Lock, Clock, Star } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface FeatureType {
  name: string;
  description: string;
  category: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
  isPopular?: boolean;
  isNew?: boolean;
  implementationComplexity?: 'Low' | 'Medium' | 'High';
  impact?: 'Low' | 'Medium' | 'High';
}

const categories = [
  "Core CRM Features",
  "AI & Automation",
  "Analytics & Reporting",
  "Mobile & Accessibility",
  "Security & Compliance",
  "Integration",
  "Support & Training"
];

const features: FeatureType[] = [
  // Core CRM Features
  {
    name: "Contact Management",
    description: "Store and organize your customer contact information in a central database with custom fields and tags.",
    category: "Core CRM Features",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Deal Pipeline Management",
    description: "Visualize and manage your sales process with customizable stages and visual drag-and-drop interface.",
    category: "Core CRM Features",
    starter: true,
    professional: true,
    enterprise: true,
    isPopular: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Task Management",
    description: "Create, assign, and track tasks to ensure proper follow-up on all customer interactions.",
    category: "Core CRM Features",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Email Integration",
    description: "Two-way sync with your email provider to automatically log communications with contacts.",
    category: "Core CRM Features",
    starter: true,
    professional: true,
    enterprise: true,
    isPopular: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Calendar Integration",
    description: "Sync with Google Calendar, Outlook, or other calendar services for meeting scheduling and tracking.",
    category: "Core CRM Features",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Custom Objects",
    description: "Create custom data models beyond standard CRM objects to track industry or business-specific data.",
    category: "Core CRM Features",
    starter: false,
    professional: "Up to 5 objects",
    enterprise: "Unlimited",
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Custom Fields",
    description: "Add custom fields to any object to track specific information relevant to your business.",
    category: "Core CRM Features",
    starter: "10 per object",
    professional: "50 per object",
    enterprise: "Unlimited",
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Activity Timeline",
    description: "Chronological view of all interactions with a contact or company to maintain relationship context.",
    category: "Core CRM Features",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  
  // AI & Automation
  {
    name: "Email Intelligence",
    description: "Automatically captures and analyzes email content to extract key information and sentiment.",
    category: "AI & Automation",
    starter: "Basic",
    professional: true,
    enterprise: true,
    isPopular: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Smart Email Composer",
    description: "AI-powered tool that generates personalized emails based on context and relationship history.",
    category: "AI & Automation",
    starter: false,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Meeting Summary Generator",
    description: "Automatically creates concise meeting summaries with action items from transcripts.",
    category: "AI & Automation",
    starter: false,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Lead Scoring",
    description: "AI-powered evaluation of lead quality based on engagement, profile data, and behavior patterns.",
    category: "AI & Automation",
    starter: "Rules-based",
    professional: "AI-powered",
    enterprise: "Advanced AI",
    isPopular: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Smart Scheduling Assistant",
    description: "AI scheduling tool that handles the back-and-forth of finding meeting times via email.",
    category: "AI & Automation",
    starter: false,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Workflow Automation",
    description: "Create multi-step automated processes to handle repetitive tasks and keep deals moving.",
    category: "AI & Automation",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Custom",
    isPopular: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "AI Conversation Coach",
    description: "Real-time guidance during customer calls to improve communication effectiveness.",
    category: "AI & Automation",
    starter: false,
    professional: false,
    enterprise: true,
    isNew: true,
    implementationComplexity: 'High',
    impact: 'High'
  },
  {
    name: "Semantic Search",
    description: "Find anything in your CRM with natural language queries that understand context and intent.",
    category: "AI & Automation",
    starter: false,
    professional: true,
    enterprise: true,
    isNew: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "AI Form Auto-completion",
    description: "Automatically fill forms using AI-powered suggestions based on existing data.",
    category: "AI & Automation",
    starter: false,
    professional: true,
    enterprise: true,
    isNew: true,
    implementationComplexity: 'Medium',
    impact: 'Medium'
  },
  {
    name: "Real-time Document Analysis",
    description: "Extract insights from documents and images with live progress updates.",
    category: "AI & Automation",
    starter: false,
    professional: false,
    enterprise: true,
    isNew: true,
    implementationComplexity: 'High',
    impact: 'Medium'
  },
  
  // Analytics & Reporting
  {
    name: "Basic Reporting",
    description: "Standard reports for sales, pipeline, and activity metrics to track performance.",
    category: "Analytics & Reporting",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Custom Report Builder",
    description: "Create personalized reports with flexible data selection and visualization options.",
    category: "Analytics & Reporting",
    starter: false,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Dashboard Creator",
    description: "Build customizable dashboards with drag-and-drop widgets to visualize key metrics.",
    category: "Analytics & Reporting",
    starter: "Basic",
    professional: true,
    enterprise: true,
    isPopular: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Sales Forecasting",
    description: "AI-powered projections for sales outcomes based on pipeline and historical performance.",
    category: "Analytics & Reporting",
    starter: false,
    professional: true,
    enterprise: true,
    isPopular: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Customer Journey Analytics",
    description: "Visualize and analyze the complete customer lifecycle from lead to advocate.",
    category: "Analytics & Reporting",
    starter: false,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'Medium'
  },
  {
    name: "Revenue Attribution",
    description: "Track and analyze which activities and channels are driving your revenue growth.",
    category: "Analytics & Reporting",
    starter: false,
    professional: "Basic",
    enterprise: true,
    implementationComplexity: 'High',
    impact: 'High'
  },
  {
    name: "Predictive Analytics",
    description: "Machine learning algorithms that predict future outcomes and identify trends.",
    category: "Analytics & Reporting",
    starter: false,
    professional: false,
    enterprise: true,
    implementationComplexity: 'High',
    impact: 'High'
  },
  {
    name: "Advanced Segmentation",
    description: "Slice and dice your customer data with complex, multi-variable segmentation.",
    category: "Analytics & Reporting",
    starter: "Basic",
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  
  // Mobile & Accessibility
  {
    name: "Native Mobile Apps",
    description: "iOS and Android apps for on-the-go access to your CRM data and functions.",
    category: "Mobile & Accessibility",
    starter: true,
    professional: true,
    enterprise: true,
    isPopular: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Mobile Data Capture",
    description: "Easily capture business cards, scan documents, and add photos directly from your mobile device.",
    category: "Mobile & Accessibility",
    starter: "Basic",
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Offline Mode",
    description: "Continue working even without internet connection with automatic synchronization when back online.",
    category: "Mobile & Accessibility",
    starter: false,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Voice Commands",
    description: "Control your CRM with voice input for hands-free operation while on the move.",
    category: "Mobile & Accessibility",
    starter: false,
    professional: false,
    enterprise: true,
    isNew: true,
    implementationComplexity: 'High',
    impact: 'Medium'
  },
  {
    name: "Location-Based Features",
    description: "Get proximity alerts for nearby customers and route optimization for field sales.",
    category: "Mobile & Accessibility",
    starter: false,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'Medium'
  },
  {
    name: "Accessibility Compliance",
    description: "WCAG 2.1 AA compliant interface with screen reader support and keyboard navigation.",
    category: "Mobile & Accessibility",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'Medium'
  },
  
  // Security & Compliance
  {
    name: "Role-Based Access Control",
    description: "Grant specific permissions to different user roles to ensure data protection.",
    category: "Security & Compliance",
    starter: "Basic",
    professional: true,
    enterprise: "Advanced",
    isPopular: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Two-Factor Authentication",
    description: "Add an extra layer of security for user logins with 2FA support.",
    category: "Security & Compliance",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Data Encryption",
    description: "End-to-end encryption for all data at rest and in transit.",
    category: "Security & Compliance",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Audit Logs",
    description: "Detailed tracking of all user activities for security monitoring and compliance.",
    category: "Security & Compliance",
    starter: "Basic",
    professional: true,
    enterprise: "Advanced",
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "GDPR Compliance Tools",
    description: "Features to help maintain GDPR compliance including data subject requests and consent management.",
    category: "Security & Compliance",
    starter: "Basic",
    professional: true,
    enterprise: true,
    implementationComplexity: 'High',
    impact: 'High'
  },
  {
    name: "SOC 2 Compliance",
    description: "Adherence to SOC 2 standards for secure data management.",
    category: "Security & Compliance",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'High',
    impact: 'High'
  },
  {
    name: "IP Restrictions",
    description: "Limit system access to specified IP addresses for enhanced security.",
    category: "Security & Compliance",
    starter: false,
    professional: "Basic",
    enterprise: "Advanced",
    implementationComplexity: 'Medium',
    impact: 'Medium'
  },
  {
    name: "Single Sign-On (SSO)",
    description: "Integrate with your identity provider for seamless and secure authentication.",
    category: "Security & Compliance",
    starter: false,
    professional: false,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'Medium'
  },
  
  // Integration
  {
    name: "Email Service Integration",
    description: "Connect with Gmail, Outlook, and other email providers for two-way synchronization.",
    category: "Integration",
    starter: true,
    professional: true,
    enterprise: true,
    isPopular: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Calendar Integration",
    description: "Sync with Google Calendar, Outlook Calendar, and other calendar services.",
    category: "Integration",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Marketing Automation Integration",
    description: "Connect with marketing platforms for seamless lead flow and campaign tracking.",
    category: "Integration",
    starter: "Limited",
    professional: true,
    enterprise: "Advanced",
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Communication Tools Integration",
    description: "Connect with Slack, Teams, and other messaging platforms for collaborative selling.",
    category: "Integration",
    starter: "Basic",
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Document Management Integration",
    description: "Connect with document storage and e-signature services for contract management.",
    category: "Integration",
    starter: "Limited",
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'Medium'
  },
  {
    name: "ERP Integration",
    description: "Connect with enterprise resource planning systems for unified business data.",
    category: "Integration",
    starter: false,
    professional: false,
    enterprise: true,
    implementationComplexity: 'High',
    impact: 'High'
  },
  {
    name: "Telephony Integration",
    description: "Connect with phone systems for click-to-call and call logging capabilities.",
    category: "Integration",
    starter: false,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'Medium'
  },
  {
    name: "Custom API Access",
    description: "Build custom integrations with our comprehensive API and webhooks.",
    category: "Integration",
    starter: "Limited",
    professional: true,
    enterprise: "Advanced",
    implementationComplexity: 'High',
    impact: 'High'
  },
  {
    name: "Video Conferencing Integration",
    description: "Connect with Zoom, Meet, and other video platforms for meeting scheduling and recording.",
    category: "Integration",
    starter: "Basic",
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  
  // Support & Training
  {
    name: "Knowledge Base Access",
    description: "Self-service resources including guides, tutorials, and best practices.",
    category: "Support & Training",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Email Support",
    description: "Technical assistance via email from our support team.",
    category: "Support & Training",
    starter: true,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Live Chat Support",
    description: "Real-time chat support for immediate assistance with issues and questions.",
    category: "Support & Training",
    starter: false,
    professional: true,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'Medium'
  },
  {
    name: "Phone Support",
    description: "Direct phone support for urgent issues and complex problems.",
    category: "Support & Training",
    starter: false,
    professional: "Business hours",
    enterprise: "24/7",
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Onboarding Services",
    description: "Guided implementation and setup to ensure successful adoption.",
    category: "Support & Training",
    starter: "Self-service",
    professional: "Standard",
    enterprise: "White-glove",
    isPopular: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Custom Training",
    description: "Personalized training sessions for your team tailored to your specific needs.",
    category: "Support & Training",
    starter: false,
    professional: "Basic",
    enterprise: "Comprehensive",
    implementationComplexity: 'Medium',
    impact: 'High'
  },
  {
    name: "Dedicated Success Manager",
    description: "Assigned customer success manager to help you achieve your business goals.",
    category: "Support & Training",
    starter: false,
    professional: false,
    enterprise: true,
    implementationComplexity: 'Low',
    impact: 'High'
  },
  {
    name: "Implementation Consulting",
    description: "Expert guidance on best practices for implementing Smart CRM in your organization.",
    category: "Support & Training",
    starter: false,
    professional: "Limited",
    enterprise: true,
    implementationComplexity: 'Medium',
    impact: 'High'
  }
];

const FeatureMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<'starter'|'professional'|'enterprise'>('professional');
  const [isComparisonView, setIsComparisonView] = useState(true);
  const [popularOnly, setPopularOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  
  const tableRef = useRef<HTMLTableElement>(null);
  
  // Filter features based on search query and selected categories
  const filteredFeatures = features.filter(feature => {
    let matchesSearch = true;
    let matchesCategories = true;
    let matchesPopular = true;
    let matchesNew = true;
    
    // Search filter
    if (searchQuery) {
      matchesSearch = 
        feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      matchesCategories = selectedCategories.includes(feature.category);
    }
    
    // Popular filter
    if (popularOnly) {
      matchesPopular = !!feature.isPopular;
    }
    
    // New filter
    if (newOnly) {
      matchesNew = !!feature.isNew;
    }
    
    return matchesSearch && matchesCategories && matchesPopular && matchesNew;
  });
  
  // Group features by category
  const featuresByCategory = filteredFeatures.reduce<Record<string, FeatureType[]>>((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {});
  
  // Toggle a category in the filter
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPopularOnly(false);
    setNewOnly(false);
  };
  
  // Function to toggle category expansion
  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };
  
  // Handles scrolling to a specific feature category
  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Function for feature cell (to avoid repetition)
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <motion.div 
          className="flex justify-center"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        >
          <Check className="text-green-500" size={18} />
        </motion.div>
      ) : (
        <motion.div 
          className="flex justify-center"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        >
          <X className="text-red-400" size={18} />
        </motion.div>
      );
    } else {
      return (
        <motion.div 
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-white text-sm bg-white/10 px-2 py-0.5 rounded-full">
            {value}
          </span>
        </motion.div>
      );
    }
  };
  
  return (
    <section id="feature-matrix" className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-black/80 pointer-events-none" />
      
      {/* Animated floating icons for the feature matrix */}
      <AnimatedIconsGroup 
        section="features" 
        iconCount={12}
        animations={['pulse', 'rotate', 'random']} 
        density="low"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Complete Feature Comparison</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-white/80 max-w-3xl mx-auto">
              Explore all the powerful features available in Smart CRM across our different plans
            </p>
          </div>
        </AnimatedElement>
        
        {/* Control panel for filtering and search */}
        <AnimatedElement animation="fadeIn" delay={0.2}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-10 relative">
            <InteractiveFloatingButton 
              text="Explore Features" 
              position="top-right"
              color="amber"
              delay={3}
            />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              {/* Search box */}
              <div className="relative w-full md:w-auto md:flex-grow max-w-xl">
                <Search className="absolute left-3 top-3 text-white/50" size={18} />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-white/50 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              {/* View toggle and filters */}
              <div className="flex gap-3 w-full md:w-auto">
                <div className="inline-flex bg-white/10 p-1 rounded-lg">
                  <button
                    className={`px-3 py-1 rounded text-sm ${
                      isComparisonView ? 'bg-blue-600 text-white' : 'text-white/70'
                    }`}
                    onClick={() => setIsComparisonView(true)}
                  >
                    Comparison
                  </button>
                  <button
                    className={`px-3 py-1 rounded text-sm ${
                      !isComparisonView ? 'bg-blue-600 text-white' : 'text-white/70'
                    }`}
                    onClick={() => setIsComparisonView(false)}
                  >
                    Detailed List
                  </button>
                </div>
                
                <motion.button
                  className={`px-3 py-1 rounded text-sm flex items-center ${
                    popularOnly ? 'bg-yellow-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  onClick={() => setPopularOnly(!popularOnly)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Star size={16} className="mr-1" />
                  Popular
                </motion.button>
                
                <motion.button
                  className={`px-3 py-1 rounded text-sm flex items-center ${
                    newOnly ? 'bg-green-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  onClick={() => setNewOnly(!newOnly)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={16} className="mr-1" />
                  New
                </motion.button>
                
                {(searchQuery || selectedCategories.length > 0 || popularOnly || newOnly) && (
                  <motion.button
                    onClick={clearFilters}
                    className="px-3 py-1 text-sm text-white/70 hover:text-white flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={16} className="mr-1" />
                    Clear
                  </motion.button>
                )}
              </div>
            </div>
            
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`px-3 py-1 rounded-full text-xs ${
                    selectedCategories.includes(category) 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  onClick={() => toggleCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            
            {/* Plan selection */}
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/80 text-sm mb-3">Select a plan for comparison:</p>
              <div className="flex justify-between md:justify-start gap-4">
                {['starter', 'professional', 'enterprise'].map((plan) => (
                  <motion.button
                    key={plan}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedPlan === plan 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                    onClick={() => setSelectedPlan(plan as any)}
                    whileHover={{ scale: selectedPlan !== plan ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    {plan === 'professional' && <span className="ml-1 text-xs text-blue-300">Popular</span>}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedElement>
        
        {/* Feature list/matrix display */}
        <AnimatedElement animation="fadeIn" delay={0.3}>
          {Object.keys(featuresByCategory).length > 0 ? (
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden relative">
              <InteractiveFloatingButton 
                text="Interact with Matrix" 
                position="top-right"
                color="green"
                delay={5}
              />
              
              {/* Category quick nav */}
              <div className="p-4 border-b border-white/10">
                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-2">
                    {Object.keys(featuresByCategory).map((category) => (
                      <motion.button
                        key={category}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white whitespace-nowrap text-sm transition-colors"
                        onClick={() => scrollToCategory(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Feature matrix */}
              {isComparisonView ? (
                <div className="overflow-x-auto p-4">
                  <table ref={tableRef} className="w-full border-collapse">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="text-left p-3 text-white font-medium">Feature</th>
                        <th className="p-3 text-white font-medium w-32 text-center">Starter</th>
                        <th className="p-3 text-white font-medium w-32 text-center">Professional</th>
                        <th className="p-3 text-white font-medium w-32 text-center">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(featuresByCategory).map(([category, categoryFeatures]) => (
                        <React.Fragment key={category}>
                          <tr className="bg-white/5">
                            <td 
                              colSpan={4} 
                              className="p-3 text-white/90 font-medium text-lg"
                              id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                            >
                              {category}
                            </td>
                          </tr>
                          {categoryFeatures.map((feature, idx) => (
                            <tr 
                              key={`${category}-${idx}`} 
                              className="border-b border-white/5 hover:bg-white/5"
                            >
                              <td className="p-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-white font-medium">{feature.name}</span>
                                    {feature.isPopular && (
                                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-1.5 rounded">
                                        Popular
                                      </span>
                                    )}
                                    {feature.isNew && (
                                      <span className="bg-green-500/20 text-green-400 text-xs px-1.5 rounded">
                                        New
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-white/60 text-sm mt-1">{feature.description}</p>
                                </div>
                              </td>
                              <td className="p-3">
                                {renderFeatureValue(feature.starter)}
                              </td>
                              <td className="p-3">
                                {renderFeatureValue(feature.professional)}
                              </td>
                              <td className="p-3">
                                {renderFeatureValue(feature.enterprise)}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4">
                  {Object.entries(featuresByCategory).map(([category, categoryFeatures]) => (
                    <div 
                      key={category} 
                      className="mb-8"
                      id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <div 
                        className="flex items-center cursor-pointer mb-4"
                        onClick={() => toggleCategoryExpansion(category)}
                      >
                        <motion.div
                          animate={{ rotate: expandedCategory === category ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="text-blue-400 mr-2" size={20} />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-white">{category}</h3>
                        <span className="text-white/60 text-sm ml-2">
                          ({categoryFeatures.length} features)
                        </span>
                      </div>
                      
                      <AnimatePresence>
                        {(expandedCategory === category || expandedCategory === null) && (
                          <motion.div
                            initial={expandedCategory !== null ? { opacity: 0, height: 0 } : false}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            {categoryFeatures.map((feature, index) => (
                              <motion.div
                                key={`${category}-${index}`}
                                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 h-full"
                                whileHover={{ 
                                  y: -5,
                                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                                  borderColor: "rgba(59, 130, 246, 0.3)"
                                }}
                              >
                                <div className="mb-2">
                                  <h4 className="text-white font-medium flex items-center">
                                    {feature.name}
                                    {feature.isPopular && (
                                      <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                                        Popular
                                      </span>
                                    )}
                                    {feature.isNew && (
                                      <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                        New
                                      </span>
                                    )}
                                  </h4>
                                  <p className="text-white/70 text-sm mt-1">{feature.description}</p>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                  <div className={`p-2 rounded text-center ${
                                    typeof feature.starter === 'boolean' 
                                      ? feature.starter ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40' 
                                      : 'bg-blue-500/20 text-blue-400'
                                  }`}>
                                    <p className="text-xs font-medium">Starter</p>
                                    <p className="text-sm">{
                                      typeof feature.starter === 'boolean' 
                                        ? feature.starter ? 'Yes' : 'No' 
                                        : feature.starter
                                    }</p>
                                  </div>
                                  <div className={`p-2 rounded text-center ${
                                    typeof feature.professional === 'boolean' 
                                      ? feature.professional ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40' 
                                      : 'bg-blue-500/20 text-blue-400'
                                  }`}>
                                    <p className="text-xs font-medium">Pro</p>
                                    <p className="text-sm">{
                                      typeof feature.professional === 'boolean' 
                                        ? feature.professional ? 'Yes' : 'No' 
                                        : feature.professional
                                    }</p>
                                  </div>
                                  <div className={`p-2 rounded text-center ${
                                    typeof feature.enterprise === 'boolean' 
                                      ? feature.enterprise ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40' 
                                      : 'bg-blue-500/20 text-blue-400'
                                  }`}>
                                    <p className="text-xs font-medium">Enterprise</p>
                                    <p className="text-sm">{
                                      typeof feature.enterprise === 'boolean' 
                                        ? feature.enterprise ? 'Yes' : 'No' 
                                        : feature.enterprise
                                    }</p>
                                  </div>
                                </div>
                                
                                {(feature.implementationComplexity || feature.impact) && (
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    {feature.implementationComplexity && (
                                      <div className="bg-white/5 p-2 rounded">
                                        <span className="text-white/60">Implementation:</span>
                                        <span 
                                          className={`ml-1 ${feature.implementationComplexity === 'Low' 
                                            ? 'text-green-400' 
                                            : feature.implementationComplexity === 'Medium' 
                                              ? 'text-yellow-400' 
                                              : 'text-red-400'}`
                                          }
                                        >
                                          {feature.implementationComplexity}
                                        </span>
                                      </div>
                                    )}
                                    {feature.impact && (
                                      <div className="bg-white/5 p-2 rounded">
                                        <span className="text-white/60">Business Impact:</span>
                                        <span 
                                          className={`ml-1 ${feature.impact === 'High' 
                                            ? 'text-green-400' 
                                            : feature.impact === 'Medium' 
                                              ? 'text-blue-400' 
                                              : 'text-white/60'}`
                                          }
                                        >
                                          {feature.impact}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Bottom navigation */}
              <div className="border-t border-white/10 p-4 flex justify-between items-center">
                <p className="text-white/60 text-sm">
                  Showing {filteredFeatures.length} of {features.length} features
                </p>
                <motion.button
                  className="text-blue-400 flex items-center gap-1 text-sm"
                  whileHover={{ x: 3 }}
                >
                  <span>Compare all plans</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </div>
          ) : (
            <motion.div 
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search className="mx-auto mb-4 text-white/30" size={48} />
              <h3 className="text-white text-xl font-medium mb-2">No matching features found</h3>
              <p className="text-white/60 mb-6">Try adjusting your filters or search terms</p>
              <motion.button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={clearFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatedElement>
        
        <div className="text-center mt-10">
          <p className="text-white/70 mb-4">
            Need a custom solution? Our enterprise plan can be tailored to your specific requirements.
          </p>
          <motion.button 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Smart CRM to Learn More
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Icon components
const ChevronRight = ({ size, className }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Plus = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Info = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default FeatureMatrix;