import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Lightbulb, Target, Download, Award, Video, Users, Zap, Check } from 'lucide-react';
import { WEBINAR_BENEFITS } from '../constants/webinarData';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Eye,
  Lightbulb,
  Target,
  Download,
  Award,
  Video,
  Users,
  Zap
};

interface WebinarBenefitsProps {
  variant?: 'full' | 'grid' | 'list';
  filterCategory?: 'all' | 'learn' | 'get' | 'access';
}

const WebinarBenefits: React.FC<WebinarBenefitsProps> = ({
  variant = 'grid',
  filterCategory = 'all'
}) => {
  const filteredBenefits = filterCategory === 'all'
    ? WEBINAR_BENEFITS
    : WEBINAR_BENEFITS.filter(b => b.category === filterCategory);

  if (variant === 'list') {
    return (
      <div className="space-y-3">
        {filteredBenefits.map((benefit, index) => {
          const IconComponent = iconMap[benefit.icon] || Check;
          return (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                <IconComponent size={16} className="text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm mb-1">{benefit.title}</h4>
                <p className="text-white/70 text-xs">{benefit.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBenefits.map((benefit, index) => {
          const IconComponent = iconMap[benefit.icon] || Check;
          return (
            <motion.div
              key={index}
              className="bg-white/5 rounded-lg border border-white/10 p-4 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-lg flex items-center justify-center">
                  <IconComponent size={20} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm mb-1">{benefit.title}</h4>
                  <p className="text-white/70 text-xs leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {['learn', 'get', 'access'].map((category) => {
        const categoryBenefits = WEBINAR_BENEFITS.filter(b => b.category === category);
        const categoryTitle = category === 'learn' ? 'What You\'ll Learn' :
                            category === 'get' ? 'What You\'ll Get' :
                            'What You\'ll Access';

        return (
          <div key={category} className="space-y-3">
            <h4 className="text-white font-semibold text-sm">{categoryTitle}</h4>
            <div className="space-y-2">
              {categoryBenefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon] || Check;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 bg-white/5 rounded-lg border border-white/10 p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <IconComponent size={16} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-medium text-sm mb-1">{benefit.title}</h5>
                      <p className="text-white/70 text-xs">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WebinarBenefits;
