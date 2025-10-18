export interface CompetitorData {
  feature: string;
  smartcrm: string | boolean;
  salesforce: string | boolean;
  hubspot: string | boolean;
  pipedrive: string | boolean;
  keap: string | boolean;
  category?: string;
}

export const competitorComparisonData: CompetitorData[] = [
  {
    feature: "Core CRM (Dashboard, Contacts, Pipeline)",
    smartcrm: "✅ All-in-one",
    salesforce: true,
    hubspot: true,
    pipedrive: true,
    keap: true,
    category: "core"
  },
  {
    feature: "AI KPI Cards & Predictive Analytics",
    smartcrm: "✅ Included",
    salesforce: "❌ Enterprise only",
    hubspot: "❌ Enterprise only",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "ai"
  },
  {
    feature: "Contact Scoring & Enrichment (AI-powered)",
    smartcrm: "✅ Multi-model GPT-5 + Gemini",
    salesforce: "❌ Add-on",
    hubspot: "❌ Add-on",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "ai"
  },
  {
    feature: "Deal Intelligence (AI win/loss, forecasting, risk scoring)",
    smartcrm: "✅ Built-in",
    salesforce: "❌ Enterprise",
    hubspot: "❌ Enterprise",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "ai"
  },
  {
    feature: "Multi-View Pipeline (Kanban, Calendar, Timeline, Table, Dashboard)",
    smartcrm: "✅ All included",
    salesforce: "❌ Limited",
    hubspot: "❌ Limited",
    pipedrive: "❌ Kanban only",
    keap: "❌ Limited",
    category: "core"
  },
  {
    feature: "AI Calendar & Smart Scheduling",
    smartcrm: "✅ Advanced AI optimization",
    salesforce: "❌ Basic",
    hubspot: "❌ Basic",
    pipedrive: "❌ No",
    keap: "❌ Basic",
    category: "ai"
  },
  {
    feature: "AI Tools Suite (40+ tools)",
    smartcrm: "✅ Included",
    salesforce: "❌ Add-ons required",
    hubspot: "❌ Add-ons required",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "ai"
  },
  {
    feature: "Proposal, Email & Objection Generators",
    smartcrm: "✅ Yes",
    salesforce: "❌ No",
    hubspot: "❌ No",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "ai"
  },
  {
    feature: "Semantic Search & Vision Analyzer",
    smartcrm: "✅ Yes",
    salesforce: "❌ No",
    hubspot: "❌ No",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "ai"
  },
  {
    feature: "Real-Time Streaming AI Chat",
    smartcrm: "✅ Yes",
    salesforce: "❌ No",
    hubspot: "❌ No",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "ai"
  },
  {
    feature: "AI Function Assistant (AI that takes action)",
    smartcrm: "✅ Yes",
    salesforce: "❌ No",
    hubspot: "❌ No",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "ai"
  },
  {
    feature: "Sales Maximizer Suite (10 tools)",
    smartcrm: "✅ Included",
    salesforce: "❌ Enterprise",
    hubspot: "❌ Enterprise",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "sales"
  },
  {
    feature: "Communication Tools",
    smartcrm: "✅ Video Email, SMS, Phone, Invoicing, Prospecting",
    salesforce: "❌ Add-ons",
    hubspot: "❌ Add-ons",
    pipedrive: "❌ No",
    keap: "❌ Limited",
    category: "communication"
  },
  {
    feature: "Business Intelligence",
    smartcrm: "✅ 35+ tools + Product Research + Referral Maximizer",
    salesforce: "❌ Enterprise",
    hubspot: "❌ Enterprise",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "business"
  },
  {
    feature: "Gamification",
    smartcrm: "✅ Leaderboards, streaks, achievements",
    salesforce: "❌ No",
    hubspot: "❌ No",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "engagement"
  },
  {
    feature: "Unlimited AI Add-On",
    smartcrm: "✅ \"AI Boost Unlimited\" available",
    salesforce: "❌ No",
    hubspot: "❌ No",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "ai"
  },
  {
    feature: "Lifetime Access",
    smartcrm: "✅ One-time payment (discounted)",
    salesforce: "❌ No",
    hubspot: "❌ No",
    pipedrive: "❌ No",
    keap: "❌ No",
    category: "pricing"
  },
  {
    feature: "Highest Pricing Competitors Charge",
    smartcrm: "❌ $97 one-time (normally $999)",
    salesforce: "$330/user/mo",
    hubspot: "$150+/user/mo",
    pipedrive: "$79/user/mo",
    keap: "$249+/mo",
    category: "pricing"
  }
];

export const competitorInfo = {
  smartcrm: {
    name: "SmartCRM",
    tagline: "Value: $999 → $97 today with coupon \"SMARTCRM VIP\"",
    color: "blue",
    logo: "🚀"
  },
  salesforce: {
    name: "Salesforce",
    tagline: "Enterprise CRM Leader",
    color: "blue",
    logo: "💼"
  },
  hubspot: {
    name: "HubSpot",
    tagline: "Marketing & Sales Platform",
    color: "orange",
    logo: "🎯"
  },
  pipedrive: {
    name: "Pipedrive",
    tagline: "Sales Pipeline Management",
    color: "green",
    logo: "📊"
  },
  keap: {
    name: "Keap",
    tagline: "Small Business CRM",
    color: "purple",
    logo: "💜"
  }
};