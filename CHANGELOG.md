# Changelog

All notable changes to this repository will be documented in this file.

## 2025-08-31

### Added

- Initialized CHANGELOG.md and TODO.md for modernization tracking.
- Added local dev server via http-server with npm scripts; documented usage in README.
- Added Prettier configuration and EditorConfig for consistent formatting across projects.
- Root homepage at `index.html` with gradient design, headshot, resume link, and project cards.
- Notes viewer at `notes/` that renders each project's README via Marked + DOMPurify from CDN.

### Changed

- Sortable Tables: fixed duplicate script type in `index.html`; ensured only `type="module"` is used.
- Sortable Tables: replaced non-standard global `event` in `drop(ev)` with `ev.currentTarget` in `main.js`.
- Sortable Tables: removed jQuery/Popper/Bootstrap JS; added vanilla active-state handler for sort selector in `main.js`.
- Rebound Game: modernized input handling (e.key, pointer events), prevented duplicate listeners on resize, guarded audio play promises, and replaced `innerHTML` text writes with `textContent`.
- Rebound Game: debounced window resize to avoid excessive layout recalculations; constrain paddle within new bounds (`rebound-game/main.js`).
- Flashcards: replaced `innerHTML` with `textContent` for card content; migrated to `addEventListener`; added basic ARIA to droppable areas; added keyboard support (Enter/Space) to move focused card to discard pile.

### Notes

- Projects remain static/vanilla with no build step. Use `npm run serve` for local development.
- Added per-project Local Development sections in `flashcards/README.md`, `sortable-tables/README.md`, and `rebound-game/README.md` with root server instructions and URLs.
