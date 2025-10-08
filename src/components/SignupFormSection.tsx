import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Star, Calendar, Check, Gift, ArrowRight, User, Mail, Building, Zap } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import DynamicSignupForm from './DynamicSignupForm';
import { SignupContext } from '../App';
import { handleFormSubmission } from '../utils/formHelpers';
import CanvasConfetti from './CanvasConfetti';
import AnimatedIconsGroup from './AnimatedIconsGroup';

const SuccessMessage: React.FC = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-xl p-8 border border-blue-500/30"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
    >
      <motion.div
        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, 0] }}
        transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
      >
        <Check size={40} className="text-green-400" />
      </motion.div>
      
      <h3 className="text-3xl font-bold text-white mb-4">Thank You for Your Purchase!</h3>
      
      <p className="text-xl text-white/80 mb-6">
        You now have access to Smart CRM and the exclusive masterclass. We'll be in touch soon with your login details.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: <Calendar className="text-blue-400" />,
            title: "Smart CRM Access",
            subtitle: "Coming Soon"
          },
          {
            icon: <Gift className="text-purple-400" />,
            title: "Implementation Guide",
            subtitle: "Sent to Your Email"
          },
          {
            icon: <Star className="text-amber-400" />,
            title: "Masterclass Access",
            subtitle: "Check Your Inbox"
          }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            className="bg-white/10 p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (idx * 0.1) }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2"
              whileHover={{ rotate: 15 }}
            >
              {item.icon}
            </motion.div>
            <h4 className="text-white font-medium">{item.title}</h4>
            <p className="text-white/60 text-sm">{item.subtitle}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mx-auto flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Share with a Colleague</span>
        <ArrowRight className="ml-2" size={18} />
      </motion.button>
    </motion.div>
  );
};

interface SignupFormSectionProps {
  title?: string;
  subtitle?: string;
}

const SignupFormSection: React.FC<SignupFormSectionProps> = ({
  title = "Get Smart CRM - Special 5-Day Sale",
  subtitle = "Transform your business with AI-powered customer relationship management. Special pricing ends October 18, 2025."
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { setHasSignedUp } = useContext(SignupContext);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Make sure form fields include first name, last name, and email
  const signupFields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Your first name',
      required: true,
      icon: <User size={18} />
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Your last name',
      required: true,
      icon: <User size={18} />
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Your email address',
      required: true,
      icon: <Mail size={18} />,
      validation: (value: string) => {
        if (!value.includes('@') || !value.includes('.')) {
          return 'Please enter a valid email address';
        }
        return null;
      }
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'Your company (optional)',
      required: false,
      icon: <Building size={18} />
    }
  ];
  
  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      // Add form source information
      const formDataWithSource = {
        ...data,
        source: 'Signup Form Section'
      };
      
      // Submit to Zapier and handle success
      await handleFormSubmission(formDataWithSource, () => {
        setFormSubmitted(true);
        setHasSignedUp(true);
        localStorage.setItem('smartCRM_signedUp', 'true');
        // Trigger confetti animation on successful form submission
        setShowConfetti(true);
      });
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };
  
  return (
    <section className="py-20 px-4 relative">
      {/* Show confetti animation on successful form submission */}
      {showConfetti && <CanvasConfetti />}
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/20 pointer-events-none" />
      
      {/* Animated floating icons for signup section */}
      <AnimatedIconsGroup 
        section="hero"
        iconCount={20}
        animations={['bounce', 'pulse', 'rotate', 'random']} 
        density="high"
      />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" 
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
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" 
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
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Form */}
          <AnimatedElement animation="slideUp" delay={0.2}>
            <div className={`${formSubmitted ? 'lg:col-span-2 max-w-2xl mx-auto text-center' : ''}`}>
              <div className="text-center lg:text-left mb-8">
                <motion.div
                  className="inline-flex items-center bg-blue-500/20 rounded-full px-4 py-2 mb-4 backdrop-blur-md border border-blue-500/30"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                >
                  <BrainCircuit className="text-blue-400 mr-2" size={18} />
                  <span className="text-white font-medium">Limited Early Access</span>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  {title}
                </h2>
                
                <p className="text-xl text-white/80">
                  <span className="text-blue-400 font-medium">Sale ends soon</span> — Special pricing through August 30th only
                </p>
              </div>
              
              {!formSubmitted ? (
                <DynamicSignupForm 
                  onSubmit={handleFormSubmit} 
                  fields={signupFields}
                />
              ) : (
                <SuccessMessage />
              )}
            </div>
          </AnimatedElement>
          
          {/* Right Column: Benefits */}
          {!formSubmitted && (
            <AnimatedElement animation="slideUp" delay={0.4}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Join Now and Receive:
                </h3>
                
                {[
                  {
                    icon: <Zap size={24} className="text-blue-400" />,
                    title: "AI-Powered Automation",
                    description: "Reduce manual data entry by 70% with advanced AI automation features."
                  },
                  {
                    icon: <Gift size={24} className="text-purple-400" />,
                    title: "Free Masterclass Included",
                    description: "Exclusive 3-day training on October 14-16, 2025 included with your purchase."
                  },
                  {
                    icon: <Star size={24} className="text-amber-400" />,
                    title: "Implementation Support",
                    description: "Dedicated onboarding and success manager to ensure you get maximum value."
                  },
                ].map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                    whileHover={{ 
                      y: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderColor: "rgba(59, 130, 246, 0.3)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.5 }}
                  >
                    <div className="flex">
                      <motion.div
                        className="p-3 rounded-full bg-white/10 mr-4 flex-shrink-0"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        {benefit.icon}
                      </motion.div>
                      
                      <div>
                        <h4 className="text-white font-bold text-lg mb-2">{benefit.title}</h4>
                        <p className="text-white/70">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
                  <div className="flex items-center mb-3">
                    <div className="flex -space-x-2 mr-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm border-2 border-blue-900">
                          {i}
                        </div>
                      ))}
                    </div>
                    <p className="text-white font-medium">
                      87 people signed up in the last 24 hours
                    </p>
                  </div>
                  
                  <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: "76%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                  <p className="text-white/60 text-sm mt-2">
                    127 businesses got Smart CRM in the last 24 hours
                  </p>
                </div>
              </div>
            </AnimatedElement>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignupFormSection;