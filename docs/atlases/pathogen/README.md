# Pathogen Atlas Source Backbone

The Pathogen Atlas is a source-backed teaching exhibit, not a pathogen trivia list. Its job is to show how scientists infer pathogen history from uneven evidence: clinical records, historical texts, ancient DNA, genomics, archaeology, vector ecology, reservoirs, and modern surveillance.

## Data Sources

- Public interface: `external/pathogen_atlas/index.html`
- Curated profile payload: `external/pathogen_atlas/source_backed_profiles.json`
- Generated browser payload: `external/pathogen_atlas/data/pathogen_atlas_data.js`
- Central source registry: `data/sources/sources.json`
- Validator: `scripts/validate_tool_sources.py`

`src/build_site.py` prefers `source_backed_profiles.json` when present. The older `docs/app_exports/atlas.json` import path remains as a fallback for generated candidates and existing build tests.

## Evidence Standard

Every displayed factual profile claim should resolve to a `source_id` in the source registry. Origin claims must separate:

- earliest strong evidence
- hypothesized origin
- historical spread
- modern distribution
- reservoir/vector ecology

The atlas must not equate earliest evidence with true origin. If a profile cannot support a clean origin claim, it should say `unknown`, `low`, or `contested` rather than forcing a birthplace onto the map.

## Profile Schema

Each profile includes:

- identity fields: `id`, `slug`, `display_name`, `agent_name`, `disease_names`, `pathogen_type`
- ecology fields: `primary_reservoirs`, `intermediate_hosts`, `vectors`, `main_transmission_routes`
- interpretive fields: `historical_signature`, `origin_claim`, `origin_confidence`, `origin_uncertainty_note`
- evidence fields: `earliest_strong_evidence`, `ancient_dna_evidence`, `evidence_panel`
- historical fields: `major_historical_episodes`, `transmission_ecology`, `public_health_control`, `modern_status`
- provenance fields: `source_ids`, `claims`, per-episode `source_ids`, per-map-layer `source_ids`

Map entries must include `claim_type` so readers can distinguish earliest evidence, modern distribution, historical spread, reservoir ecology, and hypothesized origin.

## Current Included Profiles

Initial V1 includes 16 profiles: smallpox, plague, cholera, tuberculosis, influenza A, measles, yellow fever, dengue, malaria, hantaviruses, HIV-1, SARS-CoV-2, poliovirus, syphilis/treponematoses, Salmonella enterica, and epidemic typhus.

## Deferred Profiles

Deferred candidates are listed in the payload with reasons. The main V1 deferrals are Bartonella quintana/trench fever, standalone H5N1, high-consequence zoonoses such as Ebola/Nipah/Marburg, prions, noninfectious toxins, and overly broad common-cold agents.

## Validation

Run:

```bash
python3 scripts/validate_tool_sources.py
```

The validator checks profile source IDs, origin confidence, uncertainty notes, evidence lanes, sourced episodes, map `claim_type`, confidence categories, and forbidden loading placeholders.
