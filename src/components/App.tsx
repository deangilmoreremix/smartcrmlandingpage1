import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
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
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import FloatingCta from './components/FloatingCta';
import ParallaxSection from './components/ParallaxSection';
import AiFeaturesCatalog from './components/AiFeaturesCatalog';
import FeatureMatrix from './components/FeatureMatrix';
import IntegrationEcosystem from './components/IntegrationEcosystem';
import SecurityComplianceHub from './components/SecurityComplianceHub';
import WorkflowShowcase from './components/WorkflowShowcase';
import TrainingProgramSection from './components/TrainingProgramSection';
import SignupFormSection from './components/SignupFormSection';
import ScrollingBanner from './components/ScrollingBanner';
import WebinarRecapPage from './components/WebinarRecapPage';
import InstructorProfilePage from './pages/InstructorProfilePage';
import { SALE_END_DATE } from '../constants/dates';

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

function App() {
  // Set sale end date - October 20, 2025 at 11:59 PM EST
  const launchDate = SALE_END_DATE;
  
  // Modal state management
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [signupModalVariant, setSignupModalVariant] = useState<'standard' | 'masterclass' | 'early-access'>('standard');
  const [hasSignedUp, setHasSignedUp] = useState(false);
  
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
    }, 3000);
  };
  
  // Function to open signup modal with specific variant
  const openSignupModal = (variant: 'standard' | 'masterclass' | 'early-access' = 'standard') => {
    setSignupModalVariant(variant);
    setSignupModalOpen(true);
  };
  
  return (
    <SignupContext.Provider value={{ openSignupModal, setHasSignedUp, hasSignedUp }}>
      <Router>
        <Routes>
          <Route path="/webinar-recap" element={<WebinarRecapPage />} />
          <Route path="/instructor-profile" element={<InstructorProfilePage />} />
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
                  bgImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600"
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
                
                {/* Security & Compliance Hub - NEW */}
                <SecurityComplianceHub />
                
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
                <FeatureMatrix />
                
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
              
            </div>
          } />
        </Routes>
      </Router>
    </SignupContext.Provider>
  );
}

export default App;