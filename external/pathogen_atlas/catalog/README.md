# Pathogen Atlas Catalog

This directory is the review layer for expanding the Pathogen Atlas without
turning Wikipedia into the source of record.

- `candidates.jsonl` contains broad discovered candidates from Wikidata,
  Wikipedia, and local Newsdesk/reference exports.
- `drafts.json` contains reviewable draft shells and, later, source-backed
  entries marked `review_status: reviewed`.
- `rejected.jsonl` records candidates deliberately excluded from the atlas.

Only reviewed entries promoted into `../extra_pathogens.json` are public.
