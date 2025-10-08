export const handleFormSubmission = async (
  formData: Record<string, string>,
  onSuccess?: () => void
): Promise<void> => {
  try {
    const zapierWebhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;

    if (!zapierWebhookUrl) {
      console.warn('Zapier webhook URL not configured');
      if (onSuccess) onSuccess();
      return;
    }

    const response = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (onSuccess) {
      onSuccess();
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
