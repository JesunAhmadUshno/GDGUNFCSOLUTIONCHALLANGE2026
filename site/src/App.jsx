import { useMemo, useState, useEffect, useId } from 'react';
import resources from '../../src/data/resources.json';
import journey from '../../src/data/journey.json';
import links from '../../src/data/link-status.json';
import { summarize, duplicateUrls, deprecatedEntries, filterResources, compareTimeline, durationDays, score, prizeAudit, days, hostOf, toUTC } from '../../scripts/audit.mjs';

const REPO = 'https://github.com/JesunAhmadUshno/GDGUNFCSOLUTIONCHALLANGE2026';
const SITE = 'https://jesunahmadushno.github.io/GDGUNFCSOLUTIONCHALLANGE2026/';
const blob = (p) => `${REPO}/blob/main/${p}`;
const fmtDay = (iso, year = true) => new Date(toUTC(iso)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: year ? 'numeric' : undefined, timeZone: 'UTC' });
const fmtRange = (d) => (d.start === d.end ? fmtDay(d.start) : `${fmtDay(d.start, false)} to ${fmtDay(d.end)}`);
const todayISO = () => new Date().toISOString().slice(0, 10);
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

const S = summarize(resources);
const DUPES = duplicateUrls(resources);
const DEPRECATED = deprecatedEntries(resources);
const TIMELINE = compareTimeline(journey);
const PRIZES = prizeAudit(journey);
const MAX_POINTS = score({}, journey.criteria).max;
const SNAP_DATE = links.checkedAt.slice(0, 10);
const LAST_MILESTONE = journey.milestones.reduce((a, m) => (m.end > a ? m.end : a), '');
const OFFSETS = TIMELINE.flatMap((m) => m.comparisons.map((c) => Math.abs(c.startDiff))).filter((d) => d > 0);
const SOURCE_COLOR = { site: 'var(--primary)', tc: 'var(--warn)', guidelines: 'var(--good)' };

const SECTIONS = [['top', 'Overview', '◎'], ['explorer', 'Explorer', '⌕'], ['judging', 'Judging', '★'], ['timeline', 'Timeline', '◷'], ['prizes', 'Prizes', '◆'], ['links', 'Link audit', '⛓'], ['report', 'Report card', '✓']];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function MenuBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);
  return (
    <div className="menubar" role="banner">
      <span className="apple" aria-hidden="true">◆</span>
      <a className="app" href="#top">Solution Challenge Audit</a>
      <a className="m" href={SITE}>Directory</a>
      <a className="m" href={`${SITE}journey/`}>Journey</a>
      <a className="m" href={blob('docs/research-review.md')}>Review</a>
      <span className="spacer" />
      <span className="status"><i /> Data checked at build</span>
      <a href={REPO}>GitHub ↗</a>
      <span className="clock">{now.toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' })}</span>
    </div>
  );
}

function Dock() {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="dock" aria-label="Sections">
      {SECTIONS.map(([id, label, icon]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>
          <span className="ico" aria-hidden="true">{icon}</span><span className="lbl">{label}</span>
        </a>
      ))}
    </nav>
  );
}

