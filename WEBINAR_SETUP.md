# Webinar Registration Setup Guide

This guide explains how to configure the dual registration system for Zoom webinars and MailerLite email marketing.

## Overview

When users register for your webinar, they are automatically:
1. Saved to your Supabase database
2. Registered for the Zoom webinar
3. Added to your MailerLite email list

## Required Environment Variables

### Supabase Configuration
These are automatically configured in your Supabase project:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

### Zoom Configuration
You need to set these up in your Supabase Edge Functions secrets:

1. **ZOOM_ACCOUNT_ID**
   - Where to find: Zoom App Marketplace > Your App > App Credentials
   - Format: Account ID string

2. **ZOOM_API_KEY** (also called Client ID)
   - Where to find: Zoom App Marketplace > Your App > App Credentials
   - Format: Alphanumeric string

3. **ZOOM_API_SECRET** (also called Client Secret)
   - Where to find: Zoom App Marketplace > Your App > App Credentials
   - Format: Alphanumeric string

4. **ZOOM_WEBINAR_ID**
   - Where to find: Zoom Dashboard > Webinars > Your Webinar > Webinar ID
   - Format: 11-digit number (e.g., 12345678901)

### MailerLite Configuration

5. **MAILERLITE_API_KEY**
   - Where to find: MailerLite Dashboard > Integrations > Developer API
   - Format: Long alphanumeric string
   - Note: Use the new MailerLite API v2 token

6. **MAILERLITE_GROUP_ID** (optional)
   - Where to find: MailerLite Dashboard > Subscribers > Groups > Your Group > Settings
   - Format: Numeric ID
   - Note: If not provided, subscribers will be added without a specific group

## Setup Instructions

### Step 1: Create a Zoom Server-to-Server OAuth App

