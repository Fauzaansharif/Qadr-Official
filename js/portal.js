// ============================================================
// SUFFAH OFFICIAL — Student Portal JavaScript
// Login, attendance calendar, marks, progress ring, tabs
// ============================================================

// ── Demo credentials ──
const DEMO_CREDENTIALS = { id: "STU001", pass: "suffah123" };

// ── Marks data ──
const MARKS_DATA = [
  {
    course: "Tajweed & Nazrah",
    test: "Quiz 1",
    score: 92,
    total: 100,
    grade: "A+",
  },
  {
    course: "Tajweed & Nazrah",
    test: "Mid-Term Exam",
    score: 85,
    total: 100,
    grade: "A",
  },
  {
    course: "Hadith Studies",
    test: "Quiz 1",
    score: 78,
    total: 100,
    grade: "B",
  },
  {
    course: "Hadith Studies",
    test: "Assignment",
    score: 88,
    total: 100,
    grade: "A",
  },
  {
    course: "Seerah",
    test: "Presentation",
    score: 90,
    total: 100,
    grade: "A+",
  },
  { course: "Seerah", test: "Written Test", score: 74, total: 100, grade: "B" },
  {
    course: "Islamic Studies",
    test: "Final Exam",
    score: 95,
    total: 100,
    grade: "A+",
  },
  { course: "Fiqh", test: "Quiz 1", score: 80, total: 100, grade: "A" },
];

// ── Progress data ──
const PROGRESS_DATA = [
  {
    icon: "📖",
    course: "Tajweed & Nazrah",
    pct: 75,
    color: "",
    milestones: 3,
    total: 4,
    items: ["Makhaarij", "Noon Saakin Rules", "Madd Rules", "Final Assessment"],
  },
  {
    icon: "📜",
    course: "Hadith Studies",
    pct: 60,
    color: "gold",
    milestones: 3,
    total: 5,
    items: [
      "Arbaeen Nawawi",
      "Riyad as-Salihin",
      "Bulugh al-Maram",
      "Sahih Bukhari",
      "Final Exam",
    ],
  },
  {
    icon: "🌟",
    course: "Seerah",
    pct: 80,
    color: "rust",
    milestones: 4,
    total: 5,
    items: [
      "Early Life",
      "Prophethood",
      "Hijrah",
      "Madinah Period",
      "Farewell Pilgrimage",
    ],
  },
  {
    icon: "☪️",
    course: "Islamic Studies",
    pct: 50,
    color: "navy",
    milestones: 2,
    total: 4,
    items: ["Aqeedah Basics", "Five Pillars", "Akhlaq", "Advanced Topics"],
  },
];

// ── Attendance data (status per day for current display month) ──
// 'P' = present, 'A' = absent, 'H' = holiday, '' = future/empty
const ATTENDANCE_MAP = {
  1: "P",
  2: "P",
  3: "H",
  4: "P",
  5: "A",
  6: "P",
  7: "P",
  8: "P",
  9: "P",
  10: "A",
  11: "P",
  12: "P",
  13: "H",
  14: "P",
  15: "P",
  16: "P",
  17: "A",
  18: "P",
  19: "P",
  20: "P",
  21: "P",
  22: "P",
  23: "P",
  24: "H",
  25: "P",
  26: "P",
  27: "P",
  28: "P",
  29: "P",
  30: "P",
  31: "P",
};

let displayYear = new Date().getFullYear();
let displayMonth = new Date().getMonth(); // 0-indexed

// ── Login ──
function doLogin() {
  const id = document.getElementById("loginId").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const err = document.getElementById("loginError");

  if (id === DEMO_CREDENTIALS.id && pass === DEMO_CREDENTIALS.pass) {
    err.classList.remove("show");
    document.getElementById("loginScreen").style.display = "none";
    const dash = document.getElementById("dashboard");
    dash.classList.add("active");
    initDashboard();
  } else {
    err.classList.add("show");
    document.getElementById("loginPass").value = "";
  }
}

// Allow Enter key on password field
document.addEventListener("DOMContentLoaded", () => {
  const passInput = document.getElementById("loginPass");
  if (passInput) {
    passInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doLogin();
    });
  }
  const idInput = document.getElementById("loginId");
  if (idInput) {
    idInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doLogin();
    });
  }
});

// ── Logout ──
function doLogout() {
  document.getElementById("dashboard").classList.remove("active");
  document.getElementById("loginScreen").style.display = "";
  document.getElementById("loginId").value = "";
  document.getElementById("loginPass").value = "";
}

// ── Init dashboard ──
function initDashboard() {
  renderTabs();
  renderMarksTable();
  renderProgressCards();
  renderCalendar();
  animateRing(65);
}

// ── Tabs ──
function renderTabs() {
  const tabs = document.querySelectorAll(".ptab");
  const panels = document.querySelectorAll(".portal-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const id = "panel-" + tab.dataset.panel;
      const panel = document.getElementById(id);
      if (panel) {
        panel.classList.add("active");
        if (tab.dataset.panel === "progress") animateRing(65);
        if (tab.dataset.panel === "attendance") renderCalendar();
      }
    });
  });
}

