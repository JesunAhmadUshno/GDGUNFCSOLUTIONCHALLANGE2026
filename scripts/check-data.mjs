// Data integrity check for src/data/*.json. Run: node scripts/check-data.mjs (no dependencies).
// Fails on broken invariants; reports known content issues (duplicates, deprecations) without failing.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { summarize, duplicateUrls, deprecatedEntries, isISODate, compareTimeline, prizeAudit } from './audit.mjs';

const root = new URL('../', import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, root), 'utf8'));
const resources = read('src/data/resources.json');
const journey = read('src/data/journey.json');

// resources.json
const CATEGORIES = ['Interactive', 'Foundational', 'App Dev', 'AI & Data', 'Infrastructure', 'Community']; // the filter list in src/app/page.tsx
const COLORS = ['blue', 'red', 'yellow', 'green'];
assert.equal(new Set(resources.map((r) => r.id)).size, resources.length, 'resource ids must be unique');
for (const r of resources) {
  for (const k of ['title', 'description', 'url', 'category', 'type']) assert.ok(typeof r[k] === 'string' && r[k].trim(), `id ${r.id}: missing ${k}`);
  assert.ok(CATEGORIES.includes(r.category), `id ${r.id}: unknown category ${r.category}`);
  assert.ok(COLORS.includes(r.color), `id ${r.id}: unknown color ${r.color}`);
  if (r.url.startsWith('/')) assert.ok(fs.existsSync(new URL(`public${r.url}`, root)), `id ${r.id}: ${r.url} not in public/`);
  else assert.match(r.url, /^https?:\/\/[^\s]+$/, `id ${r.id}: bad url`);
}

// journey.json
const sourceIds = Object.keys(journey.sources);
const allDates = [...journey.milestones, ...journey.officialDates];
for (const d of allDates) {
  assert.ok(isISODate(d.start) && isISODate(d.end), `${d.id}: dates must be ISO yyyy-mm-dd`);
  assert.ok(d.start <= d.end, `${d.id}: start after end`);
  assert.ok(sourceIds.includes(d.source), `${d.id}: unknown source ${d.source}`);
}
for (const d of journey.officialDates) assert.ok(d.cite, `${d.id}: official dates need a citation`);
const officialIds = new Set(journey.officialDates.map((d) => d.id));
for (const m of journey.milestones) for (const id of m.compare) assert.ok(officialIds.has(id), `${m.id}: compare ref ${id} missing`);
const descs = journey.milestones.map((m) => m.description);
assert.equal(new Set(descs).size, descs.length, 'milestone descriptions must not be copy-pasted');
assert.equal(journey.criteria.reduce((s, c) => s + c.points, 0), 20, 'criteria must sum to 20 points (Official Rules, Section 6)');
assert.equal(journey.criteria.length, 4, 'four judging criteria (Official Rules, Section 6)');
for (const f of Object.values(journey.sources)) assert.ok(fs.existsSync(new URL(f.file, root)), `missing source file ${f.file}`);

const s = summarize(resources);
const report = {
  entries: s.entries, categories: s.categories.length, types: s.types.length, uniqueUrls: s.uniqueUrls,
  duplicateUrls: duplicateUrls(resources).map((d) => d.ids.join('/')),
  deprecated: deprecatedEntries(resources).map((r) => r.id),
  timelineOffsetsDays: compareTimeline(journey).flatMap((m) => m.comparisons.map((c) => `${m.id} vs ${c.id}: ${c.startDiff}`)),
  prizesWithoutRulesBasis: prizeAudit(journey).unsupported.map((p) => p.name),
};
console.log('data ok', JSON.stringify(report, null, 1));
