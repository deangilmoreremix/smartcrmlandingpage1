import axios from 'axios';
import { showFeedback } from '../components/Feedback';

// Zapier webhook URL
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/642762/27d9hdf/';

/**
 * Submits form data to Zapier webhook
 * @param formData Object containing form fields
 * @returns Promise that resolves when submission is complete
 */
export const submitToZapier = async (formData: Record<string, string>): Promise<any> => {
  try {
    // Add timestamp and masterclass date information to all submissions
    const enhancedFormData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      masterclassDates: "May 16, 20-21, 2025",
      masterclassTime: "3:00 PM EDT"
    };
    
    console.log('Submitting data to Zapier:', enhancedFormData);
    console.log('Webhook URL:', ZAPIER_WEBHOOK_URL);
    
    const response = await axios.post(ZAPIER_WEBHOOK_URL, enhancedFormData);
    console.log('Zapier submission response:', response.status, response.data);
    
    if (response.status >= 200 && response.status < 300) {
      console.log('Data submitted to Zapier successfully');
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error submitting to Zapier:', error);
    // Check if it's an Axios error with response data
    if (error.response) {
      console.error('Zapier error response:', error.response.status, error.response.data);
    }
    // Still continue with other operations even if Zapier submission fails
    throw error;
  }
};

/**
 * Handles form submission with Zapier integration
 * @param formData Object containing form fields
 * @param onSuccess Callback function to execute after successful submission
 */
export const handleFormSubmission = async (
  formData: Record<string, string>, 
  onSuccess?: (data: Record<string, string>) => void
): Promise<Record<string, string>> => {
  try {
    // Submit data to Zapier webhook
    await submitToZapier(formData);
    
    // Log form submission
    console.log('Form submitted:', formData);
    
    // Show success feedback
    showFeedback({
      message: "Registration successful! Check your email for details.",
      type: "success",
      duration: 5000
    });
    
    // Execute success callback if provided
    if (onSuccess) {
      onSuccess(formData);
    }
    
    // Return form data for any additional processing
    return formData;
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Show error feedback
    showFeedback({
      message: `Form submission failed: ${error.message}`,
      type: "error",
      duration: 8000
    });
    
    throw error;
  }
};

/**
 * Tests the Zapier webhook connection
 * @returns Promise that resolves with test results
 */
export const testZapierWebhook = async (): Promise<{ success: boolean, message: string }> => {
  try {
    // Create test data
    const testData = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      source: "Webhook Test",
      testTimestamp: new Date().toISOString()
    };
    
    // Submit test data to Zapier
    await submitToZapier(testData);
    
    return { 
      success: true, 
      message: "Zapier webhook test successful! Check your Zapier account to confirm data was received."
    };
  } catch (error) {
    return {
      success: false,
      message: `Zapier webhook test failed: ${error.message}`
    };
  }
};