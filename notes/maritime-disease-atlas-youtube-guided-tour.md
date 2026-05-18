# Maritime Disease Atlas YouTube Guided Tour Package

This is the derivative YouTube package for the Maritime Disease Ecology Atlas. The website exhibit remains the canonical public artifact at `/atlases/maritime/`; this package adapts it into a 6-9 minute guided video without weakening the source-first rules.

## Capture Entrypoints

- Full scratch capture: `/atlases/maritime/?youtube=1&tour=1&pace=0.55`
- Local development capture: `external/maritime_disease_atlas/index.html?youtube=1&tour=1&pace=0.55`
- Single-section capture: `external/maritime_disease_atlas/index.html?youtube=1&scenario=<scenario_id>&pace=0.55`
- Legacy presentation capture remains valid: `?video=1&scenario=<id>&pace=0.55`
- Data package: `external/maritime_disease_atlas/data/maritime_youtube_video_plan.js`
- Recording packet: `notes/maritime-disease-atlas-youtube-recording-packet/`
- Source triage note: `notes/maritime-disease-atlas-source-triage.md`

`youtube=1` turns on Presentation Mode, applies the YouTube tour order, and brands the capture as a YouTube guided tour. Existing compatibility remains intact: `video=1`, `recording=1`, `tour=1`, `scenario=<id>`, `sound=1`, and `audio=1`.

## Voice Plan

- Final narration: Devin.
- AI voice: scratch timing only.
- Delivery target: essayistic historical epidemiology, calm, exact, and unsentimental.
- Sound: optional low atmosphere under narration only. No pitched tones, music stingers, or literal pirate effects.

## Runtime Structure

| Segment | Target | Capture cue | Visual beat | Narration job |
| --- | ---: | --- | --- | --- |
| Cold open | 0:00-0:45 | `?youtube=1&scenario=pirate_network&pace=0.55` | Map, routes, pirate-network archival plates | Replace "ships carried disease" with "ships made disease ecologies." |
| Pirate infrastructure | 0:45-1:45 | Pirate Ports | Nassau, Port Royal, Tortuga, Cape Fear, quarantine/lazaretto material | Show ports as infrastructure: provisioning, repair, labor, capture, documents, waiting. |
| Vector ecology | 1:45-2:55 | Yellow Fever, Malaria | Warm Atlantic and Caribbean port ecology | Explain that route movement and local vector ecology are not the same claim. |
| Provisions ecology | 2:55-4:20 | Scurvy, Flux, Typhoid | Casks, galley, water, waste, stored food | Move inward from ports to shipboard food-water and diet systems. |
| Crowding/contact | 4:20-5:55 | Ship Fever, Smallpox, Measles | Below-deck crowding, bedding, quarantine, inspection | Make the ship interior legible as epidemiologic architecture. |
| Violence/coercion | 5:55-7:20 | Wounds + Sepsis, Middle Passage | Surgery tools, trauma, forced confinement, Brookes diagram | Treat violence and forced movement as disease ecology, not background context. |
| Close | 7:20-8:10 | `?youtube=1&tour=1&pace=0.55` selected montage | Return to routes, ports, provisions, crowding, coercion | Close on maritime movement as ecological, political, and visible in sources. |

## Narration Script

### 0:00 - Cold Open

This is not a map of ships carrying diseases from one place to another. It is a map of ships as disease environments. A ship was a ration system, a waste system, an air system, a medical system, a labor system, and sometimes a machine of violence.

### 0:45 - Pirate Ports As Infrastructure

The pirate network is a useful place to begin because it makes infrastructure visible. Nassau, Port Royal, Tortuga, and the Carolina coast were connected by ships, but also by repair, provisioning, recruitment, capture, resale, rumor, water, food, alcohol, wounds, sex, insects, and waiting.

Disease risk lived inside that same network. The point is not that pirates uniquely caused epidemics. The point is that ports were ecological machinery.

Quarantine belongs in that machinery too. Bills of health, lazarettos, guards, cargo controls, sanitary bans, and waiting periods made quarantine a maritime technology, not just a medical footnote.

### 1:45 - Warm Ports And Vector Ecology

