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
import AiFeaturesCatalog from '../components/AiFeaturesCatalog';
import SignupFormSection from '../components/SignupFormSection';
import UrgencySection from '../components/UrgencySection';
import FinalCta from '../components/FinalCta';
import { LAUNCH_DATE } from '../constants/dates';

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

const AIFeaturesCatalogLandingPage: React.FC = () => {
  // Set launch date to end of 5-day Smart CRM sale - October 18, 2025 at 11:59 PM EST
  const launchDate = LAUNCH_DATE;

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
          {/* AI Features Catalog Section */}
          <AiFeaturesCatalog />

          {/* AI Features Catalog Analysis Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Features Catalog Analysis</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-white/80 mb-6">
                  The AI Features Catalog feature is implemented as a React component (<code>AiFeaturesCatalog.tsx</code>) that displays a comprehensive catalog of AI-powered tools for the SmartCRM system. It is integrated into the main app layout via <code>src/App.tsx</code> and <code>src/components/App.tsx</code>, positioned as a section within the landing page.
                </p>
                <h3 className="text-2xl font-bold mb-4">UI Elements:</h3>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>Header Section</strong>: Title "AI-Powered Features" with a blue accent line and descriptive text about transforming customer relationships.</li>
                  <li><strong>Background</strong>: Gradient from black to blue-950 with animated floating icons (10 icons with high density, using bounce, pulse, rotate, orbit, and random animations) and blurred circular elements for visual depth.</li>
                  <li><strong>Search and Filter Interface</strong>: Semi-transparent backdrop-blur container with a search input field (including clear button), filter dropdown (complexity levels 1-3, popularity ratings 3-5★+, new features only, interactive demos only), category tabs (All Tools, Email Tools, Sales Tools, Meeting Tools, Content Tools, Analysis Tools, Voice & Audio, Vision & Image, Advanced AI, Real-time), and active filter indicators with individual removal buttons.</li>
                  <li><strong>Special Highlight Section</strong>: Conditional display for "Real-time AI Features" with animated zap icon, "NEW" badge, and promotional text about Gemini 2.5 models and interactive demos.</li>
                  <li><strong>Feature Grid</strong>: Responsive grid (1-3 columns based on screen size) of feature cards with hover effects (lift, shadow, border color change).</li>
                  <li><strong>Feature Cards</strong>: Each card includes an icon, title (with optional "New" badge), description, "Feature details" expandable button, and expanded details showing complexity bars, popularity stars, and integration tags.</li>
                  <li><strong>Empty State</strong>: Search icon, "No matching tools found" message, and "Clear All Filters" button when no features match filters.</li>
                  <li><strong>Call-to-Action</strong>: Centered "Explore All Smart CRM Features" button with arrow icon and hover animations.</li>
                </ul>
                <h3 className="text-2xl font-bold mb-4">Data Displayed:</h3>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>Features Array</strong>: 32 predefined AI features, each with title, description, icon (Lucide React icons like Mail, Calendar, Zap), categories, optional flags (isNew, hasDemo), popularity (1-5), complexity level (1-3), and integrations (strings like "Gmail", "Zoom").</li>
                  <li><strong>Categories</strong>: 10 filterable categories including specialized ones like "Real-time" and "Advanced AI".</li>
                  <li><strong>Metadata</strong>: For each feature, complexity visualized as filled bars, popularity as filled stars, integrations as small tags.</li>
                  <li><strong>Counts</strong>: Result count display in active filters section.</li>
                </ul>
                <h3 className="text-2xl font-bold mb-4">Interactions:</h3>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>Search</strong>: Real-time filtering by title or description with case-insensitive matching.</li>
                  <li><strong>Category Filtering</strong>: Click category tabs to filter features.</li>
                  <li><strong>Advanced Filters</strong>: Dropdown with complexity, popularity, new-only, and demo-only checkboxes/buttons.</li>
                  <li><strong>Expansion</strong>: Click "Feature details" to toggle additional metadata display with smooth animations.</li>
                  <li><strong>Clear Filters</strong>: Button to reset all filters, with individual filter removal via X buttons.</li>
                  <li><strong>Hover Effects</strong>: Cards lift and glow on hover, buttons scale, icons animate (especially for new features).</li>
                  <li><strong>Animations</strong>: Framer Motion for fade-ins, scales, rotations, and transitions throughout.</li>
                </ul>
                <h3 className="text-2xl font-bold mb-4">Embedded Content:</h3>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li>No external media embeds (videos, iframes).</li>
                  <li>References to "interactive demos" via floating buttons and text, but no actual embedded demo content within the component.</li>
                  <li>Integration mentions (e.g., "Gmail", "Zoom") as text tags, not functional links or embeds.</li>
                </ul>
                <p className="text-white/80">
                  The component uses React hooks for state management (useState for filters, search, expansion) and useEffect for dynamic filtering. It imports and utilizes custom components like <code>AnimatedElement</code>, <code>InteractiveFloatingButton</code>, and <code>AnimatedIconsGroup</code> for enhanced interactivity and visuals.
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

export default AIFeaturesCatalogLandingPage;