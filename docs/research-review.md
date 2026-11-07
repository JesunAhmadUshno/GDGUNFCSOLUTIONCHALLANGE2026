# Research and engineering review

Reviewed 2026-11-07 on branch `site/live-dashboard`. This repo is a product (a static Next.js resource directory and journey page for the 2026 GDG on Campus North America Solution Challenge), not a study, so it is graded on an engineering rubric. The research-rubric rows are kept and answered for what they mean here: is each claim the site makes traceable to a source, and can a reader check it?

Every number below comes from `node scripts/check-data.mjs`, `site/src/audit.check.mjs` or `src/data/link-status.json`.

## Overall grade

| | Before this branch | After this branch |
|---|---|---|
| Overall | C+ | B |

It shipped and worked. It had no tests, unpinned dependencies, one broken link and content that was never checked against the two PDFs it bundles. The cheap fixes are done; the remaining gaps need either official confirmation or manual review (listed at the end).

## Rubric

| Criterion | Grade | Evidence | Status |
|---|---|---|---|
| Question / purpose | B | Clear purpose: one place for challenge resources, timeline, prizes and rules. | Unchanged |
| Claims (the site's "hypotheses") | C → B | Timeline, prizes and criteria were hardcoded in `src/app/journey/page.tsx` with no source. They now live in `src/data/journey.json`; every official date has a PDF and section, and every prize records whether the Official Rules support it. | Fixed |
| Method: content verified against sources | D → B | Site dates vs Official Rules: launch +15 days, Round 1 deadline +21, judging start +21, finalist deadline +21. Site launch and judging start match the guidelines PDF (0 days). Regional Demo Day (Jul 10) appears in neither PDF. 3 of 12 listed prizes are not in the rules (badge, $5 voucher, Winning 3 certificate); "ARV >$100" vs rules "ARV: $100". Criteria: 4 × 5 = 20 points, matching Section 6; two names swap word order and Communication & Presentation lists 3 of the rules' 4 questions (it omits "structured approach to problem solving"). | Fixed (both date sets shown with citations; nothing silently picked) |
| Baselines | n/a | A directory has no baseline to beat. The comparable reference is the official PDF set, used above. | n/a, justified |
| Statistics / uncertainty | n/a | The site makes no statistical claim. The one time-sensitive measurement, link health, is labelled a single recorded snapshot with date and method. | n/a, justified |
| Reproducibility | C → A- | `npm ci && npm test && npm run build` reproduces the product; `site/` rebuilds the dashboard and fails if counts drift (32 entries, 6 categories, 14 types, 29 unique URLs, duplicate pairs 3/17, 20/22, 27/29, PaLM ids 14/15/24). Dependencies pinned to the locked versions. README clone path fixed; the removed `next export` script dropped. | Fixed |
| Correctness | C → B+ | The T&C PDF card linked to `/2026terms...pdf` with no basePath; the recorded snapshot shows that URL returned 404 while the basePath URL returned 200. Fixed in `src/app/page.tsx` via `withBase()`. Two milestones shared a copy-pasted, garbled description; fixed. | Fixed, needs a deploy to confirm live |
| Data quality | C → B | 32 entries, 29 unique URLs. PaLM entries (14, 15, 24) redirect to the deprecations page / an archived demos folder; now marked `deprecated` in the data. Duplicates are reported, not deleted, because each entry has a different title and intent. Entries 26 and 32 redirect to a Google sign-in page. | Partly fixed |
| Testing / CI | F → B | No tests existed. Added `scripts/check-data.mjs` (schema, vocabulary, URL and file existence, ISO dates with citations, 20 points) as `npm test`, plus the dashboard's known-answer check. `pages.yml` runs both before deploying; `deploy.yml` became a pull-request check. | Fixed |
| Threats to validity | B | The PDFs are the copies bundled in `public/`; later revisions were not checked. Section 5 of the rules itself conflicts with Section 6 on Round 2 dates. The link snapshot is one run from one location (locale redirects such as `?hl=zh-cn` reflect that). Prize matching was done by reading, not parsing. | Stated on the dashboard |
| Related work | n/a | Not a research contribution. The only related artefacts are the official challenge pages, which the directory links. | n/a, justified |
| Limitations / honesty in docs | D → B | README claimed "AWARD-WINNING", "1000% Stunning", "30+ resources", "30+ icon mappings". Replaced with counts from the data. The challenge concluded (Jul 10, 2026), so the dashboard presents it as a retrospective. | Fixed |
| Accessibility | Not audited | The product uses heavy Framer Motion animation with no `prefers-reduced-motion` handling. The dashboard passes an automated gate (labels, chart names, no overflow at 390/1440 px, light and dark). | Open |
| Security | B | No secrets; static site; dashboard has no external scripts beyond the Google Fonts stylesheet; `npm audit` in `site/` reports 0 vulnerabilities. | OK |

## Remaining gaps and exactly what each needs

1. **Which timeline was actually in force.** Needs the organisers' final announcement or the archived official challenge page (data, not compute). Until then the site shows both date sets.
2. **Regional Demo Day date and the all-contestant prizes** (badge, $5 credit voucher). Need an official source such as the challenge announcement email or event page; otherwise they should be labelled unconfirmed on the product itself.
3. **Live confirmation of the T&C link fix.** Needs one deploy of this branch to `main` (free) and a re-run of `node scripts/check-links.mjs` (about 32 requests, under a minute).
4. **Whether each "Course" entry is a course.** Needs a manual content review of the 32 URLs (about an hour of reading; no compute).
5. **Accessibility audit of the product.** Needs a manual keyboard and screen-reader pass plus `prefers-reduced-motion` support in `src/app` (a few hours of front-end work, no paid tools).
6. **Type checking and lint in CI.** `next build` already type-checks; adding ESLint needs one new dev dependency and a config, deferred to keep this branch's dependency changes to pinning only.
