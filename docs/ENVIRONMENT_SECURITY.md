# Environment Variable Security Guide

## Overview

This document outlines how Smart CRM handles environment variables securely across development, staging, and production environments.

## Security Principles

### 1. Frontend vs Backend Variables

**Frontend (Client-Side) Variables:**
- Must be prefixed with `VITE_`
- Bundled into JavaScript and exposed to the browser
- **NEVER put secrets here** - anyone can view these in browser DevTools
- Examples: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

**Backend (Server-Side) Variables:**
- No `VITE_` prefix
- Only accessible in Netlify Functions or Supabase Edge Functions
- Safe for secrets like `SUPABASE_SERVICE_ROLE_KEY`
- Never exposed to the browser

### 2. Fail Fast on Configuration Errors

The application validates all environment variables at startup (`src/config/env.ts`):

```typescript
import { env } from '../config/env';

// If required vars are missing, app fails immediately with clear error
const { url, anonKey } = env.supabase;
```

**Benefits:**
- Catches misconfiguration before it causes runtime errors
- Prevents deployment with missing/invalid configuration
- Provides clear error messages for debugging

### 3. No Direct Environment Access

❌ **DON'T:**
```typescript
// Direct access - bypasses validation
const url = import.meta.env.VITE_SUPABASE_URL;
```

✅ **DO:**
```typescript
// Centralized, validated config
import { env } from '../config/env';
const { url } = env.supabase;
```

---

## Environment Setup

### Local Development

1. **Copy .env.example to .env:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in values:**
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Verify configuration:**
   - App should start without errors
   - If variables are missing, you'll see a clear error message

### Netlify Production

1. **Go to:** Site Settings > Environment Variables

2. **Add variables:**
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **For Netlify Functions (if needed):**
   ```
   SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   (Note: Do NOT prefix with VITE_)

4. **Deploy:**
   - Changes take effect on next build
   - No need to redeploy if only changing env vars

### Supabase Edge Functions

Edge functions automatically have access to:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Access via `Deno.env.get()`:
```typescript
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
```

---

## Security Validations

The `src/config/env.ts` file performs these security checks:

### 1. Required Variables Check
```typescript
✅ VITE_SUPABASE_URL exists
✅ VITE_SUPABASE_ANON_KEY exists
```

### 2. Service Role Key Detection
```typescript
❌ Blocks any variable with:
   - SERVICE_ROLE
   - service_role
   - PRIVATE
   - SECRET

   in the VITE_* namespace
```

### 3. URL Format Validation
```typescript
✅ VITE_SUPABASE_URL is a valid URL
✅ Points to supabase.co or localhost
```

### 4. JWT Token Validation
```typescript
✅ VITE_SUPABASE_ANON_KEY starts with "eyJ"
✅ Token has role "anon" (not "service_role")
```

### 5. Example Error Output

```
================================================================================
ENVIRONMENT CONFIGURATION ERROR
================================================================================
Environment configuration errors detected:

  ❌ VITE_SUPABASE_URL is not defined. Add it to your .env file or Netlify
     environment variables.

  ❌ VITE_SUPABASE_ANON_KEY has role 'service_role' - should be 'anon'.
     NEVER expose the service_role key in client-side code!

RESOLUTION:
  1. Check your .env file exists and has all required VITE_* variables
  2. Restart the dev server after editing .env
  3. For production, ensure Netlify environment variables are set
  4. See .env.example for full setup instructions

================================================================================
```

---

## Common Mistakes & How to Avoid Them

### Mistake 1: Exposing Service Role Key

❌ **WRONG:**
```bash
# In .env file
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJ...  # DANGER! Exposed to frontend!
```

✅ **CORRECT:**
```bash
# Frontend (.env file)
VITE_SUPABASE_ANON_KEY=eyJ...

# Backend (Netlify environment variables only)
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # No VITE_ prefix!
```

### Mistake 2: Not Restarting Dev Server

Environment variables are loaded at build time, not runtime.

❌ **WRONG:**
```bash
# Edit .env
vim .env

# Continue working without restart
# App still uses old values!
```

✅ **CORRECT:**
```bash
# Edit .env
vim .env

