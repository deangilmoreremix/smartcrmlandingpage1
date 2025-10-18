import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-[108px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FileText size={32} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Terms of Service</h1>
              <p className="text-white/60 mt-2">Last Updated: October 18, 2025</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 space-y-8">

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                <p className="text-white/70 leading-relaxed">
                  By accessing or using Smart CRM ("the Service"), you agree to be bound by these Terms of Service
                  ("Terms"). If you do not agree to these Terms, you may not access or use the Service. These Terms
                  apply to all visitors, users, and others who access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Smart CRM is an AI-powered customer relationship management platform that provides:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Intelligent contact and lead management</li>
                  <li>AI-driven sales forecasting and insights</li>
                  <li>Automated workflow and task management</li>
                  <li>Integration with third-party business tools</li>
                  <li>Analytics and reporting capabilities</li>
                  <li>Mobile and web-based access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Lifetime Access Definition</h2>
                <p className="text-white/70 leading-relaxed">
                  The term "lifetime access" refers to the lifetime of the product, not the lifetime of the user.
                  For a product of this nature and price point, the average supported lifetime is approximately 5 years
                  from the date of purchase. During this period, you will receive:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>All software updates and improvements</li>
                  <li>Technical support as outlined in our support policy</li>
                  <li>Access to new features and enhancements</li>
                  <li>Security patches and bug fixes</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  We reserve the right to extend or modify the service period at our discretion. You will be notified
                  of any significant changes to service availability with reasonable advance notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. User Accounts and Registration</h2>
                <p className="text-white/70 leading-relaxed">
                  To use Smart CRM, you must create an account and provide accurate, complete, and current information.
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Ensuring your account information remains accurate and up-to-date</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use Policy</h2>
                <p className="text-white/70 leading-relaxed mb-3">You agree not to:</p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Use the Service for any illegal or unauthorized purpose</li>
                  <li>Violate any laws in your jurisdiction</li>
                  <li>Transmit any malicious code, viruses, or harmful data</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use the Service to harass, abuse, or harm another person</li>
                  <li>Impersonate any person or entity</li>
                  <li>Collect or store personal data about other users without consent</li>
                  <li>Resell, redistribute, or sublicense the Service without authorization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Payment and Refund Policy</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM is offered as a one-time payment of $97 (regular price $999). All purchases are processed
                  through JVZoo, our authorized payment processor. We offer a 30-day money-back guarantee. If you are
                  not satisfied with the Service within 30 days of purchase, you may request a full refund by contacting
                  our support team at support@smartcrm.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property Rights</h2>
                <p className="text-white/70 leading-relaxed">
                  The Service and its original content, features, and functionality are owned by Smart CRM and are
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property
                  laws. You are granted a limited, non-exclusive, non-transferable license to access and use the Service
                  for your business purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Data Privacy and Security</h2>
                <p className="text-white/70 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use,
                  and protect your information. We implement industry-standard security measures to protect your data,
                  including encryption, secure authentication, and regular security audits.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Services and Integrations</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM may integrate with third-party services. Your use of these services is subject to their
                  respective terms of service and privacy policies. We are not responsible for the content, privacy
                  policies, or practices of third-party services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Service Modifications and Updates</h2>
                <p className="text-white/70 leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any part of the Service at any time. We will
                  provide reasonable notice of significant changes. Continued use of the Service after changes constitutes
                  acceptance of those changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Limitation of Liability</h2>
                <p className="text-white/70 leading-relaxed">
                  To the maximum extent permitted by law, Smart CRM shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                  directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Your use or inability to use the Service</li>
                  <li>Unauthorized access to or alteration of your data</li>
                  <li>Any third-party conduct or content on the Service</li>
                  <li>Any interruption or cessation of the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Disclaimer of Warranties</h2>
                <p className="text-white/70 leading-relaxed">
                  The Service is provided "as is" and "as available" without warranties of any kind, either express or
                  implied. We do not warrant that the Service will be uninterrupted, secure, or error-free. You use the
                  Service at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Termination</h2>
                <p className="text-white/70 leading-relaxed">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice,
                  for any violation of these Terms. Upon termination, your right to use the Service will immediately cease.
                  You may terminate your account at any time by contacting our support team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. Governing Law</h2>
                <p className="text-white/70 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the United States,
                  without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service
                  shall be resolved in the courts of the United States.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">15. Changes to Terms</h2>
                <p className="text-white/70 leading-relaxed">
                  We reserve the right to update or modify these Terms at any time. We will notify users of material
                  changes by email or through the Service. Your continued use of the Service after changes become effective
                  constitutes acceptance of the revised Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">16. Contact Information</h2>
                <p className="text-white/70 leading-relaxed">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                  <p className="text-white/80">
                    <strong>Email:</strong> support@smartcrm.com<br />
                    <strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
                  </p>
                </div>
              </section>

              <section className="border-t border-white/10 pt-6">
                <p className="text-white/60 text-sm">
                  By using Smart CRM, you acknowledge that you have read, understood, and agree to be bound by these
                  Terms of Service. Thank you for choosing Smart CRM to transform your customer relationships.
                </p>
              </section>

            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
