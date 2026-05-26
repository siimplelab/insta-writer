import { getDict, getLocale } from "@/lib/i18n/server";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const t = await getDict();
  const locale = await getLocale();
  const apiKeyConfigured = !!process.env.APP_API_KEY && process.env.APP_API_KEY.length >= 16;

  return (
    <main className="mx-auto max-w-xl p-8 space-y-8">
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

      <section className="space-y-3 rounded border p-4">
        <h2 className="font-semibold">{t.settings.extensionTitle}</h2>
        <p className="text-sm text-neutral-500">{t.settings.extensionDesc}</p>
        <div
          className={
            apiKeyConfigured
              ? "rounded bg-emerald-50 p-2 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
              : "rounded bg-amber-50 p-2 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200"
          }
        >
          {apiKeyConfigured ? `✓ ${t.settings.apiKeyConfigured}` : `⚠ ${t.settings.apiKeyMissing}`}
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer font-medium">{t.settings.extensionInstall}</summary>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-neutral-600 dark:text-neutral-400">
            <li>
              Clone the repo and open{" "}
              <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">extension/</code>
            </li>
            <li>
              Chrome → <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">chrome://extensions</code>
            </li>
            <li>Enable Developer Mode (top right)</li>
            <li>Click &quot;Load unpacked&quot; → pick the <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">extension/</code> folder</li>
            <li>Open the extension Options page and paste your App URL + API key</li>
          </ol>
        </details>
      </section>
    </main>
  );
}
