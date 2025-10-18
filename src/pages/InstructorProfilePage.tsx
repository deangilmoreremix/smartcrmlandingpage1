import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Shield, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InstructorProfile from '../components/InstructorProfile';

const InstructorProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Link 
              to="/" 
              className="text-white/70 hover:text-white flex items-center transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>
            
            <motion.button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit size={18} className="mr-2" />
              Edit Instructor Profile
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Info size={20} className="text-blue-400 mr-2" />
                Instructor Profile Management
              </h2>
              <p className="text-white/80 mb-4">
                This page allows you to manage the instructor profile that appears throughout the site. 
                You can upload a new profile image by hovering over the instructor image below and clicking the camera icon.
              </p>
            </div>
          </motion.div>
          
          {/* Main profile with integrated image uploader */}
          <InstructorProfile editable={true} />
          
          <div className="mt-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl border border-blue-500/30 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Image Preview</h3>
            <p className="text-white/80 mb-4">
              This is how the instructor image appears in the Masterclass section:
            </p>
            
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-4">
              <InstructorProfile showFullProfile={false} />
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center">
                <Shield size={18} className="text-green-400 mr-2" />
                <span className="text-white/80 text-sm">Image uploads are stored securely in Supabase</span>
              </div>
              
              <motion.a
                href="/#training" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View in Masterclass Section
              </motion.a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InstructorProfilePage;