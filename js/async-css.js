/** Apply async stylesheet links (media=print onload pattern). */
(function () {
  document.querySelectorAll('link[rel="stylesheet"][data-async]').forEach(function (link) {
    link.media = "all";
  });
})();
