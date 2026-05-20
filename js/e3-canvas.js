/**
 * 3-Es section background (Canvas 2D — no Three.js).
 */
(function () {
  "use strict";

  function init() {
    var section = document.querySelector(".acesoft-e3-process-section");
    var canvas = document.getElementById("e3-process-canvas");
    if (!section || !canvas) return;

    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rafId = null;
    var t0 = performance.now();
    var targetX = 0;
    var targetY = 0;
    var rings = [
      { rx: 0.42, ry: 0.28, color: "rgba(109, 146, 255, 0.55)" },
      { rx: 0.3, ry: 0.2, color: "rgba(140, 174, 255, 0.45)" },
      { rx: 0.52, ry: 0.34, color: "rgba(255, 115, 144, 0.28)" },
    ];
    var dots = [];
    var dotCount = window.innerWidth < 768 ? 50 : 100;

    function resize() {
      var w = section.clientWidth;
      var h = section.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      dots.length = 0;
      for (var i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 1.2 + 0.3,
          a: Math.random() * 0.4 + 0.2,
        });
      }
    }

    function draw() {
      var w = section.clientWidth;
      var h = section.clientHeight;
      var cx = w * 0.5 + targetX * 24;
      var cy = h * 0.45 + targetY * 16;
      var elapsed = (performance.now() - t0) / 1000;

      ctx.clearRect(0, 0, w, h);

      for (var r = 0; r < rings.length; r++) {
        var ring = rings[r];
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(elapsed * (0.15 + r * 0.05) + targetX * 0.2);
        ctx.scale(1, 0.45);
        ctx.beginPath();
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.5;
        ctx.ellipse(0, 0, w * ring.rx, h * ring.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var px = d.x * w + Math.sin(elapsed + d.x * 10) * 4;
        var py = d.y * h + Math.cos(elapsed * 0.8 + d.y * 10) * 4;
        ctx.beginPath();
        ctx.fillStyle = "rgba(154, 183, 255, " + d.a + ")";
        ctx.arc(px, py, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) rafId = requestAnimationFrame(draw);
    }

    function onMove(e) {
      var rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }

    resize();
    seed();
    draw();
    section.addEventListener("mousemove", onMove);
    window.addEventListener("resize", function () {
      resize();
      seed();
    });

    window.addEventListener("beforeunload", function () {
      if (rafId) cancelAnimationFrame(rafId);
      section.removeEventListener("mousemove", onMove);
    });
  }

  function whenVisible(cb) {
    var section = document.querySelector(".acesoft-e3-process-section");
    if (!section || !("IntersectionObserver" in window)) {
      cb();
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          io.disconnect();
          cb();
        }
      },
      { rootMargin: "80px 0px", threshold: 0.01 }
    );
    io.observe(section);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      whenVisible(init);
    });
  } else {
    whenVisible(init);
  }
})();
