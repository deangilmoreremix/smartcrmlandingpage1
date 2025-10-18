import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
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
              <Shield size={32} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
              <p className="text-white/60 mt-2">Last Updated: October 18, 2025</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 space-y-8">

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information when you use our Smart CRM service
                  ("the Service"). By using the Service, you consent to the data practices described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.1 Personal Information</h3>
                <p className="text-white/70 leading-relaxed mb-3">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Business information (company name, role, industry)</li>
                  <li>Account credentials (username and password)</li>
                  <li>Payment information (processed through JVZoo)</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.2 Customer Data</h3>
                <p className="text-white/70 leading-relaxed mb-3">
                  Through your use of Smart CRM, you may store:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Contact information for your customers and leads</li>
                  <li>Communication history and notes</li>
                  <li>Sales pipeline and deal information</li>
                  <li>Task and activity data</li>
                  <li>Custom fields and business-specific data</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.3 Usage Information</h3>
                <p className="text-white/70 leading-relaxed mb-3">
                  We automatically collect certain information about your use of the Service:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Log data (IP address, browser type, operating system)</li>
                  <li>Device information</li>
                  <li>Usage patterns and feature utilization</li>
                  <li>Performance metrics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-white/70 leading-relaxed mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Provide, maintain, and improve the Service</li>
                  <li>Process your transactions and manage your account</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Communicate with you about products, services, and promotional offers</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues and security threats</li>
                  <li>Personalize and improve your experience</li>
                  <li>Train and improve our AI and machine learning models</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. How We Share Your Information</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.1 Service Providers</h3>
                <p className="text-white/70 leading-relaxed">
                  We may share your information with third-party service providers who perform services on our behalf,
                  such as payment processing, data hosting, email delivery, and customer support. These providers are
                  contractually obligated to protect your information.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.2 Business Transfers</h3>
                <p className="text-white/70 leading-relaxed">
                  If we are involved in a merger, acquisition, or sale of assets, your information may be transferred
                  as part of that transaction. We will provide notice before your information becomes subject to a
                  different privacy policy.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.3 Legal Requirements</h3>
                <p className="text-white/70 leading-relaxed">
                  We may disclose your information if required to do so by law or in response to valid requests by
                  public authorities (e.g., court orders, subpoenas, or government agencies).
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.4 With Your Consent</h3>
                <p className="text-white/70 leading-relaxed">
                  We may share your information with third parties when you give us explicit consent to do so.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  We implement appropriate technical and organizational measures to protect your information:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Encrypted data storage</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                  <li>SOC 2 compliance certification</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  While we strive to protect your information, no method of transmission over the Internet or electronic
                  storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
                <p className="text-white/70 leading-relaxed">
                  We retain your information for as long as your account is active or as needed to provide you services.
                  We will retain and use your information as necessary to comply with legal obligations, resolve disputes,
                  and enforce our agreements. You may request deletion of your account and associated data at any time
                  by contacting our support team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Privacy Rights</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.1 Access and Portability</h3>
                <p className="text-white/70 leading-relaxed">
                  You have the right to access your personal information and request a copy of your data in a
                  machine-readable format.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.2 Correction</h3>
                <p className="text-white/70 leading-relaxed">
                  You have the right to correct inaccurate or incomplete personal information.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.3 Deletion</h3>
                <p className="text-white/70 leading-relaxed">
                  You have the right to request deletion of your personal information, subject to certain exceptions.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.4 Objection and Restriction</h3>
                <p className="text-white/70 leading-relaxed">
                  You have the right to object to or restrict certain processing of your personal information.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.5 Marketing Communications</h3>
                <p className="text-white/70 leading-relaxed">
                  You can opt out of marketing emails by clicking the "unsubscribe" link in any promotional email
                  or by contacting us directly.
                </p>

                <p className="text-white/70 leading-relaxed mt-4">
                  To exercise these rights, please contact us at support@smartcrm.vip. We will respond to your request
                  within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  We use cookies and similar tracking technologies to collect and track information about your use of
                  the Service. Cookies are small data files stored on your device. You can configure your browser to
                  refuse cookies, but this may limit certain features of the Service.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We use the following types of cookies:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Essential cookies: Required for the Service to function</li>
                  <li>Analytics cookies: Help us understand how users interact with the Service</li>
                  <li>Preference cookies: Remember your settings and preferences</li>
                  <li>Marketing cookies: Track your activity to deliver relevant advertising</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
                <p className="text-white/70 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence.
                  These countries may have data protection laws that differ from your jurisdiction. We ensure appropriate
                  safeguards are in place to protect your information in accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM is not intended for use by children under the age of 16. We do not knowingly collect personal
                  information from children under 16. If you become aware that a child has provided us with personal
                  information, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Links and Services</h2>
                <p className="text-white/70 leading-relaxed">
                  The Service may contain links to third-party websites and integrate with third-party services. We are
                  not responsible for the privacy practices of these third parties. We encourage you to read their
                  privacy policies before providing them with your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. California Privacy Rights (CCPA)</h2>
                <p className="text-white/70 leading-relaxed">
                  If you are a California resident, you have additional rights under the California Consumer Privacy Act
                  (CCPA), including the right to know what personal information we collect, use, and disclose, and the
                  right to request deletion of your personal information. We do not sell your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. European Privacy Rights (GDPR)</h2>
                <p className="text-white/70 leading-relaxed">
                  If you are located in the European Economic Area (EEA), you have rights under the General Data
                  Protection Regulation (GDPR), including the right to access, rectify, erase, restrict processing,
                  object to processing, and data portability. You also have the right to lodge a complaint with a
                  supervisory authority.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. Changes to This Privacy Policy</h2>
                <p className="text-white/70 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by
                  posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you
                  to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">15. Contact Us</h2>
                <p className="text-white/70 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                  <p className="text-white/80">
                    <strong>Email:</strong> support@smartcrm.vip<br />
                    <strong>Privacy Team:</strong> privacy@smartcrm.vip<br />
                    <strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
                  </p>
                </div>
              </section>

              <section className="border-t border-white/10 pt-6">
                <p className="text-white/60 text-sm">
                  By using Smart CRM, you acknowledge that you have read and understood this Privacy Policy and agree
                  to its terms. Thank you for trusting us with your information.
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

export default PrivacyPolicyPage;
