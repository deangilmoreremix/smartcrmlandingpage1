import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
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
    <motion.nav 
      className={`fixed left-0 right-0 z-40 transition-all duration-500 top-[30px]`}
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ 
        backgroundColor: isScrolled ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none'
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
              <Link to="/" className="flex items-center text-white">
                <AnimatedLogo />
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
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Dashboard</Link>
                      <Link to="/contacts" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Contacts</Link>
                      <Link to="/pipeline" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Pipeline</Link>
                      <Link to="/ai-features" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">AI Features</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <NavLink href="#demo">Demo</NavLink>
              <NavLink href="#training">Masterclass</NavLink>
              <NavLink href="/webinar-recap">Webinar Recap</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
              <motion.button 
                className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openSignupModal('early-access')}
              >
                Get Smart CRM
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-black/90 backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="#features" onClick={() => setIsOpen(false)}>Features</MobileNavLink>
              <MobileNavLink href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
              <MobileNavLink href="/ai-calendar" onClick={() => setIsOpen(false)}>AI Calendar</MobileNavLink>
              <MobileNavLink href="/contacts" onClick={() => setIsOpen(false)}>Contacts</MobileNavLink>
              <MobileNavLink href="/pipeline" onClick={() => setIsOpen(false)}>Pipeline</MobileNavLink>
              <MobileNavLink href="/ai-features" onClick={() => setIsOpen(false)}>AI Features</MobileNavLink>
              <MobileNavLink href="#demo" onClick={() => setIsOpen(false)}>Demo</MobileNavLink>
              <MobileNavLink href="#training" onClick={() => setIsOpen(false)}>Masterclass (Sep 21-23)</MobileNavLink>
              <MobileNavLink href="/webinar-recap" onClick={() => setIsOpen(false)}>Webinar Recap</MobileNavLink>
              <MobileNavLink href="#faq" onClick={() => setIsOpen(false)}>FAQ</MobileNavLink>
              <div className="pt-2">
                <button 
                  className="w-full px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    openSignupModal('early-access');
                  }}
                >
                  Get Smart CRM
                </button>
                <button 
                  className="w-full px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => openSignupModal('early-access')}
                >
                  Get Smart CRM
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
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
  const isCurrentPage = href === window.location.pathname;
  
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
  const isCurrentPage = href === window.location.pathname;
  
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