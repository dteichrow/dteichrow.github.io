from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import shutil
import subprocess
from pathlib import Path
from typing import Any

from .common import (
    ASSETS_DIR,
    CONTENT_DIR,
    DEFAULT_BASE_URL,
    DOCS_DIR,
    PROJECT_ROOT,
    ensure_dir,
    format_display_date,
    link_for,
    load_atlas_registry,
    load_json,
    load_posts_manifest,
    load_tool_registry,
    normalize_base_url,
    temporary_directory,
    write_json,
)


DEFAULT_EPI_DOSSIER_REPO = "https://github.com/dteichrow/epi-dossier.git"
PUBLIC_SITE_ORIGIN = "https://devinteichrow.com"
PUBLIC_SITE_DOMAIN = "devinteichrow.com"
DEFAULT_SOCIAL_IMAGE = "assets/substack-brand/edge-of-epidemiology-email-banner-1100x220.png"
INDEXABLE_POST_STRATEGIES = {"evergreen", "index", "mirrored"}
DOI_URL_PATTERN = re.compile(r"(^|/)(10\.[0-9]{4,9}/\S+)", re.IGNORECASE)
GENERIC_DESCRIPTIONS = {
    "",
    "About Edge of Epidemiology.",
    "Edge of Epidemiology publication page.",
    "Source-first outbreak reporting from The Pathogen Dispatch.",
    "Interactive atlas from The Edge of Epidemiology.",
}
TOPIC_HUBS = [
    {
        "slug": "historical-epidemiology",
        "title": "Historical Epidemiology",
        "description": "Essays on epidemics as historical forces: ancient pathogens, colonial encounters, disease ecology, and the long memory of public health.",
        "keywords": ["history", "historical epidemiology", "ancient", "colonial", "plague", "cocoliztli", "syphilis"],
    },
    {
        "slug": "disease-and-war",
        "title": "Disease And War",
        "description": "War, armies, migration, logistics, barracks, ships, and the infections that move through military systems.",
        "keywords": ["war", "military", "revolutionary", "korean", "napoleon", "soldier", "oregon trail"],
    },
    {
        "slug": "disease-ecology",
        "title": "Disease Ecology",
        "description": "Disease stories where landscapes, reservoirs, vectors, cities, climate, and infrastructure explain more than the pathogen alone.",
        "keywords": ["ecology", "vector", "mosquito", "climate", "environment", "raw milk", "zoonotic"],
    },
    {
        "slug": "pathogen-geography",
        "title": "Pathogen Geography",
        "description": "Map-first work on how pathogens travel through ports, ships, animal reservoirs, water systems, roads, empires, and borders.",
        "keywords": ["atlas", "geography", "pathogen", "maritime", "ship", "route", "port"],
    },
    {
        "slug": "epidemiologic-methods",
        "title": "Epidemiologic Methods",
        "description": "Readable epidemiology methods, causal inference, risk communication, evidence grading, replication, and statistical thinking.",
        "keywords": ["causal", "risk", "evidence", "baseline", "replication", "wearable", "meta-analysis", "studies"],
    },
    {
        "slug": "wellness-claims",
        "title": "Wellness Claims",
        "description": "Evidence-first writing on supplements, nutrition, wellness panics, influencer claims, and health stories that outrun the data.",
        "keywords": ["wellness", "supplement", "raw milk", "gluten", "creatine", "melatonin", "detox", "sweetener", "dopamine"],
    },
    {
        "slug": "neuroepidemiology",
        "title": "Neuroepidemiology",
        "description": "Neuroepidemiology essays on migraine, cognition, epilepsy, dementia, Parkinson's disease, multiple sclerosis, and brain-health evidence.",
        "keywords": ["migraine", "brain", "neuro", "alzheimer", "parkinson", "epilepsy", "seizure", "cognition", "ms"],
    },
]
PATHOGEN_ATLAS_COLORS = {
    "variola-smallpox": "#b56b5b",
    "yersinia-pestis-plague": "#b9754f",
    "vibrio-cholerae-cholera": "#5a9bd4",
    "mycobacterium-tuberculosis-complex": "#d98e5f",
    "influenza-a": "#b7c7df",
    "measles-virus": "#d6c06a",
    "yellow-fever-virus": "#d86a4f",
    "dengue-virus": "#c9a84c",
    "malaria-parasites": "#5abf7c",
    "hantaviruses": "#7aa96b",
    "hiv-1": "#d26b91",
    "sars-cov-2": "#7b8fa8",
    "poliovirus": "#7c9fd1",
    "treponema-pallidum-syphilis": "#c38a65",
    "salmonella-enterica": "#bc8f5f",
    "rickettsia-prowazekii-epidemic-typhus": "#9a8c5f",
    "yellow-fever": "#d86a4f",
    "cholera": "#5a9bd4",
    "measles": "#d6c06a",
    "mpox": "#dd6974",
    "avian-influenza-h5n1": "#9b7bd8",
    "hantavirus": "#7aa96b",
    "dengue": "#c9a84c",
    "malaria": "#5abf7c",
    "tuberculosis": "#d98e5f",
    "plague": "#b9754f",
    "zika-virus-disease": "#5fb6a6",
    "chikungunya": "#d9a441",
    "west-nile-virus": "#8fbf5f",
    "japanese-encephalitis": "#6fa8dc",
    "poliomyelitis": "#7c9fd1",
    "hepatitis-a": "#c9b56b",
    "typhoid-fever": "#bc8f5f",
    "norovirus": "#9aa36b",
    "smallpox": "#b56b5b",
    "seasonal-influenza": "#b7c7df",
    "covid-19": "#7b8fa8",
    "ebola-virus-disease": "#b84646",
    "marburg-virus-disease": "#9f3f43",
    "nipah-virus-disease": "#7a6f4f",
    "lassa-fever": "#b17d5a",
    "rabies": "#9c6f3d",
    "anthrax": "#8c7a55",
    "mers": "#b88a55",
    "diphtheria": "#8f9c5a",
    "pertussis": "#c7a05a",
    "lyme-disease": "#6f9f73",
    "rocky-mountain-spotted-fever": "#c07b4f",
    "crimean-congo-hemorrhagic-fever": "#b04f63",
    "epidemic-typhus": "#b38a5a",
    "murine-typhus": "#9a7d55",
    "scrub-typhus": "#8da05a",
    "salmonellosis": "#c6a15a",
    "listeriosis": "#8fae7a",
    "botulism": "#8d7868",
    "tetanus": "#a88d5d",
    "melioidosis": "#5f9c8a",
    "coccidioidomycosis": "#c28f5a",
    "hiv-aids": "#9d5f7a",
    "hepatitis-b": "#b6974f",
    "syphilis": "#aa6a58",
    "leishmaniasis": "#d0a24a",
    "chagas-disease": "#9f6b4d",
    "onchocerciasis": "#6d9b83",
    "clostridioides-difficile-infection": "#7b9f78",
    "mrsa-infection": "#9c6d70",
    "tick-borne-encephalitis": "#6e8f62",
    "anaplasmosis": "#7d9b6c",
    "ehrlichiosis": "#a27858",
    "babesiosis": "#7e9771",
    "shigellosis": "#b16f58",
    "rotavirus": "#c5a65b",
    "giardiasis": "#6f9f91",
    "cryptosporidiosis": "#8d9f65",
    "amebiasis": "#a47b54",
    "campylobacteriosis": "#bd8b4d",
    "yersiniosis": "#9b815d",
    "shiga-toxin-producing-e-coli-infection": "#b57456",
    "rubella": "#c27c8a",
    "mumps": "#9c83b7",
    "varicella": "#7c9bc6",
    "brucellosis": "#b18a52",
    "leptospirosis": "#6f9b8d",
    "q-fever": "#a8835a",
    "carbapenem-resistant-enterobacterales-infection": "#8f7668",
    "vancomycin-resistant-enterococcus-infection": "#806f8f",
    "rift-valley-fever": "#b88742",
    "eastern-equine-encephalitis": "#8a9f54",
    "la-crosse-encephalitis": "#7b9c6d",
    "lymphatic-filariasis": "#a7a75a",
    "ross-river-virus-disease": "#5e9f88",
    "oropouche-virus-disease": "#c39a4e",
    "lymphocytic-choriomeningitis": "#8f7a54",
    "rat-bite-fever": "#9b705d",
    "tularemia": "#8c9b62",
    "histoplasmosis": "#a98355",
    "blastomycosis": "#8f875e",
    "aspergillosis": "#6f8f7a",
    "sporotrichosis": "#b07d58",
    "gonorrhea": "#a86770",
    "chlamydia": "#c08a67",
    "genital-herpes": "#9b6c94",
    "acinetobacter-infection": "#756f8c",
    "pseudomonas-aeruginosa-infection": "#5f9b8d",
    "vibriosis": "#5b9fb6",
    "trichinellosis": "#b18f55",
    "respiratory-syncytial-virus-infection": "#9bb3c8",
    "meningococcal-disease": "#8a9ab6",
    "pneumococcal-disease": "#b28d6b",
    "haemophilus-influenzae-type-b-disease": "#9c8fb8",
    "legionnaires-disease": "#5f8f9f",
    "candida-auris-infection": "#c08a5d",
    "invasive-candidiasis": "#a77c68",
    "human-papillomavirus-infection": "#b06d93",
    "hepatitis-c": "#c49a57",
    "scabies": "#a88957",
    "leprosy": "#9c7d68",
    "cyclosporiasis": "#6c9f8a",
    "dracunculiasis": "#b5a45b",
    "schistosomiasis": "#6f9aa6",
    "ascariasis": "#9f875b",
    "hookworm-disease": "#8f7b55",
    "toxoplasmosis": "#967ab0",
    "psittacosis": "#6f9675",
    "human-african-trypanosomiasis": "#b59a52",
    "echinococcosis": "#8e8f5e",
    "adenovirus-infection": "#8fa4b8",
    "human-parainfluenza-virus-infection": "#9eb5c2",
    "mycoplasma-pneumoniae-infection": "#b18f6f",
    "group-a-streptococcal-disease": "#b0786a",
    "hand-foot-and-mouth-disease": "#b69a54",
    "hepatitis-d": "#a78352",
    "hepatitis-e": "#c39b59",
    "cysticercosis": "#9f8f61",
    "clonorchiasis": "#7f9f66",
    "fascioliasis": "#8f9b58",
    "paragonimiasis": "#9f7a54",
    "anisakiasis": "#5f9ba8",
    "strongyloidiasis": "#8e7d57",
    "toxocariasis": "#9a865b",
    "baylisascariasis": "#8c705f",
    "loiasis": "#b79b52",
    "group-b-streptococcal-disease": "#9f7a84",
    "clostridium-perfringens-food-poisoning": "#b8874f",
    "staphylococcal-food-poisoning": "#c08a5d",
    "naegleria-fowleri-infection": "#4f9faa",
    "parvovirus-b19-infection": "#b89f74",
    "human-metapneumovirus-infection": "#9fb2c3",
    "powassan-virus-disease": "#7c945f",
    "colorado-tick-fever": "#b67e55",
    "bourbon-virus-disease": "#a56f5e",
    "heartland-virus-disease": "#8f8f5c",
    "cytomegalovirus-infection": "#9d7ea9",
    "epstein-barr-virus-infection": "#8f77a8",
    "cryptococcosis": "#7f9270",
    "mucormycosis": "#8a765f",
    "pinworm-infection": "#b3a15f",
    "trichomoniasis": "#8f8ab8",
    "creutzfeldt-jakob-disease": "#777777",
    "ringworm": "#9a8758",
    "molluscum-contagiosum": "#b4808b",
    "trachoma": "#b49b5a",
    "yaws": "#aa7458",
    "buruli-ulcer": "#6f957a",
    "cystoisosporiasis": "#74a58d",
    "capnocytophaga-infection": "#a17d63",
    "acanthamoeba-keratitis": "#5f9aa5",
    "balamuthia-mandrillaris-infection": "#8f8060",
    "blastocystis-infection": "#7d9f74",
    "angiostrongyliasis": "#b4935d",
    "gnathostomiasis": "#a87856",
    "talaromycosis": "#7f8f66",
    "chromoblastomycosis": "#9b7a58",
    "noma": "#8b735f",
    "jamestown-canyon-virus-disease": "#7aa06a",
    "bartonella-henselae-infection": "#a67c5b",
    "cronobacter-infection": "#c29a55",
    "sarcocystosis": "#8ca56f",
    "fasciolopsiasis": "#6f9b86",
    "chancroid": "#b16d62",
    "lymphogranuloma-venereum": "#9d6f8f",
    "donovanosis": "#a06f62",
    "mycoplasma-genitalium-infection": "#b0777d",
    "mycetoma": "#9f8c5f",
    "sars": "#8ca7bd",
    "trichuriasis": "#9b8d57",
    "pneumocystis-pneumonia": "#8ba17f",
    "taeniasis": "#a88f57",
    "opisthorchiasis": "#7f9964",
    "tungiasis": "#b58a4f",
    "hendra-virus-disease": "#8a7b55",
    "herpes-b-virus-infection": "#9b7aa5",
    "orf-virus-infection": "#a78657",
    "chapare-hemorrhagic-fever": "#a65454",
    "nontuberculous-mycobacterial-disease": "#6f9387",
    "elizabethkingia-infection": "#8f9270",
    "klebsiella-infection": "#a27d72",
    "esbl-producing-enterobacterales-infection": "#7a748f",
    "non-polio-enterovirus-infection": "#8aa7c2",
    "common-cold": "#9fb8c9",
    "bacterial-vaginosis": "#b0798f",
    "southern-tick-associated-rash-illness": "#7c9b61",
    "head-lice-infestation": "#9a8b63",
    "pubic-lice-infestation": "#a07b66",
    "body-lice-infestation": "#8b765b",
    "myiasis": "#b78b53",
    "herpes-simplex-virus-infection": "#a86f93",
    "human-t-lymphotropic-virus-1-infection": "#8c6fa7",
    "shingles": "#9b7ab0",
    "conjunctivitis": "#8fa4a8",
    "meningitis": "#8c9ab8",
    "impetigo": "#b18463",
    "cellulitis": "#a9786b",
    "necrotizing-fasciitis": "#9c5f5f",
    "helicobacter-pylori-infection": "#a98f55",
    "tinea-pedis": "#8d9c6a",
    "vulvovaginal-candidiasis": "#b28aa0",
    "nocardiosis": "#8a8264",
    "paracoccidioidomycosis": "#8f765c",
    "acute-flaccid-myelitis": "#7f8faa",
    "pneumonia": "#9bb0c2",
    "sinusitis": "#9eb6bd",
    "acute-bronchitis": "#8faec0",
    "otitis-media": "#b0a071",
    "urinary-tract-infection": "#8b8f75",
    "infectious-gastroenteritis": "#8aa66a",
}
PATHOGEN_ATLAS_CATEGORIES = {
    "yellow-fever": ("mosquito-borne", "Mosquito-borne / arboviral"),
    "cholera": ("fecal-oral-waterborne", "Fecal-oral / waterborne"),
    "measles": ("airborne-respiratory", "Airborne / respiratory"),
    "mpox": ("contact-sexual-bloodborne", "Contact, sexual, or bloodborne"),
    "avian-influenza-h5n1": ("zoonotic-animal-interface", "Zoonotic / animal interface"),
    "hantavirus": ("rodent-environmental", "Rodent-borne / environmental"),
    "dengue": ("mosquito-borne", "Mosquito-borne / arboviral"),
    "malaria": ("mosquito-borne", "Mosquito-borne / parasitic"),
    "tuberculosis": ("airborne-respiratory", "Airborne / respiratory"),
    "plague": ("flea-louse-mite-borne", "Flea, louse, and mite-borne"),
    "zika-virus-disease": ("mosquito-borne", "Mosquito-borne / arboviral"),
    "chikungunya": ("mosquito-borne", "Mosquito-borne / arboviral"),
    "west-nile-virus": ("mosquito-borne", "Mosquito-borne / arboviral"),
    "japanese-encephalitis": ("mosquito-borne", "Mosquito-borne / arboviral"),
    "poliomyelitis": ("fecal-oral-waterborne", "Fecal-oral / waterborne"),
    "hepatitis-a": ("fecal-oral-waterborne", "Fecal-oral / waterborne"),
    "typhoid-fever": ("fecal-oral-waterborne", "Fecal-oral / waterborne"),
    "norovirus": ("fecal-oral-waterborne", "Fecal-oral / waterborne"),
    "smallpox": ("airborne-respiratory", "Airborne / respiratory"),
    "seasonal-influenza": ("airborne-respiratory", "Airborne / respiratory"),
    "covid-19": ("airborne-respiratory", "Airborne / respiratory"),
    "diphtheria": ("airborne-respiratory", "Airborne / respiratory"),
    "pertussis": ("airborne-respiratory", "Airborne / respiratory"),
    "ebola-virus-disease": ("zoonotic-animal-interface", "Zoonotic / animal interface"),
    "marburg-virus-disease": ("zoonotic-animal-interface", "Zoonotic / animal interface"),
    "nipah-virus-disease": ("zoonotic-animal-interface", "Zoonotic / animal interface"),
    "rabies": ("zoonotic-animal-interface", "Zoonotic / animal interface"),
    "anthrax": ("zoonotic-animal-interface", "Zoonotic / animal interface"),
    "mers": ("zoonotic-animal-interface", "Zoonotic / animal interface"),
    "lassa-fever": ("rodent-environmental", "Rodent-borne / environmental"),
}
PATHOGEN_ATLAS_CATEGORY_ALIASES = {
    "fecal-oral": ("fecal-oral-waterborne", "Fecal-oral / waterborne"),
    "contact-sexual": ("contact-sexual-bloodborne", "Contact, sexual, or bloodborne"),
    "zoonotic-vector": ("flea-louse-mite-borne", "Flea, louse, and mite-borne"),
    "other": ("other-mixed", "Other / mixed transmission"),
}
PATHOGEN_STATUS_LABELS = {
    "consensus": "Consensus",
    "mixed": "Mixed / debated",
    "contested": "Contested",
    "weak": "Weakly supported",
}
PATHOGEN_WRITING_LABELS = {
    "direct": "Written here directly",
    "adjacent": "Adjacent writing",
    "not_yet_written": "No dedicated post yet",
}
PUBLIC_COPY_REPLACEMENTS = {
    "Mpox belongs in the atlas because it combines a geographically anchored Central/West African history with abrupt export through wildlife trade and then a very different twenty-first century global transmission pattern.": "Mpox combines a geographically anchored Central and West African history with wildlife-trade export events and a distinct twenty-first-century pattern of networked global transmission.",
    "It forces the site to distinguish clades, transport mode, and transmission network rather than collapsing everything into one map pin.": "Mpox geography separates clades, transport events, animal reservoirs, and transmission networks instead of collapsing them into a single point of origin.",
    "H5N1 belongs in the atlas because its contemporary geography is not a human epidemic map first; it is a bird-route, farm-system, and spillover map whose human layer remains contingent.": "H5N1 is not primarily a human epidemic map. Its geography follows bird migration, poultry systems, mammal spillover, dairy-herd events, and occupational exposure.",
    "It creates a genuinely different map grammar from the classic human-to-human pathogens and foregrounds One Health risk.": "The spatial problem is One Health risk: animal movement, farm systems, and spillover opportunities before sustained human-to-human transmission.",
    "It lets the atlas show how a pathogen can move with people, water storage, ships, and vector habitat rather than by human travel alone.": "Yellow fever moves with people, water storage, ships, and vector habitat, not by human travel alone.",
    "It forces the atlas to behave like an encyclopedia rather than a single-route animation and keeps us honest about host ecology, geography, and syndrome differences.": "Hantavirus geography follows rodent-host biogeography, ecological exposure settings, and the split between Old World hemorrhagic-fever viruses and New World cardiopulmonary viruses.",
    "Hantaviruses belong in the atlas because they break the habit of pretending every pathogen has one clean human-travel route. The real map is rodent-host biogeography, ecological exposure settings, and the split between Old World hemorrhagic-fever viruses and New World cardiopulmonary viruses.": "Hantavirus geography follows rodent-host biogeography, ecological exposure settings, and the split between Old World hemorrhagic-fever viruses and New World cardiopulmonary viruses.",
    "It turns the atlas toward contemporary global change instead of leaving it stranded in historical imperial routes.": "Dengue shows how urbanization, climate, vector range, water storage, travel, and surveillance reshape disease geography in real time.",
    "Malaria belongs in the atlas because it shows how vector ecology, land use, labor systems, altitude, war, and climate can redraw disease geography across centuries without one neat origin story doing all the work.": "Malaria shows how vector ecology, land use, labor systems, altitude, war, and climate can redraw disease geography across centuries without a single tidy origin story.",
    "It keeps the atlas from becoming virus-only and forces a map grammar built around mosquitoes, species differences, and ecological receptivity.": "Its geography is built around mosquitoes, parasite species, ecological receptivity, control programs, and uneven health-system reach.",
    "Tuberculosis belongs in the atlas because it is both ancient and modern at once: a human co-traveler that thrives in crowding, poverty, institutional confinement, and uneven public health capacity.": "Tuberculosis is ancient and modern at once: a human co-traveler that thrives in crowding, poverty, institutional confinement, migration, HIV, and uneven public-health capacity.",
    "It turns the atlas toward chronic structural transmission instead of one spectacular frontier jump.": "Its map is chronic and structural: airborne transmission shaped by housing, labor, prisons, care access, and drug-resistance systems.",
    "Plague belongs in the atlas because it is one of the clearest historical demonstrations that reservoir ecology, trade corridors, warfare, and maritime ports can repeatedly rewire a continent.": "Plague is one of the clearest historical demonstrations that reservoir ecology, trade corridors, warfare, and maritime ports can repeatedly rewire a continent.",
    "It lets the atlas bridge deep historical fear, genomic reconstruction, and the very practical map logic of rodents, fleas, and ports.": "Plague links deep historical fear, genomic reconstruction, and the practical geography of rodents, fleas, and ports.",
    "Measles is a useful atlas pathogen because its deeper origin story is partly reconstructed from molecular-clock work, while its colonial spread story is brutally visible in the Americas and Pacific.": "Measles has a partly reconstructed deeper origin story from molecular-clock work, while its colonial spread is brutally visible in the Americas and Pacific.",
    "A durable desk file generated from the active dossier story cluster.": "A durable desk file assembled from current reporting, official updates, and source clusters.",
    "Summary stays within source text and metadata; no outside facts were added.": "The summary stays close to the source language and should be read as an initial source note, not a final interpretation.",
    "summary stays within source text and metadata; no outside facts were added.": "the summary stays close to the source language and should be read as an initial source note, not a final interpretation.",
    "Limited detail was available from feed metadata alone.": "Only a brief source description was available at publication time.",
    "limited detail was available from feed metadata alone.": "only a brief source description was available at publication time.",
    "metadata_only_signal": "brief_source_signal",
    "metadata_only": "brief_source",
    "metadata-only signal": "brief source signal",
    "Metadata-only signal": "Brief source signal",
    "metadata-only follow-ups": "brief-source follow-ups",
    "Metadata-only follow-ups": "Brief-source follow-ups",
    "Metadata-only": "Brief source",
    "metadata only": "brief source",
    "Metadata only": "Brief source",
    "Live fetches": "Current source checks",
    "Live fetch": "Current source",
    "live fetch": "current source",
    "Wrapper-only": "Source-link only",
    "wrapper-only": "source-link only",
    "wrapper only": "source-link only",
    "Wrapper only": "Source-link only",
}


