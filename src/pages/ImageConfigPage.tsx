import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Image, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StorageBucketSetup from '../components/StorageBucketSetup';
import ImageUploader from '../components/ImageUploader';
import InstructorImageUploader from '../components/InstructorImageUploader';

const ImageConfigPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex items-center">
            <Link 
              to="/"
              className="text-white/70 hover:text-white flex items-center"
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
            <h1 className="text-3xl font-bold text-white mb-6">Supabase Image Storage Setup</h1>
            
            <p className="text-xl text-white/80 max-w-3xl mb-8">
              Configure and test your Supabase storage buckets for image uploading functionality.
            </p>
          </motion.div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Database className="mr-2 text-blue-400" size={20} />
              Storage Configuration
            </h2>
            
            <div className="space-y-4">
              <p className="text-white/80">
                To use image uploading features, you need to configure your Supabase storage properly. This page helps you:
              </p>
              
              <ul className="space-y-2 text-white/70 ml-6 list-disc">
                <li>Verify that your required storage buckets exist</li>
                <li>Test uploading images to different buckets</li>
                <li>Configure proper security policies for your buckets</li>
              </ul>
              
              <p className="text-white/80">
                For instructor images, we recommend using the <code className="bg-white/10 px-1.5 py-0.5 rounded">avatar</code> bucket for profile photos and the <code className="bg-white/10 px-1.5 py-0.5 rounded">images</code> bucket for content images.
              </p>
            </div>
          </div>
          
          <StorageBucketSetup />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 h-full">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Image className="mr-2 text-blue-400" size={20} />
                  Instructor Image Uploader
                </h3>
                
                <p className="text-white/80 mb-6">
                  Use this component to upload and manage instructor profile images to the <code className="bg-white/10 px-1.5 py-0.5 rounded">avatar</code> bucket.
                </p>
                
                <InstructorImageUploader />
              </div>
            </div>
            
            <div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 h-full">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Image className="mr-2 text-purple-400" size={20} />
                  General Image Uploader
                </h3>
                
                <p className="text-white/80 mb-6">
                  Use this component to upload general images to folders in the <code className="bg-white/10 px-1.5 py-0.5 rounded">images</code> bucket.
                </p>
                
                <ImageUploader 
                  folder="instructor-images"
                  width="100%"
                  height="200px"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl border border-blue-500/30 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Next Steps</h3>
            
            <p className="text-white/80 mb-4">
              After successfully setting up your storage buckets, you can:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                className="bg-white/10 rounded-lg p-4"
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                <h4 className="font-semibold text-white mb-2">Update Instructor Profile</h4>
                <p className="text-white/70 text-sm">Add profile images and details for your instructor profiles</p>
                <Link 
                  to="/instructor-profile" 
                  className="inline-flex items-center text-blue-400 mt-2 text-sm"
                >
                  Go to Instructor Profile
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </motion.div>
              
              <motion.div
                className="bg-white/10 rounded-lg p-4"
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                <h4 className="font-semibold text-white mb-2">Webinar Recap Tool</h4>
                <p className="text-white/70 text-sm">Configure video uploads and transcripts in your webinar recap tool</p>
                <Link 
                  to="/webinar-recap" 
                  className="inline-flex items-center text-blue-400 mt-2 text-sm"
                >
                  Go to Webinar Recap
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageConfigPage;