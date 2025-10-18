import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, RefreshCw, Video, Mail, Database } from 'lucide-react';

interface TestResult {
  success: boolean;
  message: string;
  details?: any;
}

const GoToWebinarTester: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testFirstName, setTestFirstName] = useState('Test');
  const [testLastName, setTestLastName] = useState('User');

  const runTest = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        setTestResult({
          success: false,
          message: 'Supabase credentials not configured. Check your .env file.',
        });
        return;
      }

      const testData = {
        firstName: testFirstName,
        lastName: testLastName,
        email: testEmail,
        company: 'Test Company',
        source: 'GoToWebinar Test',
      };

      const registrationUrl = `${supabaseUrl}/functions/v1/webinar-registration`;

      const response = await fetch(registrationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();

      if (!response.ok && response.status !== 207) {
        setTestResult({
          success: false,
          message: result.error || `Test failed with status: ${response.status}`,
          details: result,
        });
        return;
      }

      const integrationStatus = {
        gotowebinar: result.gotowebinar?.registered || false,
        zoom: result.zoom?.registered || false,
        mailerlite: result.mailerlite?.registered || false,
        database: result.success || false,
      };

      const successCount = Object.values(integrationStatus).filter(Boolean).length;
      const totalIntegrations = 4;

      setTestResult({
        success: successCount > 0,
        message: successCount === totalIntegrations
          ? 'All integrations working perfectly!'
          : `${successCount}/${totalIntegrations} integrations successful`,
        details: {
          status: result.status,
          integrations: integrationStatus,
          registrationId: result.registrationId,
          gotowebinarJoinUrl: result.gotowebinar?.join_url,
          zoomJoinUrl: result.zoom?.join_url,
          errors: result.errors,
        },
      });
    } catch (error: any) {
      setTestResult({
        success: false,
        message: `Test failed: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Video className="mr-2 text-blue-400" size={20} />
        GoToWebinar Integration Test
      </h3>

      <p className="text-white/70 mb-6">
        Test your GoToWebinar webhook integration and verify that registrations are being sent correctly.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-white/80 text-sm mb-2">Test First Name</label>
          <input
            type="text"
            value={testFirstName}
            onChange={(e) => setTestFirstName(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-2">Test Last Name</label>
          <input
            type="text"
            value={testLastName}
            onChange={(e) => setTestLastName(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50"
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-2">Test Email</label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50"
            placeholder="Enter email address"
          />
        </div>
      </div>

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
            Testing Integration...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2" size={18} />
            Test GoToWebinar Integration
          </>
        )}
      </motion.button>

      {testResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg ${
            testResult.success
              ? 'bg-green-500/20 border border-green-500/30'
              : 'bg-red-500/20 border border-red-500/30'
          }`}
        >
          <div className="flex items-center mb-3">
            {testResult.success ? (
              <CheckCircle className="text-green-400 mr-2 flex-shrink-0" size={18} />
            ) : (
              <AlertCircle className="text-red-400 mr-2 flex-shrink-0" size={18} />
            )}
            <p className="text-white font-medium">{testResult.message}</p>
          </div>

          {testResult.details && (
            <div className="space-y-3 mt-4">
              <div className="text-white/80 text-sm">
                <p className="font-medium mb-2">Integration Status:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                    <div className="flex items-center">
                      <Video className="mr-2 text-blue-400" size={16} />
                      <span>GoToWebinar</span>
                    </div>
                    <span className={testResult.details.integrations.gotowebinar ? 'text-green-400' : 'text-red-400'}>
                      {testResult.details.integrations.gotowebinar ? 'Connected' : 'Failed'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                    <div className="flex items-center">
                      <Video className="mr-2 text-purple-400" size={16} />
                      <span>Zoom (Backup)</span>
                    </div>
                    <span className={testResult.details.integrations.zoom ? 'text-green-400' : 'text-red-400'}>
                      {testResult.details.integrations.zoom ? 'Connected' : 'Failed'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                    <div className="flex items-center">
                      <Mail className="mr-2 text-amber-400" size={16} />
                      <span>MailerLite</span>
                    </div>
                    <span className={testResult.details.integrations.mailerlite ? 'text-green-400' : 'text-red-400'}>
                      {testResult.details.integrations.mailerlite ? 'Connected' : 'Failed'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                    <div className="flex items-center">
                      <Database className="mr-2 text-green-400" size={16} />
                      <span>Database</span>
                    </div>
                    <span className={testResult.details.integrations.database ? 'text-green-400' : 'text-red-400'}>
                      {testResult.details.integrations.database ? 'Connected' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>

              {testResult.details.registrationId && (
                <div className="text-white/70 text-xs bg-white/5 p-2 rounded">
                  <strong>Registration ID:</strong> {testResult.details.registrationId}
                </div>
              )}

              {testResult.details.gotowebinarJoinUrl && (
                <div className="text-white/70 text-xs bg-white/5 p-2 rounded break-all">
                  <strong>GoToWebinar Join URL:</strong>{' '}
                  <a href={testResult.details.gotowebinarJoinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {testResult.details.gotowebinarJoinUrl}
                  </a>
                </div>
              )}

              {testResult.details.errors && testResult.details.errors.length > 0 && (
                <div className="text-white/70 text-xs">
                  <p className="font-medium text-red-400 mb-1">Errors:</p>
                  <div className="space-y-1">
                    {testResult.details.errors.map((error: any, idx: number) => (
                      <div key={idx} className="bg-red-500/10 p-2 rounded">
                        <strong>{error.service}:</strong> {error.error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {testResult.success && (
            <p className="text-white/70 text-sm mt-3">
              Check your GoToWebinar dashboard to confirm the test registration was received.
            </p>
          )}

          {!testResult.success && (
            <div className="mt-3 text-white/70 text-sm">
              <p className="font-medium">Troubleshooting steps:</p>
              <ol className="list-decimal ml-5 mt-1 space-y-1">
                <li>Verify VITE_GOTOWEBINAR_OAUTH_TOKEN is set in .env file</li>
                <li>Check if your GoToWebinar OAuth token is still valid</li>
                <li>Verify VITE_GOTOWEBINAR_WEBINAR_KEY matches your webinar</li>
                <li>Ensure the webinar is active and accepting registrations</li>
                <li>Check browser console and Supabase Edge Function logs for details</li>
              </ol>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default GoToWebinarTester;
