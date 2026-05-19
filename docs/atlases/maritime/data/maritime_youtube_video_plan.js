window.MARITIME_YOUTUBE_VIDEO_PLAN = {
  "schema_version": "1.0.0",
  "generated_at": "2026-05-19",
  "title": "Ships Were Disease Ecologies",
  "subtitle": "A YouTube guided tour of the Maritime Disease Ecology Atlas",
  "canonical_exhibit_path": "/atlases/maritime/",
  "runtime_target_seconds": 700,
  "capture_entrypoint": "index.html?youtube=1&tour=1&pace=2.3",
  "voice_plan": {
    "final_voice": "Devin",
    "scratch_voice": "AI voice may be used only for scratch timing and edit rhythm.",
    "delivery": "Essayistic historical epidemiology: calm, exact, unsentimental, and paced for an 11-minute guided tour inside a 10-12 minute target window.",
    "sound": "Optional low atmosphere only. No pitched tones, music stingers, or literal pirate sound effects."
  },
  "playback": {
    "default_query": "?youtube=1&tour=1&pace=2.3",
    "scenario_order": [
      "yellow_fever",
      "malaria",
      "scurvy",
      "flux",
      "typhoid",
      "ship_fever",
      "smallpox",
      "measles",
      "wounds_sepsis",
      "middle_passage",
      "pirate_network"
    ],
    "capture_notes": [
      "Use the full-tour URL for a continuous scratch capture in the same station order as the public exhibit.",
      "Use shot-level URLs when replacing one section with a tighter take.",
      "Keep atmosphere off for narration-first edits unless a quiet bed helps pacing.",
      "The public exhibit remains the source and credits surface; the YouTube description should link back to it."
    ],
    "default_pace": 2.3,
    "target_runtime_seconds": 700,
    "cadence_notes": [
      "The full YouTube tour is timed for about 11:40 at pace=2.3, inside the requested 10-12 minute range.",
      "The scenario order must follow the exhibit station bar: vector/port, provisions, crowding, coercion/piracy.",
      "Hold route and point scenes long enough for narration before advancing.",
      "Use pauses as part of the exhibit rhythm; do not rush through source caveats.",
      "Shot replacement captures should keep pace=2.3 unless intentionally retiming a single section."
    ]
  },
  "chapters": [
    {
      "id": "intro",
      "title": "A ship was a moving disease ecology",
      "start_time": "0:00",
      "duration_seconds": 45,
      "scenarios": [
        "yellow_fever"
      ],
      "module_ids": [
        "yellow_fever_atlantic_ports_1793"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "yellow-history"
      ],
      "narration_job": "Open in the exhibit order, using the first vector/port station as the visual anchor while defining the central frame: ships as disease ecologies, not simple carriers.",
      "uncertainty_note": "This is interpretive synthesis; it should not claim that ships alone caused epidemics."
    },
    {
      "id": "yellow_fever",
      "title": "Yellow fever: warm port ecology",
      "start_time": "0:45",
      "duration_seconds": 55,
      "scenarios": [
        "yellow_fever"
      ],
      "module_ids": [
        "yellow_fever_atlantic_ports_1793"
      ],
      "source_ids": [
        "yellow-history",
        "yellow-fever-who",
        "cdc-yellow-fever-spread",
        "nlm-yellow-fever-primary"
      ],
      "narration_job": "Follow the first exhibit station. Explain yellow fever as a port-and-vector ecology without inventing a single ship import route.",
      "uncertainty_note": "The vector mechanism is strong; specific eighteenth-century import chains require case-level evidence."
    },
    {
      "id": "malaria",
      "title": "Malaria: movement plus local mosquito ecology",
      "start_time": "1:40",
      "duration_seconds": 50,
      "scenarios": [
        "malaria"
      ],
      "module_ids": [],
      "source_ids": [
        "malaria-who",
        "malaria-carter",
        "malaria-mordecai"
      ],
      "narration_job": "Use malaria to sharpen the distinction between maritime movement and local ecological transmission.",
      "uncertainty_note": "This is route ecology, not a clean origin or single-voyage claim."
    },
    {
      "id": "scurvy",
      "title": "Scurvy: diet, time, and naval logistics",
      "start_time": "2:30",
      "duration_seconds": 55,
      "scenarios": [
        "scurvy"
      ],
      "module_ids": [
        "scurvy_long_voyage_navy"
      ],
      "source_ids": [
        "maritime-lind-scurvy-treatise",
        "maritime-carpenter-scurvy-vitamin-c",
        "maritime-james-lind-library-scurvy"
      ],
      "narration_job": "Start the provisions station with the clean noninfectious case: nutritional deficiency as maritime exposure.",
      "uncertainty_note": "The deficiency mechanism is high confidence; voyage-specific mortality rates need ship-level sources."
    },
    {
      "id": "flux",
      "title": "Flux and dysentery: water, waste, and broad historical labels",
      "start_time": "3:25",
      "duration_seconds": 55,
      "scenarios": [
        "flux"
      ],
      "module_ids": [
        "flux_dysentery_shipboard_water_waste",
        "cholera_steamship_quarantine_1892",
        "cruise_ship_norovirus_modern"
      ],
      "source_ids": [
        "shigella-cdc",
        "cdc-drinking-water",
        "curtin-epidemiology-slave-trade",
        "cholera-who",
        "noro-cdc"
      ],
      "narration_job": "Move from absence of nutrients to contamination systems: casks, hands, waste boundaries, and historically broad diarrheal labels.",
      "uncertainty_note": "Flux/dysentery are not one diagnosis; pathogen-specific claims require source-backed cases."
    },
    {
      "id": "typhoid",
      "title": "Typhoid: provisions as fecal-oral infrastructure",
      "start_time": "4:20",
      "duration_seconds": 55,
      "scenarios": [
        "typhoid"
      ],
      "module_ids": [
        "typhoid_provisions_food_water"
      ],
      "source_ids": [
        "typhoid-cdc-yellowbook",
        "typhoid-who",
        "cdc-drinking-water"
      ],
      "narration_job": "Finish the provisions station by making food-water transmission legible through storage, handling, carriers, and drinking water.",
      "uncertainty_note": "The biomedical mechanism is strong; historical fever labels aboard ships can be nonspecific."
    },
    {
      "id": "ship_fever",
      "title": "Ship fever: crowding, clothing, lice, and quarantine",
      "start_time": "5:15",
      "duration_seconds": 65,
      "scenarios": [
        "ship_fever"
      ],
      "module_ids": [
        "ship_fever_grosse_ile_1847",
        "ellis_island_medical_inspection"
      ],
      "source_ids": [
        "maritime-parks-canada-grosse-ile",
        "epidemic-typhus-cdc",
        "typhus-cdc-clinical",
        "maritime-nps-ellis-doctors"
      ],
      "narration_job": "Open the crowding station by connecting the migrant ship to quarantine stations and inspection infrastructure.",
      "uncertainty_note": "Ship fever often points toward typhus in this setting, but historical fever terminology is not always pathogen-specific."
    },
    {
      "id": "smallpox",
      "title": "Smallpox: bedding, susceptibility, and maritime isolation",
      "start_time": "6:20",
      "duration_seconds": 55,
      "scenarios": [
        "smallpox"
      ],
      "module_ids": [
        "smallpox_maritime_isolation_hulks"
      ],
      "source_ids": [
        "smallpox-cdc",
        "smallpox-who",
        "smallpox-origin-babkin",
        "who-smallpox-eradication"
      ],
      "narration_job": "Keep smallpox focused on maritime transmission and quarantine context, not deep origin history.",
      "uncertainty_note": "Transmission and quarantine claims are stronger here than retrospective origin claims."
    },
    {
      "id": "measles",
      "title": "Measles: air, susceptibility, and closed-vessel comparison",
      "start_time": "7:15",
      "duration_seconds": 50,
      "scenarios": [
        "measles"
      ],
      "module_ids": [
        "cruise_ship_covid_2020"
      ],
      "source_ids": [
        "measles-who",
        "measles-science",
        "measles-lancet",
        "maritime-cdc-cruise-covid-2020"
      ],
      "narration_job": "Use measles to close the crowding station with respiratory transmission and susceptibility in confined spaces.",
      "uncertainty_note": "Do not turn this into a full measles history; it is here to teach respiratory crowding."
    },
    {
      "id": "wounds_sepsis",
      "title": "Wounds and sepsis: violence made biological",
      "start_time": "8:05",
      "duration_seconds": 55,
      "scenarios": [
        "wounds_sepsis"
      ],
      "module_ids": [
        "wounds_sepsis_shipboard_trauma"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "cdc-sepsis-about"
      ],
      "narration_job": "Begin the coercion/piracy station with trauma, dirty dressings, delayed care, and the limits of retrospective diagnosis.",
      "uncertainty_note": "Sepsis is a modern clinical framing; historical sources often describe wounds, fever, gangrene, or death rather than sepsis."
    },
    {
      "id": "middle_passage",
      "title": "Middle Passage: forced movement as disease ecology",
      "start_time": "9:00",
      "duration_seconds": 75,
      "scenarios": [
        "middle_passage"
      ],
      "module_ids": [
        "middle_passage_forced_transport"
      ],
      "source_ids": [
        "slavevoyages-methodology",
        "eltis-richardson-atlas-transatlantic-slave-trade",
        "curtin-epidemiology-slave-trade"
      ],
      "narration_job": "Treat forced confinement, dehydration, heat, crowding, violence, and infection as one coercive ecology while preserving evidence limits.",
      "uncertainty_note": "Total mortality and voyage conditions are stronger than precise cause-specific disease proportions."
    },
    {
      "id": "pirate_ports",
      "title": "Pirate ports: infrastructure at the end of the exhibit line",
      "start_time": "10:15",
      "duration_seconds": 65,
      "scenarios": [
        "pirate_network"
      ],
      "module_ids": [
        "pirate_ports_caribbean_network",
        "mediterranean_plague_lazarettos",
        "algiers_plague_sanitary_ban_1818",
        "san_francisco_plague_port_1900"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "maritime-rediker-villains",
        "maritime-booker-quarantine-2007",
        "maritime-tognotti-quarantine-2013",
        "maritime-delange-algiers-sanitary-ban-1818",
        "maritime-ini-quarantine-geographies-2023"
      ],
      "narration_job": "End the exhibit sequence with the pirate-network station as a synthesis of ports, repair, provisioning, capture, quarantine, and regulation.",
      "uncertainty_note": "Pirate ports are a network and exposure model, not documented disease-origin points."
    },
    {
      "id": "close",
      "title": "Movement became ecology, policy, and memory",
      "start_time": "11:20",
      "duration_seconds": 20,
      "scenarios": [
        "yellow_fever",
        "malaria",
        "scurvy",
        "flux",
        "typhoid",
        "ship_fever",
        "smallpox",
        "measles",
        "wounds_sepsis",
        "middle_passage",
        "pirate_network"
      ],
      "module_ids": [
        "yellow_fever_atlantic_ports_1793",
        "scurvy_long_voyage_navy",
        "ship_fever_grosse_ile_1847",
        "middle_passage_forced_transport",
        "pirate_ports_caribbean_network"
      ],
      "source_ids": [
        "yellow-history",
        "maritime-lind-scurvy-treatise",
        "maritime-parks-canada-grosse-ile",
        "slavevoyages-methodology",
        "maritime-rediker-between-devil"
      ],
      "narration_job": "Close on the exhibit sequence as a reading surface: vector ports, provisions, crowding, coercion, and port networks.",
      "uncertainty_note": "Closing synthesis should remain ecological and political rather than monocausal."
    }
  ],
  "shots": [
    {
      "id": "s01_intro",
      "chapter_id": "intro",
      "duration_seconds": 45,
      "capture_url": "index.html?youtube=1&scenario=yellow_fever&pace=2.3",
      "scenario_id": "yellow_fever",
      "visual_beat": "Open on the Yellow Fever station rather than the pirate network so the video begins in the same station order as the exhibit.",
      "narration_beat": "Start with the order of the exhibit itself.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "yellow_fever_atlantic_ports_1793"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "yellow-history"
      ]
    },
    {
      "id": "s02_yellow_fever",
      "chapter_id": "yellow_fever",
      "duration_seconds": 55,
      "capture_url": "index.html?youtube=1&scenario=yellow_fever&pace=2.3",
      "scenario_id": "yellow_fever",
      "visual_beat": "Follow the Atlantic warm-port route and archival yellow-fever material while keeping the route confidence visible.",
      "narration_beat": "Yellow fever opens the exhibit because it makes port ecology unavoidable.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "yellow_fever_atlantic_ports_1793"
      ],
      "source_ids": [
        "yellow-history",
        "yellow-fever-who",
        "cdc-yellow-fever-spread",
        "nlm-yellow-fever-primary"
      ]
    },
    {
      "id": "s03_malaria",
      "chapter_id": "malaria",
      "duration_seconds": 50,
      "capture_url": "index.html?youtube=1&scenario=malaria&pace=2.3",
      "scenario_id": "malaria",
      "visual_beat": "Shift to malaria ecology and mosquito habitat without implying a clean maritime birthplace.",
      "narration_beat": "Malaria pushes that lesson further.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [],
      "source_ids": [
        "malaria-who",
        "malaria-carter",
        "malaria-mordecai"
      ]
    },
    {
      "id": "s04_scurvy",
      "chapter_id": "scurvy",
      "duration_seconds": 55,
      "capture_url": "index.html?youtube=1&scenario=scurvy&pace=2.3",
      "scenario_id": "scurvy",
      "visual_beat": "Use scurvy route movement, provisioning imagery, and Lind material to mark the turn inward to diet and time.",
      "narration_beat": "Then the exhibit turns from warm ports to provisions.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "scurvy_long_voyage_navy"
      ],
      "source_ids": [
        "maritime-lind-scurvy-treatise",
        "maritime-carpenter-scurvy-vitamin-c",
        "maritime-james-lind-library-scurvy"
      ]
    },
    {
      "id": "s05_flux",
      "chapter_id": "flux",
      "duration_seconds": 55,
      "capture_url": "index.html?youtube=1&scenario=flux&pace=2.3",
      "scenario_id": "flux",
      "visual_beat": "Show water, waste, galley, and below-deck contamination cues; keep historical diagnostic breadth visible.",
      "narration_beat": "Flux and dysentery move from absence to contamination.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "flux_dysentery_shipboard_water_waste",
        "cholera_steamship_quarantine_1892",
        "cruise_ship_norovirus_modern"
      ],
      "source_ids": [
        "shigella-cdc",
        "cdc-drinking-water",
        "curtin-epidemiology-slave-trade",
        "cholera-who",
        "noro-cdc"
      ]
    },
    {
      "id": "s06_typhoid",
      "chapter_id": "typhoid",
      "duration_seconds": 55,
      "capture_url": "index.html?youtube=1&scenario=typhoid&pace=2.3",
      "scenario_id": "typhoid",
      "visual_beat": "Use the food-water/provisions visual layer; frame any U.S. typhoid imagery as mechanism evidence, not a maritime route.",
      "narration_beat": "Typhoid narrows the food-water lesson.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "typhoid_provisions_food_water"
      ],
      "source_ids": [
        "typhoid-cdc-yellowbook",
        "typhoid-who",
        "cdc-drinking-water"
      ]
    },
    {
      "id": "s07_ship_fever",
      "chapter_id": "ship_fever",
      "duration_seconds": 65,
      "capture_url": "index.html?youtube=1&scenario=ship_fever&pace=2.3",
      "scenario_id": "ship_fever",
      "visual_beat": "Use steerage and Grosse Ile material to connect shipboard crowding to quarantine infrastructure.",
      "narration_beat": "The next station is crowding.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "ship_fever_grosse_ile_1847",
        "ellis_island_medical_inspection"
      ],
      "source_ids": [
        "maritime-parks-canada-grosse-ile",
        "epidemic-typhus-cdc",
        "typhus-cdc-clinical",
        "maritime-nps-ellis-doctors"
      ]
    },
    {
      "id": "s08_smallpox",
      "chapter_id": "smallpox",
      "duration_seconds": 55,
      "capture_url": "index.html?youtube=1&scenario=smallpox&pace=2.3",
      "scenario_id": "smallpox",
      "visual_beat": "Show bedding, close quarters, inspection, and isolation; avoid deep-origin visual claims.",
      "narration_beat": "Smallpox shifts the crowding section from lice and clothing toward susceptibility, contact, bedding, and isolation.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "smallpox_maritime_isolation_hulks"
      ],
      "source_ids": [
        "smallpox-cdc",
        "smallpox-who",
        "smallpox-origin-babkin",
        "who-smallpox-eradication"
      ]
    },
    {
      "id": "s09_measles",
      "chapter_id": "measles",
      "duration_seconds": 50,
      "capture_url": "index.html?youtube=1&scenario=measles&pace=2.3",
      "scenario_id": "measles",
      "visual_beat": "Use respiratory/crowding imagery and closed-vessel comparison as a short bridge.",
      "narration_beat": "Measles closes the crowding station by making air and susceptibility visible.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "cruise_ship_covid_2020"
      ],
      "source_ids": [
        "measles-who",
        "measles-science",
        "measles-lancet",
        "maritime-cdc-cruise-covid-2020"
      ]
    },
    {
      "id": "s10_wounds_sepsis",
      "chapter_id": "wounds_sepsis",
      "duration_seconds": 55,
      "capture_url": "index.html?youtube=1&scenario=wounds_sepsis&pace=2.3",
      "scenario_id": "wounds_sepsis",
      "visual_beat": "Use surgery tools, wounds, labor, and violence visuals without gore.",
      "narration_beat": "The final station group begins with wounds and sepsis because maritime disease ecology was also made by violence and labor.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "wounds_sepsis_shipboard_trauma"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "cdc-sepsis-about"
      ]
    },
    {
      "id": "s11_middle_passage",
      "chapter_id": "middle_passage",
      "duration_seconds": 75,
      "capture_url": "index.html?youtube=1&scenario=middle_passage&pace=2.3",
      "scenario_id": "middle_passage",
      "visual_beat": "Use the Middle Passage route and Brookes diagram soberly, with enough hold time for caveats.",
      "narration_beat": "The Middle Passage has to be handled with discipline.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "middle_passage_forced_transport"
      ],
      "source_ids": [
        "slavevoyages-methodology",
        "eltis-richardson-atlas-transatlantic-slave-trade",
        "curtin-epidemiology-slave-trade"
      ]
    },
    {
      "id": "s12_pirate_ports",
      "chapter_id": "pirate_ports",
      "duration_seconds": 65,
      "capture_url": "index.html?youtube=1&scenario=pirate_network&pace=2.3",
      "scenario_id": "pirate_network",
      "visual_beat": "Move through Nassau, Port Royal, Tortuga, Cape Fear, and quarantine material as the final station in exhibit order.",
      "narration_beat": "The exhibit ends with pirate ports, not because pirates are the main cause of maritime disease, but because the pirate network makes infrastructure visible in one frame.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "pirate_ports_caribbean_network",
        "mediterranean_plague_lazarettos",
        "algiers_plague_sanitary_ban_1818",
        "san_francisco_plague_port_1900"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "maritime-rediker-villains",
        "maritime-booker-quarantine-2007",
        "maritime-tognotti-quarantine-2013",
        "maritime-delange-algiers-sanitary-ban-1818",
        "maritime-ini-quarantine-geographies-2023"
      ]
    },
    {
      "id": "s13_close",
      "chapter_id": "close",
      "duration_seconds": 20,
      "capture_url": "index.html?youtube=1&tour=1&pace=2.3",
      "scenario_id": null,
      "visual_beat": "Return to a readable tour montage: vector ports, provisions, crowding, coercion, and pirate-port infrastructure.",
      "narration_beat": "Read in exhibit order, the map moves from vectors to provisions, from crowding to coercion, and finally to ports as infrastructure.",
      "edit_notes": "Keep this shot in exhibit station order; use single-scenario retakes only to improve readability, not to reorder the argument.",
      "module_ids": [
        "yellow_fever_atlantic_ports_1793",
        "scurvy_long_voyage_navy",
        "ship_fever_grosse_ile_1847",
        "middle_passage_forced_transport",
        "pirate_ports_caribbean_network"
      ],
      "source_ids": [
        "yellow-history",
        "maritime-lind-scurvy-treatise",
        "maritime-parks-canada-grosse-ile",
        "slavevoyages-methodology",
        "maritime-rediker-between-devil"
      ]
    }
  ],
  "narration_script": [
    {
      "chapter_id": "intro",
      "script": "Start with the order of the exhibit itself. The first thing the map asks us to see is not a ship as an arrow across water, but a ship inside a system of ports, provisions, bodies, air, waste, violence, and rules. That is the argument of the atlas: maritime disease history is not just importation. It is ecology. Every station that follows changes the scale of the question. First warm ports and vectors. Then food, water, and diet. Then crowding and contact. Then wounds, forced movement, and pirate-port infrastructure.",
      "source_ids": [
        "maritime-rediker-between-devil",
        "yellow-history"
      ],
      "review_note": "This is interpretive synthesis; it should not claim that ships alone caused epidemics."
    },
    {
      "chapter_id": "yellow_fever",
      "script": "Yellow fever opens the exhibit because it makes port ecology unavoidable. Ships could connect Atlantic and Caribbean ports, but the route alone is not the cause. Yellow fever needed warm conditions, susceptible people, human-mosquito-human transmission, stored water, and urban port environments where Aedes mosquitoes could live close to people. So the map is not saying that one ship explains an epidemic. It is saying that shipping networks and local mosquito ecology could become one epidemiologic system. That distinction is the whole point: maritime movement made exposure possible, but the port made transmission durable.",
      "source_ids": [
        "yellow-history",
        "yellow-fever-who",
        "cdc-yellow-fever-spread",
        "nlm-yellow-fever-primary"
      ],
      "review_note": "The vector mechanism is strong; specific eighteenth-century import chains require case-level evidence."
    },
    {
      "chapter_id": "malaria",
      "script": "Malaria pushes that lesson further. Maritime routes moved soldiers, workers, captives, sailors, and traders through mosquito ecologies, but malaria was never simply a line on the ocean. It depended on Anopheles mosquitoes, climate, water, land use, immunity, and repeated exposure. The sea connected places where those conditions could matter. The map therefore separates movement from mechanism. A ship can carry people into risk; it does not by itself create the parasite-vector-human cycle. For historical epidemiology, that is a useful guardrail against too-clean origin stories.",
      "source_ids": [
        "malaria-who",
        "malaria-carter",
        "malaria-mordecai"
      ],
      "review_note": "This is route ecology, not a clean origin or single-voyage claim."
    },
    {
      "chapter_id": "scurvy",
      "script": "Then the exhibit turns from warm ports to provisions. Scurvy is the clean reminder that not every maritime disease story is infectious. A long voyage could turn time into exposure. Preserved rations, weak provisioning, and the absence of fresh fruits and vegetables made deficiency biological. Lind matters here, but not as a simple lone-genius story. The deeper lesson is logistical. Knowledge, supply chains, discipline, storage, and naval administration had to line up before a nutritional mechanism became a reliable prevention system.",
      "source_ids": [
        "maritime-lind-scurvy-treatise",
        "maritime-carpenter-scurvy-vitamin-c",
        "maritime-james-lind-library-scurvy"
      ],
      "review_note": "The deficiency mechanism is high confidence; voyage-specific mortality rates need ship-level sources."
    },
    {
      "chapter_id": "flux",
      "script": "Flux and dysentery move from absence to contamination. Historical labels like flux are broad; they do not always map neatly onto modern pathogens. But the exposure system is clear enough to teach: water storage, waste disposal, dirty hands, shared utensils, spoiled food, heat, crowding, and limited privacy. Below deck, the boundary between ordinary ship operation and enteric exposure could be thin. The map should make that feel concrete. Disease risk was not only outside the ship, waiting at the next port. It could be assembled inside the vessel by water, waste, food, and confinement.",
      "source_ids": [
        "shigella-cdc",
        "cdc-drinking-water",
        "curtin-epidemiology-slave-trade",
        "cholera-who",
        "noro-cdc"
      ],
      "review_note": "Flux/dysentery are not one diagnosis; pathogen-specific claims require source-backed cases."
    },
    {
      "chapter_id": "typhoid",
      "script": "Typhoid narrows the food-water lesson. Here the issue is fecal-oral infrastructure: carriers, contaminated hands, drinking water, storage, food handling, utensils, and the practical problem of keeping waste away from mouths in a crowded system. The U.S. public-health imagery used in the exhibit is not a claim that typhoid belongs only to ships. It is a way to show the mechanism clearly. On ships, the same basic logic could become maritime: provisions, handling, water, and sanitation turned routine labor into a transmission pathway.",
      "source_ids": [
        "typhoid-cdc-yellowbook",
        "typhoid-who",
        "cdc-drinking-water"
      ],
      "review_note": "The biomedical mechanism is strong; historical fever labels aboard ships can be nonspecific."
    },
    {
      "chapter_id": "ship_fever",
      "script": "The next station is crowding. Ship fever is the phrase that makes the migrant ship and the quarantine station part of the same exposure system. In many nineteenth-century contexts the label points toward epidemic typhus: body lice, clothing, hygiene, cold, crowding, and exhaustion. But the phrase is historical, not a lab result, so the caution has to stay audible. What matters for the exhibit is the architecture: steerage, berths, delayed landing, dirty clothes, inspection, detention, and places like Grosse Ile where shipboard disease entered port-health infrastructure.",
      "source_ids": [
        "maritime-parks-canada-grosse-ile",
        "epidemic-typhus-cdc",
        "typhus-cdc-clinical",
        "maritime-nps-ellis-doctors"
      ],
      "review_note": "Ship fever often points toward typhus in this setting, but historical fever terminology is not always pathogen-specific."
    },
    {
      "chapter_id": "smallpox",
      "script": "Smallpox shifts the crowding section from lice and clothing toward susceptibility, contact, bedding, and isolation. The exhibit is not trying to solve the deep origin of variola virus here. That belongs to a different evidentiary problem. The maritime question is more practical: how did a human-only pathogen move through ships, passengers, linens, port inspection, isolation hulks, vaccination, and quarantine systems? Smallpox is useful because it shows the ship as a contact environment and the port as a sorting environment.",
      "source_ids": [
        "smallpox-cdc",
        "smallpox-who",
        "smallpox-origin-babkin",
        "who-smallpox-eradication"
      ],
      "review_note": "Transmission and quarantine claims are stronger here than retrospective origin claims."
    },
    {
      "chapter_id": "measles",
      "script": "Measles closes the crowding station by making air and susceptibility visible. A confined vessel is not automatically an outbreak, but respiratory transmission changes what close quarters mean. Duration, ventilation, immune history, passenger turnover, and shared indoor air all matter. This is also why modern closed-vessel examples can help without being projected backward too aggressively. They remind us that the ship is not just transportation. It is an indoor environment moving through administrative and ecological systems.",
      "source_ids": [
        "measles-who",
        "measles-science",
        "measles-lancet",
        "maritime-cdc-cruise-covid-2020"
      ],
      "review_note": "Do not turn this into a full measles history; it is here to teach respiratory crowding."
    },
    {
      "chapter_id": "wounds_sepsis",
      "script": "The final station group begins with wounds and sepsis because maritime disease ecology was also made by violence and labor. Splinters, blades, burns, falls, punishment, battle, dental injury, dirty dressings, delayed care, and shared bedding could turn trauma into infection. Sepsis is a modern clinical category, so we should not pretend every historical fever after injury was diagnosed that way. But the mechanism is real: injury plus microbes plus constrained care. On ships, wounds were never only surgical events. They were social and environmental events.",
      "source_ids": [
        "maritime-rediker-between-devil",
        "cdc-sepsis-about"
      ],
      "review_note": "Sepsis is a modern clinical framing; historical sources often describe wounds, fever, gangrene, or death rather than sepsis."
    },
    {
      "chapter_id": "middle_passage",
      "script": "The Middle Passage has to be handled with discipline. It is not a generic disease-spread story, and it is not a place to invent cause-specific proportions. The stronger claim is more devastating: forced transport made mortality through a whole coercive ecology. Crowding, heat, dehydration, malnutrition, dysentery, smallpox, measles, nonspecific fever, violence, despair, and the commercial logic of captivity were not separable background details. SlaveVoyages can support voyage-level mortality analysis, but exact disease attribution is much thinner. So the narration should keep the evidence limit visible while still naming the human burden plainly.",
      "source_ids": [
        "slavevoyages-methodology",
        "eltis-richardson-atlas-transatlantic-slave-trade",
        "curtin-epidemiology-slave-trade"
      ],
      "review_note": "Total mortality and voyage conditions are stronger than precise cause-specific disease proportions."
    },
    {
      "chapter_id": "pirate_ports",
      "script": "The exhibit ends with pirate ports, not because pirates are the main cause of maritime disease, but because the pirate network makes infrastructure visible in one frame. Nassau, Port Royal, Tortuga, Cape Fear, and other Atlantic nodes connected repair, recruitment, stolen goods, provisioning, water, alcohol, wounds, sex, insects, rumor, and naval suppression. Quarantine also belongs here: bills of health, lazarettos, guards, cargo controls, sanitary bans, and waiting periods. The point is not pirate exceptionalism. The point is that ports were machines for organizing movement, risk, profit, fear, and regulation.",
      "source_ids": [
        "maritime-rediker-between-devil",
        "maritime-rediker-villains",
        "maritime-booker-quarantine-2007",
        "maritime-tognotti-quarantine-2013",
        "maritime-delange-algiers-sanitary-ban-1818",
        "maritime-ini-quarantine-geographies-2023"
      ],
      "review_note": "Pirate ports are a network and exposure model, not documented disease-origin points."
    },
    {
      "chapter_id": "close",
      "script": "Read in exhibit order, the map moves from vectors to provisions, from crowding to coercion, and finally to ports as infrastructure. The sea did not merely connect outbreaks. It made disease ecological, political, logistical, and visible in sources. The full cited exhibit is linked below. The map is not the answer. It is the reading surface.",
      "source_ids": [
        "yellow-history",
        "maritime-lind-scurvy-treatise",
        "maritime-parks-canada-grosse-ile",
        "slavevoyages-methodology",
        "maritime-rediker-between-devil"
      ],
      "review_note": "Closing synthesis should remain ecological and political rather than monocausal."
    }
  ],
  "youtube_description_draft": "Ships did not just carry disease across the sea. They created disease ecologies: vector-friendly ports, contaminated water, spoiled provisions, crowded berths, quarantine islands, naval wounds, coerced movement, pirate-port infrastructure, and public-health conflict. This guided tour follows the Maritime Disease Ecology Atlas in exhibit order. Full interactive exhibit and source credits: /atlases/maritime/",
  "chapter_markers": [
    {
      "time": "0:00",
      "label": "A ship was a moving disease ecology"
    },
    {
      "time": "0:45",
      "label": "Yellow fever: warm port ecology"
    },
    {
      "time": "1:40",
      "label": "Malaria: movement plus local mosquito ecology"
    },
    {
      "time": "2:30",
      "label": "Scurvy: diet, time, and naval logistics"
    },
    {
      "time": "3:25",
      "label": "Flux and dysentery: water, waste, and broad historical labels"
    },
    {
      "time": "4:20",
      "label": "Typhoid: provisions as fecal-oral infrastructure"
    },
    {
      "time": "5:15",
      "label": "Ship fever: crowding, clothing, lice, and quarantine"
    },
    {
      "time": "6:20",
      "label": "Smallpox: bedding, susceptibility, and maritime isolation"
    },
    {
      "time": "7:15",
      "label": "Measles: air, susceptibility, and closed-vessel comparison"
    },
    {
      "time": "8:05",
      "label": "Wounds and sepsis: violence made biological"
    },
    {
      "time": "9:00",
      "label": "Middle Passage: forced movement as disease ecology"
    },
    {
      "time": "10:15",
      "label": "Pirate ports: infrastructure at the end of the exhibit line"
    },
    {
      "time": "11:20",
      "label": "Movement became ecology, policy, and memory"
    }
  ],
  "source_policy": [
    "Narration should use the exhibit citations as its evidence base.",
    "The YouTube script should follow the same station order as the public exhibit.",
    "No precise mortality or route claim should be added in the video unless already supported in the exhibit data.",
    "Uncertain retrospective diagnosis should remain visibly cautious in narration.",
    "Credits live in the exhibit; the video description should link to the exhibit for full source and image metadata."
  ],
  "deferred_or_excluded": [
    {
      "item": "Barbary captivity and plague",
      "reason": "Narrowed. The exhibit includes the 1817-1818 Algiers plague and American sanitary-ban case, but excludes unsupported claims that plague determined Barbary captivity outcomes."
    },
    {
      "item": "Convict ships and prison hulks",
      "reason": "Excluded from this first YouTube cut because the exhibit data defers a separate source pass."
    },
    {
      "item": "Exact disease proportions during the Middle Passage",
      "reason": "Excluded because documented total mortality and voyage conditions are stronger than precise cause-specific disease attribution."
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
