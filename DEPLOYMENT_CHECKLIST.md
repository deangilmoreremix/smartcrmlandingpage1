# Netlify Deployment Checklist

## Pre-Deployment Steps (Complete These First)

### 1. Set Environment Variables in Netlify Dashboard

**CRITICAL**: Your site will not work without these environment variables configured in Netlify.

Go to: **Netlify Dashboard** > **Your Site** > **Site Settings** > **Environment Variables**

Add these variables:

```
VITE_SUPABASE_URL = https://kvkdfcjckonwovunbaug.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2a2RmY2pja29ud292dW5iYXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMTc5MTMsImV4cCI6MjA3NTc5MzkxM30.6rhw9uxrbj_BfBwPOc9nO2Yr39K9uxP0s_sDeBHy7OM
```

### 2. Verify Files Are In Place

- [x] `public/_redirects` - SPA routing configuration
- [x] `public/vite.svg` - Favicon
- [x] `netlify.toml` - Build and redirect configuration
- [x] `vite.config.ts` - Updated with production build settings

### 3. Push Changes to Git Repository

```bash
git add .
git commit -m "Fix Netlify deployment configuration"
git push origin main
```

### 4. Trigger Netlify Deployment

1. Go to Netlify Dashboard
2. Navigate to **Deploys** tab
3. Click **Trigger deploy** > **Clear cache and deploy site**
4. Wait for deployment to complete

## Post-Deployment Verification

### Test Your Deployed Site

Once deployed, test these aspects:

1. **Homepage Loads**
   - Visit: https://taupe-sprinkles-83c9ee.netlify.app/
   - Expected: Homepage displays correctly

2. **Routing Works**
   - Visit: https://taupe-sprinkles-83c9ee.netlify.app/dashboard
   - Visit: https://taupe-sprinkles-83c9ee.netlify.app/webinar-recap
   - Expected: Pages load without 404 errors

3. **Browser Console Check**
   - Press F12 to open Developer Tools
   - Check Console tab for errors
   - Expected: No critical errors

4. **Supabase Connection**
   - Open Network tab in Developer Tools
   - Interact with the site
   - Expected: Requests to Supabase succeed

## Common Issues and Solutions

### Issue: "Connection Refused" or Blank Page

**Cause**: Environment variables not set in Netlify
**Solution**:
1. Add environment variables in Netlify dashboard
2. Trigger new deployment with cleared cache

### Issue: 404 on Direct Route Access

**Cause**: SPA routing not configured
**Solution**:
1. Verify `public/_redirects` file exists
2. Check `netlify.toml` has redirects section
3. Redeploy

### Issue: Supabase Errors

**Cause**: Missing or incorrect environment variables
**Solution**:
1. Double-check environment variable values
2. No extra spaces or quotes in values
3. Redeploy after fixing

## Build Configuration Summary

Your site is configured with:

- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **Publish Directory**: `dist`
- **SPA Routing**: Enabled via _redirects and netlify.toml
- **Code Splitting**: React, Supabase, and animation libraries chunked separately
- **Security Headers**: X-Frame-Options, X-XSS-Protection, etc.
- **Asset Caching**: Static assets cached for 1 year

## Next Steps After Successful Deployment

1. Test all major features and routes
2. Monitor Netlify analytics for traffic
3. Set up custom domain (optional)
4. Configure form notifications (if using Netlify Forms)
5. Set up deploy notifications (Slack, email, etc.)

## Quick Commands Reference

### Test Build Locally
```bash
npm run build
npm run preview
```

### Check Build Output
```bash
ls -la dist/
cat dist/_redirects
```

### View Environment Variables (Local)
```bash
cat .env
```

## Support Resources

- Netlify Documentation: https://docs.netlify.com
- Netlify Support: https://answers.netlify.com
- Vite Documentation: https://vitejs.dev
- Supabase Documentation: https://supabase.com/docs

---

**Status**: Ready for deployment
**Last Updated**: October 2025
**Configuration Version**: 1.0
