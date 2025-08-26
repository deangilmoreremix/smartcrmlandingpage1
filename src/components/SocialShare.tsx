import React from 'react';
import { Twitter, Facebook, Linkedin, Share2 } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      }).catch(error => console.log('Error sharing:', error));
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <p className="text-white/70 text-sm">Share:</p>
      
      <a 
        href={shareLinks.twitter} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white/70 hover:text-blue-400 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={20} />
      </a>
      
      <a 
        href={shareLinks.facebook} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white/70 hover:text-blue-600 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook size={20} />
      </a>
      
      <a 
        href={shareLinks.linkedin} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white/70 hover:text-blue-500 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      
      {navigator.share && (
        <button 
          onClick={handleShare}
          className="text-white/70 hover:text-amber-400 transition-colors"
          aria-label="Native Share"
        >
          <Share2 size={20} />
        </button>
      )}
    </div>
  );
};

export default SocialShare;