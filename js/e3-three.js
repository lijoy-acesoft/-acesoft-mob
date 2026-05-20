(function () {
  "use strict";

  function initE3Three() {
    var section = document.querySelector(".acesoft-e3-process-section");
    var canvas = document.getElementById("e3-process-canvas");
    if (!section || !canvas || !window.THREE) return;

    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(section.clientWidth, section.clientHeight);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(48, section.clientWidth / section.clientHeight, 0.1, 1000);
    camera.position.z = 26;

    var ringGroup = new THREE.Group();
    var ringConfigs = [
      { radius: 6.8, tube: 0.08, color: 0x6d92ff, opacity: 0.65, rotX: 1.1, rotY: 0.2 },
      { radius: 4.8, tube: 0.08, color: 0x8caeff, opacity: 0.55, rotX: 0.7, rotY: -0.3 },
      { radius: 8.8, tube: 0.08, color: 0xff7390, opacity: 0.35, rotX: 0.9, rotY: 0.5 },
    ];

    for (var i = 0; i < ringConfigs.length; i++) {
      var c = ringConfigs[i];
      var geo = new THREE.TorusGeometry(c.radius, c.tube, 24, 160);
      var mat = new THREE.MeshBasicMaterial({
        color: c.color,
        transparent: true,
        opacity: c.opacity,
        wireframe: true,
      });
      var ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = c.rotX;
      ring.rotation.y = c.rotY;
      ringGroup.add(ring);
    }
    scene.add(ringGroup);

    var pointCount = window.innerWidth < 768 ? 600 : 1200;
    var pGeo = new THREE.BufferGeometry();
    var pPos = new Float32Array(pointCount * 3);
    for (var p = 0; p < pointCount; p++) {
      var p3 = p * 3;
      pPos[p3] = (Math.random() - 0.5) * 44;
      pPos[p3 + 1] = (Math.random() - 0.5) * 18;
      pPos[p3 + 2] = (Math.random() - 0.5) * 20;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    var pMat = new THREE.PointsMaterial({
      color: 0x9ab7ff,
      size: 0.07,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    var points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    var clock = new THREE.Clock();
    var targetX = 0;
    var targetY = 0;
    var rafId = null;

    function animate() {
      var t = clock.getElapsedTime();
      ringGroup.rotation.y = t * 0.2 + targetX * 0.25;
      ringGroup.rotation.x = Math.sin(t * 0.45) * 0.08 + targetY * 0.12;
      points.rotation.y = -t * 0.08;
      points.rotation.x = Math.cos(t * 0.3) * 0.05;
      camera.position.x += (targetX * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (-targetY * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    function onMouseMove(e) {
      var rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }

    function onResize() {
      camera.aspect = section.clientWidth / section.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(section.clientWidth, section.clientHeight);
    }

    section.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    if (!prefersReducedMotion) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

    window.addEventListener("beforeunload", function () {
      if (rafId) cancelAnimationFrame(rafId);
      section.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      ringGroup.children.forEach(function (mesh) {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    });
  }

  if (window.whenThreeReady) {
    window.whenThreeReady(initE3Three);
  }
})();
