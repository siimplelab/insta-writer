import { api } from "./client";

/**
 * Upload an image to Twitter (v2 media upload). For an MVP we support
 * still images only; video requires the chunked INIT/APPEND/FINALIZE flow.
 *
 * `imageUrl` is fetched server-side (e.g. from Vercel Blob) and forwarded.
 */
export async function uploadImage(token: string, imageUrl: string, mime: string): Promise<string> {
  const r = await fetch(imageUrl);
  if (!r.ok) throw new Error(`fetch media ${imageUrl} → ${r.status}`);
  const blob = await r.blob();

  const fd = new FormData();
  // Twitter v2 media upload uses `media` field (multipart). `media_category`
  // can be "tweet_image" (still) — Twitter infers from content-type otherwise.
  fd.append("media", new Blob([blob], { type: mime }), "media");
  fd.append("media_category", "tweet_image");

  const res = await api<{ data: { id: string }; id?: string }>(
    token,
    "/2/media/upload",
    { method: "POST", body: fd, uploadHost: true },
  );
  // Twitter has shipped both response shapes during the v2 rollout
  const id = res.data?.id ?? res.id;
  if (!id) throw new Error(`twitter media upload: no id in response ${JSON.stringify(res)}`);
  return id;
}

export type PostTweetInput = {
  text: string;
  mediaIds?: string[];
  inReplyToTweetId?: string;
};

export async function postTweet(
  token: string,
  input: PostTweetInput,
): Promise<{ id: string; text: string }> {
  const body: Record<string, unknown> = { text: input.text };
  if (input.mediaIds?.length) body.media = { media_ids: input.mediaIds };
  if (input.inReplyToTweetId) body.reply = { in_reply_to_tweet_id: input.inReplyToTweetId };

  const res = await api<{ data: { id: string; text: string } }>(token, "/2/tweets", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res.data;
}
