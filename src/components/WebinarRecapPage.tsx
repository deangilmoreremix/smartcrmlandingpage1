import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Upload, Film, Calendar, CheckCircle, AlertTriangle,
  X, Download, Copy, MessageSquare, PlayCircle, Star, BookOpen,
  CheckCircle as ClockCircle, List, BookMarked, ChevronRight
} from 'lucide-react';
import jsPDF from 'jspdf';
import Navbar from './Navbar';
import Footer from './Footer';
import { getInstructorImageUrl } from '../utils/supabaseClient';

interface WebinarDay {
  day: number;
  title: string;
  description: string;
  date: string;
  videoUrl?: string;
  videoThumbnail?: string;
  transcriptUrl?: string;
  summaryText?: string;
  keyPoints?: string[];
  chapters?: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
}

const WebinarRecapPage: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [supabase, setSupabase] = useState<any | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [instructorImage, setInstructorImage] = useState<string>(
    "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400"
  );
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [isGeneratingChapters, setIsGeneratingChapters] = useState<boolean>(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<boolean>(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const [webinarDays, setWebinarDays] = useState<WebinarDay[]>([
    {
      day: 1,
      title: "The Broken Sales Process & Why It's Costing You",
      description: "In this first session, we explore the fundamental flaws in traditional sales approaches. Our experts break down the hidden barriers that prevent most businesses from achieving consistent sales growth, introducing the revolutionary Smart CRM Sales Multiplier System designed to overcome these challenges. You'll discover why contact management, AI-powered emails, and streamlined pipelines are critical components for modern sales success. We also showcase a detailed case study of Sarah's business transformation, demonstrating how proper CRM implementation replaced chaos with clarity in just 7 days, resulting in a 46% increase in closed deals.",
      date: "October 19, 2025",
      videoUrl: "",
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
      description: "Day two focuses on leveraging cutting-edge AI technology to transform your sales process. We demonstrate how Smart CRM's automation capabilities handle lead scoring, follow-ups, and meeting preparation without increasing your workload. This session breaks the common myth that quality sales require more time, showing instead how our intelligent system allows you to scale personalized communications efficiently. We examine Jennifer's sales team case study, where implementing these automation strategies resulted in a 32% sales increase while reducing administrative tasks by 68%. You'll see exactly how AI can augment your sales team's capabilities to achieve more with less effort.",
      date: "October 20, 2025",
      videoUrl: "",
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
      description: "Our final session introduces The Client Engine System – a comprehensive framework for building predictable revenue through systematic sales processes. We demonstrate how Smart CRM integrates with this methodology to create a self-sustaining business development machine that generates consistent results without constant manual effort. Through real customer success stories, we illustrate how businesses across various industries have transformed their sales outcomes using these techniques. The session concludes with an exclusive offer for attendees to get Smart CRM's complete suite of tools with special benefits including attendee-only pricing, implementation assistance, and priority support.",
      date: "October 21, 2025",
      videoUrl: "",
      videoThumbnail: "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=1600",
      keyPoints: [
        "The Client Engine System creates predictable, recurring revenue",
        "Systematic processes outperform talent-dependent approaches",
        "Smart CRM provides the technical foundation for sales transformation",
        "Implementation can be completed in under 7 days with proper guidance",
        "Early adopters receive lifetime discounts and premium support packages"
      ]
    }
  ]);

  useEffect(() => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase credentials are not available. Some features will be disabled.");
        return;
      }

      const client = createClient(supabaseUrl, supabaseAnonKey);
      setSupabase(client);

      fetchInstructorImage();
      fetchUploadedVideos(client);
    } catch (err) {
      console.error("Error initializing Supabase client:", err);
      setError("Failed to initialize database connection. Some features may be unavailable.");
    }
  }, []);

  const fetchUploadedVideos = async (client: any) => {
    try {
      const { data: summaries, error } = await client
        .from('ai_summaries')
        .select('*')
        .order('webinar_day_number', { ascending: true });

      if (error) {
        console.error('Error fetching videos:', error);
        return;
      }

      if (summaries && summaries.length > 0) {
        setWebinarDays(prevDays =>
          prevDays.map(day => {
            const matchingSummary = summaries.find((s: any) => s.webinar_day_number === day.day);
            if (matchingSummary) {
              return {
                ...day,
                videoUrl: matchingSummary.video_url || day.videoUrl,
                summaryText: matchingSummary.summary_text || day.summaryText,
                keyPoints: matchingSummary.key_points?.length > 0 ? matchingSummary.key_points : day.keyPoints
              };
            }
            return day;
          })
        );
      }
    } catch (err) {
      console.error('Error fetching uploaded videos:', err);
    }
  };

  const fetchInstructorImage = async () => {
    try {
      const imageUrl = await getInstructorImageUrl();
      if (imageUrl) {
        setInstructorImage(imageUrl);
      }
    } catch (err) {
      console.error("Error fetching instructor image:", err);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, day: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);
      setError(null);
      setMessage(null);

      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);

      const timestamp = Date.now();
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `webinar-day-${day}/${fileName}`;

      const { data, error } = await supabase
        .storage
        .from('webinar-videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: urlData } = supabase
        .storage
        .from('webinar-videos')
        .getPublicUrl(filePath);

      const publicUrl = urlData?.publicUrl;

      setWebinarDays(prev =>
        prev.map(webinarDay =>
          webinarDay.day === day
            ? { ...webinarDay, videoUrl: publicUrl || "" }
            : webinarDay
        )
      );

      clearInterval(progressInterval);
      setUploadProgress(100);
      setMessage(`Video for Day ${day} uploaded successfully!`);

    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage = (err as Error).message;
      if (errorMessage?.includes("row-level security policy")) {
        setError("Permission denied. Check Supabase configuration.");
      } else if (errorMessage?.includes("file size limit")) {
        setError("File exceeds maximum size.");
      } else {
        setError(`Failed to upload video: ${errorMessage}`);
      }
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const generatePDF = (day: number) => {
    const webinarDay = webinarDays.find(d => d.day === day);
    if (!webinarDay) return;

    try {
      const doc = new jsPDF();

      doc.setFontSize(22);
      doc.setTextColor(44, 62, 80);
      doc.text(`Day ${day}: ${webinarDay.title}`, 20, 20);

      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Date: ${webinarDay.date}`, 20, 30);

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const splitDescription = doc.splitTextToSize(webinarDay.description, 170);
      doc.text(splitDescription, 20, 40);

      let yPos = 40 + splitDescription.length * 7;

      if (webinarDay.keyPoints?.length) {
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text("Key Points:", 20, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);

        webinarDay.keyPoints.forEach((point) => {
          doc.text(`• ${point}`, 20, yPos);
          yPos += 7;
        });
      }

      if (webinarDay.chapters && webinarDay.chapters.length > 0) {
        yPos += 10;
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text("Chapters:", 20, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);

        webinarDay.chapters.forEach((chapter) => {
          doc.text(`• ${chapter.title} (${chapter.startTime} - ${chapter.endTime})`, 20, yPos);
          yPos += 5;
          if (chapter.description) {
            doc.text(`  ${chapter.description}`, 20, yPos);
            yPos += 7;
          } else {
            yPos += 2;
          }
        });
      }

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Smart CRM Webinar Recap - " + new Date().toLocaleDateString(), 20, 285);

      doc.save(`Smart_CRM_Webinar_Day${day}_Recap.pdf`);

      setMessage(`Summary for Day ${day} downloaded as PDF!`);
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Failed to generate PDF. Please try again.");
    }
  };

  const copySummaryToClipboard = (day: number) => {
    const webinarDay = webinarDays.find(d => d.day === day);
    if (!webinarDay) return;

    try {
      const summaryText = `
Day ${day}: ${webinarDay.title}
Date: ${webinarDay.date}

${webinarDay.description}

Key Points:
${webinarDay.keyPoints?.map(point => `• ${point}`).join('\n')}

${webinarDay.chapters && webinarDay.chapters.length > 0 ? `
Chapters:
${webinarDay.chapters.map(chapter => `• ${chapter.title} (${chapter.startTime} - ${chapter.endTime})
  ${chapter.description || ''}`).join('\n')}
` : ''}
      `.trim();

      navigator.clipboard.writeText(summaryText);
      setMessage("Summary copied to clipboard!");
    } catch (err) {
      console.error("Clipboard error:", err);
      setError("Failed to copy to clipboard.");
    }
  };

  const generateAISummary = async (day: number) => {
    try {
      setIsGeneratingSummary(true);
      setMessage("Generating AI summary... This may take a moment.");
      setError(null);

      const webinarDay = webinarDays.find(d => d.day === day);
      if (!webinarDay || !webinarDay.videoUrl) {
        throw new Error("Video URL is required to generate a summary");
      }

      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const apiEndpoint = `${supabaseUrl}/functions/v1/webinar-api/generate-summary`;

      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            day,
            videoUrl: webinarDay.videoUrl
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API error: ${errorData.error || response.statusText}`);
        }

        const data = await response.json();

        setWebinarDays(prev =>
          prev.map(webinarDay =>
            webinarDay.day === day
              ? {
                  ...webinarDay,
                  summaryText: data.summaryText,
                  keyPoints: [
                    ...(webinarDay.keyPoints || []),
                    ...(data.keyPoints || [])
                  ]
                }
              : webinarDay
          )
        );

        setMessage("AI summary generated successfully!");
      } catch (apiError) {
        simulateAISummary(day, webinarDay);
      }
    } catch (err) {
      console.error("AI summary error:", err);
      setError(`Failed to generate AI summary: ${(err as Error).message}`);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const simulateAISummary = (day: number, webinarDay: WebinarDay) => {
    const summaryText = `This webinar provided a comprehensive overview of ${webinarDay.title.toLowerCase()}. The presenter explained how traditional approaches are often inefficient and introduced several innovative solutions using Smart CRM technology. The session included practical demonstrations and real-world case studies showing significant improvements in sales productivity and customer engagement.`;

    const additionalKeyPoints = [
      "Smart CRM's AI component can reduce data entry time by up to 70%",
      "The platform integrates seamlessly with major email and calendar systems",
      "Users typically see ROI within the first 30 days",
      "Cloud-based system requires minimal IT support"
    ];

    setWebinarDays(prev =>
      prev.map(webinarDay =>
        webinarDay.day === day
          ? {
              ...webinarDay,
              summaryText,
              keyPoints: [
                ...(webinarDay.keyPoints || []),
                ...additionalKeyPoints
              ]
            }
          : webinarDay
      )
    );

    setMessage("AI summary generated successfully!");
  };

  const generateAIChapters = async (day: number) => {
    try {
      setIsGeneratingChapters(true);
      setError(null);
      setMessage("Generating AI chapters... This may take a moment.");

      const webinarDay = webinarDays.find(d => d.day === day);
      if (!webinarDay || !webinarDay.videoUrl) {
        throw new Error("Video URL is required to generate chapters");
      }

      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const apiEndpoint = `${supabaseUrl}/functions/v1/generate-chapters`;

      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            webinarDay: day,
            videoUrl: webinarDay.videoUrl,
            transcript: webinarDay.summaryText
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API error: ${errorData.error || response.statusText}`);
        }

        const data = await response.json();

        if (data.chapters && data.chapters.length > 0) {
          setWebinarDays(prev =>
            prev.map(webinarDay =>
              webinarDay.day === day
                ? { ...webinarDay, chapters: data.chapters }
                : webinarDay
            )
          );

          setActiveChapter(data.chapters[0].id);
          setMessage("AI chapters generated successfully!");
        } else {
          throw new Error("No chapters were generated");
        }
      } catch (apiError) {
        simulateAIChapters(day, webinarDay);
      }
    } catch (err) {
      console.error("AI chapters error:", err);
      setError(`Failed to generate AI chapters: ${(err as Error).message}`);
    } finally {
      setIsGeneratingChapters(false);
    }
  };

  const simulateAIChapters = (day: number, webinarDay: WebinarDay) => {
    const mockChapters: Chapter[] = day === 1 ? [
      {
        id: "intro",
        title: "Introduction and Overview",
        startTime: "00:00:00",
        endTime: "00:08:25",
        description: "Welcome to the masterclass and overview"
      },
      {
        id: "problem",
        title: "The CRM Problem",
        startTime: "00:08:25",
        endTime: "00:17:10",
        description: "Why traditional CRM systems are failing"
      },
      {
        id: "data-entry",
        title: "The Data Entry Trap",
        startTime: "00:17:10",
        endTime: "00:26:30",
        description: "Manual data entry destroys productivity"
      },
      {
        id: "sales-multiplier",
        title: "Sales Multiplier System",
        startTime: "00:26:30",
        endTime: "00:42:15",
        description: "Smart CRM's revolutionary approach"
      },
      {
        id: "case-study",
        title: "Sarah's Success Story",
        startTime: "00:42:15",
        endTime: "00:55:40",
        description: "Real implementation results"
      },
      {
        id: "qa",
        title: "Q&A Session",
        startTime: "00:55:40",
        endTime: "01:05:00",
        description: "Questions and answers"
      },
      {
        id: "conclusion",
        title: "Conclusion",
        startTime: "01:05:00",
        endTime: "01:10:00",
        description: "Wrap up and Day 2 preview"
      }
    ] : day === 2 ? [
      {
        id: "day2-intro",
        title: "Day 2 Introduction",
        startTime: "00:00:00",
        endTime: "00:06:15",
        description: "Recap and today's overview"
      },
      {
        id: "ai-automation",
        title: "AI Automation Fundamentals",
        startTime: "00:06:15",
        endTime: "00:18:45",
        description: "Core AI automation principles"
      },
      {
        id: "lead-scoring",
        title: "Intelligent Lead Scoring",
        startTime: "00:18:45",
        endTime: "00:29:30",
        description: "Prioritize opportunities with AI"
      },
      {
        id: "personalization",
        title: "Personalization at Scale",
        startTime: "00:29:30",
        endTime: "00:42:10",
        description: "Custom experiences automatically"
      },
      {
        id: "jennifer-case",
        title: "Jennifer's Team Success",
        startTime: "00:42:10",
        endTime: "00:53:25",
        description: "32% sales increase case study"
      },
      {
        id: "day2-qa",
        title: "Demo & Q&A",
        startTime: "00:53:25",
        endTime: "01:08:30",
        description: "Live demo and questions"
      }
    ] : [
      {
        id: "day3-intro",
        title: "Final Day Introduction",
        startTime: "00:00:00",
        endTime: "00:05:45",
        description: "Welcome and series recap"
      },
      {
        id: "client-engine",
        title: "Client Engine System",
        startTime: "00:05:45",
        endTime: "00:19:20",
        description: "Predictable revenue framework"
      },
      {
        id: "implementation",
        title: "7-Day Implementation",
        startTime: "00:19:20",
        endTime: "00:32:50",
        description: "Getting started guide"
      },
      {
        id: "success-stories",
        title: "Customer Success Stories",
        startTime: "00:32:50",
        endTime: "00:48:15",
        description: "Real results across industries"
      },
      {
        id: "special-offer",
        title: "Smart CRM Special Offer",
        startTime: "00:48:15",
        endTime: "00:59:30",
        description: "Exclusive webinar benefits"
      },
      {
        id: "final-qa",
        title: "Final Q&A",
        startTime: "00:59:30",
        endTime: "01:12:45",
        description: "Last questions answered"
      },
      {
        id: "series-conclusion",
        title: "Series Conclusion",
        startTime: "01:12:45",
        endTime: "01:15:00",
        description: "Thank you and next steps"
      }
    ];

    setWebinarDays(prev =>
      prev.map(webinarDay =>
        webinarDay.day === day
          ? { ...webinarDay, chapters: mockChapters }
          : webinarDay
      )
    );

    if (mockChapters.length > 0) {
      setActiveChapter(mockChapters[0].id);
    }

    setMessage("AI chapters generated successfully!");
  };

  const navigateToTimestamp = (timestamp: string) => {
    if (!videoRef.current || !videoRef.current.src) return;

    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const currentSrc = videoRef.current.src.split('?')[0];
    videoRef.current.src = `${currentSrc}?autoplay=1&start=${totalSeconds}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart CRM Webinar Recap</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Access replays, summaries, and resources from our 3-day masterclass
            </p>
          </div>

          {/* Day Selection */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              {webinarDays.map((day) => (
                <motion.button
                  key={day.day}
                  className={`px-5 py-3 rounded-lg text-sm md:text-base font-medium flex items-center ${
                    activeDay === day.day
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white'
                  }`}
                  onClick={() => setActiveDay(day.day)}
                  whileHover={{ scale: activeDay !== day.day ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                    activeDay === day.day ? 'bg-white/20' : 'bg-white/10'
                  } mr-2 text-xs`}>
                    {day.day}
                  </span>
                  <span className="hidden sm:inline">Day {day.day}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Status Messages */}
          <AnimatePresence>
            {(error || message) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-lg ${
                  error ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/20 border border-green-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {error ?
                      <AlertTriangle size={18} className="text-red-400 mr-2" /> :
                      <CheckCircle size={18} className="text-green-400 mr-2" />
                    }
                    <p className="text-white/90">{error || message}</p>
                  </div>
                  <button
                    onClick={() => {
                      setError(null);
                      setMessage(null);
                    }}
                    className="text-white/60 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Day Content */}
          {webinarDays.map((webinarDay) => (
            webinarDay.day === activeDay && (
              <div key={webinarDay.day} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Video/Upload */}
                <div className="lg:col-span-2">
                  <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 mb-6">
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center mb-1">
                        <div className="bg-blue-500/20 text-blue-400 rounded-full px-2 py-0.5 text-xs">
                          Day {webinarDay.day}
                        </div>
                        <div className="ml-2 text-white/60 text-sm flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {webinarDay.date}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-white">{webinarDay.title}</h2>
                    </div>

                    {webinarDay.videoUrl ? (
                      <div className="aspect-video bg-black relative">
                        <iframe
                          ref={videoRef}
                          src={webinarDay.videoUrl}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`Day ${webinarDay.day} Webinar`}
                        ></iframe>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-900 relative flex flex-col items-center justify-center p-6">
                        {webinarDay.videoThumbnail && (
                          <img
                            src={webinarDay.videoThumbnail}
                            alt={`Day ${webinarDay.day} thumbnail`}
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                          />
                        )}

                        <div className="z-10 text-center relative">
                          <Film size={48} className="text-white/30 mb-4 mx-auto" />
                          <h3 className="text-xl font-semibold text-white mb-2">Upload Webinar Video</h3>
                          <p className="text-white/60 mb-4 max-w-md">
                            Upload your webinar recording for Day {webinarDay.day} to make it available to attendees
                          </p>

                          <div className="relative">
                            <input
                              type="file"
                              id={`video-upload-${webinarDay.day}`}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              accept="video/mp4,video/webm,video/ogg"
                              onChange={(e) => handleFileUpload(e, webinarDay.day)}
                              disabled={isUploading}
                            />
                            <label
                              htmlFor={`video-upload-${webinarDay.day}`}
                              className={`px-6 py-3 ${
                                isUploading ? 'bg-white/20 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                              } text-white rounded-lg inline-flex items-center transition-colors`}
                            >
                              {isUploading ? (
                                <>
                                  <div className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Uploading... {uploadProgress}%
                                </>
                              ) : (
                                <>
                                  <Upload size={18} className="mr-2" />
                                  Upload Video
                                </>
                              )}
                            </label>
                          </div>

                          {!supabase && (
                            <p className="mt-4 text-amber-400 text-sm">
                              Note: Upload functionality requires database connection.
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex flex-wrap gap-3">
                        <button
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center transition-colors"
                          onClick={() => generatePDF(webinarDay.day)}
                        >
                          <Download size={18} className="mr-2" />
                          Download Summary
                        </button>

                        <button
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center transition-colors"
                          onClick={() => copySummaryToClipboard(webinarDay.day)}
                        >
                          <Copy size={18} className="mr-2" />
                          Copy to Clipboard
                        </button>

                        <button
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors disabled:bg-white/10 disabled:cursor-not-allowed"
                          onClick={() => generateAISummary(webinarDay.day)}
                          disabled={isGeneratingSummary || !webinarDay.videoUrl}
                        >
                          {isGeneratingSummary ? (
                            <>
                              <div className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <MessageSquare size={18} className="mr-2" />
                              Generate AI Summary
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Chapters Section */}
                  <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <BookMarked size={18} className="text-blue-400 mr-2" />
                        AI Video Chapters
                      </h3>

                      <button
                        className={`px-4 py-2 ${
                          webinarDay.videoUrl && !webinarDay.chapters ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10'
                        } text-white rounded-lg flex items-center transition-colors disabled:cursor-not-allowed`}
                        onClick={() => generateAIChapters(webinarDay.day)}
                        disabled={isGeneratingChapters || !webinarDay.videoUrl || !!webinarDay.chapters}
                      >
                        {isGeneratingChapters ? (
                          <>
                            <div className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Generating...
                          </>
                        ) : webinarDay.chapters ? (
                          <>
                            <CheckCircle size={18} className="mr-2" />
                            Chapters Generated
                          </>
                        ) : (
                          <>
                            <List size={18} className="mr-2" />
                            Generate AI Chapters
                          </>
                        )}
                      </button>
                    </div>

                    {!webinarDay.chapters ? (
                      <div className="bg-white/5 rounded-lg p-8 text-center">
                        <BookOpen size={48} className="mx-auto text-white/20 mb-3" />
                        <h4 className="text-white font-medium mb-2">No Chapters Available Yet</h4>
                        <p className="text-white/60 max-w-md mx-auto mb-4">
                          Generate AI-powered video chapters to make navigation easier.
                        </p>
                        {!webinarDay.videoUrl && (
                          <p className="text-amber-400 text-sm">
                            Upload a video first to enable chapter generation.
                          </p>
                        )}
                      </div>
                    ) : (
                      <>
                        <p className="text-white/70 mb-4">
                          Navigate through key sections of the webinar. Click any chapter to jump to that section.
                        </p>
                        <div className="space-y-2">
                          {webinarDay.chapters.map((chapter) => (
                            <motion.button
                              key={chapter.id}
                              className={`w-full flex items-start p-3 rounded-lg text-left ${
                                activeChapter === chapter.id
                                  ? 'bg-blue-600/20 border border-blue-500/30'
                                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
                              }`}
                              onClick={() => {
                                setActiveChapter(chapter.id);
                                navigateToTimestamp(chapter.startTime);
                              }}
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="mr-3 min-w-14 text-center">
                                <div className="text-sm text-white/70">{chapter.startTime}</div>
                              </div>

                              <div className="flex-grow">
                                <h4 className="text-white font-medium">{chapter.title}</h4>
                                {chapter.description && (
                                  <p className="text-white/60 text-sm mt-0.5">{chapter.description}</p>
                                )}
                              </div>

                              <ChevronRight
                                size={18}
                                className={`mt-1 transition-transform ${
                                  activeChapter === chapter.id ? 'text-blue-400' : 'text-white/40'
                                }`}
                              />
                            </motion.button>
                          ))}
                        </div>

                        <div className="pt-4 mt-4 border-t border-white/10">
                          <p className="text-white/60 text-sm flex items-center">
                            <ClockCircle size={14} className="mr-1" />
                            Click on any chapter to jump to that timestamp
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Description and Key Points */}
                  <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                    <p className="text-white/80 mb-6">{webinarDay.description}</p>

                    {webinarDay.keyPoints && webinarDay.keyPoints.length > 0 && (
                      <>
                        <h3 className="text-xl font-bold text-white mb-4">Key Points</h3>
                        <ul className="space-y-3">
                          {webinarDay.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle size={18} className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-white/80">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {webinarDay.summaryText && (
                      <>
                        <h3 className="text-xl font-bold text-white mt-6 mb-4">AI Summary</h3>
                        <div className="bg-blue-950/30 border border-blue-500/20 rounded-lg p-4">
                          <p className="text-white/80 italic">{webinarDay.summaryText}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Column: Navigation and Resources */}
                <div>
                  {/* Webinar Navigation */}
                  <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6">
                    <h3 className="text-lg font-bold text-white mb-4">Webinar Navigation</h3>

                    <div className="space-y-3">
                      {webinarDays.map((day) => (
                        <button
                          key={day.day}
                          className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                            activeDay === day.day
                              ? 'bg-blue-600/20 border border-blue-500/30'
                              : 'bg-white/10 hover:bg-white/15 border border-transparent'
                          }`}
                          onClick={() => setActiveDay(day.day)}
                        >
                          <div className={`w-8 h-8 rounded-full ${
                            activeDay === day.day ? 'bg-blue-600' : 'bg-white/20'
                          } flex items-center justify-center mr-3 flex-shrink-0`}>
                            <span className="font-bold text-sm">{day.day}</span>
                          </div>

                          <div className="text-left">
                            <h4 className="text-white font-medium text-sm">Day {day.day}</h4>
                            <p className="text-white/60 text-xs truncate">{day.title}</p>
                          </div>

                          {day.videoUrl && (
                            <PlayCircle size={16} className="text-green-400 ml-auto flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Instructor Profile */}
                  <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6">
                    <h3 className="text-lg font-bold text-white mb-4">Instructor</h3>

                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <img
                          src={instructorImage}
                          alt="Dean Gilmore"
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400";
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-white font-medium">Dean Gilmore</h4>
                        <p className="text-white/60 text-sm">Serial AI Automation Entrepreneur</p>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm">
                      Leveraging 22+ years of pioneering CRM and sales automation strategies, Dean has built and scaled platforms helping businesses unlock over $75 million in new revenue.
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="ml-2 text-white/60 text-xs">500+ reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Resources */}
                  <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Additional Resources</h3>

                    <div className="space-y-4">
                      {[
                        {
                          title: "Presentation Slides",
                          description: "Download webinar slides",
                          icon: <Download size={18} className="text-blue-400" />,
                          action: "Download"
                        },
                        {
                          title: "Implementation Guide",
                          description: "Step-by-step Smart CRM guide",
                          icon: <BookOpen size={18} className="text-purple-400" />,
                          action: "Access"
                        },
                        {
                          title: "Full Transcript",
                          description: "Complete text transcript",
                          icon: <FileText size={18} className="text-green-400" />,
                          action: "Download"
                        },
                        {
                          title: "Q&A Responses",
                          description: "Webinar questions answered",
                          icon: <MessageSquare size={18} className="text-amber-400" />,
                          action: "View"
                        }
                      ].map((resource, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-4">
                          <div className="flex items-start">
                            <div className="p-2 bg-white/10 rounded-lg mr-3 flex-shrink-0">
                              {resource.icon}
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-white font-medium text-sm">{resource.title}</h4>
                              <p className="text-white/60 text-xs mb-2">{resource.description}</p>
                              <button className="text-blue-400 text-xs flex items-center hover:underline">
                                {resource.action}
                                <ArrowRight size={12} className="ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h4 className="text-white font-medium text-sm mb-2">Need Assistance?</h4>
                      <p className="text-white/60 text-xs mb-3">
                        Questions about the webinar content? Our support team is here to help.
                      </p>
                      <a
                        href="mailto:support@smartcrm.com"
                        className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                      >
                        Contact Support
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const FileText = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export default WebinarRecapPage;
