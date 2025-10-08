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
import PipelineEmbedSection from '../components/PipelineEmbedSection';
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

const PipelineLandingPage: React.FC = () => {
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
          {/* Pipeline Embed Section */}
          <PipelineEmbedSection />

          {/* Pipeline Feature Analysis Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Pipeline Feature Analysis</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-white/80 mb-6">
                  The Pipeline feature in the SmartCRM landing page app is primarily implemented through the <code>PipelineEmbedSection</code> component, which serves as a comprehensive showcase for the pipeline management capabilities. Below is a detailed description of the content and implementation based on the existing code:
                </p>

                <h3 className="text-2xl font-bold text-white mb-4">Component Structure and Layout</h3>
                <p className="text-white/80 mb-6">
                  The <code>PipelineEmbedSection</code> is a React functional component that renders a full-section landing page element with the ID "pipeline". It uses Framer Motion for animations and includes state management for iframe loading and embed visibility.
                </p>

                <h3 className="text-2xl font-bold text-white mb-4">Header Section</h3>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>Badge</strong>: Displays "Enhanced Pipeline Deals" with a GitBranch icon in green styling</li>
                  <li><strong>Main Title</strong>: "Where Every Opportunity Gets Optimized"</li>
                  <li><strong>Subtitle</strong>: Describes Smart CRM's enhanced pipeline as transforming deal tracking, scoring, and closing with AI-powered insights and gamified performance</li>
                </ul>

                <h3 className="text-2xl font-bold text-white mb-4">Interactive Goal Selection</h3>
                <p className="text-white/80 mb-4">
                  Integrates a <code>CRMGoalsAnimation</code> component that presents four primary pipeline management goals:
                </p>
                <ol className="list-decimal list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>Improve Sales Forecasting</strong>: AI-powered predictions with 85%+ accuracy, featuring predictive analytics, win/loss scoring, real-time updates, and scenario planning</li>
                  <li><strong>Enhance Customer Insights</strong>: 360° customer intelligence with AI relationship mapping, including relationship scoring, behavioral analysis, communication insights, and automated profiling</li>
                  <li><strong>Boost Team Adoption</strong>: 94% adoption rate with intuitive design and gamification, featuring drag-and-drop interface, gamification elements, mobile optimization, and smart onboarding</li>
                  <li><strong>Streamline Deal Management</strong>: Advanced deal tracking for faster closes, including Kanban visualization, automated progression, risk monitoring, and custom workflows</li>
                </ol>

                <h3 className="text-2xl font-bold text-white mb-4">Pipeline Features Grid</h3>
                <p className="text-white/80 mb-4">
                  Displays four key features in a responsive grid (1 column on mobile, 2 on desktop):
                </p>
                <ol className="list-decimal list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>AI Deal Intelligence</strong> (Target icon, blue theme): Real-time win probability scoring, risk alerts and bottleneck identification, timeline predictions and optimal next steps, competitive intelligence and market insights</li>
                  <li><strong>Kanban Board</strong> (GitBranch icon, purple theme): Intuitive drag-and-drop interface, stage-based workflow visualization, custom pipeline configurations, real-time collaboration features</li>
                  <li><strong>Gamification</strong> (Award icon, green theme): Team leaderboards and performance tracking, achievement badges and milestones, streak tracking and motivation tools, points system with leveling mechanics</li>
                  <li><strong>Advanced Analytics</strong> (BarChart3 icon, amber theme): Conversion rate analysis by stage, sales velocity and time-to-close metrics, forecast accuracy and pipeline health, custom reporting and dashboard creation</li>
                </ol>

                <h3 className="text-2xl font-bold text-white mb-4">Performance Statistics</h3>
                <p className="text-white/80 mb-4">
                  Shows four key metrics in a grid:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li>41% higher win rates (TrendingUp icon, green)</li>
                  <li>3.2x faster sales cycles (Zap icon, blue)</li>
                  <li>$2.1M average deal size increase (BarChart3 icon, purple)</li>
                  <li>94% team engagement (Users icon, amber)</li>
                </ul>
                <p className="text-white/80 mb-6">
                  Each stat includes animated scaling effects and hover interactions.
                </p>

                <h3 className="text-2xl font-bold text-white mb-4">Embedded Demo Section</h3>
                <p className="text-white/80 mb-4">
                  Contains an interactive iframe embed:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>Source</strong>: https://cheery-syrniki-b5b6ca.netlify.app</li>
                  <li><strong>Title</strong>: "Smart CRM Pipeline Deals Management Demo"</li>
                  <li><strong>Dimensions</strong>: 800px height, full width</li>
                  <li><strong>Features</strong>: Fullscreen allowed, scrolling enabled</li>
                  <li><strong>Loading State</strong>: Shows spinner and "Loading demo..." text until iframe loads</li>
                  <li><strong>Toggle</strong>: Button to show/hide the demo with "View Live Demo" / "Hide Demo\" text</li>
                </ul>

                <h3 className="text-2xl font-bold text-white mb-4">Detailed Feature Documentation</h3>
                <p className="text-white/80 mb-4">
                  When the demo is visible, displays comprehensive collapsible sections:
                </p>

                <h4 className="text-xl font-semibold text-white mb-2">1. AI Pipeline Features & Functions</h4>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1 ml-4">
                  <li>AI Deal Intelligence with GPT-5 analysis</li>
                  <li>Kanban Board with drag-and-drop management</li>
                  <li>Deal Scoring (0-100% probability)</li>
                  <li>Risk Alerts for deal issues</li>
                  <li>Timeline Predictions for close dates</li>
                  <li>Competitive Intelligence</li>
                  <li>Gamification with leaderboards and achievements</li>
                  <li>Team Collaboration with real-time updates</li>
                  <li>Advanced Analytics for conversion rates and velocity</li>
                  <li>Custom Reporting and dashboards</li>
                  <li>Forecasting for revenue projections</li>
                  <li>Automation Rules for follow-ups and assignments</li>
                  <li>Integration Hub for email, calendar, and tools</li>
                  <li>Mobile Access for full pipeline management</li>
                </ul>

                <h4 className="text-xl font-semibold text-white mb-2">2. Deal Cards Overview</h4>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1 ml-4">
                  <li>AI Score Badge (green/yellow/red indicators)</li>
                  <li>Value Display with currency formatting</li>
                  <li>Stage Indicator for current position</li>
                  <li>Time Indicators (days in stage, total age)</li>
                  <li>Priority Flags for hot deals and risks</li>
                  <li>Owner Avatar for assigned team members</li>
                  <li>Activity Badge for recent updates</li>
                </ul>

                <h4 className="text-xl font-semibold text-white mb-2">3. Deal Detail View Features</h4>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1 ml-4">
                  <li>Overview Tab with AI score, value, stage, and actions</li>
                  <li>Intelligence Tab for win probability and risk analysis</li>
                  <li>Activities Tab for complete interaction timeline</li>
                  <li>Documents Tab for proposals, contracts, and attachments</li>
                  <li>Automation Tab for active workflows and sequences</li>
                  <li>Analytics Tab for performance metrics and forecasting</li>
                  <li>Team Tab for collaboration and task assignments</li>
                  <li>Settings Tab for custom fields and deal configuration</li>
                </ul>

                <h4 className="text-xl font-semibold text-white mb-2">4. Kanban Board Features</h4>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1 ml-4">
                  <li>Drag deals between stages to update progress</li>
                  <li>Visual pipeline flow with bottleneck identification</li>
                  <li>Stage limits and capacity management</li>
                  <li>Custom stage creation and configuration</li>
                  <li>Real-time collaboration and updates</li>
                </ul>

                <h4 className="text-xl font-semibold text-white mb-2">5. Pipeline Management Pro Tips</h4>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1 ml-4">
                  <li>Use filters for high-value or at-risk deals</li>
                  <li>Set up automated follow-ups for stalled deals</li>
                  <li>Review AI insights weekly for strategy updates</li>
                  <li>Monitor team performance through leaderboards</li>
                  <li>Use forecasting tools for accurate revenue projections</li>
                </ul>

                <h3 className="text-2xl font-bold text-white mb-4">Getting Started Instructions</h3>
                <p className="text-white/80 mb-4">
                  Provides a step-by-step guide:
                </p>
                <ol className="list-decimal list-inside text-white/80 mb-6 space-y-2">
                  <li>Browse deal cards to see AI scoring</li>
                  <li>Click any deal card to explore detailed view</li>
                  <li>Try dragging deals between stages on Kanban board</li>
                  <li>Use filters and search for specific deals</li>
                  <li>Check analytics dashboard for insights</li>
                  <li>Set up automation rules for follow-up sequences</li>
                </ol>

                <h3 className="text-2xl font-bold text-white mb-4">Call-to-Action Section</h3>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>Title</strong>: "Accelerate Your Sales Pipeline"</li>
                  <li><strong>Description</strong>: About AI-powered insights, gamification, and automation</li>
                  <li><strong>CTA button</strong>: "Get Smart CRM Pipeline" with ArrowRight icon</li>
                </ul>

                <h3 className="text-2xl font-bold text-white mb-4">Visual and Interactive Elements</h3>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><strong>Background</strong>: Gradient from black to blue-950/20 with animated floating orbs</li>
                  <li><strong>Animated Icons</strong>: 10 floating icons with bounce, pulse, rotate, and orbit animations</li>
                  <li><strong>Hover Effects</strong>: Cards lift and change opacity/background on hover</li>
                  <li><strong>Motion Animations</strong>: Various entrance animations with delays for staggered reveals</li>
                  <li><strong>Interactive Button</strong>: "Try Live Demo" positioned top-right in the embed section</li>
                </ul>

                <h3 className="text-2xl font-bold text-white mb-4">Related Code References</h3>
                <p className="text-white/80 mb-4">
                  The pipeline feature is referenced in other components for consistency:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                  <li><code>DashboardEmbedSection</code>: Shows "Pipeline Health" metric (94%)</li>
                  <li><code>ExitIntentOffer</code>: Lists "Pipeline 💼 – Multi-view deal management with AI win/loss predictions"</li>
                  <li><code>PricingSection</code>: Includes "Deal Pipeline" as a core feature</li>
                  <li><code>WorkflowShowcase</code>: References pipeline review and visualization workflows</li>
                  <li><code>FeatureMatrix</code>: Describes "Deal Pipeline Management" with customizable stages and drag-and-drop</li>
                  <li><code>competitorData.ts</code>: Compares multi-view pipeline capabilities</li>
                </ul>

                <p className="text-white/80">
                  The implementation focuses on demonstrating AI-enhanced deal management through visual storytelling, interactive elements, and comprehensive feature documentation rather than actual functional pipeline operations.
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

export default PipelineLandingPage;