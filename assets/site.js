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
})();
