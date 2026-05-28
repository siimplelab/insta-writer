"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deletePost } from "@/app/actions/posts";
import { deleteTweet } from "@/app/actions/tweets";

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "outline" | "success" | "warning" | "info" | "destructive"
> = {
  draft: "outline",
  queued: "info",
  publishing: "warning",
  posted: "success",
  failed: "destructive",
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
    <li>
      <Card>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {row.when.toISOString().slice(11, 16)}
              </span>
              <Badge variant={STATUS_VARIANT[row.status] ?? "outline"}>{row.status}</Badge>
              <Badge variant="outline">
                {row.platform === "instagram" ? `IG ${row.kind}` : "X / tweet"}
              </Badge>
            </div>
            {canDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                disabled={pending}
                className="h-7 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {labels.delete}
              </Button>
            )}
          </div>
          <p className="line-clamp-3 whitespace-pre-wrap text-sm">
            {row.caption || <span className="italic text-muted-foreground">(no caption)</span>}
          </p>
          {row.error && <p className="mt-2 text-xs text-destructive">{row.error}</p>}
        </CardContent>
      </Card>
    </li>
  );
}
