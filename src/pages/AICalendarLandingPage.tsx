import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AICalendarSection from '../components/AICalendarSection';
import Footer from '../components/Footer';
import FloatingCta from '../components/FloatingCta';
import SignupModal from '../components/SignupModal';
import ExitIntentModal from '../components/ExitIntentModal';
import CelebrationBanner from '../components/CelebrationBanner';
import ExitIntentOffer from '../components/ExitIntentOffer';
import { SignupContext } from '../App';

const AICalendarLandingPage: React.FC = () => {
  // Set launch date to end of 5-day Smart CRM sale - October 18, 2025 at 11:59 PM EST
  const launchDate = new Date('2025-10-18T23:59:59-05:00');

  // Modal state management
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [signupModalVariant, setSignupModalVariant] = useState<'standard' | 'masterclass' | 'early-access'>('standard');
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Check if user has previously signed up
  useEffect(() => {
    const signupStatus = localStorage.getItem('smartCRM_signedUp');
    if (signupStatus === 'true') {
      setHasSignedUp(true);
    }
  }, []);

  // Handle form submissions
  const handleSignup = (data: Record<string, string>) => {
    console.log('Signup data:', data);
    setHasSignedUp(true);
    localStorage.setItem('smartCRM_signedUp', 'true');

    // Close modal after successful submission
    setTimeout(() => {
      setSignupModalOpen(false);
      // Show celebration banner after modal closes
      setShowCelebration(true);
    }, 2000);
  };

  // Function to open signup modal with specific variant
  const openSignupModal = (variant: 'standard' | 'masterclass' | 'early-access' = 'standard') => {
    setSignupModalVariant(variant);
    setSignupModalOpen(true);
  };

  return (
    <SignupContext.Provider value={{ openSignupModal, setHasSignedUp, hasSignedUp }}>
      <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
        <Navbar />

        <main>
          <AICalendarSection />

          {/* Analysis Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">AI Calendar Feature Analysis</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                The AI calendar feature in the SmartCRM landing page app is presented through the `AICalendarSection` component, showcasing AI-powered time management. Key content includes:

                - **Header**: "Intelligent Time Management" with AI-powered calendar badge and description.

                - **Feature Grid**: Four cards covering AI Meeting Intelligence, Time Optimization, Team Coordination, and Smart Automation, each with 4 benefit bullets.

                - **Statistics**: 65% time saved on scheduling, 40% fewer conflicts, 3x faster setup, 92% attendance rate.

                - **Demo Section**: Expandable area with embedded iframe loading live demo from "https://ai-calendar-demo.netlify.app", including toggle button, loading indicator, and close functionality.

                - **Instructions Panel**: Five collapsible sections detailing AI Calendar Features & Functions (10 items), Quick Scheduling (5 items), Team Collaboration Tools (5 items), Advanced Settings (5 items), and Pro Tips (5 items).

                - **Getting Started Guide**: Step-by-step setup instructions.

                - **CTA**: Button to "Get Smart CRM Calendar".

                The section features hover effects on cards, smooth animations, responsive design, and a dark theme with gradients and floating icons.
              </p>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingCta />

        {/* Signup Modal */}
        <SignupModal
          isOpen={signupModalOpen}
          onClose={() => setSignupModalOpen(false)}
          onSubmit={handleSignup}
          variant={signupModalVariant}
        />

        {/* Exit Intent Modal - only show if user hasn't signed up */}
        {!hasSignedUp && <ExitIntentModal onClose={() => console.log('Exit intent modal closed')} />}

        {/* Post-signup Celebration Banner */}
        {showCelebration && (
          <CelebrationBanner
            onClose={() => setShowCelebration(false)}
            showConfetti={true}
          />
        )}

        {/* Exit Intent Offer */}
        <ExitIntentOffer
          couponCode="SMARTCRM VIP"
          oncePerHours={24}
          idleMs={90000}
          showOnMobile={true}
          onAccept={() => {
            window.open('/checkout?coupon=SMARTCRM%20VIP', '_blank');
          }}
        />
      </div>
    </SignupContext.Provider>
  );
};

export default AICalendarLandingPage;