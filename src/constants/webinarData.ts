export const WEBINAR_INFO = {
  title: 'Smart CRM: Revolutionize Your Customer Relationships with AI',
  subtitle: 'Live Webinar Demonstration',
  description: 'Join us for an exclusive live demonstration of Smart CRM and learn how AI-powered automation can transform your sales process, boost productivity, and close more deals.',
  duration: '90 minutes',
  format: 'Live Interactive Webinar',
  capacity: 500,
  spotsRemaining: 127,
  platform: 'Zoom',
  recording: 'Available for 30 days after the event'
} as const;

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export const WEBINAR_AGENDA: AgendaItem[] = [
  {
    time: '3:00 PM',
    title: 'Welcome & Introduction',
    description: 'Meet your host and learn what to expect from this power-packed session',
    duration: '10 min',
    icon: 'Users'
  },
  {
    time: '3:10 PM',
    title: 'The CRM Revolution: Why Smart CRM?',
    description: 'Discover how AI is transforming customer relationship management and why traditional CRMs are becoming obsolete',
    duration: '15 min',
    icon: 'Sparkles'
  },
  {
    time: '3:25 PM',
    title: 'Live Demo: Dashboard & AI Analytics',
    description: 'See real-time KPI tracking, predictive forecasting, and GPT-5 powered business insights in action',
    duration: '20 min',
    icon: 'LayoutDashboard'
  },
  {
    time: '3:45 PM',
    title: 'Live Demo: Contact Intelligence',
    description: 'Watch AI automatically enrich, score, and analyze contacts with zero manual data entry',
    duration: '15 min',
    icon: 'Users'
  },
  {
    time: '4:00 PM',
    title: 'Live Demo: Pipeline & Deal Intelligence',
    description: 'Experience AI-powered deal scoring, win/loss predictions, and automated next action recommendations',
    duration: '15 min',
    icon: 'TrendingUp'
  },
  {
    time: '4:15 PM',
    title: 'AI Tools Suite Showcase',
    description: 'Explore 40+ AI tools including email composer, proposal generator, objection handler, and more',
    duration: '10 min',
    icon: 'Brain'
  },
  {
    time: '4:25 PM',
    title: 'Live Q&A Session',
    description: 'Get your questions answered by our CRM experts and see custom demos based on your needs',
    duration: '20 min',
    icon: 'MessageCircle'
  },
  {
    time: '4:45 PM',
    title: 'Exclusive Launch Offer',
    description: 'Learn about special pricing and bonuses available only to webinar attendees',
    duration: '15 min',
    icon: 'Gift'
  }
];

export interface Speaker {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  credentials: string[];
  experience: string;
  linkedIn?: string;
  specialties: string[];
}

export const WEBINAR_SPEAKERS: Speaker[] = [
  {
    name: 'Dr. Michael Rodriguez',
    title: 'Chief AI Officer & Co-Founder',
    bio: 'Former AI Research Lead at Google, Michael has spent 15+ years developing machine learning systems for Fortune 500 companies. He holds a PhD in Computer Science from MIT and has published over 40 papers on AI and automation.',
    imageUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
    credentials: [
      'PhD Computer Science, MIT',
      'Former AI Lead at Google',
      '15+ years in AI/ML',
      '40+ published research papers'
    ],
    experience: '15+ years',
    specialties: ['AI Integration', 'Machine Learning', 'Predictive Analytics', 'Business Intelligence']
  },
  {
    name: 'Sarah Chen',
    title: 'VP of Sales & Customer Success',
    bio: 'Sarah built and scaled sales teams at Salesforce and HubSpot before joining Smart CRM. She has trained over 5,000 sales professionals and helped hundreds of companies optimize their CRM strategies.',
    imageUrl: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300',
    credentials: [
      'Former Director at Salesforce',
      'Certified Sales Trainer',
      '10+ years in CRM',
      'Trained 5,000+ professionals'
    ],
    experience: '10+ years',
    specialties: ['Sales Optimization', 'CRM Strategy', 'Team Training', 'Pipeline Management']
  }
];

export interface WebinarBenefit {
  icon: string;
  title: string;
  description: string;
  category: 'learn' | 'get' | 'access';
}