def is_doi_url(value: str | None) -> bool:
    if not value:
        return False
    lowered = value.lower()
    return "doi.org/" in lowered or bool(DOI_URL_PATTERN.search(value))


def sanitize_public_copy(value: Any) -> Any:
    if isinstance(value, str):
        for old, new in PUBLIC_COPY_REPLACEMENTS.items():
            value = value.replace(old, new)
        return value
    if isinstance(value, list):
        return [sanitize_public_copy(item) for item in value]
    if isinstance(value, dict):
        return {key: sanitize_public_copy(item) for key, item in value.items()}
    return value


def sanitize_copied_app_exports(app_exports_dir: Path) -> None:
    for path in app_exports_dir.glob("*.json"):
        try:
            data = load_json(path)
        except json.JSONDecodeError:
            continue
        write_json(path, sanitize_public_copy(data))


def public_pathogen_citations(entry: dict[str, Any]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    public_citations: list[dict[str, Any]] = []
    withheld_citations: list[dict[str, Any]] = []
    for citation in entry.get("citations", []):
        citation_copy = dict(citation)
        if is_doi_url(citation_copy.get("url")) and not citation_copy.get("verified"):
            withheld_citations.append(
                {
                    "id": citation_copy.get("id", ""),
                    "short_citation": citation_copy.get("short_citation", ""),
                    "reason": "DOI link withheld pending manual verification",
                }
            )
            continue
        public_citations.append(citation_copy)
    return public_citations, withheld_citations


def site_nav(active: str, base_url: str) -> str:
    links = [
        ("Home", "", "home"),
        ("Newsdesk", "newsdesk/", "newsdesk"),
        ("Exhibits", "tools/", "tools"),
        ("Essays", "essays/", "essays"),
        ("Topics", "topics/", "topics"),
        ("Historical", "historical/", "historical"),
        ("Reference", "reference/", "reference"),
        ("Methods", "methods/", "methods"),
        ("About", "about/", "about"),
        ("Opportunities", "opportunities/", "opportunities"),
        ("Search", "search/", "search"),
    ]
    nav_links = []
    for label, path, key in links:
        classes = ["site-nav-link"]
        attrs = ""
        if active == key:
            classes.append("active")
            attrs = ' aria-current="page"'
        nav_links.append(
            f'<a class="{" ".join(classes)}" href="{html.escape(link_for(base_url, path))}"{attrs}>{html.escape(label)}</a>'
        )
    return (
        '<header class="site-header">'
        '<div class="site-header-inner">'
        '<div class="site-header-copy">'
        '<p class="kicker">The Edge of Epidemiology</p>'
        '<div class="site-brand"><a href="{home}"><span>The Edge of Epidemiology</span> <span class="site-brand-byline">by Devin Teichrow</span></a></div>'
        '<p class="site-header-title">History-haunted epidemiology, live reporting, and interactive public-health exhibits in one place.</p>'
        "</div>"
        '<nav class="site-nav" aria-label="Primary navigation">{links}</nav>'
        "</div>"
        "</header>"
    ).format(home=html.escape(link_for(base_url, "")), links="".join(nav_links))


def base_html(
    *,
    title: str,
    description: str,
    active: str,
    body: str,
    base_url: str,
    extra_head: str = "",
    extra_body_end: str = "",
) -> str:
    css_href = html.escape(link_for(base_url, "assets/site.css"))
    js_href = html.escape(link_for(base_url, "assets/site.js"))
    body = promote_first_hero_heading(body)
    return f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html.escape(title)}</title>
    <meta name="description" content="{html.escape(description)}" />
    <link rel="stylesheet" href="{css_href}" />
    {extra_head}
  </head>
  <body class="site-page page-{html.escape(active)}">
      {site_nav(active, base_url)}
    <main class="page">
      {body}
    </main>
    <script src="{js_href}"></script>
    {extra_body_end}
  </body>
