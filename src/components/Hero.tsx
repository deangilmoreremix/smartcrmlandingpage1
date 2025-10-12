import React, { useState, useContext } from 'react';
import CountdownTimer from './CountdownTimer';
import { ChevronDown, CircleCheck as CheckCircle, ArrowRight, Calendar, Users, Tag, Gift, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import { SignupContext } from '../App';
import { handleFormSubmission } from '../utils/formHelpers';
import CanvasConfetti from './CanvasConfetti';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import { WEBINAR_DATE, EVENT_DESCRIPTIONS } from '../constants/dates';

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

  const webinarBenefits = [
    { text: "See Smart CRM in Action" },
    { text: "Learn AI-Powered Automation" },
    { text: "Get Your Questions Answered Live" }
  ];

  const webinarTopics = [
    { text: "Live Demo: AI-Powered Lead Management", delay: 0 },
    { text: "See Real-Time Sales Automation", delay: 0.1 },
    { text: "Q&A with Smart CRM Experts", delay: 0.2 },
  ];

  const scrollToContent = () => {
    if (typeof document !== 'undefined') {
      const featuresSection = document.getElementById('problem');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
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
      const formData = {
        firstName,
        lastName,
        email,
        source: 'Hero Form'
      };

      await handleFormSubmission(formData, () => {
        setIsSubmitted(true);
        setHasSignedUp(true);
        localStorage.setItem('smartCRM_signedUp', 'true');
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
      {showConfetti && <CanvasConfetti />}

      <AnimatedIconsGroup
        section="hero"
        iconCount={8}
        animations={['bounce', 'pulse', 'orbit']}
      />

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
          className="absolute top-1/3 -right-20 w-60 h-60 bg-cyan-600/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 left-1/3 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"
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

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <AnimatedElement animation="fadeIn" duration={0.8}>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <motion.div
              className="inline-flex items-center bg-blue-600/20 rounded-full px-4 py-2 backdrop-blur-md border border-blue-500/30"
              whileHover={{
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                borderColor: "rgba(59, 130, 246, 0.4)",
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="text-blue-400 mr-2" size={16} />
              <span className="text-blue-400 font-medium text-sm">Live Webinar Event</span>
            </motion.div>
            <motion.div
              className="inline-flex items-center bg-green-600/20 rounded-full px-4 py-2 backdrop-blur-md border border-green-500/30"
              whileHover={{
                backgroundColor: "rgba(34, 197, 94, 0.3)",
                borderColor: "rgba(34, 197, 94, 0.4)",
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              <Gift className="text-green-400 mr-2" size={16} />
              <span className="text-green-400 font-medium text-sm">100% Free Registration</span>
            </motion.div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="slideUp" delay={0.2} duration={0.8}>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4 leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Free Live Webinar:<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Smart CRM Revolution</span>
          </motion.h1>
        </AnimatedElement>

        <AnimatedElement animation="slideUp" delay={0.4} duration={0.8}>
          <p className="text-xl md:text-2xl text-white/80 mb-6 max-w-2xl mx-auto">
            {EVENT_DESCRIPTIONS.WEBINAR_DESCRIPTION} Reserve your spot for {WEBINAR_DATE.FULL} and discover how to transform your business.
          </p>
        </AnimatedElement>

        <AnimatedElement animation="fadeIn" delay={0.5} duration={0.8}>
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
              <Calendar className="text-blue-400 mr-2" size={18} />
              <span className="text-white/90">{WEBINAR_DATE.DAY_OF_WEEK}, {WEBINAR_DATE.SHORT}</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
              <Users className="text-green-400 mr-2" size={18} />
              <span className="text-white/90">{WEBINAR_DATE.TIME}</span>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fadeIn" delay={0.6} duration={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-xl mx-auto">
            {webinarBenefits.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center md:justify-start text-white/80"
                onHoverStart={() => setHighlightedFeature(index)}
                onHoverEnd={() => setHighlightedFeature(null)}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "0.5rem",
                  padding: "0.5rem"
                }}
              >
                <motion.div
                  animate={highlightedFeature === index ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                    color: "#3b82f6"
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="mr-2 text-blue-400" size={18} />
                </motion.div>
                <span className="text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scale" delay={0.8} duration={0.8}>
          <div className="mb-8">
            <div className="text-center mb-3">
              <div className="inline-flex items-center bg-blue-600/30 rounded-full px-4 py-1 backdrop-blur-md border border-blue-500/30">
                <Calendar className="text-blue-400 mr-2" size={14} />
                <span className="text-white/90 text-sm">Webinar starts in:</span>
              </div>
            </div>
            <CountdownTimer
              targetDate={launchDate}
              onComplete={() => console.log('Webinar started!')}
            />
          </div>
        </AnimatedElement>

        <AnimatedElement animation="slideUp" delay={1} duration={0.8}>
          <div className="max-w-md mx-auto mb-12">
            <button
              onClick={() => openSignupModal('early-access')}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold shadow-lg flex items-center justify-center"
            >
              <span className="flex items-center">
                Register for Free Webinar <ArrowRight className="ml-1" size={16} />
              </span>
            </button>
            <p className="text-white/60 text-sm mt-3">
              {WEBINAR_DATE.FULL} - Limited seats available
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fadeIn" delay={1.2} duration={0.8}>
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md rounded-lg p-6 max-w-2xl mx-auto border border-blue-500/30 mb-8">
            <h3 className="text-white font-medium mb-4 flex items-center justify-center">
              <Zap className="text-blue-400 mr-2" size={18} />
              What You'll Learn in This Webinar:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Live demonstration of AI-powered automation",
                "See real-time lead scoring in action",
                "Learn predictive sales forecasting techniques",
                "Discover multi-model AI capabilities",
                "Get personalized CRM implementation advice",
                "Interactive Q&A with Smart CRM experts"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <CheckCircle className="text-green-400 mr-2 flex-shrink-0 mt-1" size={14} />
                  <span className="text-white/80 text-sm">{item}</span>
                </motion.div>
              ))}
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