Yellow fever and malaria move the story to the warmer edge of the map, where port ecology and vector ecology overlap. Ships moved people, cargo, and exposure, but the disease cycle still depended on local conditions: climate, stored water, mosquito habitat, labor, immunity, and the timing of arrival.

A route is not a magic line of causation. It is a way of seeing how local ecologies became connected.

### 2:55 - Provisions, Water, And Time

Then the map moves inward, into the ship. Scurvy is time made biological: a long voyage can turn diet into exposure.

Flux and typhoid belong to food and water systems: casks, storage, handling, drinking water, dirty hands, waste boundaries, and the galley. The exposure route is not only across the ocean. It is through the barrel, the berth, and the hand.

### 4:20 - Crowding, Clothing, Bedding, And Air

Crowding changes the disease world again. Ship fever, smallpox, and measles turn berths, clothing, bedding, ventilation, and quarantine into epidemiologic objects.

Below deck is not just scenery. It is the architecture of transmission. And when the ship reached land, the exposure did not simply end. It entered quarantine stations, port inspections, hospitals, and politics.

### 5:55 - Violence And Forced Movement

Finally, maritime disease ecology cannot be separated from violence. Wounds, dirty tools, delayed care, and forced confinement make infection a social fact.

The Middle Passage is not an extreme example outside the system. It is one of the clearest exposures of what maritime movement could become when commerce, coercion, captivity, dehydration, crowding, violence, and disease were fused.

### 7:20 - Close

The sea did not merely connect outbreaks. It made disease ecological, political, and visible. It turned food, water, air, labor, quarantine, violence, and waiting into public-health history.

The full source-backed exhibit is linked below. The map is not the answer. It is the reading surface.

## Shot List

The machine-readable shot list lives in `external/maritime_disease_atlas/data/maritime_youtube_video_plan.js`. It includes 16 shots, chapter IDs, capture URLs, narration beats, edit notes, module IDs, and source IDs. Use the JS file as the production source of truth; this note is the human-readable briefing.

## YouTube Description Draft

Ships did not just carry disease across the sea. They created disease ecologies: crowded berths, contaminated water, spoiled provisions, vector-friendly ports, quarantine islands, naval wounds, coerced movement, and public-health conflict.

This guided tour adapts the source-backed Maritime Disease Ecology Atlas from The Edge of Epidemiology.

Full interactive exhibit and source credits: `/atlases/maritime/`

## Chapter Markers

```text
0:00 Ships as disease environments
0:45 Pirate ports as infrastructure
1:45 Warm ports and vector ecology
2:55 Provisions, water, and time
4:20 Crowding, clothing, bedding, and air
5:55 Violence and forced movement
7:20 Movement became ecology, policy, and memory
```

## Evidence Rules For The Edit

- Do not add precise mortality, route, or origin claims in narration unless the claim already exists in the source-backed exhibit data.
- Do not turn pirate ports into disease-origin claims.
- Do not imply every maritime epidemic was imported by ships.
- Do not collapse Middle Passage mortality into a generic infection story.
- Keep historical diagnostic uncertainty audible where the exhibit marks it.
- Link the public exhibit in the video description for source and image credits.

## Deferred From This Cut

- Barbary captivity and plague: narrowed. The exhibit now includes the 1817-1818 Algiers plague and American sanitary-ban case, but still excludes unsupported claims that plague determined captivity outcomes or the Barbary Wars.
- Convict ships and prison hulks: strong future module, but not in the current source-backed V1.
- Hantavirus cruise-ship claims: excluded as speculative without an official maritime outbreak source.
- Exact disease proportions during the Middle Passage: excluded because total mortality and voyage conditions are better supported than precise cause-specific attribution.
- Single-ship yellow fever import reconstructions: excluded unless a named voyage and source support the route claim.

## Final Production Checklist

- Capture full scratch tour with `?youtube=1&tour=1&pace=0.55`.
- Replace any scratch narration with Devin's final voice.
- Align `caption-draft.srt` to Devin's final waveform.
- Review the edit against the evidence rules above.
- Confirm the published description links to `/atlases/maritime/`.
- Keep atmosphere off unless it genuinely improves pacing under narration.
- Do not render or publish a public-final MP4 until Devin's WAV/M4A narration is available.
