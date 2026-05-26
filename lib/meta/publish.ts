import { graph } from "./client";

type Token = { token: string; igUserId: string };

async function createContainer(t: Token, params: Record<string, string>): Promise<string> {
  const res = await graph<{ id: string }>(`/${t.igUserId}/media`, {
    token: t.token,
    method: "POST",
    body: JSON.stringify(params),
  });
  return res.id;
}

async function publishContainer(t: Token, creationId: string): Promise<string> {
  const res = await graph<{ id: string }>(`/${t.igUserId}/media_publish`, {
    token: t.token,
    method: "POST",
    body: JSON.stringify({ creation_id: creationId }),
  });
  return res.id;
}

async function waitForContainer(t: Token, containerId: string, timeoutMs = 4 * 60 * 1000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const res = await graph<{ status_code: string; status?: string }>(
      `/${containerId}`,
      { token: t.token, query: { fields: "status_code,status" } },
    );
    if (res.status_code === "FINISHED") return;
    if (res.status_code === "ERROR" || res.status_code === "EXPIRED") {
      throw new Error(`container ${containerId} ${res.status_code}: ${res.status ?? ""}`);
    }
    await new Promise((r) => setTimeout(r, 4000));
  }
  throw new Error(`container ${containerId} timed out`);
}

export async function publishPhoto(t: Token, imageUrl: string, caption?: string) {
  const cid = await createContainer(t, {
    image_url: imageUrl,
    ...(caption ? { caption } : {}),
  });
  return publishContainer(t, cid);
}

export async function publishReel(t: Token, videoUrl: string, caption?: string) {
  const cid = await createContainer(t, {
    media_type: "REELS",
    video_url: videoUrl,
    ...(caption ? { caption } : {}),
  });
  await waitForContainer(t, cid);
  return publishContainer(t, cid);
}

export async function publishCarousel(
  t: Token,
  items: { url: string; kind: "image" | "video" }[],
  caption?: string,
) {
  const children: string[] = [];
  for (const it of items) {
    const cid = await createContainer(t, {
      is_carousel_item: "true",
      ...(it.kind === "image" ? { image_url: it.url } : { media_type: "VIDEO", video_url: it.url }),
    });
    if (it.kind === "video") await waitForContainer({ ...t }, cid);
    children.push(cid);
  }
  const parent = await createContainer(t, {
    media_type: "CAROUSEL",
    children: children.join(","),
    ...(caption ? { caption } : {}),
  });
  return publishContainer(t, parent);
}

export async function publishStoryImage(t: Token, imageUrl: string) {
  const cid = await createContainer(t, {
    media_type: "STORIES",
    image_url: imageUrl,
  });
  return publishContainer(t, cid);
}

export async function postFirstComment(t: Token, mediaId: string, text: string) {
  await graph(`/${mediaId}/comments`, {
    token: t.token,
    method: "POST",
    body: JSON.stringify({ message: text }),
  });
}
