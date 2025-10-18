import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { withAuth, AuthenticatedUser } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://smartcrm.com",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Main handler function with authentication
async function handleWebinarApi(req: Request, user: AuthenticatedUser): Promise<Response> {
  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').filter(Boolean);

    // Skip "functions" and function name in the path
    const endpoint = path.length >= 3 ? path[2] : '';

    // API endpoints
    if (req.method === "GET" && endpoint === "days") {
      // Get webinar days metadata
      return await getWebinarDays(user);
    }
    else if (req.method === "GET" && endpoint === "video-url") {
      // Get signed URL for webinar video
      const day = url.searchParams.get("day");
      return await getVideoUrl(day, user);
    }
    else if (req.method === "POST" && endpoint === "upload-url") {
      // Get pre-signed upload URL
      const { day, fileType, fileName } = await req.json();
      return await getUploadUrl(day, fileType, fileName, user);
    }
    else if (req.method === "POST" && endpoint === "generate-summary") {
      // Generate AI summary for a webinar
      const { day, videoUrl } = await req.json();
      return await generateSummary(day, videoUrl, user);
    }
    else if (req.method === "POST" && endpoint === "generate-transcript") {
      // Generate transcript for a webinar
      const { day, videoUrl } = await req.json();
      return await generateTranscript(day, videoUrl, user);
    }

    // If no matching endpoint is found
    return new Response(JSON.stringify({ error: "Endpoint not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in webinar-api function:", error);

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

// Wrap the handler with authentication middleware
serve(withAuth(handleWebinarApi));

// Get webinar days metadata
async function getWebinarDays(user: AuthenticatedUser) {
  try {
    // Mock webinar days data
    const webinarDays = [
      {
        day: 1,
        title: "The Broken Sales Process & Why It's Costing You",
        description: "In this first session, we explore the fundamental flaws in traditional sales approaches.",
        date: "Sunday, October 19, 2025",
        videoThumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
        keyPoints: [
          "Traditional CRM systems create more problems than they solve",
          "Most sales teams waste 65% of their time on non-selling activities",
          "The Smart CRM Sales Multiplier System automates routine tasks",
          "Properly implemented CRM can increase closed deals by 40-50%",
          "AI-powered contact management eliminates manual data entry"
        ]
      },
      {
        day: 2,
        title: "Automate, Personalize, and Scale Your Sales",
        description: "Day two focuses on leveraging cutting-edge AI technology to transform your sales process.",
        date: "Monday, October 20, 2025",
        videoThumbnail: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1600",
        keyPoints: [
          "AI-powered automation can cut administrative work by 68%",
          "Personalization at scale is possible with Smart CRM's templates",
          "Intelligent lead scoring ensures focus on high-value opportunities",
          "Automated follow-up sequences improve response rates by 41%",
          "AI meeting summaries capture every important detail without note-taking"
        ]
      },
      {
        day: 3,
        title: "Your Future Sales System + Smart CRM Offer Reveal",
        description: "Our final session introduces The Client Engine System – a comprehensive framework for building predictable revenue.",
        date: "Tuesday, October 21, 2025",
        videoThumbnail: "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=1600",
        keyPoints: [
          "The Client Engine System creates predictable, recurring revenue",
          "Systematic processes outperform talent-dependent approaches",
          "Smart CRM provides the technical foundation for sales transformation",
          "Implementation can be completed in under 7 days with proper guidance",
          "Early adopters receive lifetime discounts and premium support packages"
        ]
      }
    ];
    
    return new Response(JSON.stringify({ days: webinarDays }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Failed to get webinar days: ${error.message}`);
  }
}

// Get video URL
async function getVideoUrl(day: string | null, user: AuthenticatedUser) {
  try {
    if (!day) {
      throw new Error("Day parameter is required");
    }

    // Simulated video URL
    return new Response(JSON.stringify({ videoUrl: null }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to get video URL: ${errorMessage}`);
  }
}

// Get pre-signed upload URL
async function getUploadUrl(day: any, fileType: any, fileName: any, user: AuthenticatedUser) {
  try {
    if (!day || !fileType || !fileName) {
      throw new Error("Day, fileType, and fileName parameters are required");
    }

    // Simulated upload URL
    return new Response(JSON.stringify({
      uploadUrl: "https://example.com/upload",
      filePath: `webinar-day-${day}/${fileName}`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to get upload URL: ${errorMessage}`);
  }
}

// Generate summary
async function generateSummary(day: any, videoUrl: any, user: AuthenticatedUser) {
  try {
    if (!day || !videoUrl) {
      throw new Error("Day and videoUrl parameters are required");
    }

    // Simulated summary generation
    const summaryText = "This webinar provided a comprehensive overview of how traditional CRM systems are failing sales teams and introduced Smart CRM's revolutionary approach. The presenter explained the hidden costs of manual data entry and demonstrated how AI automation can free up sales reps to focus on building relationships rather than administration. The session included practical demonstrations and real-world case studies showing significant improvements in sales productivity and customer engagement.";

    const keyPoints = [
      "Smart CRM's AI component can reduce data entry time by up to 70%",
      "The platform integrates seamlessly with major email and calendar systems",
      "Users typically see ROI within the first 30 days of implementation",
      "The cloud-based system requires minimal IT support for deployment",
      "Automation rules can be customized for different sales processes and industries"
    ];

    return new Response(JSON.stringify({
      summaryText,
      keyPoints
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to generate summary: ${errorMessage}`);
  }
}

// Generate transcript
async function generateTranscript(day: any, videoUrl: any, user: AuthenticatedUser) {
  try {
    if (!day || !videoUrl) {
      throw new Error("Day and videoUrl parameters are required");
    }

    // Simulated transcript generation
    const transcriptText = generateMockTranscriptForDay(day);

    const segments = [
      { title: "Introduction", startTime: "00:00:00", endTime: "00:05:30" },
      { title: "The CRM Problem", startTime: "00:05:30", endTime: "00:15:45" },
      { title: "Smart CRM Solution", startTime: "00:15:45", endTime: "00:30:20" },
      { title: "Case Study", startTime: "00:30:20", endTime: "00:45:10" },
      { title: "Q&A Session", startTime: "00:45:10", endTime: "00:55:40" },
      { title: "Conclusion", startTime: "00:55:40", endTime: "01:00:00" }
    ];

    return new Response(JSON.stringify({
      transcriptText,
      segments
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to generate transcript: ${errorMessage}`);
  }
}

// Helper function to generate mock transcript for a webinar day
function generateMockTranscriptForDay(day: any) {
  if (day === 1) {
    return `[00:00:00] Host: Welcome everyone to the Smart CRM Masterclass! I'm Dean Gilmore, and I'm thrilled to have you all here today for what I promise will be a transformative series on revolutionizing your customer relationships using our Smart CRM technology.

[00:01:15] Host: Before we dive in, let me ask you a question: How much time do you think your sales team spends on actual selling activities versus administrative work? If you're like most businesses, the answer might shock you.

[00:02:30] Host: Studies show that sales reps spend up to 65% of their time on non-selling activities, with manual data entry being the biggest culprit. That's two-thirds of your sales capacity essentially wasted!`;
  } else if (day === 2) {
    return `[00:00:00] Host: Welcome back everyone to Day 2 of our Smart CRM Masterclass! Yesterday we explored the problems with traditional CRM systems and introduced Smart CRM's revolutionary approach. Today, we're focusing on "Automate, Personalize, and Scale Your Sales."

[00:01:30] Host: There's a persistent myth in sales that quality requires time - that to deliver personalized service, you need to spend hours crafting individual messages and doing manual research. Today I'm going to show you why that's no longer true.`;
  } else {
    return `[00:00:00] Host: Welcome to our final day of the Smart CRM Masterclass! Over the past two days, we've explored the problems with traditional CRMs and how Smart CRM's AI-powered automation revolutionizes sales processes. Today, we're bringing it all together with "Your Future Sales System + Smart CRM Offer Reveal."

[00:02:15] Host: The key to sustainable business growth isn't just having good salespeople - it's having a systematic approach to revenue generation that doesn't depend on individual talent or heroic efforts.`;
  }
}