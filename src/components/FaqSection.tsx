import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, X, ArrowRight, Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import InteractiveFloatingButton from './InteractiveFloatingButton';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    question: "When is the Smart CRM masterclass?",
    answer: "Our 3-day Smart CRM masterclass is scheduled for October 19-21, 2025 at 3:00 PM EST each day. This interactive online training will teach you how to transform your customer relationships using AI-powered CRM strategies.",
    category: "Masterclass"
  },
  {
    question: "How is Smart CRM different from other CRM solutions?",
    answer: "Smart CRM stands out with its AI-powered automation that reduces manual data entry by up to 60%. Our system learns from your team's activities to provide actionable insights and predictive recommendations, unlike traditional CRMs that function primarily as databases. We've built Smart CRM from the ground up to focus on relationship intelligence rather than just contact management.",
    category: "Features"
  },
  {
    question: "What is the pricing for Smart CRM?",
    answer: "Smart CRM is available for a one-time payment of $97 (regularly $999) with lifetime access to all features. There are no monthly subscription fees, no per-user charges, and no hidden costs. Use coupon 'SMARTCRM VIP' at checkout for this special pricing. This includes unlimited contacts, unlimited users, and all premium AI-powered features.",
    category: "Pricing"
  },
  {
    question: "Which platforms and tools does Smart CRM integrate with?",
    answer: "Smart CRM seamlessly integrates with popular business tools including Gmail, Outlook, Slack, Zoom, Microsoft Teams, LinkedIn, HubSpot, Mailchimp, Zapier, QuickBooks, Stripe, PayPal, DocuSign, Google Workspace, and many more through our open API. Our integration marketplace is constantly expanding based on customer feedback and needs.",
    category: "Integrations"
  },
  {
    question: "Is Smart CRM suitable for small businesses?",
    answer: "Absolutely! Smart CRM is designed to be accessible for businesses of all sizes. Our intuitive interface requires minimal training, and the AI automation helps small teams accomplish more with limited resources. Our small business customers typically report saving 5-10 hours per week per sales rep after implementing Smart CRM.",
    category: "General"
  },
  {
    question: "How secure is my customer data with Smart CRM?",
    answer: "Security is our top priority. Smart CRM is built with enterprise-grade security including SOC 2 compliance, end-to-end encryption, regular security audits, and GDPR compliance to ensure your customer data remains protected. We implement role-based access controls, two-factor authentication, and maintain a comprehensive security program reviewed by independent third parties.",
    category: "Security"
  },
  {
    question: "Can I migrate my data from another CRM system?",
    answer: "Yes, we've built powerful import tools that make migrating from other CRM systems like Salesforce, HubSpot, or Zoho straightforward. Our data migration specialists will help ensure your customer data, history, and customizations transfer smoothly. We provide both self-service and assisted migration options depending on your needs.",
    category: "Implementation"
  },
  {
    question: "How much training is required to get my team up and running?",
    answer: "Smart CRM is designed with user experience as a priority. Most users can start being productive within minutes thanks to our intuitive interface and guided onboarding. We also provide comprehensive documentation, video tutorials, and regular live training sessions. For enterprise customers, we offer dedicated training programs tailored to your specific workflows.",
    category: "Implementation"
  },
  {
    question: "Does Smart CRM work on mobile devices?",
    answer: "Yes, Smart CRM features a fully responsive web application plus native iOS and Android apps. The mobile experience includes all critical functionality including contact management, opportunity tracking, task management, and even works offline with automatic synchronization when you're back online.",
    category: "Features"
  },
  {
    question: "Can I customize Smart CRM to fit my business processes?",
    answer: "Absolutely. Smart CRM offers extensive customization options including custom fields, workflow automation rules, personalized dashboards, and custom objects. You can adapt the system to match your unique sales process without requiring developers. For more advanced customizations, our API provides deeper integration capabilities.",
    category: "Features"
  },
  {
    question: "What's included in the free masterclass that comes with Smart CRM?",
    answer: "Day 1 (October 19): Advanced Smart CRM AI Features - Master all AI-powered automation, lead scoring, and predictive analytics. Day 2 (October 20): Implementation & Optimization - Learn advanced setup strategies and how to maximize your Smart CRM ROI. Day 3 (October 21): Advanced Workflows - Master automation and optimization strategies.",
    category: "Masterclass"
  },
  {
    question: "Will the masterclass be recorded for later viewing?",
    answer: "Yes, all Smart CRM customers receive access to the masterclass recordings and all downloadable resources, even if they can't attend live. However, attending live gives you the opportunity to participate in the Q&A session and get your specific questions answered by our experts.",
    category: "Masterclass"
  },
  {
    question: "Is the masterclass really free with Smart CRM purchase?",
    answer: "Yes! The 3-day masterclass is completely included with your Smart CRM purchase during our special sale. This training normally costs $697, but it's free for all Smart CRM customers who purchase during October 19-23, 2025.",
    category: "Masterclass"
  }
];

const FaqSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedAnswer, setExpandedAnswer] = useState<number | null>(null);
  
  // Get all unique categories
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  // Filter FAQs based on search query and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faq" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/30 pointer-events-none" />
      
      {/* Animated floating icons for FAQ section */}
      <AnimatedIconsGroup 
        section="pricing" 
        iconCount={10}
        animations={['pulse', 'rotate']} 
        density="low"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-white/70 max-w-2xl mx-auto">
              Everything you need to know about Smart CRM. Can't find the answer you're looking for? Contact our team at support@smartcrm.com
            </p>
          </div>
        </AnimatedElement>
        
        <AnimatedElement animation="fadeIn" delay={0.2}>
          <div className="mb-8 relative">
            <InteractiveFloatingButton 
              text="Search Questions" 
              position="top-right"
              color="blue" 
              delay={1}
            />
            
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full px-4 py-3 pl-10 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 focus:outline-none focus:border-blue-500 text-white"
              />
              <Search className="absolute left-3 top-3.5 text-white/50" size={18} />
              {searchQuery && (
                <motion.button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-white/50 hover:text-white"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <motion.button
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === null 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
              onClick={() => setSelectedCategory(null)}
              whileHover={{ scale: selectedCategory !== null ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            
            {categories.map((category, idx) => (
              <motion.button
                key={idx}
                className={`px-3 py-1 rounded-full text-sm ${
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
        </AnimatedElement>
        
        <div className="relative">
          <InteractiveFloatingButton 
            text="Click Questions" 
            position="top-right"
            color="purple"
            delay={2}
          />
          
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <FaqItem 
                  key={index} 
                  question={faq.question} 
                  answer={faq.answer} 
                  category={faq.category}
                  isOpen={openItem === index}
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                  onReadMore={() => setExpandedAnswer(expandedAnswer === index ? null : index)}
                  isExpanded={expandedAnswer === index}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-10 bg-white/5 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white/70">No matching questions found. Try a different search term.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  onClick: () => void;
  onReadMore: () => void;
  isExpanded: boolean;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ 
  question, 
  answer, 
  category, 
  isOpen,
  onClick, 
  onReadMore, 
  isExpanded,
  index
}) => {
  const longAnswer = answer.length > 200;
  const shortenedAnswer = longAnswer && !isExpanded ? answer.slice(0, 200) + '...' : answer;
  
  return (
    <motion.div
      className="border border-white/10 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ borderColor: isOpen ? "rgba(59, 130, 246, 0.4)" : "rgba(255, 255, 255, 0.2)" }}
    >
      <motion.button
        className={`flex justify-between items-center w-full px-6 py-4 text-left ${isOpen ? 'bg-white/10' : 'bg-white/5'} hover:bg-white/10 transition-colors focus:outline-none`}
        onClick={onClick}
        whileHover={{ x: 3 }}
      >
        <motion.span 
          className="font-medium text-white"
          animate={isOpen ? { color: "#3b82f6" } : { color: "#ffffff" }}
        >
          {question}
        </motion.span>
        <div className="flex items-center">
          <motion.span 
            className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/60 mr-3"
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            {category}
          </motion.span>
          <motion.span 
            className="ml-6 flex-shrink-0 text-white/70"
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} />
          </motion.span>
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="px-6 py-4 bg-white/[0.03]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white/70">{shortenedAnswer}</p>
            
            {longAnswer && (
              <motion.button
                className="text-blue-400 text-sm mt-2 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  onReadMore();
                }}
                whileHover={{ x: 3 }}
              >
                {isExpanded ? "Show less" : "Read more"}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqSection;