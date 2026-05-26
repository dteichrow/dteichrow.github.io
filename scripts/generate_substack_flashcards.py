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


def score_sentence(sentence: str, heading: str, ordinal: int) -> int:
    lowered = sentence.lower()
    score = 0
    score += sum(3 for term in KEY_TERMS if term in lowered)
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


def answer_pool(candidates: list[Candidate]) -> list[str]:
    answers: list[str] = []
    seen: set[str] = set()
    for candidate in candidates:
        answer = choose_answer_phrase(candidate.sentence)
        if not answer:
            continue
        key = answer.casefold()
        if key in seen:
            continue
        seen.add(key)
        answers.append(answer)
    return answers


def shortened_context(text: str, *, max_length: int = 235) -> str:
    text = normalize_text(text)
    if len(text) <= max_length:
        return text
    return text[: max_length - 1].rsplit(" ", 1)[0].rstrip(".,;:") + "…"


def redacted_point(sentence: str, answer: str) -> str:
    pattern = re.compile(re.escape(answer), flags=re.I)
    match = pattern.search(sentence)
    if not match:
        return shortened_context(sentence)
    if match.start() <= 3:
        remainder = sentence[match.end() :].lstrip(" ,;:-")
        if remainder:
            return shortened_context(f"It {remainder[0].lower()}{remainder[1:]}")
        return "It is the key item in this passage."
    redacted = pattern.sub("this option", sentence, count=1)
    return shortened_context(redacted)


def ordered_choices(answer: str, pool: list[str]) -> list[str]:
    choices = [answer]
    answer_key = answer.casefold()
    for option in pool:
        option_key = option.casefold()
        if option_key == answer_key:
            continue
        if answer_key in option_key or option_key in answer_key:
            continue
        choices.append(option)
        if len(choices) == 4:
            break
    if len(choices) < 4:
        return []
    offset = sum(ord(char) for char in answer) % 4
    return choices[offset:] + choices[:offset]


def multiple_choice_question(sentence: str, answer: str) -> str:
    return f"Which option best matches this point from the essay? {redacted_point(sentence, answer)}"


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
    lowered = sentence.lower()
    matches = sorted((term for term in KEY_TERMS if term in lowered), key=lambda term: (-len(term), term))
    if matches:
        labels = [TOPIC_LABEL_OVERRIDES.get(term, term.replace("dna", "DNA")) for term in matches[:2]]
        return " and ".join(labels)
    return topic_from_sentence(sentence, heading)


def statement_question(sentence: str, heading: str) -> str:
    return f"Which statement best matches the essay's point about {topic_label(sentence, heading)}?"


def sentence_pool(candidates: list[Candidate]) -> list[str]:
    sentences: list[str] = []
    seen: set[str] = set()
    for candidate in candidates:
        sentence = shortened_context(candidate.sentence, max_length=210)
        key = sentence.casefold()
        if key in seen:
            continue
        seen.add(key)
        sentences.append(sentence)
    return sentences


def ordered_sentence_choices(answer: str, pool: list[str]) -> list[str]:
    choices = [answer]
    answer_key = answer.casefold()
    for option in pool:
        if option.casefold() == answer_key:
            continue
        choices.append(option)
        if len(choices) == 4:
            break
    if len(choices) < 4:
        return []
    offset = sum(ord(char) for char in answer) % 4
    return choices[offset:] + choices[:offset]


def cards_from_body(body_html: str) -> list[dict[str, Any]]:
    cards: list[dict[str, Any]] = []
    used_sentences: set[str] = set()
    candidates = candidate_sentences(body_blocks(body_html))
    statements = sentence_pool(candidates)
    for candidate in candidates:
        if len(cards) >= TARGET_CARD_COUNT:
            break
        sentence_key = candidate.sentence.casefold()
        if sentence_key in used_sentences:
            continue
        answer = shortened_context(candidate.sentence, max_length=210)
        choices = ordered_sentence_choices(answer, statements)
        if len(choices) < 4:
            continue
        used_sentences.add(sentence_key)
        cards.append(
            {
                "question": statement_question(candidate.sentence, candidate.heading),
                "choices": choices,
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
