import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, Image, Check, AlertTriangle, Loader2 } from 'lucide-react';
import InstructorImageUploader from '../components/InstructorImageUploader';
import VideoUploader from '../components/VideoUploader';
import { getSupabaseClient } from '../utils/supabaseClient';

const AdminUploadPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trainer' | 'video'>('trainer');
  const [trainerImageUrl, setTrainerImageUrl] = useState<string | null>(null);
  const [uploadedVideos, setUploadedVideos] = useState<any[]>([]);
  const [videoDay, setVideoDay] = useState<number>(1);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleTrainerImageUpload = async (url: string) => {
    setTrainerImageUrl(url);
    setMessage({
      type: 'success',
      text: 'Trainer image uploaded successfully!'
    });

    setTimeout(() => setMessage(null), 3000);
  };

  const handleVideoUpload = async (videoData: any) => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setMessage({
        type: 'error',
        text: 'Supabase connection not available'
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ai_summaries')
        .insert([{
          webinar_day_number: videoDay,
          webinar_title: videoTitle || `Day ${videoDay} Webinar`,
          summary_text: 'Video uploaded - summary pending',
          key_points: [],
          video_url: videoData.public_url || videoData.publicUrl
        }])
        .select()
        .single();

      if (error) throw error;

      setUploadedVideos(prev => [...prev, data]);
      setMessage({
        type: 'success',
        text: `Day ${videoDay} video uploaded successfully!`
      });

      setVideoTitle('');
      setVideoDay(prev => (prev < 3 ? prev + 1 : 1));

      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error('Error saving video metadata:', err);
      setMessage({
        type: 'error',
        text: 'Failed to save video metadata'
      });
    }
  };

  const webinarTitles: Record<number, string> = {
    1: "The Broken Sales Process & Why It's Costing You",
    2: "Automate, Personalize, and Scale Your Sales",
    3: "Your Future Sales System + Smart CRM Offer Reveal"
  };

  React.useEffect(() => {
    setVideoTitle(webinarTitles[videoDay] || '');
  }, [videoDay]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Admin Upload Center</h1>
            <p className="text-white/70">Upload trainer images and webinar videos</p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              onClick={() => setActiveTab('trainer')}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                activeTab === 'trainer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image size={20} />
              Trainer Images
            </motion.button>

            <motion.button
              onClick={() => setActiveTab('video')}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                activeTab === 'video'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Video size={20} />
              Webinar Videos
            </motion.button>
          </div>

          {message && (
            <motion.div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-500/20 border border-green-500/30'
                  : 'bg-red-500/20 border border-red-500/30'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <Check size={20} className="text-green-400 mr-3" />
                ) : (
                  <AlertTriangle size={20} className="text-red-400 mr-3" />
                )}
                <p className="text-white">{message.text}</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'trainer' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Upload Trainer Image</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-medium mb-4">Upload New Image</h3>
                  <InstructorImageUploader
                    onImageUploaded={handleTrainerImageUpload}
                    showMessages={false}
                  />
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">Current Trainer Image</h3>
                  {trainerImageUrl ? (
                    <div className="border-2 border-green-500/30 rounded-lg p-2">
                      <img
                        src={trainerImageUrl}
                        alt="Trainer"
                        className="w-full rounded-lg"
                      />
                      <p className="text-green-400 text-sm mt-2 text-center">
                        Image uploaded successfully
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                      <Image size={48} className="text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">No image uploaded yet</p>
                      <p className="text-white/40 text-sm mt-2">
                        Upload an image to see preview
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Image Guidelines</h4>
                <ul className="text-white/70 text-sm space-y-1 list-disc ml-5">
                  <li>Use high-quality professional headshot or full-body photo</li>
                  <li>Recommended size: 800x600 pixels or higher</li>
                  <li>Maximum file size: 5MB</li>
                  <li>Supported formats: JPG, PNG, WebP</li>
                  <li>Use good lighting and clear background</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'video' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Upload Webinar Video</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Webinar Day</label>
                  <div className="flex gap-3">
                    {[1, 2, 3].map((day) => (
                      <motion.button
                        key={day}
                        onClick={() => setVideoDay(day)}
                        className={`px-6 py-3 rounded-lg font-medium ${
                          videoDay === day
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                        whileHover={{ scale: videoDay !== day ? 1.05 : 1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Day {day}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Video Title</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                    placeholder="Enter webinar title"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Video File</label>
                  <VideoUploader
                    onVideoUploaded={handleVideoUpload}
                    folder={`webinar-day-${videoDay}`}
                    maxSizeMB={500}
                  />
                </div>

                {uploadedVideos.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-white font-bold mb-4">Uploaded Videos</h3>
                    <div className="space-y-3">
                      {uploadedVideos.map((video, index) => (
                        <motion.div
                          key={video.id || index}
                          className="bg-white/5 border border-white/10 rounded-lg p-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-medium">
                                Day {video.webinar_day_number}: {video.webinar_title}
                              </h4>
                              <p className="text-white/60 text-sm mt-1">
                                {new Date(video.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Check size={24} className="text-green-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">Video Guidelines</h4>
                  <ul className="text-white/70 text-sm space-y-1 list-disc ml-5">
                    <li>Upload each webinar day video separately</li>
                    <li>Recommended format: MP4 (H.264 codec)</li>
                    <li>Maximum file size: 500MB per video</li>
                    <li>Resolution: 1080p or 720p recommended</li>
                    <li>Videos are automatically saved to database</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUploadPage;
