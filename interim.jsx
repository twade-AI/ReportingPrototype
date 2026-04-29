// interim.jsx — Interim Report Data screen
const { useState: useStateI, useMemo: useMemoI } = React;

const InterimScreen = ({ onNav }) => {
  const [subjectId, setSubjectId] = useStateI('maths');
  const [hover, setHover] = useStateI(null);
  const [heatHover, setHeatHover] = useStateI(null);
  const [tutorOpen, setTutorOpen] = useStateI(false);

  const subj = subjectId === 'all'
    ? (() => {
        const avgs = [];
        for (let i = 0; i < 6; i++) {
          avgs.push(SUBJECTS.reduce((s, sub) => s + GRADE_VALUES[sub.grades[i]], 0) / SUBJECTS.length);
        }
        const nearestGrade = (avg) => GRADE_LABELS.reduce((best, lab) =>
          Math.abs(GRADE_VALUES[lab] - avg) < Math.abs(GRADE_VALUES[best] - avg) ? lab : best, GRADE_LABELS[0]);
        return {
          id: 'all',
          name: 'All subjects',
          teacher: 'Average across all 10 subjects',
          target: 'EE',
          grades: avgs.map(nearestGrade),
          _avgs: avgs,
        };
      })()
    : SUBJECTS.find((s) => s.id === subjectId);

  return (
    <div className="page">
      <div className="breadcrumb">
        <button className="bc-link" onClick={() => onNav('home')}>← Overview</button>
        <span className="bc-sep">/</span>
        <span className="bc-current">Interim Report Data</span>
      </div>

      <header className="hero hero-compact">
        <div>
          <div className="kicker">{PUPIL.firstName} {PUPIL.lastName} · {PUPIL.year}</div>
          <h1 className="hero-name hero-name-sm">Report Data</h1>
          <div className="hero-blurb">Six reporting periods (R1–R6). Tap a subject to see attainment over time, then explore the targets being set across the year.</div>
        </div>
        <div className="legend-grid">
          {GRADE_LABELS.slice().reverse().map((g) =>
          <div key={g} className="leg-box">
              <div className="leg-box-code">{g}</div>
              <div className="leg-box-label">{GRADE_FULL[g]}</div>
            </div>
          )}
        </div>
      </header>

      <Card
        kicker={`Tutorial report · ${TUTOR_REPORT.period}`}
        title="Tutor's long tutorial report"
        className="tutor-report"
        action={
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span className="meta-chip">Written {TUTOR_REPORT.date}</span>
            <button className="tutor-toggle" onClick={()=>setTutorOpen(o=>!o)} aria-expanded={tutorOpen}>
              <span>{tutorOpen ? 'Collapse' : 'Read'}</span>
              <span className={`tutor-chev ${tutorOpen?'open':''}`}>▾</span>
            </button>
          </div>
        }>
        <div className="tutor-head">
          <div className="tutor-sig-circle">{TUTOR_REPORT.signature}</div>
          <div style={{flex:1}}>
            <div className="tutor-author">{TUTOR_REPORT.author}</div>
            <div className="tutor-role">{TUTOR_REPORT.role}</div>
          </div>
          {tutorOpen && (
            <div className="tutor-actions">
              <button className="btn-ghost" onClick={() => alert('Opens printable PDF')}>Print / PDF</button>
              <button className="btn-primary" onClick={() => alert('Opens reply composer to tutor')}>Reply to tutor</button>
            </div>
          )}
        </div>
        {!tutorOpen && (
          <p className="tutor-preview">
            {TUTOR_REPORT.paragraphs[0].slice(0, 220)}…{' '}
            <button className="link-btn inline" onClick={()=>setTutorOpen(true)}>Read full report →</button>
          </p>
        )}
        {tutorOpen && (
          <article className="tutor-body">
            {TUTOR_REPORT.paragraphs.map((p, i) =>
              <p key={i} className={i === 0 ? 'tutor-lede' : ''}>{p}</p>
            )}
            <div className="tutor-signoff">
              <div className="tutor-signoff-name">{TUTOR_REPORT.author}</div>
              <div className="tutor-signoff-role">{TUTOR_REPORT.role}</div>
            </div>
          </article>
        )}
      </Card>

      <Card kicker="Filterable" title="Attainment by subject"
      action={
      <div className="filters">
            <label className="filt-lab">Subject</label>
            <select className="select" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              <option value="all">All subjects (average)</option>
              {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
      }>
        <div className="subj-meta">
          <div className="subj-pill"><span className="lab">Teacher</span><span className="val">{subj.teacher}</span></div>
          <div className="subj-pill"><span className="lab">Target grade</span><span className="val val-target">{subj.target}</span></div>
          <div className="subj-pill"><span className="lab">Latest</span><span className="val">{subj._avgs ? subj._avgs[5].toFixed(2) + ' (≈' + subj.grades[5] + ')' : subj.grades[5]}</span></div>
          <div className="subj-pill"><span className="lab">Trend</span><span className="val">
            {(subj._avgs ? subj._avgs[5] : GRADE_VALUES[subj.grades[5]]) > (subj._avgs ? subj._avgs[0] : GRADE_VALUES[subj.grades[0]]) ? '↗ Improving' :
              (subj._avgs ? subj._avgs[5] : GRADE_VALUES[subj.grades[5]]) < (subj._avgs ? subj._avgs[0] : GRADE_VALUES[subj.grades[0]]) ? '↘ Declining' : '→ Steady'}
          </span></div>
        </div>
        <BigGraph subj={subj} hover={hover} setHover={setHover} />
        <div className="legend-row">
          <span><i className="leg-line-solid" /> {subj.name} attainment</span>
          <span><i className="leg-line-dash" /> Target ({subj.target})</span>
          <span><i className="leg-line-grey" /> Year-group average</span>
        </div>
      </Card>

      {/* Compare all subjects */}
      <Card kicker="All subjects · R6" title="Latest grade snapshot">
        <div className="snapshot">
          {SUBJECTS.map((s) => {
            const g = s.grades[5];
            const at = GRADE_VALUES[g] >= GRADE_VALUES[s.target];
            return (
              <button key={s.id} className={`snap ${subjectId === s.id ? 'snap-active' : ''}`} onClick={() => setSubjectId(s.id)}>
                <div className="snap-name">{s.name}</div>
                <div className={`snap-grade ${at ? 'g-ok' : 'g-warn'}`}>{g}</div>
                <div className="snap-target">target {s.target}</div>
              </button>);

          })}
        </div>
      </Card>

      <Card kicker="Heatmap · subject × target" title="Targets set this year"
      action={<span className="meta-chip">17 categories · {SUBJECTS.length} subjects</span>}>
        <p className="card-blurb">Darker cells = a target has been set in more reporting periods. Hover any cell to see the full target description.</p>
        <Heatmap heatHover={heatHover} setHeatHover={setHeatHover} setSubjectId={setSubjectId} subjectId={subjectId} />
        <div className="heat-legend">
          <span className="heat-leg-lab">Less often</span>
          {[0, 1, 2, 3, 4].map((n) =>
          <span key={n} className="heat-leg-sw" style={{ background: heatColor(n) }} />
          )}
          <span className="heat-leg-lab">Every period</span>
        </div>

        <div className="targets-most">
          <h4 className="card-title-sm">Most common targets across {PUPIL.firstName}'s subjects</h4>
          <div className="targets-most-list">
            {topTargets().map((t) =>
            <div key={t.code} className="tm-row">
                <div className="tm-code">{t.code}</div>
                <div className="tm-label">{t.label}</div>
                <div className="tm-bar"><div className="tm-bar-fill" style={{ width: `${t.total / 16 * 100}%` }} /></div>
                <div className="tm-num">{t.total}</div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <footer className="footnote">
        Data drawn live from the Haileybury reporting database · Last sync 05:58 BST
      </footer>
    </div>);

};

const heatColor = (v) => {
  if (v === 0) return 'var(--heat-0)';
  const stops = ['var(--heat-1)', 'var(--heat-2)', 'var(--heat-3)', 'var(--heat-4)'];
  return stops[v - 1];
};

const topTargets = () => {
  const totals = {};
  TARGET_CODES.forEach((t) => totals[t.code] = 0);
  Object.values(TARGETS_MATRIX).forEach((row) => {
    Object.entries(row).forEach(([code, n]) => {totals[code] = (totals[code] || 0) + n;});
  });
  return TARGET_CODES.map((t) => ({ ...t, total: totals[t.code] })).
  filter((t) => t.total > 0).
  sort((a, b) => b.total - a.total).
  slice(0, 6);
};

// ── Big graph
const BigGraph = ({ subj, hover, setHover }) => {
  const W = 800,H = 320,PL = 60,PR = 30,PT = 24,PB = 40;
  const x = (i) => PL + i * (W - PL - PR) / 5;
  const y = (v) => H - PB - (v - 1) / 3 * (H - PT - PB);
  const points = subj._avgs ? subj._avgs : subj.grades.map((g) => GRADE_VALUES[g]);
  const yearAvg = [2.0, 2.1, 2.3, 2.4, 2.6, 2.7]; // illustrative year-group avg

  const smooth = (pts) => pts.map((p, i, arr) => {
    if (i === 0) return `M${x(i)},${y(p)}`;
    const px = x(i - 1),py = y(arr[i - 1]);
    const cx = x(i),cy = y(p);
    const mx = (px + cx) / 2;
    return `C${mx},${py} ${mx},${cy} ${cx},${cy}`;
  }).join(' ');

  return (
    <div className="biggraph-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="biggraph" preserveAspectRatio="xMidYMid meet">
        {/* y gridlines */}
        {[1, 2, 3, 4].map((v) =>
        <g key={v}>
            <line x1={PL} x2={W - PR} y1={y(v)} y2={y(v)} stroke="currentColor" opacity=".10" />
            <text x={PL - 12} y={y(v) + 4} textAnchor="end" fontSize="13" fontWeight="600" fill="currentColor" opacity=".7" fontFamily="Inter">{GRADE_LABELS[v - 1]}</text>
          </g>
        )}
        {/* x labels */}
        {[0, 1, 2, 3, 4, 5].map((i) =>
        <text key={i} x={x(i)} y={H - 12} textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor" opacity=".7" fontFamily="Inter">R{i + 1}</text>
        )}
        {/* target band */}
        <line x1={PL} x2={W - PR} y1={y(GRADE_VALUES[subj.target])} y2={y(GRADE_VALUES[subj.target])}
        stroke="#9b1844" strokeWidth="1.5" strokeDasharray="6 5" opacity=".7" />
        <text x={W - PR - 6} y={y(GRADE_VALUES[subj.target]) - 6} textAnchor="end" fontSize="11" fill="#9b1844" fontWeight="700" fontFamily="Inter">Target {subj.target}</text>

        {/* year average */}
        <path d={smooth(yearAvg)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" opacity=".4" />

        {/* attainment line */}
        <path d={smooth(points)} fill="none" stroke="#9b1844" strokeWidth="3" strokeLinecap="round" />
        {points.map((p, i) =>
        <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <circle cx={x(i)} cy={y(p)} r="14" fill="transparent" />
            <circle cx={x(i)} cy={y(p)} r={hover === i ? 7 : 5} fill="#fff" stroke="#9b1844" strokeWidth="2.5" />
          </g>
        )}
        {hover !== null && (() => {
          const tx = x(hover),ty = y(points[hover]);
          return (
            <g style={{ pointerEvents: 'none' }}>
              <line x1={tx} x2={tx} y1={PT} y2={H - PB} stroke="#9b1844" opacity=".25" strokeDasharray="2 3" />
              <rect x={tx - 58} y={ty - 46} width="116" height="34" rx="6" fill="#1e1e1e" opacity=".95" />
              <text x={tx} y={ty - 30} textAnchor="middle" fontSize="11" fill="#fff" opacity=".7" fontFamily="Inter">R{hover + 1} · {subj._avgs ? subj._avgs[hover].toFixed(2) : subj.grades[hover]}</text>
              <text x={tx} y={ty - 16} textAnchor="middle" fontSize="11" fill="#fff" fontFamily="Inter">{subj._avgs ? 'Average across subjects' : GRADE_FULL[subj.grades[hover]]}</text>
            </g>);

        })()}
      </svg>
    </div>);

};

const Heatmap = ({ heatHover, setHeatHover, setSubjectId, subjectId }) => {
  return (
    <div className="heat-wrap">
      <div className="heat-grid" style={{ gridTemplateColumns: `140px repeat(${TARGET_CODES.length}, 1fr)` }}>
        {/* header row */}
        <div className="heat-cell heat-corner" />
        {TARGET_CODES.map((t) =>
        <div key={t.code} className="heat-head"
        onMouseEnter={() => setHeatHover({ code: t.code, label: t.label, type: 'col' })}
        onMouseLeave={() => setHeatHover(null)}>
            {t.code}
          </div>
        )}
        {/* rows */}
        {SUBJECTS.map((s) =>
        <React.Fragment key={s.id}>
            <button className={`heat-rowhead ${subjectId === s.id ? 'active' : ''}`} onClick={() => setSubjectId(s.id)}>
              {s.name}
            </button>
            {TARGET_CODES.map((t) => {
            const v = (TARGETS_MATRIX[s.id] || {})[t.code] || 0;
            const isHover = heatHover && heatHover.subj === s.id && heatHover.code === t.code;
            return (
              <div key={t.code} className={`heat-cell heat-v-${v} ${isHover ? 'heat-hover' : ''}`}
              style={{ background: heatColor(v) }}
              onMouseEnter={() => setHeatHover({ subj: s.id, subjName: s.name, code: t.code, label: t.label, value: v, type: 'cell' })}
              onMouseLeave={() => setHeatHover(null)}>
                  {v > 0 && <span className="heat-num">{v}</span>}
                </div>);

          })}
          </React.Fragment>
        )}
      </div>
      <div className="heat-tooltip-area">
        {heatHover && heatHover.type === 'cell' &&
        <div className="heat-tip">
            <div className="heat-tip-code">{heatHover.code}</div>
            <div>
              <div className="heat-tip-label"><strong>{heatHover.subjName}</strong> — {heatHover.label}</div>
              <div className="heat-tip-meta">Set in {heatHover.value} of 6 reporting periods</div>
            </div>
          </div>
        }
        {heatHover && heatHover.type === 'col' &&
        <div className="heat-tip">
            <div className="heat-tip-code">{heatHover.code}</div>
            <div>
              <div className="heat-tip-label">{heatHover.label}</div>
              <div className="heat-tip-meta">Hover a cell to see how often this is set per subject</div>
            </div>
          </div>
        }
        {!heatHover &&
        <div className="heat-tip heat-tip-muted">
            <div className="heat-tip-code">?</div>
            <div>
              <div className="heat-tip-label">Hover any cell or column to see the full target description.</div>
              <div className="heat-tip-meta">Click a subject name to filter the graph above.</div>
            </div>
          </div>
        }
      </div>
    </div>);

};

Object.assign(window, { InterimScreen });