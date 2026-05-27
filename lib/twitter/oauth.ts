import { createHash, randomBytes } from "node:crypto";

const AUTHZ_URL = "https://twitter.com/i/oauth2/authorize";
const TOKEN_URL = "https://api.twitter.com/2/oauth2/token";
const ME_URL = "https://api.twitter.com/2/users/me";

export const SCOPES = [
  "tweet.read",
  "tweet.write",
  "users.read",
  "offline.access", // gets us a refresh_token
];

function b64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function genPkce() {
  const verifier = b64url(randomBytes(48));
  const challenge = b64url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

export function authorizeUrl(opts: { state: string; codeChallenge: string }) {
  const p = new URLSearchParams({
    response_type: "code",
    client_id: process.env.TWITTER_CLIENT_ID!,
    redirect_uri: process.env.TWITTER_REDIRECT_URI!,
    scope: SCOPES.join(" "),
    state: opts.state,
    code_challenge: opts.codeChallenge,
    code_challenge_method: "S256",
  });
  return `${AUTHZ_URL}?${p.toString()}`;
}

type TokenRes = {
  token_type: "bearer";
  expires_in: number;
  access_token: string;
  refresh_token?: string;
  scope: string;
};

function basicAuthHeader(): Record<string, string> {
  const id = process.env.TWITTER_CLIENT_ID!;
  const secret = process.env.TWITTER_CLIENT_SECRET;
  // Confidential clients use HTTP Basic. Public (no secret) clients send client_id in body only.
  if (secret) {
    return {
      authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
    };
  }
  return {};
}

async function tokenRequest(body: URLSearchParams): Promise<TokenRes> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      ...basicAuthHeader(),
    },
    body,
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* keep raw */
  }
  if (!res.ok) {
    const msg =
      (json && typeof json === "object" && "error_description" in json
        ? (json as { error_description: string }).error_description
        : null) ?? text ?? `HTTP ${res.status}`;
    throw new Error(`twitter token: ${msg}`);
  }
  return json as TokenRes;
}

export async function exchangeCode(code: string, codeVerifier: string): Promise<TokenRes> {
  return tokenRequest(
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.TWITTER_REDIRECT_URI!,
      code_verifier: codeVerifier,
      client_id: process.env.TWITTER_CLIENT_ID!,
    }),
  );
}

export async function refresh(refreshToken: string): Promise<TokenRes> {
  return tokenRequest(
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.TWITTER_CLIENT_ID!,
    }),
  );
}

export async function me(accessToken: string): Promise<{ id: string; username: string; name: string }> {
  const res = await fetch(ME_URL, {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  const j = (await res.json()) as { data?: { id: string; username: string; name: string }; errors?: unknown };
  if (!res.ok || !j.data) throw new Error(`twitter /me: ${JSON.stringify(j)}`);
  return j.data;
}
