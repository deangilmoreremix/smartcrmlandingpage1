import React from 'react';
import { Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Cpu className="h-6 w-6 mr-2 text-blue-400" />
            <span className="font-bold text-xl text-white">Smart CRM</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-white/40 text-sm">
              &copy; {currentYear} Smart CRM, Inc. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end space-x-4 mt-2">
              <a href="#privacy" className="text-white/60 hover:text-white text-xs transition-colors">Privacy</a>
              <a href="#terms" className="text-white/60 hover:text-white text-xs transition-colors">Terms</a>
              <Link to="/webinar-recap" className="text-white/60 hover:text-white text-xs transition-colors">Webinar Recap Tool</Link>
              <a href="#" className="text-white/60 hover:text-white text-xs transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;