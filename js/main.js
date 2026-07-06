// ============================================================
// SUFFAH OFFICIAL — Main JavaScript
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ── Hamburger Menu ──
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      const spans = hamburger.querySelectorAll("span");
      if (mobileNav.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translateY(7px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translateY(-7px)";
      } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
      }
    });
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove("open");
        hamburger.querySelectorAll("span").forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "";
        });
      }
    });
  }

  // ── Active Nav Link ──
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // ── Progress Bar Animation ──
  const bars = document.querySelectorAll(".progress-bar-fill");
  if (bars.length) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pct = entry.target.dataset.pct || "0";
            entry.target.style.width = pct + "%";
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    bars.forEach((b) => {
      b.style.width = "0%";
      barObserver.observe(b);
    });
  }

  // ── Counter Animation (hero stats) ──
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            const suffix = el.dataset.suffix || "";
            let current = 0;
            const step = Math.ceil(target / 60);
            const timer = setInterval(() => {
              current = Math.min(current + step, target);
              el.textContent = current + suffix;
              if (current >= target) clearInterval(timer);
            }, 20);
            countObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((c) => countObserver.observe(c));
  }

  // ── Portal Tabs ──
  const portalTabs = document.querySelectorAll(".portal-tab");
  const portalPanels = document.querySelectorAll(".portal-panel");
  if (portalTabs.length) {
    portalTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        portalTabs.forEach((t) => t.classList.remove("active"));
        portalPanels.forEach((p) => (p.style.display = "none"));
        tab.classList.add("active");
        const target = document.getElementById(tab.dataset.tab);
        if (target) target.style.display = "block";
      });
    });
    // Show first tab by default
    if (portalPanels.length) portalPanels[0].style.display = "block";
  }

  // ── Form Submission ──
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (!btn) return;
      const originalText = btn.textContent;
      btn.textContent = "✅ Submitted!";
      btn.disabled = true;
      btn.style.background = "#27ae60";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = "";
        form.reset();
        showToast(
          "Your request has been submitted. We will contact you shortly. جزاكم الله خيراً",
        );
      }, 2000);
    });
  });

  // ── Toast ──
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.style.cssText = `
      position:fixed; bottom:2rem; right:2rem; z-index:9999;
      background:#134D35; color:#fff; padding:1rem 1.5rem;
      border-radius:10px; font-size:0.88rem; max-width:320px;
      box-shadow:0 8px 24px rgba(0,0,0,0.25);
      animation: fadeUp 0.4s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  // ── Navbar scroll shadow ──
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.style.boxShadow =
        window.scrollY > 20 ?
          "0 4px 20px rgba(27,107,74,0.15)"
        : "0 2px 8px rgba(27,107,74,0.10)";
    });
  }

  // ── Course filter (courses page) ──
  const filterBtns = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll("[data-category]");
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        courseCards.forEach((card) => {
          const show = cat === "all" || card.dataset.category === cat;
          card.style.display = show ? "" : "none";
          if (show) {
            card.style.animation = "fadeUp 0.4s ease both";
          }
        });
      });
    });
  }

  // ── Attendance calendar month label ──
  const monthLabel = document.querySelector(".att-month-label");
  if (monthLabel) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    monthLabel.textContent =
      months[new Date().getMonth()] + " " + new Date().getFullYear();
  }
});
