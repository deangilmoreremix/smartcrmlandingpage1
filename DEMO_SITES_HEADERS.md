# Demo Sites Header Configuration

This file contains the header configuration needed for each demo site to allow iframe embedding.

## Instructions

You need to add these headers to each of your demo sites:

1. **Contacts Demo** (taupe-sprinkles-83c9ee.netlify.app)
2. **Pipeline Demo** (cheery-syrniki-b5b6ca.netlify.app)
3. **Calendar Demo** (voluble-vacherin-add80d.netlify.app)
4. **Dashboard Demo** (smartcrm-videoremix.replit.app)

## Option 1: Using netlify.toml (Recommended for Netlify Sites)

Add this to the `netlify.toml` file in each demo site repository:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "ALLOWALL"
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"
```

## Option 2: Using _headers file (Alternative for Netlify Sites)

Create a `_headers` file in the root or public directory of each demo site:

```
/*
  X-Frame-Options: ALLOWALL
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
```

## Option 3: For Replit Dashboard Demo

Add these headers to your server configuration in the Replit app:

```javascript
// Express.js example
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
```

## Verification Steps

After deploying headers to all demo sites:

1. Clear browser cache (Ctrl+Shift+Delete)
2. Visit your main site where iframes are embedded
3. Open browser DevTools (F12) and check Console for errors
4. Verify iframes load without "X-Frame-Options" or "Refused to display" errors
5. Test interactivity within each iframe

## Troubleshooting

If iframes still don't load:

1. Check Network tab in DevTools for failed requests
2. Look for CORS errors in Console
3. Verify headers are actually being sent (check Response Headers)
4. Try opening demo URL directly to ensure it's accessible
5. Clear Netlify CDN cache: Site Settings > Build & Deploy > Post processing > Clear cache and deploy

## Quick Deploy Commands

For each Netlify demo site:

```bash
# Navigate to demo site repository
cd /path/to/demo-site

# Add netlify.toml or _headers file
# (use one of the options above)

# Commit and push
git add netlify.toml  # or _headers
git commit -m "Add headers to allow iframe embedding"
git push origin main

# Or trigger manual deploy in Netlify dashboard
# Site Settings > Build & Deploy > Trigger deploy > Clear cache and deploy site
```

## Expected Result

All demo iframes should load within 2-5 seconds with:
- ✅ No console errors
- ✅ Full interactivity within iframe
- ✅ Proper display of demo content
- ✅ No "Refused to display" messages

## Need Help?

If you encounter issues, check:
1. Are headers actually being sent? (Check DevTools Network tab)
2. Is the demo site accessible directly?
3. Are there any JavaScript errors preventing load?
4. Is the iframe src URL correct and accessible?
