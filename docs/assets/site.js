/* Static, shareable search. Text is inserted as text, never interpreted as markup. */
(async function () {
  for (const shell of document.querySelectorAll("[data-search-source]")) {
    const input = shell.querySelector("[data-search-input]"),
      filter = shell.querySelector("[data-search-filter]"),
      target = shell.querySelector("[data-search-results]"),
      count = shell.querySelector("[data-search-count]");
    const params = new URLSearchParams(location.search);
    input.value = params.get("q") || "";
    if ([...filter.options].some((o) => o.value === params.get("section")))
      filter.value = params.get("section");
    try {
      const response = await fetch(shell.dataset.searchSource);
      if (!response.ok) throw new Error(response.status);
      const records = await response.json();
      const render = () => {
        const q = input.value.trim().toLowerCase();
        const found = records.filter(
          (e) =>
            (filter.value === "all" || e.section === filter.value) &&
            [e.title, e.display_title, e.summary, e.keywords]
              .join(" ")
              .toLowerCase()
              .includes(q),
        );
        target.replaceChildren();
        count.textContent = `${found.length} result${found.length === 1 ? "" : "s"}`;
        for (const entry of found) {
          const url = new URL(entry.url, location.href);
          if (!["http:", "https:"].includes(url.protocol)) continue;
          const card = document.createElement("article");
          card.className = "site-card";
          const label = document.createElement("p");
          label.className = "kicker";
          label.textContent = entry.section;
          const title = document.createElement("h3"),
            link = document.createElement("a");
          link.href = url.href;
          link.textContent = entry.display_title || entry.title;
          title.append(link);
          const summary = document.createElement("p");
          summary.className = "muted-note";
          summary.textContent = entry.summary || "";
          card.append(label, title, summary);
          target.append(card);
        }
        if (!found.length) {
          const message = document.createElement("p");
          message.className = "search-empty";
          message.textContent =
            "No matches. Try a place, pathogen, or shorter phrase.";
          target.append(message);
        }
        const state = new URL(location.href);
        q
          ? state.searchParams.set("q", input.value.trim())
          : state.searchParams.delete("q");
        filter.value === "all"
          ? state.searchParams.delete("section")
          : state.searchParams.set("section", filter.value);
        history.replaceState(null, "", state);
      };
      input.addEventListener("input", render);
      filter.addEventListener("change", render);
      render();
      window.addEventListener("popstate", () => {
        const p = new URLSearchParams(location.search);
        input.value = p.get("q") || "";
        filter.value = p.get("section") || "all";
        render();
      });
    } catch (error) {
      count.textContent =
        "Search could not load. Please try again, or browse Essays and Exhibits using the navigation.";
    }
  }
})();
