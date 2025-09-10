# Project TODO

This repository contains three vanilla JavaScript projects. This TODO tracks modernization and maintenance tasks, ordered for efficient delivery.

## Global

- [x] Add a lightweight dev server at repo root (package.json with `serve` or `http-server`) and README run instructions.
- [x] Standardize formatting (Prettier) and add an EditorConfig.
- [x] Add basic GitHub Pages or local serve guidance for each project.

## 1) Sortable Tables (`sortable-tables/`) — quick wins

- [x] Fix script tag duplication in `sortable-tables/index.html` (use only `type="module"`).
- [x] Fix non‑standard reliance on global `event` in `drop(ev)` in `sortable-tables/main.js` (use `ev.currentTarget`).
- [x] Optional: Remove jQuery/Bootstrap JS; keep Bootstrap CSS only. Implement active button toggle via vanilla JS.
- [ ] Verify ES module import works under a static server; ensure `fetch('./factbook.json')` resolves correctly.

## 2) Rebound Game (`rebound-game/`)

- [x] Replace deprecated `e.keyCode` usage in `keyListener()` with `e.key` or `e.code`.
- [x] Prevent duplicate event listeners on window resize: split `init()` into one-time bindings and layout updates, or guard listener attachment.
- [x] Consolidate input handling to Pointer Events (`pointerdown`/`pointermove`/`pointerup`), set `{ passive: true }` where applicable.
- [x] Audio policy: initialize audio on first user gesture and `try/catch` `play()` promises. Consider lazy-loading.
- [x] Replace `innerHTML` writes for score/game over text with `textContent` and style toggles.
- [x] Minor: debounce resize layout if needed for perf.

## 3) Flashcards (`flashcards/`)

- [x] Replace `innerHTML` with `textContent` for card question/answer/category values sourced from `flashcard_QA.json`.
- [x] Replace `.onclick`/`.ondrag*` properties with `addEventListener` for flexibility and consistency.
- [x] Add basic roles/ARIA to droppable areas (e.g., `role="list"`, labels).
- [x] Add keyboard support for moving cards between piles.
- [ ] Minor: prefer `const`/`let`, ensure no implicit globals.

## Nice-to-haves

- [ ] Migrate Bootstrap 4 to Bootstrap 5 (removes jQuery dependency) or remove Bootstrap JS entirely where not used.
- [ ] Add basic unit tests for sorting functions and collision logic (optional).
- [ ] Add Lighthouse pass for basic a11y and performance checks.
