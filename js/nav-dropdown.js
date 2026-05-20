/**
 * Desktop nav dropdowns: click to open, stay open until click outside.
 * Main header uses .container-fluid nav (not the hidden sticky copy inside main-header).
 */
(function (global) {
  "use strict";

  var DESKTOP_MIN = 1024;
  var MAIN_DROPDOWN =
    ".main-header .container-fluid .main-menu .navigation > li.dropdown";
  var STICKY_DROPDOWN =
    ".sticky-header.fixed-header .main-menu .navigation > li.dropdown";

  function isDesktopNav() {
    return global.matchMedia("(min-width: " + DESKTOP_MIN + "px)").matches;
  }

  function getDropdowns($) {
    return $(MAIN_DROPDOWN).add($(STICKY_DROPDOWN));
  }

  function closeAll($) {
    getDropdowns($).removeClass("is-open");
  }

  function bindDropdown($, $li) {
    var $toggle = $li.children("a").first();
    var $submenu = $li.children("ul").first();

    $toggle.off("click.navDropdown").on("click.navDropdown", function (e) {
      if (!isDesktopNav()) return;
      e.preventDefault();
      e.stopImmediatePropagation();

      var wasOpen = $li.hasClass("is-open");
      closeAll($);
      if (!wasOpen) {
        $li.addClass("is-open");
      }
    });

    $submenu.find("> li > a").off("click.navDropdown").on("click.navDropdown", function (e) {
      if (!isDesktopNav()) return;
      e.stopImmediatePropagation();
      var href = this.getAttribute("href");
      closeAll($);
      if (href && href !== "#" && href.indexOf("javascript:") !== 0) {
        global.location.assign(href);
      }
    });
  }

  function initNavDropdown() {
    var $ = global.jQuery;
    if (!$) return;

    getDropdowns($).each(function () {
      bindDropdown($, $(this));
    });

    $(document)
      .off("click.navDropdownOutside")
      .on("click.navDropdownOutside", function (e) {
        if (!isDesktopNav()) return;
        if ($(e.target).closest(MAIN_DROPDOWN + ", " + STICKY_DROPDOWN).length) {
          return;
        }
        closeAll($);
      });
  }

  global.initNavDropdown = initNavDropdown;
})(window);
