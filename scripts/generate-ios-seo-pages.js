const fs = require("fs");
const path = require("path");

const BASE = "https://mobileappdevelopment.ca";
const OUT_DIR = path.join(__dirname, "..", "ios-app-development");
const INCLUDES_DIR = path.join(__dirname, "..", "includes");

const { SERVICES, PAGE_META } = require("./ios-seo-data");

function pageMeta(p) {
  return PAGE_META[p.file] || {
    eyebrow: `${p.cardTitle} | Acesoft | Canada`,
    heroH1: p.h1.replace(/(\w+)$/, "<em>$1</em>"),
    overviewLabel: "iOS development services",
    overviewH2: p.h1,
    answerBold: "Why choose Acesoft?",
    focus: p.intro,
    tags: ["iOS", "Swift", "Canada", "App Store"],
    caps: [
      ["01", "Plan", "Scope, milestones, and stack."],
      ["02", "Build", "Design, develop, and test."],
      ["03", "Launch", "Release and ongoing support."],
    ],
  };
}

function escJson(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const SECTION_HEAD = `    <header class="ios-seo-section-head">
      <p class="ios-seo-overline"><span class="line" aria-hidden="true"></span> Specialized Services</p>
      <h2 class="ios-seo-section-title">Explore Our iOS Development Services</h2>
      <p class="ios-seo-section-desc">Each iOS service has a dedicated page with scope, deliverables, and how Acesoft can help your team in Canada and beyond.</p>
    </header>`;

function buildGridHtml(currentFile, baseHref) {
  baseHref = baseHref || "";
  return SERVICES.map((s) => {
    const href = baseHref + s.file;
    const isCurrent = currentFile === s.file;
    return `          <a href="${href}" class="ios-seo-card${isCurrent ? " is-current" : ""}"${isCurrent ? ' aria-current="page"' : ""}>
            <span class="ios-seo-card-icon"><i class="${s.icon}"></i></span>
            <h3>${s.cardTitle}</h3>
            <p class="desc">${s.description}</p>
            <span class="view-link">View service</span>
          </a>`;
  }).join("\n");
}

function buildSiloHtml(currentFile) {
  const links = [
    `<a href="../ios-app-development.html">All iOS development services</a>`,
    `<a href="index.html">Browse service hub</a>`,
  ];
  SERVICES.filter((s) => s.file !== currentFile)
    .slice(0, 4)
    .forEach((s) => {
      links.push(`<a href="${s.file}">${s.cardTitle}</a>`);
    });
  return links.join("\n            ");
}

function sharedScripts(base) {
  return `  <script src="${base}js/jquery.js"></script>
  <script src="${base}js/popper.min.js"></script>
  <script src="${base}js/bootstrap.min.js"></script>
  <script src="${base}js/nav-dropdown.js"></script>
  <script src="${base}js/script.js"></script>
  <script src="${base}js/seo-header-init.js"></script>
  <script src="${base}js/footer-embed.js"></script>
  <script src="${base}js/load-footer.js"></script>
  <script src="${base}js/whatsapp-float.js"></script>
  <script>
    fetch("${base}includes/seo-header-ios.html")
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var root = document.getElementById("header-root");
        if (!root) return;
        root.innerHTML = html;
        if (window.initSeoHeader) window.initSeoHeader();
      })
      .catch(function () {});
    (function () {
      var hero = document.getElementById("serviceHero");
      var orbs = hero ? hero.querySelectorAll(".hero-orb") : [];
      var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (hero && !reduceMotion) {
        hero.addEventListener("mousemove", function (e) {
          var r = hero.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          orbs.forEach(function (orb, i) {
            var s = [22, 14, 10][i] || 12;
            orb.style.transform = "translate3d(" + x * s + "px," + y * s + "px,0)";
          });
        });
      }
      var items = document.querySelectorAll(".reveal");
      if (!reduceMotion && "IntersectionObserver" in window) {
        var obs = new IntersectionObserver(function (entries, ob) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { entry.target.classList.add("visible"); ob.unobserve(entry.target); }
          });
        }, { threshold: 0.12 });
        items.forEach(function (el) { obs.observe(el); });
      } else {
        items.forEach(function (el) { el.classList.add("visible"); });
      }
    })();
    window.addEventListener("load", function () {
      var preloader = document.getElementById("preloader");
      var container = document.getElementById("container-preloader");
      if (!preloader || !container) return;
      container.classList.add("loaded");
      window.setTimeout(function () { preloader.style.display = "none"; }, 1100);
    });
  </script>`;
}

function headBlock(p, url, base) {
  const serviceName = p.title.split("|")[0].trim();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <link href="${base}css/bootstrap.min.css" rel="stylesheet" />
  <link href="${base}css/style.css" rel="stylesheet" />
  <link href="${base}css/responsive.css" rel="stylesheet" />
  <link href="${base}css/footer-component.css" rel="stylesheet" />
  <link href="${base}css/seo-landing-shell.css" rel="stylesheet" />
  <link href="${base}css/header-top.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="shortcut icon" href="${base}images/logo-2.png" type="image/x-icon" />
  <link rel="icon" href="${base}images/logo-2.png" type="image/x-icon" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta charset="utf-8">
  <title>${p.title}</title>
  <meta name="description" content="${p.description}">
  <meta name="author" content="Acesoft Inc">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${p.title}">
  <meta property="og:description" content="${p.description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}/images/resource/ios1.png">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[
    {"@type":"Organization","@id":"${BASE}/#organization","name":"Acesoft Inc","url":"${BASE}/","telephone":"+1-519-808-1000"},
    {"@type":"Service","@id":"${url}#service","name":"${escJson(serviceName)}","description":"${escJson(p.description)}","url":"${url}","provider":{"@id":"${BASE}/#organization"}}
  ]}
  </script>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":"${escJson(p.faq1[0])}","acceptedAnswer":{"@type":"Answer","text":"${escJson(p.faq1[1])}"}},
    {"@type":"Question","name":"${escJson(p.faq2[0])}","acceptedAnswer":{"@type":"Answer","text":"${escJson(p.faq2[1])}"}}
  ]}
  </script>
