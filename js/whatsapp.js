// ============================================================
// SUFFAH OFFICIAL — WhatsApp Chat Widget JavaScript
// Floating WhatsApp button with expandable chat bubble
// ============================================================

(function () {
  const WA_NUMBER = "7666774850"; // Without + sign
  const WA_MESSAGE = encodeURIComponent(
    "Assalamu Alaykum! I would like to inquire about courses at Suffah Official Islamic Academy.",
  );

  function createWidget() {
    // ── Inject CSS ──
    const style = document.createElement("style");
    style.textContent = `
      .wa-widget {
        position: fixed;
        bottom: 1.8rem;
        right: 1.8rem;
        z-index: 9998;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.8rem;
      }

      .wa-bubble {
        background: #fff;
        border-radius: 16px 16px 0 16px;
        padding: 1rem 1.2rem;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        max-width: 260px;
        display: none;
        animation: waBubbleIn 0.3s ease;
        border: 1px solid #e8e8e8;
      }
      .wa-bubble.visible { display: block; }

      @keyframes waBubbleIn {
        from { opacity:0; transform: translateY(10px) scale(0.95); }
        to   { opacity:1; transform: translateY(0) scale(1); }
      }

      .wa-bubble-header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.8rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #f0f0f0;
      }
      .wa-avatar {
        width: 38px; height: 38px;
        background: linear-gradient(135deg, #1B6B4A, #2E8B5A);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        flex-shrink: 0;
      }
      .wa-info .wa-name {
        font-family: 'Poppins', sans-serif;
        font-size: 0.85rem;
        font-weight: 700;
        color: #1a1a1a;
        display: block;
        line-height: 1.2;
      }
      .wa-info .wa-status {
        font-family: 'Poppins', sans-serif;
        font-size: 0.72rem;
        color: #25D366;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .wa-status-dot {
        width: 6px; height: 6px;
        background: #25D366;
        border-radius: 50%;
        display: inline-block;
        animation: waPulse 1.5s ease-in-out infinite;
      }
      @keyframes waPulse {
        0%, 100% { opacity:1; }
        50%       { opacity:0.4; }
      }

      .wa-message-preview {
        font-family: 'Poppins', sans-serif;
        font-size: 0.82rem;
        color: #555;
        margin-bottom: 1rem;
        line-height: 1.5;
      }

      .wa-start-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        padding: 10px;
        background: #25D366;
        color: white;
        border: none;
        border-radius: 10px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: background 0.2s, transform 0.15s;
      }
      .wa-start-btn:hover {
        background: #128C7E;
        transform: translateY(-1px);
      }
      .wa-start-btn svg { width: 16px; height: 16px; fill: white; flex-shrink: 0; }

      .wa-close-btn {
        position: absolute;
        top: -10px; right: -10px;
        width: 22px; height: 22px;
        background: #e74c3c;
        color: white;
        border: 2px solid white;
        border-radius: 50%;
        font-size: 0.7rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        font-weight: 700;
        transition: background 0.2s;
      }
      .wa-close-btn:hover { background: #c0392b; }

      .wa-fab {
        width: 58px; height: 58px;
        background: #25D366;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 6px 24px rgba(37,211,102,0.45);
        transition: transform 0.2s, box-shadow 0.2s;
        border: none;
        position: relative;
        animation: waFabIn 0.5s ease both;
      }
      .wa-fab:hover {
        transform: scale(1.08);
        box-shadow: 0 8px 32px rgba(37,211,102,0.55);
      }
      .wa-fab svg { width: 30px; height: 30px; fill: white; }

      @keyframes waFabIn {
        from { opacity:0; transform: scale(0.5); }
        to   { opacity:1; transform: scale(1); }
      }

      .wa-notif-dot {
        position: absolute;
        top: 4px; right: 4px;
        width: 10px; height: 10px;
        background: #ff3b30;
        border-radius: 50%;
        border: 2px solid white;
        animation: waPulse 1.5s ease-in-out infinite;
      }

      .wa-bubble-wrap {
        position: relative;
      }

      @media (max-width: 480px) {
        .wa-widget { bottom: 1.2rem; right: 1.2rem; }
        .wa-bubble { max-width: 220px; }
        .wa-fab { width: 50px; height: 50px; }
        .wa-fab svg { width: 26px; height: 26px; }
      }
    `;
    document.head.appendChild(style);

    // ── Widget HTML ──
    const widget = document.createElement("div");
    widget.className = "wa-widget";
    widget.innerHTML = `
      <div class="wa-bubble-wrap">
        <div class="wa-bubble" id="waBubble">
          <button class="wa-close-btn" id="waBubbleClose" title="Close">✕</button>
          <div class="wa-bubble-header">
            <div class="wa-avatar">🕌</div>
            <div class="wa-info">
              <span class="wa-name">Suffah Official</span>
              <span class="wa-status">
                <span class="wa-status-dot"></span>
                Online — Typically replies instantly
              </span>
            </div>
          </div>
          <p class="wa-message-preview">
            Assalamu Alaykum! 👋<br>
            Have questions about our courses? We're here to help. Chat with us on WhatsApp!
          </p>
          <a class="wa-start-btn" id="waStartChat" href="#" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.118 1.529 5.845L.057 23.882l6.18-1.448A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.803 9.803 0 01-5.004-1.373l-.36-.214-3.667.86.873-3.58-.234-.369A9.786 9.786 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            Start Chat on WhatsApp
          </a>
        </div>
      </div>
      <button class="wa-fab" id="waFab" title="Chat with us on WhatsApp" aria-label="Open WhatsApp chat">
        <div class="wa-notif-dot" id="waNotifDot"></div>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.118 1.529 5.845L.057 23.882l6.18-1.448A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.803 9.803 0 01-5.004-1.373l-.36-.214-3.667.86.873-3.58-.234-.369A9.786 9.786 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
        </svg>
      </button>
    `;
    document.body.appendChild(widget);

    // ── Set WhatsApp link ──
    const startBtn = document.getElementById("waStartChat");
    if (startBtn) {
      startBtn.href = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
    }

    // ── Events ──
    const fab = document.getElementById("waFab");
    const bubble = document.getElementById("waBubble");
    const closeBtn = document.getElementById("waBubbleClose");
    const notifDot = document.getElementById("waNotifDot");

    fab.addEventListener("click", () => {
      bubble.classList.toggle("visible");
      if (notifDot) notifDot.style.display = "none";
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      bubble.classList.remove("visible");
    });

    // Auto show bubble after 8 seconds
    setTimeout(() => {
      if (!bubble.classList.contains("visible")) {
        bubble.classList.add("visible");
      }
    }, 8000);

    // Hide bubble on outside click
    document.addEventListener("click", (e) => {
      if (!widget.contains(e.target)) {
        bubble.classList.remove("visible");
      }
    });
  }

  // Init after DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();
