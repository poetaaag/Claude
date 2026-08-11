(function () {
  "use strict";

  function isIosSafari() {
    var ua = window.navigator.userAgent || "";
    var platform = window.navigator.platform || "";
    var touchPoints = window.navigator.maxTouchPoints || 0;
    var isIOSDevice =
      /iP(ad|hone|od)/.test(ua) || (/Mac/.test(platform) && touchPoints > 1);
    var isWebKit = /WebKit/i.test(ua);
    var isExcluded = /CriOS|FxiOS|EdgiOS|OPiOS|YaBrowser|DuckDuckGo/i.test(ua);
    return isIOSDevice && isWebKit && !isExcluded;
  }

  if (!isIosSafari()) return;

  var IOS_NAV_PARAM = "__iosnav";
  var IOS_RELOAD_PARAM = "__iosreload";
  var RELOAD_GUARD_KEY = "giulia-ios-reload-v170";

  function buildStampedUrl(rawHref, paramName) {
    try {
      var url = new URL(rawHref, window.location.href);
      if (url.origin !== window.location.origin) return null;
      url.searchParams.set(paramName, String(Date.now()));
      return url.toString();
    } catch (error) {
      return null;
    }
  }

  function isExternalLike(href) {
    return (
      !href ||
      href === "#" ||
      /^(?:[a-z]+:)?\/\//i.test(href) ||
      href.indexOf("mailto:") === 0 ||
      href.indexOf("tel:") === 0 ||
      href.indexOf("sms:") === 0 ||
      href.indexOf("javascript:") === 0 ||
      href.indexOf("data:") === 0
    );
  }

  function stripInternalSafariParams() {
    try {
      var url = new URL(window.location.href);
      var changed = false;
      if (url.searchParams.has(IOS_NAV_PARAM)) {
        url.searchParams.delete(IOS_NAV_PARAM);
        changed = true;
      }
      if (url.searchParams.has(IOS_RELOAD_PARAM)) {
        url.searchParams.delete(IOS_RELOAD_PARAM);
        changed = true;
      }
      if (!changed) return;
      var cleanHref = url.pathname + (url.search ? url.search : "") + url.hash;
      window.history.replaceState(null, "", cleanHref);
    } catch (error) {}
  }

  function resetTransientState() {
    try {
      document.body.classList.remove(
        "menu-open",
        "lightbox-open",
        "has-floating-cart",
      );
      var menu = document.getElementById("mobileMenu");
      var toggle = document.getElementById("mobileToggle");
      if (menu) menu.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      var lightbox = document.getElementById("lightbox");
      if (lightbox) {
        lightbox.hidden = true;
        lightbox.setAttribute("aria-hidden", "true");
      }
    } catch (error) {}
  }

  function getSafeSessionStorage() {
    try {
      return window.sessionStorage;
    } catch (error) {
      return null;
    }
  }

  function sessionGet(key) {
    var storage = getSafeSessionStorage();
    return storage ? storage.getItem(key) : null;
  }

  function sessionSet(key, value) {
    var storage = getSafeSessionStorage();
    if (storage) storage.setItem(key, value);
  }

  function sessionRemove(key) {
    var storage = getSafeSessionStorage();
    if (storage) storage.removeItem(key);
  }

  function forceRepaint() {
    try {
      var root = document.documentElement;
      root.style.webkitTransform = "translateZ(0)";
      root.style.opacity = "0.999";
      void root.offsetHeight;
      root.style.webkitTransform = "";
      root.style.opacity = "";
    } catch (error) {}
  }

  function hardReloadOnce() {
    try {
      var pageKey =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      var already = sessionGet(RELOAD_GUARD_KEY) || "";
      if (already === pageKey) {
        sessionRemove(RELOAD_GUARD_KEY);
        return;
      }
      sessionSet(RELOAD_GUARD_KEY, pageKey);
    } catch (error) {}
    var stamped = buildStampedUrl(window.location.href, IOS_RELOAD_PARAM);
    window.location.replace(stamped || window.location.href);
  }

  function onDocumentClick(event) {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;

    var node = event.target;
    while (node && node.nodeType === 1 && node.tagName !== "A")
      node = node.parentElement;
    if (!node || node.tagName !== "A") return;
    if (node.target && node.target !== "_self") return;
    if (node.hasAttribute("download")) return;

    var href = node.getAttribute("href") || "";
    if (isExternalLike(href)) return;

    var resolved;
    try {
      resolved = new URL(href, window.location.href);
    } catch (error) {
      return;
    }

    if (resolved.origin !== window.location.origin) return;

    var current = new URL(window.location.href);
    var sameDocument =
      resolved.pathname === current.pathname &&
      resolved.search === current.search &&
      !!resolved.hash;
    if (sameDocument) return;

    event.preventDefault();
    resetTransientState();
    forceRepaint();
    var stampedHref = buildStampedUrl(resolved.toString(), IOS_NAV_PARAM);
    window.location.assign(stampedHref || resolved.toString());
  }

  window.addEventListener("unload", function () {});

  document.addEventListener("click", onDocumentClick, true);

  window.addEventListener(
    "pagehide",
    function () {
      resetTransientState();
    },
    { passive: true },
  );

  window.addEventListener("pageshow", function (event) {
    resetTransientState();
    forceRepaint();
    if (event && event.persisted) {
      hardReloadOnce();
    }
  });

  window.addEventListener("load", function () {
    stripInternalSafariParams();
    resetTransientState();
    forceRepaint();
  });
})();
