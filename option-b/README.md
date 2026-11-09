# TRIOX clickable prototype v3.0 · Option B (Flip7-derived skin)
Open `index.html`, the start page. `triox-phone-standalone-v3-option-b.html` is the single offline file with all 72 routes.

- **Same pages as v3.0:** the same 72 pages, content, routes and links. Only the stylesheet differs (`triox-option-b.css`): the v3.0 layout layer plus a Flip7-derived theme layer. The mapping and deviations are in `visual-qa.md`.
- **Rebuild:** `cd work && python3 build.py && python3 standalone.py`.
- **QA:** `linkcheck.py`, `render_qa.py`, `standalone_qa.py`, `drawer_qa.py` and `a11y_audit.py`. Reports are in `qa/`.
