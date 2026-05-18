window.MARITIME_DISEASE_MODULES = {
  "schema_version": "1.0.0",
  "generated_at": "2026-05-18",
  "description": "Source-backed maritime disease ecology case modules for ships, ports, quarantine, naval medicine, forced movement, and modern closed-vessel comparisons.",
  "confidence_legend": {
    "high": "Strong source support for the displayed claim, usually from multiple sources or a direct primary/official/technical source.",
    "moderate": "Supported, but the case depends on synthesis, general mechanism, or imperfect historical records.",
    "low": "Plausible but thin; display only with a visible caveat.",
    "contested": "Serious uncertainty or disagreement remains.",
    "speculative": "Illustrative or hypothesis-level; never display as established history."
  },
  "mechanism_categories": [
    "crowding",
    "water",
    "vectors",
    "diet",
    "ports",
    "quarantine",
    "empire/war"
  ],
  "source_audit": {
    "summary": "V1 privileges primary historical texts, official public-health sources, peer-reviewed reviews, public datasets, and academic monographs. Routes are schematic unless marked documented.",
    "known_limits": [
      "Cause-specific mortality is often unavailable for older voyages.",
      "Historical labels such as flux, fever, pestilence, and ship fever are not automatically pathogen-specific diagnoses.",
      "Port quarantine is treated as infrastructure and political economy, not as proof that a specific ship imported a specific epidemic.",
      "Barbary plague is represented through the narrower Algiers sanitary-ban case; this atlas does not claim that disease decided the Barbary Wars or that most American captives died of plague."
    ]
  },
  "deferred_modules": [
    {
      "candidate": "Barbary captivity plague mortality",
      "reason": "Narrowed. V1 now includes the 1817-1818 Algiers plague and American sanitary-ban case, but excludes unsupported claims that plague determined Barbary captivity outcomes or the Barbary Wars."
    },
    {
      "candidate": "Convict ships and prison hulks",
      "reason": "Strong topic, but needs a separate source pass to distinguish mortality, sanitation, typhus, dysentery, punishment, and administrative reform."
    },
    {
      "candidate": "Hantavirus cruise-ship claims",
      "reason": "Excluded. The requested framing would invite speculation without a solid official maritime outbreak source."
    },
    {
      "candidate": "Cause-specific Middle Passage disease proportions",
      "reason": "Deferred because total mortality and voyage variables are better supported than precise cause-specific attribution."
    },
    {
      "candidate": "Single-ship yellow fever import reconstructions",
      "reason": "Deferred unless a named voyage and source support the route claim."
    }
  ],
  "sources": [
    {
      "source_id": "maritime-lind-scurvy-treatise",
      "short_citation": "Lind. A Treatise of the Scurvy. 1753.",
      "full_citation": "James Lind. A Treatise of the Scurvy, in Three Parts. Edinburgh: Sands, Murray, and Cochran for A. Kincaid and A. Donaldson, 1753.",
      "url_or_doi": "https://library.si.edu/digital-library/book/treatisescurvyt00lind",
      "source_type": "primary historical source"
    },
    {
      "source_id": "maritime-carpenter-scurvy-vitamin-c",
      "short_citation": "Carpenter. The History of Scurvy and Vitamin C. 1986.",
      "full_citation": "Kenneth J. Carpenter. The History of Scurvy and Vitamin C. Cambridge University Press, 1986.",
      "url_or_doi": "https://www.cambridge.org/core/books/history-of-scurvy-and-vitamin-c/8BF4FE6529793B8C131D5349C3D357EA",
      "source_type": "book"
    },
    {
      "source_id": "maritime-james-lind-library-scurvy",
      "short_citation": "James Lind Library. Lind J (1753).",
      "full_citation": "The James Lind Library. Lind J (1753): A treatise of the scurvy.",
      "url_or_doi": "https://www.jameslindlibrary.org/lind-j-1753/",
      "source_type": "reputable encyclopedia/background only"
    },
    {
      "source_id": "maritime-parks-canada-grosse-ile",
      "short_citation": "Parks Canada. Grosse Ile and the Irish Memorial National Historic Site.",
      "full_citation": "Parks Canada. Grosse Ile and the Irish Memorial National Historic Site.",
      "url_or_doi": "https://parks.canada.ca/culture/designation/lieu-site/grosse-ile",
      "source_type": "government report"
    },
    {
      "source_id": "epidemic-typhus-cdc",
      "short_citation": "CDC. About Epidemic typhus. 2024.",
      "full_citation": "CDC. About Epidemic typhus. 2024. https://www.cdc.gov/typhus/about/epidemic.html",
      "url_or_doi": "https://www.cdc.gov/typhus/about/epidemic.html",
      "source_type": "government report"
    },
    {
      "source_id": "typhus-cdc-clinical",
      "short_citation": "CDC. Clinical Overview of Typhus Fevers. 2024.",
      "full_citation": "CDC. Clinical Overview of Typhus Fevers. 2024. https://www.cdc.gov/typhus/hcp/clinical-overview/index.html",
      "url_or_doi": "https://www.cdc.gov/typhus/hcp/clinical-overview/index.html",
      "source_type": "government report"
    },
    {
      "source_id": "maritime-markel-quarantine-1892",
      "short_citation": "Markel. Quarantine! 1997.",
      "full_citation": "Howard Markel. Quarantine! East European Jewish Immigrants and the New York City Epidemics of 1892. Johns Hopkins University Press, 1997.",
      "url_or_doi": "https://www.press.jhu.edu/books/title/12880/quarantine",
      "source_type": "book"
    },
    {
      "source_id": "maritime-rosenberg-cholera-years",
      "short_citation": "Rosenberg. The Cholera Years. 1962.",
      "full_citation": "Charles E. Rosenberg. The Cholera Years: The United States in 1832, 1849, and 1866. University of Chicago Press, 1962.",
      "url_or_doi": "https://press.uchicago.edu/ucp/books/book/chicago/C/bo3618588.html",
      "source_type": "book"
    },
    {
      "source_id": "cholera-who",
      "short_citation": "WHO. Cholera fact sheet.",
      "full_citation": "World Health Organization. Cholera fact sheet. https://www.who.int/news-room/fact-sheets/detail/cholera",
      "url_or_doi": "https://www.who.int/news-room/fact-sheets/detail/cholera",
      "source_type": "review"
    },
    {
      "source_id": "cdc-cholera-us",
      "short_citation": "CDC. Cholera in the United States.",
      "full_citation": "CDC. Cholera in the United States. https://www.cdc.gov/cholera/about/about-cholera-in-the-united-states.html",
      "url_or_doi": "https://www.cdc.gov/cholera/about/about-cholera-in-the-united-states.html",
      "source_type": "government report"
    },
    {
      "source_id": "yellow-history",
      "short_citation": "Downs. History of Epidemiological Aspects of Yellow Fever. 1982.",
      "full_citation": "Downs WG. History of Epidemiological Aspects of Yellow Fever. Yale J Biol Med. 1982;55(3-4):179-185.",
      "url_or_doi": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2596468/",
      "source_type": "peer-reviewed article"
    },
    {
      "source_id": "cdc-yellow-fever-spread",
      "short_citation": "CDC. Yellow fever causes and spread.",
      "full_citation": "CDC. Yellow Fever: Causes and How It Spreads. https://www.cdc.gov/yellow-fever/causes-and-spread/index.html",
      "url_or_doi": "https://www.cdc.gov/yellow-fever/causes-and-spread/index.html",
      "source_type": "government report"
    },
    {
      "source_id": "yellow-fever-who",
      "short_citation": "World Health Organization. Yellow fever fact sheet.",
      "full_citation": "World Health Organization. Yellow fever fact sheet. https://www.who.int/news-room/fact-sheets/detail/yellow-fever",
      "url_or_doi": "https://www.who.int/news-room/fact-sheets/detail/yellow-fever",
      "source_type": "review"
    },
    {
      "source_id": "malaria-who",
      "short_citation": "World Health Organization. Malaria fact sheet.",
      "full_citation": "World Health Organization. Malaria fact sheet. https://www.who.int/news-room/fact-sheets/detail/malaria",
      "url_or_doi": "https://www.who.int/news-room/fact-sheets/detail/malaria",
      "source_type": "review"
    },
    {
      "source_id": "malaria-carter",
      "short_citation": "Carter and Mendis. Evolutionary and historical aspects of malaria. 2002.",
      "full_citation": "Carter R, Mendis KN. Evolutionary and historical aspects of the burden of malaria. Clinical Microbiology Reviews. 2002;15(4):564-594.",
      "url_or_doi": "https://doi.org/10.1128/CMR.15.4.564-594.2002",
      "source_type": "review"
    },
    {
      "source_id": "malaria-mordecai",
      "short_citation": "Mordecai et al. Climate change and mosquito-borne disease burden. 2020.",
      "full_citation": "Mordecai EA, Ryan SJ, Caldwell JM, Shah MM, LaBeaud AD. Climate change could shift disease burden from malaria to arboviruses in Africa. Lancet Planetary Health. 2020.",
      "url_or_doi": null,
      "source_type": "peer-reviewed article"
    },
    {
      "source_id": "nlm-yellow-fever-primary",
      "short_citation": "NLM. 1793 Philadelphia Yellow Fever Primary Account.",
      "full_citation": "NLM Digital Collections: 1793 Philadelphia Yellow Fever Primary Account.",
      "url_or_doi": "https://collections.nlm.nih.gov/catalog/nlm:nlmuid-2551045R-bk",
      "source_type": "primary historical source"
    },
    {
      "source_id": "maritime-booker-quarantine-2007",
      "short_citation": "Booker. Maritime Quarantine. 2007.",
      "full_citation": "John Booker. Maritime Quarantine: The British Experience, c.1650-1900. Ashgate, 2007.",
      "url_or_doi": "https://www.routledge.com/Maritime-Quarantine-The-British-Experience-c1650-1900/Booker/p/book/9781138274129",
      "source_type": "book"
    },
    {
      "source_id": "maritime-tognotti-quarantine-2013",
      "short_citation": "Tognotti. Lessons from the History of Quarantine. 2013.",
      "full_citation": "Tognotti E. Lessons from the History of Quarantine, from Plague to Influenza A. Emerging Infectious Diseases. 2013;19(2):254-259.",
      "url_or_doi": "https://doi.org/10.3201/eid1902.120312",
      "source_type": "peer-reviewed article"
    },
    {
      "source_id": "maritime-crawshaw-plague-hospitals",
      "short_citation": "Crawshaw. Plague Hospitals. 2012.",
      "full_citation": "Jane L. Stevens Crawshaw. Plague Hospitals: Public Health for the City in Early Modern Venice. Ashgate, 2012.",
      "url_or_doi": "https://www.routledge.com/Plague-Hospitals-Public-Health-for-the-City-in-Early-Modern-Venice/Crawshaw/p/book/9781472441201",
      "source_type": "book"
    },
    {
      "source_id": "plague-who",
      "short_citation": "WHO. Plague fact sheet.",
      "full_citation": "World Health Organization. Plague fact sheet. https://www.who.int/news-room/fact-sheets/detail/plague",
      "url_or_doi": "https://www.who.int/news-room/fact-sheets/detail/plague",
      "source_type": "review"
    },
    {
      "source_id": "smallpox-cdc",
      "short_citation": "CDC. History of Smallpox. 2024.",
      "full_citation": "CDC. History of Smallpox. 2024. https://www.cdc.gov/smallpox/about/history.html",
      "url_or_doi": "https://www.cdc.gov/smallpox/about/history.html",
      "source_type": "government report"
    },
    {
      "source_id": "who-smallpox-eradication",
      "short_citation": "WHO. Smallpox and Its Eradication.",
      "full_citation": "World Health Organization. Smallpox and Its Eradication.",
      "url_or_doi": "https://iris.who.int/handle/10665/39485",
      "source_type": "book"
    },
    {
      "source_id": "smallpox-who",
      "short_citation": "WHO. Smallpox health topic.",
      "full_citation": "WHO. Smallpox health topic. https://www.who.int/health-topics/smallpox",
      "url_or_doi": "https://www.who.int/health-topics/smallpox",
      "source_type": "review"
    },
    {
      "source_id": "smallpox-origin-babkin",
      "short_citation": "Babkin and Babkina. The Origin of the Variola Virus. 2015.",
      "full_citation": "Babkin IV, Babkina IN. The Origin of the Variola Virus. Viruses. 2015;7(3):1100-1112.",
      "url_or_doi": "https://doi.org/10.3390/v7031100",
      "source_type": "peer-reviewed article"
    },
    {
      "source_id": "measles-who",
      "short_citation": "World Health Organization. Measles fact sheet.",
      "full_citation": "World Health Organization. Measles fact sheet. https://www.who.int/news-room/fact-sheets/detail/measles",
      "url_or_doi": "https://www.who.int/news-room/fact-sheets/detail/measles",
      "source_type": "review"
    },
    {
      "source_id": "measles-science",
      "short_citation": "Dux et al. Measles and rinderpest divergence. Science. 2020.",
      "full_citation": "Dux A, Lequime S, Patrono LV, et al. Measles virus and rinderpest virus divergence dated to the sixth century BCE. Science. 2020.",
      "url_or_doi": "https://doi.org/10.1126/science.aba9411",
      "source_type": "peer-reviewed article"
    },
    {
      "source_id": "measles-lancet",
      "short_citation": "Moss. Measles. Lancet. 2017.",
      "full_citation": "Moss WJ. Measles. Lancet. 2017.",
      "url_or_doi": "https://doi.org/10.1016/S0140-6736(17)31463-0",
      "source_type": "review"
    },
    {
      "source_id": "slavevoyages-methodology",
      "short_citation": "SlaveVoyages. Trans-Atlantic Slave Trade Database methodology.",
      "full_citation": "SlaveVoyages. Methodology: The Trans-Atlantic Slave Trade Database.",
      "url_or_doi": "https://legacy.slavevoyages.org/blog/methodology-trans-atlantic",
      "source_type": "public dataset"
    },
    {
      "source_id": "eltis-richardson-atlas-transatlantic-slave-trade",
      "short_citation": "Eltis and Richardson. Atlas of the Transatlantic Slave Trade. 2010.",
      "full_citation": "David Eltis and David Richardson. Atlas of the Transatlantic Slave Trade. Yale University Press, 2010.",
      "url_or_doi": "https://yalebooks.yale.edu/book/9780300185294/atlas-of-the-transatlantic-slave-trade/",
      "source_type": "book"
    },
    {
      "source_id": "curtin-epidemiology-slave-trade",
      "short_citation": "Curtin. Epidemiology and the Slave Trade. 1968.",
      "full_citation": "Philip D. Curtin. Epidemiology and the Slave Trade. Political Science Quarterly. 1968;83(2):190-216.",
      "url_or_doi": "https://doi.org/10.2307/2147089",
      "source_type": "peer-reviewed article"
    },
    {
      "source_id": "maritime-rediker-between-devil",
      "short_citation": "Rediker. Between the Devil and the Deep Blue Sea. 1987.",
      "full_citation": "Marcus Rediker. Between the Devil and the Deep Blue Sea: Merchant Seamen, Pirates, and the Anglo-American Maritime World, 1700-1750. Cambridge University Press, 1987.",
      "url_or_doi": "https://www.cambridge.org/core/books/between-the-devil-and-the-deep-blue-sea/97443DB56227E213DB855B439A98D170",
      "source_type": "book"
    },
    {
      "source_id": "maritime-rediker-villains",
      "short_citation": "Rediker. Villains of All Nations. 2004.",
      "full_citation": "Marcus Rediker. Villains of All Nations: Atlantic Pirates in the Golden Age. Beacon Press, 2004.",
      "url_or_doi": "https://www.beacon.org/Villains-of-All-Nations-P648.aspx",
      "source_type": "book"
    },
    {
      "source_id": "typhoid-cdc-yellowbook",
      "short_citation": "CDC Yellow Book. Typhoid and Paratyphoid Fever.",
      "full_citation": "CDC Yellow Book. Typhoid and Paratyphoid Fever. https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/typhoid-and-paratyphoid-fever",
      "url_or_doi": "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/typhoid-and-paratyphoid-fever",
      "source_type": "government report"
    },
    {
      "source_id": "typhoid-who",
      "short_citation": "WHO. Typhoid fact sheet. 2023.",
      "full_citation": "WHO. Typhoid fact sheet. 2023. https://www.who.int/news-room/fact-sheets/detail/typhoid",
      "url_or_doi": "https://www.who.int/news-room/fact-sheets/detail/typhoid",
      "source_type": "review"
    },
    {
      "source_id": "cdc-drinking-water",
      "short_citation": "CDC. History of Drinking Water Treatment.",
      "full_citation": "CDC. History of Drinking Water Treatment. https://archive.cdc.gov/www_cdc_gov/healthywater/drinking/history.html",
      "url_or_doi": "https://archive.cdc.gov/www_cdc_gov/healthywater/drinking/history.html",
      "source_type": "government report"
    },
    {
      "source_id": "shigella-cdc",
      "short_citation": "CDC. About Shigellosis. 2024.",
      "full_citation": "CDC. About Shigellosis. 2024. https://www.cdc.gov/shigella/about/index.html",
      "url_or_doi": "https://www.cdc.gov/shigella/about/index.html",
      "source_type": "government report"
    },
    {
      "source_id": "cdc-sepsis-about",
      "short_citation": "CDC. About Sepsis.",
      "full_citation": "CDC. About Sepsis. https://www.cdc.gov/sepsis/about/index.html",
      "url_or_doi": "https://www.cdc.gov/sepsis/about/index.html",
      "source_type": "government report"
    },
    {
      "source_id": "maritime-nps-ellis-doctors",
      "short_citation": "NPS. Doctors at Ellis Island.",
      "full_citation": "National Park Service. Doctors at Ellis Island.",
      "url_or_doi": "https://www.nps.gov/elis/learn/historyculture/people_doctor.htm",
      "source_type": "government report"
    },
    {
      "source_id": "maritime-dolan-sf-plague-1900",
      "short_citation": "Dolan. Plague in San Francisco. 2006.",
      "full_citation": "Dolan B. Plague in San Francisco. Public Health Reports. 2006;121 Suppl 1:16-37.",
      "url_or_doi": "https://doi.org/10.1177/00333549061210S103",
      "source_type": "peer-reviewed article"
    },
    {
      "source_id": "niaid-sf-plague",
      "short_citation": "NIAID. Plague in San Francisco, 1900.",
      "full_citation": "NIAID. Plague in San Francisco, 1900.",
      "url_or_doi": "https://www.niaid.nih.gov/about/joseph-kinyoun-indispensable-man-plague-san-francisco",
      "source_type": "reputable encyclopedia/background only"
    },
    {
      "source_id": "noro-cdc",
      "short_citation": "CDC. How Norovirus Spreads. 2024.",
      "full_citation": "CDC. How Norovirus Spreads. 2024. https://www.cdc.gov/norovirus/causes/index.html",
      "url_or_doi": "https://www.cdc.gov/norovirus/causes/index.html",
      "source_type": "government report"
    },
    {
      "source_id": "noro-yellowbook",
      "short_citation": "CDC Yellow Book. Norovirus. 2025.",
      "full_citation": "CDC Yellow Book. Norovirus. 2025. https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/norovirus.html",
      "url_or_doi": "https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/norovirus.html",
      "source_type": "book"
    },
    {
      "source_id": "maritime-delange-algiers-sanitary-ban-1818",
      "short_citation": "de Lange. The Plague on Board. 2017.",
      "full_citation": "Erik de Lange. The Plague on Board: Algiers and the American Sanitary Ban of 1818. ERC Project Blog, 6 March 2017.",
      "url_or_doi": "https://securing-europe.wp.hum.uu.nl/the-plague-on-board-algiers-and-the-american-sanitary-ban-of-1818/",
      "source_type": "reputable encyclopedia/background only"
    },
    {
      "source_id": "maritime-ini-quarantine-geographies-2023",
      "short_citation": "Ini. Quarantine and Diseased Geographies. 2024.",
      "full_citation": "Marina Ini. Quarantine, Diseased Geographies, and Cross-Cultural Encounters in the Eighteenth-Century Mediterranean. The Historical Journal. 2024;67(2):338-359.",
      "url_or_doi": "https://doi.org/10.1017/S0018246X23000596",
      "source_type": "peer-reviewed article"
    },
    {
      "source_id": "maritime-state-barbary-wars",
      "short_citation": "Office of the Historian. Barbary Wars.",
      "full_citation": "U.S. Department of State, Office of the Historian. Barbary Wars, 1801-1805 and 1815-1816.",
      "url_or_doi": "https://history.state.gov/milestones/1801-1829/barbary-wars",
      "source_type": "government report"
    },
    {
      "source_id": "maritime-cdc-vsp-outbreaks",
      "short_citation": "CDC Vessel Sanitation Program. Cruise ship outbreak updates.",
      "full_citation": "CDC Vessel Sanitation Program. Cruise Ship Outbreak Updates.",
      "url_or_doi": "https://www.cdc.gov/vessel-sanitation/cruise-ship-outbreaks/index.html",
      "source_type": "government report"
    },
    {
      "source_id": "maritime-cdc-cruise-norovirus-2023",
      "short_citation": "CDC MMWR. Cruise ship norovirus outbreak. 2023.",
      "full_citation": "CDC MMWR. Notes from the Field: Cruise Ship Norovirus Outbreak Associated with Person-to-Person Transmission - United States Jurisdiction, January 2023.",
      "url_or_doi": "https://www.cdc.gov/mmwr/volumes/72/wr/mm7230a5.htm",
      "source_type": "government report"
    },
    {
      "source_id": "maritime-cdc-cruise-covid-2020",
      "short_citation": "CDC MMWR. Public Health Responses to COVID-19 Outbreaks on Cruise Ships. 2020.",
      "full_citation": "CDC MMWR. Public Health Responses to COVID-19 Outbreaks on Cruise Ships - Worldwide, February-March 2020.",
      "url_or_doi": "https://www.cdc.gov/mmwr/volumes/69/wr/mm6912e3.htm",
      "source_type": "government report"
    },
    {
      "source_id": "covid-who",
      "short_citation": "WHO. Coronavirus disease fact sheet.",
      "full_citation": "World Health Organization. Coronavirus disease (COVID-19) fact sheet.",
      "url_or_doi": "https://www.who.int/news-room/fact-sheets/detail/coronavirus-disease-(covid-19)",
      "source_type": "review"
    },
    {
      "source_id": "cdc-covid-timeline",
      "short_citation": "CDC Museum COVID-19 Timeline.",
      "full_citation": "CDC Museum COVID-19 Timeline. https://www.cdc.gov/museum/timeline/covid19.html",
      "url_or_doi": "https://www.cdc.gov/museum/timeline/covid19.html",
      "source_type": "government report"
    }
  ],
  "modules": [
    {
      "id": "scurvy_long_voyage_navy",
      "title": "Scurvy and the long-voyage provisioning clock",
      "date_range": "1747-1790s",
      "century_tags": ["18th century"],
      "geography": "British naval voyages and Atlantic routes",
      "route_or_setting": "naval voyage",
      "setting_tags": ["ship route", "naval campaign", "galley/provisions"],
      "diseases_or_conditions": ["scurvy"],
      "agents": ["vitamin C deficiency"],
      "transmission_or_cause": ["nutritional deficiency"],
      "mechanism_tags": ["diet", "empire/war"],
      "maritime_mechanism": "A long voyage turned diet into exposure: preserved rations displaced fresh fruit and vegetables, and risk rose with time away from reliable provisioning.",
      "historical_context": "Lind's Salisbury trial is useful because it turns an age-of-sail disaster into a shipboard comparison, while later naval prevention depended on logistics rather than germ theory.",
      "human_burden": {
        "burden_type": "qualitative",
        "summary": "Severe morbidity and mortality occurred on long voyages, but this module does not assign an exact burden to all naval scurvy.",
        "source_ids": ["maritime-lind-scurvy-treatise", "maritime-carpenter-scurvy-vitamin-c"]
      },
      "public_health_response": "Diet reform, citrus provisioning, naval medical observation, and logistical enforcement.",
      "uncertainty_note": "The mechanism is high confidence; voyage-specific rates should be sourced ship by ship.",
      "confidence": "high",
      "source_ids": ["maritime-lind-scurvy-treatise", "maritime-carpenter-scurvy-vitamin-c", "maritime-james-lind-library-scurvy"],
      "scenario_id": "scurvy",
      "map_geometry_or_route": {
        "geometry_type": "route",
        "claim_type": "inferred route",
        "route_confidence": "moderate",
        "source_ids": ["maritime-lind-scurvy-treatise", "maritime-carpenter-scurvy-vitamin-c"],
        "coordinates": [[-5.5, 49.8], [-38.0, 43.5], [-77.35, 25.04]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Scurvy is a nutritional-deficiency and naval-logistics case, not an infectious outbreak.",
          "source_ids": ["maritime-lind-scurvy-treatise", "maritime-carpenter-scurvy-vitamin-c"],
          "confidence": "high",
          "claim_type": "mechanism classification",
          "notes": "Displayed to prevent the atlas from equating every maritime health disaster with infection."
        }
      ]
    },
    {
      "id": "ship_fever_grosse_ile_1847",
      "title": "Ship fever and Grosse Ile quarantine",
      "date_range": "1847",
      "century_tags": ["19th century"],
      "geography": "North Atlantic migration to Quebec",
      "route_or_setting": "migrant ship and quarantine island",
      "setting_tags": ["migrant ship", "quarantine island", "port inspection"],
      "diseases_or_conditions": ["epidemic typhus", "ship fever"],
      "agents": ["Rickettsia prowazekii"],
      "transmission_or_cause": ["respiratory crowding", "quarantine exposure"],
      "mechanism_tags": ["crowding", "quarantine", "ports"],
      "maritime_mechanism": "Crowding, dirty clothing, body lice, poor hygiene, and delayed landing made the ship and quarantine station one connected exposure system.",
      "historical_context": "Grosse Ile anchors ship fever in a material landscape of famine migration, fever ships, inspection, detention, and burial.",
      "human_burden": {
        "burden_type": "qualitative",
        "summary": "The case involved severe mortality among famine-era migrants and quarantine personnel; this module avoids an exact death count until a case-specific source is selected for that number.",
        "source_ids": ["maritime-parks-canada-grosse-ile"]
      },
      "public_health_response": "Quarantine station processing, isolation, cleaning, delousing logic, and port health administration.",
      "uncertainty_note": "Ship fever is often typhus in this setting, but historical fever labels can include mixed illness and incomplete diagnosis.",
      "confidence": "high",
      "source_ids": ["maritime-parks-canada-grosse-ile", "epidemic-typhus-cdc", "typhus-cdc-clinical"],
      "scenario_id": "ship_fever",
      "map_geometry_or_route": {
        "geometry_type": "route",
        "claim_type": "typical route",
        "route_confidence": "moderate",
        "source_ids": ["maritime-parks-canada-grosse-ile"],
        "coordinates": [[-9.0, 53.0], [-34.0, 48.0], [-70.67, 47.02]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Epidemic typhus spreads through infected body lice and conditions of crowding and poor hygiene.",
          "source_ids": ["epidemic-typhus-cdc", "typhus-cdc-clinical"],
          "confidence": "high",
          "claim_type": "biomedical mechanism",
          "notes": "Modern mechanism supports the teaching explanation; historical records still require caution."
        }
      ]
    },
    {
      "id": "cholera_steamship_quarantine_1892",
      "title": "Cholera and steamship-era New York quarantine",
      "date_range": "1892",
      "century_tags": ["19th century"],
      "geography": "European Atlantic migration to New York Harbor",
      "route_or_setting": "steamship route and port quarantine",
      "setting_tags": ["migrant ship", "port city", "quarantine island", "urban center"],
      "diseases_or_conditions": ["cholera"],
      "agents": ["Vibrio cholerae"],
      "transmission_or_cause": ["fecal-oral/waterborne", "quarantine exposure"],
      "mechanism_tags": ["water", "ports", "quarantine"],
      "maritime_mechanism": "Steamship movement could move infected people quickly, but cholera risk depended on fecal contamination, water systems, inspection, isolation, and port politics.",
      "historical_context": "The 1892 New York quarantine crisis is useful because it makes immigration, class, ethnicity, commerce, and bacteriology part of the same port-health system.",
      "human_burden": {
        "burden_type": "qualitative",
        "summary": "This module emphasizes quarantine conflict and port response rather than assigning a citywide mortality estimate.",
        "source_ids": ["maritime-markel-quarantine-1892", "maritime-rosenberg-cholera-years"]
      },
      "public_health_response": "Inspection, quarantine detention, disinfection, isolation, and sanitary surveillance.",
      "uncertainty_note": "The route is a historically grounded port-health example, not a claim that all cholera spread was ship-imported.",
      "confidence": "high",
      "source_ids": ["maritime-markel-quarantine-1892", "maritime-rosenberg-cholera-years", "cholera-who", "cdc-cholera-us"],
      "scenario_id": "flux",
      "map_geometry_or_route": {
        "geometry_type": "route",
        "claim_type": "documented route",
        "route_confidence": "moderate",
        "source_ids": ["maritime-markel-quarantine-1892"],
        "coordinates": [[10.0, 53.55], [-33.0, 48.0], [-74.05, 40.58]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Cholera transmission requires fecal contamination of water or food; port quarantine addressed movement but could not substitute for sanitation.",
          "source_ids": ["cholera-who", "maritime-rosenberg-cholera-years"],
          "confidence": "high",
          "claim_type": "mechanism and public-health synthesis",
          "notes": "Separates ship movement from the water-sanitation mechanism."
        }
      ]
    },
    {
      "id": "yellow_fever_atlantic_ports_1793",
      "title": "Yellow fever in Atlantic port ecology",
      "date_range": "1793 and recurring Atlantic port epidemics",
      "century_tags": ["18th century", "19th century"],
      "geography": "West African, Caribbean, and North American Atlantic ports",
      "route_or_setting": "port city and shipping network",
      "setting_tags": ["port city", "trade network", "plantation/Atlantic system", "urban center"],
      "diseases_or_conditions": ["yellow fever"],
      "agents": ["yellow fever virus"],
      "transmission_or_cause": ["vector-borne"],
      "mechanism_tags": ["vectors", "ports", "empire/war"],
      "maritime_mechanism": "Ships connected warm ports, nonimmune travelers, stored water, and Aedes mosquito habitat, but the mosquito-human cycle still needed local ecological conditions.",
      "historical_context": "Philadelphia in 1793 works as a North American endpoint for an Atlantic fever ecology, not as proof that every port fever came from a single imported ship.",
      "human_burden": {
        "burden_type": "estimated",
        "summary": "Philadelphia's 1793 epidemic was severe; burden estimates vary by historical source and should be cited directly when displayed numerically.",
        "source_ids": ["nlm-yellow-fever-primary", "yellow-history"]
      },
      "public_health_response": "Flight, quarantine debate, port health measures, later mosquito-vector control, and vaccination in modern practice.",
      "uncertainty_note": "The vector mechanism is high confidence; specific eighteenth-century import chains are harder to prove.",
      "confidence": "high",
      "source_ids": ["yellow-history", "cdc-yellow-fever-spread", "yellow-fever-who", "nlm-yellow-fever-primary"],
      "scenario_id": "yellow_fever",
      "map_geometry_or_route": {
        "geometry_type": "route",
        "claim_type": "inferred route",
        "route_confidence": "moderate",
        "source_ids": ["yellow-history", "nlm-yellow-fever-primary"],
        "coordinates": [[-0.2, 5.55], [-72.3, 18.95], [-75.17, 39.95]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Yellow fever is mosquito-borne, so ship movement matters only when it connects infected people, vectors, water storage, and susceptible port populations.",
          "source_ids": ["yellow-history", "cdc-yellow-fever-spread"],
          "confidence": "high",
          "claim_type": "transmission ecology",
          "notes": "Prevents a simplistic ship-import explanation."
        }
      ]
    },
    {
      "id": "mediterranean_plague_lazarettos",
      "title": "Plague, bills of health, and Mediterranean lazarettos",
      "date_range": "15th-18th centuries",
      "century_tags": ["15th century", "16th century", "17th century", "18th century"],
      "geography": "Mediterranean port cities including Venice and other quarantine nodes",
      "route_or_setting": "quarantine island and trade network",
      "setting_tags": ["quarantine island", "port city", "trade network"],
      "diseases_or_conditions": ["plague"],
      "agents": ["Yersinia pestis"],
      "transmission_or_cause": ["vector-borne", "quarantine exposure"],
      "mechanism_tags": ["quarantine", "ports", "empire/war"],
      "maritime_mechanism": "Lazarettos, bills of health, isolation, and cargo control turned disease fear into maritime infrastructure that shaped trade as well as exposure.",
      "historical_context": "This module treats quarantine as a port technology, not merely a medical footnote.",
      "human_burden": {
        "burden_type": "qualitative",
        "summary": "Plague mortality could be catastrophic, but this module is about infrastructure rather than a single quantified outbreak.",
        "source_ids": ["maritime-tognotti-quarantine-2013", "maritime-crawshaw-plague-hospitals"]
      },
      "public_health_response": "Bills of health, lazarettos, detention, fumigation, cargo controls, and port sanitary boundaries.",
      "uncertainty_note": "The infrastructure is well documented; specific ship-to-city plague transmission chains need case-level evidence.",
      "confidence": "high",
      "source_ids": ["maritime-booker-quarantine-2007", "maritime-tognotti-quarantine-2013", "maritime-crawshaw-plague-hospitals", "plague-who"],
      "scenario_id": "pirate_network",
      "map_geometry_or_route": {
        "geometry_type": "route",
        "claim_type": "typical route",
        "route_confidence": "moderate",
        "source_ids": ["maritime-booker-quarantine-2007", "maritime-crawshaw-plague-hospitals"],
        "coordinates": [[12.33, 45.44], [14.51, 35.9], [5.37, 43.3]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Quarantine was maritime infrastructure that regulated people, cargo, documents, ships, and time.",
          "source_ids": ["maritime-booker-quarantine-2007", "maritime-tognotti-quarantine-2013"],
          "confidence": "high",
          "claim_type": "public-health infrastructure",
          "notes": "Supports the exhibit framing of quarantine as infrastructure."
        }
      ]
    },
    {
      "id": "algiers_plague_sanitary_ban_1818",
      "title": "Algiers plague and the American sanitary ban",
      "date_range": "1817-1818",
      "century_tags": ["19th century"],
      "geography": "Algiers Bay and the western Mediterranean",
      "route_or_setting": "port quarantine and naval squadron",
      "setting_tags": ["port city", "naval campaign", "quarantine station", "trade network"],
      "diseases_or_conditions": ["plague"],
      "agents": ["Yersinia pestis"],
      "transmission_or_cause": ["vector-borne", "quarantine exposure"],
      "mechanism_tags": ["quarantine", "ports", "empire/war"],
      "maritime_mechanism": "The Algiers outbreak turned plague fear into a naval and diplomatic problem: U.S. consul William Shaler pushed to keep Algerine sailors from boarding American vessels while Mediterranean quarantine systems treated Barbary Coast provenance as a sanitary category.",
      "historical_context": "This case narrows the earlier Barbary-plague idea into a supportable claim about plague, corsair mobility, naval presence, and quarantine politics after the Barbary Wars.",
      "human_burden": {
        "burden_type": "estimated",
        "summary": "A scholar-authored synthesis reports Daniel Panzac's estimate that as much as one third of Algiers's urban population died between June and September 1817; the module does not assign mortality to American captives or sailors.",
        "source_ids": ["maritime-delange-algiers-sanitary-ban-1818"]
      },
      "public_health_response": "Sanitary exclusion, restrictions on boarding American ships, Mediterranean quarantine routines, bills of health, and port-health surveillance.",
      "uncertainty_note": "The sanitary-ban case is supportable; claims that plague decided the Barbary Wars, drove American captivity outcomes, or killed most captives are not supported here.",
      "confidence": "moderate",
      "source_ids": ["maritime-delange-algiers-sanitary-ban-1818", "maritime-ini-quarantine-geographies-2023", "maritime-state-barbary-wars", "plague-who"],
      "map_geometry_or_route": {
        "geometry_type": "point",
        "claim_type": "port location",
        "route_confidence": "moderate",
        "source_ids": ["maritime-delange-algiers-sanitary-ban-1818", "maritime-state-barbary-wars"],
        "coordinates": [3.06, 36.75]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The 1817-1818 Algiers case is best taught as sanitary exclusion and maritime security, not as proof that plague caused the Barbary Wars.",
          "source_ids": ["maritime-delange-algiers-sanitary-ban-1818", "maritime-state-barbary-wars"],
          "confidence": "moderate",
          "claim_type": "interpretive synthesis",
          "notes": "Narrowed from the earlier deferred Barbary captivity and plague candidate."
        },
        {
          "claim": "Mediterranean quarantine systems used provenance, bills of health, and quarantine duration to sort perceived danger from Ottoman and Barbary Coast ports.",
          "source_ids": ["maritime-ini-quarantine-geographies-2023"],
          "confidence": "high",
          "claim_type": "public-health infrastructure",
          "notes": "Supports the quarantine-system framing without assigning a specific ship-to-city transmission chain."
        }
      ]
    },
    {
      "id": "smallpox_maritime_isolation_hulks",
      "title": "Smallpox, bedding, and maritime isolation",
      "date_range": "18th-19th centuries",
      "century_tags": ["18th century", "19th century"],
      "geography": "Atlantic ships and port isolation systems",
      "route_or_setting": "ship route and port quarantine",
      "setting_tags": ["migrant ship", "quarantine island", "hospital ship", "port city"],
      "diseases_or_conditions": ["smallpox"],
      "agents": ["variola virus"],
      "transmission_or_cause": ["respiratory crowding", "quarantine exposure"],
      "mechanism_tags": ["crowding", "quarantine", "ports"],
      "maritime_mechanism": "Close quarters, bedding, clothing, susceptible passengers, and arrival inspection made smallpox both a shipboard and port-health problem.",
      "historical_context": "The teaching point is not a deep origin story; it is how a contagious human virus moved through ship interiors and port isolation systems.",
      "human_burden": {
        "burden_type": "qualitative",
        "summary": "Smallpox was historically severe and often fatal, but this module does not assign a burden to a particular voyage.",
        "source_ids": ["smallpox-cdc", "who-smallpox-eradication"]
      },
      "public_health_response": "Isolation, quarantine, variolation or vaccination depending on period, and later eradication-era surveillance.",
      "uncertainty_note": "Deep-origin claims are excluded here; transmission and quarantine claims are better supported than origin hypotheses.",
      "confidence": "high",
      "source_ids": ["smallpox-cdc", "who-smallpox-eradication"],
      "scenario_id": "smallpox",
      "map_geometry_or_route": {
        "geometry_type": "point",
        "claim_type": "quarantine station",
        "route_confidence": "moderate",
        "source_ids": ["smallpox-cdc", "who-smallpox-eradication"],
        "coordinates": [[0.035, 51.49]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "For maritime smallpox teaching, shipboard close contact and port isolation are stronger claims than a single origin route.",
          "source_ids": ["smallpox-cdc", "who-smallpox-eradication"],
          "confidence": "high",
          "claim_type": "interpretive constraint",
          "notes": "Explicitly trims the prior overlong origin route."
        }
      ]
    },
    {
      "id": "middle_passage_forced_transport",
      "title": "The Middle Passage as coercive disease ecology",
      "date_range": "16th-19th centuries",
      "century_tags": ["16th century", "17th century", "18th century", "19th century"],
      "geography": "Forced Atlantic slave voyages",
      "route_or_setting": "plantation/Atlantic system",
      "setting_tags": ["captive/prison setting", "plantation/Atlantic system", "ship route", "trade network"],
      "diseases_or_conditions": ["dysentery/flux", "smallpox", "measles", "dehydration", "malnutrition", "violence", "nonspecific fever"],
      "agents": ["mixed/partly unknown"],
      "transmission_or_cause": ["respiratory crowding", "fecal-oral/waterborne", "nutritional deficiency", "wound infection", "unknown/contested"],
      "mechanism_tags": ["crowding", "water", "diet", "empire/war"],
      "maritime_mechanism": "Forced confinement, dehydration, malnutrition, heat, crowding, violence, waste, and infection compounded in a system where the captives had no meaningful agency.",
      "historical_context": "This is the atlas's strongest warning against generic disease language: mortality was not one pathogen story and cannot be separated from coercion.",
      "human_burden": {
        "burden_type": "estimated",
        "summary": "SlaveVoyages supports voyage-level mortality analysis, but cause-specific mortality is uneven and should not be invented.",
        "source_ids": ["slavevoyages-methodology", "eltis-richardson-atlas-transatlantic-slave-trade", "curtin-epidemiology-slave-trade"]
      },
      "public_health_response": "Not a welfare system; shipboard regulation, provisioning rules, and later abolitionist exposure are historically distinct from modern public health.",
      "uncertainty_note": "Total mortality is much better supported than precise cause-specific disease fractions.",
      "confidence": "high",
      "source_ids": ["slavevoyages-methodology", "eltis-richardson-atlas-transatlantic-slave-trade", "curtin-epidemiology-slave-trade"],
      "scenario_id": "middle_passage",
      "map_geometry_or_route": {
        "geometry_type": "route",
        "claim_type": "region only",
        "route_confidence": "moderate",
        "source_ids": ["slavevoyages-methodology", "eltis-richardson-atlas-transatlantic-slave-trade"],
        "coordinates": [[-0.2, 5.55], [-35.0, 12.0], [-72.3, 18.95]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Middle Passage mortality should not be reduced to generic infectious disease because dehydration, malnutrition, violence, crowding, heat, dysentery, smallpox, measles, and nonspecific fever were intertwined.",
          "source_ids": ["curtin-epidemiology-slave-trade", "slavevoyages-methodology"],
          "confidence": "high",
          "claim_type": "interpretive synthesis",
          "notes": "Separates total mortality from cause-specific attribution."
        }
      ]
    },
    {
      "id": "pirate_ports_caribbean_network",
      "title": "Pirate ports as maritime infrastructure, not disease origin",
      "date_range": "c. 1700-1730",
      "century_tags": ["18th century"],
      "geography": "Nassau, Port Royal, Tortuga, Cape Fear, and Caribbean Atlantic ports",
      "route_or_setting": "pirate and merchant port network",
      "setting_tags": ["port city", "trade network", "naval campaign"],
      "diseases_or_conditions": ["wounds", "enteric illness", "vector-borne fevers", "nonspecific fever"],
      "agents": ["mixed/partly unknown"],
      "transmission_or_cause": ["vector-borne", "fecal-oral/waterborne", "wound infection", "unknown/contested"],
      "mechanism_tags": ["ports", "vectors", "water", "empire/war"],
      "maritime_mechanism": "Pirate ports are useful because they show how crews, stolen goods, provisions, water, injuries, sex, alcohol, insects, and ships passed through the same nodes.",
      "historical_context": "The module uses pirates as a way to make maritime infrastructure legible without claiming pirates uniquely caused epidemics.",
      "human_burden": {
        "burden_type": "unknown",
        "summary": "No case-specific disease burden is displayed; this is a network and exposure module.",
        "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"]
      },
      "public_health_response": "Port regulation, naval suppression, provisioning, quarantine practice, and shipboard discipline varied by port and period.",
      "uncertainty_note": "Disease risk is inferred from maritime social ecology; no specific pirate-port outbreak burden is asserted.",
      "confidence": "moderate",
      "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"],
      "scenario_id": "pirate_network",
      "map_geometry_or_route": {
        "geometry_type": "route",
        "claim_type": "typical route",
        "route_confidence": "moderate",
        "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"],
        "coordinates": [[-77.35, 25.04], [-76.84, 17.94], [-72.79, 20.04], [-78.02, 33.9]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Pirate geography is used as exposure infrastructure, not as a disease-origin or disease-determinist claim.",
          "source_ids": ["maritime-rediker-between-devil", "maritime-rediker-villains"],
          "confidence": "moderate",
          "claim_type": "interpretive constraint",
          "notes": "Keeps the module vivid without overclaiming."
        }
      ]
    },
    {
      "id": "wounds_sepsis_shipboard_trauma",
      "title": "Wounds, surgery, and sepsis below deck",
      "date_range": "Age of sail, especially 17th-18th centuries",
      "century_tags": ["17th century", "18th century"],
      "geography": "Atlantic merchant, naval, and pirate ships",
      "route_or_setting": "ship interior",
      "setting_tags": ["ship route", "naval campaign", "captive/prison setting"],
      "diseases_or_conditions": ["wound infection", "gangrene", "sepsis"],
      "agents": ["mixed bacterial infection"],
      "transmission_or_cause": ["wound infection"],
      "mechanism_tags": ["crowding", "empire/war"],
      "maritime_mechanism": "Splinters, blades, burns, falls, dental injury, dirty dressings, delayed care, and shared bedding turned trauma into infectious risk.",
      "historical_context": "This module keeps violence and labor inside disease ecology instead of treating infection as only a passenger-to-passenger problem.",
      "human_burden": {
        "burden_type": "qualitative",
        "summary": "The burden is described qualitatively; no general rate is assigned across maritime labor settings.",
        "source_ids": ["maritime-rediker-between-devil", "cdc-sepsis-about"]
      },
      "public_health_response": "Shipboard surgery, cleaning, bandaging, amputation, later antisepsis, and modern sepsis recognition.",
      "uncertainty_note": "Sepsis is a modern clinical concept; historical sources often describe wounds, gangrene, fever, or death rather than sepsis as a diagnosis.",
      "confidence": "moderate",
      "source_ids": ["maritime-rediker-between-devil", "cdc-sepsis-about"],
      "scenario_id": "wounds_sepsis",
      "map_geometry_or_route": {
        "geometry_type": "point",
        "claim_type": "region only",
        "route_confidence": "low",
        "source_ids": ["maritime-rediker-between-devil", "cdc-sepsis-about"],
        "coordinates": [[-42.0, 28.0]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Aboard ship, trauma could become infectious risk through delayed care and contaminated materials.",
          "source_ids": ["maritime-rediker-between-devil", "cdc-sepsis-about"],
          "confidence": "moderate",
          "claim_type": "mechanism synthesis",
          "notes": "Modern sepsis framing is used carefully and not retrofitted as a precise diagnosis."
        }
      ]
    },
    {
      "id": "typhoid_provisions_food_water",
      "title": "Typhoid, provisions, and fecal contamination",
      "date_range": "19th-20th centuries as a teaching mechanism",
      "century_tags": ["19th century", "20th century"],
      "geography": "Shipboard food-water systems and ports",
      "route_or_setting": "ship interior and provisioning system",
      "setting_tags": ["galley/provisions", "ship route", "port city"],
      "diseases_or_conditions": ["typhoid fever"],
      "agents": ["Salmonella Typhi"],
      "transmission_or_cause": ["fecal-oral/waterborne"],
      "mechanism_tags": ["water", "diet", "ports"],
      "maritime_mechanism": "Water casks, food handling, carriers, hands, utensils, and waste boundaries could turn provisions into a transmission system.",
      "historical_context": "Typhoid is useful for teaching why maritime disease ecology includes galley work and waste, not only exotic ports.",
      "human_burden": {
        "burden_type": "unknown",
        "summary": "No voyage-specific typhoid burden is asserted in V1.",
        "source_ids": ["typhoid-cdc-yellowbook", "typhoid-who"]
      },
      "public_health_response": "Safe water, sanitation, food hygiene, vaccination for travelers or high-risk groups, and carrier control.",
      "uncertainty_note": "The biomedical mechanism is high confidence; historical fever diagnoses aboard ship can be nonspecific.",
      "confidence": "high",
      "source_ids": ["typhoid-cdc-yellowbook", "typhoid-who", "cdc-drinking-water"],
      "scenario_id": "typhoid",
      "map_geometry_or_route": {
        "geometry_type": "point",
        "claim_type": "region only",
        "route_confidence": "low",
        "source_ids": ["typhoid-cdc-yellowbook", "cdc-drinking-water"],
        "coordinates": [[-43.0, 24.5]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Typhoid belongs to fecally contaminated food-water systems rather than to a generic fever category.",
          "source_ids": ["typhoid-cdc-yellowbook", "typhoid-who"],
          "confidence": "high",
          "claim_type": "mechanism classification",
          "notes": "Displayed to distinguish syndrome, pathogen, and route."
        }
      ]
    },
    {
      "id": "flux_dysentery_shipboard_water_waste",
      "title": "Flux, dysentery, water, and waste below deck",
      "date_range": "Early modern through 19th century",
      "century_tags": ["17th century", "18th century", "19th century"],
      "geography": "Ship interiors, water storage, and latrine boundaries",
      "route_or_setting": "ship interior",
      "setting_tags": ["ship route", "galley/provisions", "captive/prison setting"],
      "diseases_or_conditions": ["flux", "dysentery", "diarrheal disease"],
      "agents": ["mixed/partly unknown", "Shigella species as one possible mechanism"],
      "transmission_or_cause": ["fecal-oral/waterborne", "unknown/contested"],
      "mechanism_tags": ["water", "crowding", "diet"],
      "maritime_mechanism": "Water storage, waste disposal, dirty hands, shared utensils, spoiled food, and crowding made enteric exposure hard to separate from ordinary ship operation.",
      "historical_context": "Flux is a historical syndrome label, so the exhibit uses it to teach diagnostic humility rather than forcing a single pathogen.",
      "human_burden": {
        "burden_type": "qualitative",
        "summary": "Diarrheal illness could be severe, especially in captive or crowded settings, but exact pathogen-specific burdens are not displayed.",
        "source_ids": ["shigella-cdc", "cdc-drinking-water", "curtin-epidemiology-slave-trade"]
      },
      "public_health_response": "Water protection, sanitation, food hygiene, isolation when possible, and later bacteriologic diagnosis.",
      "uncertainty_note": "Flux/dysentery labels are not one diagnosis; pathogen-specific claims require case-level evidence.",
      "confidence": "moderate",
      "source_ids": ["shigella-cdc", "cdc-drinking-water", "curtin-epidemiology-slave-trade"],
      "scenario_id": "flux",
      "map_geometry_or_route": {
        "geometry_type": "point",
        "claim_type": "region only",
        "route_confidence": "low",
        "source_ids": ["shigella-cdc", "cdc-drinking-water"],
        "coordinates": [[-46.0, 21.0]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Flux should be shown as a syndromic enteric category unless sources support a pathogen-specific diagnosis.",
          "source_ids": ["shigella-cdc", "cdc-drinking-water"],
          "confidence": "moderate",
          "claim_type": "diagnostic caution",
          "notes": "Prevents overdiagnosis from historical language."
        }
      ]
    },
    {
      "id": "ellis_island_medical_inspection",
      "title": "Ellis Island and immigrant medical inspection",
      "date_range": "1892-1954",
      "century_tags": ["19th century", "20th century"],
      "geography": "New York Harbor",
      "route_or_setting": "port inspection station",
      "setting_tags": ["migration route", "port city", "hospital", "quarantine island"],
      "diseases_or_conditions": ["trachoma", "favus", "visible disability", "nonspecific inspection categories"],
      "agents": ["mixed/partly unknown"],
      "transmission_or_cause": ["quarantine exposure", "respiratory crowding", "unknown/contested"],
      "mechanism_tags": ["ports", "quarantine", "crowding"],
      "maritime_mechanism": "The ship ended at an inspection architecture where bodies, documents, disease categories, immigration law, and public-health authority met.",
      "historical_context": "Ellis Island is a port-health module about inspection and exclusion, not a simple outbreak module.",
      "human_burden": {
        "burden_type": "qualitative",
        "summary": "The burden includes detention, treatment, exclusion, and family separation; no disease-specific burden estimate is displayed.",
        "source_ids": ["maritime-nps-ellis-doctors", "maritime-markel-quarantine-1892"]
      },
      "public_health_response": "Line inspection, hospital inspection, detention, treatment, exclusion, and immigration medical bureaucracy.",
      "uncertainty_note": "Inspection categories mixed infectious risk, disability, labor assumptions, and immigration policy.",
      "confidence": "high",
      "source_ids": ["maritime-nps-ellis-doctors", "maritime-markel-quarantine-1892"],
      "scenario_id": "ship_fever",
      "map_geometry_or_route": {
        "geometry_type": "point",
        "claim_type": "port location",
        "route_confidence": "high",
        "source_ids": ["maritime-nps-ellis-doctors"],
        "coordinates": [[-74.04, 40.70]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Immigrant medical inspection was public-health infrastructure entangled with immigration law, not merely neutral diagnosis.",
          "source_ids": ["maritime-nps-ellis-doctors", "maritime-markel-quarantine-1892"],
          "confidence": "high",
          "claim_type": "public-health infrastructure",
          "notes": "Keeps policy and disease classification together."
        }
      ]
    },
    {
      "id": "san_francisco_plague_port_1900",
      "title": "San Francisco plague and port quarantine politics",
      "date_range": "1900-1904",
      "century_tags": ["20th century"],
      "geography": "San Francisco and Pacific shipping networks",
      "route_or_setting": "port city and quarantine conflict",
      "setting_tags": ["port city", "urban center", "trade network", "quarantine island"],
      "diseases_or_conditions": ["plague"],
      "agents": ["Yersinia pestis"],
      "transmission_or_cause": ["vector-borne", "quarantine exposure"],
      "mechanism_tags": ["ports", "vectors", "quarantine"],
      "maritime_mechanism": "Pacific shipping, rats, fleas, Chinatown politics, federal-state conflict, and commerce made plague a port-health crisis rather than only a bacteriologic fact.",
      "historical_context": "The San Francisco outbreak shows how maritime public health could be technically real and politically ugly at the same time.",
      "human_burden": {
        "burden_type": "estimated",
        "summary": "Case and death counts exist in the historical literature, but this module foregrounds source-backed port response and avoids unsupported extrapolation.",
        "source_ids": ["maritime-dolan-sf-plague-1900", "niaid-sf-plague"]
      },
      "public_health_response": "Quarantine, inspection, rat control, laboratory confirmation, federal intervention, and contested enforcement.",
      "uncertainty_note": "Port association is strong; blaming a single ship or community is not supported by the module and is not displayed.",
      "confidence": "high",
      "source_ids": ["maritime-dolan-sf-plague-1900", "niaid-sf-plague", "plague-who"],
      "scenario_id": "pirate_network",
      "map_geometry_or_route": {
        "geometry_type": "point",
        "claim_type": "port location",
        "route_confidence": "high",
        "source_ids": ["maritime-dolan-sf-plague-1900", "niaid-sf-plague"],
        "coordinates": [[-122.42, 37.77]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "San Francisco plague is a port-health and political-economy case as much as a pathogen case.",
          "source_ids": ["maritime-dolan-sf-plague-1900", "niaid-sf-plague"],
          "confidence": "high",
          "claim_type": "interpretive synthesis",
          "notes": "Maintains both microbial and political dimensions."
        }
      ]
    },
    {
      "id": "cruise_ship_norovirus_modern",
      "title": "Cruise-ship norovirus as a modern closed-vessel comparison",
      "date_range": "21st century",
      "century_tags": ["21st century"],
      "geography": "Cruise ships under CDC Vessel Sanitation Program jurisdiction",
      "route_or_setting": "modern cruise ship",
      "setting_tags": ["ship route", "hospital/medical station", "galley/provisions"],
      "diseases_or_conditions": ["norovirus gastroenteritis"],
      "agents": ["norovirus"],
      "transmission_or_cause": ["fecal-oral/waterborne"],
      "mechanism_tags": ["water", "crowding", "ports"],
      "maritime_mechanism": "Shared dining, surfaces, cabins, vomit/fecal contamination, rapid passenger turnover, and sanitation procedures make modern cruise ships useful closed-setting comparisons.",
      "historical_context": "This module is a comparison, not a claim that cruise ships are equivalent to migrant ships, slave ships, or naval vessels.",
      "human_burden": {
        "burden_type": "estimated",
        "summary": "Vessel Sanitation Program reports provide outbreak-specific illness counts; V1 does not collapse them into a single historic burden.",
        "source_ids": ["maritime-cdc-vsp-outbreaks", "maritime-cdc-cruise-norovirus-2023"]
      },
      "public_health_response": "Sanitation protocols, isolation, reporting, environmental cleaning, hand hygiene, and outbreak investigation.",
      "uncertainty_note": "Useful for mechanism comparison only; it should not be used to generalize backward to all shipboard disease.",
      "confidence": "high",
      "source_ids": ["noro-cdc", "noro-yellowbook", "maritime-cdc-vsp-outbreaks", "maritime-cdc-cruise-norovirus-2023"],
      "scenario_id": "flux",
      "map_geometry_or_route": {
        "geometry_type": "route",
        "claim_type": "typical route",
        "route_confidence": "moderate",
        "source_ids": ["maritime-cdc-vsp-outbreaks"],
        "coordinates": [[-80.19, 25.76], [-77.35, 25.04], [-66.1, 18.45]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Norovirus shows that closed maritime settings still matter, but it is a modern comparison rather than a model for all historical voyages.",
          "source_ids": ["noro-yellowbook", "maritime-cdc-vsp-outbreaks"],
          "confidence": "high",
          "claim_type": "modern comparison",
          "notes": "Explicitly limits analogy."
        }
      ]
    },
    {
      "id": "cruise_ship_covid_2020",
      "title": "COVID-19 on cruise ships and the limits of quarantine at sea",
      "date_range": "2020",
      "century_tags": ["21st century"],
      "geography": "International cruise ship outbreaks",
      "route_or_setting": "modern cruise ship",
      "setting_tags": ["ship route", "quarantine exposure", "port city"],
      "diseases_or_conditions": ["COVID-19"],
      "agents": ["SARS-CoV-2"],
      "transmission_or_cause": ["respiratory crowding", "quarantine exposure"],
      "mechanism_tags": ["crowding", "quarantine", "ports"],
      "maritime_mechanism": "Cabins, shared air, crew labor, passenger turnover, isolation logistics, evacuation, and port refusal turned a ship into both exposure site and quarantine problem.",
      "historical_context": "COVID-19 gives the atlas a modern comparison for why ships are ecological systems, not just vehicles.",
      "human_burden": {
        "burden_type": "estimated",
        "summary": "Official outbreak investigations report ship-specific case and death counts; V1 keeps the module qualitative unless a named outbreak is opened.",
        "source_ids": ["maritime-cdc-cruise-covid-2020", "covid-who"]
      },
      "public_health_response": "Isolation, quarantine, contact tracing, port negotiation, evacuation, testing, crew/passenger restrictions, and later vaccination policies.",
      "uncertainty_note": "This module is a modern comparison; it should not be projected backward onto premodern ships without changing the evidence base.",
      "confidence": "high",
      "source_ids": ["maritime-cdc-cruise-covid-2020", "covid-who", "cdc-covid-timeline"],
      "scenario_id": "measles",
      "map_geometry_or_route": {
        "geometry_type": "route",
        "claim_type": "documented route",
        "route_confidence": "moderate",
        "source_ids": ["maritime-cdc-cruise-covid-2020"],
        "coordinates": [[139.65, 35.45], [139.77, 35.68]]
      },
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Cruise-ship COVID-19 shows how quarantine can become part of the exposure environment when isolation logistics are constrained.",
          "source_ids": ["maritime-cdc-cruise-covid-2020"],
          "confidence": "high",
          "claim_type": "modern comparison",
          "notes": "Source-backed modern analogy, not a historical universal."
        }
      ]
    }
  ]
};
