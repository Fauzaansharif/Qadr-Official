// ============================================================
// SUFFAH OFFICIAL — Quiz System JavaScript
// MCQ + True/False, timer, scoring, results breakdown
// ============================================================

// ── Quiz Data Bank ──
const QUIZ_TOPICS = [
  {
    id: "quran",
    icon: "📖",
    name: "Quran & Tajweed",
    difficulty: "medium",
    difficultyLabel: "Intermediate",
    questions: [
      {
        type: "mcq",
        q: "How many Surahs (chapters) are in the Holy Quran?",
        options: ["110", "112", "114", "116"],
        answer: 2,
        explanation:
          "The Holy Quran contains exactly 114 Surahs, from Surah Al-Fatiha to Surah An-Nas.",
      },
      {
        type: "tf",
        q: "Surah Al-Baqarah is the longest Surah in the Quran.",
        answer: true,
        explanation:
          "Correct! Surah Al-Baqarah has 286 ayat, making it the longest Surah in the Quran.",
      },
      {
        type: "mcq",
        q: 'Which Surah is known as the "Heart of the Quran"?',
        options: [
          "Surah Al-Fatiha",
          "Surah Yasin",
          "Surah Al-Ikhlas",
          "Surah Al-Baqarah",
        ],
        answer: 1,
        explanation:
          "Surah Yasin is known as the heart of the Quran, as mentioned in a Hadith of the Prophet ﷺ.",
      },
      {
        type: "tf",
        q: "Tajweed means to recite the Quran slowly without any specific rules.",
        answer: false,
        explanation:
          "Incorrect. Tajweed refers to the set of rules governing pronunciation and recitation of the Quran correctly, including Makhaarij (articulation points).",
      },
      {
        type: "mcq",
        q: 'What is the meaning of "Makhaarij al-Huruf" in Tajweed?',
        options: [
          "Rules of stopping",
          "Points of articulation of letters",
          "Types of elongation",
          "Rules of noon saakin",
        ],
        answer: 1,
        explanation:
          "Makhaarij al-Huruf refers to the precise points in the mouth and throat from which each Arabic letter is produced.",
      },
      {
        type: "mcq",
        q: "Which Surah begins without Bismillah?",
        options: [
          "Surah Al-Anfal",
          "Surah At-Tawbah",
          "Surah Al-Naml",
          "Surah Al-Fath",
        ],
        answer: 1,
        explanation:
          "Surah At-Tawbah (chapter 9) is the only Surah that does not begin with Bismillah.",
      },
      {
        type: "tf",
        q: "Surah Al-Fatiha is recited in every unit (Rak'ah) of Salah.",
        answer: true,
        explanation:
          "Correct. Reciting Surah Al-Fatiha in every Rak'ah is obligatory (wajib) according to the Prophet's ﷺ instruction.",
      },
      {
        type: "mcq",
        q: 'What does "Idgham" mean in Tajweed?',
        options: [
          "Hiding",
          "Merging/assimilation",
          "Clear pronunciation",
          "Conversion",
        ],
        answer: 1,
        explanation:
          "Idgham means merging or assimilation — when a Noon Saakin or Tanween merges into a following letter.",
      },
      {
        type: "mcq",
        q: "The first revelation of the Quran was which Surah?",
        options: [
          "Surah Al-Fatiha",
          "Surah Al-Baqarah",
          "Surah Al-Alaq",
          "Surah Al-Muzammil",
        ],
        answer: 2,
        explanation:
          'The first verses revealed were the beginning of Surah Al-Alaq (96:1-5): "Iqra bismi rabbika alladhi khalaq."',
      },
      {
        type: "tf",
        q: "The Quran was compiled into a single book (Mushaf) during the Caliphate of Umar ibn al-Khattab RA.",
        answer: false,
        explanation:
          "Incorrect. The Quran was first compiled into a single Mushaf during the Caliphate of Abu Bakr as-Siddiq RA, and later standardised by Uthman ibn Affan RA.",
      },
    ],
  },
  {
    id: "hadith",
    icon: "📜",
    name: "Hadith Studies",
    difficulty: "medium",
    difficultyLabel: "Intermediate",
    questions: [
      {
        type: "mcq",
        q: "Who is the author of Sahih al-Bukhari?",
        options: [
          "Imam Muslim",
          "Imam al-Bukhari",
          "Imam at-Tirmidhi",
          "Imam Malik",
        ],
        answer: 1,
        explanation:
          "Imam Muhammad ibn Ismail al-Bukhari compiled Sahih al-Bukhari, considered the most authentic collection of Hadith.",
      },
      {
        type: "tf",
        q: "The first Hadith in Sahih al-Bukhari is about the importance of intentions (Niyyah).",
        answer: true,
        explanation:
          'Correct! The first Hadith in Bukhari is "Innamal A\'malu bin-Niyyat" — "Actions are by intentions," narrated by Umar ibn al-Khattab RA.',
      },
      {
        type: "mcq",
        q: 'What are the "Kutub as-Sittah"?',
        options: [
          "Six books of Fiqh",
          "The six most authentic Hadith collections",
          "Six Surahs of the Quran",
          "Six pillars of Iman",
        ],
        answer: 1,
        explanation:
          "Kutub as-Sittah refers to the six major collections: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, and Ibn Majah.",
      },
      {
        type: "tf",
        q: 'A Hadith "Da\'if" (weak) can be used as evidence for Islamic rulings.',
        answer: false,
        explanation:
          "A Da'if (weak) Hadith cannot be used as evidence for binding Islamic rulings according to the majority of scholars.",
      },
      {
        type: "mcq",
        q: 'What is "Isnad" in Hadith terminology?',
        options: [
          "The text of the Hadith",
          "The chain of narrators",
          "The topic of the Hadith",
          "The grade of the Hadith",
        ],
        answer: 1,
        explanation:
          "Isnad is the chain of narrators through whom the Hadith is transmitted from the Prophet ﷺ to the compiler.",
      },
      {
        type: "mcq",
        q: 'The famous Hadith "The Muslim is the one from whose tongue and hand the Muslims are safe" is from:',
        options: [
          "Sahih Muslim",
          "Sahih al-Bukhari",
          "Sunan Abu Dawud",
          "Jami at-Tirmidhi",
        ],
        answer: 1,
        explanation:
          "This Hadith was narrated by Abdullah ibn Amr RA and is recorded in Sahih al-Bukhari (Hadith #10).",
      },
      {
        type: "tf",
        q: "Arba'een An-Nawawi contains 40 Hadith.",
        answer: true,
        explanation:
          "Arba'een (meaning forty) An-Nawawi is a famous collection of 42 essential Hadith compiled by Imam An-Nawawi.",
      },
      {
        type: "mcq",
        q: '"Seeking knowledge is an obligation upon every Muslim." This Hadith is from which collection?',
        options: [
          "Sahih al-Bukhari",
          "Sahih Muslim",
          "Sunan Ibn Majah",
          "Muwatta Imam Malik",
        ],
        answer: 2,
        explanation:
          'This Hadith "Talabal ilmi faridatun ala kulli Muslim" is recorded in Sunan Ibn Majah (Hadith #224).',
      },
      {
        type: "mcq",
        q: 'What does "Sahih" mean in Hadith classification?',
        options: ["Weak", "Fabricated", "Good (Acceptable)", "Authentic/Sound"],
        answer: 3,
        explanation:
          "Sahih means authentic or sound — a Hadith that meets all conditions of authenticity including a connected chain, trustworthy narrators and no hidden defects.",
      },
      {
        type: "tf",
        q: "Imam Muslim and Imam al-Bukhari were contemporaries who met each other.",
        answer: true,
        explanation:
          "Correct! Imam Muslim (204–261 AH) was a student of Imam al-Bukhari (194–256 AH) and they did meet.",
      },
    ],
  },
  {
    id: "seerah",
    icon: "🌟",
    name: "Seerah of the Prophet ﷺ",
    difficulty: "easy",
    difficultyLabel: "Beginner",
    questions: [
      {
        type: "mcq",
        q: "In which city was Prophet Muhammad ﷺ born?",
        options: ["Madinah", "Makkah", "Ta'if", "Abyssinia"],
        answer: 1,
        explanation:
          "Prophet Muhammad ﷺ was born in Makkah al-Mukarramah in the Year of the Elephant (570 CE).",
      },
      {
        type: "tf",
        q: "Prophet Muhammad ﷺ received the first revelation at the age of 40.",
        answer: true,
        explanation:
          "Correct! The first revelation (Surah Al-Alaq) was received by the Prophet ﷺ at the age of 40 in the Cave of Hira.",
      },
      {
        type: "mcq",
        q: "Who was the first wife of Prophet Muhammad ﷺ?",
        options: ["Aisha RA", "Hafsa RA", "Khadijah RA", "Zainab RA"],
        answer: 2,
        explanation:
          "Khadijah bint Khuwaylid RA was the first and most beloved wife of the Prophet ﷺ. She was also the first person to accept Islam.",
      },
      {
        type: "mcq",
        q: "In which year did the Hijrah (migration) to Madinah take place?",
        options: ["610 CE", "615 CE", "622 CE", "630 CE"],
        answer: 2,
        explanation:
          "The Hijrah took place in 622 CE. This event marks the beginning of the Islamic (Hijri) calendar.",
      },
      {
        type: "tf",
        q: "The Battle of Badr was fought in the second year after Hijrah.",
        answer: true,
        explanation:
          "Correct! The Battle of Badr was fought in 2 AH (624 CE). 313 Muslims defeated an army of approximately 1,000 Quraysh fighters.",
      },
      {
        type: "mcq",
        q: 'What is the "Year of Sorrow" (Aam al-Huzn) known for?',
        options: [
          "The Battle of Uhud",
          "Passing of Khadijah RA and Abu Talib",
          "The Hijrah to Madinah",
          "The Isra wal Miraj",
        ],
        answer: 1,
        explanation:
          "The Year of Sorrow (619 CE) refers to the year when both Khadijah RA (the Prophet's ﷺ wife) and Abu Talib (his uncle and protector) passed away.",
      },
      {
        type: "tf",
        q: "The Conquest of Makkah occurred peacefully, with the Prophet ﷺ declaring general amnesty.",
        answer: true,
        explanation:
          "Correct! The Prophet ﷺ entered Makkah in 630 CE and declared general amnesty, forgiving even his worst enemies. It was a largely peaceful conquest.",
      },
      {
        type: "mcq",
        q: "The Night Journey (Isra wal Miraj) resulted in the obligation of which act of worship?",
        options: ["Fasting", "Hajj", "Zakah", "Five daily prayers"],
        answer: 3,
        explanation:
          "During the Miraj, Allah prescribed the five daily prayers (Salah) as an obligation upon the Muslim Ummah — originally fifty, reduced to five.",
      },
      {
        type: "mcq",
        q: "What was the name of the Prophet's ﷺ grandfather who raised him?",
        options: [
          "Abu Talib",
          "Abu Bakr",
          "Abdul Muttalib",
          "Waraqah ibn Nawfal",
        ],
        answer: 2,
        explanation:
          "Abdul Muttalib was the Prophet's ﷺ grandfather who raised him after the passing of his mother Aminah RA when he was six years old.",
      },
      {
        type: "tf",
        q: "The Farewell Pilgrimage (Hajjat al-Wida) took place in the 9th year after Hijrah.",
        answer: false,
        explanation:
          "Incorrect. The Farewell Pilgrimage took place in the 10th year after Hijrah (632 CE), just months before the Prophet's ﷺ passing.",
      },
    ],
  },
  {
    id: "fiqh",
    icon: "⚖️",
    name: "Fiqh & Islamic Law",
    difficulty: "hard",
    difficultyLabel: "Advanced",
    questions: [
      {
        type: "mcq",
        q: "How many Rak'ahs (units) are in the Fajr prayer?",
        options: ["2", "3", "4", "5"],
        answer: 0,
        explanation:
          "Fajr prayer consists of 2 Fard (obligatory) Rak'ahs, preceded by 2 Sunnah Rak'ahs.",
      },
      {
        type: "tf",
        q: "Wudu (ablution) is invalidated by eating cooked food.",
        answer: false,
        explanation:
          "Incorrect. Eating cooked food does not invalidate Wudu according to the majority of scholars (Hanafi, Shafi'i, Maliki). It was an earlier ruling abrogated by later practice.",
      },
      {
        type: "mcq",
        q: "What is the Nisab for Zakah on gold?",
        options: ["50 grams", "75 grams", "85 grams", "100 grams"],
        answer: 2,
        explanation:
          "The Nisab for Zakah on gold is 85 grams (approximately 7.5 tolas). If owned for a full lunar year, 2.5% must be paid.",
      },
      {
        type: "tf",
        q: "Tayammum (dry ablution) can be performed when water is unavailable or its use would cause harm.",
        answer: true,
        explanation:
          "Correct! Tayammum is permitted when water is unavailable, when one is ill, or when using water would cause harm to health.",
      },
      {
        type: "mcq",
        q: "Which of the following breaks the fast (Sawm) of Ramadan?",
        options: [
          "Applying kohl (eye drops)",
          "Rinsing the mouth with water",
          "Intentionally eating or drinking",
          "Smelling perfume",
        ],
        answer: 2,
        explanation:
          "Intentionally eating or drinking breaks the fast. Unintentional eating (forgetting) does not break the fast according to the Prophet's ﷺ Hadith.",
      },
      {
        type: "mcq",
        q: "What are the four Sunni schools of Islamic jurisprudence?",
        options: [
          "Hanafi, Shafi'i, Maliki, Hanbali",
          "Hanafi, Shafi'i, Maliki, Ja'fari",
          "Hanafi, Maliki, Hanbali, Mutazili",
          "Shafi'i, Hanbali, Ash'ari, Maturidi",
        ],
        answer: 0,
        explanation:
          "The four Sunni Madhabs are: Hanafi (founded by Imam Abu Hanifah), Maliki, Shafi'i, and Hanbali.",
      },
      {
        type: "tf",
        q: "Zakat is obligatory on all Muslims regardless of their financial status.",
        answer: false,
        explanation:
          "Incorrect. Zakat is only obligatory on Muslims who possess wealth above the Nisab threshold for a full lunar year.",
      },
      {
        type: "mcq",
        q: "How many times should one wash each limb in Wudu (Fard)?",
        options: ["Once", "Twice", "Three times", "As many times as needed"],
        answer: 0,
        explanation:
          "The Fard (obligatory) requirement is to wash each limb once. Washing three times is Sunnah for added reward and cleanliness.",
      },
      {
        type: "tf",
        q: "Salatul Jumu'ah (Friday prayer) is obligatory (Fard) for every Muslim male who is free and resident.",
        answer: true,
        explanation:
          "Correct! Friday prayer is Fard Ayn (individually obligatory) for every free, adult, sane Muslim male who is a resident and in good health.",
      },
      {
        type: "mcq",
        q: "What is the minimum period of Iddah (waiting period) for a divorced woman?",
        options: [
          "1 month",
          "2 months",
          "Three menstrual cycles",
          "Six months",
        ],
        answer: 2,
        explanation:
          "The Iddah for a divorced woman who menstruates is three menstrual cycles (quru'). This is established in Surah Al-Baqarah 2:228.",
      },
    ],
  },
  {
    id: "islamic-studies",
    icon: "☪️",
    name: "Islamic Studies & Aqeedah",
    difficulty: "easy",
    difficultyLabel: "Beginner",
    questions: [
      {
        type: "mcq",
        q: "What are the five pillars of Islam?",
        options: [
          "Shahada, Salah, Zakah, Hajj, Jihad",
          "Shahada, Salah, Zakah, Sawm, Hajj",
          "Salah, Zakah, Sawm, Hajj, Quran",
          "Iman, Salah, Zakah, Sawm, Hajj",
        ],
        answer: 1,
        explanation:
          "The five pillars of Islam are: Shahada (declaration of faith), Salah (prayer), Zakah (charity), Sawm (fasting), and Hajj (pilgrimage).",
      },
      {
        type: "tf",
        q: "Belief in Divine Decree (Qadar) is one of the six pillars of Iman.",
        answer: true,
        explanation:
          "Correct! The six pillars of Iman are: belief in Allah, His Angels, His Books, His Prophets, the Last Day, and Divine Decree (Qadar — both good and bad).",
      },
      {
        type: "mcq",
        q: "How many pillars of Iman are there?",
        options: ["4", "5", "6", "7"],
        answer: 2,
        explanation:
          "There are six pillars of Iman as mentioned in the famous Hadith of Jibreel (AS) in Sahih Muslim.",
      },
      {
        type: "tf",
        q: "Islam, Iman, and Ihsan are the three dimensions of the religion described in the Hadith of Jibreel.",
        answer: true,
        explanation:
          "Correct! In the Hadith of Jibreel, three levels of religion are described: Islam (outward practice), Iman (faith/belief), and Ihsan (excellence/spiritual perfection).",
      },
      {
        type: "mcq",
        q: "What is Tawheed?",
        options: [
          "Belief in all prophets",
          "The oneness and uniqueness of Allah",
          "The Islamic calendar",
          "Memorization of the Quran",
        ],
        answer: 1,
        explanation:
          "Tawheed is the fundamental Islamic concept of the oneness, uniqueness, and absolute sovereignty of Allah. It is the cornerstone of Islamic belief.",
      },
      {
        type: "mcq",
        q: "How many prophets and messengers are mentioned by name in the Quran?",
        options: ["15", "20", "25", "30"],
        answer: 2,
        explanation:
          "25 prophets and messengers are mentioned by name in the Holy Quran, from Adam (AS) to Muhammad ﷺ.",
      },
      {
        type: "tf",
        q: "Muslims believe that Prophet Isa (Jesus) AS will return before the Day of Judgment.",
        answer: true,
        explanation:
          "Correct! Belief in the descent of Prophet Isa (AS) before the Day of Judgment is part of Islamic eschatology, established by numerous authentic Hadith.",
      },
      {
        type: "mcq",
        q: "Which angel is responsible for delivering revelation?",
        options: ["Mikail (AS)", "Israfil (AS)", "Jibreel (AS)", "Azrael (AS)"],
        answer: 2,
        explanation:
          "Jibreel (Gabriel) AS is the angel of revelation, tasked with delivering the Word of Allah to the Prophets.",
      },
      {
        type: "mcq",
        q: "What is the Kalimah Shahadah?",
        options: [
          "SubhanAllah wabihamdihi",
          "La ilaha illallah Muhammadur Rasulullah",
          "Allahu Akbar",
          "Bismillahir Rahmanir Raheem",
        ],
        answer: 1,
        explanation:
          '"La ilaha illallah Muhammadur Rasulullah" — There is no god worthy of worship except Allah, and Muhammad ﷺ is His Messenger. This is the declaration of faith.',
      },
      {
        type: "tf",
        q: "The Day of Judgment is known by many names in the Quran, including Yawm al-Qiyamah and Yawm ad-Din.",
        answer: true,
        explanation:
          "Correct! The Quran refers to the Day of Judgment by many names including Yawm al-Qiyamah (Day of Rising), Yawm ad-Din (Day of Judgement), and Al-Qari'ah (The Striking Calamity).",
      },
    ],
  },
  {
    id: "arabic",
    icon: "🔤",
    name: "Arabic & Quran Vocab",
    difficulty: "medium",
    difficultyLabel: "Intermediate",
    questions: [
      {
        type: "mcq",
        q: 'What does "Alhamdulillah" mean?',
        options: [
          "Glory be to Allah",
          "All praise is due to Allah",
          "Allah is the Greatest",
          "In the name of Allah",
        ],
        answer: 1,
        explanation:
          '"Alhamdulillah" means "All praise and gratitude is due to Allah." It is a constant expression of thankfulness used by Muslims.',
      },
      {
        type: "tf",
        q: '"SubhanAllah" means "All praise be to Allah."',
        answer: false,
        explanation:
          'Incorrect. "SubhanAllah" means "Glory be to Allah" — an expression of Allah\'s perfection. "Alhamdulillah" means "All praise is due to Allah."',
      },
      {
        type: "mcq",
        q: 'What does "Insha\'Allah" mean?',
        options: [
          "As Allah wills",
          "Praise Allah",
          "Allah is sufficient for us",
          "If Allah permits / God willing",
        ],
        answer: 3,
        explanation:
          '"Insha\'Allah" means "If Allah wills" or "God willing." Muslims use it when speaking about future intentions or plans.',
      },
      {
        type: "mcq",
        q: 'What is the meaning of "Ummah"?',
        options: ["Nation/community", "Mosque", "Prayer", "Knowledge"],
        answer: 0,
        explanation:
          '"Ummah" refers to the global Muslim community or nation — all Muslims worldwide, bound together by shared faith.',
      },
      {
        type: "tf",
        q: '"Bismillah" means "In the name of Allah, the Most Gracious, the Most Merciful."',
        answer: false,
        explanation:
          '"Bismillah" alone means "In the name of Allah." The full Bismillah phrase is "Bismillahir Rahmanir Raheem" which means "In the name of Allah, the Most Gracious, the Most Merciful."',
      },
      {
        type: "mcq",
        q: 'What does "Jazakallah Khayran" mean?',
        options: [
          "May Allah bless you",
          "May Allah reward you with good",
          "Peace be upon you",
          "May Allah forgive you",
        ],
        answer: 1,
        explanation:
          '"Jazakallah Khayran" means "May Allah reward you with goodness/good." It is an Islamic expression of gratitude more complete than just "thank you."',
      },
      {
        type: "mcq",
        q: 'The word "Islam" comes from the root "Salama" which means:',
        options: [
          "Submission and obedience",
          "Peace and submission",
          "Faith and prayer",
          "Worship and devotion",
        ],
        answer: 1,
        explanation:
          'Islam comes from the Arabic root "Salama" meaning peace and submission — Islam is the religion of peace through complete submission to Allah.',
      },
      {
        type: "tf",
        q: '"Masha\'Allah" is said when praising something beautiful or admirable.',
        answer: true,
        explanation:
          "Correct! \"Masha'Allah\" (What Allah has willed) is said to express admiration and appreciation while attributing the blessing to Allah's will.",
      },
      {
        type: "mcq",
        q: 'What does "Hafiz" mean?',
        options: [
          "Scholar of Fiqh",
          "One who has memorized the Quran",
          "Islamic teacher",
          "Caller to prayer",
        ],
        answer: 1,
        explanation:
          "A Hafiz (plural: Huffaz) is a person who has memorized the entire Holy Quran — all 114 Surahs — by heart.",
      },
      {
        type: "tf",
        q: '"Salam" and "Salaam Alaykum" are the same greeting.',
        answer: false,
        explanation:
          '"As-Salamu Alaykum" (Peace be upon you) is the complete Islamic greeting. "Salam" alone is a shortened informal version, though the full greeting is Sunnah to say and return.',
      },
    ],
  },
];

