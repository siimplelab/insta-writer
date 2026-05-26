"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteRule, upsertRule } from "@/app/actions/rules";

type Account = { id: string; handle: string };
type Rule = {
  id: string;
  accountId: string;
  name: string;
  triggerKeywords: string[];
  match: "contains" | "exact" | "regex";
  replyTemplate: string;
  tagAsLead: boolean;
  enabled: boolean;
};

type Labels = {
  newRule: string;
  ruleName: string;
  keywords: string;
  replyTemplate: string;
  captureLead: string;
  save: string;
  saved: string;
  existing: string;
  noRules: string;
  connectFirst: string;
  delete: string;
};

export function RulesEditor({
  accounts,
  rules,
  labels,
}: {
  accounts: Account[];
  rules: Rule[];
  labels: Labels;
}) {
  const [draft, setDraft] = useState<Partial<Rule>>({
    accountId: accounts[0]?.id,
    name: "",
    match: "contains",
    replyTemplate: "Hi @{{username}} — thanks for reaching out!",
    tagAsLead: true,
    enabled: true,
  });
  const [keywords, setKeywords] = useState("");

  if (accounts.length === 0)
    return <p className="text-sm text-neutral-500">{labels.connectFirst}</p>;

  async function save() {
    try {
      await upsertRule({
        accountId: draft.accountId!,
        name: draft.name!,
        triggerKeywords: keywords.split(",").map((s) => s.trim()).filter(Boolean),
        match: draft.match!,
        replyTemplate: draft.replyTemplate!,
        tagAsLead: !!draft.tagAsLead,
        enabled: !!draft.enabled,
      });
      toast.success(labels.saved);
      setKeywords("");
      setDraft({ ...draft, name: "" });
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded border p-4">
        <h2 className="font-semibold">{labels.newRule}</h2>
        <input
          className="w-full rounded border p-2"
          placeholder={labels.ruleName}
          value={draft.name ?? ""}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        />
        <select
          className="w-full rounded border p-2"
          value={draft.accountId}
          onChange={(e) => setDraft({ ...draft, accountId: e.target.value })}
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              @{a.handle}
            </option>
          ))}
        </select>
        <input
          className="w-full rounded border p-2"
          placeholder={labels.keywords}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <select
          className="w-full rounded border p-2"
          value={draft.match}
          onChange={(e) => setDraft({ ...draft, match: e.target.value as Rule["match"] })}
        >
          <option value="contains">contains</option>
          <option value="exact">exact</option>
          <option value="regex">regex</option>
        </select>
        <textarea
          className="w-full rounded border p-2"
          rows={3}
          placeholder={labels.replyTemplate}
          value={draft.replyTemplate ?? ""}
          onChange={(e) => setDraft({ ...draft, replyTemplate: e.target.value })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!draft.tagAsLead}
            onChange={(e) => setDraft({ ...draft, tagAsLead: e.target.checked })}
          />
          {labels.captureLead}
        </label>
        <button onClick={save} className="rounded bg-black px-4 py-2 text-white">
          {labels.save}
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">{labels.existing}</h2>
        {rules.length === 0 ? (
          <p className="text-sm text-neutral-500">{labels.noRules}</p>
        ) : (
          rules.map((r) => (
            <div
              key={r.id}
              className="flex items-start justify-between rounded border p-3 text-sm"
            >
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-neutral-500">
                  [{r.match}] {r.triggerKeywords.join(", ")} →{" "}
                  {r.replyTemplate.slice(0, 60)}…
                </div>
              </div>
              <button onClick={() => deleteRule(r.id)} className="text-xs text-red-600">
                {labels.delete}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
