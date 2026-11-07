// Records a dated HTTP status snapshot of every resource URL to src/data/link-status.json.
// Run by hand: node scripts/check-links.mjs (free, ~30 requests, under a minute).
// HEAD first; any error or status >= 400 is retried with GET, since some hosts refuse HEAD.
// The dashboard shows this file as a recorded snapshot, never as a live check.
import fs from 'node:fs';

const SITE = 'https://jesunahmadushno.github.io/GDGUNFCSOLUTIONCHALLANGE2026';
const root = new URL('../', import.meta.url);
const resources = JSON.parse(fs.readFileSync(new URL('src/data/resources.json', root), 'utf8'));

async function probe(url, method) {
  const res = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'Mozilla/5.0 (link check)' } });
  // Sign-in redirects carry per-request tokens in the query string; keep only where they land.
  const finalUrl = new URL(res.url).hostname === 'accounts.google.com' ? res.url.split('?')[0] : res.url;
  return { status: res.status, finalUrl, method };
}

async function check(r) {
  const url = r.url.startsWith('/') ? SITE + r.url : r.url;
  let out;
  try { out = await probe(url, 'HEAD'); } catch (e) { out = { status: 0, error: e.name, method: 'HEAD' }; }
  if (!out.status || out.status >= 400) {
    try { out = await probe(url, 'GET'); } catch (e) { out = { status: 0, error: e.name, method: 'GET' }; }
  }
  const row = { id: r.id, url, ...out, redirected: !!out.finalUrl && out.finalUrl !== url };
  // Local files: also record what the old href without basePath returned.
  if (r.url.startsWith('/')) row.withoutBasePath = await probe(new URL(SITE).origin + r.url, 'GET').then((x) => x.status, () => 0);
  return row;
}

const results = await Promise.all(resources.map(check));
const snapshot = { checkedAt: new Date().toISOString(), method: 'HEAD, then GET on error or status >= 400; redirects followed', results };
fs.writeFileSync(new URL('src/data/link-status.json', root), JSON.stringify(snapshot, null, 2) + '\n');
console.log(results.map((x) => `${x.id}\t${x.status}\t${x.redirected ? '-> ' + x.finalUrl : ''}`).join('\n'));