</html>
"""


def promote_first_hero_heading(body: str) -> str:
    return re.sub(
        r'<h2 class="hero-title">(.*?)</h2>',
        r'<h1 class="hero-title">\1</h1>',
        body,
        count=1,
        flags=re.S,
    )


def render_card(title: str, href: str, kicker: str, summary: str, meta: list[str] | None = None) -> str:
    badges = ""
    if meta:
        badges = '<div class="meta-row">' + "".join(f'<span class="badge">{html.escape(item)}</span>' for item in meta) + "</div>"
    return (
        '<article class="site-card">'
        f'<p class="kicker">{html.escape(kicker)}</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(title)}</a></h3>'
        f'<p class="muted-note">{html.escape(summary)}</p>'
        f"{badges}"
        "</article>"
    )


def css_token(value: str | None, default: str = "unknown") -> str:
    if not value:
        return default
    token = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return token or default


def render_atlas_card(entry: dict[str, Any], base_url: str) -> str:
    route = entry.get("public_route", "")
    href = link_for(base_url, route)
    coordinate_hint = " / ".join(keyword.upper() for keyword in entry.get("keywords", [])[:2]) or "CURATED ATLAS"
    status = entry.get("status_label", "Atlas")
    feature_line = entry.get("evidence_model", "")
    atlas_token = css_token(entry.get("atlas_id"), "atlas")
    return (
        f'<article class="site-card atlas-card atlas-card-{html.escape(atlas_token)}">'
        f'<a class="atlas-card-visual atlas-card-visual-{html.escape(atlas_token)}" href="{html.escape(href)}" aria-hidden="true" tabindex="-1">'
        f'<span>{html.escape(status)}</span>'
        "</a>"
        '<div class="card-utility-row">'
        '<span class="card-utility-label">Atlas</span>'
        f'<span class="card-utility-meta">{html.escape(coordinate_hint)}</span>'
        "</div>"
        '<p class="kicker">Atlas family</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(entry.get("title", "Untitled atlas"))}</a></h3>'
        f'<p class="muted-note">{html.escape(entry.get("summary", ""))}</p>'
        f'{f"<p class=\"card-meta-text\">{html.escape(feature_line)}</p>" if feature_line else ""}'
        f'<div class="meta-row meta-row-plain"><span class="story-status-pill atlas-status-pill">{html.escape(status)}</span></div>'
        "</article>"
    )


def render_tool_card(entry: dict[str, Any], base_url: str) -> str:
    route = entry.get("public_route", "")
    href = link_for(base_url, route)
    coordinate_hint = " / ".join(keyword.upper() for keyword in entry.get("keywords", [])[:2]) or "CURATED TOOL"
    status = public_tool_status(entry)
    feature_line = entry.get("evidence_model", "")
    tool_token = css_token(entry.get("tool_id") or entry.get("atlas_id"), "tool")
    tool_type = str(entry.get("tool_type") or "tool").replace("_", " ").title()
    return (
        f'<article class="site-card atlas-card tool-card tool-card-{html.escape(tool_token)}">'
        f'<a class="atlas-card-visual atlas-card-visual-{html.escape(tool_token)}" href="{html.escape(href)}" aria-hidden="true" tabindex="-1">'
        f'<span>{html.escape(status)}</span>'
        "</a>"
        '<div class="card-utility-row">'
        f'<span class="card-utility-label">{html.escape(tool_type)}</span>'
        f'<span class="card-utility-meta">{html.escape(coordinate_hint)}</span>'
        "</div>"
        '<p class="kicker">Interactive exhibit</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(entry.get("title", "Untitled tool"))}</a></h3>'
        f'<p class="muted-note">{html.escape(entry.get("summary", ""))}</p>'
        f'{f"<p class=\"card-meta-text\">{html.escape(feature_line)}</p>" if feature_line else ""}'
        f'<div class="meta-row meta-row-plain"><span class="story-status-pill atlas-status-pill">{html.escape(status)}</span></div>'
        "</article>"
    )


def post_folio_meta(post: dict[str, Any]) -> tuple[str, str]:
    date_text = format_display_date(post.get("date"))
    category_text = ""
    if post.get("series"):
        category_text = str(post["series"][0])
    elif post.get("topics"):
        category_text = str(post["topics"][0])
    strategy = post_indexing_strategy(post)
    if strategy in INDEXABLE_POST_STRATEGIES:
        status_label = "Evergreen"
    elif post.get("status") == "mirrored":
        status_label = "Full essay"
    else:
        status_label = "Essay archive"
    utility_meta = " · ".join(item for item in [category_text, status_label] if item)
    return date_text, utility_meta


def render_post_card(post: dict[str, Any], base_url: str, *, featured: bool = False) -> str:
    href = link_for(base_url, f"essays/{post.get('slug', '')}/")
    date_text, utility_meta = post_folio_meta(post)
    summary = post_seo_description(post)
    feature_image = post.get("cover_image") or ""
    feature_class = " essay-card-featured" if featured and feature_image else ""
    image_class = " essay-card-has-media" if feature_image else ""
    media = (
        f'<a class="essay-card-media" href="{html.escape(href)}" aria-hidden="true" tabindex="-1">'
        f'<img src="{html.escape(feature_image)}" alt="" loading="lazy" decoding="async" />'
        "</a>"
        if feature_image
        else ""
    )
    return (
        f'<article class="site-card essay-card{feature_class}{image_class}">'
        f"{media}"
        '<div class="essay-card-copy">'
        '<div class="card-utility-row">'
        f'<span class="card-utility-label">{html.escape(date_text)}</span>'
        f'<span class="card-utility-meta">{html.escape(utility_meta)}</span>'
        "</div>"
        '<p class="kicker">Essay</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(post_display_title(post))}</a></h3>'
        f'<p class="muted-note">{html.escape(summary)}</p>'
        "</div>"
        "</article>"
    )


def public_tool_status(entry: dict[str, Any]) -> str:
    status = str(entry.get("status") or "").lower()
    tool_type = str(entry.get("tool_type") or "tool").replace("_", " ").title()
    if status == "live":
        return "Open now"
    if status in {"prototype", "in_build", "section"}:
        return f"{tool_type} section"
    return tool_type


def public_tool_export(entry: dict[str, Any]) -> dict[str, Any]:
    public_entry = {
        key: value
        for key, value in entry.items()
        if key
        not in {
            "source_path",
            "launch_priority",
            "legacy_atlas_id",
        }
    }
    public_entry["status_label"] = str(entry.get("status_label") or public_tool_status(entry))
    public_entry["status"] = "open" if str(entry.get("status") or "").lower() == "live" else "section"
    return public_entry


def public_post_export(post: dict[str, Any]) -> dict[str, Any]:
    internal_keys = {
        "source_mode",
        "indexing_strategy",
        "first_seen_at",
        "last_synced_at",
        "sync_source",
        "source_path",
        "original_title",
    }
    return {key: value for key, value in post.items() if key not in internal_keys}


def render_story_card(story: dict[str, Any], base_url: str) -> str:
    href = link_for(base_url, story.get("story_web_path", ""))
    status = story.get("status", "monitoring")
    status_class = css_token(status)
    status_label = str(story.get("current_status_summary") or status).replace("_", " ").title()
    region_line = " / ".join(item for item in [story.get("primary_region", ""), story.get("country", "")] if item)
    updated_value = story.get("latest_updated_at") or story.get("updated_at") or story.get("latest_timestamp")
    utility_meta = f'Updated {format_display_date(updated_value)}' if updated_value else "Current file"
    lead_source = story.get("lead_source") or ""
    utility_label = lead_source or "Pathogen Dispatch"
    footer = (
        f'<p class="card-meta-text">{html.escape(region_line)}</p>'
        if region_line
        else ""
    )
    return (
        f'<article class="site-card story-card status-{status_class}">'
        '<div class="card-utility-row">'
        f'<span class="card-utility-label">{html.escape(utility_label)}</span>'
        f'<span class="card-utility-meta">{html.escape(utility_meta)}</span>'
        "</div>"
        f'<div class="story-status-line"><span class="story-status-pill">{html.escape(status_label)}</span></div>'
        f'<h3><a href="{html.escape(href)}">{html.escape(story.get("display_title", "Untitled story"))}</a></h3>'
        f'<p class="muted-note">{html.escape(story.get("latest_update_summary") or story.get("why_it_matters") or "")}</p>'
        f"{footer}"
        "</article>"
    )


def render_reference_card(reference: dict[str, Any], base_url: str) -> str:
    href = link_for(base_url, reference.get("reference_web_path", ""))
    taxonomic_line = " · ".join(
        canonical_meta([reference.get("pathogen"), reference.get("evidence_type")])
    )
    category_line = " · ".join(canonical_meta(reference.get("categories", [])[:2]))
    return (
        '<article class="site-card reference-card">'
        '<div class="card-utility-row">'
        '<span class="card-utility-label">Reference</span>'
        f'<span class="card-utility-meta">{html.escape(taxonomic_line or "Disease briefing")}</span>'
        "</div>"
        '<p class="kicker">Reference</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(reference.get("name", "Untitled reference"))}</a></h3>'
        f'<p class="muted-note">{html.escape(reference.get("why_reporters_care") or reference.get("atlas_summary") or "")}</p>'
        f'{f"<p class=\"card-meta-text\">{html.escape(category_line)}</p>" if category_line else ""}'
        "</article>"
    )


def canonical_meta(values: list[str]) -> list[str]:
    return [value for value in values if value]


def post_display_title(post: dict[str, Any]) -> str:
    return post.get("seo_title") or post.get("title") or "Untitled post"


def post_seo_description(post: dict[str, Any]) -> str:
    return (
        post.get("seo_description")
        or post.get("dek")
        or post.get("excerpt")
        or post.get("search_excerpt")
        or "Published writing from The Edge of Epidemiology."
    )


def post_indexing_strategy(post: dict[str, Any]) -> str:
    strategy = str(post.get("indexing_strategy") or "").strip()
    if strategy:
        return strategy
    if post.get("status") == "mirrored":
        return "mirrored"
    return "noindex_stub"


def post_topic_cluster(post: dict[str, Any]) -> str:
    if post.get("topic_cluster"):
        return str(post["topic_cluster"])
    text = " ".join(
        [
            str(post.get("slug", "")),
            str(post.get("title", "")),
            " ".join(str(topic) for topic in post.get("topics", [])),
            " ".join(str(tag) for tag in post.get("upstream_tags", [])),
        ]
    ).lower()
    for hub in TOPIC_HUBS:
        if any(keyword in text for keyword in hub["keywords"]):
            return str(hub["slug"])
    return "historical-epidemiology" if "history" in text else "epidemiologic-methods"


def topic_hub_title(slug: str) -> str:
    for hub in TOPIC_HUBS:
        if hub["slug"] == slug:
            return str(hub["title"])
    return slug.replace("-", " ").title()


def render_home(posts: list[dict[str, Any]], tools: list[dict[str, Any]], latest: dict[str, Any], base_url: str) -> str:
    stories = latest.get("stories", [])[:4]
    references = latest.get("reference", [])[:3]
    generated_at = format_display_date(latest.get("generated_at"))
    story_count = latest.get("story_count") or len(latest.get("stories", []))
    item_count = latest.get("item_count") or 0
    live_count = (latest.get("freshness_summary") or {}).get("live", 0)
    hero = f"""
      <section class="hero hero-home hero-open">
        <div class="hero-main">
          <p class="kicker">Devin Teichrow</p>
          <h2 class="hero-title">Disease travels with people and the things people build: ships, barracks, markets, wells, mosquitoes, rats, crowded rooms, and decisions made too late.</h2>
          <div class="hero-prose">
            <p class="subtitle">I&apos;m Devin Teichrow, a UCLA-trained epidemiologist and neuroscience researcher at UC Irvine working on migraine and Alzheimer&apos;s Disease and Related Dementias. My public science work focuses on how disease moves through populations, history, war, ecology, and infrastructure, including everything from modern outbreak reporting to historical epidemic reconstruction and interactive disease mapping.</p>
            <p class="subtitle">The Edge of Epidemiology is my home for longform essays, live outbreak coverage, disease atlases, methodological explainers, and projects exploring the intersection of epidemiology, geography, and history.</p>
          </div>
          <div class="hero-actions">
            <a class="button secondary" href="{html.escape(link_for(base_url, 'newsdesk/'))}">Open the newsdesk</a>
            <a class="button secondary" href="{html.escape(link_for(base_url, 'tools/'))}">Browse the exhibits</a>
            <a class="button secondary" href="{html.escape(link_for(base_url, 'essays/'))}">Read the essays</a>
          </div>
          <p class="hero-status-line"><span class="hero-status-label">Live desk</span> Updated {html.escape(generated_at)} · {html.escape(str(story_count))} active files · {html.escape(str(item_count))} tracked sources · {html.escape(str(live_count))} current updates</p>
        </div>
      </section>
    """
    newsdesk_cards = "".join(render_story_card(story, base_url) for story in stories)
    tool_cards = "".join(render_tool_card(tool, base_url) for tool in tools[:4])
    post_cards = "".join(render_post_card(post, base_url, featured=index == 0) for index, post in enumerate(posts[:6]))
    ref_cards = "".join(render_reference_card(ref, base_url) for ref in references)
    return base_html(
        title="Edge of Epidemiology",
        description="The umbrella publication for The Pathogen Dispatch, interactive public-health exhibits, historical epidemiology, and the Edge of Epidemiology writing archive.",
        active="home",
        base_url=base_url,
        body=hero
        + f'<section class="home-section opportunities-strip"><div class="section-head section-head-split"><div><p class="kicker">Opportunities</p><h2>Selected projects, collaborations, and commissions</h2><p class="muted-note">I am open to serious projects where epidemiology, data, public health, history, and technical implementation need to become one usable thing.</p></div><aside class="section-sidecar"><p class="section-sidecar-label">Contact</p><p><a href="mailto:devinteichrow@gmail.com">devinteichrow@gmail.com</a></p></aside></div><div class="section-actions"><a class="button secondary" href="{html.escape(link_for(base_url, "opportunities/"))}">Work with me</a></div></section>'
        + f'<section class="home-section newsdesk-panel"><div class="section-head section-head-split"><div><p class="kicker">Live desk</p><h2>The Pathogen Dispatch</h2><p class="muted-note">Current outbreak files, follow-up reporting, and source-first tracking for major infectious-disease stories.</p></div><aside class="section-sidecar"><p class="section-sidecar-label">Currently tracking</p><p>{html.escape(str(story_count))} active files · {html.escape(str(item_count))} tracked sources · Updated {html.escape(generated_at)}</p></aside></div><div class="card-grid three-up">{newsdesk_cards}</div><div class="section-actions"><a class="button secondary" href="{html.escape(link_for(base_url, "newsdesk/"))}">Go to the full newsdesk</a></div></section>'
        + f'<section class="home-section atlas-panel"><div class="section-head"><p class="kicker">Interactive exhibits</p><h2>Public disease exhibits for learning by looking</h2><p class="muted-note">Timelines, atlases, and source-first visual work for pathogen history, outbreak geography, and epidemiologic reasoning.</p></div><div class="card-grid two-up">{tool_cards}</div></section>'
        + f'<section class="home-section essay-panel"><div class="section-head"><p class="kicker">Published writing</p><h2>Recent essays</h2><p class="muted-note">Longer-form writing on outbreaks, evidence, history, ecology, and the politics of public health.</p></div><div class="card-grid three-up essays-grid">{post_cards}</div><div class="section-actions"><a class="button secondary" href="{html.escape(link_for(base_url, "essays/"))}">Browse all essays</a></div></section>'
        + f'<section class="home-section reference-panel"><div class="section-head"><p class="kicker">Field guides</p><h2>Reference layer</h2><p class="muted-note">Practical disease briefings on transmission, diagnostics, severity, and what matters when a pathogen reappears.</p></div><div class="card-grid three-up">{ref_cards}</div><div class="section-actions"><a class="button secondary" href="{html.escape(link_for(base_url, "reference/"))}">Open the reference desk</a></div></section>',
    )


def render_essays_index(posts: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(
        render_post_card(post, base_url, featured=index % 6 == 0)
        for index, post in enumerate(posts)
    )
    return base_html(
        title="Essays | Edge of Epidemiology",
        description="Published work from The Edge of Epidemiology.",
        active="essays",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Writing archive</p>
        <h2 class="hero-title">Published work from The Edge of Epidemiology</h2>
        <p class="subtitle">Essays on outbreaks, evidence, disease history, ecology, neuroepidemiology, and the public arguments that gather around health.</p>
      </section>
      <section class="panel panel-soft">
        <div class="section-head">
          <p class="kicker">Archive</p>
          <h2>{len(posts)} essays</h2>
          <p class="muted-note">Each entry keeps the essay connected to topic hubs, disease maps, and related work across the site.</p>
        </div>
        <div class="card-grid three-up essays-grid">{cards}</div>
      </section>
    """,
    )


def render_topic_hub_index(posts: list[dict[str, Any]], base_url: str) -> str:
    cards = []
    for hub in TOPIC_HUBS:
        count = sum(1 for post in posts if post_topic_cluster(post) == hub["slug"])
        cards.append(
            render_card(
                title=str(hub["title"]),
                href=link_for(base_url, f"topics/{hub['slug']}/"),
                kicker=f"{count} essay(s)",
                summary=str(hub["description"]),
                meta=["Topic hub"],
            )
        )
    return base_html(
        title="Topics | Edge of Epidemiology",
        description="Topic hubs for historical epidemiology, disease and war, pathogen geography, epidemiologic methods, wellness claims, and neuroepidemiology.",
        active="topics",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Topic hubs</p>
        <h2 class="hero-title">The main search lanes for The Edge of Epidemiology</h2>
        <p class="subtitle">A cleaner topical map for readers and search engines: disease history, war, ecology, geography, methods, wellness claims, and neuroepidemiology.</p>
      </section>
      <section class="panel panel-soft">
        <div class="card-grid three-up">{"".join(cards)}</div>
      </section>
    """,
    )


def render_topic_hub_page(hub: dict[str, Any], posts: list[dict[str, Any]], base_url: str) -> str:
    selected = [post for post in posts if post_topic_cluster(post) == hub["slug"]]
    cards = "".join(render_post_card(post, base_url, featured=index == 0) for index, post in enumerate(selected))
    if not cards:
        cards = '<p class="muted-note">No essays are currently assigned to this topic hub.</p>'
    return base_html(
        title=f"{hub['title']} Topic Hub | Edge of Epidemiology",
        description=str(hub["description"]),
        active="topics",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Topic hub</p>
        <h2 class="hero-title">{html.escape(str(hub['title']))}</h2>
        <p class="subtitle">{html.escape(str(hub['description']))}</p>
      </section>
      <section class="panel panel-soft">
        <div class="section-head">
          <p class="kicker">Essays</p>
          <h2>{len(selected)} linked piece(s)</h2>
          <p class="muted-note">This hub groups related writing so older essays keep sending authority to newer and more specific pages.</p>
        </div>
        <div class="card-grid three-up essays-grid">{cards}</div>
      </section>
    """,
    )


