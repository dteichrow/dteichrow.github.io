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
    "delivery": "Devin voice: blunt, concrete, history-haunted, and anchored in the High Seas maritime essay rather than generic exhibit copy.",
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
      "script": "Life aboard a ship before modern medicine was a hellish experience in an epidemiologically precise way. The ship was a sealed workplace with bad air, bad water, hard food, vermin, violence, rank, punishment, and no easy exit. The old romance of sail is the wrong starting point. The useful starting point is the body trapped inside the hull. Once a ship left port, public health stopped being a city department and became whatever could fit inside the vessel: ventilation, waste, diet, water, wounds, insects, discipline, and time. This video follows the exhibit order: warm ports and vectors first, then provisions and water, then crowding, then violence, forced movement, and pirate-port networks. The danger was not the ocean as scenery. It was the ship as an environment, a floating disease incubator built by logistics and hierarchy.",
      "source_ids": [
        "maritime-rediker-between-devil",
        "yellow-history"
      ],
      "review_note": "This is interpretive synthesis; it should not claim that ships alone caused epidemics."
    },
    {
      "chapter_id": "yellow_fever",
      "script": "Yellow fever opens the map because Atlantic ports were not passive dots at the end of a voyage. They were hot, crowded, wet places where ships, stored water, mosquitoes, refugees, sailors, laborers, and nonimmune bodies met. A vessel could connect Saint-Domingue, the Caribbean, West Africa, Philadelphia, and other ports, but a route did not automatically become an epidemic. The dangerous moment came when maritime movement met local mosquito ecology. Yellow fever needed Aedes mosquitoes, heat, water, and enough human infection for the mosquito-human cycle to keep turning. So the map has to stay disciplined. Ship traffic carried risk across the Atlantic. Port ecology decided whether that risk had a place to multiply.",
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
      "script": "Malaria is the next warning against cargo thinking. Sailors, soldiers, traders, and captives moved through tropical and subtropical ports, river mouths, naval stations, plantations, and wet coastal settlements. But malaria did not behave like a crate unloaded at the dock. It depended on Anopheles mosquitoes, repeated exposure, climate, standing water, land use, immunity, and season. A route on the map can show movement, but it cannot by itself show transmission. Older ship records often blurred fevers that we would now separate. That blur is evidence too. It tells us what observers could see before they had parasites, vectors, or lab diagnosis. The point is to separate where bodies moved from where mosquitoes made infection possible.",
      "source_ids": [
        "malaria-who",
        "malaria-carter",
        "malaria-mordecai"
      ],
      "review_note": "This is route ecology, not a clean origin or single-voyage claim."
    },
    {
      "chapter_id": "scurvy",
      "script": "Scurvy moves the exhibit from port ecology to the stores. It is the clean correction to the idea that shipboard disease always meant infection. Scurvy was logistics eating the body. Salt meat, hardtack, dried peas, weak resupply, long time at sea, and no fresh produce could turn an ordinary voyage into a vitamin C experiment conducted on sailors who had no choice in the protocol. The symptoms were ugly: exhaustion, aching joints, swollen and bleeding gums, loose teeth, bruising, wounds that would not heal, collapse, death. This was not subtle disease. It was the body reporting a supply-chain failure. Lind is important, but the delay is the better lesson. Evidence existed before navies acted reliably. The bottleneck was institutional.",
      "source_ids": [
        "maritime-lind-scurvy-treatise",
        "maritime-carpenter-scurvy-vitamin-c",
        "maritime-james-lind-library-scurvy"
      ],
      "review_note": "The deficiency mechanism is high confidence; voyage-specific mortality rates need ship-level sources."
    },
    {
      "chapter_id": "flux",
      "script": "Flux and dysentery take us below deck, where any romantic view of early sailing should die quickly. Water casks went stale. Food rotted. Hands stayed dirty. Utensils passed from mouth to mouth. Sleeping spaces were cramped. Ventilation was poor. Heat, vomit, feces, bilge water, crude latrines, and vermin lived close together. This is the unglamorous infrastructure of maritime disease. It was not one dramatic exposure. It was repetition: another drink, another shared surface, another night in foul air, another day without clean water. Historical labels like flux were broad; they can cover bacterial and parasitic diarrheal disease rather than one neat diagnosis. But the exposure system is not mysterious. Put contaminated water, dirty food handling, crowding, and dehydration inside a hull, then keep people there. The ship becomes an enteric disease machine.",
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
      "script": "Typhoid narrows the food-and-water problem to fecal-oral transmission. That phrase sounds tidy until it is put back on a ship. Think about carriers handling food, contaminated hands, drinking water stored for long periods, shared utensils, bad waste management, and passengers or crew with little control over any of it. The public-health imagery in the exhibit explains the mechanism; it is not claiming typhoid belongs only at sea. On a vessel, the same sanitary failure became mobile. It could move from galley to berth, from cask to cup, from hand to meal, and from ship to inspection station. Provisions were not background supplies. They were part of the disease environment.",
      "source_ids": [
        "typhoid-cdc-yellowbook",
        "typhoid-who",
        "cdc-drinking-water"
      ],
      "review_note": "The biomedical mechanism is strong; historical fever labels aboard ships can be nonspecific."
    },
    {
      "chapter_id": "ship_fever",
      "script": "Ship fever brings us into crowding, clothing, bedding, and lice. The phrase comes from a less precise diagnostic world, but in many nineteenth-century migrant settings it points toward epidemic typhus: body lice, dirty clothing, filthy bedding, exhaustion, cold, hunger, and packed human bodies. The migrant ship and the quarantine station belong in the same frame. People arrived after exposures created below deck, then moved into inspection lines, hospitals, detention sheds, and quarantine landscapes like Grosse Ile. Quarantine was not only a rule at the edge of a port. It was buildings, guards, beds, laundry, delousing, records, suspicion, delay, and political conflict. Clean linens, bathing, shaving, ventilation, and separation were not cosmetic reforms. They were the physical technologies of survival.",
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
      "script": "Smallpox changes the problem from lice and filth to susceptibility, contact, bedding, clothing, and isolation. This section is not about solving the ancient origin of variola virus. The maritime question is cruder and more practical. What happens when a human-only pathogen enters a crowded vessel with susceptible people, shared linens, close contact, delayed landing, and limited medical options? The ship compressed decisions that were already hard on land. Who is isolated? Who is allowed to disembark? What is done with clothing, bedding, and cargo? Port authorities could isolate cases, clean clothing and bedding, quarantine ships, and later rely on vaccination. But shipboard control was always cramped by space, time, fear, and the economic pressure to land people and cargo.",
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
      "script": "Measles makes the air itself epidemiological. A susceptible passenger group could be burned through fast: sometimes before landfall, sometimes with enough force to matter after arrival. Not every ship became a measles outbreak, and the exhibit should not imply that. The narrower claim is that crowding changes exposure arithmetic. Duration, ventilation, immune history, passenger turnover, and shared air all matter. A ship is a route and an indoor setting that moves. That is the bridge to modern closed-vessel comparisons: useful as a comparison, dangerous if treated as the same historical object. The transmission logic is comparable. The worlds are different.",
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
      "script": "Ships were also violent machines. They were workplaces, prisons, battle platforms, punishment spaces, and floating hospitals with bad odds. Splinters, blades, burns, falls, broken bones, dental disease, amputations, dirty tools, salt water in bandages, contaminated bedding, and delayed care could turn injury into infection. Sepsis is a modern clinical word, so I do not want the narration pretending every historical wound fever was diagnosed that way. The sources often give us wounds, fever, gangrene, amputation, and death rather than a clean modern chart label. The safer claim is still severe enough: at sea, trauma happened inside a dirty, constrained, poorly supplied environment where the exit was often death, disability, or waiting.",
      "source_ids": [
        "maritime-rediker-between-devil",
        "cdc-sepsis-about"
      ],
      "review_note": "Sepsis is a modern clinical framing; historical sources often describe wounds, fever, gangrene, or death rather than sepsis."
    },
    {
      "chapter_id": "middle_passage",
      "script": "The Middle Passage is where the hierarchy of burden stops being a side note. Disease at sea did not fall evenly because people did not inhabit ships equally. Officers, common sailors, merchants, pirates, migrants, prisoners, and enslaved people occupied different worlds on the same water. In slave holds, crowding, heat, darkness, shackling, dehydration, malnutrition, dysentery, smallpox, measles, nonspecific fever, violence, terror, and despair were fused by commerce. This is why the module has to stay sober. Shipboard mortality here was not simply an infection story. It was captivity, market calculation, rationing, violence, and exposure operating together. SlaveVoyages can support voyage-level mortality analysis. It cannot supply clean cause-specific proportions where the records do not. That limit should stay audible. The defensible claim is already damning: forced transport turned the ship itself into an engine of mortality.",
      "source_ids": [
        "slavevoyages-methodology",
        "eltis-richardson-atlas-transatlantic-slave-trade",
        "curtin-epidemiology-slave-trade"
      ],
      "review_note": "Total mortality and voyage conditions are stronger than precise cause-specific disease proportions."
    },
    {
      "chapter_id": "pirate_ports",
      "script": "Pirate ports end the exhibit because pirates expose the rules of the maritime disease world. This is not comic relief, and it is not a claim that pirates invented some special disease ecology. The contrast is governance. Naval discipline, merchant incentives, pirate provisioning, captured surgeons, shared plunder, repair stops, and different rules could change who ate, who received care, and who was expendable. That does not make pirate ships clean. It makes them useful evidence that disease risk was organized by power, labor, supplies, and medical access. Nassau, Port Royal, Tortuga, Cape Fear, and other Atlantic nodes connected water, alcohol, wounds, sex, insects, stolen goods, recruitment, naval suppression, and rumor. Quarantine sits in that world too: bills of health, lazarettos, guards, cargo controls, sanitary bans, and waiting. Ports were the control system.",
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
      "script": "Taken in exhibit order, the map is less a travel story than an anatomy of exposure. Warm ports made vector risk possible. Provisions made deficiency and enteric disease possible. Crowding made fever, smallpox, and measles more dangerous. Violence made wounds biological. Coercion decided who suffered most. Pirate ports show how rules, power, provisioning, and medical access changed the burden. That is the maritime lesson I want this atlas to carry. The sea was not the causal agent. The route was not the whole explanation. Ships made their own epidemiology, and ports decided what that epidemiology could become.",
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
  "youtube_description_draft": "Life aboard a ship before modern medicine was brutal in an epidemiologically precise way. This guided tour follows the Maritime Disease Ecology Atlas in exhibit order: ports and vectors, provisions and water, crowding, violence, forced movement, and pirate-port infrastructure. Full interactive exhibit and source credits: /atlases/maritime/",
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
