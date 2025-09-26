// src/components/FEComparisonFull.tsx
import React, { useMemo, useState } from "react";

/** Competitors to display (fixed 5 as requested) */
const COMPETITORS = [
  { key: "hubspot", name: "HubSpot" },
  { key: "salesforce", name: "Salesforce" },
  { key: "zoho", name: "Zoho" },
  { key: "pipedrive", name: "Pipedrive" },
  { key: "freshsales", name: "Freshsales" },
] as const;

type Row = {
  feature: string;
  description: string; // SmartCRM FE full description (no skips)
  hubspot?: string;
  salesforce?: string;
  zoho?: string;
  pipedrive?: string;
  freshsales?: string;
};

type Section = {
  key: string;
  name: string;
  rows: Row[];
  note?: string;
};

const VARIES = "Varies / tiered";
const PAID = "🔒 Paid/Upgrade";
const LIMITED = "⚠️ Limited";
const NOT_NATIVE = "❌ Not native";

/* -----------------------------
 * DATASET — FE only (no skips)
 * Order: Dashboard → Contacts → Pipeline Deals
 * ----------------------------- */

/* GPT-5 Dashboard */
const DASHBOARD: Row[] = [
  { feature: "Dashboard Header", description: "Always-visible header with title + welcome subtitle; light/dark adaptive.", hubspot: "Core UI", salesforce: "Core UI", zoho: "Core UI", pipedrive: "Core UI", freshsales: "Core UI" },
  { feature: "Dashboard Layout Controls", description: "Show/hide sections and reorder with persistent preferences.", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Draggable Sections", description: "Drag-and-drop to personalize the dashboard layout.", hubspot: LIMITED, salesforce: LIMITED, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Executive Overview Section", description: "High-level business summary with cards, charts, highlights.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "AI Smart Features Hub", description: "Tabbed hub for AI controls, performance, tools; interactive AI buttons.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Sales Pipeline Deal Analytics", description: "Charts/graphs/tables of stages, conversion rates, pipeline health.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Customer Lead Management", description: "Lead list/card view, add/edit/filter, status tracking.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: "✅", freshsales: "✅" },
  { feature: "Activities & Communications", description: "Timeline/calendar of calls, emails, meetings; quick access.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Integrations System", description: "Manage connected integrations with status & setup.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Metrics Cards", description: "Card-based key metrics (revenue, growth, conversion) with trends.", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "KPI Cards", description: "Business performance indicators tailored to goals.", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "GPT-5 Smart KPI Cards", description: "AI-enhanced KPIs with predictive analytics & recommendations.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Quick Actions", description: "Create deal/contact/task/appointment; includes AI scheduling.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "AI Insights Panel", description: "AI-generated business insights with impact + suggested actions.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "GPT-5 Analytics Panel", description: "Forecasting, benchmarking, scenario modeling with AI explanations.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "GPT-5 Deal Intelligence", description: "AI win/loss prediction, risk scoring, strategy advice per deal.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "GPT-5 Enhanced Dashboard", description: "Composite view combining multiple AI widgets & analytics.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Interaction History", description: "Chronological communications timeline; filter by contact/type.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Customer Profile", description: "Profile tabs for info, activity, deals, notes.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: "✅", freshsales: "✅" },
  { feature: "Recent Activity", description: "Feed of recent user/system actions with icons & timestamps.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: "✅", freshsales: "✅" },
  { feature: "Tasks & Funnel", description: "Task board + funnel visualization with AI prioritization.", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Charts Section", description: "Interactive, filterable bar/line/pie charts.", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "New Leads Section", description: "Add/track new leads with status indicators.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: "✅", freshsales: "✅" },
  { feature: "Assistant Status Widget", description: "Live AI assistant status (active/idle).", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Video Call Components", description: "Floating call button, preview widget, full-screen overlay.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: NOT_NATIVE, freshsales: LIMITED },
];

/* Enhanced AI Contacts Module (full) */
const CONTACTS: Row[] = [
  { feature: "SmartCRM Prompt Templates (9)", description: "Pre-built prompts for Enhanced Contacts, AI Sales Intelligence, etc.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Advanced Image Generation", description: "Gemini 2.5 Flash; aspect ratio optimization.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Supabase Storage Integration", description: "Auto upload & storage of generated images.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Thumbnail Generation", description: "Automatic 200px thumbnails for fast galleries.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Saved Images Gallery", description: "Gallery with metadata, variants, search/filter.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "History Management", description: "Persistent generation history with re-run capability.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Batch Operations", description: "Generate multiple variants; bulk download.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Smart Branding Injection", description: "Automatic SmartCRM styling for visual consistency.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },

  { feature: "Advanced Contact Scoring (multi-model)", description: "GPT-4 + Gemini scoring with explanations & priorities.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Intelligent Contact Enrichment", description: "Web research (LinkedIn, company data) fills gaps.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: NOT_NATIVE, freshsales: LIMITED },
  { feature: "AI Research Integration", description: "Real-time background & executive insights.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Smart Categorization", description: "Auto tags by industry, role, engagement pattern.", hubspot: LIMITED, salesforce: LIMITED, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Relationship Mapping", description: "AI network mapping + relationship strength score.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Bulk Analysis", description: "Hundreds of contacts processed with AI insights.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Contact Journey Timeline", description: "Unified interaction history across channels.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "AI Insights Panel (contact)", description: "Predictive recommendations & next best actions.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Communication Hub", description: "Email/phone/SMS/social in one place.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Automation Panel", description: "Workflow automation with AI-suggested steps.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Contact Analytics", description: "Engagement patterns + conversion probability.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Email Integration (in-record)", description: "Compose/analyze emails within contact context.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },

  { feature: "Real-time KPIs & Charts", description: "Live contact KPIs; interactive visual analytics.", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },

  { feature: "AI Email Composer", description: "Context-aware drafts; tone & personalization.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Smart Social Messaging", description: "Platform-specific copy (LinkedIn/Twitter/WhatsApp).", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Objection Handler", description: "Pre-trained rebuttals for 50+ objections.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Subject Line Generator", description: "High-converting subject lines + A/B ideas.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Meeting Summary Generator", description: "Auto transcription + action items.", hubspot: PAID, salesforce: PAID, zoho: PAID, pipedrive: NOT_NATIVE, freshsales: LIMITED },
  { feature: "Communication Optimizer", description: "Best time/channel suggestions per contact.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },

  { feature: "Live Deal Analysis (from contact)", description: "Real-time deal health & AI commentary.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Adaptive Playbook Generator", description: "AI sales strategy by persona/industry.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Discovery Questions Generator", description: "Intelligent question sets for prospecting.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Sales Forecasting (contact)", description: "Contact-level conversion prediction.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },

  { feature: "Semantic Search", description: "Natural language search across contacts/deals/comms.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Voice Analysis", description: "Call sentiment & emotion detection.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Vision Analyzer", description: "Image/document content extraction & insights.", hubspot: NOT_NATIVE, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Market Trend Content", description: "Real-time trends & competitive intel content.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "AI Form Validation", description: "Smart error detection/correction in forms.", hubspot: NOT_NATIVE, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },

  { feature: "8 Tabs (Overview/Journey/Analytics/Comms/Automation/Sales Intel/AI Insights/Email)", description: "Complete contact workspace.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "AI Score Display", description: "Color-coded (green/yellow/red) with rationale.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Interest Level Tracking", description: "Hot/Medium/Low/Cold with animated indicators.", hubspot: LIMITED, salesforce: LIMITED, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Source Tracking", description: "Badges (LinkedIn, Email, Website, etc.).", hubspot: LIMITED, salesforce: LIMITED, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Customizable AI Toolbar", description: "One-click access to AI tools for a contact.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Quick Actions (Email/Call/View)", description: "Streamlined contact actions.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: "✅", freshsales: "✅" },

  { feature: "Welcome Experience", description: "Personalized onboarding for new users.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Contextual Help + Smart Tooltips", description: "AI-powered hints where needed.", hubspot: LIMITED, salesforce: LIMITED, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Progress Tracking", description: "Tracks user progress and suggests next steps.", hubspot: LIMITED, salesforce: LIMITED, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },

  { feature: "Supabase Storage Buckets", description: "Full + thumbnail buckets with RLS isolation.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Postgres Metadata + RLS", description: "Metadata, tags, generation params; secure isolation.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Lazy Loading + Caching", description: "Fast gallery performance with caching.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
];

/* Enhanced Pipeline Deals */
const PIPELINE: Row[] = [
  { feature: "Kanban Board", description: "Drag/drop deals across customizable stages.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: "✅", freshsales: "✅" },
  { feature: "List / Table / Calendar / Dashboard / Timeline Views", description: "Multiple visualizations (sortable/filterable).", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Deal Creation & Management", description: "Title, company, contact, value, stage, probability, priority, due date, notes, tags, custom fields.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: "✅", freshsales: "✅" },
  { feature: "Deal Detail View", description: "Overview + notes + attachments + related contact/company.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: "✅", freshsales: "✅" },
  { feature: "AI Insights Panel (deal)", description: "Win probability trend, timeline prediction, value optimization, categorized insights with confidence.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Communication Hub (deal)", description: "Emails, calls, real-time AI call coach, meeting scheduling.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Automation Panel (deal)", description: "Active automations, AI builder, available recipes.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Deal Journey Timeline", description: "Chronological events & stage changes.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Deal Analytics Dashboard", description: "Win rate trend, engagement mix, stage duration, benchmarking, stakeholders, custom fields, social profiles, attachments.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Pipeline Statistics", description: "Totals, # deals, avg size, conversion rates.", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "AI-Enhanced Deal Cards", description: "AI score, insights summary, toolbar, last activity, favorites, AI image search.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Contacts & Team Modal", description: "Manage contacts/team; filter, sort, bulk actions.", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Contact Detail (deep)", description: "Psych profile, score analysis, behavioral insights, comms hub, journey, automation, analytics, research, team mgmt.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: NOT_NATIVE, freshsales: LIMITED },
  { feature: "Import (CSV/JSON) with validation", description: "Bulk import with validation & error reporting.", hubspot: "✅", salesforce: "✅", zoho: "✅", pipedrive: "✅", freshsales: "✅" },
  { feature: "Export (CSV/JSON) + metadata filters", description: "Flexible exports with date & field filters.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: VARIES, freshsales: VARIES },
  { feature: "Intelligent AI Routing", description: "Model selection (GPT-5/Gemma/Gemini) + fallbacks.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "AI Gateway via Edge", description: "Secure proxy, cascade, health checks.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "AI Communication Enhancement", description: "Personalized emails/scripts + real-time call coaching.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: NOT_NATIVE, freshsales: LIMITED },
  { feature: "AI Automation Builder", description: "Deal progression automation & task generation.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "AI Research & Enrichment", description: "Company/contact research with citations; auto-fill.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: NOT_NATIVE, freshsales: LIMITED },
  { feature: "Voice Assistant", description: "Floating hands-free CRM interaction.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "AI Status Indicators & Research Overlay", description: "Live availability & progress logs.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Team Stats & Leaderboard", description: "Members, achievements, challenges, streaks.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Automated Gamification Updates", description: "Won/lost tracking, streaks, points/levels, awards.", hubspot: NOT_NATIVE, salesforce: NOT_NATIVE, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Auth/Theming/Personalization", description: "Dark mode, theme switcher, user personalization.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: VARIES, freshsales: VARIES },
  { feature: "Validation/Error Boundaries/Shortcuts", description: "Robust UX + accessibility helpers.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: VARIES, freshsales: VARIES },
];

/* AI Calendar App */
const CALENDAR: Row[] = [
  { feature: "Month / Week / Day / Agenda Views", description: "Interactive views with drag-and-drop scheduling.", hubspot: LIMITED, salesforce: LIMITED, zoho: "✅", pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "AI Smart Scheduling", description: "AI suggests optimal times based on availability & preferences.", hubspot: PAID, salesforce: PAID, zoho: NOT_NATIVE, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Meeting Optimization", description: "Auto-find best times for multiple attendees.", hubspot: PAID, salesforce: PAID, zoho: LIMITED, pipedrive: NOT_NATIVE, freshsales: NOT_NATIVE },
  { feature: "Google / Outlook Sync", description: "Two-way sync with external calendars.", hubspot: VARIES, salesforce: VARIES, zoho: "✅", pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Recurring Events", description: "Flexible recurrence patterns with exceptions.", hubspot: VARIES, salesforce: VARIES, zoho: "✅", pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Time Zone Support", description: "Auto conversion & multi-timezone scheduling.", hubspot: VARIES, salesforce: VARIES, zoho: LIMITED, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Calendar Sharing", description: "Share with team or external stakeholders.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },
  { feature: "Availability Management", description: "Working hours, blocked times, preferences.", hubspot: VARIES, salesforce: VARIES, zoho: VARIES, pipedrive: LIMITED, freshsales: LIMITED },
];

/** Merge all FE rows into an "All" tab */
const ALL_FE: Row[] = [...DASHBOARD, ...CONTACTS, ...PIPELINE, ...CALENDAR];

/** Tab sections */
const SECTIONS: Section[] = [
  { key: "dashboard", name: "GPT-5 Dashboard", rows: DASHBOARD, note: "Smart, draggable dashboard with AI insights & KPI forecasting." },
  { key: "contacts", name: "Enhanced AI Contacts", rows: CONTACTS, note: "Full AI contact intelligence, enrichment, comms & analytics." },
  { key: "pipeline", name: "Enhanced Pipeline Deals", rows: PIPELINE, note: "Multi-view pipeline + deep AI, automations, analytics, gamification." },
  { key: "calendar", name: "AI Calendar App", rows: CALENDAR, note: "AI-assisted scheduling with external sync & availability controls." },
  { key: "all", name: "All FE Features", rows: ALL_FE, note: "Complete list — nothing omitted. Use search to filter." },
];

/** Desktop table */
function Table({ rows }: { rows: Row[] }) {
  return (
    <div className="hidden md:block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="grid grid-cols-7 gap-0 border-b border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 dark:border-neutral-800 dark:text-neutral-200">
        <div>Feature</div>
        <div className="text-emerald-700 dark:text-emerald-300">SmartCRM (FE)</div>
        {COMPETITORS.map((c) => <div key={c.key}>{c.name}</div>)}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-7 gap-0 border-b border-neutral-100 px-4 py-3 text-sm last:border-0 dark:border-neutral-800">
          <div className="font-medium text-neutral-900 dark:text-white">{r.feature}</div>
          <div className="text-neutral-800 dark:text-neutral-200">{r.description}</div>
          <div>{r.hubspot ?? ""}</div>
          <div>{r.salesforce ?? ""}</div>
          <div>{r.zoho ?? ""}</div>
          <div>{r.pipedrive ?? ""}</div>
          <div>{r.freshsales ?? ""}</div>
        </div>
      ))}
    </div>
  );
}

export default function FEComparisonFull() {
  const [tab, setTab] = useState<string>(SECTIONS[0].key);
  const [q, setQ] = useState("");
  const active = useMemo(() => SECTIONS.find((s) => s.key === tab)!, [tab]);
  const filtered = useMemo(
    () =>
      active.rows.filter(
        (r) =>
          r.feature.toLowerCase().includes(q.toLowerCase()) ||
          r.description.toLowerCase().includes(q.toLowerCase())
      ),
    [active.rows, q]
  );

  return (
    <section id="fe-comparison" className="mx-auto max-w-7xl p-4 md:p-8">
      <header className="mb-4">
        <h2 className="text-2xl font-bold md:text-3xl">SmartCRM FE vs HubSpot • Salesforce • Zoho • Pipedrive • Freshsales</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Full comparison for the Front-End product only (GPT-5 Dashboard, Enhanced AI Contacts, Enhanced Pipeline Deals, AI Calendar). No features skipped.
        </p>
      </header>

      {/* Tabs */}
      <div className="mb-3 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setTab(s.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-inset transition ${
              tab === s.key
                ? "bg-emerald-600 text-white ring-emerald-600"
                : "bg-white text-neutral-700 ring-neutral-200 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-800 dark:hover:bg-neutral-800"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Search features (e.g., "AI Insights", "Calendar", "Drag-and-drop")'
          className="w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
        />
      </div>

      {/* Desktop table */}
      <div className="mb-6 overflow-x-auto">
        <Table rows={filtered} />
      </div>

      {/* Mobile cards */}
      <div className="md:hidden">
        {filtered.map((r, i) => (
          <div key={i} className="mt-3 rounded-xl border border-neutral-200 p-4 shadow-sm dark:border-neutral-800">
            <div className="mb-1 font-semibold text-neutral-900 dark:text-white">{r.feature}</div>
            <div className="mb-2 text-sm text-neutral-700 dark:text-neutral-300">{r.description}</div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div className="font-medium text-emerald-700 dark:text-emerald-300">SmartCRM</div>
              <div>Included</div>
              {COMPETITORS.map((c) => (
                <React.Fragment key={c.key}>
                  <div>{c.name}</div>
                  <div>{(r as any)[c.key] ?? ""}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-xs text-yellow-900 dark:border-yellow-900/40 dark:bg-yellow-900/20 dark:text-yellow-100">
        <strong>Note:</strong> Competitor availability often depends on plan/add-ons and changes frequently. Labels like "{VARIES}", "{PAID}", "{LIMITED}", "{NOT_NATIVE}" are positioning placeholders—swap for exact plan mappings if you want SKU-precise comparisons.
      </div>
    </section>
  );
}