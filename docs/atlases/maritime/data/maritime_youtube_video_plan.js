window.MARITIME_YOUTUBE_VIDEO_PLAN = {
  "schema_version": "1.0.0",
  "generated_at": "2026-05-18",
  "title": "Ships Were Disease Ecologies",
  "subtitle": "A YouTube guided tour of the Maritime Disease Ecology Atlas",
  "canonical_exhibit_path": "/atlases/maritime/",
  "runtime_target_seconds": 490,
  "capture_entrypoint": "index.html?youtube=1&tour=1&pace=0.55",
  "voice_plan": {
    "final_voice": "Devin",
    "scratch_voice": "AI voice may be used only for scratch timing and edit rhythm.",
    "delivery": "Essayistic historical epidemiology: calm, exact, and unsentimental.",
    "sound": "Optional low atmosphere only. No pitched tones, music stingers, or literal pirate sound effects."
  },
  "playback": {
    "default_query": "?youtube=1&tour=1&pace=0.55",
    "scenario_order": [
      "pirate_network",
      "yellow_fever",
      "malaria",
      "scurvy",
      "flux",
      "typhoid",
      "ship_fever",
      "smallpox",
      "measles",
      "wounds_sepsis",
      "middle_passage"
    ],
    "capture_notes": [
      "Use the full-tour URL for a continuous scratch capture.",
      "Use shot-level URLs when replacing one section with a tighter take.",
      "Keep atmosphere off for narration-first edits unless a quiet bed helps pacing.",
      "The public exhibit remains the source and credits surface; the YouTube description should link back to it."
    ]
  },
  "chapters": [
    {
      "id": "cold_open",
      "title": "A ship was a moving disease ecology",
      "start_time": "0:00",
      "duration_seconds": 45,
      "scenarios": ["pirate_network"],
      "module_ids": ["pirate_ports_caribbean_network"],
      "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"],
      "narration_job": "Replace the simple idea of ships carrying disease with the richer idea of ships making disease ecologies.",
      "uncertainty_note": "This is interpretive framing drawn from maritime social history; it is not a claim that pirates or ships alone caused epidemics."
    },
    {
      "id": "pirate_infrastructure",
      "title": "Pirate ports as infrastructure",
      "start_time": "0:45",
      "duration_seconds": 60,
      "scenarios": ["pirate_network"],
      "module_ids": ["pirate_ports_caribbean_network", "mediterranean_plague_lazarettos", "san_francisco_plague_port_1900"],
      "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains", "maritime-booker-quarantine-2007", "maritime-tognotti-quarantine-2013"],
      "narration_job": "Use Nassau, Port Royal, Tortuga, and coastal nodes to show how maritime disease risk lived inside provisioning, labor, repair, capture, trade, and port regulation.",
      "uncertainty_note": "Pirate ports are used as a network model, not as documented disease-origin points."
    },
    {
      "id": "vector_ecology",
      "title": "Warm ports and vector ecology",
      "start_time": "1:45",
      "duration_seconds": 70,
      "scenarios": ["yellow_fever", "malaria"],
      "module_ids": ["yellow_fever_atlantic_ports_1793"],
      "source_ids": ["yellow-history", "yellow-fever-who", "cdc-yellow-fever-spread", "malaria-who", "malaria-carter", "malaria-mordecai"],
      "narration_job": "Explain yellow fever and malaria as port and vector ecologies shaped by warm climates, water, labor, immunity, and travel.",
      "uncertainty_note": "The video should avoid claiming a single ship route as the origin of an epidemic unless the exhibit marks it as documented."
    },
    {
      "id": "provisions_ecology",
      "title": "Provisioning, water, and time",
      "start_time": "2:55",
      "duration_seconds": 85,
      "scenarios": ["scurvy", "flux", "typhoid"],
      "module_ids": ["scurvy_long_voyage_navy", "flux_dysentery_shipboard_water_waste", "typhoid_provisions_food_water", "cholera_steamship_quarantine_1892", "cruise_ship_norovirus_modern"],
      "source_ids": ["maritime-lind-scurvy-treatise", "maritime-carpenter-scurvy-vitamin-c", "shigella-cdc", "cdc-drinking-water", "typhoid-cdc-yellowbook", "typhoid-who", "cholera-who", "noro-cdc"],
      "narration_job": "Move from the port into the ship: casks, hands, food handling, waste, spoiled provisions, and vitamin deficiency.",
      "uncertainty_note": "Flux and dysentery are historically broad labels; the narration should not force every case into one pathogen."
    },
    {
      "id": "crowding_contact",
      "title": "Crowding, clothing, bedding, and air",
      "start_time": "4:20",
      "duration_seconds": 95,
      "scenarios": ["ship_fever", "smallpox", "measles"],
      "module_ids": ["ship_fever_grosse_ile_1847", "smallpox_maritime_isolation_hulks", "ellis_island_medical_inspection", "cruise_ship_covid_2020"],
      "source_ids": ["maritime-parks-canada-grosse-ile", "epidemic-typhus-cdc", "typhus-cdc-clinical", "smallpox-cdc", "smallpox-who", "measles-who", "measles-science", "maritime-nps-ellis-doctors", "maritime-cdc-cruise-covid-2020"],
      "narration_job": "Make the ship interior legible as an epidemiologic architecture: berths, clothes, bedding, ventilation, isolation, and arrival inspection.",
      "uncertainty_note": "Historical labels such as ship fever are not automatically pathogen-specific without source support."
    },
    {
      "id": "violence_coercion",
      "title": "Violence and forced movement",
      "start_time": "5:55",
      "duration_seconds": 85,
      "scenarios": ["wounds_sepsis", "middle_passage"],
      "module_ids": ["wounds_sepsis_shipboard_trauma", "middle_passage_forced_transport"],
      "source_ids": ["maritime-rediker-between-devil", "cdc-sepsis-about", "slavevoyages-methodology", "eltis-richardson-atlas-transatlantic-slave-trade", "curtin-epidemiology-slave-trade"],
      "narration_job": "Treat wounds, dirty tools, delayed care, captivity, dehydration, crowding, violence, and coercion as disease ecology rather than background texture.",
      "uncertainty_note": "Do not collapse Middle Passage mortality into a single disease story; source-backed mortality and cause-specific diagnosis are separate claims."
    },
    {
      "id": "close",
      "title": "Movement became ecology, policy, and memory",
      "start_time": "7:20",
      "duration_seconds": 50,
      "scenarios": ["pirate_network", "yellow_fever", "scurvy", "ship_fever", "middle_passage"],
      "module_ids": ["pirate_ports_caribbean_network", "yellow_fever_atlantic_ports_1793", "scurvy_long_voyage_navy", "ship_fever_grosse_ile_1847", "middle_passage_forced_transport"],
      "source_ids": ["maritime-rediker-between-devil", "yellow-history", "maritime-lind-scurvy-treatise", "maritime-parks-canada-grosse-ile", "slavevoyages-methodology"],
      "narration_job": "Close by returning to the map: the sea connected local exposures to policy, panic, profit, quarantine, and historical memory.",
      "uncertainty_note": "This is synthesis. Keep the wording ecological and political rather than monocausal."
    }
  ],
  "shots": [
    {
      "id": "s01_cold_map",
      "chapter_id": "cold_open",
      "duration_seconds": 25,
      "capture_url": "index.html?youtube=1&scenario=pirate_network&pace=0.55",
      "scenario_id": "pirate_network",
      "visual_beat": "Start on the map and let the first pirate-network route establish ships, ports, and movement.",
      "narration_beat": "This is not a map of ships carrying diseases from one place to another. It is a map of ships as disease environments.",
      "edit_notes": "Use a slow fade in from black. Keep the map readable; do not cover it with a full-screen plate until the route is legible.",
      "module_ids": ["pirate_ports_caribbean_network"],
      "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"]
    },
    {
      "id": "s02_cold_plate",
      "chapter_id": "cold_open",
      "duration_seconds": 20,
      "capture_url": "index.html?youtube=1&scenario=pirate_network&pace=0.55",
      "scenario_id": "pirate_network",
      "visual_beat": "Use the Ken Burns archival pirate plate as texture, then return to the map before the next chapter.",
      "narration_beat": "A ship was a food system, a waste system, a medical system, a labor system, and sometimes a machine of violence.",
      "edit_notes": "Let the archival image breathe, but cut back to map before the viewer loses geographic orientation.",
      "module_ids": ["pirate_ports_caribbean_network"],
      "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"]
    },
    {
      "id": "s03_pirate_ports",
      "chapter_id": "pirate_infrastructure",
      "duration_seconds": 30,
      "capture_url": "index.html?youtube=1&scenario=pirate_network&pace=0.55",
      "scenario_id": "pirate_network",
      "visual_beat": "Move through Nassau, Port Royal, Tortuga, and Cape Fear as infrastructure nodes.",
      "narration_beat": "Pirate ports are a useful opening because they make infrastructure visible: food, repair, recruitment, capture, resale, information, and waiting.",
      "edit_notes": "Avoid comic pirate tone. The frame is infrastructure and exposure, not adventure.",
      "module_ids": ["pirate_ports_caribbean_network"],
      "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"]
    },
    {
      "id": "s04_quarantine_infrastructure",
      "chapter_id": "pirate_infrastructure",
      "duration_seconds": 30,
      "capture_url": "index.html?youtube=1&scenario=pirate_network&pace=0.55",
      "scenario_id": "pirate_network",
      "visual_beat": "Use the quarantine/lazaretto material to shift from network romance to public-health infrastructure.",
      "narration_beat": "Quarantine was not a footnote. It was a maritime technology: documents, guards, isolation, cargo, time, and political conflict.",
      "edit_notes": "This is a good place for a citation-visible screenshot or quick lower-third credit if the edit needs one.",
      "module_ids": ["mediterranean_plague_lazarettos"],
      "source_ids": ["maritime-booker-quarantine-2007", "maritime-tognotti-quarantine-2013", "maritime-crawshaw-plague-hospitals"]
    },
    {
      "id": "s05_yellow_fever",
      "chapter_id": "vector_ecology",
      "duration_seconds": 35,
      "capture_url": "index.html?youtube=1&scenario=yellow_fever&pace=0.55",
      "scenario_id": "yellow_fever",
      "visual_beat": "Follow the Atlantic port route and warm-port visual plates.",
      "narration_beat": "Yellow fever shows why a port city is also an ecology: water storage, heat, mosquitoes, labor, immunity, and ships all matter.",
      "edit_notes": "Avoid implying that every outbreak was simply imported by one ship.",
      "module_ids": ["yellow_fever_atlantic_ports_1793"],
      "source_ids": ["yellow-history", "yellow-fever-who", "cdc-yellow-fever-spread", "nlm-yellow-fever-primary"]
    },
    {
      "id": "s06_malaria",
      "chapter_id": "vector_ecology",
      "duration_seconds": 35,
      "capture_url": "index.html?youtube=1&scenario=malaria&pace=0.55",
      "scenario_id": "malaria",
      "visual_beat": "Use the tropical route ecology to show that vector transmission depends on local ecological conditions.",
      "narration_beat": "Malaria pushes the same lesson harder: movement matters, but transmission still depends on mosquito ecology, climate, and local exposure.",
      "edit_notes": "Keep origin language conservative. This is about route ecology, not a clean birthplace story.",
      "module_ids": [],
      "source_ids": ["malaria-who", "malaria-carter", "malaria-mordecai"]
    },
    {
      "id": "s07_scurvy",
      "chapter_id": "provisions_ecology",
      "duration_seconds": 30,
      "capture_url": "index.html?youtube=1&scenario=scurvy&pace=0.55",
      "scenario_id": "scurvy",
      "visual_beat": "Let the scurvy route and Lind/provisioning imagery establish time, diet, and naval logistics.",
      "narration_beat": "Scurvy is time made biological. The longer the voyage moved away from fresh provisioning, the more diet became exposure.",
      "edit_notes": "This is the cleanest moment to say not every maritime disease story is infection.",
      "module_ids": ["scurvy_long_voyage_navy"],
      "source_ids": ["maritime-lind-scurvy-treatise", "maritime-carpenter-scurvy-vitamin-c", "maritime-james-lind-library-scurvy"]
    },
    {
      "id": "s08_flux",
      "chapter_id": "provisions_ecology",
      "duration_seconds": 30,
      "capture_url": "index.html?youtube=1&scenario=flux&pace=0.55",
      "scenario_id": "flux",
      "visual_beat": "Move into water, waste, shared utensils, and dirty boundaries below deck.",
      "narration_beat": "Flux and dysentery belong to water, waste, hands, food, storage, and confinement. Historical labels are often broader than modern diagnoses.",
      "edit_notes": "Use careful wording: broad syndrome first, possible agents second.",
      "module_ids": ["flux_dysentery_shipboard_water_waste", "cholera_steamship_quarantine_1892", "cruise_ship_norovirus_modern"],
      "source_ids": ["shigella-cdc", "cdc-drinking-water", "curtin-epidemiology-slave-trade", "cholera-who", "noro-cdc"]
    },
    {
      "id": "s09_typhoid",
      "chapter_id": "provisions_ecology",
      "duration_seconds": 25,
      "capture_url": "index.html?youtube=1&scenario=typhoid&pace=0.55",
      "scenario_id": "typhoid",
      "visual_beat": "Use the food-water plate and map route only when it supports the provision ecology argument.",
      "narration_beat": "Typhoid makes provisions epidemiologic: carriers, fecal contamination, handling, storage, and drinking water turn ordinary ship work into exposure.",
      "edit_notes": "If the U.S. typhoid map appears, frame it as food-water ecology, not as a maritime route claim.",
      "module_ids": ["typhoid_provisions_food_water"],
      "source_ids": ["typhoid-cdc-yellowbook", "typhoid-who", "cdc-drinking-water"]
    },
    {
      "id": "s10_ship_fever",
      "chapter_id": "crowding_contact",
      "duration_seconds": 35,
      "capture_url": "index.html?youtube=1&scenario=ship_fever&pace=0.55",
      "scenario_id": "ship_fever",
      "visual_beat": "Use steerage and Grosse Ile material to show ship and quarantine station as a connected exposure system.",
      "narration_beat": "Ship fever makes clothing, lice, hygiene, crowding, delayed landing, and quarantine part of the same disease ecology.",
      "edit_notes": "Do not overuse the single passengers-on-ship image; lean on the newer plate variety.",
      "module_ids": ["ship_fever_grosse_ile_1847", "ellis_island_medical_inspection"],
      "source_ids": ["maritime-parks-canada-grosse-ile", "epidemic-typhus-cdc", "typhus-cdc-clinical", "maritime-nps-ellis-doctors"]
    },
    {
      "id": "s11_smallpox",
      "chapter_id": "crowding_contact",
      "duration_seconds": 30,
      "capture_url": "index.html?youtube=1&scenario=smallpox&pace=0.55",
      "scenario_id": "smallpox",
      "visual_beat": "Show bedding, close quarters, arrival inspection, and maritime isolation rather than a single origin route.",
      "narration_beat": "Smallpox turns bedding, clothing, susceptible passengers, and port isolation into public-health objects.",
      "edit_notes": "Keep eradication/global origin out of this cut unless it is needed for one sentence of context.",
      "module_ids": ["smallpox_maritime_isolation_hulks"],
      "source_ids": ["smallpox-cdc", "smallpox-who", "smallpox-origin-babkin", "who-smallpox-eradication"]
    },
    {
      "id": "s12_measles",
      "chapter_id": "crowding_contact",
      "duration_seconds": 30,
      "capture_url": "index.html?youtube=1&scenario=measles&pace=0.55",
      "scenario_id": "measles",
      "visual_beat": "Use the shipboard-air framing and any crowding imagery as the bridge to modern closed-vessel comparisons.",
      "narration_beat": "Measles reminds us that below deck was not just scenery. Air, susceptibility, duration, and crowding could make the interior of a ship the exposure.",
      "edit_notes": "Do not turn this into a full measles history. It is here to teach respiratory crowding.",
      "module_ids": ["cruise_ship_covid_2020"],
      "source_ids": ["measles-who", "measles-science", "measles-lancet", "maritime-cdc-cruise-covid-2020"]
    },
    {
      "id": "s13_wounds_sepsis",
      "chapter_id": "violence_coercion",
      "duration_seconds": 35,
      "capture_url": "index.html?youtube=1&scenario=wounds_sepsis&pace=0.55",
      "scenario_id": "wounds_sepsis",
      "visual_beat": "Use naval surgery, tools, injury, and delayed care as the visual language.",
      "narration_beat": "Wounds made violence biological: splinters, blades, burns, dirty dressings, delayed care, and shared bedding turned trauma into infectious risk.",
      "edit_notes": "Avoid gore. Make the mechanism legible through tools and route context.",
      "module_ids": ["wounds_sepsis_shipboard_trauma"],
      "source_ids": ["maritime-rediker-between-devil", "cdc-sepsis-about"]
    },
    {
      "id": "s14_middle_passage",
      "chapter_id": "violence_coercion",
      "duration_seconds": 50,
      "capture_url": "index.html?youtube=1&scenario=middle_passage&pace=0.55",
      "scenario_id": "middle_passage",
      "visual_beat": "Use the Middle Passage route and Brookes diagram with sober pacing.",
      "narration_beat": "The Middle Passage is not an extreme example outside the system. It exposes what maritime movement could become when commerce, coercion, captivity, dehydration, crowding, violence, and disease were fused.",
      "edit_notes": "Keep language sober. Do not reduce mortality to a generic disease-spread story.",
      "module_ids": ["middle_passage_forced_transport"],
      "source_ids": ["slavevoyages-methodology", "eltis-richardson-atlas-transatlantic-slave-trade", "curtin-epidemiology-slave-trade"]
    },
    {
      "id": "s15_return_to_map",
      "chapter_id": "close",
      "duration_seconds": 30,
      "capture_url": "index.html?youtube=1&tour=1&pace=0.55",
      "scenario_id": null,
      "visual_beat": "Use a selected montage from the full YouTube tour capture: routes, ports, provisions, crowding, coercion.",
      "narration_beat": "The sea did not merely connect outbreaks. It connected local exposures to policy, panic, profit, quarantine, and memory.",
      "edit_notes": "This can be built from the full-tour capture rather than a separate take.",
      "module_ids": ["pirate_ports_caribbean_network", "ship_fever_grosse_ile_1847", "middle_passage_forced_transport"],
      "source_ids": ["maritime-rediker-between-devil", "maritime-parks-canada-grosse-ile", "slavevoyages-methodology"]
    },
    {
      "id": "s16_end_card",
      "chapter_id": "close",
      "duration_seconds": 20,
      "capture_url": "index.html?youtube=1&tour=1&pace=0.55",
      "scenario_id": null,
      "visual_beat": "Hold on a readable map frame with exhibit title and website route in the description, not as a large in-video card.",
      "narration_beat": "The full source-backed exhibit is linked below. The map is not the answer. It is the reading surface.",
      "edit_notes": "Fade out without music sting. Let the last line land cleanly.",
      "module_ids": [],
      "source_ids": ["maritime-rediker-between-devil", "yellow-history", "maritime-lind-scurvy-treatise", "slavevoyages-methodology"]
    }
  ],
  "narration_script": [
    {
      "chapter_id": "cold_open",
      "script": "This is not a map of ships carrying diseases from one place to another. It is a map of ships as disease environments. A ship was a ration system, a waste system, an air system, a medical system, a labor system, and sometimes a machine of violence.",
      "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"],
      "review_note": "Interpretive synthesis from maritime social history; keep it as framing, not monocausal claim."
    },
    {
      "chapter_id": "pirate_infrastructure",
      "script": "The pirate network is a useful place to begin because it makes infrastructure visible. Nassau, Port Royal, Tortuga, and the Carolina coast were connected by ships, but also by repair, provisioning, recruitment, capture, resale, rumor, water, food, alcohol, wounds, sex, insects, and waiting. Disease risk lived inside that same network. The point is not that pirates uniquely caused epidemics. The point is that ports were ecological machinery.",
      "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"],
      "review_note": "Do not claim a specific pirate-port outbreak burden."
    },
    {
      "chapter_id": "vector_ecology",
      "script": "Yellow fever and malaria move the story to the warmer edge of the map, where port ecology and vector ecology overlap. Ships moved people, cargo, and exposure, but the disease cycle still depended on local conditions: climate, stored water, mosquito habitat, labor, immunity, and the timing of arrival. A route is not a magic line of causation. It is a way of seeing how local ecologies became connected.",
      "source_ids": ["yellow-history", "yellow-fever-who", "cdc-yellow-fever-spread", "malaria-who", "malaria-carter", "malaria-mordecai"],
      "review_note": "Avoid single-ship import claims."
    },
    {
      "chapter_id": "provisions_ecology",
      "script": "Then the map moves inward, into the ship. Scurvy is time made biological: a long voyage can turn diet into exposure. Flux and typhoid belong to food and water systems: casks, storage, handling, drinking water, dirty hands, waste boundaries, and the galley. The exposure route is not only across the ocean. It is through the barrel, the berth, and the hand.",
      "source_ids": ["maritime-lind-scurvy-treatise", "maritime-carpenter-scurvy-vitamin-c", "shigella-cdc", "cdc-drinking-water", "typhoid-cdc-yellowbook", "typhoid-who"],
      "review_note": "Keep flux/dysentery as broad historical syndrome unless a source supports pathogen specificity."
    },
    {
      "chapter_id": "crowding_contact",
      "script": "Crowding changes the disease world again. Ship fever, smallpox, and measles turn berths, clothing, bedding, ventilation, and quarantine into epidemiologic objects. Below deck is not just scenery. It is the architecture of transmission. And when the ship reached land, the exposure did not simply end. It entered quarantine stations, port inspections, hospitals, and politics.",
      "source_ids": ["maritime-parks-canada-grosse-ile", "epidemic-typhus-cdc", "typhus-cdc-clinical", "smallpox-cdc", "smallpox-who", "measles-who", "maritime-nps-ellis-doctors"],
      "review_note": "Use 'ship fever' cautiously; historical terminology is not always pathogen-specific."
    },
    {
      "chapter_id": "violence_coercion",
      "script": "Finally, maritime disease ecology cannot be separated from violence. Wounds, dirty tools, delayed care, and forced confinement make infection a social fact. The Middle Passage is not an extreme example outside the system. It is one of the clearest exposures of what maritime movement could become when commerce, coercion, captivity, dehydration, crowding, violence, and disease were fused.",
      "source_ids": ["maritime-rediker-between-devil", "cdc-sepsis-about", "slavevoyages-methodology", "eltis-richardson-atlas-transatlantic-slave-trade", "curtin-epidemiology-slave-trade"],
      "review_note": "Do not imply exact cause-specific mortality proportions."
    },
    {
      "chapter_id": "close",
      "script": "The sea did not merely connect outbreaks. It made disease ecological, political, and visible. It turned food, water, air, labor, quarantine, violence, and waiting into public-health history. The full source-backed exhibit is linked below. The map is not the answer. It is the reading surface.",
      "source_ids": ["maritime-rediker-between-devil", "yellow-history", "maritime-lind-scurvy-treatise", "maritime-parks-canada-grosse-ile", "slavevoyages-methodology"],
      "review_note": "Closing synthesis; keep the final edit linked to exhibit sources."
    }
  ],
  "youtube_description_draft": "Ships did not just carry disease across the sea. They created disease ecologies: crowded berths, contaminated water, spoiled provisions, vector-friendly ports, quarantine islands, naval wounds, coerced movement, and public-health conflict. This guided tour adapts the source-backed Maritime Disease Ecology Atlas from The Edge of Epidemiology. Full interactive exhibit and source credits: /atlases/maritime/",
  "chapter_markers": [
    {"time": "0:00", "label": "Ships as disease environments"},
    {"time": "0:45", "label": "Pirate ports as infrastructure"},
    {"time": "1:45", "label": "Warm ports and vector ecology"},
    {"time": "2:55", "label": "Provisions, water, and time"},
    {"time": "4:20", "label": "Crowding, clothing, bedding, and air"},
    {"time": "5:55", "label": "Violence and forced movement"},
    {"time": "7:20", "label": "Movement became ecology, policy, and memory"}
  ],
  "source_policy": [
    "Narration should use the exhibit and module source IDs as its evidence base.",
    "No precise mortality or route claim should be added in the video unless already supported in the exhibit data.",
    "Uncertain retrospective diagnosis should remain visibly cautious in narration.",
    "Credits live in the exhibit; the video description should link to the exhibit for full source and image metadata."
  ],
  "deferred_or_excluded": [
    {
      "item": "Barbary captivity and plague",
      "reason": "Good future topic, but excluded from this cut because V1 deferred the case pending stronger case-level sourcing."
    },
    {
      "item": "Convict ships and prison hulks",
      "reason": "Excluded from this first YouTube cut because the exhibit data defers a separate source pass."
    },
    {
      "item": "Exact disease proportions during the Middle Passage",
      "reason": "Excluded because source-backed total mortality and voyage conditions are stronger than precise cause-specific disease attribution."
    },
    {
      "item": "Single-ship yellow fever import claims",
      "reason": "Excluded unless a named voyage and source support the route claim."
    }
  ],
  "human_review_needed": [
    "Record Devin's final narration and replace any scratch AI voice.",
    "Review final edit for accidental overclaiming in transitions.",
    "Check that the final video description links to the published exhibit route once deployed."
  ]
};
