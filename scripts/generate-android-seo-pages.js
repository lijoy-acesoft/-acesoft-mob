const fs = require("fs");
const path = require("path");

const BASE = "https://mobileappdevelopment.ca";
const OUT_DIR = path.join(__dirname, "..", "android-app-development");
const INCLUDES_DIR = path.join(__dirname, "..", "includes");

const SERVICES = [
  {
    file: "kotlin-android-app-development.html",
    cardTitle: "Kotlin Android App Development",
    icon: "flaticon-programmer",
    title: "Kotlin Android App Development | Acesoft Canada",
    description:
      "Kotlin Android app development company in Canada. Native Android apps with Jetpack, MVVM, and scalable architecture by Acesoft.",
    h1: "Kotlin Android App Development",
    intro:
      "We build production-grade Android apps in Kotlin using modern architecture, Jetpack libraries, and secure API integrations.",
    answer:
      "Kotlin is Google's preferred language for Android—safer code, faster development, and better interoperability with existing Java codebases.",
    ticks: [
      "Kotlin-first development with coroutines and structured concurrency.",
      "Jetpack Compose or XML UI with Material Design 3 patterns.",
      "Clean architecture: MVVM, repository pattern, and modular features.",
      "Play Store–ready builds with CI/CD and automated testing.",
    ],
    faq1: ["Do you work with existing Java code?", "Yes—we migrate incrementally or maintain hybrid Kotlin/Java modules."],
    faq2: ["Can you use Jetpack Compose?", "Yes—we deliver Compose UIs or hybrid approaches based on your roadmap."],
    ctaH: "Ready to build with Kotlin?",
    ctaP: "Share your product goals—we will propose stack, timeline, and delivery plan.",
  },
  {
    file: "custom-android-app-development.html",
    cardTitle: "Custom Android App Development",
    icon: "flaticon-user-interface",
    title: "Custom Android App Development Company | Acesoft",
    description:
      "Custom Android app development for startups and enterprises in Canada. End-to-end design, development, and launch by Acesoft.",
    h1: "Custom Android App Development",
    intro:
      "From discovery to Play Store launch, we design and build custom Android applications aligned with your users and business goals.",
    answer:
      "Bespoke apps built around your brand, integrations, and business logic—not off-the-shelf templates.",
    ticks: [
      "Product discovery and feature prioritization for MVP or full product.",
      "Custom UI/UX and branded Android experiences.",
      "Backend, payments, maps, and enterprise system integrations.",
      "Ongoing support, analytics, and feature releases.",
    ],
    faq1: ["How long does a custom app take?", "MVPs often ship in 10–16 weeks; full products vary by scope."],
    faq2: ["Do you sign NDAs?", "Yes—confidentiality and IP assignment are standard in our engagements."],
    ctaH: "Start your custom Android project",
    ctaP: "Tell us about your idea, users, and timeline for a tailored proposal.",
  },
  {
    file: "hire-android-developers.html",
    cardTitle: "Hire Android Developers",
    icon: "flaticon-instructor",
    title: "Hire Android Developers Canada | Dedicated Kotlin Team",
    description:
      "Hire Android developers in Canada. Dedicated Kotlin/Java engineers, staff augmentation, and delivery from Acesoft.",
    h1: "Hire Android Developers",
    intro:
      "Scale your product team with senior Android developers—dedicated resources and timezone-aligned collaboration from Canada.",
    answer:
      "When you need sustained velocity, specialized Kotlin skills, or capacity without long hiring cycles.",
    ticks: [
      "Dedicated Android engineers (Kotlin, Java, Jetpack).",
      "Staff augmentation integrated with your sprint cadence.",
      "Team leads, QA, and UI support available.",
      "Transparent reporting and sprint demos.",
    ],
    faq1: ["What skills do your Android developers have?", "Kotlin, Java, Jetpack, REST APIs, Firebase, and Play Store releases."],
    faq2: ["Can we start with one developer?", "Yes—scale up or down as your roadmap requires."],
    ctaH: "Hire Android talent today",
    ctaP: "Share team size, stack, and duration—we will match the right engineers.",
  },
  {
    file: "enterprise-android-app-development.html",
    cardTitle: "Enterprise Android Development",
    icon: "flaticon-medal",
    title: "Enterprise Android App Development | Secure & Scalable",
    description:
      "Enterprise Android app development with security, SSO, MDM, and compliance for organizations in Canada and USA.",
    h1: "Enterprise Android App Development",
    intro:
      "Enterprise-grade Android apps with robust security, identity management, offline sync, and ERP/CRM integrations.",
    answer:
      "Enterprise Android requires SSO, encryption, audit trails, role-based access, and compliance with IT policies.",
    ticks: [
      "SSO (Azure AD, Okta) and enterprise identity patterns.",
      "Encrypted storage, certificate pinning, and secure APIs.",
      "Offline-first sync for field and warehouse workflows.",
      "MDM-friendly builds and staged rollouts.",
    ],
    faq1: ["Do you support HIPAA or ISO requirements?", "We align architecture and processes with your compliance framework."],
    faq2: ["Can apps work offline?", "Yes—local databases and background sync are core patterns we implement."],
    ctaH: "Discuss your enterprise Android needs",
    ctaP: "We will map security, integration, and rollout requirements with your stakeholders.",
  },
  {
    file: "android-app-development-toronto.html",
    cardTitle: "Android App Development Toronto",
    icon: "flaticon-web",
    title: "Android App Development Toronto | Local & Remote Team",
    description:
      "Android app development company serving Toronto and GTA. Kotlin apps and consultation from Acesoft.",
    h1: "Android App Development Toronto",
    intro:
      "Acesoft supports Toronto startups and enterprises with native Android development and GTA-friendly collaboration.",
    answer:
      "Proximity to product stakeholders across Toronto's fintech, health, and retail hubs accelerates delivery.",
    ticks: [
      "In-person or virtual discovery workshops in the GTA.",
      "Android apps for fintech, retail, health, and SaaS clients.",
      "Hybrid engagement with Ontario delivery centers.",
      "Play Store launch and ongoing growth support.",
    ],
    faq1: ["Do you meet clients in Toronto?", "Yes—workshops and reviews can be scheduled in the GTA."],
    faq2: ["Do you only serve Toronto?", "No—we serve all of Canada and USA with the same delivery standards."],
    ctaH: "Toronto Android project inquiry",
    ctaP: "Book a call to discuss your Android app goals in the Toronto market.",
  },
  {
    file: "android-app-development-canada.html",
    cardTitle: "Android App Development Canada",
    icon: "flaticon-android-logo",
    title: "Android App Development Canada | Company | Acesoft",
    description:
      "Leading Android app development company in Canada. Custom Kotlin apps for startups and enterprises.",
    h1: "Android App Development Canada",
    intro:
      "Canada-based Android development with ISO-certified delivery and experience across Ontario, Western Canada, and the US.",
    answer:
      "Strong privacy culture, reliable delivery, and alignment with North American business hours.",
    ticks: [
      "Headquartered in Ontario with distributed delivery.",
      "200+ mobile projects including Android-native builds.",
      "PIPEDA-aware data handling and security practices.",
      "English and French UI support where required.",
    ],
    faq1: ["Where is Acesoft located?", "We operate from Ontario with global delivery capabilities."],
    faq2: ["Do you work with US clients?", "Yes—many engagements span Canada and United States markets."],
    ctaH: "Build your Android app in Canada",
    ctaP: "Connect with our team for a Canada-focused Android development quote.",
  },
  {
    file: "android-app-ui-ux-design.html",
    cardTitle: "Android UI/UX Design",
    icon: "flaticon-design",
    title: "Android UI UX Design Services | Mobile App Design",
    description:
      "Android UI/UX design: wireframes, prototypes, Material Design, and user testing by Acesoft.",
    h1: "Android UI/UX Design",
    intro:
      "We design Android interfaces that follow Material Design guidelines and improve retention—from wireframes to dev-ready specs.",
    answer:
      "Thumb-friendly layouts, clear navigation, accessibility, and consistency across devices and screen sizes.",
    ticks: [
      "User research, personas, and journey mapping.",
      "Wireframes and interactive Figma prototypes.",
      "Material Design 3 components and dark mode.",
      "Design handoff for Kotlin/Compose implementation.",
    ],
    faq1: ["Do you design for tablets and foldables?", "Yes—we adapt layouts for multiple form factors."],
    faq2: ["Can you redesign an existing app?", "Yes—UX audits and phased UI modernization are common."],
    ctaH: "Improve your Android UX",
    ctaP: "Share your app or concept—we will outline a design engagement.",
  },
  {
    file: "android-app-maintenance-support.html",
    cardTitle: "Android App Maintenance",
    icon: "flaticon-repair",
    title: "Android App Maintenance & Support | Updates & Fixes",
    description:
      "Android app maintenance, bug fixes, OS updates, and feature enhancements. Keep your app secure with Acesoft.",
    h1: "Android App Maintenance & Support",
    intro:
      "Post-launch support: crash fixes, OS compatibility, dependency updates, performance tuning, and feature releases.",
    answer:
      "Android apps need ongoing care as Google releases new OS versions and user expectations evolve.",
    ticks: [
      "Monitoring, crash analytics, and SLA-based bug fixes.",
      "Target SDK upgrades and Play policy compliance.",
      "Security patches and dependency modernization.",
      "Feature backlog execution and improvements.",
    ],
    faq1: ["Can you take over an app from another vendor?", "Yes—we perform code review and stabilization first."],
    faq2: ["Do you offer monthly retainers?", "Yes—flexible support plans based on app complexity."],
    ctaH: "Get Android maintenance support",
    ctaP: "Send your app details—we will propose a support plan and timeline.",
  },
  {
    file: "android-play-store-publishing.html",
    cardTitle: "Play Store Publishing & ASO",
    icon: "flaticon-search-engine",
    title: "Android Play Store Publishing & ASO | Acesoft",
    description:
      "Google Play Store publishing, ASO, release management, and compliance. Launch your Android app with Acesoft.",
    h1: "Play Store Publishing & ASO",
    intro:
      "Play Console setup, release tracks, store listings, screenshots, ASO keywords, and policy compliance.",
    answer:
      "Play Store success requires listing quality, ratings strategy, and staged rollouts—not just a build upload.",
    ticks: [
      "Developer account setup and app signing guidance.",
      "Store listing copy, graphics, and localized assets.",
      "ASO keyword research and category optimization.",
      "Staged rollouts, A/B tests, and update cadence.",
    ],
    faq1: ["Can you fix a rejected app?", "Yes—we address policy issues and resubmit."],
    faq2: ["Do you manage reviews and ratings?", "We advise on response strategy and product fixes behind negative feedback."],
    ctaH: "Launch on Google Play",
    ctaP: "We will guide publishing steps and ASO for your Android app.",
  },
  {
    file: "startup-android-app-development.html",
    cardTitle: "Startup Android App Development",
    icon: "flaticon-concept",
    title: "Startup Android App Development | MVP & Scale",
    description:
      "Startup Android app development: fast MVPs, investor-ready demos, and scalable architecture by Acesoft.",
    h1: "Startup Android App Development",
    intro:
      "Ship Android MVPs quickly—focused features, lean architecture, and a path to scale after validation and funding.",
    answer:
      "Startups need speed without sacrificing code quality that blocks fundraising or growth.",
    ticks: [
      "2–4 month MVP roadmaps with clear milestones.",
      "Investor demo builds and pitch-ready prototypes.",
      "Analytics, onboarding, and core monetization hooks.",
      "Technical due diligence documentation for investors.",
    ],
    faq1: ["How lean can the first version be?", "We define must-have features vs. phase-two backlog together."],
    faq2: ["Can you help after funding?", "Yes—we expand teams and architecture for post-raise growth."],
    ctaH: "Build your startup Android MVP",
    ctaP: "Share your pitch, timeline, and budget range for a startup-friendly plan.",
  },
  {
    file: "android-api-backend-integration.html",
    cardTitle: "Android API & Backend Integration",
    icon: "flaticon-access",
    title: "Android API & Backend Integration | Acesoft",
    description:
      "Android API integration services: REST, GraphQL, payments, Firebase, and cloud backends for apps in Canada.",
    h1: "Android API & Backend Integration",
    intro:
      "Connect your Android app to secure APIs, payment gateways, CRMs, and cloud services with reliable, testable integration layers.",
    answer:
      "Modern Android apps depend on well-designed APIs—auth, sync, payments, and analytics must work flawlessly in production.",
    ticks: [
      "REST and GraphQL API design and client implementation.",
      "OAuth, JWT, and token refresh patterns for secure access.",
      "Firebase, AWS, Azure, and third-party SDK integrations.",
      "Offline caching, retry logic, and observability.",
    ],
    faq1: ["Can you integrate with our existing backend?", "Yes—we work with your APIs or help design new endpoints."],
    faq2: ["Do you handle payment integrations?", "Yes—Stripe, PayPal, in-app billing, and regional gateways."],
    ctaH: "Integrate your Android backend",
    ctaP: "Share your stack and systems—we will map integration scope and timeline.",
  },
  {
    file: "flutter-android-app-development.html",
    cardTitle: "Flutter Android Development",
    icon: "flaticon-front-end",
    title: "Flutter Android App Development | Cross-Platform",
    description:
      "Flutter Android development for shared iOS and Android codebases. Fast delivery with native-quality UI from Acesoft.",
    h1: "Flutter Android App Development",
    intro:
      "Build Android apps with Flutter when you want one codebase for mobile platforms—without compromising polish on Google Play.",
    answer:
      "Flutter speeds delivery when product requirements span Android and iOS and your team wants a single engineering stream.",
    ticks: [
      "Flutter UI with Material Design and platform-adaptive widgets.",
      "Shared business logic with native modules where required.",
      "Performance tuning and Play Store release readiness.",
      "Migration paths from native Kotlin when needed.",
    ],
    faq1: ["Is Flutter right for our product?", "We assess complexity, native features, and timeline in discovery."],
    faq2: ["Can you ship Android first, iOS later?", "Yes—phased rollout across platforms is common."],
    ctaH: "Explore Flutter for Android",
    ctaP: "Tell us your platforms and roadmap—we will recommend the right approach.",
  },
];

