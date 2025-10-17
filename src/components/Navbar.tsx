import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, ChevronDown, Sparkles, Zap, TrendingUp, Award, Rocket, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import { SignupContext } from '../App';

const Navbar: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openSignupModal } = useContext(SignupContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-3 flex-nowrap">
              <motion.div
                className="flex items-center gap-1.5 bg-blue-800/50 px-2.5 py-1 rounded-full border border-blue-600/50 whitespace-nowrap"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp size={14} className="text-blue-300" />
                <span className="text-xs font-semibold text-white">500+ Companies</span>
              </motion.div>

              <motion.div
                className="flex items-center gap-1.5 bg-yellow-500/20 px-2.5 py-1 rounded-full border border-yellow-400/50 whitespace-nowrap"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={14} className="text-yellow-400" />
                <span className="text-xs font-bold text-yellow-300">PROVEN</span>
              </motion.div>

              <span className="text-sm text-blue-200 hidden md:inline whitespace-nowrap">Transform Your Business Today</span>

              <motion.div
                className="flex items-center gap-1.5 bg-orange-500/20 px-2.5 py-1 rounded-full border border-orange-400/50 whitespace-nowrap"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap size={14} className="text-orange-400" />
                <span className="text-xs font-bold text-orange-300">LIVE NOW</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-3 flex-nowrap">
              <motion.div
                className="flex items-center gap-1.5 bg-cyan-500/20 px-2.5 py-1 rounded-full border border-cyan-400/50 whitespace-nowrap"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Award size={14} className="text-cyan-400" />
                <span className="text-xs font-bold text-cyan-300">AI-POWERED</span>
              </motion.div>

              <motion.div
                className="flex items-center gap-1.5 bg-green-500/20 px-2.5 py-1 rounded-full border border-green-400/50 whitespace-nowrap"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <CheckCircle size={14} className="text-green-400" />
                <span className="text-xs font-bold text-green-300">SMART CRM IS NOW LIVE</span>
              </motion.div>

              <motion.div
                className="hidden lg:flex items-center gap-1.5 bg-yellow-500/20 px-2.5 py-1 rounded-full border border-yellow-400/50 whitespace-nowrap"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Rocket size={14} className="text-yellow-400" />
                <span className="text-xs font-bold text-yellow-300">JUST LAUNCHED</span>
              </motion.div>

              <span className="text-sm text-blue-200 hidden xl:inline whitespace-nowrap">Revolutionary GPT-5 AI Integration</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500`}
        style={{ top: '44px' }}
        initial={{ backgroundColor: 'rgba(30, 58, 138, 0.95)' }}
        animate={{
          backgroundColor: isScrolled ? 'rgba(30, 58, 138, 0.98)' : 'rgba(30, 58, 138, 0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center gap-3">
                  <AnimatedLogo />
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg leading-tight">Smart CRM</span>
                    <span className="text-blue-300 text-xs leading-tight">Powered by GPT-5</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          
          <div className="hidden md:block">
            <motion.div 
              className="ml-10 flex items-center space-x-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              <NavLink href="/">Home</NavLink>
              <motion.div className="relative">
                <motion.button
                  className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  Features <ChevronDown className="ml-1" size={16} />
                </motion.button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-md shadow-lg py-2 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <Link to="/demo" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Live Demo</Link>
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Dashboard</Link>
                      <Link to="/contacts" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Contacts</Link>
                      <Link to="/pipeline" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Pipeline</Link>
                      <Link to="/ai-calendar" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">AI Calendar</Link>
                      <Link to="/ai-features" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">AI Features</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <NavLink href="/#demo">Demo</NavLink>
              <NavLink href="/#training">Masterclass</NavLink>
              <NavLink href="/webinar-recap">Webinar Recap</NavLink>
              <NavLink href="/#faq">FAQ</NavLink>
              <motion.button
                className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openSignupModal('early-access')}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {/* Pulsing border */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <span className="relative z-10 flex items-center">
                  Join the Revolution
                  <Sparkles size={16} className="ml-2" />
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
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const isExternal = href.startsWith('http');
  const isCurrentPage = typeof window !== 'undefined' ? href === window.location.pathname : false;
  
  if (isExternal) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        {children}
      </motion.a>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href}>
        <motion.span
          className={`${isCurrentPage ? 'text-white bg-white/10' : 'text-white/80 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors block`}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.a
      href={href}
      className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {children}
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