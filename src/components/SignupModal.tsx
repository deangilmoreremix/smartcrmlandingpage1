import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Star, Zap, ArrowRight, User, Mail, Building, Calendar as CalendarIcon, Clock, Video, CheckCircle, Phone, Briefcase, MessageSquare, ChevronDown } from 'lucide-react';
import DynamicSignupForm from './DynamicSignupForm';
import { handleFormSubmission } from '../utils/formHelpers';
import CanvasConfetti from './CanvasConfetti';
import CelebrationBanner from './CelebrationBanner';
import WebinarAgenda from './WebinarAgenda';
import SpeakerProfile from './SpeakerProfile';
import WebinarBenefits from './WebinarBenefits';
import CountdownTimer from './CountdownTimer';
import RegistrationProgress from './RegistrationProgress';
import { WEBINAR_INFO, WEBINAR_SPEAKERS, WEBINAR_TESTIMONIALS, WEBINAR_FAQ } from '../constants/webinarData';
import { WEBINAR_DATE } from '../constants/dates';
import { getSupabaseClient } from '../utils/supabaseClient';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'speakers' | 'benefits'>('overview');
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  const getVariantContent = () => {
    switch(variant) {
      case 'masterclass':
        return {
          title: "Get Smart CRM + Free Masterclass",
          subtitle: "Get Smart CRM during our special 5-day sale (Oct 17-21) and receive free access to our exclusive 3-day training on October 17-19, 2025",
          cta: "Get Smart CRM Now"
        };
      case 'early-access':
        return {
          title: WEBINAR_INFO.title,
          subtitle: `Join us on ${WEBINAR_DATE.FULL} for an exclusive live demonstration of Smart CRM's AI-powered features`,
          cta: "Reserve My Spot - 100% Free"
        };
      default:
        return {
          title,
          subtitle,
          cta
        };
    }
  };

  const content = getVariantContent();
  
  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      const formDataWithMetadata = {
        ...data,
        source: 'Signup Modal',
        variant: variant
      };

      await handleFormSubmission(formDataWithMetadata, async (result) => {
        localStorage.setItem('webinar_registered_email', data.email);

        if (result?.zoom?.join_url) {
          localStorage.setItem('webinar_zoom_join_url', result.zoom.join_url);
        }

        if (result?.registrationId) {
          localStorage.setItem('webinar_registration_id', result.registrationId);
        }

        setShowConfetti(true);

        if (variant === 'early-access') {
          setTimeout(() => {
            onClose();
            window.location.href = '/webinar-confirmation';
          }, 1500);
        } else {
          setTimeout(() => {
            setShowSuccessBanner(true);
            onClose();
          }, 2000);
        }

        if (onSubmit) {
          onSubmit(data);
        }
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      throw error;
    }
  };

  const getSignupFields = () => {
    const baseFields = [
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
      }
    ];

    if (variant === 'early-access') {
      return [
        ...baseFields,
        {
          name: 'phone',
          label: 'Phone (Optional)',
          type: 'tel',
          placeholder: 'For SMS reminders',
          required: false,
          icon: <Phone size={18} />
        },
        {
          name: 'company',
          label: 'Company (Optional)',
          type: 'text',
          placeholder: 'Your company name',
          required: false,
          icon: <Building size={18} />
        },
        {
          name: 'role',
          label: 'Role (Optional)',
          type: 'text',
          placeholder: 'Your job title',
          required: false,
          icon: <Briefcase size={18} />
        }
      ];
    }

    return [
      ...baseFields,
      {
        name: 'company',
        label: 'Company',
        type: 'text',
        placeholder: 'Your company (optional)',
        required: false,
        icon: <Building size={18} />
      }
    ];
  };

  const signupFields = getSignupFields();

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
              className="max-w-4xl w-full bg-gradient-to-br from-gray-900 to-blue-900/80 rounded-xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
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
                {variant === 'early-access' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="text-center lg:text-left">
                        <motion.div
                          className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                        >
                          <Video size={28} className="text-blue-400" />
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
                          className="text-white/70 mb-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {content.subtitle}
                        </motion.p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarIcon size={16} className="text-blue-400" />
                            <span className="text-white/80">{WEBINAR_DATE.SHORT}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock size={16} className="text-blue-400" />
                            <span className="text-white/80">{WEBINAR_DATE.TIME}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Video size={16} className="text-blue-400" />
                            <span className="text-white/80">{WEBINAR_INFO.duration}</span>
                          </div>
                        </div>
                      </div>

                      <CountdownTimer targetDate={new Date('2025-10-16T15:00:00-05:00')} variant="compact" />

                      <RegistrationProgress
                        spotsTotal={WEBINAR_INFO.capacity}
                        spotsRemaining={WEBINAR_INFO.spotsRemaining}
                        variant="full"
                      />

                      <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold text-sm">Quick Preview</h3>
                          <button
                            onClick={() => setActiveTab('agenda')}
                            className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
                          >
                            See Full Agenda →
                          </button>
                        </div>
                        <WebinarAgenda variant="compact" />
                      </div>

                      <div>
                        <h3 className="text-white font-semibold text-sm mb-3">Your Expert Hosts</h3>
                        <div className="space-y-3">
                          {WEBINAR_SPEAKERS.map((speaker, index) => (
                            <SpeakerProfile key={index} speaker={speaker} variant="compact" index={index} />
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setShowFAQ(!showFAQ)}
                        className="w-full text-left px-4 py-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium text-sm">Have Questions?</span>
                          <MessageSquare size={16} className="text-blue-400" />
                        </div>
                      </button>

                      <AnimatePresence>
                        {showFAQ && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                          >
                            {WEBINAR_FAQ.slice(0, 4).map((faq, index) => (
                              <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                                <button
                                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                  className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-white text-sm font-medium">{faq.question}</span>
                                    <motion.div
                                      animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ChevronDown size={16} className="text-white/60" />
                                    </motion.div>
                                  </div>
                                </button>
                                <AnimatePresence>
                                  {expandedFAQ === index && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="px-4 pb-3"
                                    >
                                      <p className="text-white/70 text-xs">{faq.answer}</p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30 p-6 sticky top-0">
                        <div className="mb-6">
                          <h3 className="text-white font-bold text-lg mb-2">Register Now - 100% Free</h3>
                          <p className="text-white/70 text-sm mb-4">
                            Save your spot for this exclusive live webinar. No credit card required.
                          </p>
                        </div>

                        <DynamicSignupForm
                          title=""
                          subtitle=""
                          buttonText={content.cta}
                          onSubmit={handleFormSubmit}
                          variant="compact"
                          fields={signupFields}
                        />

                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold text-sm mb-3">What You'll Get:</h4>
                          <WebinarBenefits variant="list" />
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold text-sm mb-3">What Others Are Saying:</h4>
                          <div className="space-y-3">
                            {WEBINAR_TESTIMONIALS.slice(0, 2).map((testimonial, index) => (
                              <div key={index} className="bg-white/5 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <img
                                    src={testimonial.imageUrl}
                                    alt={testimonial.author}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <div>
                                    <div className="text-white text-xs font-semibold">{testimonial.author}</div>
                                    <div className="text-white/60 text-xs">{testimonial.role}</div>
                                  </div>
                                  <div className="ml-auto flex">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                      <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-white/70 text-xs leading-relaxed">"{testimonial.quote}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto">
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
                      <motion.div
                        className="flex items-center text-white/70 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Star className="text-yellow-400 mr-2" size={16} />
                        <span>Get notified when we launch</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center text-white/70 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Gift className="text-purple-400 mr-2" size={16} />
                        <span>Exclusive early-adopter benefits</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center text-white/70 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Zap className="text-green-400 mr-2" size={16} />
                        <span>Priority access to new features</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center text-white/70 text-sm mt-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Calendar className="text-blue-400" size={16} />
                        <span className="ml-2">Masterclass: October 17-19, 2025 at 3:00 PM EST</span>
                      </motion.div>
                    </div>
                  </div>
                )}
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