const fs = require("fs");
const path = require("path");

const BASE = "https://mobileappdevelopment.ca";
const ROOT = path.join(__dirname, "..");
const INCLUDES = path.join(ROOT, "includes");
const { CANADA_CITIES, USA_CITIES } = require("./regional-seo-data");

const D = "div";

function escJson(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildCityCard(c, regionFolder) {
  const href = `${regionFolder}/${c.file}`;
  const featured = c.featured
    ? `\n            <span class="android-seo-card-badge">Headquarters</span>`
    : "";
  return `          <a href="${href}" class="android-seo-card${c.featured ? " is-featured" : ""}">${featured}
            <span class="android-seo-card-icon"><i class="flaticon-web"></i></span>
            <h3>${c.cardTitle}</h3>
            <p class="desc">${c.description}</p>
            <span class="view-link">View city page</span>
          </a>`;
}

function gridFragment(cities, regionFolder, title, desc) {
  return `<section class="android-seo-services">
  <${D} class="wrap">
    <header class="android-seo-section-head">
      <p class="android-seo-overline"><span class="line" aria-hidden="true"></span> Cities We Serve</p>
      <h2 class="android-seo-section-title">${title}</h2>
      <p class="android-seo-section-desc">${desc}</p>
    </header>
    <${D} class="android-seo-grid">
${cities.map((c) => buildCityCard(c, regionFolder)).join("\n")}
    </${D}>
  </${D}>
</section>`;
}

function siloLinks(cities, currentFile, regionMain, hubLabel) {
  const links = [
    `<a href="../${regionMain}">All ${hubLabel} mobile services</a>`,
    `<a href="index.html">Browse city hub</a>`,
  ];
  cities
    .filter((c) => c.file !== currentFile)
    .slice(0, 4)
    .forEach((c) => links.push(`<a href="${c.file}">${c.cardTitle}</a>`));
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
    fetch("${base}includes/seo-header-regional.html")
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var root = document.getElementById("header-root");
        if (!root) return;
        root.innerHTML = html;
        if (window.initSeoHeader) window.initSeoHeader();
        if (window.initNavDropdown) window.initNavDropdown();
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

function buildCityPage(p, regionFolder, regionMain, hubLabel, allCities) {
  const url = `${BASE}/${regionFolder}/${p.file}`;
  const m = p.meta;
  const heroTags = m.tags.map((t) => `<span class="hero-tag">${t}</span>`).join("\n          ");
  const siloLabel = regionFolder.includes("canada") ? "More Canada locations" : "More USA locations";

  return `${headBlock(p, url, "../")}
  <${D} id="preloader">
    <${D} id="container-preloader" class="container-preloader">
      <${D} class="animation-preloader"><${D} class="spinner"></${D}></${D}>
      <${D} class="loader-section section-left"></${D}>
      <${D} class="loader-section section-right"></${D}>
    </${D}>
  </${D}>

  <${D} class="page-wrapper">
    <${D} id="header-root"></${D}>

    <section class="service-hero seo-hero" id="serviceHero">
      <span class="hero-orb a"></span>
      <span class="hero-orb b"></span>
      <span class="hero-orb c"></span>
      <${D} class="hero-inner">
        <${D} class="hero-eyebrow">${m.eyebrow}</${D}>
        <h1>${m.heroH1}</h1>
        <p class="hero-lead">${p.intro}</p>
        <${D} class="hero-actions">
          <a href="../page-contact.html" class="btn-hero-primary">Request a quote</a>
          <a href="../page-contact.html" class="btn-hero-secondary">Book a discovery call</a>
        </${D}>
        <${D} class="hero-tags">
          ${heroTags}
        </${D}>
      </${D}>
    </section>

    <section class="service-main">
      <${D} class="content-container">
        <${D} class="overview-panel reveal">
          <${D} class="s-label">${m.overviewLabel}</${D}>
          <p class="answer-lead"><strong>${m.answerBold}</strong> ${p.answer}</p>
          <h2>${m.overviewH2}</h2>
          <ul class="tick-list">
            ${p.ticks.map((t) => `<li>${t}</li>`).join("\n            ")}
          </ul>
        </${D}>

        <${D} class="section-head reveal">
          <${D} class="s-label" style="justify-content:center">Project focus</${D}>
          <p>${m.focus}</p>
        </${D}>

        <${D} class="cap-grid seo-cap-grid">
          <${D} class="cap-card reveal reveal-delay-1">
            <span class="cap-card-num">01</span>
            <h5>Discover</h5>
            <p>Workshops, scope, and roadmap.</p>
          </${D}>
          <${D} class="cap-card reveal reveal-delay-2">
            <span class="cap-card-num">02</span>
            <h5>Build</h5>
            <p>Design, develop, and test your app.</p>
          </${D}>
          <${D} class="cap-card reveal reveal-delay-3">
            <span class="cap-card-num">03</span>
            <h5>Launch</h5>
            <p>Store release and growth support.</p>
          </${D}>
        </${D}>

        <${D} class="faq-block reveal">
          <h3>Common questions</h3>
          <${D} class="faq-item"><h4>${p.faq1[0]}</h4><p>${p.faq1[1]}</p></${D}>
          <${D} class="faq-item"><h4>${p.faq2[0]}</h4><p>${p.faq2[1]}</p></${D}>
        </${D}>

        <${D} class="silo-strip reveal">
          <${D} class="silo-label">${siloLabel}</${D}>
          <${D} class="silo-links">
            ${siloLinks(allCities, p.file, regionMain, hubLabel)}
          </${D}>
        </${D}>

        <${D} class="cta-panel reveal">
          <${D} class="cta-text">
            <h4>${p.ctaH}</h4>
            <p>${p.ctaP}</p>
          </${D}>
          <${D} class="cta-btn-wrap">
            <a href="../page-contact.html" class="btn-cta">
              Get started
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
          </${D}>
        </${D}>
      </${D}>
    </section>

    <${D} id="footer-root"></${D}>
  </${D}>

${sharedScripts("../")}
</body>
</html>`;
}

function buildHubIndex(cities, regionFolder, regionMain, hubTitle, hubDesc, lead) {
  const url = `${BASE}/${regionFolder}/`;
  const regionName = regionFolder.includes("canada") ? "Canada" : "USA";
  const gridCards = cities
    .map((c) => {
      const featured = c.featured ? `\n            <span class="android-seo-card-badge">Headquarters</span>` : "";
      return `          <a href="${c.file}" class="android-seo-card${c.featured ? " is-featured" : ""}">${featured}
            <span class="android-seo-card-icon"><i class="flaticon-web"></i></span>
            <h3>${c.cardTitle}</h3>
            <p class="desc">${c.description}</p>
            <span class="view-link">View city page</span>
          </a>`;
    })
    .join("\n");

  const head = headBlock(
    { title: hubTitle, description: hubDesc, faq1: ["", ""], faq2: ["", ""] },
    url,
    "../"
  )
    .replace(
      `<link href="../css/seo-landing-shell.css" rel="stylesheet" />`,
      `<link href="../css/flaticon.css" rel="stylesheet" />\n  <link href="../css/android-seo-services-grid.css" rel="stylesheet" />\n  <link href="../css/seo-landing-shell.css" rel="stylesheet" />`
    )
    .replace('body class="service-shell">', 'body class="android-seo-page">');

  return `${head}
  <${D} id="preloader">
    <${D} id="container-preloader" class="container-preloader">
      <${D} class="animation-preloader"><${D} class="spinner"></${D}></${D}>
      <${D} class="loader-section section-left"></${D}>
      <${D} class="loader-section section-right"></${D}>
    </${D}>
  </${D}>
  <${D} class="page-wrapper">
    <${D} id="header-root"></${D}>
    <section class="android-seo-page-head">
      <${D} class="wrap">
        <p class="android-seo-breadcrumb">
          <a href="../index.html">Home</a> &nbsp;/&nbsp;
          <a href="../${regionMain}">Mobile App Development ${regionName}</a> &nbsp;/&nbsp;
          <span>Cities</span>
        </p>
        <h1>Mobile App Development <em>${regionName}</em></h1>
        <p class="lead">${lead}</p>
      </${D}>
    </section>
    <section class="android-seo-services" style="padding-top:0">
      <${D} class="wrap">
        <header class="android-seo-section-head">
          <p class="android-seo-overline"><span class="line" aria-hidden="true"></span> Cities We Serve</p>
          <h2 class="android-seo-section-title">Mobile App Development Across ${regionName === "Canada" ? "Canada" : "the USA"}</h2>
        </header>
        <${D} class="android-seo-grid">
${gridCards}
        </${D}>
      </${D}>
    </section>
    <${D} class="android-seo-cta-bar">
      <${D} class="android-seo-cta-inner">
        <${D}>
          <h3>Start your mobile app ${regionName === "Canada" ? "in Canada" : "in the USA"}</h3>
          <p>Talk to our team—we respond within one business day.</p>
        </${D}>
        <a href="../page-contact.html" class="android-seo-cta-btn">Book a consultation</a>
      </${D}>
    </${D}>
    <${D} id="footer-root"></${D}>
  </${D}>
${sharedScripts("../")}
</body>
</html>`;
}

function writeRegion(cities, folder, regionMain, hubLabel, hubTitle, hubDesc, lead) {
  const outDir = path.join(ROOT, folder);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  cities.forEach((c) => {
    if (c.customPage) {
      console.log("Skip custom page:", path.join(folder, c.file));
      return;
    }
    fs.writeFileSync(path.join(outDir, c.file), buildCityPage(c, folder, regionMain, hubLabel, cities), "utf8");
    console.log("Wrote", path.join(folder, c.file));
  });

  fs.writeFileSync(path.join(outDir, "index.html"), buildHubIndex(cities, folder, regionMain, hubTitle, hubDesc, lead), "utf8");
  console.log("Wrote", path.join(folder, "index.html"));
}

writeRegion(
  CANADA_CITIES,
  "mobile-app-development-canada",
  "mobile-app-development-canada.html",
  "Canada",
  "Mobile App Development Canada | Cities | Acesoft",
  "Mobile app development company in Canada. iOS and Android apps for London, Toronto, Ottawa, Kitchener, Waterloo, Windsor, and nationwide delivery by Acesoft.",
  "Explore mobile app development by city—London, Ontario is our headquarters, with delivery across the GTA, Ottawa, Southwestern Ontario, and Canada."
);

writeRegion(
  USA_CITIES,
  "mobile-app-development-usa",
  "mobile-app-development-usa.html",
  "USA",
  "Mobile App Development USA | Cities | Acesoft",
  "Mobile app development across the USA. iOS and Android apps for New York, San Francisco, Los Angeles, Chicago, Boston, Austin, and more from Acesoft.",
  "Explore mobile app development by city—US-friendly collaboration, native iOS and Android engineering, and delivery you can scale."
);

fs.writeFileSync(
  path.join(INCLUDES, "regional-canada-cities-grid.html"),
  gridFragment(
    CANADA_CITIES,
    "mobile-app-development-canada",
    "Mobile App Development Across Canada",
    "Choose your city for local discovery, delivery details, and how Acesoft supports iOS and Android products in your market."
  ),
  "utf8"
);

fs.writeFileSync(
  path.join(INCLUDES, "regional-usa-cities-grid.html"),
  gridFragment(
    USA_CITIES,
    "mobile-app-development-usa",
    "Mobile App Development Across the USA",
    "Choose your city for US-friendly collaboration, delivery details, and iOS and Android expertise."
  ),
  "utf8"
);

console.log("Done:", CANADA_CITIES.length, "Canada +", USA_CITIES.length, "USA cities.");
