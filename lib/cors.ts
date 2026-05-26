/**
 * CORS helpers for the public /api/v1/* endpoints consumed by the Chrome
 * extension. Auth is via API key in the Authorization header, so we can
 * safely allow any origin (the bearer token gates access, not the origin).
 */
const HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "authorization, content-type",
  "access-control-max-age": "86400",
};

export function cors(res: Response): Response {
  for (const [k, v] of Object.entries(HEADERS)) res.headers.set(k, v);
  return res;
}

export function corsJson(data: unknown, init?: ResponseInit): Response {
  return cors(
    new Response(JSON.stringify(data), {
      ...init,
      headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
    }),
  );
}

export function preflight(): Response {
  return cors(new Response(null, { status: 204 }));
}
