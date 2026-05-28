"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { setLocale } from "@/app/actions/settings";
import type { Locale } from "@/lib/i18n/dict";

export function SettingsForm({
  initialLocale,
  labels,
}: {
  initialLocale: Locale;
  labels: { language: string; english: string; korean: string; save: string; saved: string };
}) {
  const [locale, setLocal] = useState<Locale>(initialLocale);
  const [pending, start] = useTransition();

  function save() {
    start(async () => {
      await setLocale(locale);
      toast.success(labels.saved);
    });
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="locale">{labels.language}</Label>
        <select
          id="locale"
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={locale}
          onChange={(e) => setLocal(e.target.value as Locale)}
        >
          <option value="en">{labels.english}</option>
          <option value="ko">{labels.korean}</option>
        </select>
      </div>
      <Button onClick={save} disabled={pending} size="sm">
        {labels.save}
      </Button>
    </div>
  );
}
