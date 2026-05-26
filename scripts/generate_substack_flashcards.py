from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.request import Request, urlopen

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.common import clean_text, extract_preloads_payload, load_posts_manifest, save_posts_manifest  # noqa: E402


TARGET_CARD_COUNT = 10
CARD_PLAN = (
    "multiple_choice",
    "multiple_choice",
    "fill_blank",
    "multiple_choice",
    "short_answer",
    "multiple_choice",
    "multiple_choice",
    "fill_blank",
    "short_answer",
    "multiple_choice",
)
USER_AGENT = "Mozilla/5.0 (compatible; EdgeOfEpidemiologyFlashcards/1.0)"
BLOCK_TAGS = {"p", "li", "blockquote", "h1", "h2", "h3", "h4"}
HEADING_TAGS = {"h1", "h2", "h3", "h4"}
SKIP_TAGS = {"script", "style", "noscript", "svg"}
REJECT_BLOCK_MARKERS = {
    "public domain",
    "photo by",
    "image:",
    "image credit",
    "image credits",
    "caption",
    "subscribe now",
    "subscribe to",
    "thanks for reading",
    "share this post",
    "leave a comment",
}
REJECT_SENTENCE_MARKERS = {
    "subscribe",
    "share this",
    "leave a comment",
    "loading",
    "http://",
    "https://",
}
KEY_TERMS = {
    "ancient dna",
    "archive",
    "bacteria",
    "brain",
    "cholera",
    "colonial",
    "dementia",
    "disease",
    "ecology",
    "epidemic",
    "epidemiology",
    "evidence",
    "fever",
    "genome",
    "hantavirus",
    "infection",
    "malaria",
    "measles",
    "migraine",
    "mortality",
    "mosquito",
    "outbreak",
    "pathogen",
    "plague",
    "population",
    "public health",
    "reservoir",
    "risk",
    "smallpox",
    "syphilis",
    "tuberculosis",
    "vector",
    "viking",
    "virus",
    "war",
    "yellow fever",
}
PHRASE_PATTERNS = [
    re.compile(r"[“\"]([^“”\"]{4,64})[”\"]"),
    re.compile(r"\b\d{1,2}\s*(?:st|nd|rd|th)\s+century\s+[A-Za-z -]{3,48}?(?:epidemic|outbreak)\b", flags=re.I),
    re.compile(
        r"\b(?:ancient DNA|early-life mortality|childhood mortality|violent death|periapical disease|"
        r"cemetery evidence|case fatality rate|attack rate|epidemic curve|smallpox strains|"
        r"public health|disease ecology|biological age|age acceleration|interquartile range|"
        r"epigenetic clocks|residual confounding|air-conditioning penetration|cooling access|"
        r"meta-analysis|psilocybin|psychedelic assisted therapy|standard antidepressants|"
        r"antidepressant trials|PAT trials|effect sizes|randomized controlled trials|adverse events|"
        r"Hamilton Depression Rating Scale|depression questionnaire|placebo|MCID|LSD|PAT|"
        r"optical sensors|accelerometers|proprietary algorithms|movement patterns|heart rate data|"
        r"resting heart rate|total sleep time|HRV|sleep stages|caloric burn|polysomnography|"
        r"brain waves|EEG|eye movement tracking|muscle tone measurements|Apple watches|Fitbits|"
        r"Garmins|WHOOPs|Oura rings|fitness trackers|gold standard)\b",
        flags=re.I,
    ),
    re.compile(r"\b[A-Z]{2,6}\b"),
    re.compile(
        r"\b(?:[a-z][a-z-]+(?:/[a-z-]+)?\s+){0,3}"
        r"(?:age|risk|exposure|workers|residents|confounding|association|evidence|methods|outcomes|"
        r"clocks|composites|markers|disease|mortality|infection|epidemic|pathogen|vector|reservoir|"
        r"study|effects|access|infrastructure|population|analysis|strain|samples|cohort|biology)\b",
        flags=re.I,
    ),
    re.compile(r"\b(?:[A-Z][a-z]+|[A-Z]{2,})(?:\s+(?:[A-Z][a-z]+|[A-Z]{2,}|of|and|the|in|for|to|de|la)){1,5}\b"),
    re.compile(r"\b\d{3,4}(?:s)?(?:[-–]\d{2,4})?\b"),
    re.compile(
        r"\b(?:ancient DNA|public health|yellow fever|smallpox|measles|cholera|tuberculosis|plague|"
        r"malaria|hantavirus|Ebola|syphilis|leprosy|migraine|dementia|pathogen|vector|reservoir|"
        r"epidemic|outbreak|mortality|infection|disease ecology)\b",
        flags=re.I,
    ),
]
TRAILING_PHRASE_WORDS = {"and", "the", "of", "in", "for", "to", "de", "la"}
REJECT_ANSWER_PHRASES = {
    "because",
    "choice",
    "evidence",
    "overall",
    "whatever",
    "most",
    "this",
    "that",
    "they",
    "there",
    "these",
    "those",
}
REJECT_ANSWER_STARTS = {
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "all",
    "another",
    "before",
    "beyond",
    "can",
    "cambridge",
    "close-quarters",
    "common",
    "compared",
    "concerns",
    "consistent",
    "currently",
    "date",
    "despite",
    "diseases",
    "drinking",
    "due",
    "during",
    "epicenters",
    "could",
    "did",
    "do",
    "does",
    "done",
    "had",
    "has",
    "have",
    "having",
    "habitats",
    "higher",
    "is",
    "are",
    "was",
    "were",
    "would",
    "which",
    "what",
    "why",
    "where",
    "when",
    "how",
    "that",
    "this",
    "these",
    "those",
    "it",
    "its",
    "there",
    "we",
    "they",
    "same",
    "with",
    "among",
    "carried",
    "quantify",
    "greatest",
    "some",
    "as",
    "so",
    "three",
    "trajectory",
    "understand",
    "while",
    "though",
    "although",
    "after",
    "because",
    "from",
    "on",
    "at",
    "by",
    "into",
    "onto",
    "exactly",
    "acting",
    "become",
    "beautiful",
    "cut",
    "deaths",
    "die",
    "died",
    "dramatic",
    "describes",
    "environments",
    "experienced",
    "every",
    "even",
    "factor",
    "find",
    "flaw",
    "further",
    "funding",
    "fractured",
    "grew",
    "heavily",
    "however",
    "if",
    "including",
    "initial",
    "individuals",
    "learned",
    "litany",
    "locally",
    "looking",
    "leading",
    "likely",
    "making",
    "missionaries",
    "models",
    "more",
    "most",
    "much",
    "namely",
    "noted",
    "once",
    "one",
    "outpaced",
    "part",
    "power",
    "preceded",
    "progression",
    "proportions",
    "protect",
    "previously",
    "problems",
    "pathway",
    "put",
    "reduce",
    "reduces",
    "regional",
    "represent",
    "referenced",
    "regards",
    "relationship",
    "relationships",
    "researchers",
    "said",
    "say",
    "showed",
    "shown",
    "sharing",
    "smaller",
    "story",
    "suggests",
    "survive",
    "survival",
    "taking",
    "than",
    "trial",
    "trouble",
    "strip",
    "trying",
    "using",
    "whether",
    "war",
    "ve",
    "welcome",
    "without",
    "years",
}
REJECT_ANSWER_ENDS = {
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "if",
    "by",
    "at",
    "on",
    "of",
    "for",
    "to",
    "from",
    "with",
    "without",
    "into",
    "onto",
    "over",
    "under",
    "as",
    "because",
    "while",
    "though",
    "although",
    "what",
    "which",
    "who",
    "why",
    "how",
    "is",
    "are",
    "was",
    "were",
    "be",
    "being",
    "been",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "can",
    "could",
    "would",
    "should",
    "may",
    "might",
    "must",
}
REJECT_ANSWER_VERBS = {
    "acting",
    "become",
    "being",
    "compared",
    "cut",
    "describes",
    "experienced",
    "did",
    "does",
    "doing",
    "done",
    "had",
    "has",
    "have",
    "having",
    "killed",
    "learned",
    "is",
    "leading",
    "look",
    "making",
    "noted",
    "put",
    "reduces",
    "represent",
    "referenced",
    "said",
    "sharing",
    "strip",
    "trying",
    "using",
    "understand",
    "was",
    "welcome",
    "were",
}
TOPIC_LABEL_OVERRIDES = {
    "ancient dna": "ancient DNA",
    "ebola": "Ebola",
    "viking": "Viking Age evidence",
}
ANSWER_CATEGORY_TERMS: dict[str, set[str]] = {
    "disease_pathogen": {
        "andes virus",
        "andv",
        "chagas",
        "cholera",
        "cocoliztli",
        "copd",
        "covid",
        "covid-19",
        "dementia",
        "dengue",
        "diphtheria",
        "dysentery",
        "ebola",
        "enteric fever",
        "fungal infection",
        "hantavirus",
        "hfrs",
        "hookworm",
        "influenza",
        "leprosy",
        "malaria",
        "measles",
        "migraine",
        "mpox",
        "plague",
        "pneumonia",
        "salmonella",
        "smallpox",
        "syphilis",
        "tmvii",
        "trichophyton",
        "tuberculosis",
        "typhoid",
        "typhus",
        "variola",
        "yellow fever",
        "yersinia pestis",
    },
    "evidence_method": {
        "ancient dna",
        "archaeological findings",
        "archival evidence",
        "brain waves",
        "cemetery evidence",
        "depression questionnaire",
        "documentary evidence",
        "eeg",
        "epigenetic clocks",
        "genetic evidence",
        "genomic analysis",
        "hamilton depression rating scale",
        "isotope analysis",
        "meta-analysis",
        "osteological evidence",
        "paleopathology",
        "pcr",
        "ascend",
        "crispr",
        "phase iv",
        "polysomnography",
        "randomized controlled trials",
        "survey study",
    },
    "metric_measure": {
        "attack rate",
        "caloric burn",
        "case fatality rate",
        "effect size",
        "epidemic curve",
        "fatality rate",
        "heart rate data",
        "hrv",
        "interquartile range",
        "life table",
        "monthly headache days",
        "morbidity and mortality",
        "mortality rate",
        "population density",
        "prevalence",
        "resting heart rate",
        "risk factor",
        "sleep stages",
        "total sleep time",
    },
    "measurement_device": {
        "accelerometers",
        "algorithm",
        "algorithms",
        "heart-rate sensors",
        "motion sensors",
        "optical sensors",
        "proprietary algorithms",
        "wearable sensors",
    },
    "place_region": {
        "africa",
        "alaska",
        "america",
        "argentine",
        "britain",
        "canada",
        "canary islands",
        "caribbean",
        "charleston",
        "chaco canyon",
        "chilean",
        "drc and uganda",
        "eastern woodlands",
        "europe",
        "france",
        "goma",
        "hispaniola",
        "iceland",
        "ituri",
        "kampala",
        "kivu",
        "manchuria",
        "mexico",
        "naples",
        "new york",
        "northeastern brazil",
        "north atlantic",
        "old world",
        "philadelphia",
        "saint-domingue",
        "savannah",
        "south america",
        "turkey",
        "united states",
        "west eurasia",
    },
    "organization_source": {
        "american academy of neurology",
        "american headache society",
        "american battlefield trust",
        "cdc",
        "centers for disease control",
        "city hall",
        "department of epidemiology",
        "eli lilly",
        "european cdc",
        "global burden of disease",
        "hhs",
        "jorvik viking center",
        "lloyds bank",
        "mash",
        "nature ecology",
        "new york hospital",
        "new york marine hospital",
        "nkvd",
        "northern army",
        "oecd",
        "red cross",
        "reich lab",
        "royal navy",
        "state department",
        "unmc",
        "usaid",
        "pfizer",
        "international headache society",
        "wall street journal",
        "war department",
        "who",
        "world health organization",
    },
    "population_group": {
        "african residents",
        "american patriots",
        "children",
        "french and british",
        "hessians",
        "migraine patients",
        "msms",
        "native americans",
        "nigerian sex workers",
        "older adults",
        "patients",
        "red cross volunteers",
        "refugees",
        "residents",
        "sex workers",
        "shift workers",
        "staten islanders",
        "staten island residents",
        "troops",
        "un soldiers",
        "vegetarians",
        "vegans",
        "viking age norse",
        "women",
    },
    "clinical_condition": {
        "bipolar disorder",
        "celiac disease",
        "chronic insomnia",
        "congenital syphilis",
        "high blood pressure",
        "kidney or liver disease",
        "mci and ad",
        "mild cognitive impairment",
        "periapical disease",
        "severe tuberculosis infection",
    },
    "substance_treatment": {
        "antidepressants",
        "barbie drug",
        "cbt-i",
        "creatine",
        "glp-1",
        "lsd",
        "melanotan ii",
        "melatonin",
        "placebo",
        "psilocybin",
        "psychedelic assisted therapy",
        "rimegepant",
    },
    "historical_event": {
        "american revolution",
        "bell beaker",
        "black death",
        "bronze age",
        "columbian exchange",
        "corded ware",
        "crimean war",
        "industrial revolution",
        "justinianic plague",
        "middle passage",
        "naples outbreak",
        "north atlantic viking age",
        "satanic panic",
        "third plague pandemic",
        "viking age",
        "wwii",
        "yamnaya",
        "declaration of independence",
    },
    "publication_title": {
        "a terrible mistake",
        "big epidemiology",
        "creatine is overrated",
        "le pain maudit",
        "plagues and peoples",
        "secret cold war experiments",
        "super agers",
        "lancet countdown",
        "new york times",
        "wall street journal",
        "edge of epidemiology",
        "journal of headache and pain",
        "pnas",
        "pubmed",
        "openalex",
        "retraction watch",
    },
    "legal_policy": {
        "act to prevent the spread",
        "leprosy ordinance",
        "matter of human tissue litigation",
        "quarantine act",
        "public health act",
        "public health law",
        "quarantine ordinance",
    },
    "person_author": {
        "benjamin rush",
        "benedict arnold",
        "david christian",
        "frank olson",
        "francisco hernandez",
        "general charles leclerc",
        "huayna capac",
        "john mcneill",
        "luigi bragazzi",
        "richard lipton",
        "robert mccaa",
        "steven kaplan",
        "tedros adhanom ghebreyesus",
        "teodoro hampe",
        "thorsten lehr",
        "william h",
        "william mcneill",
    },
    "ship_vessel": {
        "mv hondius",
    },
    "vector_reservoir": {
        "aedes aegypti",
        "mosquito",
        "rodent reservoir",
        "sandfly vector",
        "stagnant water barrels",
        "vector",
    },
    "concept": {
        "critical community size",
        "disease ecology",
        "early-life mortality",
        "epidemic fade-out",
        "fine-grained osteological evidence",
        "gold standard",
        "herd immunity",
        "public health",
        "residual confounding",
        "social determinants of health",
        "virgin-soil population",
    },
}
DISTRACTOR_BANKS: dict[str, tuple[str, ...]] = {
    "disease_pathogen": (
        "smallpox",
        "yellow fever",
        "tuberculosis",
        "malaria",
        "cholera",
        "measles",
        "plague",
        "hantavirus",
        "syphilis",
        "influenza",
        "COVID",
        "TMVII",
        "Trichophyton infection",
    ),
    "evidence_method": (
        "ancient DNA",
        "cemetery evidence",
        "archival evidence",
        "osteological evidence",
        "isotope analysis",
        "genomic analysis",
        "polysomnography",
        "randomized controlled trials",
        "meta-analysis",
        "survey data",
        "Phase IV trial",
        "CRISPR research",
    ),
    "metric_measure": (
        "attack rate",
        "case fatality rate",
        "epidemic curve",
        "mortality rate",
        "prevalence",
        "effect size",
        "monthly headache days",
        "population density",
        "resting heart rate",
        "total sleep time",
        "HRV",
    ),
    "measurement_device": (
        "optical sensors",
        "accelerometers",
        "proprietary algorithms",
        "motion sensors",
        "heart-rate sensors",
        "wearable sensors",
    ),
    "place_region": (
        "United States",
        "Europe",
        "West Eurasia",
        "Old World",
        "South America",
        "Caribbean",
        "Philadelphia",
        "New York City",
        "Hispaniola",
        "Saint-Domingue",
        "North Kivu and Ituri",
        "Kampala and Goma",
        "Northeastern Brazil",
        "Eastern Woodlands",
        "Chaco Canyon",
    ),
    "organization_source": (
        "WHO",
        "CDC",
        "USAID",
        "HHS",
        "War Department",
        "Global Burden of Disease",
        "American Headache Society",
        "Reich Lab",
        "state public health labs",
        "Royal Navy",
        "Northern Army",
        "Continental Army",
        "Lloyds Bank",
        "Jorvik Viking Center",
    ),
    "population_group": (
        "health workers",
        "local residents",
        "patients",
        "field volunteers",
        "troops",
        "travelers",
        "refugees",
        "older adults",
        "children",
        "shift workers",
        "sex workers",
        "MSMs",
        "colonists",
        "soldiers",
        "Viking Age Norse",
    ),
    "clinical_condition": (
        "periapical disease",
        "kidney or liver disease",
        "high blood pressure",
        "bipolar disorder",
        "chronic insomnia",
        "celiac disease",
        "congenital syphilis",
        "severe tuberculosis infection",
        "mild cognitive impairment",
        "Alzheimer's disease",
    ),
    "substance_treatment": (
        "placebo",
        "melatonin",
        "creatine",
        "Barbie Drug",
        "psilocybin",
        "LSD",
        "CBT-I",
        "antidepressants",
        "Rimegepant",
        "Melanotan II",
        "GLP-1 medications",
    ),
    "historical_event": (
        "Black Death",
        "Viking Age",
        "North Atlantic Viking Age",
        "Middle Passage",
        "American Revolution",
        "Bronze Age",
        "Industrial Revolution",
        "Crimean War",
        "Justinianic Plague",
        "Satanic Panic",
        "Columbian Exchange",
        "Naples outbreak",
        "Bell Beaker expansions",
    ),
    "publication_title": (
        "Wall Street Journal",
        "PNAS",
        "Retraction Watch",
        "PubMed",
        "OpenAlex",
        "Journal of Headache and Pain",
        "Creatine Is Overrated",
        "Le Pain Maudit",
        "A Terrible Mistake",
        "Big Epidemiology",
        "Plagues and Peoples",
        "Secret Cold War Experiments",
        "Edge of Epidemiology",
        "Super Agers",
    ),
    "legal_policy": (
        "Act to Prevent the Spread",
        "Leprosy Ordinance",
        "Quarantine Act",
        "Public Health Act",
        "Quarantine Ordinance",
        "State Board of Health order",
        "Infectious Disease Act",
        "Health Department regulation",
    ),
    "person_author": (
        "Luigi Bragazzi and Thorsten Lehr",
        "David Christian",
        "William H. McNeill",
        "John McNeill",
        "Benjamin Rush",
        "Benedict Arnold",
        "Frank Olson",
        "Francisco Hernandez",
        "Huayna Capac",
        "Richard Lipton",
        "Robert McCaa",
        "Steven Kaplan",
        "Teodoro Hampe Martinez",
    ),
    "ship_vessel": (
        "MV Hondius",
        "Diamond Princess",
        "Grand Princess",
        "MS Zaandam",
        "Ruby Princess",
        "HMS Bounty",
    ),
    "vector_reservoir": (
        "Aedes aegypti mosquito",
        "sandfly vector",
        "rodent reservoir",
        "mosquito vector",
        "stagnant water barrels",
        "optical sensors",
        "accelerometers",
        "proprietary algorithms",
    ),
    "concept": (
        "public health",
        "disease ecology",
        "early-life mortality",
        "critical community size",
        "epidemic fade-out",
        "residual confounding",
        "gold standard",
        "social determinants of health",
        "virgin-soil population",
        "herd immunity",
    ),
}
MULTIPLE_CHOICE_CATEGORIES = frozenset(category for category in DISTRACTOR_BANKS if category != "concept")


@dataclass
class TextBlock:
    tag: str
    text: str


@dataclass
class Candidate:
    sentence: str
    heading: str
    score: int


class BodyHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.blocks: list[TextBlock] = []
        self._current_tag = ""
        self._chunks: list[str] = []
        self._skip_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in SKIP_TAGS:
            self._skip_depth += 1
            return
        if self._skip_depth:
            return
        if tag in BLOCK_TAGS:
            self._flush()
            self._current_tag = tag
        elif tag == "br" and self._current_tag:
            self._chunks.append(" ")

    def handle_endtag(self, tag: str) -> None:
        if tag in SKIP_TAGS and self._skip_depth:
            self._skip_depth -= 1
            return
        if self._skip_depth:
            return
        if tag == self._current_tag:
            self._flush()

    def handle_data(self, data: str) -> None:
        if self._skip_depth or not self._current_tag:
            return
        self._chunks.append(data)

    def _flush(self) -> None:
        if not self._current_tag:
            return
        text = normalize_text(" ".join(self._chunks))
        if text:
            self.blocks.append(TextBlock(self._current_tag, text))
        self._current_tag = ""
        self._chunks = []


def normalize_text(value: Any) -> str:
    return re.sub(r"\s+", " ", clean_text(str(value or ""))).strip()


def fetch_post_body_html(url: str, *, timeout: int) -> str:
    request = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,*/*;q=0.8"})
    with urlopen(request, timeout=timeout) as response:
        html_text = response.read().decode("utf-8", "replace")
    payload = extract_preloads_payload(html_text)
    body_html = payload.get("post", {}).get("body_html") or ""
    if len(body_html) < 500:
        raise ValueError("Substack body_html was missing or too short")
    return str(body_html)


def body_blocks(body_html: str) -> list[TextBlock]:
    parser = BodyHTMLParser()
    parser.feed(body_html)
    parser.close()
    return [block for block in parser.blocks if not reject_block(block.text)]


def reject_block(text: str) -> bool:
    lowered = text.lower()
    if len(text) < 45:
        return True
    return any(marker in lowered for marker in REJECT_BLOCK_MARKERS)


def split_sentences(text: str) -> list[str]:
    pieces = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9“\"'])", text)
    sentences = []
    for piece in pieces:
        sentence = normalize_text(piece)
        if 70 <= len(sentence) <= 280 and not reject_sentence(sentence):
            sentences.append(sentence)
    return sentences


def reject_sentence(sentence: str) -> bool:
    lowered = sentence.lower()
    if any(marker in lowered for marker in REJECT_SENTENCE_MARKERS):
        return True
    if sentence.count(",") > 7:
        return True
    if len(sentence.split()) < 10:
        return True
    return False


def key_term_pattern(term: str) -> re.Pattern[str]:
    return re.compile(rf"(?<![a-z0-9]){re.escape(term)}(?![a-z0-9])", flags=re.I)


KEY_TERM_PATTERNS = {term: key_term_pattern(term) for term in KEY_TERMS}


def matched_key_terms(text: str) -> list[str]:
    return [term for term, pattern in KEY_TERM_PATTERNS.items() if pattern.search(text)]


def score_sentence(sentence: str, heading: str, ordinal: int) -> int:
    lowered = sentence.lower()
    score = 0
    score += 3 * len(matched_key_terms(sentence))
    score += 3 if re.search(r"\b\d{3,4}s?\b", sentence) else 0
    score += 2 if re.search(r"\b(because|therefore|instead|rather|means|suggests|shows|explains|turned|reveals)\b", lowered) else 0
    score += 2 if heading else 0
    score += 2 if 110 <= len(sentence) <= 220 else 0
    if lowered.startswith(("i ", "my ", "this piece", "in this piece")):
        score -= 2
    score -= max(0, ordinal // 18)
    return score


def candidate_sentences(blocks: list[TextBlock]) -> list[Candidate]:
    candidates: list[Candidate] = []
    fallback_candidates: list[Candidate] = []
    heading = ""
    ordinal = 0
    for block in blocks:
        if block.tag in HEADING_TAGS:
            heading = block.text[:72]
            continue
        for sentence in split_sentences(block.text):
            score = score_sentence(sentence, heading, ordinal)
            fallback_candidates.append(Candidate(sentence=sentence, heading=heading, score=score))
            if score >= 2:
                candidates.append(Candidate(sentence=sentence, heading=heading, score=score))
            ordinal += 1
    if len(candidates) < TARGET_CARD_COUNT:
        candidates = fallback_candidates
    candidates.sort(key=lambda item: item.score, reverse=True)
    return candidates


def choose_answer_phrase(sentence: str) -> str:
    matches: list[tuple[int, str]] = []
    for priority, pattern in enumerate(PHRASE_PATTERNS):
        for match in pattern.finditer(sentence):
            matches.append((priority, (match.group(1) if match.lastindex else match.group(0)).strip()))
    clean_matches: list[tuple[int, str]] = []
    seen: set[str] = set()
    for priority, match in matches:
        phrase = normalize_text(match).strip(".,;:()[]“”\"'")
        words = phrase.split()
        while words and words[-1].lower() in TRAILING_PHRASE_WORDS:
            words.pop()
        while words and words[0].lower() in TRAILING_PHRASE_WORDS:
            words.pop(0)
        phrase = " ".join(words)
        phrase = re.sub(r"^Researchers\s+", "", phrase).strip()
        phrase = re.sub(r"^Three\s+Red Cross$", "Red Cross volunteers", phrase).strip()
        phrase = re.sub(r"^Other paleopathologial evidence$", "paleopathological evidence", phrase).strip()
        phrase = re.sub(r"\b(\d{1,2})\s+(st|nd|rd|th)\b", r"\1\2", phrase, flags=re.I)
        if len(phrase) < 4 or phrase.casefold() in seen:
            continue
        if phrase.lower() in REJECT_ANSWER_PHRASES:
            continue
        seen.add(phrase.casefold())
        clean_matches.append((priority, phrase))
    if not clean_matches:
        return ""
    return sorted(clean_matches, key=lambda value: (value[0], -len(value[1].split()), -len(value[1])))[0][1]


def valid_compact_answer(answer: str) -> bool:
    words = answer.split()
    if not words:
        return False
    if len(answer) > 80 or len(words) > 8:
        return False
    clean_words = [word.strip(".,;:()[]“”\"'").lower() for word in words]
    if clean_words[0] in REJECT_ANSWER_STARTS:
        return False
    if clean_words[-1] in REJECT_ANSWER_ENDS:
        return False
    if any(word in REJECT_ANSWER_VERBS for word in clean_words):
        return False
    if re.search(r"\b(?:disease|evidence)\s+(?:was|were|is|are|had|has|does|did)\b", answer, flags=re.I):
        return False
    if re.search(r"\b(?:was|were|is|are|had|has|does|did)\s+(?:the|a|an|some|any)\b", answer, flags=re.I):
        return False
    return bool(re.search(r"[A-Za-z]", answer))


def choose_compact_answer(sentence: str) -> str:
    answer = choose_answer_phrase(sentence)
    return answer if valid_compact_answer(answer) else ""


def shortened_context(text: str, *, max_length: int = 235) -> str:
    text = normalize_text(text)
    if len(text) <= max_length:
        return text
    return text[: max_length - 1].rsplit(" ", 1)[0].rstrip(".,;:") + "…"


def cloze_context(sentence: str, answer: str, *, max_length: int = 220) -> str:
    pattern = re.compile(re.escape(answer), flags=re.I)
    redacted = pattern.sub("_____", normalize_text(sentence), count=1)
    if "_____" not in redacted:
        return ""
    if len(redacted) <= max_length:
        return redacted
    blank_at = redacted.find("_____")
    start = max(0, blank_at - max_length // 2)
    end = min(len(redacted), start + max_length)
    start = max(0, end - max_length)
    snippet = redacted[start:end].strip()
    if start > 0:
        snippet = "..." + snippet.split(" ", 1)[-1]
    if end < len(redacted):
        snippet = snippet.rsplit(" ", 1)[0].rstrip(".,;:") + "..."
    return snippet


def topic_from_sentence(sentence: str, heading: str) -> str:
    phrase = choose_compact_answer(sentence)
    if phrase:
        return phrase
    if heading:
        return heading
    words = [
        word.strip(".,;:()[]“”\"'").lower()
        for word in sentence.split()
        if len(word.strip(".,;:()[]“”\"'")) >= 5
    ]
    return " ".join(words[:4]) or "this point"


def topic_label(sentence: str, heading: str) -> str:
    if heading:
        return heading
    matches = sorted(matched_key_terms(sentence), key=lambda term: (-len(term), term))
    if matches:
        labels = [TOPIC_LABEL_OVERRIDES.get(term, term.replace("dna", "DNA")) for term in matches[:2]]
        return " and ".join(labels)
    return topic_from_sentence(sentence, heading)


def lowercase_leading_word(text: str) -> str:
    text = text.strip()
    if not text:
        return text
    return text[0].lower() + text[1:]


def sentence_fragment(text: str, *, max_length: int = 120) -> str:
    fragment = shortened_context(text.strip(" .;:"), max_length=max_length)
    fragment = re.sub(r",?\s+(likely|probably|possibly|mostly)$", "", fragment, flags=re.I)
    return lowercase_leading_word(fragment)


def answer_sentence(sentence: str) -> str:
    return shortened_context(sentence, max_length=230)


def why_answer(sentence: str) -> str:
    before, _, after = sentence.partition(" because ")
    if not after:
        before, _, after = sentence.partition(" Because ")
    if not after:
        return answer_sentence(sentence)
    after = after.strip()
    if not after:
        return answer_sentence(sentence)
    return shortened_context(after[0].upper() + after[1:], max_length=230)


def answer_pool(candidates: list[Candidate]) -> list[str]:
    answers: list[str] = []
    seen: set[str] = set()
    for candidate in candidates:
        answer = choose_compact_answer(candidate.sentence)
        if not answer:
            continue
        key = answer.casefold()
        if key in seen:
            continue
        seen.add(key)
        answers.append(answer)
    return answers


def normalized_option_key(option: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", option.casefold()).strip()


def answer_category(answer: str) -> str:
    lowered = answer.casefold()
    if lowered in {"global burden of disease"}:
        return "organization_source"
    if lowered in {"viking age norse"}:
        return "population_group"
    if lowered in {"plagues and peoples", "wall street journal"}:
        return "publication_title"
    if re.search(r"\b\d{1,2}(?:st|nd|rd|th)\s+century\b.*\b(?:epidemic|outbreak)\b", lowered):
        return "historical_event"
    if lowered in {"american revolution", "korean war", "north atlantic viking age"}:
        return "historical_event"
    if lowered in {"diamond princess", "grand princess", "ruby princess"}:
        return "ship_vessel"
    if lowered in {"mv hondius"} or re.search(r"\b(?:mv|ms|hms)\s+[a-z]", answer, flags=re.I):
        return "ship_vessel"
    if re.search(r"\b(?:army|navy)\b", lowered):
        return "organization_source"
    if re.search(r"\b(?:center|department|agency|society|organization|who|cdc|hhs|usaid)\b", lowered):
        return "organization_source"
    if re.search(r"\b(?:sensor|sensors|accelerometer|accelerometers|algorithm|algorithms)\b", lowered):
        return "measurement_device"
    if re.search(r"\b(?:vector|reservoir|mosquito)\b", lowered):
        return "vector_reservoir"
    if re.search(r"\b(?:americans|patients|workers|soldiers|troops|residents|islanders|citizens|children|adults|women|men|group|volunteers)\b", lowered):
        return "population_group"
    if re.search(r"\b\d{3,4}s?(?:[-–]\d{2,4})?\b", answer):
        return "historical_event"
    for category in (
        "legal_policy",
        "clinical_condition",
        "publication_title",
        "evidence_method",
        "metric_measure",
        "measurement_device",
        "substance_treatment",
        "disease_pathogen",
        "historical_event",
        "population_group",
        "organization_source",
        "person_author",
        "ship_vessel",
        "vector_reservoir",
    ):
        if any(term in lowered for term in ANSWER_CATEGORY_TERMS[category]):
            return category
    if re.search(r"\b(disease|infection|fever|virus|pathogen|plague|pox|malaria|migraine|dementia|syphilis)\b", lowered):
        return "disease_pathogen"
    for category, terms in ANSWER_CATEGORY_TERMS.items():
        if any(term in lowered for term in terms):
            return category
    if re.search(r"\b(rate|ratio|prevalence|mortality|density|risk|curve|score|scale|measure|measurement|percent|%)\b", lowered):
        return "metric_measure"
    if re.search(r"\b(evidence|analysis|data|study|trial|method|genome|dna|survey|test|testing|pcr|clock|questionnaire)\b", lowered):
        return "evidence_method"
    if re.search(r"\b(americans|population|patients|workers|soldiers|troops|residents|islanders|citizens|children|adults|women|men|group|volunteers)\b", lowered):
        return "population_group"
    if re.search(r"\b(lab|labs|agency|department|journal|society|organization|who|cdc|hhs|usaid)\b", lowered):
        return "organization_source"
    if re.search(r"\b(sensor|sensors|accelerometer|accelerometers|algorithm|algorithms)\b", lowered):
        return "measurement_device"
    if re.search(r"\b(mosquito|vector|reservoir)\b", lowered):
        return "vector_reservoir"
    if re.search(r"\b[A-Z]{2,6}\b", answer):
        return "organization_source"
    if re.search(r"\b[A-Z][a-z]+(?:\s+(?:[A-Z][a-z]+|of|and|the|in|for|to|de|la)){1,5}\b", answer):
        return "place_region"
    return "concept"


def valid_option_phrase(option: str) -> bool:
    option = normalize_text(option).strip(".,;:()[]“”\"'")
    if "," in option:
        return False
    if not valid_compact_answer(option):
        return False
    if option.casefold() in REJECT_ANSWER_PHRASES:
        return False
    if len(option.split()) == 1 and option.casefold() in {"disease", "evidence", "risk", "choice", "overall", "whatever"}:
        return False
    if option.casefold() in {
        "asthma to autoimmune disease",
        "attributable to infectious disease",
        "after disease",
        "been any more evidence",
        "birth rates and population",
        "break and the infection",
        "broad-scale study of disease",
        "cases to map disease",
        "cgrp",
        "city friendly malarial vector",
        "compatibility for multiple vector",
        "consistent with hantavirus disease",
        "contact equals bringing disease",
        "congressional congress",
        "confront the disease",
        "childhood disease",
        "close-quarters missions allowed infection",
        "course of infection",
        "countries departments of disease",
        "date of variola infection",
        "disease ecology",
        "disease unheard",
        "diseases like diarrheal disease",
        "difference with this disease",
        "distinct disease",
        "dramatic post-bronze age",
        "driven them into disease",
        "due to infectious disease",
        "end up reducing disease",
        "even contracting the disease",
        "esprit to frank olson",
        "factor for celiac disease",
        "flaw in the study",
        "james lind of the hms salisbury",
        "funding because the disease",
        "get some stronger evidence",
        "global population",
        "grew alongside the disease",
        "grotesquely virulent disease",
        "helped to sustain disease",
        "cycles and shoot vector",
        "heavy increase in population",
        "heavy on the evidence",
        "he understood the disease",
        "highly deadly disease",
        "highest disease",
        "impacts of endemic disease",
        "infectious disease",
        "individuals and african residents",
        "johannesburg and in the netherlands",
        "lady gaga",
        "belgian catholic",
        "lbna",
        "lines between early evidence",
        "lnba",
        "longer course of infection",
        "major agent of infection",
        "meant increased adult mortality",
        "mildly pcr positive",
        "models for cardiovascular disease",
        "mechanism for the pathogen",
        "modern human population",
        "modern standards adult mortality",
        "next deadliest disease",
        "not the best population",
        "naomi",
        "origin whereby the disease",
        "override every risk",
        "panmictic population",
        "pathway through spatial analysis",
        "pinnacle of epidemiological evidence",
        "presentation of the disease",
        "problems with the evidence",
        "population",
        "population y",
        "poverty and weak vector",
        "people still believed disease",
        "quantifying the effects",
        "increasing for multiple vector",
        "regional emerging special pathogen",
        "regards to infectious disease",
        "real cia",
        "rule out any pathogen",
        "rising in the population",
        "school of medicine professor david",
        "seir",
        "sort of ranked mortality",
        "species for this infection",
        "standard american diet",
        "survive radically changing disease",
        "table or actuarial analysis",
        "tearing through the population",
        "than the general population",
        "terrible gut infection",
        "tm seven",
        "trial data to population",
        "their own significant population",
        "two-thirds of the population",
        "two extremely high mortality",
        "ulcers or heart disease",
        "untreated infection",
        "us population",
        "viking and norse",
        "want to isolate disease",
        "ichd",
        "best of ancient pathogen",
        "missionaries and the disease",
        "power shaped unequal risk",
        "protect workers",
        "higher near-term disease",
        "concerns of rickettsial disease",
        "habitats aligning with vector",
        "survival of the vector",
        "drinking water and risk",
        "smaller study",
        "study",
        "york harbor of disease",
    }:
        return False
    if re.search(r"\b(?:and|of)\s+(?:the\s+)?(?:disease|evidence|risk|vector)\b", option, flags=re.I):
        return False
    return True


def distractor_bank_for_answer(category: str, answer: str) -> tuple[str, ...]:
    lowered = answer.casefold()
    if category == "metric_measure" and re.search(r"\b(?:heart|sleep|hrv|caloric|headache)\b", lowered):
        return (
            "resting heart rate",
            "heart rate data",
            "total sleep time",
            "sleep stages",
            "HRV",
            "monthly headache days",
            "caloric burn",
        )
    if category != "organization_source":
        return DISTRACTOR_BANKS.get(category, ())
    if re.search(r"\b(?:army|navy|war department|mash|nkvd|hemorrhagic fever center)\b", lowered):
        return (
            "Royal Navy",
            "Northern Army",
            "Continental Army",
            "War Department",
            "MASH",
            "Hemorrhagic Fever Center",
        )
    if re.search(r"\b(?:headache society|scientific meeting|neurology|pfizer)\b", lowered):
        return (
            "American Headache Society Scientific Meeting",
            "American Headache Society",
            "International Headache Society",
            "American Academy of Neurology",
            "Pfizer",
            "Eli Lilly",
        )
    if re.search(r"\b(?:bank|jorvik|hospital|city hall|museum|scientific meeting)\b", lowered):
        return (
            "Lloyds Bank",
            "Jorvik Viking Center",
            "City Hall",
            "New York Hospital",
            "New York Marine Hospital",
            "American Headache Society Scientific Meeting",
        )
    return (
        "WHO",
        "CDC",
        "USAID",
        "HHS",
        "European CDC",
        "State Department",
        "OECD",
        "UNMC",
        "Department of Epidemiology",
    )


def ordered_choices(answer: str, pool: list[str]) -> list[str]:
    if not valid_option_phrase(answer):
        return []
    category = answer_category(answer)
    if category not in MULTIPLE_CHOICE_CATEGORIES:
        return []
    answer_key = answer.casefold()
    answer_words = set(re.findall(r"[a-z0-9]+", answer_key))
    choices = [answer]
    category_pool = [
        option
        for option in pool
        if answer_category(option) == category and valid_option_phrase(option)
    ]
    bank_pool = [
        option
        for option in distractor_bank_for_answer(category, answer)
        if valid_option_phrase(option)
    ]
    for option in [*category_pool, *bank_pool]:
        option_key = option.casefold()
        if option_key == answer_key:
            continue
        if answer_key in option_key or option_key in answer_key:
            continue
        if normalized_option_key(option) in {normalized_option_key(choice) for choice in choices}:
            continue
        option_words = set(re.findall(r"[a-z0-9]+", option_key))
        if answer_words and len(answer_words & option_words) / max(len(answer_words), 1) > 0.5:
            continue
        choices.append(option)
        if len(choices) == 4:
            break
    if len(choices) < 4:
        return []
    offset = sum(ord(char) for char in answer) % 4
    return choices[offset:] + choices[:offset]


def multiple_choice_question(sentence: str, answer: str, heading: str) -> str:
    lowered = sentence.lower()
    if answer.casefold() == "ancient dna" and "pathogen" in lowered:
        return "Which evidence source does the essay say can identify pathogens directly in Viking Age remains?"
    if answer.casefold() == "periapical disease":
        return "Which dental condition does the essay identify as probably widespread?"
    if "case fatality rate" in answer.casefold() or "attack rate" in answer.casefold():
        return "Which outbreak metric does the essay say remains unknown?"
    context = cloze_context(sentence, answer, max_length=190)
    if context:
        return f'Which option best completes this essay point? "{context}"'
    return f"Which option best matches the essay's point about {topic_label(sentence, heading)}?"


def recall_question(sentence: str, heading: str) -> tuple[str, str]:
    lowered = sentence.lower()
    topic = topic_label(sentence, heading)

    if "ancient dna" in lowered and "pathogen" in lowered:
        return (
            "What can ancient DNA reveal about pathogens in Viking Age remains?",
            why_answer(sentence) if " because " in lowered else answer_sentence(sentence),
        )
    if "less headlines" in lowered and "mpox" in lowered:
        return ("Why has the fungal STI outbreak drawn less attention than mpox?", why_answer(sentence))
    if lowered.startswith("species is important"):
        return ("Why does the specific Ebola virus species matter in this outbreak update?", why_answer(sentence))
    if "effect sizes" in lowered and "antidepressant" in lowered:
        return ("What comparison does the essay draw from the trial effect-size chart?", answer_sentence(sentence))
    if "randomized controlled trials" in lowered:
        return ("What did chemists do once they understood the compounds in ergot?", answer_sentence(sentence))
    if "meta-analysis" in lowered and "clarify" in lowered:
        return ("What did the new preregistered meta-analysis try to clarify?", answer_sentence(sentence))
    if "williams and colleagues" in lowered or "does psychedelic assisted therapy" in lowered:
        return ("What question did the Williams meta-analysis try to answer?", answer_sentence(sentence))
    if "hamilton depression rating scale" in lowered:
        return ("What scale were the depression trial results standardized to?", answer_sentence(sentence))
    if "mcid" in lowered:
        return ("What MCID threshold did the authors use for the depression measure?", answer_sentence(sentence))
    if "psychedelics" in lowered and "standard anti-depressants" in lowered:
        return ("How does the essay summarize psychedelics compared with standard antidepressants?", answer_sentence(sentence))
    if "optical sensors" in lowered or "accelerometers" in lowered or "proprietary algorithms" in lowered:
        return ("What inputs do wearables use instead of directly measuring physiology?", answer_sentence(sentence))
    if "resting heart rate" in lowered or "total sleep time" in lowered or "hrv" in lowered or "caloric burn" in lowered:
        return ("Which wearable measurements does the essay separate into stronger and weaker categories?", answer_sentence(sentence))
    if "polysomnography" in lowered:
        return ("What gold standard does the essay use for comparing wearable sleep-stage estimates?", answer_sentence(sentence))
    if "brain waves" in lowered or "eeg" in lowered:
        return ("What signals does polysomnography use to distinguish sleep stages?", answer_sentence(sentence))
    if "apple watches" in lowered or "fitbits" in lowered or "whoops" in lowered or "oura rings" in lowered:
        return ("Which wearable brands does the essay use as examples of mainstream health accessories?", answer_sentence(sentence))
    if "caloric deficit" in lowered or "lose weight" in lowered:
        return ("Why can wearable calorie-burn errors matter for weight-loss decisions?", answer_sentence(sentence))
    if "watch saying you slept" in lowered:
        return ("Why are small wearable sleep-duration errors less concerning?", answer_sentence(sentence))
    if "marketing" in lowered and "oversell" in lowered:
        return ("What caveat does the essay make about wearable accuracy marketing?", answer_sentence(sentence))
    if "there is enough evidence" in lowered and "rough look" in lowered:
        return ("What does the essay say the available evidence is good enough to reconstruct?", answer_sentence(sentence))
    if "if by viking we mean" in lowered or "narrower occupational group" in lowered:
        return ("What distinction does the essay make between Viking raiders and the wider Viking Age Norse?", answer_sentence(sentence))
    if "advanced ages" in lowered or "making it beyond" in lowered:
        return ("What does the essay infer about survival to old age in ancient Scandinavian samples?", answer_sentence(sentence))
    if "started out as me wanting" in lowered or "wanting to create a life table" in lowered:
        return ("What was the author's original analytic goal for the Viking grave data?", answer_sentence(sentence))
    if "people can die" in lowered and ("no trace" in lowered or "bones" in lowered):
        return ("Why can skeletal evidence miss many infectious causes of death?", answer_sentence(sentence))
    if "case fatality rate" in lowered or "attack rate" in lowered or "epidemic curve" in lowered:
        return ("What outbreak details does the essay say remain uncertain?", answer_sentence(sentence))
    if "periapical disease" in lowered:
        return ("What dental condition does the essay identify as probably widespread?", answer_sentence(sentence))
    if "life table" in lowered or "actuarial" in lowered:
        return ("Why does the essay resist a clean life-table reconstruction?", answer_sentence(sentence))
    if "cemetery evidence" in lowered:
        return ("Why does the essay treat cemetery evidence cautiously?", answer_sentence(sentence))
    if "early-life mortality" in lowered or "only lived to like 30" in lowered:
        return ("What misconception about Viking Age lifespan does the essay complicate?", answer_sentence(sentence))
    if " because " in lowered:
        before = re.split(r"\s+because\s+", sentence, maxsplit=1, flags=re.I)[0]
        return (f"Why does the essay say {sentence_fragment(before)}?", why_answer(sentence))
    if "for example" in lowered or "example" in lowered:
        return (f"What example does the essay use to make the point about {topic}?", answer_sentence(sentence))
    if re.search(r"\b(found|finds|showed|shows|suggests|reveals|indicates|identified|reported)\b", lowered):
        return (f"What does the essay say the evidence shows about {topic}?", answer_sentence(sentence))
    if "unknown" in lowered or "we don’t know" in lowered or "we don't know" in lowered:
        return (f"What uncertainty does the essay flag about {topic}?", answer_sentence(sentence))
    if re.search(r"\b(not|isn’t|isn't|doesn’t|doesn't|cannot|can't)\b", lowered):
        return (f"What caveat does the essay make about {topic}?", answer_sentence(sentence))
    if re.search(r"\b(risk|mortality|death|died|killed|infection|outbreak|epidemic)\b", lowered):
        return (f"What should readers remember about {topic}?", answer_sentence(sentence))
    return (f"What does the essay say about {topic}?", answer_sentence(sentence))


def multiple_choice_card(candidate: Candidate, pool: list[str]) -> dict[str, Any] | None:
    answer = choose_compact_answer(candidate.sentence)
    if not answer:
        return None
    if answer_category(answer) not in MULTIPLE_CHOICE_CATEGORIES:
        return None
    choices = ordered_choices(answer, pool)
    if len(choices) != 4:
        return None
    return {
        "question": multiple_choice_question(candidate.sentence, answer, candidate.heading),
        "choices": choices,
        "answer": answer,
        "cue": "Multiple choice",
        "explanation": answer_sentence(candidate.sentence),
    }


def fill_blank_card(candidate: Candidate) -> dict[str, Any] | None:
    answer = choose_compact_answer(candidate.sentence)
    if not answer:
        return None
    context = cloze_context(candidate.sentence, answer, max_length=220)
    if not context:
        return None
    return {
        "question": f'Fill in the blank: "{context}"',
        "answer": answer,
        "cue": "Fill in the blank",
        "explanation": answer_sentence(candidate.sentence),
    }


def short_answer_card(candidate: Candidate) -> dict[str, Any]:
    question, answer = recall_question(candidate.sentence, candidate.heading)
    return {
        "question": question,
        "answer": answer,
        "cue": "Short answer",
    }


def candidate_card(kind: str, candidate: Candidate, pool: list[str]) -> dict[str, Any] | None:
    if kind == "multiple_choice":
        return multiple_choice_card(candidate, pool)
    if kind == "fill_blank":
        return fill_blank_card(candidate)
    return short_answer_card(candidate)


def cards_from_body(body_html: str) -> list[dict[str, Any]]:
    cards: list[dict[str, Any]] = []
    used_questions: set[str] = set()
    used_answers: set[str] = set()
    used_sentences: set[str] = set()
    candidates = candidate_sentences(body_blocks(body_html))
    pool = answer_pool(candidates)

    def add_kind(kind: str) -> bool:
        for candidate in candidates:
            sentence_key = candidate.sentence.casefold()
            if sentence_key in used_sentences:
                continue
            card = candidate_card(kind, candidate, pool)
            if not card:
                continue
            question_key = card["question"].casefold()
            if question_key in used_questions:
                continue
            answer = str(card["answer"])
            if kind != "short_answer" and (len(answer) > 90 or len(answer.split()) > 9):
                continue
            answer_identity = f'{kind}:{answer.casefold()}'
            if answer_identity in used_answers:
                continue
            cards.append(card)
            used_questions.add(question_key)
            used_answers.add(answer_identity)
            used_sentences.add(sentence_key)
            return True
        return False

    for kind in CARD_PLAN:
        if len(cards) >= TARGET_CARD_COUNT:
            break
        if not add_kind(kind) and kind != "short_answer":
            add_kind("short_answer")

    for kind in ("multiple_choice", "fill_blank", "short_answer"):
        while len(cards) < TARGET_CARD_COUNT and add_kind(kind):
            pass

    if len(cards) < TARGET_CARD_COUNT:
        raise ValueError(f"Only generated {len(cards)} body-derived cards")
    return cards[:TARGET_CARD_COUNT]


def generate_for_posts(posts: list[dict[str, Any]], *, limit: int | None, timeout: int) -> tuple[list[dict[str, Any]], list[dict[str, str]]]:
    updated_posts: list[dict[str, Any]] = []
    failures: list[dict[str, str]] = []
    generated_at = dt.datetime.now(dt.UTC).replace(microsecond=0).isoformat()
    count = 0
    for post in posts:
        record = dict(post)
        url = str(record.get("canonical_url") or "")
        if not url:
            failures.append({"slug": str(record.get("slug") or ""), "error": "missing canonical_url"})
            updated_posts.append(record)
            continue
        if limit is not None and count >= limit:
            updated_posts.append(record)
            continue
        try:
            cards = cards_from_body(fetch_post_body_html(url, timeout=timeout))
            record["flashcards"] = cards
            record["flashcards_source"] = "substack_body_html"
            record["flashcards_source_url"] = url
            record["flashcards_generated_at"] = generated_at
            count += 1
        except Exception as exc:  # noqa: BLE001
            failures.append({"slug": str(record.get("slug") or ""), "url": url, "error": str(exc)})
            record.pop("flashcards", None)
            record.pop("flashcards_source", None)
            record.pop("flashcards_source_url", None)
            record.pop("flashcards_generated_at", None)
        updated_posts.append(record)
    return updated_posts, failures


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate body-derived flashcards from Substack post text.")
    parser.add_argument("--manifest", type=Path, default=None)
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--timeout", type=int, default=25)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    posts = load_posts_manifest(args.manifest)
    updated_posts, failures = generate_for_posts(posts, limit=args.limit, timeout=args.timeout)
    if not args.dry_run:
        save_posts_manifest(updated_posts, args.manifest)
    with_cards = sum(1 for post in updated_posts if len(post.get("flashcards") or []) == TARGET_CARD_COUNT)
    print(f"posts={len(updated_posts)}")
    print(f"with_10_flashcards={with_cards}")
    print(f"failures={len(failures)}")
    for failure in failures[:20]:
        print(f"{failure.get('slug')}: {failure.get('error')}")


if __name__ == "__main__":
    main()
