import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight, Search, Filter, X, ChevronDown, ChevronUp, User, MapPin, Building, Award, ThumbsUp } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  imageUrl: string;
  industry?: string;
  companySize?: string;
  impact?: string;
  yearCustomer?: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Smart CRM has completely transformed how our sales team operates. The AI recommendations have helped us close 38% more deals in just the first quarter of use.",
    author: "Sarah Johnson",
    role: "VP of Sales",
    company: "TechGrowth Inc.",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Technology",
    companySize: "51-200 employees",
    impact: "38% more closed deals",
    yearCustomer: 2024
  },
  {
    quote: "After trying multiple CRM solutions, Smart CRM stands out for its intuitive design and powerful automation. My team adopted it immediately with virtually no training.",
    author: "Marcus Chen",
    role: "Sales Director",
    company: "Innovate Solutions",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Software",
    companySize: "201-500 employees",
    impact: "95% team adoption rate",
    yearCustomer: 2023
  },
  {
    quote: "The customer 360° view helps us understand the complete relationship at a glance. It's like having a relationship memory that never forgets a detail.",
    author: "Priya Patel",
    role: "Customer Success Manager",
    company: "GlobalServe",
    rating: 4,
    imageUrl: "https://images.pexels.com/photos/3786525/pexels-photo-3786525.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Professional Services",
    companySize: "501-1000 employees",
    impact: "27% increase in customer retention",
    yearCustomer: 2024
  },
  {
    quote: "Email intelligence alone saved our team 15 hours per week. Smart CRM captures everything automatically - no more manual logging or copy-pasting.",
    author: "James Williams",
    role: "Chief Revenue Officer",
    company: "FastGrow Enterprises",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "E-commerce",
    companySize: "11-50 employees",
    impact: "15 hours saved weekly per rep",
    yearCustomer: 2024
  },
  {
    quote: "The forecasting accuracy is incredible. We can now predict our quarterly revenue within a 5% margin of error, which has completely transformed our planning process.",
    author: "Emma Rodriguez",
    role: "Sales Operations Manager",
    company: "NexGen Services",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Financial Services",
    companySize: "1001+ employees",
    impact: "95% forecasting accuracy",
    yearCustomer: 2023
  },
  {
    quote: "For a healthcare company with strict compliance needs, Smart CRM's security features are a game-changer. We can finally use a modern CRM without compliance concerns.",
    author: "Dr. Michael Weber",
    role: "Director of Business Development",
    company: "MediCare Solutions",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Healthcare",
    companySize: "501-1000 employees",
    impact: "Passed compliance audit with zero findings",
    yearCustomer: 2024
  },
  {
    quote: "We've tried 3 different CRM solutions in the past 2 years. Smart CRM is the only one where our sales team didn't revolt. The AI automation has eliminated so much busywork.",
    author: "Alexandra Torres",
    role: "Head of Revenue",
    company: "Retail Innovations",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Retail",
    companySize: "101-500 employees",
    impact: "70% reduction in manual data entry",
    yearCustomer: 2023
  },
  {
    quote: "The integration with our existing tech stack was seamless. Smart CRM connected with our marketing automation, support desk, and accounting software in under a day.",
    author: "David Kim",
    role: "CTO",
    company: "SaaS Ventures",
    rating: 4,
    imageUrl: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Technology",
    companySize: "51-200 employees",
    impact: "7 integrated systems, 1 day setup",
    yearCustomer: 2024
  },
  {
    quote: "Smart CRM's mobile experience is outstanding. Our field sales reps can access everything they need on the go, even when they're offline in remote locations.",
    author: "Thomas Garcia",
    role: "Field Sales Director",
    company: "Construction Partners",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Construction",
    companySize: "201-500 employees",
    impact: "42% faster deal updates from the field",
    yearCustomer: 2023
  },
  {
    quote: "The conversation intelligence feature has revolutionized our sales coaching. Now we can easily identify what works and replicate successful strategies across the team.",
    author: "Jennifer Wu",
    role: "VP of Customer Experience",
    company: "Cloud Solutions Inc.",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Software",
    companySize: "501-1000 employees",
    impact: "31% improvement in conversion rates",
    yearCustomer: 2024
  },
  {
    quote: "As a small business, we never thought we could afford enterprise-level CRM capabilities. Smart CRM puts powerful tools within reach of growing companies like ours.",
    author: "Robert Johnson",
    role: "Founder & CEO",
    company: "Boutique Consulting",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/2923156/pexels-photo-2923156.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Professional Services",
    companySize: "1-10 employees",
    impact: "53% revenue growth in 6 months",
    yearCustomer: 2024
  },
  {
    quote: "The AI-powered lead scoring has been uncannily accurate. It's helped us focus our energy on the right prospects and increased our conversion rates by 42%.",
    author: "Sophia Martinez",
    role: "Marketing Director",
    company: "Digital Growth Agency",
    rating: 4,
    imageUrl: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Marketing",
    companySize: "11-50 employees",
    impact: "42% higher conversion rates",
    yearCustomer: 2023
  },
  {
    quote: "Working in manufacturing, we have complex sales cycles. Smart CRM's customizable workflow automation has streamlined our processes and shortened our sales cycle by 35%.",
    author: "Richard Zhang",
    role: "Sales Operations Manager",
    company: "Industrial Innovations",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Manufacturing",
    companySize: "501-1000 employees",
    impact: "35% shorter sales cycles",
    yearCustomer: 2024
  },
  {
    quote: "The Smart CRM dashboard gives our executives the real-time insights they need. No more waiting for monthly reports or questioning data accuracy.",
    author: "Elizabeth Taylor",
    role: "Chief Operating Officer",
    company: "Finance Partners Group",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Financial Services",
    companySize: "201-500 employees",
    impact: "Real-time visibility across 5 departments",
    yearCustomer: 2023
  },
  {
    quote: "The customer support team at Smart CRM is exceptional. They've been responsive, knowledgeable, and genuinely invested in our success from day one.",
    author: "Christopher Wilson",
    role: "IT Director",
    company: "Healthcare Systems",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Healthcare",
    companySize: "1001+ employees",
    impact: "4-minute average support response time",
    yearCustomer: 2024
  },
  {
    quote: "Smart CRM's pipeline analytics helped us identify bottlenecks in our sales process that we didn't even know existed. Fixing those increased our win rate significantly.",
    author: "Rebecca Chen",
    role: "Revenue Operations Director",
    company: "Analytics Partners",
    rating: 5,
    imageUrl: "https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=150",
    industry: "Technology",
    companySize: "101-500 employees",
    impact: "29% improvement in win rates",
    yearCustomer: 2023
  }
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterIndustry, setFilterIndustry] = useState<string | null>(null);
  const [filterCompanySize, setFilterCompanySize] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Filter testimonials based on criteria
  const filteredTestimonials = testimonials.filter(t => {
    let matches = true;
    
    if (filterIndustry && t.industry !== filterIndustry) {
      matches = false;
    }
    
    if (filterCompanySize && t.companySize !== filterCompanySize) {
      matches = false;
    }
    
    if (filterRating && t.rating < filterRating) {
      matches = false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const textToSearch = `${t.quote} ${t.author} ${t.company} ${t.role} ${t.industry || ''}`.toLowerCase();
      if (!textToSearch.includes(query)) {
        matches = false;
      }
    }
    
    return matches;
  });

  // Auto-rotate testimonials in carousel mode
  useEffect(() => {
    if (!isExpanded) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % filteredTestimonials.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isExpanded, filteredTestimonials.length]);

  // Handle manual navigation
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  // Extract unique values for filters
  const uniqueIndustries = Array.from(new Set(testimonials.map(t => t.industry))).filter(Boolean) as string[];
  const uniqueCompanySizes = Array.from(new Set(testimonials.map(t => t.companySize))).filter(Boolean) as string[];

  // Clear all filters
  const clearFilters = () => {
    setFilterIndustry(null);
    setFilterCompanySize(null);
    setFilterRating(null);
    setSearchQuery('');
  };

  // Shake animation for when no results are found
  useEffect(() => {
    if (filteredTestimonials.length === 0) {
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      });
    }
  }, [filteredTestimonials.length, controls]);

  return (
    <section id="testimonials" className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-40 -right-32 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" 
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 left-40 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 12,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Animated floating icons for testimonials section */}
      <AnimatedIconsGroup 
        section="pricing" 
        iconCount={12}
        animations={['bounce', 'pulse', 'orbit', 'random']} 
        density="low"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <AnimatedElement animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Beta Users Say</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-white/70 max-w-2xl mx-auto text-lg mb-8">
              Smart CRM is already making a difference for businesses in our early access program.
            </p>
          </AnimatedElement>
        </div>
        
        {/* Enhanced Filter Interface */}
        <AnimatedElement animation="fadeIn" delay={0.2}>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 mb-8 relative">
            <InteractiveFloatingButton 
              text="Filter Testimonials" 
              position="top-right"
              color="blue"
              delay={1}
            />
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <motion.div 
                  className="p-2 rounded-full bg-blue-500/20 mr-3"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Filter className="text-blue-400" size={18} />
                </motion.div>
                <div>
                  <h3 className="text-white font-medium">Testimonial Filters</h3>
                  <p className="text-white/60 text-sm">Find testimonials relevant to your business</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search testimonials..."
                    className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-auto"
                  />
                  <Search className="absolute right-3 top-2.5 text-white/50" size={16} />
                </div>
                
                <motion.button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isFilterOpen 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center">
                    <Filter size={14} className="mr-1" />
                    Advanced Filters
                    {isFilterOpen ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
                  </span>
                </motion.button>
                
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setIsGridView(true)}
                    className={`p-2 rounded-lg ${isGridView ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/60'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Grid view"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
                      <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
                      <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
                      <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => setIsGridView(false)}
                    className={`p-2 rounded-lg ${!isGridView ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/60'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="List view"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="4" rx="1" fill="currentColor" />
                      <rect x="3" y="10" width="18" height="4" rx="1" fill="currentColor" />
                      <rect x="3" y="17" width="18" height="4" rx="1" fill="currentColor" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Expanded Filter Panel */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <p className="text-white/80 text-sm mb-2 flex items-center">
                        <Building size={14} className="mr-1" /> Industry
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <motion.button
                          className={`px-3 py-1 rounded-full text-xs ${filterIndustry === null ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                          onClick={() => setFilterIndustry(null)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          All
                        </motion.button>
                        
                        {uniqueIndustries.map((industry, index) => (
                          <motion.button
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs ${filterIndustry === industry ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                            onClick={() => setFilterIndustry(industry)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {industry}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-white/80 text-sm mb-2 flex items-center">
                        <User size={14} className="mr-1" /> Company Size
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <motion.button
                          className={`px-3 py-1 rounded-full text-xs ${filterCompanySize === null ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                          onClick={() => setFilterCompanySize(null)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          All
                        </motion.button>
                        
                        {uniqueCompanySizes.map((size, index) => (
                          <motion.button
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs ${filterCompanySize === size ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                            onClick={() => setFilterCompanySize(size)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {size}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-white/80 text-sm mb-2 flex items-center">
                        <Star size={14} className="mr-1" /> Minimum Rating
                      </p>
                      <div className="flex gap-2">
                        {[null, 5, 4, 3].map((rating, index) => (
                          <motion.button
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs ${filterRating === rating ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                            onClick={() => setFilterRating(rating)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {rating === null ? 'Any' : `${rating}★+`}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <motion.button
                      onClick={clearFilters}
                      className="px-3 py-1 text-sm text-white/70 hover:text-white flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!filterIndustry && !filterCompanySize && !filterRating && !searchQuery}
                    >
                      <X size={14} className="mr-1" />
                      Clear Filters
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Filter status/info bar */}
            {(filterIndustry || filterCompanySize || filterRating || searchQuery) && (
              <motion.div 
                className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white/60 text-sm">Filters:</span>
                  
                  {filterIndustry && (
                    <motion.div 
                      className="px-2 py-1 bg-blue-500/20 rounded-full text-xs text-blue-400 flex items-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <Building size={10} className="mr-1" />
                      {filterIndustry}
                      <button 
                        onClick={() => setFilterIndustry(null)}
                        className="ml-1 hover:text-white"
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  )}
                  
                  {filterCompanySize && (
                    <motion.div 
                      className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-400 flex items-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <User size={10} className="mr-1" />
                      {filterCompanySize}
                      <button 
                        onClick={() => setFilterCompanySize(null)}
                        className="ml-1 hover:text-white"
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  )}
                  
                  {filterRating && (
                    <motion.div 
                      className="px-2 py-1 bg-yellow-500/20 rounded-full text-xs text-yellow-400 flex items-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <Star size={10} className="mr-1" />
                      {filterRating}+ stars
                      <button 
                        onClick={() => setFilterRating(null)}
                        className="ml-1 hover:text-white"
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  )}
                  
                  {searchQuery && (
                    <motion.div 
                      className="px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-400 flex items-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <Search size={10} className="mr-1" />
                      "{searchQuery}"
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="ml-1 hover:text-white"
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  )}
                </div>
                
                <p className="text-white/60 text-sm">
                  {filteredTestimonials.length} result{filteredTestimonials.length !== 1 ? 's' : ''}
                </p>
              </motion.div>
            )}
          </div>
        </AnimatedElement>
        
        {/* No results message with animation */}
        {filteredTestimonials.length === 0 ? (
          <motion.div 
            className="bg-white/5 backdrop-blur-md rounded-xl p-10 border border-white/10 text-center my-8"
            animate={controls}
          >
            <SearchIcon size={48} className="text-white/20 mx-auto mb-4" />
            <h3 className="text-white text-xl font-medium mb-2">No matching testimonials found</h3>
            <p className="text-white/60 mb-4">Try adjusting your filters or search terms</p>
            <motion.button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        ) : isExpanded ? (
          // Expanded Grid/List View
          <>
            <div className={isGridView 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative" 
              : "flex flex-col gap-4 relative"
            }>
              <InteractiveFloatingButton 
                text="Hover for Details" 
                position="top-right"
                color="purple"
                delay={2}
              />
              
              {filteredTestimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index} 
                  testimonial={testimonial} 
                  index={index} 
                  isListView={!isGridView}
                  onHover={(isHovering) => setHoveredIndex(isHovering ? index : null)}
                  isHovered={hoveredIndex === index}
                />
              ))}
            </div>
          </>
        ) : (
          // Carousel View
          <div className="relative">
            <InteractiveFloatingButton 
              text="Navigate Testimonials" 
              position="top-right"
              color="green"
              delay={1}
            />
            
            <div className="flex justify-between items-center mb-8">
              <motion.button
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white"
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
              
              <div className="flex space-x-2">
                {filteredTestimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full ${activeIndex === index ? 'bg-blue-500' : 'bg-white/30'}`}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.5 }}
                  />
                ))}
              </div>
              
              <motion.button
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white"
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>
            
            <div ref={carouselRef} className="overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <EnhancedFeaturedTestimonial testimonial={filteredTestimonials[activeIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <motion.button
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? "Show Featured" : "View All Testimonials"}
          </motion.button>
        </div>
        
        <div className="mt-16 text-center">
          <motion.div 
            className="inline-block bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-xl px-6 py-4 border border-blue-500/30"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
            }}
          >
            <motion.div
              className="flex items-center justify-center mb-2 gap-2"
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <ThumbsUp className="text-blue-400" size={18} />
              <motion.p 
                className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Join 200+ companies already on the waitlist
              </motion.p>
            </motion.div>
            <p className="text-white/70">Be part of the Smart CRM revolution</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isListView?: boolean;
  onHover: (isHovering: boolean) => void;
  isHovered: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  index,
  isListView = false,
  onHover,
  isHovered
}) => {
  return (
    <motion.div 
      className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-blue-500/30 transition-all relative group overflow-hidden ${
        isListView ? 'p-5' : 'p-6'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ 
        y: -5,
        backgroundColor: "rgba(255, 255, 255, 0.08)"
      }}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      layout
    >
      {/* Background effects */}
      <motion.div
        className="absolute -top-14 -right-14 w-28 h-28 rounded-full bg-blue-500/10 blur-xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? { 
          scale: 1.5,
          opacity: 0.5
        } : {
          scale: 1,
          opacity: 0.2
        }}
        transition={{ duration: 0.8 }}
      />
      
      <Quote className="absolute top-4 right-4 text-white/10 h-12 w-12 group-hover:text-blue-500/20 transition-colors" />
      
      {isListView ? (
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <motion.img 
              src={testimonial.imageUrl} 
              alt={testimonial.author} 
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              whileHover={{ scale: 1.1, borderColor: "rgba(59, 130, 246, 0.5)" }}
            />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-medium">{testimonial.author}</p>
                <p className="text-white/60 text-sm">{testimonial.role}, {testimonial.company}</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.3, rotate: i < testimonial.rating ? 20 : 0 }}
                  >
                    <Star 
                      size={14} 
                      className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <p className="text-white/80 text-sm italic mb-3">"{testimonial.quote}"</p>
            
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {testimonial.industry && (
                    <div className="flex items-center text-white/50">
                      <Building size={12} className="mr-1" />
                      <span>{testimonial.industry}</span>
                    </div>
                  )}
                  {testimonial.companySize && (
                    <div className="flex items-center text-white/50">
                      <User size={12} className="mr-1" />
                      <span>{testimonial.companySize}</span>
                    </div>
                  )}
                  {testimonial.impact && (
                    <div className="flex items-center text-green-400">
                      <ThumbsUp size={12} className="mr-1" />
                      <span>{testimonial.impact}</span>
                    </div>
                  )}
                  {testimonial.yearCustomer && (
                    <div className="flex items-center text-white/50">
                      <Clock size={12} className="mr-1" />
                      <span>Customer since {testimonial.yearCustomer}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <motion.img 
              src={testimonial.imageUrl} 
              alt={testimonial.author} 
              className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white/20"
              whileHover={{ scale: 1.1, borderColor: "rgba(59, 130, 246, 0.5)" }}
            />
            <div>
              <p className="text-white font-medium">{testimonial.author}</p>
              <p className="text-white/60 text-sm">{testimonial.role}, {testimonial.company}</p>
            </div>
          </div>
          
          <div className="flex mb-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.3, rotate: i < testimonial.rating ? 20 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Star 
                  size={16} 
                  className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                />
              </motion.div>
            ))}
          </div>
          
          <p className="text-white/80 italic mb-4 min-h-[80px]">"{testimonial.quote}"</p>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {testimonial.industry && (
                  <div className="flex items-center text-white/50">
                    <Building size={12} className="mr-1" />
                    <span>{testimonial.industry}</span>
                  </div>
                )}
                {testimonial.companySize && (
                  <div className="flex items-center text-white/50">
                    <User size={12} className="mr-1" />
                    <span>{testimonial.companySize}</span>
                  </div>
                )}
                {testimonial.impact && (
                  <div className="flex items-center text-green-400">
                    <Award size={12} className="mr-1" />
                    <span>{testimonial.impact}</span>
                  </div>
                )}
                {testimonial.yearCustomer && (
                  <div className="flex items-center text-white/50">
                    <Clock size={12} className="mr-1" />
                    <span>Since {testimonial.yearCustomer}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

interface EnhancedFeaturedTestimonialProps {
  testimonial: Testimonial;
}

const EnhancedFeaturedTestimonial: React.FC<EnhancedFeaturedTestimonialProps> = ({ testimonial }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl p-8 border border-blue-500/30 relative overflow-hidden">
      {/* Background effects */}
      <motion.div 
        className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative">
        <motion.div
          className="absolute -top-4 -left-4 text-blue-500/20 h-20 w-20"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Quote size={80} />
        </motion.div>
        
        <motion.p 
          className="text-white/90 text-xl md:text-2xl italic relative z-10 ml-10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          "{testimonial.quote}"
        </motion.p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        <motion.div 
          className="flex items-center mb-4 md:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="absolute inset-0 bg-blue-500/30 rounded-full blur-md"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <img 
              src={testimonial.imageUrl} 
              alt={testimonial.author} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30 relative z-10"
              loading="lazy"
            />
          </motion.div>
          <div className="ml-4">
            <p className="text-white font-medium text-lg">{testimonial.author}</p>
            <p className="text-white/70">{testimonial.role}, {testimonial.company}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {testimonial.industry && (
                <motion.div 
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70 flex items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.6 }}
                >
                  <Building size={10} className="mr-1" />
                  {testimonial.industry}
                </motion.div>
              )}
              
              {testimonial.companySize && (
                <motion.div 
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70 flex items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.7 }}
                >
                  <User size={10} className="mr-1" />
                  {testimonial.companySize}
                </motion.div>
              )}
              
              {testimonial.impact && (
                <motion.div 
                  className="px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-400 flex items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.8 }}
                >
                  <Award size={10} className="mr-1" />
                  {testimonial.impact}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3, rotate: i < testimonial.rating ? 20 : 0 }}
              transition={{ duration: 0.2 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: {
                  delay: 0.5 + (i * 0.1),
                  type: "spring",
                  stiffness: 500,
                  damping: 20
                }
              }}
            >
              <Star 
                size={24} 
                className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Search icon for empty results
const SearchIcon: React.FC<{size: number, className: string}> = ({size, className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const Clock: React.FC<{size: number, className: string}> = ({size, className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default TestimonialSection;