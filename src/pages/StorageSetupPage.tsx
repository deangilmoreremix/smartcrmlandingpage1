import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Check, AlertTriangle, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StorageBucketSetup from '../components/StorageBucketSetup';

const StorageSetupPage: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const dashboardUrl = supabaseUrl ? `${supabaseUrl.replace('.supabase.co', '')}/project/_/storage/buckets` : '';

  const copyToClipboard = (text: string, type: 'url' | 'key') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <Database className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Supabase Storage Setup</h1>
              <p className="text-white/70 text-lg">
                Follow these steps to create the storage bucket for instructor images
              </p>
            </div>

            {/* Step-by-step guide */}
            <div className="space-y-6">
              {/* Step 1 */}
              <motion.div
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">Access Supabase Dashboard</h3>
                    <p className="text-white/80 mb-4">
                      Open your Supabase project dashboard and navigate to the Storage section.
                    </p>
                    <div className="bg-black/30 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <code className="text-blue-400 text-sm break-all">{supabaseUrl}</code>
                        <button
                          onClick={() => copyToClipboard(supabaseUrl, 'url')}
                          className="ml-2 p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                          title="Copy URL"
                        >
                          {copiedUrl ? (
                            <CheckCircle size={16} className="text-green-400" />
                          ) : (
                            <Copy size={16} className="text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>
                    {dashboardUrl && (
                      <a
                        href={dashboardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Open Storage Dashboard
                        <ExternalLink size={16} className="ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">Create the Avatar Bucket</h3>
                    <div className="space-y-3 text-white/80">
                      <div className="flex items-start gap-2">
                        <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <p>Click the "New bucket" button in the top right</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p>Enter bucket name: <code className="bg-black/30 px-2 py-1 rounded text-blue-400">avatar</code></p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <p>Enable "Public bucket" option (toggle the switch to ON)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <p>Click "Create bucket" to save</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                      <p className="text-yellow-400 text-sm flex items-start gap-2">
                        <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                        <span>Important: Make sure to enable "Public bucket" so images can be displayed on your website.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">Test Your Storage Bucket</h3>
                    <p className="text-white/80 mb-4">
                      Once you've created the bucket, use the tool below to verify it's working correctly.
                    </p>
                    <StorageBucketSetup />
                  </div>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                className="bg-gradient-to-br from-green-900/30 to-blue-900/20 backdrop-blur-md rounded-xl border border-green-500/30 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">Upload Instructor Image</h3>
                    <p className="text-white/80 mb-4">
                      Now you're ready to upload your instructor photo!
                    </p>
                    <div className="flex gap-3">
                      <Link
                        to="/instructor-profile"
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors inline-flex items-center"
                      >
                        Go to Instructor Profile Page
                        <ExternalLink size={16} className="ml-2" />
                      </Link>
                      <Link
                        to="/admin-upload"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center"
                      >
                        Go to Admin Upload Page
                        <ExternalLink size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/20 backdrop-blur-md rounded-xl border border-purple-500/30 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-bold text-white mb-3">Troubleshooting Tips</h3>
                <div className="space-y-2 text-white/80 text-sm">
                  <p><strong>If the bucket check fails:</strong></p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Verify you created a bucket named exactly "avatar" (lowercase)</li>
                    <li>Ensure the bucket is marked as "Public"</li>
                    <li>Check that your Supabase credentials are correctly configured</li>
                  </ul>
                  <p className="mt-4"><strong>If upload fails:</strong></p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Check file size is under 5MB</li>
                    <li>Ensure file is a valid image format (JPG, PNG, WebP)</li>
                    <li>Verify your internet connection is stable</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Back button */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-white/70 hover:text-white transition-colors inline-flex items-center"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StorageSetupPage;
