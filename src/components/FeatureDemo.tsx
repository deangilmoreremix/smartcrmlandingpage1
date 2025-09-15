import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import AnimatedElement from './AnimatedElement';
import DemoVideo from './DemoVideo';
import { Star, ThumbsUp, ChevronLeft, ChevronRight, Quote, User } from 'lucide-react';
import InteractiveFloatingButton from './InteractiveFloatingButton';

const features = [
  {
    id: 'ai-insights',
    title: 'AI-Powered Insights',
    description: 'Smart CRM analyzes your customer data to provide actionable recommendations.',
    thumbnailUrl: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoDescription: 'Watch how our AI identifies patterns in customer behavior and suggests the next best action for your sales team.',
    testimonials: [
      { 
        quote: 'The AI insights have transformed how we prioritize leads. We\'re closing deals 30% faster.',
        author: 'Jessica White',
        company: 'MarketBoost Inc.',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'Smart CRM\'s predictive scoring is uncannily accurate. It\'s like having a crystal ball.',
        author: 'Raj Patel',
        company: 'TechSolutions Group',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'The opportunity insights helped us identify our most profitable customer segments.',
        author: 'Michael Thompson',
        company: 'Growth Partners LLC',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'I was skeptical about AI at first, but the quality of insights has completely changed my mind.',
        author: 'Laura Wilson',
        company: 'Retail Innovations',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Being able to see which deals are most likely to close has transformed our forecasting accuracy.',
        author: 'Carlos Mendez',
        company: 'Global Solutions Inc.',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The AI doesn\'t just provide recommendations, it explains why - which helps our team learn and improve.',
        author: 'Andrea Chen',
        company: 'Learning Systems Corp',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'We\'ve increased our win rate by 27% by focusing on the opportunities the AI flags as high-probability.',
        author: 'Thomas Wright',
        company: 'Success Metrics',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The pattern recognition across thousands of customer interactions is something no human could match.',
        author: 'Sophia Kim',
        company: 'Data Intelligence Ltd',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'It\'s like having a team of data scientists working 24/7 to analyze your customer relationships.',
        author: 'David Johnson',
        company: 'Analytics Partners',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The AI recommendations have helped us uncover sales opportunities we would never have identified.',
        author: 'Emma Rodriguez',
        company: 'Opportunity Ventures',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks and keep your team focused on what matters.',
    thumbnailUrl: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoDescription: 'See how Smart CRM automatically logs emails, schedules follow-ups, and updates records without manual input.',
    testimonials: [
      { 
        quote: 'Our team now spends 68% less time on data entry. The automation is game-changing.',
        author: 'Christina Lee',
        company: 'InnovateX',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'The email follow-up sequences have recovered dozens of stalled conversations.',
        author: 'Daniel Garcia',
        company: 'Outreach Solutions',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'Smart CRM\'s workflow automation is like having an additional team member who never sleeps.',
        author: 'Sarah Mitchell',
        company: 'Accelerate Digital',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Being able to create custom automations without coding has empowered our entire sales team.',
        author: 'Kevin Taylor',
        company: 'Empowerment Tech',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The automation templates saved us weeks of setup time and provided best practices out of the box.',
        author: 'Linda Wang',
        company: 'Efficiency Solutions',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Our sales process used to take 27 manual steps - now it\'s 90% automated with Smart CRM.',
        author: 'John Brooks',
        company: 'Process Excellence',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The automation builder\'s visual interface makes it easy for anyone to create complex workflows.',
        author: 'Michelle Wong',
        company: 'Interface Design Co',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The time we\'ve saved on admin tasks has been redirected into customer conversations.',
        author: 'Alex Peterson',
        company: 'Customer Focus Group',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Smart CRM\'s automations adapt to how our business processes evolve - no rigid workflows.',
        author: 'Rachel Singh',
        company: 'Adaptive Systems',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The automation recipes marketplace lets us share best practices across our global teams.',
        author: 'Mark Williams',
        company: 'Global Enterprises',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ]
  },
  {
    id: 'dashboard',
    title: 'Interactive Dashboards',
    description: 'Visualize your data with customizable dashboards that update in real-time.',
    thumbnailUrl: 'https://images.pexels.com/photos/7689340/pexels-photo-7689340.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoDescription: 'Explore how Smart CRM dashboards provide a complete view of your sales pipeline and team performance.',
    testimonials: [
      { 
        quote: 'The visual pipeline has transformed our sales meetings. Everyone\'s on the same page now.',
        author: 'Thomas Wilson',
        company: 'Strategic Sales Inc.',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'Being able to customize dashboards for different teams has improved our cross-department collaboration.',
        author: 'Linda Chen',
        company: 'Global Systems',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'The real-time updates have eliminated surprises at quarter end. I always know exactly where we stand.',
        author: 'Robert Kennedy',
        company: 'GrowthForce Partners',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The executive dashboard gives our leadership team the KPIs they need at a glance.',
        author: 'Victoria Adams',
        company: 'Executive Solutions',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The interactive elements let us drill down into data without needing to run separate reports.',
        author: 'James Rodriguez',
        company: 'Data Exploration Ltd',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'We\'ve created custom dashboards for each sales stage, giving us unprecedented visibility.',
        author: 'Emma Thompson',
        company: 'Visibility Partners',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The dashboard sharing features help ensure everyone is aligned on performance metrics.',
        author: 'Michael Garcia',
        company: 'Alignment Systems',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The ability to create different views for the same data helps us address different stakeholder needs.',
        author: 'Sophia Lee',
        company: 'Stakeholder Solutions',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Smart CRM\'s dashboards helped us identify bottlenecks in our sales process we didn\'t know existed.',
        author: 'Daniel Wright',
        company: 'Process Optimization',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The visualization tools make complex data understandable to everyone, regardless of analytical skills.',
        author: 'Rachel Kim',
        company: 'Data Democratization Inc',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Experience',
    description: 'Access your CRM anytime, anywhere with our native mobile apps.',
    thumbnailUrl: 'https://images.pexels.com/photos/6393013/pexels-photo-6393013.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoDescription: 'Discover how Smart CRM\'s mobile app keeps you connected with customers even when you\'re on the go.',
    testimonials: [
      { 
        quote: 'Being able to update deals from my phone after meetings has been incredible for our accuracy.',
        author: 'Andrew Phillips',
        company: 'Mobility Systems',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'The offline capabilities mean I can work from anywhere, even with spotty reception at client sites.',
        author: 'Sophia Rodriguez',
        company: 'Field Solutions Ltd.',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'The mobile app is just as powerful as the desktop version. No compromises when I\'m in the field.',
        author: 'Mark Johnson',
        company: 'Travel Industries Group',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The voice notes feature lets me capture meeting details while driving between appointments.',
        author: 'Jennifer Martinez',
        company: 'Road Warriors Inc',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Smart CRM\'s mobile notifications keep me updated on important deal changes throughout the day.',
        author: 'David Wilson',
        company: 'Alert Solutions',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The mobile business card scanner has eliminated manual contact entry completely.',
        author: 'Lisa Chang',
        company: 'Networking Pros',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Location-based reminders help me prepare for meetings as I\'m approaching client offices.',
        author: 'Michael Taylor',
        company: 'Location Intelligence',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The mobile app\'s simplified views help me focus on just what I need when I\'m on the go.',
        author: 'Samantha Wright',
        company: 'Focus Technologies',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Face ID login means I can securely access customer data in seconds between meetings.',
        author: 'Robert Chen',
        company: 'Security Innovations',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The mobile app\'s integration with maps helps me plan my customer visits efficiently.',
        author: 'Emily Thompson',
        company: 'Route Optimization',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ]
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description: 'Keep your data protected with advanced security and compliance features.',
    thumbnailUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoDescription: 'Learn how Smart CRM\'s security features keep your sensitive customer data protected while maintaining compliance.',
    testimonials: [
      { 
        quote: 'As a financial institution, security is paramount. Smart CRM exceeds all our compliance requirements.',
        author: 'Victoria Adams',
        company: 'Secure Financial Group',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'The granular permission controls let us give access to exactly what each team member needs.',
        author: 'James Liu',
        company: 'DataSafe Solutions',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      { 
        quote: 'The audit logs and data encryption give us peace of mind about regulatory compliance.',
        author: 'Elizabeth Torres',
        company: 'Healthcare Innovations',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Smart CRM\'s SOC 2 compliance was essential for our enterprise security requirements.',
        author: 'Richard Johnson',
        company: 'Enterprise Security',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The multi-factor authentication options allow us to implement the security our industry requires.',
        author: 'Maria Garcia',
        company: 'Authentication Systems',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Being able to restrict data access based on user location adds an extra security layer we needed.',
        author: 'Thomas Zhang',
        company: 'GeoSecurity Inc',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The data retention policies help us stay compliant with industry regulations.',
        author: 'Samantha Miller',
        company: 'Compliance Partners',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'Smart CRM\'s security certifications made our procurement process straightforward.',
        author: 'Michael Rogers',
        company: 'Procurement Solutions',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'The detailed security documentation helped us pass our internal security review quickly.',
        author: 'Jennifer White',
        company: 'Security Compliance',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        quote: 'We appreciate the regular penetration testing and security updates that keep our data safe.',
        author: 'Daniel Park',
        company: 'CyberDefense Group',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ]
  }
];

const FeatureDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ai-insights');
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleTestimonialChange = (dir: 'next' | 'prev') => {
    const currentFeature = features.find(f => f.id === activeTab);
    if (!currentFeature) return;
    
    const testimonialCount = currentFeature.testimonials.length;
    
    if (dir === 'next') {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonialCount);
    } else {
      setActiveTestimonialIndex((prev) => (prev - 1 + testimonialCount) % testimonialCount);
    }
  };
  
  return (
    <section id="demo" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-black/80 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">See Smart CRM in Action</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experience the power of Smart CRM's features with these interactive demos
            </p>
          </div>
        </AnimatedElement>
        
        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
          setActiveTestimonialIndex(0);
          setIsExpanded(false);
        }} className="w-full">
          <TabsList className="flex flex-wrap justify-center mb-8 gap-2 relative">
            <InteractiveFloatingButton
              text="Switch Demos" 
              position="top-right" 
              color="purple"
              delay={2}
              size="small"
            />
            
            {features.map((feature) => (
              <TabsTrigger 
                key={feature.id} 
                value={feature.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === feature.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {feature.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {features.map((feature) => (
                activeTab === feature.id && (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value={feature.id} className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                          <p className="text-white/70 mb-6">{feature.description}</p>
                          <p className="text-white/90 mb-6">{feature.demoDescription}</p>
                          <motion.button
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Learn More
                          </motion.button>
                          
                          {/* Enhanced Testimonial Carousel */}
                          <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-md rounded-xl p-5 border border-white/10 relative overflow-hidden">
                            <motion.div
                              className="absolute -top-14 -right-14 w-28 h-28 rounded-full bg-blue-500/10 blur-xl"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                              }}
                              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                            />
                            
                            <div className="flex justify-between items-center mb-4">
                              <motion.div 
                                className="flex items-center"
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                              >
                                <Quote className="text-blue-400 mr-2" size={18} />
                                <h4 className="text-white font-medium">Customer Testimonials</h4>
                              </motion.div>
                              
                              <div className="flex items-center space-x-1">
                                <motion.button
                                  onClick={() => handleTestimonialChange('prev')}
                                  className="p-1.5 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  disabled={isExpanded}
                                >
                                  <ChevronLeft size={16} />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleTestimonialChange('next')}
                                  className="p-1.5 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  disabled={isExpanded}
                                >
                                  <ChevronRight size={16} />
                                </motion.button>
                              </div>
                            </div>
                            
                            {isExpanded ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2"
                              >
                                {feature.testimonials.map((testimonial, idx) => (
                                  <motion.div
                                    key={idx}
                                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)", y: -2 }}
                                  >
                                    <p className="text-white/80 italic text-sm mb-2">"{testimonial.quote}"</p>
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <img 
                                          src={testimonial.imageUrl} 
                                          alt={testimonial.author}
                                          className="w-8 h-8 rounded-full object-cover mr-2"
                                        />
                                        <div>
                                          <p className="text-white text-xs font-medium">{testimonial.author}</p>
                                          <p className="text-white/60 text-xs">{testimonial.company}</p>
                                        </div>
                                      </div>
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <Star 
                                            key={i} 
                                            size={12} 
                                            className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            ) : (
                              <div className="relative overflow-hidden" style={{height: "150px"}}>
                                <AnimatePresence mode="wait">
                                  {feature.testimonials.map((testimonial, idx) => (
                                    activeTestimonialIndex === idx && (
                                      <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0"
                                      >
                                        <div className="bg-white/5 rounded-lg p-4 border border-white/10 h-full flex flex-col">
                                          <p className="text-white/80 italic text-sm mb-auto">"{testimonial.quote}"</p>
                                          <div className="flex justify-between items-center mt-3">
                                            <div className="flex items-center">
                                              <img 
                                                src={testimonial.imageUrl} 
                                                alt={testimonial.author}
                                                className="w-8 h-8 rounded-full object-cover mr-2"
                                                loading="lazy"
                                              />
                                              <div>
                                                <p className="text-white text-sm font-medium">{testimonial.author}</p>
                                                <p className="text-white/60 text-xs">{testimonial.company}</p>
                                              </div>
                                            </div>
                                            <div className="flex">
                                              {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                  key={i}
                                                  initial={{ scale: 0 }}
                                                  animate={{ scale: 1 }}
                                                  transition={{ delay: i * 0.1 }}
                                                >
                                                  <Star 
                                                    size={14} 
                                                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                                                  />
                                                </motion.div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )
                                  ))}
                                </AnimatePresence>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                              <div className="flex justify-center space-x-1">
                                {!isExpanded && feature.testimonials.map((_, idx) => (
                                  <motion.button
                                    key={idx}
                                    className={`w-2 h-2 rounded-full ${activeTestimonialIndex === idx ? 'bg-blue-500' : 'bg-white/20'}`}
                                    onClick={() => setActiveTestimonialIndex(idx)}
                                    whileHover={{ scale: 1.5 }}
                                    whileTap={{ scale: 0.8 }}
                                  />
                                ))}
                              </div>
                              
                              <motion.button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-400 text-sm flex items-center"
                                whileHover={{ x: 3 }}
                              >
                                {isExpanded ? "Show Less" : `View All ${feature.testimonials.length} Testimonials`}
                              </motion.button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <InteractiveFloatingButton 
                            text="Play Demo" 
                            position="top-right"
                            color="green"
                            delay={1}
                          />
                          
                          <DemoVideo
                            thumbnailUrl={feature.thumbnailUrl}
                            videoUrl={feature.videoUrl}
                            title={feature.title}
                            description="Click to play demo"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default FeatureDemo;