const PAGE_META = {
  "kotlin-android-app-development.html": {
    eyebrow: "Kotlin Android | Acesoft | Canada & USA",
    heroH1: "Kotlin Android <em>App Development</em><br>Built for Performance",
    overviewLabel: "Kotlin Android services",
    overviewH2: "Native Kotlin engineering for modern Android products",
    answerBold: "Why build in Kotlin?",
    focus: "Teams shipping native Android with Jetpack, Compose, and scalable architecture.",
    tags: ["Kotlin", "Jetpack", "MVVM", "Play Store ready"],
    caps: [
      ["01", "Architecture", "Stack, modules, and acceptance criteria."],
      ["02", "Development", "Build, test, integrate APIs, and iterate."],
      ["03", "Launch", "Play Store release, monitoring, and handover."],
    ],
  },
  "custom-android-app-development.html": {
    eyebrow: "Custom Android | Acesoft | Canada",
    heroH1: "Custom Android <em>App Development</em><br>End-to-End Delivery",
    overviewLabel: "Custom Android services",
    overviewH2: "Bespoke Android apps from discovery through launch",
    answerBold: "When does custom development fit?",
    focus: "Startups and enterprises that need a product built around their users and integrations.",
    tags: ["Custom apps", "MVP to scale", "Integrations", "Canada led"],
    caps: [
      ["01", "Discovery", "Scope, personas, and prioritized roadmap."],
      ["02", "Build", "Design, develop, and QA your Android product."],
      ["03", "Grow", "Launch, analytics, and feature releases."],
    ],
  },
  "hire-android-developers.html": {
    eyebrow: "Hire Android Developers | Acesoft",
    heroH1: "Hire Android <em>Developers</em><br>Dedicated Kotlin Talent",
    overviewLabel: "Android staffing",
    overviewH2: "Dedicated Android engineers aligned to your sprint cadence",
    answerBold: "When should you hire dedicated Android developers?",
    focus: "Product teams that need Kotlin capacity without long hiring cycles.",
    tags: ["Dedicated team", "Staff augmentation", "Kotlin", "Timezone overlap"],
    caps: [
      ["01", "Match", "Skills, seniority, and team fit."],
      ["02", "Embed", "Integrate with your tools and ceremonies."],
      ["03", "Scale", "Add QA, UI, or leads as velocity grows."],
    ],
  },
  "enterprise-android-app-development.html": {
    eyebrow: "Enterprise Android | Acesoft",
    heroH1: "Enterprise Android <em>Development</em><br>Secure & Scalable",
    overviewLabel: "Enterprise Android services",
    overviewH2: "Secure Android apps for regulated and distributed teams",
    answerBold: "What makes enterprise Android different?",
    focus: "Organizations requiring SSO, compliance, offline sync, and IT-controlled rollouts.",
    tags: ["SSO", "MDM", "Offline sync", "Compliance"],
    caps: [
      ["01", "Security", "Identity, encryption, and policy alignment."],
      ["02", "Integrate", "ERP, CRM, and line-of-business APIs."],
      ["03", "Operate", "Staged rollout, monitoring, and support."],
    ],
  },
  "android-app-development-toronto.html": {
    eyebrow: "Android Toronto | Acesoft",
    heroH1: "Android App Development <em>Toronto</em><br>GTA Delivery",
    overviewLabel: "Toronto Android services",
    overviewH2: "Android development for Toronto startups and enterprises",
    answerBold: "Why work with a Toronto-aligned Android partner?",
    focus: "GTA teams that want local workshops plus proven delivery across Canada.",
    tags: ["Toronto", "GTA", "Fintech", "Health & retail"],
    caps: [
      ["01", "Discover", "Workshops and roadmap in the GTA."],
      ["02", "Deliver", "Kotlin builds with sprint transparency."],
      ["03", "Launch", "Play Store and growth support."],
    ],
  },
  "android-app-development-canada.html": {
    eyebrow: "Android Canada | Acesoft",
    heroH1: "Android App Development <em>Canada</em><br>Trusted Delivery",
    overviewLabel: "Canada Android services",
    overviewH2: "Canada-based Android development for North American markets",
    answerBold: "Why choose a Canadian Android development company?",
    focus: "Organizations that value privacy, reliability, and North American collaboration.",
    tags: ["Canada", "PIPEDA aware", "ISO certified", "US & Canada"],
    caps: [
      ["01", "Plan", "Scope aligned to Canadian market needs."],
      ["02", "Build", "Kotlin apps with secure engineering practices."],
      ["03", "Support", "Launch, maintenance, and iteration."],
    ],
  },
  "android-app-ui-ux-design.html": {
    eyebrow: "Android UI/UX | Acesoft",
    heroH1: "Android <em>UI/UX Design</em><br>Material & Accessible",
    overviewLabel: "Android design services",
    overviewH2: "User-centered Android interfaces from research to handoff",
    answerBold: "Why invest in Android-specific UX?",
    focus: "Product owners who need Material Design systems and dev-ready specs.",
    tags: ["Material Design", "Figma", "Accessibility", "Compose handoff"],
    caps: [
      ["01", "Research", "Personas, journeys, and usability goals."],
      ["02", "Design", "Wireframes, prototypes, and UI systems."],
      ["03", "Handoff", "Specs for Kotlin or Compose implementation."],
    ],
  },
  "android-app-maintenance-support.html": {
    eyebrow: "Android Maintenance | Acesoft",
    heroH1: "Android App <em>Maintenance</em><br>Stay Current & Secure",
    overviewLabel: "Android support services",
    overviewH2: "Keep your Android app stable across OS and dependency updates",
    answerBold: "When does maintenance become critical?",
    focus: "Teams with live apps that must stay compliant, fast, and crash-free.",
    tags: ["OS updates", "Crash fixes", "SDK upgrades", "SLA support"],
    caps: [
      ["01", "Assess", "Code review, crashes, and technical debt."],
      ["02", "Stabilize", "Fixes, performance, and dependency updates."],
      ["03", "Evolve", "Features, ASO, and release cadence."],
    ],
  },
  "android-play-store-publishing.html": {
    eyebrow: "Play Store | Acesoft",
    heroH1: "Play Store <em>Publishing & ASO</em><br>Launch with Confidence",
    overviewLabel: "Play Store services",
    overviewH2: "Publishing, listings, and ASO for Google Play success",
    answerBold: "What does Play Store success require?",
    focus: "Apps ready to launch or struggling with policy, listings, or visibility.",
    tags: ["ASO", "Store listings", "Staged rollout", "Policy compliance"],
    caps: [
      ["01", "Prepare", "Signing, assets, and policy checklist."],
      ["02", "Publish", "Tracks, releases, and store optimization."],
      ["03", "Optimize", "ASO, ratings strategy, and updates."],
    ],
  },
  "startup-android-app-development.html": {
    eyebrow: "Startup Android | Acesoft",
    heroH1: "Startup Android <em>App Development</em><br>MVP to Scale",
    overviewLabel: "Startup Android services",
    overviewH2: "Fast Android MVPs built for validation and investor readiness",
    answerBold: "Why do startups choose a focused Android MVP?",
    focus: "Founders who need speed, lean scope, and architecture that survives growth.",
    tags: ["MVP", "Investor demo", "Lean scope", "Scale path"],
    caps: [
      ["01", "Focus", "Must-have features and milestone plan."],
      ["02", "Ship", "Demo-ready Android build in weeks."],
      ["03", "Scale", "Team and architecture after validation."],
    ],
  },
  "android-api-backend-integration.html": {
    eyebrow: "Android APIs | Acesoft",
    heroH1: "Android API <em>& Backend Integration</em><br>Connect Your Stack",
    overviewLabel: "Android integration services",
    overviewH2: "Reliable API and backend connections for production Android apps",
    answerBold: "Why does integration quality matter on Android?",
    focus: "Teams connecting mobile apps to payments, CRM, auth, and cloud services.",
    tags: ["REST APIs", "OAuth", "Firebase", "Payments"],
    caps: [
      ["01", "Design", "API contracts, auth, and error handling."],
      ["02", "Integrate", "SDKs, gateways, and enterprise systems."],
      ["03", "Harden", "Monitoring, retries, and production support."],
    ],
  },
  "flutter-android-app-development.html": {
    eyebrow: "Flutter Android | Acesoft",
    heroH1: "Flutter Android <em>Development</em><br>Cross-Platform Speed",
    overviewLabel: "Flutter Android services",
    overviewH2: "Flutter apps for Android with shared code and native polish",
    answerBold: "When is Flutter a smart choice for Android?",
    focus: "Products targeting Android and iOS with one codebase and faster iteration.",
    tags: ["Flutter", "Cross-platform", "Material UI", "Play Store"],
    caps: [
      ["01", "Plan", "Platform scope, widgets, and native gaps."],
      ["02", "Build", "Flutter UI, logic, and platform channels."],
      ["03", "Release", "Android build, testing, and store launch."],
    ],
  },
};

