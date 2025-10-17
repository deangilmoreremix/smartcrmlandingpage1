# Demo Loading - Quick Reference

## TL;DR

**Problem**: Replit dashboard demo wouldn't load (30s timeout too short for cold start)
**Solution**: Added 60s timeout + automatic server wake-up + visual progress indicators
**Result**: Users can now successfully load demos and understand what's happening

## Key Files Changed

| File | Purpose | Key Changes |
|------|---------|-------------|
| `DashboardEmbedSection.tsx` | Main dashboard iframe | +60s timeout, wake-up UI, progress indicator |
| `DemoVideo.tsx` | Video demo component | Smart URL opening with wake-up |
| `serverStatus.ts` | Utility functions | Server checking & wake-up logic |
| `useServerWakeUp.ts` | React hook | Reusable wake-up state management |

## Quick Test

```bash
# 1. Run locally
npm run dev

# 2. Navigate to dashboard section

# 3. Click "View Live Demo"
#    → Should show loading for up to 60s
#    → Progress indicator visible if waking

# 4. If timeout, click "Wake Up Server"
#    → Circular progress 0-100%
#    → Demo loads after wake-up

# 5. Click "Open in New Tab"
#    → Button shows spinner
#    → Server wakes automatically
#    → Tab opens when ready
```

## For Developers

### Using Server Status Utils

```typescript
import { checkServerStatus, wakeUpServer, openUrlWithWakeUp } from '@/utils/serverStatus';

// Check if server is online
const status = await checkServerStatus('https://example.replit.app');
console.log(status.status); // 'online' or 'offline'

// Wake up sleeping server with progress
const result = await wakeUpServer(
  'https://example.replit.app',
  3, // max retries
  3000, // retry delay
  (progress, message) => {
    console.log(`${progress}%: ${message}`);
  }
);

// Open URL with automatic wake-up
await openUrlWithWakeUp('https://example.replit.app');
```

### Using the Hook

```typescript
import { useServerWakeUp } from '@/hooks/useServerWakeUp';

function MyComponent() {
  const { status, progress, message, wakeUp } = useServerWakeUp();

  const handleWakeUp = async () => {
    await wakeUp('https://example.replit.app');
    // Server is now ready
  };

  return (
    <div>
      <p>Status: {status}</p>
      <p>Progress: {progress}%</p>
      <p>{message}</p>
      <button onClick={handleWakeUp}>Wake Server</button>
    </div>
  );
}
```

## User-Facing Changes

### What Users See Now

1. **Loading State** (0-30s)
   - Spinner with "Loading Dashboard Demo"
   - "Replit server may take 30-60 seconds"

2. **Wake-Up State** (if needed)
   - Circular progress indicator (0-100%)
   - "Waking Up Server..." message
   - Real-time percentage updates

3. **Error State** (if timeout)
   - Clear explanation of what happened
   - Info panel about Replit cold starts
   - Multiple recovery options:
     - "Wake Up Server"
     - "Wake & Retry"
     - "Wake & Open in Tab"
     - "Reset & Try Again"

4. **Success State**
   - Demo loads and is interactive
   - Server stays warm for ~1 hour

## Timeouts by Demo Type

| Demo | Hosting | Timeout | Wake-Up |
|------|---------|---------|---------|
| Contacts | Netlify | 30s | No |
| Pipeline | Netlify | 30s | No |
| Calendar | Netlify | 30s | No |
| Dashboard | Replit | 60s | Yes |

## Troubleshooting

### Demo Won't Load After 60s

```typescript
// User should see this:
1. Error message explaining timeout
2. "Wake Up Server" button
3. Click button → Progress shows 0-100%
4. After 100%, demo loads automatically
```

### "Open in New Tab" Not Working

```typescript
// Code automatically:
1. Checks if URL needs wake-up (Replit)
2. Wakes server if needed
3. Shows spinner on button
4. Opens tab when ready

// User should:
- Wait for button spinner to finish
- New tab opens automatically
- May still take 30-60s to fully load in new tab
```

### Progress Stuck at 90%

```typescript
// This is normal:
- Progress animates to 90%
- Waits for actual server response
- Jumps to 100% when confirmed online
- Shows user something is happening

// If truly stuck (rare):
- Click "Reset & Try Again"
- Try "Open in New Tab" instead
- Check browser console for errors
```

## URLs

| Demo | URL |
|------|-----|
| Contacts | https://taupe-sprinkles-83c9ee.netlify.app |
| Pipeline | https://cheery-syrniki-b5b6ca.netlify.app |
| Dashboard | https://smartcrm-videoremix.replit.app/demo-dashboard |
| Calendar | https://voluble-vacherin-add80d.netlify.app |

## Documentation

| File | Purpose |
|------|---------|
| `DEMO_FIX_SUMMARY.md` | Technical details of all changes |
| `DEMO_USER_GUIDE.md` | User-facing documentation |
| `IMPLEMENTATION_SUMMARY.md` | Complete implementation overview |
| `QUICK_REFERENCE.md` | This file |

## Common Code Patterns

### Checking Server Status
```typescript
const status = await checkServerStatus(url, 10000); // 10s timeout
if (status.status === 'offline') {
  // Handle offline server
}
```

### Waking Server with Progress
```typescript
await wakeUpServer(url, 3, 3000, (progress, msg) => {
  setProgress(progress);
  setMessage(msg);
});
```

### Opening URL Safely
```typescript
// Automatic wake-up for Replit URLs
await openUrlWithWakeUp(url);

// Or check manually
if (needsWakeUp(url)) {
  await wakeUpServer(url);
}
window.open(url, '_blank');
```

## Performance Notes

- HEAD requests for status checks (fast)
- `no-cors` mode for wake-up (security)
- Abort controllers for timeout handling
- Proper cleanup of intervals/timeouts
- Efficient React state updates

## Deployment Checklist

- [ ] Test locally (`npm run dev`)
- [ ] Test all 4 demo sections
- [ ] Test "Wake Up Server" button
- [ ] Test "Open in New Tab" button
- [ ] Test retry mechanism
- [ ] Test error states
- [ ] Build production (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Deploy to production
- [ ] Test on production URL
- [ ] Monitor for issues

## Support

If users report issues:
1. Ask them to try "Wake Up Server"
2. Check browser console for errors
3. Verify Replit server is online
4. Try direct URL in new tab
5. Check if ad-blocker interfering
6. Try different browser

## Future Improvements

Priority order:
1. ✅ Add wake-up functionality (DONE)
2. ✅ Increase timeout to 60s (DONE)
3. ✅ Add progress indicators (DONE)
4. 🔜 Migrate dashboard to Netlify (faster)
5. 🔜 Add WebSocket status monitoring
6. 🔜 Implement Service Worker caching

## Need Help?

- Check `DEMO_FIX_SUMMARY.md` for technical details
- Check `IMPLEMENTATION_SUMMARY.md` for full overview
- Review code comments in modified files
- Check browser console for specific errors

---

**Status**: ✅ Ready for Production
**Version**: 1.0.0
**Date**: October 17, 2025
