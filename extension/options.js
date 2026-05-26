const $ = (id) => document.getElementById(id);

function setStatus(msg, kind) {
  const el = $("status");
  el.className = "status " + kind;
  el.textContent = msg;
}

async function load() {
  const cfg = await chrome.storage.sync.get(["appUrl", "apiKey", "locale"]);
  $("appUrl").value = cfg.appUrl || "";
  $("apiKey").value = cfg.apiKey || "";
  $("locale").value = cfg.locale || "en";
}

async function save() {
  const appUrl = $("appUrl").value.trim().replace(/\/+$/, "");
  const apiKey = $("apiKey").value.trim();
  const locale = $("locale").value;
  if (!appUrl || !apiKey) {
    setStatus("App URL and API key are required.", "err");
    return;
  }
  await chrome.storage.sync.set({ appUrl, apiKey, locale });
  setStatus("Saved.", "ok");
}

async function testConnection() {
  const appUrl = $("appUrl").value.trim().replace(/\/+$/, "");
  const apiKey = $("apiKey").value.trim();
  if (!appUrl || !apiKey) {
    setStatus("Fill in both fields first.", "err");
    return;
  }
  setStatus("Testing…", "ok");
  try {
    const res = await fetch(appUrl + "/api/v1/accounts", {
      headers: { authorization: "Bearer " + apiKey },
    });
    const json = await res.json();
    if (!res.ok) {
      setStatus(`HTTP ${res.status}: ${json.error || "failed"}`, "err");
      return;
    }
    const n = json.accounts?.length ?? 0;
    setStatus(`✓ Connected. ${n} account${n === 1 ? "" : "s"} available.`, "ok");
  } catch (e) {
    setStatus("Connection failed: " + e.message, "err");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  load();
  $("save").addEventListener("click", save);
  $("test").addEventListener("click", testConnection);
});
