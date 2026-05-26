(function () {
  function renderSearchResults(shell, entries, query, section) {
    const target = shell.querySelector("[data-search-results]");
    if (!target) return;
    const q = (query || "").trim().toLowerCase();
    const filtered = entries.filter((entry) => {
      const sectionPass = section === "all" || entry.section === section;
      if (!sectionPass) return false;
      if (!q) return true;
      const haystack = [
        entry.title || "",
        entry.summary || "",
        entry.keywords || "",
        entry.section || "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    if (!filtered.length) {
      target.innerHTML = '<p class="search-empty">No results matched this search.</p>';
      return;
    }
    target.innerHTML = filtered
      .slice(0, 50)
      .map(
        (entry) => `
          <article class="site-card">
            <p class="kicker">${entry.section}</p>
            <h3><a href="${entry.url}">${entry.title}</a></h3>
            <p class="muted-note">${entry.summary || ""}</p>
          </article>
        `
      )
      .join("");
  }

  async function initSearchShell(shell) {
    const source = shell.getAttribute("data-search-source");
    if (!source) return;
    try {
      const response = await fetch(source);
      const entries = await response.json();
      const input = shell.querySelector("[data-search-input]");
      const filter = shell.querySelector("[data-search-filter]");
      const refresh = function () {
        renderSearchResults(shell, entries, input ? input.value : "", filter ? filter.value : "all");
      };
      if (input) input.addEventListener("input", refresh);
      if (filter) filter.addEventListener("change", refresh);
      refresh();
    } catch (error) {
      const target = shell.querySelector("[data-search-results]");
      if (target) {
        target.innerHTML = '<p class="search-empty">Search failed to load right now.</p>';
      }
    }
  }

  document.querySelectorAll("[data-search-source]").forEach(initSearchShell);

  function initFlashcardDeck(deck) {
    const cards = Array.from(deck.querySelectorAll("[data-flashcard]"));
    if (!cards.length) return;
    const previous = deck.querySelector("[data-flashcard-prev]");
    const next = deck.querySelector("[data-flashcard-next]");
    const flip = deck.querySelector("[data-flashcard-flip]");
    const counter = deck.querySelector("[data-flashcard-counter]");
    let index = Math.max(0, cards.findIndex((card) => card.classList.contains("is-active")));
    let flipped = false;

    function render() {
      cards.forEach((card, cardIndex) => {
        const active = cardIndex === index;
        card.classList.toggle("is-active", active);
        card.classList.toggle("is-flipped", active && flipped);
        card.setAttribute("aria-hidden", active ? "false" : "true");
      });
      if (counter) counter.textContent = `${index + 1} / ${cards.length}`;
      if (flip) flip.setAttribute("aria-pressed", flipped ? "true" : "false");
    }

    function move(step) {
      index = (index + step + cards.length) % cards.length;
      flipped = false;
      render();
    }

    function toggleFlip() {
      flipped = !flipped;
      render();
    }

    if (previous) previous.addEventListener("click", () => move(-1));
    if (next) next.addEventListener("click", () => move(1));
    if (flip) flip.addEventListener("click", toggleFlip);
    cards.forEach((card, cardIndex) => {
      card.setAttribute("tabindex", "0");
      card.addEventListener("click", () => {
        if (cardIndex === index) toggleFlip();
      });
      card.addEventListener("keydown", (event) => {
        if (cardIndex !== index) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleFlip();
        }
      });
    });

    deck.setAttribute("data-flashcards-ready", "true");
    render();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function currentEssaySlug() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const essayIndex = parts.indexOf("essays");
    if (essayIndex === -1 || !parts[essayIndex + 1]) return "";
    return parts[essayIndex + 1];
  }

  function renderFlashcardDeckMarkup(cards) {
    const cardMarkup = cards
      .map((card, cardIndex) => {
        const index = cardIndex + 1;
        const classes = index === 1 ? "flashcard is-active" : "flashcard";
        const cue = card.cue ? `<p class="flashcard-cue">${escapeHtml(card.cue)}</p>` : "";
        return `
          <article class="${classes}" data-flashcard>
            <div class="flashcard-face flashcard-front">
              <p class="flashcard-index">Card ${String(index).padStart(2, "0")}</p>
              ${cue}
              <h3>${escapeHtml(card.question)}</h3>
            </div>
            <div class="flashcard-face flashcard-back">
              <p class="flashcard-index">Answer ${String(index).padStart(2, "0")}</p>
              <p>${escapeHtml(card.answer)}</p>
            </div>
          </article>
        `;
      })
      .join("");
    return `
        <div class="flashcard-stage" data-flashcard-deck>
          <div class="flashcard-stack">
            ${cardMarkup}
          </div>
          <div class="flashcard-controls" aria-label="Study card controls">
            <button class="button secondary flashcard-control" type="button" data-flashcard-prev>Previous</button>
            <button class="button primary flashcard-control" type="button" data-flashcard-flip aria-pressed="false">Flip</button>
            <button class="button secondary flashcard-control" type="button" data-flashcard-next>Next</button>
            <span class="flashcard-counter" data-flashcard-counter>1 / ${cards.length}</span>
          </div>
        </div>
    `;
  }

  function normalizeFlashcardPayload(cards) {
    if (!Array.isArray(cards)) return [];
    return cards
      .map((card) => ({
        question: card.question || card.q || "",
        answer: card.answer || card.a || "",
        cue: card.cue || card.c || "",
      }))
      .filter((card) => card.question && card.answer);
  }

  function addFlashcardNavItem() {
    const contents = document.querySelector(".detail-block .link-list");
    if (!contents || contents.querySelector('a[href="#study-cards"]')) return;
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#study-cards";
    link.textContent = "Study cards";
    item.appendChild(link);
    const readLink = contents.querySelector('a[href="#read"]');
    const readItem = readLink ? readLink.closest("li") : null;
    contents.insertBefore(item, readItem || null);
  }

  function insertFlashcardSection(deck) {
    if (!deck || document.getElementById("study-cards")) return;
    const cards = normalizeFlashcardPayload(deck.cards);
    if (!cards.length) return;
    ensureFlashcardStyles();
    const section = document.createElement("section");
    section.className = "panel flashcard-panel";
    section.id = "study-cards";
    section.innerHTML = `
        <div class="section-head section-head-split">
          <div>
            <p class="kicker">Study cards</p>
            <h2>Retain the essay</h2>
          </div>
          <div class="section-sidecar">
            <p class="section-sidecar-label">Deck</p>
            <p>${cards.length} prompts drawn from the Substack essay text.</p>
          </div>
        </div>
        ${renderFlashcardDeckMarkup(cards)}
    `;
    const overview = document.getElementById("overview");
    const read = document.getElementById("read");
    if (overview) {
      overview.insertAdjacentElement("afterend", section);
    } else if (read && read.parentNode) {
      read.parentNode.insertBefore(section, read);
    } else {
      return;
    }
    addFlashcardNavItem();
    const deckElement = section.querySelector("[data-flashcard-deck]");
    if (deckElement) initFlashcardDeck(deckElement);
  }

  function ensureFlashcardStyles() {
    if (document.getElementById("eoe-flashcard-runtime-style")) return;
    const style = document.createElement("style");
    style.id = "eoe-flashcard-runtime-style";
    style.textContent = `
      .flashcard-panel{overflow:hidden}
      .flashcard-stage{display:grid;gap:1rem}
      .flashcard-stack{position:relative;min-height:20rem}
      .flashcard{position:absolute;inset:0;display:grid;grid-template-areas:"card";min-height:20rem;opacity:0;pointer-events:none;transform:translateY(.75rem) scale(.98);transition:opacity .18s ease,transform .18s ease}
      .flashcard.is-active{opacity:1;pointer-events:auto;transform:translateY(0) scale(1)}
      .flashcard-face{grid-area:card;display:flex;min-height:20rem;flex-direction:column;justify-content:space-between;gap:1rem;border:1px solid var(--line);border-radius:18px;padding:1.25rem;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(247,244,238,.92));box-shadow:var(--shadow);backface-visibility:hidden;transition:transform .22s ease}
      .flashcard-back{transform:rotateY(180deg);background:linear-gradient(135deg,rgba(25,92,86,.12),rgba(140,49,38,.1))}
      .flashcard.is-flipped .flashcard-front{transform:rotateY(180deg)}
      .flashcard.is-flipped .flashcard-back{transform:rotateY(360deg)}
      .flashcard-index,.flashcard-cue{margin:0;color:var(--muted);font-family:var(--font-sans);font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      .flashcard h3{margin:0;color:var(--ink);font-size:clamp(1.05rem,2vw,1.45rem);line-height:1.35}
      .flashcard p:last-child{margin:0;color:var(--ink);font-size:1.05rem;line-height:1.55}
      .flashcard-controls{display:flex;align-items:center;gap:.65rem;flex-wrap:wrap}
      .flashcard-counter{color:var(--muted);font-family:var(--font-sans);font-size:.9rem;font-weight:800}
      @media (max-width:640px){.flashcard-stack,.flashcard,.flashcard-face{min-height:25rem}.flashcard-face{padding:1rem}.flashcard-controls .button{flex:1 1 7rem}}
    `;
    document.head.appendChild(style);
  }

  async function loadFlashcardDecks() {
    const embeddedDecks = Array.isArray(window.__EOE_FLASHCARD_DECKS__) ? window.__EOE_FLASHCARD_DECKS__ : [];
    if (embeddedDecks.length) return embeddedDecks;

    try {
      const response = await fetch("/app_exports/essay-flashcards.json", { headers: { Accept: "application/json" } });
      if (response.ok) {
        const payload = await response.json();
        if (Array.isArray(payload.decks)) return payload.decks;
      }
    } catch (error) {
      // Fall through to chunked deck files.
    }

    const chunkSources = Array.from({ length: 8 }, (_, index) => `/app_exports/essay-flashcards-${String(index + 1).padStart(2, "0")}.json.gz.b64`);
    const chunks = await Promise.all(
      chunkSources.map(async (source) => {
        try {
          const response = await fetch(source, { headers: { Accept: "text/plain" } });
          if (!response.ok) return [];
          const payload = await decodeGzipBase64Json(await response.text());
          return Array.isArray(payload.decks) ? payload.decks : [];
        } catch (error) {
          return [];
        }
      })
    );
    return chunks.flat();
  }

  async function decodeGzipBase64Json(value) {
    if (!("DecompressionStream" in window)) return { decks: [] };
    const binary = window.atob(String(value || "").trim());
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Response(stream).json();
  }

  async function initDynamicFlashcards() {
    const slug = currentEssaySlug();
    if (!slug || document.getElementById("study-cards")) return;
    try {
      const decks = await loadFlashcardDecks();
      const deck = decks.find((item) => (item.slug || item.s) === slug);
      insertFlashcardSection(deck);
    } catch (error) {
      return;
    }
  }

  document.querySelectorAll("[data-flashcard-deck]").forEach(initFlashcardDeck);
  initDynamicFlashcards();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    const hero = document.querySelector(".hero-home");
    if (hero) {
      let ticking = false;
      const updateHeroDepth = () => {
        const offset = Math.min(36, Math.max(0, window.scrollY * 0.035));
        hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
        ticking = false;
      };
      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            window.requestAnimationFrame(updateHeroDepth);
            ticking = true;
          }
        },
        { passive: true }
      );
      updateHeroDepth();
    }
  }
})();
