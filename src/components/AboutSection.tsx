import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Smart CRM Story</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Reimagining customer relationships through intelligent technology that works for you, not the other way around.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-white/70 mb-6">
              We created Smart CRM after experiencing firsthand how traditional CRM systems fail modern businesses. Our team of sales leaders and technologists came together with one mission: to build the CRM we always wished we had.
            </p>
            <p className="text-white/70 mb-6">
              Unlike clunky legacy systems, Smart CRM uses artificial intelligence to automate repetitive tasks, surface meaningful insights, and help teams focus on what matters most—building authentic customer relationships.
            </p>
            <p className="text-white/70 mb-6">
              Founded by a team with experience at Salesforce, HubSpot, and Google, Smart CRM combines deep industry knowledge with cutting-edge AI technology. Our platform doesn't just store data – it activates it, making every customer interaction more meaningful and productive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Stat number="70%" label="Less Data Entry" />
              <Stat number="3x" label="Sales Productivity" />
              <Stat number="99.9%" label="Uptime" />
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-14 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
              {/* This would be replaced with an actual video player */}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-2">Smart CRM Philosophy</h4>
                <p className="text-white/70 text-sm">Our technology should adapt to how people work, not the other way around.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-2">Our Difference</h4>
                <p className="text-white/70 text-sm">We built Smart CRM on three pillars: intelligence, automation, and simplicity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatProps {
  number: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ number, label }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
      <p className="text-2xl font-bold text-blue-400">{number}</p>
      <p className="text-white/60 text-sm">{label}</p>
    </div>
  );
};

export default AboutSection;