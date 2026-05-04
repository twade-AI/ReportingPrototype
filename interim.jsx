// interim.jsx — Interim Report Data screen
const { useState: useStateI, useMemo: useMemoI } = React;

const InterimScreen = ({ onNav }) => {
  const [subjectId, setSubjectId] = useStateI('maths');
  const [hover, setHover] = useStateI(null);
  const [heatHover, setHeatHover] = useStateI(null);
  const [tutorOpen, setTutorOpen] = useStateI(false);
  const [activeTicket, setActiveTicket] = useStateI('yellow');
  const [attendanceOpen, setAttendanceOpen] = useStateI(false);

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

      {/* Tickets row */}
      <section className="tickets">
        {['yellow','blue','green'].map(k => {
          const t = TICKETS[k];
          const isActive = activeTicket === k;
          return (
            <button key={k} className={`ticket ${isActive?'active':''}`} onClick={()=>setActiveTicket(k)}
              style={{'--tc': t.color}}>
              <Lightbulb color={t.color} lit={isActive} size={52}/>
              <div className="ticket-meta">
                <div className="ticket-label">{t.label}</div>
                <div className="ticket-sub">{t.sub}</div>
              </div>
              <div className="ticket-count">{t.count}</div>
            </button>
          );
        })}
      </section>

      {/* Recent ticket detail */}
      <section className="ticket-detail" style={{'--tc': TICKETS[activeTicket].color}}>
        <div className="card-head">
          <div>
            <div className="kicker" style={{color:TICKETS[activeTicket].color}}>Most recent · {TICKETS[activeTicket].label}</div>
            <h3 className="card-title-sm">{TICKETS[activeTicket].sub}</h3>
          </div>
          <a className="link-action" onClick={()=>alert('Full ticket history')}>View all {TICKETS[activeTicket].count} →</a>
        </div>
        <ul className="ticket-list">
          {TICKETS[activeTicket].recent.map((r,i) => (
            <li key={i} className="ticket-row">
              <div className="ticket-row-left">
                <div className="ticket-row-subj">{r.subject}</div>
                <div className="ticket-row-teacher">{r.teacher}</div>
              </div>
              <div className="ticket-row-note">"{r.note}"</div>
              <div className="ticket-row-date">{r.date}</div>
            </li>
          ))}
        </ul>
      </section>

      <Card kicker="Interim Report · summary" title="Average grade trajectory">
        <MiniGraph/>
        <div className="mini-legend">
          <span><i className="leg-dot" style={{background:'#9b1844'}}/> Average attainment</span>
          <span><i className="leg-line"/> Target band: EE</span>
        </div>
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
        <CycleDetail subj={subj} hover={hover} />
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

      {/* Attendance — collapsible */}
      <Card kicker="Attendance · last 16 weeks" title="Recent attendance"
        action={
          <div className="att-action">
            <span className="big-stat">{ATTENDANCE.overall}<span className="pct">%</span></span>
            <button className="btn-ghost" onClick={()=>setAttendanceOpen(o=>!o)} aria-expanded={attendanceOpen}>
              {attendanceOpen ? 'Hide' : 'Show'} →
            </button>
          </div>
        }>
        {attendanceOpen ? (
          <>
            <AttendanceBars/>
            <div className="att-legend">
              <span><i className="att-sw" style={{background:'#1f9d6b'}}/> Authorised abs. {ATTENDANCE.authorisedAbsence}%</span>
              <span><i className="att-sw" style={{background:'#f5b800'}}/> Late {ATTENDANCE.late}%</span>
              <span><i className="att-sw" style={{background:'#c33'}}/> Unauth. {ATTENDANCE.unauthorisedAbsence}%</span>
            </div>
          </>
        ) : (
          <div className="tt-collapsed">Overall {ATTENDANCE.overall}% across the last 16 weeks. Click <strong>Show</strong> to see the weekly breakdown.</div>
        )}
      </Card>

      <footer className="footnote">
        Data drawn live from the Haileybury reporting database · Last sync 05:58 BST
      </footer>
    </div>);

};

