// =============================================================================
// CORS Proxy — Cloudflare Worker
// =============================================================================
//
// A lightweight CORS proxy that forwards requests and injects origin headers
// for allowlisted domains (e.g. curiosa.io tRPC endpoints).
//
// SETUP INSTRUCTIONS
// ------------------
// 1. Go to https://dash.cloudflare.com → Workers & Pages → Create Worker
// 2. Give it a name (e.g. "corsproxy")
// 3. Click "Deploy" to create the worker with the placeholder code
// 4. Click "Edit Code" and replace everything with the contents of this file
// 5. Click "Deploy"
// 6. Your proxy is live at: https://corsproxy.<your-subdomain>.workers.dev
//
// USAGE
// -----
//   GET https://corsproxy.<subdomain>.workers.dev/?url=<encoded-target-url>
//
//   Example:
//   https://corsproxy.innkeeper1.workers.dev/?url=https://curiosa.io/api/trpc/deck.getDecklistById?input=...
//
// =============================================================================

// Domains that need a spoofed Origin header to avoid 403s.
// The key is the hostname, the value is the Origin to inject.
const ORIGIN_OVERRIDES = {
  "curiosa.io": "https://curiosa.io",
};

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders("*") });
    }

    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("Missing ?url= parameter", { status: 400 });
    }

    let parsedTarget;
    try {
      parsedTarget = new URL(targetUrl);
    } catch {
      return new Response("Invalid target URL", { status: 400 });
    }

    // Build forwarded headers — strip host/origin from the original request
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    // Inject Origin + Referer for allowlisted domains
    const override = ORIGIN_OVERRIDES[parsedTarget.hostname];
    if (override) {
      headers.set("Origin", override);
      headers.set("Referer", override + "/");
    }

    const resp = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.method !== "GET" ? request.body : undefined,
    });

    // Clone the response and slap on CORS headers
    const responseHeaders = new Headers(resp.headers);
    for (const [k, v] of Object.entries(corsHeaders("*"))) {
      responseHeaders.set(k, v);
    }

    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers: responseHeaders,
    });
  },
};

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}
