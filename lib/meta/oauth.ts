import { graph } from "./client";

export function authorizeUrl(state: string) {
  const params = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    redirect_uri: process.env.META_REDIRECT_URI!,
    state,
    response_type: "code",
    // Minimal scope: publish to your own IG + read insights. No messaging,
    // no comment management, no webhook subscription. Smaller scope = faster
    // App Review later if you ever go that route.
    scope: [
      "instagram_basic",
      "instagram_content_publish",
      "instagram_manage_insights",
      "pages_show_list",
      "pages_read_engagement",
    ].join(","),
  });
  return `https://www.facebook.com/${process.env.META_GRAPH_VERSION ?? "v21.0"}/dialog/oauth?${params}`;
}

export async function exchangeCodeForToken(code: string) {
  const res = await graph<{ access_token: string; token_type: string; expires_in?: number }>(
    "/oauth/access_token",
    {
      token: "",
      query: {
        client_id: process.env.META_APP_ID!,
        client_secret: process.env.META_APP_SECRET!,
        redirect_uri: process.env.META_REDIRECT_URI!,
        code,
      },
    },
  );
  return res;
}

export async function exchangeForLongLived(shortLived: string) {
  return graph<{ access_token: string; token_type: string; expires_in: number }>(
    "/oauth/access_token",
    {
      token: "",
      query: {
        grant_type: "fb_exchange_token",
        client_id: process.env.META_APP_ID!,
        client_secret: process.env.META_APP_SECRET!,
        fb_exchange_token: shortLived,
      },
    },
  );
}

export async function listPages(userToken: string) {
  return graph<{
    data: { id: string; name: string; access_token: string }[];
  }>("/me/accounts", { token: userToken });
}

export async function resolveInstagramAccount(pageId: string, pageToken: string) {
  return graph<{ instagram_business_account?: { id: string; username: string } }>(
    `/${pageId}`,
    { token: pageToken, query: { fields: "instagram_business_account{id,username}" } },
  );
}
