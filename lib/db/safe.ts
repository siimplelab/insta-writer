/**
 * Wraps a DB query so pages render a friendly empty/error state instead of
 * 500-ing when the database isn't yet provisioned or migrated.
 */
export async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<{ data: T; error: string | null }> {
  try {
    return { data: await fn(), error: null };
  } catch (e) {
    return { data: fallback, error: e instanceof Error ? e.message : String(e) };
  }
}