function Range({ label, value, min, max, step, onChange, show }) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label} <span>{show}</span></label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {['All', ...options].map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function App() {
  useReveal();
  return (
    <div className="wrap">
      <MenuBar />
      <div className="glow" aria-hidden="true" />
      <Hero />
      <Explorer />
      <Judging />
      <Timeline />
      <Prizes />
      <LinkAudit />
      <ReportCard />
      <Dock />
      <footer>
        Every number on this page is computed from <code>src/data/*.json</code> at build time or live in your browser, and <code>npm run build</code> fails if the counts drift from a known-answer check.
        Dates and rules are cited to the two PDFs bundled in <code>public/</code>. Link statuses are a recorded snapshot from {SNAP_DATE}. Code: MIT.
      </footer>
    </div>
  );
}

function Hero() {
  const daysSince = days(LAST_MILESTONE, todayISO());
  return (
    <header className="card hero window" id="top" data-title="solution-challenge-2026 — README">
      <div className="head">
        <p className="eyebrow">Field guide · retrospective</p>
        <span className="pill info">● Concluded {plural(daysSince, 'day')} ago</span>
      </div>
      <h1>A {S.entries}-link field guide to the 2026 Solution Challenge, <em>checked against its own rules</em>.</h1>
      <p className="sub">
        This repo is a resource directory and journey page for the 2026 GDG on Campus North America Solution Challenge.
        This dashboard audits it: it counts the directory, scores the {MAX_POINTS}-point judging rubric, and lines up the site’s dates against the Official Rules and the submission guidelines bundled with it.
        Where the sources disagree, it shows both instead of picking one.
      </p>
      <div className="actions">
        <a className="btn primary" href="#timeline">See the date conflict</a>
        <a className="btn ghost" href={SITE}>Open the directory</a>
        <a className="btn ghost" href={`${SITE}journey/`}>Open the journey page</a>
      </div>
      <div className="tiles">
        <div className="tile"><div className="num">{S.entries}</div><div className="cap">Entries in resources.json</div></div>
        <div className="tile"><div className="num">{S.categories.length}</div><div className="cap">Categories, across {S.types.length} resource types</div></div>
        <div className="tile"><div className="num">{S.uniqueUrls}</div><div className="cap">Unique URLs ({S.entries - S.uniqueUrls} entries repeat another)</div></div>
        <div className="tile"><div className="num">{MAX_POINTS}</div><div className="cap">Judging points: {journey.criteria.length} criteria × {journey.criteria[0].points}</div></div>
      </div>
    </header>
  );
}

function Explorer() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [host, setHost] = useState('All');
  const qId = useId();
  const rows = useMemo(() => filterResources(resources, { q, category, type, host }), [q, category, type, host]);
  const hosts = useMemo(() => Object.entries(S.byHost).sort((a, b) => b[1] - a[1]).map(([h]) => h), []);
  const cats = Object.entries(S.byCategory).sort((a, b) => b[1] - a[1]);
  const matchBy = summarize(rows).byCategory;
  const dupIds = new Set(DUPES.flatMap((d) => d.ids));
  const W = 460, rowH = 30, H = cats.length * rowH + 8, L = 110, max = cats[0][1];
  const x = (v) => (v / max) * (W - L - 30);
  return (
    <section id="explorer" className="card window reveal" data-title="resources.json — explorer">
      <div className="head">
        <div>
          <p className="eyebrow">Live explorer</p>
          <h2>Filter all {S.entries} entries the way a participant would.</h2>
          <p className="sub">Search titles, descriptions and URLs, or narrow by category, type and domain. Counts and the chart update in your browser from the same file the directory renders.</p>
        </div>
        <span className="pill info" aria-live="polite">{rows.length} of {S.entries} shown</span>
      </div>
      <div className="controls">
        <div className="field"><label htmlFor={qId}>Search</label><input id={qId} type="search" value={q} placeholder="e.g. gemini, flutter, form" onChange={(e) => setQ(e.target.value)} /></div>
        <Select label="Category" value={category} options={S.categories} onChange={setCategory} />
        <Select label="Type" value={type} options={S.types} onChange={setType} />
        <Select label="Domain" value={host} options={hosts} onChange={setHost} />
      </div>
      <div className="grid2">
        <div>
          <h3>Entries per category</h3>
          <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Entries per category: ${cats.map(([c, n]) => `${c} ${n}`).join(', ')}; solid bars show the current filter`} style={{ marginTop: 10 }}>
            {cats.map(([c, n], i) => (
              <g key={c} transform={`translate(0 ${i * rowH + 4})`}>
                <text x={L - 8} y={15} textAnchor="end" style={{ fill: 'var(--text)', fontSize: 12 }}>{c}</text>
                <rect x={L} y={4} width={x(n)} height={16} rx={5} fill="var(--primary)" opacity="0.14" />
                <rect x={L} y={4} width={x(matchBy[c] || 0)} height={16} rx={5} fill="var(--primary)" style={{ transition: 'width .4s' }} />
                <text x={L + x(n) + 6} y={16}>{matchBy[c] || 0}/{n}</text>
              </g>
            ))}
          </svg>
          <p className="hint">Pale bar: all entries in the category. Solid bar: entries matching your filters.</p>
          <h3 style={{ marginTop: 12 }}>Types in view</h3>
          <div className="chips">
            {Object.entries(summarize(rows).byType).sort((a, b) => b[1] - a[1]).map(([t, n]) => <span key={t} className="pill info">{t} · {n}</span>)}
          </div>
        </div>
        <div className="list" style={{ overflowY: 'auto' }} tabIndex={0} aria-label="Matching entries">
          {rows.length === 0 && <p className="hint">No entries match. Clear a filter to see more.</p>}
          {rows.map((r) => (
            <a key={r.id} className="item" href={r.url.startsWith('/') ? `${SITE}${r.url.slice(1)}` : r.url} target="_blank" rel="noopener noreferrer">
              <span className="row1"><b>{r.title}</b><span className="mono">#{r.id}</span></span>
              <small>{r.category} · {r.type} · {hostOf(r.url)}</small>
              {(r.deprecated || dupIds.has(r.id)) && (
                <span className="flags">
                  {r.deprecated && <span className="pill bad">Deprecated</span>}
                  {dupIds.has(r.id) && <span className="pill warn">Duplicate URL</span>}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Judging() {
  const [v, setV] = useState({ impact: 3, innovation: 3, communication: 3, feasibility: 3 });
  const res = score(v, journey.criteria);
  const W = 460, H = 200, pad = { l: 8, r: 8, t: 22, b: 40 };
  const bw = (W - pad.l - pad.r) / journey.criteria.length;
  const y = (s) => pad.t + (1 - s / 5) * (H - pad.t - pad.b);
  return (
    <section id="judging" className="card window reveal" data-title="judging-rubric.app — live">
      <div className="head">
        <div>
          <p className="eyebrow">Score calculator</p>
          <h2>Score a project the way the judges did: {journey.criteria.length} criteria, {MAX_POINTS} points.</h2>
          <p className="sub">
            The criteria and point values come from <a href={blob('src/data/journey.json')}>journey.json</a>, the same file the journey page renders, and match Section 6 of the Official Rules.
            The site shortens the questions and swaps the word order of two criterion names; both are flagged below.
          </p>
        </div>
        <span className={`pill ${res.share >= 0.75 ? 'good' : res.share >= 0.5 ? 'info' : 'warn'}`} aria-live="polite">{res.total} / {res.max}</span>
      </div>
      <div className="grid2">
        <div>
          <div className="controls" style={{ gridTemplateColumns: '1fr' }}>
            {journey.criteria.map((c) => <Range key={c.id} label={c.title} value={v[c.id]} min={0} max={c.points} step={1} onChange={(n) => setV({ ...v, [c.id]: n })} show={`${v[c.id]} / ${c.points}`} />)}
          </div>
          <p className="hint">{journey.rulesTieBreak}</p>
        </div>
        <div>
          <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Scores per criterion, total ${res.total} of ${res.max}`}>
            {[0, 1, 2, 3, 4, 5].map((t) => <g key={t}><line className="axis" x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} /></g>)}
            {journey.criteria.map((c, i) => (
              <g key={c.id}>
                <rect x={pad.l + i * bw + 14} width={bw - 28} y={y(v[c.id])} height={y(0) - y(v[c.id])} rx={6} fill="var(--primary)" opacity={0.35 + 0.13 * v[c.id]} style={{ transition: 'all .3s' }} />
                <text x={pad.l + i * bw + bw / 2} y={y(v[c.id]) - 6} textAnchor="middle" style={{ fill: 'var(--text)', fontSize: 13, fontWeight: 700 }}>{v[c.id]}</text>
                <text x={pad.l + i * bw + bw / 2} y={H - 22} textAnchor="middle">{c.title.split(' & ')[0]}</text>
                <text x={pad.l + i * bw + bw / 2} y={H - 8} textAnchor="middle">& {c.title.split(' & ')[1]}</text>
              </g>
            ))}
          </svg>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead><tr><th>Site name</th><th>Official Rules name</th><th>Questions (site / rules)</th></tr></thead>
              <tbody>
                {journey.criteria.map((c) => (
                  <tr key={c.id}><td>{c.title}</td><td className={c.title === c.rulesTitle ? '' : 'no'}>{c.rulesTitle}</td><td className={c.questions.length === c.rulesQuestions ? 'ok' : 'no'}>{c.questions.length} / {c.rulesQuestions}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const [asOf, setAsOf] = useState(todayISO);
  const [lanes, setLanes] = useState('all');
  const asOfId = useId();
  const official = journey.officialDates.filter((d) => !['tc-entry-open', 'tc-round1-close', 'tc-round2-close'].includes(d.id));
  const rows = [
    ...journey.milestones.map((m) => ({ ...m, label: m.title })),
    ...official.filter((d) => lanes === 'all' || lanes === d.source).map((d) => ({ ...d })),
  ];
  const t0 = '2026-02-01', t1 = '2026-07-15';
  const W = 900, L = 250, rowH = 26, top = 26, H = top + rows.length * rowH + 10;
  const x = (iso) => L + (days(t0, iso) / days(t0, t1)) * (W - L - 16);
  const months = ['2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01', '2026-06-01', '2026-07-01'];
  const validAsOf = /^\d{4}-\d{2}-\d{2}$/.test(asOf) ? asOf : todayISO();
  const inRange = validAsOf >= t0 && validAsOf <= t1;
  return (
    <section id="timeline" className="card window reveal" data-title="timeline.ics — three sources">
      <div className="head">
        <div>
          <p className="eyebrow">Timeline comparator</p>
          <h2>The site’s dates run <em>three weeks behind</em> the Official Rules.</h2>
          <p className="sub">
            The journey page’s deadline and judging dates sit 21 days after the Official Rules’ Round 1 and Round 2 dates, but its launch and judging start match the submission guidelines PDF.
            Neither PDF dates Regional Demo Day. Every bar is cited; offsets and elapsed days are computed in your browser.
          </p>
        </div>
        <div className="seg" role="group" aria-label="Official sources shown">
          {[['all', 'All sources'], ['tc', 'Official Rules'], ['guidelines', 'Guidelines']].map(([k, l]) => <button key={k} aria-pressed={lanes === k} onClick={() => setLanes(k)}>{l}</button>)}
        </div>
      </div>
      <div className="legend" style={{ marginTop: 0, marginBottom: 8 }}>
        {Object.entries(journey.sources).map(([k, s]) => <span key={k}><i style={{ background: SOURCE_COLOR[k] }} />{s.label}</span>)}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Gantt chart of challenge milestones from the site, the Official Rules and the submission guidelines" style={{ minWidth: 680 }}>
          {months.map((m) => <g key={m}><line className="axis" x1={x(m)} x2={x(m)} y1={top - 6} y2={H - 6} /><text x={x(m) + 4} y={14}>{fmtDay(m).split(' ')[0]}</text></g>)}
          {inRange && <g><line x1={x(validAsOf)} x2={x(validAsOf)} y1={top - 6} y2={H - 6} stroke="var(--bad)" strokeDasharray="4 3" /><text x={x(validAsOf) - 4} y={H - 10} textAnchor="end" style={{ fill: 'var(--bad)' }}>as of</text></g>}
          {rows.map((r, i) => {
            const yy = top + i * rowH, c = SOURCE_COLOR[r.source], single = r.start === r.end;
            return (
              <g key={r.id}>
                <text x={L - 10} y={yy + 15} textAnchor="end" style={{ fill: 'var(--text)', fontSize: 12 }}>{r.label.length > 38 ? `${r.label.slice(0, 37)}…` : r.label}</text>
                {single
                  ? <rect x={x(r.start) - 6} y={yy + 4} width={12} height={12} transform={`rotate(45 ${x(r.start)} ${yy + 10})`} fill={c} />
                  : <rect x={x(r.start)} y={yy + 3} width={Math.max(4, x(r.end) - x(r.start))} height={14} rx={5} fill={c} opacity="0.8" />}
                <text x={(single ? x(r.start) : x(r.end)) + 10} y={yy + 15}>{single ? fmtDay(r.start, false) : `${durationDays(r)} d`}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="controls" style={{ marginTop: 16, gridTemplateColumns: 'minmax(0, 260px)' }}>
        <div className="field"><label htmlFor={asOfId}>Count days elapsed as of</label><input id={asOfId} type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} /></div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="wide">
          <thead><tr><th>Site milestone</th><th>Site date</th><th>Compared with</th><th>Their date</th><th>Offset</th><th>Elapsed</th></tr></thead>
          <tbody>
            {TIMELINE.map((m) => {
              const el = days(m.end, validAsOf);
              const elapsed = el > 0 ? `${el} d ago` : el === 0 ? 'that day' : `in ${-el} d`;
              if (!m.comparisons.length) return <tr key={m.id}><td>{m.title}</td><td>{fmtRange(m)}</td><td colSpan={3}><span className="pill warn">No date in either PDF</span></td><td>{elapsed}</td></tr>;
              return m.comparisons.map((c, j) => (
                <tr key={`${m.id}-${c.id}`}>
                  <td>{j === 0 ? m.title : ''}</td><td>{j === 0 ? fmtRange(m) : ''}</td>
                  <td>{journey.sources[c.source].label}<div className="hint">{c.cite}</div></td>
                  <td>{fmtRange(c)}</td>
                  <td><span className={`pill ${c.startDiff === 0 ? 'good' : 'warn'}`}>{c.startDiff === 0 ? 'Same day' : `${c.startDiff > 0 ? '+' : ''}${c.startDiff} d`}</span></td>
                  <td>{j === 0 ? elapsed : ''}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
      <ul className="notes">{journey.rulesNotes.map((n) => <li key={n} className="hint">{n}</li>)}</ul>
    </section>
  );
}

function Prizes() {
  return (
    <section id="prizes" className="card window reveal" data-title="prizes.md — cross-checked">
      <p className="eyebrow">Prize tiers</p>
      <h2>{PRIZES.total} prizes listed, {PRIZES.total - PRIZES.unsupported.length} backed by the Official Rules.</h2>
      <p className="sub">
        Each prize on the journey page was checked against Sections 7 and 8 of the Official Rules.
        The rules promise nothing to all contestants, so the badge and the $5 credit voucher may have come from elsewhere; they are not confirmed here.
      </p>
      <div className="prize-grid" style={{ marginTop: 16 }}>
        {journey.prizeTiers.map((t) => (
          <div className="tile" key={t.id}>
            <h3>{t.title}</h3>
            <ul className="prize-list">
              {t.prizes.map((p) => (
                <li key={p.name}>
                  <span>{p.name}</span>
                  <span className={`pill ${p.inRules ? 'good' : 'warn'}`}>{p.inRules ? 'In rules' : 'Not in rules'}</span>
                  {p.inRules && /\(/.test(p.inRules) && <small className="hint">{p.inRules}</small>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function LinkAudit() {
  const signIn = links.results.filter((r) => /accounts\.google\.com/.test(r.finalUrl || ''));
  const redirected = links.results.filter((r) => r.redirected);
  const ok = links.results.filter((r) => r.status >= 200 && r.status < 400);
  const local = links.results.find((r) => r.withoutBasePath);
  const byId = Object.fromEntries(resources.map((r) => [r.id, r]));
  return (
    <section id="links" className="card window reveal" data-title="link-audit.log">
      <div className="head">
        <div>
          <p className="eyebrow">Data quality</p>
          <h2>{DUPES.length} duplicate URLs and {DEPRECATED.length} links to a retired API.</h2>
          <p className="sub">Duplicates and deprecations are computed live from resources.json. HTTP statuses are a recorded snapshot from <a href={blob('scripts/check-links.mjs')}>check-links.mjs</a>, not a live check: your browser makes no requests to these sites.</p>
        </div>
        <span className="pill warn">Recorded {SNAP_DATE}</span>
      </div>
      <div className="grid2">
        <div>
          <h3>Same URL, different entries</h3>
          <ul className="audit">
            {DUPES.map((d) => <li key={d.url}><span className="pill warn">#{d.ids.join(' = #')}</span> {d.ids.map((id) => byId[id].title).join(' / ')}<div className="hint mono">{d.url.length > 60 ? `${d.url.slice(0, 59)}…` : d.url}</div></li>)}
          </ul>
          <h3 style={{ marginTop: 16 }}>Marked deprecated in the data</h3>
          <ul className="audit">
            {DEPRECATED.map((r) => {
              const s = links.results.find((x) => x.id === r.id);
              return <li key={r.id}><span className="pill bad">#{r.id}</span> {r.title}<div className="hint">Snapshot: redirects to {s?.finalUrl ? hostOf(s.finalUrl) + new URL(s.finalUrl).pathname : 'n/a'}</div></li>;
            })}
          </ul>
        </div>
        <div>
          <div className="tiles" style={{ gridTemplateColumns: '1fr 1fr', marginTop: 0 }}>
            <div className="tile"><div className="num">{ok.length}/{links.results.length}</div><div className="cap">answered 2xx or 3xx on {SNAP_DATE}</div></div>
            <div className="tile"><div className="num">{redirected.length}</div><div className="cap">redirected somewhere else first</div></div>
            <div className="tile"><div className="num">{signIn.length}</div><div className="cap">land on a Google sign-in page (#{signIn.map((r) => r.id).join(', #')})</div></div>
            <div className="tile"><div className="num">{local?.withoutBasePath}</div><div className="cap">status of the old T&C link without basePath, now fixed</div></div>
          </div>
          <p className="hint" style={{ marginTop: 12 }}>A 200 means the server answered, not that the page still teaches what the entry promises. Locale redirects reflect where the snapshot ran.</p>
        </div>
      </div>
    </section>
  );
}

function ReportCard() {
  const grades = [
    ['Correctness', 'B', 'The T&C PDF link returned 404 without basePath. Fixed on this branch.'],
    ['Content accuracy', 'C', `Site dates differ from the Official Rules by ${Math.min(...OFFSETS)} to ${Math.max(...OFFSETS)} days and cite no source. Now both date sets are stored with citations.`],
    ['Data quality', 'C', `${DUPES.length} duplicate URLs and ${DEPRECATED.length} PaLM entries. Now flagged in the data and checked in CI.`],
    ['Testing', 'C', 'No tests existed. Now a data check (npm test) and this dashboard’s known-answer check run on every deploy.'],
    ['Dependencies', 'B', 'Caret ranges pinned to the locked versions.'],
    ['Accessibility', 'Not audited', 'The product’s heavy motion has no reduced-motion handling. This dashboard passes an automated label and overflow gate only.'],
  ];
  const docs = [
    ['docs/research-review.md', 'Research review', 'Rubric grades and open gaps'],
    ['src/data/journey.json', 'journey.json', 'Dates, prizes, criteria, cited'],
    ['src/data/resources.json', 'resources.json', `${S.entries} directory entries`],
    ['scripts/check-data.mjs', 'check-data.mjs', 'Data invariants, run in CI'],
    ['site/src/audit.check.mjs', 'audit.check.mjs', 'Known answers for this page'],
    ['src/data/link-status.json', 'link-status.json', `Recorded ${SNAP_DATE}`],
  ];
  return (
    <section id="report" className="card window reveal" data-title="engineering_report.md">
      <p className="eyebrow">Engineering report card and limitations</p>
      <h2>A working product with unchecked content, now checked where it is cheap.</h2>
      <div style={{ overflowX: 'auto', marginTop: 16 }}>
        <table>
          <thead><tr><th>Area</th><th>Grade before this branch</th><th>Finding</th></tr></thead>
          <tbody>{grades.map(([a, g, f]) => <tr key={a}><td><b>{a}</b></td><td><span className={`pill ${g === 'B' ? 'info' : 'warn'}`}>{g}</span></td><td>{f}</td></tr>)}</tbody>
        </table>
      </div>
      <h3 style={{ marginTop: 20 }}>Limits of this audit</h3>
      <ul className="notes">
        <li className="hint">The PDFs are the versions bundled in this repo. Later official revisions, if any, were not checked.</li>
        <li className="hint">Prize and criteria matching was done by reading the rules, not by a parser. The rules text in Section 5 itself contains a conflicting Round 2 date.</li>
        <li className="hint">The link snapshot is one run from one location. It says nothing about link quality or whether a “Course” entry is really a course.</li>
        <li className="hint">The challenge has concluded. Nothing here reflects actual entries, scores or winners.</li>
      </ul>
      <div className="docs" style={{ marginTop: 20 }}>
        {docs.map(([p, t, d]) => <a key={p} href={blob(p)}><b>{t}</b><small>{d}</small></a>)}
      </div>
    </section>
  );
}