# Restart dev server
npm run dev
```

### Mistake 3: Direct Environment Access

❌ **WRONG:**
```typescript
// Component directly accessing env
const url = import.meta.env.VITE_SUPABASE_URL;
```

✅ **CORRECT:**
```typescript
// Use centralized config
import { env } from '../config/env';
const { url } = env.supabase;
```

### Mistake 4: Mixing Frontend and Backend

❌ **WRONG:**
```typescript
// Frontend component trying to use service role
const supabase = createClient(
  env.supabase.url,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")  // Won't work!
);
```

✅ **CORRECT:**
```typescript
// Frontend - use centralized client
import { getSupabaseClient } from '../utils/supabaseClient';
const supabase = getSupabaseClient();

// Backend (Edge Function) - use service role
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);
```

---

## Supabase Client Usage

### Frontend (Correct Way)

```typescript
import { getSupabaseClient } from '../utils/supabaseClient';

function MyComponent() {
  const supabase = getSupabaseClient();

  // Check if client is available
  if (!supabase) {
    return <div>Service unavailable</div>;
  }

  // Use client with anon key (user permissions)
  const { data, error } = await supabase
    .from('my_table')
    .select('*');
}
```

### Backend - Netlify Function

```typescript
// functions/my-function.ts
import { createClient } from '@supabase/supabase-js';

export const handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!  // Server-only!
  );

  // Use with full admin permissions
  const { data, error } = await supabase
    .from('my_table')
    .select('*');
};
```

### Backend - Edge Function

```typescript
// supabase/functions/my-function/index.ts
import { createClient } from 'npm:@supabase/supabase-js@2.58.0';

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!  // Auto-provided by Supabase
  );

  // Use with full admin permissions
  const { data, error } = await supabase
    .from('my_table')
    .select('*');
});
```

---

## Verification Checklist

Before deploying to production:

### Local Development
- [ ] `.env` file exists
- [ ] All `VITE_*` variables set
- [ ] No `service_role` keys in `.env`
- [ ] App starts without errors
- [ ] Run `npm run validate`

### Git Repository
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` is up to date
- [ ] No secrets committed to git
- [ ] Run `git log -p` to verify no historical leaks

### Netlify Production
- [ ] All `VITE_*` variables set in dashboard
- [ ] Service role key set (no `VITE_` prefix)
- [ ] Build completes successfully
- [ ] App loads without configuration errors

### Security Audit
- [ ] No `import.meta.env` in components (use `env` config)
- [ ] No service role keys in frontend code
- [ ] All Supabase clients use centralized getter
- [ ] Edge functions use `Deno.env.get()`

---

## Troubleshooting

### Error: "VITE_SUPABASE_URL is not defined"

**Cause:** Missing environment variable

**Fix:**
1. Check `.env` file exists
2. Verify variable is spelled correctly
3. Restart dev server: `npm run dev`
4. For production: Check Netlify environment variables

### Error: "VITE_SUPABASE_ANON_KEY has role 'service_role'"

**Cause:** Using service role key instead of anon key in frontend

**Fix:**
1. Go to Supabase Dashboard > Settings > API
2. Copy the "anon/public" key (not service_role)
3. Update `VITE_SUPABASE_ANON_KEY` in `.env`
4. Restart dev server

### Error: "SECURITY VIOLATION: Potentially sensitive keys exposed"

**Cause:** Variable with sensitive name has `VITE_` prefix

**Fix:**
1. Remove `VITE_` prefix from sensitive variables
2. Set them only in Netlify (not in `.env`)
3. Access via `process.env` or `Deno.env` (server-side only)

### App works locally but not in production

**Cause:** Environment variables not set in Netlify

**Fix:**
1. Go to Netlify: Site Settings > Environment Variables
2. Add all `VITE_*` variables from `.env`
3. Trigger new deploy: Deploys > Trigger deploy

### Supabase client returns null

**Cause:** Configuration validation failed

**Fix:**
1. Check browser console for error message
2. Verify all required variables are set
3. Restart dev server after changes
4. Check Netlify build logs for errors

---

## Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Supabase API Keys](https://supabase.com/docs/guides/api#api-keys)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [OWASP: Sensitive Data Exposure](https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure)

---

## Summary

✅ **DO:**
- Use `VITE_` prefix for frontend variables
- Validate environment at startup
- Use centralized `env` config
- Keep `.env` in `.gitignore`
- Set Netlify environment variables for production
- Use `getSupabaseClient()` for frontend
- Use `Deno.env.get()` for Edge Functions

❌ **DON'T:**
- Expose service role keys to frontend
- Access `import.meta.env` directly in components
- Commit `.env` file to git
- Use secrets in VITE_* variables
- Create Supabase clients manually in components
- Forget to restart dev server after `.env` changes

---

**Last Updated:** 2026-03-03
**Maintained By:** Security Team
