import { getSupabaseClient } from './supabaseClient';

export interface WebinarData {
  transcript: {
    id: string;
    webinar_day_number: number;
    transcript_text: string;
    segments: any[];
    video_url: string;
    key_moments: any[];
    qa_content: any[];
    sentiment_analysis: any;
    chapters: any[];
  } | null;
  summary: {
    id: string;
    webinar_day_number: number;
    webinar_title: string;
    summary_text: string;
    key_points: string[];
    video_url: string;
    duration: number;
  } | null;
  chapters: {
    id: string;
    webinar_day_number: number;
    chapter_title: string;
    start_time: string;
    end_time: string;
    description: string;
    chapter_order: number;
  }[];
}

// Fetch complete webinar data for a specific day
export const fetchWebinarData = async (day: number): Promise<WebinarData> => {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Database connection not available');
  }
  
  try {
    // Fetch transcript
    const { data: transcript, error: transcriptError } = await supabase
      .from('webinar_transcripts')
      .select('*')
      .eq('webinar_day_number', day)
      .single();
    
    // Fetch summary
    const { data: summary, error: summaryError } = await supabase
      .from('ai_summaries')
      .select('*')
      .eq('webinar_day_number', day)
      .single();
    
    // Fetch chapters
    const { data: chapters, error: chaptersError } = await supabase
      .from('webinar_chapters')
      .select('*')
      .eq('webinar_day_number', day)
      .order('chapter_order');
    
    // Log any errors but don't fail completely
    if (transcriptError) console.warn('Transcript fetch error:', transcriptError);
    if (summaryError) console.warn('Summary fetch error:', summaryError);
    if (chaptersError) console.warn('Chapters fetch error:', chaptersError);
    
    return {
      transcript: transcriptError ? null : transcript,
      summary: summaryError ? null : summary,
      chapters: chaptersError ? [] : chapters || []
    };
  } catch (error) {
    console.error('Error fetching webinar data:', error);
    throw new Error('Failed to load webinar data');
  }
};

// Upload webinar video and process it
export const uploadWebinarVideo = async (
  file: File, 
  webinarDay: number, 
  title: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Database connection not available');
    }
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `webinar-day-${webinarDay}-${Date.now()}.${fileExt}`;
    const filePath = `webinars/${fileName}`;
    
    // Upload video to storage
    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, file);
    
    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);
    
    // Create video upload record
    const { error: recordError } = await supabase
      .from('video_uploads')
      .insert({
        file_name: fileName,
        original_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        status: 'uploaded',
        metadata: {
          webinar_day: webinarDay,
          title: title
        }
      });
    
    if (recordError) {
      console.warn('Failed to create video record:', recordError);
    }
    
    // Process webinar (generate transcript, summary, chapters)
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/webinar-processor/process-webinar`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webinarDay,
        videoUrl: urlData.publicUrl,
        title
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to process webinar');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Upload error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Upload failed' 
    };
  }
};

// Generate AI summary for existing webinar
export const generateWebinarSummary = async (
  webinarDay: number, 
  transcriptText: string
): Promise<{ success: boolean; summary?: any; error?: string }> => {
  try {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/webinar-processor/generate-summary`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webinarDay,
        transcriptText
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate summary');
    }
    
    const result = await response.json();
    return { success: true, summary: result.summary };
  } catch (error) {
    console.error('Summary generation error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Summary generation failed' 
    };
  }
};

// Extract chapters from transcript
export const extractWebinarChapters = async (
  webinarDay: number, 
  transcriptText: string
): Promise<{ success: boolean; chapters?: any[]; error?: string }> => {
  try {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/webinar-processor/extract-chapters`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webinarDay,
        transcriptText
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to extract chapters');
    }
    
    const result = await response.json();
    return { success: true, chapters: result.chapters };
  } catch (error) {
    console.error('Chapter extraction error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Chapter extraction failed' 
    };
  }
};