import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import ScrollingBanner from './components/ScrollingBanner';
import AnimationToggle from './components/AnimationToggle';
import { FeedbackContainer } from './components/Feedback';
import PerformanceMonitor from './components/PerformanceMonitor';
import ExitIntentOffer from './components/ExitIntentOffer';
import SignupModal from './components/SignupModal';
import CelebrationBanner from './components/CelebrationBanner';
import ProblemStatement from './components/ProblemStatement';
import SolutionIntro from './components/SolutionIntro';
import HowItWorks from './components/HowItWorks';
import InteractiveFeature from './components/InteractiveFeature';
import FeatureShowcase from './components/FeatureShowcase';
import FeatureDemo from './components/FeatureDemo';
import TestimonialSection from './components/TestimonialSection';
import UrgencySection from './components/UrgencySection';
import FinalCta from './components/FinalCta';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingCta from './components/FloatingCta';
import ParallaxSection from './components/ParallaxSection';
import AiFeaturesCatalog from './components/AiFeaturesCatalog';
import FEComparisonFull from './components/FEComparisonFull';
import IntegrationEcosystem from './components/IntegrationEcosystem';
import WorkflowShowcase from './components/WorkflowShowcase';
import TrainingProgramSection from './components/TrainingProgramSection';
import SignupFormSection from './components/SignupFormSection';
import DashboardEmbedSection from './components/DashboardEmbedSection';
import ContactsEmbedSection from './components/ContactsEmbedSection';
import PipelineEmbedSection from './components/PipelineEmbedSection';
import AICalendarSection from './components/AICalendarSection';

// Lazy load pages for code splitting
const WebinarRecapPage = lazy(() => import('./components/WebinarRecapPage'));
const InstructorProfilePage = lazy(() => import('./pages/InstructorProfilePage'));
const WebhookTestPage = lazy(() => import('./pages/WebhookTestPage'));
const DashboardLandingPage = lazy(() => import('./pages/DashboardLandingPage'));
const AICalendarLandingPage = lazy(() => import('./pages/AICalendarLandingPage'));
const ContactsLandingPage = lazy(() => import('./pages/ContactsLandingPage'));
const PipelineLandingPage = lazy(() => import('./pages/PipelineLandingPage'));
const AIFeaturesCatalogLandingPage = lazy(() => import('./pages/AIFeaturesCatalogLandingPage'));

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

// Loading fallback component for lazy-loaded pages
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <div className="text-white text-xl">Loading page...</div>
    </div>
  </div>
);

function App() {
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

      <Routes>
          <Route path="/webinar-recap" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <WebinarRecapPage />
            </Suspense>
          } />
          <Route path="/instructor-profile" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <InstructorProfilePage />
            </Suspense>
          } />
          <Route path="/webhook-test" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <WebhookTestPage />
            </Suspense>
          } />
          <Route path="/dashboard" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <DashboardLandingPage />
            </Suspense>
          } />
           <Route path="/ai-calendar" element={
             <Suspense fallback={<PageLoadingFallback />}>
               <AICalendarLandingPage />
             </Suspense>
           } />
           <Route path="/contacts" element={
             <Suspense fallback={<PageLoadingFallback />}>
               <ContactsLandingPage />
             </Suspense>
           } />
           <Route path="/pipeline" element={
             <Suspense fallback={<PageLoadingFallback />}>
               <PipelineLandingPage />
             </Suspense>
           } />
           <Route path="/ai-features" element={
             <Suspense fallback={<PageLoadingFallback />}>
               <AIFeaturesCatalogLandingPage />
             </Suspense>
           } />
          <Route path="/pricing" element={
            <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Pricing Page</h1>
                <p className="text-xl">Placeholder for pricing information</p>
              </div>
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-xl">Placeholder for about information</p>
              </div>
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl">Placeholder for contact information</p>
              </div>
            </div>
          } />
          <Route path="/" element={
            <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
              <ScrollProgress />
              <ScrollingBanner />
              <Navbar />
              
              <main>
                {/* Hero Section */}
                <Hero
                  title="The Smart Smart CRM Revolution"
                  subtitle="Transform how you connect with customers through AI-powered insights, seamless integrations, and intuitive workflow automation. Built for teams who want to focus on relationships with AI, not data entry."
                  launchDate={launchDate}
                />

                {/* Problem Statement */}
                <ProblemStatement />

                {/* Solution Introduction */}
                <SolutionIntro />

                {/* How It Works */}
                <HowItWorks />

                {/* Dashboard Embed Section - NEW */}
                <DashboardEmbedSection />

                {/* Contacts Embed Section - NEW */}
                <ContactsEmbedSection />

                {/* Pipeline Embed Section - NEW */}
                <PipelineEmbedSection />

                {/* AI Calendar Section - NEW */}
                <AICalendarSection />

                {/* AI Features Catalog - NEW */}
                <AiFeaturesCatalog />

                {/* Interactive Feature */}
                <InteractiveFeature />

                {/* Training Program Section - NEW */}
                <TrainingProgramSection />

                {/* Workflow Showcase - NEW */}
                <WorkflowShowcase />

                {/* Parallax Section */}
                <ParallaxSection
                  bgImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  overlayColor="rgba(0, 0, 40, 0.75)"
                >
                  <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Join 500+ Companies Revolutionizing Their Customer Relationships with AI</h2>
                    <p className="text-xl text-white/80 mb-8">
                      From startups to Fortune 500 companies, businesses of all sizes are transforming how they connect with customers using Smart Smart CRM.
                    </p>
                    <button
                      onClick={() => openSignupModal('early-access')}
                      className="px-8 py-4 bg-white text-blue-900 rounded-full text-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Start Your Transformation
                    </button>
                  </div>
                </ParallaxSection>


                {/* Features Section */}
                <section id="features" className="py-20 px-4 relative">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Features</h2>
                      <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
                      <p className="text-white/70 max-w-2xl mx-auto">
                        Smart Smart CRM brings cutting-edge technology to your customer relationships with AI, helping you close more deals and build lasting connections with less effort and greater impact.
                      </p>
                    </div>

                    <FeatureShowcase />
                  </div>
                </section>

                {/* Complete Feature Matrix - NEW */}
                <FEComparisonFull />


                {/* Integration Ecosystem - NEW */}
                <IntegrationEcosystem />

                {/* Feature Demo Section */}
                <FeatureDemo />

                {/* Testimonial Section */}
                <TestimonialSection />

                {/* Sign Up Form Section - NEW */}
                <SignupFormSection />

                {/* Urgency Section */}
                <UrgencySection launchDate={launchDate} />

                {/* Final CTA */}
                <FinalCta />

                {/* FAQ Section */}
                <FaqSection />
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
              {!hasSignedUp && <ExitIntentOffer onAccept={() => openSignupModal('early-access')} />}
              
              {/* Post-signup Celebration Banner */}
              {showCelebration && (
                <CelebrationBanner
                  onClose={() => setShowCelebration(false)}
                  showConfetti={true}
                />
              )}

            </div>
          } />
        </Routes>
    </SignupContext.Provider>
  );
}

export default App;