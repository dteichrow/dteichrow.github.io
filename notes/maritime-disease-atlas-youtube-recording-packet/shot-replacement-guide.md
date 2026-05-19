# Maritime Disease Atlas Shot Replacement Guide

Use full-tour capture first. Replace individual sections only when a specific visual beat needs a cleaner take. Retakes should preserve the exhibit order.

## Standard Single-Section URL

```text
/atlases/maritime/?youtube=1&scenario=<scenario_id>&pace=2.3
```

Local equivalent:

```text
external/maritime_disease_atlas/index.html?youtube=1&scenario=<scenario_id>&pace=2.3
```

## Scenario Retake Map

| Exhibit order | Section | Scenario URL suffix | Replace when |
| ---: | --- | --- | --- |
| 1 | Yellow fever | `?youtube=1&scenario=yellow_fever&pace=2.3` | The opening needs a clearer vector/port ecology beat or the route confidence is not readable. |
| 2 | Malaria | `?youtube=1&scenario=malaria&pace=2.3` | The distinction between movement and local mosquito ecology needs a cleaner visual. |
| 3 | Scurvy | `?youtube=1&scenario=scurvy&pace=2.3` | The noninfectious diet/time mechanism needs more breathing room. |
| 4 | Flux | `?youtube=1&scenario=flux&pace=2.3` | The shipboard water/waste argument needs fewer overlays or clearer below-deck framing. |
| 5 | Typhoid | `?youtube=1&scenario=typhoid&pace=2.3` | The food-water/provisions mechanism is unclear or the U.S. typhoid image needs better framing. |
| 6 | Ship fever | `?youtube=1&scenario=ship_fever&pace=2.3` | Steerage, lice, clothing, or quarantine station logic is hard to see. |
| 7 | Smallpox | `?youtube=1&scenario=smallpox&pace=2.3` | Bedding, isolation, or port inspection context needs a cleaner take. |
| 8 | Measles | `?youtube=1&scenario=measles&pace=2.3` | Respiratory crowding needs a shorter, clearer bridge shot. |
| 9 | Wounds + sepsis | `?youtube=1&scenario=wounds_sepsis&pace=2.3` | The trauma/infection mechanism needs visual restraint or less clutter. |
| 10 | Middle Passage | `?youtube=1&scenario=middle_passage&pace=2.3` | The section needs a slower, more sober visual rhythm. |
| 11 | Pirate ports | `?youtube=1&scenario=pirate_network&pace=2.3` | The final infrastructure synthesis needs stronger map readability or less image dominance. |

## Replacement Rules

- Do not add new narration claims during retakes.
- Do not use a shot if it hides the map through the whole beat.
- Preserve the exhibit order unless the edit explicitly needs a very short bridge shot.
- Keep `sound=1` and `audio=1` out of capture URLs by default.
- If a retake changes timing, update `caption-draft.srt` and `chapter-markers.txt`.
