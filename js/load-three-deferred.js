/**
 * Load Three.js only when a canvas section is near the viewport.
 */
(function (global) {
  "use strict";

  var SRC = "js/three.min.js";
  var queue = [];
  var loading = false;
  var loaded = false;

  function drain() {
    loaded = true;
    var fns = queue.splice(0, queue.length);
    fns.forEach(function (fn) {
      try {
        fn();
      } catch (e) {
        console.warn("Three init failed", e);
      }
    });
  }

  function loadScript() {
    if (loaded || global.THREE) {
      drain();
      return;
    }
    if (loading) return;
    loading = true;
    var s = document.createElement("script");
    s.src = SRC;
    s.defer = true;
    s.onload = function () {
      loading = false;
      drain();
    };
    s.onerror = function () {
      loading = false;
      console.warn("Three.js failed to load");
    };
    document.head.appendChild(s);
  }

  global.whenThreeReady = function (fn) {
    if (typeof fn !== "function") return;
    if (loaded && global.THREE) {
      fn();
      return;
    }
    queue.push(fn);
    loadScript();
  };

  function watch() {
    var hero = document.getElementById("acesoftHero");
    var e3 = document.querySelector(".acesoft-e3-process-section");
    var nodes = [hero, e3].filter(Boolean);
    if (!nodes.length) return;

    if (!("IntersectionObserver" in global)) {
      loadScript();
      return;
    }

    var started = false;
    var io = new IntersectionObserver(
      function (entries) {
        if (started) return;
        if (entries.some(function (e) {
          return e.isIntersecting;
        })) {
          started = true;
          io.disconnect();
          loadScript();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.01 }
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });

    global.setTimeout(function () {
      if (!started && !loaded) {
        io.disconnect();
        loadScript();
      }
    }, 8000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watch);
  } else {
    watch();
  }
})(window);
