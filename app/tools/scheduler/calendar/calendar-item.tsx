"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { deletePost } from "@/app/actions/posts";
import { deleteTweet } from "@/app/actions/tweets";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  queued: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  publishing:
    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  posted: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  failed: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

type Row = {
  id: string;
  platform: "instagram" | "twitter";
  when: Date;
  kind: string;
  caption: string;
  status: string;
  error: string | null;
  postedId: string | null;
};

export function CalendarItem({
  row,
  labels,
}: {
  row: Row;
  labels: { delete: string; confirm: string; deleted: string };
}) {
  const [pending, start] = useTransition();
  const canDelete = ["draft", "queued", "failed"].includes(row.status);

  function onDelete() {
    if (!confirm(labels.confirm)) return;
    start(async () => {
      try {
        if (row.platform === "instagram") await deletePost(row.id);
        else await deleteTweet(row.id);
        toast.success(labels.deleted);
      } catch (e) {
        toast.error((e as Error).message);
      }
    });
  }

  return (
    <li className="rounded border p-3 text-sm">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">
            {row.when.toISOString().slice(11, 16)}
          </span>
          <span
            className={
              "rounded px-1.5 py-0.5 text-xs font-medium " +
              (STATUS_COLORS[row.status] ?? STATUS_COLORS.draft)
            }
          >
            {row.status}
          </span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            {row.platform === "instagram" ? `IG ${row.kind}` : "X / tweet"}
          </span>
        </div>
        {canDelete && (
          <button
            onClick={onDelete}
            disabled={pending}
            className="text-xs text-red-600 hover:underline disabled:opacity-50"
          >
            {labels.delete}
          </button>
        )}
      </div>
      <p className="whitespace-pre-wrap text-neutral-800 dark:text-neutral-200 line-clamp-3">
        {row.caption || <span className="italic text-neutral-400">(no caption)</span>}
      </p>
      {row.error && (
        <p className="mt-1 text-xs text-red-600">{row.error}</p>
      )}
    </li>
  );
}
