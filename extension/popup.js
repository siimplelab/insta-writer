// Marketing Atlas — page-capture popup
// Talks to the deployed Next.js app via /api/v1/* endpoints.

const $ = (id) => document.getElementById(id);
const state = {
  appUrl: "",
  apiKey: "",
  defaultAccountId: "",
  locale: "en",
  images: [],
  selectedImages: new Set(),
  pageUrl: "",
  pageTitle: "",
  pageText: "",
};

function setStatus(msg, kind = "info") {
  const el = $("status");
  el.className = "status " + kind;
  el.textContent = msg;
  if (kind === "ok") setTimeout(() => (el.className = "status"), 3000);
}

async function loadConfig() {
  const cfg = await chrome.storage.sync.get([
    "appUrl",
    "apiKey",
    "defaultAccountId",
    "locale",
  ]);
  state.appUrl = (cfg.appUrl || "").replace(/\/+$/, "");
  state.apiKey = cfg.apiKey || "";
  state.defaultAccountId = cfg.defaultAccountId || "";
  state.locale = cfg.locale || "en";
  return !!(state.appUrl && state.apiKey);
}

async function api(path, init = {}) {
  if (!state.appUrl || !state.apiKey)
    throw new Error("Extension not configured. Set App URL + API key in Options.");
  const res = await fetch(state.appUrl + path, {
    ...init,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${state.apiKey}`,
      ...(init.headers || {}),
    },
  });
  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error(`HTTP ${res.status}`);
  }
  if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
  return json;
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function extractPageContent() {
  const tab = await getActiveTab();
  if (!tab?.id) return;
  state.pageUrl = tab.url || "";
  state.pageTitle = tab.title || "";
  $("page-url").value = state.pageUrl;

  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const meta = (name) =>
          document
            .querySelector(`meta[property="${name}"], meta[name="${name}"]`)
            ?.getAttribute("content") || "";
        const og = meta("og:image");
        const description = meta("og:description") || meta("description");
        const imgs = Array.from(document.images)
          .filter((i) => i.naturalWidth >= 200 && i.naturalHeight >= 200)
          .map((i) => i.currentSrc || i.src)
          .filter((u) => u && /^https?:/.test(u));
        // Prepend og:image if present
        if (og && !imgs.includes(og)) imgs.unshift(og);
        // De-dup
        const uniq = Array.from(new Set(imgs)).slice(0, 30);

        const sel = window.getSelection().toString();
        const text =
          sel ||
          document.body.innerText?.slice(0, 1500) ||
          "";

        return {
          images: uniq,
          description,
          text,
        };
      },
    });
    const r = result?.result || { images: [], text: "" };
    state.images = r.images;
    state.pageText = (r.description ? r.description + "\n\n" : "") + (r.text || "");
    renderImages();
  } catch (e) {
    setStatus("Could not read page (cannot run on chrome:// pages): " + e.message, "err");
  }
}

function renderImages() {
  const grid = $("images");
  grid.innerHTML = "";
  if (state.images.length === 0) {
    const d = document.createElement("div");
    d.className = "empty";
    d.textContent = "No images found on this page (min 200×200).";
    grid.appendChild(d);
    return;
  }
  for (const url of state.images) {
    const img = document.createElement("img");
    img.src = url;
    img.loading = "lazy";
    img.title = url;
    img.addEventListener("click", () => {
      if (state.selectedImages.has(url)) {
        state.selectedImages.delete(url);
        img.classList.remove("selected");
      } else {
        state.selectedImages.add(url);
        img.classList.add("selected");
      }
    });
    grid.appendChild(img);
  }
  // auto-select first image
  if (state.images.length > 0) {
    state.selectedImages.add(state.images[0]);
    grid.firstChild.classList.add("selected");
  }
}

async function populateAccounts() {
  try {
    const { accounts } = await api("/api/v1/accounts");
    const sel = $("account");
    sel.innerHTML = "";
    if (accounts.length === 0) {
      const o = document.createElement("option");
      o.textContent = "(no accounts connected)";
      o.value = "";
      sel.appendChild(o);
      return;
    }
    for (const a of accounts) {
      const o = document.createElement("option");
      o.value = a.id;
      o.textContent = "@" + a.handle;
      sel.appendChild(o);
    }
    if (state.defaultAccountId) sel.value = state.defaultAccountId;
  } catch (e) {
    setStatus("Failed to load accounts: " + e.message, "err");
  }
}

function defaultWhen() {
  const d = new Date(Date.now() + 60 * 60_000);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

async function generateCaption() {
  if (state.selectedImages.size === 0 && !state.pageText) {
    setStatus("Select an image or open a page with text first.", "err");
    return;
  }
  setStatus("Generating caption…", "info");
  $("ai-caption").disabled = true;
  try {
    const firstImage = Array.from(state.selectedImages)[0];
    const { caption } = await api("/api/v1/caption", {
      method: "POST",
      body: JSON.stringify({
        imageUrl: firstImage,
        pageTitle: state.pageTitle,
        pageUrl: state.pageUrl,
        pageText: state.pageText.slice(0, 3000),
        hint: $("caption").value || undefined,
        locale: state.locale,
      }),
    });
    $("caption").value = caption;
    setStatus("Caption generated.", "ok");
  } catch (e) {
    setStatus("AI caption failed: " + e.message, "err");
  } finally {
    $("ai-caption").disabled = false;
  }
}

async function saveDraft() {
  const accountId = $("account").value;
  const kind = $("kind").value;
  const caption = $("caption").value.trim();
  const when = $("when").value;
  const asDraft = $("as-draft").checked;
  const media = Array.from(state.selectedImages).map((url) => ({ url }));

  if (!accountId) return setStatus("Pick an account first.", "err");
  if (media.length === 0) return setStatus("Select at least one image.", "err");

  $("save").disabled = true;
  setStatus("Saving…", "info");
  try {
    const body = {
      accountId,
      kind,
      caption: caption || undefined,
      media,
      asDraft,
    };
    if (when) body.scheduledFor = new Date(when).toISOString();
    const r = await api("/api/v1/drafts", {
      method: "POST",
      body: JSON.stringify(body),
    });
    setStatus(`✓ Saved (id ${r.id.slice(0, 8)}…). Open the app to review.`, "ok");
    // remember last-used account
    await chrome.storage.sync.set({ defaultAccountId: accountId });
  } catch (e) {
    setStatus("Save failed: " + e.message, "err");
  } finally {
    $("save").disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  $("open-options").addEventListener("click", (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
  $("open-options-2")?.addEventListener("click", () => chrome.runtime.openOptionsPage());

  const ok = await loadConfig();
  if (!ok) {
    $("not-configured").classList.remove("hidden");
    return;
  }
  $("main").classList.remove("hidden");
  $("when").value = defaultWhen();

  await Promise.all([populateAccounts(), extractPageContent()]);

  $("ai-caption").addEventListener("click", generateCaption);
  $("save").addEventListener("click", saveDraft);
});
