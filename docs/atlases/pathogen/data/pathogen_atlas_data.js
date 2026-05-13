window.PATHOGEN_ATLAS_BASE_URL = "/";
window.PATHOGEN_ATLAS_DATA = {
  "entries": [
    {
      "atlas_scope": "Historical-to-modern transatlantic spread",
      "atlas_url": "atlas.html?pathogen=yellow-fever",
      "citation_count": 3,
      "citations": [
        {
          "claim_supported": "Historical African origin framing and Atlantic spread into the Caribbean, Philadelphia, Haiti, and Panama.",
          "id": "yellow-handbook",
          "note": "Core geography-first secondary source for the atlas narrative.",
          "short_citation": "Tuan JJ, Cox FEG, Bia FJ. Historical overview of global infectious diseases and geopolitics. In Routledge Handbook of Infectious Diseases: A Geographical Guide. 2025.",
          "url": "https://doi.org/10.4324/9781003531425"
        },
        {
          "claim_supported": "African endemic ecology, vector biology, and modern transmission framing.",
          "id": "yellow-review",
          "note": "Useful modern review of ecology and transmission.",
          "short_citation": "Douam F, Ploss A. Yellow Fever Virus: Knowledge Gaps Impeding the Fight Against an Old Foe. Trends Microbiol. 2018.",
          "url": "https://doi.org/10.1016/j.tim.2018.05.012"
        },
        {
          "claim_supported": "Port-city diffusion and the political consequences of yellow fever in the Atlantic world.",
          "id": "yellow-history",
          "note": "Historical context source rather than a modern epidemiologic review.",
          "short_citation": "Delaporte F. The history of yellow fever. MIT Press. 1991.",
          "url": "https://mitpress.mit.edu/9780262541114/the-history-of-yellow-fever/"
        }
      ],
      "default_variant_slug": "",
      "framing_traps": [
        "Do not write yellow fever as a purely human-travel story; mosquito ecology is central.",
        "Do not flatten African endemicity and New World epidemic history into one undifferentiated narrative."
      ],
      "linked_blog_posts": [
        {
          "published_at": "2026-04-04",
          "relation": "deep_dive",
          "title": "The First American Epidemic: How Yellow Fever Exposed the Fault Lines of the Early Republic",
          "url": "https://theedgeofepidemiology.substack.com/p/the-first-american-epidemic-how-yellow"
        },
        {
          "published_at": "2026-03-07",
          "relation": "historical_essay",
          "title": "How Mosquitos Killed Napoleon's North American Empire Dream",
          "url": "https://theedgeofepidemiology.substack.com/p/how-mosquitos-killed-napoleons-north"
        },
        {
          "published_at": "2026-04-11",
          "relation": "adjacent_context",
          "title": "Big Epidemiology: Disease at the Scale of Civilization",
          "url": "https://theedgeofepidemiology.substack.com/p/big-epidemiology-disease-at-the-scale"
        }
      ],
      "linked_reference_slug": "yellow-fever",
      "linked_story_ids": [],
      "modern_echoes": [
        "Vaccination policy and proof-of-entry rules still make yellow fever one of the few infections where geography directly determines travel documentation.",
        "Outbreak coverage still turns on vector control, urban spillover risk, and whether sylvatic transmission is seeding cities."
      ],
      "name": "Yellow fever",
      "origin_claim": {
        "confidence": "strong",
        "coordinates": [
          -1.5,
          6.2
        ],
        "date_or_era": "Pre-colonial circulation documented before seventeenth-century Atlantic spread",
        "label": "West and Central African transmission zone",
        "narrative": "The best-supported origin frame places endemic yellow fever ecology in tropical Africa before repeated Atlantic export into Caribbean and American port settings."
      },
      "pathogen_type": "Virus",
      "reference_name": "Yellow fever",
      "reference_url": "reference/yellow-fever.html",
      "reference_web_path": "reference/yellow-fever.html",
      "related_stories": [],
      "route_count": 3,
      "slug": "yellow-fever",
      "spread_routes": [
        {
          "citation_ids": [
            "yellow-handbook",
            "yellow-review",
            "yellow-history"
          ],
          "confidence": "strong",
          "date_or_era": "Seventeenth century Atlantic shipping",
          "from_coordinates": [
            -1.5,
            6.2
          ],
          "from_label": "West African coast",
          "narrative": "Atlantic slave shipping moved infected people, mosquito habitat, and water-storage ecologies into Caribbean port cities.",
          "route_id": "yellow-west-africa-caribbean",
          "route_type": "maritime",
          "to_coordinates": [
            -72.3,
            18.9
          ],
          "to_label": "Caribbean ports"
        },
        {
          "citation_ids": [
            "yellow-handbook",
            "yellow-history"
          ],
          "confidence": "strong",
          "date_or_era": "1793 port-city epidemic",
          "from_coordinates": [
            -72.3,
            18.9
          ],
          "from_label": "Caribbean basin",
          "narrative": "Port trade and seasonal mosquito ecology helped yellow fever reach Philadelphia, where it reshaped the political geography of the early United States.",
          "route_id": "yellow-caribbean-philadelphia",
          "route_type": "port_to_port",
          "to_coordinates": [
            -75.1652,
            39.9526
          ],
          "to_label": "Philadelphia"
        },
        {
          "citation_ids": [
            "yellow-handbook",
            "yellow-review"
          ],
          "confidence": "moderate",
          "date_or_era": "Nineteenth to early twentieth century canal era",
          "from_coordinates": [
            -72.3,
            18.9
          ],
          "from_label": "Caribbean fever zone",
          "narrative": "Yellow fever and malaria repeatedly disrupted French canal ambitions before vector science and mosquito control changed the engineering balance.",
          "route_id": "yellow-caribbean-panama",
          "route_type": "imperial_infrastructure",
          "to_coordinates": [
            -79.52,
            8.98
          ],
          "to_label": "Panama isthmus"
        }
      ],
      "status": "consensus",
      "story_count": 0,
      "subtitle": "Atlantic mosquito ecology, slavery, empire, and port-city mortality",
      "summary": "Yellow fever is one of the clearest examples of a pathogen whose historical geography was shaped by maritime movement, tropical mosquito ecology, port infrastructure, and imperial warfare.",
      "variant_count": 0,
      "variants": [],
      "visual_asset": {
        "alt_text": "Editorial specimen plate for yellow fever showing Atlantic route and mosquito-ecology motifs.",
        "asset_id": "atlas-yellow-fever-hero",
        "editorial_note": "Prioritize Atlantic route mood and mosquito-port ecology over clinical illustration.",
        "negative_prompt": "sci-fi planet, cartoon virus mascot, fake microscope render, glowing neon, purple gradient app art, childish medical icon set",
        "output_path": "graphics/atlas/generated/yellow-fever-hero.png",
        "pathogen_slug": "yellow-fever",
        "prompt": "Museum-drawer style editorial specimen plate for yellow fever, maritime disease atlas aesthetic, Atlantic shipping traces, mosquito ecology motifs, aged cartographic paper, restrained epidemiology newsroom palette, no fantasy, no cartoon pathogen, no glossy stock-art look.",
        "source_mode": "gpt-image-2",
        "status": "pending",
        "surface": "hero"
      },
      "visual_asset_id": "atlas-yellow-fever-hero",
      "why_it_matters": "It lets the atlas show how a pathogen can move with people, water storage, ships, and vector habitat rather than by human travel alone.",
      "writing_state": "direct",
      "color": "#d86a4f",
      "category": "mosquito-borne",
      "category_label": "Mosquito-borne / arboviral",
      "transmission_group": "Mosquito-borne / arboviral",
      "status_label": "Consensus",
      "writing_state_label": "Written here directly",
      "reference_href": "../../reference/yellow-fever.html"
    },
    {
      "atlas_scope": "Nineteenth-century pandemic expansion with modern humanitarian echoes",
      "atlas_url": "atlas.html?pathogen=cholera",
      "citation_count": 3,
      "citations": [
        {
          "claim_supported": "Bay of Bengal endemicity and British trade-route expansion into repeated pandemics.",
          "id": "cholera-handbook",
          "note": "Core geography source.",
          "short_citation": "Tuan JJ, Cox FEG, Bia FJ. Historical overview of global infectious diseases and geopolitics. In Routledge Handbook of Infectious Diseases: A Geographical Guide. 2025.",
          "url": "https://doi.org/10.4324/9781003531425"
        },
        {
          "claim_supported": "Repeated transregional spread and phylogeographic movement across cholera pandemic waves.",
          "id": "cholera-nature",
          "note": "Strong modern genomic support for long-distance spread.",
          "short_citation": "Mutreja A, Kim DW, Thomson NR et al. Evidence for several waves of global transmission in the seventh cholera pandemic. Nature. 2011.",
          "url": "https://doi.org/10.1038/nature09548"
        },
        {
          "claim_supported": "Seventh-pandemic lineage emergence and downstream global spread.",
          "id": "cholera-review",
          "note": "Useful for connecting historical and genomic narratives.",
          "short_citation": "Hu D, Liu B, Feng L et al. Origins of the current seventh cholera pandemic. Proc Natl Acad Sci U S A. 2016.",
          "url": "https://doi.org/10.1073/pnas.1608732113"
        }
      ],
      "default_variant_slug": "",
      "framing_traps": [
        "Do not reduce cholera to an abstract waterborne disease with no political geography.",
        "Do not treat every outbreak as a brand-new emergence; repeated long-range movement is built into its history."
      ],
      "linked_blog_posts": [
        {
          "published_at": "2026-04-11",
          "relation": "adjacent_context",
          "title": "Big Epidemiology: Disease at the Scale of Civilization",
          "url": "https://theedgeofepidemiology.substack.com/p/big-epidemiology-disease-at-the-scale"
        }
      ],
      "linked_reference_slug": "cholera",
      "linked_story_ids": [],
      "modern_echoes": [
        "Modern cholera still concentrates where water and sanitation systems break down under war, flooding, or displacement.",
        "The atlas route logic still maps onto contemporary Yemen, Haiti, and eastern/southern Africa coverage."
      ],
      "name": "Cholera",
      "origin_claim": {
        "confidence": "strong",
        "coordinates": [
          90.35,
          22.55
        ],
        "date_or_era": "Long-standing endemic zone before nineteenth-century pandemic export",
        "label": "Ganges-Brahmaputra delta / Bay of Bengal",
        "narrative": "The strongest consensus places cholera's pandemic source ecology in the Bay of Bengal and adjacent delta systems before colonial trade and troop movement accelerated wider spread."
      },
      "pathogen_type": "Bacterium",
      "reference_name": "Cholera",
      "reference_url": "reference/cholera.html",
      "reference_web_path": "reference/cholera.html",
      "related_stories": [],
      "route_count": 3,
      "slug": "cholera",
      "spread_routes": [
        {
          "citation_ids": [
            "cholera-handbook",
            "cholera-nature",
            "cholera-review"
          ],
          "confidence": "strong",
          "date_or_era": "1817 first pandemic wave",
          "from_coordinates": [
            90.35,
            22.55
          ],
          "from_label": "Bengal delta",
          "narrative": "British military and commercial movement amplified local outbreaks into subcontinental epidemics.",
          "route_id": "cholera-bengal-subcontinent",
          "route_type": "riverine_and_land",
          "to_coordinates": [
            88.36,
            22.57
          ],
          "to_label": "Indian subcontinent"
        },
        {
          "citation_ids": [
            "cholera-handbook",
            "cholera-nature"
          ],
          "confidence": "strong",
          "date_or_era": "1817-1837",
          "from_coordinates": [
            88.36,
            22.57
          ],
          "from_label": "Bengal and Indian ports",
          "narrative": "Trade routes and troop movement carried cholera westward into the Middle East and Europe during the earliest pandemic waves.",
          "route_id": "cholera-bengal-middle-east-europe",
          "route_type": "maritime",
          "to_coordinates": [
            29.0,
            41.0
          ],
          "to_label": "Middle East and Europe"
        },
        {
          "citation_ids": [
            "cholera-handbook",
            "cholera-nature"
          ],
          "confidence": "moderate",
          "date_or_era": "1830s transoceanic spread",
          "from_coordinates": [
            88.36,
            22.57
          ],
          "from_label": "South Asia",
          "narrative": "By the 1830s cholera had jumped into the Caribbean and Mexico, showing how shipping made a delta-rooted disease transcontinental.",
          "route_id": "cholera-bengal-americas",
          "route_type": "maritime",
          "to_coordinates": [
            -82.37,
            23.13
          ],
          "to_label": "Caribbean and Mexico"
        }
      ],
      "status": "consensus",
      "story_count": 0,
      "subtitle": "Bay of Bengal ecology, empire, troop movement, and recurring pandemic waves",
      "summary": "Cholera is the classic map disease for showing how river basins, pilgrimage, military movement, and commercial shipping can convert a local ecology into repeated global pandemic waves.",
      "variant_count": 0,
      "variants": [],
      "visual_asset": {
        "alt_text": "Editorial cholera plate centered on delta, river, and shipping-route geography.",
        "asset_id": "atlas-cholera-hero",
        "editorial_note": "Focus on water systems and imperial routes rather than laboratory motifs.",
        "negative_prompt": "fantasy map, pirate cartoon, generic blue medical infographic, shiny dashboard look",
        "output_path": "graphics/atlas/generated/cholera-hero.png",
        "pathogen_slug": "cholera",
        "prompt": "Evidence-board style cholera atlas plate, Bay of Bengal delta, river networks, shipping routes, nineteenth-century epidemic cartography, clean editorial layout, public-health newsroom design, no cartooning.",
        "source_mode": "gpt-image-2",
        "status": "pending",
        "surface": "hero"
      },
      "visual_asset_id": "atlas-cholera-hero",
      "why_it_matters": "It gives the atlas a clean origin basin, repeated outward routes, and a still-live connection between infrastructure failure and epidemic geography.",
      "writing_state": "adjacent",
      "color": "#5a9bd4",
      "category": "fecal-oral-waterborne",
      "category_label": "Fecal-oral / waterborne",
      "transmission_group": "Fecal-oral / waterborne",
      "status_label": "Consensus",
      "writing_state_label": "Adjacent writing",
      "reference_href": "../../reference/cholera.html"
    },
    {
      "atlas_scope": "Ancient divergence with early modern colonial spread",
      "atlas_url": "atlas.html?pathogen=measles",
      "citation_count": 3,
      "citations": [
        {
          "claim_supported": "Colonial spread through the Americas and later maritime dissemination.",
          "id": "measles-handbook",
          "note": "Geography-first secondary source.",
          "short_citation": "Tuan JJ, Cox FEG, Bia FJ. Historical overview of global infectious diseases and geopolitics. In Routledge Handbook of Infectious Diseases: A Geographical Guide. 2025.",
          "url": "https://doi.org/10.4324/9781003531425"
        },
        {
          "claim_supported": "Earlier molecular divergence date and dense-settlement origin framing.",
          "id": "measles-science",
          "note": "Strong modern molecular-clock paper.",
          "short_citation": "D\u00fcx A, Lequime S, Patrono LV et al. Measles virus and rinderpest virus divergence dated to the sixth century BCE. Science. 2020.",
          "url": "https://doi.org/10.1126/science.aba9411"
        },
        {
          "claim_supported": "Transmission characteristics and modern outbreak interpretation.",
          "id": "measles-lancet",
          "note": "Broad clinical-epidemiologic review.",
          "short_citation": "Moss WJ. Measles. Lancet. 2017.",
          "url": "https://doi.org/10.1016/S0140-6736(16)31483-1"
        }
      ],
      "default_variant_slug": "",
      "framing_traps": [
        "Do not pretend the deep origin date is settled more tightly than the literature supports.",
        "Do not turn modern measles into a mystery pathogen story; the practical issue is usually vaccination coverage."
      ],
      "linked_blog_posts": [],
      "linked_reference_slug": "measles",
      "linked_story_ids": [],
      "modern_echoes": [
        "Contemporary measles still follows travel plus immunity gaps rather than any exotic new route mechanism.",
        "Importation, school spread, and low-coverage communities remain the practical map."
      ],
      "name": "Measles",
      "origin_claim": {
        "confidence": "moderate",
        "coordinates": [
          35.5,
          32.0
        ],
        "date_or_era": "First millennium BCE to first millennium CE, depending on molecular model",
        "label": "West Eurasian dense-settlement zone with cattle-linked morbillivirus ancestry",
        "narrative": "Measles is generally treated as a human morbillivirus related to rinderpest, but the exact timing of divergence remains model-dependent rather than settled to a single year."
      },
      "pathogen_type": "Virus",
      "reference_name": "Measles",
      "reference_url": "reference/measles.html",
      "reference_web_path": "reference/measles.html",
      "related_stories": [
        {
          "display_title": "Measles transmission and vaccination",
          "latest_update_summary": "The lead item has changed to How conflict is driving measles outbreaks in the Middle East and North Africa from arabnews.jp.",
          "story_id": "story_0cc2d5322bc76f8f",
          "story_url": "stories/story_0cc2d5322bc76f8f-measles-transmission-and-vaccination.html",
          "story_web_path": "stories/story_0cc2d5322bc76f8f-measles-transmission-and-vaccination.html",
          "story_href": "../../stories/story_0cc2d5322bc76f8f-measles-transmission-and-vaccination.html"
        }
      ],
      "route_count": 2,
      "slug": "measles",
      "spread_routes": [
        {
          "citation_ids": [
            "measles-handbook",
            "measles-science"
          ],
          "confidence": "strong",
          "date_or_era": "Sixteenth to seventeenth centuries",
          "from_coordinates": [
            35.5,
            32.0
          ],
          "from_label": "Eurasian endemic zone",
          "narrative": "Measles traveled with successive colonial waves and compounded the mortality burden created by smallpox in the Americas.",
          "route_id": "measles-eurasia-colonial-americas",
          "route_type": "colonial",
          "to_coordinates": [
            -76.0,
            18.5
          ],
          "to_label": "Caribbean and mainland Americas"
        },
        {
          "citation_ids": [
            "measles-handbook",
            "measles-lancet"
          ],
          "confidence": "moderate",
          "date_or_era": "Eighteenth to nineteenth centuries",
          "from_coordinates": [
            -75.0,
            40.0
          ],
          "from_label": "Colonial American coastal routes",
          "narrative": "Once sustained in colonial networks, measles repeatedly entered island populations with little prior immunity and devastating mortality consequences.",
          "route_id": "measles-americas-pacific",
          "route_type": "maritime",
          "to_coordinates": [
            -171.75,
            -13.85
          ],
          "to_label": "Pacific islands"
        }
      ],
      "status": "mixed",
      "story_count": 1,
      "subtitle": "Dense settlement, cattle-linked ancestry, and colonial spread into immunologically naive populations",
      "summary": "Measles is a useful atlas pathogen because its deeper origin story is partly reconstructed from molecular-clock work, while its colonial spread story is brutally visible in the Americas and Pacific.",
      "variant_count": 0,
      "variants": [],
      "visual_asset": {
        "alt_text": "Editorial measles plate linking dense-settlement history and colonial spread.",
        "asset_id": "atlas-measles-hero",
        "editorial_note": "Keep the divergence-from-rinderpest cue subtle, not literal.",
        "negative_prompt": "smiling characters, clinic poster, purple vaporwave, children illustration",
        "output_path": "graphics/atlas/generated/measles-hero.png",
        "pathogen_slug": "measles",
        "prompt": "Measles atlas specimen plate with dense-settlement texture, route lines across colonial sea lanes, historical paper collage, epidemiology atlas aesthetic, subtle cattle-lineage cue, not cartoonish.",
        "source_mode": "gpt-image-2",
        "status": "pending",
        "surface": "hero"
      },
      "visual_asset_id": "atlas-measles-hero",
      "why_it_matters": "It shows the difference between debated deep origin, strong consensus on later spread, and the modern reality that measles outbreaks are usually immunity-gap stories.",
      "writing_state": "not_yet_written",
      "color": "#d6c06a",
      "category": "airborne-respiratory",
      "category_label": "Airborne / respiratory",
      "transmission_group": "Airborne / respiratory",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/measles.html"
    },
    {
      "atlas_scope": "Central and West African history with 2003 and 2022 global turning points",
      "atlas_url": "atlas.html?pathogen=mpox",
      "citation_count": 4,
      "citations": [
        {
          "claim_supported": "Central/West African origins, 2003 animal-trade export, and 2022 global outbreak framing.",
          "id": "mpox-handbook",
          "note": "Combines historical overview and emerging infections synthesis.",
          "short_citation": "Tuan JJ, Cox FEG, Bia FJ; Wilson ME, Petersen E, Koopmans MP. Historical overview and emerging infections chapters. In Routledge Handbook of Infectious Diseases: A Geographical Guide. 2025.",
          "url": "https://doi.org/10.4324/9781003531425"
        },
        {
          "claim_supported": "2003 U.S. outbreak tied to imported African rodents and prairie-dog exposure chains.",
          "id": "mpox-croft",
          "note": "Useful for the wildlife-trade route.",
          "short_citation": "Croft DR, Sotir MJ, Williams CJ et al. Occupational risks during a monkeypox outbreak, Wisconsin, 2003. Emerg Infect Dis. 2007.",
          "url": "https://doi.org/10.3201/eid1307.061365"
        },
        {
          "claim_supported": "Changing epidemiology, human transmission, and geographic expansion beyond historical endemic zones.",
          "id": "mpox-review",
          "note": "Broad review before the full scale of the 2022 outbreak.",
          "short_citation": "Bunge EM, Hoet B, Chen L et al. The changing epidemiology of human monkeypox\u2014A potential threat? PLoS Negl Trop Dis. 2022.",
          "url": "https://doi.org/10.1371/journal.pntd.0010141"
        },
        {
          "claim_supported": "Modern clade framing, transmission patterns, and global outbreak context.",
          "id": "mpox-lancet",
          "note": "High-level synthesis for current-era interpretation.",
          "short_citation": "Mitj\u00e0 O, Ogoina D, Titanji BK et al. Monkeypox. Lancet. 2023.",
          "url": "https://doi.org/10.1016/S0140-6736(23)01574-0"
        }
      ],
      "default_variant_slug": "",
      "framing_traps": [
        "Do not flatten clade I and clade II epidemiology into the same story.",
        "Do not erase Central and West African history when covering the 2022 multinational outbreak."
      ],
      "linked_blog_posts": [],
      "linked_reference_slug": "mpox",
      "linked_story_ids": [],
      "modern_echoes": [
        "Clade naming, network-specific spread, and vaccine access now matter as much as simple country counts.",
        "The 2022 event changed mpox from a niche tropical-medicine map into a real global surveillance map."
      ],
      "name": "Mpox",
      "origin_claim": {
        "confidence": "moderate",
        "coordinates": [
          23.65,
          0.5
        ],
        "date_or_era": "Recognized in humans in 1970, likely circulating earlier in animal reservoirs",
        "label": "Central and West African forest-zone circulation",
        "narrative": "Human recognition begins in the Congo Basin and West Africa, but the deeper animal-reservoir history is less settled than the later export events."
      },
      "pathogen_type": "Virus",
      "reference_name": "Mpox",
      "reference_url": "reference/mpox.html",
      "reference_web_path": "reference/mpox.html",
      "related_stories": [],
      "route_count": 3,
      "slug": "mpox",
      "spread_routes": [
        {
          "citation_ids": [
            "mpox-handbook",
            "mpox-review"
          ],
          "confidence": "moderate",
          "date_or_era": "1970s to 2017",
          "from_coordinates": [
            23.65,
            0.5
          ],
          "from_label": "Congo Basin and West African forest regions",
          "narrative": "Distinct clades and long intervals of rural detection complicate the idea of one simple linear mpox geography.",
          "route_id": "mpox-drc-west-africa",
          "route_type": "regional",
          "to_coordinates": [
            7.5,
            9.1
          ],
          "to_label": "Nigeria re-emergence zone"
        },
        {
          "citation_ids": [
            "mpox-handbook",
            "mpox-croft"
          ],
          "confidence": "strong",
          "date_or_era": "2003 animal-trade outbreak",
          "from_coordinates": [
            -15.3,
            13.45
          ],
          "from_label": "Gambia wildlife export",
          "narrative": "Imported rodents seeded infection in prairie dogs sold as pets, producing the first recognized outbreak outside Africa.",
          "route_id": "mpox-gambia-texas-midwest",
          "route_type": "wildlife_trade",
          "to_coordinates": [
            -97.74,
            30.27
          ],
          "to_label": "Texas and Midwestern U.S. pet trade"
        },
        {
          "citation_ids": [
            "mpox-handbook",
            "mpox-review",
            "mpox-lancet"
          ],
          "confidence": "strong",
          "date_or_era": "2018 to 2022",
          "from_coordinates": [
            7.5,
            9.1
          ],
          "from_label": "Nigeria",
          "narrative": "Travel-linked introductions from Nigeria were followed by broader global transmission in 2022, especially within sexual networks among men who have sex with men.",
          "route_id": "mpox-nigeria-uk-europe",
          "route_type": "air_travel_and_network",
          "to_coordinates": [
            -0.1,
            51.5
          ],
          "to_label": "United Kingdom and western Europe"
        }
      ],
      "status": "mixed",
      "story_count": 0,
      "subtitle": "Forest-zone recognition, animal trade jumps, and networked global spread",
      "summary": "Mpox belongs in the atlas because it combines a geographically anchored Central/West African history with abrupt export through wildlife trade and then a very different twenty-first century global transmission pattern.",
      "variant_count": 0,
      "variants": [],
      "visual_asset": {
        "alt_text": "Editorial mpox plate showing forest-zone history and later export routes.",
        "asset_id": "atlas-mpox-hero",
        "editorial_note": "Avoid sensational lesion imagery; this should read like a serious atlas.",
        "negative_prompt": "sensational skin closeup, warning poster, biohazard slop, flashy app chrome",
        "output_path": "graphics/atlas/generated/mpox-hero.png",
        "pathogen_slug": "mpox",
        "prompt": "Mpox atlas editorial plate, Central and West African forest textures, travel-linked outbreak geometry, dossier board aesthetic, muted earth palette, evidence-focused, no stigma cues.",
        "source_mode": "gpt-image-2",
        "status": "pending",
        "surface": "hero"
      },
      "visual_asset_id": "atlas-mpox-hero",
      "why_it_matters": "It forces the site to distinguish clades, transport mode, and transmission network rather than collapsing everything into one map pin.",
      "writing_state": "not_yet_written",
      "color": "#dd6974",
      "category": "contact-sexual-bloodborne",
      "category_label": "Contact, sexual, or bloodborne",
      "transmission_group": "Contact, sexual, or bloodborne",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/mpox.html"
    },
    {
      "atlas_scope": "East and Southeast Asian emergence with global bird and farm spread",
      "atlas_url": "atlas.html?pathogen=avian-influenza-h5n1",
      "citation_count": 5,
      "citations": [
        {
          "claim_supported": "East/Asian origin framing, migratory dissemination, and global bird-plus-mammal spread.",
          "id": "h5n1-handbook",
          "note": "Core atlas synthesis source.",
          "short_citation": "Wilson ME, Petersen E, Koopmans MP. Emerging infections. In Routledge Handbook of Infectious Diseases: A Geographical Guide. 2025.",
          "url": "https://doi.org/10.4324/9781003531425"
        },
        {
          "claim_supported": "Wide avian spread across Europe and beyond.",
          "id": "h5n1-efsa",
          "note": "Good operational surveillance overview.",
          "short_citation": "Adlhoch C, Fusaro A, Gonzales JL et al. Avian influenza overview April-June 2023. EFSA J. 2023.",
          "url": "https://doi.org/10.2903/j.efsa.2023.8191"
        },
        {
          "claim_supported": "Mammalian spillover in Europe during the current clade 2.3.4.4b era.",
          "id": "h5n1-cat",
          "note": "Illustrates the expanded non-avian host picture.",
          "short_citation": "Briand FX, Souchaud F, Pierre I et al. Highly pathogenic Avian Influenza A(H5N1) Clade 2.3.4.4b Virus in Domestic Cat, France, 2022. Emerg Infect Dis. 2023.",
          "url": "https://doi.org/10.3201/eid2908.230188"
        },
        {
          "claim_supported": "Farmed-mammal spillover and adaptation concern.",
          "id": "h5n1-mink",
          "note": "Important for the mammal-interface narrative.",
          "short_citation": "Ag\u00fcero M, Monne I, S\u00e1nchez A et al. Highly pathogenic avian influenza A(H5N1) virus infection in farmed minks, Spain, October 2022. Euro Surveill. 2023.",
          "url": "https://doi.org/10.2807/1560-7917.ES.2023.28.3.2300001"
        },
        {
          "claim_supported": "U.S. dairy-associated spread and human spillover updates.",
          "id": "h5n1-cdc",
          "note": "Official surveillance layer for the modern route.",
          "short_citation": "CDC. H5 Bird Flu: Current Situation Summary. 2025.",
          "url": "https://www.cdc.gov/bird-flu/situation-summary/index.html"
        }
      ],
      "default_variant_slug": "",
      "framing_traps": [
        "Do not imply sustained human transmission when the evidence is still spillover-heavy.",
        "Do not treat one human case and a continent-wide bird epizootic as the same epidemiologic object."
      ],
      "linked_blog_posts": [],
      "linked_reference_slug": "avian-influenza-a-h5n1",
      "linked_story_ids": [],
      "modern_echoes": [
        "Readers need to know whether a map point represents birds, mammals, farms, or humans; these are not interchangeable layers.",
        "Human-case headlines can mislead if the animal geography has changed far more than the human case count has."
      ],
      "name": "Avian influenza A(H5N1)",
      "origin_claim": {
        "confidence": "strong",
        "coordinates": [
          113.5,
          22.3
        ],
        "date_or_era": "Recognized in humans in 1997, with wider avian circulation already established",
        "label": "Southern China and adjacent East/Southeast Asian poultry interfaces",
        "narrative": "The strongest modern surveillance narrative begins in East and Southeast Asian poultry-wild bird interfaces before later global circulation through migratory and farm networks."
      },
      "pathogen_type": "Virus",
      "reference_name": "Avian influenza A(H5N1)",
      "reference_url": "reference/avian-influenza-a-h5n1.html",
      "reference_web_path": "reference/avian-influenza-a-h5n1.html",
      "related_stories": [
        {
          "display_title": "Avian influenza and H5N1",
          "latest_update_summary": "CDC MMWR now explicitly uses investigation or monitoring language.",
          "story_id": "story_28a91c6d89267872",
          "story_url": "stories/story_28a91c6d89267872-avian-influenza-and-h5n1.html",
          "story_web_path": "stories/story_28a91c6d89267872-avian-influenza-and-h5n1.html",
          "story_href": "../../stories/story_28a91c6d89267872-avian-influenza-and-h5n1.html"
        }
      ],
      "route_count": 3,
      "slug": "avian-influenza-h5n1",
      "spread_routes": [
        {
          "citation_ids": [
            "h5n1-handbook",
            "h5n1-efsa"
          ],
          "confidence": "strong",
          "date_or_era": "2000s to present",
          "from_coordinates": [
            113.5,
            22.3
          ],
          "from_label": "South China / Hong Kong poultry interface",
          "narrative": "Highly pathogenic H5 viruses spread across flyways through wild birds and then seeded outbreaks in poultry and wild carnivores.",
          "route_id": "h5n1-east-asia-migratory-flyways",
          "route_type": "migratory_birds",
          "to_coordinates": [
            35.0,
            50.0
          ],
          "to_label": "Eurasian and African flyways"
        },
        {
          "citation_ids": [
            "h5n1-handbook",
            "h5n1-cat",
            "h5n1-mink"
          ],
          "confidence": "strong",
          "date_or_era": "2021 to present clade 2.3.4.4b expansion",
          "from_coordinates": [
            35.0,
            50.0
          ],
          "from_label": "Eurasian flyways",
          "narrative": "Clade 2.3.4.4b produced a much more geographically persistent epizootic across wild birds, poultry, and mammalian spillover hosts.",
          "route_id": "h5n1-flyways-europe-africa",
          "route_type": "bird_and_farm",
          "to_coordinates": [
            2.0,
            46.0
          ],
          "to_label": "Europe and Africa"
        },
        {
          "citation_ids": [
            "h5n1-handbook",
            "h5n1-cdc"
          ],
          "confidence": "moderate",
          "date_or_era": "2024 to present",
          "from_coordinates": [
            -96.0,
            44.0
          ],
          "from_label": "North American wild bird and poultry circulation",
          "narrative": "The dairy-cattle event marked a major shift from bird-centered concern to sustained attention on mammalian agricultural systems and exposed workers.",
          "route_id": "h5n1-birds-us-dairy",
          "route_type": "agricultural_interface",
          "to_coordinates": [
            -101.8,
            34.9
          ],
          "to_label": "Texas Panhandle and multistate dairies"
        }
      ],
      "status": "mixed",
      "story_count": 1,
      "subtitle": "Bird flyways, poultry systems, mammalian spillover, and farm-interface risk",
      "summary": "H5N1 belongs in the atlas because its contemporary geography is not a human epidemic map first; it is a bird-route, farm-system, and spillover map whose human layer remains contingent.",
      "variant_count": 0,
      "variants": [],
      "visual_asset": {
        "alt_text": "Editorial H5N1 plate emphasizing flyways and farm-interface surveillance.",
        "asset_id": "atlas-h5n1-hero",
        "editorial_note": "Keep it more surveillance map than dramatic outbreak art.",
        "negative_prompt": "cute poultry cartoon, disaster movie poster, sci-fi plague orb",
        "output_path": "graphics/atlas/generated/h5n1-hero.png",
        "pathogen_slug": "avian-influenza-h5n1",
        "prompt": "H5N1 atlas plate with migratory flyway overlays, poultry and dairy interface cues, field-notebook and surveillance-board look, serious public-health editorial style, no mascot birds.",
        "source_mode": "gpt-image-2",
        "status": "pending",
        "surface": "hero"
      },
      "visual_asset_id": "atlas-h5n1-hero",
      "why_it_matters": "It creates a genuinely different map grammar from the classic human-to-human pathogens and foregrounds One Health risk.",
      "writing_state": "not_yet_written",
      "color": "#9b7bd8",
      "category": "zoonotic-animal-interface",
      "category_label": "Zoonotic / animal interface",
      "transmission_group": "Zoonotic / animal interface",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/avian-influenza-a-h5n1.html"
    },
    {
      "atlas_scope": "Family-level rodent-host geography with variant-specific human disease lenses",
      "atlas_url": "atlas.html?pathogen=hantavirus",
      "citation_count": 5,
      "citations": [
        {
          "claim_supported": "Family-level hantavirus ecology, rodent-host associations, and the division between Old World and New World disease patterns.",
          "id": "hanta-family-review",
          "note": "Best broad synthesis source for a family-level atlas entry.",
          "short_citation": "Jonsson CB, Figueiredo LTM, Vapalahti O. A global perspective on hantavirus ecology, epidemiology, and disease. Clin Microbiol Rev. 2010.",
          "url": "https://doi.org/10.1128/CMR.00062-09"
        },
        {
          "claim_supported": "American hantavirus ecology, cardiopulmonary syndromes, and host-geography framing.",
          "id": "hanta-americas",
          "note": "Broad review of hantavirus emergence in the Americas.",
          "short_citation": "Hjelle B, Torres-P\u00e9rez F. Hantaviruses in the Americas and their role as emerging pathogens. Viruses. 2010.",
          "url": "https://doi.org/10.3390/v2032559"
        },
        {
          "claim_supported": "Global hantavirus distribution and the Old World hemorrhagic-fever geography.",
          "id": "hanta-hfrs",
          "note": "Useful bridge between HFRS and broader global distribution.",
          "short_citation": "Bi Z, Formenty PBH, Roth CE. Hantavirus infection: A review and global update. J Infect Dev Ctries. 2008.",
          "url": "https://doi.org/10.3855/jidc.317"
        },
        {
          "claim_supported": "Andes-virus person-to-person transmission as the key exception.",
          "id": "hanta-andes",
          "note": "Specific evidence for the atlas caution layer.",
          "short_citation": "Mart\u00ednez-Valdebenito C, Calvo M, Vial C et al. Person-to-person household and nosocomial transmission of Andes hantavirus, southern Chile, 2011. Emerg Infect Dis. 2014.",
          "url": "https://doi.org/10.3201/eid2008.131936"
        },
        {
          "claim_supported": "Climate and landscape conditions affecting hantavirus geography in Latin America and the Caribbean.",
          "id": "hanta-climate",
          "note": "Useful for the ecology panel.",
          "short_citation": "Douglas KO, Payne K, Sabino-Santos G et al. Influence of climatic factors on human hantavirus infections in Latin America and the Caribbean: A systematic review. Pathogens. 2022.",
          "url": "https://doi.org/10.3390/pathogens11010015"
        }
      ],
      "default_variant_slug": "hantaan-virus",
      "framing_traps": [
        "Do not write all hantaviruses as though they share one syndrome, one rodent host, or one transmission pattern.",
        "Do not let the Andes-virus exception overwrite the much larger family-level geography."
      ],
      "linked_blog_posts": [
        {
          "published_at": "2026-05-04",
          "relation": "deep_dive",
          "title": "Hantavirus at Sea: What We Know About the MV Hondius Outbreak (The Pathogen Dispatch #2)",
          "url": "https://theedgeofepidemiology.substack.com/p/hantavirus-at-sea-what-we-know-about"
        }
      ],
      "linked_reference_slug": "hantavirus-syndrome",
      "linked_story_ids": [],
      "modern_echoes": [
        "Travelers, field workers, rural residents, and military trainees usually encounter hantavirus risk through disturbed rodent habitat rather than crowded metropolitan spread.",
        "The one question that changes media framing fast is whether the story points to Andes virus or another person-to-person concern rather than a standard rodent-exposure event."
      ],
      "name": "Hantaviruses",
      "origin_claim": {
        "confidence": "moderate",
        "coordinates": [
          111.0,
          41.0
        ],
        "date_or_era": "Twentieth-century human recognition layered on much older rodent-virus evolution",
        "label": "Eurasian and American rodent-host lineages",
        "narrative": "There is no honest single origin pin for all hantaviruses. The stronger atlas frame is family-level rodent-host evolution across Eurasia and the Americas, then variant-specific human syndromes with distinct geographic signatures."
      },
      "pathogen_type": "Virus",
      "reference_name": "Hantavirus syndrome",
      "reference_url": "reference/hantavirus-syndrome.html",
      "reference_web_path": "reference/hantavirus-syndrome.html",
      "related_stories": [
        {
          "display_title": "Hantavirus and cruise-ship outbreak",
          "latest_update_summary": "New publisher/source coverage joined this story cluster: Al Jazeera.",
          "story_id": "story_f6d225b01f3f7094",
          "story_url": "stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html",
          "story_web_path": "stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html",
          "story_href": "../../stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html"
        }
      ],
      "route_count": 2,
      "slug": "hantavirus",
      "spread_routes": [
        {
          "citation_ids": [
            "hanta-family-review",
            "hanta-hfrs"
          ],
          "confidence": "strong",
          "date_or_era": "Twentieth-century recognition of hemorrhagic fever with renal syndrome",
          "from_coordinates": [
            111.0,
            41.0
          ],
          "from_label": "Eurasian murid-rodent host zones",
          "narrative": "The classical Old World hantavirus story is not a traveler chain but a host-and-landscape pattern tied to murid rodents and hemorrhagic fever with renal syndrome.",
          "route_id": "hantavirus-old-world-lineages",
          "route_type": "rodent_host_ecology",
          "to_coordinates": [
            127.0,
            40.2
          ],
          "to_label": "Korea, China, and the Russian Far East"
        },
        {
          "citation_ids": [
            "hanta-family-review",
            "hanta-americas"
          ],
          "confidence": "strong",
          "date_or_era": "1990s emergence framing and later regional expansion",
          "from_coordinates": [
            -108.0,
            37.0
          ],
          "from_label": "North and South American sigmodontine rodent zones",
          "narrative": "New World hantaviruses became a major public story after cardiopulmonary syndromes were recognized in the Americas, but the real map remains rodent-host geography plus human disturbance and exposure.",
          "route_id": "hantavirus-new-world-lineages",
          "route_type": "rodent_host_ecology",
          "to_coordinates": [
            -71.0,
            -41.5
          ],
          "to_label": "Four Corners and southern cone exposure settings"
        }
      ],
      "status": "mixed",
      "story_count": 1,
      "subtitle": "Rodent-host lineages, hemorrhagic fever versus cardiopulmonary syndromes, and one crucial Andes-virus exception",
      "summary": "Hantaviruses belong in the atlas because they break the habit of pretending every pathogen has one clean human-travel route. The real map is rodent-host biogeography, ecological exposure settings, and the split between Old World hemorrhagic-fever viruses and New World cardiopulmonary viruses.",
      "variant_count": 3,
      "variants": [
        {
          "atlas_scope": "Family-level rodent-host geography with variant-specific human disease lenses",
          "atlas_url": "atlas.html?pathogen=hantavirus&variant=hantaan-virus",
          "citation_count": 2,
          "citations": [
            {
              "claim_supported": "Recognition of Hantaan virus as the etiologic agent of Korean hemorrhagic fever.",
              "id": "hantaan-korean-war",
              "note": "Landmark identification paper.",
              "short_citation": "Lee HW, Lee PW, Johnson KM. Isolation of the etiologic agent of Korean hemorrhagic fever. J Infect Dis. 1978.",
              "url": "https://doi.org/10.1093/infdis/137.3.298"
            },
            {
              "claim_supported": "East Asian HFRS geography and broader Old World distribution.",
              "id": "hanta-hfrs",
              "note": "Practical global review.",
              "short_citation": "Bi Z, Formenty PBH, Roth CE. Hantavirus infection: A review and global update. J Infect Dev Ctries. 2008.",
              "url": "https://doi.org/10.3855/jidc.317"
            }
          ],
          "default_variant_slug": "",
          "framing_traps": [
            "Do not collapse HFRS and cardiopulmonary syndromes into one undifferentiated clinical map.",
            "Do not start the family story in South America just because Andes virus is narratively dramatic."
          ],
          "linked_blog_posts": [
            {
              "published_at": "2026-05-04",
              "relation": "deep_dive",
              "title": "Hantavirus at Sea: What We Know About the MV Hondius Outbreak (The Pathogen Dispatch #2)",
              "url": "https://theedgeofepidemiology.substack.com/p/hantavirus-at-sea-what-we-know-about"
            }
          ],
          "linked_reference_slug": "hantavirus-syndrome",
          "linked_story_ids": [],
          "modern_echoes": [
            "HFRS reporting still turns on seasonality, rodent exposure, and occupational setting more than cross-border passenger travel.",
            "A family-level atlas needs this variant because it anchors hantavirus outside the news-driven Americas frame."
          ],
          "name": "Hantaan orthohantavirus",
          "origin_claim": {
            "confidence": "strong",
            "coordinates": [
              127.0,
              40.2
            ],
            "date_or_era": "Recognized during the Korean War, with older endemic circulation",
            "label": "Korean peninsula and adjacent northeast Asian rodent zones",
            "narrative": "Hantaan virus is tied to striped field-mouse ecologies in Korea, China, and nearby parts of Eurasia and became globally legible during Korean War hemorrhagic-fever outbreaks."
          },
          "pathogen_type": "Virus",
          "reference_name": "Hantavirus syndrome",
          "reference_url": "reference/hantavirus-syndrome.html",
          "reference_web_path": "reference/hantavirus-syndrome.html",
          "related_stories": [
            {
              "display_title": "Hantavirus and cruise-ship outbreak",
              "latest_update_summary": "New publisher/source coverage joined this story cluster: Al Jazeera.",
              "story_id": "story_f6d225b01f3f7094",
              "story_url": "stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html",
              "story_web_path": "stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html",
              "story_href": "../../stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html"
            }
          ],
          "route_count": 2,
          "slug": "hantaan-virus",
          "spread_routes": [
            {
              "citation_ids": [
                "hanta-hfrs",
                "hantaan-korean-war"
              ],
              "confidence": "strong",
              "date_or_era": "1950s recognition through wartime outbreaks",
              "from_coordinates": [
                127.0,
                40.2
              ],
              "from_label": "Murid rodent habitats in Korea",
              "narrative": "The decisive map for Hantaan virus is rodent habitat intersecting with soldiers, farmers, and disturbed field settings rather than civilian travel chains.",
              "route_id": "hantaan-korea-war-zones",
              "route_type": "exposure_setting",
              "to_coordinates": [
                127.4,
                38.2
              ],
              "to_label": "Military and rural exposure zones"
            },
            {
              "citation_ids": [
                "hanta-hfrs",
                "hanta-family-review"
              ],
              "confidence": "moderate",
              "date_or_era": "Twentieth century to present",
              "from_coordinates": [
                127.0,
                40.2
              ],
              "from_label": "Northeast Asian endemic belt",
              "narrative": "The wider HFRS map extends across East Asia where related rodent hosts and agricultural exposure sustain recurring transmission.",
              "route_id": "hantaan-east-asia-endemicity",
              "route_type": "endemic_zone",
              "to_coordinates": [
                131.0,
                47.0
              ],
              "to_label": "China and Russian Far East"
            }
          ],
          "status": "consensus",
          "story_count": 1,
          "subtitle": "Old World hemorrhagic fever with renal syndrome centered on Korean and northeast Asian rodent ecologies",
          "summary": "Hantaan virus is the classic Old World hantavirus frame and the right default for an encyclopedia view because it grounds the family in the hemorrhagic-fever geography that defined early recognition.",
          "variants": [],
          "visual_asset": {
            "alt_text": "Editorial hantavirus plate focused on Andean ecology and exposure settings.",
            "asset_id": "atlas-hantavirus-hero",
            "editorial_note": "Emphasize ecology and uncertainty instead of fear-bait.",
            "negative_prompt": "horror movie poster, dripping blood, cartoon rat, glossy medical brochure",
            "output_path": "graphics/atlas/generated/hantavirus-hero.png",
            "pathogen_slug": "hantavirus",
            "prompt": "Hantavirus atlas plate with Andean landscape textures, rodent-ecology cues, cabin and rural exposure motifs, scientific editorial collage, restrained and eerie, not horror.",
            "source_mode": "gpt-image-2",
            "status": "pending",
            "surface": "hero"
          },
          "visual_asset_id": "atlas-hantavirus-hero",
          "why_it_matters": "It restores the older and broader hantavirus story that gets erased when modern news cycles jump straight to Andes virus.",
          "writing_state": "direct",
          "color": "#7aa96b",
          "category": "other-mixed",
          "category_label": "Other / mixed transmission",
          "transmission_group": "Other / mixed transmission",
          "status_label": "Consensus",
          "writing_state_label": "Written here directly",
          "reference_href": "../../reference/hantavirus-syndrome.html"
        },
        {
          "atlas_scope": "Family-level rodent-host geography with variant-specific human disease lenses",
          "atlas_url": "atlas.html?pathogen=hantavirus&variant=sin-nombre-virus",
          "citation_count": 2,
          "citations": [
            {
              "claim_supported": "Identification of the Four Corners-associated hantavirus and cardiopulmonary outbreak framing.",
              "id": "sin-nombre-four-corners",
              "note": "Landmark emergence paper.",
              "short_citation": "Nichol ST, Spiropoulou CF, Morzunov S et al. Genetic identification of a hantavirus associated with an outbreak of acute respiratory illness. Science. 1993.",
              "url": "https://doi.org/10.1126/science.8390689"
            },
            {
              "claim_supported": "North American ecology and New World hantavirus patterns.",
              "id": "hanta-americas",
              "note": "Broad Americas review.",
              "short_citation": "Hjelle B, Torres-P\u00e9rez F. Hantaviruses in the Americas and their role as emerging pathogens. Viruses. 2010.",
              "url": "https://doi.org/10.3390/v2032559"
            }
          ],
          "default_variant_slug": "",
          "framing_traps": [
            "Do not call Sin Nombre a mysterious new spillover just because the 1993 cluster was the first dramatic public recognition.",
            "Do not imply routine person-to-person spread."
          ],
          "linked_blog_posts": [
            {
              "published_at": "2026-05-04",
              "relation": "deep_dive",
              "title": "Hantavirus at Sea: What We Know About the MV Hondius Outbreak (The Pathogen Dispatch #2)",
              "url": "https://theedgeofepidemiology.substack.com/p/hantavirus-at-sea-what-we-know-about"
            }
          ],
          "linked_reference_slug": "hantavirus-syndrome",
          "linked_story_ids": [],
          "modern_echoes": [
            "Cabin cleanup, rodent infestation, and environmental disturbance remain the operative map categories.",
            "Climate-linked rodent booms still matter more than international travel in most Sin Nombre reporting."
          ],
          "name": "Sin Nombre orthohantavirus",
          "origin_claim": {
            "confidence": "strong",
            "coordinates": [
              -108.0,
              37.0
            ],
            "date_or_era": "Recognized in 1993, with older enzootic circulation",
            "label": "Deer-mouse ecologies in the U.S. Southwest",
            "narrative": "Sin Nombre virus was recognized after the Four Corners outbreak, but the ecology was already present in deer-mouse populations before the human cluster made it visible."
          },
          "pathogen_type": "Virus",
          "reference_name": "Hantavirus syndrome",
          "reference_url": "reference/hantavirus-syndrome.html",
          "reference_web_path": "reference/hantavirus-syndrome.html",
          "related_stories": [
            {
              "display_title": "Hantavirus and cruise-ship outbreak",
              "latest_update_summary": "New publisher/source coverage joined this story cluster: Al Jazeera.",
              "story_id": "story_f6d225b01f3f7094",
              "story_url": "stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html",
              "story_web_path": "stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html",
              "story_href": "../../stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html"
            }
          ],
          "route_count": 2,
          "slug": "sin-nombre-virus",
          "spread_routes": [
            {
              "citation_ids": [
                "hanta-americas",
                "sin-nombre-four-corners"
              ],
              "confidence": "strong",
              "date_or_era": "1993 emergence recognition",
              "from_coordinates": [
                -108.0,
                37.0
              ],
              "from_label": "Deer-mouse habitat",
              "narrative": "The famous Four Corners outbreak reflects rodent population dynamics, human dwellings, and aerosolized exposure during cleanup rather than human-to-human spread.",
              "route_id": "sin-nombre-four-corners",
              "route_type": "exposure_setting",
              "to_coordinates": [
                -109.0,
                36.5
              ],
              "to_label": "Four Corners household and peridomestic exposure settings"
            },
            {
              "citation_ids": [
                "hanta-family-review",
                "hanta-americas"
              ],
              "confidence": "moderate",
              "date_or_era": "1990s to present",
              "from_coordinates": [
                -108.0,
                37.0
              ],
              "from_label": "Southwestern U.S. rodent ecologies",
              "narrative": "Once recognized, related western U.S. exposures showed that the disease map followed reservoir ecology and building conditions more than any passenger network.",
              "route_id": "sin-nombre-western-us",
              "route_type": "endemic_zone",
              "to_coordinates": [
                -120.5,
                44.0
              ],
              "to_label": "Wider western North American risk zone"
            }
          ],
          "status": "consensus",
          "story_count": 1,
          "subtitle": "Four Corners emergence, deer-mouse ecology, and the New World cardiopulmonary turn",
          "summary": "Sin Nombre virus changed how many readers understand hantaviruses by making a rodent-borne ecological disease look suddenly emergent in the American Southwest.",
          "variants": [],
          "visual_asset": {
            "alt_text": "Editorial hantavirus plate focused on Andean ecology and exposure settings.",
            "asset_id": "atlas-hantavirus-hero",
            "editorial_note": "Emphasize ecology and uncertainty instead of fear-bait.",
            "negative_prompt": "horror movie poster, dripping blood, cartoon rat, glossy medical brochure",
            "output_path": "graphics/atlas/generated/hantavirus-hero.png",
            "pathogen_slug": "hantavirus",
            "prompt": "Hantavirus atlas plate with Andean landscape textures, rodent-ecology cues, cabin and rural exposure motifs, scientific editorial collage, restrained and eerie, not horror.",
            "source_mode": "gpt-image-2",
            "status": "pending",
            "surface": "hero"
          },
          "visual_asset_id": "atlas-hantavirus-hero",
          "why_it_matters": "It explains why U.S. readers often think hantavirus starts in the Four Corners when that is really the start of one major New World recognition event.",
          "writing_state": "direct",
          "color": "#7aa96b",
          "category": "other-mixed",
          "category_label": "Other / mixed transmission",
          "transmission_group": "Other / mixed transmission",
          "status_label": "Consensus",
          "writing_state_label": "Written here directly",
          "reference_href": "../../reference/hantavirus-syndrome.html"
        },
        {
          "atlas_scope": "Family-level rodent-host geography with variant-specific human disease lenses",
          "atlas_url": "atlas.html?pathogen=hantavirus&variant=andes-virus",
          "citation_count": 2,
          "citations": [
            {
              "claim_supported": "Andes-virus person-to-person transmission and southern cone cluster interpretation.",
              "id": "hanta-andes",
              "note": "Key exception paper for the family.",
              "short_citation": "Mart\u00ednez-Valdebenito C, Calvo M, Vial C et al. Person-to-person household and nosocomial transmission of Andes hantavirus, southern Chile, 2011. Emerg Infect Dis. 2014.",
              "url": "https://doi.org/10.3201/eid2008.131936"
            },
            {
              "claim_supported": "Climatic and landscape context for Latin American hantavirus geography.",
              "id": "hanta-climate",
              "note": "Useful ecology and context source.",
              "short_citation": "Douglas KO, Payne K, Sabino-Santos G et al. Influence of climatic factors on human hantavirus infections in Latin America and the Caribbean: A systematic review. Pathogens. 2022.",
              "url": "https://doi.org/10.3390/pathogens11010015"
            }
          ],
          "default_variant_slug": "",
          "framing_traps": [
            "Do not project Andes-virus person-to-person concerns onto the rest of the family.",
            "Do not forget that rodent ecology still sits underneath the exceptional transmission narrative."
          ],
          "linked_blog_posts": [
            {
              "published_at": "2026-05-04",
              "relation": "deep_dive",
              "title": "Hantavirus at Sea: What We Know About the MV Hondius Outbreak (The Pathogen Dispatch #2)",
              "url": "https://theedgeofepidemiology.substack.com/p/hantavirus-at-sea-what-we-know-about"
            }
          ],
          "linked_reference_slug": "hantavirus-syndrome",
          "linked_story_ids": [],
          "modern_echoes": [
            "This is the strain that most readily turns a countryside exposure story into an urgent transmission story.",
            "Travel and expedition reporting tends to overfocus on Andes virus precisely because it is the exception."
          ],
          "name": "Andes orthohantavirus",
          "origin_claim": {
            "confidence": "moderate",
            "coordinates": [
              -71.0,
              -41.5
            ],
            "date_or_era": "Late twentieth century recognition with older enzootic circulation",
            "label": "Southern Andes rodent ecologies",
            "narrative": "Andes virus is associated with southern South American rodent ecologies and gained outsized attention because of evidence for person-to-person transmission in specific settings."
          },
          "pathogen_type": "Virus",
          "reference_name": "Hantavirus syndrome",
          "reference_url": "reference/hantavirus-syndrome.html",
          "reference_web_path": "reference/hantavirus-syndrome.html",
          "related_stories": [
            {
              "display_title": "Hantavirus and cruise-ship outbreak",
              "latest_update_summary": "New publisher/source coverage joined this story cluster: Al Jazeera.",
              "story_id": "story_f6d225b01f3f7094",
              "story_url": "stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html",
              "story_web_path": "stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html",
              "story_href": "../../stories/story_f6d225b01f3f7094-hantavirus-and-cruise-ship-outbreak.html"
            }
          ],
          "route_count": 2,
          "slug": "andes-virus",
          "spread_routes": [
            {
              "citation_ids": [
                "hanta-andes",
                "hanta-climate"
              ],
              "confidence": "strong",
              "date_or_era": "Late twentieth century to present",
              "from_coordinates": [
                -71.0,
                -41.5
              ],
              "from_label": "Southern Andes rodent habitats",
              "narrative": "Andes virus clusters in southern South America remain the most important person-to-person exception within hantavirus reporting.",
              "route_id": "andes-southern-cone",
              "route_type": "ecological",
              "to_coordinates": [
                -70.7,
                -42.9
              ],
              "to_label": "Argentina and Chile cluster zones"
            },
            {
              "citation_ids": [
                "hanta-andes",
                "hanta-climate"
              ],
              "confidence": "moderate",
              "date_or_era": "Contemporary travel-linked episodes",
              "from_coordinates": [
                -72.0,
                -39.0
              ],
              "from_label": "Rural southern cone exposure settings",
              "narrative": "The practical route is still rodent-linked exposure, but once Andes virus is implicated the reporting stakes shift toward cluster transmission and close-contact investigation.",
              "route_id": "andes-rural-travel",
              "route_type": "exposure_setting",
              "to_coordinates": [
                -72.0,
                -13.0
              ],
              "to_label": "Cabin, field, and enclosed-travel outbreaks"
            }
          ],
          "status": "mixed",
          "story_count": 1,
          "subtitle": "Southern cone rodent ecologies and the major person-to-person exception inside the hantavirus family",
          "summary": "Andes virus matters because it is the exception journalists remember, not the family baseline they should begin with.",
          "variants": [],
          "visual_asset": {
            "alt_text": "Editorial hantavirus plate focused on Andean ecology and exposure settings.",
            "asset_id": "atlas-hantavirus-hero",
            "editorial_note": "Emphasize ecology and uncertainty instead of fear-bait.",
            "negative_prompt": "horror movie poster, dripping blood, cartoon rat, glossy medical brochure",
            "output_path": "graphics/atlas/generated/hantavirus-hero.png",
            "pathogen_slug": "hantavirus",
            "prompt": "Hantavirus atlas plate with Andean landscape textures, rodent-ecology cues, cabin and rural exposure motifs, scientific editorial collage, restrained and eerie, not horror.",
            "source_mode": "gpt-image-2",
            "status": "pending",
            "surface": "hero"
          },
          "visual_asset_id": "atlas-hantavirus-hero",
          "why_it_matters": "It is the variant that turns a rodent-exposure story into a transmission-story question.",
          "writing_state": "direct",
          "color": "#7aa96b",
          "category": "other-mixed",
          "category_label": "Other / mixed transmission",
          "transmission_group": "Other / mixed transmission",
          "status_label": "Mixed / debated",
          "writing_state_label": "Written here directly",
          "reference_href": "../../reference/hantavirus-syndrome.html"
        }
      ],
      "visual_asset": {
        "alt_text": "Editorial hantavirus plate focused on Andean ecology and exposure settings.",
        "asset_id": "atlas-hantavirus-hero",
        "editorial_note": "Emphasize ecology and uncertainty instead of fear-bait.",
        "negative_prompt": "horror movie poster, dripping blood, cartoon rat, glossy medical brochure",
        "output_path": "graphics/atlas/generated/hantavirus-hero.png",
        "pathogen_slug": "hantavirus",
        "prompt": "Hantavirus atlas plate with Andean landscape textures, rodent-ecology cues, cabin and rural exposure motifs, scientific editorial collage, restrained and eerie, not horror.",
        "source_mode": "gpt-image-2",
        "status": "pending",
        "surface": "hero"
      },
      "visual_asset_id": "atlas-hantavirus-hero",
      "why_it_matters": "It forces the atlas to behave like an encyclopedia rather than a single-route animation and keeps us honest about host ecology, geography, and syndrome differences.",
      "writing_state": "direct",
      "color": "#7aa96b",
      "category": "rodent-environmental",
      "category_label": "Rodent-borne / environmental",
      "transmission_group": "Rodent-borne / environmental",
      "status_label": "Mixed / debated",
      "writing_state_label": "Written here directly",
      "reference_href": "../../reference/hantavirus-syndrome.html"
    },
    {
      "atlas_scope": "Asian origin framing with modern vector-driven global expansion",
      "atlas_url": "atlas.html?pathogen=dengue",
      "citation_count": 3,
      "citations": [
        {
          "claim_supported": "Global Aedes expansion, shipping, urbanization, and climate-linked spread.",
          "id": "dengue-handbook",
          "note": "Combines the emerging infections and climate chapters.",
          "short_citation": "Wilson ME, Petersen E, Koopmans MP; Khatib AN, Matsee W, Semenza JC. Emerging infections and climate change chapters. In Routledge Handbook of Infectious Diseases: A Geographical Guide. 2025.",
          "url": "https://doi.org/10.4324/9781003531425"
        },
        {
          "claim_supported": "Vector spread and the transport routes that underpin dengue range expansion.",
          "id": "dengue-kraemer",
          "note": "Vector map paper more than a virus paper, which is exactly why it belongs here.",
          "short_citation": "Kraemer MUG, Reiner RC Jr, Brady OJ et al. Past and future spread of the arbovirus vectors Aedes aegypti and Aedes albopictus. Nat Microbiol. 2019.",
          "url": "https://doi.org/10.1038/s41564-019-0376-y"
        },
        {
          "claim_supported": "Modern geographic spread and population-at-risk framing.",
          "id": "dengue-messina",
          "note": "Strong for the modern echo layer.",
          "short_citation": "Messina JP, Brady OJ, Golding N et al. The current and future global distribution and population at risk of dengue. Nat Microbiol. 2019.",
          "url": "https://doi.org/10.1038/s41564-019-0476-8"
        }
      ],
      "default_variant_slug": "",
      "framing_traps": [
        "Do not confuse imported cases with sustained local transmission.",
        "Do not write dengue as though the virus moves independently of the mosquito layer."
      ],
      "linked_blog_posts": [],
      "linked_reference_slug": "dengue",
      "linked_story_ids": [],
      "modern_echoes": [
        "A reader looking at southern Europe, Oman, or the southern United States is really looking at vector geography, not just imported human cases.",
        "Dengue maps are increasingly climate and infrastructure maps."
      ],
      "name": "Dengue",
      "origin_claim": {
        "confidence": "moderate",
        "coordinates": [
          103.8,
          1.35
        ],
        "date_or_era": "Modern endemic framing consolidated in twentieth-century tropical Asia",
        "label": "South-East Asian and western Pacific transmission zone",
        "narrative": "Dengue's deeper origin is more diffuse than yellow fever's, but the strongest modern atlas frame places sustained amplification in tropical Asia before wide contemporary global expansion."
      },
      "pathogen_type": "Virus",
      "reference_name": "Dengue",
      "reference_url": "reference/dengue.html",
      "reference_web_path": "reference/dengue.html",
      "related_stories": [
        {
          "display_title": "Dengue and arboviruses",
          "latest_update_summary": "Baseline snapshot created with 3 clustered item(s) across 3 source(s).",
          "story_id": "story_ccfeaff28d46baf6",
          "story_url": "stories/story_ccfeaff28d46baf6-dengue-and-arboviruses.html",
          "story_web_path": "stories/story_ccfeaff28d46baf6-dengue-and-arboviruses.html",
          "story_href": "../../stories/story_ccfeaff28d46baf6-dengue-and-arboviruses.html"
        }
      ],
      "route_count": 3,
      "slug": "dengue",
      "spread_routes": [
        {
          "citation_ids": [
            "dengue-handbook",
            "dengue-kraemer",
            "dengue-messina"
          ],
          "confidence": "moderate",
          "date_or_era": "Twentieth century onward",
          "from_coordinates": [
            103.8,
            1.35
          ],
          "from_label": "Southeast Asian urban-vector systems",
          "narrative": "Rapid urbanization and dense Aedes-human contact zones helped dengue expand across connected Asian cities.",
          "route_id": "dengue-asia-indian-ocean",
          "route_type": "urban_vector",
          "to_coordinates": [
            72.88,
            19.08
          ],
          "to_label": "Indian Ocean and South Asia circuits"
        },
        {
          "citation_ids": [
            "dengue-handbook",
            "dengue-kraemer"
          ],
          "confidence": "moderate",
          "date_or_era": "Late twentieth to twenty-first century",
          "from_coordinates": [
            103.8,
            1.35
          ],
          "from_label": "Asian transmission networks",
          "narrative": "Global traffic and Aedes expansion turned dengue into a recurring hemispheric travel-plus-vector story.",
          "route_id": "dengue-asia-americas",
          "route_type": "travel_and_vector",
          "to_coordinates": [
            -66.1,
            18.4
          ],
          "to_label": "Caribbean and the Americas"
        },
        {
          "citation_ids": [
            "dengue-handbook",
            "dengue-kraemer"
          ],
          "confidence": "strong",
          "date_or_era": "Contemporary spread",
          "from_coordinates": [
            120.0,
            14.6
          ],
          "from_label": "Used tire and shipping routes",
          "narrative": "The spread of Aedes albopictus through shipping and the used-tire trade is a core modern map mechanism for dengue risk expansion.",
          "route_id": "dengue-global-aedes",
          "route_type": "vector_transport",
          "to_coordinates": [
            2.35,
            48.85
          ],
          "to_label": "Temperate-edge vector establishment"
        }
      ],
      "status": "consensus",
      "story_count": 1,
      "subtitle": "Aedes routes, urbanization, and shipping-enabled vector expansion",
      "summary": "Dengue makes the atlas useful for modern readers because it shows how vector range expansion, used-tire shipping, urbanization, and travel can redraw the map without requiring a single ancient origin story.",
      "variant_count": 0,
      "variants": [],
      "visual_asset": {
        "alt_text": "Editorial dengue plate connecting vector spread, shipping, and urban risk.",
        "asset_id": "atlas-dengue-hero",
        "editorial_note": "Make the vector and urban systems feel structural rather than decorative.",
        "negative_prompt": "mosquito cartoon, tropical travel ad, overbright app mockup",
        "output_path": "graphics/atlas/generated/dengue-hero.png",
        "pathogen_slug": "dengue",
        "prompt": "Dengue atlas editorial plate with urban heat, Aedes route overlays, shipping and used-tire transport cues, clean museum-atlas style, sophisticated newspaper graphic look.",
        "source_mode": "gpt-image-2",
        "status": "pending",
        "surface": "hero"
      },
      "visual_asset_id": "atlas-dengue-hero",
      "why_it_matters": "It turns the atlas toward contemporary global change instead of leaving it stranded in historical imperial routes.",
      "writing_state": "not_yet_written",
      "color": "#c9a84c",
      "category": "mosquito-borne",
      "category_label": "Mosquito-borne / arboviral",
      "transmission_group": "Mosquito-borne / arboviral",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/dengue.html"
    },
    {
      "atlas_scope": "Ancient African-rooted burden with colonial and modern climate-vector redistribution",
      "atlas_url": "atlas.html?pathogen=malaria",
      "citation_count": 4,
      "citations": [
        {
          "claim_supported": "Historical global spread, colonial and travel-linked malaria geography, and climate-linked transmission shifts.",
          "id": "malaria-handbook",
          "note": "Core geography-first secondary source.",
          "short_citation": "Tuan JJ, Cox FEG, Bia FJ; Wilson ME, Petersen E, Koopmans MP; Khatib AN, Matsee W, Semenza JC. Historical overview, emerging infections, and climate change chapters. In Routledge Handbook of Infectious Diseases: A Geographical Guide. 2025.",
          "url": "https://doi.org/10.4324/9781003531425"
        },
        {
          "claim_supported": "Deep historical burden and long-run geographic framing of malaria.",
          "id": "malaria-carter",
          "note": "Standard historical review.",
          "short_citation": "Carter R, Mendis KN. Evolutionary and historical aspects of the burden of malaria. Clin Microbiol Rev. 2002.",
          "url": "https://doi.org/10.1128/CMR.15.4.564-594.2002"
        },
        {
          "claim_supported": "Reintroduction and airport-malaria framing in nonendemic settings.",
          "id": "malaria-airport",
          "note": "Useful for modern travel-linked route interpretation.",
          "short_citation": "Van den Ende J, Lynen L, Elsen P et al. A cluster of airport malaria in Belgium in 1995. Acta Clin Belg. 1998.",
          "url": "https://pubmed.ncbi.nlm.nih.gov/9581493/"
        },
        {
          "claim_supported": "Climatic suitability shifts and future geographic redistribution.",
          "id": "malaria-mordecai",
          "note": "Strong modern climate-geography framing.",
          "short_citation": "Mordecai EA, Ryan SJ, Caldwell JM et al. Climate change could shift disease burden from malaria to arboviruses in Africa. Lancet Planet Health. 2020.",
          "url": "https://doi.org/10.1016/S2542-5196(20)30178-9"
        }
      ],
      "default_variant_slug": "",
      "framing_traps": [
        "Do not write malaria as one organism with one stable global route.",
        "Do not confuse imported malaria with reestablished local transmission."
      ],
      "linked_blog_posts": [
        {
          "published_at": "2026-02-14",
          "relation": "historical_essay",
          "title": "Disease in the Early Colonies: Pre-Revolutionary War Disease Ecology and Outbreaks",
          "url": "https://theedgeofepidemiology.substack.com/p/disease-in-the-early-colonies-pre"
        },
        {
          "published_at": "2025-10-28",
          "relation": "adjacent_context",
          "title": "Humanity\u2019s Deadliest Companions: Checking the Till on the Deadliest Microbes in History",
          "url": "https://theedgeofepidemiology.substack.com/p/humanitys-deadliest-companions-checking"
        }
      ],
      "linked_reference_slug": "malaria",
      "linked_story_ids": [],
      "modern_echoes": [
        "Malaria maps are always partly maps of vectors, prophylaxis, and health-system reach rather than just case counts.",
        "The contemporary question is often reintroduction or shifting suitability, not simply ancient endemic burden."
      ],
      "name": "Malaria",
      "origin_claim": {
        "confidence": "moderate",
        "coordinates": [
          20.0,
          2.0
        ],
        "date_or_era": "Ancient human-parasite history with later species-specific dispersal",
        "label": "Deep African and Old World malaria ecologies",
        "narrative": "The broadest consensus places the deepest burden and evolutionary importance of falciparum malaria in Africa, while the wider human malaria story includes multiple Plasmodium species with different dispersal histories."
      },
      "pathogen_type": "Protozoan parasite",
      "reference_name": "Malaria",
      "reference_url": "reference/malaria.html",
      "reference_web_path": "reference/malaria.html",
      "related_stories": [],
      "route_count": 3,
      "slug": "malaria",
      "spread_routes": [
        {
          "citation_ids": [
            "malaria-handbook",
            "malaria-carter"
          ],
          "confidence": "moderate",
          "date_or_era": "Early modern Atlantic world",
          "from_coordinates": [
            1.0,
            6.0
          ],
          "from_label": "African malaria ecologies",
          "narrative": "Enslavement, shipping, and mosquito-suitable plantation ecologies helped entrench malaria across the Atlantic world.",
          "route_id": "malaria-africa-atlantic",
          "route_type": "maritime_vector_human",
          "to_coordinates": [
            -75.0,
            18.0
          ],
          "to_label": "Caribbean and American plantation zones"
        },
        {
          "citation_ids": [
            "malaria-handbook",
            "malaria-mordecai"
          ],
          "confidence": "moderate",
          "date_or_era": "Colonial and modern settlement shifts",
          "from_coordinates": [
            38.7,
            8.9
          ],
          "from_label": "Tropical and subtropical lowland zones",
          "narrative": "Malaria repeatedly advanced or retreated with irrigation, settlement, transport, and temperature, making altitude and land-use change central to its map.",
          "route_id": "malaria-colonial-lowlands-highlands",
          "route_type": "vector_ecology",
          "to_coordinates": [
            39.7,
            13.5
          ],
          "to_label": "Highland and frontier expansion areas"
        },
        {
          "citation_ids": [
            "malaria-handbook",
            "malaria-airport"
          ],
          "confidence": "moderate",
          "date_or_era": "Contemporary travel and migration era",
          "from_coordinates": [
            32.5,
            0.3
          ],
          "from_label": "Endemic African and Asian transmission zones",
          "narrative": "Modern malaria news often turns on imported cases, airport malaria, or local receptivity where competent Anopheles mosquitoes still exist.",
          "route_id": "malaria-endemic-nonendemic-travel",
          "route_type": "travel_and_receptivity",
          "to_coordinates": [
            10.0,
            48.0
          ],
          "to_label": "Europe and North America reintroduction risk"
        }
      ],
      "status": "mixed",
      "story_count": 0,
      "subtitle": "Anopheles ecologies, empire, labor, and the long retreat and return of a mosquito-borne world disease",
      "summary": "Malaria belongs in the atlas because it shows how vector ecology, land use, labor systems, altitude, war, and climate can redraw disease geography across centuries without one neat origin story doing all the work.",
      "variant_count": 0,
      "variants": [],
      "visual_asset": {},
      "visual_asset_id": "atlas-malaria-hero",
      "why_it_matters": "It keeps the atlas from becoming virus-only and forces a map grammar built around mosquitoes, species differences, and ecological receptivity.",
      "writing_state": "adjacent",
      "color": "#5abf7c",
      "category": "mosquito-borne",
      "category_label": "Mosquito-borne / parasitic",
      "transmission_group": "Mosquito-borne / parasitic",
      "status_label": "Mixed / debated",
      "writing_state_label": "Adjacent writing",
      "reference_href": "../../reference/malaria.html"
    },
    {
      "atlas_scope": "Deep human coexpansion with industrial, colonial, and migration-linked redistribution",
      "atlas_url": "atlas.html?pathogen=tuberculosis",
      "citation_count": 5,
      "citations": [
        {
          "claim_supported": "Historical burden, industrial-era spread, and geopolitical significance of tuberculosis.",
          "id": "tb-handbook",
          "note": "Geography-first anchor source.",
          "short_citation": "Tuan JJ, Cox FEG, Bia FJ. Historical overview of global infectious diseases and geopolitics. In Routledge Handbook of Infectious Diseases: A Geographical Guide. 2025.",
          "url": "https://doi.org/10.4324/9781003531425"
        },
        {
          "claim_supported": "Deep origin and coexpansion framework for MTBC.",
          "id": "tb-comas",
          "note": "Core genomic origin paper.",
          "short_citation": "Comas I, Coscolla M, Luo T et al. Out-of-Africa migration and Neolithic coexpansion of Mycobacterium tuberculosis with modern humans. Nat Genet. 2013.",
          "url": "https://doi.org/10.1038/ng.2744"
        },
        {
          "claim_supported": "Migration-linked modern European TB policy and MDR concerns.",
          "id": "tb-migration",
          "note": "Good modern route/policy bridge.",
          "short_citation": "Hargreaves S, L\u00f6nnroth K, Nellums LB et al. Multidrug-resistant tuberculosis and migration to Europe. Clin Microbiol Infect. 2017.",
          "url": "https://doi.org/10.1016/j.cmi.2017.02.010"
        },
        {
          "claim_supported": "Contemporary burden and global control context.",
          "id": "tb-who",
          "note": "Official baseline for current burden.",
          "short_citation": "World Health Organization. Global tuberculosis report 2025.",
          "url": "https://www.who.int/teams/global-tuberculosis-programme/tb-reports"
        },
        {
          "claim_supported": "Industrial-era urban tuberculosis and social framing.",
          "id": "tb-white-plague",
          "note": "Historical context source for the white-plague period.",
          "short_citation": "Dubos R, Dubos J. The White Plague: Tuberculosis, Man, and Society. Rutgers University Press. 1952.",
          "url": "https://archive.org/details/whiteplaguetuber0000dubo"
        }
      ],
      "default_variant_slug": "",
      "framing_traps": [
        "Do not write tuberculosis as a disease of the past just because its nineteenth-century urban iconography is familiar.",
        "Do not reduce TB geography to migrants while ignoring prisons, mines, homelessness, and weak treatment systems."
      ],
      "linked_blog_posts": [
        {
          "published_at": "2026-03-27",
          "relation": "deep_dive",
          "title": "The White Plague Returns?: Tuberculosis and the Fragility of Public Health (The Pathogen Dispatch)",
          "url": "https://theedgeofepidemiology.substack.com/p/the-white-plague-returns-tuberculosis"
        }
      ],
      "linked_reference_slug": "untitled",
      "linked_story_ids": [],
      "modern_echoes": [
        "A TB map is usually a map of crowding, incarceration, poverty, migration screening, and treatment failure rather than a map of dramatic emergence.",
        "MDR and XDR TB turn ordinary travel and migration corridors into policy flashpoints."
      ],
      "name": "Tuberculosis",
      "origin_claim": {
        "confidence": "moderate",
        "coordinates": [
          25.0,
          3.0
        ],
        "date_or_era": "Deep premodern origin with Neolithic and later human dispersal",
        "label": "African human-associated origin with later Eurasian and global coexpansion",
        "narrative": "Modern genomic work supports an African origin for the MTBC followed by dispersal with human populations, but the later epidemiologic story is built in cities, mines, barracks, prisons, and migration corridors."
      },
      "pathogen_type": "Bacterium",
      "reference_name": "",
      "reference_url": "",
      "reference_web_path": "",
      "related_stories": [],
      "route_count": 3,
      "slug": "tuberculosis",
      "spread_routes": [
        {
          "citation_ids": [
            "tb-comas",
            "tb-handbook"
          ],
          "confidence": "moderate",
          "date_or_era": "Prehistory to Neolithic coexpansion",
          "from_coordinates": [
            25.0,
            3.0
          ],
          "from_label": "Early African human populations",
          "narrative": "Tuberculosis did not need empire to spread the first time; it rode with human movement and settlement long before modern surveillance existed.",
          "route_id": "tb-out-of-africa",
          "route_type": "human_migration",
          "to_coordinates": [
            35.0,
            39.0
          ],
          "to_label": "Eurasian settlement zones"
        },
        {
          "citation_ids": [
            "tb-handbook",
            "tb-white-plague"
          ],
          "confidence": "strong",
          "date_or_era": "Eighteenth to twentieth centuries",
          "from_coordinates": [
            7.0,
            48.0
          ],
          "from_label": "Rural-to-urban migration",
          "narrative": "The white-plague map is a crowding map: factories, tenements, prisons, workhouses, and other poorly ventilated spaces turned tuberculosis into a signature disease of industrial inequality.",
          "route_id": "tb-industrial-europe",
          "route_type": "crowding_and_industry",
          "to_coordinates": [
            -0.1,
            51.5
          ],
          "to_label": "Industrial European and North American cities"
        },
        {
          "citation_ids": [
            "tb-handbook",
            "tb-migration",
            "tb-who"
          ],
          "confidence": "moderate",
          "date_or_era": "Contemporary era",
          "from_coordinates": [
            78.9,
            22.0
          ],
          "from_label": "High-burden transmission regions",
          "narrative": "Modern tuberculosis geography is shaped by migration, HIV, drug resistance, and whether receiving health systems can diagnose and sustain treatment.",
          "route_id": "tb-migration-modern",
          "route_type": "migration_and_health_system",
          "to_coordinates": [
            8.5,
            50.0
          ],
          "to_label": "Europe and North America migration and screening corridors"
        }
      ],
      "status": "mixed",
      "story_count": 0,
      "subtitle": "Human coexpansion, crowding, industry, migration, and the stubborn durability of airborne inequality",
      "summary": "Tuberculosis belongs in the atlas because it is both ancient and modern at once: a human co-traveler that thrives in crowding, poverty, institutional confinement, and uneven public health capacity.",
      "variant_count": 0,
      "variants": [],
      "visual_asset": {},
      "visual_asset_id": "atlas-tuberculosis-hero",
      "why_it_matters": "It turns the atlas toward chronic structural transmission instead of one spectacular frontier jump.",
      "writing_state": "direct",
      "color": "#d98e5f",
      "category": "airborne-respiratory",
      "category_label": "Airborne / respiratory",
      "transmission_group": "Airborne / respiratory",
      "status_label": "Mixed / debated",
      "writing_state_label": "Written here directly"
    },
    {
      "atlas_scope": "Central Asian reservoir framing with Justinianic, Black Death, and third-pandemic routes",
      "atlas_url": "atlas.html?pathogen=plague",
      "citation_count": 4,
      "citations": [
        {
          "claim_supported": "Justinianic plague, Black Death, Greenland, and the later port-disease framing.",
          "id": "plague-handbook",
          "note": "Geography-first historical synthesis.",
          "short_citation": "Tuan JJ, Cox FEG, Bia FJ. Historical overview of global infectious diseases and geopolitics. In Routledge Handbook of Infectious Diseases: A Geographical Guide. 2025.",
          "url": "https://doi.org/10.4324/9781003531425"
        },
        {
          "claim_supported": "Reservoir ecology, transmission mechanisms, and long-run plague history.",
          "id": "plague-stenseth",
          "note": "Broad modern synthesis.",
          "short_citation": "Stenseth NC, Atshabar BB, Begon M et al. Plague: Past, present, and future. PLoS Med. 2008.",
          "url": "https://doi.org/10.1371/journal.pmed.0050003"
        },
        {
          "claim_supported": "Genomic confirmation and modern reconstruction of Black Death plague.",
          "id": "plague-bos",
          "note": "Landmark ancient-DNA paper.",
          "short_citation": "Bos KI, Schuenemann VJ, Golding GB et al. A draft genome of Yersinia pestis from victims of the Black Death. Nature. 2011.",
          "url": "https://doi.org/10.1038/nature10549"
        },
        {
          "claim_supported": "Third-pandemic port spread and the broader narrative of recurring plague waves.",
          "id": "plague-third-pandemic",
          "note": "Useful summary source for the later port era.",
          "short_citation": "Frith J. The history of plague - Part 1. The three great pandemics. J Mil Vet Health. 2012.",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3679557/"
        }
      ],
      "default_variant_slug": "",
      "framing_traps": [
        "Do not write every historical plague narrative as equally well established; the genomic and documentary evidence is uneven across pandemics.",
        "Do not turn plague into pure medieval theater and ignore reservoir ecology."
      ],
      "linked_blog_posts": [
        {
          "published_at": "2026-04-01",
          "relation": "historical_essay",
          "title": "Did the Vikings Bring Plague Across the North Sea? Norse Voyages, Infectious Disease, and the North Atlantic",
          "url": "https://theedgeofepidemiology.substack.com/p/did-the-vikings-bring-plague-across"
        }
      ],
      "linked_reference_slug": "untitled",
      "linked_story_ids": [],
      "modern_echoes": [
        "Plague still matters because reservoir ecology in places like Madagascar and the western United States can still produce real outbreaks.",
        "The modern lesson is less apocalypse than the durability of zoonotic reservoirs and infrastructural vulnerability."
      ],
      "name": "Plague",
      "origin_claim": {
        "confidence": "moderate",
        "coordinates": [
          74.0,
          43.0
        ],
        "date_or_era": "Deep zoonotic reservoir history with repeated later human pandemic spillovers",
        "label": "Central Asian rodent-reservoir zone",
        "narrative": "The strongest broad frame places plague in Central Asian rodent reservoirs, with later eruptions into human trade and military networks rather than one single human-origin event."
      },
      "pathogen_type": "Bacterium",
      "reference_name": "",
      "reference_url": "",
      "reference_web_path": "",
      "related_stories": [],
      "route_count": 3,
      "slug": "plague",
      "spread_routes": [
        {
          "citation_ids": [
            "plague-handbook",
            "plague-stenseth"
          ],
          "confidence": "moderate",
          "date_or_era": "Fourteenth century pre-Black Death movement",
          "from_coordinates": [
            74.0,
            43.0
          ],
          "from_label": "Central Asian reservoir and caravan zones",
          "narrative": "Plague moved westward through overland and maritime trade interfaces before exploding into Mediterranean port cities.",
          "route_id": "plague-steppe-black-sea",
          "route_type": "caravan_and_port",
          "to_coordinates": [
            35.4,
            45.0
          ],
          "to_label": "Crimea and Black Sea trade ports"
        },
        {
          "citation_ids": [
            "plague-handbook",
            "plague-bos",
            "plague-stenseth"
          ],
          "confidence": "strong",
          "date_or_era": "1347 to 1353 Black Death",
          "from_coordinates": [
            35.4,
            45.0
          ],
          "from_label": "Kaffa / Black Sea",
          "narrative": "The Black Death route remains the most famous plague map: port to port, ship to city, then inland through dense human settlement.",
          "route_id": "plague-kaffa-mediterranean",
          "route_type": "maritime",
          "to_coordinates": [
            12.3,
            45.4
          ],
          "to_label": "Mediterranean ports and western Europe"
        },
        {
          "citation_ids": [
            "plague-handbook",
            "plague-stenseth",
            "plague-third-pandemic"
          ],
          "confidence": "strong",
          "date_or_era": "Late nineteenth to early twentieth century third pandemic",
          "from_coordinates": [
            114.2,
            22.3
          ],
          "from_label": "South China and Hong Kong",
          "narrative": "The third pandemic made plague legible as a modern port disease moving through rats, ships, and urban infrastructure.",
          "route_id": "plague-third-pandemic",
          "route_type": "steamship_and_port",
          "to_coordinates": [
            72.88,
            19.08
          ],
          "to_label": "Bombay, San Francisco, Sydney, and other global ports"
        }
      ],
      "status": "mixed",
      "story_count": 0,
      "subtitle": "Steppe reservoirs, siege and shipping, and the repeated collision of rodents, fleas, and empire",
      "summary": "Plague belongs in the atlas because it is one of the clearest historical demonstrations that reservoir ecology, trade corridors, warfare, and maritime ports can repeatedly rewire a continent.",
      "variant_count": 0,
      "variants": [],
      "visual_asset": {},
      "visual_asset_id": "atlas-plague-hero",
      "why_it_matters": "It lets the atlas bridge deep historical fear, genomic reconstruction, and the very practical map logic of rodents, fleas, and ports.",
      "writing_state": "adjacent",
      "color": "#b9754f",
      "category": "flea-louse-mite-borne",
      "category_label": "Flea, louse, and mite-borne",
      "transmission_group": "Flea, louse, and mite-borne",
      "status_label": "Mixed / debated",
      "writing_state_label": "Adjacent writing"
    },
    {
      "slug": "zika-virus-disease",
      "name": "Zika virus disease",
      "subtitle": "Aedes ecology, Pacific jumps, pregnancy surveillance, and sexual transmission",
      "status": "mixed",
      "pathogen_type": "Virus",
      "summary": "A mosquito-borne flavivirus whose modern importance comes from congenital risk, urban Aedes habitat, travel, and sexual transmission.",
      "why_it_matters": "It forces the atlas to keep vector ecology and reproductive epidemiology in the same frame.",
      "atlas_scope": "Aedes mosquito expansion, pregnancy risk, and the 2015-2016 congenital-malformation crisis",
      "origin_claim": {
        "label": "Zika Forest / East African discovery frame",
        "coordinates": [
          32.5,
          1.5
        ],
        "date_or_era": "First identified in Uganda in 1947; later urban and transoceanic expansion",
        "confidence": "mixed",
        "narrative": "The cautious origin frame is East African discovery and sylvatic Aedes-primate ecology, not a single clean birthplace for modern Zika.",
        "citation_ids": [
          "zika-cdc"
        ]
      },
      "spread_routes": [
        {
          "route_id": "zika-africa-asia",
          "from_label": "East Africa",
          "to_label": "Equatorial Asia",
          "from_coordinates": [
            32.5,
            1.5
          ],
          "to_coordinates": [
            103.8,
            1.35
          ],
          "date_or_era": "Mid twentieth century recognition beyond Africa",
          "route_type": "spread",
          "confidence": "moderate",
          "narrative": "Serology and outbreaks moved Zika from a sylvatic curiosity into a wider Old World arbovirus map.",
          "citation_ids": [
            "zika-cdc",
            "zika-who"
          ]
        },
        {
          "route_id": "zika-pacific-americas",
          "from_label": "Pacific island outbreaks",
          "to_label": "Brazil and the Americas",
          "from_coordinates": [
            158.2,
            6.9
          ],
          "to_coordinates": [
            -47.9,
            -15.8
          ],
          "date_or_era": "2007-2016 Pacific and American expansion",
          "route_type": "aedes_urbanization",
          "confidence": "strong",
          "narrative": "Island outbreaks preceded explosive American spread, where congenital outcomes changed the political meaning of an arbovirus map.",
          "citation_ids": [
            "zika-cdc",
            "zika-who"
          ]
        }
      ],
      "modern_echoes": [
        "Modern Zika coverage still turns on travel, pregnancy counseling, mosquito suitability, and local transmission evidence.",
        "It shows how a mild infection can become historically important through one exposed subgroup."
      ],
      "framing_traps": [
        "Do not treat Zika as just another dengue-like fever; congenital risk changed the surveillance problem.",
        "Do not map Aedes presence as identical to sustained Zika transmission."
      ],
      "linked_reference_slug": "zika-virus-disease",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "zika-cdc",
          "short_citation": "CDC. Transmission of Zika Virus. 2025.",
          "url": "https://www.cdc.gov/zika/php/transmission/index.html",
          "claim_supported": "Aedes transmission, sylvatic and urban cycles, and congenital/sexual transmission.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "zika-who",
          "short_citation": "WHO Western Pacific. Zika virus fact sheet. 2025.",
          "url": "https://www.who.int/westernpacific/newsroom/fact-sheets/detail/zika-virus",
          "claim_supported": "Pregnancy risk, PHEIC history, and persistent low-level transmission.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Zika virus disease",
      "reference_url": "reference/zika-virus-disease.html",
      "reference_web_path": "reference/zika-virus-disease.html",
      "atlas_url": "atlas.html?pathogen=zika-virus-disease",
      "visual_asset": {},
      "visual_asset_id": "atlas-zika-virus-disease-hero",
      "category": "mosquito-borne",
      "category_label": "Mosquito-borne / arboviral",
      "transmission_group": "Mosquito-borne / arboviral",
      "color": "#5fb6a6",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/zika-virus-disease.html"
    },
    {
      "slug": "chikungunya",
      "name": "Chikungunya",
      "subtitle": "A fever-and-joint-pain arbovirus that follows Aedes habitat and immunologically naive populations",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "A mosquito-borne alphavirus whose spread tracks Aedes ecology, container water, travel, viral adaptation, and explosive outbreaks.",
      "why_it_matters": "It shows how mosquito ecology, viral adaptation, and human movement can rapidly change a disease map.",
      "atlas_scope": "Aedes urbanization from East Africa into Asia, islands, Europe, and the Americas",
      "origin_claim": {
        "label": "Tanzania / East African discovery setting",
        "coordinates": [
          39.2,
          -6.4
        ],
        "date_or_era": "First identified in Tanzania in 1952",
        "confidence": "strong",
        "narrative": "The first recognized chikungunya outbreak was in what is now Tanzania, followed by African and Asian circulation and wider Aedes-driven expansion.",
        "citation_ids": [
          "chik-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "chik-east-africa-asia",
          "from_label": "East Africa",
          "to_label": "Thailand and India",
          "from_coordinates": [
            39.2,
            -6.4
          ],
          "to_coordinates": [
            100.5,
            13.8
          ],
          "date_or_era": "1950s-1970s African and Asian recognition",
          "route_type": "aedes_urban",
          "confidence": "strong",
          "narrative": "Early recognized spread moved the virus into urban Asian outbreak settings.",
          "citation_ids": [
            "chik-who",
            "chik-cdc"
          ]
        },
        {
          "route_id": "chik-indian-ocean-americas",
          "from_label": "Indian Ocean outbreak zone",
          "to_label": "Caribbean and the Americas",
          "from_coordinates": [
            55.5,
            -21.1
          ],
          "to_coordinates": [
            -61.0,
            14.6
          ],
          "date_or_era": "2004 onward global expansion",
          "route_type": "travel_and_vector",
          "confidence": "strong",
          "narrative": "Travel, viral adaptation, and Aedes albopictus/aegypti distributions helped widen outbreak risk.",
          "citation_ids": [
            "chik-who",
            "chik-cdc"
          ]
        }
      ],
      "modern_echoes": [
        "Chikungunya now sits beside dengue and Zika in the diagnostic problem of overlapping Aedes-borne fever.",
        "New vaccines make it a moving target for travel medicine and outbreak preparedness."
      ],
      "framing_traps": [
        "Do not reduce chikungunya to dengue with joint pain; prolonged arthralgia changes burden.",
        "Do not imply that every Aedes region has equal current outbreak risk."
      ],
      "linked_reference_slug": "chikungunya",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "chik-who",
          "short_citation": "WHO. Chikungunya fact sheet. 2025.",
          "url": "https://www.who.int/en/news-room/fact-sheets/detail/chikungunya",
          "claim_supported": "First identification in Tanzania, Aedes transmission, and spread to more than 110 countries.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "chik-cdc",
          "short_citation": "CDC. Chikungunya Virus.",
          "url": "https://www.cdc.gov/chikungunya/",
          "claim_supported": "Clinical and public-health framing for chikungunya surveillance and prevention.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Chikungunya",
      "reference_url": "reference/chikungunya.html",
      "reference_web_path": "reference/chikungunya.html",
      "atlas_url": "atlas.html?pathogen=chikungunya",
      "visual_asset": {},
      "visual_asset_id": "atlas-chikungunya-hero",
      "category": "mosquito-borne",
      "category_label": "Mosquito-borne / arboviral",
      "transmission_group": "Mosquito-borne / arboviral",
      "color": "#d9a441",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/chikungunya.html"
    },
    {
      "slug": "west-nile-virus",
      "name": "West Nile virus",
      "subtitle": "A Culex-bird virus that turned into a North American seasonal surveillance system",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "West Nile maps best as an ecology of birds, Culex mosquitoes, horses, humans, wetlands, cities, and seasonal heat.",
      "why_it_matters": "It gives the atlas a clean ecological counterexample to human-centered epidemic maps.",
      "atlas_scope": "Bird-mosquito ecology, dead-end mammal hosts, and rapid North American establishment",
      "origin_claim": {
        "label": "West Nile district, Uganda discovery setting",
        "coordinates": [
          32.3,
          0.4
        ],
        "date_or_era": "First isolated in Uganda in 1937",
        "confidence": "strong",
        "narrative": "The name and earliest isolation anchor the virus in Uganda, but the practical atlas frame is the bird-mosquito cycle.",
        "citation_ids": [
          "wnv-cdc-transmission"
        ]
      },
      "spread_routes": [
        {
          "route_id": "wnv-uganda-mediterranean",
          "from_label": "Uganda discovery setting",
          "to_label": "Mediterranean and Middle East",
          "from_coordinates": [
            32.3,
            0.4
          ],
          "to_coordinates": [
            35.2,
            31.8
          ],
          "date_or_era": "Mid twentieth century Afro-Eurasian recognition",
          "route_type": "spread",
          "confidence": "moderate",
          "narrative": "West Nile became visible as a recurring bird-mosquito encephalitis signal across Afro-Eurasian wetlands and cities.",
          "citation_ids": [
            "wnv-cdc-transmission",
            "wnv-cdc-causes"
          ]
        },
        {
          "route_id": "wnv-new-york-americas",
          "from_label": "New York City introduction",
          "to_label": "Continental United States",
          "from_coordinates": [
            -73.9,
            40.7
          ],
          "to_coordinates": [
            -95.0,
            39.0
          ],
          "date_or_era": "1999 onward North American establishment",
          "route_type": "invasive_arbovirus",
          "confidence": "strong",
          "narrative": "After the 1999 New York outbreak, bird-mosquito transmission allowed the virus to establish across much of North America.",
          "citation_ids": [
            "wnv-cdc-transmission",
            "wnv-cdc-causes"
          ]
        }
      ],
      "modern_echoes": [
        "Modern surveillance depends on mosquito pools, bird ecology, horse cases, weather, and neuroinvasive disease reporting.",
        "The North American story is a rare modern example of continent-scale establishment visible within years."
      ],
      "framing_traps": [
        "Do not map human cases as the reservoir; humans and horses are usually dead-end hosts.",
        "Do not treat mosquito-borne diseases as one interchangeable category."
      ],
      "linked_reference_slug": "untitled",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "wnv-cdc-transmission",
          "short_citation": "CDC. Transmission of West Nile Virus. 2024.",
          "url": "https://www.cdc.gov/west-nile-virus/php/transmission/index.html",
          "claim_supported": "Culex-bird cycle, dead-end human and horse hosts, and rare non-mosquito routes.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "wnv-cdc-causes",
          "short_citation": "CDC. West Nile: Causes and How It Spreads. 2025.",
          "url": "https://www.cdc.gov/west-nile-virus/causes/index.html",
          "claim_supported": "West Nile as a flavivirus spread primarily by mosquitoes after feeding on infected birds.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "",
      "reference_url": "",
      "reference_web_path": "",
      "atlas_url": "atlas.html?pathogen=west-nile-virus",
      "visual_asset": {},
      "visual_asset_id": "atlas-west-nile-virus-hero",
      "category": "mosquito-borne",
      "category_label": "Mosquito-borne / arboviral",
      "transmission_group": "Mosquito-borne / arboviral",
      "color": "#8fbf5f",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet"
    },
    {
      "slug": "japanese-encephalitis",
      "name": "Japanese encephalitis",
      "subtitle": "Mosquitoes, pigs, water birds, rice landscapes, and childhood immunity",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "Japanese encephalitis turns the atlas toward agricultural ecology: Culex mosquitoes, pigs, water birds, rice cultivation, and vaccination.",
      "why_it_matters": "It is an atlas entry where land use and animal husbandry are the map, not background context.",
      "atlas_scope": "Rice agriculture, pigs, water birds, and Culex transmission across Asia",
      "origin_claim": {
        "label": "Japan / early documented clinical frame",
        "coordinates": [
          139.7,
          35.7
        ],
        "date_or_era": "First documented disease case in Japan in 1871",
        "confidence": "strong",
        "narrative": "The earliest documented clinical frame is Japan; endemic transmission now belongs to a wider South-East Asian and Western Pacific agricultural ecology.",
        "citation_ids": [
          "je-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "je-japan-east-asia",
          "from_label": "Japan",
          "to_label": "East and Southeast Asia",
          "from_coordinates": [
            139.7,
            35.7
          ],
          "to_coordinates": [
            121.5,
            25.0
          ],
          "date_or_era": "Late nineteenth to twentieth century recognition",
          "route_type": "regional_recognition",
          "confidence": "strong",
          "narrative": "Clinical recognition in Japan led into a wider Asian encephalitis map linked to Culex mosquitoes and amplifying hosts.",
          "citation_ids": [
            "je-who",
            "je-wpro"
          ]
        },
        {
          "route_id": "je-rice-pig-interface",
          "from_label": "Mekong and rice-growing Asia",
          "to_label": "South and South-East Asia",
          "from_coordinates": [
            105.8,
            21.0
          ],
          "to_coordinates": [
            78.9,
            22.9
          ],
          "date_or_era": "Modern endemic rural-periurban transmission",
          "route_type": "agricultural_ecology",
          "confidence": "strong",
          "narrative": "Rice agriculture, pigs, water birds, and seasonal mosquito abundance sustain modern risk geography.",
          "citation_ids": [
            "je-who",
            "je-wpro"
          ]
        }
      ],
      "modern_echoes": [
        "Vaccination policy is inseparable from geography because risk is concentrated where enzootic transmission is recognized.",
        "Climate, rice cultivation, and pig husbandry keep this disease in the atlas as an ecology problem."
      ],
      "framing_traps": [
        "Do not confuse Japanese encephalitis with direct human-to-human spread.",
        "Do not treat Asia as homogeneous; risk varies with ecology, season, vaccination, and exposure."
      ],
      "linked_reference_slug": "untitled",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "je-who",
          "short_citation": "WHO. Japanese encephalitis fact sheet. 2024.",
          "url": "https://www.who.int/en/news-room/fact-sheets/detail/japanese-encephalitis",
          "claim_supported": "Culex transmission, pig/water bird cycle, Asian distribution, and vaccine prevention.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "je-wpro",
          "short_citation": "WHO Western Pacific. Japanese encephalitis.",
          "url": "https://www.who.int/westernpacific/health-topics/japanese-encephalitis",
          "claim_supported": "Regional public-health framing and severity in the Western Pacific.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "",
      "reference_url": "",
      "reference_web_path": "",
      "atlas_url": "atlas.html?pathogen=japanese-encephalitis",
      "visual_asset": {},
      "visual_asset_id": "atlas-japanese-encephalitis-hero",
      "category": "mosquito-borne",
      "category_label": "Mosquito-borne / arboviral",
      "transmission_group": "Mosquito-borne / arboviral",
      "color": "#6fa8dc",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet"
    },
    {
      "slug": "poliomyelitis",
      "name": "Poliomyelitis",
      "subtitle": "An eradication-era virus shaped by immunity gaps, sanitation, and surveillance",
      "status": "mixed",
      "pathogen_type": "Virus",
      "summary": "Polio is now a map of fecal-oral transmission, under-immunization, environmental surveillance, and eradication politics.",
      "why_it_matters": "It turns the atlas toward the geography of eradication, not only emergence.",
      "atlas_scope": "Fecal-oral transmission, eradication, and the infrastructure of surveillance",
      "origin_claim": {
        "label": "Modern endemic Afghanistan-Pakistan frame",
        "coordinates": [
          67.0,
          30.0
        ],
        "date_or_era": "Ancient disease with modern endemic strongholds in Afghanistan and Pakistan",
        "confidence": "mixed",
        "narrative": "Deep origin is not usefully reduced to one point; the practical frame is modern persistence in remaining endemic and vaccine-derived transmission zones.",
        "citation_ids": [
          "polio-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "polio-endemic-crossborder",
          "from_label": "Pakistan-Afghanistan border region",
          "to_label": "Cross-border transmission zones",
          "from_coordinates": [
            67.0,
            30.0
          ],
          "to_coordinates": [
            69.2,
            34.5
          ],
          "date_or_era": "Late twentieth to twenty-first century endemic persistence",
          "route_type": "eradication_frontier",
          "confidence": "strong",
          "narrative": "The remaining wild-poliovirus map is shaped by mobility, conflict, vaccination access, and environmental detection.",
          "citation_ids": [
            "polio-who",
            "polio-who-topic"
          ]
        },
        {
          "route_id": "polio-global-eradication",
          "from_label": "Former high-burden countries",
          "to_label": "Global elimination campaigns",
          "from_coordinates": [
            7.5,
            9.0
          ],
          "to_coordinates": [
            0.0,
            20.0
          ],
          "date_or_era": "1988 onward global eradication campaign",
          "route_type": "eradication",
          "confidence": "strong",
          "narrative": "Mass vaccination and surveillance collapsed the global wild-polio map from more than 125 endemic countries to final hard-to-reach zones.",
          "citation_ids": [
            "polio-who",
            "polio-who-topic"
          ]
        }
      ],
      "modern_echoes": [
        "Polio remains a daily lesson that \u201calmost eradicated\u201d is still geographically fragile.",
        "Wastewater and acute flaccid paralysis surveillance make invisible transmission visible."
      ],
      "framing_traps": [
        "Do not imply wild poliovirus origin is the same as present-day endemic persistence.",
        "Do not ignore vaccine-derived poliovirus in modern polio geography."
      ],
      "linked_reference_slug": "poliomyelitis-cvdpv2",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "polio-who",
          "short_citation": "WHO. Poliomyelitis fact sheet. 2025.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/poliomyelitis",
          "claim_supported": "Fecal-oral transmission, >99% reduction since 1988, remaining endemic countries, and eradication framing.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "polio-who-topic",
          "short_citation": "WHO. Poliomyelitis health topic.",
          "url": "https://www.who.int/topics/poliomyelitis/en/",
          "claim_supported": "Global Polio Eradication Initiative and vaccine-preventable disease context.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Poliomyelitis",
      "reference_url": "reference/poliomyelitis-cvdpv2.html",
      "reference_web_path": "reference/poliomyelitis-cvdpv2.html",
      "atlas_url": "atlas.html?pathogen=poliomyelitis",
      "visual_asset": {},
      "visual_asset_id": "atlas-poliomyelitis-hero",
      "category": "fecal-oral-waterborne",
      "category_label": "Fecal-oral / waterborne",
      "transmission_group": "Fecal-oral / waterborne",
      "color": "#7c9fd1",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/poliomyelitis-cvdpv2.html"
    },
    {
      "slug": "hepatitis-a",
      "name": "Hepatitis A",
      "subtitle": "A fecal-oral virus that maps sanitation, food systems, travel, and adult susceptibility",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "Hepatitis A shows how improving sanitation can shift symptomatic disease into older, more vulnerable age groups.",
      "why_it_matters": "It adds a disease where modernization changes who gets sick, not simply how much disease exists.",
      "atlas_scope": "Food, water, sanitation, travel, and cyclic outbreak recurrence",
      "origin_claim": {
        "label": "Global sanitation-gradient frame",
        "coordinates": [
          30.0,
          20.0
        ],
        "date_or_era": "Worldwide fecal-oral infection; modern endemicity follows sanitation gradients",
        "confidence": "mixed",
        "narrative": "The useful frame is a worldwide fecal-oral virus whose disease burden changes with childhood exposure, sanitation, vaccination, and travel.",
        "citation_ids": [
          "hav-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "hav-high-low-endemicity",
          "from_label": "High-endemicity childhood exposure settings",
          "to_label": "Low-endemicity susceptible adult settings",
          "from_coordinates": [
            30.0,
            20.0
          ],
          "to_coordinates": [
            -95.0,
            37.0
          ],
          "date_or_era": "Modern sanitation transition",
          "route_type": "spread",
          "confidence": "moderate",
          "narrative": "Sanitation transitions can move populations from early childhood infection toward outbreaks among susceptible adolescents and adults.",
          "citation_ids": [
            "hav-who",
            "hav-cdc"
          ]
        },
        {
          "route_id": "hav-food-water-outbreaks",
          "from_label": "Contaminated food-water outbreaks",
          "to_label": "Urban outbreak response settings",
          "from_coordinates": [
            121.5,
            31.2
          ],
          "to_coordinates": [
            -74.0,
            40.7
          ],
          "date_or_era": "Food and waterborne outbreak movement",
          "route_type": "food_water",
          "confidence": "strong",
          "narrative": "Food, water, and close-contact outbreaks can move hepatitis A into settings where adult immunity gaps exist.",
          "citation_ids": [
            "hav-who",
            "hav-cdc"
          ]
        }
      ],
      "modern_echoes": [
        "Large adult outbreaks in high-income countries often reveal homelessness, drug-use networks, food contamination, or travel.",
        "It bridges sanitation history and modern vaccine policy."
      ],
      "framing_traps": [
        "Do not treat hepatitis A like hepatitis B or C; it does not produce chronic infection.",
        "Do not map endemicity as moral failure; it is infrastructure, exposure age, and vaccine access."
      ],
      "linked_reference_slug": "hepatitis-a",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "hav-who",
          "short_citation": "WHO. Hepatitis A fact sheet. 2025.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/hepatitis-a",
          "claim_supported": "Fecal-oral transmission, sanitation gradient, food/water outbreaks, and vaccine prevention.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "hav-cdc",
          "short_citation": "CDC. Clinical Overview of Hepatitis A. 2025.",
          "url": "https://www.cdc.gov/hepatitis-a/hcp/clinical-overview/index.html",
          "claim_supported": "Clinical and public-health overview including fecal-oral transmission and vaccination.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Hepatitis A",
      "reference_url": "reference/hepatitis-a.html",
      "reference_web_path": "reference/hepatitis-a.html",
      "atlas_url": "atlas.html?pathogen=hepatitis-a",
      "visual_asset": {},
      "visual_asset_id": "atlas-hepatitis-a-hero",
      "category": "fecal-oral-waterborne",
      "category_label": "Fecal-oral / waterborne",
      "transmission_group": "Fecal-oral / waterborne",
      "color": "#c9b56b",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/hepatitis-a.html"
    },
    {
      "slug": "typhoid-fever",
      "name": "Typhoid fever",
      "subtitle": "A Salmonella Typhi map of unsafe water, food systems, carriers, and resistant lineages",
      "status": "mixed",
      "pathogen_type": "Bacterium",
      "summary": "Typhoid follows infrastructure: water safety, sanitation, food handling, urban crowding, carriers, and antibiotic pressure.",
      "why_it_matters": "It connects nineteenth-century sanitation lessons to twenty-first-century antimicrobial resistance.",
      "atlas_scope": "Water, sanitation, antimicrobial resistance, and urban enteric disease",
      "origin_claim": {
        "label": "South Asian high-burden modern frame",
        "coordinates": [
          78.0,
          22.0
        ],
        "date_or_era": "Ancient human-adapted enteric disease; modern burden concentrated where water and sanitation are weak",
        "confidence": "mixed",
        "narrative": "The deep history is human and old, but the modern frame is high burden in South Asia and sub-Saharan Africa with antimicrobial resistance.",
        "citation_ids": [
          "typhoid-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "typhoid-water-sanitation",
          "from_label": "South Asian endemic settings",
          "to_label": "East African urbanizing settings",
          "from_coordinates": [
            78.0,
            22.0
          ],
          "to_coordinates": [
            31.0,
            0.0
          ],
          "date_or_era": "Modern endemic enteric belt",
          "route_type": "water_sanitation",
          "confidence": "strong",
          "narrative": "Unsafe drinking water and inadequate sanitation sustain high-burden transmission across urban and periurban settings.",
          "citation_ids": [
            "typhoid-who",
            "typhoid-cdc-yellowbook"
          ]
        },
        {
          "route_id": "typhoid-travel-amr",
          "from_label": "South Asian resistant-lineage settings",
          "to_label": "Travel-associated receiving countries",
          "from_coordinates": [
            73.0,
            31.5
          ],
          "to_coordinates": [
            -0.1,
            51.5
          ],
          "date_or_era": "Travel and resistant lineage movement",
          "route_type": "spread",
          "confidence": "moderate",
          "narrative": "International travel makes typhoid a local water problem and a global antimicrobial-resistance signal.",
          "citation_ids": [
            "typhoid-who",
            "typhoid-cdc-yellowbook"
          ]
        }
      ],
      "modern_echoes": [
        "Typhoid conjugate vaccines are changing prevention strategy in high-burden countries.",
        "The disease is a quiet index of water infrastructure and antibiotic pressure."
      ],
      "framing_traps": [
        "Do not make typhoid a purely historical disease.",
        "Do not confuse typhoid fever with typhus."
      ],
      "linked_reference_slug": "untitled",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "typhoid-who",
          "short_citation": "WHO. Typhoid fact sheet. 2023.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/typhoid",
          "claim_supported": "Food/water transmission, burden, vaccine prevention, and antimicrobial-resistance concern.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "typhoid-cdc-yellowbook",
          "short_citation": "CDC Yellow Book. Typhoid and Paratyphoid Fever.",
          "url": "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/typhoid-and-paratyphoid-fever",
          "claim_supported": "Travel medicine and enteric fever risk framing.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "",
      "reference_url": "",
      "reference_web_path": "",
      "atlas_url": "atlas.html?pathogen=typhoid-fever",
      "visual_asset": {},
      "visual_asset_id": "atlas-typhoid-fever-hero",
      "category": "fecal-oral-waterborne",
      "category_label": "Fecal-oral / waterborne",
      "transmission_group": "Fecal-oral / waterborne",
      "color": "#bc8f5f",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet"
    },
    {
      "slug": "norovirus",
      "name": "Norovirus",
      "subtitle": "A confined-space gastroenteritis virus that turns surfaces, food, water, and vomiting into a transmission map",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "Norovirus is less a single-route disease than a choreography of people, surfaces, food, water, aerosolized vomitus, and institutional crowding.",
      "why_it_matters": "It adds the disease ecology of closed rooms, hand hygiene, shellfish beds, and travel infrastructure.",
      "atlas_scope": "Cruise ships, institutions, food service, shellfish, and extreme environmental persistence",
      "origin_claim": {
        "label": "Norwalk, Ohio discovery frame",
        "coordinates": [
          -81.4,
          41.2
        ],
        "date_or_era": "Norwalk, Ohio outbreak investigation in 1968; virus identified in 1972",
        "confidence": "strong",
        "narrative": "The discovery frame begins with the Norwalk school outbreak, but the modern geography is global and dominated by crowded settings and food-water interfaces.",
        "citation_ids": [
          "noro-cdc"
        ]
      },
      "spread_routes": [
        {
          "route_id": "noro-norwalk-global",
          "from_label": "Norwalk outbreak frame",
          "to_label": "Global institutional outbreaks",
          "from_coordinates": [
            -81.4,
            41.2
          ],
          "to_coordinates": [
            -0.1,
            51.5
          ],
          "date_or_era": "Late twentieth-century recognition and global syndrome",
          "route_type": "recognition",
          "confidence": "strong",
          "narrative": "Laboratory methods made norovirus visible across schools, hospitals, ships, and care facilities.",
          "citation_ids": [
            "noro-cdc",
            "noro-yellowbook"
          ]
        },
        {
          "route_id": "noro-shellfish-cruise",
          "from_label": "Shellfish and coastal food-water interfaces",
          "to_label": "Cruise ships and closed settings",
          "from_coordinates": [
            -70.0,
            42.0
          ],
          "to_coordinates": [
            -64.0,
            32.3
          ],
          "date_or_era": "Modern food-water-confined spread",
          "route_type": "confined_space",
          "confidence": "strong",
          "narrative": "Shellfish, food handlers, contaminated water, and confined populations create maritime, institutional, and household outbreaks.",
          "citation_ids": [
            "noro-cdc",
            "noro-yellowbook"
          ]
        }
      ],
      "modern_echoes": [
        "Norovirus is one of the cleanest examples of why surfaces and food handlers still matter.",
        "It is the atlas entry for density, institutions, and environmental persistence."
      ],
      "framing_traps": [
        "Do not call norovirus \u201cstomach flu\u201d; it is not influenza.",
        "Do not treat cruise ships as the reservoir; they are amplification settings."
      ],
      "linked_reference_slug": "norovirus",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "noro-cdc",
          "short_citation": "CDC. How Norovirus Spreads. 2024.",
          "url": "https://www.cdc.gov/norovirus/causes/index.html",
          "claim_supported": "Spread through people, contaminated food/water/surfaces, vomit/fecal particles, and post-illness contagiousness.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "noro-yellowbook",
          "short_citation": "CDC Yellow Book. Norovirus. 2025.",
          "url": "https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/norovirus.html",
          "claim_supported": "Fecal-oral, food/water, fomites, vomitus aerosols, and cruise/camp/dorm/care-facility outbreaks.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Norovirus",
      "reference_url": "reference/norovirus.html",
      "reference_web_path": "reference/norovirus.html",
      "atlas_url": "atlas.html?pathogen=norovirus",
      "visual_asset": {},
      "visual_asset_id": "atlas-norovirus-hero",
      "category": "fecal-oral-waterborne",
      "category_label": "Fecal-oral / waterborne",
      "transmission_group": "Fecal-oral / waterborne",
      "color": "#9aa36b",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/norovirus.html"
    },
    {
      "slug": "smallpox",
      "name": "Smallpox",
      "subtitle": "A human-only orthopoxvirus from ancient trade routes to eradication surveillance",
      "status": "mixed",
      "pathogen_type": "Virus",
      "summary": "Smallpox is the disease where historical spread and modern public health ended in true eradication.",
      "why_it_matters": "It anchors the project: disease moving through civilization, then being removed by surveillance and vaccination.",
      "atlas_scope": "Trade routes, empire, variolation, vaccination, and eradication",
      "origin_claim": {
        "label": "Ancient Afro-Eurasian evidence frame",
        "coordinates": [
          31.1,
          30.0
        ],
        "date_or_era": "At least 3000 years old; exact origin unknown",
        "confidence": "mixed",
        "narrative": "The origin is unknown; ancient Egyptian, Chinese, Indian, and Asian Minor evidence should be treated as early frames rather than a single birthplace.",
        "citation_ids": [
          "smallpox-cdc"
        ]
      },
      "spread_routes": [
        {
          "route_id": "smallpox-silk-road-japan",
          "from_label": "China/Korea trade interfaces",
          "to_label": "Japan",
          "from_coordinates": [
            116.4,
            39.9
          ],
          "to_coordinates": [
            139.7,
            35.7
          ],
          "date_or_era": "Sixth century East Asian trade route spread",
          "route_type": "spread",
          "confidence": "moderate",
          "narrative": "Increased trade with China and Korea is part of the classic narrative for smallpox entering Japan.",
          "citation_ids": [
            "smallpox-cdc",
            "smallpox-who"
          ]
        },
        {
          "route_id": "smallpox-colonial-americas",
          "from_label": "Europe and Atlantic empires",
          "to_label": "The Americas",
          "from_coordinates": [
            -3.7,
            40.4
          ],
          "to_coordinates": [
            -99.1,
            19.4
          ],
          "date_or_era": "Seventeenth-century colonization and American epidemics",
          "route_type": "colonial_spread",
          "confidence": "strong",
          "narrative": "European colonization carried smallpox into immunologically vulnerable American populations.",
          "citation_ids": [
            "smallpox-cdc",
            "smallpox-who"
          ]
        },
        {
          "route_id": "smallpox-eradication",
          "from_label": "Asia and remaining endemic zones",
          "to_label": "Somalia last natural case frame",
          "from_coordinates": [
            78.9,
            22.9
          ],
          "to_coordinates": [
            46.2,
            5.2
          ],
          "date_or_era": "1967-1980 intensified eradication",
          "route_type": "eradication",
          "confidence": "strong",
          "narrative": "Surveillance, ring vaccination, and field logistics pushed smallpox to eradication certification.",
          "citation_ids": [
            "smallpox-cdc",
            "smallpox-who"
          ]
        }
      ],
      "modern_echoes": [
        "Smallpox now survives as preparedness, laboratory, and biosecurity problem rather than a naturally circulating disease.",
        "It is the gold-standard comparison for every eradication claim."
      ],
      "framing_traps": [
        "Do not claim a precise smallpox origin.",
        "Do not make eradication look inevitable; it was a logistical and political achievement."
      ],
      "linked_reference_slug": "untitled",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "smallpox-cdc",
          "short_citation": "CDC. History of Smallpox. 2024.",
          "url": "https://www.cdc.gov/smallpox/about/history.html",
          "claim_supported": "Unknown origin, ancient evidence, global spread through trade/exploration, and eradication history.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "smallpox-who",
          "short_citation": "WHO. Smallpox health topic.",
          "url": "https://www.who.int/health-topics/smallpox",
          "claim_supported": "Transmission, fatality, Jenner vaccine, 1967 intensified campaign, last natural case, and 1980 eradication.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 3,
      "writing_state": "adjacent",
      "reference_name": "",
      "reference_url": "",
      "reference_web_path": "",
      "atlas_url": "atlas.html?pathogen=smallpox",
      "visual_asset": {},
      "visual_asset_id": "atlas-smallpox-hero",
      "category": "airborne-respiratory",
      "category_label": "Airborne / respiratory",
      "transmission_group": "Airborne / respiratory",
      "color": "#b56b5b",
      "status_label": "Mixed / debated",
      "writing_state_label": "Adjacent writing"
    },
    {
      "slug": "seasonal-influenza",
      "name": "Seasonal influenza",
      "subtitle": "A respiratory virus map of winter epidemics, tropical persistence, vaccination, and crowded indoor transmission",
      "status": "mixed",
      "pathogen_type": "Virus",
      "summary": "Seasonal influenza is a recurrent global circulation system shaped by immunity, seasonality, travel, and indoor crowding.",
      "why_it_matters": "It gives the atlas a disease where recurrence, not novelty, is the point.",
      "atlas_scope": "Global respiratory seasonality, antigenic drift, and recurring institutional burden",
      "origin_claim": {
        "label": "Global seasonal-circulation frame",
        "coordinates": [
          0.0,
          20.0
        ],
        "date_or_era": "Ancient respiratory syndrome; modern virologic surveillance is global",
        "confidence": "mixed",
        "narrative": "The useful frame is not a single origin point but the global respiratory network through which influenza viruses repeatedly circulate and evolve.",
        "citation_ids": [
          "flu-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "flu-temperate-seasonality",
          "from_label": "Global circulation",
          "to_label": "Temperate winter epidemic belts",
          "from_coordinates": [
            0.0,
            20.0
          ],
          "to_coordinates": [
            -73.9,
            40.7
          ],
          "date_or_era": "Annual temperate winter epidemics",
          "route_type": "seasonality",
          "confidence": "strong",
          "narrative": "In temperate regions influenza concentrates into winter waves that pressure schools, workplaces, clinics, and hospitals.",
          "citation_ids": [
            "flu-who",
            "flu-who-topic"
          ]
        },
        {
          "route_id": "flu-tropics-year-round",
          "from_label": "Tropical and subtropical circulation",
          "to_label": "Irregular outbreak zones",
          "from_coordinates": [
            100.5,
            13.8
          ],
          "to_coordinates": [
            7.4,
            9.1
          ],
          "date_or_era": "Tropical year-round circulation",
          "route_type": "tropical_circulation",
          "confidence": "strong",
          "narrative": "In tropical regions influenza can circulate throughout the year, making seasonality more irregular.",
          "citation_ids": [
            "flu-who",
            "flu-who-topic"
          ]
        }
      ],
      "modern_echoes": [
        "Influenza is a standing lesson in why schools, nursing homes, hospitals, and vaccination campaigns are geographic systems.",
        "Its routine nature hides how large the annual burden is."
      ],
      "framing_traps": [
        "Do not collapse seasonal influenza into pandemic influenza.",
        "Do not imply tropical influenza follows the same winter pattern as temperate influenza."
      ],
      "linked_reference_slug": "untitled",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "flu-who",
          "short_citation": "WHO. Influenza (seasonal) fact sheet. 2025.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/influenza-%28seasonal%29",
          "claim_supported": "Global burden, respiratory spread, temperate winter epidemics, tropical year-round circulation, and vaccination.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "flu-who-topic",
          "short_citation": "WHO. Influenza health topic.",
          "url": "https://www.who.int/health-topics/influenza-seasonal",
          "claim_supported": "Seasonal influenza overview and surveillance resources.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "",
      "reference_url": "",
      "reference_web_path": "",
      "atlas_url": "atlas.html?pathogen=seasonal-influenza",
      "visual_asset": {},
      "visual_asset_id": "atlas-seasonal-influenza-hero",
      "category": "airborne-respiratory",
      "category_label": "Airborne / respiratory",
      "transmission_group": "Airborne / respiratory",
      "color": "#b7c7df",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet"
    },
    {
      "slug": "covid-19",
      "name": "COVID-19 / SARS-CoV-2",
      "subtitle": "A pandemic coronavirus whose map turned air, buildings, borders, surveillance, and inequality into one disease surface",
      "status": "mixed",
      "pathogen_type": "Virus",
      "summary": "COVID-19 made respiratory transmission visible as infrastructure: indoor air, work, travel, households, health systems, and variant surveillance.",
      "why_it_matters": "It is the modern respiratory atlas entry par excellence.",
      "atlas_scope": "Pandemic respiratory spread, travel networks, indoor air, and year-round circulation",
      "origin_claim": {
        "label": "Wuhan early-detection frame",
        "coordinates": [
          114.3,
          30.6
        ],
        "date_or_era": "First detected as a cluster in Wuhan, China in late 2019; ultimate origin remains debated",
        "confidence": "mixed",
        "narrative": "The earliest recognized outbreak was in Wuhan in late 2019; the ultimate animal-origin pathway remains unsettled and should not be flattened into certainty.",
        "citation_ids": [
          "covid-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "covid-wuhan-global",
          "from_label": "Wuhan early outbreak",
          "to_label": "Global travel network",
          "from_coordinates": [
            114.3,
            30.6
          ],
          "to_coordinates": [
            11.6,
            48.1
          ],
          "date_or_era": "Late 2019 to early 2020 global dissemination",
          "route_type": "pandemic_spread",
          "confidence": "strong",
          "narrative": "Travel and dense indoor transmission moved SARS-CoV-2 from a local cluster into a pandemic respiratory network.",
          "citation_ids": [
            "covid-who",
            "covid-topic"
          ]
        },
        {
          "route_id": "covid-variants-global",
          "from_label": "Variant emergence zones",
          "to_label": "Global genomic surveillance network",
          "from_coordinates": [
            31.0,
            -29.0
          ],
          "to_coordinates": [
            -0.1,
            51.5
          ],
          "date_or_era": "2020 onward variant replacement",
          "route_type": "variant_surveillance",
          "confidence": "strong",
          "narrative": "Variants made the map dynamic: immune escape, transmissibility, sequencing capacity, and reporting shaped apparent spread.",
          "citation_ids": [
            "covid-who",
            "covid-topic"
          ]
        }
      ],
      "modern_echoes": [
        "COVID changed how readers understand dashboards, wastewater, genomic surveillance, and indoor air.",
        "It is now a year-round circulation problem rather than a closed historical episode."
      ],
      "framing_traps": [
        "Do not state the ultimate origin as settled.",
        "Do not reduce COVID transmission to surfaces; respiratory particles and indoor air are central."
      ],
      "linked_reference_slug": "untitled",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "covid-who",
          "short_citation": "WHO. Coronavirus disease (COVID-19) fact sheet.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/coronavirus-disease-%28covid-19%29",
          "claim_supported": "Airborne respiratory-particle transmission, year-round circulation, symptoms, and public-health framing.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "covid-topic",
          "short_citation": "WHO. Coronavirus disease health topic.",
          "url": "https://www.who.int/health-topics/coronavirus/coronavirus",
          "claim_supported": "General SARS-CoV-2 overview and prevention framing.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "",
      "reference_url": "",
      "reference_web_path": "",
      "atlas_url": "atlas.html?pathogen=covid-19",
      "visual_asset": {},
      "visual_asset_id": "atlas-covid-19-hero",
      "category": "airborne-respiratory",
      "category_label": "Airborne / respiratory",
      "transmission_group": "Airborne / respiratory",
      "color": "#7b8fa8",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet"
    },
    {
      "slug": "ebola-virus-disease",
      "name": "Ebola disease",
      "subtitle": "A filovirus map built from wildlife contact, body fluids, health systems, burial practice, and borders",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "Ebola shows how zoonotic spillover becomes a social and institutional transmission crisis.",
      "why_it_matters": "It maps social practice and health-system capacity without pretending the virus moves by geography alone.",
      "atlas_scope": "Forest spillover, caregiving, burial, hospitals, and regional borders",
      "origin_claim": {
        "label": "Central African first-recognition frame",
        "coordinates": [
          22.4,
          4.4
        ],
        "date_or_era": "First recognized outbreaks in 1976 near Ebola River and Nzara/Yambuku contexts",
        "confidence": "moderate",
        "narrative": "The discovery frame is Central Africa in 1976; reservoir ecology is more complex than one river or village.",
        "citation_ids": [
          "ebola-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "ebola-central-africa",
          "from_label": "Central African forest-edge settings",
          "to_label": "Yambuku and Nzara outbreak frame",
          "from_coordinates": [
            22.4,
            4.4
          ],
          "to_coordinates": [
            29.0,
            3.7
          ],
          "date_or_era": "1976 Central African recognition",
          "route_type": "recognition",
          "confidence": "strong",
          "narrative": "Initial recognition involved severe outbreaks where hospitals amplified transmission under difficult infection-control conditions.",
          "citation_ids": [
            "ebola-who",
            "ebola-topic"
          ]
        },
        {
          "route_id": "ebola-west-africa",
          "from_label": "Guinea forest region",
          "to_label": "Sierra Leone and Liberia",
          "from_coordinates": [
            -10.9,
            10.4
          ],
          "to_coordinates": [
            -13.2,
            8.5
          ],
          "date_or_era": "2014-2016 West African epidemic",
          "route_type": "regional_epidemic",
          "confidence": "strong",
          "narrative": "Caregiving, burials, weak health systems, roads, and borders turned spillover into a regional emergency.",
          "citation_ids": [
            "ebola-who",
            "ebola-topic"
          ]
        }
      ],
      "modern_echoes": [
        "Ebola tests whether outbreak maps include hospitals, funerals, trust, roads, and borders.",
        "Vaccines changed response, but only for some Ebola viruses."
      ],
      "framing_traps": [
        "Do not imply people transmit before symptoms.",
        "Do not make fruit bats a solved, single-source explanation for every outbreak."
      ],
      "linked_reference_slug": "ebola-virus-disease",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "ebola-who",
          "short_citation": "WHO. Ebola disease fact sheet. 2025.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/ebola-disease",
          "claim_supported": "Animal spillover, body-fluid transmission, burial and health-care transmission, and outbreak control.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "ebola-topic",
          "short_citation": "WHO. Ebola virus disease health topic.",
          "url": "https://www.who.int/en/health-topics/ebola/ebola",
          "claim_supported": "1976 first outbreaks and 2014-2016 West African spread.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Ebola disease",
      "reference_url": "reference/ebola-virus-disease.html",
      "reference_web_path": "reference/ebola-virus-disease.html",
      "atlas_url": "atlas.html?pathogen=ebola-virus-disease",
      "visual_asset": {},
      "visual_asset_id": "atlas-ebola-virus-disease-hero",
      "category": "zoonotic-animal-interface",
      "category_label": "Zoonotic / animal interface",
      "transmission_group": "Zoonotic / animal interface",
      "color": "#b84646",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/ebola-virus-disease.html"
    },
    {
      "slug": "marburg-virus-disease",
      "name": "Marburg virus disease",
      "subtitle": "A Rousettus-bat filovirus whose map begins in caves and mines, then moves through care networks",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "Marburg starts with bat habitats and occupational exposure, then becomes a body-fluid and hospital transmission problem.",
      "why_it_matters": "It adds an occupational/ecological filovirus map distinct from Ebola.",
      "atlas_scope": "Caves, mines, fruit bats, laboratories, and filovirus response",
      "origin_claim": {
        "label": "Marburg/Frankfurt/Belgrade laboratory-recognition frame",
        "coordinates": [
          8.8,
          50.8
        ],
        "date_or_era": "First detected in 1967 in Germany and Serbia after imported African green monkey exposure",
        "confidence": "strong",
        "narrative": "First detected in European laboratory outbreaks linked to imported African green monkeys; later geography ties to African bat reservoirs and caves/mines.",
        "citation_ids": [
          "marburg-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "marburg-lab",
          "from_label": "Ugandan primate source frame",
          "to_label": "Marburg and Frankfurt laboratories",
          "from_coordinates": [
            32.3,
            1.4
          ],
          "to_coordinates": [
            8.8,
            50.8
          ],
          "date_or_era": "1967 laboratory outbreak",
          "route_type": "laboratory_recognition",
          "confidence": "strong",
          "narrative": "The first recognized outbreak made a Central/East African filovirus visible in Europe.",
          "citation_ids": [
            "marburg-who",
            "marburg-topic"
          ]
        },
        {
          "route_id": "marburg-caves",
          "from_label": "Rousettus bat cave/mine ecologies",
          "to_label": "Central and southern African outbreak settings",
          "from_coordinates": [
            30.0,
            -1.5
          ],
          "to_coordinates": [
            11.8,
            -11.2
          ],
          "date_or_era": "Modern African cave and mine exposure",
          "route_type": "bat_ecology",
          "confidence": "strong",
          "narrative": "Later outbreaks point back to cave and mine exposure followed by body-fluid transmission.",
          "citation_ids": [
            "marburg-who",
            "marburg-topic"
          ]
        }
      ],
      "modern_echoes": [
        "Marburg response turns on recognition, infection control, safe burial, and occupational exposure histories.",
        "The 1967 story shows laboratories and animal trade can reveal pathogens far from reservoirs."
      ],
      "framing_traps": [
        "Do not treat Marburg and Ebola as the same virus with different names.",
        "Do not omit cave/mine exposure ecology."
      ],
      "linked_reference_slug": "marburg-virus-disease",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "marburg-who",
          "short_citation": "WHO. Marburg virus disease fact sheet. 2025.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/marburg-virus-disease",
          "claim_supported": "Rousettus fruit bat host, cave/mine exposure, direct body-fluid transmission, and fatality range.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "marburg-topic",
          "short_citation": "WHO. Marburg virus disease health topic.",
          "url": "https://www.who.int/health-topics/marburg-virus-disease",
          "claim_supported": "1967 laboratory recognition and later African outbreak geography.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Marburg virus disease",
      "reference_url": "reference/marburg-virus-disease.html",
      "reference_web_path": "reference/marburg-virus-disease.html",
      "atlas_url": "atlas.html?pathogen=marburg-virus-disease",
      "visual_asset": {},
      "visual_asset_id": "atlas-marburg-virus-disease-hero",
      "category": "zoonotic-animal-interface",
      "category_label": "Zoonotic / animal interface",
      "transmission_group": "Zoonotic / animal interface",
      "color": "#9f3f43",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/marburg-virus-disease.html"
    },
    {
      "slug": "nipah-virus-disease",
      "name": "Nipah virus disease",
      "subtitle": "A henipavirus map of flying foxes, pig farms, raw sap, and close-contact transmission",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "Nipah has multiple routes: bat-contaminated food, pig-amplified farm outbreaks, and limited person-to-person spread.",
      "why_it_matters": "It forces the atlas to track food habits, farms, bats, hospitals, and household care in one entry.",
      "atlas_scope": "Fruit bats, pigs, date-palm sap, hospitals, and South/Southeast Asian spillover",
      "origin_claim": {
        "label": "Malaysia pig-farm discovery frame",
        "coordinates": [
          101.7,
          2.9
        ],
        "date_or_era": "First identified during Malaysia/Singapore pig-farm outbreak in 1998-1999",
        "confidence": "strong",
        "narrative": "First recognized during pig-farm outbreaks in Malaysia and Singapore; later Bangladesh and India outbreaks emphasized date palm sap and close contact.",
        "citation_ids": [
          "nipah-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "nipah-malaysia",
          "from_label": "Malaysia pig farms",
          "to_label": "Singapore linked cases",
          "from_coordinates": [
            101.7,
            2.9
          ],
          "to_coordinates": [
            103.8,
            1.35
          ],
          "date_or_era": "1998-1999 Malaysia/Singapore outbreak",
          "route_type": "pig_amplification",
          "confidence": "strong",
          "narrative": "Pig amplification moved a bat-associated virus into farmers and abattoir workers.",
          "citation_ids": [
            "nipah-who",
            "nipah-cdc"
          ]
        },
        {
          "route_id": "nipah-bangladesh",
          "from_label": "Bangladesh date-palm sap belt",
          "to_label": "India outbreak settings",
          "from_coordinates": [
            90.4,
            23.7
          ],
          "to_coordinates": [
            76.3,
            10.0
          ],
          "date_or_era": "2001 onward Bangladesh/India pattern",
          "route_type": "food_and_contact",
          "confidence": "strong",
          "narrative": "Raw date palm sap contamination, bat ecology, and close caregiving define the South Asian Nipah map.",
          "citation_ids": [
            "nipah-who",
            "nipah-cdc"
          ]
        }
      ],
      "modern_echoes": [
        "Nipah is a pandemic-watchlist pathogen because it combines high severity with some human-to-human spread.",
        "The prevention map is partly agricultural and food-practice geography."
      ],
      "framing_traps": [
        "Do not claim Nipah is easily airborne.",
        "Do not make all Nipah outbreaks pig-farm outbreaks."
      ],
      "linked_reference_slug": "nipah-virus-disease",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "nipah-who",
          "short_citation": "WHO. Nipah virus fact sheet. 2026.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/nipah-virus",
          "claim_supported": "Fruit bat reservoir, first recognition, outbreak countries, food contamination, animal contact, and person-to-person spread.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "nipah-cdc",
          "short_citation": "CDC. About Nipah Virus. 2026.",
          "url": "https://www.cdc.gov/nipah-virus/about/index.html",
          "claim_supported": "Fruit bat reservoir, outbreak countries, pig outbreak history, and high fatality framing.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Nipah virus disease",
      "reference_url": "reference/nipah-virus-disease.html",
      "reference_web_path": "reference/nipah-virus-disease.html",
      "atlas_url": "atlas.html?pathogen=nipah-virus-disease",
      "visual_asset": {},
      "visual_asset_id": "atlas-nipah-virus-disease-hero",
      "category": "zoonotic-animal-interface",
      "category_label": "Zoonotic / animal interface",
      "transmission_group": "Zoonotic / animal interface",
      "color": "#7a6f4f",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/nipah-virus-disease.html"
    },
    {
      "slug": "lassa-fever",
      "name": "Lassa fever",
      "subtitle": "A Mastomys-rat arenavirus whose map is home, food storage, farms, and hospitals",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "Lassa is domestic and ecological at once: rodents, stored food, household contamination, pregnancy risk, and health-care infection control.",
      "why_it_matters": "It adds a quieter map of household ecology and health-system vulnerability.",
      "atlas_scope": "West African rodent ecology, household food storage, and health-care transmission",
      "origin_claim": {
        "label": "Nigeria first-identification frame",
        "coordinates": [
          8.9,
          10.3
        ],
        "date_or_era": "First identified in Nigeria in 1969",
        "confidence": "strong",
        "narrative": "Lassa was first identified in Nigeria; its modern endemic frame sits across parts of West Africa where Mastomys rodents live near homes.",
        "citation_ids": [
          "lassa-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "lassa-west-africa",
          "from_label": "Nigeria discovery setting",
          "to_label": "West African endemic belt",
          "from_coordinates": [
            8.9,
            10.3
          ],
          "to_coordinates": [
            -11.8,
            8.5
          ],
          "date_or_era": "1969 onward West African endemic recognition",
          "route_type": "rodent_household",
          "confidence": "strong",
          "narrative": "Mastomys ecology and household food contamination define the endemic belt.",
          "citation_ids": [
            "lassa-who",
            "lassa-topic"
          ]
        },
        {
          "route_id": "lassa-healthcare",
          "from_label": "Community rodent exposure",
          "to_label": "Hospitals and care settings",
          "from_coordinates": [
            8.9,
            10.3
          ],
          "to_coordinates": [
            3.4,
            6.5
          ],
          "date_or_era": "Health-care amplification risk",
          "route_type": "spread",
          "confidence": "moderate",
          "narrative": "Blood and body-fluid exposure can amplify transmission in health-care settings without adequate infection control.",
          "citation_ids": [
            "lassa-who",
            "lassa-topic"
          ]
        }
      ],
      "modern_echoes": [
        "Lassa shows how food storage and domestic architecture can be epidemiologic infrastructure.",
        "Pregnancy and hospital infection control make its burden larger than raw case counts imply."
      ],
      "framing_traps": [
        "Do not describe Lassa as primarily airborne.",
        "Do not treat West Africa as uniform risk."
      ],
      "linked_reference_slug": "untitled",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "lassa-who",
          "short_citation": "WHO. Lassa fever fact sheet. 2024.",
          "url": "https://www.who.int/en/news-room/fact-sheets/detail/lassa-fever",
          "claim_supported": "Mastomys reservoir, West African endemicity, food/household contamination, and health-care risk.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "lassa-topic",
          "short_citation": "WHO. Lassa fever health topic.",
          "url": "https://www.who.int/health-topics/lassa-fever",
          "claim_supported": "Endemic countries, fatality framing, and prompt treatment importance.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "",
      "reference_url": "",
      "reference_web_path": "",
      "atlas_url": "atlas.html?pathogen=lassa-fever",
      "visual_asset": {},
      "visual_asset_id": "atlas-lassa-fever-hero",
      "category": "rodent-environmental",
      "category_label": "Rodent-borne / environmental",
      "transmission_group": "Rodent-borne / environmental",
      "color": "#b17d5a",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet"
    },
    {
      "slug": "rabies",
      "name": "Rabies",
      "subtitle": "A fatal zoonosis whose map is dogs, bites, vaccination, and access to PEP",
      "status": "mixed",
      "pathogen_type": "Virus",
      "summary": "Rabies geography determines whether a bite is survivable: dog vaccination, wound care, immunoglobulin, and vaccine access are the real map.",
      "why_it_matters": "It adds a One Health entry where veterinary public health and human mortality are inseparable.",
      "atlas_scope": "Dog-mediated zoonosis, bite exposure, post-exposure prophylaxis, and One Health",
      "origin_claim": {
        "label": "Modern dog-mediated Africa/Asia burden frame",
        "coordinates": [
          78.9,
          22.9
        ],
        "date_or_era": "Ancient zoonosis; modern deaths concentrated in Africa and Asia",
        "confidence": "mixed",
        "narrative": "Rabies has an ancient history, but the atlas frame is modern dog-mediated transmission and uneven access to post-exposure prophylaxis.",
        "citation_ids": [
          "rabies-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "rabies-dog",
          "from_label": "South Asian dog-mediated burden",
          "to_label": "African dog-mediated burden",
          "from_coordinates": [
            78.9,
            22.9
          ],
          "to_coordinates": [
            20.0,
            5.0
          ],
          "date_or_era": "Modern dog-mediated endemic belt",
          "route_type": "one_health",
          "confidence": "strong",
          "narrative": "Dog bites and scratches drive the overwhelming majority of human rabies cases.",
          "citation_ids": [
            "rabies-who",
            "rabies-topic"
          ]
        },
        {
          "route_id": "rabies-pep",
          "from_label": "Under-resourced bite-response settings",
          "to_label": "High-access PEP systems",
          "from_coordinates": [
            20.0,
            5.0
          ],
          "to_coordinates": [
            -77.0,
            39.0
          ],
          "date_or_era": "Post-exposure prophylaxis geography",
          "route_type": "healthcare_access",
          "confidence": "strong",
          "narrative": "The same exposure has radically different outcomes depending on wound washing, vaccine, immunoglobulin, and clinical access.",
          "citation_ids": [
            "rabies-who",
            "rabies-topic"
          ]
        }
      ],
      "modern_echoes": [
        "Rabies is access-to-care geography: fatal after symptoms, preventable after exposure.",
        "Dog vaccination is human public health."
      ],
      "framing_traps": [
        "Do not imply rabies is treatable after clinical symptoms.",
        "Do not center bats globally when dog-mediated rabies causes most human deaths."
      ],
      "linked_reference_slug": "rabies",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "rabies-who",
          "short_citation": "WHO. Rabies fact sheet. 2024.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/rabies",
          "claim_supported": "Dog bites/scratches cause 99% of human rabies cases; fatality after symptoms; PEP and One Health prevention.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "rabies-topic",
          "short_citation": "WHO. Rabies health topic.",
          "url": "https://www.who.int/health-topics/rabies",
          "claim_supported": "Estimated annual deaths, Africa/Asia concentration, and dog-mediated prevention.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Rabies",
      "reference_url": "reference/rabies.html",
      "reference_web_path": "reference/rabies.html",
      "atlas_url": "atlas.html?pathogen=rabies",
      "visual_asset": {},
      "visual_asset_id": "atlas-rabies-hero",
      "category": "zoonotic-animal-interface",
      "category_label": "Zoonotic / animal interface",
      "transmission_group": "Zoonotic / animal interface",
      "color": "#9c6f3d",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/rabies.html"
    },
    {
      "slug": "anthrax",
      "name": "Anthrax",
      "subtitle": "A spore-forming bacterium whose map is soil, grazing animals, animal products, and disturbed landscapes",
      "status": "consensus",
      "pathogen_type": "Bacterium",
      "summary": "Anthrax is environmental memory: spores persist in soil, livestock encounter them, and humans meet the pathogen through animals and animal products.",
      "why_it_matters": "It gives the atlas a disease where the landscape itself stores risk.",
      "atlas_scope": "Soil spores, livestock, hides, wool, meat, and occupational exposure",
      "origin_claim": {
        "label": "Global livestock-soil ecology frame",
        "coordinates": [
          35.0,
          0.0
        ],
        "date_or_era": "Worldwide soil ecology with recurrent livestock-associated outbreaks",
        "confidence": "strong",
        "narrative": "The meaningful geography is persistence of Bacillus anthracis spores in soils that expose grazing animals and people who handle them.",
        "citation_ids": [
          "anthrax-cdc"
        ]
      },
      "spread_routes": [
        {
          "route_id": "anthrax-soil",
          "from_label": "Spore-contaminated grazing lands",
          "to_label": "Livestock outbreak zones",
          "from_coordinates": [
            35.0,
            0.0
          ],
          "to_coordinates": [
            44.0,
            15.0
          ],
          "date_or_era": "Persistent soil-livestock cycle",
          "route_type": "environmental_reservoir",
          "confidence": "strong",
          "narrative": "Animals become infected through contaminated soil, plants, or water.",
          "citation_ids": [
            "anthrax-cdc",
            "anthrax-cdc-main"
          ]
        },
        {
          "route_id": "anthrax-products",
          "from_label": "Infected livestock and animal products",
          "to_label": "Industrial and occupational receiving settings",
          "from_coordinates": [
            44.0,
            15.0
          ],
          "to_coordinates": [
            -74.0,
            40.7
          ],
          "date_or_era": "Occupational and animal-product exposure",
          "route_type": "spread",
          "confidence": "moderate",
          "narrative": "Hides, wool, meat, and contaminated animal products can move risk from rural ecology into workplaces and trade networks.",
          "citation_ids": [
            "anthrax-cdc",
            "anthrax-cdc-main"
          ]
        }
      ],
      "modern_echoes": [
        "Anthrax reveals drought, grazing, soil disruption, livestock vaccination, and occupational safety.",
        "It explains environmental persistence without mysticism."
      ],
      "framing_traps": [
        "Do not make anthrax only a bioterrorism story.",
        "Do not imply person-to-person spread drives ordinary anthrax outbreaks."
      ],
      "linked_reference_slug": "anthrax",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "anthrax-cdc",
          "short_citation": "CDC. About Anthrax. 2026.",
          "url": "https://www.cdc.gov/anthrax/about/index.html",
          "claim_supported": "Soil spore ecology, livestock/wildlife infection, and human exposure through animals or animal products.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "anthrax-cdc-main",
          "short_citation": "CDC. About Anthrax. 2025.",
          "url": "https://www.cdc.gov/anthrax/",
          "claim_supported": "Naturally occurring soil distribution and inhalation, ingestion, or cutaneous exposure routes.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Anthrax",
      "reference_url": "reference/anthrax.html",
      "reference_web_path": "reference/anthrax.html",
      "atlas_url": "atlas.html?pathogen=anthrax",
      "visual_asset": {},
      "visual_asset_id": "atlas-anthrax-hero",
      "category": "zoonotic-animal-interface",
      "category_label": "Zoonotic / animal interface",
      "transmission_group": "Zoonotic / animal interface",
      "color": "#8c7a55",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/anthrax.html"
    },
    {
      "slug": "mers",
      "name": "Middle East respiratory syndrome",
      "subtitle": "A camel coronavirus whose map is zoonotic exposure plus health-care amplification",
      "status": "consensus",
      "pathogen_type": "Virus",
      "summary": "MERS shows how a poorly efficient human transmitter can still cause serious hospital outbreaks when triage and infection control fail.",
      "why_it_matters": "It is a compact map of zoonotic exposure, travel medicine, and hospital preparedness.",
      "atlas_scope": "Dromedary camels, Arabian Peninsula spillover, hospitals, and travel-linked outbreaks",
      "origin_claim": {
        "label": "Arabian Peninsula first-recognition frame",
        "coordinates": [
          45.1,
          24.7
        ],
        "date_or_era": "First identified in Saudi Arabia and Jordan in 2012",
        "confidence": "strong",
        "narrative": "MERS-CoV was first identified in Saudi Arabia and Jordan, with dromedary camels as the primary reservoir for zoonotic transmission.",
        "citation_ids": [
          "mers-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "mers-camel",
          "from_label": "Arabian Peninsula dromedary interface",
          "to_label": "Saudi clinical detection",
          "from_coordinates": [
            45.1,
            24.7
          ],
          "to_coordinates": [
            46.7,
            24.7
          ],
          "date_or_era": "2012 onward camel-human spillover",
          "route_type": "camel_interface",
          "confidence": "strong",
          "narrative": "Camel contact and raw camel products anchor the recurring zoonotic transmission map.",
          "citation_ids": [
            "mers-who",
            "mers-cdc"
          ]
        },
        {
          "route_id": "mers-korea",
          "from_label": "Middle East travel exposure",
          "to_label": "Republic of Korea hospitals",
          "from_coordinates": [
            46.7,
            24.7
          ],
          "to_coordinates": [
            127.0,
            37.5
          ],
          "date_or_era": "2015 Korea health-care outbreak",
          "route_type": "healthcare_amplification",
          "confidence": "strong",
          "narrative": "One travel-linked case spread through hospitals before recognition and isolation.",
          "citation_ids": [
            "mers-who",
            "mers-cdc"
          ]
        }
      ],
      "modern_echoes": [
        "MERS warns that health-care systems can amplify diseases that do not spread efficiently in ordinary community settings.",
        "Camel economies and hospital infection control belong on the same map."
      ],
      "framing_traps": [
        "Do not imply sustained global human-to-human transmission.",
        "Do not erase camels from the story by making it just another coronavirus."
      ],
      "linked_reference_slug": "middle-east-respiratory-syndrome-mers",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "mers-who",
          "short_citation": "WHO. Middle East respiratory syndrome coronavirus fact sheet. 2025.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/middle-east-respiratory-syndrome-coronavirus-%28mers-cov%29",
          "claim_supported": "First identification, camel reservoir, Arabian Peninsula concentration, Korea hospital outbreak, and transmission.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "mers-cdc",
          "short_citation": "CDC. About Middle East Respiratory Syndrome. 2024.",
          "url": "https://www.cdc.gov/mers/about/index.html",
          "claim_supported": "Camel-to-human and limited human-to-human spread, health-care outbreaks, and prevention advice.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Middle East respiratory syndrome",
      "reference_url": "reference/middle-east-respiratory-syndrome-mers.html",
      "reference_web_path": "reference/middle-east-respiratory-syndrome-mers.html",
      "atlas_url": "atlas.html?pathogen=mers",
      "visual_asset": {},
      "visual_asset_id": "atlas-mers-hero",
      "category": "zoonotic-animal-interface",
      "category_label": "Zoonotic / animal interface",
      "transmission_group": "Zoonotic / animal interface",
      "color": "#b88a55",
      "status_label": "Consensus",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/middle-east-respiratory-syndrome-mers.html"
    },
    {
      "slug": "diphtheria",
      "name": "Diphtheria",
      "subtitle": "A toxin-producing respiratory bacterium that returns where immunization and living conditions break down",
      "status": "mixed",
      "pathogen_type": "Bacterium",
      "summary": "Diphtheria is a vaccine-preventable disease whose geography reappears through under-immunization, displacement, and damaged health systems.",
      "why_it_matters": "It shows that old vaccine-preventable diseases are not gone; they are suppressed by systems.",
      "atlas_scope": "Vaccination gaps, crowding, respiratory droplets, toxin, and conflict-disrupted health services",
      "origin_claim": {
        "label": "Global pre-vaccine and under-immunized resurgence frame",
        "coordinates": [
          30.0,
          45.0
        ],
        "date_or_era": "Historically worldwide before vaccination; modern outbreaks follow immunity gaps",
        "confidence": "mixed",
        "narrative": "The useful frame is a historically global respiratory infection that resurges where vaccine coverage and boosters fail.",
        "citation_ids": [
          "diphtheria-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "diphtheria-prevaccine",
          "from_label": "Europe and global pre-vaccine settings",
          "to_label": "Industrializing cities",
          "from_coordinates": [
            30.0,
            45.0
          ],
          "to_coordinates": [
            -75.0,
            40.0
          ],
          "date_or_era": "Pre-vaccine worldwide childhood disease",
          "route_type": "spread",
          "confidence": "moderate",
          "narrative": "Before vaccination, diphtheria belonged to childhood, crowding, and respiratory spread.",
          "citation_ids": [
            "diphtheria-who",
            "diphtheria-topic"
          ]
        },
        {
          "route_id": "diphtheria-resurgence",
          "from_label": "Displacement and under-immunized settings",
          "to_label": "Conflict-affected outbreak settings",
          "from_coordinates": [
            91.8,
            21.2
          ],
          "to_coordinates": [
            35.2,
            31.8
          ],
          "date_or_era": "Modern outbreak resurgence",
          "route_type": "vaccine_gap",
          "confidence": "strong",
          "narrative": "Disrupted routine immunization and crowded living conditions can reopen old disease maps.",
          "citation_ids": [
            "diphtheria-who",
            "diphtheria-topic"
          ]
        }
      ],
      "modern_echoes": [
        "Diphtheria is a marker of routine immunization failure.",
        "It connects refugee camps, conflict, primary care, and booster policy."
      ],
      "framing_traps": [
        "Do not write diphtheria as a disease of the past.",
        "Do not forget toxin-mediated severity."
      ],
      "linked_reference_slug": "diphtheria",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "diphtheria-who",
          "short_citation": "WHO. Diphtheria fact sheet. 2024.",
          "url": "https://www.who.int/news-room/fact-sheets/detail/diphtheria",
          "claim_supported": "Respiratory transmission, toxin disease, vaccination, under-immunization, and outbreak resurgence.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "diphtheria-topic",
          "short_citation": "WHO. Diphtheria health topic.",
          "url": "https://www.who.int/health-topics/diphtheria",
          "claim_supported": "Respiratory-droplet spread and clinical overview.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Diphtheria",
      "reference_url": "reference/diphtheria.html",
      "reference_web_path": "reference/diphtheria.html",
      "atlas_url": "atlas.html?pathogen=diphtheria",
      "visual_asset": {},
      "visual_asset_id": "atlas-diphtheria-hero",
      "category": "airborne-respiratory",
      "category_label": "Airborne / respiratory",
      "transmission_group": "Airborne / respiratory",
      "color": "#8f9c5a",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/diphtheria.html"
    },
    {
      "slug": "pertussis",
      "name": "Pertussis",
      "subtitle": "A cough disease whose map is babies, households, schools, boosters, and diagnostic visibility",
      "status": "mixed",
      "pathogen_type": "Bacterium",
      "summary": "Pertussis vaccination changed but did not erase the disease; waning immunity and infant vulnerability keep it clinically alive.",
      "why_it_matters": "It gives the atlas a disease where controlled is not the same as eliminated.",
      "atlas_scope": "Respiratory droplets, infant risk, waning immunity, and vaccine-era recurrence",
      "origin_claim": {
        "label": "Global respiratory childhood-disease frame",
        "coordinates": [
          10.0,
          50.0
        ],
        "date_or_era": "Historically worldwide; modern recurrence shaped by vaccination and waning immunity",
        "confidence": "mixed",
        "narrative": "Pertussis is best mapped as a historically global respiratory infection whose modern geography depends on vaccination, boosters, diagnosis, and infant protection.",
        "citation_ids": [
          "pertussis-who"
        ]
      },
      "spread_routes": [
        {
          "route_id": "pertussis-household",
          "from_label": "Households and schools",
          "to_label": "Infant exposure settings",
          "from_coordinates": [
            10.0,
            50.0
          ],
          "to_coordinates": [
            -95.0,
            37.0
          ],
          "date_or_era": "Routine household and school spread",
          "route_type": "respiratory_household",
          "confidence": "strong",
          "narrative": "Older children and adults with mild or missed disease can transmit into households where infants face highest risk.",
          "citation_ids": [
            "pertussis-who",
            "pertussis-immunization"
          ]
        },
        {
          "route_id": "pertussis-vaccine-era",
          "from_label": "High-coverage countries",
          "to_label": "Outbreak and reporting systems",
          "from_coordinates": [
            0.0,
            52.0
          ],
          "to_coordinates": [
            -122.3,
            47.6
          ],
          "date_or_era": "Vaccine-era resurgence and reporting",
          "route_type": "spread",
          "confidence": "moderate",
          "narrative": "Pertussis persists through waning immunity, diagnostic changes, and pockets of under-vaccination.",
          "citation_ids": [
            "pertussis-who",
            "pertussis-immunization"
          ]
        }
      ],
      "modern_echoes": [
        "Pertussis is a household-network disease disguised as a childhood cough.",
        "Infant protection depends on the immunity of everyone around them."
      ],
      "framing_traps": [
        "Do not imply pertussis vaccination provides permanent sterilizing immunity.",
        "Do not focus only on classic whoop; adult and adolescent disease may be missed."
      ],
      "linked_reference_slug": "pertussis",
      "linked_story_ids": [],
      "linked_blog_posts": [],
      "citations": [
        {
          "id": "pertussis-who",
          "short_citation": "WHO. Pertussis health topic.",
          "url": "https://www.who.int/health-topics/pertussis",
          "claim_supported": "Droplet spread, infant risk, global cases, symptoms, contagious period, and immunization prevention.",
          "note": "Official source used for transmission, geography, or public-health framing."
        },
        {
          "id": "pertussis-immunization",
          "short_citation": "WHO. Pertussis immunization page.",
          "url": "https://www.who.int/immunization/diseases/pertussis/en/",
          "claim_supported": "Vaccine-preventable respiratory disease overview and global burden framing.",
          "note": "Official source used for transmission, geography, or public-health framing."
        }
      ],
      "citation_count": 2,
      "default_variant_slug": "",
      "variants": [],
      "variant_count": 0,
      "related_stories": [],
      "story_count": 0,
      "route_count": 2,
      "writing_state": "not_yet_written",
      "reference_name": "Pertussis",
      "reference_url": "reference/pertussis.html",
      "reference_web_path": "reference/pertussis.html",
      "atlas_url": "atlas.html?pathogen=pertussis",
      "visual_asset": {},
      "visual_asset_id": "atlas-pertussis-hero",
      "category": "airborne-respiratory",
      "category_label": "Airborne / respiratory",
      "transmission_group": "Airborne / respiratory",
      "color": "#c7a05a",
      "status_label": "Mixed / debated",
      "writing_state_label": "No dedicated post yet",
      "reference_href": "../../reference/pertussis.html"
    }
  ],
  "generated_at": "2026-05-13T05:33:02",
  "atlas_count": 30
};
