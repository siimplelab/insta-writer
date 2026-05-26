"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
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
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm">{labels.language}</span>
        <select
          className="mt-1 block w-full rounded border p-2"
          value={locale}
          onChange={(e) => setLocal(e.target.value as Locale)}
        >
          <option value="en">{labels.english}</option>
          <option value="ko">{labels.korean}</option>
        </select>
      </label>
      <button
        onClick={save}
        disabled={pending}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {labels.save}
      </button>
    </div>
  );
}
