# 🔐 Security Quick Reference Guide

## 📋 TL;DR - What Changed

### 🚨 **CRITICAL: Read This First**

1. **SQL Migration Required** → Apply `*_security_hardening_rls_fixes.sql` in Supabase
2. **Netlify Functions Added** → Deploy `netlify/functions/register-webinar.ts` and `upload-media.ts`
3. **Environment Variables** → Add `SUPABASE_SERVICE_ROLE_KEY` to Netlify (NOT frontend!)
4. **Frontend Updates** → Use new secure endpoints instead of direct Supabase calls

---

## 🎯 Quick Actions

### 1. Apply SQL Migration (5 min)

```bash
# Copy the migration file content
cat supabase/migrations/*_security_hardening_rls_fixes.sql

# Paste into Supabase SQL Editor:
# https://app.supabase.com/project/_/sql/new
# Click "Run"
```

### 2. Set Environment Variables (2 min)

**Netlify Dashboard → Site Settings → Environment Variables:**

```bash
# Add these:
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... # From Supabase Dashboard
SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc... # MUST be anon key!
```

### 3. Deploy Functions (1 min)

```bash
git add netlify/functions/
git commit -m "feat: add secure backend functions"
git push
# Netlify auto-deploys functions
```

### 4. Update Frontend Calls (10 min)

**Old (insecure):**
```typescript
await supabase.from('webinar_registrations').insert(data);
```

**New (secure):**
```typescript
await fetch('/.netlify/functions/register-webinar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

---

## 🛡️ Security Rules (Remember These!)

### Environment Variables

✅ **Safe (VITE_ prefix = public):**
```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

❌ **DANGER (Never use VITE_ with secrets!):**
```bash
VITE_SUPABASE_SERVICE_ROLE_KEY=...  # ❌ NEVER!
```

### RLS Policies

✅ **Safe:**
```sql
USING (user_id = auth.uid()::text)
USING (email = auth.jwt() ->> 'email')
```

❌ **DANGER:**
```sql
USING (true)              # ❌ Anyone can access!
USING (...something OR true)  # ❌ Bypass check!
```

### Input Validation

✅ **Safe:**
```typescript
const result = safeValidate(schema, userInput);
if (!result.success) return { errors: result.errors };
```

❌ **DANGER:**
```typescript
await supabase.from('table').insert(userInput); # ❌ No validation!
```

---

## 📚 Common Tasks

### Add New Database Table

```sql
-- 1. Create table
CREATE TABLE my_table (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  data text,
  created_at timestamptz DEFAULT now()
);

-- 2. ALWAYS enable RLS!
ALTER TABLE my_table ENABLE ROW LEVEL SECURITY;

-- 3. Add policies (user can only access their own data)
CREATE POLICY "Users can view their own data"
  ON my_table FOR SELECT
  TO authenticated
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own data"
  ON my_table FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid()::text);
```

### Create Validation Schema

```typescript
// src/schemas/validation.ts

export const mySchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase(),
  age: z.number().int().min(0).max(150),
}).strict();

export type MyInput = z.infer<typeof mySchema>;

// Usage:
const result = safeValidate(mySchema, userInput);
if (!result.success) {
  console.error(result.errors);
}
```

### Create Secure Netlify Function

```typescript
// netlify/functions/my-action.ts

import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const handler: Handler = async (event) => {
  // 1. Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }
  
  // 2. Validate input
  const body = JSON.parse(event.body || '{}');
  const validation = mySchema.safeParse(body);
  if (!validation.success) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ errors: validation.error.errors }),
    };
  }
  
  // 3. Use service role key (server-side only!)
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  // 4. Do privileged operation
  const { data, error } = await supabase
    .from('my_table')
    .insert(validation.data);
  
  // 5. Return response
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, data }),
  };
};
```

---

## 🧪 Testing Security

### Test RLS Policies

```sql
-- Test as anonymous user
SET ROLE anon;
SELECT * FROM webinar_registrations;
-- Expected: 0 rows or permission denied

-- Test as authenticated user
SET ROLE authenticated;
SET request.jwt.claims = '{"sub":"user-id","email":"test@example.com"}';
SELECT * FROM webinar_registrations WHERE email = 'test@example.com';
-- Expected: Only that user's registration

-- Reset
RESET ROLE;
```

### Test Validation

```typescript
import { webinarRegistrationSchema, safeValidate } from '@/schemas/validation';

// Test valid input
const valid = safeValidate(webinarRegistrationSchema, {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
});
console.log(valid.success); // true

// Test invalid input
const invalid = safeValidate(webinarRegistrationSchema, {
  firstName: '',  // Too short
  email: 'not-an-email',  // Invalid format
});
console.log(invalid.success); // false
console.log(invalid.errors); // Array of error messages
```

### Test Rate Limiting

```bash
# Try to register 6 times in 1 minute (limit is 5)
for i in {1..6}; do
  curl -X POST http://localhost:8888/.netlify/functions/register-webinar \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Test","lastName":"User","email":"test'$i'@example.com"}'
  echo ""
done

# Expected: 6th request should return 429 (Too Many Requests)
```

---

## 🚀 Deployment Checklist

- [ ] SQL migration applied in Supabase
- [ ] Verified all tables have RLS enabled
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set in Netlify
- [ ] `VITE_SUPABASE_ANON_KEY` is anon key (not service role)
- [ ] Netlify functions deployed
- [ ] Frontend updated to use new endpoints
- [ ] Tested registration flow
- [ ] Tested file upload flow
- [ ] Verified RLS policies with test users

---

## 🆘 Troubleshooting

### "Permission denied for table"

**Cause:** RLS is blocking access  
**Fix:** Check RLS policies match your use case

```sql
-- View current policies
SELECT * FROM pg_policies WHERE tablename = 'your_table';
```

### "Method not allowed" from Netlify Function

**Cause:** Trying to GET a POST endpoint  
**Fix:** Use correct HTTP method

```typescript
// Correct:
fetch(url, { method: 'POST', body: JSON.stringify(data) })

// Wrong:
fetch(url) // Defaults to GET
```

### "Invalid or expired token"

**Cause:** JWT token missing or invalid  
**Fix:** Include Authorization header

```typescript
fetch(url, {
  headers: {
    'Authorization': `Bearer ${supabase.auth.session()?.access_token}`,
  },
})
```

### "Rate limit exceeded"

**Cause:** Too many requests from same IP  
**Fix:** Wait 1 minute and try again

---

## 📞 Need Help?

1. Check `SECURITY_AUDIT_REPORT.md` for detailed info
2. Review Supabase RLS docs: https://supabase.com/docs/guides/auth/row-level-security
3. Test policies using SQL verification queries
4. Check Netlify function logs for errors

---

**Last Updated:** $(date +"%Y-%m-%d")
