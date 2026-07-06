// ============================================================
// SUFFAH OFFICIAL — Shared Components (navbar + footer)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const base = location.pathname.includes("/pages/") ? "../" : "";

  // ── NOTICE BAND ──
  const noticeBand = document.createElement("div");
  noticeBand.className = "notice-band";
  noticeBand.innerHTML = `📚 New Batch Starting Soon — <a href="${base}pages/admission.html">Apply Now</a> | 🌙 Admissions Open for 2025-26`;
  document.body.prepend(noticeBand);

  // ── NAVBAR ──
  const navbar = document.createElement("nav");
  navbar.className = "navbar";
  navbar.innerHTML = `
    <a href="${base}index.html" class="nav-brand">
      <img src="${base}assets/logo.png" alt="Suffah Official Logo" onerror="this.style.display='none'">
      <div class="nav-brand-text">
        <span>Suffah Official</span>
        <span>Islamic Academy</span>
      </div>
    </a>
    <div class="nav-links">
      <a href="${base}index.html" data-en="Home" data-ur="ہوم">Home</a>
      <a href="${base}pages/courses.html" data-en="Courses" data-ur="کورسز">Courses</a>
      <a href="${base}pages/seerah.html" data-en="Seerah" data-ur="سیرت">Seerah</a>
      <a href="${base}pages/islamic-studies.html" data-en="Islamic Studies" data-ur="اسلامی تعلیم">Islamic Studies</a>
      <a href="${base}pages/hadith.html" data-en="Hadith" data-ur="حدیث">Hadith</a>
      <a href="${base}pages/teachers.html" data-en="Teachers" data-ur="اساتذہ">Teachers</a>
      <a href="${base}pages/quiz.html" data-en="Quiz" data-ur="کوئز">Quiz</a>
      <a href="${base}pages/student-portal.html" data-en="Portal" data-ur="پورٹل">Portal</a>
      <a href="${base}pages/contact.html" data-en="Contact" data-ur="رابطہ">Contact</a>
    </div>
    <a href="${base}pages/admission.html" class="btn btn-primary nav-cta" style="font-size:0.82rem;padding:9px 20px;" data-en="Enroll Now" data-ur="ابھی داخلہ لیں">Enroll Now</a>
    <div class="hamburger"><span></span><span></span><span></span></div>
  `;
  document.body.prepend(navbar);

  // ── MOBILE NAV ──
  const mobileNav = document.createElement("div");
  mobileNav.className = "mobile-nav";
  mobileNav.innerHTML = `
    <a href="${base}index.html">🏠 <span data-en="Home" data-ur="ہوم">Home</span></a>
    <a href="${base}pages/courses.html">📚 <span data-en="Courses" data-ur="کورسز">Courses</span></a>
    <a href="${base}pages/seerah.html">🌟 <span data-en="Seerah" data-ur="سیرت">Seerah</span></a>
    <a href="${base}pages/islamic-studies.html">☪️ <span data-en="Islamic Studies" data-ur="اسلامی تعلیم">Islamic Studies</span></a>
    <a href="${base}pages/hadith.html">📖 <span data-en="Hadith" data-ur="حدیث">Hadith</span></a>
    <a href="${base}pages/teachers.html">👨‍🏫 <span data-en="Teachers & About" data-ur="اساتذہ اور ہمارے بارے میں">Teachers & About</span></a>
    <a href="${base}pages/quiz.html">🧠 <span data-en="Islamic Quiz" data-ur="اسلامی کوئز">Islamic Quiz</span></a>
    <a href="${base}pages/student-portal.html">🎓 <span data-en="Student Portal" data-ur="اسٹوڈنٹ پورٹل">Student Portal</span></a>
    <a href="${base}pages/admission.html">📝 <span data-en="Admission" data-ur="داخلہ">Admission</span></a>
    <a href="${base}pages/contact.html">📞 <span data-en="Contact" data-ur="رابطہ">Contact</span></a>
  `;
  navbar.after(mobileNav);

  // ── FOOTER ──
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="${base}assets/logo.png" alt="Suffah Logo" onerror="this.style.display='none'">
        <h3>Suffah Official</h3>
        <span class="footer-arabic">الصُّفَّة الرَّسْمِيَّة</span>
        <p>A dedicated platform for authentic Islamic education — nurturing hearts with Quran, Hadith, and timeless knowledge of Deen.</p>
      </div>
      <div class="footer-col">
        <h4>Courses</h4>
        <ul>
          <li><a href="${base}pages/courses.html">Nazrah Quran</a></li>
          <li><a href="${base}pages/courses.html">Hifz-ul-Quran</a></li>
          <li><a href="${base}pages/hadith.html">Hadith Studies</a></li>
          <li><a href="${base}pages/courses.html">Fiqh</a></li>
          <li><a href="${base}pages/seerah.html">Seerah</a></li>
          <li><a href="${base}pages/islamic-studies.html">Islamic Studies</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="${base}pages/teachers.html">Our Teachers</a></li>
          <li><a href="${base}pages/admission.html">Admission Form</a></li>
          <li><a href="${base}pages/quiz.html">Islamic Quiz</a></li>
          <li><a href="${base}pages/student-portal.html">Student Portal</a></li>
          <li><a href="${base}pages/contact.html">Contact Us</a></li>
          <li><a href="${base}pages/teachers.html#about">About Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:suffahofficial@gmail.com">📧 suffahofficial@gmail.com</a></li>
          <li><a href="tel:+917666774850">📞 +91 76667 74850</a></li>
          <li><a href="#">📍 Mumbai India (Online)</a></li>
          <li><a href="#">🕐 7AM–10PM IST</a></li>
        </ul>
        <div class="social-links" style="margin-top:1.2rem">
          <a class="social-link" href="https://www.youtube.com/@suffahofficial" title="YouTube">▶</a>
          <a class="social-link" href="" title="WhatsApp">💬</a>
          <a class="social-link" href="#" title="Facebook">f</a>
          <a class="social-link" href="#" title="Instagram">◉</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Suffah Official Islamic Academy. All rights reserved.</span>
      <span style="font-family:'Scheherazade New',serif;font-size:1rem;color:rgba(255,255,255,0.35);">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ</span>
    </div>
  `;
  document.body.appendChild(footer);

  // ── Active nav link ──
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (
      href.endsWith(currentPage) ||
      (currentPage === "" && href.includes("index.html"))
    ) {
      a.classList.add("active");
    }
  });
});
