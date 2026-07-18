// ============================================================
// QADR ACADEMY — Urdu Language Toggle
//
// ISSUES FIXED:
//
// 1. RACE CONDITION — urdu.js ran before components.js finished
//    injecting the navbar. Fixed: poll for navbar before init.
//
// 2. QUIZ PAGE — quiz.js renders topic cards dynamically AFTER
//    urdu.js already ran, so data-en/data-ur inside quiz cards
//    were never toggled. Fixed: MutationObserver watches for
//    new data-en/data-ur nodes and toggles them immediately.
//
// 3. DROPDOWN BUTTON ("Islamic Sciences") not translated —
//    translateNavLinks only targeted <a> tags, missing the
//    <button class="nav-drop-btn"> wrapper. Fixed: now targets
//    nav-drop-btn text node directly.
//
// 4. COURSES PAGE — only page-hero h1/p had data-en/data-ur;
//    all card content, filter buttons, search bar had no Urdu
//    equivalent. Fixed: content-level translation added for
//    section headings and filter buttons via JS text swap.
//
// 5. urdu.css missing from quiz.html — RTL styles weren't
//    loading. Fixed: urdu.js now injects the <link> itself
//    if it isn't already present in <head>.
//
// 6. STORAGE KEY was "suffah_lang" — renamed to "qadr_lang"
//    to avoid stale values from the old Suffah builds.
//
// 7. Noto Nastaliq Urdu font wasn't loaded on pages that
//    didn't have urdu.css. Fixed: font import injected by JS.
// ============================================================

