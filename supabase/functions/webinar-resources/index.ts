import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";
import * as pdfLib from "npm:pdfkit@0.13.0";
import { Buffer } from "node:buffer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Initialize Supabase client
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  });
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').filter(Boolean);
    
    // Skip "functions" and function name in the path
    const endpoint = path.length >= 3 ? path[2] : '';
    
    // Initialize Supabase client
    const supabase = getSupabaseClient();
    
    // API endpoints
    if (req.method === "GET" && endpoint === "slides") {
      // Get presentation slides for a webinar day
      const day = url.searchParams.get("day");
      return await getSlides(supabase, day);
    } 
    else if (req.method === "GET" && endpoint === "implementation-guide") {
      // Get implementation guide for a webinar day
      const day = url.searchParams.get("day");
      return await getImplementationGuide(supabase, day);
    }
    else if (req.method === "GET" && endpoint === "transcript") {
      // Get webinar transcript
      const day = url.searchParams.get("day");
      return await getTranscript(supabase, day);
    }
    else if (req.method === "GET" && endpoint === "qa") {
      // Get Q&A content from a webinar
      const day = url.searchParams.get("day");
      return await getQAContent(supabase, day);
    }
    
    // If no matching endpoint is found
    return new Response(JSON.stringify({ error: "Endpoint not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in webinar-resources function:", error.message);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Get presentation slides for a webinar day
async function getSlides(supabase, day) {
  try {
    if (!day) {
      throw new Error("Day parameter is required");
    }
    
    // Try to get slides from database first
    // This would be a real implementation, but for this example we'll create mock slides
    
    // Create a PDF with slides content
    const pdfDoc = new pdfLib.default();
    
    // Add title
    pdfDoc.fontSize(22);
    pdfDoc.text(`Smart CRM Masterclass - Day ${day}`, 100, 100);
    
    // Add subtitle
    pdfDoc.fontSize(16);
    pdfDoc.text("Presentation Slides", 100, 140);
    
    // Add date
    const today = new Date();
    pdfDoc.fontSize(12);
    pdfDoc.text(`Generated: ${today.toLocaleDateString()}`, 100, 170);
    
    // Add content based on webinar day
    pdfDoc.fontSize(14);
    
    let yPos = 200;
    
    // Day-specific slide content based on day
    const slideContent = getSlideContentForDay(day);
    
    slideContent.forEach((slide, i) => {
      // Add slide number
      pdfDoc.fontSize(14);
      pdfDoc.text(`Slide ${i+1}: ${slide.title}`, 100, yPos);
      yPos += 30;
      
      // Add slide content
      pdfDoc.fontSize(12);
      pdfDoc.text(slide.content, 120, yPos, { width: 400 });
      yPos += 100;
      
      // Add a new page if needed
      if (i < slideContent.length - 1 && yPos > 600) {
        pdfDoc.addPage();
        yPos = 100;
      }
    });
    
    // Finalize PDF
    const chunks = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    
    // Convert to buffer when finished
    const pdfBuffer = await new Promise((resolve) => {
      pdfDoc.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });
      pdfDoc.end();
    });
    
    // Convert buffer to base64
    const base64Pdf = (pdfBuffer as Buffer).toString('base64');
    
    return new Response(JSON.stringify({ 
      slides: base64Pdf,
      filename: `Smart_CRM_Day${day}_Slides.pdf` 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Failed to get slides: ${error.message}`);
  }
}

// Get implementation guide for a webinar day
async function getImplementationGuide(supabase, day) {
  try {
    if (!day) {
      throw new Error("Day parameter is required");
    }
    
    // In a real implementation, we would fetch the guide content from the database
    // For this example, we'll return mock guide content
    
    const guideContent = getImplementationGuideForDay(day);
    
    return new Response(JSON.stringify({ 
      guide: guideContent,
      title: `Smart CRM Implementation Guide - Day ${day}`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Failed to get implementation guide: ${error.message}`);
  }
}

// Get transcript for a webinar day
async function getTranscript(supabase, day) {
  try {
    if (!day) {
      throw new Error("Day parameter is required");
    }
    
    // Try to get the transcript from the database
    const { data, error } = await supabase
      .from('webinar_transcripts')
      .select('transcript_text')
      .eq('webinar_day_number', parseInt(day))
      .single();
      
    let transcriptText;
    
    if (error) {
      console.log("Error fetching transcript from database:", error);
      // If no transcript in DB, generate a mock one
      transcriptText = generateMockTranscriptForDay(day);
    } else {
      transcriptText = data.transcript_text;
    }
    
    return new Response(JSON.stringify({ 
      transcript: transcriptText,
      filename: `Smart_CRM_Day${day}_Transcript.txt` 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Failed to get transcript: ${error.message}`);
  }
}

// Get Q&A content from a webinar
async function getQAContent(supabase, day) {
  try {
    if (!day) {
      throw new Error("Day parameter is required");
    }
    
    // Try to get Q&A content from the database
    const { data, error } = await supabase
      .from('webinar_transcripts')
      .select('qa_content')
      .eq('webinar_day_number', parseInt(day))
      .single();
      
    let qaContent;
    
    if (error || !data.qa_content || data.qa_content.length === 0) {
      console.log("Error fetching Q&A from database or empty Q&A:", error);
      // If no Q&A in DB, use mock data
      qaContent = getMockQAForDay(day);
    } else {
      qaContent = data.qa_content;
    }
    
    return new Response(JSON.stringify({ 
      qaContent: qaContent,
      title: `Q&A from Day ${day} Webinar`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Failed to get Q&A content: ${error.message}`);
  }
}

// Helper function to get mock slide content based on webinar day
function getSlideContentForDay(day) {
  if (day === "1") {
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
      }
    ];
  } else if (day === "2") {
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
        title: "Smart CRM Special Offer",
        content: "Limited time offer for webinar attendees:\n- 14-day free trial (no credit card required)\n- Implementation assistance\n- Dedicated account manager\n- 30% discount on annual plans\n- 90-day money-back guarantee"
      }
    ];
  }
}

