from __future__ import annotations

import json
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PLAN_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "data" / "maritime_youtube_video_plan.js"
MODULES_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "data" / "maritime_disease_modules.js"
ATLAS_DATA_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "data" / "maritime_disease_atlas_data.js"
HTML_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "index.html"
NOTE_PATH = PROJECT_ROOT / "notes" / "maritime-disease-atlas-youtube-guided-tour.md"
TRIAGE_PATH = PROJECT_ROOT / "notes" / "maritime-disease-atlas-source-triage.md"
RECORDING_PACKET_DIR = PROJECT_ROOT / "notes" / "maritime-disease-atlas-youtube-recording-packet"
SOURCE_REGISTRY_PATH = PROJECT_ROOT / "data" / "sources" / "sources.json"


def load_assignment(path: Path, name: str):
    text = path.read_text()
    if name == "MARITIME_DISEASE_ATLAS_GEOJSON":
        marker = "window.MARITIME_DISEASE_ATLAS_GEOJSON = "
        next_marker = "\n\nwindow.MARITIME_DISEASE_SCENARIOS = "
        start = text.index(marker) + len(marker)
        end = text.index(next_marker, start)
        return json.loads(text[start:end].rstrip().removesuffix(";"))
    if name == "MARITIME_DISEASE_SCENARIOS":
        marker = "window.MARITIME_DISEASE_SCENARIOS = "
        start = text.index(marker) + len(marker)
        return json.loads(text[start:].strip().removesuffix(";"))
    marker = f"window.{name} = "
    start = text.index(marker) + len(marker)
    return json.loads(text[start:].strip().removesuffix(";"))


def test_maritime_youtube_plan_is_capture_ready_and_source_backed() -> None:
    plan = load_assignment(PLAN_PATH, "MARITIME_YOUTUBE_VIDEO_PLAN")
    modules = load_assignment(MODULES_PATH, "MARITIME_DISEASE_MODULES")["modules"]
    scenarios = load_assignment(ATLAS_DATA_PATH, "MARITIME_DISEASE_SCENARIOS")
    registry = json.loads(SOURCE_REGISTRY_PATH.read_text())

    registry_ids = {source["source_id"] for source in registry["sources"]}
    scenario_ids = set(scenarios)
    module_ids = {module["id"] for module in modules}

    assert plan["schema_version"] == "1.0.0"
    assert 540 <= plan["runtime_target_seconds"] <= 660
    assert "youtube=1" in plan["capture_entrypoint"]
    assert plan["voice_plan"]["final_voice"] == "Devin"
    assert "scratch timing" in plan["voice_plan"]["scratch_voice"]
    assert "No pitched tones" in plan["voice_plan"]["sound"]

    chapter_ids = {chapter["id"] for chapter in plan["chapters"]}
    assert [
        "cold_open",
        "pirate_infrastructure",
        "vector_ecology",
        "provisions_ecology",
        "crowding_contact",
        "violence_coercion",
        "close",
    ] == [chapter["id"] for chapter in plan["chapters"]]

    assert set(plan["playback"]["scenario_order"]) <= scenario_ids
    assert plan["playback"]["scenario_order"][0] == "pirate_network"
    assert plan["playback"]["scenario_order"][-1] == "middle_passage"
    assert "algiers_plague_sanitary_ban_1818" in plan["chapters"][1]["module_ids"]

    total_shot_seconds = sum(shot["duration_seconds"] for shot in plan["shots"])
    assert abs(total_shot_seconds - plan["runtime_target_seconds"]) <= 5

    for chapter in plan["chapters"]:
        assert chapter["source_ids"]
        assert set(chapter["source_ids"]) <= registry_ids
        assert set(chapter["scenarios"]) <= scenario_ids
        assert set(chapter.get("module_ids", [])) <= module_ids
        assert chapter["uncertainty_note"]

    for shot in plan["shots"]:
        assert shot["chapter_id"] in chapter_ids
        assert "youtube=1" in shot["capture_url"]
        assert "sound=1" not in shot["capture_url"]
        assert "audio=1" not in shot["capture_url"]
        assert shot["source_ids"]
        assert set(shot["source_ids"]) <= registry_ids
        assert set(shot.get("module_ids", [])) <= module_ids
        assert shot["scenario_id"] is None or shot["scenario_id"] in scenario_ids

    for section in plan["narration_script"]:
        assert section["chapter_id"] in chapter_ids
        assert section["source_ids"]
        assert set(section["source_ids"]) <= registry_ids
        assert section["review_note"]


def test_maritime_youtube_mode_is_wired_into_atlas_ui() -> None:
    html = HTML_PATH.read_text()
    note = NOTE_PATH.read_text()
    triage = TRIAGE_PATH.read_text()

    assert "data/maritime_youtube_video_plan.js" in html
    assert "queryFlag(\"youtube\", \"yt\")" in html
    assert "playYouTubeTour" in html
    assert "youtubeTourOrder" in html
    assert "YouTube guided tour | The Edge of Epidemiology" in html
    assert ".youtube-mode #chrome" in html
    assert ".youtube-mode #video-pause-btn" in html
    assert ".youtube-mode #video-sound-btn" in html
    assert ".recording-mode .mechanism-first" in html
    assert ".recording-mode #module-browser" in html

    assert "?youtube=1&tour=1&pace=2.05" in note
    assert "Final narration: Devin" in note
    assert "Do not collapse Middle Passage mortality" in note
    assert "Do not turn pirate ports into disease-origin claims" in note
    assert "Do not render or publish a public-final MP4" in note
    assert "Algiers 1817-1818 plague" in triage
    assert "single-ship yellow fever" in triage.lower()


def test_maritime_recording_packet_is_ready_for_devin_voice() -> None:
    required_files = {
        "README.md",
        "narration-recording-script.md",
        "caption-draft.srt",
        "chapter-markers.txt",
        "capture-checklist.md",
        "shot-replacement-guide.md",
    }
    assert required_files <= {path.name for path in RECORDING_PACKET_DIR.iterdir()}

    script = (RECORDING_PACKET_DIR / "narration-recording-script.md").read_text()
    captions = (RECORDING_PACKET_DIR / "caption-draft.srt").read_text()
    chapters = (RECORDING_PACKET_DIR / "chapter-markers.txt").read_text()
    checklist = (RECORDING_PACKET_DIR / "capture-checklist.md").read_text()

    assert "Final voice: Devin" in script
    assert "Do not say plague decided the Barbary Wars" in script
    assert "00:10:00,000" in captions
    assert "1:00 Pirate ports as infrastructure" in chapters
    assert "Do not render or publish" not in checklist
    assert "Export the final MP4 only after narration" in checklist