def render_post_page(post: dict[str, Any], atlases: dict[str, dict[str, Any]], posts: list[dict[str, Any]], base_url: str) -> str:
    related_atlas_links = []
    for atlas_id in post.get("related_atlases", []):
        entry = atlases.get(atlas_id)
        if not entry:
            continue
        related_atlas_links.append(
            f'<li><a href="{html.escape(link_for(base_url, entry.get("public_route", "")))}">{html.escape(entry.get("title", atlas_id))}</a></li>'
        )
    related_block = (
        '<div class="detail-block"><h3>Related atlases</h3><ul class="link-list">'
        + "".join(related_atlas_links)
        + "</ul></div>"
        if related_atlas_links
        else '<div class="detail-block"><h3>Related atlases</h3><p class="muted-note">No atlas links have been curated for this piece yet.</p></div>'
    )
    topics = "".join(f'<span class="badge">{html.escape(topic)}</span>' for topic in post.get("topics", []))
    read_url = post.get("canonical_url", "")
    strategy = post_indexing_strategy(post)
    is_indexable = strategy in INDEXABLE_POST_STRATEGIES
    status_label = "Evergreen essay" if is_indexable else "Essay archive"
    display_title = post_display_title(post)
    description = post_seo_description(post)
    original_title = post.get("title") or ""
    cluster = post_topic_cluster(post)
    cluster_link = link_for(base_url, f"topics/{cluster}/")
    cluster_title = topic_hub_title(cluster)
    related_posts = [
        item
        for item in posts
        if item is not post and item.get("slug") != post.get("slug") and post_topic_cluster(item) == cluster
    ][:5]
    related_essay_items = "".join(
        f'<li><a href="{html.escape(link_for(base_url, f"essays/{item.get("slug", "")}/"))}">{html.escape(post_display_title(item))}</a></li>'
        for item in related_posts
    )
    related_essay_block = (
        '<div class="detail-block"><h3>Related essays</h3><ul class="link-list">'
        + related_essay_items
        + "</ul></div>"
        if related_essay_items
        else ""
    )
    keyword = post.get("primary_keyword") or cluster_title
    return base_html(
        title=f"{display_title} | Edge of Epidemiology",
        description=description,
        active="essays",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Essay</p>
        <h2 class="hero-title">{html.escape(display_title)}</h2>
        <p class="subtitle">{html.escape(description)}</p>
        <div class="meta-row">
          <span class="badge accent">{html.escape(status_label)}</span>
          <span class="badge">{html.escape(format_display_date(post.get('date')))}</span>
          <span class="badge">By Devin Teichrow</span>
          {topics}
        </div>
        <div class="hero-actions">
          <a class="button primary" href="{html.escape(read_url)}">Read on Substack</a>
        </div>
      </section>
      <section class="panel detail-grid">
        <div class="detail-block">
          <h3>Contents</h3>
          <ul class="link-list">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#read">Read the essay</a></li>
            <li><a href="#related-work">Related work</a></li>
          </ul>
        </div>
        <div class="detail-block">
          <h3>Topic hub</h3>
          <p><a href="{html.escape(cluster_link)}">{html.escape(cluster_title)}</a></p>
        </div>
        <div class="detail-block">
          <h3>Search focus</h3>
          <p>{html.escape(str(keyword))}</p>
        </div>
        <div class="detail-block">
          <h3>Author</h3>
          <p>By Devin Teichrow. Published {html.escape(format_display_date(post.get('date')))}.</p>
        </div>
      </section>
      <section class="panel detail-grid" id="overview">
        <div class="detail-block">
          <h3>Overview</h3>
          <p>{html.escape(description)}</p>
          <p>{html.escape(post.get('excerpt') or post.get('search_excerpt') or '')}</p>
        </div>
      </section>
      <section class="panel detail-grid" id="read">
        <div class="detail-block">
          <h3>Read the full essay</h3>
          <p><a href="{html.escape(read_url)}">{html.escape(read_url)}</a></p>
        </div>
        <div class="detail-block">
          <h3>Archive note</h3>
          <p>This page keeps the essay connected to related topics, maps, and reference pages on The Edge of Epidemiology.</p>
        </div>
      </section>
      <section class="panel detail-grid" id="related-work">
        {related_block}
        {related_essay_block}
      </section>
    """,
    )


def render_atlas_hub(atlases: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(render_atlas_card(entry, base_url) for entry in atlases)
    return base_html(
        title="Atlases | Edge of Epidemiology",
        description="Legacy atlas route for Edge of Epidemiology map projects, including pathogen, maritime, Viking, and Revolutionary War disease mapping.",
        active="tools",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Atlases</p>
        <h2 class="hero-title">The atlas family now lives inside Interactive Exhibits</h2>
        <p class="subtitle">Disease maps, historical exhibits, and visual tools for following pathogens through geography, infrastructure, ecology, and time.</p>
        <div class="hero-actions"><a class="button secondary" href="{html.escape(link_for(base_url, "tools/"))}">Open Exhibits</a></div>
      </section>
      <section class="panel panel-soft">
        <div class="card-grid two-up">{cards}</div>
      </section>
    """,
    )


