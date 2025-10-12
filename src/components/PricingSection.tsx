import React, { useState } from 'react';
import { Check, X, HelpCircle } from 'lucide-react';
import JVZooBuyButton from './JVZooBuyButton';
import JVZooNoThanksButton from './JVZooNoThanksButton';

interface PricingFeature {
  name: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
  tooltip?: string;
}

const pricingFeatures: PricingFeature[] = [
  { name: "Contacts", starter: "Up to 1,000", pro: "Up to 50,000", enterprise: "Unlimited" },
  { name: "Users", starter: "Up to 3", pro: "Up to 25", enterprise: "Unlimited" },
  { name: "Email Integration", starter: true, pro: true, enterprise: true },
  { name: "Lead Management", starter: true, pro: true, enterprise: true },
  { name: "Contact Management", starter: true, pro: true, enterprise: true },
  { name: "Deal Pipeline", starter: true, pro: true, enterprise: true },
  { name: "Mobile App", starter: true, pro: true, enterprise: true },
  { name: "Basic Reporting", starter: true, pro: true, enterprise: true },
  { name: "AI-Powered Insights", starter: false, pro: true, enterprise: true, tooltip: "ML-driven opportunity scoring and next-best-action recommendations" },
  { name: "Advanced Analytics", starter: false, pro: true, enterprise: true },
  { name: "Workflow Automation", starter: "Basic", pro: "Advanced", enterprise: "Custom", tooltip: "Automate repetitive tasks and processes" },
  { name: "API Access", starter: false, pro: true, enterprise: true },
  { name: "Custom Fields", starter: "10 per object", pro: "100 per object", enterprise: "Unlimited" },
  { name: "Custom Objects", starter: false, pro: "Up to 5", enterprise: "Unlimited" },
  { name: "Sales Forecasting", starter: false, pro: true, enterprise: true },
  { name: "Territory Management", starter: false, pro: false, enterprise: true },
  { name: "Custom AI Training", starter: false, pro: false, enterprise: true, tooltip: "Train the AI on your specific business vocabulary and processes" },
  { name: "Dedicated Success Manager", starter: false, pro: false, enterprise: true },
  { name: "SLA", starter: false, pro: "99.9% uptime", enterprise: "99.99% uptime" },
  { name: "Single Sign-On", starter: false, pro: false, enterprise: true }
];

const PricingSection: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  
  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly');
  };
  
  return (
    <section id="pricing" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent Pricing, Exceptional Value</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-white/70 max-w-2xl mx-auto">
            Choose the plan that works best for your business. All plans include our core Smart CRM functionality.
          </p>
          
          <div className="inline-flex items-center mt-8 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'monthly' ? 'bg-blue-600 text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'annual' ? 'bg-blue-600 text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setBillingPeriod('annual')}
            >
              Annual <span className="text-xs text-blue-300">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all hover:border-blue-500/30 hover:translate-y-[-4px]">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <p className="text-white/70 mb-6">Perfect for small teams and startups</p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-white">
                  {billingPeriod === 'monthly' ? '$19' : '$15'}
                </span>
                <span className="text-white/70 ml-1 mb-1">/ user / month</span>
              </div>
              <p className="text-white/60 text-xs mb-4">
                {billingPeriod === 'annual' ? 'Billed annually' : 'Billed monthly'}
              </p>
              <JVZooBuyButton className="w-full py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors inline-block text-center">
                Get Smart CRM
              </JVZooBuyButton>
            </div>
            <div className="p-6">
              <p className="font-medium text-white mb-4">Included features:</p>
              <ul className="space-y-3">
                {pricingFeatures.map((feature, index) => (
                  <PricingFeatureItem 
                    key={index} 
                    feature={feature} 
                    tier="starter" 
                  />
                ))}
              </ul>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-blue-900/30 to-blue-950/30 backdrop-blur-md rounded-xl border border-blue-500/30 overflow-hidden transition-all hover:translate-y-[-4px] relative">
            <div className="absolute top-0 inset-x-0 bg-blue-500 text-white text-center text-xs font-bold py-1">
              MOST POPULAR
            </div>
            <div className="p-6 border-b border-white/10 pt-8">
              <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
              <p className="text-white/70 mb-6">Ideal for growing businesses</p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-white">
                  {billingPeriod === 'monthly' ? '$49' : '$39'}
                </span>
                <span className="text-white/70 ml-1 mb-1">/ user / month</span>
              </div>
              <p className="text-white/60 text-xs mb-4">
                {billingPeriod === 'annual' ? 'Billed annually' : 'Billed monthly'}
              </p>
              <JVZooBuyButton className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors inline-block text-center">
                Get Smart CRM
              </JVZooBuyButton>
            </div>
            <div className="p-6">
              <p className="font-medium text-white mb-4">Everything in Starter, plus:</p>
              <ul className="space-y-3">
                {pricingFeatures.map((feature, index) => (
                  <PricingFeatureItem 
                    key={index} 
                    feature={feature} 
                    tier="pro" 
                  />
                ))}
              </ul>
            </div>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all hover:border-blue-500/30 hover:translate-y-[-4px]">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-white/70 mb-6">For large organizations with complex needs</p>
              <div className="flex items-end mb-4">
                <span className="text-2xl font-bold text-white">Custom Pricing</span>
              </div>
              <p className="text-white/60 text-xs mb-4">
                Tailored to your specific requirements
              </p>
              <JVZooBuyButton className="w-full py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors inline-block text-center">
                Get Smart CRM
              </JVZooBuyButton>
            </div>
            <div className="p-6">
              <p className="font-medium text-white mb-4">Everything in Professional, plus:</p>
              <ul className="space-y-3">
                {pricingFeatures.map((feature, index) => (
                  <PricingFeatureItem 
                    key={index} 
                    feature={feature} 
                    tier="enterprise" 
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-white/70 mb-3">All plans include unlimited access to our help center and community support</p>
          <p className="text-white font-medium">Need a custom solution? <a href="#contact" className="text-blue-400 hover:underline">Contact our sales team</a></p>
          <div className="mt-6">
            <JVZooNoThanksButton />
          </div>
        </div>
      </div>
    </section>
  );
};

interface PricingFeatureItemProps {
  feature: PricingFeature;
  tier: 'starter' | 'pro' | 'enterprise';
}

const PricingFeatureItem: React.FC<PricingFeatureItemProps> = ({ feature, tier }) => {
  const value = feature[tier];
  
  // Only show features that are relevant to this tier
  if (value === false && typeof value === 'boolean') {
    return null;
  }
  
  return (
    <li className="flex items-start">
      <div className="mt-1 mr-3 flex-shrink-0">
        {value === true ? (
          <Check size={16} className="text-green-400" />
        ) : typeof value === 'string' ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <X size={16} className="text-red-400" />
        )}
      </div>
      <div className="flex items-center">
        <span className="text-white/80 text-sm">{feature.name}</span>
        {typeof value === 'string' && <span className="text-white/60 text-xs ml-2">({value})</span>}
        {feature.tooltip && (
          <div className="group relative ml-1">
            <HelpCircle size={14} className="text-white/40" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {feature.tooltip}
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default PricingSection;