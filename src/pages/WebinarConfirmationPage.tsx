import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Video, Download, Mail, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedElement from '../components/AnimatedElement';
import CanvasConfetti from '../components/CanvasConfetti';
import { WEBINAR_DATE } from '../constants/dates';
import {
  downloadICSFile,
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
  getWebinarCalendarEvent,
  trackCalendarDownload
} from '../utils/calendarInvite';

const WebinarConfirmationPage: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [email, setEmail] = useState('');
  const [calendarAdded, setCalendarAdded] = useState(false);

  useEffect(() => {
    const registeredEmail = localStorage.getItem('webinar_registered_email');
    if (registeredEmail) {
      setEmail(registeredEmail);
    }

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(confettiTimer);
  }, []);

  const handleCalendarDownload = (type: 'ics' | 'google' | 'outlook' | 'apple') => {
    const event = getWebinarCalendarEvent();

    switch (type) {
      case 'ics':
      case 'apple':
        downloadICSFile(event);
        break;
      case 'google':
        window.open(getGoogleCalendarUrl(event), '_blank');
        break;
      case 'outlook':
        window.open(getOutlookCalendarUrl(event), '_blank');
        break;
    }

    setCalendarAdded(true);
    trackCalendarDownload(email, type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      {showConfetti && <CanvasConfetti />}
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement animation="fadeIn">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6"
              >
                <CheckCircle className="text-green-400" size={48} />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                You're Registered!
              </h1>
              <p className="text-xl text-white/80 mb-6">
                Thank you for registering for the Smart CRM webinar
              </p>
              <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slideUp" delay={0.2}>
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Video className="text-blue-400 mr-3" size={28} />
                Webinar Details
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/90 font-medium">Date</p>
                    <p className="text-white/70">{WEBINAR_DATE.DAY_OF_WEEK}, {WEBINAR_DATE.DATE}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/90 font-medium">Time</p>
                    <p className="text-white/70">{WEBINAR_DATE.TIME}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Video className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/90 font-medium">Format</p>
                    <p className="text-white/70">Live Online Webinar</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/90 font-medium">Confirmation Sent To</p>
                    <p className="text-white/70">{email || 'Your registered email'}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slideUp" delay={0.4}>
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Calendar className="text-green-400 mr-3" size={28} />
                Add to Your Calendar
              </h2>
              <p className="text-white/70 mb-6">
                Don't miss the webinar! Add it to your calendar to receive automatic reminders.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.button
                  onClick={() => handleCalendarDownload('google')}
                  className="flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="mr-2" size={18} />
                  Google Calendar
                </motion.button>

                <motion.button
                  onClick={() => handleCalendarDownload('outlook')}
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="mr-2" size={18} />
                  Outlook Calendar
                </motion.button>

                <motion.button
                  onClick={() => handleCalendarDownload('apple')}
                  className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="mr-2" size={18} />
                  Apple Calendar
                </motion.button>

                <motion.button
                  onClick={() => handleCalendarDownload('ics')}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="mr-2" size={18} />
                  Download ICS File
                </motion.button>
              </div>

              {calendarAdded && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center text-green-400"
                >
                  <CheckCircle className="mr-2" size={18} />
                  <span className="text-sm">Calendar event added successfully!</span>
                </motion.div>
              )}
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slideUp" delay={0.6}>
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What Happens Next?</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Check Your Email</h3>
                    <p className="text-white/70 text-sm">
                      You'll receive a confirmation email with all the webinar details and your unique access link.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">24-Hour Reminder</h3>
                    <p className="text-white/70 text-sm">
                      We'll send you a reminder email 24 hours before the webinar with the join link and preparation tips.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Join the Webinar</h3>
                    <p className="text-white/70 text-sm">
                      On {WEBINAR_DATE.FULL}, click the join link in your email to attend the live webinar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Get Recording Access</h3>
                    <p className="text-white/70 text-sm">
                      Can't make it live? Don't worry! All registrants will receive access to the replay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slideUp" delay={0.8}>
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-md rounded-xl border border-green-500/30 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Share With Your Team</h2>
              <p className="text-white/70 mb-6">
                Know someone who would benefit from this webinar? Share it with them!
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Share2 className="mr-2" size={18} />
                  Share Registration Page
                </Link>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fadeIn" delay={1}>
            <div className="text-center">
              <Link
                to="/"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowRight className="mr-2 rotate-180" size={18} />
                Return to Homepage
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WebinarConfirmationPage;
