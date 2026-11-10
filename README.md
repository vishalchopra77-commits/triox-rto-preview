# TRIOX design options v1.4
Open `index.html`. It compares Option A (v3.0, blue) and Option B (Flip7-derived teal/gold) side by side, with links into each clickable prototype.

- **Structure:** `option-a/` and `option-b/` each hold the 72 pages (71 screens + index) and a single-file standalone. `shots/` holds the comparison screenshots.
- **Paths:** all relative, with no network calls. It works from `file://` or from any GitHub Pages root or subpath (`.nojekyll` included).
- Static concepts with fictional data only.

- **v1.2 (10 Nov 2026):** dark left sidebar on every page kind in both options (CSS only: appended blocks in `option-a/triox-v3.css` and `option-b/triox-option-b.css`, mirrored in both standalone files).
- **v1.4 (10 Nov 2026):** (1) the left sidebar keeps the current page's item in view: on load it scrolls only the sidebar's own scroll area (never the page), instantly, roughly centred, remembers the position per tab, and does the same in the mobile drawer and on standalone route changes (`triox-v3.js` in both options, mirrored inline in both standalones). (2) Option A's selected item is now a white row with navy text, its icon tile and a blue (violet on Platform admin) left bar (`option-a/triox-v3.css` and its standalone). (3) The old wording is gone from every file name, link, route and label: `platform-rtos.html`, `platform-rto-detail.html` and `rto-picker.html` replace the old pages; the old page addresses remain only as small "Redirecting…" pages so links that were already shared still work.
