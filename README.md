# irandawn.github.io

Static client for the IranDawn ecosystem. This site is a thin UI layer that
reads the public database directly from GitHub and renders the pages in the
browser. There is no backend service.

## How it works
- `irandawn.github.io/index.html` is a minimal template shell.
- `irandawn.github.io/script.js` builds all sections at runtime and decides what
  to show based on `database/INDEX.json`.
- `irandawn.github.io/style.css` owns the visual system and layout.

The client uses `INDEX.json` only as a map of the database: ID schemas,
available types, and index output paths. UI structure, copy, and layout remain
entirely in this repo so third-party apps can render the same data differently.

## Data sources
- `database/INDEX.json` is fetched as the source of truth.
- `index/by-type.json` and `index/by-status.json` drive lists and filters.
- `logs-latest-100.json` and `logs-latest-1000.json` power the activity feeds.
- Individual records are fetched from `data/<len>/.../<id>.json` based on the ID
  schema in `INDEX.json`.

## Localization
All visible text is keyed with `data-i18n` attributes and populated in
`irandawn.github.io/script.js` from the `LOCALES` object. The language selector
in the navigation saves its setting in localStorage under
`irandawn.settings`.

To add or update a language:
1. Add a locale entry in `LOCALES` with `label`, `dir`, and `strings`.
2. Ensure keys cover all UI text.
3. Update the default language if needed.

## Local development
This is a static site. You can open `irandawn.github.io/index.html` directly or
run a simple server:

```bash
python3 -m http.server --directory irandawn.github.io 8000
```

Then visit `http://localhost:8000`.

## Configuration
The data endpoints are configured at the top of `irandawn.github.io/script.js`:
`GITHUB_ORG`, `DATABASE_REPO`, and `DEFAULT_BRANCH`.

## Project intent
The site is a reference client for a GitHub-native, public data system. It is
designed for transparency and reproducibility, not for hosting the data itself.
