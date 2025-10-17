# Iframe Testing Guide

## Current Setup Status

✅ **Headers Fixed** - All demo sites deployed with proper headers
✅ **Main Site Header** - Updated to 108px height (44px announcement + 64px nav)
✅ **Iframe Code** - Proper error handling, retry logic, and timeouts

## Demo Sites Configuration

### 1. Contacts Demo
- **URL:** https://taupe-sprinkles-83c9ee.netlify.app
- **Embed Location:** ContactsEmbedSection component
- **Expected Behavior:** Full contact management interface with AI scoring

### 2. Pipeline Demo
- **URL:** https://cheery-syrniki-b5b6ca.netlify.app
- **Embed Location:** PipelineEmbedSection component
- **Expected Behavior:** Deal pipeline with drag-and-drop functionality

### 3. Dashboard Demo
- **URL:** https://smartcrm-videoremix.replit.app/demo-dashboard
- **Embed Location:** DashboardEmbedSection component
- **Expected Behavior:** AI-powered analytics dashboard
- **Note:** Replit may take 30-60 seconds on first load

### 4. Calendar Demo
- **URL:** https://voluble-vacherin-add80d.netlify.app
- **Embed Location:** AICalendarSection component
- **Expected Behavior:** AI scheduling and calendar interface

## Testing Steps

### Step 1: Clear All Caches
```bash
# Clear browser cache
# Chrome: Ctrl+Shift+Delete → Clear all cached images and files
# Firefox: Ctrl+Shift+Delete → Cache
# Safari: Develop → Empty Caches
```

### Step 2: Test Each Iframe

#### Test Contacts Demo
1. Navigate to `https://your-site.com/#contacts` (or scroll to contacts section)
2. Click "View Live Demo" button
3. **Expected:** Iframe loads within 2-5 seconds
4. **Expected:** No console errors related to X-Frame-Options
5. **Expected:** Full interactivity within iframe (click, scroll, type)

#### Test Pipeline Demo
1. Navigate to pipeline section
2. Click "View Live Demo" button
3. **Expected:** Iframe loads within 2-5 seconds
4. **Expected:** Drag-and-drop works within iframe
5. **Expected:** No "Refused to display" errors

#### Test Dashboard Demo
1. Navigate to dashboard section
2. Click "View Live Demo" button
3. **Expected:** May show "Loading..." for 30-60 seconds (Replit startup)
4. **Expected:** Eventually loads dashboard with charts
5. **Expected:** Interactive charts and widgets work

#### Test Calendar Demo
1. Navigate to AI calendar section
2. **Expected:** Iframe loads automatically
3. **Expected:** Calendar interface is interactive
4. **Expected:** Date selection works

### Step 3: Browser DevTools Checks

#### Open DevTools (F12) and check:

**Console Tab:**
- ✅ No "X-Frame-Options" errors
- ✅ No "Refused to display" errors
- ✅ No CORS policy errors
- ⚠️ Minor warnings are OK (like missing favicons)

**Network Tab:**
1. Filter by "iframe" or demo site URLs
2. Check Response Headers for each iframe request:
   - Should see: `X-Frame-Options: ALLOWALL` or no X-Frame-Options header
   - Should see: `Access-Control-Allow-Origin: *`
3. Status code should be `200 OK`

**Elements Tab:**
- Inspect iframe element
- Verify `src` attribute matches expected URL
- Check iframe has loaded content (not empty)

## Common Issues & Solutions

### Issue 1: "Refused to display in iframe"
**Cause:** X-Frame-Options header blocking embed
**Solution:**
- Verify headers are deployed to demo site
- Clear CDN cache on Netlify (Site Settings → Clear cache and deploy)
- Wait 2-3 minutes for cache to fully clear

### Issue 2: Iframe shows loading spinner forever
**Cause:** Demo site may be down or slow to respond
**Solution:**
- Click "Open in New Tab" button to verify site works directly
- For Replit dashboard: Wait 60 seconds for cold start
- Check retry count - after 3 retries, open in new tab

### Issue 3: Iframe loads but is not interactive
**Cause:** Sandbox restrictions or pointer-events CSS
**Solution:**
- Check iframe `sandbox` attribute includes `allow-same-origin allow-scripts`
- Verify no CSS is setting `pointer-events: none` on iframe
- Check browser console for JavaScript errors

### Issue 4: CORS errors in console
**Cause:** Missing CORS headers on demo site
**Solution:**
- Verify `Access-Control-Allow-Origin: *` header is set
- Redeploy demo site with proper headers
- Clear browser and CDN cache

## Expected Performance

### Netlify Demo Sites (Contacts, Pipeline, Calendar)
- **First Load:** 2-5 seconds
- **Cached Load:** < 1 second
- **Network Speed Impact:** Minimal (sites are on CDN)

### Replit Dashboard
- **Cold Start:** 30-60 seconds (first time)
- **Warm Start:** 2-5 seconds (within 5 minutes of last access)
- **Network Speed Impact:** Moderate (not on CDN)

## Success Criteria

✅ All 4 iframes load without errors
✅ No console errors related to X-Frame-Options or CORS
✅ Full interactivity within each iframe
✅ Retry mechanism works when needed
✅ "Open in New Tab" fallback works for all demos

## Next Steps After Testing

### If All Tests Pass:
1. Document any performance observations
2. Monitor for 24 hours to ensure stability
3. Consider adding loading performance metrics
4. Update documentation with any user-facing instructions

### If Tests Fail:
1. Document specific error messages
2. Check which demo site(s) are failing
3. Verify headers using curl or DevTools
4. Re-deploy with cache clear if needed
5. Test directly accessing demo site (not in iframe)

## Quick Verification Commands

### Check if headers are set (requires curl):
```bash
# Contacts Demo
curl -I https://taupe-sprinkles-83c9ee.netlify.app | grep -i "x-frame-options"

# Pipeline Demo
curl -I https://cheery-syrniki-b5b6ca.netlify.app | grep -i "x-frame-options"

# Calendar Demo
curl -I https://voluble-vacherin-add80d.netlify.app | grep -i "x-frame-options"
```

**Expected Result:** Either no output (header removed) or `X-Frame-Options: ALLOWALL`

## Monitoring After Deployment

### Day 1-7:
- Monitor browser console for any new iframe errors
- Track iframe load success rate
- Gather user feedback on demo performance

### Week 2-4:
- Review analytics for iframe interaction rates
- Consider A/B testing iframe vs. external link CTAs
- Optimize loading states based on user behavior

## Support Resources

- **Netlify Docs:** https://docs.netlify.com/routing/headers/
- **MDN X-Frame-Options:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
- **MDN CORS:** https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

**Last Updated:** October 17, 2025
**Status:** Headers deployed, ready for testing
