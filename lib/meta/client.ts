const GRAPH = "https://graph.facebook.com";

type GraphErr = { error?: { message: string; type: string; code: number } };

export class MetaError extends Error {
  constructor(public status: number, public body: unknown, message: string) {
    super(message);
  }
}

export async function graph<T>(
  path: string,
  init: RequestInit & { token: string; version?: string; query?: Record<string, string | number | undefined> } = { token: "" },
): Promise<T> {
  const version = init.version ?? process.env.META_GRAPH_VERSION ?? "v21.0";
  const url = new URL(`${GRAPH}/${version}${path.startsWith("/") ? path : `/${path}`}`);
  if (init.query) {
    for (const [k, v] of Object.entries(init.query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  url.searchParams.set("access_token", init.token);

  const res = await fetch(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const text = await res.text();
  const body = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    const msg = (body as GraphErr)?.error?.message ?? `Graph ${res.status}`;
    throw new MetaError(res.status, body, msg);
  }
  return body as T;
}
