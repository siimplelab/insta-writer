"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";
import { createScheduledPost } from "@/app/actions/posts";

type Account = { id: string; handle: string };
type MediaRef = { blobUrl: string; mime: string };

type Labels = {
  account: string;
  kind: string;
  photo: string;
  carousel: string;
  reel: string;
  story: string;
  media: string;
  caption: string;
  aiSuggest: string;
  firstComment: string;
  scheduledFor: string;
  schedule: string;
  scheduled: string;
  uploadFirst: string;
  uploadAtLeastOne: string;
  noCaptionReturned: string;
};

function errMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

export function Composer({ accounts, labels }: { accounts: Account[]; labels: Labels }) {
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [kind, setKind] = useState<"photo" | "carousel" | "reel" | "story">("photo");
  const [caption, setCaption] = useState("");
  const [firstComment, setFirstComment] = useState("");
  const [media, setMedia] = useState<MediaRef[]>([]);
  const [when, setWhen] = useState(() =>
    new Date(Date.now() + 5 * 60_000).toISOString().slice(0, 16),
  );
  const [busy, setBusy] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setLastError(null);
    try {
      const refs: MediaRef[] = [];
      for (const f of Array.from(files)) {
        // Sanitize file name — Blob rejects some characters
        const safeName = f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const blob = await upload(`posts/${Date.now()}-${safeName}`, f, {
          access: "public",
          handleUploadUrl: "/api/posts/upload",
          contentType: f.type,
        });
        refs.push({ blobUrl: blob.url, mime: f.type });
      }
      setMedia((m) => [...m, ...refs]);
      toast.success(`Uploaded ${refs.length} file${refs.length > 1 ? "s" : ""}`);
    } catch (e) {
      const msg = errMessage(e);
      setLastError(`Upload failed: ${msg}`);
      toast.error(`Upload failed: ${msg}`);
    } finally {
      setBusy(false);
    }
  }

  function removeMedia(i: number) {
    setMedia((m) => m.filter((_, idx) => idx !== i));
  }

  async function suggestCaption() {
    if (!media[0]) return toast.error(labels.uploadFirst);
    setBusy(true);
    setLastError(null);
    try {
      const res = await fetch("/api/ai/caption", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ imageUrl: media[0].blobUrl, hint: caption || undefined }),
      });
      const j = (await res.json()) as { caption?: string; error?: string };
      if (!res.ok) {
        setLastError(j.error ?? `HTTP ${res.status}`);
        toast.error(j.error ?? `HTTP ${res.status}`);
        return;
      }
      if (j.caption) setCaption(j.caption);
      else toast.error(labels.noCaptionReturned);
    } catch (e) {
      const msg = errMessage(e);
      setLastError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (!media.length) return toast.error(labels.uploadAtLeastOne);
    if (!accountId) return toast.error("No account selected");
    setBusy(true);
    setLastError(null);
    try {
      await createScheduledPost({
        accountId,
        kind,
        caption: caption || undefined,
        firstComment: firstComment || undefined,
        scheduledFor: new Date(when).toISOString(),
        media,
      });
      toast.success(labels.scheduled);
      setMedia([]);
      setCaption("");
      setFirstComment("");
    } catch (e) {
      const msg = errMessage(e);
      setLastError(`Schedule failed: ${msg}`);
      toast.error(`Schedule failed: ${msg}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {lastError && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          <div className="font-medium">Error</div>
          <pre className="mt-1 whitespace-pre-wrap break-words text-xs">{lastError}</pre>
        </div>
      )}

      <label className="block">
        <span className="text-sm">{labels.account}</span>
        <select
          className="mt-1 block w-full rounded border p-2"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              @{a.handle}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm">{labels.kind}</span>
        <select
          className="mt-1 block w-full rounded border p-2"
          value={kind}
          onChange={(e) => setKind(e.target.value as typeof kind)}
        >
          <option value="photo">{labels.photo}</option>
          <option value="carousel">{labels.carousel}</option>
          <option value="reel">{labels.reel}</option>
          <option value="story">{labels.story}</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm">{labels.media}</span>
        <input
          className="mt-1 block w-full"
          type="file"
          multiple={kind === "carousel"}
          accept="image/*,video/mp4"
          disabled={busy}
          onChange={(e) => onFiles(e.target.files)}
        />
        {media.length > 0 && (
          <ul className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
            {media.map((m, i) => (
              <li key={i} className="relative rounded border p-1">
                {m.mime.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.blobUrl} alt="" className="h-24 w-full rounded object-cover" />
                ) : (
                  <video src={m.blobUrl} className="h-24 w-full rounded object-cover" />
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(i)}
                  className="absolute right-1 top-1 rounded bg-black/70 px-1 text-xs text-white"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </label>

      <label className="block">
        <span className="text-sm flex justify-between">
          {labels.caption}
          <button
            type="button"
            onClick={suggestCaption}
            disabled={busy || media.length === 0}
            className="text-xs underline disabled:opacity-50"
          >
            {labels.aiSuggest}
          </button>
        </span>
        <textarea
          className="mt-1 block w-full rounded border p-2"
          rows={6}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </label>

      <label className="block">
        <span className="text-sm">{labels.firstComment}</span>
        <textarea
          className="mt-1 block w-full rounded border p-2"
          rows={2}
          value={firstComment}
          onChange={(e) => setFirstComment(e.target.value)}
        />
      </label>

      <label className="block">
        <span className="text-sm">{labels.scheduledFor}</span>
        <input
          type="datetime-local"
          className="mt-1 block w-full rounded border p-2"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
        />
      </label>

      <button
        onClick={submit}
        disabled={busy || media.length === 0}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {busy ? "…" : labels.schedule}
      </button>
    </div>
  );
}