// ── State ──
let currentTopic = null;
let currentQ = 0;
let answers = [];
let timerInterval = null;
let timeLeft = 30;
let answered = false;
let currentTopicIdx = null;

// ── Render topic cards ──
function renderTopics() {
  const grid = document.getElementById("topicGrid");
  if (!grid) return;
  grid.innerHTML = "";
  QUIZ_TOPICS.forEach((t, idx) => {
    const card = document.createElement("div");
    card.className = "quiz-topic-card reveal";
    card.innerHTML = `
      <span class="qt-icon">${t.icon}</span>
      <div class="qt-name">${t.name}</div>
      <div class="qt-count">${t.questions.length} Questions</div>
      <span class="qt-difficulty qt-${t.difficulty}">${t.difficultyLabel}</span>
    `;
    card.addEventListener("click", () => startQuiz(idx));
    grid.appendChild(card);
  });
}

// ── Start quiz ──
function startQuiz(topicIdx) {
  currentTopicIdx = topicIdx;
  currentTopic = QUIZ_TOPICS[topicIdx];
  currentQ = 0;
  answers = new Array(currentTopic.questions.length).fill(null);

  document.getElementById("quizHome").style.display = "none";
  document.getElementById("quizResults").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  document.getElementById("quizTopicBadge").textContent =
    currentTopic.icon + " " + currentTopic.name;

  renderQuestion();
}

