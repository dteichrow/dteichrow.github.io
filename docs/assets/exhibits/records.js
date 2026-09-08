const data = JSON.parse(document.getElementById("record-data").textContent),
  { records, kind, sources } = data;
const esc = EOE.escape,
  params = new URLSearchParams(location.search),
  stateKey = kind === "viking" ? "site" : "event";
const search = document.getElementById("record-search"),
  period = document.getElementById("period-filter"),
  category = document.getElementById("category-filter");
const palette = [
  "#c87564",
  "#797daa",
  "#d7bc73",
  "#a996bc",
  "#7f84b7",
  "#85b5ce",
];
const cats = [...new Set(records.map((r) => r.category))],
  color = (c) => palette[cats.indexOf(c) % palette.length];
let map = null,
  markers = new Map(),
  selected = null,
  tourTimer = null;
search.value = params.get("q") || "";
period.value = params.get("period") || params.get("chapter") || "";
category.value = params.get("category") || "";
try {
  map = L.map("record-map", {
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true,
    preferCanvas: true,
  });
  EOEMaps.createBaseLayer().addTo(map);
  EOEMaps.createLabelLayer().addTo(map);
} catch (error) {
  document.getElementById("record-map").innerHTML =
    '<p style="color:white;padding:30px">The map is unavailable. Select any record from the list below; its evidence and sources are still available.</p>';
}
function select(id, { focus = false, update = true } = {}) {
  const record = records.find((r) => r.id === id) || records[0];
  selected = record.id;
  document.getElementById("selected-title").textContent = record.name;
  const archived = document.getElementById("record-" + record.id);
  const fragment = archived.cloneNode(true);
  fragment.querySelector("summary").remove();
  document.getElementById("selected-content").innerHTML = fragment.innerHTML;
  if (update) EOE.setState({ [stateKey]: record.id });
  document
    .querySelectorAll("#record-list button")
    .forEach((b) =>
      b.setAttribute("aria-current", String(b.dataset.id === record.id)),
    );
  for (const [id, marker] of markers) {
    const node = marker.getElement();
    if (node) {
      node.classList.toggle("selected", id === record.id);
      node.setAttribute(
        "aria-label",
        `Open record: ${records.find((r) => r.id === id).name}`,
      );
    }
  }
  if (map)
    map.panTo([record.lat, record.lon], { animate: !EOE.reducedMotion() });
  if (focus) {
    const title = document.getElementById("selected-title");
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
    title.scrollIntoView({
      behavior: EOE.reducedMotion() ? "instant" : "smooth",
      block: "start",
    });
  }
}
function render({ fit = false } = {}) {
  const q = search.value.trim().toLowerCase();
  const visible = records.filter(
    (r) =>
      (!period.value || r.period === period.value) &&
      (!category.value || r.category === category.value) &&
      [
        r.name,
        r.finding,
        r.limitations,
        ...r.source_ids.map((id) => sources[id].title),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q),
  );
  document.getElementById("record-count").textContent =
    `${visible.length} of ${records.length} cited records`;
  const list = document.getElementById("record-list");
  list.innerHTML =
    visible
      .map(
        (r, i) =>
          `<button type="button" data-id="${r.id}" aria-current="${r.id === selected}"><span>${String(i + 1).padStart(2, "0")}</span><span>${esc(r.name)}<small>${esc(r.date)}</small></span></button>`,
      )
      .join("") || "<p>No matches. Clear a filter or reset the view.</p>";
  list
    .querySelectorAll("button")
    .forEach((b) => (b.onclick = () => select(b.dataset.id, { focus: true })));
  if (map) {
    for (const marker of markers.values()) marker.remove();
    markers.clear();
    for (const r of visible) {
      const marker = L.marker([r.lat, r.lon], {
        title: r.name,
        alt: `Open record: ${r.name}`,
        keyboard: true,
        icon: L.divIcon({
          className: "record-pin" + (r.id === selected ? " selected" : ""),
          html: `<span aria-hidden="true" style="display:block;width:100%;height:100%;background:${color(r.category)};border-radius:50%"></span>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        }),
      }).addTo(map);
      marker.on("click", () => select(r.id, { focus: true }));
      markers.set(r.id, marker);
    }
    if (fit && visible.length)
      map.fitBounds(
        L.latLngBounds(visible.map((r) => [r.lat, r.lon])).pad(0.2),
        { animate: false, maxZoom: kind === "viking" ? 5 : 7 },
      );
  }
  EOE.setState({
    q: search.value,
    period: period.value,
    category: category.value,
  });
  if (visible.length && !visible.some((r) => r.id === selected))
    select(visible[0].id);
  document
    .querySelectorAll("[data-chapter]")
    .forEach((b) =>
      b.setAttribute(
        "aria-pressed",
        String(b.dataset.chapter === period.value),
      ),
    );
}
document.getElementById("map-legend").innerHTML = cats
  .map(
    (c) =>
      `<span><i style="background:${color(c)}" aria-hidden="true"></i>${esc(c)}</span>`,
  )
  .join("");
search.oninput = () => render();
period.onchange = () => render({ fit: true });
category.onchange = () => render({ fit: true });
document.querySelectorAll("[data-chapter]").forEach(
  (b) =>
    (b.onclick = () => {
      search.value = "";
      category.value = "";
      period.value = b.dataset.chapter;
      render({ fit: true });
    }),
);
function reset() {
  clearTimeout(tourTimer);
  tourTimer = null;
  const playButton = document.getElementById("sequence-play");
  if (playButton) playButton.textContent = "Play sequence";
  search.value = "";
  period.value = "";
  category.value = "";
  EOE.setState({ chapter: null, compare: null, q: null });
  if (kind === "viking") document.getElementById("comparison").hidden = true;
  selected = records[0].id;
  render({ fit: true });
  select(selected);
}
document.getElementById("record-reset").onclick = reset;
const requested = params.get(stateKey) || params.get("selected");
selected = records.some((r) => r.id === requested) ? requested : records[0].id;
render({ fit: true });
select(selected);
EOE.utilities(document.getElementById("record-utilities"));
if (kind === "viking") {
  const comparison = document.getElementById("comparison");
  const compare = () => {
    comparison.hidden = false;
    comparison.querySelector(".comparison-grid").innerHTML = [
      "ribe",
      "birka",
      "varnhem",
    ]
      .map((id) => {
        const r = records.find((x) => x.id === id);
        return `<article><h3>${esc(r.name)}</h3><p><strong>${esc(r.date)}</strong></p><p>${esc(r.sample_size)} ${esc(r.sample_unit)}</p><p>${esc(r.comparison)}</p><a href="#record-${r.id}" data-compare-record="${r.id}">Inspect the record ↓</a></article>`;
      })
      .join("");
    comparison
      .querySelectorAll("[data-compare-record]")
      .forEach(
        (a) =>
          (a.onclick = () =>
            (document.getElementById("record-" + a.dataset.compareRecord).open =
              true)),
      );
    EOE.setState({ compare: "ribe-birka-varnhem" });
    comparison.scrollIntoView({
      behavior: EOE.reducedMotion() ? "instant" : "smooth",
    });
  };
  document.getElementById("compare-sites").onclick = compare;
  document.getElementById("close-comparison").onclick = () => {
    comparison.hidden = true;
    EOE.setState({ compare: null });
    document.getElementById("compare-sites").focus();
  };
  if (params.has("compare")) compare();
} else {
  const controls = document.createElement("div");
  controls.className = "tour-control";
  controls.innerHTML =
    '<button type="button" id="sequence-prev">Previous event</button><button type="button" id="sequence-next">Next event</button><button type="button" id="sequence-play">Play sequence</button><button type="button" id="sequence-presentation">Presentation</button>';
  document.getElementById("record-utilities").prepend(controls);
  const step = (direction) => {
    const index = records.findIndex((r) => r.id === selected);
    select(records[(index + direction + records.length) % records.length].id);
  };
  const play = () => {
    if (tourTimer) {
      clearTimeout(tourTimer);
      tourTimer = null;
      document.getElementById("sequence-play").textContent = "Play sequence";
      return;
    }
    document.getElementById("sequence-play").textContent = "Pause sequence";
    const tick = () => {
      step(1);
      tourTimer = setTimeout(tick, 10000);
    };
    tourTimer = setTimeout(tick, 10000);
  };
  const presentation = () => {
    document.body.classList.toggle("presentation-mode");
    map?.invalidateSize();
  };
  document.getElementById("sequence-prev").onclick = () => step(-1);
  document.getElementById("sequence-next").onclick = () => step(1);
  document.getElementById("sequence-play").onclick = play;
  document.getElementById("sequence-presentation").onclick = presentation;
  window.openPanelById = (id) => select(id);
  window.focusEventById = (id) => select(id);
  window.playYouTubeTour = play;
  document.addEventListener("keydown", (event) => {
    if (["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) return;
    if (event.key === "Escape") {
      document.body.classList.remove("presentation-mode");
      map?.invalidateSize();
    }
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  });
  if (
    ["youtube", "yt", "video", "recording", "record"].some(
      (k) => params.has(k) && params.get(k) !== "0",
    )
  )
    presentation();
  // Recording links preserve their mode. Motion begins only with the play control.
}
window.addEventListener("popstate", () => {
  const p = new URLSearchParams(location.search);
  search.value = p.get("q") || "";
  period.value = p.get("period") || "";
  category.value = p.get("category") || "";
  selected = p.get(stateKey) || records[0].id;
  render({ fit: true });
  select(selected, { update: false });
});
