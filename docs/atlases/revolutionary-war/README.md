# Revolutionary War Disease Atlas Source Backbone

The Revolutionary War Disease Atlas is the map surface for turning the Revolutionary War disease essays into video. Its core claim is not that disease replaces politics or battle, but that military survival depended on the movement of susceptible bodies through cities, camps, winter quarters, hospitals, ships, and improvised public-health systems.

## Data Sources

- Public interface: `external/revolutionary_war_atlas/index.html`
- YouTube derivative plan: `external/revolutionary_war_atlas/data/revolutionary_war_youtube_video_plan.js`
- Central source registry: `data/sources/sources.json`
- Local recording note: `notes/revolutionary-war-disease-atlas-youtube-guided-tour.md`
- Recording packet: `notes/revolutionary-war-disease-atlas-youtube-recording-packet/`

The atlas must remain usable from `file://`, so browser-facing data is kept in local JavaScript assignments rather than fetched at runtime.

## YouTube Derivative

The YouTube version is a guided derivative tour, not the canonical source surface. Use:

```text
external/revolutionary_war_atlas/index.html?youtube=1&tour=1&pace=2.1
```

`youtube=1` turns on recording mode. `tour=1` starts the guided chapter order. Shot-level captures can use:

```text
external/revolutionary_war_atlas/index.html?youtube=1&event=<event_id>&pace=2.1
```

The video script must not add claims beyond the exhibit data unless those claims are also added with citations, confidence, and uncertainty notes.

## Evidence Standard

Keep the historical epidemiology distinctions visible:

- Do not say disease alone won or lost the Revolution.
- Do not treat every historical fever label as a clean modern diagnosis.
- Do not call variolation vaccination without explaining the difference.
- Do not turn Valley Forge into cold-only suffering; NPS explicitly emphasizes disease.
- Do not treat the 11,500 prison ship martyrs figure as a clean disease-specific count.
- Treat inoculation as military logistics and public-health strategy, not as a simple heroic tech fix.

## Current Video Beats

The guided tour includes nine chapters: disease as the second front, Boston susceptibility, the Quebec smallpox crisis, battle deaths as the wrong denominator, Washington's inoculation system, Valley Forge as camp ecology, Morristown as learned camp survival, Wallabout Bay prison ships, and a closing return to Yorktown.

## Validation

Run:

```bash
python3 -m pytest tests/test_revolutionary_war_youtube_video_package.py tests/test_tool_page_smoke.py tests/test_build_site.py
```

Then rebuild the public copy:

```bash
python3 -m src.build_site --site-base-url /
```
