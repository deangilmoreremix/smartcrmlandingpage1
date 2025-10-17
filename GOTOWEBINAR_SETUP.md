# GoToWebinar Integration Setup Guide

This guide will help you configure GoToWebinar webhook integration for your Smart CRM webinar registration forms.

## Prerequisites

1. Active GoToWebinar account with admin access
2. Access to your Supabase project dashboard
3. The webinar event you want registrations sent to

## Step 1: Create a GoToWebinar OAuth App

1. Log in to the [GoTo Developer Center](https://developer.goto.com/)
2. Navigate to "My Apps" section
3. Click "Create a New App"
4. Fill in the application details:
   - App Name: "Smart CRM Webinar Integration"
   - App Description: "Integration for webinar registration forms"
   - OAuth Redirect URL: `https://localhost:3000/callback` (or your domain)
5. Click "Create App" and save your credentials:
   - **Client ID** (you'll need this)
   - **Client Secret** (you'll need this)

## Step 2: Generate OAuth Access Token

### Option A: Using OAuth Flow (Recommended)

1. Use the following URL structure to authorize your app:
```
https://api.getgo.com/oauth/v2/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI
```

2. After authorization, you'll receive an authorization code
3. Exchange the code for an access token:
```bash
curl -X POST "https://api.getgo.com/oauth/v2/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=YOUR_AUTH_CODE" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=YOUR_REDIRECT_URI"
```

4. Save the `access_token` from the response (valid for 365 days)

### Option B: Direct Credentials Grant (For Testing)

1. Use your Client ID and Client Secret to get a token:
```bash
curl -X POST "https://api.getgo.com/oauth/v2/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "username=YOUR_GOTOWEBINAR_EMAIL" \
  -d "password=YOUR_GOTOWEBINAR_PASSWORD" \
  -d "client_id=YOUR_CLIENT_ID"
```

## Step 3: Get Your Webinar Key

1. Log in to your [GoToWebinar Dashboard](https://www.gotomeeting.com/webinar)
2. Click on the webinar you want to use for registrations
3. Look at the URL in your browser:
```
https://www.gotomeeting.com/webinar/scheduleWebinar?webinarkey=1234567890123456789
```
4. Copy the `webinarkey` value (the long number at the end)

## Step 4: Configure Environment Variables

### Local Development (.env file)

Add these variables to your `.env` file in the project root:

```env
# GoToWebinar Configuration
VITE_GOTOWEBINAR_OAUTH_TOKEN=your_actual_oauth_token_here
VITE_GOTOWEBINAR_WEBINAR_KEY=your_webinar_key_here
```

### Supabase Edge Functions

You also need to add these secrets to your Supabase Edge Functions:

1. Open your [Supabase Dashboard](https://app.supabase.com/)
2. Navigate to your project
3. Go to Settings > Edge Functions > Environment Variables
4. Add the following secrets:
   - `GOTOWEBINAR_OAUTH_TOKEN`: Your OAuth access token
   - `GOTOWEBINAR_WEBINAR_KEY`: Your webinar key

## Step 5: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the webhook test page:
```
http://localhost:5173/webhook-test
```

3. Use the GoToWebinar Integration Test component to verify:
   - OAuth token is valid
   - Webinar key is correct
   - Test registration succeeds
   - Join URL is returned

## Step 6: Deploy Edge Function

Deploy the webinar-registration Edge Function with your credentials:

```bash
# The Edge Function is already deployed via the MCP tool
# Just verify it has the correct environment variables set
```

## Troubleshooting

### "GoToWebinar OAuth token expired or invalid"

**Solution:** Your OAuth token has expired or is incorrect.
- Regenerate a new OAuth token following Step 2
- Update both `.env` file and Supabase secrets
- Redeploy the Edge Function

### "GoToWebinar webinar key not configured"

**Solution:** The webinar key is missing or incorrect.
- Verify the webinar key from your GoToWebinar dashboard
- Ensure it's set in both `.env` and Supabase secrets
- Check for any extra spaces or characters

### "Duplicate registration: email is already registered"

**Solution:** This is actually a good sign - it means the integration is working!
- The email has already been registered for this webinar
- Try with a different email address
- Or check your GoToWebinar registrants list to confirm

### "Registration completed with some errors"

**Solution:** Partial failure - database succeeded but webhook failed.
- Check Supabase Edge Function logs for details
- Verify OAuth token hasn't expired
- Check GoToWebinar API status page

## Integration Flow

Here's how the integration works:

1. User fills out registration form on your website
2. Form data is sent to Supabase Edge Function
3. Edge Function simultaneously:
   - Saves registration to database
   - Sends to GoToWebinar API
   - Sends to Zoom API (backup)
   - Sends to MailerLite API
   - Sends to Zapier webhook (optional)
4. GoToWebinar returns join URL
5. User receives confirmation with join URL

## Security Best Practices

1. **Never commit tokens to Git**
   - The `.env` file is already in `.gitignore`
   - Use Supabase secrets for production

2. **Rotate tokens regularly**
   - Set a calendar reminder to refresh OAuth tokens
   - GoToWebinar tokens expire after 365 days

3. **Use environment-specific credentials**
   - Use different webinar keys for dev/staging/production
   - Keep test and production environments separate

## API Rate Limits

GoToWebinar has the following rate limits:
- 100 requests per minute per OAuth token
- 5,000 requests per day per OAuth token

The integration handles rate limiting gracefully with proper error messages.

## Support Resources

- [GoToWebinar API Documentation](https://developer.goto.com/GoToWebinarV2)
- [OAuth 2.0 Guide](https://developer.goto.com/guides/Authentication/)
- [API Status Page](https://status.goto.com/)

## Next Steps

After setting up GoToWebinar:

1. Configure MailerLite integration (see MAILERLITE_SETUP.md)
2. Configure Zoom backup integration (see ZOOM_SETUP.md)
3. Set up Zapier webhook for additional automation
4. Test end-to-end registration flow
5. Monitor Edge Function logs for any issues

## Need Help?

If you encounter issues:
1. Check the webhook test page for detailed error messages
2. Review Supabase Edge Function logs
3. Verify all environment variables are set correctly
4. Ensure your GoToWebinar account has active webinars
