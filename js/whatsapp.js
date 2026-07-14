// ============================================================
// QADR OFFICIAL — WhatsApp Channel Widget
//
// TO UPDATE:
//   WA_CHANNEL_URL — your WhatsApp channel link
//   WA_LABEL       — text shown on the chat bubble
//   AUTO_SHOW_MS   — delay before bubble auto-opens (ms)
// ============================================================

(function () {
  // ── Configuration ──────────────────────────────────────────
  const WA_CHANNEL_URL =
    "https://whatsapp.com/channel/0029Va9pQeP2kNFswJG9WW2a";
  const WA_LABEL = "Follow Qadr Official on WhatsApp";
  const WA_SUB_LABEL = "Join our channel for Islamic reminders & updates";
  const AUTO_SHOW_MS = 8000; // auto-open after 8 seconds
  // ──────────────────────────────────────────────────────────

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .wa-widget {
        position: fixed;
        bottom: 1.8rem; right: 1.8rem;
        z-index: 9998;
        display: flex; flex-direction: column;
        align-items: flex-end; gap: 0.8rem;
      }
      .wa-bubble {
        background: #fff;
        border-radius: 16px 16px 0 16px;
        padding: 1.1rem 1.3rem;
        box-shadow: 0 8px 32px rgba(0,0,0,0.14);
        max-width: 268px;
        display: none;
        border: 1px solid #e5e5e5;
        position: relative;
        animation: waSlideIn 0.3s ease;
      }
      .wa-bubble.open { display: block; }
      @keyframes waSlideIn {
        from { opacity:0; transform: translateY(12px) scale(0.95); }
        to   { opacity:1; transform: translateY(0) scale(1); }
      }
      .wa-bubble-close {
        position: absolute; top: -9px; right: -9px;
        width: 22px; height: 22px;
        background: #e74c3c; color: #fff;
        border: 2px solid #fff; border-radius: 50%;
        font-size: 0.65rem; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; line-height: 1;
        transition: background 0.2s;
      }
      .wa-bubble-close:hover { background: #c0392b; }
      .wa-bubble-header {
        display: flex; align-items: center; gap: 0.7rem;
        margin-bottom: 0.9rem;
        padding-bottom: 0.9rem;
        border-bottom: 1px solid #f0f0f0;
      }
      .wa-avatar {
        width: 40px; height: 40px;
        background: linear-gradient(135deg, #1A5C35, #27733F);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.1rem; flex-shrink: 0;
      }
      .wa-info-name {
        font-family: 'Poppins', sans-serif;
        font-size: 0.85rem; font-weight: 700;
        color: #111; display: block; line-height: 1.3;
      }
      .wa-info-status {
        font-family: 'Poppins', sans-serif;
        font-size: 0.72rem; color: #25D366;
        display: flex; align-items: center; gap: 4px;
      }
      .wa-dot {
        width: 6px; height: 6px;
        background: #25D366; border-radius: 50%;
        animation: waPulse 1.6s ease-in-out infinite;
      }
      @keyframes waPulse {
        0%,100% { opacity:1; } 50% { opacity:0.3; }
      }
      .wa-message {
        font-family: 'Poppins', sans-serif;
        font-size: 0.83rem; color: #555;
        line-height: 1.55; margin-bottom: 1rem;
      }
      .wa-cta-btn {
        display: flex; align-items: center; justify-content: center;
        gap: 7px; width: 100%; padding: 10px 12px;
        background: #25D366; color: #fff;
        border: none; border-radius: 10px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.84rem; font-weight: 700;
        text-decoration: none; cursor: pointer;
        transition: background 0.2s, transform 0.15s;
      }
      .wa-cta-btn:hover { background: #1EB558; transform: translateY(-1px); }
      .wa-cta-btn svg { width: 15px; height: 15px; fill: white; flex-shrink: 0; }
      .wa-fab {
        width: 56px; height: 56px;
        background: #25D366; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; border: none;
        box-shadow: 0 6px 22px rgba(37,211,102,0.42);
        transition: transform 0.2s, box-shadow 0.2s;
        position: relative;
        animation: waFabPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
      }
      @keyframes waFabPop {
        from { opacity:0; transform: scale(0.4); }
        to   { opacity:1; transform: scale(1); }
      }
      .wa-fab:hover { transform: scale(1.08); box-shadow: 0 8px 28px rgba(37,211,102,0.5); }
      .wa-fab svg { width: 28px; height: 28px; fill: white; }
      .wa-fab-notif {
        position: absolute; top: 3px; right: 3px;
        width: 10px; height: 10px;
        background: #ff3b30; border-radius: 50%;
        border: 2px solid white;
        animation: waPulse 1.6s ease-in-out infinite;
      }
      @media (max-width: 480px) {
        .wa-widget { bottom: 1rem; right: 1rem; }
        .wa-bubble { max-width: 230px; }
        .wa-fab { width: 50px; height: 50px; }
      }
    `;
    document.head.appendChild(style);
  }

  const WA_ICON_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.118 1.529 5.845L.057 23.882l6.18-1.448A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.803 9.803 0 01-5.004-1.373l-.36-.214-3.667.86.873-3.58-.234-.369A9.786 9.786 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>`;

  function createWidget() {
    injectStyles();

    const widget = document.createElement("div");
    widget.className = "wa-widget";
    widget.innerHTML = `
      <div class="wa-bubble" id="waBubble">
        <div class="wa-bubble-close" id="waBubbleClose">✕</div>
        <div class="wa-bubble-header">
          <div class="wa-avatar">🕌</div>
          <div>
            <span class="wa-info-name">Qadr Official</span>
            <span class="wa-info-status"><span class="wa-dot"></span>WhatsApp Channel</span>
          </div>
        </div>
        <p class="wa-message">
          السلام عليكم! 👋<br>
          ${WA_SUB_LABEL}
        </p>
        <a class="wa-cta-btn" href="${WA_CHANNEL_URL}" target="_blank" rel="noopener">
          ${WA_ICON_SVG} ${WA_LABEL}
        </a>
      </div>
      <button class="wa-fab" id="waFab" aria-label="Open WhatsApp channel">
        <div class="wa-fab-notif" id="waNotif"></div>
        ${WA_ICON_SVG}
      </button>
    `;
    document.body.appendChild(widget);

    const bubble = document.getElementById("waBubble");
    const fab = document.getElementById("waFab");
    const closeBtn = document.getElementById("waBubbleClose");
    const notif = document.getElementById("waNotif");

    fab.addEventListener("click", () => {
      bubble.classList.toggle("open");
      if (notif) notif.style.display = "none";
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      bubble.classList.remove("open");
    });

    document.addEventListener("click", (e) => {
      if (!widget.contains(e.target)) bubble.classList.remove("open");
    });

    // Auto-open after delay
    setTimeout(() => {
      if (!bubble.classList.contains("open")) {
        bubble.classList.add("open");
        if (notif) notif.style.display = "none";
      }
    }, AUTO_SHOW_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();