function pageMeta(p) {
  return PAGE_META[p.file] || {
    eyebrow: `${p.cardTitle} | Acesoft | Canada`,
    heroH1: p.h1.replace(/(\w+)$/, "<em>$1</em>"),
    overviewLabel: "Android development services",
    overviewH2: p.h1,
    answerBold: "Why choose Acesoft?",
    focus: p.intro,
    tags: ["Android", "Kotlin", "Canada", "Play Store"],
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

const SECTION_HEAD = `    <header class="android-seo-section-head">
      <p class="android-seo-overline"><span class="line" aria-hidden="true"></span> Specialized Services</p>
      <h2 class="android-seo-section-title">Explore Our Android Development Services</h2>
      <p class="android-seo-section-desc">Each service has a dedicated page with scope, deliverables, and how Acesoft can help your team in Canada and beyond.</p>
    </header>`;

function buildGridHtml(currentFile, baseHref) {
  baseHref = baseHref || "";
  return SERVICES.map((s) => {
    const href = baseHref + s.file;
    const isCurrent = currentFile === s.file;
    return `          <a href="${href}" class="android-seo-card${isCurrent ? " is-current" : ""}"${isCurrent ? ' aria-current="page"' : ""}>
            <span class="android-seo-card-icon"><i class="${s.icon}"></i></span>
            <h3>${s.cardTitle}</h3>
            <p class="desc">${s.description}</p>
            <span class="view-link">View service</span>
          </a>`;
  }).join("\n");
}

function buildSiloHtml(currentFile) {
  const links = [
    `<a href="../android-app-development.html">All Android development services</a>`,
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
    fetch("${base}includes/seo-header-mobile.html")
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
  <meta property="og:image" content="${BASE}/images/resource/android1.png">
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
  const url = `${BASE}/android-app-development/${p.file}`;
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
          <div class="silo-label">More Android services</div>
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
      `<link href="${base}css/flaticon.css" rel="stylesheet" />\n  <link href="${base}css/android-seo-services-grid.css" rel="stylesheet" />\n  <link href="${base}css/seo-landing-shell.css" rel="stylesheet" />`
    )
    .replace('body class="service-shell">', 'body class="android-seo-page">');
}

function buildHubPage() {
  const p = {
    title: "Android App Development Services | Acesoft Canada",
    description:
      "Android app development services: Kotlin, custom apps, enterprise, Toronto, Canada, UI/UX, maintenance, Play Store, and startup MVPs.",
    h1: "Android App Development Services",
    intro:
      "Explore our Android development services—native Kotlin apps, hiring developers, enterprise delivery, and location-specific expertise across Canada.",
    faq1: ["", ""],
    faq2: ["", ""],
  };
  const url = `${BASE}/android-app-development/`;
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

    <section class="android-seo-page-head">
      <div class="wrap">
        <p class="android-seo-breadcrumb">
          <a href="../index.html">Home</a> &nbsp;/&nbsp;
          <a href="../android-app-development.html">Android App Development</a> &nbsp;/&nbsp;
          <span>Services</span>
        </p>
        <h1>Android <em>App Development</em> Services</h1>
        <p class="lead">${p.intro}</p>
      </div>
    </section>

    <section class="android-seo-services" style="padding-top:0">
      <div class="wrap">
${SECTION_HEAD}
        <div class="android-seo-grid">
${grid}
        </div>
      </div>
    </section>

    <div class="android-seo-cta-bar">
      <div class="android-seo-cta-inner">
        <div>
          <h3>Ready to build your Android app?</h3>
          <p>Talk to our Android specialists—we respond within one business day.</p>
        </div>
        <a href="../page-contact.html" class="android-seo-cta-btn">Book a consultation</a>
      </div>
    </div>

    <div id="footer-root"></div>
  </div>
${sharedScripts("../")}
</body>
</html>`;
}

function buildGridFragment() {
  const grid = buildGridHtml(null, "android-app-development/");
  return `<section class="android-seo-services">
  <div class="wrap">
${SECTION_HEAD}
    <div class="android-seo-grid">
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

fs.writeFileSync(path.join(INCLUDES_DIR, "android-seo-services-grid.html"), buildGridFragment(), "utf8");
console.log("Wrote includes/android-seo-services-grid.html");
console.log("Done:", SERVICES.length, "pages + hub");