</head>
<body class="service-shell">`;
}

function buildSubPage(p) {
  const url = `${BASE}/ios-app-development/${p.file}`;
  const m = pageMeta(p);
  const capCards = m.caps
    .map(
      (c, i) => `          <div class="cap-card reveal reveal-delay-${i + 1}">
            <span class="cap-card-num">${c[0]}</span>
            <h5>${c[1]}</h5>
            <p>${c[2]}</p>
          </div>`
    )
    .join("\n");
  const heroTags = m.tags.map((t) => `<span class="hero-tag">${t}</span>`).join("\n          ");

  return `${headBlock(p, url, "../")}
  <div id="preloader">
    <div id="container-preloader" class="container-preloader">
      <div class="animation-preloader"><div class="spinner"></div></div>
      <div class="loader-section section-left"></div>
      <div class="loader-section section-right"></div>
    </div>
  </div>

  <div class="page-wrapper">
    <div id="header-root"></div>

    <section class="service-hero seo-hero" id="serviceHero">
      <span class="hero-orb a"></span>
      <span class="hero-orb b"></span>
      <span class="hero-orb c"></span>
      <div class="hero-inner">
        <div class="hero-eyebrow">${m.eyebrow}</div>
        <h1>${m.heroH1}</h1>
        <p class="hero-lead">${p.intro}</p>
        <div class="hero-actions">
          <a href="../page-contact.html" class="btn-hero-primary">Request a quote</a>
          <a href="../page-contact.html" class="btn-hero-secondary">Book a discovery call</a>
        </div>
        <div class="hero-tags">
          ${heroTags}
        </div>
      </div>
    </section>

    <section class="service-main">
      <div class="content-container">
        <div class="overview-panel reveal">
          <div class="s-label">${m.overviewLabel}</div>
          <p class="answer-lead"><strong>${m.answerBold}</strong> ${p.answer}</p>
          <h2>${m.overviewH2}</h2>
          <ul class="tick-list">
            ${p.ticks.map((t) => `<li>${t}</li>`).join("\n            ")}
          </ul>
        </div>

        <div class="section-head reveal">
          <div class="s-label" style="justify-content:center">Project focus</div>
          <p>${m.focus}</p>
        </div>

        <div class="cap-grid seo-cap-grid">
