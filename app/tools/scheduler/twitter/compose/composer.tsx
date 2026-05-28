"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";
import { createScheduledTweet } from "@/app/actions/tweets";

type Account = { id: string; handle: string };
type MediaRef = { blobUrl: string; mime: string };

function errMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

export function TweetComposer({ accounts }: { accounts: Account[] }) {
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [text, setText] = useState("");
  const [media, setMedia] = useState<MediaRef[]>([]);
  const [when, setWhen] = useState(() =>
    new Date(Date.now() + 5 * 60_000).toISOString().slice(0, 16),
  );
  const [busy, setBusy] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const remaining = 280 - text.length;

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setLastError(null);
    try {
      const refs: MediaRef[] = [];
      for (const f of Array.from(files).slice(0, 4 - media.length)) {
        if (!f.type.startsWith("image/")) {
          toast.error(`Twitter MVP supports image uploads only (skipped ${f.name})`);
          continue;
        }
        const safeName = f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const blob = await upload(`tweets/${Date.now()}-${safeName}`, f, {
          access: "public",
          handleUploadUrl: "/api/posts/upload",
          contentType: f.type,
        });
        refs.push({ blobUrl: blob.url, mime: f.type });
      }
      setMedia((m) => [...m, ...refs]);
    } catch (e) {
      const msg = errMessage(e);
      setLastError(`Upload failed: ${msg}`);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  function removeMedia(i: number) {
    setMedia((m) => m.filter((_, idx) => idx !== i));
  }

  async function submit() {
    if (!text.trim()) return toast.error("Tweet text is required");
    if (text.length > 280) return toast.error("Tweet is too long");
    setBusy(true);
    setLastError(null);
    try {
      await createScheduledTweet({
        accountId,
        text,
        media: media.length ? media : undefined,
        scheduledFor: new Date(when).toISOString(),
      });
      toast.success("Tweet scheduled");
      setText("");
      setMedia([]);
    } catch (e) {
      const msg = errMessage(e);
      setLastError(`Schedule failed: ${msg}`);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {lastError && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-900">
          <pre className="whitespace-pre-wrap break-words text-xs">{lastError}</pre>
        </div>
      )}

      <label className="block">
        <span className="text-sm">Account</span>
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
        <span className="text-sm flex justify-between">
          Text
          <span className={remaining < 0 ? "text-red-600" : "text-neutral-500"}>{remaining}</span>
        </span>
        <textarea
          className="mt-1 block w-full rounded border p-2"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
        />
      </label>

      <label className="block">
        <span className="text-sm">Images (up to 4)</span>
        <input
          className="mt-1 block w-full"
          type="file"
          multiple
          accept="image/*"
          disabled={busy || media.length >= 4}
          onChange={(e) => onFiles(e.target.files)}
        />
        {media.length > 0 && (
          <ul className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
            {media.map((m, i) => (
              <li key={i} className="relative rounded border p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.blobUrl} alt="" className="h-24 w-full rounded object-cover" />
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
        <span className="text-sm">Scheduled for (local)</span>
        <input
          type="datetime-local"
          className="mt-1 block w-full rounded border p-2"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
        />
      </label>

      <button
        onClick={submit}
        disabled={busy || !text.trim() || text.length > 280}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {busy ? "…" : "Schedule tweet"}
      </button>
    </div>
  );
}