export const WEBINAR_BENEFITS: WebinarBenefit[] = [
  {
    icon: 'Eye',
    title: 'See AI in Action',
    description: 'Watch live demonstrations of GPT-5 powered automation handling real business scenarios',
    category: 'learn'
  },
  {
    icon: 'Lightbulb',
    title: 'Learn Proven Strategies',
    description: 'Discover the exact frameworks top-performing sales teams use to close 40% more deals',
    category: 'learn'
  },
  {
    icon: 'Target',
    title: 'Get Personalized Insights',
    description: 'Ask questions specific to your business and get expert recommendations during live Q&A',
    category: 'get'
  },
  {
    icon: 'Download',
    title: 'Free Resources',
    description: 'Download exclusive templates, checklists, and implementation guides ($297 value)',
    category: 'get'
  },
  {
    icon: 'Award',
    title: 'Certificate of Completion',
    description: 'Receive a professional certificate recognizing your CRM training',
    category: 'get'
  },
  {
    icon: 'Video',
    title: '30-Day Replay Access',
    description: 'Can\'t make it live? Watch the recording at your convenience for 30 days',
    category: 'access'
  },
  {
    icon: 'Users',
    title: 'Private Community Access',
    description: 'Join our exclusive Slack community to network with other attendees and get ongoing support',
    category: 'access'
  },
  {
    icon: 'Zap',
    title: 'Early Access Opportunity',
    description: 'Webinar attendees get priority access to Smart CRM with special launch pricing',
    category: 'access'
  }
];

export interface WebinarTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  imageUrl: string;
}

export const WEBINAR_TESTIMONIALS: WebinarTestimonial[] = [
  {
    quote: 'This webinar completely changed how I think about CRM. The AI demonstrations were mind-blowing, and I implemented three strategies the very next day.',
    author: 'James Wilson',
    role: 'Sales Director',
    company: 'TechVentures Inc.',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    quote: 'The live Q&A was incredibly valuable. Sarah answered my specific questions about pipeline management and gave me actionable advice I could use immediately.',
    author: 'Emily Rodriguez',
    role: 'VP of Operations',
    company: 'Growth Solutions',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    quote: 'I was skeptical about another CRM demo, but this was different. Seeing the AI work in real-time convinced me this is the future of sales.',
    author: 'Marcus Thompson',
    role: 'Founder & CEO',
    company: 'Innovate Labs',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const WEBINAR_FAQ = [
  {
    question: 'Is this webinar really free?',
    answer: 'Yes! This is a 100% free educational webinar. No credit card required, no hidden fees. We want to show you what Smart CRM can do for your business.'
  },
  {
    question: 'Will there be a replay available?',
    answer: 'Absolutely! All registrants will receive access to the replay for 30 days after the live event. However, we highly recommend attending live for the interactive Q&A session.'
  },
  {
    question: 'How technical is this webinar?',
    answer: 'Not at all! This webinar is designed for business professionals, not developers. We focus on business outcomes and practical applications, with no coding or technical expertise required.'
  },
  {
    question: 'Can I ask questions during the webinar?',
    answer: 'Yes! We have a dedicated 20-minute Q&A session where you can ask anything. You can also submit questions in advance when you register.'
  },
  {
    question: 'Will you share the resources and templates?',
    answer: 'Yes! All attendees will receive downloadable templates, checklists, and implementation guides mentioned during the webinar. These will be sent to your email after the event.'
  },
  {
    question: 'What if I can\'t attend at the scheduled time?',
    answer: 'No problem! Register anyway and we\'ll send you the replay link. You\'ll still get access to all the resources and materials.'
  },
  {
    question: 'Will there be a sales pitch?',
    answer: 'We\'ll share information about Smart CRM pricing and a special launch offer at the end, but 90% of the webinar is pure education and demonstration. Even if you don\'t buy, you\'ll walk away with valuable insights.'
  },
  {
    question: 'Can I bring my team?',
    answer: 'Yes! Share the registration link with your team. We encourage group attendance so you can discuss and implement strategies together.'
  }
];

export const WHO_SHOULD_ATTEND = [
  {
    persona: 'Sales Leaders',
    description: 'VPs, Directors, and Managers looking to scale their team\'s performance with AI automation',
    icon: 'Target'
  },
  {
    persona: 'Business Owners',
    description: 'Founders and entrepreneurs seeking to optimize customer relationships and increase revenue',
    icon: 'Briefcase'
  },
  {
    persona: 'Sales Representatives',
    description: 'Individual contributors who want to close more deals and spend less time on administrative tasks',
    icon: 'TrendingUp'
  },
  {
    persona: 'Operations Teams',
    description: 'Ops professionals responsible for CRM implementation and process optimization',
    icon: 'Settings'
  },
  {
    persona: 'Marketing Professionals',
    description: 'Marketers looking to better align with sales and leverage AI for lead intelligence',
    icon: 'Megaphone'
  },
  {
    persona: 'Customer Success Teams',
    description: 'CS professionals who want to deliver exceptional customer experiences at scale',
    icon: 'Heart'
  }
];

export const REGISTRATION_STATS = {
  totalAttendees: 2847,
  averageRating: 4.9,
  completionRate: 92,
  recommendationRate: 97
};
