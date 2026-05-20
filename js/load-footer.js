/**
 * Load footer.html with fetch; fallback to embedded HTML when opening files directly (file://).
 */
(function () {
  var root = document.getElementById("footer-root");
  if (!root) return;

  function getLoaderBase() {
    var script =
      document.currentScript ||
      document.querySelector('script[src*="load-footer.js"]');
    if (!script || !script.src) return null;
    try {
      return new URL("./", script.src).href;
    } catch (e) {
      return null;
    }
  }

  /** Prefix so /images and /page.html work from current page depth */
  function getSitePathPrefix() {
    var loaderBase = getLoaderBase();
    if (!loaderBase) {
      return location.protocol === "file:" ? "" : "/";
    }
    try {
      // loaderBase points to /js/, so site root is one level up.
      var siteRoot = new URL("../", loaderBase).href;
      var pageDir = new URL(".", location.href).href;
      if (pageDir === siteRoot) {
        return location.protocol === "file:" ? "" : "/";
      }
      var rootParts = new URL(siteRoot).pathname.split("/").filter(Boolean);
      var pageParts = new URL(pageDir).pathname.split("/").filter(Boolean);
      var depth = pageParts.length - rootParts.length;
      if (depth <= 0) {
        return location.protocol === "file:" ? "" : "/";
      }
      return "../".repeat(depth);
    } catch (e) {
      return location.protocol === "file:" ? "" : "/";
    }
  }

  function normalizeFooterPaths(html) {
    var prefix = getSitePathPrefix();
    if (prefix === "/") return html;
    if (prefix === "") {
      return html.replace(/href="\//g, 'href="').replace(/src="\//g, 'src="');
    }
    return html
      .replace(/href="\//g, 'href="' + prefix)
      .replace(/src="\//g, 'src="' + prefix);
  }

  function mountFooter(html) {
    root.innerHTML = normalizeFooterPaths(html);
    var year = root.querySelector("#currentYear");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function loadEmbedded() {
    if (window.ACESOFT_FOOTER_HTML) {
      mountFooter(window.ACESOFT_FOOTER_HTML);
      return true;
    }
    return false;
  }

  function tryXHR(url) {
    return new Promise(function (resolve, reject) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.responseText);
          } else {
            reject(new Error("xhr status " + xhr.status));
          }
        };
        xhr.onerror = reject;
        xhr.send();
      } catch (e) {
        reject(e);
      }
    });
  }

  var footerUrl = "footer.html";
  var base = getLoaderBase();
  if (base) {
    try {
      footerUrl = new URL("footer.html", base).href;
    } catch (e) {
      footerUrl = "footer.html";
    }
  }

  function onFail() {
    if (!loadEmbedded()) {
      root.innerHTML =
        '<footer class="main-footer"><div class="footer-inner" style="padding:24px;text-align:center;color:#ccc;">Footer could not be loaded. Open this site via a local server (e.g. <code>npx serve</code>) or check footer.html.</div></footer>';
    }
  }

  if (location.protocol === "file:") {
    tryXHR(footerUrl)
      .then(mountFooter)
      .catch(function () {
        loadEmbedded() || onFail();
      });
    return;
  }

  fetch(footerUrl)
    .then(function (res) {
      if (!res.ok) throw new Error("fetch failed");
      return res.text();
    })
    .then(mountFooter)
    .catch(function () {
      tryXHR(footerUrl)
        .then(mountFooter)
        .catch(function () {
          loadEmbedded() || onFail();
        });
    });
})();
