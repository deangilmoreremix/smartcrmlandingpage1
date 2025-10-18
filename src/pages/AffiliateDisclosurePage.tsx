import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AffiliateDisclosurePage: React.FC = () => {
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
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Users size={32} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Affiliate Disclosure</h1>
              <p className="text-white/60 mt-2">Last Updated: October 18, 2025</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 space-y-8">

              <section>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30 mb-6">
                  <p className="text-white/80 font-bold text-lg mb-3">FTC AFFILIATE DISCLOSURE</p>
                  <p className="text-white/70 leading-relaxed">
                    In accordance with Federal Trade Commission (FTC) guidelines, we are required to disclose any material connections between Smart CRM and third-party products, services, or companies that we recommend or link to. This disclosure ensures transparency about potential financial relationships that could influence our recommendations.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. What is an Affiliate Relationship?</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  An affiliate relationship exists when we receive compensation for recommending or linking to third-party products, services, or companies. This compensation may take various forms, including:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Commission payments when you purchase through our links</li>
                  <li>Referral fees for sending traffic to partner websites</li>
                  <li>Revenue sharing arrangements</li>
                  <li>Free products or services in exchange for reviews or mentions</li>
                  <li>Discounts, bonuses, or other incentives</li>
                  <li>Reciprocal promotion arrangements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Our Affiliate Relationships</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Smart CRM maintains affiliate relationships with various third-party service providers that integrate with or complement our platform. These may include:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li><strong className="text-white/80">Email Marketing Services:</strong> Email automation and marketing platforms</li>
                  <li><strong className="text-white/80">Payment Processors:</strong> Services that handle payment transactions</li>
                  <li><strong className="text-white/80">Communication Tools:</strong> Phone systems, messaging apps, and video conferencing</li>
                  <li><strong className="text-white/80">Analytics Platforms:</strong> Data analysis and reporting tools</li>
                  <li><strong className="text-white/80">Integration Services:</strong> Zapier, Make.com, and similar automation platforms</li>
                  <li><strong className="text-white/80">Training Resources:</strong> Educational materials, courses, or consulting services</li>
                  <li><strong className="text-white/80">Business Tools:</strong> Other software or services that complement Smart CRM</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. JVZoo Affiliate Program</h2>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-400/30 mb-4">
                  <p className="text-white/80 font-semibold mb-2">Important Notice</p>
                  <p className="text-white/70 leading-relaxed">
                    Smart CRM is sold through JVZoo, an affiliate marketplace. This means that affiliates who promote Smart CRM receive commissions on sales generated through their referral links. If you were referred to Smart CRM by an affiliate, they will receive compensation for your purchase.
                  </p>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Additionally, Smart CRM may act as an affiliate for other products or services sold on JVZoo or similar platforms. When we recommend products through affiliate links, we may receive a commission if you make a purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. How to Identify Affiliate Links</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  We strive to clearly identify affiliate relationships. You may encounter affiliate links:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>In our website content, blog posts, or resource pages</li>
                  <li>In email communications and newsletters</li>
                  <li>In training materials or documentation</li>
                  <li>In recommended integrations or partner listings</li>
                  <li>In webinars, videos, or other educational content</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  Affiliate links may be disclosed with statements such as "affiliate link," "partner link," or similar language near the link itself. However, you should assume that any third-party product or service recommendation may include an affiliate relationship.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Our Recommendation Standards</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Despite our affiliate relationships, we maintain strict standards for recommendations:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/80 font-semibold mb-1">Genuine Experience</p>
                    <p className="text-white/70 text-sm">
                      We only recommend products or services that we have personally used, tested, or thoroughly researched.
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/80 font-semibold mb-1">Honest Opinions</p>
                    <p className="text-white/70 text-sm">
                      Our reviews and recommendations reflect our honest opinions, including both benefits and limitations.
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/80 font-semibold mb-1">Value-Based Selection</p>
                    <p className="text-white/70 text-sm">
                      We recommend products based on their value to you, not solely on commission rates.
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/80 font-semibold mb-1">No False Claims</p>
                    <p className="text-white/70 text-sm">
                      We do not make exaggerated or false claims about affiliate products to increase sales.
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/80 font-semibold mb-1">Alternative Options</p>
                    <p className="text-white/70 text-sm">
                      When appropriate, we mention alternative solutions, including non-affiliate options.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Your Purchasing Decision</h2>
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30 mb-3">
                  <p className="text-white/80 font-semibold mb-2">No Obligation to Purchase</p>
                  <p className="text-white/70 leading-relaxed">
                    You are never obligated to purchase any product or service through our affiliate links. The existence of an affiliate relationship does not change the price you pay for products or services in most cases.
                  </p>
                </div>
                <p className="text-white/70 leading-relaxed">
                  We encourage you to:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Conduct your own research before making any purchase</li>
                  <li>Compare multiple options and read independent reviews</li>
                  <li>Evaluate whether a product meets your specific needs</li>
                  <li>Consider your budget and return on investment</li>
                  <li>Read the terms, conditions, and refund policies of any product</li>
                  <li>Make informed decisions based on your unique situation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Commission Structure and Pricing</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Important information about affiliate commissions:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li><strong className="text-white/80">No Price Increase:</strong> In most cases, you pay the same price whether you use an affiliate link or purchase directly. The commission comes from the seller's revenue, not an additional charge to you.</li>
                  <li><strong className="text-white/80">Variable Commissions:</strong> Commission rates vary by product and affiliate program, typically ranging from 5% to 50% of the sale price.</li>
                  <li><strong className="text-white/80">Recurring Commissions:</strong> For subscription products, we may receive ongoing commissions for as long as you remain a customer.</li>
                  <li><strong className="text-white/80">Cookie Duration:</strong> Affiliate cookies may track your activity for periods ranging from 24 hours to 90 days or longer, depending on the program.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Integrations</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM integrates with various third-party services to provide enhanced functionality. Some of these integrations involve affiliate relationships. When you connect third-party services to Smart CRM through our platform, we may receive compensation if you subsequently purchase or upgrade those services. However, the integration functionality itself is provided regardless of any affiliate relationship.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Sponsored Content and Partnerships</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  In addition to traditional affiliate relationships, Smart CRM may engage in:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li><strong className="text-white/80">Sponsored Content:</strong> Articles, videos, or resources created in partnership with third parties in exchange for compensation</li>
                  <li><strong className="text-white/80">Strategic Partnerships:</strong> Mutually beneficial business relationships that may include cross-promotion or revenue sharing</li>
                  <li><strong className="text-white/80">Co-Marketing Agreements:</strong> Joint marketing efforts with complementary products or services</li>
                  <li><strong className="text-white/80">Referral Programs:</strong> Compensation for referring customers to partner businesses</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  All sponsored content and partnerships will be clearly disclosed at the time of publication or presentation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Testimonials and Reviews</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  When we feature testimonials, case studies, or reviews of third-party products or services:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>We disclose if the reviewer received compensation or free products</li>
                  <li>We indicate if an affiliate relationship exists with the reviewed product</li>
                  <li>We maintain editorial integrity and do not allow compensation to influence dishonest reviews</li>
                  <li>We encourage honest feedback, including potential drawbacks or limitations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Affiliate Relationships</h2>
                <p className="text-white/70 leading-relaxed">
                  Our affiliate relationships may change over time. We may:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Enter into new affiliate agreements with additional partners</li>
                  <li>Terminate existing affiliate relationships</li>
                  <li>Modify commission structures or partnership terms</li>
                  <li>Promote new products or discontinue promoting others</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  This disclosure page will be updated to reflect material changes, but the current version applies to all affiliate links present on our site at any given time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Your Privacy and Data</h2>
                <p className="text-white/70 leading-relaxed">
                  When you click affiliate links:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Cookies may be placed on your device to track the referral</li>
                  <li>The affiliate network and merchant may collect information about your visit</li>
                  <li>Your purchase information may be shared with us for commission tracking</li>
                  <li>Personal information is handled according to the merchant's privacy policy</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  For more information about how we handle data, please review our <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Support for Affiliate Products</h2>
                <p className="text-white/70 leading-relaxed">
                  While we may recommend affiliate products, please note:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>We are not responsible for the performance, quality, or support of third-party products</li>
                  <li>Support requests should be directed to the product vendor, not Smart CRM</li>
                  <li>Refunds or disputes regarding affiliate products must be handled with the seller</li>
                  <li>We cannot guarantee availability, pricing, or features of affiliate products</li>
                  <li>Terms and conditions of affiliate products are set by their respective vendors</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. FTC Compliance Commitment</h2>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                  <p className="text-white/80 font-semibold mb-2">Federal Trade Commission Guidelines</p>
                  <p className="text-white/70 leading-relaxed">
                    Smart CRM is committed to full compliance with Federal Trade Commission (FTC) guidelines regarding endorsements, testimonials, and affiliate disclosures. We believe in transparent business practices and ethical marketing. This disclosure is provided pursuant to FTC 16 CFR Part 255, which requires disclosure of material connections between advertisers and endorsers.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">15. Questions About Affiliate Relationships</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  If you have questions about our affiliate relationships or want to know if a specific link is an affiliate link, please contact us:
                </p>
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                  <p className="text-white/80">
                    <strong>Email:</strong> support@smartcrm.vip<br />
                    <strong>Subject Line:</strong> "Affiliate Disclosure Question"<br />
                    <strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
                  </p>
                </div>
                <p className="text-white/70 leading-relaxed mt-4">
                  We are happy to provide information about any affiliate relationships that may apply to products or services we recommend.
                </p>
              </section>

              <section className="border-t border-white/10 pt-6">
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-400/30">
                  <p className="text-white/70 text-sm leading-relaxed">
                    <strong className="text-white">Transparency Commitment:</strong> We believe that transparency builds trust. While affiliate relationships provide compensation that helps support Smart CRM and allows us to offer resources at no cost to you, we never compromise our integrity or recommend products solely for financial gain. Your trust is more valuable than any commission. This disclosure ensures you can make informed decisions with full knowledge of any financial relationships that may exist.
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

export default AffiliateDisclosurePage;
