import React from 'react';
import { Check, Zap, Star, Shield } from 'lucide-react';
import JVZooBuyButton from './JVZooBuyButton';
import JVZooNoThanksButton from './JVZooNoThanksButton';

interface PricingFeature {
  name: string;
  included: boolean | string;
  tooltip?: string;
}

const pricingFeatures: PricingFeature[] = [
  { name: "Contacts", included: "Unlimited" },
  { name: "Users", included: "Unlimited" },
  { name: "Email Integration", included: true },
  { name: "Lead Management", included: true },
  { name: "Contact Management", included: true },
  { name: "Deal Pipeline", included: true },
  { name: "Mobile App", included: true },
  { name: "AI-Powered Insights", included: true, tooltip: "ML-driven opportunity scoring and next-best-action recommendations" },
  { name: "Advanced Analytics", included: true },
  { name: "Workflow Automation", included: "Advanced", tooltip: "Automate repetitive tasks and processes" },
  { name: "API Access", included: true },
  { name: "Custom Fields", included: "Unlimited" },
  { name: "Custom Objects", included: "Unlimited" },
  { name: "Sales Forecasting", included: true },
  { name: "Territory Management", included: true },
  { name: "Custom AI Training", included: true, tooltip: "Train the AI on your specific business vocabulary and processes" },
  { name: "Dedicated Success Manager", included: true },
  { name: "99.99% SLA Uptime", included: true },
  { name: "Single Sign-On", included: true },
  { name: "Priority Support", included: true },
  { name: "All Premium Features", included: true }
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/30 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">One Simple Price, Everything Included</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-white/70 max-w-2xl mx-auto">
            No subscriptions, no per-user fees, no hidden costs. Pay once and own Smart CRM forever with lifetime access to all features.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/30 to-blue-950/30 backdrop-blur-md rounded-xl border-2 border-blue-500/50 overflow-hidden transition-all hover:border-blue-400 hover:translate-y-[-4px] shadow-2xl relative">
            <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center text-xs font-bold py-2">
              ⚡ SPECIAL OFFER - LIFETIME ACCESS
            </div>

            <div className="p-8 pt-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="text-yellow-400" size={24} />
                  <h3 className="text-2xl font-bold text-white">Smart CRM</h3>
                  <Star className="text-yellow-400" size={24} />
                </div>
                <p className="text-white/70 mb-6">Complete AI-Powered CRM Solution</p>

                <div className="mb-4">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl text-white/60 line-through">$999</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">SAVE 90%</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-6xl font-bold text-white">$97</span>
                    <span className="text-xl text-green-400 font-semibold">one-time</span>
                  </div>
                  <p className="text-green-400 font-semibold text-lg">
                    Pay once • Own forever • No monthly fees
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6 mt-6 mb-6 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-green-400" />
                    <span>30-Day Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-blue-400" />
                    <span>Instant Access</span>
                  </div>
                </div>

                <JVZooBuyButton className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-block text-center">
                  Get Smart CRM - $97 One-Time
                </JVZooBuyButton>

                <p className="text-white/50 text-xs mt-3">
                  Use coupon "SMARTCRM VIP" at checkout
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="font-semibold text-white mb-4 text-center">Everything Included:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pricingFeatures.map((feature, index) => (
                    <PricingFeatureItem
                      key={index}
                      feature={feature}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start gap-3">
                  <Zap className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Why This Price?</h4>
                    <p className="text-white/70 text-sm">
                      We're offering this exclusive one-time price to early adopters.
                      No recurring fees means you own Smart CRM forever. Compare that to
                      competitors charging $150-$330 per user per month!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                <div className="flex items-start gap-3">
                  <Shield className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Lifetime Access Terms</h4>
                    <p className="text-white/70 text-sm">
                      The word "lifetime" applies to the lifetime of the product. The average lifetime
                      of a product of this nature and price to be supported is approximately 5 years.
                      Your one-time payment ensures you receive all updates, support, and features during
                      this period without any additional subscription fees.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <JVZooBuyButton className="w-full py-4 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-block text-center">
                  Claim Your Lifetime Access Now
                </JVZooBuyButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/70 mb-3">Questions? Contact our team at support@smartcrm.com</p>
          <p className="text-white font-medium mb-6">
            Need enterprise support? <a href="#contact" className="text-blue-400 hover:underline">Contact our sales team</a>
          </p>
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
}

const PricingFeatureItem: React.FC<PricingFeatureItemProps> = ({ feature }) => {
  const value = feature.included;

  return (
    <div className="flex items-start">
      <div className="mt-1 mr-3 flex-shrink-0">
        <Check size={16} className="text-green-400" />
      </div>
      <div className="flex items-center">
        <span className="text-white/80 text-sm">{feature.name}</span>
        {typeof value === 'string' && value !== 'true' && (
          <span className="text-white/60 text-xs ml-2">({value})</span>
        )}
      </div>
    </div>
  );
};

export default PricingSection;
