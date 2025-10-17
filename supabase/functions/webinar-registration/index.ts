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

interface GoToWebinarResponse {
  registrantKey: string;
  joinUrl: string;
  status: string;
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

    if (!registrationData.email || !registrationData.firstName || !registrationData.lastName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: firstName, lastName, email" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    let gotowebinarSuccess = false;
    let zoomData: any = null;
    let mailerliteData: any = null;
    let gotowebinarData: any = null;

    try {
      gotowebinarData = await registerWithGoToWebinar(registrationData);
      gotowebinarSuccess = true;
    } catch (error) {
      console.error("GoToWebinar registration failed:", error);
      errors.push({
        service: "gotowebinar",
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }

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

    const updateData: any = {
      error_log: errors,
      retry_count: 0,
    };

    if (gotowebinarSuccess && gotowebinarData) {
      updateData.gotowebinar_registrant_key = gotowebinarData.registrantKey;
      updateData.gotowebinar_join_url = gotowebinarData.joinUrl;
      updateData.gotowebinar_registered_at = new Date().toISOString();
    }

    if (zoomSuccess && zoomData) {
      updateData.zoom_registrant_id = zoomData.registrant_id;
      updateData.zoom_join_url = zoomData.join_url;
      updateData.zoom_registered_at = new Date().toISOString();
    }

    if (mailerliteSuccess && mailerliteData) {
      updateData.mailerlite_subscriber_id = mailerliteData.data.id;
      updateData.mailerlite_registered_at = new Date().toISOString();
    }

    if (gotowebinarSuccess && mailerliteSuccess) {
      updateData.registration_status = "both_success";
    } else if (gotowebinarSuccess || zoomSuccess || mailerliteSuccess) {
      updateData.registration_status = "partial_failure";
    } else {
      updateData.registration_status = "db_only";
    }

    await supabase
      .from("webinar_registrations")
      .update(updateData)
      .eq("id", registrationId);

    const response = {
      success: true,
      registrationId,
      status: updateData.registration_status,
      gotowebinar: gotowebinarSuccess ? { registered: true, join_url: gotowebinarData?.joinUrl, registrantKey: gotowebinarData?.registrantKey } : { registered: false },
      zoom: zoomSuccess ? { registered: true, join_url: zoomData?.join_url } : { registered: false },
      mailerlite: mailerliteSuccess ? { registered: true } : { registered: false },
      errors: errors.length > 0 ? errors : undefined,
    };

    return new Response(JSON.stringify(response), {
      status: (gotowebinarSuccess || zoomSuccess) && mailerliteSuccess ? 200 : 207,
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
    const errorText = await response.text();
    throw new Error(`MailerLite registration failed: ${errorText}`);
  }

  return await response.json();
}

async function registerWithGoToWebinar(data: RegistrationData): Promise<GoToWebinarResponse> {
  const gtwOAuthToken = Deno.env.get("GOTOWEBINAR_OAUTH_TOKEN");
  const gtwWebinarKey = Deno.env.get("GOTOWEBINAR_WEBINAR_KEY") || "3582347872503621721";

  if (!gtwOAuthToken) {
    throw new Error("GoToWebinar OAuth token not configured");
  }

  const registrantData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || "",
    organization: data.company || "",
    jobTitle: data.role || "",
    source: data.source || "Website",
    responses: [],
  };

  const response = await fetch(
    `https://api.getgo.com/G2W/rest/v2/organizers/me/webinars/${gtwWebinarKey}/registrants`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${gtwOAuthToken}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(registrantData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GoToWebinar registration failed: ${errorText}`);
  }

  return await response.json();
}
