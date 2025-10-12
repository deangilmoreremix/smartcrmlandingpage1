import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import ScrollingBanner from '../components/ScrollingBanner';
import AnimationToggle from '../components/AnimationToggle';
import { FeedbackContainer } from '../components/Feedback';
import PerformanceMonitor from '../components/PerformanceMonitor';
import ExitIntentOffer from '../components/ExitIntentOffer';
import SignupModal from '../components/SignupModal';
import CelebrationBanner from '../components/CelebrationBanner';
import Footer from '../components/Footer';
import FloatingCta from '../components/FloatingCta';
import DashboardEmbedSection from '../components/DashboardEmbedSection';
import SignupFormSection from '../components/SignupFormSection';
import UrgencySection from '../components/UrgencySection';
import FinalCta from '../components/FinalCta';
import ConversionOptimizer from '../components/ConversionOptimizer';

// Create a context to manage signup modal state across components
export const SignupContext = React.createContext<{
  openSignupModal: (variant?: 'standard' | 'masterclass' | 'early-access') => void;
  setHasSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  hasSignedUp: boolean;
}>({
  openSignupModal: () => {},
  setHasSignedUp: () => {},
  hasSignedUp: false
});

const DashboardLandingPage: React.FC = () => {
  // Set launch date to end of 5-day Smart CRM sale - October 18, 2025 at 11:59 PM EST
  const launchDate = new Date('2025-10-18T23:59:59-05:00');

  // Modal state management
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [signupModalVariant, setSignupModalVariant] = useState<'standard' | 'masterclass' | 'early-access'>('standard');
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  // Check if user has previously signed up
  useEffect(() => {
    const signupStatus = localStorage.getItem('smartCRM_signedUp');
    if (signupStatus === 'true') {
      setHasSignedUp(true);
    }

    // Check if in development mode
    setIsDevMode(process.env.NODE_ENV === 'development');
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
      <FeedbackContainer />
      {isDevMode && <PerformanceMonitor />}
      <AnimationToggle />

      <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
        <ScrollProgress />
        <ScrollingBanner />
        <Navbar />

        <main>
          {/* Dashboard Embed Section */}
          <DashboardEmbedSection />

          {/* Conversion Optimizer Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
            <div className="max-w-5xl mx-auto">
              <ConversionOptimizer
                onCtaClick={() => openSignupModal('standard')}
                ctaText="Get Smart CRM Dashboard Now"
                urgencyEnabled={true}
                socialProofEnabled={true}
                guaranteeEnabled={true}
                priceAnchoringEnabled={true}
              />
            </div>
          </section>

          {/* Dashboard Feature Analysis Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Dashboard Feature Analysis</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-white/80 mb-6">
                  The dashboard feature in the SmartCRM landing page app is showcased through the <code>DashboardEmbedSection</code> component, which presents a comprehensive overview of AI-powered dashboard capabilities. Key content includes:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>Header</strong>: "Intelligence at Your Fingertips" with AI-powered insights description and badge.</li>
                  <li><strong>Interactive Goals</strong>: Four CRM goals (reduce manual entry, improve forecasting, enhance insights, boost adoption) with expandable details.</li>
                  <li><strong>Features Grid</strong>: Four cards covering real-time analytics, advanced visualizations, performance monitoring, and business intelligence.</li>
                  <li><strong>Statistics</strong>: 99.9% uptime, less than 1s updates, 50+ visualizations, 95% adoption rate.</li>
                  <li><strong>Challenges & Reality</strong>: Problems with traditional dashboards and industry stats (67% failure rate, 30% adoption, 23% selling time).</li>
                  <li><strong>Comparison Table</strong>: Traditional vs. Smart CRM dashboards.</li>
                  <li><strong>ROI Metrics</strong>: +85% faster decisions, -60% time to insights, +120% data utilization, 3.5x predictive accuracy.</li>
                  <li><strong>Demo Interface</strong>: Mock dashboard with 6 KPI widgets (revenue, users, conversion, deal size, pipeline, forecast) and overlay CTA.</li>
                  <li><strong>Embedded Demo</strong>: Iframe loading live demo from external URL.</li>
                  <li><strong>Documentation</strong>: Collapsible sections on features, usage, interactions, customization, and tips.</li>
                  <li><strong>CTAs</strong>: Multiple buttons for getting SmartCRM or viewing demo.</li>
                </ul>
                <p className="text-white/80">
                  The section uses dark themes, animations, responsive layouts, and interactive elements to demonstrate dashboard functionality.
                </p>
              </div>
            </div>
          </section>

          {/* Sign Up Form Section */}
          <SignupFormSection />

          {/* Urgency Section */}
          <UrgencySection launchDate={launchDate} />

          {/* Final CTA */}
          <FinalCta />
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

        {/* Post-signup Celebration Banner */}
        {showCelebration && (
          <CelebrationBanner
            onClose={() => setShowCelebration(false)}
            showConfetti={true}
          />
        )}

        {/* Exit Intent Offer - only show if user hasn't signed up */}
        {!hasSignedUp && (
          <ExitIntentOffer
            couponCode="SMARTCRM VIP"
            oncePerHours={24}
            showOnMobile={true}
            onAccept={() => {
              window.open('/checkout?coupon=SMARTCRM%20VIP', '_blank');
            }}
          />
        )}
      </div>
    </SignupContext.Provider>
  );
};

export default DashboardLandingPage;