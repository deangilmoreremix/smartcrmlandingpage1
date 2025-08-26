import React, { useState } from 'react';
import { testZapierWebhook } from '../utils/formHelpers';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const ZapierWebhookTester: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean, message: string } | null>(null);

  const runTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await testZapierWebhook();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: `Test failed: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
      <h3 className="text-xl font-bold text-white mb-4">Zapier Webhook Test</h3>
      <p className="text-white/70 mb-6">
        Test if your Zapier webhook is properly configured and receiving form submissions.
      </p>
      
      <motion.button
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={runTest}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <RefreshCw className="mr-2 animate-spin" size={18} />
            Testing webhook...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2" size={18} />
            Test Zapier Webhook
          </>
        )}
      </motion.button>
      
      {testResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-lg ${
            testResult.success 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-red-500/20 border border-red-500/30'
          }`}
        >
          <div className="flex items-center">
            {testResult.success ? (
              <CheckCircle className="text-green-400 mr-2 flex-shrink-0" size={18} />
            ) : (
              <AlertCircle className="text-red-400 mr-2 flex-shrink-0" size={18} />
            )}
            <p className="text-white">{testResult.message}</p>
          </div>
          
          {testResult.success && (
            <p className="text-white/70 text-sm mt-2">
              Check your Zapier account to confirm the test data was received.
            </p>
          )}
          
          {!testResult.success && (
            <div className="mt-2 text-white/70 text-sm">
              <p className="font-medium">Troubleshooting steps:</p>
              <ol className="list-decimal ml-5 mt-1 space-y-1">
                <li>Verify the webhook URL is correct in formHelpers.ts</li>
                <li>Check if your Zapier trigger is active</li>
                <li>Ensure your network allows outgoing connections to hooks.zapier.com</li>
                <li>Check browser console for more detailed error information</li>
              </ol>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ZapierWebhookTester;