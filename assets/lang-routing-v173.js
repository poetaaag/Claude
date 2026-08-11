(function () {
  const STORAGE_KEY = "giulia-site-lang";
  const PARAM_KEY = "lang";
  const SUPPORTED = new Set(["fr", "it", "en"]);
  const BOT_PATTERN = /(googlebot|bingbot|duckduckbot|baiduspider|yandex|slurp|applebot|facebookexternalhit|twitterbot|linkedinbot|oai-searchbot|chatgpt-user|perplexitybot|claudebot|bytespider|semrushbot|ahrefsbot)/i;

  function getSafeStorage() {
    try {
      const storage = window.localStorage;
      const probeKey = "__giulia_lang_probe__";
      storage.setItem(probeKey, "1");
      storage.removeItem(probeKey);
      return storage;
    } catch {
      return null;
    }
  }

  function normalizeLanguage(value) {
    const lang = String(value || "").trim().toLowerCase();
    return SUPPORTED.has(lang) ? lang : "";
  }

  function getStoredLanguage() {
    const storage = getSafeStorage();
    if (!storage) return "";
    return normalizeLanguage(storage.getItem(STORAGE_KEY) || "");
  }

  function setStoredLanguage(lang) {
    const normalized = normalizeLanguage(lang);
    if (!normalized) return;
    const storage = getSafeStorage();
    if (!storage) return;
    storage.setItem(STORAGE_KEY, normalized);
  }

  function getLanguageFromQuery() {
    try {
      const params = new URLSearchParams(window.location.search || "");
      return normalizeLanguage(params.get(PARAM_KEY) || "");
    } catch {
      return "";
    }
  }

  function isFrenchPath(pathname) {
    const path = String(pathname || "").replace(/\\/g, "/");
    return path === "/fr" || path.startsWith("/fr/") || /(?:^|\/)fr(?:\/|$)/.test(path);
  }

  function isEnglishPath(pathname) {
    const path = String(pathname || "").replace(/\\/g, "/");
    return path === "/en" || path.startsWith("/en/") || /(?:^|\/)en(?:\/|$)/.test(path);
  }

  function isItalianEntryPath(pathname) {
    const path = String(pathname || "").replace(/\\/g, "/");
    if (isFrenchPath(path) || isEnglishPath(path)) return false;
    return path === "" || path === "/" || path === "/index.html" || /(?:^|\/)index\.html$/.test(path);
  }

  function detectBrowserLanguage() {
    const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || ""];
    for (const rawLanguage of browserLanguages) {
      const language = String(rawLanguage || "").trim().toLowerCase();
      if (language.startsWith("fr")) return "fr";
      if (language.startsWith("it")) return "it";
      if (language.startsWith("en")) return "en";
    }
    return "en";
  }

  function getPreferredLanguage() {
    return getLanguageFromQuery() || getStoredLanguage() || detectBrowserLanguage();
  }

  function currentPathLanguage(pathname) {
    if (isFrenchPath(pathname)) return "fr";
    if (isEnglishPath(pathname)) return "en";
    return "it";
  }

  function isBotUserAgent() {
    return BOT_PATTERN.test(navigator.userAgent || "");
  }

  function persistCurrentLanguage() {
    const forced = getLanguageFromQuery();
    if (forced) {
      setStoredLanguage(forced);
      return forced;
    }
    const current = currentPathLanguage(window.location.pathname || "/");
    setStoredLanguage(current);
    return current;
  }

  function redirectEntryByLanguageIfNeeded() {
    const pathname = String(window.location.pathname || "/");
    if (!isItalianEntryPath(pathname)) return;
    if (isBotUserAgent()) return;

    const targetLanguage = getPreferredLanguage();
    const currentUrl = new URL(window.location.href);
    let targetPath = "";
    if (targetLanguage === "fr") targetPath = "fr/index.html";
    else if (targetLanguage === "en") targetPath = "en/index.html";
    else return;
    const targetUrl = new URL(targetPath, currentUrl);
    targetUrl.search = currentUrl.search;
    targetUrl.hash = currentUrl.hash;

    if (targetUrl.href !== currentUrl.href) {
      window.location.replace(targetUrl.href);
    }
  }

  function bindLanguageSwitches() {
    const languageLinks = document.querySelectorAll("[data-lang]");
    if (!languageLinks.length) return;

    languageLinks.forEach((link) => {
      link.addEventListener(
        "click",
        () => {
          const lang = normalizeLanguage(link.getAttribute("data-lang") || "");
          setStoredLanguage(lang);
        },
        { passive: true },
      );
    });
  }

  redirectEntryByLanguageIfNeeded();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      persistCurrentLanguage();
      bindLanguageSwitches();
    }, { once: true });
  } else {
    persistCurrentLanguage();
    bindLanguageSwitches();
  }

  window.GIULIA_LANG_ROUTER = {
    getPreferredLanguage,
    setStoredLanguage,
  };
})();
