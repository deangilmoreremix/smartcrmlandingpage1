# How to Clear Netlify CDN Cache

## Quick Steps

### Method 1: Clear Cache and Redeploy (Recommended)

1. **Go to your Netlify site dashboard**
   - Visit: https://app.netlify.com
   - Click on your site (e.g., "taupe-sprinkles-83c9ee")

2. **Navigate to Deploys tab**
   - Click "Deploys" in the top navigation

3. **Trigger a fresh deploy**
   - Click the "Trigger deploy" dropdown button (top right)
   - Select "Clear cache and deploy site"
   - Wait for deployment to complete (usually 1-3 minutes)

4. **Repeat for ALL your sites:**
   - Main site (where you embed the iframes)
   - Contacts demo (taupe-sprinkles-83c9ee)
   - Pipeline demo (cheery-syrniki-b5b6ca)
   - Calendar demo (voluble-vacherin-add80d)

### Method 2: Use Netlify CLI (Advanced)

If you have Netlify CLI installed:

```bash
# Install Netlify CLI if you haven't
npm install -g netlify-cli

# Login to Netlify
netlify login

# Clear cache for a specific site
netlify deploy --prod --clear-cache

# Or trigger a rebuild
netlify build --clear-cache
```

### Method 3: Manual Cache Busting via Git

Force a new deployment by pushing any small change:

```bash
# Make a small change (like adding a comment)
echo "# Cache clear $(date)" >> README.md

# Commit and push
git add README.md
git commit -m "Force cache clear"
git push origin main

# Netlify will automatically deploy with fresh cache
```

## Detailed Step-by-Step with Screenshots

### For Each Netlify Site:

**Step 1: Access Your Netlify Dashboard**
- Go to: https://app.netlify.com
- Log in with your credentials
- You'll see a list of all your sites

**Step 2: Select Your Site**
- Click on the site name (e.g., "taupe-sprinkles-83c9ee")
- This opens the site dashboard

**Step 3: Go to Deploys Section**
- In the top navigation bar, click "Deploys"
- You'll see a list of all deployments

**Step 4: Clear Cache and Redeploy**
- Look for the "Trigger deploy" button (usually top right)
- Click it to open a dropdown menu
- Select "Clear cache and deploy site"
- Confirm if prompted

**Step 5: Wait for Deployment**
- Watch the deployment progress
- Usually takes 1-3 minutes
- Wait until status shows "Published"

**Step 6: Verify**
- Click "Open production deploy" to test
- Check that your changes are live

## For Your Replit Dashboard Demo

Replit doesn't use CDN caching the same way, but to force a refresh:

1. **Go to your Replit project**
   - Visit: https://replit.com/@youruser/smartcrm-videoremix

2. **Click "Stop" then "Run"**
   - This restarts the server with fresh code

3. **Or force a rebuild:**
   - In the Shell tab, run:
   ```bash
   # Clear any build cache
   rm -rf .cache
   rm -rf dist

   # Restart the server
   kill 1
   ```

## Verify Cache is Cleared

### Check in Browser:

1. **Open DevTools** (F12 or Ctrl+Shift+I)

2. **Go to Network Tab**
   - Refresh the page
   - Look at the response headers
   - Check for your new headers (X-Frame-Options: ALLOWALL)

3. **Check specific headers:**
   - Find your main document request
   - Click on it
   - Look at "Response Headers" section
   - Verify headers show your changes

### Using curl (Command Line):

```bash
# Check main site headers
curl -I https://your-main-site.netlify.app

# Check demo site headers
curl -I https://taupe-sprinkles-83c9ee.netlify.app
curl -I https://cheery-syrniki-b5b6ca.netlify.app
curl -I https://voluble-vacherin-add80d.netlify.app
```

Look for:
- `X-Frame-Options: ALLOWALL` on demo sites
- No `X-Frame-Options: DENY` on main site
- `Content-Security-Policy` with frame-ancestors on main site

## Browser Cache Clearing

After clearing CDN cache, also clear your browser cache:

### Chrome/Edge:
1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Select "Cached images and files"
3. Choose "All time"
4. Click "Clear data"

### Firefox:
1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Select "Cache"
3. Choose "Everything"
4. Click "Clear Now"

### Safari:
1. Press `Cmd+Option+E` to empty caches
2. Or: Safari > Settings > Advanced > Show Develop menu
3. Then: Develop > Empty Caches

### Quick Method (All Browsers):
**Hard Refresh:**
- `Ctrl+Shift+R` (Windows/Linux)
- `Cmd+Shift+R` (Mac)
- Or `Ctrl+F5`

## Testing After Cache Clear

1. **Open your main site in incognito/private mode**
   - This ensures no local cache
   - Chrome: `Ctrl+Shift+N`
   - Firefox: `Ctrl+Shift+P`

2. **Navigate to iframe sections:**
   - Dashboard demo section
   - Pipeline demo section
   - Contacts demo section
   - Calendar demo section

3. **Check for errors:**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Should see no "Refused to display" messages
   - Should see no X-Frame-Options errors

4. **Verify iframes load:**
   - Iframes should load within 2-5 seconds
   - Content should be visible and interactive
   - No blank frames or error messages

## Troubleshooting

### If cache doesn't seem to clear:

1. **Try multiple cache clear methods:**
   - Clear via Netlify dashboard
   - Clear browser cache
   - Try incognito mode
   - Try different browser

2. **Check deployment status:**
   - Ensure latest deploy shows "Published"
   - Check deploy log for errors
   - Verify build completed successfully

3. **Verify headers in network tab:**
   - Old headers might still be cached
   - Check response headers match your changes
   - May need to wait 5-10 minutes for global CDN

4. **DNS/CDN propagation:**
   - Sometimes takes a few minutes
   - Try accessing via direct Netlify URL
   - Then try custom domain

## Complete Workflow Summary

```bash
# 1. Update headers on all sites (you've already done this)

# 2. Clear CDN cache for each site:
# - Main site
# - Contacts demo
# - Pipeline demo
# - Calendar demo
# (Use Netlify dashboard: Deploys > Trigger deploy > Clear cache and deploy site)

# 3. Clear browser cache
# Press Ctrl+Shift+Delete and clear cache

# 4. Test in incognito mode
# Open site fresh to verify iframes load

# 5. Check DevTools Console
# Should see no X-Frame-Options errors
```

## Expected Timeline

- **Netlify cache clear:** Immediate (during deploy)
- **CDN propagation:** 1-5 minutes
- **Browser cache clear:** Immediate
- **Total time:** 5-10 minutes to see changes everywhere

## Quick Reference Commands

```bash
# Check headers
curl -I https://your-site.netlify.app | grep -i frame

# Force git deploy (cache clear)
git commit --allow-empty -m "Clear cache"
git push origin main

# Hard refresh in browser
Ctrl+Shift+R (or Cmd+Shift+R on Mac)
```

---

**Important:** Always clear cache on **BOTH** the main site (that embeds) AND all demo sites (that are embedded) for iframe fixes to work properly!
