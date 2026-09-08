const search = document.getElementById("dossier-search"),
  filter = document.getElementById("dossier-filter"),
  review = document.getElementById("review-filter");
function restore() {
  const p = new URLSearchParams(location.search);
  search.value = p.get("q") || "";
  filter.value = p.get("dossier") || "";
  review.value = p.get("review") || "";
}
function render() {
  let dossierCount = 0,
    sourceCount = 0;
  const q = search.value.trim().toLowerCase();
  for (const dossier of document.querySelectorAll("[data-dossier]")) {
    let matches = 0;
    for (const source of dossier.querySelectorAll(".dossier-source")) {
      const status = source
        .querySelector(".record-kicker")
        .textContent.toLowerCase();
      const visible =
        (!q ||
          source.textContent.toLowerCase().includes(q) ||
          dossier.querySelector("h2").textContent.toLowerCase().includes(q)) &&
        (!review.value ||
          (review.value === "metadata"
            ? status.includes("metadata")
            : status.includes("reviewed")));
      source.hidden = !visible;
      if (visible) matches++;
    }
    dossier.hidden = Boolean(
      (filter.value && dossier.dataset.dossier !== filter.value) || !matches,
    );
    if (!dossier.hidden) {
      dossierCount++;
      sourceCount += matches;
    }
  }
  document.getElementById("dossier-count").textContent =
    `${sourceCount} sources in ${dossierCount} dossier${dossierCount === 1 ? "" : "s"}`;
  EOE.setState({
    q: search.value,
    dossier: filter.value,
    review: review.value,
  });
}
restore();
search.oninput = render;
filter.onchange = render;
review.onchange = render;
document.getElementById("dossier-reset").onclick = () => {
  search.value = "";
  filter.value = "";
  review.value = "";
  render();
};
window.addEventListener("popstate", () => {
  restore();
  render();
});
EOE.utilities(document.getElementById("dossier-utilities"));
render();
