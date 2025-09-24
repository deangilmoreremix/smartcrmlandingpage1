import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Download, User, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedElement from './AnimatedElement';
import WebinarResources from './WebinarResources';
import InstructorProfile from './InstructorProfile';
import SocialShare from './SocialShare';

const WebinarRecapPage: React.FC = () => {
  const webinarDay = 1; // Example: Could be dynamic based on URL params
  const webinarTitle = "The Broken Sales Process & Why It's Costing You";
  const webinarDescription = "In this session, we explored the fundamental flaws in traditional sales approaches and introduced Smart CRM's revolutionary solution.";
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Placeholder video URL
  const instructorName = "Dean Gilmore"; // Placeholder

  // State for dynamic content like transcript (if fetched here)
  const [transcript, setTranscript] = useState<string | undefined>(undefined);

  // Example of fetching transcript (would typically be done via Supabase/API)
  useEffect(() => {
    // This would be an API call to fetch the transcript for webinarDay
    // For now, using a mock
    const fetchTranscript = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setTranscript(`[00:00:00] Host: Welcome everyone to the Smart CRM Masterclass! I'm Dean Gilmore, and I'm thrilled to have you all here today for what I promise will be a transformative series on revolutionizing your customer relationships using our Smart CRM technology.

[00:01:15] Host: Before we dive in, let me ask you a question: How much time do you think your sales team spends on actual selling activities versus administrative work? If you're like most businesses, the answer might shock you.

[00:02:30] Host: Studies show that sales reps spend up to 65% of their time on non-selling activities, with manual data entry being the biggest culprit. That's two-thirds of your sales capacity essentially wasted!`);
    };
    fetchTranscript();
  }, [webinarDay]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Webinar Recap: Day {webinarDay}</h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">{webinarTitle}</p>
              <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mt-6" />
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area (Video & Summary) */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedElement animation="slideUp" delay={0.2}>
                <motion.div
                  className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.005, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                >
                  <div className="aspect-video w-full">
                    <iframe
                      src={videoUrl}
                      title={webinarTitle}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-3">{webinarTitle}</h2>
                    <p className="text-white/70">{webinarDescription}</p>
                  </div>
                </motion.div>
              </AnimatedElement>

              {/* AI Summary / Key Takeaways */}
              <AnimatedElement animation="slideUp" delay={0.4}>
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Zap className="text-blue-400 mr-2" size={20} />
                    AI-Generated Summary & Key Takeaways
                  </h3>
                  <p className="text-white/80 mb-4">
                    This webinar highlighted the critical flaws in traditional CRM systems, emphasizing how manual data entry and outdated processes hinder sales productivity. It introduced Smart CRM as an AI-powered solution designed to automate repetitive tasks, provide actionable insights, and significantly boost sales efficiency.
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-2">
                    <li>Traditional CRMs lead to 65% non-selling activities.</li>
                    <li>Smart CRM automates data entry, saving up to 70% of administrative time.</li>
                    <li>AI-powered insights predict customer needs and optimize sales strategies.</li>
                    <li>Early adopters reported a 46% increase in closed deals within 30 days.</li>
                  </ul>
                </div>
              </AnimatedElement>

              {/* Social Share */}
              <AnimatedElement animation="slideUp" delay={0.6}>
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Share This Recap</h3>
                  <SocialShare url={window.location.href} title={`Webinar Recap: ${webinarTitle}`} />
                </div>
              </AnimatedElement>
            </div>

            {/* Sidebar (Resources & Instructor) */}
            <div className="lg:col-span-1 space-y-8">
              <AnimatedElement animation="slideUp" delay={0.3}>
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Download className="text-purple-400 mr-2" size={20} />
                    Webinar Resources
                  </h3>
                  {/* WebinarResources component would be rendered here */}
                  <WebinarResources webinarDay={webinarDay} transcript={transcript} />
                </div>
              </AnimatedElement>

              <AnimatedElement animation="slideUp" delay={0.5}>
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <User className="text-green-400 mr-2" size={20} />
                    About the Instructor
                  </h3>
                  {/* InstructorProfile component would be rendered here */}
                  <InstructorProfile showFullProfile={false} />
                  <p className="text-white/70 text-sm mt-4">
                    Learn more about {instructorName}'s expertise in AI-powered CRM and sales automation.
                  </p>
                  <Link to="/instructor-profile" className="inline-flex items-center text-blue-400 hover:underline mt-2 text-sm">
                    View Full Profile <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WebinarRecapPage;
