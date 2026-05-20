(function () {
  function animateCount(el, target, duration) {
    var start = 0;
    var step = target / (duration / 16);
    var timer = setInterval(function () {
      start = Math.min(start + step, target);
      el.textContent = Math.round(start);
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  var observed = false;
  var statsBar = document.querySelector(".as-stats-bar");
  if (statsBar && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !observed) {
        observed = true;
        animateCount(document.getElementById("stat-apps"), 300, 1400);
        animateCount(document.getElementById("stat-sat"), 98, 1200);
        animateCount(document.getElementById("stat-yrs"), 12, 1100);
      }
    }, { threshold: 0.3 });
    observer.observe(statsBar);
  }

  var filters = document.querySelectorAll(".as-filter");
  var cards = document.querySelectorAll(".as-card");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.dataset.filter;
      filters.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      cards.forEach(function (card) {
        var tags = (card.dataset.filter || "").split(" ");
        var show = f === "all" || tags.indexOf(f) !== -1;
        card.style.display = show ? "flex" : "none";
      });
    });
  });

  cards.forEach(function (card) {
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var link = card.querySelector(".as-card-link");
        if (link) link.click();
      }
    });
  });
})();
