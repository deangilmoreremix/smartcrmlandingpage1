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
    
    if (req.method === "POST" && endpoint === "analyze-video") {
      // Analyze video content for insights
      const { videoId, analysisType } = await req.json();
      return await analyzeVideo(supabase, videoId, analysisType);
    }
    else if (req.method === "POST" && endpoint === "generate-thumbnail") {
      // Generate video thumbnail
      const { videoId, timestamp } = await req.json();
      return await generateThumbnail(supabase, videoId, timestamp);
    }
    else if (req.method === "POST" && endpoint === "transcribe-audio") {
      // Transcribe audio/video to text
      const { fileUrl, language } = await req.json();
      return await transcribeAudio(supabase, fileUrl, language);
    }
    else if (req.method === "POST" && endpoint === "sentiment-analysis") {
      // Perform sentiment analysis on text
      const { text, context } = await req.json();
      return await performSentimentAnalysis(supabase, text, context);
    }
    else if (req.method === "POST" && endpoint === "extract-keywords") {
      // Extract keywords and topics from content
      const { content, maxKeywords } = await req.json();
      return await extractKeywords(supabase, content, maxKeywords);
    }
    
    return new Response(JSON.stringify({ error: "Endpoint not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error("Error in ai-processor function:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Analyze video content
async function analyzeVideo(supabase: any, videoId: string, analysisType: string) {
  try {
    if (!videoId || !analysisType) {
      throw new Error("Video ID and analysis type are required");
    }
    
    // Get video record
    const { data: video, error: videoError } = await supabase
      .from('video_uploads')
      .select('*')
      .eq('id', videoId)
      .single();
    
    if (videoError) {
      throw new Error(`Video not found: ${videoError.message}`);
    }
    
    // Simulate AI analysis based on type
    let analysisResult;
    
    switch (analysisType) {
      case 'content':
        analysisResult = {
          topics: ['CRM Strategy', 'Sales Automation', 'AI Integration'],
          duration: video.duration || 3600,
          keyMoments: [
            { timestamp: '00:05:30', description: 'Introduction to Smart CRM' },
            { timestamp: '00:15:20', description: 'AI Features Overview' },
            { timestamp: '00:30:45', description: 'Implementation Strategy' }
          ]
        };
        break;
      case 'engagement':
        analysisResult = {
          engagementScore: 8.5,
          attentionPeaks: ['00:02:15', '00:18:30', '00:35:20'],
          recommendedChapters: 5,
          averageWatchTime: '85%'
        };
        break;
      default:
        analysisResult = {
          type: analysisType,
          status: 'completed',
          confidence: 0.92
        };
    }
    
    // Update video record with analysis
    const { error: updateError } = await supabase
      .from('video_uploads')
      .update({
        metadata: {
          ...video.metadata,
          analysis: analysisResult,
          analyzed_at: new Date().toISOString()
        }
      })
      .eq('id', videoId);
    
    if (updateError) {
      console.warn("Could not update video with analysis:", updateError);
    }
    
    return new Response(JSON.stringify({
      success: true,
      analysis: analysisResult,
      videoId: videoId
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Video analysis failed: ${error.message}`);
  }
}

// Generate video thumbnail
async function generateThumbnail(supabase: any, videoId: string, timestamp: string = '00:00:05') {
  try {
    if (!videoId) {
      throw new Error("Video ID is required");
    }
    
    // In a real implementation, this would generate actual thumbnails
    // For now, return a placeholder
    const thumbnailUrl = `https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600`;
    
    // Update video record with thumbnail
    const { error: updateError } = await supabase
      .from('video_uploads')
      .update({
        thumbnail_url: thumbnailUrl
      })
      .eq('id', videoId);
    
    if (updateError) {
      console.warn("Could not update video with thumbnail:", updateError);
    }
    
    return new Response(JSON.stringify({
      success: true,
      thumbnailUrl: thumbnailUrl,
      timestamp: timestamp
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Thumbnail generation failed: ${error.message}`);
  }
}

// Transcribe audio/video to text
async function transcribeAudio(supabase: any, fileUrl: string, language: string = 'en') {
  try {
    if (!fileUrl) {
      throw new Error("File URL is required");
    }
    
    // In a real implementation, this would use a speech-to-text service
    // For now, return mock transcript
    const mockTranscript = `This is a mock transcript of the audio content. In a real implementation, this would be generated using services like OpenAI Whisper, Google Speech-to-Text, or Azure Speech Services. The content would be automatically transcribed from the audio track of the video file.`;
    
    const segments = [
      { start: 0, end: 30, text: "Welcome to this presentation about Smart CRM." },
      { start: 30, end: 60, text: "Today we'll explore how AI can transform your business." },
      { start: 60, end: 90, text: "Let's start with the current challenges in customer management." }
    ];
    
    return new Response(JSON.stringify({
      success: true,
      transcript: mockTranscript,
      segments: segments,
      language: language,
      confidence: 0.95
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Audio transcription failed: ${error.message}`);
  }
}

// Perform sentiment analysis
async function performSentimentAnalysis(supabase: any, text: string, context: string = 'general') {
  try {
    if (!text) {
      throw new Error("Text is required for sentiment analysis");
    }
    
    // Mock sentiment analysis - in real implementation would use AI service
    const sentiment = {
      overall: 'positive',
      confidence: 0.87,
      scores: {
        positive: 0.72,
        neutral: 0.21,
        negative: 0.07
      },
      emotions: ['enthusiasm', 'confidence', 'optimism'],
      keyPhrases: ['transform your business', 'AI-powered', 'revolutionary approach']
    };
    
    return new Response(JSON.stringify({
      success: true,
      sentiment: sentiment,
      textLength: text.length,
      context: context
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Sentiment analysis failed: ${error.message}`);
  }
}

// Extract keywords and topics
async function extractKeywords(supabase: any, content: string, maxKeywords: number = 10) {
  try {
    if (!content) {
      throw new Error("Content is required for keyword extraction");
    }
    
    // Mock keyword extraction - in real implementation would use NLP service
    const keywords = [
      { keyword: 'CRM', relevance: 0.95, frequency: 12 },
      { keyword: 'AI automation', relevance: 0.89, frequency: 8 },
      { keyword: 'sales process', relevance: 0.82, frequency: 6 },
      { keyword: 'customer relationships', relevance: 0.78, frequency: 5 },
      { keyword: 'data entry', relevance: 0.71, frequency: 4 },
      { keyword: 'productivity', relevance: 0.68, frequency: 3 },
      { keyword: 'integration', relevance: 0.65, frequency: 3 },
      { keyword: 'analytics', relevance: 0.62, frequency: 2 }
    ].slice(0, maxKeywords);
    
    const topics = [
      { topic: 'Sales Automation', confidence: 0.92 },
      { topic: 'Customer Management', confidence: 0.88 },
      { topic: 'AI Technology', confidence: 0.85 },
      { topic: 'Business Process', confidence: 0.79 }
    ];
    
    return new Response(JSON.stringify({
      success: true,
      keywords: keywords,
      topics: topics,
      contentLength: content.length
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(`Keyword extraction failed: ${error.message}`);
  }
}