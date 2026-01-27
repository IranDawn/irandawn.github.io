# irandawn.github.io

Static client for the IranDawn ecosystem. This site is a thin UI layer that
reads the public database directly from GitHub and renders the pages in the
browser. There is no backend service.

## How it works
- `irandawn.github.io/index.html` is a minimal template shell with the primary
  layout, navigation markup, and loading/offline indicators.
- `irandawn.github.io/irandawn.js` is the client SDK used for database access.
  It is authored in `irandawn/lib` and mirrored here so the site can load it
  directly without a build step.
- `irandawn.github.io/script.js` builds all sections at runtime and decides what
  to show based on `database/INDEX.json` through the SDK.
- `irandawn.github.io/style.css` owns the visual system and responsive layout.
- `irandawn.github.io/sw.js` is a service worker that enables offline support,
  caching strategies, and version management.

The client uses `INDEX.json` only as a map of the database: ID schemas,
available types, and index output paths. UI structure, copy, and layout remain
entirely in this repo so third-party apps can render the same data differently.

## Front-end design choices
- Static, no-backend client to keep hosting simple and auditable.
- Service worker for offline support and PWA capabilities.
- Step-by-step loading indicators show initialization progress.
- Offline banner displays when content is served from cache.
- Version management system allows users to check for and apply updates safely.
- Data-driven sections are generated from `INDEX.json` so the UI adapts to new
  types and indexes without redeploying the database.
- Desktop layout centers navigation between the title and the GitHub link.
- Mobile layout uses a persistent bottom menu (fixed at 479px and 839px breakpoints)
  with a dedicated header for the site title.
- Responsive container sizing (90% width with 1000px max-width) scales naturally
  without media queries.
- Visual system uses a warm palette and high-contrast cards for readability.

## SDK usage
`irandawn.js` exposes a small API (window.IranDawn) for loading the database
index and resolving record paths. `script.js` uses this API instead of
hard-coding URLs or index assumptions. The SDK source of truth lives in
`irandawn/lib` and is copied into this repo for deployment.

## Data sources
- `database/INDEX.json` is fetched as the source of truth.
- `index/by-type.json` and `index/by-status.json` drive lists and filters.
- `logs-latest-100.json` and `logs-latest-1000.json` power the activity feeds.
- Individual records are fetched from `data/<len>/.../<id>.json` based on the ID
  schema in `INDEX.json`.

## Service Worker and Offline Support
The service worker (`sw.js`) implements:
- **Cache-first strategy** for static assets (HTML, CSS, JS) - serves cached files
  and updates in background.
- **Network-first strategy** for API requests - attempts network first, falls back
  to cache if offline.
- **Version checking** - the `?check` query parameter bypasses cache to detect
  updates from the server.
- **Cache clearing** - responds to `clearCache` messages to invalidate all caches
  before applying updates.

When offline, an offline banner displays to indicate cached content is being used.
Users can check for updates and safely apply them only when online.

## Version Management
The app includes a version management system in the Settings section:
- **version.json** stores the current deployed version, build date, and app name.
- Users can check for updates (requires online connectivity).
- If a newer version exists, users can apply the update which clears the cache and
  reloads the app to fetch fresh files.
- Updates are safely protected - version checks fail when offline, preventing
  corrupted cached data.

To deploy a new version:
1. Update `version.json` with the new version number.
2. Update `CACHE_NAME` in `sw.js` (e.g., `v1` → `v2`) to invalidate old cache.
3. Deploy the changes to GitHub Pages.
4. Users will see an "Update available" message in Settings.

## Loading Progress and Error Handling
The app displays step-by-step loading progress:
1. Initializing SDK
2. Loading settings
3. Fetching database index
4. Building interface

If any step fails, an error message displays with a retry button. All error and
loading messages are translated in the `LOCALES` object.

## Localization
All visible text is keyed with `data-i18n` attributes and populated in
`irandawn.github.io/script.js` from the `LOCALES` object. The language selector
in the navigation saves its setting in localStorage under
`irandawn.settings`.

Translation keys cover:
- Navigation labels and tooltips
- Section headings and descriptions
- Loading progress steps and error messages
- Offline banner and version management UI

To add or update a language:
1. Add a locale entry in `LOCALES` with `label`, `dir`, and `strings`.
2. Ensure keys cover all UI text including loading, errors, and version UI.
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
