import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicyPage: React.FC = () => {
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
            <div className="p-3 bg-green-500/20 rounded-lg">
              <RefreshCcw size={32} className="text-green-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Refund Policy</h1>
              <p className="text-white/60 mt-2">Last Updated: October 18, 2025</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 space-y-8">

              <section>
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-400/30 mb-6">
                  <p className="text-white/80 font-semibold mb-2">30-Day Money-Back Guarantee</p>
                  <p className="text-white/70 leading-relaxed">
                    We stand behind Smart CRM with a full 30-day money-back guarantee. If you're not completely satisfied with your purchase, you can request a full refund within 30 days of your purchase date.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Refund Eligibility</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  You are eligible for a full refund if:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>You submit your refund request within 30 days of your original purchase date</li>
                  <li>You provide a valid reason for your refund request</li>
                  <li>You have not violated our Terms of Service</li>
                  <li>You have not engaged in fraudulent activity or abuse of the Service</li>
                  <li>Your account is in good standing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. How to Request a Refund</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  To request a refund, please follow these steps:
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                    <p className="text-white/80 font-semibold mb-2">Step 1: Contact Support</p>
                    <p className="text-white/70 leading-relaxed">
                      Email us at <a href="mailto:support@smartcrm.vip" className="text-blue-400 hover:underline">support@smartcrm.vip</a> with the subject line "Refund Request"
                    </p>
                  </div>

                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                    <p className="text-white/80 font-semibold mb-2">Step 2: Provide Information</p>
                    <p className="text-white/70 leading-relaxed">
                      Include your purchase order number, email address used for purchase, and a brief reason for your refund request
                    </p>
                  </div>

                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                    <p className="text-white/80 font-semibold mb-2">Step 3: Wait for Confirmation</p>
                    <p className="text-white/70 leading-relaxed">
                      Our support team will review your request within 2-3 business days and send you a confirmation email
                    </p>
                  </div>

                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                    <p className="text-white/80 font-semibold mb-2">Step 4: Receive Your Refund</p>
                    <p className="text-white/70 leading-relaxed">
                      Once approved, your refund will be processed within 5-10 business days to your original payment method
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Refund Processing Time</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Please note the following timeframes:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li><strong className="text-white/80">Review Period:</strong> 2-3 business days for refund request review and approval</li>
                  <li><strong className="text-white/80">Processing Time:</strong> 5-10 business days after approval for refund to be processed</li>
                  <li><strong className="text-white/80">Bank Processing:</strong> Additional 3-5 business days for refund to appear in your account (varies by bank)</li>
                  <li><strong className="text-white/80">Total Time:</strong> You can expect your refund within 10-18 business days from request approval</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. JVZoo Payment Processing</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Smart CRM uses JVZoo as our payment processor. Please be aware:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>All refunds are processed through JVZoo's secure payment system</li>
                  <li>Refunds will be returned to the original payment method used for purchase</li>
                  <li>JVZoo transaction fees are non-refundable as per their vendor agreement</li>
                  <li>You may receive communication from both Smart CRM and JVZoo regarding your refund</li>
                  <li>JVZoo customer service can be reached at support@jvzoo.com for payment-related questions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Conditions That Void Refund Eligibility</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Your refund request may be denied if:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>The refund request is submitted more than 30 days after purchase</li>
                  <li>You have violated our Terms of Service or acceptable use policies</li>
                  <li>You have engaged in fraudulent activity, chargebacks, or payment disputes</li>
                  <li>You have abused the refund policy with multiple refund requests</li>
                  <li>Your account has been terminated for policy violations</li>
                  <li>You have shared, resold, or distributed your access credentials</li>
                  <li>You have downloaded or exported substantial amounts of data with intent to retain</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Partial Refunds</h2>
                <p className="text-white/70 leading-relaxed">
                  We do not offer partial refunds. All refunds are processed as full refunds of the original purchase price. If you have purchased multiple products or add-ons, you must request refunds for each separately if desired, subject to the 30-day timeframe for each individual purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Chargebacks and Payment Disputes</h2>
                <div className="p-4 bg-red-500/10 rounded-lg border border-red-400/30 mb-3">
                  <p className="text-white/80 font-semibold mb-2">Important: Contact Us Before Filing a Chargeback</p>
                  <p className="text-white/70 leading-relaxed">
                    Please contact our support team before filing a chargeback with your bank or credit card company. Chargebacks are costly and time-consuming for small businesses. We have a generous refund policy and will work with you to resolve any issues.
                  </p>
                </div>
                <p className="text-white/70 leading-relaxed mb-3">
                  If you file a chargeback or payment dispute:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Your account will be immediately suspended pending investigation</li>
                  <li>You will lose access to the Service and all associated data</li>
                  <li>Future purchases may be prohibited</li>
                  <li>We reserve the right to contest illegitimate chargebacks</li>
                  <li>Legal action may be pursued for fraudulent chargebacks</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Account Termination After Refund</h2>
                <p className="text-white/70 leading-relaxed">
                  Upon approval of your refund request:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Your Smart CRM account will be deactivated</li>
                  <li>You will lose access to all features, data, and integrations</li>
                  <li>All stored data will be permanently deleted within 30 days</li>
                  <li>You are responsible for exporting any data you wish to retain before requesting a refund</li>
                  <li>We are not responsible for any data loss resulting from account termination</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Technical Issues and Support</h2>
                <p className="text-white/70 leading-relaxed">
                  If you're experiencing technical difficulties, we encourage you to contact our support team before requesting a refund. Many issues can be quickly resolved through:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Email support at support@smartcrm.vip</li>
                  <li>Accessing our help documentation and tutorials</li>
                  <li>Scheduling a support call during business hours</li>
                  <li>Troubleshooting with our technical support team</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  We're committed to your success and want to help resolve any issues you encounter.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Exceptions and Special Cases</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  The following situations may require special consideration:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li><strong className="text-white/80">Medical Emergencies:</strong> We understand life happens. Contact us to discuss your situation.</li>
                  <li><strong className="text-white/80">Service Outages:</strong> Extended service disruptions may qualify for prorated refunds or extensions.</li>
                  <li><strong className="text-white/80">Unauthorized Purchases:</strong> Report unauthorized transactions immediately for investigation.</li>
                  <li><strong className="text-white/80">Billing Errors:</strong> We will promptly correct any billing errors or duplicate charges.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Future Purchases After Refund</h2>
                <p className="text-white/70 leading-relaxed">
                  After receiving a refund:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>You are welcome to purchase Smart CRM again in the future</li>
                  <li>Previous account data cannot be restored after the 30-day deletion period</li>
                  <li>New purchases will create a fresh account with no previous history</li>
                  <li>Repeated refund requests may result in restrictions on future purchases</li>
                  <li>Abuse of the refund policy may result in permanent account restrictions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Modifications to Refund Policy</h2>
                <p className="text-white/70 leading-relaxed">
                  We reserve the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated "Last Updated" date. Your purchase is subject to the refund policy in effect at the time of purchase. We will make reasonable efforts to notify users of significant policy changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  For refund requests or questions about this policy, please contact:
                </p>
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                  <p className="text-white/80">
                    <strong>Email:</strong> support@smartcrm.vip<br />
                    <strong>Subject Line:</strong> "Refund Request" or "Refund Policy Question"<br />
                    <strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST<br />
                    <strong>Response Time:</strong> Within 24-48 hours during business days
                  </p>
                </div>
              </section>

              <section className="border-t border-white/10 pt-6">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-400/30">
                  <p className="text-white/70 text-sm">
                    <strong className="text-white">We Want You to Succeed:</strong> Our refund policy exists to give you confidence in your purchase. However, we encourage you to reach out to our support team first if you encounter any issues. We're here to help you get the most value from Smart CRM.
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

export default RefundPolicyPage;