// ── Render question ──
function renderQuestion() {
  const q = currentTopic.questions[currentQ];
  const total = currentTopic.questions.length;
  answered = answers[currentQ] !== null;

  // Header
  document.getElementById("quizCounter").textContent =
    `Question ${currentQ + 1} of ${total}`;
  document.getElementById("quizProgressFill").style.width =
    (currentQ / total) * 100 + "%";

  // Type tag
  const typeTag = document.getElementById("quizTypeTag");
  typeTag.textContent = q.type === "tf" ? "True / False" : "Multiple Choice";
  typeTag.className = "quiz-type-tag" + (q.type === "tf" ? " tf" : "");

  // Question
  document.getElementById("quizQuestion").textContent = q.q;

  // Options
  const optionsWrap = document.getElementById("quizOptions");
  optionsWrap.innerHTML = "";

  if (q.type === "mcq") {
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.innerHTML = `<span class="option-letter">${"ABCD"[i]}</span>${opt}`;
      btn.dataset.idx = i;
      if (answered) {
        btn.disabled = true;
        if (i === q.answer) btn.classList.add("correct");
        if (answers[currentQ] === i && i !== q.answer)
          btn.classList.add("wrong");
      } else {
        btn.addEventListener("click", () => selectMCQ(i));
      }
      optionsWrap.appendChild(btn);
    });
  } else {
    // True/False
    optionsWrap.className = "tf-options";
    ["✅ True", "❌ False"].forEach((label, i) => {
      const val = i === 0; // true = index 0, false = index 1
      const btn = document.createElement("button");
      btn.className = `tf-btn ${i === 0 ? "true-btn" : "false-btn"}`;
      btn.textContent = label;
      if (answered) {
        btn.disabled = true;
        const isCorrectAnswer = q.answer === val;
        const wasSelected = answers[currentQ] === val;
        if (isCorrectAnswer) btn.classList.add("correct");
        if (wasSelected && !isCorrectAnswer) btn.classList.add("wrong");
      } else {
        btn.addEventListener("click", () => selectTF(val));
      }
      optionsWrap.appendChild(btn);
    });
  }

  // Feedback
  const fb = document.getElementById("quizFeedback");
  if (answered) {
    const isCorrect = answers[currentQ] === q.answer;
    fb.className = "quiz-feedback " + (isCorrect ? "correct-fb" : "wrong-fb");
    fb.innerHTML = `<strong>${isCorrect ? "✅ Correct!" : "❌ Incorrect"}</strong>${q.explanation}`;
    fb.style.display = "flex";
  } else {
    fb.style.display = "none";
  }

  // Nav buttons
  document.getElementById("prevQBtn").style.display =
    currentQ > 0 ? "inline-flex" : "none";
  document.getElementById("nextQBtn").style.display =
    answered ? "inline-flex" : "none";
  document.getElementById("nextQBtn").textContent =
    currentQ === currentTopic.questions.length - 1 ? "🏁 Finish" : "Next →";

  // Timer
  if (!answered) startTimer();
  else stopTimer();
}

