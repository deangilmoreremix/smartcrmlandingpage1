import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, UserCheck, Palette, Database, BookOpen } from 'lucide-react';
import JVZooBuyButton from '../JVZooBuyButton';

const ImplementationSection: React.FC = React.memo(() => {
  return (
    <div className="mt-20 text-center max-w-4xl mx-auto">
      <motion.div
        className="mb-10 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-50"
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundSize: "200% 100%" }}
        />
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl" />
                  <UserCheck className="text-blue-400 relative z-10" size={28} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white ml-3">Smart CRM Implementation</h3>
              </div>

              <p className="text-white/80 text-lg mb-6">
                Whether you're a solo entrepreneur or managing enterprise teams, our onboarding experts will ensure smooth implementation tailored to your specific needs.
              </p>

              <div className="hidden md:block">
                <JVZooBuyButton>
                  <motion.button
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group"
                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Get Smart CRM - $97</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </motion.button>
                </JVZooBuyButton>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: <Palette size={20} className="text-purple-400" />,
                    title: "Personalized Setup",
                    description: "Custom configuration for your specific workflows"
                  },
                  {
                    icon: <Database size={20} className="text-green-400" />,
                    title: "Data Migration",
                    description: "Seamless import from your existing systems"
                  },
                  {
                    icon: <BookOpen size={20} className="text-amber-400" />,
                    title: "User Training",
                    description: "Comprehensive onboarding for your entire team"
                  },
                  {
                    icon: <Check size={20} className="text-blue-400" />,
                    title: "Ongoing Support",
                    description: "Dedicated success manager for your journey"
                  }
                ].map((service, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white/10 rounded-lg p-4 border border-white/10"
                    whileHover={{
                      y: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderColor: "rgba(255, 255, 255, 0.3)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                  >
                    <motion.div
                      className="p-2 bg-white/10 rounded-lg inline-block mb-2"
                      whileHover={{ rotate: 15 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h4 className="text-white font-medium text-sm">{service.title}</h4>
                    <p className="text-white/60 text-xs mt-1">{service.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Success rate indicator */}
              <motion.div
                className="mt-4 bg-white/5 rounded-lg p-3 border border-white/10"
                whileHover={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-xs">Implementation success rate</span>
                  <span className="text-white font-medium text-sm">98%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "98%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="md:hidden mt-6">
            <JVZooBuyButton className="w-full">
              <motion.button
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg font-medium group w-full justify-center"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Smart CRM - $97</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </motion.button>
            </JVZooBuyButton>
          </div>
        </div>
      </motion.div>

      {/* Testimonial Highlight */}
      <motion.div
        className="bg-white/5 backdrop-blur-md rounded-xl p-6 max-w-3xl mx-auto border border-white/10"
        whileHover={{
          borderColor: "rgba(59, 130, 246, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.08)"
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start">
          <motion.div
            className="text-blue-500/20 transform -translate-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </motion.div>
          <div className="ml-4">
            <motion.p
              className="text-white/80 text-lg italic mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              "Smart CRM's implementation was the smoothest I've experienced in 15 years of sales leadership. Within two weeks, our entire team was up and running with full adoption—something I've never seen with other CRM platforms."
            </motion.p>

            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">Michael Thompson</p>
                <p className="text-white/60 text-sm">VP of Sales, TechInnovate Inc.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Final CTA Button */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9 }}
      >
        <JVZooBuyButton>
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full shadow-lg font-bold text-lg group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get Smart CRM Now - $97</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              <ArrowRight className="ml-2 group-hover:translate-x-1" size={20} />
            </motion.div>
          </motion.button>
        </JVZooBuyButton>
      </motion.div>
    </div>
  );
});

ImplementationSection.displayName = 'ImplementationSection';

export default ImplementationSection;