// Service worker. Mainly here to (a) bootstrap the context menu and
// (b) provide a "Quick draft from selection / image" entry point.

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "siimply-draft-image",
    title: "Save image to siimply marketing draft",
    contexts: ["image"],
  });
  chrome.contextMenus.create({
    id: "siimply-draft-selection",
    title: "Save selection to siimply marketing caption",
    contexts: ["selection"],
  });
});

async function getConfig() {
  return chrome.storage.sync.get(["appUrl", "apiKey", "defaultAccountId", "locale"]);
}

async function api(path, init = {}) {
  const cfg = await getConfig();
  if (!cfg.appUrl || !cfg.apiKey) throw new Error("Not configured — open extension options");
  const res = await fetch(cfg.appUrl.replace(/\/+$/, "") + path, {
    ...init,
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + cfg.apiKey,
      ...(init.headers || {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
  return json;
}

chrome.contextMenus.onClicked.addListener(async (info) => {
  try {
    const cfg = await getConfig();
    if (!cfg.defaultAccountId) {
      await chrome.runtime.openOptionsPage();
      return;
    }
    if (info.menuItemId === "siimply-draft-image" && info.srcUrl) {
      await api("/api/v1/drafts", {
        method: "POST",
        body: JSON.stringify({
          accountId: cfg.defaultAccountId,
          kind: "photo",
          asDraft: true,
          media: [{ url: info.srcUrl }],
        }),
      });
      await flash("✓ Saved as IG draft");
    } else if (info.menuItemId === "siimply-draft-selection" && info.selectionText) {
      // Save just text — no media. Requires at least one media per the schema, so we skip until
      // user opens popup. Notify them.
      await flash("Open siimply marketing popup to pick an image for this caption.");
    }
  } catch (e) {
    await flash("siimply marketing error: " + e.message);
  }
});

async function flash(message) {
  // Chrome MV3 service workers don't have a window; use a notifications-style
  // toast via the chrome.notifications API. Keep it tiny — no icon needed
  // beyond the extension icon (referenced by id).
  try {
    // 1x1 transparent PNG so we don't need to ship an icon file
    const TINY_PNG =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    chrome.notifications.create({
      type: "basic",
      iconUrl: TINY_PNG,
      title: "siimply marketing",
      message,
    });
  } catch {
    /* swallow */
  }
}