// ── Select MCQ ──
function selectMCQ(idx) {
  if (answered) return;
  answered = true;
  answers[currentQ] = idx;
  stopTimer();
  renderQuestion();
}

// ── Select True/False ──
function selectTF(val) {
  if (answered) return;
  answered = true;
  answers[currentQ] = val;
  stopTimer();
  renderQuestion();
}

// ── Navigation ──
function nextQuestion() {
  if (currentQ < currentTopic.questions.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResults();
  }
}
function prevQuestion() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion();
  }
}

// ── Timer ──
function startTimer() {
  stopTimer();
  timeLeft = 30;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      stopTimer();
      timeUp();
    }
  }, 1000);
}
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}
function updateTimerDisplay() {
  const el = document.getElementById("quizTimer");
  if (!el) return;
  el.textContent = timeLeft;
  el.className = "quiz-timer" + (timeLeft <= 8 ? " urgent" : "");
}
function timeUp() {
  if (!answered) {
    answered = true;
    const q = currentTopic.questions[currentQ];
    answers[currentQ] = q.type === "tf" ? "timeout" : -1;
    const fb = document.getElementById("quizFeedback");
    fb.className = "quiz-feedback wrong-fb";
    fb.innerHTML = `<strong>⏰ Time's Up!</strong>${q.explanation}`;
    fb.style.display = "flex";
    document
      .querySelectorAll(".quiz-option, .tf-btn")
      .forEach((b) => (b.disabled = true));
    // Mark correct option
    document.querySelectorAll(".quiz-option").forEach((btn) => {
      if (parseInt(btn.dataset.idx) === q.answer) btn.classList.add("correct");
    });
    document.getElementById("nextQBtn").style.display = "inline-flex";
  }
}

