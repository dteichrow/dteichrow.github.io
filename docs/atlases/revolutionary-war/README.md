# Revolutionary War Disease Atlas Source Backbone

The Revolutionary War Disease Atlas turns the Revolutionary War disease essays into a map and video surface. Its core claim: military survival depended on susceptible bodies moving through cities, camps, winter quarters, hospitals, ships, and improvised public-health systems.

## Data Sources

- Public interface: `external/revolutionary_war_atlas/index.html`
- YouTube derivative plan: `external/revolutionary_war_atlas/data/revolutionary_war_youtube_video_plan.js`
- Central source registry: `data/sources/sources.json`
- Local recording note: `notes/revolutionary-war-disease-atlas-youtube-guided-tour.md`
- Recording packet: `notes/revolutionary-war-disease-atlas-youtube-recording-packet/`

The atlas must remain usable from `file://`, so browser-facing data is kept in local JavaScript assignments rather than fetched at runtime.

## YouTube Derivative

The YouTube version is a guided derivative tour. The canonical source surface remains the atlas. Use:

```text
external/revolutionary_war_atlas/index.html?youtube=1&tour=1&pace=2.1
```

`youtube=1` turns on recording mode. `tour=1` starts the guided chapter order. Shot-level captures can use:

```text
external/revolutionary_war_atlas/index.html?youtube=1&event=<event_id>&pace=2.1
```

The video script must stay within the exhibit data unless new claims are added with citations, confidence, and uncertainty notes.

## Evidence Standard

Keep the historical epidemiology distinctions visible:

- Avoid saying disease alone won or lost the Revolution.
- Avoid treating every historical fever label as a clean modern diagnosis.
- Explain variolation before using any vaccination comparison.
- Keep Valley Forge tied to disease as well as cold and supply failure; NPS explicitly emphasizes disease.
- Treat the 11,500 prison ship martyrs figure as memorial geography rather than a disease-specific count.
- Treat inoculation as military logistics and public-health strategy, rather than a simple heroic tech fix.

## Current Video Beats

The guided tour includes nine chapters: disease as a second front, Boston susceptibility, the Quebec smallpox crisis, battle deaths as the wrong denominator, Washington's inoculation system, Valley Forge as camp exposure, Morristown as learned camp survival, Wallabout Bay prison ships, and a closing return to Yorktown.

## Validation

Run:

```bash
python3 -m pytest tests/test_revolutionary_war_youtube_video_package.py tests/test_tool_page_smoke.py tests/test_build_site.py
```

Then rebuild the public copy:

```bash
python3 -m src.build_site --site-base-url /
```
