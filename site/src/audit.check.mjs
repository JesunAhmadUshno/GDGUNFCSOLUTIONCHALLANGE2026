// Known-answer check, run by `npm run build` before vite: node src/audit.check.mjs
// The dashboard computes everything below in the browser with ../../scripts/audit.mjs.
// The expected values were counted independently from src/data/*.json and the two PDFs in public/.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { summarize, duplicateUrls, deprecatedEntries, filterResources, compareTimeline, durationDays, score, prizeAudit, days } from '../../scripts/audit.mjs';

const read = (p) => JSON.parse(fs.readFileSync(new URL(`../../src/data/${p}`, import.meta.url), 'utf8'));
const resources = read('resources.json'), journey = read('journey.json'), links = read('link-status.json');

const s = summarize(resources);
assert.equal(s.entries, 32);
assert.equal(s.categories.length, 6);
assert.equal(s.types.length, 14);
assert.equal(s.uniqueUrls, 29);
assert.deepEqual(s.byCategory, { Foundational: 4, 'App Dev': 5, 'AI & Data': 6, Community: 5, Infrastructure: 3, Interactive: 9 });
assert.equal(s.byHost['docs.google.com'], 6);
assert.deepEqual(duplicateUrls(resources).map((d) => d.ids), [[3, 17], [20, 22], [27, 29]]);
assert.deepEqual(deprecatedEntries(resources).map((r) => r.id), [14, 15, 24]);
assert.equal(filterResources(resources, { category: 'Interactive' }).length, 9);
assert.equal(filterResources(resources, { host: 'docs.google.com', type: 'Form' }).length, 2);

// Judging: 4 criteria x 5 points (Official Rules, Section 6); scores clamp to each criterion's range.
assert.deepEqual(score({ impact: 5, innovation: 4, communication: 3, feasibility: 2 }, journey.criteria), { total: 14, max: 20, share: 0.7 });
assert.equal(score({ impact: 9, innovation: -2 }, journey.criteria).total, 5);

// Timeline: the site's dates sit 15 or 21 days after the Official Rules and match the guidelines PDF.
const offsets = Object.fromEntries(compareTimeline(journey).flatMap((m) => m.comparisons.map((c) => [`${m.id}:${c.id}`, c.startDiff])));
assert.deepEqual(offsets, { 'launch:tc-entry-open': 15, 'launch:gl-form-open': 0, 'deadline:tc-round1-close': 21, 'prelim:tc-round1-judging': 21, 'prelim:gl-judging': 0, 'finalists:tc-round2-close': 21 });
const od = Object.fromEntries(journey.officialDates.map((d) => [d.id, d]));
assert.equal(durationDays(od['tc-round1']), 57); // Feb 2 to Mar 30 inclusive
assert.equal(durationDays(od['gl-judging']), 70); // Apr 23 to Jul 1 inclusive
assert.equal(days('2026-07-10', '2026-11-07'), 120);

// Prizes: 12 listed on the site, 3 with no basis in the Official Rules.
const p = prizeAudit(journey);
assert.equal(p.total, 12);
assert.equal(p.unsupported.length, 3);

// Recorded link snapshot: on 2026-11-07 every URL answered 200 and two landed on a Google sign-in page.
// A fresh snapshot (node scripts/check-links.mjs) has no known answer, so only its shape is checked.
assert.equal(links.results.length, resources.length);
if (links.checkedAt.startsWith('2026-11-07')) {
  assert.equal(links.results.filter((r) => r.status === 200).length, 32);
  assert.equal(links.results.filter((r) => /accounts\.google\.com/.test(r.finalUrl || '')).length, 2);
}

console.log('audit ok', { entries: s.entries, categories: s.categories.length, types: s.types.length, uniqueUrls: s.uniqueUrls, offsets });