${capCards}
        </div>

        <div class="faq-block reveal">
          <h3>Common questions</h3>
          <div class="faq-item"><h4>${p.faq1[0]}</h4><p>${p.faq1[1]}</p></div>
          <div class="faq-item"><h4>${p.faq2[0]}</h4><p>${p.faq2[1]}</p></div>
        </div>

        <div class="silo-strip reveal">
          <div class="silo-label">More iOS services</div>
          <div class="silo-links">
            ${buildSiloHtml(p.file)}
          </div>
        </div>

        <div class="cta-panel reveal">
          <div class="cta-text">
            <h4>${p.ctaH}</h4>
            <p>${p.ctaP}</p>
          </div>
          <div class="cta-btn-wrap">
            <a href="../page-contact.html" class="btn-cta">
              Get started
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <div id="footer-root"></div>
  </div>

${sharedScripts("../")}
</body>
</html>`;
}

function headBlockHub(p, url, base) {
  return headBlock(p, url, base)
    .replace(
      `<link href="${base}css/seo-landing-shell.css" rel="stylesheet" />`,
      `<link href="${base}css/flaticon.css" rel="stylesheet" />\n  <link href="${base}css/ios-seo-services-grid.css" rel="stylesheet" />\n  <link href="${base}css/seo-landing-shell.css" rel="stylesheet" />`
    )
    .replace('body class="service-shell">', 'body class="ios-seo-page">');
}

function buildHubPage() {
  const p = {
    title: "iOS App Development Services | Acesoft Canada",
    description:
      "iOS app development services: Swift, custom apps, enterprise, Toronto, Canada, UI/UX, maintenance, App Store, and startup MVPs.",
    h1: "iOS App Development Services",
    intro:
      "Explore our iOS development services—native Swift apps, hiring developers, enterprise delivery, and location-specific expertise across Canada.",
    faq1: ["", ""],
    faq2: ["", ""],
  };
  const url = `${BASE}/ios-app-development/`;
  const grid = buildGridHtml(null, "");

  return `${headBlockHub(p, url, "../")}
  <div id="preloader">
    <div id="container-preloader" class="container-preloader">
      <div class="animation-preloader"><div class="spinner"></div></div>
      <div class="loader-section section-left"></div>
      <div class="loader-section section-right"></div>
    </div>
  </div>
  <div class="page-wrapper">
    <div id="header-root"></div>

    <section class="ios-seo-page-head">
      <div class="wrap">
        <p class="ios-seo-breadcrumb">
          <a href="../index.html">Home</a> &nbsp;/&nbsp;
          <a href="../ios-app-development.html">iOS App Development</a> &nbsp;/&nbsp;
          <span>Services</span>
        </p>
        <h1>iOS <em>App Development</em> Services</h1>
        <p class="lead">${p.intro}</p>
      </div>
    </section>

    <section class="ios-seo-services" style="padding-top:0">
      <div class="wrap">
${SECTION_HEAD}
        <div class="ios-seo-grid">
${grid}
        </div>
      </div>
    </section>

    <div class="ios-seo-cta-bar">
      <div class="ios-seo-cta-inner">
        <div>
          <h3>Ready to build your iOS app?</h3>
          <p>Talk to our iOS specialists—we respond within one business day.</p>
        </div>
        <a href="../page-contact.html" class="ios-seo-cta-btn">Book a consultation</a>
      </div>
    </div>

    <div id="footer-root"></div>
  </div>
${sharedScripts("../")}
</body>
</html>`;
}

function buildGridFragment() {
  const grid = buildGridHtml(null, "ios-app-development/");
  return `<section class="ios-seo-services">
  <div class="wrap">
${SECTION_HEAD}
    <div class="ios-seo-grid">
${grid}
    </div>
  </div>
</section>`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(INCLUDES_DIR, { recursive: true });

SERVICES.forEach((p) => {
  let html = buildSubPage(p);
  html = html.replace(/<motion\b/g, "<div").replace(/<\/motion>/g, "</div>");
  fs.writeFileSync(path.join(OUT_DIR, p.file), html, "utf8");
  console.log("Wrote", p.file);
});

let hub = buildHubPage();
hub = hub.replace(/<motion\b/g, "<div").replace(/<\/motion>/g, "</div>");
fs.writeFileSync(path.join(OUT_DIR, "index.html"), hub, "utf8");
console.log("Wrote index.html");

fs.writeFileSync(path.join(INCLUDES_DIR, "ios-seo-services-grid.html"), buildGridFragment(), "utf8");
console.log("Wrote includes/ios-seo-services-grid.html");
console.log("Done:", SERVICES.length, "pages + hub");
