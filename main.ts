import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const endpoint = url.searchParams.get("endpoint");

  if (!endpoint) {
    return new Response(
      JSON.stringify({ error: "endpoint required" }),
      { headers: corsHeaders }
    );
  }

  const mexcUrl = "https://api.mexc.com" + endpoint;
  const r = await fetch(mexcUrl);
  const data = await r.text();

  return new Response(data, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};
