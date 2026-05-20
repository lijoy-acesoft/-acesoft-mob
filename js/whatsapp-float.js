/**
 * Floating WhatsApp widget — Canada number, above scroll-to-top.
 */
(function () {
  if (document.getElementById("acesoftWaWidget")) return;

  var WA_PHONE = "15198081000";
  var WA_TEXT =
    "Hey need to know more about acesoft mobile development";
  var WA_URL =
    "https://wa.me/" +
    WA_PHONE +
    "?text=" +
    encodeURIComponent(WA_TEXT);

  var PROMPT_MESSAGES = [
    "Hey, need to know more about Acesoft mobile development?",
    "Looking for iOS or Android app development?",
    "Chat with our team in London, Ontario.",
  ];

  var WA_SVG =
    '<svg class="acesoft-wa-icon-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
    "</svg>";

  var MSG_SVG =
    '<svg class="acesoft-wa-msg-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>' +
    "</svg>";

  var scriptEl = document.currentScript;
  var cssHref = "css/whatsapp-float.css";
  if (scriptEl && scriptEl.src) {
    var base = scriptEl.src.replace(/\/js\/whatsapp-float\.js.*$/i, "/");
    cssHref = base + "css/whatsapp-float.css";
  }

  if (!document.querySelector('link[href*="whatsapp-float.css"]')) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssHref;
    document.head.appendChild(link);
  }

  var widget = document.createElement("div");
  widget.className = "acesoft-wa-widget";
  widget.id = "acesoftWaWidget";
  widget.innerHTML =
    '<button type="button" class="acesoft-wa-prompt-close" id="acesoftWaClose" aria-label="Close chat suggestion">' +
    '<span aria-hidden="true">&times;</span></button>' +
    '<a href="' +
    WA_URL +
    '" class="acesoft-wa-prompt" id="acesoftWaPrompt" target="_blank" rel="noopener noreferrer">' +
    PROMPT_MESSAGES[0] +
    "</a>" +
    '<a href="' +
    WA_URL +
    '" class="acesoft-wa-button" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp about mobile app development">' +
    '<span class="acesoft-wa-msg-stack" aria-hidden="true">' +
    MSG_SVG +
    MSG_SVG +
    "</span>" +
    WA_SVG +
    "</a>";

  document.body.appendChild(widget);

  if (!document.querySelector(".scroll-to-top")) {
    widget.classList.add("no-scroll-top");
  }

  var promptHidden = false;
  var storageKey = "acesoftMobileWaPromptHidden";
  try {
    promptHidden = window.localStorage.getItem(storageKey) === "1";
  } catch (e) {
    promptHidden = false;
  }
  if (promptHidden) {
    widget.classList.add("is-prompt-hidden");
  }

  var closeBtn = document.getElementById("acesoftWaClose");
  var promptEl = document.getElementById("acesoftWaPrompt");
  var messageTimer = null;

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      widget.classList.add("is-prompt-hidden");
      if (messageTimer) window.clearInterval(messageTimer);
      try {
        window.localStorage.setItem(storageKey, "1");
      } catch (err) {
        /* ignore */
      }
    });
  }

  if (promptEl && !promptHidden && PROMPT_MESSAGES.length > 1) {
    var idx = 0;
    messageTimer = window.setInterval(function () {
      idx = (idx + 1) % PROMPT_MESSAGES.length;
      promptEl.classList.add("is-fade");
      window.setTimeout(function () {
        promptEl.textContent = PROMPT_MESSAGES[idx];
        promptEl.classList.remove("is-fade");
      }, 220);
    }, 5000);
  }

  function toggleVisibility() {
    var show = window.scrollY > 120;
    widget.classList.toggle("is-visible", show);
  }

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();
})();
