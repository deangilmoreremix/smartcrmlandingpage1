import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import ScrollingBanner from '../components/ScrollingBanner';
import AnimationToggle from '../components/AnimationToggle';
import { FeedbackContainer } from '../components/Feedback';
import PerformanceMonitor from '../components/PerformanceMonitor';
import ExitIntentModal from '../components/ExitIntentModal';
import ExitIntentOffer from '../components/ExitIntentOffer';
import SignupModal from '../components/SignupModal';
import CelebrationBanner from '../components/CelebrationBanner';
import Footer from '../components/Footer';
import FloatingCta from '../components/FloatingCta';
import ContactsEmbedSection from '../components/ContactsEmbedSection';
import SignupFormSection from '../components/SignupFormSection';
import UrgencySection from '../components/UrgencySection';
import FinalCta from '../components/FinalCta';

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

const ContactsLandingPage: React.FC = () => {
  // Set launch date to end of 7-day Smart CRM sale - September 27, 2025 at 11:59 PM EST
  const launchDate = new Date('2025-09-27T23:59:59-05:00');

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
          {/* Contacts Embed Section */}
          <ContactsEmbedSection />

          {/* Contacts Feature Analysis Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacts Feature Analysis</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-white/80 mb-6">
                  The Contacts feature in the SmartCRM landing page app is implemented through the <code>ContactsEmbedSection</code> component, which serves as a comprehensive showcase of AI-powered contact management capabilities. Here's a detailed description of its content:
                </p>

                <h3 className="text-2xl font-bold mb-4">UI Elements and Layout</h3>
                <p className="text-white/80 mb-6">
                  The section features a full-width section with ID "contacts" containing:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li>A dark gradient background (black to blue-950) with animated floating icons (10 icons with bounce, pulse, rotate, and orbit animations)</li>
                  <li>Animated background glow effects using motion.div elements with scaling and opacity animations</li>
                  <li>A centered header with a badge labeled "AI-Driven Contact Management" and the main title "Turn Static Lists into Living Intelligence"</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4">Core Content Areas</h3>

                <h4 className="text-xl font-semibold mb-3">1. CRM Goals Animation Component</h4>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li>Interactive goal selection interface allowing users to choose their primary contact management goal</li>
                  <li>Four goal options:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>"Reduce Manual Data Entry" - AI automation eliminating 70% of manual work</li>
                      <li>"Enhance Customer Insights" - 360° intelligence with AI relationship mapping</li>
                      <li>"Boost Team Adoption" - 94% adoption rate with intuitive design</li>
                      <li>"Improve Contact Organization" - Advanced search and filtering capabilities</li>
                    </ul>
                  </li>
                  <li>Each goal includes features, benefits, and primary color theming</li>
                </ul>

                <h4 className="text-xl font-semibold mb-3">2. Features Grid</h4>
                <p className="text-white/80 mb-3">Four main feature cards displayed in a 2x2 grid:</p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>AI Contact Scoring</strong>: Multi-model scoring (GPT-5 + Gemini) on 0-100 scale with behavioral insights, psychological profiles, and relationship mapping</li>
                  <li><strong>Smart Enrichment</strong>: Automatic data gap filling using web research, LinkedIn discovery, and market intelligence</li>
                  <li><strong>Communication Tools</strong>: AI-powered email composers, social messaging generators, objection handlers, and subject line optimizers</li>
                  <li><strong>Bulk Processing</strong>: CSV/JSON import with validation, bulk scoring/enrichment, and automated tagging</li>
                </ul>

                <h4 className="text-xl font-semibold mb-3">3. Contact Intelligence Statistics</h4>
                <p className="text-white/80 mb-3">A stats section showing:</p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li>10,000+ contacts analyzed daily</li>
                  <li>95% data accuracy rate</li>
                  <li>3.5x faster lead qualification</li>
                  <li>89% user satisfaction</li>
                </ul>
                <p className="text-white/80 mb-6">Each stat includes animated icons and scaling animations</p>

                <h4 className="text-xl font-semibold mb-3">4. CRM Reality Statistics</h4>
                <p className="text-white/80 mb-3">Three clickable stat cards revealing industry problems:</p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li>67% of CRM implementations fail (with expandable details on reasons)</li>
                  <li>30% average CRM adoption rate (with details on barriers)</li>
                  <li>23% of sales reps' time spent on actual selling (with time breakdown)</li>
                </ul>

                <h4 className="text-xl font-semibold mb-3">5. Embedded Application Demo</h4>
                <p className="text-white/80 mb-3">A prominent demo section with:</p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li>Toggle button to show/hide the embedded iframe</li>
                  <li>Loading indicator while iframe loads</li>
                  <li>Embedded iframe pointing to "https://taupe-sprinkles-83c9ee.netlify.app" (800px height)</li>
                  <li>Comprehensive collapsible feature guide with sections for:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>AI Contact Features & Functions (14 detailed features)</li>
                      <li>Contact Card Tools Guide (AI score badges, quick actions, AI toolbar)</li>
                      <li>Detailed View Features (8 specialized tabs: Overview, Journey, Analytics, etc.)</li>
                      <li>Advanced Contact Management (click-to-open detailed views)</li>
                      <li>Contact Management Pro Tips (filtering, automation, insights review)</li>
                    </ul>
                  </li>
                </ul>

                <h4 className="text-xl font-semibold mb-3">6. Call-to-Action Section</h4>
                <p className="text-white/80 mb-6">Final CTA with gradient background encouraging users to "Transform Your Contact Management" with a button to get SmartCRM Contacts</p>

                <h3 className="text-2xl font-bold mb-4">Interactive Elements and Animations</h3>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li>Hover effects on cards with y-axis movement and background color changes</li>
                  <li>Animated icons with rotation and scaling effects</li>
                  <li>Framer Motion animations for entrance effects (fadeIn, slideUp)</li>
                  <li>Interactive floating buttons with tooltips</li>
                  <li>Expandable stat cards with smooth transitions</li>
                  <li>Collapsible sections for detailed feature information</li>
                  <li>Button hover states with scale and shadow effects</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4">Data and Content Structure</h3>
                <p className="text-white/80 mb-6">
                  The component uses hardcoded data arrays for:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><code>contactsFeatures</code>: Array of 4 feature objects with titles, descriptions, icons, and benefit lists</li>
                  <li><code>contactStats</code>: Array of 4 statistics with values, labels, and icons</li>
                  <li><code>contactsGoals</code>: Array of 4 goal objects with detailed features and benefits</li>
                  <li>Industry statistics with expandable details</li>
                </ul>
                <p className="text-white/80">
                  The feature emphasizes AI-driven contact intelligence, automation, and transformation from static contact lists to dynamic relationship management tools.
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
          idleMs={90000} // 90 seconds
          showOnMobile={true}
          onAccept={() => {
            // Route to checkout and apply coupon
            window.open('/checkout?coupon=SMARTCRM%20VIP', '_blank');
          }}
        />
      </div>
    </SignupContext.Provider>
  );
};

export default ContactsLandingPage;