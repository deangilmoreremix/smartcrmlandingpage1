import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronDown, ChevronUp, Users, Sparkles, LayoutDashboard, TrendingUp, Brain, MessageCircle, Gift } from 'lucide-react';
import { WEBINAR_AGENDA, AgendaItem } from '../constants/webinarData';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users,
  Sparkles,
  LayoutDashboard,
  TrendingUp,
  Brain,
  MessageCircle,
  Gift
};

interface WebinarAgendaProps {
  variant?: 'full' | 'compact';
}

const WebinarAgenda: React.FC<WebinarAgendaProps> = ({ variant = 'full' }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(variant === 'compact' ? null : 0);

  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  if (variant === 'compact') {
    return (
      <div className="space-y-2">
        {WEBINAR_AGENDA.map((item, index) => {
          const IconComponent = iconMap[item.icon] || Clock;
          return (
            <div
              key={index}
              className="flex items-center text-white/80 text-sm"
            >
              <IconComponent size={14} className="text-blue-400 mr-2 flex-shrink-0" />
              <span className="font-medium">{item.time}</span>
              <span className="mx-2 text-white/40">•</span>
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {WEBINAR_AGENDA.map((item, index) => {
        const IconComponent = iconMap[item.icon] || Clock;
        const isExpanded = expandedItem === index;

        return (
          <motion.div
            key={index}
            className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                  <IconComponent size={20} className="text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-400 text-sm font-medium">{item.time}</span>
                    <span className="text-white/40 text-xs">•</span>
                    <span className="text-white/60 text-xs">{item.duration}</span>
                  </div>
                  <h4 className="text-white font-medium text-sm">{item.title}</h4>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2"
              >
                <ChevronDown size={18} className="text-white/60" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3 pt-1 pl-[4.5rem]">
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WebinarAgenda;