1. Go to [Zoom App Marketplace](https://marketplace.zoom.us/)
2. Click "Develop" > "Build App"
3. Select "Server-to-Server OAuth"
4. Fill in the app information:
   - App name: "Smart CRM Webinar Registration"
   - Short description: "Automated webinar registration system"
5. Add these scopes:
   - `webinar:write:admin` - To register users for webinars
   - `webinar:read:admin` - To read webinar information
6. Activate the app
7. Copy your Account ID, Client ID (API Key), and Client Secret (API Secret)

### Step 2: Create a Webinar in Zoom

1. Go to [Zoom Dashboard](https://zoom.us/webinar/)
2. Click "Schedule a Webinar"
3. Fill in the webinar details:
   - Topic: "Smart CRM Live Demonstration"
   - Date and Time: October 13, 2025 at 3:00 PM EST
   - Duration: 90 minutes
   - Registration: Required
4. Save the webinar
5. Copy the Webinar ID from the webinar details page

### Step 3: Get Your MailerLite API Key

1. Log in to [MailerLite](https://dashboard.mailerlite.com/)
2. Click your profile icon > Integrations
3. Click "Developer API"
4. Click "Generate new token"
5. Give it a name like "Smart CRM Webinar"
6. Copy the API token (you won't be able to see it again)

### Step 4: Create a MailerLite Group (Optional)

1. In MailerLite, go to Subscribers > Groups
2. Click "Create Group"
3. Name it "Webinar Registrants" or similar
4. After creation, click on the group
5. The Group ID is in the URL: `mailerlite.com/groups/{GROUP_ID}/subscribers`

### Step 5: Configure Supabase Edge Function Secrets

You can set these secrets via the Supabase Dashboard or CLI:

**Using Supabase Dashboard:**
1. Go to your Supabase project dashboard
2. Navigate to Edge Functions > Settings
3. Add the following secrets:
   - ZOOM_ACCOUNT_ID
   - ZOOM_API_KEY
   - ZOOM_API_SECRET
   - ZOOM_WEBINAR_ID
   - MAILERLITE_API_KEY
   - MAILERLITE_GROUP_ID (optional)

**Using Supabase CLI:**
```bash
# Set Zoom credentials
supabase secrets set ZOOM_ACCOUNT_ID=your_account_id
supabase secrets set ZOOM_API_KEY=your_client_id
supabase secrets set ZOOM_API_SECRET=your_client_secret
supabase secrets set ZOOM_WEBINAR_ID=your_webinar_id

# Set MailerLite credentials
supabase secrets set MAILERLITE_API_KEY=your_api_key
supabase secrets set MAILERLITE_GROUP_ID=your_group_id  # optional
```

## Testing the Integration

### Test Registration Flow

1. Fill out the webinar registration form on your website
2. Check the browser console for any errors
3. Verify registration in three places:
   - Supabase: Check `webinar_registrations` table
   - Zoom: Check webinar registrants in Zoom dashboard
   - MailerLite: Check subscribers list

### Test with Sample Data

You can test the edge function directly:

```bash
curl -X POST 'https://your-project.supabase.co/functions/v1/webinar-registration' \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "company": "Test Company",
    "role": "CTO",
    "source": "Test"
  }'
```

Expected response:
```json
{
  "success": true,
  "registrationId": "uuid-here",
  "status": "both_success",
  "zoom": {
    "registered": true,
    "join_url": "https://zoom.us/w/123456789..."
  },
  "mailerlite": {
    "registered": true
  }
}
```

## Handling Failures

The system handles partial failures gracefully:

### Possible Registration Statuses

- `pending` - Initial state before external API calls
- `db_only` - Saved to database but both external APIs failed
- `zoom_success` - Only Zoom registration succeeded
- `mailerlite_success` - Only MailerLite registration succeeded
- `both_success` - All registrations succeeded
- `partial_failure` - One service succeeded, one failed
- `failed` - All retry attempts exhausted

### Retry Failed Registrations

Failed registrations can be retried automatically or manually:

**Manual Retry via API:**
```bash
curl -X POST 'https://your-project.supabase.co/functions/v1/webinar-registration-retry' \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "registrationId": "uuid-of-failed-registration"
  }'
```

**Query Failed Registrations:**
```sql
SELECT * FROM webinar_registrations
WHERE registration_status IN ('db_only', 'partial_failure', 'failed')
AND retry_count < 3
ORDER BY registered_at DESC;
```

## Database Schema

The `webinar_registrations` table includes:

### Core Fields
- `id` - Unique registration ID
- `first_name`, `last_name`, `email` - User details
- `phone`, `company`, `role` - Optional fields
- `source` - Registration source (e.g., "Signup Modal", "Hero Form")
- `registered_at` - Timestamp of registration

### Zoom Tracking
- `zoom_registrant_id` - Zoom's registrant ID
- `zoom_join_url` - Personal Zoom join link
- `zoom_registered_at` - When Zoom registration succeeded

### MailerLite Tracking
- `mailerlite_subscriber_id` - MailerLite's subscriber ID
- `mailerlite_registered_at` - When MailerLite registration succeeded

### Status Tracking
- `registration_status` - Overall registration status
- `error_log` - JSON array of error details
- `retry_count` - Number of retry attempts
- `last_retry_at` - Timestamp of last retry

## Troubleshooting

### Common Issues

**1. Zoom OAuth Failed**
- Error: "Zoom OAuth failed"
- Solution: Verify ZOOM_ACCOUNT_ID, ZOOM_API_KEY, and ZOOM_API_SECRET are correct
- Check: Ensure the Zoom app is activated and has the correct scopes

**2. Zoom Registration Failed**
- Error: "Zoom registration failed"
- Solution: Verify ZOOM_WEBINAR_ID is correct
- Check: Ensure the webinar exists and registration is enabled
- Check: Ensure the webinar hasn't reached capacity

**3. MailerLite Failed**
- Error: "MailerLite registration failed"
- Solution: Verify MAILERLITE_API_KEY is valid
- Check: Ensure you're using the new MailerLite API (not classic)
- Check: If using groups, verify MAILERLITE_GROUP_ID is correct

**4. Duplicate Email Error**
- Error: "This email is already registered"
- Solution: This is expected behavior - users can only register once
- Action: Direct users to check their email for confirmation

### Viewing Logs

Check Edge Function logs in Supabase Dashboard:
1. Go to Edge Functions > webinar-registration
2. Click "Logs" tab
3. Filter by time period to see recent errors

## Best Practices

1. **Test in a Sandbox First**
   - Create a test webinar in Zoom
   - Use a test group in MailerLite
   - Test with your own email addresses

2. **Monitor Registration Success Rates**
   - Regularly check the `registration_status` distribution
   - Set up alerts for high failure rates
   - Review error logs weekly

3. **Backup Contact Information**
   - The Zapier webhook still sends data as a backup
   - Export webinar_registrations table regularly
   - Keep multiple copies of registration data

4. **Pre-webinar Checklist**
   - Verify all API credentials are current
   - Test a registration end-to-end
   - Check Zoom webinar capacity
   - Verify MailerLite email automation is active

## Support

For issues:
- Zoom API: [Zoom Developer Support](https://devforum.zoom.us/)
- MailerLite: [MailerLite Support](https://www.mailerlite.com/contact)
- Supabase: [Supabase Support](https://supabase.com/support)
