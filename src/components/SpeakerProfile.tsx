import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Star, ExternalLink } from 'lucide-react';
import { Speaker } from '../constants/webinarData';

interface SpeakerProfileProps {
  speaker: Speaker;
  variant?: 'full' | 'compact';
  index?: number;
}

const SpeakerProfile: React.FC<SpeakerProfileProps> = ({ speaker, variant = 'full', index = 0 }) => {
  if (variant === 'compact') {
    return (
      <motion.div
        className="flex items-start gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <img
          src={speaker.imageUrl}
          alt={speaker.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
        />
        <div className="flex-1">
          <h4 className="text-white font-semibold text-sm">{speaker.name}</h4>
          <p className="text-blue-400 text-xs">{speaker.title}</p>
          <p className="text-white/60 text-xs mt-1">{speaker.experience}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white/5 rounded-xl border border-white/10 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={speaker.imageUrl}
            alt={speaker.name}
            className="w-20 h-20 rounded-xl object-cover border-2 border-blue-500/30"
          />
          <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1.5">
            <Award size={14} className="text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1">{speaker.name}</h3>
          <p className="text-blue-400 text-sm font-medium mb-2">{speaker.title}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-white/60 text-xs">
              <Briefcase size={12} className="mr-1" />
              {speaker.experience}
            </div>
            {speaker.linkedIn && (
              <a
                href={speaker.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 text-xs hover:text-blue-300 transition-colors"
              >
                <ExternalLink size={12} className="mr-1" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      <p className="text-white/70 text-sm mb-4 leading-relaxed">{speaker.bio}</p>

      <div className="space-y-3">
        <div>
          <div className="flex items-center text-white/80 text-xs font-semibold mb-2">
            <GraduationCap size={14} className="mr-1.5 text-blue-400" />
            Credentials
          </div>
          <div className="grid grid-cols-1 gap-2">
            {speaker.credentials.map((credential, idx) => (
              <div
                key={idx}
                className="flex items-center text-white/70 text-xs bg-white/5 rounded px-2 py-1.5"
              >
                <Star size={10} className="mr-1.5 text-yellow-400 flex-shrink-0" />
                {credential}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center text-white/80 text-xs font-semibold mb-2">
            <Briefcase size={14} className="mr-1.5 text-blue-400" />
            Areas of Expertise
          </div>
          <div className="flex flex-wrap gap-1.5">
            {speaker.specialties.map((specialty, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakerProfile;
