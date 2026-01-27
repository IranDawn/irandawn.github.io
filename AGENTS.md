# AGENTS.md (irandawn.github.io)

This repository is a static client for the IranDawn database. It renders the
public data directly from GitHub and has no backend services. The app includes
offline support, version management, and step-by-step loading progress.

## Data dependencies
- Read `database/INDEX.json` as the source of truth.
- Use index outputs declared in `INDEX.json` (by-type, by-status, logs).
- Resolve records by ID length and schema to `data/<len>/.../<id>.json`.
- Do not reference deprecated repositories.

## Core files
- `index.html` - Minimal shell with placeholders for navigation, main content,
  loading progress, offline banner, and version management UI.
- `irandawn.js` - Client SDK for database access.
- `script.js` - Builds all sections at runtime, handles initialization, routing,
  and version management.
- `style.css` - Responsive layout with breakpoints at 839px and 479px, and
  natural scaling via `width: 90%; max-width: 1000px`.
- `sw.js` - Service worker for offline support, caching strategies, and version
  checking.
- `version.json` - Current app version, build date, and name.

## UI architecture
Sections are enabled or disabled based on what `INDEX.json` declares. Avoid
hardcoding types or paths.

The Settings section includes:
- Language selector (persisted in localStorage)
- Version display and update controls

## Service Worker and Offline
- `sw.js` implements cache-first strategy for static assets and network-first for
  API requests.
- Version checking bypasses cache with the `?check` query parameter.
- Cache clearing is triggered by `clearCache` message sent from `script.js`.
- Offline detection via `navigator.onLine` and `online`/`offline` events.
- Offline banner displays when content is served from cache.

## Version Management
- `version.json` stores `version`, `build`, and `name` fields.
- `checkForUpdates()` fetches latest version from network only when online.
- `compareVersions()` uses semantic versioning (major.minor.patch).
- `applyUpdate()` clears all caches and reloads the page to fetch fresh files.
- Updates are protected - version checks fail when offline to prevent data corruption.

To deploy a new version:
1. Increment the version in `version.json`.
2. Update `CACHE_NAME` in `sw.js` to a new value (e.g., `v1` → `v2`).
3. Ensure all translation strings for version UI exist in `LOCALES`.

## Loading Progress and Error Handling
- `initApp()` displays step-by-step progress: SDK → settings → index → layout.
- Each step updates a loading indicator with status (active, done, or error).
- Errors display with translated message and retry button.
- Loading UI is replaced once layout building completes.

All loading messages must have keys in `LOCALES`:
- `loading.title`, `loading.step.sdk`, `loading.step.settings`, etc.
- `loading.error.title`, `loading.error.retry`, etc.

## Responsive Design
- Breakpoints: 839px (mobile menu fixes to bottom), 479px (icons-only nav).
- Container scaling: `width: 90%; max-width: 1000px;` provides natural responsive
  sizing without media queries.
- Navigation items container uses flexbox with gap, wrapping as needed.
- Use `data-nav` attributes on nav links, not class selectors.

## Localization
- All visible text uses `data-i18n` attributes.
- `LOCALES` in `script.js` contains translations with `label`, `dir`, and `strings`.
- `setLanguage()` applies `lang` and `dir` on the root HTML element.
- Any new UI text must have keys in every locale, including:
  - Navigation, section titles, descriptions
  - Loading steps and error messages
  - Offline banner and version management UI

## Settings
- Persist UI settings in localStorage under `irandawn.settings`.
- Current keys: `lang` (language preference).
- Extend settings via `updateSettings()` to keep compatibility.

## Constraints
- No external dependencies or build steps.
- Use `raw.githubusercontent.com` for fetches.
- Keep the UI responsive and accessible (focus states, reduced motion support).
- Keep HTML structure minimal; add new structure in `script.js` only.
- All async build functions in `SECTION_DEFS` must be awaited in `buildLayout()`.
- Navigation links require `data-nav` attribute for routing to work.
