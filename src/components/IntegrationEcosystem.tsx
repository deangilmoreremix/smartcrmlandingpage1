import React, { useState, useRef, useContext } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ArrowRight, Check, Link, Grid, List, Zap, Lock, Clock, Star } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import { SignupContext } from '../App';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface Integration {
  name: string;
  category: string;
  description: string;
  setupTime: 'Minutes' | 'Hours' | 'Days';
  complexity: 'Easy' | 'Medium' | 'Complex';
  isPopular?: boolean;
  isEnterprise?: boolean;
  features?: string[];
  logoUrl?: string;
}

// Mock integration data
const integrations: Integration[] = [
  // Email & Calendars
  {
    name: "Gmail",
    category: "Email & Calendars",
    description: "Two-way sync with Gmail for email tracking, templates, and scheduling.",
    setupTime: "Minutes",
    complexity: "Easy",
    isPopular: true,
    features: ["Email sync", "Send from CRM", "Contact import", "Activity tracking"]
  },
  {
    name: "Outlook",
    category: "Email & Calendars",
    description: "Integrate with Microsoft Outlook for email, calendar, and task sync.",
    setupTime: "Minutes",
    complexity: "Easy",
    isPopular: true,
    features: ["Email sync", "Calendar integration", "Contact sync", "Activity tracking"]
  },
  {
    name: "Google Calendar",
    category: "Email & Calendars",
    description: "Sync your Google Calendar for meeting scheduling and availability.",
    setupTime: "Minutes",
    complexity: "Easy",
    features: ["Calendar sync", "Availability sharing", "Meeting creation"]
  },
  {
    name: "Office 365",
    category: "Email & Calendars",
    description: "Full integration with the Microsoft Office 365 suite of products.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["Email", "Calendar", "OneDrive", "Teams integration"]
  },
  {
    name: "Exchange Server",
    category: "Email & Calendars",
    description: "Connect with on-prem Microsoft Exchange for enterprise email integration.",
    setupTime: "Days",
    complexity: "Complex",
    isEnterprise: true,
    features: ["Email sync", "Calendar integration", "Server-side processing"]
  },
  
  // Communication & Meetings
  {
    name: "Slack",
    category: "Communication & Meetings",
    description: "Send notifications and updates to Slack channels from your CRM.",
    setupTime: "Minutes",
    complexity: "Easy",
    isPopular: true,
    features: ["Notifications", "Activity updates", "Command integration", "Channel updates"]
  },
  {
    name: "Microsoft Teams",
    category: "Communication & Meetings",
    description: "Integration with Microsoft Teams for collaboration and communication.",
    setupTime: "Minutes",
    complexity: "Easy",
    isPopular: true,
    features: ["Meeting scheduling", "Notifications", "File sharing", "Tab integration"]
  },
  {
    name: "Zoom",
    category: "Communication & Meetings",
    description: "Create and manage Zoom meetings directly from your CRM.",
    setupTime: "Minutes",
    complexity: "Easy",
    isPopular: true,
    features: ["Meeting creation", "Recording access", "Calendar integration"]
  },
  {
    name: "Google Meet",
    category: "Communication & Meetings",
    description: "Schedule and join Google Meet calls from within your CRM.",
    setupTime: "Minutes",
    complexity: "Easy",
    features: ["Meeting creation", "Calendar integration", "Participant management"]
  },
  {
    name: "RingCentral",
    category: "Communication & Meetings",
    description: "Integrate your phone system with call logging and SMS capabilities.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["Call logging", "SMS integration", "Voicemail access", "Call recording"]
  },
  {
    name: "Twilio",
    category: "Communication & Meetings",
    description: "Add SMS, voice, and messaging capabilities to your CRM workflow.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["SMS", "Voice calls", "Verification", "Programmable messages"]
  },
  
  // Marketing & Automation
  {
    name: "Mailchimp",
    category: "Marketing & Automation",
    description: "Sync contacts and campaign data with your email marketing platform.",
    setupTime: "Minutes",
    complexity: "Easy",
    isPopular: true,
    features: ["Contact sync", "Campaign tracking", "Audience management"]
  },
  {
    name: "HubSpot",
    category: "Marketing & Automation",
    description: "Connect Smart CRM with HubSpot's marketing automation tools.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["Lead scoring", "Campaign sync", "Marketing automation", "Analytics"]
  },
  {
    name: "Marketo",
    category: "Marketing & Automation",
    description: "Enterprise-grade marketing automation integration for advanced campaigns.",
    setupTime: "Days",
    complexity: "Complex",
    isEnterprise: true,
    features: ["Lead nurturing", "Campaign management", "Advanced segmentation"]
  },
  {
    name: "ActiveCampaign",
    category: "Marketing & Automation",
    description: "Combine email marketing, automation, sales automation, and CRM.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["Automation workflows", "Email campaigns", "Lead scoring"]
  },
  {
    name: "Zapier",
    category: "Marketing & Automation",
    description: "Connect Smart CRM with thousands of apps through Zapier's automation platform.",
    setupTime: "Minutes",
    complexity: "Easy",
    isPopular: true,
    features: ["Custom workflows", "Multi-app integration", "Trigger-based automation"]
  },
  
  // Documents & Storage
  {
    name: "Google Drive",
    category: "Documents & Storage",
    description: "Access and manage Google Drive documents within your CRM.",
    setupTime: "Minutes",
    complexity: "Easy",
    isPopular: true,
    features: ["File access", "Document creation", "Sharing controls", "Version history"]
  },
  {
    name: "Dropbox",
    category: "Documents & Storage",
    description: "Link Dropbox files and folders to contacts, deals, and other CRM records.",
    setupTime: "Minutes",
    complexity: "Easy",
    features: ["File access", "Sharing controls", "Preview integration"]
  },
  {
    name: "OneDrive",
    category: "Documents & Storage",
    description: "Microsoft OneDrive integration for document management and collaboration.",
    setupTime: "Minutes",
    complexity: "Easy",
    features: ["File access", "Office integration", "Sharing controls"]
  },
  {
    name: "Box",
    category: "Documents & Storage",
    description: "Enterprise content management and file sharing integration.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["Secure file sharing", "Version control", "Governance controls"]
  },
  {
    name: "DocuSign",
    category: "Documents & Storage",
    description: "Send, track, and manage electronic signatures for your documents.",
    setupTime: "Hours",
    complexity: "Medium",
    isPopular: true,
    features: ["eSignature", "Document tracking", "Template management"]
  },
  
  // Financial & Billing
  {
    name: "Stripe",
    category: "Financial & Billing",
    description: "Process payments and manage subscriptions directly within your CRM.",
    setupTime: "Hours",
    complexity: "Medium",
    isPopular: true,
    features: ["Payment processing", "Subscription management", "Invoice creation"]
  },
  {
    name: "QuickBooks",
    category: "Financial & Billing",
    description: "Sync your financial data between QuickBooks and Smart CRM.",
    setupTime: "Hours",
    complexity: "Medium",
    isPopular: true,
    features: ["Invoice sync", "Payment tracking", "Financial reporting"]
  },
  {
    name: "Xero",
    category: "Financial & Billing",
    description: "Connect your accounting system for seamless financial management.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["Invoice creation", "Payment tracking", "Financial dashboards"]
  },
  {
    name: "PayPal",
    category: "Financial & Billing",
    description: "Process payments via PayPal directly from Smart CRM.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["Payment processing", "Refund management", "Transaction history"]
  },
  {
    name: "Square",
    category: "Financial & Billing",
    description: "Take payments in person or online with Square integration.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["Payment processing", "Invoice creation", "Point of sale"]
  },
  
  // Social & Web
  {
    name: "LinkedIn",
    category: "Social & Web",
    description: "View LinkedIn profiles and activity directly in your CRM.",
    setupTime: "Minutes",
    complexity: "Easy",
    isPopular: true,
    features: ["Profile enrichment", "Connection insights", "InMail tracking"]
  },
  {
    name: "Twitter",
    category: "Social & Web",
    description: "Monitor and engage with prospects and customers on Twitter.",
    setupTime: "Minutes",
    complexity: "Easy",
    features: ["Tweet monitoring", "Engagement tracking", "Direct message integration"]
  },
  {
    name: "Facebook",
    category: "Social & Web",
    description: "Connect Facebook profiles and pages to your CRM contacts.",
    setupTime: "Minutes",
    complexity: "Easy",
    features: ["Profile linking", "Ad campaign integration", "Lead form sync"]
  },
  {
    name: "WordPress",
    category: "Social & Web",
    description: "Capture leads from your WordPress website directly into Smart CRM.",
    setupTime: "Hours",
    complexity: "Medium",
    features: ["Form integration", "Lead capture", "Content personalization"]
  },
  
  // Analytics & Reporting
  {
    name: "Google Analytics",
    category: "Analytics & Reporting",
    description: "Connect web analytics to understand customer behavior and acquisition sources.",
    setupTime: "Hours",
    complexity: "Medium",
    isPopular: true,
    features: ["Traffic analysis", "Conversion tracking", "Attribution modeling"]
  },
  {
    name: "Tableau",
    category: "Analytics & Reporting",
    description: "Create advanced visualizations and reports from your CRM data.",
    setupTime: "Days",
    complexity: "Complex",
    isEnterprise: true,
    features: ["Advanced visualizations", "Data blending", "Real-time dashboards"]
  },
  {
    name: "Power BI",
    category: "Analytics & Reporting",
    description: "Microsoft's business analytics service for advanced reporting.",
    setupTime: "Days",
    complexity: "Complex",
    isEnterprise: true,
    features: ["Interactive reports", "Data transformation", "AI-powered insights"]
  },
  {
    name: "Looker",
    category: "Analytics & Reporting",
    description: "Connect Looker's business intelligence platform to your CRM data.",
    setupTime: "Days",
    complexity: "Complex",
    isEnterprise: true,
    features: ["Custom metrics", "Data modeling", "Embedded analytics"]
  }
];

