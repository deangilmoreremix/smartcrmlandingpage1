export const handleFormSubmission = async (
  formData: Record<string, string>,
  onSuccess?: (data?: any) => void
): Promise<void> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials not configured');
      if (onSuccess) onSuccess();
      return;
    }

    const registrationUrl = `${supabaseUrl}/functions/v1/webinar-registration`;

    const response = await fetch(registrationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok && response.status !== 207) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 409 && errorData.code === 'DUPLICATE_EMAIL') {
        throw new Error('You are already registered for this webinar');
      }

      throw new Error(errorData.error || `Registration failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (onSuccess) {
      onSuccess(result);
    }

    const zapierWebhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
    if (zapierWebhookUrl) {
      fetch(zapierWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(err => console.warn('Zapier webhook failed:', err));
    }
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
};

export const testZapierWebhook = async (webhookUrl: string, testData: Record<string, any>): Promise<boolean> => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    return response.ok;
  } catch (error) {
    console.error('Webhook test error:', error);
    return false;
  }
};
