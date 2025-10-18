import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles, Zap, TrendingUp, Award, Rocket, CircleCheck as CheckCircle, Users, Clock, Globe, Target, DollarSign, Brain, Shield, Lock, Star } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import JVZooBuyButton from './JVZooBuyButton';

const ANNOUNCEMENTS = [
  {
    icon: TrendingUp,
    text: 'Beta Testing Now • Early Access Available • Limited Spots',
    badge: 'BETA',
    badgeColor: 'from-blue-500 to-cyan-500',
    textGradient: 'from-blue-400 via-cyan-400 to-blue-300',
    borderColor: 'border-blue-500/50',
    action: 'Join Beta Program'
  },
  {
    icon: Brain,
    text: 'GPT-5 AI Now Live • 94.6% Accuracy • 40+ Expert Capabilities',
    badge: 'BREAKTHROUGH',
    badgeColor: 'from-purple-500 to-pink-500',
    textGradient: 'from-purple-400 via-pink-400 to-purple-300',
    borderColor: 'border-purple-500/50',
    action: 'Explore AI Features'
  },
  {
    icon: Award,
    text: 'Built with GPT-5 AI • Next-Gen CRM Technology',
    badge: 'INNOVATIVE',
    badgeColor: 'from-yellow-500 to-orange-500',
    textGradient: 'from-yellow-400 via-amber-400 to-yellow-300',
    borderColor: 'border-yellow-500/50',
    action: 'Learn More'
  },
  {
    icon: Target,
    text: 'Designed to Increase Close Rates • AI-Powered Predictions',
    badge: 'POWERFUL',
    badgeColor: 'from-green-500 to-emerald-500',
    textGradient: 'from-green-400 via-emerald-400 to-green-300',
    borderColor: 'border-green-500/50',
    action: 'See Features'
  },
  {
    icon: Rocket,
    text: 'Launch Offer: 40% OFF + Free AI Onboarding • Limited Spots',
    badge: 'LAST CHANCE',
    badgeColor: 'from-orange-500 to-red-500',
    textGradient: 'from-orange-400 via-red-400 to-orange-300',
    borderColor: 'border-orange-500/50',
    action: 'Claim Discount'
  },
  {
    icon: Shield,
    text: 'Enterprise-Grade Security • SOC 2 Certified • Bank-Level Encryption',
    badge: 'SECURE',
    badgeColor: 'from-cyan-500 to-blue-500',
    textGradient: 'from-cyan-400 via-teal-400 to-cyan-300',
    borderColor: 'border-cyan-500/50',
    action: 'Security Details'
  },
  {
    icon: DollarSign,
    text: 'Help Your Business Grow Revenue • Smart AI Insights',
    badge: 'GROWTH',
    badgeColor: 'from-emerald-500 to-green-500',
    textGradient: 'from-emerald-400 via-green-400 to-emerald-300',
    borderColor: 'border-emerald-500/50',
    action: 'Explore Benefits'
  },
];

const Navbar: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [userCount, setUserCount] = useState(127);
  const [dealsClosedToday, setDealsClosedToday] = useState(89);
  const [revenueGenerated, setRevenueGenerated] = useState(427000);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navbarBgX = useTransform(mouseX, [0, 1], ['0%', '5%']);
  const navbarBgY = useTransform(mouseY, [0, 1], ['0%', '5%']);

  // Rotating announcements - slower for more reading time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animated user count
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Deals closed counter
  useEffect(() => {
    const interval = setInterval(() => {
      setDealsClosedToday((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Revenue counter
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenueGenerated((prev) => prev + Math.floor(Math.random() * 5000) + 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      setScrollProgress(scrolled);
      setIsScrolled(scrollTop > 50);

      // Detect active section
      const sections = ['features', 'demo', 'training', 'faq'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  };

  const announcement = ANNOUNCEMENTS[currentAnnouncement];
  const AnnouncementIcon = announcement.icon;

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      {/* Top Announcement Bar - Enhanced Premium Design */}
      <motion.div
        className="fixed left-0 right-0 z-50 overflow-hidden shadow-2xl"
        style={{ top: 0 }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Multi-layer background for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900" />

        {/* Animated mesh gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.25), transparent 60%)',
            '--mouse-x': `${mousePosition.x * 100}%`,
            '--mouse-y': `${mousePosition.y * 100}%`,
          } as any}
        />

        {/* Subtle noise texture for premium feel */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

        {/* Top gradient border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Left side - Rotating announcement with dynamic colors */}
            <div className="flex items-center gap-3 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAnnouncement}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Premium gradient badge with glass effect */}
                  <motion.div
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 ${announcement.borderColor} whitespace-nowrap bg-gradient-to-r ${announcement.badgeColor} shadow-2xl backdrop-blur-sm`}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 4px 20px rgba(59, 130, 246, 0.4)',
                        '0 8px 32px rgba(59, 130, 246, 0.6)',
                        '0 4px 20px rgba(59, 130, 246, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Inner glass reflection */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />

                    <AnnouncementIcon size={15} className="text-white drop-shadow-lg relative z-10" />
                    <span className="text-xs font-extrabold text-white tracking-wide drop-shadow-lg relative z-10">
                      {announcement.badge}
                    </span>
                  </motion.div>

                  {/* Enhanced gradient text with better readability */}
                  <motion.span
                    className={`text-sm font-bold hidden sm:inline bg-gradient-to-r ${announcement.textGradient} bg-clip-text text-transparent drop-shadow-sm tracking-wide`}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      backgroundSize: '200% 200%',
                      letterSpacing: '0.025em'
                    }}
                  >
                    {announcement.text}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center - Premium live stats card */}
            <motion.div
              className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-gradient-to-br from-green-500/25 via-emerald-500/20 to-green-500/25 rounded-xl border-2 border-green-400/40 backdrop-blur-md cursor-pointer group shadow-xl relative overflow-hidden"
              animate={{
                scale: [1, 1.02, 1],
                borderColor: ['rgba(74, 222, 128, 0.4)', 'rgba(52, 211, 153, 0.6)', 'rgba(74, 222, 128, 0.4)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 32px rgba(74, 222, 128, 0.3)'
              }}
            >
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/30 border border-green-400/40">
                <Users size={16} className="text-green-200 drop-shadow-lg" />
              </div>

              <div className="flex flex-col gap-0.5 relative">
                <span className="text-sm font-extrabold bg-gradient-to-r from-green-200 via-emerald-200 to-green-100 bg-clip-text text-transparent leading-tight tracking-wide">
                  {userCount.toLocaleString()}
                </span>
                <span className="text-[10px] text-green-300/90 font-bold leading-tight tracking-wider">
                  ACTIVE USERS
                </span>
              </div>

              <motion.div
                className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg shadow-green-400/60 relative"
                animate={{
                  opacity: [1, 0.4, 1],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 bg-green-300 rounded-full"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.8, 0, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Right side - Premium stat cards */}
            <div className="flex items-center gap-2.5 flex-1 justify-end">
              {/* Deals closed today */}
              <motion.div
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-blue-400/40 bg-gradient-to-br from-blue-500/25 via-cyan-500/20 to-blue-500/25 backdrop-blur-md cursor-pointer shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="relative flex items-center justify-center w-7 h-7 rounded-md bg-blue-500/30 border border-blue-400/40">
                  <Target size={14} className="text-blue-200 drop-shadow" />
                </div>
                <div className="flex flex-col gap-0 relative">
                  <span className="text-sm font-extrabold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-100 bg-clip-text text-transparent leading-tight">
                    {dealsClosedToday}
                  </span>
                  <span className="text-[9px] text-blue-300/80 font-bold leading-tight tracking-wider uppercase">
                    Deals Today
                  </span>
                </div>
              </motion.div>

              {/* Revenue generated */}
              <motion.div
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 via-green-500/20 to-emerald-500/25 backdrop-blur-md cursor-pointer shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="relative flex items-center justify-center w-7 h-7 rounded-md bg-emerald-500/30 border border-emerald-400/40">
                  <DollarSign size={14} className="text-emerald-200 drop-shadow" />
                </div>
                <div className="flex flex-col gap-0 relative">
                  <span className="text-sm font-extrabold bg-gradient-to-r from-emerald-200 via-green-200 to-emerald-100 bg-clip-text text-transparent leading-tight">
                    ${(revenueGenerated / 1000).toFixed(0)}K
                  </span>
                  <span className="text-[9px] text-emerald-300/80 font-bold leading-tight tracking-wider uppercase">
                    Revenue
                  </span>
                </div>
              </motion.div>

              {/* Limited time offer - Urgency card */}
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 bg-gradient-to-br from-orange-500/30 via-red-500/25 to-orange-500/30 backdrop-blur-md cursor-pointer shadow-xl relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 32px rgba(249, 115, 22, 0.4)'
                }}
                animate={{
                  borderColor: ['rgba(251, 146, 60, 0.6)', 'rgba(239, 68, 68, 0.8)', 'rgba(251, 146, 60, 0.6)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Pulsing background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                <div className="relative flex items-center justify-center w-7 h-7 rounded-md bg-orange-500/40 border border-orange-400/50">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Clock size={14} className="text-orange-100 drop-shadow" />
                  </motion.div>
                </div>

                <div className="flex flex-col gap-0 relative">
                  <span className="text-sm font-extrabold bg-gradient-to-r from-orange-100 via-red-100 to-orange-50 bg-clip-text text-transparent leading-tight">
                    40% OFF
                  </span>
                  <span className="text-[9px] text-orange-200/90 font-bold leading-tight tracking-wider uppercase">
                    12 Spots Left
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation - Premium Design */}
      <motion.nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500 overflow-hidden shadow-2xl`}
        style={{ top: '50px' }}
        initial={{ backgroundColor: 'rgba(15, 23, 42, 0.95)' }}
        animate={{
          backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.98)' : 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          boxShadow: isScrolled ? '0 8px 40px rgba(0, 0, 0, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-blue-900/30 to-slate-900/50 pointer-events-none" />

        {/* Dynamic mouse-follow gradient */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(700px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.2), transparent 70%)`,
          }}
        />

        {/* Top border gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center gap-3 group">
                  <AnimatedLogo />
                  <div className="flex flex-col">
                    <motion.span
                      className="font-bold text-lg leading-tight bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      Smart CRM
                    </motion.span>
                    <motion.span
                      className="text-xs leading-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent font-semibold"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      ⚡ Powered by GPT-5
                    </motion.span>
                  </div>
                </Link>
              </div>
            </motion.div>
          
          <div className="hidden md:block relative z-10">
            <motion.div
              className="ml-10 flex items-center space-x-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              <NavLink href="/" isActive={location.pathname === '/'}>Home</NavLink>

              {/* Enhanced Mega Menu for Features */}
              <motion.div className="relative">
                <motion.button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    isDropdownOpen ? 'text-white bg-white/10' : 'text-white/80 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  Features
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="ml-1" size={16} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-80 bg-gradient-to-br from-blue-900/95 to-blue-950/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <div className="p-4">
                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Explore Features</h3>
                        <div className="space-y-1">
                          <MegaMenuLink to="/demo" icon={Sparkles} title="Live Demo" description="See Smart CRM in action" />
                          <MegaMenuLink to="/dashboard" icon={TrendingUp} title="Dashboard" description="AI-powered analytics" />
                          <MegaMenuLink to="/contacts" icon={Users} title="Contacts" description="Intelligent contact management" />
                          <MegaMenuLink to="/pipeline" icon={Rocket} title="Pipeline" description="Visual deal tracking" />
                          <MegaMenuLink to="/ai-calendar" icon={Clock} title="AI Calendar" description="Smart scheduling assistant" />
                          <MegaMenuLink to="/ai-features" icon={Zap} title="AI Features" description="Complete AI toolkit" />
                        </div>
                      </div>
                      <div className="bg-white/5 p-3 border-t border-white/10">
                        <JVZooBuyButton>
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full text-center text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                          >
                            Get Smart CRM - $97 →
                          </button>
                        </JVZooBuyButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <NavLink href="/#demo" isActive={activeSection === 'demo'}>Demo</NavLink>
              <NavLink href="/#training" isActive={activeSection === 'training'}>Masterclass</NavLink>
              <NavLink href="/webinar-recap" isActive={location.pathname === '/webinar-recap'}>Webinar</NavLink>
              <NavLink href="/#faq" isActive={activeSection === 'faq'}>FAQ</NavLink>
              <JVZooBuyButton>
                <motion.button
                  className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {/* Pulsing border */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/40"
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {/* Inner glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <span className="relative z-10 flex items-center">
                  <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent font-extrabold">
                    Get Smart CRM - $97
                  </span>
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    <Sparkles size={16} className="ml-2 text-yellow-300" />
                  </motion.div>
                </span>
              </motion.button>
            </JVZooBuyButton>
            </motion.div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-md hover:bg-white/10"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-blue-900/95 backdrop-blur-lg"
            style={{ marginTop: '108px' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="/#features" onClick={() => setIsOpen(false)}>Features</MobileNavLink>
              <MobileNavLink href="/demo" onClick={() => setIsOpen(false)}>Live Demo</MobileNavLink>
              <MobileNavLink href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
              <MobileNavLink href="/ai-calendar" onClick={() => setIsOpen(false)}>AI Calendar</MobileNavLink>
              <MobileNavLink href="/contacts" onClick={() => setIsOpen(false)}>Contacts</MobileNavLink>
              <MobileNavLink href="/pipeline" onClick={() => setIsOpen(false)}>Pipeline</MobileNavLink>
              <MobileNavLink href="/ai-features" onClick={() => setIsOpen(false)}>AI Features</MobileNavLink>
              <MobileNavLink href="/#training" onClick={() => setIsOpen(false)}>Masterclass (Oct 17-19)</MobileNavLink>
              <MobileNavLink href="/webinar-recap" onClick={() => setIsOpen(false)}>Webinar Recap</MobileNavLink>
              <MobileNavLink href="/#faq" onClick={() => setIsOpen(false)}>FAQ</MobileNavLink>
              <div className="pt-2">
                <JVZooBuyButton>
                  <button
                    className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:from-blue-400 hover:to-cyan-400 transition-colors flex items-center justify-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Smart CRM - $97
                    <Sparkles size={16} />
                  </button>
                </JVZooBuyButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

interface MegaMenuLinkProps {
  to: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const MegaMenuLink: React.FC<MegaMenuLinkProps> = ({ to, icon: Icon, title, description }) => {
  return (
    <Link to={to}>
      <motion.div
        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
        whileHover={{ x: 4 }}
      >
        <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
          <Icon size={18} className="text-blue-400" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{title}</h4>
          <p className="text-xs text-white/60">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive: propIsActive }) => {
  const isExternal = href.startsWith('http');
  const isCurrentPage = typeof window !== 'undefined' ? href === window.location.pathname : false;
  const isActive = propIsActive !== undefined ? propIsActive : isCurrentPage;

  const baseClasses = `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative`;
  const activeClasses = isActive
    ? 'text-white bg-white/10'
    : 'text-white/80 hover:text-white';

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hash = href.split('#')[1];
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isExternal) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${activeClasses}`}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
            layoutId="activeNav"
          />
        )}
      </motion.a>
    );
  }

  if (href.startsWith('/#')) {
    return (
      <motion.a
        href={href}
        onClick={handleHashClick}
        className={`${baseClasses} ${activeClasses}`}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
            layoutId="activeNav"
          />
        )}
      </motion.a>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href}>
        <motion.span
          className={`${baseClasses} ${activeClasses} block`}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          {children}
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
              layoutId="activeNav"
            />
          )}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.a
      href={href}
      onClick={handleHashClick}
      className={`${baseClasses} ${activeClasses}`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
          layoutId="activeNav"
        />
      )}
    </motion.a>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  const isExternal = href.startsWith('http');
  const isCurrentPage = typeof window !== 'undefined' ? href === window.location.pathname : false;
  
  if (isExternal) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/80 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        onClick={onClick}
        whileHover={{ x: 5 }}
        whileTap={{ x: 0 }}
      >
        {children}
      </motion.a>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href} onClick={onClick}>
        <motion.span
          className={`${isCurrentPage ? 'text-white bg-white/10' : 'text-white/80 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}
          whileHover={{ x: 5 }}
          whileTap={{ x: 0 }}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.a
      href={href}
      className="text-white/80 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      onClick={onClick}
      whileHover={{ x: 5 }}
      whileTap={{ x: 0 }}
    >
      {children}
    </motion.a>
  );
};

export default Navbar;