import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  checks: {
    database: boolean;
    memory: boolean;
    uptime: number;
  };
  details?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const startTime = Date.now();
    const checks = {
      database: false,
      memory: true,
      uptime: 0,
    };

    // Check database connection
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { error } = await supabase.from("webinar_registrations").select("id").limit(1);
        checks.database = !error;
      }
    } catch {
      checks.database = false;
    }

    // Calculate uptime (time since function started)
    checks.uptime = Date.now() - startTime;

    // Determine overall health status
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (!checks.database) {
      status = 'degraded';
    }

    const healthStatus: HealthStatus = {
      status,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      checks,
    };

    const statusCode = status === 'healthy' ? 200 : status === 'degraded' ? 200 : 503;

    return new Response(JSON.stringify(healthStatus), {
      status: statusCode,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    const healthStatus: HealthStatus = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      checks: {
        database: false,
        memory: false,
        uptime: 0,
      },
      details: error instanceof Error ? error.message : 'Unknown error',
    };

    return new Response(JSON.stringify(healthStatus), {
      status: 503,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
