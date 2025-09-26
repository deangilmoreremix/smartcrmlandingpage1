import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { withAuth, AuthenticatedUser } from "../_shared/auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://smartcrm.com",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Main handler function with authentication
async function handleGenerateChapters(req: Request, user: AuthenticatedUser): Promise<Response> {
  try {
    // Only accept POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse request body
    const body = await req.json();
    const { webinarDay, videoUrl } = body;

    // Input validation
    if (!webinarDay || typeof webinarDay !== 'number' || webinarDay < 1 || webinarDay > 3) {
      return new Response(JSON.stringify({ error: "webinarDay must be a number between 1 and 3" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (videoUrl && typeof videoUrl !== 'string') {
      return new Response(JSON.stringify({ error: "videoUrl must be a string" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate mock chapters based on webinar day
    const chapters = generateMockChapters(webinarDay);

    // Return the generated chapters with user info
    return new Response(JSON.stringify({
      success: true,
      chapters: chapters,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in generate-chapters function:", error);

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

// Wrap the handler with authentication middleware
serve(withAuth(handleGenerateChapters));

// Helper function to generate mock chapters based on webinar day
function generateMockChapters(day: number) {
  if (day === 1) {
    return [
      {
        id: "intro",
        title: "Introduction and Overview",
        startTime: "00:00:00",
        endTime: "00:08:25",
        description: "Welcome to the masterclass and overview of the series"
      },
      {
        id: "problem-identification",
        title: "The Broken CRM Paradigm",
        startTime: "00:08:25",
        endTime: "00:17:10",
        description: "Identifying the key problems with traditional CRM systems"
      },
      {
        id: "data-entry",
        title: "The Data Entry Trap",
        startTime: "00:17:10",
        endTime: "00:26:30",
        description: "How manual data entry is destroying sales productivity"
      },
      {
        id: "sales-multiplier",
        title: "The Sales Multiplier System",
        startTime: "00:26:30",
        endTime: "00:42:15",
        description: "Introduction to Smart CRM's revolutionary approach"
      },
      {
        id: "case-study",
        title: "Sarah's Success Story",
        startTime: "00:42:15",
        endTime: "00:55:40",
        description: "Real-world implementation and results"
      },
      {
        id: "qa-section",
        title: "Q&A Session",
        startTime: "00:55:40",
        endTime: "01:05:00",
        description: "Answering participant questions"
      },
      {
        id: "day1-conclusion",
        title: "Conclusion and Day 2 Preview",
        startTime: "01:05:00",
        endTime: "01:10:00",
        description: "Wrap up and what to expect tomorrow"
      }
    ];
  } else if (day === 2) {
    return [
      {
        id: "day2-intro",
        title: "Day 2 Introduction",
        startTime: "00:00:00",
        endTime: "00:06:15",
        description: "Recap of Day 1 and overview of today's content"
      },
      {
        id: "ai-automation",
        title: "AI Automation Fundamentals",
        startTime: "00:06:15",
        endTime: "00:18:45",
        description: "Core principles of AI-driven sales automation"
      },
      {
        id: "lead-scoring",
        title: "Intelligent Lead Scoring",
        startTime: "00:18:45",
        endTime: "00:29:30",
        description: "How Smart CRM prioritizes your most promising opportunities"
      },
      {
        id: "personalization",
        title: "Personalization at Scale",
        startTime: "00:29:30",
        endTime: "00:42:10",
        description: "Creating custom experiences for each prospect automatically"
      },
      {
        id: "jennifer-case",
        title: "Jennifer's Team Transformation",
        startTime: "00:42:10",
        endTime: "00:53:25",
        description: "Case study of 32% sales increase with automation"
      },
      {
        id: "day2-qa",
        title: "Live Automation Demo & Q&A",
        startTime: "00:53:25",
        endTime: "01:08:30",
        description: "Interactive demonstration and participant questions"
      }
    ];
  } else {
    return [
      {
        id: "day3-intro",
        title: "Final Day Introduction",
        startTime: "00:00:00",
        endTime: "00:05:45",
        description: "Welcome and recap of the series so far"
      },
      {
        id: "client-engine",
        title: "The Client Engine System",
        startTime: "00:05:45",
        endTime: "00:19:20",
        description: "Framework for building predictable revenue"
      },
      {
        id: "implementation",
        title: "7-Day Implementation Plan",
        startTime: "00:19:20",
        endTime: "00:32:50",
        description: "Step-by-step guide to getting started with Smart CRM"
      },
      {
        id: "success-stories",
        title: "Customer Success Stories",
        startTime: "00:32:50",
        endTime: "00:48:15",
        description: "Real results from different industries and company sizes"
      },
      {
        id: "special-offer",
        title: "Smart CRM Special Offer",
        startTime: "00:48:15",
        endTime: "00:59:30",
        description: "Exclusive benefits for webinar participants"
      },
      {
        id: "final-qa",
        title: "Final Q&A Session",
        startTime: "00:59:30",
        endTime: "01:12:45",
        description: "Answering participant questions"
      },
      {
        id: "conclusion",
        title: "Series Conclusion",
        startTime: "01:12:45",
        endTime: "01:15:00",
        description: "Thank you and next steps"
      }
    ];
  }
}