// Get all unique categories
const categories = Array.from(new Set(integrations.map(integration => integration.category)));

const IntegrationEcosystem: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [popularOnly, setPopularOnly] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const { openSignupModal } = useContext(SignupContext);
  
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Filter integrations based on search, categories, and popular filter
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = searchQuery === '' || 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.includes(integration.category);
    
    const matchesPopular = !popularOnly || integration.isPopular;
    
    return matchesSearch && matchesCategories && matchesPopular;
  });
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPopularOnly(false);
    
    if (filteredIntegrations.length === 0) {
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      });
    }
  };
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  // Handle integration selection
  const handleIntegrationClick = (integration: Integration) => {
    setSelectedIntegration(integration);
  };
  
  return (
    <section id="integrations" className="py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/30 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" 
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
          className="absolute -bottom-40 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" 
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
      
      {/* Animated floating icons for integration section */}
      <AnimatedIconsGroup 
        section="ai"
        iconCount={14} 
        animations={['orbit', 'pulse', 'random']} 
        density="high"
      />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Integration Ecosystem</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Connect Smart CRM with your favorite tools through our comprehensive integration platform
            </p>
          </div>
        </AnimatedElement>
        
        {/* Search and Filters */}
        <AnimatedElement animation="fadeIn" delay={0.2}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Search input */}
              <div className="relative w-full md:w-auto md:flex-grow max-w-md">
                <Search className="absolute left-3 top-2.5 text-white/50" size={18} />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg w-full text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-white/50 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              {/* View toggle and popular filter */}
              <div className="flex gap-3">
                <div className="bg-white/10 rounded-lg p-1 flex">
                  <motion.button
                    className={`p-2 rounded ${isGridView ? 'bg-blue-600 text-white' : 'text-white/60'}`}
                    onClick={() => setIsGridView(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Grid view"
                  >
                    <Grid size={14} />
                  </motion.button>
                  <motion.button
                    className={`p-2 rounded ${!isGridView ? 'bg-blue-600 text-white' : 'text-white/60'}`}
                    onClick={() => setIsGridView(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="List view"
                  >
                    <List size={14} />
                  </motion.button>
                </div>
                
                <motion.button
                  className={`px-4 py-2 rounded-lg text-sm flex items-center ${
                    popularOnly ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  onClick={() => setPopularOnly(!popularOnly)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Star size={14} className="mr-2" />
                  Popular
                </motion.button>
                
                {(searchQuery || selectedCategories.length > 0 || popularOnly) && (
                  <motion.button
                    className="px-4 py-2 text-white/70 hover:text-white text-sm flex items-center"
                    onClick={clearFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={14} className="mr-1" />
                    Clear
                  </motion.button>
                )}
              </div>
            </div>
            
            {/* Category filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`px-3 py-1 rounded-full text-xs ${
                    selectedCategories.includes(category) 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  onClick={() => toggleCategory(category)}
                  whileHover={{ scale: selectedCategories.includes(category) ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedElement>
        
        {/* Integration Grid/List */}
        <AnimatedElement animation="fadeIn" delay={0.3}>
          {filteredIntegrations.length > 0 ? (
            <div className={isGridView 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
              : "flex flex-col gap-3"
            }>
              {filteredIntegrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  className={`bg-white/5 backdrop-blur-md ${isGridView ? 'rounded-xl p-5' : 'rounded-lg p-4'} border border-white/10 hover:border-blue-500/30 transition-all relative cursor-pointer`}
                  whileHover={{ 
                    y: -5,
                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.03, duration: 0.3 }
                  }}
                  onClick={() => handleIntegrationClick(integration)}
                >
                  {integration.isPopular && (
                    <motion.div
                      className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Popular
                    </motion.div>
                  )}
                  
                  {integration.isEnterprise && (
                    <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                      <Lock size={10} className="mr-1" />
                      Enterprise
                    </div>
                  )}
                  
                  {isGridView ? (
                    <>
                      <motion.div
                        className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-3"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center text-white font-bold">
                          {integration.name.charAt(0)}
                        </div>
                      </motion.div>
                      <h3 className="text-white font-medium mb-2">{integration.name}</h3>
                      <p className="text-white/60 text-sm mb-3 line-clamp-2">{integration.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded-full">
                          {integration.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-white/50" />
                          <span className="text-xs text-white/50">{integration.setupTime}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex">
                      <motion.div
                        className="w-10 h-10 bg-white/10 rounded-lg flex-shrink-0 flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          {integration.name.charAt(0)}
                        </div>
                      </motion.div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-medium">{integration.name}</h3>
                          <span className="text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded-full">
                            {integration.category}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm my-1">{integration.description}</p>
                        <div className="flex items-center gap-3 text-xs text-white/50">
                          <div className="flex items-center">
                            <Clock size={10} className="mr-1" />
                            {integration.setupTime}
                          </div>
                          <div>
                            Complexity: <span className={
                              integration.complexity === 'Easy' 
                                ? 'text-green-400' 
                                : integration.complexity === 'Medium' 
                                  ? 'text-yellow-400' 
                                  : 'text-red-400'
                            }>{integration.complexity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 text-center"
              animate={controls}
            >
              <Search className="mx-auto mb-4 text-white/30" size={48} />
              <h3 className="text-white text-xl font-medium mb-2">No matching integrations</h3>
              <p className="text-white/60 mb-6">Try different search terms or filters</p>
              <motion.button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={clearFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show All Integrations
              </motion.button>
            </motion.div>
          )}
        </AnimatedElement>
        
        {/* Integration Detail Modal */}
        <AnimatePresence>
          {selectedIntegration && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIntegration(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-blue-900/80 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                      {selectedIntegration.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {selectedIntegration.name}
                        {selectedIntegration.isPopular && (
                          <span className="ml-2 text-xs bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </h3>
                      <p className="text-white/60">{selectedIntegration.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedIntegration(null)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X className="text-white/70" size={20} />
                  </button>
                </div>
                
                <p className="text-white/80 mb-6">{selectedIntegration.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Clock size={16} className="text-blue-400 mr-2" />
                      <span className="text-white font-medium">Setup Time</span>
                    </div>
                    <p className="text-white/70">{selectedIntegration.setupTime}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Zap size={16} className="text-yellow-400 mr-2" />
                      <span className="text-white font-medium">Complexity</span>
                    </div>
                    <p className={
                      selectedIntegration.complexity === 'Easy' 
                        ? 'text-green-400' 
                        : selectedIntegration.complexity === 'Medium' 
                          ? 'text-yellow-400' 
                          : 'text-red-400'
                    }>{selectedIntegration.complexity}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Link size={16} className="text-purple-400 mr-2" />
                      <span className="text-white font-medium">Availability</span>
                    </div>
                    <p className="text-white/70">
                      {selectedIntegration.isEnterprise ? 'Enterprise Plan Only' : 'All Plans'}
                    </p>
                  </div>
                </div>
                
                {selectedIntegration.features && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedIntegration.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center bg-white/5 p-2 rounded">
                          <Check size={14} className="text-green-400 mr-2" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                  <h4 className="text-white font-medium mb-2">Implementation Guide</h4>
                  <p className="text-white/70 text-sm">
                    Our step-by-step guide makes it easy to set up this integration with Smart CRM.
                    Complete documentation and support resources are available.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start">
                      <div className="min-w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-2 text-xs text-blue-400 font-medium">1</div>
                      <span className="text-white/80 text-sm">
                        Connect your {selectedIntegration.name} account through our secure OAuth flow.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-2 text-xs text-blue-400 font-medium">2</div>
                      <span className="text-white/80 text-sm">
                        Configure sync settings and permissions based on your needs.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-2 text-xs text-blue-400 font-medium">3</div>
                      <span className="text-white/80 text-sm">
                        Create custom automation rules to leverage this integration.
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedIntegration(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <motion.button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openSignupModal('early-access')}
                  >
                    <span>Get Smart CRM</span>
                    <ArrowRight size={14} className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Integration Count & CTA */}
        <div className="text-center mt-12">
          <motion.div 
            className="inline-block bg-white/5 backdrop-blur-md rounded-xl px-8 py-4 border border-white/10 mb-8"
            whileHover={{ 
              scale: 1.03,
              backgroundColor: "rgba(255, 255, 255, 0.08)", 
              borderColor: "rgba(59, 130, 246, 0.3)"
            }}
          >
            <p className="text-lg text-white/80">
              <span className="text-3xl font-bold text-white">150+</span> integrations available, with new ones added every month
            </p>
          </motion.div>
          
          <motion.button 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openSignupModal('early-access')}
          >
            <span>Get Smart CRM</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default IntegrationEcosystem;