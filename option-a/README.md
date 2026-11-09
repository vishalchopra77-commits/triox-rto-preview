# TRIOX clickable prototype v3.0
Open `index.html`, the start page. It holds the sign-in, organisation-picker and workspace entry buttons, plus a directory of all 71 screens. For a single file, open `triox-phone-standalone-v3.html`; it contains all 72 routes with hash routing (`#/dashboard` …).

Static design concept: fictional data, no backend, no network, CSP `default-src 'none'`.

- **Shells:** entry; tenant workspace (blue); platform admin (violet); learner, trainer/assessor, supervisor and applicant portals.
- **Representative details:** detail pages marked "Representative" in the directory are one sample record reused by every row of that list.
- **Rebuild:** `cd work && python3 build.py && python3 standalone.py`.
- **QA:** `python3 linkcheck.py`, `python3 render_qa.py`, `python3 standalone_qa.py`, `python3 drawer_qa.py`. Reports are in `qa/`.
- **Fonts:** Poppins, DM Sans and Fira Code subsets under SIL OFL 1.1 (`fonts/`).
- **Archive:** the previous v2.1 is archived at `../archive/designs-v2.1-20261109-201433/`.
