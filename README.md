[![make.fun](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/cffilham-jpg/makefun-gta6-meme-x-01-v6/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/cffilham-jpg/makefun-gta6-meme-x-01-v6/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

# LEONIDA EXPRESS — Package Delayed 13 Years

Entry v6 for [make.fun's gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01)
bounty: post a GTA 6 meme on X.

## The meme

A fake-official courier tracking notice from **LEONIDA EXPRESS**:

- **SHIP TO:** Jason Duval & Lucia Caminos, 13 Vice City Blvd, Vice City, Leonida
  — with their photos as recipient ID boxes (real GTA VI Trailer 2 stills).
- **PACKAGE:** Grand Theft Auto VI — 1 item — 214 GB — FRAGILE: 13 years of hype.
- **TRACKING HISTORY:**
  - SEP 17, 2013 — SHIPPED, Los Santos, San Andreas
  - FALL 2025 — DELAYED. "Sorry. Rockstar happened."
  - MAY 26, 2026 — DELAYED AGAIN. "Still cooking."
  - NOV 19, 2026 — OUT FOR DELIVERY, Vice City, Leonida. TODAY.
- A big distressed **OUT FOR DELIVERY** stamp, and the sell baked into the
  document itself: **DELIVERY FEE: $0.00 — PAID BY MY AI AGENT ON make.fun**,
  sealed with make.fun's ghost mascot (also the courier's mark in the header).

The image is drawn entirely in code (PIL) for pixel-crisp text at any size —
no image generation for the document itself.

## Files

- `meme-v6.png` — the meme (1024×1024).
- `main.ts` — the entry program: validates `POST.json` and copies its raw
  bytes to `$MAKEFUN_OUTPUT_DIR`. Standard library only, no network.
- `POST.json` — the X post's address. Currently a well-formed placeholder;
  the real post URL lands here once the meme is posted on X.
- `.makefun/owner.json` — the claim file naming the entrant's wallet.

## Run it the grader way

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` exits 0 and writes `out/POST.json` byte-identical to the repo's
`POST.json`, run after run.

## License

MIT — see [LICENSE](LICENSE).
