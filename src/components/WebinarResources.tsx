import React, { useState, useEffect } from 'react';
import { Download, FileText, BookOpen, MessageSquare, ArrowRight, Loader2, AlertTriangle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { createClient } from '@supabase/supabase-js';

interface WebinarResource {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  handler: () => void;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage?: string;
}

interface WebinarResourcesProps {
  webinarDay: number;
  transcript?: string;
  qaContent?: any[];
  summary?: any;
}

const WebinarResources: React.FC<WebinarResourcesProps> = ({ webinarDay, transcript, qaContent, summary }) => {
  const [supabase, setSupabase] = useState<any | null>(null);
  const [resources, setResources] = useState<WebinarResource[]>([]);
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: React.ReactNode;
    isOpen: boolean;
  }>({ title: '', content: null, isOpen: false });

  useEffect(() => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseAnonKey) {
        const client = createClient(supabaseUrl, supabaseAnonKey);
        setSupabase(client);
      }
    } catch (err) {
      console.error("Error initializing Supabase client:", err);
    }
  }, []);

  useEffect(() => {
    initializeResources();
  }, [supabase, webinarDay]);

  const initializeResources = () => {
    setResources([
      {
        title: "Presentation Slides",
        description: "Download the slides from the webinar presentations",
        icon: <Download size={18} className="text-blue-400" />,
        action: "Download",
        handler: handleDownloadSlides,
        status: 'idle'
      },
      {
        title: "Implementation Guide",
        description: "Step-by-step guide for implementing Smart CRM",
        icon: <BookOpen size={18} className="text-purple-400" />,
        action: "Access",
        handler: handleAccessImplementationGuide,
        status: 'idle'
      },
      {
        title: "Full Webinar Transcript",
        description: "Complete text transcript of all sessions",
        icon: <FileText size={18} className="text-green-400" />,
        action: "Download",
        handler: handleDownloadTranscript,
        status: 'idle'
      },
      {
        title: "Q&A Responses",
        description: "Answers to questions asked during the webinars",
        icon: <MessageSquare size={18} className="text-amber-400" />,
        action: "View",
        handler: handleViewQA,
        status: 'idle'
      }
    ]);
  };

  // Update a specific resource's status
  const updateResourceStatus = (index: number, status: 'idle' | 'loading' | 'success' | 'error', errorMessage?: string) => {
    setResources(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        status,
        errorMessage
      };
      return updated;
    });
  };

  // Handler functions for each resource
  const handleDownloadSlides = async () => {
    const resourceIndex = 0;
    updateResourceStatus(resourceIndex, 'loading');

    try {
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(22);
      doc.setTextColor(0, 51, 102);
      doc.text(`Smart CRM Masterclass - Day ${webinarDay}`, 20, 20);
      
      // Add subtitle
      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80);
      doc.text("Presentation Slides", 20, 30);
      
      // Add date
      const today = new Date();
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated: ${today.toLocaleDateString()}`, 20, 40);
      
      // Add content based on webinar day
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      
      let yPos = 60;
      
      // Day-specific slide content
      const slideContent = getSlideContentForDay(webinarDay);
      
      slideContent.forEach((slide, i) => {
        // Add slide number
        doc.setFontSize(14);
        doc.setTextColor(0, 102, 204);
        doc.text(`Slide ${i+1}: ${slide.title}`, 20, yPos);
        yPos += 10;
        
        // Add slide content
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        const contentLines = doc.splitTextToSize(slide.content, 170);
        contentLines.forEach((line: string) => {
          yPos += 7;
          
          // Check if we need a new page
          if (yPos > 280) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.text(line, 25, yPos);
        });
        
        yPos += 15;
      });
      
      // Save the PDF
      doc.save(`Smart_CRM_Day${webinarDay}_Slides.pdf`);
      updateResourceStatus(resourceIndex, 'success');
    } catch (error) {
      console.error('Error creating slides PDF:', error);
      updateResourceStatus(resourceIndex, 'error', 'Failed to generate slides PDF');
    }
  };

  const handleAccessImplementationGuide = () => {
    const resourceIndex = 1;
    updateResourceStatus(resourceIndex, 'loading');
    
    try {
      // Create guide content based on webinar day
      const guideContent = getImplementationGuideForDay(webinarDay);
      
      // Set modal content to display the guide
      setModalContent({
        title: `Smart CRM Implementation Guide - Day ${webinarDay}`,
        content: (
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <div className="space-y-6">
              <p className="text-white/80">
                This implementation guide provides step-by-step instructions based on the content 
                covered in Day {webinarDay} of the Smart CRM Masterclass.
              </p>
              
              {guideContent.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-white font-semibold text-lg">{section.title}</h3>
                  <p className="text-white/80">{section.description}</p>
                  
                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    {section.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 mr-3">
                          <span className="text-blue-400 text-sm font-medium">{stepIdx + 1}</span>
                        </div>
                        <p className="text-white/80">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
        isOpen: true
      });
      
      updateResourceStatus(resourceIndex, 'success');
    } catch (error) {
      console.error('Error accessing implementation guide:', error);
      updateResourceStatus(resourceIndex, 'error', 'Failed to load implementation guide');
    }
  };

  const handleDownloadTranscript = async () => {
    const resourceIndex = 2;
    updateResourceStatus(resourceIndex, 'loading');

    try {
      // Use transcript passed as prop, or show error if not available
      if (!transcript) {
        throw new Error("Transcript not available for this webinar day");
      }
      
      // Create a Blob with the transcript
      const blob = new Blob([transcript], { type: 'text/plain' });
      
      // Create a download link and trigger it
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Smart_CRM_Day${webinarDay}_Transcript.txt`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
      
      updateResourceStatus(resourceIndex, 'success');
    } catch (error) {
      console.error('Error downloading transcript:', error);
      updateResourceStatus(resourceIndex, 'error', 'Failed to generate transcript download');
    }
  };

  const handleViewQA = async () => {
    const resourceIndex = 3;
    updateResourceStatus(resourceIndex, 'loading');
    
    try {
      // Use Q&A content passed as prop, or use mock data as fallback
      let qaData = qaContent;
      if (!qaData || qaData.length === 0) {
        qaData = getMockQAForDay(webinarDay);
      }
      
      // Set modal content to display Q&A
      setModalContent({
        title: `Q&A from Day ${webinarDay} Webinar`,
        content: (
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <div className="space-y-6">
              <p className="text-white/80">
                Below are questions asked by attendees during the Day {webinarDay} session, 
                along with responses from our experts.
              </p>
              
              {qaData.map((qa: { question: string, answer: string }, idx: number) => (
                <div key={idx} className="bg-white/5 rounded-lg p-4 space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-1.5 bg-blue-500/20 rounded-full mr-3 mt-0.5">
                      <MessageSquare size={16} className="text-blue-400" />
                    </div>
                    <p className="text-white font-medium">{qa.question}</p>
                  </div>
                  
                  <div className="pl-9 text-white/80">
                    <p>{qa.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
        isOpen: true
      });
      
      updateResourceStatus(resourceIndex, 'success');
    } catch (error) {
      console.error('Error viewing Q&A:', error);
      updateResourceStatus(resourceIndex, 'error', 'Failed to load Q&A content');
    }
  };

  // Helper function to close the modal
  const closeModal = () => {
    setModalContent(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="space-y-4">
      {resources.map((resource, idx) => (
        <div key={idx} className="bg-white/10 rounded-lg p-4">
          <div className="flex items-start">
            <div className="p-2 bg-white/10 rounded-lg mr-3 flex-shrink-0">
              {resource.icon}
            </div>
            <div className="flex-grow">
              <h4 className="text-white font-medium text-sm">{resource.title}</h4>
              <p className="text-white/60 text-xs mb-2">{resource.description}</p>
              
              {resource.status === 'error' && (
                <div className="bg-red-500/20 text-red-400 text-xs p-1.5 rounded mb-2 flex items-center">
                  <AlertTriangle size={12} className="mr-1" />
                  {resource.errorMessage || 'Error processing request'}
                </div>
              )}
              
              {resource.status === 'success' && resource.action !== 'View' && (
                <div className="bg-green-500/20 text-green-400 text-xs p-1.5 rounded mb-2 flex items-center">
                  <Check size={12} className="mr-1" />
                  {resource.action === 'Download' ? 'Downloaded successfully' : 'Accessed successfully'}
                </div>
              )}
              
              <button 
                className="text-blue-400 text-xs flex items-center hover:underline disabled:opacity-50 disabled:hover:no-underline"
                onClick={resource.handler}
                disabled={resource.status === 'loading'}
              >
                {resource.status === 'loading' ? (
                  <>
                    <Loader2 size={12} className="mr-1 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {resource.action}
                    <ArrowRight size={12} className="ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Modal for Implementation Guide and Q&A */}
      {modalContent.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <motion.div 
            className="bg-gradient-to-br from-gray-900 to-blue-900/80 rounded-xl p-6 max-w-2xl w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{modalContent.title}</h3>
              <button 
                className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>
            
            {modalContent.content}
            
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Helper function to get mock slide content based on webinar day
function getSlideContentForDay(day: number) {
  if (day === 1) {
    return [
      {
        title: "Introduction to Smart CRM Masterclass",
        content: "Welcome to the Smart CRM Masterclass! Today we'll explore why traditional CRM systems are failing and introduce our revolutionary approach to customer relationship management."
      },
      {
        title: "The Problem with Traditional CRMs",
        content: "Most CRMs today are built for managers, not sales teams. They create data entry burdens, lack true intelligence, and fail to deliver actionable insights when you need them most."
      },
      {
        title: "Data Entry: The Hidden Cost",
        content: "Sales reps spend up to 65% of their time on non-selling activities, with manual data entry being the biggest culprit. This translates to thousands of dollars in lost revenue per rep annually."
      },
      {
        title: "The Smart CRM Solution",
        content: "Smart CRM eliminates manual data entry through AI automation, provides intelligent insights, and fits seamlessly into your existing workflow instead of forcing you to change how you work."
      },
      {
        title: "Case Study: Sarah's Success",
        content: "Sarah implemented Smart CRM and saw a 46% increase in closed deals within just 30 days. Her team now spends 70% less time on administration and more time building customer relationships."
      },
      {
        title: "Key Takeaways from Day 1",
        content: "1. Traditional CRMs create more problems than they solve\n2. Most sales teams waste 65% of time on non-selling activities\n3. Smart CRM automation eliminates data entry burdens\n4. AI-powered insights drive better decision making\n5. Implementation can drive 40%+ improvements in close rates"
      }
    ];
  } else if (day === 2) {
    return [
      {
        title: "Day 2: Automate, Personalize, and Scale",
        content: "Welcome back! Today we'll explore how Smart CRM's AI capabilities automate repetitive tasks while maintaining the personal touch that builds strong customer relationships."
      },
      {
        title: "Breaking the Time Myth",
        content: "The notion that quality sales requires more time is false. Smart CRM's automation handles lead scoring, follow-ups, and meeting preparation automatically, freeing you to focus on high-value activities."
      },
      {
        title: "AI-Powered Automation Stack",
        content: "Smart CRM uses multiple AI systems working together to automate: 1) Email classification and sentiment analysis, 2) Lead scoring and prioritization, 3) Meeting transcription and summarization, 4) Follow-up scheduling and execution."
      },
      {
        title: "Personalization at Scale",
        content: "Our AI analyzes customer data to create highly personalized communication that resonates with each individual prospect - without requiring hours of manual work from your team."
      },
      {
        title: "Case Study: Jennifer's Team",
        content: "Jennifer implemented Smart CRM's automation features and saw a 32% increase in sales while reducing administrative tasks by 68%. Her team now handles 2.5x more prospects with the same headcount."
      },
      {
        title: "Implementation Blueprint",
        content: "1. Connect your email and calendar\n2. Import your contact database\n3. Configure automation rules\n4. Train team on the new workflow\n5. Monitor and optimize over 30 days"
      }
    ];
  } else {
    return [
      {
        title: "Day 3: Your Future Sales System",
        content: "Welcome to our final session! Today we'll introduce The Client Engine System and how Smart CRM provides the foundation for predictable, scalable revenue generation."
      },
      {
        title: "The Client Engine System",
        content: "A comprehensive framework for building predictable revenue through systematic sales processes rather than relying on individual talent or heroic efforts."
      },
      {
        title: "System vs. Talent",
        content: "Businesses that rely on talent have unpredictable results. Systems-driven businesses achieve consistent growth. Smart CRM provides the technological foundation for a systems-based approach."
      },
      {
        title: "7-Day Implementation Plan",
        content: "Day 1-2: Setup & Data Import\nDay 3-4: Workflow Configuration\nDay 5: Team Training\nDay 6-7: Initial Optimization\n\nMost businesses complete implementation in under a week with our guided process."
      },
      {
        title: "Customer Success Stories",
        content: "Tech Startup: 129% revenue increase in 90 days\nConsulting Firm: Cut admin time by 73%\nManufacturing: Improved lead response time from 2 days to 15 minutes\nFinancial Services: 52% increase in customer retention"
      },
      {
        title: "Smart CRM Special Offer",
        content: "Limited time offer for webinar attendees:\n- Special attendee-only pricing\n- Implementation assistance\n- Dedicated account manager\n- Priority support access\n- 90-day money-back guarantee"
      }
    ];
  }
}

// Helper function to get mock implementation guide content based on webinar day
function getImplementationGuideForDay(day: number) {
  if (day === 1) {
    return [
      {
        title: "Assess Your Current CRM Challenges",
        description: "Before implementing Smart CRM, identify your specific pain points to ensure proper focus during setup.",
        steps: [
          "Document your current sales process workflow with specific time spent on each activity",
          "Calculate how much time your team spends on data entry versus actual selling",
          "Identify the top 3 information gaps that prevent effective decision making",
          "Survey your team about their biggest CRM frustrations and wishes",
          "Establish baseline metrics for your current performance (win rates, sales cycle length, etc.)"
        ]
      },
      {
        title: "Prepare for Smart CRM Implementation",
        description: "These pre-implementation steps will ensure a smooth transition to Smart CRM.",
        steps: [
          "Export your contact and opportunity data from your current system",
          "Clean and standardize your data (remove duplicates, standardize field formats)",
          "Map your existing sales stages to Smart CRM's pipeline framework",
          "Identify team members who will be system administrators and champions",
          "Schedule implementation kickoff with clear timelines and responsibilities"
        ]
      },
      {
        title: "Email Integration Setup",
        description: "Connect your email systems to enable Smart CRM's automation capabilities.",
        steps: [
          "Grant appropriate API permissions for your email provider (Gmail, Outlook, etc.)",
          "Configure email sync settings and select appropriate folders to include/exclude",
          "Set up email templates for common scenarios that will be auto-suggested",
          "Configure Smart CRM's AI email categorization rules for your business context",
          "Test the system with sample emails to verify proper classification and capture"
        ]
      }
    ];
  } else if (day === 2) {
    return [
      {
        title: "Configure AI-Powered Automation",
        description: "Set up the automation features demonstrated in today's session to save time and boost productivity.",
        steps: [
          "Set up Smart CRM's lead scoring model with your specific qualification criteria",
          "Configure automated follow-up sequences for different prospect scenarios",
          "Implement meeting assistant integration with your video conferencing tools",
          "Create custom fields for AI data capture based on your specific sales process",
          "Test each automation with real-world scenarios to ensure proper function"
        ]
      },
      {
        title: "Personalization Framework Setup",
        description: "Implement the personalization capabilities to communicate effectively at scale.",
        steps: [
          "Create your content library of reusable elements (value propositions, case studies, etc.)",
          "Set up buyer persona profiles to enable contextual personalization",
          "Configure the AI personality settings to match your brand voice",
          "Upload your existing successful email templates for AI analysis and improvement",
          "Set up A/B testing to optimize personalization effectiveness"
        ]
      },
      {
        title: "User Training Plan",
        description: "Ensure your team can make the most of Smart CRM's automation capabilities.",
        steps: [
          "Schedule a 45-minute kickoff training for all users focused on daily workflow",
          "Create role-specific cheat sheets for common tasks and shortcuts",
          "Designate power users for peer support during the transition period",
          "Implement a gamification approach to encourage active usage (leaderboards, etc.)",
          "Schedule weekly 15-minute check-ins for the first month to address questions"
        ]
      }
    ];
  } else {
    return [
      {
        title: "The Client Engine System Implementation",
        description: "Set up the systematic approach to sales that creates predictable revenue.",
        steps: [
          "Map out your complete customer journey from lead to advocate in Smart CRM",
          "Configure automation triggers for each stage transition in the journey",
          "Set up dashboard metrics that align with The Client Engine System approach",
          "Create the accountability structures within Smart CRM for systematic execution",
          "Implement team collaboration workflows for seamless handoffs between stages"
        ]
      },
      {
        title: "7-Day Implementation Schedule",
        description: "Follow this exact timeline to implement Smart CRM with minimal disruption.",
        steps: [
          "Day 1-2: Account setup, data import, and email integration",
          "Day 3: Custom field configuration and workflow mapping",
          "Day 4: Automation rules setup and testing",
          "Day 5: Dashboard and reporting configuration",
          "Day 6-7: Team training and initial supervised usage"
        ]
      },
      {
        title: "Maximizing ROI from Smart CRM",
        description: "Follow these steps to ensure you see rapid returns from your implementation.",
        steps: [
          "Focus first on eliminating manual data entry (email and calendar integrations)",
          "Next, implement the lead scoring model to focus on highest-value opportunities",
          "Then set up automated follow-up sequences to prevent leads from falling through cracks",
          "Implement dashboard reviews as part of your team's daily routine",
          "Schedule 30, 60, and 90-day check-ins to optimize based on initial results"
        ]
      }
    ];
  }
}

// Helper function to get mock Q&A content for a webinar day
function getMockQAForDay(day: number): { question: string, answer: string }[] {
  if (day === 1) {
    return [
      {
        question: "How does Smart CRM handle data from my existing CRM system?",
        answer: "We have a comprehensive data migration process that imports all your contacts, deals, notes, and historical activity. Our migration specialists will help ensure nothing is lost during the transition. We support direct imports from Salesforce, HubSpot, Zoho, and most other major CRM systems."
      },
      {
        question: "Does Smart CRM work for complex B2B sales cycles or just simple B2C sales?",
        answer: "Smart CRM is actually designed with complex B2B sales cycles in mind. Our AI-powered pipeline and relationship tracking features are particularly valuable for multi-stakeholder sales that span weeks or months. The more complex your sale, the more value you'll get from our automation and insight capabilities."
      },
      {
        question: "How secure is our data in Smart CRM?",
        answer: "Security is foundational to our platform. We're SOC 2 Type II compliant, GDPR compliant, and use end-to-end encryption for all data. Your data is stored in secure AWS data centers with regular security audits. We also offer features like two-factor authentication, single sign-on, and role-based access controls."
      },
      {
        question: "Can Smart CRM identify which marketing channels are producing the best leads?",
        answer: "Absolutely. The analytics feature tracks the full customer journey from initial touch to closed deal. You can see conversion rates, deal sizes, and velocity by marketing source, campaign, or any other attribute. This helps you identify which marketing investments are delivering the highest quality leads."
      },
      {
        question: "How much does Smart CRM cost compared to traditional CRMs?",
        answer: "Smart CRM is available for a one-time payment of $97 (regularly $999) with lifetime access to all features. There are no monthly fees, no per-user charges, and no hidden costs. Use coupon 'SMARTCRM VIP' at checkout. Compare this to traditional CRMs that charge $150-$330 per user per month. The ROI is exceptional because you own it forever, plus you save time on manual data entry and close more deals with our AI-powered insights."
      },
      {
        question: "How long does the typical implementation take?",
        answer: "Most businesses are up and running within 7 days. The core setup (email integration, data import, basic configuration) takes just 1-2 days. The remaining time is spent on customizing workflows, training users, and fine-tuning automation rules to your specific business needs."
      }
    ];
  } else if (day === 2) {
    return [
      {
        question: "How does Smart CRM's AI distinguish between different types of emails?",
        answer: "Our AI uses several layers of analysis. First, it looks at the semantic content to understand the purpose (question, scheduling, introduction, etc.). Then it analyzes sentiment and urgency. It also considers relationship context - who's sending it, where they are in your pipeline, past interactions, etc. This multi-layered approach achieves over 95% accuracy in correctly categorizing emails."
      },
      {
        question: "Can Smart CRM automate outbound prospecting sequences?",
        answer: "Yes, our automation engine includes multi-channel outbound sequences. You can create templates for emails, LinkedIn messages, and call scripts, then set up rules for the timing and conditions of each touch. The system personalizes each message and can intelligently adjust the sequence based on prospect responses or activities."
      },
      {
        question: "How does the lead scoring actually work? Is it a black box AI or can we understand why leads get certain scores?",
        answer: "It's completely transparent. While we use sophisticated machine learning models, you can always see which factors influenced a particular score. The system takes into account demographic fit, behavioral signals (email opens, website visits, etc.), engagement patterns, and buying intent indicators. You can even adjust the weighting of different factors to match your specific sales process."
      },
      {
        question: "For meeting preparation, does Smart CRM integrate with video conferencing platforms?",
        answer: "Yes, we integrate with Zoom, Microsoft Teams, Google Meet, and WebEx. When a meeting is scheduled, Smart CRM automatically creates a briefing document with customer history, prepares talking points based on the meeting agenda, and can even join the call to transcribe and create AI-summarized notes afterward."
      },
      {
        question: "How does the follow-up automation know when to stop contacting someone?",
        answer: "You can configure this based on your preferences. The default setting is to stop after a certain number of unanswered attempts (typically 5-7), or when we detect negative sentiment or an explicit request to stop contact. The AI also recognizes out-of-office messages and automatically adjusts the sequence timing accordingly."
      },
      {
        question: "Can we customize the automation rules or are they pre-set?",
        answer: "Everything is fully customizable. While we provide templated automation rules based on best practices, you have complete control to modify them or create your own from scratch. You can create rules based on any combination of triggers and conditions, and you can have different rules for different products, teams, or customer segments."
      }
    ];
  } else {
    return [
      {
        question: "Can you explain more about how The Client Engine System works with Smart CRM?",
        answer: "The Client Engine System is the methodology, and Smart CRM is the technology that enables it. Each of the five components (Lead Attraction, Qualification, Conversion, Delivery, and Expansion) has specific processes that are configured in Smart CRM. For example, the Qualification component uses our AI lead scoring, while the Conversion component leverages our meeting assistant and proposal automation features. The system runs on Smart CRM's automation engine."
      },
      {
        question: "How customizable is Smart CRM for different industries?",
        answer: "Extremely customizable. We have industry-specific templates for 20+ industries including SaaS, professional services, manufacturing, real estate, financial services, etc. Beyond that, you can customize object models, field names, automation rules, email templates, pipeline stages, and reports. We also have a 'Bring Your Own AI' option for enterprises with specific AI models they want to incorporate."
      },
      {
        question: "What kind of support do you provide during and after implementation?",
        answer: "During implementation, you get direct access to an implementation specialist via video calls and a dedicated Slack channel. After implementation, all Smart CRM customers receive email and chat support with same-day response times, dedicated customer success assistance, and access to our comprehensive knowledge base and training resources."
      },
      {
        question: "Is there any guarantee if we're not seeing results?",
        answer: "Yes, we offer a 90-day money-back guarantee. If you implement Smart CRM according to our recommended approach and don't see meaningful improvements in your sales process efficiency and outcomes, we'll refund your subscription fees. We're confident in the results our platform delivers when properly implemented."
      },
      {
        question: "What makes Smart CRM different from adding AI tools on top of our existing CRM?",
        answer: "Adding AI tools to legacy CRMs creates a patchwork solution with integration challenges, inconsistent user experiences, and limited capabilities. Smart CRM was built from the ground up with AI at its core – every feature and workflow is designed around intelligence. It's like the difference between retrofitting a house with smart devices versus building a smart home from the foundation up."
      },
      {
        question: "What's included in the attendee-only pricing offer?",
        answer: "As a webinar attendee, you get exclusive access to Smart CRM at a special rate not available to the general public. This includes the full platform, implementation assistance, dedicated account manager, and priority support. We also offer a 90-day money-back guarantee so you can be completely confident in your decision. Contact your account manager for specific pricing details."
      },
      {
        question: "What's included in the implementation assistance mentioned in the special offer?",
        answer: "Our implementation assistance includes a dedicated implementation specialist, a personalized implementation plan, data migration support, configuration assistance for your specific workflows, and training sessions for your team. For masterclass attendees, we're also including a complimentary automation workshop where we'll build your first 3-5 automation rules together."
      }
    ];
  }
}

// Add the X icon component that's used in the modal
const X = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default WebinarResources;