// ── Results ──
function showResults() {
  stopTimer();
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("quizResults").style.display = "block";

  const questions = currentTopic.questions;
  let correct = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) correct++;
  });
  const pct = Math.round((correct / questions.length) * 100);

  // Icon & message
  let icon = "🏆",
    title = "Excellent!",
    msg =
      "Masha'Allah! Perfect score! May Allah increase you in knowledge. آمین";
  if (pct < 50) {
    icon = "📚";
    title = "Keep Learning!";
    msg =
      "Don't be discouraged. Every scholar was once a student. Review the material and try again, In sha Allah!";
  } else if (pct < 70) {
    icon = "🌱";
    title = "Good Effort!";
    msg =
      "Alhamdulillah for the effort! With more review and practice, you will achieve mastery, In sha Allah.";
  } else if (pct < 90) {
    icon = "⭐";
    title = "Well Done!";
    msg =
      "Masha'Allah! A great score. A little more revision and you'll achieve full marks, In sha Allah!";
  }

  document.getElementById("resultsIcon").textContent = icon;
  document.getElementById("resultsTitle").textContent = title;
  document.getElementById("resultsMessage").textContent = msg;
  document.getElementById("resultsPct").textContent = pct + "%";
  document.getElementById("resultsScoreText").textContent =
    `You scored ${correct} out of ${questions.length} questions correctly`;

  // Animate ring
  const ring = document.getElementById("resultsRingFill");
  if (ring) {
    const circumference = 2 * Math.PI * 58;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
    ring.style.stroke =
      pct >= 70 ? "var(--emerald)"
      : pct >= 50 ? "var(--gold)"
      : "#c0392b";
    setTimeout(() => {
      ring.style.transition =
        "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)";
      ring.style.strokeDashoffset = circumference - (pct / 100) * circumference;
    }, 200);
  }

  // Breakdown
  const bd = document.getElementById("resultsBreakdown");
  bd.innerHTML = "";
  questions.forEach((q, i) => {
    const isCorrect = answers[i] === q.answer;
    const item = document.createElement("div");
    item.className = "breakdown-item";
    item.innerHTML = `
      <div class="breakdown-status ${isCorrect ? "bs-correct" : "bs-wrong"}">${isCorrect ? "✓" : "✗"}</div>
      <div>
        <div class="breakdown-q">Q${i + 1}: ${q.q.length > 70 ? q.q.slice(0, 70) + "…" : q.q}</div>
        <div class="breakdown-a">${isCorrect ? "✅ Correct" : "❌ " + q.explanation.slice(0, 80) + "…"}</div>
      </div>
    `;
    bd.appendChild(item);
  });
}

function retryQuiz() {
  startQuiz(currentTopicIdx);
}
function backToTopics() {
  document.getElementById("quizResults").style.display = "none";
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("quizHome").style.display = "block";
}

// ── Init ──
document.addEventListener("DOMContentLoaded", renderTopics);
