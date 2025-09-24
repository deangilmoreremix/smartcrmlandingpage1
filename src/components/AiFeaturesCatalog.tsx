import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Mail, Calendar, Zap, BrainCircuit, LineChart, MessageSquare, PieChart, FileText,
         BarChart3, Clipboard, Workflow, Layers, ChevronRight, CornerUpRight, Users, ThumbsUp, Star,
         Volume2, Image, Database, ArrowRight, Cpu, Activity, Gauge, TrendingUp, Brain, GitBranch, Award, Clock } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';

type FeatureCategory = 'All Tools' | 'Email Tools' | 'Sales Tools' | 'Meeting Tools' | 'Content Tools' | 'Analysis Tools' | 'Voice & Audio' | 'Vision & Image' | 'Advanced AI' | 'Real-time';

interface AIFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  categories: FeatureCategory[];
  isNew?: boolean;
  hasDemo?: boolean;
  popularity?: number; // 1-5
  complexityLevel?: number; // 1-3
  integrations?: string[];
}

const features: AIFeature[] = [
  // Dashboard AI Features
  {
    title: 'Real-Time Analytics',
    description: 'Live dashboard updates with instant metrics and KPI tracking across all business functions',
    icon: <Activity size={24} />,
    categories: ['All Tools', 'Analysis Tools', 'Real-time'],
    isNew: true,
    hasDemo: true,
    popularity: 5,
    complexityLevel: 2,
    integrations: ['Business Intelligence Tools', 'Data Warehouses', 'Real-time Databases']
  },
  {
    title: 'Advanced Visualizations',
    description: 'Interactive charts, graphs, and data visualizations with drill-down capabilities',
    icon: <BarChart3 size={24} />,
    categories: ['All Tools', 'Analysis Tools', 'Content Tools'],
    isNew: true,
    popularity: 5,
    complexityLevel: 2,
    integrations: ['Chart Libraries', 'Data Visualization Platforms', 'Business Intelligence Tools']
  },
  {
    title: 'Performance Monitoring',
    description: 'Comprehensive system health monitoring with predictive analytics and alerting',
    icon: <Gauge size={24} />,
    categories: ['All Tools', 'Analysis Tools', 'Real-time'],
    isNew: true,
    hasDemo: true,
    popularity: 4,
    complexityLevel: 3,
    integrations: ['Monitoring Systems', 'Alert Platforms', 'Predictive Analytics Tools']
  },
  {
    title: 'Business Intelligence',
    description: 'AI-powered insights and recommendations based on your data patterns and trends',
    icon: <TrendingUp size={24} />,
    categories: ['All Tools', 'Analysis Tools', 'Advanced AI'],
    isNew: true,
    popularity: 5,
    complexityLevel: 3,
    integrations: ['Business Intelligence Platforms', 'Data Analytics Tools', 'Machine Learning Models']
  },

  // Contacts AI Features
  {
    title: 'AI Contact Scoring',
    description: 'Multi-model scoring (GPT-5 + Gemini) on 0-100 scale with behavioral insights, psychological profiles, and relationship mapping',
    icon: <Users size={24} />,
    categories: ['All Tools', 'Analysis Tools', 'Advanced AI'],
    isNew: true,
    hasDemo: true,
    popularity: 5,
    complexityLevel: 3,
    integrations: ['CRM Systems', 'Contact Databases', 'AI Model APIs']
  },
  {
    title: 'Smart Enrichment',
    description: 'Automatic data gap filling using web research, LinkedIn discovery, and market intelligence',
    icon: <Database size={24} />,
    categories: ['All Tools', 'Content Tools', 'Advanced AI'],
    isNew: true,
    popularity: 4,
    complexityLevel: 2,
    integrations: ['LinkedIn API', 'Web Scraping Tools', 'Market Research Databases']
  },
  {
    title: 'Communication Tools',
    description: 'AI-powered email composers, social messaging generators, objection handlers, and subject line optimizers',
    icon: <MessageSquare size={24} />,
    categories: ['All Tools', 'Email Tools', 'Content Tools'],
    isNew: true,
    hasDemo: true,
    popularity: 5,
    complexityLevel: 2,
    integrations: ['Email Platforms', 'Social Media APIs', 'Communication Tools']
  },
  {
    title: 'Bulk Processing',
    description: 'CSV/JSON import with validation, bulk scoring/enrichment, and automated tagging',
    icon: <FileText size={24} />,
    categories: ['All Tools', 'Content Tools', 'Advanced AI'],
    isNew: true,
    popularity: 4,
    complexityLevel: 2,
    integrations: ['Data Import Tools', 'CSV Processors', 'Batch Processing Systems']
  },

  // Pipeline AI Features
  {
    title: 'AI Deal Intelligence',
    description: 'Real-time win probability scoring, risk alerts and bottleneck identification, timeline predictions and optimal next steps, competitive intelligence and market insights',
    icon: <Brain size={24} />,
    categories: ['All Tools', 'Sales Tools', 'Advanced AI'],
    isNew: true,
    hasDemo: true,
    popularity: 5,
    complexityLevel: 3,
    integrations: ['Sales Platforms', 'CRM Systems', 'Market Intelligence Tools']
  },
  {
    title: 'Kanban Board',
    description: 'Intuitive drag-and-drop interface, stage-based workflow visualization, custom pipeline configurations, real-time collaboration features',
    icon: <GitBranch size={24} />,
    categories: ['All Tools', 'Sales Tools', 'Content Tools'],
    isNew: true,
    popularity: 4,
    complexityLevel: 2,
    integrations: ['Project Management Tools', 'Collaboration Platforms', 'Workflow Systems']
  },
  {
    title: 'Gamification',
    description: 'Team leaderboards and performance tracking, achievement badges and milestones, streak tracking and motivation tools, points system with leveling mechanics',
    icon: <Award size={24} />,
    categories: ['All Tools', 'Sales Tools', 'Advanced AI'],
    isNew: true,
    popularity: 4,
    complexityLevel: 2,
    integrations: ['Gamification Platforms', 'Performance Tracking Systems', 'Team Management Tools']
  },
  {
    title: 'Advanced Analytics',
    description: 'Conversion rate analysis by stage, sales velocity and time-to-close metrics, forecast accuracy and pipeline health, custom reporting and dashboard creation',
    icon: <PieChart size={24} />,
    categories: ['All Tools', 'Sales Tools', 'Analysis Tools'],
    isNew: true,
    hasDemo: true,
    popularity: 5,
    complexityLevel: 3,
    integrations: ['Analytics Platforms', 'Reporting Tools', 'Business Intelligence Systems']
  },

  // AI Calendar Features
  {
    title: 'AI Meeting Intelligence',
    description: 'Smart scheduling with optimal time slots, participant analysis, and meeting outcome predictions',
    icon: <Calendar size={24} />,
    categories: ['All Tools', 'Meeting Tools', 'Advanced AI'],
    isNew: true,
    hasDemo: true,
    popularity: 5,
    complexityLevel: 2,
    integrations: ['Calendar Systems', 'Meeting Platforms', 'Scheduling Tools']
  },
  {
    title: 'Time Optimization',
    description: 'AI-powered time management with focus blocks, productivity analysis, and smart reminders',
    icon: <Clock size={24} />,
    categories: ['All Tools', 'Meeting Tools', 'Advanced AI'],
    isNew: true,
    popularity: 4,
    complexityLevel: 2,
    integrations: ['Time Tracking Tools', 'Productivity Apps', 'Reminder Systems']
  },
  {
    title: 'Team Coordination',
    description: 'Advanced collaboration features with resource booking, team availability, and conflict resolution',
    icon: <Users size={24} />,
    categories: ['All Tools', 'Meeting Tools', 'Advanced AI'],
    isNew: true,
    popularity: 4,
    complexityLevel: 2,
    integrations: ['Team Collaboration Tools', 'Resource Management Systems', 'Calendar Sync']
  },
  {
    title: 'Smart Automation',
    description: 'Intelligent workflow automation with recurring meetings, follow-ups, and task assignments',
    icon: <Zap size={24} />,
    categories: ['All Tools', 'Meeting Tools', 'Advanced AI'],
    isNew: true,
    hasDemo: true,
    popularity: 5,
    complexityLevel: 2,
    integrations: ['Automation Platforms', 'Workflow Tools', 'Task Management Systems']
  }
];

