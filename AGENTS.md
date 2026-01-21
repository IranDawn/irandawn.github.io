# AGENTS.md (irandawn.github.io)

This repository is a static client for the IranDawn database. It renders the
public data directly from GitHub and has no backend services.

## Data dependencies
- Read `database/INDEX.json` as the source of truth.
- Use index outputs declared in `INDEX.json` (by-type, by-status, logs).
- Resolve records by ID length and schema to `data/<len>/.../<id>.json`.
- Do not reference deprecated repositories.

## UI architecture
- `index.html` is a minimal shell only.
- `irandawn.js` is the client SDK for database access.
- `script.js` builds all sections at runtime and uses the SDK.
- `style.css` owns layout and visual design.

Sections are enabled or disabled based on what `INDEX.json` declares. Avoid
hardcoding types or paths.

## Localization
- All visible text uses `data-i18n` attributes.
- `LOCALES` in `script.js` contains translations and `dir` values.
- `setLanguage()` applies `lang` and `dir` on the root HTML element.
- Any new UI text must have keys in every locale.

## Settings
- Persist UI settings in localStorage under `irandawn.settings`.
- Current keys: `lang`, `theme` (reserved for future themes).
- Extend settings via `updateSettings()` to keep compatibility.

## Constraints
- No external dependencies or build steps.
- Use `raw.githubusercontent.com` for fetches.
- Keep the UI responsive and accessible (focus states, reduced motion support).
- Keep HTML structure minimal; add new structure in `script.js` only.
