# Maritime Disease Atlas Source Backbone

The Maritime Disease Atlas is a historical epidemiology teaching exhibit. Its core claim is that ships were not just transportation. They were floating ecological systems connected to ports, quarantine stations, naval supply chains, captivity, migration, trade, and empire.

## Data Sources

- Public interface: `external/maritime_disease_atlas/index.html`
- Route and scenario payload: `external/maritime_disease_atlas/data/maritime_disease_atlas_data.js`
- Source-backed case modules: `external/maritime_disease_atlas/data/maritime_disease_modules.js`
- YouTube derivative plan: `external/maritime_disease_atlas/data/maritime_youtube_video_plan.js`
- GeoJSON copy: `external/maritime_disease_atlas/data/maritime_disease_atlas.geojson`
- Central source registry: `data/sources/sources.json`
- Validator: `scripts/validate_tool_sources.py`

The atlas must remain usable from `file://`, so browser-facing data is kept in local JavaScript assignments rather than fetched at runtime.

## YouTube Derivative

The YouTube version is a derivative guided tour, not the canonical source surface. Use:

```text
external/maritime_disease_atlas/index.html?youtube=1&tour=1&pace=0.55
```

`youtube=1` turns on Presentation Mode, applies the source-backed YouTube tour order, and brands the capture as a guided YouTube cut. Shot-level captures can use `?youtube=1&scenario=<scenario_id>&pace=0.55`. The production note is `notes/maritime-disease-atlas-youtube-guided-tour.md`.

The video script must not add claims beyond the exhibit data unless those claims are also added with source IDs, confidence, and uncertainty notes.

The recording packet lives in `notes/maritime-disease-atlas-youtube-recording-packet/`. It includes the timestamped recording script, caption draft, chapter markers, capture checklist, and shot replacement guide. A public-final MP4 should wait for Devin's recorded narration.

## Evidence Standard

Every displayed maritime case module must include source IDs. Retrospective diagnosis should remain conservative:

- Do not treat all shipboard mortality as infection.
- Do not turn "flux," "ship fever," "pestilence," or "fever" into a confirmed pathogen unless the source supports that identification.
- Do not assign precise cause-specific mortality when the source only supports total mortality or qualitative burden.
- Do not draw precise routes when the source only supports a general route, port, or region.
- Treat quarantine as infrastructure: documents, bills of health, detention, cargo, inspection, labor, politics, and commerce.

## Module Schema

Each module includes:

- identity fields: `id`, `title`, `date_range`, `geography`
- setting fields: `route_or_setting`, `setting_tags`, `century_tags`
- disease fields: `diseases_or_conditions`, `agents`, `transmission_or_cause`
- teaching fields: `mechanism_tags`, `maritime_mechanism`, `historical_context`, `public_health_response`
- burden fields: `human_burden.burden_type`, `human_burden.summary`, `human_burden.source_ids`
- provenance fields: `source_ids`, `confidence`, `uncertainty_note`, `claims`
- map fields: `map_geometry_or_route.claim_type`, `map_geometry_or_route.route_confidence`, `map_geometry_or_route.source_ids`

Allowed map claim types follow the public UI language: documented route, typical route, inferred route, port location, quarantine station, and region only.

## Current Included Modules

V1 includes 16 modules: scurvy and naval provisioning, Grosse Ile ship fever, New York cholera quarantine, Atlantic yellow fever port ecology, Mediterranean plague lazarettos, Algiers plague and the American sanitary ban, smallpox maritime isolation, the Middle Passage, pirate ports, wounds and sepsis, typhoid provisions, flux/dysentery, Ellis Island inspection, San Francisco plague, cruise-ship norovirus, and cruise-ship COVID-19.

## Deferred Modules

Deferred candidates are listed in the module payload and explained in `notes/maritime-disease-atlas-source-triage.md`. The main V1 exclusions are unsupported Barbary captivity plague mortality claims, convict ships/prison hulks, hantavirus cruise-ship claims, precise Middle Passage cause-specific mortality fractions, and single-ship yellow-fever import reconstructions.

## Not Included And Why

- Barbary plague is included only as the narrower Algiers sanitary-ban case; claims that plague decided the Barbary Wars or killed most American captives are excluded.
- Convict ships and prison hulks need a separate source packet before display because prison hulks, convict transports, POW hulks, and disease labels are easy to conflate.
- Hantavirus cruise-ship claims are excluded without official maritime outbreak support.
- Middle Passage cause-specific disease proportions are excluded; total mortality and voyage conditions are better supported than precise cause-specific attribution.
- Single-ship yellow-fever import routes are excluded unless named-voyage evidence supports them.

## Validation

Run:

```bash
python3 scripts/validate_tool_sources.py
```

The validator checks module source IDs, route claim types, route confidence, burden type/source support, confidence categories, uncertainty notes, mapped geometry provenance, placeholder text, and unsupported causal language.
