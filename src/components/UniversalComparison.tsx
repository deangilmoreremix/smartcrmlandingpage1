import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Filter, Search, Star, Zap, Crown } from 'lucide-react';
import { competitorComparisonData, competitorInfo, CompetitorData } from '../data/competitorData';

interface UniversalComparisonProps {
  layout?: 'table' | 'cards';
  showFilters?: boolean;
}

const UniversalComparison: React.FC<UniversalComparisonProps> = ({
  layout = 'table',
  showFilters = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'feature' | 'smartcrm'>('feature');

  const categories = [
    { id: 'all', name: 'All Features', count: competitorComparisonData.length },
    { id: 'core', name: 'Core CRM', count: competitorComparisonData.filter(item => item.category === 'core').length },
    { id: 'ai', name: 'AI Tools', count: competitorComparisonData.filter(item => item.category === 'ai').length },
    { id: 'sales', name: 'Sales Tools', count: competitorComparisonData.filter(item => item.category === 'sales').length },
    { id: 'communication', name: 'Communication', count: competitorComparisonData.filter(item => item.category === 'communication').length },
    { id: 'business', name: 'Business Intelligence', count: competitorComparisonData.filter(item => item.category === 'business').length },
    { id: 'engagement', name: 'Engagement', count: competitorComparisonData.filter(item => item.category === 'engagement').length },
    { id: 'pricing', name: 'Pricing', count: competitorComparisonData.filter(item => item.category === 'pricing').length }
  ];

  const filteredData = useMemo(() => {
    let filtered = competitorComparisonData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.feature.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'feature') {
        return a.feature.localeCompare(b.feature);
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const renderFeatureValue = (value: string | boolean, competitor: string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="text-green-400 mx-auto" size={20} />
      ) : (
        <XCircle className="text-red-400 mx-auto" size={20} />
      );
    }

    if (value.includes('✅')) {
      return (
        <div className="flex items-center justify-center space-x-1">
          <CheckCircle className="text-green-400" size={16} />
          <span className="text-green-400 text-sm font-medium">
            {value.replace('✅', '').trim()}
          </span>
        </div>
      );
    }

    if (value.includes('❌')) {
      return (
        <div className="flex items-center justify-center space-x-1">
          <XCircle className="text-red-400" size={16} />
          <span className="text-red-400 text-sm">
            {value.replace('❌', '').trim()}
          </span>
        </div>
      );
    }

    return (
      <span className="text-white/70 text-sm text-center block">
        {value}
      </span>
    );
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      core: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      ai: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      sales: 'bg-green-500/20 text-green-400 border-green-500/30',
      communication: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      business: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      engagement: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      pricing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  if (layout === 'cards') {
    return (
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose SmartCRM?
            </motion.h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See how SmartCRM stacks up against the competition with advanced AI features at an unbeatable price.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.slice(0, 6).map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{item.feature}</h3>
                  {item.category && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">SmartCRM</span>
                    {renderFeatureValue(item.smartcrm, 'smartcrm')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Salesforce</span>
                    {renderFeatureValue(item.salesforce, 'salesforce')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">HubSpot</span>
                    {renderFeatureValue(item.hubspot, 'hubspot')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Complete Feature Comparison
          </motion.h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            See exactly how SmartCRM compares to the competition with our comprehensive feature matrix.
          </p>

          {/* SmartCRM Highlight */}
          <motion.div
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Crown className="text-yellow-400" size={24} />
              <h3 className="text-2xl font-bold text-white">SmartCRM</h3>
              <Star className="text-yellow-400" size={24} />
            </div>
            <p className="text-blue-300 font-semibold text-lg">
              Value: $999 → $97 today with coupon "SMARTCRM VIP"
            </p>
            <p className="text-white/70 mt-2">
              One-time payment • Lifetime access • All AI features included
            </p>
          </motion.div>
        </div>

        {showFilters && (
          <motion.div
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Comparison Table */}
        <motion.div
          className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-6 text-white font-semibold min-w-[300px]">Feature / Function</th>
                  <th className="text-center p-6 text-blue-400 font-semibold min-w-[200px]">
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="text-yellow-400" size={20} />
                      <span>SmartCRM</span>
                      <Crown className="text-yellow-400" size={16} />
                    </div>
                    <div className="text-sm text-blue-300 mt-1">$97 one-time</div>
                  </th>
                  <th className="text-center p-6 text-white/70 font-semibold min-w-[150px]">Salesforce<br/><span className="text-sm">$330/user/mo</span></th>
                  <th className="text-center p-6 text-white/70 font-semibold min-w-[150px]">HubSpot<br/><span className="text-sm">$150+/user/mo</span></th>
                  <th className="text-center p-6 text-white/70 font-semibold min-w-[150px]">Pipedrive<br/><span className="text-sm">$79/user/mo</span></th>
                  <th className="text-center p-6 text-white/70 font-semibold min-w-[150px]">Keap<br/><span className="text-sm">$249+/mo</span></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredData.map((item, index) => (
                    <motion.tr
                      key={item.feature}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-white font-medium">{item.feature}</span>
                          {item.category && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                              {categories.find(cat => cat.id === item.category)?.name}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        {renderFeatureValue(item.smartcrm, 'smartcrm')}
                      </td>
                      <td className="p-6 text-center">
                        {renderFeatureValue(item.salesforce, 'salesforce')}
                      </td>
                      <td className="p-6 text-center">
                        {renderFeatureValue(item.hubspot, 'hubspot')}
                      </td>
                      <td className="p-6 text-center">
                        {renderFeatureValue(item.pipedrive, 'pipedrive')}
                      </td>
                      <td className="p-6 text-center">
                        {renderFeatureValue(item.keap, 'keap')}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses choosing SmartCRM for its unmatched AI capabilities and unbeatable value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg flex items-center space-x-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get SmartCRM for $97</span>
                <Zap className="text-yellow-400" size={20} />
              </motion.button>
              <span className="text-white/60 text-sm">Use coupon: SMARTCRM VIP</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UniversalComparison;