// ── Marks table ──
function renderMarksTable() {
  const tbody = document.getElementById("marksBody");
  if (!tbody) return;

  MARKS_DATA.forEach((row) => {
    const pct = Math.round((row.score / row.total) * 100);
    let fillClass = "";
    let gradeClass = "grade-a";
    if (pct >= 90) {
      gradeClass = "grade-a-plus";
    } else if (pct >= 75) {
      gradeClass = "grade-a";
    } else if (pct >= 60) {
      gradeClass = "grade-b";
      fillClass = "gold-fill";
    } else {
      gradeClass = "grade-c";
      fillClass = "red-fill";
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong style="color:var(--emerald-dark);font-size:0.88rem;">${row.course}</strong></td>
      <td>${row.test}</td>
      <td><strong style="color:var(--text-dark);">${row.score}</strong></td>
      <td style="color:var(--text-muted);">${row.total}</td>
      <td>
        <div class="score-bar">
          <div class="score-track">
            <div class="score-fill ${fillClass}" style="width:${pct}%"></div>
          </div>
          <span style="font-size:0.75rem;color:var(--text-muted);min-width:32px;">${pct}%</span>
        </div>
      </td>
      <td><span class="grade-badge ${gradeClass}">${row.grade}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Progress cards ──
function renderProgressCards() {
  const grid = document.getElementById("progressGrid");
  if (!grid) return;

  PROGRESS_DATA.forEach((d) => {
    const doneMilestones = Math.round((d.pct / 100) * d.total);
    const milestonesHtml = Array.from(
      { length: d.total },
      (_, i) =>
        `<div class="milestone ${i < doneMilestones ? "done" : ""}"></div>`,
    ).join("");

    const itemsHtml = d.items
      .map((item, i) => {
        const isDone = i < doneMilestones - 1;
        const isGoing = i === doneMilestones - 1;
        const label =
          isDone ? '<span class="status-done">✓ Done</span>'
          : isGoing ? '<span class="status-going">⟳ In Progress</span>'
          : '<span class="status-todo">○ Upcoming</span>';
        return `<div class="progress-detail-item"><span>${item}</span>${label}</div>`;
      })
      .join("");

    const card = document.createElement("div");
    card.className = "progress-card";
    card.innerHTML = `
      <div class="progress-card-header">
        <div class="progress-card-title">
          <div class="pc-icon">${d.icon}</div>
          <div>
            <h4>${d.course}</h4>
            <p>${d.total} modules total</p>
          </div>
        </div>
        <span class="progress-pct-badge">${d.pct}%</span>
      </div>
      <div class="prog-bar-track">
        <div class="prog-bar-fill ${d.color}" data-pct="${d.pct}" style="width:0%"></div>
      </div>
      <div class="progress-milestones">${milestonesHtml}</div>
      <div class="progress-detail-list">${itemsHtml}</div>
    `;
    grid.appendChild(card);
  });

  // Animate bars after render
  setTimeout(() => {
    document.querySelectorAll(".prog-bar-fill").forEach((bar) => {
      bar.style.width = bar.dataset.pct + "%";
    });
  }, 200);
}

// ── Progress ring ──
function animateRing(pct) {
  const ring = document.getElementById("ringFill");
  if (!ring) return;
  const circumference = 2 * Math.PI * 45; // r=45
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => {
    ring.style.strokeDashoffset = offset;
  }, 200);
}

// ── Attendance calendar ──
function renderCalendar() {
  const grid = document.getElementById("calGrid");
  const label = document.getElementById("calMonthLabel");
  if (!grid || !label) return;

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
  label.textContent = months[displayMonth] + " " + displayYear;

  const today = new Date();
  const firstDay = new Date(displayYear, displayMonth, 1).getDay();
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

  grid.innerHTML = "";

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement("div");
    cell.className = "att-cell empty";
    grid.appendChild(cell);
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    const isToday =
      d === today.getDate() &&
      displayMonth === today.getMonth() &&
      displayYear === today.getFullYear();
    const isFuture = new Date(displayYear, displayMonth, d) > today;
    const status = ATTENDANCE_MAP[d];

    let cls = "att-cell ";
    if (isToday) cls += "today";
    else if (isFuture) cls += "future";
    else if (status === "P") cls += "present";
    else if (status === "A") cls += "absent";
    else if (status === "H") cls += "holiday";
    else cls += "future";

    cell.className = cls;
    cell.textContent = d;
    grid.appendChild(cell);
  }

  // Update summary
  let present = 0,
    absent = 0;
  const now = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(displayYear, displayMonth, d);
    if (date > now) continue;
    const s = ATTENDANCE_MAP[d];
    if (s === "P") present++;
    else if (s === "A") absent++;
  }
  const total = present + absent;
  const pctEl = document.getElementById("attPct");
  const presEl = document.getElementById("attPresent");
  const absEl = document.getElementById("attAbsent");
  if (pctEl)
    pctEl.textContent = total ? Math.round((present / total) * 100) + "%" : "—";
  if (presEl) presEl.textContent = present;
  if (absEl) absEl.textContent = absent;
}

// ── Month navigation ──
document.addEventListener("DOMContentLoaded", () => {
  const prev = document.getElementById("prevMonth");
  const next = document.getElementById("nextMonth");
  if (prev)
    prev.addEventListener("click", () => {
      displayMonth--;
      if (displayMonth < 0) {
        displayMonth = 11;
        displayYear--;
      }
      renderCalendar();
    });
  if (next)
    next.addEventListener("click", () => {
      displayMonth++;
      if (displayMonth > 11) {
        displayMonth = 0;
        displayYear++;
      }
      renderCalendar();
    });
});