// Helper function to get mock implementation guide content
function getImplementationGuideForDay(day) {
  if (day === "1") {
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
  } else if (day === "2") {
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
function generateMockTranscriptForDay(day) {
  if (day === "1") {
    return `[00:00:00] Host: Welcome everyone to the Smart CRM Masterclass! I'm Dean Gilmore, and I'm thrilled to have you all here today for what I promise will be a transformative series on revolutionizing your customer relationships using our Smart CRM technology.

[00:01:15] Host: Before we dive in, let me ask you a question: How much time do you think your sales team spends on actual selling activities versus administrative work? If you're like most businesses, the answer might shock you.

[00:02:30] Host: Studies show that sales reps spend up to 65% of their time on non-selling activities, with manual data entry being the biggest culprit. That's two-thirds of your sales capacity essentially wasted!`;
  } else if (day === "2") {
    return `[00:00:00] Host: Welcome back everyone to Day 2 of our Smart CRM Masterclass! Yesterday we explored the problems with traditional CRM systems and introduced Smart CRM's revolutionary approach. Today, we're focusing on "Automate, Personalize, and Scale Your Sales."

[00:01:30] Host: There's a persistent myth in sales that quality requires time - that to deliver personalized service, you need to spend hours crafting individual messages and doing manual research. Today I'm going to show you why that's no longer true.`;
  } else {
    return `[00:00:00] Host: Welcome to our final day of the Smart CRM Masterclass! Over the past two days, we've explored the problems with traditional CRMs and how Smart CRM's AI-powered automation revolutionizes sales processes. Today, we're bringing it all together with "Your Future Sales System + Smart CRM Offer Reveal."

[00:02:15] Host: The key to sustainable business growth isn't just having good salespeople - it's having a systematic approach to revenue generation that doesn't depend on individual talent or heroic efforts.`;
  }
}

// Helper function to get mock Q&A content for a webinar day
function getMockQAForDay(day) {
  if (day === "1") {
    return [
      {
        question: "How does Smart CRM handle data from my existing CRM system?",
        answer: "We have a comprehensive data migration process that imports all your contacts, deals, notes, and historical activity. Our migration specialists will help ensure nothing is lost during the transition. We support direct imports from Salesforce, HubSpot, Zoho, and most other major CRM systems."
      },
      {
        question: "Does Smart CRM work for complex B2B sales cycles or just simple B2C sales?",
        answer: "Smart CRM is actually designed with complex B2B sales cycles in mind. Our AI-powered pipeline and relationship tracking features are particularly valuable for multi-stakeholder sales that span weeks or months. The more complex your sale, the more value you'll get from our automation and insight capabilities."
      }
    ];
  } else if (day === "2") {
    return [
      {
        question: "How does Smart CRM's AI distinguish between different types of emails?",
        answer: "Our AI uses several layers of analysis. First, it looks at the semantic content to understand the purpose (question, scheduling, introduction, etc.). Then it analyzes sentiment and urgency. It also considers relationship context - who's sending it, where they are in your pipeline, past interactions, etc. This multi-layered approach achieves over 95% accuracy in correctly categorizing emails."
      },
      {
        question: "Can Smart CRM automate outbound prospecting sequences?",
        answer: "Yes, our automation engine includes multi-channel outbound sequences. You can create templates for emails, LinkedIn messages, and call scripts, then set up rules for the timing and conditions of each touch. The system personalizes each message and can intelligently adjust the sequence based on prospect responses or activities."
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
      }
    ];
  }
}