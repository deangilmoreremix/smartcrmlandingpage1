import React, { useState, useContext } from 'react';
import CountdownTimer from './CountdownTimer';
import { ChevronDown, CircleCheck as CheckCircle, ExternalLink, ArrowRight, Calendar, Users, BookOpen, Star, User, Mail, Building, Tag, Gift, Zap, ChartBar as BarChart3, Sparkles, TrendingUp, Brain, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import { SignupContext } from '../App';
import { handleFormSubmission } from '../utils/formHelpers';
import CanvasConfetti from './CanvasConfetti';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface HeroProps {
  title: string;
  subtitle: string;
  launchDate: Date;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, launchDate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [highlightedFeature, setHighlightedFeature] = useState<number | null>(null);
  const { openSignupModal, setHasSignedUp } = useContext(SignupContext);
  const [showConfetti, setShowConfetti] = useState(false);

  const smartCrmBenefits = [
    { text: "AI-Powered Lead Scoring" },
    { text: "Automated Contact Management" },
    { text: "Predictive Sales Analytics" }
  ];

  const masterclassTopics = [
    { text: "AI-Powered Smart CRM Strategies", delay: 0 },
    { text: "Customer Relationship Automation with AI", delay: 0.1 },
    { text: "Data-Driven Sales Techniques", delay: 0.2 },
  ];
  
  const scrollToContent = () => {
    const featuresSection = document.getElementById('problem');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!firstName || !lastName || !email.includes('@') || !email.includes('.')) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Prepare form data with source information for Zapier
      const formData = { 
        firstName, 
        lastName, 
        email, 
        source: 'Hero Form'
      };
      
      // Submit to Zapier and handle success
      await handleFormSubmission(formData, () => {
        setIsSubmitted(true);
        setHasSignedUp(true);
        localStorage.setItem('smartCRM_signedUp', 'true');
        // Trigger confetti animation
        setShowConfetti(true);
      });
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden mt-[30px]">
      {/* Show confetti on successful submission */}
      {showConfetti && <CanvasConfetti />}
      
      {/* Animated floating icons */}
      <AnimatedIconsGroup 
        section="hero" 
        iconCount={8} 
        animations={['bounce', 'pulse', 'orbit']} 
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl" 
          animate={{ 
            y: [0, 20, 0],
            x: [0, 15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 -right-20 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl" 
          animate={{ 
            y: [0, -20, 0],
            x: [0, -15, 0]
          }}
          transition={{
            duration: 9,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 left-1/3 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" 
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 10,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <AnimatedElement animation="fadeIn" duration={0.8}>
          {/* NOW AVAILABLE Badge */}
          <motion.div
            className="inline-flex items-center mb-6 relative"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-500/40 to-orange-500/40 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-6 py-3 shadow-2xl border-2 border-yellow-300">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Sparkles className="text-white" size={24} />
                </motion.div>
                <span className="text-white font-black text-2xl tracking-wide">NOW AVAILABLE</span>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Sparkles className="text-white" size={24} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatedElement>
        
        <AnimatedElement animation="slideUp" delay={0.2} duration={0.8}>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="block mb-2">The AI CRM Revolution</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
              Starts Today
            </span>
          </motion.h1>
          <motion.div
            className="flex justify-center items-center space-x-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center bg-blue-600/30 backdrop-blur-md rounded-full px-4 py-2 border border-blue-400/50">
              <Brain className="text-blue-300 mr-2" size={18} />
              <span className="text-white font-medium text-sm">Powered by GPT-5</span>
            </div>
            <div className="flex items-center bg-green-600/30 backdrop-blur-md rounded-full px-4 py-2 border border-green-400/50">
              <Shield className="text-green-300 mr-2" size={18} />
              <span className="text-white font-medium text-sm">Enterprise Ready</span>
            </div>
            <div className="flex items-center bg-purple-600/30 backdrop-blur-md rounded-full px-4 py-2 border border-purple-400/50">
              <TrendingUp className="text-purple-300 mr-2" size={18} />
              <span className="text-white font-medium text-sm">Proven Results</span>
            </div>
          </motion.div>
        </AnimatedElement>
        
        <AnimatedElement animation="slideUp" delay={0.4} duration={0.8}>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-medium">
            The most advanced AI-powered CRM is here. Transform your business with GPT-5 intelligence,
            predictive analytics, and automation that delivers real results.
          </p>
          <p className="text-lg text-white/70 mb-6 max-w-2xl mx-auto">
            Launch special: Get Smart CRM at founder pricing during our 5-day sale (October 13-18) plus exclusive access to our live masterclass (October 14-16).
          </p>
        </AnimatedElement>

        {/* Real-time statistics showcase */}
        <AnimatedElement animation="fadeIn" delay={0.6} duration={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-md rounded-xl p-4 border border-blue-500/30"
              whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.5)' }}
            >
              <motion.div
                className="text-3xl font-bold text-blue-400 mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                94.6%
              </motion.div>
              <div className="text-sm text-white/70">AI Accuracy</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-md rounded-xl p-4 border border-green-500/30"
              whileHover={{ scale: 1.05, borderColor: 'rgba(34, 197, 94, 0.5)' }}
            >
              <motion.div
                className="text-3xl font-bold text-green-400 mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
              >
                40%
              </motion.div>
              <div className="text-sm text-white/70">Revenue Increase</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/30"
              whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)' }}
            >
              <motion.div
                className="text-3xl font-bold text-purple-400 mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
              >
                70%
              </motion.div>
              <div className="text-sm text-white/70">Less Data Entry</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-md rounded-xl p-4 border border-yellow-500/30"
              whileHover={{ scale: 1.05, borderColor: 'rgba(234, 179, 8, 0.5)' }}
            >
              <motion.div
                className="text-3xl font-bold text-yellow-400 mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: 'spring' }}
              >
                500+
              </motion.div>
              <div className="text-sm text-white/70">Companies Trust Us</div>
            </motion.div>
          </div>
        </AnimatedElement>
        
        {/* Breakthrough features showcase */}
        <AnimatedElement animation="fadeIn" delay={0.7} duration={0.8}>
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-md rounded-2xl p-6 max-w-3xl mx-auto border border-blue-500/20 mb-10">
            <div className="flex items-center justify-center mb-4">
              <Brain className="text-blue-400 mr-2" size={24} />
              <h3 className="text-white font-bold text-xl">Breakthrough AI Capabilities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Brain, text: 'GPT-5 Intelligence', color: 'text-blue-400' },
                { icon: Zap, text: 'Real-Time Analysis', color: 'text-yellow-400' },
                { icon: TrendingUp, text: 'Predictive Forecasting', color: 'text-green-400' },
                { icon: Star, text: 'Smart Lead Scoring', color: 'text-purple-400' },
                { icon: CheckCircle, text: 'Automated Workflows', color: 'text-blue-400' },
                { icon: Shield, text: 'Enterprise Security', color: 'text-green-400' },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon className={`${feature.color} mr-3 flex-shrink-0`} size={20} />
                    <span className="text-white/90 text-sm font-medium">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedElement>
        
        <AnimatedElement animation="scale" delay={1} duration={0.8}>
          <div className="mb-10">
            <div className="text-center mb-4">
              <motion.div
                className="inline-flex items-center bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-full px-6 py-2 backdrop-blur-md border border-red-500/40"
                animate={{
                  borderColor: ['rgba(239, 68, 68, 0.4)', 'rgba(249, 115, 22, 0.6)', 'rgba(239, 68, 68, 0.4)'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="text-yellow-400 mr-2" size={16} />
                <span className="text-white/90 font-bold">Limited-Time Founder Pricing Ends In:</span>
              </motion.div>
            </div>
            <CountdownTimer
              targetDate={launchDate}
              onComplete={() => console.log('Sale ended!')}
            />
          </div>
        </AnimatedElement>
        
        <AnimatedElement animation="slideUp" delay={1.2} duration={0.8}>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
              <motion.button
                onClick={() => openSignupModal('early-access')}
                className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-2xl overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center text-lg">
                  <Sparkles className="mr-2" size={20} />
                  Start Your Transformation
                  <ArrowRight className="ml-2" size={20} />
                </span>
              </motion.button>

              <motion.button
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold border-2 border-white/30 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  Watch Demo
                  <ExternalLink className="ml-2" size={18} />
                </span>
              </motion.button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <div className="flex items-center text-white/70">
                <CheckCircle className="text-green-400 mr-2" size={16} />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center text-white/70">
                <CheckCircle className="text-green-400 mr-2" size={16} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center text-white/70">
                <CheckCircle className="text-green-400 mr-2" size={16} />
                <span>Free masterclass included</span>
              </div>
            </div>
          </div>
        </AnimatedElement>
        
        
        <motion.button 
          onClick={scrollToContent}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Scroll to content"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ 
            backgroundColor: "rgba(255, 255, 255, 0.2)", 
            y: 0 
          }}
        >
          <ChevronDown className="text-white" size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;