import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Tag, Gift } from 'lucide-react';

const ScrollingBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-red-900 to-red-800 py-2 overflow-hidden relative z-50">
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" 
        animate={{ 
          x: ['-100%', '100%']
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          ease: 'linear'
        }}
      />
      
      {/* Scrolling text */}
      <div className="flex justify-center items-center">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: 'linear'
          }}
          className="flex items-center whitespace-nowrap gap-8"
        >
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="flex items-center gap-6">
              <div className="flex items-center text-white">
                <Tag className="text-blue-300 mr-1.5" size={16} />
                <span className="font-medium text-sm">7-Day Smart CRM Sale:</span>
                <span className="text-sm ml-1.5">September 21-27, 2025</span>
              </div>
              
              <div className="flex items-center text-white">
                <Gift className="text-blue-300 mr-1.5" size={16} />
                <span className="text-sm">Limited-Time Offer</span>
              </div>
              
              <div className="flex items-center text-white bg-white/10 px-2 py-1 rounded-full">
                <span className="text-xs font-medium text-blue-300">Special pricing ends soon</span>
                <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollingBanner;