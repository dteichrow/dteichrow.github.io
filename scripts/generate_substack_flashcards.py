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
    re.compile(
        r"\b(?:ancient DNA|early-life mortality|childhood mortality|violent death|periapical disease|"
        r"cemetery evidence|case fatality rate|attack rate|epidemic curve|smallpox strains|"
        r"public health|disease ecology|biological age|age acceleration|interquartile range|"
        r"epigenetic clocks|residual confounding|air-conditioning penetration|cooling access)\b",
        flags=re.I,
    ),
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
    "most",
    "this",
    "that",
    "they",
    "there",
    "these",
    "those",
}
TOPIC_LABEL_OVERRIDES = {
    "ancient dna": "ancient DNA",
    "ebola": "Ebola",
    "viking": "Viking Age evidence",
}


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
    heading = ""
    ordinal = 0
    for block in blocks:
        if block.tag in HEADING_TAGS:
            heading = block.text[:72]
            continue
        for sentence in split_sentences(block.text):
            score = score_sentence(sentence, heading, ordinal)
            if score >= 2:
                candidates.append(Candidate(sentence=sentence, heading=heading, score=score))
            ordinal += 1
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
        if len(phrase) < 4 or phrase.casefold() in seen:
            continue
        if phrase.lower() in REJECT_ANSWER_PHRASES:
            continue
        seen.add(phrase.casefold())
        clean_matches.append((priority, phrase))
    if not clean_matches:
        return ""
    return sorted(clean_matches, key=lambda value: (value[0], -len(value[1].split()), -len(value[1])))[0][1]


def shortened_context(text: str, *, max_length: int = 235) -> str:
    text = normalize_text(text)
    if len(text) <= max_length:
        return text
    return text[: max_length - 1].rsplit(" ", 1)[0].rstrip(".,;:") + "…"


def topic_from_sentence(sentence: str, heading: str) -> str:
    phrase = choose_answer_phrase(sentence)
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


def cards_from_body(body_html: str) -> list[dict[str, Any]]:
    cards: list[dict[str, Any]] = []
    used_answers: set[str] = set()
    candidates = candidate_sentences(body_blocks(body_html))
    for candidate in candidates:
        if len(cards) >= TARGET_CARD_COUNT:
            break
        question, answer = recall_question(candidate.sentence, candidate.heading)
        answer_key = answer.casefold()
        if answer_key in used_answers:
            continue
        used_answers.add(answer_key)
        cards.append(
            {
                "question": question,
                "answer": answer,
                "cue": candidate.heading or "Post text",
            }
        )
    if len(cards) < TARGET_CARD_COUNT:
        raise ValueError(f"Only generated {len(cards)} body-derived cards")
    return cards


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
