import { getDict, getLocale } from "@/lib/i18n/server";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const t = await getDict();
  const locale = await getLocale();
  return (
    <main className="mx-auto max-w-xl p-8 space-y-6">
      <h1 className="text-2xl font-bold">{t.settings.title}</h1>
      <SettingsForm
        initialLocale={locale}
        labels={{
          language: t.settings.language,
          english: t.settings.english,
          korean: t.settings.korean,
          save: t.settings.save,
          saved: t.settings.saved,
        }}
      />
    </main>
  );
}
