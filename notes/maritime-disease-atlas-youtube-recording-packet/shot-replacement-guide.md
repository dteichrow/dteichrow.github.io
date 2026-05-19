# Maritime Disease Atlas Shot Replacement Guide

Use full-tour capture first. Replace individual sections only when a specific visual beat needs a cleaner take.

## Standard Single-Section URL

```text
/atlases/maritime/?youtube=1&scenario=<scenario_id>&pace=2.05
```

Local equivalent:

```text
external/maritime_disease_atlas/index.html?youtube=1&scenario=<scenario_id>&pace=2.05
```

## Scenario Retake Map

| Section | Scenario URL suffix | Replace when |
| --- | --- | --- |
| Pirate infrastructure | `?youtube=1&scenario=pirate_network&pace=2.05` | A pirate plate overwhelms route readability, or the opening needs a stronger map-first beat. |
| Vector ecology | `?youtube=1&scenario=yellow_fever&pace=2.05` and `?youtube=1&scenario=malaria&pace=2.05` | The edit needs a clearer transition from port ecology to vector ecology. |
| Provisions ecology | `?youtube=1&scenario=scurvy&pace=2.05`, `?youtube=1&scenario=flux&pace=2.05`, `?youtube=1&scenario=typhoid&pace=2.05` | The shipboard food-water argument needs more time or fewer archival overlays. |
| Crowding/contact | `?youtube=1&scenario=ship_fever&pace=2.05`, `?youtube=1&scenario=smallpox&pace=2.05`, `?youtube=1&scenario=measles&pace=2.05` | Below-deck crowding, quarantine, or respiratory/contact mechanisms are unclear. |
| Violence/coercion | `?youtube=1&scenario=wounds_sepsis&pace=2.05` and `?youtube=1&scenario=middle_passage&pace=2.05` | The final third needs a slower, more sober visual rhythm. |

## Replacement Rules

- Do not add new narration claims during retakes.
- Do not use a shot if it hides the map through the whole beat.
- Preserve the cited order unless the edit explicitly needs a bridge shot.
- Keep `sound=1` and `audio=1` out of capture URLs by default.
- If a retake changes timing, update `caption-draft.srt` and `chapter-markers.txt`.
