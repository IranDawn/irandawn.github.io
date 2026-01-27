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

## Core files and their roles
- **index.html** - Minimal shell with navigation, main content placeholder,
  offline banner, and service worker registration.
- **irandawn.js** - Client SDK for database access. Source of truth lives in
  `irandawn/lib` and is mirrored here for deployment.
- **script.js** - Builds all sections at runtime based on `INDEX.json`, handles
  initialization, routing, localization, version management, and offline logic.
- **style.css** - Responsive layout with breakpoints at 839px and 479px, and
  natural scaling via `width: 90%; max-width: 1000px`.
- **sw.js** - Service worker for offline support, caching strategies, and version
  checking.
- **version.json** - Current app version, build date, and app name.

## SDK usage
`irandawn.js` exposes window.IranDawn with methods for loading the database
index and resolving record paths. `script.js` uses this API instead of
hard-coding URLs or index assumptions.

## Data dependencies
- `database/INDEX.json` is the source of truth for database structure.
- Use index outputs declared in `INDEX.json`: `by-type`, `by-status`, `logs`.
- Resolve records by ID length and schema to `data/<len>/.../<id>.json`.
- `index/by-type.json` and `index/by-status.json` drive lists and filters.
- `logs-latest-100.json` and `logs-latest-1000.json` power activity feeds.
- Do not hardcode paths; always read from `INDEX.json`.

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
- **version.json** stores `version`, `build` (ISO date), and `name` fields.
- Users can check for updates (requires online connectivity).
- `checkForUpdates()` fetches the latest version from the network only when online.
- If a newer version exists, users can apply the update which clears all caches and
  reloads the app to fetch fresh files.
- Updates are safely protected - version checks fail when offline, preventing
  corrupted cached data.
- The service worker uses the version from `version.json` to create dynamic cache names.

To deploy a new version:
1. Increment the version in `version.json` (semantic versioning: major.minor.patch).
2. The `sw.js` automatically reads the new version and creates a new cache name
   (`irandawn-v<version>`), invalidating old caches without manual edits.
3. Ensure all translation strings for the version UI exist in `LOCALES`.
4. Deploy the changes to GitHub Pages.
5. Users will see an "Update available" message in Settings when online.

## Loading Progress and Error Handling
The app displays step-by-step loading progress only when the cached index is stale
(older than 60 seconds):
1. Initializing SDK
2. Loading settings
3. Fetching database index

If any step fails, an error message displays with a retry button. When the cache is
fresh, the loading UI is skipped entirely for a faster experience.

All loading and error messages are translated in the `LOCALES` object:
- `loading.title`, `loading.step.sdk`, `loading.step.settings`, `loading.step.index`
- `loading.error.title`, `loading.error.retry`, `loading.error.sdk`, `loading.error.index`

## UI Architecture
Sections are dynamically enabled or disabled based on what `INDEX.json` declares.
Avoid hardcoding section names, types, or paths.

The Settings section includes:
- Language selector (persisted in `irandawn.settings` localStorage key)
- Version display and update controls
- Any additional settings extensions

## Settings and Persistence
UI settings are persisted in localStorage under `irandawn.settings`:
- **lang** - User's language preference
- New settings can be added via `updateSettings()` to maintain compatibility
- Settings are loaded on app initialization and applied before building the UI

## Localization
All visible text uses `data-i18n` attributes and is populated from the `LOCALES`
object in `script.js`. The `LOCALES` structure:
- **label** - Display name of the language in the selector
- **dir** - Text direction (`ltr` for LTR languages, `rtl` for RTL)
- **strings** - Key-value pairs for all UI text

When a language is selected, `setLanguage()` applies the `lang` and `dir` attributes
to the root HTML element for proper RTL handling.

Translation keys must cover:
- Navigation labels and tooltips
- Section headings and descriptions
- Loading progress steps and error messages
- Offline banner and version management UI
- Buttons, placeholders, and all user-facing text

To add or update a language:
1. Add a locale entry in `LOCALES` with `label`, `dir`, and `strings`.
2. Ensure keys exist for all UI text (check existing locales for completeness).
3. Test RTL rendering for right-to-left languages.
4. Update the default language if needed.

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

## Development Constraints
The project maintains these constraints for simplicity and auditability:
- **No external dependencies** - Uses only browser APIs and platform features.
- **No build steps** - Everything is vanilla JavaScript; the site runs directly in
  the browser.
- **GitHub-native** - All data fetches use `raw.githubusercontent.com`; no backend
  API server.
- **Responsive and accessible** - Supports reduced motion preference, focus states,
  and keyboard navigation.
- **Minimal HTML structure** - The `index.html` is a skeleton; all UI generation
  happens in `script.js`.
- **Data-driven sections** - All async build functions in `SECTION_DEFS` must be
  awaited in `buildLayout()`.
- **Semantic HTML** - Navigation links require `data-nav` attributes for routing
  to work; avoid using class selectors for navigation.

## Project intent
The site is a reference client for a GitHub-native, public data system. It is
designed for transparency and reproducibility, not for hosting the data itself.
