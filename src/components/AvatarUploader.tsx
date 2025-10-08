import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, AlertTriangle, Check, X, Image } from 'lucide-react';
import { getSupabaseClient, getInstructorImageUrl } from '../utils/supabaseClient';

interface AvatarUploaderProps {
  showInstructorProfileLink?: boolean;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  showInstructorProfileLink = true
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bucketStatus, setBucketStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
  
  // Initialize and check Supabase storage on mount
  useEffect(() => {
    const checkBucket = async () => {
      try {
        const supabase = getSupabaseClient();
        if (!supabase) {
          setBucketStatus('unavailable');
          return;
        }
        
        // Check if avatar bucket exists
        const { data, error } = await supabase.storage.getBucket('avatar');
        
        if (error) {
          console.error("Avatar bucket error:", error);
          setBucketStatus('unavailable');
        } else {
          setBucketStatus('available');
          
          // Try to get instructor image
          const imageUrl = await getInstructorImageUrl();
          console.log("AvatarUploader: Retrieved instructor image URL:", imageUrl);
          setImageUrl(imageUrl);
        }
      } catch (err: any) {
        console.error("Error checking avatar bucket:", err);
        setBucketStatus('unavailable');
      }
    };
    
    checkBucket();
  }, []);
  
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
      <h3 className="text-white font-bold mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <User className="mr-2 text-blue-400" size={20} />
          Instructor Image
        </div>
        {showInstructorProfileLink && (
          <Link to="/instructor-profile" className="text-blue-400 text-sm flex items-center hover:underline">
            View <ArrowRight size={14} className="ml-1" />
          </Link>
        )}
      </h3>
      
      <div className="relative">
        <img 
          src={imageUrl || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1600"}
          alt="Instructor"
          className="w-full aspect-[4/3] object-cover rounded-lg"
          onError={(e) => {
            console.error("Error loading image:", imageUrl);
            setError("Failed to load image. The URL may be invalid.");
            e.currentTarget.src = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1600";
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <div className="absolute bottom-4 left-0 w-full px-4">
            <h3 className="text-white font-bold text-xl">Dean Gilmore</h3>
            <p className="text-white/80 text-sm">CRM Strategy Expert & Author</p>
          </div>
        </div>
      </div>
      
      {error && (
        <motion.div
          className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-white flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle size={18} className="text-red-400 mr-2" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}
      
      {bucketStatus === 'unavailable' && !error && (
        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle size={18} className="text-yellow-400 mr-2" />
            <p className="text-yellow-400 text-sm">Storage buckets are not properly configured.</p>
          </div>
          <p className="text-white/60 text-xs mt-1 ml-7">
            Please click the "Connect to Supabase" button in the top right to set up your storage buckets.
          </p>
        </div>
      )}
      
      {bucketStatus === 'available' && (
        <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center">
            <Check size={18} className="text-green-400 mr-2" />
            <p className="text-green-400 text-sm">Instructor image loaded successfully.</p>
          </div>
          <p className="text-white/60 text-xs mt-1 ml-7">
            Dean Gilmore is ready to deliver the October 14-16, 2025 masterclass.
          </p>
        </div>
      )}
    </div>
  );
};

// Add missing components
const Link = ({ to, className, children }: { to: string, className?: string, children: React.ReactNode }) => (
  <a href={to} className={className}>{children}</a>
);

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default AvatarUploader;