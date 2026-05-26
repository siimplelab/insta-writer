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

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      const refs: MediaRef[] = [];
      for (const f of Array.from(files)) {
        const blob = await upload(f.name, f, {
          access: "public",
          handleUploadUrl: "/api/posts/upload",
        });
        refs.push({ blobUrl: blob.url, mime: f.type });
      }
      setMedia((m) => [...m, ...refs]);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function suggestCaption() {
    if (!media[0]) return toast.error(labels.uploadFirst);
    setBusy(true);
    try {
      const res = await fetch("/api/ai/caption", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ imageUrl: media[0].blobUrl, hint: caption || undefined }),
      });
      const j = (await res.json()) as { caption?: string; error?: string };
      if (j.caption) setCaption(j.caption);
      else toast.error(j.error ?? labels.noCaptionReturned);
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (!media.length) return toast.error(labels.uploadAtLeastOne);
    setBusy(true);
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
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
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
          onChange={(e) => onFiles(e.target.files)}
        />
        {media.length > 0 && (
          <ul className="mt-2 text-xs text-neutral-500">
            {media.map((m, i) => (
              <li key={i}>
                {m.mime} — {m.blobUrl.slice(0, 60)}…
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
            disabled={busy}
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
        disabled={busy}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {labels.schedule}
      </button>
    </div>
  );
}
