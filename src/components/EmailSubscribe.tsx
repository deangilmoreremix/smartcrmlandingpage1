import React, { useState } from 'react';
import { Send, User, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { handleFormSubmission } from '../utils/formHelpers';
import CanvasConfetti from './CanvasConfetti';

const EmailSubscribe: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim()) {
      setError('Please enter your first name');
      return;
    }
    
    if (!lastName.trim()) {
      setError('Please enter your last name');
      return;
    }
    
    // Simple email validation
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit form data to Zapier
      const formData = { firstName, lastName, email, source: 'EmailSubscribe' };
      
      await handleFormSubmission(formData, () => {
        setIsSubmitted(true);
        setError('');
        // Trigger confetti on successful submission
        setShowConfetti(true);
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Show confetti effect on successful submission */}
      {showConfetti && <CanvasConfetti />}
      
      {!isSubmitted ? (
        <>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className={`w-full px-4 py-3 pl-10 pr-4 bg-white/10 backdrop-blur-lg rounded-lg border ${activeField === 'firstName' ? 'border-blue-500/50 ring-2 ring-blue-500/20' : 'border-white/20'} focus:outline-none text-white placeholder-white/50 transition-all`}
                required
                onFocus={() => setActiveField('firstName')}
                onBlur={() => setActiveField(null)}
              />
              <User size={18} className={`absolute left-3 top-3.5 ${activeField === 'firstName' ? 'text-blue-400' : 'text-white/50'} transition-colors`} />
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className={`w-full px-4 py-3 pl-10 pr-4 bg-white/10 backdrop-blur-lg rounded-lg border ${activeField === 'lastName' ? 'border-blue-500/50 ring-2 ring-blue-500/20' : 'border-white/20'} focus:outline-none text-white placeholder-white/50 transition-all`}
                required
                onFocus={() => setActiveField('lastName')}
                onBlur={() => setActiveField(null)}
              />
              <User size={18} className={`absolute left-3 top-3.5 ${activeField === 'lastName' ? 'text-blue-400' : 'text-white/50'} transition-colors`} />
            </div>
            
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className={`w-full px-4 py-3 pl-10 pr-12 bg-white/10 backdrop-blur-lg rounded-lg border ${activeField === 'email' ? 'border-blue-500/50 ring-2 ring-blue-500/20' : 'border-white/20'} focus:outline-none text-white placeholder-white/50 transition-all`}
                required
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
              />
              <Mail size={18} className={`absolute left-3 top-3.5 ${activeField === 'email' ? 'text-blue-400' : 'text-white/50'} transition-colors`} />
              <button
                type="submit"
                className="absolute right-1 top-1 rounded-full p-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                )}
                <span className="sr-only">Register for Masterclass</span>
              </button>
            </div>
            
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </form>
        </>
      ) : (
        <div className="text-center p-4 bg-green-500/20 backdrop-blur-lg rounded-lg border border-green-500/30 text-white animate-fadeIn">
          <p>Thank you! You're registered for the masterclass.</p>
        </div>
      )}
      <p className="text-xs text-white/60 mt-3 text-center">
        We'll send you the masterclass details for tomorrow at 3:00 PM EDT soon. No spam, ever.
      </p>
    </div>
  );
};

export default EmailSubscribe;