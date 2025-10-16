# Netlify Deployment Setup Guide

This guide will help you deploy your Smart CRM application to Netlify successfully.

## Critical: Environment Variables Configuration

Your application will NOT work on Netlify without properly configuring environment variables. Follow these steps:

### Step 1: Access Netlify Environment Variables

1. Log in to your Netlify dashboard at https://app.netlify.com
2. Select your site (taupe-sprinkles-83c9ee or your site name)
3. Go to **Site Settings** > **Environment Variables**
4. Click **Add a variable** or **Add environment variables**

### Step 2: Add Required Environment Variables

Add the following environment variables one by one:

#### Required Variables:

**Variable 1: VITE_SUPABASE_URL**
- Key: `VITE_SUPABASE_URL`
- Value: `https://kvkdfcjckonwovunbaug.supabase.co`
- Scope: All (or select specific deploy contexts)

**Variable 2: VITE_SUPABASE_ANON_KEY**
- Key: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2a2RmY2pja29ud292dW5iYXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMTc5MTMsImV4cCI6MjA3NTc5MzkxM30.6rhw9uxrbj_BfBwPOc9nO2Yr39K9uxP0s_sDeBHy7OM`
- Scope: All (or select specific deploy contexts)

#### Optional Variables (if using Zapier integration):

**Variable 3: VITE_ZAPIER_WEBHOOK_URL** (only if you have a Zapier webhook)
- Key: `VITE_ZAPIER_WEBHOOK_URL`
- Value: Your Zapier webhook URL
- Scope: All (or select specific deploy contexts)

### Step 3: Save and Redeploy

1. After adding all environment variables, click **Save**
2. Go to **Deploys** tab
3. Click **Trigger deploy** > **Clear cache and deploy site**
4. Wait for the deployment to complete (usually 2-5 minutes)

## Build Configuration

The following build settings are already configured in `netlify.toml`:

- **Build command**: `npm install --legacy-peer-deps && npm run build`
- **Publish directory**: `dist`
- **Node version**: Will use the version specified in your environment

## SPA Routing Configuration

The application uses React Router for client-side routing. The following configurations ensure proper routing:

1. **_redirects file**: Located in `public/_redirects`
   - Redirects all routes to index.html with 200 status
   - Enables proper SPA routing behavior

2. **netlify.toml redirects**: Configured as fallback
   - Ensures all routes serve the React application
   - Maintains proper URLs without hash routing

## Troubleshooting

### Issue: Site shows "Connection Refused" or blank page

**Solution**:
1. Check that environment variables are properly set in Netlify dashboard
2. Verify the build completed successfully (check deploy logs)
3. Clear browser cache and try again
4. Check browser console for errors (F12 > Console tab)

### Issue: Routes return 404 errors

**Solution**:
1. Verify `public/_redirects` file exists in your repository
2. Check that `netlify.toml` has the redirects configuration
3. Trigger a new deploy with cache cleared

### Issue: Supabase connection errors

**Solution**:
1. Double-check environment variables are set correctly (no extra spaces)
2. Verify VITE_SUPABASE_URL starts with `https://`
3. Ensure VITE_SUPABASE_ANON_KEY is the complete JWT token
4. Redeploy after making changes to environment variables

### Issue: Build fails

**Solution**:
1. Check the build logs in Netlify deploy details
2. Verify all dependencies are listed in package.json
3. Try the `--legacy-peer-deps` flag (already included in build command)
4. Ensure Node version compatibility

## Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are set in Netlify dashboard
- [ ] `public/_redirects` file exists
- [ ] `netlify.toml` is configured properly
- [ ] All dependencies are in package.json
- [ ] Build completes successfully locally with `npm run build`
- [ ] Preview build works with `npm run preview`

## Testing Your Deployment

After deployment:

1. Visit your site URL (e.g., https://taupe-sprinkles-83c9ee.netlify.app)
2. Check that the homepage loads correctly
3. Test navigation to different routes (e.g., /dashboard, /webinar-recap)
4. Open browser console and check for any errors
5. Verify Supabase connections work (check Network tab)
6. Test form submissions if applicable

## Important Notes

1. **Environment Variables**: The `.env` file in your repository is only used for local development. Netlify uses the environment variables from its dashboard.

2. **Rebuilds**: Whenever you change environment variables in Netlify, you must trigger a new deployment for changes to take effect.

3. **Cache**: If you experience issues, always try clearing the cache and redeploying: Deploys > Trigger deploy > Clear cache and deploy site

4. **HTTPS**: Netlify automatically provides HTTPS for all deployments. Always use HTTPS URLs.

5. **Custom Domain**: If you add a custom domain, ensure DNS is properly configured and wait for SSL certificate provisioning.

## Support

If you continue to experience issues:

1. Check Netlify build logs for specific error messages
2. Verify all environment variables are set correctly
3. Test the build locally with `npm run build && npm run preview`
4. Check browser console for runtime errors
5. Review Netlify documentation at https://docs.netlify.com

## Security Notes

- Never commit `.env` file to version control (already in .gitignore)
- Keep your Supabase anon key secure (it's safe to use client-side with RLS policies)
- Regularly rotate API keys and tokens
- Use Supabase Row Level Security (RLS) policies for data protection
- Monitor your Netlify deploy logs for any security warnings

---

**Last Updated**: October 2025
**Smart CRM Version**: 1.0.0
