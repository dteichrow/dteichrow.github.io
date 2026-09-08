const ATLAS_STATE = window.PATHOGEN_ATLAS_DATA || { entries: [] };
const BASE_URL = window.PATHOGEN_ATLAS_BASE_URL || "/";
const ATLAS_ENTRIES = Array.isArray(ATLAS_STATE.entries)
  ? ATLAS_STATE.entries
  : [];
const ENTRY_BY_SLUG = new Map(
  ATLAS_ENTRIES.map((entry) => [entry.slug, entry]),
);
const PALETTE = {
  "variola-smallpox": "#b56b5b",
  "yersinia-pestis-plague": "#b9754f",
  "vibrio-cholerae-cholera": "#5a9bd4",
  "mycobacterium-tuberculosis-complex": "#d98e5f",
  "influenza-a": "#b7c7df",
  "measles-virus": "#d6c06a",
  "yellow-fever-virus": "#d86a4f",
  "dengue-virus": "#c9a84c",
  "malaria-parasites": "#5abf7c",
  hantaviruses: "#7aa96b",
  "hiv-1": "#d26b91",
  "sars-cov-2": "#7b8fa8",
  poliovirus: "#7c9fd1",
  "treponema-pallidum-syphilis": "#c38a65",
  "salmonella-enterica": "#bc8f5f",
  "rickettsia-prowazekii-epidemic-typhus": "#9a8c5f",
  "yellow-fever": "#d86a4f",
  cholera: "#5a9bd4",
  measles: "#d6c06a",
  mpox: "#dd6974",
  "avian-influenza-h5n1": "#9b7bd8",
  hantavirus: "#7aa96b",
  dengue: "#c9a84c",
  malaria: "#5abf7c",
  tuberculosis: "#d98e5f",
  plague: "#b9754f",
};
const STATUS_LABELS = {
  consensus: "Consensus",
  mixed: "Mixed / debated",
  contested: "Contested",
  weak: "Weakly supported",
};
const CONFIDENCE_LABELS = {
  high: "High support",
  moderate: "Moderate support",
  low: "Low support",
  speculative: "Speculative",
  unknown: "Unknown",
  strong: "High support",
  mixed: "Moderate support",
  weak: "Low support",
  contested: "Contested",
};
const WRITING_LABELS = {
  direct: "Written here directly",
  adjacent: "Adjacent writing",
  not_yet_written: "No dedicated post yet",
};
const CATEGORY_ORDER = [
  "mosquito-borne",
  "tick-borne",
  "flea-louse-mite-borne",
  "other-arthropod-borne",
  "fecal-oral-waterborne",
  "foodborne",
  "airborne-respiratory",
  "contact-sexual-bloodborne",
  "zoonotic-animal-interface",
  "rodent-environmental",
  "soil-environmental",
  "healthcare-associated",
  "other-mixed",
];
const PATHOGEN_TYPE_ORDER = [
  "virus",
  "bacterium",
  "parasite",
  "prion",
  "toxin",
  "other",
  "Virus",
  "Bacterium",
  "Protozoan parasite",
  "Helminth",
  "Fungus",
  "Prion",
  "Other",
];
const map = L.map("map", {
  center: [18, 5],
  zoom: 2.4,
  zoomControl: false,
  attributionControl: false,
});
const darkBaseLayer = EOEMaps.createBaseLayer("dark");
const darkLabelLayer = EOEMaps.createLabelLayer("dark");
darkBaseLayer.addTo(map);
darkLabelLayer.addTo(map);
L.control.zoom({ position: "bottomright" }).addTo(map);
L.control
  .attribution({ position: "bottomleft", prefix: false })
  .addTo(map)
  .addAttribution("Natural Earth");

const scenarioBar = document.getElementById("scenario-bar");
const categorySelect = document.getElementById("category-select");
const typeSelect = document.getElementById("type-select");
const originConfidenceSelect = document.getElementById(
  "origin-confidence-select",
);
const evidenceTypeSelect = document.getElementById("evidence-type-select");
const pathogenSelect = document.getElementById("pathogen-select");
const pathogenSearch = document.getElementById("pathogen-search");
const filterCount = document.getElementById("filter-count");
const mapModeSelect = document.getElementById("map-mode-select");
const storyMeta = document.getElementById("story-meta");
const evidenceLinks = document.getElementById("evidence-links");
let currentIndex = 0;
let currentSlug = null;
let currentVariantSlug = null;
let currentCategory = "all";
let currentType = "all";
let currentOriginConfidence = "all";
let currentEvidenceType = "all";
let currentSearch = "";
let currentMapMode = "both";
let isPaused = true;
let rotationTimer = null;
let originMarker = null;
let endpointMarkers = [];
let routeLayers = [];
let geographyLayers = [];
let routeLayerById = new Map();
let currentFeatureGroup = L.featureGroup().addTo(map);
let currentActiveRouteId = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function colorFor(entry) {
  return entry.color || PALETTE[entry.slug] || "#c9a84c";
}

function categoryKeyFor(entry) {
  return entry.category || "other";
}

function categoryLabelFor(entry) {
  return entry.category_label || entry.transmission_group || "Other";
}

function typeKeyFor(entry) {
  return entry.pathogen_type || "Other";
}

function typeLabel(value) {
  const clean = String(value || "other");
  return clean
    .split(/[-_\s]+/)
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ""))
    .join(" ");
}

function originConfidenceFor(entry) {
  return (
    entry.origin_confidence ||
    entry.origin_claim?.confidence ||
    entry.confidence ||
    "moderate"
  );
}

function evidencePanelFor(entry) {
  return entry?.evidence_panel && typeof entry.evidence_panel === "object"
    ? entry.evidence_panel
    : {};
}

function evidenceTypesFor(entry) {
  const panel = evidencePanelFor(entry);
  const types = [];
  Object.entries(panel).forEach(([key, lane]) => {
    if (key === "major_uncertainties" || !lane || typeof lane !== "object")
      return;
    const status = String(lane.status || "").toLowerCase();
    if (
      !["absent", "not_applicable", "not applicable", "no"].includes(status)
    ) {
      types.push(key);
    }
  });
  const ancientStatus = String(
    entry.ancient_dna_evidence?.status || "",
  ).toLowerCase();
  if (
    ["yes", "limited"].includes(ancientStatus) &&
    !types.includes("ancient_dna_genomic")
  ) {
    types.push("ancient_dna_genomic");
  }
  return types;
}

function evidenceTypeLabel(value) {
  const configured = (ATLAS_STATE.evidence_types || []).find(
    (item) => item.id === value,
  );
  if (configured?.label) return configured.label;
  return String(value || "Evidence").replaceAll("_", " / ");
}

