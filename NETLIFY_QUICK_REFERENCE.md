# Netlify Hardening - Quick Reference

## What Was Done

### 1. netlify.toml - Security Headers
- ✅ 11 security headers (HSTS, CSP, X-Frame-Options, etc.)
- ✅ Aggressive caching for static assets (1 year immutable)
- ✅ No cache for index.html (always fresh)
- ✅ SPA routing with asset exclusions
- ✅ Function timeouts and configuration

### 2. Middleware Library
**File:** `netlify/functions/_shared/middleware.ts`
- ✅ Rate limiting (in-memory, per IP)
- ✅ Request validation (size, methods, auth)
- ✅ CORS handling
- ✅ Error standardization
- ✅ Logging utilities

### 3. Health Check
**File:** `netlify/functions/health.ts`
**Endpoint:** `GET /.netlify/functions/health`
- ✅ Environment validation
- ✅ Supabase connectivity check
- ✅ Uptime tracking

### 4. Updated Functions
- ✅ `register-webinar.ts` - Uses middleware (5 req/min limit)
- ✅ `upload-media.ts` - Uses middleware (10 req/min limit)

---

## Quick Verification

### Test Health Endpoint
```bash
curl https://your-site.netlify.app/.netlify/functions/health | jq
# Expected: {"success":true,"data":{"status":"healthy",...}}
```

### Test Security Headers
```bash
curl -I https://your-site.netlify.app/ | grep -E "(Security|CSP|X-Frame)"
# Expected: Multiple security headers present
```

### Test Rate Limiting
```bash
# Send 6 requests (limit is 5/min)
for i in {1..6}; do
  curl -X POST https://your-site.netlify.app/.netlify/functions/register-webinar \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Test","lastName":"User","email":"test'$i'@example.com"}' \
    -w "\nStatus: %{http_code}\n"
done
# Expected: 6th request returns 429
```

### Test Caching
```bash
# Assets should have max-age=31536000
curl -I https://your-site.netlify.app/assets/index-*.js | grep Cache-Control

# index.html should have no-cache
curl -I https://your-site.netlify.app/ | grep Cache-Control
```

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/health` | 20 req | 1 min |
| `/register-webinar` | 5 req | 1 min |
| `/upload-media` | 10 req | 1 min |

---

## Security Headers Reference

```toml
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Permissions-Policy: camera=(), microphone=(), geolocation=()...
Content-Security-Policy: default-src 'self'; ...
Cross-Origin-Embedder-Policy: credentialless
Cross-Origin-Opener-Policy: same-origin-allow-popups
Cross-Origin-Resource-Policy: cross-origin
```

---

## Troubleshooting

### Rate limit too strict?
Edit function file: `rateLimit: { maxRequests: 20 }`

### CSP blocking resources?
Update `netlify.toml`: Add domain to CSP directive

### Health check failing?
1. Check env vars: `netlify env:list`
2. Check logs: `netlify functions:log health`
3. Verify Supabase: `curl https://your-project.supabase.co/rest/v1/`

---

## Monitoring Setup

**Recommended:**
1. Uptime monitor on `/health` endpoint (5 min interval)
2. Alert on 429 rate limit hits (>100/hour)
3. Alert on 5xx errors (>5% error rate)
4. Alert on slow responses (p95 >2s)

---

## Files Created/Modified

```
✅ netlify.toml                              # Updated with security headers
✅ netlify/functions/_shared/middleware.ts   # NEW: Middleware library
✅ netlify/functions/health.ts               # NEW: Health endpoint
✅ netlify/functions/register-webinar.ts     # Updated to use middleware
✅ netlify/functions/upload-media.ts         # Updated to use middleware
✅ NETLIFY_HARDENING_GUIDE.md                # NEW: Complete guide
✅ NETLIFY_QUICK_REFERENCE.md                # NEW: This file
```

---

## Next Steps

1. Deploy to Netlify: `git push`
2. Run verification tests above
3. Set up monitoring alerts
4. Review function logs for issues

---

**For detailed information, see:** `NETLIFY_HARDENING_GUIDE.md`
