import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, type Locale, dict, type Dict } from "./dict";

export async function getLocale(): Promise<Locale> {
  const c = await cookies();
  const v = c.get("locale")?.value;
  return (LOCALES as readonly string[]).includes(v ?? "")
    ? (v as Locale)
    : DEFAULT_LOCALE;
}

export async function getDict(): Promise<Dict> {
  const l = await getLocale();
  return dict[l];
}
