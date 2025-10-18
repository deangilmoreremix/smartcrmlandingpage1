import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DisclaimerPage: React.FC = () => {
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
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <AlertTriangle size={32} className="text-yellow-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Disclaimer</h1>
              <p className="text-white/60 mt-2">Last Updated: October 18, 2025</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 space-y-8">

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. General Disclaimer</h2>
                <p className="text-white/70 leading-relaxed">
                  The information provided by Smart CRM ("we," "us," or "our") on our website and through our service
                  is for general informational purposes only. All information is provided in good faith, however we make
                  no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy,
                  validity, reliability, availability, or completeness of any information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. No Professional Advice</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM is a software tool designed to assist with customer relationship management and sales
                  processes. The Service and any content provided should not be construed as professional advice,
                  including but not limited to:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Legal advice</li>
                  <li>Financial or investment advice</li>
                  <li>Business consulting advice</li>
                  <li>Tax advice</li>
                  <li>Accounting advice</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  You should consult with appropriate professionals before making any decisions based on information
                  provided through the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Results and Performance Disclaimer</h2>
                <p className="text-white/70 leading-relaxed">
                  While Smart CRM is designed to help improve sales performance and customer relationship management,
                  individual results may vary significantly. We make no guarantees regarding:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Specific revenue increases or sales improvements</li>
                  <li>Time savings or efficiency gains</li>
                  <li>Customer acquisition or retention rates</li>
                  <li>Return on investment (ROI)</li>
                  <li>Business growth or success</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  Any testimonials, case studies, or examples used in our marketing materials represent individual
                  experiences and are not guarantees of similar results. Your results will depend on many factors
                  including your business model, market conditions, effort, and execution.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. AI and Machine Learning Limitations</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM utilizes artificial intelligence and machine learning technologies to provide insights and
                  recommendations. However, you should be aware that:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>AI predictions and insights are probabilistic and not guaranteed to be accurate</li>
                  <li>Machine learning models may contain biases or errors</li>
                  <li>AI recommendations should be reviewed and validated by human judgment</li>
                  <li>AI performance depends on the quality and quantity of data provided</li>
                  <li>AI features may not be suitable for all business contexts or decisions</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  You are solely responsible for evaluating and acting upon AI-generated insights and recommendations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Integrations</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM integrates with various third-party services and platforms. We are not responsible for:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>The availability, reliability, or functionality of third-party services</li>
                  <li>Changes made by third-party providers that affect integrations</li>
                  <li>Data security practices of third-party services</li>
                  <li>Costs or fees associated with third-party services</li>
                  <li>Content or accuracy of information from third-party sources</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  You use third-party integrations at your own risk and should review their terms of service and
                  privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Lifetime Access Definition</h2>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30 mb-3">
                  <p className="text-white/80 font-semibold mb-2">Important Notice:</p>
                  <p className="text-white/70 leading-relaxed">
                    The term "lifetime access" used in our marketing and pricing refers to the lifetime of the product,
                    not the lifetime of the user or purchaser. For a software product of this nature and price point,
                    the average supported lifetime is approximately 5 years from the date of purchase.
                  </p>
                </div>
                <p className="text-white/70 leading-relaxed">
                  During this period, you will receive software updates, technical support, and access to new features.
                  We reserve the right to extend or modify the service period at our discretion with reasonable notice
                  to users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Technical Limitations</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  While we strive to provide reliable service, you acknowledge that:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>The Service may experience downtime, interruptions, or technical issues</li>
                  <li>Internet connectivity and device compatibility may affect Service performance</li>
                  <li>We cannot guarantee 100% uptime or uninterrupted access</li>
                  <li>Data transmission over the Internet is not completely secure</li>
                  <li>Software bugs or errors may occur despite quality assurance efforts</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Data Accuracy and Completeness</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM relies on data that you and your team input into the system. We are not responsible for:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Accuracy of data entered by users</li>
                  <li>Completeness of information in your CRM database</li>
                  <li>Data quality issues resulting from user error or misuse</li>
                  <li>Decisions made based on incomplete or inaccurate data</li>
                  <li>Loss of data due to user actions or external factors</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  It is your responsibility to maintain accurate and complete records within the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Legal and Regulatory Compliance</h2>
                <p className="text-white/70 leading-relaxed">
                  You are responsible for ensuring that your use of Smart CRM complies with all applicable laws,
                  regulations, and industry standards in your jurisdiction, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Data protection and privacy laws (GDPR, CCPA, etc.)</li>
                  <li>Anti-spam regulations (CAN-SPAM, CASL, etc.)</li>
                  <li>Industry-specific regulations</li>
                  <li>Employment and labor laws</li>
                  <li>Consumer protection laws</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  We do not provide legal advice regarding compliance with these requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. External Links</h2>
                <p className="text-white/70 leading-relaxed">
                  Our Service may contain links to external websites or resources. We have no control over and assume
                  no responsibility for the content, privacy policies, or practices of any third-party websites or
                  services. We do not warrant the accuracy or reliability of information on external sites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Changes and Updates</h2>
                <p className="text-white/70 leading-relaxed">
                  We reserve the right to modify, update, or discontinue any aspect of the Service at any time without
                  prior notice. Features, functionality, and pricing may change. We will make reasonable efforts to
                  notify users of significant changes that affect their use of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Support and Training</h2>
                <p className="text-white/70 leading-relaxed">
                  While we provide documentation, tutorials, and customer support, we do not guarantee:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Immediate response to support inquiries</li>
                  <li>Resolution of all technical issues</li>
                  <li>Customized training for your specific business needs</li>
                  <li>Availability of support outside of business hours</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  Support is provided as a courtesy and may be subject to availability and resource constraints.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Financial Disclaimers</h2>
                <p className="text-white/70 leading-relaxed">
                  Any pricing information provided is subject to change without notice. Promotional offers are time-limited
                  and may be modified or discontinued at any time. Refunds are subject to our refund policy and terms of
                  service. Payment processing is handled by third-party providers, and we are not responsible for their
                  policies or practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. No Guarantee of Compatibility</h2>
                <p className="text-white/70 leading-relaxed">
                  While Smart CRM is designed to work with common devices and platforms, we do not guarantee compatibility
                  with all systems, browsers, or configurations. Certain features may require specific hardware, software,
                  or Internet connectivity. It is your responsibility to ensure your systems meet the requirements for
                  using the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">15. Limitation of Liability</h2>
                <p className="text-white/70 leading-relaxed">
                  To the fullest extent permitted by law, Smart CRM shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages arising from your use of or inability to use the Service,
                  including but not limited to:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Lost profits or revenue</li>
                  <li>Lost business opportunities</li>
                  <li>Data loss or corruption</li>
                  <li>Business interruption</li>
                  <li>Costs of procurement of substitute services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">16. User Responsibility</h2>
                <p className="text-white/70 leading-relaxed">
                  By using Smart CRM, you acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>You are solely responsible for your use of the Service</li>
                  <li>You will use the Service in compliance with all applicable laws</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You will not misuse the Service or use it for illegal purposes</li>
                  <li>You will regularly back up important data</li>
                  <li>You understand the limitations and risks associated with the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">17. JVZoo Vendor Information</h2>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30 mb-4">
                  <p className="text-white/80 font-semibold mb-2">Payment Processor and Marketplace</p>
                  <p className="text-white/70 leading-relaxed mb-3">
                    Smart CRM is sold through JVZoo, a reputable affiliate marketplace and payment processor. JVZoo handles all payment processing, transaction security, and affiliate commission distribution.
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                    <li>All purchases are processed securely through JVZoo's encrypted payment system</li>
                    <li>JVZoo maintains PCI DSS compliance for payment security</li>
                    <li>Transaction records and receipts are provided by JVZoo</li>
                    <li>Refund requests are processed through JVZoo's system</li>
                    <li>For payment-related questions, you may contact JVZoo support at support@jvzoo.com</li>
                  </ul>
                </div>
                <p className="text-white/70 leading-relaxed">
                  By purchasing Smart CRM through JVZoo, you agree to JVZoo's Terms of Service and Privacy Policy in addition to Smart CRM's terms. Smart CRM is not responsible for JVZoo's policies, practices, or service availability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">18. Affiliate Program Disclosure</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Smart CRM operates an affiliate program through JVZoo. This means:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Affiliates receive commissions for referring customers to Smart CRM</li>
                  <li>If you were referred by an affiliate, they receive compensation for your purchase</li>
                  <li>Affiliate commissions do not increase your purchase price</li>
                  <li>We cannot control affiliate marketing claims or representations</li>
                  <li>You should verify all claims independently before purchasing</li>
                  <li>See our <Link to="/affiliate-disclosure" className="text-blue-400 hover:underline">Affiliate Disclosure</Link> for complete information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">19. FTC Compliance Notice</h2>
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30">
                  <p className="text-white/80 font-semibold mb-2">Federal Trade Commission Requirements</p>
                  <p className="text-white/70 leading-relaxed">
                    In compliance with Federal Trade Commission (FTC) regulations, Smart CRM provides clear and conspicuous disclosures regarding earnings claims, affiliate relationships, and typical results. All testimonials, case studies, and success stories represent exceptional outcomes and are not typical. See our <Link to="/earnings-disclaimer" className="text-blue-400 hover:underline">Earnings Disclaimer</Link> for detailed information about expected results and FTC compliance.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">20. Contact Information</h2>
                <p className="text-white/70 leading-relaxed">
                  If you have any questions about this Disclaimer, please contact us:
                </p>
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                  <p className="text-white/80">
                    <strong>Email:</strong> support@smartcrm.vip<br />
                    <strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST<br />
                    <strong>Payment Processor:</strong> JVZoo (support@jvzoo.com)<br />
                    <strong>Refund Policy:</strong> <Link to="/refund-policy" className="text-blue-400 hover:underline">30-Day Money-Back Guarantee</Link>
                  </p>
                </div>
              </section>

              <section className="border-t border-white/10 pt-6">
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30">
                  <p className="text-white/70 text-sm">
                    <strong className="text-white">Important:</strong> This disclaimer is part of our Terms of Service.
                    By using Smart CRM, you acknowledge that you have read, understood, and agree to this Disclaimer.
                    If you do not agree with any part of this Disclaimer, you should not use the Service.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default DisclaimerPage;
