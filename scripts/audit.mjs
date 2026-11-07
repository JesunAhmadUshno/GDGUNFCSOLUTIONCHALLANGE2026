// Pure functions shared by scripts/check-data.mjs and the live dashboard in site/.
// No dependencies, so the same code runs in Node and in the browser.

export const DAY = 86400000;
export const toUTC = (iso) => Date.parse(`${iso}T00:00:00Z`);
export const days = (a, b) => Math.round((toUTC(b) - toUTC(a)) / DAY);
export const isISODate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(toUTC(s)).toISOString().slice(0, 10) === s;

export const hostOf = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return 'this site (public/)'; }
};

const countBy = (xs, f) => xs.reduce((m, x) => ((m[f(x)] = (m[f(x)] || 0) + 1), m), {});

export function summarize(resources) {
  const categories = [...new Set(resources.map((r) => r.category))];
  const types = [...new Set(resources.map((r) => r.type))];
  return {
    entries: resources.length,
    categories,
    types,
    uniqueUrls: new Set(resources.map((r) => r.url)).size,
    byCategory: countBy(resources, (r) => r.category),
    byType: countBy(resources, (r) => r.type),
    byHost: countBy(resources, (r) => hostOf(r.url)),
  };
}

// Groups of entry ids that point at exactly the same URL.
export function duplicateUrls(resources) {
  const by = {};
  for (const r of resources) (by[r.url] ||= []).push(r.id);
  return Object.entries(by).filter(([, ids]) => ids.length > 1).map(([url, ids]) => ({ url, ids }));
}

export const deprecatedEntries = (resources) => resources.filter((r) => r.deprecated || /palm/i.test(r.url));

export function filterResources(resources, { q = '', category = 'All', type = 'All', host = 'All' } = {}) {
  const needle = q.trim().toLowerCase();
  return resources.filter((r) =>
    (category === 'All' || r.category === category) &&
    (type === 'All' || r.type === type) &&
    (host === 'All' || hostOf(r.url) === host) &&
    (!needle || `${r.title} ${r.description} ${r.url}`.toLowerCase().includes(needle)));
}

// For each site milestone, the day offset from each official date it is compared with.
export function compareTimeline(journey) {
  const official = Object.fromEntries(journey.officialDates.map((d) => [d.id, d]));
  return journey.milestones.map((m) => ({
    ...m,
    comparisons: m.compare.map((id) => {
      const o = official[id];
      return { ...o, startDiff: days(o.start, m.start), endDiff: days(o.end, m.end) };
    }),
  }));
}

export const durationDays = (d) => days(d.start, d.end) + 1;

export function score(values, criteria) {
  const max = criteria.reduce((s, c) => s + c.points, 0);
  const total = criteria.reduce((s, c) => s + Math.min(c.points, Math.max(0, values[c.id] || 0)), 0);
  return { total, max, share: max ? total / max : 0 };
}

export function prizeAudit(journey) {
  const all = journey.prizeTiers.flatMap((t) => t.prizes.map((p) => ({ ...p, tier: t.title })));
  return { total: all.length, unsupported: all.filter((p) => !p.inRules), all };
}
