const ship = document.getElementById("ship-lab");
const spaces = {
  berths: {
    label: "Berths and clothing",
    mechanism:
      "Close living quarters make contact and shared bedding important. For epidemic typhus, infected body lice and contaminated clothing are the relevant pathway; crowding does not make it a respiratory infection.",
    cases: ["ship_fever_grosse_ile_1847", "middle_passage_forced_transport"],
  },
  ventilation: {
    label: "Ventilation openings",
    mechanism:
      "Air exchange is a distinct part of the ship environment. An opening in this schematic is an explanatory feature, not a measured ventilation rate or a reconstruction of a particular vessel. Respiratory exposure and louse-borne disease require different explanations.",
    cases: ["smallpox_maritime_isolation_hulks", "cruise_ship_covid_2020"],
  },
  water: {
    label: "Water storage",
    mechanism:
      "Drinking water, food handling, and waste disposal connect the ship’s interior to enteric disease. The cases distinguish a plausible pathway from a documented outbreak source.",
    cases: [
      "typhoid_provisions_food_water",
      "flux_dysentery_shipboard_water_waste",
      "cholera_steamship_quarantine_1892",
    ],
  },
  provisions: {
    label: "Provisions and the galley",
    mechanism:
      "Time at sea constrains food supply. Scurvy concerns vitamin C deficiency and provisioning; it is not transmitted between passengers. Foodborne infection is a separate process.",
    cases: ["scurvy_long_voyage_navy", "typhoid_provisions_food_water"],
  },
  care: {
    label: "Care and isolation spaces",
    mechanism:
      "Care, wound treatment, and separation of sick passengers change where people gather and how they are handled. Their effects depend on the disease and practice; isolation alone does not demonstrate effective prevention.",
    cases: [
      "wounds_sepsis_shipboard_trauma",
      "smallpox_maritime_isolation_hulks",
      "ellis_island_medical_inspection",
    ],
  },
};
const dataset = window.MARITIME_DISEASE_MODULES,
  sources = new Map(dataset.sources.map((s) => [s.source_id, s]));
let view = null,
  current = "berths",
  loaded = false;
const esc = EOE.escape;
function choose(id, { update = true } = {}) {
  if (!spaces[id]) id = "berths";
  current = id;
  const space = spaces[id];
  ship
    .querySelectorAll("[data-space]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.space === id)),
    );
  document.getElementById("ship-detail-title").textContent = space.label;
  document.getElementById("ship-mechanism").textContent = space.mechanism;
  const cases = space.cases
    .map((id) => dataset.modules.find((m) => m.id === id))
    .filter(Boolean);
  document.getElementById("ship-cases").innerHTML = cases
    .map(
      (m) =>
        `<details><summary>${esc(m.title)}</summary><p>${esc(m.maritime_mechanism)}</p><p><strong>Case:</strong> ${esc(m.date_range)} · ${esc(m.geography)}</p><p><strong>Limits:</strong> ${esc(m.uncertainty_note)}</p><ul>${m.source_ids
          .map((id) => sources.get(id))
          .filter(Boolean)
          .map(
            (s) =>
              `<li><a href="${esc(s.url_or_doi)}">${esc(s.short_citation)}</a></li>`,
          )
          .join("")}</ul></details>`,
    )
    .join("");
  view?.select(id);
  if (update) EOE.setState({ space: id });
}
ship
  .querySelectorAll("[data-space]")
  .forEach((button) => (button.onclick = () => choose(button.dataset.space)));
const toggle = document.getElementById("ship-3d-toggle"),
  stage = document.getElementById("ship-3d-stage"),
  fallback = document.getElementById("ship-svg");
toggle.onclick = async () => {
  if (loaded) {
    const show = stage.hidden;
    stage.hidden = !show;
    fallback.toggleAttribute("hidden", show);
    toggle.textContent = show
      ? "Return to illustrated cutaway"
      : "Open the 3D cutaway";
    view?.resize();
    return;
  }
  toggle.disabled = true;
  document.getElementById("ship-status").textContent = "Opening the 3D model…";
  try {
    stage.hidden = false;
    const module = await import("./ship3d.js");
    view = module.createShip(stage, choose);
    loaded = true;
    fallback.setAttribute("hidden", "");
    view.select(current);
    toggle.textContent = "Return to illustrated cutaway";
    document.getElementById("ship-status").textContent =
      "Drag to turn the vessel. Select a space or use the labeled controls.";
  } catch (error) {
    stage.hidden = true;
    fallback.removeAttribute("hidden");
    document.getElementById("ship-status").textContent =
      "The illustrated cutaway is available on this device. Every space, case, and source is accessible below.";
  }
  toggle.disabled = false;
};
document.getElementById("ship-reset").onclick = () => {
  view?.reset();
  choose("berths");
};
EOE.utilities(document.getElementById("ship-utilities"));
const requestedSpace = new URLSearchParams(location.search).get("space");
const hasSpace = Boolean(spaces[requestedSpace]);
if (hasSpace) document.getElementById("ship-reveal").open = true;
choose(hasSpace ? requestedSpace : "berths", { update: hasSpace });
document.addEventListener("eoe:reset", () => {
  view?.reset();
  choose("berths", { update: false });
  EOE.setState({ space: null });
});
window.addEventListener("popstate", () => {
  const id = new URLSearchParams(location.search).get("space");
  if (spaces[id]) document.getElementById("ship-reveal").open = true;
  choose(id || "berths", { update: false });
});
