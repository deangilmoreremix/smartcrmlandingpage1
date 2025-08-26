import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ZapierWebhookTester from '../components/ZapierWebhookTester';

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
            <h1 className="text-3xl font-bold text-white mb-6">Zapier Webhook Testing</h1>
            
            <p className="text-xl text-white/80 max-w-3xl mb-8">
              Test and troubleshoot your Zapier webhook connections for the Smart CRM masterclass registration forms.
            </p>
          </motion.div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Database className="mr-2 text-blue-400" size={20} />
              Webhook Configuration
            </h2>
            
            <div className="space-y-4">
              <p className="text-white/80">
                Smart CRM uses Zapier webhooks to capture registration data from various forms on the website. This page helps you:
              </p>
              
              <ul className="space-y-2 text-white/70 ml-6 list-disc">
                <li>Test if your Zapier webhook is properly configured</li>
                <li>Send test data to verify integration</li>
                <li>Troubleshoot common connection issues</li>
              </ul>
              
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center">
                  <Zap className="text-blue-400 mr-2 flex-shrink-0" size={18} />
                  <p className="text-white/80">
                    <span className="font-medium">Current webhook:</span> hooks.zapier.com/hooks/catch/642762/27d9hdf/
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Webhook tester component */}
          <ZapierWebhookTester />
          
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