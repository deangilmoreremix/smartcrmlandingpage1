import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import CollapsibleSection from '../CollapsibleSection';

interface FeatureCategoryProps {
  category: {
    name: string;
    icon: React.ReactNode;
    features: string[];
    detailedContent: {
      description: string;
      benefits: string[];
      features: Array<{
        title: string;
        description: string;
        impact: string;
      }>;
    };
  };
  index: number;
  expandedCategory: string | null;
  onToggle: (categoryName: string) => void;
}

const FeatureCategory: React.FC<FeatureCategoryProps> = React.memo(({
  category,
  index,
  expandedCategory,
  onToggle
}) => {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
      whileHover={{
        y: -10,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderColor: "rgba(255, 255, 255, 0.3)",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
    >
      <motion.div
        className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4"
        whileHover={{ rotate: 10, scale: 1.1 }}
      >
        {category.icon}
      </motion.div>

      <h4 className="text-lg font-semibold text-white mb-3">{category.name}</h4>

      <ul className="space-y-2">
        {category.features.map((feature, featureIdx) => (
          <motion.li
            key={featureIdx}
            className="flex items-center text-white/70 text-sm"
            whileHover={{ x: 3 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (index * 0.1) + (featureIdx * 0.05) + 0.5, duration: 0.3 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"
              whileHover={{ scale: 2 }}
              transition={{ duration: 0.2 }}
            />
            {feature}
          </motion.li>
        ))}
      </ul>

      <motion.button
        className="mt-4 text-sm text-blue-400 flex items-center"
        whileHover={{ x: 3 }}
        onClick={() => onToggle(category.name)}
        style={{ cursor: 'pointer' }}
      >
        {expandedCategory === category.name ? "Show less" : "Learn more"}
        <motion.div
          animate={{ rotate: expandedCategory === category.name ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={14} className="ml-1" />
        </motion.div>
      </motion.button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expandedCategory === category.name && category.detailedContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="space-y-4">
              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed">
                {category.detailedContent.description}
              </p>

              {/* Key Benefits */}
              <div>
                <h5 className="text-white font-medium text-sm mb-2">Key Benefits:</h5>
                <ul className="space-y-1">
                  {category.detailedContent.benefits.map((benefit, benefitIdx) => (
                    <motion.li
                      key={benefitIdx}
                      className="flex items-start text-white/70 text-xs"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: benefitIdx * 0.1, duration: 0.3 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Detailed Features */}
              <div>
                <h5 className="text-white font-medium text-sm mb-3">Detailed Features:</h5>
                <div className="space-y-3">
                  {category.detailedContent.features.map((feature, featureIdx) => (
                    <motion.div
                      key={featureIdx}
                      className="bg-white/5 rounded-lg p-3 border border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: featureIdx * 0.1 + 0.2, duration: 0.3 }}
                    >
                      <h6 className="text-white font-medium text-sm mb-1">{feature.title}</h6>
                      <p className="text-white/70 text-xs mb-2">{feature.description}</p>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                        <span className="text-green-400 text-xs font-medium">{feature.impact}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FeatureCategory.displayName = 'FeatureCategory';

export default FeatureCategory;