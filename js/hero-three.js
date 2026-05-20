(function () {
  "use strict";

  function initHeroThree() {
    var hero = document.getElementById("acesoftHero");
    var canvas = document.getElementById("hero3d-canvas");
    var phoneShell = document.getElementById("heroPhoneShell");
    if (!hero || !canvas || !window.THREE) return;

    var isReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isMobile = window.innerWidth < 768;
    var pointCount = isMobile ? 900 : 1800;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(hero.clientWidth, hero.clientHeight);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, hero.clientWidth / hero.clientHeight, 0.1, 1000);
    camera.position.z = 44;

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(pointCount * 3);
    var scales = new Float32Array(pointCount);
    var spread = 62;

    for (var i = 0; i < pointCount; i++) {
      var i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * 18;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    var material = new THREE.PointsMaterial({
      color: 0x7fb2ff,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    var points = new THREE.Points(geometry, material);
    scene.add(points);

    var clock = new THREE.Clock();
    var mouseX = 0;
    var mouseY = 0;
    var rafId = null;

    function animate() {
      var elapsed = clock.getElapsedTime();
      var positionArray = geometry.attributes.position.array;

      for (var p = 0; p < pointCount; p++) {
        var p3 = p * 3;
        var baseX = positionArray[p3];
        positionArray[p3 + 1] += Math.sin(elapsed * 0.8 + baseX * 0.12) * 0.003;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsed * 0.04;
      points.rotation.x = Math.sin(elapsed * 0.25) * 0.08;

      camera.position.x += (mouseX * 6 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    function onMouseMove(e) {
      var rect = hero.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      if (phoneShell && !isReducedMotion) {
        phoneShell.style.setProperty("--rx", (-mouseY * 8).toFixed(2) + "deg");
        phoneShell.style.setProperty("--ry", (mouseX * 10 - 8).toFixed(2) + "deg");
      }
    }

    function onResize() {
      camera.aspect = hero.clientWidth / hero.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(hero.clientWidth, hero.clientHeight);
    }

    hero.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    if (!isReducedMotion) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

    window.addEventListener("beforeunload", function () {
      if (rafId) cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    });
  }

  if (window.whenThreeReady) {
    window.whenThreeReady(initHeroThree);
  }
})();
