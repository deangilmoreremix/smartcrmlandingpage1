import { createClient } from "npm:@supabase/supabase-js@2.39.7";

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').filter(Boolean);
    const endpoint = path.length >= 3 ? path[2] : '';
    
    const supabase = getSupabaseClient();
    
    if (req.method === "POST" && endpoint === "process-webinar") {
      // Process webinar video - generate transcript, summary, chapters
      const { webinarDay, videoUrl, title } = await req.json();
      return await processWebinar(supabase, webinarDay, videoUrl, title);
    }
    else if (req.method === "GET" && endpoint === "webinar-data") {
      // Get complete webinar data including transcript, summary, chapters
      const day = url.searchParams.get("day");
      return await getWebinarData(supabase, day);
    }
    else if (req.method === "POST" && endpoint === "update-transcript") {
      // Update transcript for a webinar
      const { webinarDay, transcriptText, segments } = await req.json();
      return await updateTranscript(supabase, webinarDay, transcriptText, segments);
    }
    else if (req.method === "POST" && endpoint === "generate-summary") {
      // Generate AI summary from transcript
      const { webinarDay, transcriptText } = await req.json();
      return await generateSummary(supabase, webinarDay, transcriptText);
    }
    else if (req.method === "POST" && endpoint === "extract-chapters") {
      // Extract chapters from transcript
      const { webinarDay, transcriptText } = await req.json();
      return await extractChapters(supabase, webinarDay, transcriptText);
    }
    
    return new Response(JSON.stringify({ error: "Endpoint not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error("Error in webinar-processor function:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Process complete webinar - transcript, summary, chapters
async function processWebinar(supabase: any, webinarDay: number, videoUrl: string, title: string) {
  try {
    // In a real implementation, this would integrate with speech-to-text services
    // For now, we'll generate mock data
    
    const transcriptText = generateMockTranscript(webinarDay);
    const summary = generateMockSummary(webinarDay);
    const chapters = generateMockChapters(webinarDay);
    
    // Insert or update transcript
    const { data: transcriptData, error: transcriptError } = await supabase
      .from('webinar_transcripts')
      .upsert({
        webinar_day_number: webinarDay,
        transcript_text: transcriptText,
        processing_status: 'completed',
        video_url: videoUrl
      })
      .select()
      .single();
    
    if (transcriptError) {
      throw new Error(`Failed to save transcript: ${transcriptError.message}`);
    }
    
    // Insert or update summary
    const { data: summaryData, error: summaryError } = await supabase
      .from('ai_summaries')
      .upsert({
        webinar_day_number: webinarDay,
        webinar_title: title,
        summary_text: summary.text,
        key_points: summary.keyPoints,
        video_url: videoUrl
      })
      .select()
      .single();
    
    if (summaryError) {
      throw new Error(`Failed to save summary: ${summaryError.message}`);
    }
    
    // Insert chapters
    const { error: chaptersError } = await supabase
      .from('webinar_chapters')
      .delete()
      .eq('webinar_day_number', webinarDay);
    
    if (chaptersError) {
      console.warn("Could not delete existing chapters:", chaptersError);
    }
    
    const chaptersToInsert = chapters.map((chapter: any, index: number) => ({
      webinar_day_number: webinarDay,
      chapter_title: chapter.title,
      start_time: chapter.startTime,
      end_time: chapter.endTime,
      description: chapter.description,
      chapter_order: index + 1
    }));
    
    const { error: insertChaptersError } = await supabase
      .from('webinar_chapters')
      .insert(chaptersToInsert);
    
    if (insertChaptersError) {
      console.warn("Could not insert chapters:", insertChaptersError);
    }
    
    return new Response(JSON.stringify({
      success: true,
      transcript: transcriptData,
      summary: summaryData,
      chapters: chaptersToInsert
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Webinar processing failed: ${error.message}`);
  }
}

// Get complete webinar data
async function getWebinarData(supabase: any, day: string) {
  try {
    if (!day) {
      throw new Error("Day parameter is required");
    }
    
    const webinarDay = parseInt(day);
    
    // Get transcript
    const { data: transcript, error: transcriptError } = await supabase
      .from('webinar_transcripts')
      .select('*')
      .eq('webinar_day_number', webinarDay)
      .single();
    
    // Get summary
    const { data: summary, error: summaryError } = await supabase
      .from('ai_summaries')
      .select('*')
      .eq('webinar_day_number', webinarDay)
      .single();
    
    // Get chapters
    const { data: chapters, error: chaptersError } = await supabase
      .from('webinar_chapters')
      .select('*')
      .eq('webinar_day_number', webinarDay)
      .order('chapter_order');
    
    return new Response(JSON.stringify({
      transcript: transcript || null,
      summary: summary || null,
      chapters: chapters || [],
      hasTranscriptError: !!transcriptError,
      hasSummaryError: !!summaryError,
      hasChaptersError: !!chaptersError
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Failed to get webinar data: ${error.message}`);
  }
}

// Update transcript
async function updateTranscript(supabase: any, webinarDay: number, transcriptText: string, segments: any[]) {
  try {
    const { data, error } = await supabase
      .from('webinar_transcripts')
      .upsert({
        webinar_day_number: webinarDay,
        transcript_text: transcriptText,
        segments: segments,
        processing_status: 'completed'
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to update transcript: ${error.message}`);
    }
    
    return new Response(JSON.stringify({
      success: true,
      transcript: data
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Transcript update failed: ${error.message}`);
  }
}

// Generate AI summary from transcript
async function generateSummary(supabase: any, webinarDay: number, transcriptText: string) {
  try {
    // In a real implementation, this would use OpenAI or similar AI service
    // For now, generate mock summary
    const summary = generateMockSummary(webinarDay);
    
    const { data, error } = await supabase
      .from('ai_summaries')
      .upsert({
        webinar_day_number: webinarDay,
        webinar_title: `Smart CRM Masterclass - Day ${webinarDay}`,
        summary_text: summary.text,
        key_points: summary.keyPoints
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to save summary: ${error.message}`);
    }
    
    return new Response(JSON.stringify({
      success: true,
      summary: data
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Summary generation failed: ${error.message}`);
  }
}

// Extract chapters from transcript
async function extractChapters(supabase: any, webinarDay: number, transcriptText: string) {
  try {
    // Generate mock chapters - in real implementation this would use AI
    const chapters = generateMockChapters(webinarDay);
    
    // Delete existing chapters
    await supabase
      .from('webinar_chapters')
      .delete()
      .eq('webinar_day_number', webinarDay);
    
    // Insert new chapters
    const chaptersToInsert = chapters.map((chapter: any, index: number) => ({
      webinar_day_number: webinarDay,
      chapter_title: chapter.title,
      start_time: chapter.startTime,
      end_time: chapter.endTime,
      description: chapter.description,
      chapter_order: index + 1
    }));
    
    const { data, error } = await supabase
      .from('webinar_chapters')
      .insert(chaptersToInsert)
      .select();
    
    if (error) {
      throw new Error(`Failed to save chapters: ${error.message}`);
    }
    
    return new Response(JSON.stringify({
      success: true,
      chapters: data
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Chapter extraction failed: ${error.message}`);
  }
}

// Helper functions for generating mock data
function generateMockTranscript(day: number): string {
  const transcripts = {
    1: `[00:00:00] Host: Welcome everyone to the Smart CRM Masterclass! I'm Dean Gilmore, and I'm thrilled to have you all here today for what I promise will be a transformative series on revolutionizing your customer relationships using our Smart CRM technology.

[00:01:15] Host: Before we dive in, let me ask you a question: How much time do you think your sales team spends on actual selling activities versus administrative work? If you're like most businesses, the answer might shock you.

[00:02:30] Host: Studies show that sales reps spend up to 65% of their time on non-selling activities, with manual data entry being the biggest culprit. That's two-thirds of your sales capacity essentially wasted!

[00:04:45] Host: This is the fundamental problem with traditional CRM systems. They were built for managers to track activity, not for sales teams to build relationships. They've become data repositories that create work rather than eliminate it.`,
    
    2: `[00:00:00] Host: Welcome back everyone to Day 2 of our Smart CRM Masterclass! Yesterday we explored the problems with traditional CRM systems and introduced Smart CRM's revolutionary approach. Today, we're focusing on "Automate, Personalize, and Scale Your Sales."

[00:01:30] Host: There's a persistent myth in sales that quality requires time - that to deliver personalized service, you need to spend hours crafting individual messages and doing manual research. Today I'm going to show you why that's no longer true.`,
    
    3: `[00:00:00] Host: Welcome to our final day of the Smart CRM Masterclass! Over the past two days, we've explored the problems with traditional CRMs and how Smart CRM's AI-powered automation revolutionizes sales processes. Today, we're bringing it all together with "Your Future Sales System + Smart CRM Offer Reveal."

[00:02:15] Host: The key to sustainable business growth isn't just having good salespeople - it's having a systematic approach to revenue generation that doesn't depend on individual talent or heroic efforts.`
  };
  
  return transcripts[day as keyof typeof transcripts] || "No transcript available for this day.";
}

function generateMockSummary(day: number) {
  const summaries = {
    1: {
      text: "Day 1 of the Smart CRM Masterclass explored the fundamental problems with traditional CRM systems and introduced Smart CRM's revolutionary approach to customer relationship management. The session focused on how traditional CRMs create data entry burdens and fail to provide actionable insights.",
      keyPoints: [
        "Traditional CRM systems create more problems than they solve",
        "Sales reps spend 65% of time on non-selling activities",
        "Manual data entry is the biggest productivity killer",
        "Smart CRM eliminates manual work through AI automation",
        "Proper CRM implementation can increase deals by 40-50%"
      ]
    },
    2: {
      text: "Day 2 focused on Smart CRM's AI capabilities for automating repetitive tasks while maintaining personalization. The session demonstrated how automation can handle lead scoring, follow-ups, and meeting preparation automatically.",
      keyPoints: [
        "AI automation can reduce administrative work by 68%",
        "Personalization at scale is possible with Smart CRM templates",
        "Lead scoring AI focuses teams on high-value opportunities",
        "Automated follow-up sequences improve response rates",
        "Meeting preparation AI saves hours of manual work"
      ]
    },
    3: {
      text: "The final session introduced The Client Engine System - a framework for building predictable revenue through systematic sales processes. Smart CRM provides the technological foundation for this system.",
      keyPoints: [
        "The Client Engine System creates predictable revenue",
        "Systematic processes outperform talent-dependent approaches",
        "Smart CRM provides technical foundation for transformation",
        "Implementation can be completed in under 7 days",
        "Early adopters receive lifetime discounts and premium support"
      ]
    }
  };
  
  return summaries[day as keyof typeof summaries] || {
    text: "Summary not available for this day.",
    keyPoints: []
  };
}

function generateMockChapters(day: number) {
  const chapters = {
    1: [
      {
        title: "Introduction and Overview",
        startTime: "00:00:00",
        endTime: "00:08:25",
        description: "Welcome to the masterclass and overview of the series"
      },
      {
        title: "The Broken CRM Paradigm",
        startTime: "00:08:25",
        endTime: "00:17:10",
        description: "Identifying the key problems with traditional CRM systems"
      },
      {
        title: "The Data Entry Trap",
        startTime: "00:17:10",
        endTime: "00:26:30",
        description: "How manual data entry is destroying sales productivity"
      },
      {
        title: "The Smart CRM Solution",
        startTime: "00:26:30",
        endTime: "00:42:15",
        description: "Introduction to Smart CRM's revolutionary approach"
      },
      {
        title: "Case Study: Sarah's Success",
        startTime: "00:42:15",
        endTime: "00:55:40",
        description: "Real-world implementation and results"
      }
    ],
    2: [
      {
        title: "Day 2 Introduction",
        startTime: "00:00:00",
        endTime: "00:06:15",
        description: "Recap of Day 1 and overview of today's content"
      },
      {
        title: "AI Automation Fundamentals",
        startTime: "00:06:15",
        endTime: "00:18:45",
        description: "Core principles of AI-driven sales automation"
      },
      {
        title: "Intelligent Lead Scoring",
        startTime: "00:18:45",
        endTime: "00:29:30",
        description: "How Smart CRM prioritizes your most promising opportunities"
      },
      {
        title: "Personalization at Scale",
        startTime: "00:29:30",
        endTime: "00:42:10",
        description: "Creating custom experiences for each prospect automatically"
      }
    ],
    3: [
      {
        title: "Final Day Introduction",
        startTime: "00:00:00",
        endTime: "00:05:45",
        description: "Welcome and recap of the series so far"
      },
      {
        title: "The Client Engine System",
        startTime: "00:05:45",
        endTime: "00:19:20",
        description: "Framework for building predictable revenue"
      },
      {
        title: "Implementation Plan",
        startTime: "00:19:20",
        endTime: "00:32:50",
        description: "Step-by-step guide to getting started"
      },
      {
        title: "Special Offer Reveal",
        startTime: "00:32:50",
        endTime: "00:48:15",
        description: "Exclusive benefits for webinar participants"
      }
    ]
  };
  
  return chapters[day as keyof typeof chapters] || [];
}