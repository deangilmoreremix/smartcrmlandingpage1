import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MAX_RETRIES = 3;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { registrationId } = await req.json();

    if (!registrationId) {
      return new Response(
        JSON.stringify({ error: "Missing registrationId" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Fetch the registration record
    const { data: registration, error: fetchError } = await supabase
      .from("webinar_registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (fetchError || !registration) {
      return new Response(
        JSON.stringify({ error: "Registration not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if max retries reached
    if (registration.retry_count >= MAX_RETRIES) {
      return new Response(
        JSON.stringify({ 
          error: "Maximum retry attempts reached",
          retry_count: registration.retry_count,
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if already fully registered
    if (registration.registration_status === "both_success") {
      return new Response(
        JSON.stringify({ 
          message: "Registration already completed successfully",
          status: registration.registration_status,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const errors: any[] = [...(registration.error_log || [])];
    let zoomSuccess = !!registration.zoom_registrant_id;
    let mailerliteSuccess = !!registration.mailerlite_subscriber_id;
    let zoomData: any = null;
    let mailerliteData: any = null;

    // Retry Zoom if not successful
    if (!zoomSuccess) {
      try {
        zoomData = await registerWithZoom({
          firstName: registration.first_name,
          lastName: registration.last_name,
          email: registration.email,
          phone: registration.phone,
          company: registration.company,
          role: registration.role,
        });
        zoomSuccess = true;
      } catch (error) {
        console.error("Zoom retry failed:", error);
        errors.push({
          service: "zoom",
          error: error.message,
          timestamp: new Date().toISOString(),
          retry_attempt: registration.retry_count + 1,
        });
      }
    }

    // Retry MailerLite if not successful
    if (!mailerliteSuccess) {
      try {
        mailerliteData = await registerWithMailerLite({
          firstName: registration.first_name,
          lastName: registration.last_name,
          email: registration.email,
          phone: registration.phone,
          company: registration.company,
          role: registration.role,
        });
        mailerliteSuccess = true;
      } catch (error) {
        console.error("MailerLite retry failed:", error);
        errors.push({
          service: "mailerlite",
          error: error.message,
          timestamp: new Date().toISOString(),
          retry_attempt: registration.retry_count + 1,
        });
      }
    }

    // Update database with retry results
    const updateData: any = {
      error_log: errors,
      retry_count: registration.retry_count + 1,
      last_retry_at: new Date().toISOString(),
    };

    if (zoomSuccess && !registration.zoom_registrant_id && zoomData) {
      updateData.zoom_registrant_id = zoomData.registrant_id;
      updateData.zoom_join_url = zoomData.join_url;
      updateData.zoom_registered_at = new Date().toISOString();
    }

    if (mailerliteSuccess && !registration.mailerlite_subscriber_id && mailerliteData) {
      updateData.mailerlite_subscriber_id = mailerliteData.data.id;
      updateData.mailerlite_registered_at = new Date().toISOString();
    }

    // Determine overall status
    if (zoomSuccess && mailerliteSuccess) {
      updateData.registration_status = "both_success";
    } else if (zoomSuccess || mailerliteSuccess) {
      updateData.registration_status = "partial_failure";
    } else {
      updateData.registration_status = "failed";
    }

    await supabase
      .from("webinar_registrations")
      .update(updateData)
      .eq("id", registrationId);

    return new Response(
      JSON.stringify({
        success: true,
        registrationId,
        status: updateData.registration_status,
        retry_count: updateData.retry_count,
        zoom: { registered: zoomSuccess },
        mailerlite: { registered: mailerliteSuccess },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Retry error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Retry failed", 
        message: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
}

async function registerWithZoom(data: RegistrationData) {
  const zoomApiKey = Deno.env.get("ZOOM_API_KEY");
  const zoomApiSecret = Deno.env.get("ZOOM_API_SECRET");
  const zoomWebinarId = Deno.env.get("ZOOM_WEBINAR_ID");
  const zoomAccountId = Deno.env.get("ZOOM_ACCOUNT_ID");

  if (!zoomApiKey || !zoomApiSecret || !zoomWebinarId || !zoomAccountId) {
    throw new Error("Zoom API credentials not configured");
  }

  const tokenResponse = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
    {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`${zoomApiKey}:${zoomApiSecret}`)}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!tokenResponse.ok) {
    throw new Error(`Zoom OAuth failed`);
  }

  const { access_token } = await tokenResponse.json();

  const registrantData = {
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    phone: data.phone || "",
    custom_questions: [
      { title: "Company", value: data.company || "" },
      { title: "Role", value: data.role || "" },
    ],
  };

  const registerResponse = await fetch(
    `https://api.zoom.us/v2/webinars/${zoomWebinarId}/registrants`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrantData),
    }
  );

  if (!registerResponse.ok) {
    throw new Error(`Zoom registration failed`);
  }

  return await registerResponse.json();
}

async function registerWithMailerLite(data: RegistrationData) {
  const mailerliteApiKey = Deno.env.get("MAILERLITE_API_KEY");
  const mailerliteGroupId = Deno.env.get("MAILERLITE_GROUP_ID");

  if (!mailerliteApiKey) {
    throw new Error("MailerLite API key not configured");
  }

  const subscriberData = {
    email: data.email,
    fields: {
      name: `${data.firstName} ${data.lastName}`,
      last_name: data.lastName,
      company: data.company || "",
      phone: data.phone || "",
    },
    groups: mailerliteGroupId ? [mailerliteGroupId] : [],
    status: "active",
  };

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${mailerliteApiKey}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(subscriberData),
  });

  if (!response.ok) {
    throw new Error(`MailerLite registration failed`);
  }

  return await response.json();
}
