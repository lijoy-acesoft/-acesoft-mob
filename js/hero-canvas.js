/**
 * Hero particle background (Canvas 2D — no Three.js).
 */
(function () {
  "use strict";

  function init() {
    var hero = document.getElementById("acesoftHero");
    var canvas = document.getElementById("hero3d-canvas");
    var phoneShell = document.getElementById("heroPhoneShell");
    if (!hero || !canvas) return;

    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var count = window.innerWidth < 768 ? 70 : 140;
    var rafId = null;
    var mouseX = 0;
    var mouseY = 0;
    var heroWidth = 0;
    var heroHeight = 0;
    var heroRect = null;

    function resize() {
      heroWidth = hero.clientWidth;
      heroHeight = hero.clientHeight;
      heroRect = hero.getBoundingClientRect();
      canvas.width = heroWidth * dpr;
      canvas.height = heroHeight * dpr;
      canvas.style.width = heroWidth + "px";
      canvas.style.height = heroHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles.length = 0;
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * heroWidth,
          y: Math.random() * heroHeight,
          r: Math.random() * 1.8 + 0.4,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.15,
          a: Math.random() * 0.45 + 0.25,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, heroWidth, heroHeight);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (!reduced) {
          p.x += p.vx + mouseX * 0.08;
          p.y += p.vy + mouseY * 0.05;
          if (p.x < 0) p.x = heroWidth;
          if (p.x > heroWidth) p.x = 0;
          if (p.y < 0) p.y = heroHeight;
          if (p.y > heroHeight) p.y = 0;
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(127, 178, 255, " + p.a + ")";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    function onMove(e) {
      if (!heroRect || !heroRect.width || !heroRect.height) return;
      mouseX = ((e.clientX - heroRect.left) / heroRect.width) * 2 - 1;
      mouseY = ((e.clientY - heroRect.top) / heroRect.height) * 2 - 1;
      if (phoneShell && !reduced) {
        phoneShell.style.setProperty("--rx", (-mouseY * 8).toFixed(2) + "deg");
        phoneShell.style.setProperty("--ry", (mouseX * 10 - 8).toFixed(2) + "deg");
      }
    }

    resize();
    seed();
    draw();
    hero.addEventListener("mousemove", onMove, { passive: true });
    if ("ResizeObserver" in window) {
      var resizeObserver = new ResizeObserver(function () {
        resize();
        seed();
      });
      resizeObserver.observe(hero);
    } else {
      window.addEventListener("resize", function () {
        resize();
        seed();
      });
    }
    window.addEventListener("scroll", resize, { passive: true });

    window.addEventListener("beforeunload", function () {
      if (rafId) cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove", onMove);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
