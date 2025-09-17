import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, BookOpen, Play, FileText, Download, Loader2, AlertTriangle, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import WebinarPlayer from './WebinarPlayer';
import WebinarResources from './WebinarResources';
import InstructorProfile from './InstructorProfile';
import SocialShare from './SocialShare';
import SEOMetaTags from './SEOMetaTags';
import { getSupabaseClient } from '../utils/supabaseClient';

interface WebinarData {
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

interface WebinarDayInfo {
  day: number;
  title: string;
  description: string;
  date: string;
  videoThumbnail: string;
  keyPoints: string[];
}

const webinarDaysInfo: WebinarDayInfo[] = [
  {
    day: 1,
    title: "The Broken Sales Process & Why It's Costing You",
    description: "In this first session, we explore the fundamental flaws in traditional sales approaches and introduce Smart CRM's revolutionary solution.",
    date: "September 21, 2025 at 8:00 PM EST",
    videoThumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
    keyPoints: [
      "Traditional CRM systems create more problems than they solve",
      "Most sales teams waste 65% of their time on non-selling activities",
      "The Smart CRM approach automates routine tasks",
      "Properly implemented CRM can increase closed deals by 40-50%",
      "AI-powered contact management eliminates manual data entry"
    ]
  },
  {
    day: 2,
    title: "Automate, Personalize, and Scale Your Sales",
    description: "Day two focuses on leveraging cutting-edge AI technology to transform your sales process through automation and personalization.",
    date: "September 22, 2025 at 3:00 PM EST",
    videoThumbnail: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1600",
    keyPoints: [
      "AI-powered automation can cut administrative work by 68%",
      "Personalization at scale is possible with Smart CRM's templates",
      "Intelligent lead scoring ensures focus on high-value opportunities",
      "Automated follow-up sequences improve response rates by 41%",
      "AI meeting summaries capture every important detail"
    ]
  },
  {
    day: 3,
    title: "Your Future Sales System + Smart CRM Offer Reveal",
    description: "Our final session introduces The Client Engine System – a comprehensive framework for building predictable revenue through systematic processes.",
    date: "September 23, 2025 at 3:00 PM EST",
    videoThumbnail: "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=1600",
    keyPoints: [
      "The Client Engine System creates predictable, recurring revenue",
      "Systematic processes outperform talent-dependent approaches",
      "Smart CRM provides the technical foundation for sales transformation",
      "Implementation can be completed in under 7 days with proper guidance",
      "Exclusive offers and bonuses for attendees"
    ]
  }
];

const WebinarRecapPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDay, setSelectedDay] = useState<number>(parseInt(searchParams.get('day') || '1'));
  const [webinarData, setWebinarData] = useState<WebinarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [activeChapter, setActiveChapter] = useState<any>(null);
  
  // Get current webinar day info
  const currentDayInfo = webinarDaysInfo.find(day => day.day === selectedDay) || webinarDaysInfo[0];
  
  // Fetch webinar data from Supabase
  const fetchWebinarData = async (day: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Database connection not available');
      }
      
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
      
      // Check if we have any data
      if (transcriptError && summaryError && chaptersError) {
        throw new Error('No webinar data found for this day');
      }
      
      setWebinarData({
        transcript: transcriptError ? null : transcript,
        summary: summaryError ? null : summary,
        chapters: chaptersError ? [] : chapters || []
      });
    } catch (err: any) {
      console.error('Error fetching webinar data:', err);
      setError(err.message || 'Failed to load webinar data');
    } finally {
      setLoading(false);
    }
  };
  
  // Update URL when day changes
  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    setSearchParams({ day: day.toString() });
  };
  
  // Fetch data when component mounts or day changes
  useEffect(() => {
    fetchWebinarData(selectedDay);
  }, [selectedDay]);
  
  // Update active chapter based on current playback time
  useEffect(() => {
    if (webinarData?.chapters && currentPlaybackTime > 0) {
      const timeToSeconds = (timeStr: string): number => {
        const parts = timeStr.split(':').map(Number);
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
      };
      
      const current = webinarData.chapters.find(chapter => {
        const start = timeToSeconds(chapter.start_time);
        const end = timeToSeconds(chapter.end_time);
        return currentPlaybackTime >= start && currentPlaybackTime < end;
      });
      
      setActiveChapter(current || null);
    }
  }, [currentPlaybackTime, webinarData?.chapters]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <SEOMetaTags 
        title={`${currentDayInfo.title} - Smart CRM Masterclass Recap`}
        description={`${currentDayInfo.description} Learn from our Smart CRM masterclass recording.`}
        ogType="article"
        schemaType="Event"
        schemaData={{
          name: `Smart CRM Masterclass Day ${selectedDay}`,
          description: currentDayInfo.description,
          startDate: selectedDay === 1 ? '2025-09-21T20:00:00-05:00' : 
                      selectedDay === 2 ? '2025-09-22T15:00:00-05:00' : 
                      '2025-09-23T15:00:00-05:00'
        }}
      />
      
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="text-white/70 hover:text-white flex items-center transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>
          </div>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Smart CRM Masterclass Recap</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Access recordings, transcripts, and resources from our comprehensive 3-day Smart CRM training series.
            </p>
          </motion.div>
          
          {/* Day Selection */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="inline-flex bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/20">
                {webinarDaysInfo.map((dayInfo) => (
                  <motion.button
                    key={dayInfo.day}
                    className={`px-6 py-3 rounded-lg text-sm font-medium flex items-center ${
                      selectedDay === dayInfo.day 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => handleDayChange(dayInfo.day)}
                    whileHover={{ scale: selectedDay !== dayInfo.day ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar size={16} className="mr-2" />
                    <span>Day {dayInfo.day}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="animate-spin text-blue-400 mx-auto mb-4" size={48} />
                <p className="text-white/70 text-lg">Loading webinar content...</p>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {error && !loading && (
            <motion.div 
              className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertTriangle className="text-red-400 mx-auto mb-4" size={48} />
              <h3 className="text-white font-bold mb-2">Unable to Load Webinar Data</h3>
              <p className="text-white/80 mb-4">{error}</p>
              <motion.button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={() => fetchWebinarData(selectedDay)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
          
          {/* Main Content */}
          {!loading && !error && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Current Day Header */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mr-3">
                          Day {currentDayInfo.day}
                        </span>
                        <span className="text-white/60 text-sm">{currentDayInfo.date}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">{currentDayInfo.title}</h2>
                      <p className="text-white/80">{currentDayInfo.description}</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <div className="flex items-center text-white/60 text-sm">
                        <Users size={16} className="mr-2" />
                        <span>Free for Smart CRM customers</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Video Player */}
                  <div className="lg:col-span-2">
                    {webinarData?.transcript?.video_url || webinarData?.summary?.video_url ? (
                      <WebinarPlayer
                        videoUrl={webinarData.transcript?.video_url || webinarData.summary?.video_url || ''}
                        title={webinarData.summary?.webinar_title || currentDayInfo.title}
                        chapters={webinarData.chapters.map(chapter => ({
                          id: chapter.id,
                          title: chapter.chapter_title,
                          startTime: chapter.start_time,
                          endTime: chapter.end_time,
                          description: chapter.description
                        }))}
                        thumbnailUrl={currentDayInfo.videoThumbnail}
                        onTimeUpdate={setCurrentPlaybackTime}
                        className="mb-8"
                      />
                    ) : (
                      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 text-center mb-8">
                        <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 flex items-center justify-center mb-4">
                          <div className="text-center">
                            <Play size={48} className="text-white/40 mx-auto mb-2" />
                            <p className="text-white/60">Video not yet available</p>
                          </div>
                        </div>
                        <p className="text-white/80">
                          This webinar recording will be available after the live session on {currentDayInfo.date}.
                        </p>
                      </div>
                    )}
                    
                    {/* AI Summary Section */}
                    {webinarData?.summary && (
                      <motion.div 
                        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center mb-4">
                          <Sparkles className="text-blue-400 mr-2" size={20} />
                          <h3 className="text-xl font-bold text-white">AI-Generated Summary</h3>
                        </div>
                        
                        <p className="text-white/80 mb-6">{webinarData.summary.summary_text}</p>
                        
                        {webinarData.summary.key_points && webinarData.summary.key_points.length > 0 && (
                          <div>
                            <h4 className="text-white font-medium mb-3">Key Takeaways:</h4>
                            <div className="space-y-2">
                              {webinarData.summary.key_points.map((point, idx) => (
                                <motion.div 
                                  key={idx}
                                  className="flex items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * idx + 0.3 }}
                                >
                                  <Star className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={14} />
                                  <span className="text-white/80 text-sm">{point}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                    
                    {/* Interactive Transcript */}
                    {webinarData?.transcript && (
                      <motion.div 
                        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <FileText className="text-purple-400 mr-2" size={20} />
                            <h3 className="text-xl font-bold text-white">Interactive Transcript</h3>
                          </div>
                          <Download 
                            className="text-white/60 hover:text-white cursor-pointer" 
                            size={18} 
                            onClick={() => {
                              const blob = new Blob([webinarData.transcript?.transcript_text || ''], { type: 'text/plain' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `Smart_CRM_Day${selectedDay}_Transcript.txt`;
                              a.click();
                              URL.revokeObjectURL(url);
                            }}
                          />
                        </div>
                        
                        <div className="bg-white/5 rounded-lg p-4 max-h-96 overflow-y-auto">
                          <div className="whitespace-pre-wrap text-white/80 text-sm leading-relaxed">
                            {webinarData.transcript.transcript_text}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Sidebar */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Active Chapter */}
                    {activeChapter && (
                      <motion.div 
                        className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl border border-blue-500/30 p-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center mb-2">
                          <motion.div
                            animate={{ 
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Play className="text-blue-400 mr-2" size={16} />
                          </motion.div>
                          <span className="text-blue-400 text-sm font-medium">Now Playing</span>
                        </div>
                        <h4 className="text-white font-medium text-sm mb-1">{activeChapter.chapter_title}</h4>
                        <p className="text-white/70 text-xs">{activeChapter.description}</p>
                      </motion.div>
                    )}
                    
                    {/* Instructor Profile */}
                    <InstructorProfile showFullProfile={false} />
                    
                    {/* Webinar Resources */}
                    <WebinarResources 
                      webinarDay={selectedDay}
                      transcript={webinarData?.transcript?.transcript_text}
                      qaContent={webinarData?.transcript?.qa_content}
                      summary={webinarData?.summary}
                    />
                    
                    {/* Day Overview */}
                    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center">
                        <BookOpen className="mr-2 text-green-400" size={20} />
                        Day {selectedDay} Overview
                      </h3>
                      
                      <div className="space-y-3">
                        {currentDayInfo.keyPoints.map((point, idx) => (
                          <motion.div 
                            key={idx}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <Star className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={14} />
                            <span className="text-white/80 text-sm">{point}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Social Share */}
                    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                      <h3 className="text-white font-medium mb-4">Share This Webinar</h3>
                      <SocialShare 
                        url={window.location.href}
                        title={`${currentDayInfo.title} - Smart CRM Masterclass`}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Additional Content Sections */}
                {!loading && webinarData && (
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Chapters Overview */}
                    {webinarData.chapters.length > 0 && (
                      <motion.div 
                        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-xl font-bold text-white mb-4">Webinar Chapters</h3>
                        <div className="space-y-3">
                          {webinarData.chapters.map((chapter, idx) => (
                            <motion.div 
                              key={chapter.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                activeChapter?.id === chapter.id 
                                  ? 'bg-blue-500/20 border-blue-500/40' 
                                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                              }`}
                              whileHover={{ x: 3 }}
                              onClick={() => {
                                // This would integrate with video player to seek to chapter start time
                                console.log(`Jumping to chapter: ${chapter.chapter_title} at ${chapter.start_time}`);
                              }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-white font-medium text-sm">{chapter.chapter_title}</h4>
                                  {chapter.description && (
                                    <p className="text-white/60 text-xs mt-1">{chapter.description}</p>
                                  )}
                                </div>
                                <span className="text-white/50 text-xs">{chapter.start_time}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Key Moments */}
                    {webinarData.transcript?.key_moments && webinarData.transcript.key_moments.length > 0 && (
                      <motion.div 
                        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="text-xl font-bold text-white mb-4">Key Moments</h3>
                        <div className="space-y-3">
                          {webinarData.transcript.key_moments.map((moment: any, idx: number) => (
                            <motion.div 
                              key={idx}
                              className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer"
                              whileHover={{ x: 3 }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-white font-medium text-sm">{moment.title}</h4>
                                  <p className="text-white/60 text-xs mt-1">{moment.description}</p>
                                </div>
                                <span className="text-white/50 text-xs">{moment.timestamp}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WebinarRecapPage;