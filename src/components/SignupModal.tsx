import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Star, Zap, ArrowRight, User, Mail, Building } from 'lucide-react';
import DynamicSignupForm from './DynamicSignupForm';
import { handleFormSubmission } from '../utils/formHelpers';
import CanvasConfetti from './CanvasConfetti';
import CelebrationBanner from './CelebrationBanner';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  cta?: string;
  onSubmit?: (data: Record<string, string>) => void;
  variant?: 'standard' | 'masterclass' | 'early-access';
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  title = "Join Smart CRM Waitlist",
  subtitle = "Be among the first to experience the most intelligent CRM platform.",
  cta = "Secure Your Spot",
  onSubmit,
  variant = 'standard'
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  
  // Dynamically set content based on variant
  const getVariantContent = () => {
    switch(variant) {
      case 'masterclass':
        return {
          title: "Get Smart CRM + Free Masterclass", 
          subtitle: "Get Smart CRM during our special 5-day sale and receive free access to our exclusive 3-day training on October 14-16, 2025",
          cta: "Get Smart CRM Now",
          benefits: [
            {
              icon: <Zap className="text-blue-400" />,
              text: "AI-powered automation features included"
            },
            {
              icon: <Gift className="text-purple-400" />,
              text: "Free 3-day masterclass (Oct 14-16, 2025)"
            },
            {
              icon: <Calendar className="text-green-400" />,
              text: "Implementation support & training"
            }
          ]
        };
      case 'early-access':
        return {
          title: "Get Smart CRM - Special Sale",
          subtitle: "Transform your business with AI-powered CRM during our limited 5-day sale (October 13-18, 2025)",
          cta: "Get Smart CRM Now",
          benefits: [
            {
              icon: <Zap className="text-blue-400" />,
              text: "70% less manual data entry with AI"
            },
            {
              icon: <Star className="text-purple-400" />,
              text: "95% accurate sales forecasting"
            },
            {
              icon: <Gift className="text-green-400" />,
              text: "Free masterclass on Oct 14-16, 2025"
            }
          ]
        };
      default:
        return {
          title,
          subtitle,
          cta,
          benefits: [
            {
              icon: <Star className="text-blue-400" />,
              text: "Get notified when we launch"
            },
            {
              icon: <Gift className="text-purple-400" />,
              text: "Exclusive early-adopter benefits"
            },
            {
              icon: <Zap className="text-green-400" />,
              text: "Priority access to new features"
            }
          ]
        };
    }
  };
  
  const content = getVariantContent();
  
  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      // Add form source and variant information
      const formDataWithMetadata = {
        ...data,
        source: 'Signup Modal',
        variant: variant
      };
      
      // Submit to Zapier and handle success
      await handleFormSubmission(formDataWithMetadata, () => {
        // Trigger confetti animation
        setShowConfetti(true);
        
        // Close the modal after a short delay
        setTimeout(() => {
          // Show success banner after modal closes
          setShowSuccessBanner(true);
          onClose();
        }, 2000);
        
        if (onSubmit) {
          onSubmit(data);
        }
      });
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  // Define the fields with required first name, last name, and email
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

  return (
    <>
      {/* Show celebration banner after successful signup */}
      {showSuccessBanner && (
        <CelebrationBanner 
          onClose={() => setShowSuccessBanner(false)}
        />
      )}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Show confetti effect when form is submitted successfully */}
            {showConfetti && <CanvasConfetti />}
            
            <motion.div
              className="max-w-md w-full bg-gradient-to-br from-gray-900 to-blue-900/80 rounded-xl overflow-hidden shadow-2xl relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <motion.div 
                className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <div className="p-6 md:p-8 relative z-[1]">
                <div className="mb-6 text-center">
                  <motion.div
                    className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
                    >
                      {variant === 'masterclass' ? 
                        <BookOpen size={28} className="text-blue-400" /> : 
                        <BrainCircuit size={28} className="text-blue-400" />
                      }
                    </motion.div>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {content.title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-white/70 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {content.subtitle}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <DynamicSignupForm 
                    title=""
                    subtitle=""
                    buttonText={content.cta}
                    onSubmit={handleFormSubmit}
                    variant="compact"
                    fields={signupFields}
                  />
                </motion.div>
                
                <div className="mt-6 space-y-3">
                  {content.benefits.map((benefit, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center text-white/70 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                    >
                      {benefit.icon}
                      <span className="ml-2">{benefit.text}</span>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    className="flex items-center text-white/70 text-sm mt-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Calendar className="text-blue-400" size={16} />
                    <span className="ml-2">Masterclass: October 14-16, 2025 at 3:00 PM EST</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Icon components to avoid issues
const Calendar = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const BrainCircuit = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 16} height={size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" />
    <path d="m15.7 10.4-.9.4" />
    <path d="m9.2 13.2.9.4" />
    <path d="m12.8 7.7-.4.9" />
    <path d="m11.6 15.4.4.9" />
    <path d="m10.5 10.4-2.7-1.2" />
    <path d="m16.2 14.8-2.7-1.2" />
    <path d="m10.7 8.7-1.3-2.6" />
    <path d="m14.6 17.9-1.4-2.6" />
  </svg>
);

const BookOpen = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 16} height={size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export default SignupModal;