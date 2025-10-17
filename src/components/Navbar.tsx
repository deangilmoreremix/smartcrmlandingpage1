import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, ChevronDown, Sparkles, Zap, TrendingUp, Award, Rocket, CheckCircle, Users, Clock, Globe } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import { SignupContext } from '../App';

const ANNOUNCEMENTS = [
  {
    icon: TrendingUp,
    text: '500+ Companies Transformed',
    badge: 'TRENDING',
    badgeColor: 'from-blue-500 to-cyan-500',
    textGradient: 'from-blue-400 via-cyan-400 to-blue-300',
    borderColor: 'border-blue-500/50'
  },
  {
    icon: Sparkles,
    text: 'GPT-5 AI Integration Live',
    badge: 'NEW',
    badgeColor: 'from-yellow-500 to-orange-500',
    textGradient: 'from-yellow-400 via-amber-400 to-yellow-300',
    borderColor: 'border-yellow-500/50'
  },
  {
    icon: Award,
    text: '#1 CRM for AI Automation',
    badge: 'AWARD',
    badgeColor: 'from-cyan-500 to-blue-500',
    textGradient: 'from-cyan-400 via-teal-400 to-cyan-300',
    borderColor: 'border-cyan-500/50'
  },
  {
    icon: Rocket,
    text: 'Launch Special: 40% OFF',
    badge: 'LIMITED',
    badgeColor: 'from-orange-500 to-red-500',
    textGradient: 'from-orange-400 via-red-400 to-orange-300',
    borderColor: 'border-orange-500/50'
  },
  {
    icon: CheckCircle,
    text: 'Trusted by Fortune 500s',
    badge: 'VERIFIED',
    badgeColor: 'from-green-500 to-emerald-500',
    textGradient: 'from-green-400 via-emerald-400 to-green-300',
    borderColor: 'border-green-500/50'
  },
];

const Navbar: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [userCount, setUserCount] = useState(523);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const { openSignupModal } = useContext(SignupContext);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navbarBgX = useTransform(mouseX, [0, 1], ['0%', '5%']);
  const navbarBgY = useTransform(mouseY, [0, 1], ['0%', '5%']);

  // Rotating announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animated user count
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);
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

      {/* Top Announcement Bar - Dynamic Rotating */}
      <motion.div
        className="fixed left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700 overflow-hidden"
        style={{ top: 0 }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.3), transparent)',
            '--mouse-x': `${mousePosition.x * 100}%`,
            '--mouse-y': `${mousePosition.y * 100}%`,
          } as any}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between py-2">
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
                  {/* Dynamic gradient badge */}
                  <motion.div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${announcement.borderColor} whitespace-nowrap bg-gradient-to-r ${announcement.badgeColor} shadow-lg`}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 10px rgba(59, 130, 246, 0.3)',
                        '0 0 20px rgba(59, 130, 246, 0.5)',
                        '0 0 10px rgba(59, 130, 246, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AnnouncementIcon size={14} className="text-white" />
                    <span className="text-xs font-bold text-white">{announcement.badge}</span>
                  </motion.div>

                  {/* Dynamic gradient text */}
                  <motion.span
                    className={`text-sm font-bold hidden sm:inline bg-gradient-to-r ${announcement.textGradient} bg-clip-text text-transparent`}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    {announcement.text}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center - Live user count with gradient */}
            <motion.div
              className="hidden md:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-400/50 backdrop-blur-sm"
              animate={{
                scale: [1, 1.02, 1],
                borderColor: ['rgba(74, 222, 128, 0.5)', 'rgba(52, 211, 153, 0.7)', 'rgba(74, 222, 128, 0.5)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Users size={14} className="text-green-300" />
              <span className="text-xs font-bold bg-gradient-to-r from-green-300 via-emerald-300 to-green-200 bg-clip-text text-transparent">
                {userCount} online now
              </span>
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Right side - Additional info with gradients */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              <motion.div
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-purple-400/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                }}
              >
                <Clock size={14} className="text-purple-300" />
                <span className="text-xs font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200 bg-clip-text text-transparent">
                  40% OFF Ends Soon
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
                }}
              >
                <Globe size={14} className="text-cyan-300" />
                <span className="text-xs font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent hidden sm:inline">
                  60+ Countries
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500 overflow-hidden`}
        style={{ top: '44px' }}
        initial={{ backgroundColor: 'rgba(30, 58, 138, 0.95)' }}
        animate={{
          backgroundColor: isScrolled ? 'rgba(30, 58, 138, 0.98)' : 'rgba(30, 58, 138, 0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic background effect that follows mouse */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(96, 165, 250, 0.15), transparent 80%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            openSignupModal('standard');
                          }}
                          className="w-full text-center text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                        >
                          Get Started →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <NavLink href="/#demo" isActive={activeSection === 'demo'}>Demo</NavLink>
              <NavLink href="/#training" isActive={activeSection === 'training'}>Masterclass</NavLink>
              <NavLink href="/webinar-recap" isActive={location.pathname === '/webinar-recap'}>Webinar</NavLink>
              <NavLink href="/#faq" isActive={activeSection === 'faq'}>FAQ</NavLink>
              <motion.button
                className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openSignupModal('early-access')}
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
                    Join the Revolution
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
                <button
                  className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:from-blue-400 hover:to-cyan-400 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    setIsOpen(false);
                    openSignupModal('early-access');
                  }}
                >
                  Join the Revolution
                  <Sparkles size={16} />
                </button>
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