export type Rule = {
  id: string;
  triggerKeywords: string[];
  match: "contains" | "exact" | "regex";
  enabled: boolean;
};

export function findMatchingRule(rules: Rule[], message: string): Rule | null {
  const m = message.trim().toLowerCase();
  for (const r of rules) {
    if (!r.enabled) continue;
    for (const raw of r.triggerKeywords) {
      const kw = raw.toLowerCase();
      if (r.match === "exact" && m === kw) return r;
      if (r.match === "contains" && m.includes(kw)) return r;
      if (r.match === "regex") {
        try {
          if (new RegExp(raw, "i").test(message)) return r;
        } catch {
          /* invalid regex — skip */
        }
      }
    }
  }
  return null;
}

export function renderTemplate(template: string, vars: Record<string, string | undefined>) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k: string) => vars[k] ?? "");
}
