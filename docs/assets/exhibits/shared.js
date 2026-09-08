/* Utilities shared by the exhibits, with query parameters preserved. */
window.EOE = {
  reducedMotion: () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  setState(values, replace = true) {
    const url = new URL(location.href);
    for (const [key, value] of Object.entries(values)) {
      if (value === null || value === undefined || value === "")
        url.searchParams.delete(key);
      else url.searchParams.set(key, String(value));
    }
    history[replace ? "replaceState" : "pushState"](null, "", url);
  },
  escape(value) {
    const span = document.createElement("span");
    span.textContent = String(value ?? "");
    return span.innerHTML;
  },
  count(value, status) {
    if (value === null || value === undefined)
      return status === "not_applicable"
        ? "Not applicable"
        : status === "missing"
          ? "Not recorded in this dataset"
          : "Unknown";
    return (
      (status === "estimated" ? "Estimated: " : "") +
      Number(value).toLocaleString()
    );
  },
  utilities(target) {
    if (!target || target.querySelector(".eoe-utility")) return;
    const bar = document.createElement("div");
    bar.className = "eoe-utility";
    bar.innerHTML =
      '<button type="button" data-share>Copy link to this view</button><button type="button" data-print>Print record</button><span role="status"></span>';
    bar.querySelector("[data-share]").onclick = async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        bar.querySelector("[role=status]").textContent = "Link copied.";
      } catch {
        bar.querySelector("[role=status]").textContent =
          "Copy the address from your browser to share this view.";
      }
    };
    bar.querySelector("[data-print]").onclick = () => window.print();
    target.append(bar);
    return bar;
  },
};
