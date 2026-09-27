/* Ali Shaer — portfolio interactions: mobile nav, active nav state, scroll reveal. */
(function () {
  "use strict";

  var GITHUB_URL = "https://github.com/AliGranett";
  var LINKEDIN_URL = "https://www.linkedin.com/in/ali-shaer-5a18992b0/";
  var EMAIL = "Shaer.ali.gr@gmail.com";
  var CV_PATH = "assets/cv/Ali_Shaer_CV.pdf";

  var root = document.documentElement;
  root.classList.add("js");

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Keep social hrefs in sync with the canonical constants ------------- */
  var SOCIAL_URLS = { linkedin: LINKEDIN_URL, github: GITHUB_URL };
  Array.prototype.forEach.call(document.querySelectorAll("[data-social]"), function (link) {
    var url = SOCIAL_URLS[link.getAttribute("data-social")];
    if (url) link.setAttribute("href", url);
  });
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (link) {
    link.setAttribute("href", "mailto:" + EMAIL);
  });
  Array.prototype.forEach.call(document.querySelectorAll('a[download][href$=".pdf"]'), function (link) {
    link.setAttribute("href", CV_PATH);
  });

  /* --- Footer year -------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* --- Sticky header shadow ---------------------------------------------- */
  var header = document.getElementById("site-header");
  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* --- Mobile menu -------------------------------------------------------- */
  var menu = document.getElementById("mobile-menu");
  var toggle = document.getElementById("nav-toggle");
  var closeBtn = document.getElementById("mobile-close");

  function openMenu() {
    if (!menu || !toggle) return;
    menu.hidden = false;
    // next frame so the transition runs from its start state
    requestAnimationFrame(function () {
      menu.classList.add("is-open");
    });
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("menu-open");
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu(returnFocus) {
    if (!menu || !toggle) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
    window.setTimeout(function () {
      if (!menu.classList.contains("is-open")) menu.hidden = true;
    }, prefersReducedMotion ? 0 : 240);
    if (returnFocus) toggle.focus();
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (menu && menu.classList.contains("is-open")) closeMenu(true);
      else openMenu();
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", function () { closeMenu(true); });

  if (menu) {
    menu.addEventListener("click", function (event) {
      // tap the backdrop, or any link inside, to dismiss
      if (event.target === menu || event.target.closest("a")) closeMenu(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu && menu.classList.contains("is-open")) closeMenu(true);
  });

  /* --- Active nav state --------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var visible = Object.create(null);
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        var bestId = null;
        var bestRatio = 0;
        sections.forEach(function (section) {
          var ratio = visible[section.id] || 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = section.id;
          }
        });
        if (bestId) setActive(bestId);
      },
      {
        rootMargin: "-" + (header ? header.offsetHeight + 8 : 80) + "px 0px -45% 0px",
        threshold: [0, 0.12, 0.35, 0.6, 1]
      }
    );
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* --- Scroll reveal ------------------------------------------------------ */
  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function revealAll() {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var forceReveal =
    prefersReducedMotion ||
    !("IntersectionObserver" in window) ||
    /(^|[?&])reveal=all(&|$)/.test(window.location.search);

  if (forceReveal) {
    revealAll();
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealables.forEach(function (el) { revealObserver.observe(el); });

    // Anything still hidden once the page has settled (long full-page captures,
    // odd viewport sizes) gets shown rather than left invisible.
    window.addEventListener("load", function () {
      window.setTimeout(revealAll, 1800);
    });
  }

  window.addEventListener("beforeprint", revealAll);

  /* --- Smooth scroll with sticky-header offset ---------------------------- */
  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute("href");
    if (!hash || hash === "#") return;
    var target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    var offset = (header ? header.offsetHeight : 0) + 20;
    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
    if (history.replaceState) history.replaceState(null, "", hash);
  });
})();
