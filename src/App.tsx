import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import ScrollingBanner from './components/ScrollingBanner';
import AnimationToggle from './components/AnimationToggle';
import { FeedbackContainer } from './components/Feedback';
import PerformanceMonitor from './components/PerformanceMonitor';
import SignupModal from './components/SignupModal';
import CelebrationBanner from './components/CelebrationBanner';
import JVZooBuyButton from './components/JVZooBuyButton';
import ExitIntentOffer from './components/ExitIntentOffer';
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
import ParallaxSection from './components/ParallaxSection';
import AiFeaturesCatalog from './components/AiFeaturesCatalog';
import FeatureMatrix from './components/FeatureMatrix';
import IntegrationEcosystem from './components/IntegrationEcosystem';
import SecurityComplianceHub from './components/SecurityComplianceHub';
import WorkflowShowcase from './components/WorkflowShowcase';
import TrainingProgramSection from './components/TrainingProgramSection';
import SignupFormSection from './components/SignupFormSection';
import DashboardEmbedSection from './components/DashboardEmbedSection';
import ContactsEmbedSection from './components/ContactsEmbedSection';
import PipelineEmbedSection from './components/PipelineEmbedSection';
import AICalendarSection from './components/AICalendarSection';
import PricingSection from './components/PricingSection';
import DemoVideo from './components/DemoVideo';

// Lazy load pages for code splitting
const WebinarRecapPage = lazy(() => import('./components/WebinarRecapPage'));
const WebinarConfirmationPage = lazy(() => import('./pages/WebinarConfirmationPage'));
const InstructorProfilePage = lazy(() => import('./pages/InstructorProfilePage'));
const WebhookTestPage = lazy(() => import('./pages/WebhookTestPage'));
const DashboardLandingPage = lazy(() => import('./pages/DashboardLandingPage'));
const AICalendarLandingPage = lazy(() => import('./pages/AICalendarLandingPage'));
const ContactsLandingPage = lazy(() => import('./pages/ContactsLandingPage'));
const PipelineLandingPage = lazy(() => import('./pages/PipelineLandingPage'));
const AIFeaturesCatalogLandingPage = lazy(() => import('./pages/AIFeaturesCatalogLandingPage'));
const AdminUploadPage = lazy(() => import('./pages/AdminUploadPage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));

import { SALE_END_DATE } from './constants/dates';

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
  // Set sale end date - October 20, 2025 at 11:59 PM EST
  const launchDate = SALE_END_DATE;

  // Modal state management
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [signupModalVariant, setSignupModalVariant] = useState<'standard' | 'masterclass' | 'early-access'>('standard');
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Check if user has previously signed up
  useEffect(() => {
    setIsMounted(true);

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

  // Show loading state until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <SignupContext.Provider value={{ openSignupModal, setHasSignedUp, hasSignedUp }}>
      <FeedbackContainer />
      {isDevMode && <PerformanceMonitor />}
      <AnimationToggle />

      <ErrorBoundary>
        <Routes>
          <Route path="/webinar-recap" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <WebinarRecapPage />
            </Suspense>
          } />
          <Route path="/webinar-confirmation" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <WebinarConfirmationPage />
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
          <Route path="/admin-upload" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <AdminUploadPage />
            </Suspense>
          } />
          <Route path="/demo" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <DemoPage />
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
                  title="Close More Deals with AI-Powered Smart CRM"
                  subtitle="The only CRM that uses GPT-5 AI to predict which leads will buy, automate your follow-ups, and tell you exactly what to say next. Get early access and be among the first to transform your sales process."
                  launchDate={launchDate}
                />

                {/* Sales Video Section */}
                <section className="py-20 px-4 bg-gradient-to-b from-black to-blue-950/30">
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        See Smart CRM in Action
                      </h2>
                      <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
                      <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Watch how Smart CRM transforms your sales process with AI-powered automation, intelligent insights, and seamless workflows.
                      </p>
                    </div>

                    <DemoVideo
                      thumbnailUrl="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Smart CRM Demo: Transform Your Sales Process"
                      description="Watch this 3-minute demo to see how Smart CRM uses GPT-5 AI to help you close 40% more deals with 80% less manual work."
                    />
                  </div>
                </section>

                {/* Problem Statement */}
                <ProblemStatement />

                {/* Solution Introduction */}
                <SolutionIntro />

                {/* How It Works */}
                <HowItWorks />

                {/* Dashboard Embed Section */}
                <DashboardEmbedSection />

                {/* Contacts Embed Section */}
                <ContactsEmbedSection />

                {/* Pipeline Embed Section */}
                <PipelineEmbedSection />

                {/* AI Calendar Section */}
                <AICalendarSection />

                {/* AI Features Catalog */}
                <AiFeaturesCatalog />

                {/* Interactive Feature */}
                <InteractiveFeature />

                {/* Training Program Section */}
                <TrainingProgramSection />

                {/* Workflow Showcase */}
                <WorkflowShowcase />

                {/* Parallax Section */}
                <ParallaxSection
                  bgImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  overlayColor="rgba(0, 0, 40, 0.75)"
                >
                  <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Be Among the First to Revolutionize Your Customer Relationships with AI</h2>
                    <p className="text-xl text-white/80 mb-8">
                      Join our exclusive early access program and discover how businesses are preparing to transform customer connections with Smart CRM.
                    </p>
                    <JVZooBuyButton>
                      <button className="px-8 py-4 bg-white text-blue-900 rounded-full text-lg font-bold hover:bg-blue-50 transition-colors shadow-lg">
                        Get Smart CRM - $97 One-Time
                      </button>
                    </JVZooBuyButton>
                  </div>
                </ParallaxSection>

                {/* Security & Compliance Hub */}
                <SecurityComplianceHub />

                {/* Features Section */}
                <section id="features" className="py-20 px-4 relative">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Features</h2>
                      <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
                      <p className="text-white/70 max-w-2xl mx-auto">
                        Smart CRM brings cutting-edge technology to your customer relationships with AI, helping you close more deals and build lasting connections with less effort and greater impact.
                      </p>
                    </div>

                    <FeatureShowcase />
                  </div>
                </section>

                {/* Complete Feature Matrix */}
                <FeatureMatrix />

                {/* Pricing Section */}
                <PricingSection />


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

              {/* Exit Intent Offer - Only popup on exit */}
              <ExitIntentOffer
                couponCode="SMARTCRM VIP"
                oncePerHours={24}
                showOnMobile={true}
                minTimeOnPage={10}
              />

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

            </div>
          } />
        </Routes>
      </ErrorBoundary>
    </SignupContext.Provider>
  );
}

export default App;