def render_tools_hub(tools: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(render_tool_card(entry, base_url) for entry in tools)
    return base_html(
        title="Interactive Exhibits | Edge of Epidemiology",
        description="Interactive timelines, atlases, and evidence-led public-health exhibits from Edge of Epidemiology.",
        active="tools",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Interactive exhibits</p>
        <h2 class="hero-title">Interactive epidemiology exhibits for disease history, outbreak geography, and public-health reasoning</h2>
        <p class="subtitle">Timelines, atlases, ledgers, and visual public-health exhibits for exploring epidemic history, pathogen geography, and epidemiologic reasoning.</p>
      </section>
      <section class="panel panel-soft">
        <div class="card-grid two-up">{cards}</div>
      </section>
    """,
    )


def render_reference_index(references: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(render_reference_card(reference, base_url) for reference in references)
    return base_html(
        title="Reference | Edge of Epidemiology",
        description="Disease sheets and desk notes linked to the live newsdesk and atlas work.",
        active="reference",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Reference desk</p>
        <h2 class="hero-title">Disease sheets that stay close to reporting and atlas work</h2>
        <p class="subtitle">These guides are imported from the live desk and re-surfaced here so they are usable as part of one publication instead of an isolated utility layer.</p>
      </section>
      <section class="panel"><div class="card-grid three-up">{cards}</div></section>
    """,
    )


def render_stories_index(stories: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(render_story_card(story, base_url) for story in stories)
    return base_html(
        title="Stories | Edge of Epidemiology",
        description="Active outbreak files from The Pathogen Dispatch.",
        active="newsdesk",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Stories</p>
        <h2 class="hero-title">Tracked outbreak files</h2>
        <p class="subtitle">These are the current story files from the live newsdesk, linked into the umbrella site without losing their underlying reporting structure.</p>
      </section>
      <section class="panel"><div class="card-grid three-up">{cards}</div></section>
    """,
    )


def title_from_story_filename(filename: str) -> str:
    stem = Path(filename).stem
    slug = re.sub(r"^story_[0-9a-f]+-?", "", stem)
    if not slug:
        return "Archived story file"
    return slug.replace("-", " ").title()


def render_archived_story_placeholder(filename: str, base_url: str) -> str:
    story_title = title_from_story_filename(filename)
    return base_html(
        title=f"{story_title} | Archived story file",
        description="Archived Pathogen Dispatch story reference.",
        active="newsdesk",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Archived story file</p>
        <h2 class="hero-title">{html.escape(story_title)}</h2>
        <p class="subtitle">Earlier Pathogen Dispatch coverage retained for archive continuity.</p>
        <div class="hero-actions">
          <a class="button secondary" href="{html.escape(link_for(base_url, "stories/"))}">Current story files</a>
          <a class="button secondary" href="{html.escape(link_for(base_url, "newsdesk/archive/"))}">Newsdesk archive</a>
        </div>
      </section>
    """,
    )


def ensure_archived_story_placeholders(docs_dir: Path, base_url: str) -> None:
    story_hrefs: set[str] = set()
    for page in (docs_dir / "newsdesk").rglob("*.html"):
        page_text = page.read_text()
        story_hrefs.update(re.findall(r'href="[^"]*/stories/([^"#?]+\.html)', page_text))
    for filename in sorted(story_hrefs):
        dest = docs_dir / "stories" / filename
        if dest.exists():
            continue
        ensure_dir(dest.parent)
        dest.write_text(render_archived_story_placeholder(filename, base_url))


def render_historical_page(posts: list[dict[str, Any]], atlases: list[dict[str, Any]], base_url: str) -> str:
    selected = [
        post for post in posts
        if "history" in [topic.lower() for topic in post.get("topics", [])]
        or any(atlas_id in {"revolutionary-war-atlas", "viking-health-atlas", "maritime-disease-atlas"} for atlas_id in post.get("related_atlases", []))
    ][:12]
    cards = "".join(render_post_card(post, base_url) for post in selected)
    atlas_cards = "".join(render_atlas_card(entry, base_url) for entry in atlases if entry.get("atlas_id") in {"maritime-disease-atlas", "revolutionary-war-atlas", "viking-health-atlas"})
    return base_html(
        title="Historical | Edge of Epidemiology",
        description="Historical epidemiology essays and atlas projects from Edge of Epidemiology.",
        active="historical",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Historical desk</p>
        <h2 class="hero-title">Disease, empire, war, routes, and historical epidemiology</h2>
        <p class="subtitle">This section pulls the history-facing writing and atlas work together so it can be browsed as a coherent body of work.</p>
      </section>
      <section class="panel panel-soft">
        <div class="section-head"><p class="kicker">Atlases</p><h2>Historical map projects</h2></div>
        <div class="card-grid three-up">{atlas_cards}</div>
      </section>
      <section class="panel panel-soft">
        <div class="section-head"><p class="kicker">Essays</p><h2>History-facing published work</h2></div>
        <div class="card-grid three-up">{cards}</div>
      </section>
    """,
    )


def render_methods_page(base_url: str) -> str:
    return base_html(
        title="Methods | Edge of Epidemiology",
        description="Methods and sourcing principles for The Edge of Epidemiology.",
        active="methods",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Methods</p>
        <h2 class="hero-title">How I handle evidence, uncertainty, and disease stories</h2>
        <p class="subtitle">The work here keeps outbreak reporting, historical argument, and epidemiologic explanation separate enough that readers can see what kind of claim is being made.</p>
      </section>
      <section class="panel prose">
        <h3>Publication archive</h3>
        <p>The essay archive keeps longform writing connected to topic hubs, reference pages, and interactive maps, so a reader can move from an argument to the surrounding disease ecology.</p>
        <h3>Live desk</h3>
        <p>The Pathogen Dispatch follows current outbreak reporting with visible source links, caveats, and separate story files for major public-health signals.</p>
        <h3>Atlas evidence policy</h3>
        <p>Atlas geometry and route claims are treated as arguments that need evidence. Visuals help readers inspect the ecology, but they do not stand in for proof.</p>
      </section>
    """,
    )


def render_about_page(base_url: str) -> str:
    return base_html(
        title="About | Edge of Epidemiology",
        description="About Edge of Epidemiology.",
        active="about",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open about-hero">
        <p class="kicker">About</p>
        <h2 class="hero-title">About Devin Teichrow and The Edge of Epidemiology</h2>
        <p class="subtitle">An epidemiology project built around outbreak reporting, disease geography, historical epidemiology, and science communication.</p>
      </section>
      <section class="about-layout">
        <div class="about-block">
          <p class="kicker">Bio</p>
          <h3>Research and public work</h3>
          <p>I’m Devin Teichrow, an epidemiologist based at the University of California, Irvine, where I am an epidemiology specialist in the lab of Dr. Ali Ezzati. My public science work sits at the intersection of infectious disease, historical analysis, and evidence communication.</p>
          <p>I received my training in epidemiology at UCLA and currently work in neurology research, where my projects have focused on cognition, migraine, aging, ecological momentary assessment, and digital health methods. Alongside my academic work, I’ve developed a growing interest in how disease moves through populations beyond the clinic or dataset: through war, migration, infrastructure, ecology, trade, and geography.</p>
          <p>That broader perspective is what led to my <a href="https://theedgeofepidemiology.substack.com">Substack, The Edge of Epidemiology</a>. My writing can also currently be found in The Viking Herald and The Age of Exploration.</p>
        </div>
        <div class="about-block">
          <p class="kicker">Project</p>
          <h3>What the project became</h3>
          <p>The Edge of Epidemiology began as a place to write about historical epidemics and overlooked disease stories, but it has gradually expanded into something wider: a hybrid of outbreak reporting, historical epidemiology, disease atlases, methodological explainers, and longform essays about how pathogens shape societies over time.</p>
          <p>Much of modern disease reporting treats outbreaks as isolated events. I’m more interested in the long view of how epidemics recur, how institutions respond, how public fear evolves, and how the same epidemiologic patterns reappear across centuries under different names. I’m also interested in the biological, genetic, and societal changes that occur as a result of infectious disease epidemics.</p>
        </div>
        <div class="about-block">
          <p class="kicker">Interests</p>
          <h3>Current areas of focus</h3>
          <ul class="link-list about-topic-list">
            <li>plague outbreaks during war</li>
            <li>vector-borne disease and climate</li>
            <li>misinformation and risk communication</li>
            <li>ancient infectious disease</li>
            <li>neuroscience and cognition</li>
            <li>outbreak surveillance and preparedness</li>
            <li>the hidden ecological consequences of conflict and migration</li>
          </ul>
        </div>
        <div class="about-block">
          <p class="kicker">Framing</p>
          <h3>Why geography matters here</h3>
          <p>The site’s atlas projects and interactive maps grew out of a belief that epidemiology is fundamentally geographic. Disease is biological, spatial, political, ecological, economic, cultural, and historical. Pathogens move along trade routes, through armies, across borders, inside housing systems, and within the infrastructure societies build for themselves.</p>
          <p>My goal is to make epidemiology feel legible, historically grounded, and intellectually honest for a broader audience without flattening uncertainty or complexity. Outside of research and writing, I build interactive disease atlases, epidemiology exhibits, and science communication projects focused on making complex public health topics more understandable and visually intuitive.</p>
        </div>
        <div class="about-block">
          <p class="kicker">Links</p>
          <h3>Elsewhere</h3>
          <ul class="link-list about-links">
            <li><a href="https://theedgeofepidemiology.substack.com">The Edge of Epidemiology on Substack</a></li>
            <li><a href="{html.escape(link_for(base_url, "methods/"))}">Methods</a></li>
            <li><a href="{html.escape(link_for(base_url, "atlases/"))}">Atlas family</a></li>
            <li><a href="{html.escape(link_for(base_url, "newsdesk/"))}">The Pathogen Dispatch</a></li>
          </ul>
        </div>
      </section>
    """,
    )


def render_opportunities_page(base_url: str) -> str:
    services = [
        ("Evidence and analysis", "Study design, literature synthesis, epidemiologic framing, R/Python analysis, dashboards, and interpretation that keeps uncertainty visible."),
        ("Science communication", "Essays, explainers, editorial strategy, research translation, pitch development, and historically grounded health writing."),
        ("Interactive exhibits and atlases", "Interactive maps, outbreak trackers, disease reference layers, historical epidemiology projects, and source-first public-health exhibits."),
    ]
    fit_items = [
        "infectious disease",
        "neurology and cognition",
        "historical epidemiology",
        "public-health data",
        "maps and dashboards",
        "research translation",
    ]
    social_links = [
        ("Substack", "The Edge of Epidemiology", "https://theedgeofepidemiology.substack.com", ""),
        ("X / Twitter", "@edgeofepi", "https://x.com/edgeofepi", ""),
        ("Instagram", "@edgeofepi", "https://www.instagram.com/edgeofepi/", ""),
        ("LinkedIn", "Devin Teichrow MSc", "https://www.linkedin.com/in/devin-teichrow-msc-938942254", ""),
        ("Medium", "@EdgeofEpi", "https://medium.com/@EdgeofEpi", ""),
    ]
    service_cards = "".join(
        f'<article class="opportunity-mini-card"><p class="kicker">Project lane</p><h3>{html.escape(title)}</h3><p>{html.escape(summary)}</p></article>'
        for title, summary in services
    )
    fit_list = "".join(f'<span class="fit-chip">{html.escape(item)}</span>' for item in fit_items)
    social_items = "".join(
        (
            f'<a class="social-link" href="{html.escape(url)}"><span class="social-label">{html.escape(label)}</span><span class="social-name">{html.escape(name)}</span></a>'
            if url
            else f'<div class="social-link social-link-disabled" aria-disabled="true"><span class="social-label">{html.escape(label)}</span><span class="social-name">{html.escape(name)}</span><span class="social-status">{html.escape(status)}</span></div>'
        )
        for label, name, url, status in social_links
    )
    return base_html(
        title="Opportunities | Edge of Epidemiology",
        description="Work with Devin Teichrow on epidemiology, evidence, disease history, science communication, data projects, and public-health exhibits.",
        active="opportunities",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open opportunities-hero">
        <p class="kicker">Opportunities</p>
        <h2 class="hero-title">Bring me the projects where disease, data, history, and public understanding collide.</h2>
        <p class="subtitle">I work best on projects that need more than one narrow lane: epidemiologic judgment, statistical care, historical context, clear explanation, and enough technical building to turn an idea into something people can actually use.</p>
        <div class="hero-actions">
          <a class="button primary" href="mailto:devinteichrow@gmail.com">Email me about a project</a>
          <a class="button secondary" href="https://theedgeofepidemiology.substack.com">Read The Edge of Epidemiology</a>
        </div>
      </section>
      <section class="opportunities-showcase">
        <div class="opportunities-main">
          <div class="section-head">
            <p class="kicker">Selected work</p>
            <h2>Useful where evidence has to become public, visual, or usable.</h2>
            <p class="muted-note">The fit is not generic consulting. It is the overlap: epidemiologic reasoning, historical imagination, data work, technical implementation, and clear public explanation.</p>
          </div>
          <div class="opportunity-mini-grid">{service_cards}</div>
          <div class="fit-chip-row">{fit_list}</div>
        </div>
        <aside class="opportunities-contact-card">
          <div>
            <p class="kicker">Get in touch</p>
            <h2>Send the actual shape of the problem.</h2>
            <p>If you want to collaborate, commission a project, invite me to speak, ask about consulting, or pitch something strange but serious, send what you are trying to do, who it is for, what exists already, and the timeline or budget if relevant.</p>
          </div>
          <a class="button primary" href="mailto:devinteichrow@gmail.com">devinteichrow@gmail.com</a>
          <div class="social-grid compact-social-grid">{social_items}</div>
          <p class="domain-note">Domain direction: use devinteichrow.com as the canonical personal site when DNS is ready.</p>
        </aside>
      </section>
    """,
    )


def render_search_page(base_url: str) -> str:
    endpoint = link_for(base_url, "app_exports/search-index.json")
    return base_html(
        title="Search | Edge of Epidemiology",
        description="Search across essays, atlases, stories, and reference pages.",
        active="search",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Search</p>
        <h2 class="hero-title">Search the umbrella site</h2>
        <p class="subtitle">Essays, atlases, references, and live outbreak files share one static search index.</p>
      </section>
      <section class="panel">
        <div class="search-shell" data-search-source="{html.escape(endpoint)}">
          <div class="search-controls">
            <input class="filter-input" type="search" data-search-input placeholder="Search titles, tags, places, pathogens, or phrases" />
            <select class="filter-select" data-search-filter>
              <option value="all">All sections</option>
              <option value="Tool">Exhibits</option>
              <option value="Essay">Essays</option>
              <option value="Atlas">Atlases</option>
              <option value="Newsdesk">Newsdesk</option>
              <option value="Reference">Reference</option>
            </select>
          </div>
          <div class="card-grid three-up" data-search-results></div>
        </div>
      </section>
    """,
    )


def render_curated_atlas_page(entry: dict[str, Any], posts: list[dict[str, Any]], base_url: str) -> str:
    related = [
        post for post in posts
        if entry.get("atlas_id") in post.get("related_atlases", [])
    ][:8]
    related_cards = "".join(render_post_card(post, base_url) for post in related) or '<p class="muted-note">No linked essays are curated here yet.</p>'
    return base_html(
        title=f"{entry.get('title')} | Edge of Epidemiology",
        description=entry.get("summary", ""),
        active="tools",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">{html.escape(entry.get('status_label', 'Atlas'))}</p>
        <h2 class="hero-title">{html.escape(entry.get('title', 'Atlas'))}</h2>
        <p class="subtitle">{html.escape(entry.get('summary', ''))}</p>
      </section>
      <section class="panel prose">
        <h3>Current state</h3>
        <p>{html.escape(entry.get('long_note', 'This atlas section is being prepared as a fuller public geography project.'))}</p>
        <h3>Evidence model</h3>
        <p>{html.escape(entry.get('evidence_model', 'Curated historical and epidemiologic sources.'))}</p>
      </section>
      <section class="panel">
        <div class="section-head"><p class="kicker">Related writing</p><h2>Connected essays</h2></div>
        <div class="card-grid three-up">{related_cards}</div>
      </section>
    """,
    )


def resolve_epidossier_docs() -> Path:
    env_path = Path(str(Path.cwd()))
    _ = env_path  # keep lint calm in static script environments
    local_candidate = PROJECT_ROOT.parent / "epi-dossier" / "docs"
    if local_candidate.exists():
        return local_candidate

    temp_root = temporary_directory("epi-dossier-import-")
    clone_dir = temp_root / "epi-dossier"
    subprocess.run(
        ["git", "clone", "--depth", "1", DEFAULT_EPI_DOSSIER_REPO, str(clone_dir)],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    docs_path = clone_dir / "docs"
    if not docs_path.exists():
        raise FileNotFoundError("Cloned epi-dossier repo did not contain docs/")
    return docs_path


def import_copy(src: Path, dest: Path) -> None:
    ensure_dir(dest.parent)
    shutil.copy2(src, dest)


def shell_wrapper_css(base_url: str) -> str:
    return f"""
<style id="eoe-shell-import-style">
  body {{ padding-top: 112px !important; }}
  .eoe-shell-nav {{
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 10000;
    background: linear-gradient(180deg, rgba(15, 20, 27, 0.98), rgba(21, 29, 39, 0.98));
    color: #efe6d6;
    border-bottom: 1px solid rgba(214, 202, 183, 0.2);
    box-shadow: 0 14px 34px rgba(4, 7, 10, 0.28);
  }}
  .eoe-shell-nav-inner {{
    max-width: 1160px;
    margin: 0 auto;
    padding: 18px 18px 16px;
    display: grid;
    gap: 12px;
    font-family: "Avenir Next", "Helvetica Neue", sans-serif;
  }}
  .eoe-shell-brand {{
    display: inline-flex;
    flex-wrap: wrap;
    column-gap: 0.32em;
    row-gap: 0.12em;
    align-items: baseline;
    color: #f5ecdd;
    font: 700 clamp(1.2rem, 2vw, 1.65rem)/1.05 "Iowan Old Style", Georgia, serif;
    text-decoration: none;
    letter-spacing: 0;
  }}
  .eoe-shell-byline {{
    color: #8fb8d8;
    font: 600 0.48em/1 "Avenir Next", "Helvetica Neue", sans-serif;
  }}
  .eoe-shell-brand:hover {{ text-decoration: none; }}
  .eoe-shell-links {{
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    padding-top: 10px;
    border-top: 1px solid rgba(214, 202, 183, 0.18);
  }}
  .eoe-shell-links a {{
    flex: 0 0 auto;
    padding: 0 0 6px;
    border-bottom: 2px solid transparent;
    color: rgba(239, 230, 214, 0.76);
    text-decoration: none;
    background: transparent;
    font-size: 0.95rem;
    font-weight: 500;
    white-space: nowrap;
    transition: color 180ms ease, border-color 180ms ease;
  }}
  .eoe-shell-links a.active {{
    border-color: rgba(201, 168, 76, 0.88);
    color: #f8f1e6;
    font-weight: 700;
  }}
  .eoe-shell-links a:hover {{
    color: #f8f1e6;
    text-decoration: none;
    border-color: rgba(201, 168, 76, 0.52);
  }}
  /* Cleaner fix would live in the Pathogen Dispatch renderer, but this import-layer pass
     keeps the simplification isolated to the umbrella site. */
  .site-header,
  .hero,
  .panel,
  .section-nav {{
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }}
  .site-header {{
    padding: 0 0 12px !important;
    gap: 12px !important;
  }}
  .site-header-title {{
    font-size: 1rem !important;
    color: #42515e !important;
  }}
  .site-nav,
  .section-nav-links {{
    gap: 14px !important;
  }}
  .site-nav-link,
  .section-nav-link {{
    padding: 0 0 5px !important;
    border: 0 !important;
    border-radius: 0 !important;
    border-bottom: 2px solid transparent !important;
    background: transparent !important;
    box-shadow: none !important;
    color: #42515e !important;
    font-weight: 500 !important;
  }}
  .site-nav-link:hover,
  .section-nav-link:hover {{
    background: transparent !important;
    color: #173046 !important;
    text-decoration: underline !important;
  }}
  .site-nav-link.active {{
    color: #173046 !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    border-color: rgba(141, 63, 47, 0.48) !important;
  }}
  .hero {{
    padding: 0 0 6px !important;
    overflow: visible !important;
  }}
  .hero::before,
  .hero::after,
  .panel::before,
  .panel::after,
  .site-header::before,
  .site-header::after {{
    display: none !important;
  }}
  .panel,
  .panel-grid {{
    gap: 16px !important;
  }}
  .panel > h2:first-child,
  .panel > .muted-note:first-child {{
    margin-top: 0 !important;
  }}
  .section-nav {{
    display: none !important;
  }}
  .meta-row-plain {{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
  }}
  .meta-inline,
  .card-meta-text {{
    color: #42515e;
    font: 500 0.86rem/1.55 "Avenir Next", "Helvetica Neue", sans-serif;
  }}
  .card-meta-text {{
    margin: 0;
  }}
  .atlas-status-pill,
  .story-status-pill {{
    letter-spacing: 0.08em !important;
    text-transform: uppercase !important;
  }}
  .site-card .meta-row .badge {{
    max-width: none;
  }}
  .link-pill {{
    background: rgba(255,252,245,0.92) !important;
  }}
  @media (max-width: 760px) {{
    body {{ padding-top: 148px !important; }}
    .eoe-shell-links {{
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      width: 100%;
      padding-bottom: 2px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      touch-action: pan-x;
      overscroll-behavior-x: contain;
    }}
    .eoe-shell-links::-webkit-scrollbar {{ display: none; }}
  }}
</style>
"""


def imported_shell_nav(active: str, base_url: str) -> str:
    links = [
        ("Home", ""),
        ("Newsdesk", "newsdesk/"),
        ("Notebook", "notebook/"),
        ("Pathogen Atlas", "atlases/pathogen/"),
        ("Maritime Atlas", "atlases/maritime/"),
        ("Essays", "essays/"),
        ("Topics", "topics/"),
        ("Historical", "historical/"),
        ("Reference", "reference/"),
        ("Opportunities", "opportunities/"),
        ("Search", "search/"),
    ]
    link_html = []
    for label, path in links:
        cls = "active" if label.lower() == active.lower() else ""
        link_html.append(f'<a class="{cls}" href="{html.escape(link_for(base_url, path))}">{html.escape(label)}</a>')
    return (
        '<div class="eoe-shell-nav">'
        '<div class="eoe-shell-nav-inner">'
        f'<a class="eoe-shell-brand" href="{html.escape(link_for(base_url, ""))}"><span>The Edge of Epidemiology</span> <span class="eoe-shell-byline">by Devin Teichrow</span></a>'
        f'<nav class="eoe-shell-links" aria-label="Umbrella navigation">{"".join(link_html)}</nav>'
        "</div>"
        "</div>"
    )


def rewrite_imported_paths(html_text: str, base_url: str) -> str:
    replacements = {
        './index.html': link_for(base_url, "newsdesk/"),
        './notebook.html': link_for(base_url, "notebook/"),
        '../notebook.html': link_for(base_url, "notebook/"),
        './atlas.html': link_for(base_url, "atlases/pathogen/"),
        '../atlas.html': link_for(base_url, "atlases/pathogen/"),
        './outbreaks.html': link_for(base_url, "newsdesk/outbreaks/"),
        '../outbreaks.html': link_for(base_url, "newsdesk/outbreaks/"),
        '../../outbreaks.html': link_for(base_url, "newsdesk/outbreaks/"),
        './watch.html': link_for(base_url, "newsdesk/watch/"),
        '../watch.html': link_for(base_url, "newsdesk/watch/"),
        './africa.html': link_for(base_url, "newsdesk/africa/"),
        '../africa.html': link_for(base_url, "newsdesk/africa/"),
        './asia.html': link_for(base_url, "newsdesk/asia/"),
        '../asia.html': link_for(base_url, "newsdesk/asia/"),
        './research.html': link_for(base_url, "newsdesk/research/"),
        '../research.html': link_for(base_url, "newsdesk/research/"),
        './official.html': link_for(base_url, "newsdesk/official/"),
        '../official.html': link_for(base_url, "newsdesk/official/"),
        './historical.html': link_for(base_url, "newsdesk/historical/"),
        '../historical.html': link_for(base_url, "newsdesk/historical/"),
        './archive/index.html': link_for(base_url, "newsdesk/archive/"),
        '../archive/index.html': link_for(base_url, "newsdesk/archive/"),
        './stories/': link_for(base_url, "stories/"),
        '../stories/': link_for(base_url, "stories/"),
        '../../stories/': link_for(base_url, "stories/"),
        './reference/': link_for(base_url, "reference/"),
        '../reference/': link_for(base_url, "reference/"),
        '../../reference/': link_for(base_url, "reference/"),
        './app_exports/': link_for(base_url, "app_exports/"),
        '../app_exports/': link_for(base_url, "app_exports/"),
        '../../app_exports/': link_for(base_url, "app_exports/"),
        './2026/': link_for(base_url, "newsdesk/2026/"),
        '../2026/': link_for(base_url, "newsdesk/2026/"),
        '../../2026/': link_for(base_url, "newsdesk/2026/"),
        './latest.html': link_for(base_url, "newsdesk/latest.html"),
        './latest.md': link_for(base_url, "newsdesk/latest.md"),
        '../latest.html': link_for(base_url, "newsdesk/latest.html"),
        '../../latest.html': link_for(base_url, "newsdesk/latest.html"),
    }
    for needle, replacement in replacements.items():
        html_text = html_text.replace(f'href="{needle}', f'href="{replacement}')
        html_text = html_text.replace(f"href='{needle}", f"href='{replacement}")
        html_text = html_text.replace(f'src="{needle}', f'src="{replacement}')
        html_text = html_text.replace(f"src='{needle}", f"src='{replacement}")
        html_text = html_text.replace(f'fetch("{needle}', f'fetch("{replacement}')
        html_text = html_text.replace(f"fetch('{needle}", f"fetch('{replacement}")
    return html_text


ARTICLE_RE = re.compile(r'(<article class="site-card[^"]*">.*?</article>)', re.S)
META_ROW_RE = re.compile(r'<div class="meta-row">.*?</div>', re.S)
BADGE_TEXT_RE = re.compile(r'<span class="badge(?: [^"]+)?">(.*?)</span>', re.S)
LINK_PILL_RE = re.compile(r'<a class="link-pill"[^>]*>.*?</a>', re.S)

STATUS_TEXTS = {
    "active investigation",
    "expanding coverage",
    "quiet retained",
    "official followup",
    "official follow-up",
    "archival watch",
    "consensus",
    "mixed / debated",
    "contested",
    "weakly supported",
    "written here directly",
    "adjacent writing exists",
    "adjacent writing",
    "no dedicated post yet",
    "live atlas",
    "prototype atlas",
    "curated section",
    "metadata-only signal",
}
NOISE_TEXTS = {
    "live fetch",
    "wrapper only",
    "resolved article",
    "official agency",
    "general outlet",
    "metadata only",
    "open access",
    "login likely",
    "direct article",
}


def strip_html_tags(value: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", "", value)).strip()


def extract_badge_texts(fragment: str) -> list[str]:
    return [strip_html_tags(match) for match in BADGE_TEXT_RE.findall(fragment) if strip_html_tags(match)]


def looks_like_date(text: str) -> bool:
    return bool(re.search(r"\b\d{4}-\d{2}-\d{2}", text))


def is_count_text(text: str) -> bool:
    lowered = text.lower()
    return any(token in lowered for token in ("item(s)", "source(s)", "official", "route(s)", "citation(s)"))


def is_noise_text(text: str) -> bool:
    return text.lower() in NOISE_TEXTS


def status_text_for(texts: list[str]) -> str:
    for text in texts:
        if text.lower() in STATUS_TEXTS:
            return text
    return ""


def joined_meta(values: list[str]) -> str:
    return " · ".join(value for value in values if value)


def simplify_imported_article(article_html: str) -> str:
    rows = META_ROW_RE.findall(article_html)
    if not rows:
        return article_html

    badge_texts: list[str] = []
    link_rows: list[str] = []
    for row in rows:
        if "badge" in row:
            badge_texts.extend(extract_badge_texts(row))
        if "link-pill" in row:
            links = "".join(LINK_PILL_RE.findall(row))
            if links:
                link_rows.append(f'<div class="meta-row">{links}</div>')

    article_without_rows = META_ROW_RE.sub("", article_html)
    summary_parts: list[str] = []
    summary_html = ""

    if "atlas-teaser-card" in article_html:
        status = status_text_for(badge_texts)
        feature_text = joined_meta([text for text in badge_texts if is_count_text(text)])
        writing_state = next((text for text in badge_texts if "writing" in text.lower() or "dedicated post" in text.lower()), "")
        if status or feature_text:
            summary_html += '<div class="meta-row meta-row-plain">'
            if status:
                summary_html += f'<span class="story-status-pill atlas-status-pill">{html.escape(status)}</span>'
            if feature_text:
                summary_html += f'<span class="meta-inline">{html.escape(feature_text)}</span>'
            summary_html += "</div>"
        if writing_state:
            summary_html += f'<p class="card-meta-text">{html.escape(writing_state)}</p>'
    elif "feature-card" in article_html:
        status = status_text_for(badge_texts)
        geography = joined_meta(
            [
                text for text in badge_texts
                if text and not is_count_text(text) and not looks_like_date(text) and text.lower() not in STATUS_TEXTS
            ]
        )
        if status or geography:
            summary_html += '<div class="meta-row meta-row-plain">'
            if status:
                summary_html += f'<span class="story-status-pill">{html.escape(status)}</span>'
            if geography:
                summary_html += f'<span class="meta-inline">{html.escape(geography)}</span>'
            summary_html += "</div>"
    else:
        source = ""
        if "<strong>Source:</strong>" not in article_html:
            source = next(
                (
                    text for text in badge_texts
                    if text
                    and not looks_like_date(text)
                    and not is_noise_text(text)
                    and not text.lower().startswith("doi:")
                    and text.lower() not in STATUS_TEXTS
                ),
                "",
            )
        date_text = next((text for text in badge_texts if looks_like_date(text)), "")
        status = next(
            (
                text for text in badge_texts
                if text.lower() not in NOISE_TEXTS and text.lower() in STATUS_TEXTS and text.lower() != "official agency"
            ),
            "",
        )
        doi_text = next((text for text in badge_texts if text.lower().startswith("doi:")), "")
        meta_text = joined_meta([source, date_text])
        if status or meta_text:
            summary_html += '<div class="meta-row meta-row-plain">'
            if status:
                summary_html += f'<span class="story-status-pill">{html.escape(status)}</span>'
            if meta_text:
                summary_html += f'<span class="meta-inline">{html.escape(meta_text)}</span>'
            summary_html += "</div>"
        if doi_text:
            summary_html += f'<p class="card-meta-text">{html.escape(doi_text)}</p>'

    if link_rows:
        summary_html += "".join(link_rows)

    return article_without_rows.replace("</article>", f"{summary_html}</article>")


def simplify_imported_cards(html_text: str) -> str:
    return ARTICLE_RE.sub(lambda match: simplify_imported_article(match.group(1)), html_text)


def remove_imported_build_meta(html_text: str) -> str:
    html_text = re.sub(
        r'\s*<span class="badge(?: [^"]+)?">First seen:.*?</span>',
        "",
        html_text,
        flags=re.S,
    )
    html_text = re.sub(
        r'\s*<div class="meta-row">(?=[\s\S]*?</div>)(?=[\s\S]{0,900}(?:Official confidence|Direct links|Refresh cache|Fallback cache|Retained:|Wire confidence|Wrapper only confidence)).*?</div>',
        "",
        html_text,
        flags=re.S,
    )
    return html_text


def remove_imported_section_nav(html_text: str) -> str:
    return re.sub(r'\s*<nav class="section-nav panel utility-panel".*?</nav>', "", html_text, flags=re.S)


def ensure_meta_description(html_text: str, description: str) -> str:
    if '<meta name="description"' in html_text:
        return html_text
    return html_text.replace(
        "</head>",
        f'<meta name="description" content="{html.escape(description)}" /></head>',
        1,
    )


def transform_imported_html(html_text: str, *, active: str, base_url: str) -> str:
    html_text = rewrite_imported_paths(html_text, base_url)
    html_text = remove_imported_section_nav(html_text)
    html_text = simplify_imported_cards(html_text)
    html_text = remove_imported_build_meta(html_text)
    html_text = sanitize_public_copy(html_text)
    description = (
        "Source-first outbreak reporting from The Pathogen Dispatch."
        if active == "newsdesk"
        else "Edge of Epidemiology publication page."
    )
    html_text = ensure_meta_description(html_text, description)
    html_text = html_text.replace("</head>", f"{shell_wrapper_css(base_url)}</head>")
    html_text = html_text.replace("<body>", f"<body>{imported_shell_nav(active, base_url)}", 1)
    return html_text


def import_epidossier_public(docs_dir: Path, base_url: str) -> dict[str, Any]:
    source_docs = resolve_epidossier_docs()

    app_exports_src = source_docs / "app_exports"
    app_exports_dest = docs_dir / "app_exports"
    if app_exports_dest.exists():
        shutil.rmtree(app_exports_dest)
    shutil.copytree(app_exports_src, app_exports_dest)
    sanitize_copied_app_exports(app_exports_dest)

    latest_html_dest = docs_dir / "newsdesk" / "latest.html"
    latest_html = transform_imported_html((source_docs / "latest.html").read_text(), active="newsdesk", base_url=base_url)
    ensure_dir(latest_html_dest.parent)
    latest_html_dest.write_text(latest_html)
    import_copy(source_docs / "latest.md", docs_dir / "newsdesk" / "latest.md")

    html_pages = [
        (source_docs / "index.html", docs_dir / "newsdesk" / "index.html", "newsdesk"),
        (source_docs / "outbreaks.html", docs_dir / "newsdesk" / "outbreaks" / "index.html", "newsdesk"),
        (source_docs / "outbreaks.html", docs_dir / "outbreaks.html", "newsdesk"),
        (source_docs / "watch.html", docs_dir / "newsdesk" / "watch" / "index.html", "newsdesk"),
        (source_docs / "africa.html", docs_dir / "newsdesk" / "africa" / "index.html", "newsdesk"),
        (source_docs / "asia.html", docs_dir / "newsdesk" / "asia" / "index.html", "newsdesk"),
        (source_docs / "research.html", docs_dir / "newsdesk" / "research" / "index.html", "newsdesk"),
        (source_docs / "official.html", docs_dir / "newsdesk" / "official" / "index.html", "newsdesk"),
        (source_docs / "historical.html", docs_dir / "newsdesk" / "historical" / "index.html", "newsdesk"),
        (source_docs / "archive" / "index.html", docs_dir / "newsdesk" / "archive" / "index.html", "newsdesk"),
        (source_docs / "notebook.html", docs_dir / "notebook" / "index.html", "notebook"),
    ]
    for src, dest, active in html_pages:
        transformed = transform_imported_html(src.read_text(), active=active, base_url=base_url)
        ensure_dir(dest.parent)
        dest.write_text(transformed)

    for source_subdir, dest_subdir, active in [
        ("stories", "stories", "newsdesk"),
        ("reference", "reference", "reference"),
    ]:
        for src in sorted((source_docs / source_subdir).glob("*.html")):
            transformed = transform_imported_html(src.read_text(), active=active, base_url=base_url)
            dest = docs_dir / dest_subdir / src.name
            ensure_dir(dest.parent)
            dest.write_text(transformed)

    dated_source_root = source_docs / "2026"
    if dated_source_root.exists():
        for src in dated_source_root.rglob("*.html"):
            rel = src.relative_to(source_docs)
            dest = docs_dir / "newsdesk" / rel
            transformed = transform_imported_html(src.read_text(), active="newsdesk", base_url=base_url)
            ensure_dir(dest.parent)
            dest.write_text(transformed)

    ensure_archived_story_placeholders(docs_dir, base_url)
    latest = sanitize_public_copy(load_json(app_exports_dest / "latest.json"))
    return latest


ATLAS_OVERLAY_RE = re.compile(
    r'\s*<style id="eoe-atlas-overlay-style">.*?</style>|\s*<div id="eoe-atlas-overlay">.*?</div>',
    re.S,
)


def atlas_overlay_html(
    *,
    home_href: str,
    tools_href: str,
    newsdesk_href: str,
    essays_href: str,
    top: str = "18px",
    links_top: str | None = None,
) -> tuple[str, str]:
    links_top = links_top or top
    overlay = f"""
<style id="eoe-atlas-overlay-style">
  #eoe-atlas-overlay {{
    position: fixed;
    inset: 0;
    z-index: 1200;
    pointer-events: none;
  }}
  #eoe-atlas-overlay a {{
    pointer-events: auto;
  }}
  #eoe-atlas-overlay-brand {{
    position: fixed;
    top: {top};
    left: 18px;
    display: inline-flex;
    flex-wrap: wrap;
    column-gap: 0.32em;
    row-gap: 0.12em;
    align-items: baseline;
    padding: 7px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(12, 12, 10, 0.86);
    color: #f5ecdd;
    text-decoration: none;
    font: 700 clamp(15px, 1.45vw, 20px)/1 "Iowan Old Style", Georgia, serif;
    backdrop-filter: blur(12px);
  }}
  #eoe-atlas-overlay-brand .byline {{
    color: #8fb8d8;
    font: 600 0.52em/1 "Avenir Next", "Helvetica Neue", sans-serif;
  }}
  #eoe-atlas-overlay-links {{
    position: fixed;
    top: {links_top};
    right: 18px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }}
  #eoe-atlas-overlay-links a {{
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(12, 12, 10, 0.85);
    color: #efe4d2;
    text-decoration: none;
    font: 700 12px/1 "Avenir Next", "Helvetica Neue", sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    backdrop-filter: blur(12px);
  }}
  #eoe-atlas-overlay-links a.active {{ color: #c9a84c; border-color: rgba(201,168,76,0.38); }}
  @media (max-width: 980px) {{
    #eoe-atlas-overlay {{
      position: absolute;
      top: 14px;
      left: 18px;
      right: 18px;
      display: grid;
      grid-template-columns: 1fr;
      justify-items: start;
      gap: 8px;
    }}
    #eoe-atlas-overlay-brand,
    #eoe-atlas-overlay-links {{
      position: static;
    }}
    #eoe-atlas-overlay-links {{
      justify-content: flex-start;
    }}
  }}
</style>
"""
    nav = (
        '<div id="eoe-atlas-overlay">'
        f'<a id="eoe-atlas-overlay-brand" href="{html.escape(home_href)}"><span>The Edge of Epidemiology</span> <span class="byline">by Devin Teichrow</span></a>'
        '<nav id="eoe-atlas-overlay-links" aria-label="Exhibit navigation">'
        f'<a href="{html.escape(home_href)}">Home</a>'
        f'<a href="{html.escape(tools_href)}" class="active">Exhibits</a>'
        f'<a href="{html.escape(newsdesk_href)}">Newsdesk</a>'
        f'<a href="{html.escape(essays_href)}">Essays</a>'
        "</nav>"
        "</div>"
    )
    return overlay, nav


def inject_atlas_overlay(
    index_path: Path,
    *,
    home_href: str,
    tools_href: str,
    newsdesk_href: str,
    essays_href: str,
    top: str = "18px",
    links_top: str | None = None,
) -> None:
    html_text = ATLAS_OVERLAY_RE.sub("", index_path.read_text())
    html_text = ensure_meta_description(
        html_text,
        "Interactive atlas from The Edge of Epidemiology.",
    )
    overlay, nav = atlas_overlay_html(
        home_href=home_href,
        tools_href=tools_href,
        newsdesk_href=newsdesk_href,
        essays_href=essays_href,
        top=top,
        links_top=links_top,
    )
    html_text = html_text.replace("</head>", f"{overlay}</head>")
    html_text = html_text.replace("<body>", f"<body>{nav}", 1)
    index_path.write_text(html_text)


def import_external_maritime(docs_dir: Path, base_url: str) -> None:
    src_root = PROJECT_ROOT / "external" / "maritime_disease_atlas"
    dest_root = docs_dir / "atlases" / "maritime"
    if dest_root.exists():
        shutil.rmtree(dest_root)
    shutil.copytree(src_root, dest_root)
    inject_atlas_overlay(
        dest_root / "index.html",
        home_href="../../index.html",
        tools_href="../../tools/index.html",
        newsdesk_href="../../newsdesk/index.html",
        essays_href="../../essays/index.html",
        top="84px",
    )


PATHOGEN_CONFIDENCE_ALIASES = {
    "strong": "high",
    "mixed": "moderate",
    "weak": "low",
}


def normalize_tool_confidence(value: Any) -> str:
    clean = str(value or "moderate").strip().lower()
    return PATHOGEN_CONFIDENCE_ALIASES.get(clean, clean if clean in {"high", "moderate", "low", "contested", "speculative"} else "moderate")


def normalize_pathogen_claims(entry: dict[str, Any]) -> None:
    evidence_ids = [
        citation.get("id")
        for citation in entry.get("citations", [])
        if citation.get("id")
    ] + [
        citation.get("id")
        for citation in entry.get("withheld_citations", [])
        if citation.get("id")
    ]

    origin = entry.get("origin_claim")
    if isinstance(origin, dict):
        origin["confidence"] = normalize_tool_confidence(origin.get("confidence"))
        if not origin.get("citation_ids") and evidence_ids:
            origin["citation_ids"] = evidence_ids[:3]

    for route in entry.get("spread_routes", []):
        if isinstance(route, dict):
            route["confidence"] = normalize_tool_confidence(route.get("confidence"))

    for layer in entry.get("geography_layers", []):
        if isinstance(layer, dict):
            layer["confidence"] = normalize_tool_confidence(layer.get("confidence"))
            if layer["confidence"] in {"low", "contested", "speculative"} and not (layer.get("uncertainty_note") or layer.get("evidence_note") or layer.get("note")):
                layer["evidence_note"] = "Low-confidence or schematic geography; keep the uncertainty visible and do not treat this layer as a precise range map."


def prepared_pathogen_atlas_data(atlas_export: dict[str, Any], *, link_prefix: str) -> dict[str, Any]:
    raw_entries = atlas_export.get("atlas", [])
    prepared_entries = []

    def rewrite_entry_links(entry: dict[str, Any], color: str) -> dict[str, Any]:
        prepared = dict(entry)
        prepared["color"] = color
        category, category_label = PATHOGEN_ATLAS_CATEGORIES.get(
            prepared.get("slug"),
            (prepared.get("category") or "other", prepared.get("category_label") or "Other"),
        )
        category, category_label = PATHOGEN_ATLAS_CATEGORY_ALIASES.get(category, (category, category_label))
        prepared["category"] = category
        prepared["category_label"] = category_label
        prepared["transmission_group"] = prepared.get("transmission_group") or prepared["category_label"]
        prepared["status_label"] = PATHOGEN_STATUS_LABELS.get(prepared.get("status"), "Curated")
        prepared["writing_state_label"] = PATHOGEN_WRITING_LABELS.get(prepared.get("writing_state"), "Writing state pending")
        public_citations, withheld_citations = public_pathogen_citations(prepared)
        prepared["citations"] = public_citations
        prepared["citation_count"] = len(public_citations)
        if withheld_citations:
            prepared["withheld_citations"] = withheld_citations
            prepared["citation_verification_note"] = "Some DOI citations are withheld from the public atlas until manually verified."
        normalize_pathogen_claims(prepared)
        reference_path = prepared.get("reference_web_path") or prepared.get("reference_url")
        if reference_path:
            prepared["reference_href"] = f"{link_prefix}{reference_path.lstrip('/')}"
        related_stories = []
        for story in prepared.get("related_stories", []):
            story_copy = dict(story)
            story_path = story_copy.get("story_web_path")
            if story_path:
                story_copy["story_href"] = f"{link_prefix}{story_path.lstrip('/')}"
            related_stories.append(story_copy)
        prepared["related_stories"] = related_stories
        prepared["variants"] = [rewrite_entry_links(variant, color) for variant in prepared.get("variants", [])]
        return prepared

    for entry in raw_entries:
        color = PATHOGEN_ATLAS_COLORS.get(entry.get("slug"), "#c9a84c")
        prepared = rewrite_entry_links(entry, color)
        prepared_entries.append(prepared)

    payload = {
        "entries": prepared_entries,
        "generated_at": atlas_export.get("generated_at"),
        "atlas_count": len(prepared_entries),
    }
    for key in (
        "schema_version",
        "description",
        "confidence_legend",
        "evidence_types",
        "source_audit",
        "deferred_profiles",
    ):
        if key in atlas_export:
            payload[key] = atlas_export[key]
    return payload


def write_pathogen_atlas_payload(target_root: Path, atlas_export: dict[str, Any], *, base_url: str, link_prefix: str) -> None:
    data_dir = target_root / "data"
    ensure_dir(data_dir)
    data_payload = prepared_pathogen_atlas_data(atlas_export, link_prefix=link_prefix)
    data_text = (
        f"window.PATHOGEN_ATLAS_BASE_URL = {json.dumps(base_url)};\n"
        f"window.PATHOGEN_ATLAS_DATA = {json.dumps(data_payload, indent=2)};\n"
    )
    (data_dir / "pathogen_atlas_data.js").write_text(data_text)


def merge_pathogen_atlas_overrides(atlas_export: dict[str, Any], overrides: dict[str, Any]) -> None:
    """Apply local curation fields to imported atlas entries without editing generated exports."""
    scalar_fields = ("summary", "why_it_matters", "atlas_scope", "origin_claim")
    list_fields = ("modern_echoes", "framing_traps")
    by_slug = {entry.get("slug"): entry for entry in atlas_export.get("atlas", [])}
    for override in overrides.get("atlas", []):
        slug = override.get("slug")
        entry = by_slug.get(slug)
        if not entry:
            continue
        for field in scalar_fields:
            if field in override:
                entry[field] = override[field]
        for field in list_fields:
            if field in override:
                entry[field] = override[field]
        if override.get("geography_layers") and not entry.get("geography_layers"):
            entry["geography_layers"] = override["geography_layers"]
        if override.get("citations"):
            existing_ids = {citation.get("id") for citation in entry.get("citations", [])}
            entry.setdefault("citations", [])
            for citation in override["citations"]:
                if citation.get("id") not in existing_ids:
                    entry["citations"].append(citation)
                    existing_ids.add(citation.get("id"))


def import_external_pathogen(docs_dir: Path, base_url: str) -> None:
    src_root = PROJECT_ROOT / "external" / "pathogen_atlas"
    dest_root = docs_dir / "atlases" / "pathogen"
    source_backed_path = src_root / "source_backed_profiles.json"
    if source_backed_path.exists():
        atlas_export = load_json(source_backed_path)
    else:
        atlas_export_path = docs_dir / "app_exports" / "atlas.json"
        atlas_export = load_json(atlas_export_path)
        core_overrides_path = src_root / "core_geography_overrides.json"
        if core_overrides_path.exists():
            merge_pathogen_atlas_overrides(atlas_export, load_json(core_overrides_path))
        extra_pathogens_path = src_root / "extra_pathogens.json"
        if extra_pathogens_path.exists():
            extra_export = load_json(extra_pathogens_path)
            known_slugs = {entry.get("slug") for entry in atlas_export.get("atlas", [])}
            atlas_export["atlas"] = atlas_export.get("atlas", []) + [
                entry for entry in extra_export.get("atlas", []) if entry.get("slug") not in known_slugs
            ]

    write_pathogen_atlas_payload(src_root, atlas_export, base_url="/", link_prefix="../../docs/")
    inject_atlas_overlay(
        src_root / "index.html",
        home_href="../../docs/index.html",
        tools_href="../../docs/tools/index.html",
        newsdesk_href="../../docs/newsdesk/index.html",
        essays_href="../../docs/essays/index.html",
        top="8px",
        links_top="8px",
    )

    if dest_root.exists():
        shutil.rmtree(dest_root)
    shutil.copytree(src_root, dest_root, ignore=shutil.ignore_patterns("catalog", "extra_pathogens.json", "core_geography_overrides.json"))
    write_pathogen_atlas_payload(dest_root, atlas_export, base_url=base_url, link_prefix="../../")
    inject_atlas_overlay(
        dest_root / "index.html",
        home_href="../../index.html",
        tools_href="../../tools/index.html",
        newsdesk_href="../../newsdesk/index.html",
        essays_href="../../essays/index.html",
        top="8px",
        links_top="8px",
    )


def import_external_viking(docs_dir: Path, base_url: str) -> None:
    src = PROJECT_ROOT / "external" / "viking-health-map.html"
    dest = docs_dir / "atlases" / "viking" / "index.html"
    ensure_dir(dest.parent)
    dest.write_text(src.read_text())
    inject_atlas_overlay(
        dest,
        home_href="../../index.html",
        tools_href="../../tools/index.html",
        newsdesk_href="../../newsdesk/index.html",
        essays_href="../../essays/index.html",
        top="14px",
    )


def import_external_revolutionary_war_atlas(docs_dir: Path, base_url: str) -> None:
    _ = base_url
    src_root = PROJECT_ROOT / "external" / "revolutionary_war_atlas"
    dest_root = docs_dir / "atlases" / "revolutionary-war"
    if dest_root.exists():
        shutil.rmtree(dest_root)
    shutil.copytree(src_root, dest_root)


def import_external_american_epidemic_timeline(docs_dir: Path, base_url: str) -> None:
    _ = base_url
    src_root = PROJECT_ROOT / "external" / "american_epidemic_timeline"
    dest_root = docs_dir / "tools" / "american-epidemic-timeline"
    if dest_root.exists():
        shutil.rmtree(dest_root)
    shutil.copytree(src_root, dest_root)


def copy_static_assets(docs_dir: Path) -> None:
    target = docs_dir / "assets"
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(ASSETS_DIR, target)
    (docs_dir / ".nojekyll").write_text("")
    (docs_dir / "CNAME").write_text(f"{PUBLIC_SITE_DOMAIN}\n")


def route_for_html_path(path: Path, docs_dir: Path) -> str:
    rel = path.relative_to(docs_dir).as_posix()
    if rel == "index.html":
        return ""
    if rel.endswith("/index.html"):
        return f"{rel[:-len('/index.html')]}/"
    return rel


def public_url_for_route(route: str) -> str:
    return f"{PUBLIC_SITE_ORIGIN}/{route.lstrip('/')}" if route else f"{PUBLIC_SITE_ORIGIN}/"


def extract_html_title(html_text: str) -> str:
    match = re.search(r"<title>(.*?)</title>", html_text, flags=re.I | re.S)
    return strip_html_tags(match.group(1)) if match else ""


def extract_meta_description_from_html(html_text: str) -> str:
    return meta_tag_content(html_text, "name", "description")


def meta_tag_content(html_text: str, attr: str, value: str) -> str:
    pattern = rf'<meta[^>]+{attr}=["\']{re.escape(value)}["\'][^>]+content=["\']([^"\']*)["\']'
    match = re.search(pattern, html_text, flags=re.I | re.S)
    return html.unescape(match.group(1)).strip() if match else ""


def extract_primary_heading(html_text: str) -> str:
    for tag in ("h1", "h2"):
        match = re.search(rf"<{tag}[^>]*>(.*?)</{tag}>", html_text, flags=re.I | re.S)
        if match:
            heading = strip_html_tags(match.group(1))
            if heading and heading.lower() not in {"the edge of epidemiology", "by devin teichrow"}:
                return heading
    return ""


def clean_seo_description(value: str, fallback: str) -> str:
    cleaned = re.sub(r"\s+", " ", strip_html_tags(value)).strip()
    if cleaned in GENERIC_DESCRIPTIONS or len(cleaned) < 70:
        cleaned = fallback
    return cleaned[:280].rstrip()


def title_case_slug(value: str) -> str:
    return value.replace("-", " ").replace("_", " ").title()


def post_route(post: dict[str, Any]) -> str:
    return f"essays/{post.get('slug', 'untitled')}/"


def route_is_collection(route: str) -> bool:
    if not route or route in {"about/", "methods/", "opportunities/", "search/"}:
        return False
    if route.endswith("/") and not re.match(r"essays/[^/]+/$", route):
        return True
    return False


def seo_profile_for_route(route: str, html_text: str, post_by_route: dict[str, dict[str, Any]]) -> dict[str, Any]:
    title = extract_html_title(html_text)
    heading = extract_primary_heading(html_text)
    description = extract_meta_description_from_html(html_text)
    image = public_url_for_route(DEFAULT_SOCIAL_IMAGE)
    noindex = route in {"search/", "newsdesk/latest.html"}
    schema_type = "CollectionPage" if route_is_collection(route) else "WebPage"
    date_published = ""
    date_modified = ""

    if route == "":
        title = "The Edge of Epidemiology | Devin Teichrow"
        description = "The canonical home for Devin Teichrow's Edge of Epidemiology essays, Pathogen Dispatch reporting, disease atlases, historical epidemiology, and public-health methods work."
        schema_type = "WebSite"
    elif route in post_by_route:
        post = post_by_route[route]
        title = f"{post_display_title(post)} | Edge of Epidemiology"
        description = post_seo_description(post)
        image = post.get("cover_image") or image
        noindex = post_indexing_strategy(post) not in INDEXABLE_POST_STRATEGIES
        schema_type = "Article" if not noindex else "WebPage"
        date_published = str(post.get("date") or "")
        date_modified = str(post.get("last_synced_at") or post.get("date") or "")
    elif route == "essays/":
        title = "Epidemiology Essays | Edge of Epidemiology"
        description = "The Edge of Epidemiology essay archive: historical epidemiology, infectious disease, outbreak reporting, epidemiologic methods, wellness claims, and neuroepidemiology."
    elif route == "topics/":
        title = "Topic Hubs | Edge of Epidemiology"
        description = "Topic hubs for historical epidemiology, disease and war, disease ecology, pathogen geography, epidemiologic methods, wellness claims, and neuroepidemiology."
    elif route.startswith("topics/"):
        slug = route.strip("/").split("/", 1)[1]
        hub = next((item for item in TOPIC_HUBS if item["slug"] == slug), None)
        if hub:
            title = f"{hub['title']} Topic Hub | Edge of Epidemiology"
            description = str(hub["description"])
    elif route == "tools/":
        title = "Interactive Exhibits | Edge of Epidemiology"
        description = "Interactive timelines, atlases, and source-first public-health exhibits for epidemic history, disease geography, and epidemiologic reasoning."
        schema_type = "CollectionPage"
    elif route.startswith("tools/american-epidemic-timeline"):
        title = "American Epidemic Timeline | Edge of Epidemiology"
        description = "A cinematic, source-first timeline of major U.S.-linked epidemics and disease outbreaks from colonial North America through modern public health."
        schema_type = "CollectionPage"
    elif route.startswith("reference/") and route != "reference/":
        page_name = heading or title_case_slug(Path(route).stem)
        title = f"{page_name} Reference Guide | Edge of Epidemiology"
        description = f"{page_name} reference guide from The Pathogen Dispatch, with transmission notes, current story links, reporting context, and source caveats."
    elif route.startswith("stories/") and route != "stories/":
        page_name = heading or title_case_slug(Path(route).stem)
        title = f"{page_name} Story File | Edge of Epidemiology"
        description = f"Pathogen Dispatch story file for {page_name}, with source-first outbreak tracking, update context, and related reporting notes."
    elif route.startswith("newsdesk/") and re.search(r"\d{4}-\d{2}-\d{2}\.html$", route):
        match = re.search(r"(\d{4}-\d{2}-\d{2})\.html$", route)
        date_label = format_display_date(match.group(1)) if match else "Archive"
        title = f"Pathogen Dispatch for {date_label} | Edge of Epidemiology"
        description = f"The Pathogen Dispatch archive for {date_label}, with source-first infectious-disease reporting, outbreak tracking, and daily evidence notes."
        schema_type = "CollectionPage"
    elif route.startswith("newsdesk/"):
        page_name = heading or "The Pathogen Dispatch"
        if route == "newsdesk/":
            title = "The Pathogen Dispatch | Edge of Epidemiology"
            description = "Source-first outbreak reporting from The Pathogen Dispatch, with active story files, official-source tracking, research signals, and historical epidemiology context."
        elif route == "newsdesk/archive/":
            title = "Pathogen Dispatch Archive | Edge of Epidemiology"
            description = "Archive of Pathogen Dispatch daily outbreak briefings and source-first infectious-disease reporting files."
        elif route == "newsdesk/latest.html":
            title = "Latest Pathogen Dispatch | Edge of Epidemiology"
            description = "The current Pathogen Dispatch briefing, with active outbreak files, source notes, and archive links."
        else:
            title = f"{page_name} | The Pathogen Dispatch"
            description = f"{page_name} from The Pathogen Dispatch, the Edge of Epidemiology source-first infectious-disease reporting desk."
        schema_type = "CollectionPage"
    elif route.startswith("atlases/pathogen"):
        title = "Pathogen Atlas | Edge of Epidemiology"
        description = "Source-backed digital exhibit on pathogen origins, reservoirs, transmission ecology, historical spread, and evidentiary uncertainty."
    elif route.startswith("atlases/maritime"):
        title = "Maritime Disease Atlas | Edge of Epidemiology"
        description = "Map-first digital exhibit on shipboard infection, port quarantine, sea routes, naval medicine, archival sources, and maritime disease ecology."
    elif route.startswith("atlases/viking"):
        title = "Viking Health Atlas | Edge of Epidemiology"
        description = "Interactive Viking health and disease atlas connecting settlement geography, archaeology, historical demography, and epidemic uncertainty."
    elif route.startswith("atlases/revolutionary-war"):
        title = "Revolutionary War Disease Atlas | Edge of Epidemiology"
        description = "Interactive Revolutionary War disease atlas mapping battles, encampments, smallpox pressure, disease deaths, and the military geography of the American Revolution."
    elif route == "reference/":
        title = "Disease Reference Desk | Edge of Epidemiology"
        description = "Disease reference sheets connected to the live newsdesk, pathogen atlas, reporting caveats, transmission notes, and official background links."
    elif route == "historical/":
        title = "Historical Epidemiology | Edge of Epidemiology"
        description = "Historical epidemiology essays and atlas projects about disease, empire, war, routes, ecological change, and epidemic reconstruction."
    elif route == "methods/":
        title = "Methods And Sourcing | Edge of Epidemiology"
        description = "Methods, sourcing, update cadence, and editorial structure for The Edge of Epidemiology, The Pathogen Dispatch, and related atlas work."
    elif route == "about/":
        title = "About Devin Teichrow | Edge of Epidemiology"
        description = "About Devin Teichrow and The Edge of Epidemiology: epidemiology, neurology research, historical disease writing, outbreak reporting, and science communication."
    elif route == "opportunities/":
        title = "Work With Devin Teichrow | Edge of Epidemiology"
        description = "Collaborate with Devin Teichrow on epidemiology, public-health data, historical disease writing, science communication, outbreak tools, and disease atlas projects."

    if not title:
        fallback_name = heading or title_case_slug(Path(route.rstrip("/") or "home").name)
        title = f"{fallback_name} | Edge of Epidemiology"
    fallback_description = f"{heading or title.split('|')[0].strip()} from The Edge of Epidemiology by Devin Teichrow."
    description = clean_seo_description(description, fallback_description)
    return {
        "route": route,
        "url": public_url_for_route(route),
        "title": title,
        "description": description,
        "image": image,
        "noindex": noindex,
        "schema_type": schema_type,
        "date_published": date_published,
        "date_modified": date_modified,
    }


def ensure_head_element(html_text: str) -> str:
    if re.search(r"<head[^>]*>", html_text, flags=re.I):
        return html_text
    if re.search(r"<html[^>]*>", html_text, flags=re.I):
        return re.sub(r"(<html[^>]*>)", r"\1<head></head>", html_text, count=1, flags=re.I)
    return f"<!DOCTYPE html><html lang=\"en\"><head></head><body>{html_text}</body></html>"


def upsert_title(html_text: str, title: str) -> str:
    escaped = html.escape(title)
    if re.search(r"<title>.*?</title>", html_text, flags=re.I | re.S):
        return re.sub(r"<title>.*?</title>", f"<title>{escaped}</title>", html_text, count=1, flags=re.I | re.S)
    return html_text.replace("</head>", f"<title>{escaped}</title>\n</head>", 1)


def remove_meta_name(html_text: str, name: str) -> str:
    return re.sub(rf'\s*<meta[^>]+name=["\']{re.escape(name)}["\'][^>]*>\n?', "\n", html_text, flags=re.I)


def remove_meta_property(html_text: str, prop: str) -> str:
    return re.sub(rf'\s*<meta[^>]+property=["\']{re.escape(prop)}["\'][^>]*>\n?', "\n", html_text, flags=re.I)


def render_json_ld(profile: dict[str, Any]) -> str:
    payload: dict[str, Any] = {
        "@context": "https://schema.org",
        "@type": profile["schema_type"],
        "name": profile["title"],
        "url": profile["url"],
        "description": profile["description"],
        "isPartOf": {
            "@type": "WebSite",
            "name": "The Edge of Epidemiology",
            "url": f"{PUBLIC_SITE_ORIGIN}/",
        },
        "author": {
            "@type": "Person",
            "name": "Devin Teichrow",
            "url": f"{PUBLIC_SITE_ORIGIN}/about/",
        },
    }
    if profile["schema_type"] == "WebSite":
        payload["potentialAction"] = {
            "@type": "SearchAction",
            "target": f"{PUBLIC_SITE_ORIGIN}/search/?q={{search_term_string}}",
            "query-input": "required name=search_term_string",
        }
    if profile["schema_type"] == "Article":
        payload["headline"] = profile["title"].split("|")[0].strip()
        if profile.get("date_published"):
            payload["datePublished"] = profile["date_published"]
        if profile.get("date_modified"):
            payload["dateModified"] = profile["date_modified"]
    return (
        '<script type="application/ld+json" data-eoe-seo>'
        + json.dumps(payload, ensure_ascii=False)
        + "</script>"
    )


def apply_seo_profile(html_text: str, profile: dict[str, Any]) -> str:
    html_text = ensure_head_element(html_text)
    html_text = upsert_title(html_text, profile["title"])
    html_text = remove_meta_name(html_text, "description")
    html_text = remove_meta_name(html_text, "robots")
    for name in ("twitter:card", "twitter:title", "twitter:description", "twitter:image"):
        html_text = remove_meta_name(html_text, name)
    for prop in ("og:type", "og:site_name", "og:title", "og:description", "og:url", "og:image"):
        html_text = remove_meta_property(html_text, prop)
    html_text = re.sub(r'\s*<link[^>]+rel=["\']canonical["\'][^>]*>\n?', "\n", html_text, flags=re.I)
    html_text = re.sub(r'\s*<script[^>]+type=["\']application/ld\+json["\'][^>]*data-eoe-seo[^>]*>.*?</script>\n?', "\n", html_text, flags=re.I | re.S)

    robots = '<meta name="robots" content="noindex,follow" />\n' if profile["noindex"] else ""
    meta_block = f"""
    <link rel="canonical" href="{html.escape(profile['url'])}" />
    {robots}<meta name="description" content="{html.escape(profile['description'])}" />
    <meta property="og:type" content="{'article' if profile['schema_type'] == 'Article' else 'website'}" />
    <meta property="og:site_name" content="The Edge of Epidemiology" />
    <meta property="og:title" content="{html.escape(profile['title'])}" />
    <meta property="og:description" content="{html.escape(profile['description'])}" />
    <meta property="og:url" content="{html.escape(profile['url'])}" />
    <meta property="og:image" content="{html.escape(profile['image'])}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{html.escape(profile['title'])}" />
    <meta name="twitter:description" content="{html.escape(profile['description'])}" />
    <meta name="twitter:image" content="{html.escape(profile['image'])}" />
    {render_json_ld(profile)}
"""
    return html_text.replace("</head>", f"{meta_block}</head>", 1)


def finalize_seo(docs_dir: Path, posts: list[dict[str, Any]]) -> dict[str, Any]:
    post_by_route = {post_route(post): post for post in posts}
    profiles: dict[str, dict[str, Any]] = {}
    for path in sorted(docs_dir.rglob("*.html")):
        route = route_for_html_path(path, docs_dir)
        html_text = path.read_text()
        profile = seo_profile_for_route(route, html_text, post_by_route)
        path.write_text(apply_seo_profile(html_text, profile))
        profiles[route] = profile
    sitemap_count = write_sitemap_and_robots(docs_dir, profiles)
    return {
        "html_pages": len(profiles),
        "indexable_pages": sitemap_count,
        "noindex_pages": sum(1 for profile in profiles.values() if profile["noindex"]),
    }


def write_sitemap_and_robots(docs_dir: Path, profiles: dict[str, dict[str, Any]]) -> int:
    lastmod = dt.datetime.now(dt.timezone.utc).date().isoformat()
    indexable = [profile for _, profile in sorted(profiles.items()) if not profile["noindex"]]
    url_entries = "\n".join(
        "  <url>\n"
        f"    <loc>{html.escape(profile['url'])}</loc>\n"
        f"    <lastmod>{lastmod}</lastmod>\n"
        "  </url>"
        for profile in indexable
    )
    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{url_entries}\n"
        "</urlset>\n"
    )
    (docs_dir / "sitemap.xml").write_text(sitemap)
    (docs_dir / "robots.txt").write_text(
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /app_exports/\n"
        "Disallow: /search/\n"
        f"Sitemap: {PUBLIC_SITE_ORIGIN}/sitemap.xml\n"
    )
    (docs_dir / "CNAME").write_text(f"{PUBLIC_SITE_DOMAIN}\n")
    return len(indexable)


def build_site(*, docs_dir: Path = DOCS_DIR, base_url: str = DEFAULT_BASE_URL) -> dict[str, Any]:
    base_url = normalize_base_url(base_url)
    if docs_dir.exists():
        shutil.rmtree(docs_dir)
    ensure_dir(docs_dir)

    copy_static_assets(docs_dir)
    latest = import_epidossier_public(docs_dir, base_url)
    import_external_pathogen(docs_dir, base_url)
    import_external_maritime(docs_dir, base_url)
    import_external_viking(docs_dir, base_url)
    import_external_revolutionary_war_atlas(docs_dir, base_url)
    import_external_american_epidemic_timeline(docs_dir, base_url)

    posts = load_posts_manifest(CONTENT_DIR / "posts.yml")
    atlases = load_atlas_registry(CONTENT_DIR / "atlases.yml")
    tools = load_tool_registry(CONTENT_DIR / "tools.yml", CONTENT_DIR / "atlases.yml")
    atlas_by_id = {entry["atlas_id"]: entry for entry in atlases}
    references = latest.get("reference", [])
    stories = latest.get("stories", [])

    page_specs = {
        docs_dir / "index.html": render_home(posts, tools, latest, base_url),
        docs_dir / "essays" / "index.html": render_essays_index(posts, base_url),
        docs_dir / "topics" / "index.html": render_topic_hub_index(posts, base_url),
        docs_dir / "tools" / "index.html": render_tools_hub(tools, base_url),
        docs_dir / "atlases" / "index.html": render_atlas_hub(atlases, base_url),
        docs_dir / "historical" / "index.html": render_historical_page(posts, atlases, base_url),
        docs_dir / "methods" / "index.html": render_methods_page(base_url),
        docs_dir / "about" / "index.html": render_about_page(base_url),
        docs_dir / "opportunities" / "index.html": render_opportunities_page(base_url),
        docs_dir / "search" / "index.html": render_search_page(base_url),
        docs_dir / "reference" / "index.html": render_reference_index(references, base_url),
        docs_dir / "stories" / "index.html": render_stories_index(stories, base_url),
    }

    for path, page_html in page_specs.items():
        ensure_dir(path.parent)
        path.write_text(page_html)

    for post in posts:
        path = docs_dir / "essays" / post.get("slug", "untitled") / "index.html"
        ensure_dir(path.parent)
        path.write_text(render_post_page(post, atlas_by_id, posts, base_url))

    for hub in TOPIC_HUBS:
        path = docs_dir / "topics" / str(hub["slug"]) / "index.html"
        ensure_dir(path.parent)
        path.write_text(render_topic_hub_page(hub, posts, base_url))

    for atlas_entry in atlases:
        if atlas_entry.get("atlas_id") == "pathogen-atlas":
            continue
        if atlas_entry.get("atlas_id") == "maritime-disease-atlas":
            continue
        if atlas_entry.get("atlas_id") == "viking-health-atlas":
            continue
        if atlas_entry.get("atlas_id") == "revolutionary-war-atlas":
            continue
        path = docs_dir / atlas_entry["public_route"].strip("/") / "index.html"
        ensure_dir(path.parent)
        path.write_text(render_curated_atlas_page(atlas_entry, posts, base_url))

    posts_export = {
        "generated_at": latest.get("generated_at"),
        "count": len(posts),
        "posts": [public_post_export(post) for post in posts],
    }
    atlases_export = {
        "generated_at": latest.get("generated_at"),
        "count": len(atlases),
        "atlases": [public_tool_export(atlas) for atlas in atlases],
    }
    tools_export = {
        "generated_at": latest.get("generated_at"),
        "count": len(tools),
        "tools": [public_tool_export(tool) for tool in tools],
    }
    search_index = []
    for post in posts:
        search_index.append(
            {
                "title": post.get("title"),
                "display_title": post_display_title(post),
                "section": "Essay",
                "summary": post_seo_description(post),
                "url": link_for(base_url, f"essays/{post.get('slug')}/"),
                "keywords": " ".join(post.get("topics", []) + post.get("upstream_tags", []) + [post.get("primary_keyword", ""), post_topic_cluster(post)]),
            }
        )
    for hub in TOPIC_HUBS:
        search_index.append(
            {
                "title": hub["title"],
                "section": "Topic",
                "summary": hub["description"],
                "url": link_for(base_url, f"topics/{hub['slug']}/"),
                "keywords": " ".join(hub["keywords"]),
            }
        )
    for atlas in atlases:
        search_index.append(
            {
                "title": atlas.get("title"),
                "section": "Atlas",
                "summary": atlas.get("summary"),
                "url": link_for(base_url, atlas.get("public_route", "")),
                "keywords": " ".join(atlas.get("keywords", [])),
            }
        )
    for tool in tools:
        search_index.append(
            {
                "title": tool.get("title"),
                "section": "Tool",
                "summary": tool.get("summary"),
                "url": link_for(base_url, tool.get("public_route", "")),
                "keywords": " ".join(tool.get("keywords", []) + [tool.get("tool_type", "")]),
            }
        )
    for story in stories:
        search_index.append(
            {
                "title": story.get("display_title"),
                "section": "Newsdesk",
                "summary": story.get("latest_update_summary") or story.get("why_it_matters"),
                "url": link_for(base_url, story.get("story_web_path", "")),
                "keywords": " ".join(story.get("claim_types", []) + [story.get("primary_region", ""), story.get("country", "")]),
            }
        )
    for reference in references:
        search_index.append(
            {
                "title": reference.get("name"),
                "section": "Reference",
                "summary": reference.get("why_reporters_care") or reference.get("atlas_summary"),
                "url": link_for(base_url, reference.get("reference_web_path", "")),
                "keywords": " ".join(reference.get("categories", []) + reference.get("aliases", [])),
            }
        )
    search_index.append(
        {
            "title": "Opportunities",
            "section": "About",
            "summary": "Work with Devin Teichrow on epidemiology, evidence, disease history, science communication, data projects, and public-health exhibits.",
            "url": link_for(base_url, "opportunities/"),
            "keywords": "consulting collaboration epidemiology data science communication atlases public health",
        }
    )

    write_json(docs_dir / "app_exports" / "posts.json", posts_export)
    write_json(docs_dir / "app_exports" / "atlases.json", atlases_export)
    write_json(docs_dir / "app_exports" / "tools.json", tools_export)
    write_json(docs_dir / "app_exports" / "search-index.json", search_index)
    seo_report = finalize_seo(docs_dir, posts)

    return {
        "generated_at": latest.get("generated_at"),
        "posts": len(posts),
        "atlases": len(atlases),
        "tools": len(tools),
        "stories": len(stories),
        "references": len(references),
        "seo": seo_report,
        "docs_dir": str(docs_dir),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the Edge of Epidemiology umbrella site.")
    parser.add_argument("--docs-dir", type=Path, default=DOCS_DIR)
    parser.add_argument("--site-base-url", default=DEFAULT_BASE_URL)
    args = parser.parse_args()
    result = build_site(docs_dir=args.docs_dir, base_url=args.site_base_url)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
