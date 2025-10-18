import React, { useState } from 'react';
import { ChevronDown, CircleCheck as CheckCircle, ArrowRight, Sparkles, Lock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import CanvasConfetti from './CanvasConfetti';
import AnimatedIconsGroup from './AnimatedIconsGroup';
import JVZooBuyButton from './JVZooBuyButton';

interface HeroProps {
  title: string;
  subtitle: string;
  launchDate: Date;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, launchDate }) => {
  const [highlightedFeature, setHighlightedFeature] = useState<number | null>(null);

  const keyBenefits = [
    { text: "25% More Revenue in 90 Days" },
    { text: "AI Predicts Which Leads Will Buy" },
    { text: "Automates 65% of Follow-Ups" }
  ];

  const scrollToContent = () => {
    if (typeof document !== 'undefined') {
      const featuresSection = document.getElementById('problem');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden mt-[108px]">
      <AnimatedIconsGroup
        section="hero"
        iconCount={8}
        animations={['bounce', 'pulse', 'orbit']}
      />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, 15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-60 h-60 bg-cyan-600/20 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, -15, 0]
          }}
          transition={{
            duration: 9,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 10,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* New Headline Section */}
        <AnimatedElement animation="fadeIn" duration={0.8}>
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              backgroundPosition: {
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #60a5fa, #22d3ee, #ffffff, #22d3ee, #60a5fa)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            The AI Sales Ecosystem
          </motion.h1>
        </AnimatedElement>

        <AnimatedElement animation="slideUp" delay={0.3} duration={0.8}>
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              backgroundPosition: {
                duration: 6,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #60a5fa, #22d3ee, #f0f9ff, #22d3ee, #60a5fa)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            That Never Sleeps, Never Quits,
          </motion.h2>
        </AnimatedElement>

        <AnimatedElement animation="slideUp" delay={0.4} duration={0.8}>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #fb923c, #ffffff, #fb923c, #fbbf24)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}
            >
              Never Loses a Deal
            </motion.span>
          </h2>
        </AnimatedElement>

        <AnimatedElement animation="fadeIn" delay={0.5} duration={0.8}>
          <motion.p
            className="text-lg md:text-2xl lg:text-3xl font-semibold mb-8"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              backgroundPosition: {
                duration: 7,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #94a3b8, #60a5fa, #e0f2fe, #60a5fa, #94a3b8)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            While Your Competitors Chase Leads Manually, SmartCRM AI Closes
          </motion.p>
        </AnimatedElement>

        <AnimatedElement animation="fadeIn" duration={0.8} delay={0.7}>
          <motion.div
            className="inline-flex items-center bg-blue-600/20 rounded-full px-6 py-2 backdrop-blur-md border border-blue-500/30 mb-6"
            whileHover={{
              backgroundColor: "rgba(59, 130, 246, 0.3)",
              borderColor: "rgba(59, 130, 246, 0.4)",
              scale: 1.05
            }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="text-blue-400 mr-2" size={16} />
            <span className="text-blue-400 font-medium text-sm">Powered by GPT-5 AI • Now Available</span>
          </motion.div>
        </AnimatedElement>

        <AnimatedElement animation="slideUp" delay={0.8} duration={0.8}>
          <motion.h3
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
        </AnimatedElement>

        <AnimatedElement animation="slideUp" delay={0.9} duration={0.8}>
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </AnimatedElement>

        <AnimatedElement animation="fadeIn" delay={1.0} duration={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
            {keyBenefits.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center md:justify-start text-white/80"
                onHoverStart={() => setHighlightedFeature(index)}
                onHoverEnd={() => setHighlightedFeature(null)}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "0.5rem",
                  padding: "0.5rem"
                }}
              >
                <motion.div
                  animate={highlightedFeature === index ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                    color: "#3b82f6"
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="mr-2 text-blue-400" size={18} />
                </motion.div>
                <span className="text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedElement>

        <AnimatedElement animation="slideUp" delay={1.1} duration={0.8}>
          <div className="max-w-md mx-auto mb-12">
            <JVZooBuyButton>
              <motion.button
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full text-lg font-bold shadow-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center">
                  Get Smart CRM - $97 One-Time <ArrowRight className="ml-2" size={20} />
                </span>
              </motion.button>
            </JVZooBuyButton>

            <div className="flex items-center justify-center gap-6 text-sm text-white/70 mt-4">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" size={16} />
                <span>30-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="text-green-400" size={16} />
                <span>Secure checkout</span>
              </div>
            </div>

            <p className="text-white/60 text-sm mt-3">
              Launch special pricing • Close more deals • Setup in 5 minutes
            </p>
          </div>
        </AnimatedElement>

        <motion.button
          onClick={scrollToContent}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Scroll to content"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            y: 0
          }}
        >
          <ChevronDown className="text-white" size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;
