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
}

const WebinarResources: React.FC<WebinarResourcesProps> = ({ webinarDay, transcript }) => {
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
      let transcriptText = transcript;

      // If no transcript provided, try to fetch from Supabase
      if (!transcriptText && supabase) {
        const { data, error } = await supabase
          .from('webinar_transcripts')
          .select('transcript_text')
          .eq('webinar_day_number', webinarDay)
          .single();
          
        if (error) {
          console.error("Error fetching transcript:", error);
          transcriptText = generateMockTranscriptForDay(webinarDay);
        } else {
          transcriptText = data.transcript_text;
        }
      } else if (!transcriptText) {
        // If no Supabase connection, use mock transcript
        transcriptText = generateMockTranscriptForDay(webinarDay);
      }
      
      // Create a Blob with the transcript
      const blob = new Blob([transcriptText], { type: 'text/plain' });
      
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
      let qaContent = [];
      
      // Try to fetch Q&A content from Supabase
      if (supabase) {
        const { data, error } = await supabase
          .from('webinar_transcripts')
          .select('qa_content')
          .eq('webinar_day_number', webinarDay)
          .single();
          
        if (!error && data && data.qa_content) {
          qaContent = data.qa_content;
        } else {
          // If no data or error, use mock Q&A
          qaContent = getMockQAForDay(webinarDay);
        }
      } else {
        // If no Supabase, use mock Q&A
        qaContent = getMockQAForDay(webinarDay);
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
              
              {qaContent.map((qa: { question: string, answer: string }, idx: number) => (
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
        content: "Limited time offer for webinar attendees:\n- 14-day free trial (no credit card required)\n- Implementation assistance\n- Dedicated account manager\n- 30% discount on annual plans\n- 90-day money-back guarantee"
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

// Helper function to generate mock transcript for a webinar day
function generateMockTranscriptForDay(day: number) {
  if (day === 1) {
    return `[00:00:00] Host: Welcome everyone to the Smart CRM Masterclass! I'm Dean Gilmore, and I'm thrilled to have you all here today for what I promise will be a transformative series on revolutionizing your customer relationships using our Smart CRM technology.

[00:01:15] Host: Before we dive in, let me ask you a question: How much time do you think your sales team spends on actual selling activities versus administrative work? If you're like most businesses, the answer might shock you.

[00:02:30] Host: Studies show that sales reps spend up to 65% of their time on non-selling activities, with manual data entry being the biggest culprit. That's two-thirds of your sales capacity essentially wasted!

[00:04:45] Host: This is the fundamental problem with traditional CRM systems. They were built for managers to track activity, not for sales teams to build relationships. They've become data repositories that create work rather than eliminate it.

[00:07:20] Host: Let me introduce you to Sarah, who runs a consulting business with a team of 5 sales reps. Before implementing Smart CRM, her team was drowning in administrative tasks, spending hours updating their traditional CRM.

[00:10:45] Host: Within just 30 days of implementing Smart CRM, Sarah's team saw a 46% increase in closed deals. How? Because her reps went from spending 3 hours per day on data entry to less than 30 minutes.

[00:14:50] Host: The key difference is our AI-powered approach. Smart CRM automatically captures emails, calls, and meetings. It extracts the important information and updates your CRM without anyone having to type a single character.

[00:18:30] Host: Let me show you how this works in practice. When Sarah's team receives an email from a customer, Smart CRM automatically logs it, analyzes the sentiment, extracts action items, and even suggests the next best step.

[00:23:15] Host: Another game-changing feature is our AI contact enrichment. Smart CRM automatically fills in the gaps in your contact records by pulling in relevant data from various sources, creating rich profiles that help you personalize your approach.

[00:29:40] Host: Now let's talk about the sales pipeline. Traditional CRMs show you what's happening, but Smart CRM tells you WHY it's happening and WHAT you should do about it. Our predictive analytics identify which deals are at risk and which are most likely to close.

[00:35:20] Host: Let's take a few questions before we wrap up day one.

[00:35:30] Attendee: How long does it typically take to implement Smart CRM?

[00:35:40] Host: Great question. Most businesses are up and running within a week. The email and calendar integrations can be set up in minutes, and because there's no manual data entry required, adoption happens naturally. There's no lengthy training period.

[00:37:10] Attendee: Does Smart CRM integrate with our existing tools?

[00:37:20] Host: Absolutely! We have native integrations with all major email providers, calendar systems, video conferencing tools, and document management systems. We also have an open API for custom integrations.

[00:39:45] Host: Tomorrow, we'll dive deeper into how Smart CRM's automation capabilities handle lead scoring, follow-ups, and meeting preparation. You'll see exactly how AI can augment your sales team's capabilities to achieve more with less effort.

[00:42:30] Host: Thank you all for joining Day 1 of our masterclass. I look forward to seeing you tomorrow where we'll explore "Automate, Personalize, and Scale Your Sales." Have a great evening!`;
  } else if (day === 2) {
    return `[00:00:00] Host: Welcome back everyone to Day 2 of our Smart CRM Masterclass! Yesterday we explored the problems with traditional CRM systems and introduced Smart CRM's revolutionary approach. Today, we're focusing on "Automate, Personalize, and Scale Your Sales."

[00:01:30] Host: There's a persistent myth in sales that quality requires time - that to deliver personalized service, you need to spend hours crafting individual messages and doing manual research. Today I'm going to show you why that's no longer true.

[00:03:45] Host: With Smart CRM's automation capabilities, you can deliver highly personalized experiences to each prospect while spending a fraction of the time. This isn't about replacing the human touch - it's about eliminating the busywork so you can focus on meaningful conversations.

[00:07:20] Host: Let's look at Jennifer's sales team as an example. Before Smart CRM, her 8-person team was handling about 200 leads per month. After implementing our AI automation, they're managing over 500 leads with the same headcount - and their conversion rates actually improved.

[00:11:45] Host: The first game-changing feature is our AI-powered lead scoring. Smart CRM analyzes dozens of factors about each lead - their engagement with your emails, their company profile, their behavior on your website - and assigns an accurate probability of conversion.

[00:16:30] Host: Let me demonstrate how this works. When a new lead comes in, Smart CRM immediately begins building a profile. It scans their email signature, LinkedIn profile, and company website to enrich their record. Then it analyzes their interactions to determine their level of interest.

[00:21:15] Host: The second key automation is our follow-up sequences. Instead of manually remembering to check in, Smart CRM automatically schedules perfectly timed follow-ups based on prospect behavior. These aren't generic - they're contextual to the specific situation.

[00:26:40] Host: For example, if a prospect views your pricing page three times but doesn't reach out, Smart CRM can trigger an automated email offering to walk them through options. If they mention a competitor in an email, it can suggest competitive differentiators to include in your response.

[00:32:10] Host: The third automation that Jennifer's team loves is our meeting preparation assistant. Before every call, Smart CRM automatically prepares a briefing with the customer's history, previous pain points, and suggested talking points - all without you lifting a finger.

[00:37:30] Host: Let's take some questions.

[00:37:45] Attendee: How does the system handle email personalization? I'm worried about emails sounding robotic.

[00:38:00] Host: That's an excellent concern. Smart CRM uses advanced natural language models that adapt to your writing style. The system learns from your previous communications and maintains your voice. We also have tone controls so you can adjust how formal or casual the suggestions are.

[00:40:15] Attendee: Can I customize the automation rules for my specific sales process?

[00:40:30] Host: Absolutely! While we provide templates to get you started, everything is fully customizable. You can create automation rules based on any data point in the system, and you can have different rules for different products, territories, or customer segments.

[00:43:45] Host: Tomorrow in our final session, we'll introduce The Client Engine System – a comprehensive framework for building predictable revenue through systematic sales processes, and how Smart CRM integrates with this methodology.

[00:46:30] Host: Thank you all for joining Day 2 of our masterclass. I look forward to seeing you tomorrow for our final session on "Your Future Sales System + Smart CRM Offer Reveal." Have a great evening!`;
  } else {
    return `[00:00:00] Host: Welcome to our final day of the Smart CRM Masterclass! Over the past two days, we've explored the problems with traditional CRMs and how Smart CRM's AI-powered automation revolutionizes sales processes. Today, we're bringing it all together with "Your Future Sales System + Smart CRM Offer Reveal."

[00:02:15] Host: The key to sustainable business growth isn't just having good salespeople - it's having a systematic approach to revenue generation that doesn't depend on individual talent or heroic efforts.

[00:04:30] Host: That's why we created The Client Engine System - a comprehensive framework for building predictable revenue through systematic sales processes. It's the methodology that underlies Smart CRM.

[00:08:45] Host: The Client Engine System has five components: Lead Attraction, Qualification, Conversion, Delivery, and Expansion. Each component has specific processes that can be systematized and largely automated.

[00:14:20] Host: What makes this approach different is that it creates a self-sustaining business development machine that generates consistent results without constant manual effort. Smart CRM provides the technological foundation for this system.

[00:19:45] Host: Let me show you what happens when businesses implement this approach. Mark runs an IT services company that was struggling with feast-or-famine revenue. His sales team would close a big deal, then focus on delivering, causing their pipeline to empty out.

[00:24:30] Host: After implementing The Client Engine System with Smart CRM as the foundation, Mark's company now has predictable monthly revenue growth. Their sales process runs like clockwork, with clear visibility into every stage.

[00:29:15] Host: The implementation process is straightforward and can be completed in under 7 days with our guided approach. Today I'll walk you through exactly what that looks like.

[00:35:40] Host: Day 1-2 is account setup and data import. Day 3-4 focuses on workflow configuration. Day 5 is team training, and Days 6-7 involve initial optimization based on your specific business needs.

[00:42:15] Host: Now let's talk about how you can get started. We're offering a special package exclusively for masterclass attendees.

[00:43:30] Host: You'll get a 14-day free trial with no credit card required, implementation assistance from our customer success team, a dedicated account manager, and a 30% discount on annual plans if you decide to continue.

[00:47:15] Host: Let's take some final questions before we wrap up.

[00:47:30] Attendee: How does Smart CRM compare to other AI-powered CRMs on the market?

[00:47:45] Host: Great question. While there are other CRMs beginning to add AI features, Smart CRM was built from the ground up with AI at its core. Most competitors are adding AI as an afterthought to legacy systems. The difference is like adding electric motors to a gas car versus building a Tesla - one is an adaptation, the other is a complete reimagining of what's possible.

[00:50:15] Attendee: What kind of ROI should we expect and how quickly?

[00:50:30] Host: Most customers see positive ROI within the first month simply from the time savings on administrative tasks. In terms of revenue impact, our customers typically see a 20-40% increase in sales productivity within the first quarter. The exact numbers depend on your starting point and how thoroughly you implement the system.

[00:54:45] Host: As we conclude this masterclass, remember that the future of sales isn't about working harder - it's about working smarter with AI as your co-pilot. Smart CRM gives you that competitive advantage.

[00:57:30] Host: Thank you all for joining this masterclass. I hope you've found it valuable, and I look forward to potentially working with you as you transform your sales process with Smart CRM. Have a great day!`;
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
        answer: "Our pricing starts at $19/user/month for the Starter plan and $49/user/month for our Professional plan. Enterprise pricing is custom. While this is comparable to other CRMs, the ROI is much higher because of the time saved on manual data entry and the additional deals you'll close with our AI-powered insights."
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
        answer: "During implementation, you get direct access to an implementation specialist via video calls and a dedicated Slack channel. After implementation, Professional plans include email and chat support with same-day response times. Enterprise plans include a dedicated customer success manager, priority support with 2-hour response times, and quarterly business reviews."
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
        question: "If we start with the free trial, can we extend it if we need more time to evaluate?",
        answer: "Yes, while our standard trial is 14 days, we understand that proper evaluation takes time, especially for larger teams. If you're actively using the system and need more time, just reach out to your account manager, and we can extend the trial. We want you to be completely confident in your decision before committing."
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