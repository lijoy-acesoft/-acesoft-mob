/**
 * Initialize header after async include load (SEO sub-pages).
 * Copies nav into sticky/mobile menus and wires scroll + mobile toggles.
 */
(function (global) {
  "use strict";

  function headerStyle() {
    var $ = global.jQuery;
    if (!$ || !$(".main-header").length) return;

    var windowpos = $(global).scrollTop();
    var siteHeader = $(".header-style-one");
    var stickyHeader = $(".main-header .sticky-header");
    var scrollLink = $(".scroll-to-top");

    if (windowpos > 100) {
      stickyHeader.addClass("fixed-header animated slideInDown");
      if (scrollLink.length) scrollLink.fadeIn(300);
    } else {
      stickyHeader.removeClass("fixed-header animated slideInDown");
      if (scrollLink.length) scrollLink.fadeOut(300);
    }

    if (windowpos > 1) {
      siteHeader.addClass("fixed-header");
    } else {
      siteHeader.removeClass("fixed-header");
    }
  }

  function initSeoHeader() {
    var $ = global.jQuery;
    if (!$ || !$(".main-header").length) return;

    var mobileMenuContent = $(".main-header .main-menu .navigation").first().html();
    if (mobileMenuContent) {
      $(".mobile-menu .navigation").each(function () {
        var $nav = $(this);
        if (!$nav.children().length) $nav.html(mobileMenuContent);
      });
      $(".sticky-header .navigation").each(function () {
        var $nav = $(this);
        if (!$nav.children().length) $nav.html(mobileMenuContent);
      });
    }

    if ($(".main-header li.dropdown ul").length) {
      $(".main-header .navigation li.dropdown").each(function () {
        var $li = $(this);
        if (!$li.children(".dropdown-btn").length) {
          $li.append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
        }
      });
    }

    $(document)
      .off("click.seoHeader", ".mobile-nav-toggler")
      .on("click.seoHeader", ".mobile-nav-toggler", function () {
        $("body").addClass("mobile-menu-visible");
      });

    $(document)
      .off("click.seoHeader", ".mobile-menu .menu-backdrop, .mobile-menu .close-btn")
      .on("click.seoHeader", ".mobile-menu .menu-backdrop, .mobile-menu .close-btn", function () {
        $("body").removeClass("mobile-menu-visible");
      });

    $(document)
      .off("click.seoHeader", ".mobile-menu li.dropdown .dropdown-btn")
      .on("click.seoHeader", ".mobile-menu li.dropdown .dropdown-btn", function () {
        $(this).prev("ul").slideToggle(500);
        $(this).toggleClass("active");
      });

    headerStyle();
    $(global).off("scroll.seoHeader").on("scroll.seoHeader", headerStyle);

    if (global.initNavDropdown) global.initNavDropdown();
  }

  global.initSeoHeader = initSeoHeader;
  global.seoHeaderStyle = headerStyle;
})(window);
