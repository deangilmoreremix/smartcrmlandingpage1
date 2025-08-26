import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Award, Calendar, Mail, Check, X } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import { getSupabaseClient, getInstructorImageUrl } from '../utils/supabaseClient';

interface InstructorProfileProps {
  showFullProfile?: boolean;
  editable?: boolean;
}

const InstructorProfile: React.FC<InstructorProfileProps> = ({
  showFullProfile = true,
  editable = false
}) => {
  const [instructorImage, setInstructorImage] = useState<string | null>(null);
  const [name, setName] = useState('Dean Gilmore');
  const [title, setTitle] = useState('Serial AI Automation Entrepreneur & Video Personalization Innovator');
  const [bio, setBio] = useState('Leveraging 22+ years of pioneering CRM and sales‑automation strategies, Dean has built and scaled platforms like Smart CRM, TrustScout.ai, and VideoRemix—helping businesses of all sizes unlock over $75 million in new revenue through streamlined pipelines, AI‑powered personalization, and turnkey automated workflows.');
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Fetch instructor image from Supabase on component mount
  useEffect(() => {
    const fetchInstructorImage = async () => {
      try {
        const imageUrl = await getInstructorImageUrl();
        console.log("InstructorProfile: Retrieved instructor image URL:", imageUrl);
        setInstructorImage(imageUrl);
      } catch (err) {
        console.error("Error fetching instructor image:", err);
      } finally {
        setImageLoading(false);
      }
    };
    
    fetchInstructorImage();
  }, []);
  
  const handleSaveProfile = () => {
    // In a real app, you would save this to your database
    setIsEditing(false);
  };
  
  return (
    <AnimatedElement animation="fadeIn">
      <div className={`${showFullProfile ? 'bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6' : ''}`}>
        <div className={`flex ${showFullProfile ? 'flex-col md:flex-row' : 'flex-col'} gap-6`}>
          <div className={`${showFullProfile ? 'md:w-1/3' : 'w-full'}`}>
            <div className="relative aspect-[4/3]">
              {imageLoading ? (
                <div className="w-full h-full bg-white/5 rounded-lg flex items-center justify-center">
                  <Loader2 className="animate-spin text-white/30" size={32} />
                </div>
              ) : (
                <>
                  <img 
                    src={instructorImage || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                    alt="Dean Gilmore"
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      console.error("Error loading instructor image:", instructorImage);
                      e.currentTarget.src = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1600";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="text-white font-bold text-xl">{name}</h3>
                    <p className="text-white/80 text-sm">{title}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {showFullProfile && (
            <div className="md:w-2/3">
              <div className="flex justify-between">
                {!editable ? (
                  <h2 className="text-2xl font-bold text-white mb-4">{name}</h2>
                ) : (
                  <div className="flex justify-between items-center w-full mb-4">
                    <h2 className="text-2xl font-bold text-white">{name}</h2>
                    
                    {editable && (
                      <motion.button
                        className={`px-3 py-1.5 rounded-lg flex items-center text-sm ${
                          isEditing 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                        onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isEditing ? (
                          <>
                            <Check size={14} className="mr-1.5" />
                            Save
                          </>
                        ) : (
                          <>
                            <EditIcon size={14} className="mr-1.5" />
                            Edit Profile
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
              
              {!isEditing ? (
                <>
                  <div className="flex items-center mb-4">
                    <User className="text-blue-400 mr-2" size={18} />
                    <span className="text-white/70">{title}</span>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-2">Biography</h3>
                    <p className="text-white/80">{bio}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-white/70 text-sm mb-1">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-white/70 text-sm mb-1">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-white/70 text-sm mb-1">Biography</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white h-32 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              )}
              
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white font-semibold mb-4">Instructor Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <BookOpen size={16} className="text-blue-400 mr-2" />
                      <span className="text-white/70 text-sm">Experience</span>
                    </div>
                    <p className="text-white">22+ Years</p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Award size={16} className="text-purple-400 mr-2" />
                      <span className="text-white/70 text-sm">Expertise</span>
                    </div>
                    <p className="text-white">CRM Implementation</p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Calendar size={16} className="text-green-400 mr-2" />
                      <span className="text-white/70 text-sm">Next Session</span>
                    </div>
                    <p className="text-white">Tomorrow, 3:00 PM EDT</p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Mail size={16} className="text-amber-400 mr-2" />
                      <span className="text-white/70 text-sm">Contact</span>
                    </div>
                    <p className="text-white">dean@smartcrm.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedElement>
  );
};

// Add Loader2 component
const Loader2 = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className || ''} animate-spin`}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// Add EditIcon component
const EditIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default InstructorProfile;