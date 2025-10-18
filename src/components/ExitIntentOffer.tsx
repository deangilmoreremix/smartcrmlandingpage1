import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Star, Lock, ArrowRight } from "lucide-react";
import JVZooBuyButton from "./JVZooBuyButton";
import JVZooNoThanksButton from "./JVZooNoThanksButton";

interface ExitIntentOfferProps {
  couponCode?: string;
  oncePerHours?: number;
  showOnMobile?: boolean;
  minTimeOnPage?: number;
  onAccept?: () => void;
}

const ExitIntentOffer: React.FC<ExitIntentOfferProps> = ({
  couponCode = "SMARTCRM VIP",
  oncePerHours = 24,
  showOnMobile = true,
  minTimeOnPage = 5,
  onAccept,
}) => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canTrigger, setCanTrigger] = useState(false);
  const dismissTimer = useRef<NodeJS.Timeout>();

  // Check if we should show based on localStorage
  const shouldShow = () => {
    if (typeof window === "undefined") return false;

    const lastShown = localStorage.getItem("exitIntentShown");
    if (!lastShown) return true;

    const hoursSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60);
    return hoursSinceShown >= oncePerHours;
  };

  // Set minimum time on page before exit intent can trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanTrigger(true);
    }, minTimeOnPage * 1000);

    return () => clearTimeout(timer);
  }, [minTimeOnPage]);

  // Handle mouse leave (exit intent)
  useEffect(() => {
    if (!shouldShow() || !canTrigger) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0 && !show) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [oncePerHours, canTrigger, show]);

  const handleCopy = async () => {
    // Check if clipboard API is supported
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      console.warn("Clipboard API not supported");
      return;
    }

    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback: try to use document.execCommand for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = couponCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Fallback copy also failed:", fallbackErr);
      }
    }
  };

  const accept = () => {
    localStorage.setItem("exitIntentShown", Date.now().toString());
    setShow(false);
    if (onAccept) onAccept();
  };

  const closeModal = (dismissed = false) => {
    setShow(false);
    if (dismissed) {
      localStorage.setItem("exitIntentShown", Date.now().toString());
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={() => closeModal()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-b from-black via-blue-950 to-black rounded-2xl border border-blue-500/30 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => closeModal()}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            aria-label="Close offer modal"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center bg-orange-500/20 rounded-full px-4 py-2 mb-4 backdrop-blur-md border border-orange-500/30"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="text-orange-400 mr-2" size={18} />
                <span className="text-white font-medium">SmartCRM VIP Exclusive Offer</span>
              </motion.div>

              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                "The World's First AI-Powered CRM That Does The Selling For You"
              </h2>

              <p className="text-xl text-white/80 mb-4">
                <span className="font-semibold text-orange-400">Normally $999</span>, today you can unlock every feature for only{" "}
                <span className="font-bold text-green-400">$97 one-time</span> with instant coupon code: <strong className="text-blue-400">{couponCode}</strong>
              </p>

              <JVZooBuyButton>
                <motion.button
                  onClick={accept}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-full font-bold text-lg shadow-lg shadow-orange-600/30"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                >
                  <span>Claim My SmartCRM VIP Deal Now</span>
                  <ArrowRight className="ml-2" size={20} />
                </motion.button>
              </JVZooBuyButton>
            </div>

            {/* Problem Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 text-center">The Problem With Traditional CRMs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Salesforce", cost: "up to $330 per user, per month", issue: "Still requires paid add-ons" },
                  { name: "HubSpot Enterprise", cost: "$150+ per user, per month", issue: "Complex and expensive" },
                  { name: "Pipedrive Ultimate", cost: "$79 per user, per month", issue: "Limited AI capabilities" },
                  { name: "Keap", cost: "$249+ per month", issue: "Just for 1,500 contacts" }
                ].map((crm, idx) => (
                  <motion.div
                    key={crm.name}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <h4 className="font-semibold text-red-400 mb-1">{crm.name}</h4>
                    <p className="text-white/70 text-sm">{crm.cost}</p>
                    <p className="text-white/60 text-xs mt-1">{crm.issue}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-white/80 mt-4">
                <strong className="text-red-400">And yet, these CRMs leave out the #1 thing your business actually needs:</strong><br/>
                AI that works FOR you, not against you.
              </p>
            </div>

            {/* Solution Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 text-center">The SmartCRM Solution</h3>
              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-500/30">
                <p className="text-white/80 text-center mb-4">
                  SmartCRM combines world-class CRM tools with GPT-5 powered AI that writes, analyzes, forecasts, and even takes action for you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">No per-user pricing</div>
                    <div className="text-white/60 text-sm">One flat rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">No hidden add-ons</div>
                    <div className="text-white/60 text-sm">Everything included</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">One-time lifetime access</div>
                    <div className="text-white/60 text-sm">Pay once, use forever</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Feature Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-white/20 rounded-lg">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="border border-white/20 p-3 text-left text-white font-semibold">Feature</th>
                      <th className="border border-white/20 p-3 text-center text-green-400 font-semibold">SmartCRM ($97)</th>
                      <th className="border border-white/20 p-3 text-center text-white/60">Salesforce</th>
                      <th className="border border-white/20 p-3 text-center text-white/60">HubSpot</th>
                      <th className="border border-white/20 p-3 text-center text-white/60">Pipedrive</th>
                      <th className="border border-white/20 p-3 text-center text-white/60">Keap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Dashboard, Contacts, Pipeline", "✅ Included", "✅", "✅", "✅", "✅"],
                      ["AI KPI Cards & Forecasting", "✅ Built-in", "❌ Enterprise only", "❌ Enterprise only", "❌ No", "❌ No"],
                      ["AI Contact Scoring & Enrichment", "✅ GPT-5 + Gemini", "❌ Add-on", "❌ Add-on", "❌ No", "❌ No"],
                      ["AI Deal Intelligence", "✅ Built-in", "❌ Enterprise", "❌ Enterprise", "❌ No", "❌ No"],
                      ["AI Calendar & Scheduling", "✅ Smart optimization", "❌ Basic", "❌ Basic", "❌ No", "❌ Basic"],
                      ["AI Tools (40+)", "✅ All included", "❌ Add-ons", "❌ Add-ons", "❌ No", "❌ No"],
                      ["Sales Tools (10 modules)", "✅ Included", "❌ Enterprise", "❌ Enterprise", "❌ No", "❌ No"],
                      ["Communication Suite", "✅ Included", "❌ Add-ons", "❌ Add-ons", "❌ Add-ons", "❌ Limited"],
                      ["Business Intelligence", "✅ Included", "❌ Enterprise", "❌ Enterprise", "❌ No", "❌ No"],
                      ["Gamification & Leaderboards", "✅ Included", "❌ No", "❌ No", "❌ No", "❌ No"],
                      ["Lifetime Pricing", "✅ $97 one-time", "❌ No", "❌ No", "❌ No", "❌ No"],
                      ["Highest Plan Cost", "❌ $97 one-time", "$330/user/mo", "$150+/user/mo", "$79/user/mo", "$249+/mo"]
                    ].map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white/5" : ""}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="border border-white/20 p-3 text-center text-sm">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* What You Get */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 text-center">What You Get With SmartCRM</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Dashboard 📊 – AI-powered KPIs, forecasting, and executive insights",
                  "Contacts 👥 – AI enrichment, scoring, and relationship mapping",
                  "Pipeline 💼 – Multi-view deal management with AI win/loss predictions",
                  "AI Tools Suite 🧠 (40+ Modules) – Email Composer, Objection Handler, Proposal Generator...",
                  "Sales Maximizer Suite 💰 (10 Modules) – Deal Risk Monitor, Conversion Insights...",
                  "Communication Suite 📞 – Video Email, SMS, Phone System, Invoicing...",
                  "Business Intelligence 📈 – 35+ advanced research and analytics tools",
                  "Gamification 🎮 – Team leaderboards, streaks, and achievements",
                  "Unlimited AI Add-On 🔥 – Available upgrade for heavy users"
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-green-500/30 p-3 bg-green-500/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Check className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-white/90 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Pricing Breakdown</h3>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-white/60">Normal Value</div>
                      <div className="text-2xl font-bold text-white line-through">$999</div>
                      <div className="text-xs text-white/60">One-Time</div>
                    </div>
                    <ArrowRight className="text-white/40" size={24} />
                    <div className="text-center">
                      <div className="text-sm text-green-400 font-semibold">Today Only</div>
                      <div className="text-4xl font-bold text-green-400">$97</div>
                      <div className="text-xs text-white/60">One-Time</div>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">
                    Coupon Code: <strong className="text-blue-400">{couponCode}</strong> (applied instantly at checkout)
                  </p>
                  <p className="text-white/60 text-sm">
                    That's less than 1/3 of one month of Salesforce... yet you get lifetime access.
                  </p>
                </div>
              </div>
            </div>

            {/* Bonuses */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 text-center">🎁 Bonus Section</h3>
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/30">
                <p className="text-white/80 text-center mb-4">When you act today, you'll also get:</p>
                <div className="space-y-3">
                  {[
                    "✅ Instant AI Credits: 100 included to test AI across contacts, pipeline, and calendar",
                    "✅ Training Access: Step-by-step onboarding to get your first leads & sales",
                    "✅ VIP Support: Priority chat & email support"
                  ].map((bonus, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="text-green-400 flex-shrink-0" size={16} />
                      <span className="text-white/90">{bonus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Urgency */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-500/30">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">⏰ Limited Time Offer</h3>
                  <p className="text-white/80 mb-4">
                    <strong className="text-red-400">Warning:</strong> This VIP deal is only available for the first 100 early access users.
                  </p>
                  <p className="text-white/60 text-sm">
                    After that, SmartCRM reverts to the regular $999 one-time license.
                  </p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                "Stop Paying $330/Month For Old CRMs — Get SmartCRM For Just $97 One-Time Today!"
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <JVZooBuyButton>
                  <motion.button
                    onClick={accept}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full font-bold text-lg shadow-lg shadow-green-600/30"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                  >
                    <span>Claim My SmartCRM VIP Deal Now</span>
                    <ArrowRight className="ml-2" size={20} />
                  </motion.button>
                </JVZooBuyButton>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium border border-white/20"
                  type="button"
                >
                  {copied ? "✅ Copied!" : `📋 Copy ${couponCode}`}
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" size={16} />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="text-green-400" size={16} />
                  <span>Secure checkout • No recurring fees</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-4">
              <div className="flex items-center justify-between w-full">
                <a
                  href="https://www.jvzoo.com/nothanks/426193"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white/70 underline-offset-2 hover:underline"
                  style={{ textDecoration: 'none' }}
                >
                  No thanks — I'll pay full price later
                </a>
                <button
                  onClick={() => closeModal()}
                  className="rounded-lg px-3 py-2 text-sm text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExitIntentOffer;