// ============================================================
// SUFFAH OFFICIAL — Shared Components
// Injects: notice band, navbar (with dropdown), footer
//
// HOW TO UPDATE NAV LINKS:
//   Edit the navLinks array below. Each item has:
//     { label, href } for plain links
//     { label, children: [{label, href, icon}] } for dropdowns
//
// HOW TO UPDATE FOOTER:
//   Scroll to the footer section below and edit directly.
// ============================================================

(function () {
  const isPages = location.pathname.includes("/pages/");
  const base = isPages ? "../" : "";

  // ── Utility: resolve path ──
  const p = (path) => base + path;

  // ─────────────────────────────────────────────
  // NAV LINKS CONFIGURATION
  // Add, remove or reorder links here.
  // ─────────────────────────────────────────────
  const NAV_LINKS = [
    { label: "Home", href: p("index.html") },
    { label: "Courses", href: p("pages/courses.html") },
    {
      label: "Islamic Sciences",
      children: [
        { icon: "🌟", label: "Seerah", href: p("pages/seerah.html") },
        { icon: "📜", label: "Hadith", href: p("pages/hadith.html") },
        {
          icon: "☪️",
          label: "Islamic Studies",
          href: p("pages/islamic-studies.html"),
        },
      ],
    },
    { label: "Teachers", href: p("pages/teachers.html") },
    { label: "Quiz", href: p("pages/quiz.html") },
    { label: "Portal", href: p("pages/student-portal.html") },
    { label: "Contact", href: p("pages/contact.html") },
  ];

  // ─────────────────────────────────────────────
  // MOBILE NAV LINKS (flat list — no dropdowns)
  // ─────────────────────────────────────────────
  const MOBILE_LINKS = [
    { icon: "🏠", label: "Home", href: p("index.html") },
    { icon: "📚", label: "Courses", href: p("pages/courses.html") },
    { icon: "🌟", label: "Seerah", href: p("pages/seerah.html") },
    { icon: "📜", label: "Hadith", href: p("pages/hadith.html") },
    {
      icon: "☪️",
      label: "Islamic Studies",
      href: p("pages/islamic-studies.html"),
    },
    { icon: "👨‍🏫", label: "Teachers", href: p("pages/teachers.html") },
    { icon: "🧠", label: "Quiz", href: p("pages/quiz.html") },
    {
      icon: "🎓",
      label: "Student Portal",
      href: p("pages/student-portal.html"),
    },
    { icon: "📝", label: "Admission", href: p("pages/admission.html") },
    { icon: "📞", label: "Contact", href: p("pages/contact.html") },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    // ── 1. NOTICE BAND ──
    // TO UPDATE: change the text between the backticks below
    const band = document.createElement("div");
    band.className = "notice-band";
    band.innerHTML = `📚 New Batch Starting Soon — <a href="${p("pages/admission.html")}">Apply Now</a> | 🌙 Admissions Open for 2025-26`;
    document.body.prepend(band);

    // ── 2. NAVBAR ──
    const navbar = document.createElement("nav");
    navbar.className = "navbar";

    // Build nav links HTML
    let linksHtml = "";
    NAV_LINKS.forEach((item) => {
      if (item.children) {
        // Dropdown
        const dropItems = item.children
          .map(
            (c) =>
              `<a href="${c.href}">${c.icon ? c.icon + " " : ""}${c.label}</a>`,
          )
          .join("");
        linksHtml += `
          <div class="nav-dropdown">
            <button class="nav-drop-btn">
              ${item.label} <span class="nav-drop-arrow">▼</span>
            </button>
            <div class="nav-drop-menu">${dropItems}</div>
          </div>`;
      } else {
        linksHtml += `<a href="${item.href}">${item.label}</a>`;
      }
    });

    navbar.innerHTML = `
      <a href="${p("index.html")}" class="nav-brand">
        <img src="${p("assets/logo.png")}" alt="Suffah Official Logo"
             onerror="this.style.display='none'">
        <div class="nav-brand-text">
          <span>Suffah Official</span>
          <span>E-Learning Academy</span>
        </div>
      </a>
      <div class="nav-links">${linksHtml}</div>
      <a href="${p("pages/admission.html")}" class="btn btn-primary nav-cta">Enroll Now</a>
      <div class="hamburger"><span></span><span></span><span></span></div>
    `;
    document.body.prepend(navbar);

    // ── 3. MOBILE NAV ──
    const mobileNav = document.createElement("div");
    mobileNav.className = "mobile-nav";
    mobileNav.innerHTML = MOBILE_LINKS.map(
      (l) => `<a href="${l.href}">${l.icon} ${l.label}</a>`,
    ).join("");
    navbar.after(mobileNav);

    // ── 4. FOOTER ──
    // TO UPDATE FOOTER CONTENT: edit the strings below directly.
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
      <div class="footer-grid">

        <div class="footer-brand">
          <img src="${p("/suffah/assets/logo.png")}" alt="Suffah Logo"
               onerror="this.style.display='none'">
          <h3>Suffah Official</h3>
          <span class="footer-arabic">الصُّفَّة الرَّسْمِيَّة</span>
          <p>
            <!-- TO UPDATE: Replace this description with your academy's mission -->
            A dedicated platform for authentic Islamic education — nurturing hearts with
            Quran, Hadith, and timeless knowledge of Deen.
          </p>
        </div>

        <div class="footer-col">
          <h4>Courses</h4>
          <ul>
            <!-- TO UPDATE: Add or remove course links as needed -->
            <li><a href="${p("pages/courses.html")}">Nazrah Quran</a></li>
            <li><a href="${p("pages/courses.html")}">Hifz-ul-Quran</a></li>
            <li><a href="${p("pages/hadith.html")}">Hadith Studies</a></li>
            <li><a href="${p("pages/courses.html")}">Fiqh</a></li>
            <li><a href="${p("pages/seerah.html")}">Seerah</a></li>
            <li><a href="${p("pages/islamic-studies.html")}">Islamic Studies</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="${p("pages/teachers.html")}">Our Teachers</a></li>
            <li><a href="${p("pages/admission.html")}">Admission Form</a></li>
            <li><a href="${p("pages/quiz.html")}">Islamic Quiz</a></li>
            <li><a href="${p("pages/student-portal.html")}">Student Portal</a></li>
            <li><a href="${p("pages/contact.html")}">Contact Us</a></li>
            <li><a href="${p("pages/teachers.html")}#about">About Us</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Connect With Us</h4>
          <ul>
            <!-- TO UPDATE: Replace with your actual contact details -->
            <li><a href="mailto:suffahofficial@gmail.com">📧 suffahofficial@gmail.com</a></li>
            <li><a href="tel:+917666774850">📞 +91 76667 74850</a></li>
            <li><a href="https://www.youtube.com/@suffahofficial" target="_blank">▶ YouTube — Suffah Official</a></li>
            <li><a href="https://whatsapp.com/channel/0029Va9pQeP2kNFswJG9WW2a" target="_blank">💬 WhatsApp Channel</a></li>
            <li><a href="#">📍 Powai, Mumbai, India</a></li>
          </ul>
        </div>

      </div>
      <div class="footer-bottom">
        <span>© 2026 Suffah Official E-Learning Academy. All rights reserved.</span>
        <span style="font-family:'Scheherazade New',serif;font-size:1rem;color:rgba(255,255,255,0.3);">
          وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
        </span>
      </div>
    `;
    document.body.appendChild(footer);

    // ── 5. ACTIVE LINK HIGHLIGHT ──
    const currentPage = location.pathname.split("/").pop() || "index.html";
    document
      .querySelectorAll(".nav-links a, .mobile-nav a, .nav-drop-menu a")
      .forEach((a) => {
        if (
          a.getAttribute("href") &&
          a.getAttribute("href").endsWith(currentPage)
        ) {
          a.classList.add("active");
          // Also mark parent dropdown button active
          const dropMenu = a.closest(".nav-drop-menu");
          if (dropMenu) {
            const btn = dropMenu.previousElementSibling;
            if (btn) btn.classList.add("active");
          }
        }
      });
  });
})();
