import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  source?: string;
}

interface ZoomRegistrantResponse {
  id: string;
  join_url: string;
  registrant_id: string;
}

interface MailerLiteResponse {
  data: {
    id: string;
    email: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const registrationData: RegistrationData = await req.json();

    // Validate required fields
    if (!registrationData.email || !registrationData.firstName || !registrationData.lastName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: firstName, lastName, email" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Step 1: Save to Supabase database first
    const { data: dbRecord, error: dbError } = await supabase
      .from("webinar_registrations")
      .insert({
        first_name: registrationData.firstName,
        last_name: registrationData.lastName,
        email: registrationData.email,
        phone: registrationData.phone || null,
        company: registrationData.company || null,
        role: registrationData.role || null,
        source: registrationData.source || "Website",
        registered_at: new Date().toISOString(),
        registration_status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      // Handle duplicate email
      if (dbError.code === "23505") {
        return new Response(
          JSON.stringify({ 
            error: "This email is already registered for the webinar",
            code: "DUPLICATE_EMAIL"
          }),
          {
            status: 409,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      throw dbError;
    }

    const registrationId = dbRecord.id;
    const errors: any[] = [];
    let zoomSuccess = false;
    let mailerliteSuccess = false;
    let zoomData: any = null;
    let mailerliteData: any = null;

    // Step 2: Register with Zoom
    try {
      zoomData = await registerWithZoom(registrationData);
      zoomSuccess = true;
    } catch (error) {
      console.error("Zoom registration failed:", error);
      errors.push({
        service: "zoom",
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Step 3: Register with MailerLite
    try {
      mailerliteData = await registerWithMailerLite(registrationData);
      mailerliteSuccess = true;
    } catch (error) {
      console.error("MailerLite registration failed:", error);
      errors.push({
        service: "mailerlite",
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Step 4: Update database with results
    const updateData: any = {
      error_log: errors,
      retry_count: 0,
    };

    if (zoomSuccess && zoomData) {
      updateData.zoom_registrant_id = zoomData.registrant_id;
      updateData.zoom_join_url = zoomData.join_url;
      updateData.zoom_registered_at = new Date().toISOString();
    }

    if (mailerliteSuccess && mailerliteData) {
      updateData.mailerlite_subscriber_id = mailerliteData.data.id;
      updateData.mailerlite_registered_at = new Date().toISOString();
    }

    // Determine overall status
    if (zoomSuccess && mailerliteSuccess) {
      updateData.registration_status = "both_success";
    } else if (zoomSuccess || mailerliteSuccess) {
      updateData.registration_status = "partial_failure";
    } else {
      updateData.registration_status = "db_only";
    }

    await supabase
      .from("webinar_registrations")
      .update(updateData)
      .eq("id", registrationId);

    // Step 5: Return response
    const response = {
      success: true,
      registrationId,
      status: updateData.registration_status,
      zoom: zoomSuccess ? { registered: true, join_url: zoomData?.join_url } : { registered: false },
      mailerlite: mailerliteSuccess ? { registered: true } : { registered: false },
      errors: errors.length > 0 ? errors : undefined,
    };

    return new Response(JSON.stringify(response), {
      status: zoomSuccess && mailerliteSuccess ? 200 : 207, // 207 = Multi-Status for partial success
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Registration failed", 
        message: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function registerWithZoom(data: RegistrationData): Promise<ZoomRegistrantResponse> {
  const zoomApiKey = Deno.env.get("ZOOM_API_KEY");
  const zoomApiSecret = Deno.env.get("ZOOM_API_SECRET");
  const zoomWebinarId = Deno.env.get("ZOOM_WEBINAR_ID");
  const zoomAccountId = Deno.env.get("ZOOM_ACCOUNT_ID");

  if (!zoomApiKey || !zoomApiSecret || !zoomWebinarId || !zoomAccountId) {
    throw new Error("Zoom API credentials not configured");
  }

  // Generate Zoom OAuth token
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
    const errorText = await tokenResponse.text();
    throw new Error(`Zoom OAuth failed: ${errorText}`);
  }

  const { access_token } = await tokenResponse.json();

  // Register user for webinar
  const registrantData = {
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    phone: data.phone || "",
    custom_questions: [
      {
        title: "Company",
        value: data.company || "",
      },
      {
        title: "Role",
        value: data.role || "",
      },
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
    const errorText = await registerResponse.text();
    throw new Error(`Zoom registration failed: ${errorText}`);
  }

  return await registerResponse.json();
}

async function registerWithMailerLite(data: RegistrationData): Promise<MailerLiteResponse> {
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
    status: "active", // or "unconfirmed" if you want double opt-in
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
    const errorText = await response.text();
    throw new Error(`MailerLite registration failed: ${errorText}`);
  }

  return await response.json();
}
