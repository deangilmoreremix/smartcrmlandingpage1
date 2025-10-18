import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EarningsDisclaimerPage: React.FC = () => {
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
              <DollarSign size={32} className="text-yellow-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Earnings Disclaimer</h1>
              <p className="text-white/60 mt-2">Last Updated: October 18, 2025</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 space-y-8">

              <section>
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30 mb-6">
                  <p className="text-white/80 font-bold text-lg mb-3">REQUIRED FTC EARNINGS DISCLOSURE</p>
                  <p className="text-white/70 leading-relaxed">
                    The Federal Trade Commission (FTC) requires that we clearly disclose what you can reasonably expect in terms of earnings or income when using Smart CRM. The truth is that most people who purchase software, training programs, or business tools will not achieve any significant results or income. Your individual results will vary and depend on many factors unique to you, including your background, dedication, desire, motivation, actions, market conditions, and business experience.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. No Guaranteed Results</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Smart CRM is a customer relationship management software tool. While we provide powerful features designed to help improve your sales process, we make absolutely no guarantee regarding:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Increased revenue or sales</li>
                  <li>Improved conversion rates</li>
                  <li>Customer acquisition numbers</li>
                  <li>Time savings or efficiency improvements</li>
                  <li>Return on investment (ROI)</li>
                  <li>Business growth or profitability</li>
                  <li>Achievement of any specific business goals</li>
                  <li>Success in any particular market or industry</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Individual Results Will Vary</h2>
                <div className="p-4 bg-red-500/10 rounded-lg border border-red-400/30 mb-4">
                  <p className="text-white/80 font-semibold mb-2">Critical Notice</p>
                  <p className="text-white/70 leading-relaxed">
                    Any claims of specific income, revenue increases, or success stories featured on our website, in our marketing materials, in testimonials, or in case studies are NOT typical results. These represent exceptional outcomes from users who applied extraordinary effort, had favorable market conditions, or possessed unique advantages in their businesses.
                  </p>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Your results will depend entirely on numerous factors, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Your existing business model and market position</li>
                  <li>The quality of your products or services</li>
                  <li>Your sales skills and business experience</li>
                  <li>The time and effort you invest in using Smart CRM</li>
                  <li>Your ability to effectively implement the features</li>
                  <li>Current market conditions in your industry</li>
                  <li>Competition in your market</li>
                  <li>Economic factors beyond anyone's control</li>
                  <li>Your existing customer base and relationships</li>
                  <li>Your marketing effectiveness and budget</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Typical Results Statement</h2>
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30">
                  <p className="text-white/80 font-bold mb-3">TYPICAL PURCHASER RESULTS</p>
                  <p className="text-white/70 leading-relaxed mb-3">
                    The typical purchaser of Smart CRM or similar business software will experience one of the following outcomes:
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                    <li><strong className="text-white/80">No Implementation:</strong> Many purchasers never fully implement the software or only use basic features, resulting in little to no measurable improvement.</li>
                    <li><strong className="text-white/80">Minimal Usage:</strong> Some users implement the software but do not consistently use it or integrate it into their daily workflow, seeing limited results.</li>
                    <li><strong className="text-white/80">No Revenue Increase:</strong> The majority of users may see organizational benefits but experience no significant increase in revenue or sales.</li>
                    <li><strong className="text-white/80">Variable Outcomes:</strong> A small percentage of dedicated users who fully commit to implementation may see modest improvements in efficiency or sales processes.</li>
                  </ul>
                  <p className="text-white/70 leading-relaxed mt-3">
                    These typical results are significantly different from any success stories, testimonials, or case studies you may see in our marketing materials.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Testimonials and Case Studies</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Any testimonials, case studies, success stories, or examples of results featured on our website or in our marketing materials:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Represent exceptional and non-typical outcomes</li>
                  <li>Are not guarantees or predictions of your results</li>
                  <li>May not reflect the experience of typical users</li>
                  <li>Were achieved through extraordinary effort, skill, or favorable circumstances</li>
                  <li>Cannot be independently verified in all cases</li>
                  <li>May have been influenced by factors unrelated to Smart CRM</li>
                  <li>Should not be relied upon as the basis for your purchasing decision</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  Some testimonials may have been provided in exchange for compensation, free products, or other incentives. While we believe all testimonials to be honest opinions, they reflect individual experiences that may not be typical.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. No Income Claims or Projections</h2>
                <p className="text-white/70 leading-relaxed">
                  Unless explicitly stated otherwise, Smart CRM makes no income claims, revenue projections, or earnings promises. Any numbers, statistics, or percentages mentioned in our marketing materials are:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Provided for illustrative or educational purposes only</li>
                  <li>Not intended as predictions of your results</li>
                  <li>Not guarantees of performance or outcomes</li>
                  <li>Subject to the limitations described in this disclaimer</li>
                  <li>Examples of what is possible, not what is typical or likely</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Your Responsibility for Results</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  You acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Smart CRM is a tool that requires your active participation and effort</li>
                  <li>Results depend entirely on your actions, not the software alone</li>
                  <li>No software can guarantee business success or income</li>
                  <li>You are solely responsible for your business decisions and outcomes</li>
                  <li>We are not responsible for your success or failure in business</li>
                  <li>You should conduct your own due diligence before making business decisions</li>
                  <li>Professional advice should be sought for financial, legal, or business planning</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Risk Factors</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Using Smart CRM involves inherent business risks, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li><strong className="text-white/80">Financial Risk:</strong> The cost of the software may not be recouped through increased revenue</li>
                  <li><strong className="text-white/80">Time Investment:</strong> Learning and implementing the software requires time that could be spent on other activities</li>
                  <li><strong className="text-white/80">Opportunity Cost:</strong> Choosing Smart CRM means not choosing alternative solutions or approaches</li>
                  <li><strong className="text-white/80">Market Risk:</strong> External market conditions may prevent success regardless of tools used</li>
                  <li><strong className="text-white/80">Technology Risk:</strong> Technical issues, compatibility problems, or learning curves may impact results</li>
                  <li><strong className="text-white/80">Implementation Risk:</strong> Incorrect or incomplete implementation may not yield desired outcomes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Forward-Looking Statements</h2>
                <p className="text-white/70 leading-relaxed">
                  Any statements about future features, capabilities, or potential outcomes are forward-looking statements that involve risks and uncertainties. Actual results may differ materially from those projected. We cannot guarantee that planned features will be implemented as described or that they will provide any particular benefit to your business.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. AI and Predictive Features Disclaimer</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  Smart CRM includes AI and machine learning features that provide predictions, insights, and recommendations. You should understand that:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>AI predictions are probabilistic and not guaranteed to be accurate</li>
                  <li>Past performance data does not guarantee future results</li>
                  <li>AI recommendations should be validated with human judgment</li>
                  <li>Machine learning models can produce errors or biases</li>
                  <li>AI performance depends on data quality and quantity</li>
                  <li>Relying solely on AI recommendations without critical thinking may lead to poor decisions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Industry and Market Variations</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM is designed to work across various industries and markets. However, results will vary significantly based on:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Industry-specific factors and regulations</li>
                  <li>Market maturity and competition levels</li>
                  <li>Geographic location and economic conditions</li>
                  <li>Target customer demographics and behaviors</li>
                  <li>Seasonal business fluctuations</li>
                  <li>Industry best practices and standards</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  What works in one industry or market may not translate to another. You should assess whether Smart CRM is appropriate for your specific situation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Due Diligence Recommendation</h2>
                <p className="text-white/70 leading-relaxed">
                  Before purchasing Smart CRM, we strongly encourage you to:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>Carefully evaluate whether the software meets your specific needs</li>
                  <li>Review our demo and documentation thoroughly</li>
                  <li>Consider your available time and resources for implementation</li>
                  <li>Assess your current business situation realistically</li>
                  <li>Consult with business advisors or mentors if appropriate</li>
                  <li>Make an informed decision based on facts, not hype or emotion</li>
                  <li>Have realistic expectations about what software can and cannot do</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. FTC Compliance Statement</h2>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                  <p className="text-white/80 font-semibold mb-2">Federal Trade Commission Requirements</p>
                  <p className="text-white/70 leading-relaxed">
                    This earnings disclaimer is provided in compliance with Federal Trade Commission (FTC) regulations requiring clear and conspicuous disclosure of typical results and the limitations of any income or earnings claims. The FTC requires that we inform you that the experiences shared by any testimonials are not typical, that most consumers will not achieve the same or similar results, and that these experiences should not be construed as a promise or guarantee of earnings.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Business Risk Acknowledgment</h2>
                <p className="text-white/70 leading-relaxed">
                  By purchasing and using Smart CRM, you acknowledge that:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                  <li>All business ventures involve risk and uncertainty</li>
                  <li>Success in business requires hard work, dedication, and often years of effort</li>
                  <li>There are no shortcuts to building a successful business</li>
                  <li>Software is only a tool and cannot replace sound business fundamentals</li>
                  <li>You may lose money, time, or opportunities despite using Smart CRM</li>
                  <li>Past success does not guarantee future results</li>
                  <li>Market conditions can change rapidly and unpredictably</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. No Professional Advice</h2>
                <p className="text-white/70 leading-relaxed">
                  Smart CRM and its creators do not provide financial, legal, tax, accounting, or business consulting advice. Any information provided through the software, documentation, or support is for general informational purposes only. You should consult with qualified professionals before making significant business, financial, or legal decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">15. Modifications to This Disclaimer</h2>
                <p className="text-white/70 leading-relaxed">
                  We reserve the right to modify this Earnings Disclaimer at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of Smart CRM after changes are posted constitutes acceptance of the modified disclaimer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">16. Questions and Contact</h2>
                <p className="text-white/70 leading-relaxed mb-3">
                  If you have questions about this Earnings Disclaimer or need clarification, please contact:
                </p>
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                  <p className="text-white/80">
                    <strong>Email:</strong> support@smartcrm.vip<br />
                    <strong>Subject Line:</strong> "Earnings Disclaimer Question"<br />
                    <strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
                  </p>
                </div>
              </section>

              <section className="border-t border-white/10 pt-6">
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30">
                  <p className="text-white/70 text-sm leading-relaxed">
                    <strong className="text-white">Final Statement:</strong> This earnings disclaimer is legally required and designed to protect you, the consumer, by ensuring you have realistic expectations. We want you to make an informed decision about purchasing Smart CRM. If you cannot accept the risk that you may not achieve any significant results or income increase, please do not purchase this product. Your purchase indicates that you have read, understood, and agreed to this Earnings Disclaimer.
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

export default EarningsDisclaimerPage;
