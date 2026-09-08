(() => {
  const DATA = window.AMERICAN_EPIDEMIC_TIMELINE_DATA;
  const events = [...DATA.events].sort((a, b) =>
    a.start_date.localeCompare(b.start_date),
  );
  const sourceById = new Map(DATA.sources.map((source) => [source.id, source]));
  const assetById = new Map(DATA.assets.map((asset) => [asset.id, asset]));
  const eraById = new Map(DATA.eras.map((era) => [era.id, era]));
  const groupById = new Map(
    DATA.disease_groups.map((group) => [group.id, group]),
  );
  const stageFallback =
    assetById.get("quarantine-notice-1878") || DATA.assets[0];
  const CONFIDENCE_LABELS = {
    high: "High confidence",
    moderate: "Moderate confidence",
    low: "Low confidence",
    contested: "Contested",
    speculative: "Speculative",
  };
  let activeMode = "timeline";
  let guidedPath = "";
  let lastFocused = null;
  let visibleEvents = events;
  let observer = null;

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const esc = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  function yearOf(event) {
    return event.start_date.slice(0, 4);
  }

  function dateRange(event) {
    if (event.date_display) return event.date_display;
    const start = event.start_date || "";
    const end = event.end_date || "";
    if (!end || start === end) return start;
    if (
      start.slice(0, 4) === end.slice(0, 4) &&
      event.date_precision === "year"
    )
      return start.slice(0, 4);
    return `${start} to ${end}`;
  }

  function diseaseLabel(event) {
    return groupById.get(event.disease_group)?.label || event.disease_group;
  }

  function eraLabel(event) {
    const era = eraById.get(event.era_id);
    return era ? `${era.label} (${era.range})` : event.era_id;
  }

  function confidenceLabel(eventOrValue) {
    const value =
      typeof eventOrValue === "string" ? eventOrValue : eventOrValue.confidence;
    return CONFIDENCE_LABELS[value] || "Evidence note";
  }

  function tierLabel(tier) {
    if (tier === "hero") return "Anchor";
    if (tier === "major") return "Major";
    return "Regional";
  }

  function firstAsset(event) {
    return (
      (event.asset_ids || []).map((id) => assetById.get(id)).find(Boolean) ||
      stageFallback
    );
  }

  function uniqueSorted(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) =>
      String(a).localeCompare(String(b)),
    );
  }

  function sourcePills(event, limit = 3) {
    const sources = (event.source_ids || [])
      .map((id) => sourceById.get(id))
      .filter(Boolean);
    const visible = sources.slice(0, limit);
    const extra =
      sources.length > visible.length
        ? `<span class="source-pill">+${sources.length - visible.length} more</span>`
        : "";
    return (
      visible
        .map(
          (source) =>
            `<a class="source-pill" href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.title)}</a>`,
        )
        .join("") + extra
    );
  }

  function linkList(links) {
    if (!Array.isArray(links) || !links.length)
      return "<p>No linked site surface yet.</p>";
    return `
            <div class="link-list">
              ${links
                .map((link) => {
                  const href = typeof link === "string" ? link : link.href;
                  const label = typeof link === "string" ? link : link.label;
                  return `<a class="link-pill" href="${esc(href)}">${esc(label)}</a>`;
                })
                .join("")}
            </div>
          `;
  }

  function evidenceBadges(event) {
    const uncertaintyText =
      `${event.uncertainty_note || ""} ${event.pathogen_or_agent || ""}`.toLowerCase();
    const badges = [
      `<span class="badge green">${esc(confidenceLabel(event))}</span>`,
    ];
    if (event.confidence === "high") {
      badges.push('<span class="badge blue">High confidence</span>');
    }
    if (event.confidence === "contested") {
      badges.push('<span class="badge warning">Contested</span>');
    }
    if (event.confidence === "low" || event.confidence === "speculative") {
      badges.push('<span class="badge warning">Thin evidence</span>');
    }
    if (
      uncertaintyText.includes("uncertain") ||
      uncertaintyText.includes("contested") ||
      uncertaintyText.includes("disputed") ||
      uncertaintyText.includes("retrospective") ||
      uncertaintyText.includes("unknown")
    ) {
      badges.push('<span class="badge warning">Uncertain diagnosis</span>');
    }
    if (
      (event.claims || []).some((claim) =>
        String(claim.claim_type || "")
          .toLowerCase()
          .includes("interpret"),
      ) ||
      (event.tags || []).includes("public-health-turning-point")
    ) {
      badges.push('<span class="badge blue">Interpretive synthesis</span>');
    }
    return [...new Set(badges)].join("");
  }

  function imageFallbackAttrs() {
    return `data-fallback-src="${esc(stageFallback.local_path)}" data-fallback-alt="${esc(stageFallback.alt)}"`;
  }

  function applyImageFallbacks(root = document) {
    qsa("img[data-fallback-src]", root).forEach((image) => {
      image.addEventListener(
        "error",
        () => {
          if (image.dataset.fallbackApplied === "true") return;
          image.dataset.fallbackApplied = "true";
          image.classList.add("image-fallback");
          image.src = image.dataset.fallbackSrc;
          image.alt = image.dataset.fallbackAlt || "Fallback archival image.";
        },
        { once: true },
      );
    });
  }

  function textIndex(event) {
    return [
      event.title,
      event.geography,
      event.pathogen_or_syndrome,
      event.pathogen_or_agent,
      event.disease_or_condition,
      event.disease_group,
      diseaseLabel(event),
      event.transmission_ecology,
      event.transmission_category,
      event.historical_thesis,
      event.summary_1_sentence,
      event.historical_context,
      event.public_health_response,
      event.public_health_significance,
      event.uncertainty_note,
      event.mortality_or_burden_note,
      event.polity_scope,
      event.confidence,
      ...(event.period_tags || []),
      ...(event.setting_tags || []),
      ...(event.modern_location_tags || []),
      ...(event.tags || []),
    ]
      .join(" ")
      .toLowerCase();
  }

  function populateSelects() {
    const centuries = uniqueSorted(events.map((event) => event.century));
    qs("#eraFilter").innerHTML =
      '<option value="">All centuries / eras</option>' +
      centuries
        .map(
          (century) =>
            `<option value="${esc(century)}">${esc(century)}</option>`,
        )
        .join("");
    qs("#diseaseFilter").innerHTML =
      '<option value="">All disease groups</option>' +
      DATA.disease_groups
        .map(
          (group) =>
            `<option value="${esc(group.id)}">${esc(group.label)}</option>`,
        )
        .join("");
    qs("#transmissionFilter").innerHTML =
      '<option value="">All transmission categories</option>' +
      (DATA.transmission_categories || [])
        .map(
          (category) =>
            `<option value="${esc(category)}">${esc(category)}</option>`,
        )
        .join("");
    qs("#periodFilter").innerHTML =
      '<option value="">All period tags</option>' +
      (DATA.periods || [])
        .map(
          (period) => `<option value="${esc(period)}">${esc(period)}</option>`,
        )
        .join("");
    const settings = uniqueSorted(
      events.flatMap((event) => event.setting_tags || []),
    );
    qs("#settingFilter").innerHTML =
      '<option value="">All settings</option>' +
      settings
        .map(
          (setting) =>
            `<option value="${esc(setting)}">${esc(setting)}</option>`,
        )
        .join("");
    qs("#confidenceFilter").innerHTML =
      '<option value="">All confidence levels</option>' +
      Object.entries(CONFIDENCE_LABELS)
        .map(
          ([value, label]) =>
            `<option value="${esc(value)}">${esc(label)}</option>`,
        )
        .join("");
    const compareOptions = events
      .map(
        (event) =>
          `<option value="${esc(event.id)}">${esc(dateRange(event))} - ${esc(event.title)}</option>`,
      )
      .join("");
    qs("#compareA").innerHTML = compareOptions;
    qs("#compareB").innerHTML = compareOptions;
    qs("#compareA").value =
      events.find((event) => event.id === "philadelphia-yellow-fever-1793")
        ?.id || events[0].id;
    qs("#compareB").value =
      events.find((event) => event.id === "covid-19-2020")?.id ||
      events.at(-1).id;
  }

  function activeFilters() {
    return {
      query: qs("#searchInput").value.trim().toLowerCase(),
      century: qs("#eraFilter").value,
      disease: qs("#diseaseFilter").value,
      transmission: qs("#transmissionFilter").value,
      period: qs("#periodFilter").value,
      setting: qs("#settingFilter").value,
      confidence: qs("#confidenceFilter").value,
      tier: qs("#tierFilter").value,
      turning: qs("#turningPointFilter").checked,
    };
  }

  function filterEvents() {
    const filters = activeFilters();
    const state = { path: guidedPath, mode: activeMode };
    for (const id of [
      "searchInput",
      "eraFilter",
      "diseaseFilter",
      "transmissionFilter",
      "periodFilter",
      "settingFilter",
      "confidenceFilter",
      "tierFilter",
    ])
      state[id] = qs("#" + id).value;
    state.turning = filters.turning ? "1" : null;
    EOE.setState(state);
    visibleEvents = events.filter((event) => {
      if (
        guidedPath === "water" &&
        !/water|sanitation|cholera|typhoid|enteric/i.test(textIndex(event))
      )
        return false;
      if (
        guidedPath === "military" &&
        !/military|army|barrack|soldier|troop|war|encampment/i.test(
          textIndex(event),
        )
      )
        return false;
      if (
        guidedPath === "vaccination" &&
        !/vaccin|inoculat|immuniz/i.test(textIndex(event))
      )
        return false;
      if (filters.century && event.century !== filters.century) return false;
      if (filters.disease && event.disease_group !== filters.disease)
        return false;
      if (
        filters.transmission &&
        event.transmission_category !== filters.transmission
      )
        return false;
      if (filters.period && !(event.period_tags || []).includes(filters.period))
        return false;
      if (
        filters.setting &&
        !(event.setting_tags || []).includes(filters.setting)
      )
        return false;
      if (filters.confidence && event.confidence !== filters.confidence)
        return false;
      if (filters.tier && event.significance_tier !== filters.tier)
        return false;
      if (
        filters.turning &&
        !(event.tags || []).includes("public-health-turning-point")
      )
        return false;
      if (filters.query && !textIndex(event).includes(filters.query))
        return false;
      return true;
    });
    return visibleEvents;
  }

  function renderEraNav(filtered) {
    const counts = new Map();
    filtered.forEach((event) =>
      counts.set(event.era_id, (counts.get(event.era_id) || 0) + 1),
    );
    qs("#eraNav").innerHTML = DATA.eras
      .filter((era) => counts.has(era.id))
      .map(
        (era) =>
          `<a href="#era-${esc(era.id)}">${esc(era.label)} · ${counts.get(era.id)}</a>`,
      )
      .join("");
  }

  function eventCard(event) {
    const asset = firstAsset(event);
    const badges = [
      `<span class="badge gold">${esc(diseaseLabel(event))}</span>`,
      `<span class="badge">${esc(event.transmission_category)}</span>`,
      `<span class="badge">${esc(tierLabel(event.significance_tier))}</span>`,
      evidenceBadges(event),
    ].join("");
    return `
            <article class="timeline-event" id="event-${esc(event.id)}" data-event-id="${esc(event.id)}" tabindex="0">
              <div class="event-grid">
                <div class="event-media">
                  <img src="${esc(asset.local_path)}" alt="${esc(asset.alt)}" loading="lazy" decoding="async" ${imageFallbackAttrs()} />
                </div>
                <div class="event-copy">
                  <div class="event-meta">
                    <span class="event-date">${esc(dateRange(event))}</span>
                    <span class="badge">${esc(event.polity_scope)}</span>
                  </div>
                  <h3>${esc(event.title)}</h3>
                  <p><strong>${esc(event.disease_or_condition)}</strong> · ${esc(event.pathogen_or_agent)} · ${esc(event.geography)}</p>
                  <p class="event-summary">${esc(event.summary_1_sentence)}</p>
                  <p class="event-significance"><span class="meta-label">Public-health significance:</span> ${esc(event.public_health_significance)}</p>
                  <p class="event-uncertainty"><span class="meta-label">Uncertainty:</span> ${esc(event.uncertainty_note)}</p>
                  <div class="badge-row">${badges}</div>
                  <div class="event-sources">
                    <span class="meta-label">Citations</span>
                    <div class="source-pills">${sourcePills(event)}</div>
                  </div>
                  <div class="event-actions">
                    <button class="small-button" type="button" data-open-event="${esc(event.id)}">Open evidence</button>
                    <button class="small-button" type="button" data-compare-event="${esc(event.id)}">Compare</button>
                  </div>
                </div>
              </div>
            </article>
          `;
  }

  function renderTimeline() {
    const filtered = filterEvents();
    renderEraNav(filtered);
    qs("#resultSummary").textContent =
      `${filtered.length} of ${events.length} entries shown across titles, places, diseases, agents, public-health significance, uncertainty notes, sources, and tags.`;
    if (!filtered.length) {
      qs("#timelineList").innerHTML =
        '<div class="empty-state">No epidemics match the current view.</div>';
      renderTable(filtered);
      return;
    }
    let lastEra = "";
    const html = filtered
      .map((event) => {
        const era = eraById.get(event.era_id);
        const breakHtml =
          event.era_id !== lastEra
            ? `<section class="era-break" id="era-${esc(event.era_id)}"><h2>${esc(era?.label || event.era_id)}</h2><p>${esc(era?.range || "")}</p></section>`
            : "";
        lastEra = event.era_id;
        return breakHtml + eventCard(event);
      })
      .join("");
    qs("#timelineList").innerHTML = html;
    applyImageFallbacks(qs("#timelineList"));
    updateStage(filtered[0]);
    wireEventButtons();
    wireObserver();
    renderTable(filtered);
    renderCompare();
  }

  function updateStage(event) {
    if (!event) return;
    const asset = firstAsset(event);
    const stageImage = qs("#stageImage");
    stageImage.onerror = () => {
      if (stageImage.dataset.fallbackApplied === "true") return;
      stageImage.dataset.fallbackApplied = "true";
      stageImage.classList.add("image-fallback");
      stageImage.src = stageFallback.local_path;
      stageImage.alt = stageFallback.alt;
    };
    stageImage.dataset.fallbackApplied = "false";
    stageImage.classList.remove("image-fallback");
    stageImage.src = asset.local_path;
    stageImage.alt = asset.alt;
    qs("#stageYear").textContent = yearOf(event);
    qs("#stageEra").textContent = eraLabel(event);
    qs("#stageTitle").textContent = event.title;
    qs("#stageThesis").textContent = event.summary_1_sentence;
    qs("#stageBadges").innerHTML = [
      `<span class="badge gold">${esc(diseaseLabel(event))}</span>`,
      `<span class="badge">${esc(event.transmission_category)}</span>`,
      evidenceBadges(event),
      `<span class="badge red">${esc(event.source_ids.length)} sources</span>`,
    ].join("");
    qsa(".timeline-event.active").forEach((node) =>
      node.classList.remove("active"),
    );
    qs(`#event-${CSS.escape(event.id)}`)?.classList.add("active");
  }

  function wireObserver() {
    observer?.disconnect();
    if (document.body.classList.contains("no-motion")) return;
    observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!active) return;
        const event = events.find(
          (item) => item.id === active.target.dataset.eventId,
        );
        if (event) updateStage(event);
      },
      {
        root: null,
        threshold: [0.24, 0.5, 0.75],
        rootMargin: "-30% 0px -42% 0px",
      },
    );
    qsa(".timeline-event").forEach((node) => observer.observe(node));
  }

  function renderTable(filtered = visibleEvents) {
    qs("#tableSummary").textContent =
      `${filtered.length} entries match the current view.`;
    if (!filtered.length) {
      qs("#tableWrap").innerHTML =
        '<div class="empty-state">No epidemics to display.</div>';
      return;
    }
    qs("#tableWrap").innerHTML = `
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Disease / agent</th>
                  <th>Place</th>
                  <th>Transmission</th>
                  <th>Confidence</th>
                  <th>Sources</th>
                </tr>
              </thead>
              <tbody>
                ${filtered
                  .map(
                    (event) => `
                  <tr>
                    <td>${esc(dateRange(event))}</td>
                    <td><button class="small-button" type="button" data-open-event="${esc(event.id)}">${esc(event.title)}</button></td>
                    <td>${esc(event.disease_or_condition)}<br /><span class="meta-label">${esc(event.pathogen_or_agent)}</span></td>
                    <td>${esc(event.geography)}</td>
                    <td>${esc(event.transmission_category)}</td>
                    <td>${esc(confidenceLabel(event))}</td>
                    <td>${esc(event.source_ids.length)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          `;
    wireEventButtons(qs("#tableWrap"));
  }

  function renderCompare() {
    EOE.setState({
      compareA: qs("#compareA").value,
      compareB: qs("#compareB").value,
    });
    const a =
      events.find((event) => event.id === qs("#compareA").value) || events[0];
    const b =
      events.find((event) => event.id === qs("#compareB").value) ||
      events.at(-1);
    qs("#compareGrid").innerHTML = [a, b]
      .map(
        (event) => `
              <article class="compare-card">
                <p class="kicker">${esc(dateRange(event))}</p>
                <h3>${esc(event.title)}</h3>
                <p><strong>${esc(event.disease_or_condition)}</strong> · ${esc(event.pathogen_or_agent)}</p>
                <p>${esc(event.geography)}</p>
                <p><span class="meta-label">Setting:</span> ${esc((event.setting_tags || []).join("; "))}</p>
                <p><span class="meta-label">Cases / deaths:</span> ${esc(event.case_estimate || "Unknown")} / ${esc(event.death_estimate || "Unknown")}</p>
                <p><span class="meta-label">Denominator:</span> ${esc(event.denominator_note || "No comparable population denominator is supplied; counts cannot be compared as rates.")}</p>
                <p><span class="meta-label">Response:</span> ${esc(event.public_health_response || "Not established in this record.")}</p>
                <div class="source-pill-row">${sourcePills(event, 5)}</div>
                <p><span class="meta-label">Disease group:</span> ${esc(diseaseLabel(event))}</p>
                <p><span class="meta-label">Transmission:</span> ${esc(event.transmission_category)}</p>
                <p><span class="meta-label">Public-health significance:</span> ${esc(event.public_health_significance)}</p>
                <p><span class="meta-label">Uncertainty:</span> ${esc(event.uncertainty_note)}</p>
                <div class="badge-row">${evidenceBadges(event)}</div>
                <button class="small-button" type="button" data-open-event="${esc(event.id)}">Open evidence</button>
              </article>
            `,
      )
      .join("");
    wireEventButtons(qs("#compareGrid"));
  }

  function openDrawer(eventId) {
    const event = events.find((item) => item.id === eventId);
    if (!event) return;
    lastFocused = document.activeElement;
    EOE.setState({ event: eventId });
    const assets = (event.asset_ids || [])
      .map((id) => assetById.get(id))
      .filter(Boolean);
    const sources = (event.source_ids || [])
      .map((id) => sourceById.get(id))
      .filter(Boolean);
    qs("#drawerBody").innerHTML = `
            <p class="kicker">${esc(eraLabel(event))}</p>
            <h2>${esc(event.title)}</h2>
            <div class="badge-row">
              <span class="badge gold">${esc(dateRange(event))}</span>
              <span class="badge">${esc(event.polity_scope)}</span>
              <span class="badge">${esc(event.transmission_category)}</span>
              ${evidenceBadges(event)}
              <span class="badge red">${esc(tierLabel(event.significance_tier))}</span>
            </div>
            <section class="drawer-section">
              <h3>Outbreak Description</h3>
              <p>${esc(event.summary_1_sentence)}</p>
              <p><strong>${esc(event.disease_or_condition)}</strong> · ${esc(event.pathogen_or_agent)}</p>
              <p><span class="meta-label">Place:</span> ${esc(event.geography)}</p>
            </section>
            <section class="drawer-section">
              <h3>Historical Context</h3>
              <p>${esc(event.historical_context)}</p>
            </section>
            <section class="drawer-section">
              <h3>Public-Health Significance</h3>
              <p>${esc(event.public_health_significance)}</p>
            </section>
            <section class="drawer-section">
              <h3>Transmission And Setting</h3>
              <p><span class="meta-label">Transmission category:</span> ${esc(event.transmission_category)}</p>
              <p><span class="meta-label">Settings:</span> ${esc((event.setting_tags || []).join(", "))}</p>
              <p><span class="meta-label">Location tags:</span> ${esc((event.modern_location_tags || []).join(", "))}</p>
              <p><span class="meta-label">Period tags:</span> ${esc((event.period_tags || []).join(", "))}</p>
            </section>
            <section class="drawer-section">
              <h3>Burden And Uncertainty</h3>
              <p>${esc(event.mortality_or_burden_note)}</p>
              <p><span class="meta-label">Uncertainty:</span> ${esc(event.uncertainty_note)}</p>
              <p><span class="meta-label">Evidence confidence:</span> ${esc(confidenceLabel(event))}</p>
            </section>
            <section class="drawer-section">
              <h3>Claim Ledger</h3>
              <ul class="source-list">
                ${(event.claims || [])
                  .map(
                    (claim) => `
                  <li>
                    ${esc(claim.claim)}
                    <br /><span class="meta-label">${esc(confidenceLabel(claim.confidence))} · ${esc(claim.claim_type)}</span>
                    ${claim.notes ? `<br /><span class="meta-label">${esc(claim.notes)}</span>` : ""}
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            </section>
            <section class="drawer-section">
              <h3>Sources</h3>
              <ul class="source-list">
                ${sources
                  .map(
                    (source) => `
                  <li>
                    <a href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.title)}</a>
                    <br /><span class="meta-label">${esc(source.source_type)}</span>
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            </section>
            <section class="drawer-section">
              <h3>Related Site Paths</h3>
              ${linkList(event.related_tool_links)}
              ${linkList(event.related_blog_links)}
            </section>
            <section class="drawer-section">
              <h3>Image Credits</h3>
              <ul class="credit-list">
                ${assets
                  .map(
                    (asset) => `
                  <li>
                    ${esc(asset.credit)}<br />
                    <span class="meta-label">${esc(asset.rights)}</span><br />
                    <a href="${esc(asset.source_url)}" target="_blank" rel="noreferrer">Image source</a>
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            </section>
          `;
    qs("#drawerBackdrop").hidden = false;
    qs("#detailDrawer").classList.add("open");
    qs("#detailDrawer").setAttribute("aria-hidden", "false");
    qs("#detailDrawer").inert = false;
    qs("#closeDrawer").focus();
  }

  function closeDrawer() {
    EOE.setState({ event: null });
    lastFocused?.focus();
    qs("#drawerBackdrop").hidden = true;
    qs("#detailDrawer").classList.remove("open");
    qs("#detailDrawer").setAttribute("aria-hidden", "true");
    qs("#detailDrawer").inert = true;
  }

  function wireEventButtons(root = document) {
    qsa("[data-open-event]", root).forEach((button) => {
      button.addEventListener("click", () =>
        openDrawer(button.dataset.openEvent),
      );
    });
    qsa("[data-compare-event]", root).forEach((button) => {
      button.addEventListener("click", () => {
        qs("#compareA").value = button.dataset.compareEvent;
        setMode("compare");
        qs("#compareView").scrollIntoView({
          behavior: document.body.classList.contains("no-motion")
            ? "auto"
            : "smooth",
        });
        renderCompare();
      });
    });
  }

  function setMode(mode) {
    activeMode = mode;
    EOE.setState({ mode });
    qs("#timelineView").hidden = mode !== "timeline";
    qs("#tableView").hidden = mode !== "table";
    qs("#compareView").hidden = mode !== "compare";
    qsa("[data-mode]").forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.mode === mode)),
    );
    if (mode === "table") renderTable(visibleEvents);
    if (mode === "compare") renderCompare();
  }

  function clearFilters() {
    guidedPath = "";
    qsa("[data-path]").forEach((b) => b.setAttribute("aria-pressed", "false"));
    EOE.setState({ event: null, compareA: null, compareB: null, path: null });
    qs("#searchInput").value = "";
    qs("#eraFilter").value = "";
    qs("#diseaseFilter").value = "";
    qs("#transmissionFilter").value = "";
    qs("#periodFilter").value = "";
    qs("#settingFilter").value = "";
    qs("#confidenceFilter").value = "";
    qs("#tierFilter").value = "";
    qs("#turningPointFilter").checked = false;
    qs("#compareA").selectedIndex = 0;
    qs("#compareB").selectedIndex = 1;
    renderTimeline();
  }

  function init() {
    qs("#statEvents").textContent = DATA.events.length;
    qs("#statSources").textContent = DATA.sources.length;
    qs("#statAssets").textContent = DATA.assets.length;
    const initial = new URLSearchParams(location.search);
    populateSelects();
    for (const id of [
      "searchInput",
      "eraFilter",
      "diseaseFilter",
      "transmissionFilter",
      "periodFilter",
      "settingFilter",
      "confidenceFilter",
      "tierFilter",
      "compareA",
      "compareB",
    ]) {
      if (initial.has(id)) qs("#" + id).value = initial.get(id);
    }
    qs("#turningPointFilter").checked = initial.get("turning") === "1";
    guidedPath = ["water", "military", "vaccination"].includes(
      initial.get("path"),
    )
      ? initial.get("path")
      : "";
    renderTimeline();
    setMode(
      ["timeline", "table", "compare"].includes(initial.get("mode"))
        ? initial.get("mode")
        : "timeline",
    );
    if (initial.has("event")) openDrawer(initial.get("event"));
    qsa("[data-path]").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.path === guidedPath),
      );
      button.onclick = () => {
        clearFilters();
        guidedPath = button.dataset.path;
        button.setAttribute("aria-pressed", "true");
        renderTimeline();
        setMode("timeline");
      };
    });
    EOE.utilities(
      qs(".summary-strip").parentElement.querySelector(".tool-controls"),
    );

    [
      "#searchInput",
      "#eraFilter",
      "#diseaseFilter",
      "#transmissionFilter",
      "#periodFilter",
      "#settingFilter",
      "#confidenceFilter",
      "#tierFilter",
      "#turningPointFilter",
    ].forEach((selector) => {
      qs(selector).addEventListener("input", renderTimeline);
      qs(selector).addEventListener("change", renderTimeline);
    });
    qs("#clearFilters").addEventListener("click", clearFilters);
    qsa("[data-mode]").forEach((button) =>
      button.addEventListener("click", () => setMode(button.dataset.mode)),
    );
    qsa("[data-mode-jump]").forEach((button) =>
      button.addEventListener("click", () => {
        setMode(button.dataset.modeJump);
        qs(`#${button.dataset.modeJump}View`).scrollIntoView({
          behavior: EOE.reducedMotion() ? "instant" : "smooth",
        });
      }),
    );
    qs("#compareA").addEventListener("change", renderCompare);
    qs("#compareB").addEventListener("change", renderCompare);
    qs("#drawerBackdrop").addEventListener("click", closeDrawer);
    qs("#closeDrawer").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
      if (
        event.key === "Tab" &&
        qs("#detailDrawer").classList.contains("open")
      ) {
        const focusable = qsa(
          'a[href],button:not([disabled]),select,input,[tabindex="0"]',
          qs("#detailDrawer"),
        ).filter((el) => el.getClientRects().length);
        const first = focusable[0],
          last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    });
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    qs("#motionToggle").checked = false;
    document.body.classList.add("no-motion");
    qs("#motionToggle").addEventListener("change", () => {
      document.body.classList.toggle(
        "no-motion",
        reduced || !qs("#motionToggle").checked,
      );
      wireObserver();
    });
  }

  init();
})();