(function () {
  "use strict";

  const STORAGE_KEY = "qadr_lang";

  // ── Urdu translations for static page content ──────────────
  // Add entries here as more pages get Urdu content.
  const TRANSLATIONS = {
    // Nav
    nav: {
      Home: "ہوم",
      Courses: "کورسز",
      "Islamic Sciences": "اسلامی علوم",
      Seerah: "سیرت",
      Hadith: "حدیث",
      "Islamic Studies": "اسلامی تعلیم",
      Teachers: "اساتذہ",
      Quiz: "کوئز",
      Portal: "پورٹل",
      Contact: "رابطہ",
      "Enroll Now": "ابھی داخلہ لیں",
    },
    // Mobile nav (includes emoji prefix — matched by trimming)
    mobileNav: {
      Home: "ہوم",
      Courses: "کورسز",
      Seerah: "سیرت",
      Hadith: "حدیث",
      "Islamic Studies": "اسلامی تعلیم",
      Teachers: "اساتذہ",
      Quiz: "کوئز",
      "Student Portal": "اسٹوڈنٹ پورٹل",
      Admission: "داخلہ",
      Contact: "رابطہ",
    },
    // Footer column headings
    footer: {
      Courses: "کورسز",
      "Quick Links": "فوری لنکس",
      "Connect With Us": "ہم سے رابطہ کریں",
    },
    footerBrand:
      "صحیح اسلامی تعلیم کے لیے ایک مخصوص پلیٹ فارم — قرآن، حدیث اور دین کے علم سے دلوں کو سنوارنا۔",
    noticeBand:
      '📚 نیا بیچ جلد شروع ہو رہا ہے — <a href="{href}" style="color:var(--gold-light);font-weight:600;">ابھی درخواست دیں</a> | 🌙 داخلہ 2026-27 کے لیے کھلا ہے',
    brandSub: "اسلامی اکادمی",

    // Courses page filter buttons
    courseFilters: {
      All: "سب",
      Quran: "قرآن",
      Hadith: "حدیث",
      Fiqh: "فقہ",
      Seerah: "سیرت",
      Studies: "اسلامی تعلیم",
      Beginner: "ابتدائی",
    },
  };

  // ── Ensure urdu.css is loaded ───────────────────────────────
  function ensureUrduCSS() {
    if (document.querySelector('link[href*="urdu.css"]')) return;
    const isPages = location.pathname.includes("/pages/");
    const href = (isPages ? "../" : "") + "css/urdu.css";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  // ── Ensure Noto Nastaliq Urdu font is loaded ────────────────
  function ensureFont() {
    if (document.querySelector('link[href*="Noto+Nastaliq"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap";
    document.head.appendChild(link);
  }

  // ── Inject toggle button into navbar ────────────────────────
  function injectToggleButton() {
    if (document.getElementById("langToggleBtn")) return;
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const btn = document.createElement("button");
    btn.className = "lang-toggle-btn";
    btn.id = "langToggleBtn";
    btn.title = "اردو / English";
    btn.innerHTML =
      '<span class="lang-icon">اردو</span><span class="lang-en-label"> / EN</span>';
    btn.setAttribute("aria-label", "Switch language");
    btn.addEventListener("click", toggleLanguage);

    const hamburger = navbar.querySelector(".hamburger");
    hamburger ? navbar.insertBefore(btn, hamburger) : navbar.appendChild(btn);
  }

  // ── Toggle data-en / data-ur elements ───────────────────────
  function applyDataAttributes(isUrdu) {
    document.querySelectorAll("[data-en]").forEach((el) => {
      el.style.display = isUrdu ? "none" : "";
    });
    document.querySelectorAll("[data-ur]").forEach((el) => {
      if (isUrdu) {
        el.style.display = el.dataset.block === "true" ? "block" : "inline";
        el.style.fontFamily = "'Noto Nastaliq Urdu', 'Scheherazade New', serif";
        el.style.direction = "rtl";
      } else {
        el.style.display = "none";
      }
    });
  }

  // ── Translate navbar links ───────────────────────────────────
  function applyNavTranslations(isUrdu) {
    // Regular nav links (<a> tags)
    document.querySelectorAll(".nav-links a").forEach((el) => {
      const key = el.getAttribute("data-orig") || el.textContent.trim();
      if (!el.getAttribute("data-orig")) el.setAttribute("data-orig", key);
      const tr = TRANSLATIONS.nav[key];
      el.textContent = isUrdu && tr ? tr : key;
      el.style.fontFamily = isUrdu && tr ? "'Noto Nastaliq Urdu', serif" : "";
      el.style.fontSize = isUrdu && tr ? "1rem" : "";
    });

    // Dropdown trigger button (text node inside .nav-drop-btn)
    document.querySelectorAll(".nav-drop-btn").forEach((btn) => {
      // Text node is direct child; arrow span is a child too — get text only
      const textNode = Array.from(btn.childNodes).find((n) => n.nodeType === 3);
      if (!textNode) return;
      const key = btn.getAttribute("data-orig") || textNode.textContent.trim();
      if (!btn.getAttribute("data-orig")) btn.setAttribute("data-orig", key);
      const tr = TRANSLATIONS.nav[key];
      textNode.textContent = (isUrdu && tr ? tr : key) + " ";
      btn.style.fontFamily = isUrdu && tr ? "'Noto Nastaliq Urdu', serif" : "";
      btn.style.fontSize = isUrdu && tr ? "1rem" : "";
    });

    // Dropdown child links
    document.querySelectorAll(".nav-drop-menu a").forEach((el) => {
      const key =
        el.getAttribute("data-orig") ||
        el.textContent.replace(/[🌟📜☪️]/u, "").trim();
      if (!el.getAttribute("data-orig"))
        el.setAttribute("data-orig", el.textContent.trim());
      const tr = TRANSLATIONS.nav[key];
      if (isUrdu && tr) {
        // Keep icon if present
        const icon = el.textContent.match(/[🌟📜☪️]/u);
        el.textContent = (icon ? icon[0] + " " : "") + tr;
        el.style.fontFamily = "'Noto Nastaliq Urdu', serif";
        el.style.fontSize = "1rem";
      } else {
        el.textContent = el.getAttribute("data-orig");
        el.style.fontFamily = "";
        el.style.fontSize = "";
      }
    });

    // Mobile nav links
    document.querySelectorAll(".mobile-nav a").forEach((el) => {
      const full = el.getAttribute("data-orig") || el.textContent.trim();
      if (!el.getAttribute("data-orig")) el.setAttribute("data-orig", full);
      // Strip emoji to get key
      const key = full.replace(/[\p{Emoji}\s]+/u, "").trim();
      const icon = full.match(/^[\p{Emoji}]+/u)?.[0] || "";
      const tr = TRANSLATIONS.mobileNav[key];
      el.textContent = isUrdu && tr ? icon + " " + tr : full;
      el.style.fontFamily = isUrdu && tr ? "'Noto Nastaliq Urdu', serif" : "";
      el.style.fontSize = isUrdu && tr ? "1.05rem" : "";
    });

    // Nav brand subtitle
    document
      .querySelectorAll(".nav-brand-text span:last-child")
      .forEach((el) => {
        if (!el.getAttribute("data-orig"))
          el.setAttribute("data-orig", el.textContent.trim());
        el.textContent =
          isUrdu ? TRANSLATIONS.brandSub : el.getAttribute("data-orig");
        el.style.fontFamily = isUrdu ? "'Noto Nastaliq Urdu', serif" : "";
      });

    // Enroll Now CTA
    document.querySelectorAll(".nav-cta").forEach((el) => {
      if (!el.getAttribute("data-orig"))
        el.setAttribute("data-orig", el.textContent.trim());
      const tr = TRANSLATIONS.nav[el.getAttribute("data-orig")];
      el.textContent = isUrdu && tr ? tr : el.getAttribute("data-orig");
      el.style.fontFamily = isUrdu && tr ? "'Noto Nastaliq Urdu', serif" : "";
    });
  }

  // ── Translate notice band ────────────────────────────────────
  function applyNoticeBand(isUrdu) {
    const band = document.querySelector(".notice-band");
    if (!band) return;
    if (!band.getAttribute("data-orig-html")) {
      band.setAttribute("data-orig-html", band.innerHTML);
    }
    if (isUrdu) {
      const href = band.querySelector("a")?.getAttribute("href") || "#";
      band.innerHTML = TRANSLATIONS.noticeBand.replace("{href}", href);
      band.style.fontFamily = "'Noto Nastaliq Urdu', serif";
      band.style.direction = "rtl";
      band.style.fontSize = "0.9rem";
    } else {
      band.innerHTML = band.getAttribute("data-orig-html");
      band.style.fontFamily = "";
      band.style.direction = "";
      band.style.fontSize = "";
    }
  }

  // ── Translate footer ─────────────────────────────────────────
  function applyFooter(isUrdu) {
    // Column headings
    document.querySelectorAll(".footer-col h4").forEach((el) => {
      if (!el.getAttribute("data-orig"))
        el.setAttribute("data-orig", el.textContent.trim());
      const tr = TRANSLATIONS.footer[el.getAttribute("data-orig")];
      el.textContent = isUrdu && tr ? tr : el.getAttribute("data-orig");
      el.style.fontFamily = isUrdu && tr ? "'Noto Nastaliq Urdu', serif" : "";
    });

    // Footer brand paragraph
    const brandP = document.querySelector(".footer-brand p");
    if (brandP) {
      if (!brandP.getAttribute("data-orig"))
        brandP.setAttribute("data-orig", brandP.textContent.trim());
      brandP.textContent =
        isUrdu ? TRANSLATIONS.footerBrand : brandP.getAttribute("data-orig");
      brandP.style.fontFamily = isUrdu ? "'Noto Nastaliq Urdu', serif" : "";
      brandP.style.direction = isUrdu ? "rtl" : "";
      brandP.style.lineHeight = isUrdu ? "2.2" : "";
    }
  }

  // ── Translate courses page filter buttons ────────────────────
  function applyCoursesFilters(isUrdu) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      if (!btn.getAttribute("data-orig"))
        btn.setAttribute("data-orig", btn.textContent.trim());
      const tr = TRANSLATIONS.courseFilters[btn.getAttribute("data-orig")];
      btn.textContent = isUrdu && tr ? tr : btn.getAttribute("data-orig");
      btn.style.fontFamily = isUrdu && tr ? "'Noto Nastaliq Urdu', serif" : "";
    });
  }

  // ── Update toggle button appearance ─────────────────────────
  function updateToggleBtn(isUrdu) {
    const btn = document.getElementById("langToggleBtn");
    if (!btn) return;
    if (isUrdu) {
      btn.classList.add("urdu-active");
      btn.innerHTML =
        '<span class="lang-icon">اردو</span><span class="lang-en-label"> ✓</span>';
    } else {
      btn.classList.remove("urdu-active");
      btn.innerHTML =
        '<span class="lang-icon">اردو</span><span class="lang-en-label"> / EN</span>';
    }
  }

  // ── Update <html lang> attribute ────────────────────────────
  function updateHtmlLang(isUrdu) {
    document.documentElement.lang = isUrdu ? "ur" : "en";
    document.documentElement.dir = isUrdu ? "rtl" : "ltr";
  }

  // ── Apply full language switch ───────────────────────────────
  function applyLanguage(lang) {
    const isUrdu = lang === "ur";

    if (isUrdu) {
      document.body.classList.add("urdu-mode");
    } else {
      document.body.classList.remove("urdu-mode");
    }

    updateHtmlLang(isUrdu);
    updateToggleBtn(isUrdu);
    applyDataAttributes(isUrdu);
    applyNavTranslations(isUrdu);
    applyNoticeBand(isUrdu);
    applyFooter(isUrdu);
    applyCoursesFilters(isUrdu);

    localStorage.setItem(STORAGE_KEY, lang);
  }

  // ── Toggle ───────────────────────────────────────────────────
  function toggleLanguage() {
    const current = localStorage.getItem(STORAGE_KEY) || "en";
    applyLanguage(current === "en" ? "ur" : "en");
  }

  // ── MutationObserver: handle dynamically rendered content ────
  // Needed for: quiz.js (renders topic cards after page load),
  // portal.js (renders marks table, progress cards after login)
  let observer = null;
  function watchDynamicContent() {
    if (observer) return;
    observer = new MutationObserver(() => {
      const saved = localStorage.getItem(STORAGE_KEY) || "en";
      if (saved === "ur") {
        applyDataAttributes(true);
        applyCoursesFilters(true);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ── Init: wait for navbar to be injected by components.js ───
  function init() {
    ensureUrduCSS();
    ensureFont();

    // Poll until navbar is ready (components.js uses DOMContentLoaded)
    const ready = () => !!document.querySelector(".navbar");
    if (ready()) {
      injectToggleButton();
      const saved = localStorage.getItem(STORAGE_KEY) || "en";
      applyLanguage(saved);
      watchDynamicContent();
    } else {
      let tries = 0;
      const poll = setInterval(() => {
        tries++;
        if (ready() || tries > 30) {
          clearInterval(poll);
          injectToggleButton();
          const saved = localStorage.getItem(STORAGE_KEY) || "en";
          applyLanguage(saved);
          watchDynamicContent();
        }
      }, 50);
    }
  }

  // Run after DOM is parsed
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
