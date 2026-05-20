/**
 * Homepage UI — no jQuery / Bootstrap JS (Lighthouse unused JS).
 */
(function () {
  "use strict";

  var DESKTOP_MIN = 1024;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function isDesktop() {
    return window.matchMedia("(min-width: " + DESKTOP_MIN + "px)").matches;
  }

  function copyMainNav() {
    var source = document.querySelector(".main-header .container-fluid .main-menu .navigation");
    if (!source) return;
    var html = source.innerHTML;
    document.querySelectorAll(".mobile-menu .navigation, .sticky-header .navigation").forEach(function (nav) {
      if (!nav.children.length) nav.innerHTML = html;
    });
  }

  function initMobileMenu() {
    var togglers = document.querySelectorAll(".mobile-nav-toggler");
    var menu = document.querySelector(".mobile-menu");
    if (!menu) return;

    function closeMenu() {
      document.body.classList.remove("mobile-menu-visible");
    }

    function openMenu() {
      document.body.classList.add("mobile-menu-visible");
    }

    togglers.forEach(function (btn) {
      btn.addEventListener("click", openMenu);
    });

    menu.querySelectorAll(".close-btn, .menu-backdrop").forEach(function (el) {
      el.addEventListener("click", closeMenu);
    });

    menu.querySelectorAll("li.dropdown").forEach(function (li) {
      var sub = li.querySelector(":scope > ul");
      if (!sub) return;
      var toggle = li.querySelector(".dropdown-btn");
      if (!toggle) {
        toggle = document.createElement("div");
        toggle.className = "dropdown-btn";
        toggle.innerHTML = '<i class="fa fa-angle-down"></i>';
        li.appendChild(toggle);
      }
      toggle.addEventListener("click", function () {
        var open = sub.style.display === "block";
        sub.style.display = open ? "" : "block";
        toggle.classList.toggle("active", !open);
      });
    });
  }

  function initStickyHeader() {
    var sticky = document.querySelector(".main-header .sticky-header");
    var siteHeader = document.querySelector(".main-header.header-style-one");
    var scrollTop = document.querySelector(".scroll-to-top");
    if (!sticky) return;

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (y > 100) {
        sticky.classList.add("fixed-header", "animated", "slideInDown");
        if (scrollTop) scrollTop.style.display = "";
      } else {
        sticky.classList.remove("fixed-header", "animated", "slideInDown");
        if (scrollTop) scrollTop.style.display = "none";
      }
      if (siteHeader) {
        siteHeader.classList.toggle("fixed-header", y > 1);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initScrollTop() {
    var link = document.querySelector(".scroll-to-top");
    if (!link) return;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    link.style.display = "none";
  }

  function initDesktopDropdowns() {
    var items = document.querySelectorAll(
      ".main-header .container-fluid .main-menu .navigation > li.dropdown, " +
        ".sticky-header.fixed-header .main-menu .navigation > li.dropdown"
    );

    function closeAll() {
      items.forEach(function (li) {
        li.classList.remove("is-open");
      });
    }

    items.forEach(function (li) {
      var link = li.querySelector(":scope > a");
      var sub = li.querySelector(":scope > ul");
      if (!link || !sub) return;

      link.addEventListener("click", function (e) {
        if (!isDesktop()) return;
        e.preventDefault();
        e.stopPropagation();
        var wasOpen = li.classList.contains("is-open");
        closeAll();
        if (!wasOpen) li.classList.add("is-open");
      });

      sub.querySelectorAll(":scope > li > a").forEach(function (a) {
        a.addEventListener("click", function (e) {
          if (!isDesktop()) return;
          e.stopPropagation();
          var href = a.getAttribute("href");
          closeAll();
          if (href && href !== "#" && href.indexOf("javascript:") !== 0) {
            window.location.assign(href);
          }
        });
      });
    });

    document.addEventListener("click", function (e) {
      if (!isDesktop()) return;
      if (e.target.closest(".main-header .navigation > li.dropdown, .sticky-header .navigation > li.dropdown")) {
        return;
      }
      closeAll();
    });
  }

  function initWowFallback() {
    document.querySelectorAll(".wow").forEach(function (el) {
      el.classList.add("animated");
      el.style.visibility = "visible";
    });
  }

  ready(function () {
    copyMainNav();
    initMobileMenu();
    initStickyHeader();
    initScrollTop();
    initDesktopDropdowns();
    initWowFallback();
  });
})();
