window.MARITIME_YOUTUBE_VIDEO_PLAN = {
  "schema_version": "1.0.0",
  "generated_at": "2026-05-28",
  "title": "Why Pirate Ships Were Floating Disease Worlds",
  "subtitle": "A chaptered YouTube adaptation of the Maritime Disease Ecology Atlas",
  "canonical_exhibit_path": "/atlases/maritime/",
  "runtime_target_seconds": 690,
  "capture_entrypoint": "index.html?youtube=1&tour=1&pace=2.3",
  "voice_plan": {
    "final_voice": "Devin",
    "scratch_voice": "scratch timing only. Final cut waits for Devin voiceover.",
    "delivery": "High-retention but source-cautious: visceral imagery, clean chapter turns, no fake precision.",
    "sound": "Optional low atmosphere only. No pitched tones, music stingers, or literal pirate sound effects."
  },
  "playback": {
    "default_query": "?youtube=1&tour=1&pace=2.3",
    "scenario_order": [
      "scurvy",
      "flux",
      "typhoid",
      "ship_fever",
      "malaria",
      "yellow_fever",
      "pirate_network",
      "middle_passage",
      "smallpox",
      "measles",
      "wounds_sepsis"
    ],
    "capture_notes": [
      "Use the full-tour URL for broad map capture, then use shot-level scenario URLs for the chaptered edit.",
      "The YouTube structure is thematic: incubator, tropical vectors, forced routes, violence, verdict.",
      "Keep atmosphere off for narration-first edits unless a quiet bed helps pacing.",
      "The public exhibit remains the source and credits surface; link back to it in the YouTube description."
    ],
    "default_pace": 2.3,
    "target_runtime_seconds": 690,
    "cadence_notes": [
      "The revised YouTube cut targets 11:30 with a 45-second hook and larger thematic chapters.",
      "Use chapter cards at 0:45, 3:00, 6:00, and 8:30 to reset attention.",
      "Let the map breathe inside each chapter rather than advancing every disease as a separate chapter.",
      "Hold source caveats long enough for viewers to absorb them.",
      "Shot replacement captures should keep pace=2.3 unless a single section needs retiming."
    ]
  },
  "chapters": [
    {
      "id": "hook",
      "title": "Hook: the ship as a sealed disease world",
      "start_time": "0:00",
      "duration_seconds": 45,
      "scenarios": [
        "pirate_network"
      ],
      "module_ids": [
        "pirate_ports_caribbean_network",
        "scurvy_long_voyage_navy"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "maritime-rediker-villains",
        "maritime-lind-scurvy-treatise"
      ],
      "narration_job": "Open with pirate-ship imagery, then define the ship as a confined maritime disease environment while keeping epidemic causation broader than the vessel alone.",
      "uncertainty_note": "High-retention framing; omit pirate mortality comparisons unless a source-backed denominator is added."
    },
    {
      "id": "floating_incubator",
      "title": "Chapter 1: The Floating Incubator",
      "start_time": "0:45",
      "duration_seconds": 135,
      "scenarios": [
        "scurvy",
        "flux",
        "typhoid",
        "ship_fever"
      ],
      "module_ids": [
        "scurvy_long_voyage_navy",
        "flux_dysentery_shipboard_water_waste",
        "typhoid_provisions_food_water",
        "ship_fever_grosse_ile_1847"
      ],
      "source_ids": [
        "maritime-lind-scurvy-treatise",
        "maritime-carpenter-scurvy-vitamin-c",
        "maritime-james-lind-library-scurvy",
        "shigella-cdc",
        "cdc-drinking-water",
        "typhoid-cdc-yellowbook",
        "typhoid-who",
        "epidemic-typhus-cdc",
        "typhus-cdc-clinical",
        "maritime-parks-canada-grosse-ile"
      ],
      "narration_job": "Use scurvy, flux/dysentery, typhoid, and ship fever to make daily shipboard exposure claustrophobic and legible.",
      "uncertainty_note": "Scurvy and modern mechanisms are high confidence; historical labels such as flux and ship fever remain broad."
    },
    {
      "id": "tropical_death_zones",
      "title": "Chapter 2: The Tropical Death Zones",
      "start_time": "3:00",
      "duration_seconds": 180,
      "scenarios": [
        "malaria",
        "yellow_fever",
        "pirate_network"
      ],
      "module_ids": [
        "yellow_fever_atlantic_ports_1793",
        "pirate_ports_caribbean_network"
      ],
      "source_ids": [
        "malaria-who",
        "malaria-carter",
        "malaria-mordecai",
        "yellow-history",
        "yellow-fever-who",
        "cdc-yellow-fever-spread",
        "nlm-yellow-fever-primary",
        "maritime-rediker-between-devil",
        "maritime-rediker-villains"
      ],
      "narration_job": "Move through bad-air interpretation, vector ecology, and pirate ports as exposure infrastructure.",
      "uncertainty_note": "Vector mechanisms are strong; single-ship yellow-fever import claims and pirate-port origin claims need case-level sources."
    },
    {
      "id": "cargo_of_plagues",
      "title": "Chapter 3: The Cargo of Plagues",
      "start_time": "6:00",
      "duration_seconds": 150,
      "scenarios": [
        "middle_passage",
        "smallpox",
        "measles"
      ],
      "module_ids": [
        "middle_passage_forced_transport",
        "smallpox_maritime_isolation_hulks"
      ],
      "source_ids": [
        "slavevoyages-methodology",
        "eltis-richardson-atlas-transatlantic-slave-trade",
        "curtin-epidemiology-slave-trade",
        "smallpox-cdc",
        "smallpox-who",
        "who-smallpox-eradication",
        "measles-who",
        "measles-science",
        "measles-lancet"
      ],
      "narration_job": "Handle forced transport, smallpox, and measles with a stark visual tone and careful causal language.",
      "uncertainty_note": "Total mortality and voyage conditions are stronger than precise cause-specific disease attribution; disease should never replace colonial violence as the central structure."
    },
    {
      "id": "iron_and_rot",
      "title": "Chapter 4: The Sound of Iron and Rot",
      "start_time": "8:30",
      "duration_seconds": 120,
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
      "narration_job": "Use wounds, splinters, dirty tools, delayed care, and surgical limits to show how violence became biological.",
      "uncertainty_note": "Sepsis is a modern clinical framing; historical sources often describe wounds, fever, gangrene, amputation, and death instead of modern diagnostic labels."
    },
    {
      "id": "modern_verdict",
      "title": "The Modern Verdict and Outro",
      "start_time": "10:30",
      "duration_seconds": 60,
      "scenarios": [
        "pirate_network",
        "yellow_fever",
        "scurvy",
        "ship_fever",
        "middle_passage",
        "wounds_sepsis"
      ],
      "module_ids": [
        "pirate_ports_caribbean_network",
        "yellow_fever_atlantic_ports_1793",
        "scurvy_long_voyage_navy",
        "ship_fever_grosse_ile_1847",
        "middle_passage_forced_transport",
        "wounds_sepsis_shipboard_trauma"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "yellow-history",
        "maritime-lind-scurvy-treatise",
        "maritime-parks-canada-grosse-ile",
        "slavevoyages-methodology",
        "cdc-sepsis-about"
      ],
      "narration_job": "Pull back to the full map and state the central lesson: routes, bodies, ships, ports, labor, coercion, and policy shaped maritime disease.",
      "uncertainty_note": "Closing synthesis should stay ecological and political rather than monocausal."
    }
  ],
  "shots": [
    {
      "id": "s01_hook",
      "chapter_id": "hook",
      "duration_seconds": 45,
      "capture_url": "index.html?youtube=1&scenario=pirate_network&pace=2.3",
      "scenario_id": "pirate_network",
      "visual_beat": "Begin with pirate-port map energy, then cut quickly to the ship as a sealed disease environment. Optional on-camera prop: hardtack, rusted iron, or rope.",
      "narration_beat": "A pirate ship opens as a confined disease world, stripped of romance.",
      "edit_notes": "Use fast map zooms and one strong hook image. Keep unsupported mortality percentages out of thumbnail and narration.",
      "module_ids": [
        "pirate_ports_caribbean_network",
        "scurvy_long_voyage_navy"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "maritime-rediker-villains",
        "maritime-lind-scurvy-treatise"
      ]
    },
    {
      "id": "s02_floating_incubator",
      "chapter_id": "floating_incubator",
      "duration_seconds": 135,
      "capture_url": "index.html?youtube=1&scenario=scurvy&pace=2.3",
      "scenario_id": "scurvy",
      "visual_beat": "Use a black chapter card, then scurvy at open sea, water/waste overlays for flux and typhoid, and darker lower-deck framing for ship fever.",
      "narration_beat": "Scurvy, contaminated water, typhoid, flux, and typhus make the ship itself the first disease mechanism.",
      "edit_notes": "Retake individual scenarios for scurvy, flux, typhoid, and ship fever as needed. Keep the section claustrophobic and readable.",
      "module_ids": [
        "scurvy_long_voyage_navy",
        "flux_dysentery_shipboard_water_waste",
        "typhoid_provisions_food_water",
        "ship_fever_grosse_ile_1847"
      ],
      "source_ids": [
        "maritime-lind-scurvy-treatise",
        "maritime-carpenter-scurvy-vitamin-c",
        "shigella-cdc",
        "cdc-drinking-water",
        "typhoid-cdc-yellowbook",
        "epidemic-typhus-cdc",
        "maritime-parks-canada-grosse-ile"
      ]
    },
    {
      "id": "s03_tropical_death_zones",
      "chapter_id": "tropical_death_zones",
      "duration_seconds": 180,
      "capture_url": "index.html?youtube=1&scenario=malaria&pace=2.3",
      "scenario_id": "malaria",
      "visual_beat": "Shift to humid map color, mosquito cues, yellow-fever pulses, and a final zoom to Nassau or Port Royal as infrastructure.",
      "narration_beat": "Malaria and yellow fever show ships carrying people into vector ecologies; pirate ports made exposure durable.",
      "edit_notes": "Use mosquito and thunder audio only as low supporting texture. A single infected ship should appear only with a named case source.",
      "module_ids": [
        "yellow_fever_atlantic_ports_1793",
        "pirate_ports_caribbean_network"
      ],
      "source_ids": [
        "malaria-who",
        "malaria-carter",
        "yellow-history",
        "yellow-fever-who",
        "cdc-yellow-fever-spread",
        "maritime-rediker-between-devil",
        "maritime-rediker-villains"
      ]
    },
    {
      "id": "s04_cargo_of_plagues",
      "chapter_id": "cargo_of_plagues",
      "duration_seconds": 150,
      "capture_url": "index.html?youtube=1&scenario=middle_passage&pace=2.3",
      "scenario_id": "middle_passage",
      "visual_beat": "Use stark black title card, slow West Africa to Americas pan, then sober smallpox and measles overlays without sensational gore.",
      "narration_beat": "Forced movement, smallpox, and measles are framed through captivity, susceptibility, close contact, and evidence limits.",
      "edit_notes": "Keep this chapter visually restrained. Keep Middle Passage mortality away from clean cause-specific disease proportions.",
      "module_ids": [
        "middle_passage_forced_transport",
        "smallpox_maritime_isolation_hulks"
      ],
      "source_ids": [
        "slavevoyages-methodology",
        "eltis-richardson-atlas-transatlantic-slave-trade",
        "curtin-epidemiology-slave-trade",
        "smallpox-cdc",
        "smallpox-who",
        "measles-who",
        "measles-science"
      ]
    },
    {
      "id": "s05_iron_and_rot",
      "chapter_id": "iron_and_rot",
      "duration_seconds": 120,
      "capture_url": "index.html?youtube=1&scenario=wounds_sepsis&pace=2.3",
      "scenario_id": "wounds_sepsis",
      "visual_beat": "Use crimson chapter card, naval-battle splinter imagery, surgical tools, and restrained wound/sepsis map icons.",
      "narration_beat": "Combat injury, dirty environments, and surgical limits connect violence to infection risk.",
      "edit_notes": "Keep gore implied rather than explicit. Historical terminology should stay careful around sepsis.",
      "module_ids": [
        "wounds_sepsis_shipboard_trauma"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "cdc-sepsis-about"
      ]
    },
    {
      "id": "s06_modern_verdict",
      "chapter_id": "modern_verdict",
      "duration_seconds": 60,
      "capture_url": "index.html?youtube=1&scenario=pirate_network&pace=2.3",
      "scenario_id": "pirate_network",
      "visual_beat": "Pull back to the full maritime network. Return to talking head for final sentence and optional end-screen bridge.",
      "narration_beat": "The final claim is systemic: ships, ports, routes, labor, violence, and public-health failure made maritime disease ecology.",
      "edit_notes": "Use the end-screen bridge only after Devin records a specific next-video CTA.",
      "module_ids": [
        "pirate_ports_caribbean_network",
        "yellow_fever_atlantic_ports_1793",
        "scurvy_long_voyage_navy",
        "ship_fever_grosse_ile_1847",
        "middle_passage_forced_transport",
        "wounds_sepsis_shipboard_trauma"
      ],
      "source_ids": [
        "maritime-rediker-between-devil",
        "yellow-history",
        "maritime-lind-scurvy-treatise",
        "maritime-parks-canada-grosse-ile",
        "slavevoyages-methodology",
        "cdc-sepsis-about"
      ]
    }
  ],
  "narration_script": [
    {
      "chapter_id": "hook",
      "script": "Step onto a Caribbean pirate ship around 1720 and the romance dies fast. The first facts are damp wood, stale water, hard food, sweat, lice, wounds, and fear. A wooden hull could turn ordinary exposure into a closed experiment on the human body. This video uses the map to track that experiment through the hull, the tropics, forced Atlantic routes, combat wounds, surgery, and the public-health lesson the sea kept teaching.",
      "source_ids": [
        "maritime-rediker-between-devil",
        "maritime-rediker-villains",
        "maritime-lind-scurvy-treatise"
      ],
      "review_note": "High-retention framing; omit pirate mortality comparisons unless a source-backed denominator is added."
    },
    {
      "chapter_id": "floating_incubator",
      "script": "Start with the vessel. It held rot, rationing, crowding, and time in one confined space. Scurvy comes first because it shows how shipboard disease extended beyond infection. After weeks at sea, fresh food disappeared. Vitamin C disappeared with it. The body failed: swollen gums, loose teeth, bruising, reopened wounds, exhaustion, collapse. The ship's stores were writing pathology into flesh. Water and waste came next. Casks could turn foul. Food handling was dirty. Hands, cups, utensils, bedding, decks, vomit, feces, bilge water, heat, and dehydration shared the same small world. Historical labels like flux or dysentery were broad. The exposure record still matters: contaminated water, contaminated food, and bodies confined together. Typhoid narrows the food-water problem to fecal-oral transmission through food, hands, carriers, and stored water. Ship fever adds crowding, clothing, and lice. In many nineteenth-century migrant settings, that phrase points toward epidemic typhus, with body lice thriving in filthy bedding and unwashed clothes. By the time a vessel reached quarantine, the outbreak had already been built below deck.",
      "source_ids": [
        "maritime-lind-scurvy-treatise",
        "maritime-carpenter-scurvy-vitamin-c",
        "maritime-james-lind-library-scurvy",
        "shigella-cdc",
        "cdc-drinking-water",
        "typhoid-cdc-yellowbook",
        "typhoid-who",
        "epidemic-typhus-cdc",
        "typhus-cdc-clinical",
        "maritime-parks-canada-grosse-ile"
      ],
      "review_note": "Scurvy and modern mechanisms are high confidence; historical labels such as flux and ship fever remain broad."
    },
    {
      "chapter_id": "tropical_death_zones",
      "script": "After an ocean crossing, the tropics added a different danger. Sailors called malaria bad air because the disease seemed tied to swamps, rivers, and wet coastal settlements. The name preserved the old explanation. The mechanism was mosquito ecology. Malaria needed Anopheles mosquitoes, standing water, climate, human infection, immunity, and repeated exposure. A route could bring people into danger. Local ecology decided whether transmission could continue. Yellow fever made port ecology sharper. The disease could turn eyes and skin yellow, bring hemorrhage, and produce the black vomit that terrified physicians, officials, sailors, and families in Atlantic ports. Aedes mosquitoes supplied the vector in warm places where water storage, dense settlement, and ship traffic gave the virus chances to move. Ships carried risk. Ports made that risk biologically durable. Pirate havens sharpen the picture. Nassau, Port Royal, Tortuga, and other Atlantic nodes were repair yards, markets, taverns, recruitment centers, hiding places, and medical improvisation zones. Crews, captives, merchants, stolen goods, insects, food, alcohol, wounds, sex, rumor, and naval pressure all crossed there. These ports were exposure infrastructure.",
      "source_ids": [
        "malaria-who",
        "malaria-carter",
        "malaria-mordecai",
        "yellow-history",
        "yellow-fever-who",
        "cdc-yellow-fever-spread",
        "nlm-yellow-fever-primary",
        "maritime-rediker-between-devil",
        "maritime-rediker-villains"
      ],
      "review_note": "Vector mechanisms are strong; single-ship yellow-fever import claims and pirate-port origin claims need case-level sources."
    },
    {
      "chapter_id": "cargo_of_plagues",
      "script": "Atlantic routes also carried disease through coercion. The Middle Passage needs sober language and source discipline. Enslaved Africans were forced into heat, crowding, dehydration, terror, violence, malnutrition, and poor ventilation. Dysentery, smallpox, measles, nonspecific fever, dehydration, starvation, and violence could overlap, and the records rarely assign every death to a clean modern category. Captivity organized exposure. Smallpox gives the clearest viral example. Variola virus spread through close contact, respiratory exposure, and contaminated materials such as clothing and bedding. On a crowded vessel, isolation was hard, delay was dangerous, and decisions about landing, cleaning, and quarantine carried economic pressure. Measles belongs beside it because shared air and susceptibility matter. In nonimmune groups, measles could move fast and cause severe pneumonia, diarrhea, and death. Ships carried immune histories, colonial violence, forced movement, and conditions that could turn infection into catastrophe.",
      "source_ids": [
        "slavevoyages-methodology",
        "eltis-richardson-atlas-transatlantic-slave-trade",
        "curtin-epidemiology-slave-trade",
        "smallpox-cdc",
        "smallpox-who",
        "who-smallpox-eradication",
        "measles-who",
        "measles-science",
        "measles-lancet"
      ],
      "review_note": "Total mortality and voyage conditions are stronger than precise cause-specific disease attribution; disease should never replace colonial violence as the central structure."
    },
    {
      "chapter_id": "iron_and_rot",
      "script": "A sailor who escaped fever, flux, scurvy, and smallpox still lived inside a violent machine. A cannonball could miss a body and still maim it. In a wooden hull, impact could send splinters through skin, muscle, and bone. Knives, falls, burns, crushed limbs, dental disease, amputations, dirty bedding, salt water, and delayed care all opened paths for infection. Sepsis is a modern clinical word, so the historical language needs care. The sources often give wounds, fever, gangrene, amputation, and death instead of a modern diagnosis. Surgery before anesthesia and antisepsis meant speed, force, restraint, and luck. Surgeons could be skilled, but they worked in terrible conditions, with limited pain control and no germ theory. Amputation could save a life when gangrene threatened, while tools, dressings, hands, and the ship environment carried their own dangers. The sound of iron and rot belongs to the point where violence became biology.",
      "source_ids": [
        "maritime-rediker-between-devil",
        "cdc-sepsis-about"
      ],
      "review_note": "Sepsis is a modern clinical framing; historical sources often describe wounds, fever, gangrene, amputation, and death instead of modern diagnostic labels."
    },
    {
      "chapter_id": "modern_verdict",
      "script": "Pull back on the map. Maritime disease was a system. Food, water, air, wounds, insects, crowding, coercion, and ports all shaped the risk. Mosquitoes made warm harbors dangerous. Crowding made respiratory and louse-borne disease worse. Coercion left some people with the least protection. Ports decided whether risk stopped, waited, or spread. The romance of the Age of Sail usually starts with freedom, treasure, and cannon smoke. The medical map gives a harsher account: ships made their own epidemiology, and the Atlantic taught public health the cost of ignoring the world inside the hull.",
      "source_ids": [
        "maritime-rediker-between-devil",
        "yellow-history",
        "maritime-lind-scurvy-treatise",
        "maritime-parks-canada-grosse-ile",
        "slavevoyages-methodology",
        "cdc-sepsis-about"
      ],
      "review_note": "Closing synthesis should stay ecological and political rather than monocausal."
    }
  ],
  "youtube_description_draft": "A chaptered guided tour of the Maritime Disease Ecology Atlas from The Edge of Epidemiology. The video follows the ship as a floating incubator, tropical vector ecology, forced Atlantic routes, wounds and sepsis, and the public-health lesson hidden inside the age of sail. Full interactive exhibit and source credits: /atlases/maritime/",
  "chapter_markers": [
    {
      "time": "0:00",
      "label": "Hook: the ship as a sealed disease world"
    },
    {
      "time": "0:45",
      "label": "Chapter 1: The Floating Incubator"
    },
    {
      "time": "3:00",
      "label": "Chapter 2: The Tropical Death Zones"
    },
    {
      "time": "6:00",
      "label": "Chapter 3: The Cargo of Plagues"
    },
    {
      "time": "8:30",
      "label": "Chapter 4: The Sound of Iron and Rot"
    },
    {
      "time": "10:30",
      "label": "The Modern Verdict and Outro"
    }
  ],
  "source_policy": [
    "Narration should use the exhibit citations as its evidence base.",
    "The YouTube script may reorder disease scenarios into thematic chapters; new mortality, origin, or route claims still need source support.",
    "Precise mortality, route, or origin claims require support in the exhibit data.",
    "Uncertain retrospective diagnosis should remain audible in narration.",
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
  ],
  "packaging_options": [
    {
      "title": "The Invisible Enemy That Actually Killed Real Pirates",
      "thumbnail_text": "NO CURE",
      "note": "Use only with source-safe thumbnail language. Current exhibit data lacks a universal pirate mortality percentage."
    },
    {
      "title": "Why a 1700s Pirate Ship Could Kill You Before Battle",
      "thumbnail_text": "NO ESCAPE",
      "note": "Best fit for the revised hook and chapter structure. No unsupported mortality precision required."
    },
    {
      "title": "Mapping Disease in the Age of Sail",
      "thumbnail_text": "THE MAP",
      "note": "Best map-centric option if the custom atlas remains the visual selling point."
    }
  ]
};
