import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Database, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ZapierWebhookTester from '../components/ZapierWebhookTester';
import GoToWebinarTester from '../components/GoToWebinarTester';

const WebhookTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex items-center">
            <Link 
              to="/" 
              className="text-white/70 hover:text-white flex items-center transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-6">Webhook Integration Testing</h1>

            <p className="text-xl text-white/80 max-w-3xl mb-8">
              Test and troubleshoot your webhook connections for the Smart CRM webinar registration forms.
            </p>
          </motion.div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Database className="mr-2 text-blue-400" size={20} />
              Integration Overview
            </h2>

            <div className="space-y-4">
              <p className="text-white/80">
                Smart CRM uses multiple integrations to ensure your webinar registrations are captured everywhere:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Video className="text-blue-400 mr-2 flex-shrink-0" size={18} />
                    <p className="text-white font-medium">GoToWebinar</p>
                  </div>
                  <p className="text-white/70 text-sm">Primary webinar platform for hosting live events</p>
                </div>

                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Video className="text-purple-400 mr-2 flex-shrink-0" size={18} />
                    <p className="text-white font-medium">Zoom</p>
                  </div>
                  <p className="text-white/70 text-sm">Backup webinar platform for redundancy</p>
                </div>

                <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Zap className="text-amber-400 mr-2 flex-shrink-0" size={18} />
                    <p className="text-white font-medium">MailerLite</p>
                  </div>
                  <p className="text-white/70 text-sm">Email marketing and automation platform</p>
                </div>

                <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Zap className="text-green-400 mr-2 flex-shrink-0" size={18} />
                    <p className="text-white font-medium">Zapier</p>
                  </div>
                  <p className="text-white/70 text-sm">Backup webhook for additional integrations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <GoToWebinarTester />
            <ZapierWebhookTester />
          </div>
          
          <div className="mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">How to Verify in Zapier</h3>
            
            <ol className="space-y-3 text-white/80">
              <li className="flex items-start">
                <div className="bg-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-blue-400 text-sm font-medium">1</span>
                </div>
                <p>Log in to your Zapier account and navigate to the Zap that uses this webhook</p>
              </li>
              
              <li className="flex items-start">
                <div className="bg-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-blue-400 text-sm font-medium">2</span>
                </div>
                <p>Check the "History" tab to see if test data has been received</p>
              </li>
              
              <li className="flex items-start">
                <div className="bg-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-blue-400 text-sm font-medium">3</span>
                </div>
                <p>Verify that the test data includes the expected fields: firstName, lastName, email, etc.</p>
              </li>
              
              <li className="flex items-start">
                <div className="bg-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-blue-400 text-sm font-medium">4</span>
                </div>
                <p>Check that any actions connected to the webhook (like adding to an email list) were triggered</p>
              </li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WebhookTestPage;