window.REVOLUTIONARY_WAR_YOUTUBE_VIDEO_PLAN = {
  "schema_version": "1.0.0",
  "generated_at": "2026-05-19",
  "title": "The Revolution Had a Disease Front",
  "subtitle": "A YouTube guided tour of the Revolutionary War Disease Atlas",
  "canonical_exhibit_path": "/atlases/revolutionary-war/",
  "runtime_target_seconds": 600,
  "capture_entrypoint": "index.html?youtube=1&tour=1&pace=2.1",
  "voice_plan": {
    "final_voice": "Devin",
    "scratch_voice": "AI voice may be used only for scratch timing and edit rhythm.",
    "delivery": "Plain, hard-edged historical epidemiology: make disease visible without pretending every death has a clean modern diagnosis.",
    "sound": "Quiet bed optional. No musket volleys, fake battlefield drums, or sentimental patriotic music."
  },
  "playback": {
    "default_query": "?youtube=1&tour=1&pace=2.1",
    "event_order": [
      "boston_smallpox",
      "quebec_smallpox",
      "battle_long_island",
      "continental_inoculation",
      "valley_forge",
      "morristown",
      "wallabout_prison_ships",
      "siege_yorktown"
    ],
    "default_pace": 2.1,
    "target_runtime_seconds": 600,
    "capture_notes": [
      "Use the full-tour URL for one continuous scratch capture.",
      "Use shot-level URLs such as index.html?youtube=1&event=valley_forge&pace=2.1 for replacement takes.",
      "Keep the right-side card visible in YouTube mode; it carries the narration beat and caveat.",
      "Link the final YouTube description back to the public atlas and both Revolutionary War disease essays."
    ]
  },
  "chapters": [
    {
      "id": "intro",
      "title": "The war had a second front",
      "start_time": "0:00",
      "duration_seconds": 45,
      "focus_event_id": "valley_forge",
      "event_ids": ["valley_forge", "boston_smallpox", "quebec_smallpox"],
      "source_ids": ["edge-revolutionary-war-disease-essay", "revolution-valley-forge-nps"],
      "narration_job": "Open by rejecting the battlefield-only version of the Revolution. Establish disease as a military constraint, a recruitment problem, a camp ecology, and a public-health problem.",
      "uncertainty_note": "This is a framing chapter; do not imply that disease alone caused victory or defeat.",
      "script": "The American Revolution is usually filmed as marches, muskets, mud, and speeches. That is only half the war. The other front was biological. Smallpox, camp disease, prison ships, bad sanitation, crowding, cold, hunger, and medical improvisation changed what armies could do. The map is not here to say disease replaced politics or battle. It is here to show the machinery under the famous story: susceptible bodies moving through camps, towns, hospitals, ships, and winter quarters."
    },
    {
      "id": "boston",
      "title": "Boston made susceptibility visible",
      "start_time": "0:45",
      "duration_seconds": 65,
      "focus_event_id": "boston_smallpox",
      "event_ids": ["boston_smallpox", "battle_bunker_hill"],
      "source_ids": ["revolution-smallpox-nps", "revolution-mount-vernon-smallpox"],
      "narration_job": "Use the Siege of Boston to explain why a largely rural Continental Army was vulnerable to a city disease ecology.",
      "uncertainty_note": "The point is susceptibility and military caution, not a precise Boston death toll.",
      "script": "Boston was the warning. By 1775, the city had smallpox experience that many rural soldiers did not. Washington knew that an outbreak in the Continental lines could damage the army before the British had to. The important visual is not one sickbed; it is a ring of susceptible men around an infected city. Washington's caution after the British evacuation makes the point. He did not simply rush everyone into Boston. Disease could turn a victory into a liability."
    },
    {
      "id": "canada",
      "title": "Smallpox broke the Canada campaign",
      "start_time": "1:50",
      "duration_seconds": 80,
      "focus_event_id": "quebec_smallpox",
      "event_ids": ["quebec_smallpox"],
      "source_ids": ["revolution-smallpox-nps", "edge-american-revolution-smallpox-essay"],
      "narration_job": "Make Quebec the clearest campaign-scale example: disease, enlistment deadlines, fear, quarantine failure, and command collapse.",
      "uncertainty_note": "Do not turn smallpox into the only cause of the failed Quebec campaign; keep it as a major operational constraint.",
      "script": "Quebec is where smallpox becomes campaign history. The northern army was not just cold and far from supply. It was infected, frightened, and running out of enlistments. NPS summarizes the problem bluntly: smallpox crippled the forces in Canada and helped prevent a serious attack on Quebec. Soldiers feared the disease enough to avoid reenlistment or inoculate themselves without quarantine. That made a bad military situation worse. The lesson is severe but narrow: disease did not replace strategy. It destroyed the usable army inside the strategy."
    },
    {
      "id": "battlefield_denominator",
      "title": "Battle deaths are the wrong denominator",
      "start_time": "3:10",
      "duration_seconds": 55,
      "focus_event_id": "battle_long_island",
      "event_ids": ["battle_long_island", "battle_bunker_hill", "battle_camden", "siege_yorktown"],
      "source_ids": ["edge-revolutionary-war-disease-essay", "revolution-prison-ships-usni-1935"],
      "narration_job": "Briefly use battle markers as contrast: the famous combat map is not the mortality map.",
      "uncertainty_note": "Avoid presenting one definitive all-war disease-versus-battle table unless the source base is reopened.",
      "script": "The battle markers are still here because they are the mental map most people bring to the Revolution. Long Island, Bunker Hill, Camden, Yorktown: these are the names that survive. But a war's famous places are not always its deadliest environments. Battles are sharp. Disease is cumulative. A camp can kill quietly for months. A prison ship can become a hold full of fever. The video has to keep that contrast visible: combat mattered, but the mortality ecology was larger than combat."
    },
    {
      "id": "inoculation",
      "title": "Washington turns disease control into strategy",
      "start_time": "4:05",
      "duration_seconds": 85,
      "focus_event_id": "continental_inoculation",
      "event_ids": ["continental_inoculation", "boston_smallpox", "morristown"],
      "source_ids": ["revolution-smallpox-nps", "revolution-mount-vernon-smallpox", "revolution-washington-shippen-founders"],
      "narration_job": "Explain inoculation as a risky logistical intervention, not a modern vaccination story.",
      "uncertainty_note": "Use inoculation/variolation language carefully; Jennerian vaccination came later.",
      "script": "Washington's inoculation decision is the hinge. This was not modern vaccination. It was variolation: deliberately giving someone smallpox material in a controlled way, hoping for a milder illness and later immunity. It was dangerous, politically ugly, and militarily inconvenient because soldiers had to be isolated while they recovered. But uncontrolled smallpox was worse. In February 1777, Washington told William Shippen that if smallpox ran naturally through the army, they had more to dread from it than from the enemy's sword. That is public health as military strategy."
    },
    {
      "id": "valley_forge",
      "title": "Valley Forge was a city of exposure",
      "start_time": "5:30",
      "duration_seconds": 80,
      "focus_event_id": "valley_forge",
      "event_ids": ["valley_forge"],
      "source_ids": ["revolution-valley-forge-nps", "edge-revolutionary-war-disease-essay"],
      "narration_job": "Reframe Valley Forge away from simple cold-and-starvation imagery and toward urban camp ecology.",
      "uncertainty_note": "NPS gives nearly 2,000 disease deaths and names common killers; do not overassign individual diagnoses.",
      "script": "Valley Forge is the corrective to the cartoon version of military suffering. The camp was not just ragged men freezing in noble misery. It became, for a time, one of the largest population centers in the colonies. More than twelve thousand soldiers and hundreds of women and children concentrated in huts, roads, trenches, waste pits, hospitals, and supply breakdowns. NPS is explicit: there was no battle at Valley Forge, but disease killed nearly two thousand people. Influenza, typhus, typhoid, and dysentery appear in the park account. The camp was an exposure system."
    },
    {
      "id": "morristown",
      "title": "Morristown shows learning under misery",
      "start_time": "6:50",
      "duration_seconds": 60,
      "focus_event_id": "morristown",
      "event_ids": ["morristown"],
      "source_ids": ["revolution-morristown-nps", "revolution-smallpox-nps"],
      "narration_job": "Use Morristown as the contrast case: worse winter, veteran soldiers, inoculation, camp skill, lower disease catastrophe.",
      "uncertainty_note": "Keep the mortality comparison qualitative unless a dedicated Morristown mortality source is added.",
      "script": "Morristown is not the famous suffering scene, but it may be the better public-health scene. The 1779-1780 winter was brutal. The NPS Morristown FAQ says it was the worst winter of the eighteenth century. Yet by then many soldiers were veterans, they knew how to set up winter camp, and most had been inoculated against smallpox. The map should pause here because the contrast matters. Hard weather did not automatically produce the same mortality. Experience, immunity, discipline, and camp practice changed the odds."
    },
    {
      "id": "prison_ships",
      "title": "Prison ships were captivity as disease ecology",
      "start_time": "7:50",
      "duration_seconds": 80,
      "focus_event_id": "wallabout_prison_ships",
      "event_ids": ["wallabout_prison_ships"],
      "source_ids": ["revolution-fort-greene-nps-prison-ships", "revolution-prison-ships-usni-1935", "edge-revolutionary-war-disease-essay"],
      "narration_job": "Bring in the essay's prison-ship burden without pretending the atlas can diagnose every death.",
      "uncertainty_note": "The 11,500 figure is memorial and historical geography; do not treat it as a clean disease-specific count.",
      "script": "The prison ships are where the video should get cold. Wallabout Bay was not a battlefield, but it became one of the Revolution's major mortality landscapes. The NPS Fort Greene page preserves the memorial geography of 11,500 prison ship martyrs. The medical labels are messier. A 1935 Naval Institute account points to crowded hulks where typhus, smallpox, dysentery, typhoid, respiratory infections, vermin, hunger, and confinement overlapped. The safe claim is already awful: captivity turned ships into disease environments, and the dead were remembered in a number too large to make emotionally tidy."
    },
    {
      "id": "close",
      "title": "Victory still had a body count",
      "start_time": "9:10",
      "duration_seconds": 50,
      "focus_event_id": "siege_yorktown",
      "event_ids": ["siege_yorktown", "valley_forge", "wallabout_prison_ships"],
      "source_ids": ["edge-revolutionary-war-disease-essay", "edge-american-revolution-smallpox-essay"],
      "narration_job": "Close by linking the atlas back to the essays and the central historical-epidemiologic thesis.",
      "uncertainty_note": "Avoid triumphalist closure; the point is that survival was produced by logistics, immunity, discipline, and luck.",
      "script": "Yorktown ends the familiar military story, but it does not erase the biological one. The Revolution was won by politics, alliances, violence, endurance, and timing. It was also survived through disease control, camp learning, inoculation, and the brutal luck of who had immunity and who did not. That is why the atlas is useful for video. It lets the viewer see the war as a map of exposure, not just a map of battles."
    }
  ],
  "youtube_description_draft": "A guided tour of the Revolutionary War Disease Atlas from The Edge of Epidemiology. This video follows smallpox, inoculation, camp disease, Valley Forge, Morristown, and the Wallabout Bay prison ships to show why the American Revolution was not only a battlefield story. Full interactive atlas and source notes: /atlases/revolutionary-war/",
  "title_options": [
    "The American Revolution's Disease Front",
    "Smallpox, Camp Fever, and the War Beneath the Revolution",
    "The American Revolution Was Also an Epidemic Story"
  ],
  "chapter_markers": [
    "0:00 The war had a second front",
    "0:45 Boston made susceptibility visible",
    "1:50 Smallpox broke the Canada campaign",
    "3:10 Battle deaths are the wrong denominator",
    "4:05 Washington turns disease control into strategy",
    "5:30 Valley Forge was a city of exposure",
    "6:50 Morristown shows learning under misery",
    "7:50 Prison ships were captivity as disease ecology",
    "9:10 Victory still had a body count"
  ],
  "red_lines": [
    "Do not say disease alone won or lost the Revolution.",
    "Do not call variolation vaccination without explaining the distinction.",
    "Do not treat the 11,500 prison ship martyrs figure as a clean disease-specific estimate.",
    "Do not assign precise causes to all Valley Forge or prison ship deaths.",
    "Do not imply British biological warfare explains the Revolutionary War smallpox story."
  ]
};
