// ============================================================
// SUFFAH OFFICIAL — Urdu Language Toggle JavaScript
// Switches all text (except form fields) between EN and UR
// Uses data-en / data-ur attribute system
// ============================================================

(function () {
  const STORAGE_KEY = 'suffah_lang';

  // ── Translation map: English → Urdu for dynamic content ──
  const NAV_TRANSLATIONS = {
    'Home':            'ہوم',
    'Courses':         'کورسز',
    'Seerah':          'سیرت',
    'Islamic Studies': 'اسلامی تعلیم',
    'Hadith':          'حدیث',
    'Teachers':        'اساتذہ',
    'Student Portal':  'اسٹوڈنٹ پورٹل',
    'Contact':         'رابطہ',
    'Enroll Now':      'ابھی داخلہ لیں',
    '📚 Courses':      '📚 کورسز',
    '🌟 Seerah':       '🌟 سیرت',
    '☪️ Islamic Studies': '☪️ اسلامی تعلیم',
    '📖 Hadith':       '📖 حدیث',
    '👨‍🏫 Teachers & About': '👨‍🏫 اساتذہ اور ہمارے بارے میں',
    '🎓 Student Portal': '🎓 اسٹوڈنٹ پورٹل',
    '📝 Admission':    '📝 داخلہ',
    '📞 Contact':      '📞 رابطہ',
    '🏠 Home':         '🏠 ہوم',
  };

  // ── Inject toggle button into navbar ──
  function injectToggleButton() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const btn = document.createElement('button');
    btn.className = 'lang-toggle-btn';
    btn.id = 'langToggleBtn';
    btn.title = 'Toggle Urdu / English';
    btn.innerHTML = `<span class="lang-icon">اردو</span><span class="lang-en-label">/ EN</span>`;
    btn.setAttribute('aria-label', 'Switch language');

    // Insert before hamburger (or at end)
    const hamburger = navbar.querySelector('.hamburger');
    if (hamburger) {
      navbar.insertBefore(btn, hamburger);
    } else {
      navbar.appendChild(btn);
    }

    btn.addEventListener('click', toggleLanguage);
  }

  // ── Apply language ──
  function applyLanguage(lang) {
    const isUrdu = lang === 'ur';
    const body   = document.body;
    const btn    = document.getElementById('langToggleBtn');

    if (isUrdu) {
      body.classList.add('urdu-mode');
      if (btn) {
        btn.classList.add('urdu-active');
        btn.innerHTML = `<span class="lang-icon">اردو</span><span class="lang-en-label"> ✓</span>`;
      }
    } else {
      body.classList.remove('urdu-mode');
      if (btn) {
        btn.classList.remove('urdu-active');
        btn.innerHTML = `<span class="lang-icon">اردو</span><span class="lang-en-label">/ EN</span>`;
      }
    }

    // Switch data-en / data-ur elements
    document.querySelectorAll('[data-en]').forEach(el => {
      el.style.display = isUrdu ? 'none' : '';
    });
    document.querySelectorAll('[data-ur]').forEach(el => {
      el.style.display = isUrdu ? (el.dataset.block === 'true' ? 'block' : 'inline') : 'none';
      if (isUrdu) {
        el.style.fontFamily = "'Noto Nastaliq Urdu', serif";
        el.style.direction  = 'rtl';
      }
    });

    // Translate nav links
    translateNavLinks(isUrdu);

    // Notice band
    translateNoticeBand(isUrdu);

    // Footer
    translateFooter(isUrdu);

    // Save preference
    localStorage.setItem(STORAGE_KEY, lang);
  }

  // ── Translate nav links ──
  function translateNavLinks(isUrdu) {
    document.querySelectorAll('.nav-links a, .mobile-nav a, .nav-brand-text span').forEach(el => {
      const original = el.getAttribute('data-original-text') || el.textContent.trim();
      if (!el.getAttribute('data-original-text')) {
        el.setAttribute('data-original-text', original);
      }
      if (isUrdu && NAV_TRANSLATIONS[original]) {
        el.textContent = NAV_TRANSLATIONS[original];
        el.style.fontFamily = "'Noto Nastaliq Urdu', serif";
        el.style.fontSize   = '1rem';
      } else {
        el.textContent = original;
        el.style.fontFamily = '';
        el.style.fontSize   = '';
      }
    });

    // Nav brand subtitle
    const brandSubs = document.querySelectorAll('.nav-brand-text span:last-child');
    brandSubs.forEach(el => {
      el.textContent = isUrdu ? 'اسلامی اکادمی' : 'Islamic Academy';
      el.style.fontFamily = isUrdu ? "'Noto Nastaliq Urdu', serif" : '';
    });
  }

  // ── Translate notice band ──
  function translateNoticeBand(isUrdu) {
    const band = document.querySelector('.notice-band');
    if (!band) return;
    if (!band.getAttribute('data-original-html')) {
      band.setAttribute('data-original-html', band.innerHTML);
    }
    if (isUrdu) {
      const base = band.querySelector('a') ? band.querySelector('a').getAttribute('href') : '#';
      band.innerHTML = `📚 نیا بیچ جلد شروع ہو رہا ہے — <a href="${base}" style="color:var(--gold-light);font-weight:600;">ابھی درخواست دیں</a> | 🌙 داخلہ 2025-26 کے لیے کھلا ہے`;
      band.style.fontFamily = "'Noto Nastaliq Urdu', serif";
      band.style.fontSize   = '0.95rem';
      band.style.direction  = 'rtl';
    } else {
      band.innerHTML = band.getAttribute('data-original-html');
      band.style.fontFamily = '';
      band.style.fontSize   = '';
      band.style.direction  = '';
    }
  }

  // ── Translate footer columns ──
  function translateFooter(isUrdu) {
    const footerCols = document.querySelectorAll('.footer-col h4');
    const urduHeadings = ['کورسز', 'فوری لنکس', 'رابطہ'];
    const enHeadings   = ['Courses', 'Quick Links', 'Contact'];
    footerCols.forEach((el, i) => {
      if (isUrdu && urduHeadings[i]) {
        el.textContent = urduHeadings[i];
        el.style.fontFamily = "'Noto Nastaliq Urdu', serif";
      } else if (!isUrdu && enHeadings[i]) {
        el.textContent = enHeadings[i];
        el.style.fontFamily = '';
      }
    });

    // Footer brand
    const brandEl = document.querySelector('.footer-brand p');
    if (brandEl) {
      if (!brandEl.getAttribute('data-original-text')) {
        brandEl.setAttribute('data-original-text', brandEl.textContent);
      }
      brandEl.textContent = isUrdu
        ? 'صحیح اسلامی تعلیم کے لیے ایک مخصوص پلیٹ فارم — قرآن، حدیث اور دین کے علم سے دلوں کو سنوارنا۔'
        : brandEl.getAttribute('data-original-text');
      brandEl.style.fontFamily  = isUrdu ? "'Noto Nastaliq Urdu', serif" : '';
      brandEl.style.direction   = isUrdu ? 'rtl' : '';
      brandEl.style.lineHeight  = isUrdu ? '2.2' : '';
    }
  }

  // ── Toggle ──
  function toggleLanguage() {
    const current = localStorage.getItem(STORAGE_KEY) || 'en';
    applyLanguage(current === 'en' ? 'ur' : 'en');
  }

  // ── Init on DOM ready ──
  function init() {
    injectToggleButton();
    const saved = localStorage.getItem(STORAGE_KEY) || 'en';
    applyLanguage(saved);
  }

  // Wait for components.js to finish injecting navbar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
  } else {
    setTimeout(init, 100);
  }

})();