function normalizedSearchText(entry) {
  return [
    entry.name,
    entry.display_name,
    entry.agent_name,
    entry.slug,
    entry.subtitle,
    entry.category_label,
    entry.pathogen_type,
    entry.historical_signature,
    entry.origin_claim?.claim,
    entry.origin_claim?.narrative,
    entry.transmission_ecology,
    entry.public_health_control,
    entry.modern_status,
    ...(entry.disease_names || []),
    ...(entry.primary_reservoirs || []),
    ...(entry.intermediate_hosts || []),
    ...(entry.vectors || []),
    ...(entry.main_transmission_routes || []),
    ...(entry.badges || []),
    ...(entry.major_historical_episodes || []).map((episode) =>
      [
        episode.title,
        episode.summary,
        episode.date_display,
        ...(episode.locations || []),
      ]
        .filter(Boolean)
        .join(" "),
    ),
    ...Object.values(evidencePanelFor(entry)).map((lane) => {
      if (Array.isArray(lane)) {
        return lane
          .map((item) => (typeof item === "string" ? item : item.note))
          .filter(Boolean)
          .join(" ");
      }
      return lane && typeof lane === "object"
        ? [lane.label, lane.summary, lane.status].filter(Boolean).join(" ")
        : "";
    }),
    ...variantsFor(entry).map((variant) =>
      [variant.name, variant.slug, variant.subtitle].filter(Boolean).join(" "),
    ),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function categoryOptions() {
  const seen = new Map();
  const counts = new Map();
  ATLAS_ENTRIES.forEach((entry) => {
    const key = categoryKeyFor(entry);
    seen.set(key, categoryLabelFor(entry));
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return Array.from(seen.entries())
    .sort(([a], [b]) => {
      const ai = CATEGORY_ORDER.indexOf(a);
      const bi = CATEGORY_ORDER.indexOf(b);
      return (
        (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi) || a.localeCompare(b)
      );
    })
    .map(([key, label]) => [key, label, counts.get(key) || 0]);
}

function typeOptions(categoryFilter = currentCategory) {
  const counts = new Map();
  ATLAS_ENTRIES.filter((entry) => {
    return categoryFilter === "all" || categoryKeyFor(entry) === categoryFilter;
  }).forEach((entry) => {
    const key = typeKeyFor(entry);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return Array.from(counts.entries()).sort(([a], [b]) => {
    const ai = PATHOGEN_TYPE_ORDER.indexOf(a);
    const bi = PATHOGEN_TYPE_ORDER.indexOf(b);
    return (
      (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi) || a.localeCompare(b)
    );
  });
}

function originConfidenceOptions() {
  const counts = new Map();
  ATLAS_ENTRIES.filter(
    (entry) =>
      currentCategory === "all" || categoryKeyFor(entry) === currentCategory,
  )
    .filter(
      (entry) => currentType === "all" || typeKeyFor(entry) === currentType,
    )
    .forEach((entry) => {
      const key = originConfidenceFor(entry);
      counts.set(key, (counts.get(key) || 0) + 1);
    });
  const order = [
    "high",
    "moderate",
    "low",
    "contested",
    "unknown",
    "speculative",
  ];
  return Array.from(counts.entries()).sort(([a], [b]) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    return (
      (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi) || a.localeCompare(b)
    );
  });
}

function evidenceTypeOptions() {
  const counts = new Map();
  ATLAS_ENTRIES.filter((entry) => {
    const categoryMatches =
      currentCategory === "all" || categoryKeyFor(entry) === currentCategory;
    const typeMatches =
      currentType === "all" || typeKeyFor(entry) === currentType;
    const originMatches =
      currentOriginConfidence === "all" ||
      originConfidenceFor(entry) === currentOriginConfidence;
    return categoryMatches && typeMatches && originMatches;
  }).forEach((entry) => {
    evidenceTypesFor(entry).forEach((type) =>
      counts.set(type, (counts.get(type) || 0) + 1),
    );
  });
  const configuredOrder = (ATLAS_STATE.evidence_types || []).map(
    (item) => item.id,
  );
  return Array.from(counts.entries()).sort(([a], [b]) => {
    const ai = configuredOrder.indexOf(a);
    const bi = configuredOrder.indexOf(b);
    return (
      (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi) || a.localeCompare(b)
    );
  });
}

function entriesInScope() {
  const query = currentSearch.trim().toLowerCase();
  return ATLAS_ENTRIES.filter((entry) => {
    const categoryMatches =
      currentCategory === "all" || categoryKeyFor(entry) === currentCategory;
    const typeMatches =
      currentType === "all" || typeKeyFor(entry) === currentType;
    const originMatches =
      currentOriginConfidence === "all" ||
      originConfidenceFor(entry) === currentOriginConfidence;
    const evidenceMatches =
      currentEvidenceType === "all" ||
      evidenceTypesFor(entry).includes(currentEvidenceType);
    const searchMatches = !query || normalizedSearchText(entry).includes(query);
    return (
      categoryMatches &&
      typeMatches &&
      originMatches &&
      evidenceMatches &&
      searchMatches
    );
  });
}

function variantsFor(entry) {
  return Array.isArray(entry?.variants) ? entry.variants : [];
}

function resolveActiveEntry(entry) {
  const variants = variantsFor(entry);
  if (!variants.length) {
    return entry;
  }
  const fallback = entry.default_variant_slug || variants[0].slug;
  const resolvedSlug = variants.some(
    (variant) => variant.slug === currentVariantSlug,
  )
    ? currentVariantSlug
    : fallback;
  currentVariantSlug = resolvedSlug;
  return (
    variants.find((variant) => variant.slug === resolvedSlug) || variants[0]
  );
}

function confidenceLabel(value) {
  return CONFIDENCE_LABELS[value] || "Evidence note";
}

function routeDashArray(confidence) {
  if (confidence === "high" || confidence === "strong") return null;
  if (confidence === "moderate") return "12 8";
  if (confidence === "mixed") return "8 8";
  return "4 10";
}

function routeOpacity(confidence) {
  if (confidence === "high" || confidence === "strong") return 0.92;
  if (confidence === "moderate") return 0.82;
  if (confidence === "mixed") return 0.72;
  return 0.62;
}

function geographyOpacity(confidence) {
  if (confidence === "high" || confidence === "strong") return 0.2;
  if (confidence === "moderate") return 0.16;
  if (confidence === "mixed") return 0.12;
  return 0.09;
}

function geographyTypeColor(layer, fallbackColor) {
  return (
    {
      global_distribution: "#9eb4b2",
      endemic_zone: fallbackColor,
      reservoir_ecology: "#9dcf8d",
      outbreak_region: "#d8876d",
      surveillance_region: "#8fb8d8",
      exposure_zone: "#8cc9b5",
    }[layer?.layer_type] || fallbackColor
  );
}

function geographyDashArray(layer) {
  return (
    {
      global_distribution: "2 12",
      reservoir_ecology: "7 6",
      outbreak_region: "1 8",
      surveillance_region: "10 8",
      exposure_zone: "14 10",
    }[layer?.layer_type] || null
  );
}

function geographyStrokeWeight(layer) {
  return (
    {
      global_distribution: 1.2,
      endemic_zone: 2.1,
      reservoir_ecology: 2.0,
      outbreak_region: 2.7,
      surveillance_region: 1.8,
      exposure_zone: 1.8,
    }[layer?.layer_type] || 1.8
  );
}

function geographyFillOpacity(layer) {
  const base = geographyOpacity(layer?.confidence);
  if (layer?.layer_type === "global_distribution") return Math.min(base, 0.075);
  if (layer?.layer_type === "reservoir_ecology") return base * 0.9;
  if (layer?.layer_type === "outbreak_region")
    return Math.min(base + 0.04, 0.22);
  if (layer?.layer_type === "surveillance_region") return base * 0.55;
  if (layer?.layer_type === "exposure_zone") return base * 0.82;
  return base;
}

function geographyLabel(layer) {
  return (
    {
      global_distribution: "Global distribution",
      endemic_zone: "Endemic zone",
      reservoir_ecology: "Reservoir ecology",
      outbreak_region: "Outbreak region",
      surveillance_region: "Surveillance region",
      exposure_zone: "Exposure zone",
    }[layer?.layer_type] || "Geographic layer"
  );
}

function geographyCssClass(layer) {
  return `layer-${String(layer?.layer_type || "other")}`;
}

function geographyLayerBadgeClass(layer) {
  return `layer-${String(layer?.layer_type || "other")}`;
}

function mapModeLabel(value) {
  return (
    {
      both: "Routes + extent",
      routes: "Routes only",
      geography: "Extent only",
      evidence: "Evidence view",
    }[value] || "Routes + extent"
  );
}

function citationsById(entry) {
  const citations = new Map();
  (entry?.citations || []).forEach((citation) => {
    if (citation?.id) {
      citations.set(citation.id, citation);
    }
  });
  return citations;
}

function citationLabel(citation) {
  return (
    citation?.short_citation || citation?.title || citation?.id || "Source"
  );
}

function sourceIdsFor(item) {
  if (Array.isArray(item?.source_ids)) return item.source_ids;
  if (Array.isArray(item?.citation_ids)) return item.citation_ids;
  return [];
}

function sourceLinks(ids, activeEntry) {
  const citations = citationsById(activeEntry);
  if (!Array.isArray(ids) || !ids.length) {
    return '<span class="badge warning">No source linked</span>';
  }
  return ids
    .map((id) => {
      const citation = citations.get(id);
      if (citation?.url) {
        return `<a class="panel-link" href="${escapeHtml(citation.url)}">${escapeHtml(citationLabel(citation))}</a>`;
      }
      return `<span class="badge">${escapeHtml(id)}</span>`;
    })
    .join("");
}

function hasReviewedGeography(entry) {
  return (entry?.geography_layers || []).some(
    (layer) => sourceIdsFor(layer).length,
  );
}

function shouldDrawGeography() {
  return currentMapMode !== "routes";
}

function shouldDrawRoutes() {
  return currentMapMode !== "geography";
}

function makeMarker(color, kind = "origin") {
  const className = kind === "origin" ? "origin-marker" : "endpoint-marker";
  const size = kind === "origin" ? 24 : 18;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    html: `<div class="${className}" style="color:${color}"></div>`,
  });
}

function toLatLng(coordinates) {
  const [lng, lat] = coordinates;
  return [lat, lng];
}

function arcLatLngs(fromCoordinates, toCoordinates) {
  const start = toLatLng(fromCoordinates);
  const end = toLatLng(toCoordinates);
  const midLat = (start[0] + end[0]) / 2;
  const midLng = (start[1] + end[1]) / 2;
  const deltaLat = end[0] - start[0];
  const deltaLng = end[1] - start[1];
  const distance = Math.sqrt(deltaLat ** 2 + deltaLng ** 2);
  const lift = Math.min(Math.max(distance * 0.16, 5), 18);
  const controlLat = midLat + deltaLng * 0.18;
  const controlLng = midLng - deltaLat * 0.18 + lift;
  const points = [];
  for (let step = 0; step <= 20; step += 1) {
    const t = step / 20;
    const oneMinusT = 1 - t;
    const lat =
      oneMinusT * oneMinusT * start[0] +
      2 * oneMinusT * t * controlLat +
      t * t * end[0];
    const lng =
      oneMinusT * oneMinusT * start[1] +
      2 * oneMinusT * t * controlLng +
      t * t * end[1];
    points.push([lat, lng]);
  }
  return points;
}

function ellipseLatLngs(layer) {
  const center = layer.center || [0, 0];
  const radiusLng = Number(layer.radius_lng || 1);
  const radiusLat = Number(layer.radius_lat || 1);
  const rotation = (Number(layer.rotation_degrees || 0) * Math.PI) / 180;
  const points = [];
  for (let step = 0; step <= 72; step += 1) {
    const angle = (Math.PI * 2 * step) / 72;
    const x = Math.cos(angle) * radiusLng;
    const y = Math.sin(angle) * radiusLat;
    const lng = center[0] + x * Math.cos(rotation) - y * Math.sin(rotation);
    const lat = center[1] + x * Math.sin(rotation) + y * Math.cos(rotation);
    points.push([lat, lng]);
  }
  return points;
}

function scopedIndex(delta) {
  const scoped = entriesInScope();
  if (!scoped.length) {
    return currentIndex;
  }
  const active = ATLAS_ENTRIES[currentIndex];
  const scopedCurrentIndex = scoped.findIndex(
    (entry) => entry.slug === active?.slug,
  );
  const baseIndex =
    scopedCurrentIndex >= 0 ? scopedCurrentIndex : delta > 0 ? -1 : 0;
  const nextScopedIndex =
    (((baseIndex + delta) % scoped.length) + scoped.length) % scoped.length;
  return ATLAS_ENTRIES.findIndex(
    (entry) => entry.slug === scoped[nextScopedIndex].slug,
  );
}

function populatePathogenSelect(selectedSlug) {
  const scoped = entriesInScope();
  const total = ATLAS_ENTRIES.length;
  const countCopy =
    scoped.length === total
      ? `${total} pathogen profiles in the atlas`
      : `${scoped.length} of ${total} profiles shown`;
  filterCount.textContent = `${countCopy} | ${mapModeLabel(currentMapMode)}`;
  if (!scoped.length) {
    pathogenSelect.disabled = true;
    pathogenSelect.innerHTML =
      '<option value="">No diseases match selected filters</option>';
    return;
  }
  pathogenSelect.disabled = false;
  pathogenSelect.innerHTML = scoped
    .map(
      (entry) => `
    <option value="${escapeHtml(entry.slug)}"${entry.slug === selectedSlug ? " selected" : ""}>
      ${escapeHtml(entry.display_name || entry.name)}
    </option>
  `,
    )
    .join("");
}

function renderTypeSelectOptions() {
  const categoryScopedTotal =
    currentCategory === "all"
      ? ATLAS_ENTRIES.length
      : ATLAS_ENTRIES.filter(
          (entry) => categoryKeyFor(entry) === currentCategory,
        ).length;
  const types = typeOptions(currentCategory);
  const validTypes = new Set(types.map(([key]) => key));
  if (currentType !== "all" && !validTypes.has(currentType)) {
    currentType = "all";
  }
  typeSelect.innerHTML = [
    `<option value="all">All types (${categoryScopedTotal})</option>`,
    ...types.map(
      ([key, count]) =>
        `<option value="${escapeHtml(key)}">${escapeHtml(typeLabel(key))} (${count})</option>`,
    ),
  ].join("");
  typeSelect.value = currentType;
}

function renderOriginConfidenceOptions() {
  const options = originConfidenceOptions();
  const valid = new Set(options.map(([key]) => key));
  if (
    currentOriginConfidence !== "all" &&
    !valid.has(currentOriginConfidence)
  ) {
    currentOriginConfidence = "all";
  }
  originConfidenceSelect.innerHTML = [
    `<option value="all">All origin confidence</option>`,
    ...options.map(
      ([key, count]) =>
        `<option value="${escapeHtml(key)}">${escapeHtml(confidenceLabel(key))} (${count})</option>`,
    ),
  ].join("");
  originConfidenceSelect.value = currentOriginConfidence;
}

function renderEvidenceTypeOptions() {
  const options = evidenceTypeOptions();
  const valid = new Set(options.map(([key]) => key));
  if (currentEvidenceType !== "all" && !valid.has(currentEvidenceType)) {
    currentEvidenceType = "all";
  }
  evidenceTypeSelect.innerHTML = [
    `<option value="all">All evidence types</option>`,
    ...options.map(
      ([key, count]) =>
        `<option value="${escapeHtml(key)}">${escapeHtml(evidenceTypeLabel(key))} (${count})</option>`,
    ),
  ].join("");
  evidenceTypeSelect.value = currentEvidenceType;
}

function selectFirstScopedEntry() {
  const firstScopedEntry = entriesInScope()[0];
  if (!firstScopedEntry) {
    populatePathogenSelect("");
    return;
  }
  const nextIndex = ATLAS_ENTRIES.findIndex(
    (entry) => entry.slug === firstScopedEntry.slug,
  );
  selectIndex(nextIndex, { userInitiated: true });
}

function syncScenarioControls(entry) {
  if (!entry) return;
  const activeCategory =
    currentCategory === "all" ? "all" : categoryKeyFor(entry);
  if (categorySelect.value !== activeCategory) {
    categorySelect.value = activeCategory;
  }
  const activeType = currentType === "all" ? "all" : typeKeyFor(entry);
  if (typeSelect.value !== activeType) {
    typeSelect.value = activeType;
  }
  populatePathogenSelect(entry.slug);
  pathogenSelect.value = entry.slug;
  originConfidenceSelect.value = currentOriginConfidence;
  evidenceTypeSelect.value = currentEvidenceType;
  mapModeSelect.value = currentMapMode;
}

function renderScenarioControls() {
  const categories = categoryOptions();
  categorySelect.innerHTML = [
    `<option value="all">All categories (${ATLAS_ENTRIES.length})</option>`,
    ...categories.map(
      ([key, label, count]) =>
        `<option value="${escapeHtml(key)}">${escapeHtml(label)} (${count})</option>`,
    ),
  ].join("");
  categorySelect.value = currentCategory;
  renderTypeSelectOptions();
  renderOriginConfidenceOptions();
  renderEvidenceTypeOptions();
  populatePathogenSelect(ATLAS_ENTRIES[currentIndex]?.slug);

  categorySelect.addEventListener("change", () => {
    currentCategory = categorySelect.value;
    renderTypeSelectOptions();
    renderOriginConfidenceOptions();
    renderEvidenceTypeOptions();
    selectFirstScopedEntry();
  });
  typeSelect.addEventListener("change", () => {
    currentType = typeSelect.value;
    renderOriginConfidenceOptions();
    renderEvidenceTypeOptions();
    selectFirstScopedEntry();
  });
  originConfidenceSelect.addEventListener("change", () => {
    currentOriginConfidence = originConfidenceSelect.value;
    renderEvidenceTypeOptions();
    selectFirstScopedEntry();
  });
  evidenceTypeSelect.addEventListener("change", () => {
    currentEvidenceType = evidenceTypeSelect.value;
    selectFirstScopedEntry();
  });
  pathogenSearch.addEventListener("input", () => {
    currentSearch = pathogenSearch.value;
    selectFirstScopedEntry();
  });
  pathogenSelect.addEventListener("change", () => {
    const index = ATLAS_ENTRIES.findIndex(
      (entry) => entry.slug === pathogenSelect.value,
    );
    if (index >= 0) {
      selectIndex(index, { userInitiated: true });
    }
  });
  mapModeSelect.addEventListener("change", () => {
    currentMapMode = mapModeSelect.value;
    const entry = ENTRY_BY_SLUG.get(currentSlug) || ATLAS_ENTRIES[currentIndex];
    if (!entry) {
      return;
    }
    const activeEntry = resolveActiveEntry(entry);
    populatePathogenSelect(entry.slug);
    renderStoryPanel(entry, activeEntry);
    renderEvidencePanel(entry, activeEntry);
    drawEntry(activeEntry);
    if (currentMapMode === "routes" && activeEntry.spread_routes?.length) {
      focusRoute(activeEntry.spread_routes[0].route_id);
    }
    scheduleRotation();
  });
  document
    .getElementById("prev-btn")
    .addEventListener("click", () =>
      selectIndex(scopedIndex(-1), { userInitiated: true }),
    );
  document
    .getElementById("next-btn")
    .addEventListener("click", () =>
      selectIndex(scopedIndex(1), { userInitiated: true }),
    );
  document
    .getElementById("pause-btn")
    .addEventListener("click", () => setPaused(!isPaused));
  document.getElementById("reset-btn").addEventListener("click", () => {
    EOE.setState({ ecology: null, variant: null });
    document.getElementById("evidence-panel").open = false;
    currentCategory = "all";
    currentType = "all";
    currentOriginConfidence = "all";
    currentEvidenceType = "all";
    currentSearch = "";
    currentMapMode = "both";
    categorySelect.value = "all";
    typeSelect.value = "all";
    originConfidenceSelect.value = "all";
    evidenceTypeSelect.value = "all";
    pathogenSearch.value = "";
    mapModeSelect.value = "both";
    setPaused(true);
    selectIndex(0);
    fitCurrentEntry();
  });
}

function setPaused(nextValue) {
  isPaused = nextValue;
  const button = document.getElementById("pause-btn");
  button.textContent = isPaused ? "Start rotation" : "Stop rotation";
  button.classList.toggle("active", isPaused);
  button.setAttribute("aria-pressed", String(isPaused));
  document.getElementById("rotation-state").textContent = isPaused
    ? "The view stays still until you change it."
    : "Rotation is on.";
  scheduleRotation();
}

function scheduleRotation() {
  if (rotationTimer) {
    clearTimeout(rotationTimer);
    rotationTimer = null;
  }
  if (isPaused || ATLAS_ENTRIES.length < 2) {
    return;
  }
  rotationTimer = window.setTimeout(() => {
    selectIndex(scopedIndex(1), { fromRotation: true });
  }, 12000);
}

function fitCurrentEntry() {
  if (!currentFeatureGroup || !currentFeatureGroup.getLayers().length) {
    return;
  }
  map.fitBounds(currentFeatureGroup.getBounds().pad(0.18), { maxZoom: 4 });
}

function renderMeta(entry, activeEntry) {
  const variants = variantsFor(entry);
  const statusLabel = STATUS_LABELS[activeEntry.status] || "Curated";
  const writingLabel =
    WRITING_LABELS[activeEntry.writing_state] || "Writing state pending";
  const badgesFromEntry = (activeEntry.badges || entry.badges || [])
    .slice(0, 4)
    .map((badge) => {
      const badgeClass = /vector|mosquito|louse|reservoir/i.test(badge)
        ? "vector"
        : /eradicated|vaccine/i.test(badge)
          ? "eradicated"
          : "";
      return `<span class="badge ${badgeClass}">${escapeHtml(badge)}</span>`;
    });
  const badges = [
    `<span class="badge accent">${escapeHtml(confidenceLabel(activeEntry.confidence || entry.confidence || "moderate"))}</span>`,
    `<span class="badge ${originConfidenceFor(activeEntry) === "contested" || originConfidenceFor(activeEntry) === "unknown" ? "warning" : ""}">Origin: ${escapeHtml(confidenceLabel(originConfidenceFor(activeEntry)))}</span>`,
    `<span class="badge">${escapeHtml(categoryLabelFor(entry))}</span>`,
    `<span class="badge signal">${escapeHtml(typeLabel(activeEntry.pathogen_type || entry.pathogen_type || "pathogen"))}</span>`,
    `<span class="badge">${escapeHtml(mapModeLabel(currentMapMode))}</span>`,
    hasReviewedGeography(activeEntry)
      ? `<span class="badge reviewed">Reviewed geography</span>`
      : "",
    activeEntry.atlas_scope || entry.atlas_scope
      ? `<span class="badge">${escapeHtml(activeEntry.atlas_scope || entry.atlas_scope)}</span>`
      : "",
    variants.length
      ? `<span class="badge">${escapeHtml(activeEntry.name || "Variant view")}</span>`
      : "",
    ...badgesFromEntry,
  ].filter(Boolean);
  storyMeta.innerHTML = badges.join("");
}

function renderVariantSelector(entry, activeEntry) {
  const variants = variantsFor(entry);
  const shell = document.getElementById("variant-shell");
  const select = document.getElementById("variant-select");
  const note = document.getElementById("variant-note");
  if (!variants.length) {
    shell.hidden = true;
    select.innerHTML = "";
    note.textContent = "";
    return;
  }
  shell.hidden = false;
  select.innerHTML = variants
    .map(
      (variant) => `
    <option value="${escapeHtml(variant.slug)}"${variant.slug === activeEntry.slug ? " selected" : ""}>${escapeHtml(variant.name)}</option>
  `,
    )
    .join("");
  note.textContent = activeEntry.subtitle || activeEntry.summary || "";
  select.onchange = () => selectVariant(select.value);
}

function renderLayerSourceLinks(layer, activeEntry) {
  return sourceLinks(sourceIdsFor(layer), activeEntry);
}

function renderKnowledgeStatus(entry) {
  const status = entry.knowledge_status || {};
  const sections = [
    ["known", "Known"],
    ["inferred", "Inferred"],
    ["contested", "Contested"],
    ["unknown", "Unknown"],
  ];
  return (
    sections
      .map(([key, label]) => {
        const items = Array.isArray(status[key]) ? status[key] : [];
        if (!items.length) return "";
        return `
      <article class="knowledge-card">
        <h3>${escapeHtml(label)}</h3>
        <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    `;
      })
      .filter(Boolean)
      .join("") ||
    '<article class="knowledge-card"><p class="note-text">This profile has no knowledge-status breakdown yet.</p></article>'
  );
}

function renderEcology(activeEntry) {
  const rows = [
    ["Agent", activeEntry.agent_name],
    ["Disease names", (activeEntry.disease_names || []).join(", ")],
    ["Reservoirs", (activeEntry.primary_reservoirs || []).join("; ")],
    ["Intermediate hosts", (activeEntry.intermediate_hosts || []).join("; ")],
    ["Vectors", (activeEntry.vectors || []).join("; ")],
    ["Transmission", (activeEntry.main_transmission_routes || []).join("; ")],
    ["Incubation", activeEntry.incubation_period_summary],
    ["Modern status", activeEntry.modern_status],
  ].filter(([, value]) => value);
  return rows
    .map(
      ([label, value]) => `
    <article class="detail-card">
      <div class="subsection-kicker">${escapeHtml(label)}</div>
      <p class="panel-copy">${escapeHtml(value)}</p>
    </article>
  `,
    )
    .join("");
}

function renderEpisodeList(activeEntry) {
  const episodes = activeEntry.major_historical_episodes || [];
  if (!episodes.length) {
    return '<article class="detail-card"><p class="note-text">No historical episodes are attached to this profile yet.</p></article>';
  }
  return episodes
    .map(
      (episode) => `
    <article class="detail-card">
      <div class="subsection-kicker">${escapeHtml(episode.date_display || "Episode")}</div>
      <h3>${escapeHtml(episode.title || "Historical episode")}</h3>
      <div class="meta-row">
        <span class="badge accent">${escapeHtml(confidenceLabel(episode.confidence))}</span>
        ${(episode.locations || [])
          .slice(0, 3)
          .map(
            (location) => `<span class="badge">${escapeHtml(location)}</span>`,
          )
          .join("")}
      </div>
      <p class="panel-copy">${escapeHtml(episode.summary || "")}</p>
      <div class="source-row">${sourceLinks(sourceIdsFor(episode), activeEntry)}</div>
    </article>
  `,
    )
    .join("");
}

function renderEvidenceKindList(activeEntry) {
  const panel = evidencePanelFor(activeEntry);
  const laneHtml = Object.entries(panel)
    .filter(([key]) => key !== "major_uncertainties")
    .map(([key, lane]) => {
      if (!lane || typeof lane !== "object") return "";
      const status = String(lane.status || "moderate");
      const statusClass = ["low", "contested", "limited"].includes(status)
        ? "warning"
        : status === "strong"
          ? "reviewed"
          : "accent";
      return `
      <article class="evidence-card">
        <div class="subsection-kicker">${escapeHtml(evidenceTypeLabel(key))}</div>
        <h3>${escapeHtml(lane.label || evidenceTypeLabel(key))}</h3>
        <div class="meta-row"><span class="badge ${escapeHtml(statusClass)}">${escapeHtml(typeLabel(status.replaceAll("_", " ")))}</span></div>
        <p class="panel-copy">${escapeHtml(lane.summary || "")}</p>
        <div class="source-row">${sourceLinks(sourceIdsFor(lane), activeEntry)}</div>
      </article>
    `;
    })
    .filter(Boolean)
    .join("");
  const uncertainties = Array.isArray(panel.major_uncertainties)
    ? panel.major_uncertainties
    : [];
  const uncertaintyHtml = uncertainties.length
    ? `
    <article class="evidence-card">
      <div class="subsection-kicker">Major uncertainties</div>
      <ul>
        ${uncertainties
          .map(
            (item) => `
          <li>
            ${escapeHtml(typeof item === "string" ? item : item.note || "")}
            ${typeof item === "object" ? `<div class="source-row">${sourceLinks(sourceIdsFor(item), activeEntry)}</div>` : ""}
          </li>
        `,
          )
          .join("")}
      </ul>
    </article>
  `
    : "";
  return laneHtml + uncertaintyHtml;
}

function renderStoryPanel(entry, activeEntry) {
  renderHostChain(activeEntry);
  const variants = variantsFor(entry);
  document.getElementById("story-kicker").textContent = variants.length
    ? "Pathogen family atlas"
    : entry.atlas_scope || "Curated atlas";
  document.getElementById("story-title").textContent =
    entry.display_name || entry.name || "Untitled pathogen";
  document.getElementById("story-copy").textContent = variants.length
    ? entry.summary || ""
    : activeEntry.historical_signature ||
      activeEntry.summary ||
      entry.summary ||
      "";
  document.getElementById("why-matters-copy").textContent =
    activeEntry.historical_signature ||
    activeEntry.why_it_matters ||
    entry.why_it_matters ||
    "";
  document.getElementById("knowledge-status").innerHTML =
    renderKnowledgeStatus(activeEntry);
  document.getElementById("ecology-list").innerHTML =
    renderEcology(activeEntry);
  document.getElementById("episode-list").innerHTML =
    renderEpisodeList(activeEntry);
  renderMeta(entry, activeEntry);
  renderVariantSelector(entry, activeEntry);

  const routeHtml = (activeEntry.spread_routes || [])
    .map(
      (route, index) => `
    <button class="route-step ${index === 0 ? "active" : ""}" type="button" data-route-id="${escapeHtml(route.route_id)}">
      <div class="route-head">
        <div>
          <div class="subsection-kicker">${escapeHtml(route.date_or_era || "Route note")}</div>
          <div class="route-label">${escapeHtml(route.from_label || "Origin")} to ${escapeHtml(route.to_label || "Destination")}</div>
        </div>
        <span class="badge">${escapeHtml(confidenceLabel(route.confidence))}</span>
      </div>
      <div class="route-copy">${escapeHtml(route.narrative || "")}</div>
      <div class="source-row">${sourceLinks(sourceIdsFor(route), activeEntry)}</div>
    </button>
  `,
    )
    .join("");
  document.getElementById("route-list").innerHTML =
    routeHtml ||
    '<div class="detail-card"><div class="route-copy">No mapped route segments are attached to this pathogen yet.</div></div>';
  document.querySelectorAll(".route-step").forEach((button) => {
    button.addEventListener("click", () => focusRoute(button.dataset.routeId));
  });

  const geographyHtml = (activeEntry.geography_layers || [])
    .map(
      (layer) => `
    <article class="detail-card">
      <div class="subsection-kicker">${escapeHtml(geographyLabel(layer))}</div>
      <h3>${escapeHtml(layer.label || "Geographic layer")}</h3>
      <div class="meta-row">
        <span class="badge ${escapeHtml(geographyLayerBadgeClass(layer))}">${escapeHtml(geographyLabel(layer))}</span>
        <span class="badge accent">${escapeHtml(confidenceLabel(layer.confidence))}</span>
        ${sourceIdsFor(layer).length ? '<span class="badge reviewed">Reviewed geography</span>' : ""}
        ${layer.claim_type ? `<span class="badge">${escapeHtml(layer.claim_type)}</span>` : ""}
        ${layer.date_or_era ? `<span class="badge">${escapeHtml(layer.date_or_era)}</span>` : ""}
      </div>
      <p class="panel-copy">${escapeHtml(layer.narrative || "")}</p>
      <div class="source-row">${renderLayerSourceLinks(layer, activeEntry)}</div>
    </article>
  `,
    )
    .join("");
  document.getElementById("geography-list").innerHTML =
    geographyHtml ||
    '<div class="detail-card"><div class="route-copy">No distribution or endemic-zone layer is attached to this pathogen yet.</div></div>';
}

function renderEvidencePanel(entry, activeEntry) {
  document.getElementById("evidence-title").textContent =
    activeEntry.display_name ||
    activeEntry.name ||
    entry.display_name ||
    entry.name ||
    "Evidence panel";
  document.getElementById("origin-copy").textContent =
    activeEntry.origin_claim?.claim ||
    activeEntry.origin_claim?.narrative ||
    "";
  document.getElementById("origin-label").textContent =
    activeEntry.origin_claim?.label || "Origin claim";
  document.getElementById("origin-narrative").textContent =
    activeEntry.origin_claim?.narrative ||
    activeEntry.origin_claim?.statement ||
    "";
  document.getElementById("origin-uncertainty").textContent =
    activeEntry.origin_uncertainty_note ||
    activeEntry.origin_claim?.uncertainty_note ||
    "";
  document.getElementById("origin-source-links").innerHTML = sourceLinks(
    sourceIdsFor(activeEntry.origin_claim),
    activeEntry,
  );
  document.getElementById("origin-meta").innerHTML = [
    `<span class="badge accent">${escapeHtml(confidenceLabel(activeEntry.origin_claim?.confidence || activeEntry.origin_confidence))}</span>`,
    activeEntry.origin_claim?.claim_type
      ? `<span class="badge">${escapeHtml(activeEntry.origin_claim.claim_type)}</span>`
      : "",
    activeEntry.origin_claim?.date_or_era
      ? `<span class="badge">${escapeHtml(activeEntry.origin_claim.date_or_era)}</span>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const links = [];
  if (activeEntry.reference_href || entry.reference_href) {
    links.push(
      `<a class="panel-link" href="${escapeHtml(activeEntry.reference_href || entry.reference_href)}">Disease sheet</a>`,
    );
  }
  if (activeEntry.related_stories && activeEntry.related_stories.length) {
    links.push(
      `<a class="panel-link" href="${escapeHtml(activeEntry.related_stories[0].story_href)}">Active story file</a>`,
    );
  }
  if (activeEntry.earliest_strong_evidence?.description) {
    links.push(
      `<span class="badge reviewed">Earliest evidence: ${escapeHtml(activeEntry.earliest_strong_evidence.evidence_type || "documented")}</span>`,
    );
  }
  if (activeEntry.ancient_dna_evidence?.status) {
    links.push(
      `<span class="badge ${["yes", "limited"].includes(activeEntry.ancient_dna_evidence.status) ? "reviewed" : ""}">Ancient DNA: ${escapeHtml(activeEntry.ancient_dna_evidence.status)}</span>`,
    );
  }
  evidenceLinks.innerHTML = links.join("");
  document.getElementById("evidence-kind-list").innerHTML =
    renderEvidenceKindList(activeEntry);

  const geographyEvidenceHtml = (activeEntry.geography_layers || [])
    .map(
      (layer) => `
    <article class="detail-card">
      <div class="subsection-kicker">Mapped as</div>
      <h3>${escapeHtml(layer.label || geographyLabel(layer))}</h3>
      <div class="meta-row">
        <span class="badge ${escapeHtml(geographyLayerBadgeClass(layer))}">${escapeHtml(geographyLabel(layer))}</span>
        <span class="badge accent">${escapeHtml(confidenceLabel(layer.confidence))}</span>
        ${sourceIdsFor(layer).length ? '<span class="badge reviewed">Source-backed</span>' : ""}
        ${layer.claim_type ? `<span class="badge">${escapeHtml(layer.claim_type)}</span>` : ""}
      </div>
      <p class="panel-copy">${escapeHtml(layer.narrative || "")}</p>
      <div class="inline-links">${renderLayerSourceLinks(layer, activeEntry)}</div>
    </article>
  `,
    )
    .join("");
  document.getElementById("geography-evidence-list").innerHTML =
    geographyEvidenceHtml ||
    '<article class="list-card"><div class="note-text">No geography interpretation layer is attached yet.</div></article>';

  renderBulletList(
    "framing-trap-list",
    activeEntry.framing_traps,
    "No major framing trap notes are attached yet.",
  );
  renderBulletList(
    "modern-echo-list",
    activeEntry.modern_echoes,
    "No modern-echo notes are attached yet.",
  );

  document.getElementById("blog-list").innerHTML = renderLinkedCards(
    activeEntry.linked_blog_posts,
    (post) => `
      <article class="list-card">
        <a class="blog-title" href="${escapeHtml(post.url || "#")}">${escapeHtml(post.title || "Untitled writing link")}</a>
        <div class="note-text">${escapeHtml(post.published_at || "")}${post.relation ? `; ${escapeHtml(post.relation.replaceAll("_", " "))}` : ""}</div>
      </article>
    `,
    "No Edge of Epidemiology writing is linked to this disease profile yet.",
  );

  document.getElementById("citation-list").innerHTML = renderLinkedCards(
    activeEntry.citations,
    (citation) => `
      <article class="list-card">
        <a class="citation-title" href="${escapeHtml(citation.url || "#")}">${escapeHtml(citation.short_citation || "Untitled source")}</a>
        <div class="note-text">${escapeHtml(citation.claim_supported || "")}</div>
      </article>
    `,
    activeEntry.citation_verification_note ||
      "No verified public citation links are attached yet.",
  );

  document.getElementById("story-list").innerHTML = renderLinkedCards(
    activeEntry.related_stories,
    (story) => `
      <article class="list-card">
        <a class="story-title-link" href="${escapeHtml(story.story_href || "#")}">${escapeHtml(story.display_title || "Story file")}</a>
        <div class="note-text">${escapeHtml(story.latest_update_summary || story.status || "")}</div>
      </article>
    `,
    "No active outbreak file is linked to this disease profile right now.",
  );
}

function renderBulletList(targetId, items, emptyText) {
  const target = document.getElementById(targetId);
  if (!Array.isArray(items) || !items.length) {
    target.innerHTML = `<li class="note-text">${escapeHtml(emptyText)}</li>`;
    return;
  }
  target.innerHTML = items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function renderLinkedCards(items, renderer, emptyText) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }
  return items.map(renderer).join("");
}

function clearMapLayers() {
  map.closePopup();
  currentFeatureGroup.clearLayers();
  routeLayers = [];
  geographyLayers = [];
  endpointMarkers = [];
  routeLayerById = new Map();
  currentActiveRouteId = null;
}

function geographyBounds(layer) {
  if (layer.geometry_type === "world") {
    return [
      [-60, -180],
      [82, 180],
    ];
  }
  if (Array.isArray(layer.bounds) && layer.bounds.length === 2) {
    const [westSouth, eastNorth] = layer.bounds;
    return [
      [westSouth[1], westSouth[0]],
      [eastNorth[1], eastNorth[0]],
    ];
  }
  return null;
}

function drawGeographyLayer(layer, color) {
  if (!layer || !layer.geometry_type) {
    return;
  }
  const layerColor = geographyTypeColor(layer, color);
  const options = {
    color: layerColor,
    weight: geographyStrokeWeight(layer),
    opacity: layer.layer_type === "global_distribution" ? 0.48 : 0.82,
    fillColor: layerColor,
    fillOpacity: geographyFillOpacity(layer),
    dashArray: geographyDashArray(layer),
    className: `atlas-geography-layer ${geographyCssClass(layer)}`,
  };
  const bounds = geographyBounds(layer);
  let mapLayer = null;
  if (
    (layer.geometry_type === "world" || layer.geometry_type === "bbox") &&
    bounds
  ) {
    mapLayer = L.rectangle(bounds, options);
  } else if (
    layer.geometry_type === "polygon" &&
    Array.isArray(layer.coordinates)
  ) {
    mapLayer = L.polygon(layer.coordinates.map(toLatLng), options);
  } else if (
    layer.geometry_type === "circle" &&
    Array.isArray(layer.center) &&
    Number.isFinite(layer.radius_km)
  ) {
    mapLayer = L.circle(toLatLng(layer.center), {
      ...options,
      radius: layer.radius_km * 1000,
    });
  } else if (layer.geometry_type === "ellipse" && Array.isArray(layer.center)) {
    mapLayer = L.polygon(ellipseLatLngs(layer), options);
  }
  if (!mapLayer) {
    return;
  }
  mapLayer.bindPopup(`
    <div class="popup-title">${escapeHtml(layer.label || geographyLabel(layer))}</div>
    <div class="subsection-kicker">${escapeHtml(layer.claim_type || geographyLabel(layer))}</div>
    <div class="popup-copy">${escapeHtml(layer.narrative || "")}</div>
  `);
  currentFeatureGroup.addLayer(mapLayer);
  geographyLayers.push(mapLayer);
}

function drawEntry(entry) {
  clearMapLayers();
  const color = colorFor(entry);
  document.documentElement.style.setProperty("--active-color", color);

  if (shouldDrawGeography()) {
    (entry.geography_layers || []).forEach((layer) =>
      drawGeographyLayer(layer, color),
    );
  }

  if (shouldDrawRoutes() && entry.origin_claim?.coordinates) {
    originMarker = L.marker(toLatLng(entry.origin_claim.coordinates), {
      icon: makeMarker(color, "origin"),
      title: entry.origin_claim.label,
      alt: entry.origin_claim.label,
    });
    originMarker.bindPopup(
      `<div class="popup-title">${escapeHtml(entry.origin_claim.label || entry.name)}</div><div class="subsection-kicker">${escapeHtml(entry.origin_claim.claim_type || "Origin claim")}</div><div class="popup-copy">${escapeHtml(entry.origin_claim.narrative || "")}</div>`,
    );
    currentFeatureGroup.addLayer(originMarker);
  }

  if (shouldDrawRoutes()) {
    (entry.spread_routes || []).forEach((route) => {
      if (!route.from_coordinates || !route.to_coordinates) {
        return;
      }
      const path = arcLatLngs(route.from_coordinates, route.to_coordinates);
      const layer = L.polyline(path, {
        className: "atlas-route",
        color,
        weight:
          route.confidence === "high" || route.confidence === "strong"
            ? 4.8
            : 3.6,
        opacity:
          currentMapMode === "evidence"
            ? Math.max(routeOpacity(route.confidence) - 0.08, 0.48)
            : routeOpacity(route.confidence),
        dashArray: routeDashArray(route.confidence),
      });
      layer.bindPopup(`
        <div class="popup-title">${escapeHtml(route.from_label || "Origin")} to ${escapeHtml(route.to_label || "Destination")}</div>
        <div class="subsection-kicker">${escapeHtml(route.claim_type || route.route_type || "Route")}</div>
        <div class="popup-copy">${escapeHtml(route.narrative || "")}</div>
      `);
      currentFeatureGroup.addLayer(layer);
      routeLayers.push(layer);
      routeLayerById.set(route.route_id, layer);

      const endpoint = L.marker(toLatLng(route.to_coordinates), {
        icon: makeMarker(color, "endpoint"),
        title: route.label || route.route_id,
        alt: route.label || route.route_id,
      });
      endpoint.bindPopup(
        `<div class="popup-title">${escapeHtml(route.to_label || "Route endpoint")}</div><div class="popup-copy">${escapeHtml(route.date_or_era || "")}</div>`,
      );
      currentFeatureGroup.addLayer(endpoint);
      endpointMarkers.push(endpoint);
    });
  }

  if (currentFeatureGroup.getLayers().length) {
    fitCurrentEntry();
  }
}

function focusRoute(routeId) {
  currentActiveRouteId = routeId;
  map.closePopup();
  document.querySelectorAll(".route-step").forEach((button) => {
    button.classList.toggle("active", button.dataset.routeId === routeId);
  });
  routeLayers.forEach((layer) =>
    layer.setStyle({ opacity: 0.22, weight: 2.6 }),
  );
  const layer = routeLayerById.get(routeId);
  if (!layer) {
    return;
  }
  const familyEntry = ENTRY_BY_SLUG.get(currentSlug);
  const entry = familyEntry ? resolveActiveEntry(familyEntry) : null;
  const route = (entry?.spread_routes || []).find(
    (item) => item.route_id === routeId,
  );
  layer.setStyle({
    opacity: 0.98,
    weight:
      route?.confidence === "high" || route?.confidence === "strong"
        ? 5.6
        : 4.3,
    dashArray: routeDashArray(route?.confidence),
    className: "atlas-route active",
  });
  map.fitBounds(layer.getBounds().pad(0.28), { maxZoom: 5 });
  layer.openPopup();
}

function updateUrl(slug, variantSlug) {
  const url = new URL(window.location.href);
  url.searchParams.set("pathogen", slug);
  if (variantSlug) {
    url.searchParams.set("variant", variantSlug);
  } else {
    url.searchParams.delete("variant");
  }
  window.history.replaceState({}, "", url.toString());
}

function selectIndex(nextIndex, options = {}) {
  if (!ATLAS_ENTRIES.length) {
    return;
  }
  map.closePopup();
  const normalizedIndex =
    ((nextIndex % ATLAS_ENTRIES.length) + ATLAS_ENTRIES.length) %
    ATLAS_ENTRIES.length;
  const entry = ATLAS_ENTRIES[normalizedIndex];
  currentIndex = normalizedIndex;
  currentSlug = entry.slug;
  const variants = variantsFor(entry);
  if (variants.length) {
    const requestedVariant =
      options.variantSlug || entry.default_variant_slug || variants[0].slug;
    currentVariantSlug = variants.some(
      (variant) => variant.slug === requestedVariant,
    )
      ? requestedVariant
      : entry.default_variant_slug || variants[0].slug;
  } else {
    currentVariantSlug = null;
  }
  const activeEntry = resolveActiveEntry(entry);
  syncScenarioControls(entry);
  renderStoryPanel(entry, activeEntry);
  renderEvidencePanel(entry, activeEntry);
  drawEntry(activeEntry);
  if (currentMapMode === "routes" && activeEntry.spread_routes?.length) {
    focusRoute(activeEntry.spread_routes[0].route_id);
  }
  if (!options.fromRotation && !options.suppressUrl) {
    updateUrl(entry.slug, currentVariantSlug);
  }
  for (const id of ["blog-list", "story-list"]) {
    const node = document.getElementById(id);
    node.closest(".panel-section").hidden = !node.textContent.trim();
  }
  scheduleRotation();
}

function selectVariant(variantSlug) {
  const entry = ENTRY_BY_SLUG.get(currentSlug);
  if (!entry || !variantsFor(entry).length) {
    return;
  }
  currentVariantSlug = variantSlug;
  const activeEntry = resolveActiveEntry(entry);
  renderStoryPanel(entry, activeEntry);
  renderEvidencePanel(entry, activeEntry);
  drawEntry(activeEntry);
  if (currentMapMode === "routes" && activeEntry.spread_routes?.length) {
    focusRoute(activeEntry.spread_routes[0].route_id);
  }
  updateUrl(entry.slug, currentVariantSlug);
  scheduleRotation();
}

function initialIndex() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("pathogen");
  if (slug) {
    const foundIndex = ATLAS_ENTRIES.findIndex((entry) => entry.slug === slug);
    if (foundIndex >= 0) {
      return foundIndex;
    }
  }
  return 0;
}

function initialVariantSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("variant");
}

function init() {
  if (!ATLAS_ENTRIES.length) {
    document.getElementById("story-title").textContent =
      "No atlas entries available";
    document.getElementById("story-copy").textContent =
      "The curated pathogen atlas data did not load correctly.";
    document.getElementById("evidence-title").textContent =
      "No evidence data available";
    return;
  }
  renderScenarioControls();
  selectIndex(initialIndex(), {
    variantSlug: initialVariantSlug(),
    suppressUrl: true,
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden && rotationTimer) {
    clearTimeout(rotationTimer);
    rotationTimer = null;
  } else if (!document.hidden) {
    scheduleRotation();
  }
});

init();

function renderHostChain(entry) {
  const panel = document.getElementById("host-chain");
  const categories = [
    [
      "reservoir",
      "Reservoir",
      (entry.primary_reservoirs || []).join("; ") ||
        "Reservoir not resolved in this profile.",
    ],
    [
      "vector",
      "Vector / route",
      (entry.vectors || entry.primary_vectors || []).join?.("; ") ||
        entry.transmission_summary ||
        entry.transmission_ecology ||
        "Consult the transmission evidence below; a vector is not assumed.",
    ],
    [
      "host",
      "Human host",
      entry.historical_signature || entry.summary || "See the cited profile.",
    ],
  ];
  panel.innerHTML =
    '<h3>How exposure connects</h3><div class="eoe-host-chain">' +
    categories
      .map(
        ([id, label]) =>
          `<button type="button" data-chain="${id}" aria-pressed="false">${label}</button>`,
      )
      .join('<span aria-hidden="true">→</span>') +
    '</div><div class="eoe-evidence-note" id="chain-note" role="status"></div>';
  const choose = (id) => {
    const row = categories.find((c) => c[0] === id) || categories[0];
    panel
      .querySelectorAll("button")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.chain === row[0])),
      );
    document.getElementById("chain-note").innerHTML =
      "<p>" +
      escapeHtml(row[2]) +
      '</p><a href="#evidence-panel" class="chain-source">Supporting claims and sources ↓</a>';
    panel.querySelector(".chain-source").onclick = () =>
      (document.getElementById("evidence-panel").open = true);
    EOE.setState({ ecology: row[0] });
  };
  panel
    .querySelectorAll("button")
    .forEach((b) => (b.onclick = () => choose(b.dataset.chain)));
  choose(new URLSearchParams(location.search).get("ecology") || "reservoir");
}
document.getElementById("inspect-evidence").onclick = () => {
  const panel = document.getElementById("evidence-panel");
  panel.open = true;
  panel.scrollIntoView({
    behavior: EOE.reducedMotion() ? "instant" : "smooth",
  });
};
EOE.utilities(document.getElementById("story-panel"));
setPaused(true);
