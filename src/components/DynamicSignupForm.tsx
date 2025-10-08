import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CircleAlert as AlertCircle, Mail, User, Building, ArrowRight } from 'lucide-react';
import { handleFormSubmission } from '../utils/formHelpers';
import CanvasConfetti from './CanvasConfetti';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  icon: React.ReactNode;
  validation?: (value: string) => string | null;
}

interface DynamicSignupFormProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  successMessage?: string;
  fields?: FormField[];
  onSubmit?: (formData: Record<string, string>) => void;
  variant?: 'default' | 'modal' | 'compact';
}

const DynamicSignupForm: React.FC<DynamicSignupFormProps> = ({
  title = "Register for Early Access",
  subtitle = "Join our waitlist to be among the first to experience Smart CRM.",
  buttonText = "Secure Your Spot",
  successMessage = "You're in! Thanks for registering.",
  fields = defaultFields,
  onSubmit,
  variant = 'default'
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    fields.forEach(field => {
      // Check required fields
      if (field.required && !formData[field.name]?.trim()) {
        errors[field.name] = `${field.label} is required`;
      }
      
      // Run custom validation if provided
      if (field.validation && formData[field.name]) {
        const validationError = field.validation(formData[field.name]);
        if (validationError) {
          errors[field.name] = validationError;
        }
      }
    });
    
    return errors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit form data to Zapier and handle the response
      await handleFormSubmission(formData, (data) => {
        if (onSubmit) {
          onSubmit(data);
        }
        setIsSubmitted(true);
        // Trigger confetti animation on successful submission
        setShowConfetti(true);
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      setFormErrors({ 
        form: 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Apply different styling based on variant
  const wrapperStyles = {
    default: 'p-6 md:p-8 rounded-xl border border-white/10',
    modal: 'p-6 md:p-8 rounded-xl border border-white/10',
    compact: 'p-4 rounded-lg border border-white/10'
  };
  
  const titleStyles = {
    default: 'text-2xl font-bold',
    modal: 'text-2xl font-bold',
    compact: 'text-xl font-bold'
  };
  
  const subtitleStyles = {
    default: 'mb-6',
    modal: 'mb-6',
    compact: 'mb-4 text-sm'
  };
  
  return (
    <div className={`bg-white/5 backdrop-blur-md ${wrapperStyles[variant]}`}>
      {/* Confetti animation when form is submitted successfully */}
      {showConfetti && <CanvasConfetti />}
      
      {!isSubmitted ? (
        <>
          {(title || subtitle) && (
            <div className="text-center mb-6">
              {title && <h3 className={`${titleStyles[variant]} text-white mb-2`}>{title}</h3>}
              {subtitle && <p className={`text-white/70 ${subtitleStyles[variant]}`}>{subtitle}</p>}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  onFocus={() => setActiveField(field.name)}
                  onBlur={() => setActiveField(null)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    formErrors[field.name] 
                      ? 'border-red-500/50' 
                      : activeField === field.name 
                        ? 'border-blue-500/50 ring-2 ring-blue-500/20' 
                        : 'border-white/20'
                  } rounded-lg text-white placeholder-white/50 focus:outline-none transition-all`}
                />
                
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <div className={`${
                    activeField === field.name ? 'text-blue-400' : 'text-white/50'
                  } transition-colors`}>
                    {field.icon}
                  </div>
                </div>
                
                <AnimatePresence>
                  {formErrors[field.name] && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 text-red-400 text-xs flex items-center"
                    >
                      <AlertCircle size={12} className="mr-1" />
                      {formErrors[field.name]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
            {formErrors.form && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs flex items-center bg-red-500/10 p-2 rounded"
              >
                <AlertCircle size={12} className="mr-1" />
                {formErrors.form}
              </motion.div>
            )}
            
            <motion.button
              type="submit"
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center ${
                variant === 'compact' ? 'text-sm' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <span>{buttonText}</span>
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </motion.button>
            
            <p className="text-white/50 text-xs text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
            
            <p className="text-white/80 text-xs text-center">
              Join our 3-day training on October 14-16, 2025 at 3:00 PM EST
            </p>
          </form>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
          >
            <Check size={32} className="text-green-400" />
          </motion.div>
          
          <h3 className={`${titleStyles[variant]} text-white mb-2`}>
            {successMessage}
          </h3>
          
          <p className="text-white/70">
            We'll keep you updated on our masterclass starting October 14, 2025 at 3:00 PM EST.
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Default form fields - updated with first name and last name fields
const defaultFields: FormField[] = [
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
    validation: (value) => {
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

export default DynamicSignupForm;