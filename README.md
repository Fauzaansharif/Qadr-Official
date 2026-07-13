# Qadr Academy — Islamic E-Learning Academy

> **"طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ"**
> _"Seeking knowledge is an obligation upon every Muslim."_

A fully responsive, multi-page Islamic educational website offering structured online learning in Quran, Hadith, Fiqh, Seerah and Islamic Studies — in both **Urdu** and **English**.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

### 🎓 Educational

- **Nazrah Quran with Tajweed** — structured recitation course
- **Hifz-ul-Quran** — memorization program with experienced Huffaz
- **Hadith Studies** — from Arba'een An-Nawawi to Kutub as-Sittah
- **Fiqh** — Islamic jurisprudence covering daily worship and rulings
- **Seerah** — chronological life of Prophet Muhammad ﷺ with interactive timeline
- **Islamic Studies** — Aqeedah, morals, du'as, and pillars of Islam

### 🖥️ Technical

- ✅ Fully **responsive** — desktop, tablet, mobile (360px → 1440px+)
- ✅ **Urdu / English toggle** — full RTL layout switch with Nastaliq font
- ✅ **Student Portal** — login, attendance calendar, marks table, progress tracking ring
- ✅ **Islamic Quiz system** — 6 topics × 10 questions, MCQ + True/False, 30s timer
- ✅ **Course search & filter** — real-time keyword search + category filter
- ✅ **WhatsApp channel widget** — floating button linking to official channel
- ✅ **YouTube integration** — channel card + embedded video lectures
- ✅ **Islamic geometric SVG patterns** — pure CSS, no image files
- ✅ **Shared navbar/footer** — injected via `components.js` across all pages
- ✅ **Zero frameworks** — pure HTML, CSS, JavaScript only
- ✅ **No dependencies** — no npm, no build step, open `index.html` and it works

---

## 📁 Project Structure

```
Qadr-Official/
│
├── index.html                  ← Home / Landing page
│
├── assets/
│   ├── logo.png                ← Academy logo
│   ├── logo.svg                ← Logo (vector)
│   ├── tj.jpeg                 ← Teacher photo (Ustad Samiullah)
│   ├── banner.png              ← Hero banner
│   ├── banner1.jpg             ← Banner variant
│   └── banner2.jpg             ← Banner variant
│
├── css/
│   ├── style.css               ← Main styles + responsive breakpoints
│   ├── theme.css               ← Forest Green & Gold colour palette override
│   ├── urdu.css                ← RTL layout, Noto Nastaliq Urdu font, Urdu mode
│   ├── portal.css              ← Student portal — login, dashboard, attendance
│   └── quiz.css                ← Quiz system — topic cards, options, results
│
├── js/
│   ├── components.js           ← Shared navbar + footer (injected on every page)
│   ├── main.js                 ← Scroll reveal, counters, hamburger, form toasts
│   ├── urdu.js                 ← Language toggle logic (EN ↔ UR)
│   ├── whatsapp.js             ← WhatsApp channel floating widget
│   ├── portal.js               ← Portal: login, attendance calendar, marks, progress ring
│   └── quiz.js                 ← Quiz: 6 topics, 60 questions, timer, scoring, breakdown
│
└── pages/
    ├── courses.html            ← All 8 courses with search & category filter
    ├── seerah.html             ← Seerah with interactive chronological timeline
    ├── hadith.html             ← Hadith studies + Kutub as-Sittah overview
    ├── islamic-studies.html    ← Aqeedah, 3-level course structure
    ├── teachers.html           ← Teacher profiles + About Us
    ├── admission.html          ← Full online enrollment form
    ├── contact.html            ← Contact form + FAQ
    ├── student-portal.html     ← Login → Dashboard (attendance, marks, progress)
    └── quiz.html               ← 6-topic Islamic knowledge quiz
```

---

## 🚀 Getting Started

No installation required. No build step. No dependencies.

### Run locally

```bash
git clone https://github.com/Fauzaansharif/Qadr-Official.git
cd Qadr-Official
# Open index.html in your browser
```

Or use VS Code Live Server:

1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Deploy to GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `root`
4. Save — your site will be live at `https://fauzaansharif.github.io/Qadr-Official/`

### Deploy to Netlify

1. Drag and drop the project folder at [netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo for automatic deploys on push

---

## ✏️ How to Update Content

### Add a YouTube video

In `index.html`, find the comment `<!-- OPTION A -->` and replace the placeholder div:

```html
<!-- Replace this: -->
<div class="yt-video-placeholder">...</div>

<!-- With this: -->
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="Video Title"
  allowfullscreen
  loading="lazy"
></iframe>
```

### Add a teacher

In `pages/teachers.html`, duplicate a `.teacher-card` block and fill in:

- Name in `<h3>`
- Role in `.teacher-role`
- Qualifications in `.qual-badge` spans
- Bio in `.teacher-bio` paragraph
- Photo: `<img src="../assets/photo.jpg" alt="Name">` inside `.teacher-avatar`
- Courses in `.tc-tag` spans

### Update nav links

In `js/components.js`, edit the `NAV_LINKS` array at the top of the file.

### Update contact details

In `js/components.js`, scroll to the **footer** section and update the `<li>` items directly.

### Update colour theme

All colours are CSS variables in `css/theme.css` under `:root { }`. Change `--emerald` and `--gold` values to restyle the entire site instantly.

---

## 🔐 Student Portal (Demo)

| Field      | Value       |
| ---------- | ----------- |
| Student ID | `STU001`    |
| Password   | `suffah123` |

> ⚠️ This is a frontend demo. No backend or real authentication is connected yet.

---

## 📞 Contact

|                     |                                                                             |
| ------------------- | --------------------------------------------------------------------------- |
| 📧 Email            | [Qadracademy123@gmail.com](mailto:Qadracademy123@gmail.com)                 |
| 📞 Phone / WhatsApp | +91 76667 74850                                                             |
| 📍 Location         | Mumbai, India                                                               |
| ▶ YouTube           | [@Qadracademy123](https://www.youtube.com/@Qadracademy123)                  |
| 💬 WhatsApp Channel | [Follow on WhatsApp](https://whatsapp.com/channel/0029Va9pQeP2kNFswJG9WW2a) |

---

## 🗺️ Roadmap

### Phase 2 — Backend & Auth

- [ ] Real student login with database
- [ ] Admin panel (manage students, teachers, courses)
- [ ] Live class scheduling system
- [ ] Online fee payment integration

### Phase 3 — LMS Features

- [ ] Assignment submission system
- [ ] Certificate generation (PDF)
- [ ] Live online classes (Zoom/Google Meet integration)
- [ ] Push notifications for class reminders

### Phase 4 — Scale

- [ ] Multi-language support (Arabic, Hindi, Bengali)
- [ ] Mobile app (React Native)
- [ ] AI-powered Tajweed pronunciation checker
- [ ] Parent dashboard for tracking children's progress

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add: your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

**جَزَاكُمُ اللَّهُ خَيْرًا**

_May Allah reward you with good._

Made with ❤️ for the Muslim Ummah

</div>
