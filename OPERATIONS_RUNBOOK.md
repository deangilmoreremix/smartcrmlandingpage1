# Operations Runbook - Smart CRM
## Production Operations & Incident Response Guide

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Service Health Monitoring](#service-health-monitoring)
3. [Common Issues & Solutions](#common-issues--solutions)
4. [Incident Response](#incident-response)
5. [Deployment Procedures](#deployment-procedures)
6. [Rollback Procedures](#rollback-procedures)
7. [Database Operations](#database-operations)
8. [Scaling Operations](#scaling-operations)
9. [Security Incidents](#security-incidents)
10. [Contact Information](#contact-information)

---

## System Overview

### Architecture
- **Frontend**: React SPA hosted on Netlify
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **CDN**: Netlify Edge
- **Third-party Integrations**: Zoom, GoToWebinar, MailerLite

### Key URLs
- **Production**: https://smartcrm.vip
- **Supabase Dashboard**: https://supabase.com/dashboard/project/kvkdfcjckonwovunbaug
- **Netlify Dashboard**: [Your Netlify URL]
- **Health Check**: https://kvkdfcjckonwovunbaug.supabase.co/functions/v1/health

### Environment Variables
Located in:
- Frontend: Netlify Environment Variables
- Edge Functions: Supabase Dashboard > Project Settings > Edge Functions

---

## Service Health Monitoring

### Health Check Endpoint

```bash
# Check service health
curl https://kvkdfcjckonwovunbaug.supabase.co/functions/v1/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2026-03-03T...",
  "version": "1.0.0",
  "checks": {
    "database": true,
    "memory": true,
    "uptime": 123
  }
}
```

### Key Metrics to Monitor

1. **Response Time**
   - Target: < 500ms (p95)
   - Alert: > 2000ms (p95)

2. **Error Rate**
   - Target: < 1%
   - Alert: > 5%

3. **Database Connections**
   - Target: < 70% capacity
   - Alert: > 90% capacity

4. **Edge Function Invocations**
   - Monitor: Daily invocation count
   - Alert: Sudden spikes (>200% baseline)

### Monitoring Dashboards

**Supabase Dashboard**
- Database Connections
- API Requests
- Database Storage
- Edge Function Logs

**Netlify Dashboard**
- Deploy Status
- Build Minutes
- Bandwidth Usage
- Form Submissions

---

## Common Issues & Solutions

### Issue 1: Database Connection Errors

**Symptoms:**
- 500 errors on API requests
- "Too many connections" errors
- Slow query performance

**Diagnosis:**
```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity;

-- Check long-running queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active'
ORDER BY duration DESC;
```

**Solution:**
1. Kill long-running queries:
   ```sql
   SELECT pg_terminate_backend(pid)
   FROM pg_stat_activity
   WHERE pid = <PID>;
   ```

2. Review connection pooling configuration
3. Scale up database if needed

### Issue 2: Edge Function Failures

**Symptoms:**
- Webinar registrations failing
- 500 errors from edge functions
- Timeout errors

**Diagnosis:**
```bash
# View edge function logs
# Go to: Supabase Dashboard > Edge Functions > [Function Name] > Logs

# Check recent errors
grep "error" logs.txt | tail -20
```

**Solution:**
1. Check third-party service status:
   - Zoom Status: https://status.zoom.us
   - GoToWebinar Status: https://status.goto.com
   - MailerLite Status: https://status.mailerlite.com

2. Verify environment variables:
   ```bash
   # Check if secrets are set
   supabase secrets list
   ```

3. Redeploy edge function:
   ```bash
   # Through Supabase Dashboard or CLI
   supabase functions deploy [function-name]
   ```

### Issue 3: High Response Times

**Symptoms:**
- Pages loading slowly
- Users reporting timeouts
- High Time to Interactive (TTI)

**Diagnosis:**
1. Check Netlify Analytics for slow pages
2. Review database query performance
3. Check CDN cache hit rate

**Solution:**
1. Clear CDN cache:
   ```bash
   # Netlify CLI
   netlify build
   netlify deploy --prod
   ```

2. Optimize database queries:
   ```sql
   -- Add indexes if missing
   CREATE INDEX IF NOT EXISTS idx_webinar_registrations_email
   ON webinar_registrations(email);
   ```

3. Review bundle size and code splitting

### Issue 4: Failed Deployments

**Symptoms:**
- Build fails on Netlify
- New code not appearing
- 404 errors on new routes

**Diagnosis:**
```bash
# Check build logs in Netlify Dashboard
# Look for:
# - npm install errors
# - TypeScript errors
# - Build failures
```

**Solution:**
1. Review build logs for specific errors
2. Test build locally:
   ```bash
   npm install
   npm run build
   ```

3. Check for missing environment variables
4. Rollback to previous deploy if needed

### Issue 5: Rate Limiting Issues

**Symptoms:**
- 429 errors
- "Rate limit exceeded" messages
- Legitimate users blocked

**Diagnosis:**
```bash
# Check edge function logs for rate limit triggers
# Look for IPs hitting limits
```

**Solution:**
1. Temporarily increase rate limits (if DDoS not suspected)
2. Whitelist specific IPs if needed
3. Implement CAPTCHA for high-traffic endpoints

---

## Incident Response

### Severity Levels

**SEV1 (Critical)** - Service Down
- Complete outage
- Data loss risk
- Response: Immediate (< 15 minutes)

**SEV2 (High)** - Major Degradation
- Partial functionality loss
- Significant user impact
- Response: < 1 hour

**SEV3 (Medium)** - Minor Issues
- Limited user impact
- Workarounds available
- Response: < 4 hours

**SEV4 (Low)** - Cosmetic Issues
- No functionality impact
- Response: Next business day

### Incident Response Process

1. **Detection & Alert**
   - Monitoring alerts
   - User reports
   - Health check failures

2. **Initial Response** (< 15 min for SEV1)
   - Acknowledge incident
   - Assess severity
   - Notify team
   - Create incident channel

3. **Investigation** (< 30 min)
   - Check monitoring dashboards
   - Review recent changes
   - Check service dependencies
   - Gather error logs

4. **Mitigation**
   - Implement temporary fix
   - Rollback if needed
   - Scale resources if needed
   - Update status page

5. **Resolution**
   - Implement permanent fix
   - Verify fix works
   - Monitor for recurrence
   - Update documentation

6. **Post-Incident Review** (within 48 hours)
   - Timeline of events
   - Root cause analysis
   - Action items
   - Process improvements

### Emergency Contacts

**On-Call Rotation**
- Primary: [Name] - [Phone] - [Email]
- Secondary: [Name] - [Phone] - [Email]
- Escalation: [Manager Name] - [Phone] - [Email]

**Third-Party Support**
- Supabase Support: support@supabase.io
- Netlify Support: support@netlify.com
- Emergency Escalation: [Account Manager]

---

## Deployment Procedures

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Build succeeds locally
- [ ] Changes reviewed by team
- [ ] Environment variables verified
- [ ] Database migrations tested
- [ ] Rollback plan prepared

### Standard Deployment Process

1. **Merge to Main Branch**
   ```bash
   git checkout main
   git pull origin main
   git merge feature-branch
   git push origin main
   ```

2. **Automatic Deployment**
   - Netlify automatically builds and deploys
   - Monitor build progress in dashboard
   - Verify deployment succeeds

3. **Post-Deployment Verification**
   ```bash
   # Check health endpoint
   curl https://kvkdfcjckonwovunbaug.supabase.co/functions/v1/health

   # Verify critical paths
   # - Homepage loads
   # - Registration form works
   # - Demo pages load
   ```

4. **Monitor for Issues**
   - Watch error rates for 30 minutes
   - Check user reports
   - Review logs for anomalies

### Edge Function Deployment

1. **Test Locally**
   ```bash
   supabase functions serve [function-name]
   ```

2. **Deploy to Production**
   ```bash
   supabase functions deploy [function-name]
   ```

3. **Verify Deployment**
   ```bash
   curl -X POST \
     https://kvkdfcjckonwovunbaug.supabase.co/functions/v1/[function-name] \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```

### Database Migration Deployment

1. **Review Migration**
   ```bash
   # Check migration file
   cat supabase/migrations/[timestamp]_[name].sql
   ```

2. **Apply Migration**
   ```bash
   # Through Supabase Dashboard
   # SQL Editor > New Query > Paste migration > Run

   # Or via CLI
   supabase db push
   ```

3. **Verify Migration**
   ```sql
   -- Check table structure
   \d+ table_name

   -- Verify data integrity
   SELECT COUNT(*) FROM table_name;
   ```

---

## Rollback Procedures

### Frontend Rollback (Netlify)

1. **Navigate to Netlify Dashboard**
   - Go to Deploys tab
   - Find last known good deploy
   - Click "Publish deploy"

2. **Verify Rollback**
   - Check homepage loads
   - Test critical user flows
   - Monitor error rates

3. **Fix Forward**
   - Create hotfix branch
   - Fix issue
   - Deploy new version

### Edge Function Rollback

1. **Redeploy Previous Version**
   ```bash
   # Checkout previous commit
   git checkout <previous-commit-hash>

   # Redeploy function
   supabase functions deploy [function-name]
   ```

2. **Verify Rollback**
   ```bash
   # Test function
   curl https://kvkdfcjckonwovunbaug.supabase.co/functions/v1/[function-name]
   ```

### Database Rollback

**WARNING: Database rollbacks are risky. Always backup first.**

1. **Create Backup**
   ```bash
   # Through Supabase Dashboard
   # Database > Backups > Create Backup
   ```

2. **Reverse Migration**
   ```sql
   -- Manual reversal of changes
   -- Example:
   DROP TABLE IF EXISTS new_table;
   ALTER TABLE old_table ADD COLUMN IF NOT EXISTS old_column;
   ```

3. **Verify Data Integrity**
   ```sql
   -- Run validation queries
   SELECT COUNT(*) FROM critical_table;
   ```

---

## Database Operations

### Backup Procedures

**Automated Backups**
- Supabase performs daily backups automatically
- Retained for 7 days
- Access: Supabase Dashboard > Database > Backups

**Manual Backup**
```bash
# Through Supabase Dashboard
# Database > Backups > Create Backup

# Or via pg_dump (if direct access)
pg_dump -h db.kvkdfcjckonwovunbaug.supabase.co \
  -U postgres \
  -d postgres \
  --format=custom \
  --file=backup_$(date +%Y%m%d_%H%M%S).dump
```

### Restore Procedures

1. **Point-in-Time Recovery**
   - Supabase Dashboard > Database > Backups
   - Select backup point
   - Confirm restoration

2. **Manual Restore**
   ```bash
   pg_restore -h db.kvkdfcjckonwovunbaug.supabase.co \
     -U postgres \
     -d postgres \
     --clean \
     backup.dump
   ```

### Common Database Maintenance

**Vacuum Database**
```sql
-- Reclaim storage
VACUUM ANALYZE;
```

**Reindex Tables**
```sql
-- Rebuild indexes
REINDEX TABLE webinar_registrations;
```

**Update Statistics**
```sql
-- Update query planner statistics
ANALYZE;
```

---

## Scaling Operations

### Vertical Scaling (Supabase)

**When to Scale Up:**
- CPU usage > 80% sustained
- Memory usage > 90%
- Connection pool exhaustion
- Query performance degradation

**How to Scale:**
1. Supabase Dashboard > Settings > Database
2. Select higher tier
3. Confirm upgrade
4. Monitor performance improvement

### Horizontal Scaling (Frontend)

**Netlify Auto-Scales:**
- Automatically handles traffic spikes
- CDN distributes load globally
- No manual intervention needed

**If Issues Persist:**
1. Review bundle size
2. Implement code splitting
3. Optimize images
4. Enable aggressive caching

---

## Security Incidents

### Data Breach Response

1. **Immediate Actions**
   - Isolate affected systems
   - Rotate all secrets/keys
   - Block suspicious IPs
   - Notify security team

2. **Investigation**
   - Review access logs
   - Identify breach scope
   - Document timeline
   - Preserve evidence

3. **Remediation**
   - Patch vulnerabilities
   - Force password resets
   - Notify affected users (if required by law)
   - Update security policies

### Suspicious Activity

**Signs of Attack:**
- Unusual traffic patterns
- Multiple failed login attempts
- SQL injection attempts in logs
- Rate limit violations

**Response:**
1. Block suspicious IPs
2. Review logs for patterns
3. Enable additional logging
4. Increase rate limits temporarily
5. Contact Supabase support if needed

---

## Maintenance Windows

### Scheduled Maintenance

**Timing:**
- Preferred: Tuesday/Wednesday 2-4 AM EST
- Avoid: Weekends, holidays, major events

**Notification:**
- Email users 72 hours in advance
- Update status page
- Post on social media

**Process:**
1. Announce maintenance window
2. Create database backup
3. Perform maintenance
4. Verify systems
5. Notify completion

---

## Monitoring & Alerting Setup

### Recommended Monitoring Tools

**Application Monitoring:**
- Sentry (Error tracking)
- DataDog (APM)
- LogRocket (Session replay)

**Infrastructure Monitoring:**
- Supabase built-in monitoring
- Netlify Analytics
- Uptime monitoring (UptimeRobot, Pingdom)

### Key Alerts to Configure

1. **Service Health**
   - Health check fails for > 2 minutes
   - Error rate > 5%
   - Response time p95 > 2 seconds

2. **Database**
   - Connection pool > 90%
   - Disk usage > 85%
   - Long-running queries > 30 seconds

3. **Security**
   - Multiple failed auth attempts
   - Unusual traffic patterns
   - Rate limit violations

---

## Contact Information

### Internal Team
- **Engineering Lead**: [Name] - [Email] - [Phone]
- **DevOps/SRE**: [Name] - [Email] - [Phone]
- **Product Manager**: [Name] - [Email] - [Phone]

### External Vendors
- **Supabase Support**: support@supabase.io
- **Netlify Support**: support@netlify.com
- **Zoom Support**: [Support URL]
- **GoToWebinar Support**: [Support URL]
- **MailerLite Support**: [Support URL]

### Emergency Escalation
1. On-call engineer (response: < 15 min)
2. Engineering lead (response: < 30 min)
3. CTO/VP Engineering (response: < 1 hour)

---

## Appendix

### Useful Commands

```bash
# Check Netlify deploy status
netlify status

# View Netlify logs
netlify logs

# Check Supabase project status
supabase status

# View edge function logs
supabase functions logs [function-name]

# Test edge function locally
supabase functions serve [function-name]

# Deploy edge function
supabase functions deploy [function-name]
```

### Log Locations

- **Frontend Errors**: Browser console
- **Edge Function Logs**: Supabase Dashboard > Edge Functions > Logs
- **Database Logs**: Supabase Dashboard > Database > Logs
- **Build Logs**: Netlify Dashboard > Deploys > [Deploy] > Deploy Log

### Performance Targets

| Metric | Target | Alert |
|--------|--------|-------|
| FCP (First Contentful Paint) | < 1.5s | > 3s |
| LCP (Largest Contentful Paint) | < 2.5s | > 4s |
| FID (First Input Delay) | < 100ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| TTI (Time to Interactive) | < 3.5s | > 7s |
| API Response Time (p95) | < 500ms | > 2s |
| Database Query Time (p95) | < 100ms | > 500ms |

---

**Document Version**: 1.0
**Last Updated**: 2026-03-03
**Next Review**: 2026-04-03
