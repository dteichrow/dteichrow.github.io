from __future__ import annotations

from scripts import generate_substack_flashcards as flashcards


def test_cards_from_body_generates_mixed_study_cards() -> None:
    sentences = [
        "Ancient DNA can identify pathogens directly in burial samples, which changes how epidemiologists read old skeletal evidence.",
        "Cemetery evidence is biased toward the people who were buried and preserved, so it cannot act like a clean life table.",
        "Early-life mortality was severe in preindustrial populations, but that does not mean every adult died in early middle age.",
        "Periapical disease around tooth roots appears often in the sampled burials and gives one concrete trace of chronic infection.",
        "Smallpox-related variola virus strains in Viking Age samples show how pathogens can leave genomic evidence after bones look quiet.",
        "Attack rate and case fatality rate remain unknown for the ancient outbreak, which limits how much certainty the essay can claim.",
        "Diarrheal disease, pneumonia, sepsis, and wound infection could kill people without leaving obvious marks on the skeleton.",
        "Burial samples overrepresent particular places and social groups, which makes population-wide mortality estimates fragile.",
        "The essay separates Viking raiders from the wider Viking Age Norse population because cemetery evidence mostly describes the latter.",
        "A life table style analysis would be attractive, but the available graves are too biased for a clean actuarial reconstruction.",
        "Disease ecology matters because pathogen evidence depends on bodies, environments, preservation, and the questions researchers ask.",
        "Historical epidemiology often has to work from partial traces rather than the full denominator that modern surveillance expects.",
    ]
    body_html = "".join(f"<p>{sentence}</p>" for sentence in sentences)

    cards = flashcards.cards_from_body(body_html)

    assert len(cards) == 10
    choice_cards = [card for card in cards if "choices" in card]
    fill_cards = [card for card in cards if card["question"].startswith("Fill in the blank:")]
    short_cards = [card for card in cards if card.get("cue") == "Short answer"]
    assert len(choice_cards) == 6
    assert len(fill_cards) == 2
    assert len(short_cards) == 2
    assert all(len(card["choices"]) == 4 for card in choice_cards)
    assert all(card["answer"] in card["choices"] for card in choice_cards)
    assert all(len(option) <= 90 for card in choice_cards for option in card["choices"])
    assert all("choices" not in card for card in fill_cards + short_cards)
    assert all(card["answer"] for card in cards)
    assert any(card["answer"] == "Ancient DNA" for card in fill_cards + choice_cards)
    assert any(card["answer"] == "Periapical disease" for card in choice_cards)
    question_text = " ".join(card["question"] for card in cards)
    assert "cloze" not in question_text.lower()
    assert "this option" not in question_text.lower()
    assert "Which statement best matches" not in question_text
    assert "Which option best matches" not in question_text
