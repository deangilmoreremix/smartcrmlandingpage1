import React from 'react';
import { Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Disclaimer Section */}
        <div className="mb-8 pb-8 border-b border-white/10">
          <h3 className="text-white font-semibold text-sm mb-3">Disclaimer</h3>
          <div className="text-white/50 text-xs leading-relaxed space-y-2">
            <p>
              Please note that this product does not provide any guarantee of income or success. The results achieved by the product owner or any other individuals mentioned are not indicative of future success or earnings.
            </p>
            <p>
              This website is not affiliated with FaceBook or any of its associated entities. Once you navigate away from FaceBook, the responsibility for the content and its usage lies solely with the user.
            </p>
            <p>
              All content on this website, including but not limited to text, images, and multimedia, is protected by copyright law and the Digital Millennium Copyright Act. Unauthorized copying, duplication, modification, or theft, whether intentional or unintentional, is strictly prohibited. Violators will be prosecuted to the fullest extent of the law.
            </p>
            <p>
              We want to clarify that JVZoo serves as the retailer for the products featured on this site. JVZoo® is a registered trademark of BBC Systems Inc., a Florida corporation located at 1809 E. Broadway Street, Suite 125, Oviedo, FL 32765, USA, and is used with permission. The role of JVZoo as a retailer does not constitute an endorsement, approval, or review of these products or any claims, statements, or opinions used in their promotion.
            </p>
          </div>
        </div>

        {/* Footer Content */}
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