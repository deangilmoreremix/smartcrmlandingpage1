import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, FileText, AlertTriangle, RefreshCcw, DollarSign, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Smart CRM</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              AI-powered customer relationship management platform designed to help you close more deals and grow your business.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/demo" className="text-white/60 hover:text-white text-sm transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-white/60 hover:text-white text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-white/60 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/webinar-recap" className="text-white/60 hover:text-white text-sm transition-colors">
                  Webinar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center">
                  <FileText size={14} className="mr-1.5" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center">
                  <Shield size={14} className="mr-1.5" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center">
                  <RefreshCcw size={14} className="mr-1.5" />
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center">
                  <AlertTriangle size={14} className="mr-1.5" />
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/earnings-disclaimer" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center">
                  <DollarSign size={14} className="mr-1.5" />
                  Earnings Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/affiliate-disclosure" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center">
                  <Users size={14} className="mr-1.5" />
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@smartcrm.vip" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center">
                  <Mail size={14} className="mr-1.5" />
                  support@smartcrm.vip
                </a>
              </li>
              <li>
                <Link to="/#faq" className="text-white/60 hover:text-white text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li className="text-white/60 text-sm">
                Hours: Mon-Fri, 9AM-5PM EST
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Smart CRM. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-white/50 text-xs">
              <p>Lifetime access terms apply - see Terms of Service</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/20">
            <p className="text-white/60 text-xs text-center leading-relaxed">
              <strong className="text-white/80">Disclaimer:</strong> Individual results may vary. Success depends on effort, market conditions, and execution. We make no guarantees of specific results or income. See our <Link to="/disclaimer" className="text-blue-400 hover:underline">full disclaimer</Link> and <Link to="/earnings-disclaimer" className="text-blue-400 hover:underline">earnings disclaimer</Link> for details.
            </p>
          </div>

          <div className="mt-3 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
            <p className="text-white/60 text-xs text-center leading-relaxed">
              <strong className="text-white/80">FTC Disclosure:</strong> This website contains affiliate links. We may receive compensation when you purchase through our links. See our <Link to="/affiliate-disclosure" className="text-blue-400 hover:underline">affiliate disclosure</Link> for full details.
            </p>
          </div>

          <div className="mt-3 text-center">
            <p className="text-white/40 text-xs">
              Sold via JVZoo | <Link to="/refund-policy" className="text-blue-400 hover:underline">30-Day Money-Back Guarantee</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