// Mini line graph — average across all subjects across R1..R6
const MiniGraph = () => {
  const W = 560, H = 140, P = 28;
  const points = [0,1,2,3,4,5].map(i => {
    const avg = SUBJECTS.reduce((s,sub)=> s + GRADE_VALUES[sub.grades[i]], 0) / SUBJECTS.length;
    return avg;
  });
  const x = (i) => P + (i*(W-P*2)/5);
  const y = (v) => H - P - ((v-1)/3)*(H-P*2);
  const smooth = points.map((p,i,arr)=>{
    if(i===0) return `M${x(i)},${y(p)}`;
    const px=x(i-1), py=y(arr[i-1]);
    const cx=x(i), cy=y(p);
    const mx=(px+cx)/2;
    return `C${mx},${py} ${mx},${cy} ${cx},${cy}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="minigraph" preserveAspectRatio="xMidYMid meet">
      <line x1={P} x2={W-P} y1={y(3)} y2={y(3)} stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity=".35"/>
      {[1,2,3,4].map(v => (
        <text key={v} x={P-6} y={y(v)+3} textAnchor="end" fontSize="10" fill="currentColor" opacity=".55" fontFamily="Inter">{GRADE_LABELS[v-1]}</text>
      ))}
      {[0,1,2,3,4,5].map(i => (
        <text key={i} x={x(i)} y={H-8} textAnchor="middle" fontSize="10" fill="currentColor" opacity=".55" fontFamily="Inter">R{i+1}</text>
      ))}
      <path d={smooth} fill="none" stroke="#9b1844" strokeWidth="2.2" strokeLinecap="round"/>
      {points.map((p,i)=>(
        <circle key={i} cx={x(i)} cy={y(p)} r="3.5" fill="#fff" stroke="#9b1844" strokeWidth="2"/>
      ))}
    </svg>
  );
};

const AttendanceBars = () => {
  const W = 560, H = 100, P = 12;
  const bw = (W - P*2) / ATTENDANCE.weeks.length - 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="attbars" preserveAspectRatio="xMidYMid meet">
      {ATTENDANCE.weeks.map((v,i) => {
        const h = ((v-90)/10) * (H - P*2);
        const x = P + i*(bw+4);
        const y = H - P - h;
        const c = v >= 98 ? '#1f9d6b' : v >= 95 ? '#f5b800' : '#c33';
        return <rect key={i} x={x} y={y} width={bw} height={Math.max(2,h)} rx="2" fill={c}/>;
      })}
      <line x1={P} x2={W-P} y1={H-P} y2={H-P} stroke="currentColor" opacity=".25"/>
    </svg>
  );
};

const targetLabel = (code) => (TARGET_CODES.find((t) => t.code === code) || {}).label || '';
const praiseLabel = (code) => (PRAISE_CODES.find((p) => p.code === code) || {}).label || '';

const CycleDetail = ({ subj, hover }) => {
  if (subj.id === 'all') {
    return (
      <div className="cycle-detail cycle-detail-muted">
        <div className="cd-empty">
          Select an individual subject to see the target and praise codes for each reporting cycle. Hover any point on the graph to focus a specific cycle.
        </div>
      </div>);

  }
  const idx = hover == null ? 5 : hover;
  const detail = (REPORTING_DETAILS[subj.id] || [])[idx];
  if (!detail) return null;
  const grade = subj.grades[idx];
  const isPinned = hover == null;
  return (
    <div className="cycle-detail">
      <div className="cd-head">
        <div className="cd-head-left">
          <span className="cd-cycle">R{idx + 1}</span>
          <span className="cd-grade">{grade}</span>
          <span className="cd-grade-full">{GRADE_FULL[grade]}</span>
        </div>
        <span className="cd-hint">{isPinned ? 'Latest cycle · hover the graph to explore others' : `Hovering R${idx + 1}`}</span>
      </div>
      <div className="cd-body">
        <div className="cd-col cd-col-target">
          <div className="cd-col-kicker">Target this cycle</div>
          <div className="cd-target">
            <span className="cd-code cd-code-target">{detail.target}</span>
            <span className="cd-code-label">{targetLabel(detail.target)}</span>
          </div>
        </div>
        <div className="cd-col cd-col-praise">
          <div className="cd-col-kicker">What's going well</div>
          <ul className="cd-praise-list">
            {detail.praise.map((code) =>
            <li key={code} className="cd-praise-row" title={praiseLabel(code)}>
                <span className="cd-code cd-code-praise">{code}</span>
                <span className="cd-code-label">{praiseLabel(code)}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
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