// Helper function to get available categories
const getUniqueCategories = (): FeatureCategory[] => {
  const categories = new Set<FeatureCategory>();
  
  features.forEach(feature => {
    feature.categories.forEach(category => {
      categories.add(category);
    });
  });
  
  return Array.from(categories).sort();
};

const AiFeaturesCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory>('All Tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [filteredFeatures, setFilteredFeatures] = useState<AIFeature[]>(features);
  const [complexityFilter, setComplexityFilter] = useState<number | null>(null);
  const [popularityFilter, setPopularityFilter] = useState<number | null>(null);
  const [showingNewOnly, setShowingNewOnly] = useState(false);
  const [showingDemosOnly, setShowingDemosOnly] = useState(false);
  
  const categories = getUniqueCategories();
  
  useEffect(() => {
    let result = features;
    
    // Filter by category
    if (selectedCategory !== 'All Tools') {
      result = result.filter(feature => 
        feature.categories.includes(selectedCategory)
      );
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(feature =>
        feature.title.toLowerCase().includes(query) ||
        feature.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by complexity
    if (complexityFilter !== null) {
      result = result.filter(feature => 
        feature.complexityLevel === complexityFilter
      );
    }
    
    // Filter by popularity
    if (popularityFilter !== null) {
      result = result.filter(feature => 
        feature.popularity && feature.popularity >= popularityFilter
      );
    }
    
    // Filter by new status
    if (showingNewOnly) {
      result = result.filter(feature => feature.isNew);
    }
    
    // Filter by demo availability
    if (showingDemosOnly) {
      result = result.filter(feature => feature.hasDemo);
    }
    
    setFilteredFeatures(result);
  }, [selectedCategory, searchQuery, complexityFilter, popularityFilter, showingNewOnly, showingDemosOnly]);
  
  const clearFilters = () => {
    setSelectedCategory('All Tools');
    setSearchQuery('');
    setComplexityFilter(null);
    setPopularityFilter(null);
    setShowingNewOnly(false);
    setShowingDemosOnly(false);
  };
  
  return (
    <section id="ai-features" className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/30 pointer-events-none" />

      {/* Animated floating icons */}
      <AnimatedIconsGroup 
        section="ai" 
        iconCount={10} 
        density="high"
        animations={['bounce', 'pulse', 'rotate', 'orbit', 'random']} 
      />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 right-[10%] w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" 
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
          className="absolute bottom-40 left-[5%] w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">AI-Powered Features</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore our full catalog of AI tools designed to transform your customer relationships
            </p>
          </div>
        </AnimatedElement>
        
        {/* Enhanced Search and Filter Interface */}
        <AnimatedElement animation="fadeIn" delay={0.2}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-10 relative">
            <InteractiveFloatingButton 
              text="Try Filtering" 
              position="top-right" 
              color="blue" 
              delay={2}
            />
            
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="relative flex-grow max-w-xl">
                <Search className="absolute left-3 top-2.5 text-white/50" size={18} />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-white/50 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <div className="relative group">
                  <motion.button
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter size={16} className="mr-2" />
                    <span>Filters</span>
                  </motion.button>
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="mb-4">
                      <p className="text-white text-sm font-medium mb-2">Complexity Level</p>
                      <div className="flex gap-2">
                        {[null, 1, 2, 3].map((level) => (
                          <button
                            key={`complexity-${level}`}
                            className={`px-2 py-1 rounded text-xs ${
                              complexityFilter === level 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                            onClick={() => setComplexityFilter(level)}
                          >
                            {level === null ? 'Any' : `Level ${level}`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-white text-sm font-medium mb-2">Popularity</p>
                      <div className="flex gap-2">
                        {[null, 3, 4, 5].map((rating) => (
                          <button
                            key={`rating-${rating}`}
                            className={`px-2 py-1 rounded text-xs ${
                              popularityFilter === rating 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                            onClick={() => setPopularityFilter(rating)}
                          >
                            {rating === null ? 'Any' : `${rating}★+`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showingNewOnly}
                          onChange={() => setShowingNewOnly(!showingNewOnly)}
                          className="mr-2"
                        />
                        <span className="text-white">New features only</span>
                      </label>
                      <label className="flex items-center text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showingDemosOnly}
                          onChange={() => setShowingDemosOnly(!showingDemosOnly)}
                          className="mr-2"
                        />
                        <span className="text-white">Interactive demos only</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {(searchQuery || selectedCategory !== 'All Tools' || complexityFilter !== null || 
                 popularityFilter !== null || showingNewOnly || showingDemosOnly) && (
                  <motion.button
                    className="px-4 py-2 text-white/70 hover:text-white flex items-center"
                    onClick={clearFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={16} className="mr-1" />
                    Clear Filters
                  </motion.button>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: selectedCategory !== category ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            
            {(searchQuery || selectedCategory !== 'All Tools' || complexityFilter !== null || 
             popularityFilter !== null || showingNewOnly || showingDemosOnly) && (
              <motion.div
                className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white/60 text-sm">Active filters:</span>
                
                {searchQuery && (
                  <motion.div
                    className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Search size={12} className="mr-1" />
                    "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-1 hover:text-white"
                    >
                      <X size={10} />
                    </button>
                  </motion.div>
                )}
                
                {selectedCategory !== 'All Tools' && (
                  <motion.div
                    className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Filter size={12} className="mr-1" />
                    {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory('All Tools')}
                      className="ml-1 hover:text-white"
                    >
                      <X size={10} />
                    </button>
                  </motion.div>
                )}
                
                {complexityFilter !== null && (
                  <motion.div
                    className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Layers size={12} className="mr-1" />
                    Complexity: Level {complexityFilter}
                    <button 
                      onClick={() => setComplexityFilter(null)}
                      className="ml-1 hover:text-white"
                    >
                      <X size={10} />
                    </button>
                  </motion.div>
                )}
                
                {popularityFilter !== null && (
                  <motion.div
                    className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Star size={12} className="mr-1" />
                    {popularityFilter}★+ Popularity
                    <button 
                      onClick={() => setPopularityFilter(null)}
                      className="ml-1 hover:text-white"
                    >
                      <X size={10} />
                    </button>
                  </motion.div>
                )}
                
                {showingNewOnly && (
                  <motion.div
                    className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Zap size={12} className="mr-1" />
                    New only
                    <button 
                      onClick={() => setShowingNewOnly(false)}
                      className="ml-1 hover:text-white"
                    >
                      <X size={10} />
                    </button>
                  </motion.div>
                )}
                
                {showingDemosOnly && (
                  <motion.div
                    className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full text-xs flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <ThumbsUp size={12} className="mr-1" />
                    Interactive demos only
                    <button 
                      onClick={() => setShowingDemosOnly(false)}
                      className="ml-1 hover:text-white"
                    >
                      <X size={10} />
                    </button>
                  </motion.div>
                )}
                
                <span className="text-white/60 text-sm ml-auto">
                  {filteredFeatures.length} result{filteredFeatures.length !== 1 ? 's' : ''}
                </span>
              </motion.div>
            )}
          </div>
        </AnimatedElement>
        
        {/* Feature Header - New Real-time Features */}
        <AnimatedElement animation="fadeIn" delay={0.3}>
          {selectedCategory === 'Real-time' || selectedCategory === 'All Tools' && (
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 mb-10 relative">
              <InteractiveFloatingButton 
                text="Interactive Features" 
                position="top-right" 
                color="purple" 
                icon="hand"
              />
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotateZ: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                >
                  <Zap className="text-blue-400 h-8 w-8" />
                </motion.div>
                <div className="flex-grow">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2 flex items-center"
                    whileHover={{ x: 3 }}
                  >
                    <span>Real-time AI Features</span>
                    <motion.div
                      className="ml-2 px-1.5 py-0.5 bg-blue-500/30 rounded-sm text-xs text-blue-200"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      NEW
                    </motion.div>
                  </motion.h3>
                  <p className="text-white/80">
                    Experience our latest real-time AI capabilities powered by GPT5 2.5 Flash and Pro models. Get instant responses, live analysis, and streaming results that feel more natural and responsive than ever before.
                  </p>
                </div>
              </div>
            </div>
          )}
        </AnimatedElement>
        
        {/* Feature Grid */}
        <AnimatedElement animation="fadeIn" delay={0.4}>
          {filteredFeatures.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 overflow-hidden transition-all duration-300 relative"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.15)",
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  {feature.hasDemo && (
                    <InteractiveFloatingButton 
                      text="Try Demo" 
                      position="top-right"
                      color="green" 
                      size="small"
                      delay={index * 0.2 + 3}
                    />
                  )}
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <motion.div
                          className="p-2 bg-blue-500/20 rounded-lg mr-3"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          animate={feature.isNew ? {
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                          } : {}}
                          transition={{ duration: 2, repeat: feature.isNew ? Infinity : 0, repeatDelay: 1 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-lg font-semibold text-white">
                          {feature.title}
                          {feature.isNew && (
                            <motion.span
                              className="ml-2 inline-block px-1.5 py-0.5 bg-blue-600 text-white text-[10px] rounded uppercase"
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              New
                            </motion.span>
                          )}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-4">{feature.description}</p>
                    
                    <motion.button
                      className="mt-4 text-blue-400 text-sm flex items-center justify-center mx-auto"
                      onClick={() => setExpandedFeature(expandedFeature === feature.title ? null : feature.title)}
                      whileHover={{ x: 3 }}
                    >
                      <span>Feature details</span>
                      <ChevronRight size={14} className="ml-1" />
                    </motion.button>
                    
                    <AnimatePresence>
                      {expandedFeature === feature.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 pt-3 border-t border-white/10"
                        >
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-white/5 p-2 rounded">
                              <span className="text-white/60">Complexity:</span>
                              <div className="flex mt-1">
                                {[1, 2, 3].map((level) => (
                                  <div 
                                    key={level} 
                                    className={`w-4 h-1.5 rounded-full mr-1 ${
                                      level <= (feature.complexityLevel || 1) 
                                        ? 'bg-blue-500' 
                                        : 'bg-white/10'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="bg-white/5 p-2 rounded">
                              <span className="text-white/60">Popularity:</span>
                              <div className="flex mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    size={10} 
                                    className={`mr-0.5 ${
                                      star <= (feature.popularity || 0) 
                                        ? 'text-yellow-400 fill-yellow-400' 
                                        : 'text-white/10'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {feature.integrations && feature.integrations.length > 0 && (
                            <div className="mt-3">
                              <span className="text-white/60 text-xs">Integrations:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {feature.integrations.map((integration, idx) => (
                                  <span 
                                    key={idx} 
                                    className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/70"
                                  >
                                    {integration}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search className="mx-auto mb-4 text-white/30" size={48} />
              <h3 className="text-white text-xl font-medium mb-2">No matching tools found</h3>
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
        
        {/* View All Features Button */}
        <div className="text-center mt-12">
          <motion.button 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore All Smart CRM Features</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AiFeaturesCatalog;