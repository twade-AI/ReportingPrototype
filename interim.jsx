// interim.jsx — Interim Report Data screen
const { useState: useStateI, useMemo: useMemoI } = React;

const InterimScreen = ({ onNav }) => {
  const [subjectId, setSubjectId] = useStateI('maths');
  const [hover, setHover] = useStateI(null);
  const [tutorOpen, setTutorOpen] = useStateI(false);
  const [activeTicket, setActiveTicket] = useStateI('yellow');
  const [attendanceOpen, setAttendanceOpen] = useStateI(false);
  const [focusView, setFocusView] = useStateI('cloud');
  // 'atl-in' | 'atl-out' | 'atl-combined' | 'attainment' | 'overlay'
  const [attView, setAttView] = useStateI('atl-in');

  const subj = subjectId === 'all'
    ? (() => {
        const inAvgs = [];
        const outAvgs = [];
        const attAvgs = [];
        for (let i = 0; i < 6; i++) {
          inAvgs.push(SUBJECTS.reduce((s, sub) => s + GRADE_VALUES[sub.grades[i]], 0) / SUBJECTS.length);
          outAvgs.push(SUBJECTS.reduce((s, sub) => s + GRADE_VALUES[sub.gradesOutside[i]], 0) / SUBJECTS.length);
          attAvgs.push(SUBJECTS.reduce((s, sub) => s + sub.attainment[i], 0) / SUBJECTS.length);
        }
        const nearestGrade = (avg) => GRADE_LABELS.reduce((best, lab) =>
          Math.abs(GRADE_VALUES[lab] - avg) < Math.abs(GRADE_VALUES[best] - avg) ? lab : best, GRADE_LABELS[0]);
        const attTargetAvg = SUBJECTS.reduce((s, sub) => s + sub.attainmentTarget, 0) / SUBJECTS.length;
        return {
          id: 'all',
          name: 'All subjects',
          teacher: 'Average across all 10 subjects',
          target: 'EE',
          grades: inAvgs.map(nearestGrade),
          gradesOutside: outAvgs.map(nearestGrade),
          _avgs: inAvgs,
          _outAvgs: outAvgs,
          attainment: attAvgs,
          attainmentTarget: attTargetAvg,
          _attAvgs: attAvgs,
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
          <div key={g} className={`leg-box leg-box-${g}`}>
              <div className={`leg-box-code grade-${g}`}>{g}</div>
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

      {/* Compare all subjects */}
      <Card kicker="All subjects · R6" title="Latest grade snapshot">
        <div className="snapshot">
          {SUBJECTS.map((s) => {
            const att = s.attainment[5];
            const at = att >= s.attainmentTarget;
            return (
              <button key={s.id} className={`snap ${subjectId === s.id ? 'snap-active' : ''}`} onClick={() => setSubjectId(s.id)}>
                <div className="snap-name">{s.name}</div>
                <div className={`snap-grade ${at ? 'g-ok' : 'g-warn'}`}>{att}</div>
                <div className="snap-target">target {s.attainmentTarget}</div>
                <div className="snap-atl">
                  <GradeBadge code={s.grades[5]} />
                  <span className="snap-atl-sep">·</span>
                  <GradeBadge code={s.gradesOutside[5]} />
                </div>
              </button>);

          })}
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
          <div className="subj-pill"><span className="lab">ATL · classroom</span><span className="val"><GradeBadge code={subj.grades[5]} /></span></div>
          <div className="subj-pill"><span className="lab">ATL · outside</span><span className="val"><GradeBadge code={subj.gradesOutside[5]} /></span></div>
          <div className="subj-pill"><span className="lab">Latest attainment</span><span className="val">{subj._attAvgs ? subj.attainment[5].toFixed(2) : subj.attainment[5]}</span></div>
          <div className="subj-pill"><span className="lab">Attainment target</span><span className="val val-target">{subj._attAvgs ? subj.attainmentTarget.toFixed(1) : subj.attainmentTarget}</span></div>
          <div className="subj-pill"><span className="lab">Trend</span><span className="val">
            {subj.attainment[5] > subj.attainment[0] ? '↗ Improving' :
              subj.attainment[5] < subj.attainment[0] ? '↘ Declining' : '→ Steady'}
          </span></div>
        </div>
        <div className="view-toggle view-toggle-wide" role="tablist" style={{ margin: '4px 0 12px' }}>
          <button role="tab" aria-selected={attView === 'atl-in'} className={`vt-btn ${attView === 'atl-in' ? 'active' : ''}`} onClick={() => setAttView('atl-in')}>ATL · Classroom</button>
          <button role="tab" aria-selected={attView === 'atl-out'} className={`vt-btn ${attView === 'atl-out' ? 'active' : ''}`} onClick={() => setAttView('atl-out')}>ATL · Outside</button>
          <button role="tab" aria-selected={attView === 'atl-combined'} className={`vt-btn ${attView === 'atl-combined' ? 'active' : ''}`} onClick={() => setAttView('atl-combined')}>ATL · Combined</button>
          <button role="tab" aria-selected={attView === 'attainment'} className={`vt-btn ${attView === 'attainment' ? 'active' : ''}`} onClick={() => setAttView('attainment')}>Attainment</button>
          <button role="tab" aria-selected={attView === 'overlay'} className={`vt-btn ${attView === 'overlay' ? 'active' : ''}`} onClick={() => setAttView('overlay')}>Overlay</button>
        </div>
        {attView === 'atl-in' &&
        <>
            <ATLGraph subj={subj} hover={hover} setHover={setHover} field="in" />
            <div className="legend-row">
              <span><i className="leg-line-solid" /> {subj.name} — ATL in the classroom</span>
            </div>
          </>
        }
        {attView === 'atl-out' &&
        <>
            <ATLGraph subj={subj} hover={hover} setHover={setHover} field="out" />
            <div className="legend-row">
              <span><i className="leg-line-solid leg-out" /> {subj.name} — ATL outside the classroom</span>
            </div>
          </>
        }
        {attView === 'atl-combined' &&
        <>
            <ATLGraph subj={subj} hover={hover} setHover={setHover} field="combined" />
            <div className="legend-row">
              <span><i className="leg-line-solid" /> ATL in the classroom</span>
              <span><i className="leg-line-solid leg-out" /> ATL outside the classroom</span>
            </div>
          </>
        }
        {attView === 'attainment' &&
        <>
            <AttainGraph subj={subj} hover={hover} setHover={setHover} />
            <div className="legend-row">
              <span><i className="leg-line-solid leg-att" /> {subj.name} attainment (4–9)</span>
              <span><i className="leg-line-dash leg-att" /> Target ({subj._attAvgs ? subj.attainmentTarget.toFixed(1) : subj.attainmentTarget})</span>
            </div>
          </>
        }
        {attView === 'overlay' &&
        <>
            <OverlayGraph subj={subj} hover={hover} setHover={setHover} />
            <div className="legend-row">
              <span><i className="leg-line-solid" /> ATL · classroom</span>
              <span><i className="leg-line-solid leg-out" /> ATL · outside</span>
              <span><i className="leg-line-solid leg-att" /> Attainment ({subj._attAvgs ? subj.attainmentTarget.toFixed(1) : subj.attainmentTarget} target)</span>
            </div>
          </>
        }
        <CycleDetail subj={subj} hover={hover} />
      </Card>

      <Card kicker="Targets & praise · whole year" title="Focus across the year"
      action={
      <div className="view-toggle" role="tablist">
            <button role="tab" aria-selected={focusView === 'cloud'} className={`vt-btn ${focusView === 'cloud' ? 'active' : ''}`} onClick={() => setFocusView('cloud')}>Cloud</button>
            <button role="tab" aria-selected={focusView === 'subjects'} className={`vt-btn ${focusView === 'subjects' ? 'active' : ''}`} onClick={() => setFocusView('subjects')}>By subject</button>
          </div>
      }>
        <p className="card-blurb">
          {focusView === 'cloud' ?
          <>The two clouds combine every subject and every cycle: <strong>Areas to grow</strong> shows the most-set target codes and <strong>Going well</strong> shows the most-awarded praise codes. Bigger, bolder chips appear more often. Hover any chip for the full description.</> :

          <>One card per subject showing its top targets and top praise codes. Click a card to load that subject into the graph above.</>
          }
        </p>
        {focusView === 'cloud' ?
        <ChipClouds stats={focusStats(SUBJECTS.map((s) => s.id))} /> :

        <div className="focus-grid">
            {SUBJECTS.map((s) =>
          <FocusCard
            key={s.id}
            title={s.name}
            subtitle={`Attainment ${s.attainment[5]} · target ${s.attainmentTarget}`}
            stats={focusStats([s.id])}
            topN={3}
            active={subjectId === s.id}
            onSelect={() => setSubjectId(s.id)} />

          )}
          </div>
        }
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
  const inGrade = subj.grades[idx];
  const outGrade = subj.gradesOutside[idx];
  const attRaw = subj.attainment[idx];
  const att = subj._attAvgs ? attRaw.toFixed(2) : attRaw;
  const isPinned = hover == null;
  return (
    <div className="cycle-detail">
      <div className="cd-head">
        <div className="cd-head-left">
          <span className="cd-cycle">R{idx + 1}</span>
          <span className="cd-stack">
            <span className="cd-stack-lab">ATL · class</span>
            <GradeBadge code={inGrade} />
          </span>
          <span className="cd-stack">
            <span className="cd-stack-lab">ATL · out</span>
            <GradeBadge code={outGrade} />
          </span>
          <span className="cd-stack">
            <span className="cd-stack-lab">Attainment</span>
            <span className="cd-grade">{att}</span>
          </span>
        </div>
        <span className="cd-hint">{isPinned ? 'Latest cycle · hover the graph to explore others' : `Hovering R${idx + 1}`}</span>
      </div>
      <div className="cd-body">
        <div className="cd-col cd-col-target">
          <div className="cd-col-kicker">Target this cycle</div>
          <div className="cd-target">
            <span className="cd-code cd-code-target code-tip" data-desc={targetLabel(detail.target)}>{detail.target}</span>
            <span className="cd-code-label">{targetLabel(detail.target)}</span>
          </div>
        </div>
        <div className="cd-col cd-col-praise">
          <div className="cd-col-kicker">What's going well</div>
          <ul className="cd-praise-list">
            {detail.praise.map((code) =>
            <li key={code} className="cd-praise-row">
                <span className="cd-code cd-code-praise code-tip" data-desc={praiseLabel(code)}>{code}</span>
                <span className="cd-code-label">{praiseLabel(code)}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>);

};

// Aggregate target / praise code counts across one or many subjects.
// Returns sorted lists with code, count, and the total cycles examined (for
// computing relative bar widths).
const focusStats = (subjectIds) => {
  const targets = {};
  const praise = {};
  let totalCycles = 0;
  subjectIds.forEach((id) => {
    const cycles = REPORTING_DETAILS[id] || [];
    totalCycles += cycles.length;
    cycles.forEach((c) => {
      targets[c.target] = (targets[c.target] || 0) + 1;
      c.praise.forEach((p) => {praise[p] = (praise[p] || 0) + 1;});
    });
  });
  const sortDesc = (obj) =>
  Object.entries(obj).
  sort((a, b) => b[1] - a[1]).
  map(([code, count]) => ({ code, count }));
  return { targets: sortDesc(targets), praise: sortDesc(praise), totalCycles };
};

const FocusCard = ({ title, subtitle, stats, topN = 3, combined = false, active = false, onSelect }) => {
  const targetMax = stats.targets[0] ? stats.targets[0].count : 1;
  const praiseMax = stats.praise[0] ? stats.praise[0].count : 1;
  const topTargets = stats.targets.slice(0, topN);
  const topPraise = stats.praise.slice(0, topN);
  const className = `focus-card ${combined ? 'focus-card-combined' : ''} ${active ? 'focus-card-active' : ''} ${onSelect ? 'focus-card-clickable' : ''}`.trim();

  const Inner = (
    <>
      <div className="focus-head">
        <div className="focus-title">{title}</div>
        <div className="focus-sub">{subtitle}</div>
      </div>
      <div className="focus-section">
        <div className="focus-section-kicker focus-kicker-target">Top targets</div>
        <ul className="focus-list">
          {topTargets.map((t) =>
          <li key={t.code} className="focus-row">
              <span className="focus-code focus-code-target code-tip" data-desc={targetLabel(t.code)}>{t.code}</span>
              <div className="focus-bar-wrap">
                <div className="focus-bar focus-bar-target" style={{ width: `${t.count / targetMax * 100}%` }} />
              </div>
              <span className="focus-count">{t.count}</span>
            </li>
          )}
        </ul>
      </div>
      <div className="focus-section">
        <div className="focus-section-kicker focus-kicker-praise">Top praise</div>
        <ul className="focus-list">
          {topPraise.map((p) =>
          <li key={p.code} className="focus-row">
              <span className="focus-code focus-code-praise code-tip" data-desc={praiseLabel(p.code)}>{p.code}</span>
              <div className="focus-bar-wrap">
                <div className="focus-bar focus-bar-praise" style={{ width: `${p.count / praiseMax * 100}%` }} />
              </div>
              <span className="focus-count">{p.count}</span>
            </li>
          )}
        </ul>
      </div>
    </>);


  if (onSelect) {
    return <button type="button" className={className} onClick={onSelect}>{Inner}</button>;
  }
  return <div className={className}>{Inner}</div>;
};

const ChipClouds = ({ stats }) => {
  const renderCloud = (codes, type, lookup) => {
    const max = codes.length ? codes[0].count : 1;
    return (
      <div className={`cloud cloud-${type}`}>
        <div className="cloud-head">
          <div>
            <div className="cloud-kicker">{type === 'target' ? 'Areas to grow' : 'Going well'}</div>
            <div className="cloud-title">
              {type === 'target' ? 'Targets set most often' : 'Praise awarded most often'}
            </div>
          </div>
          <div className="cloud-meta">{codes.length} codes · {codes.reduce((s, c) => s + c.count, 0)} occurrences</div>
        </div>
        <div className="cloud-chips">
          {codes.map(({ code, count }) => {
            const intensity = count / max;
            const fontSize = 11 + intensity * 16;
            const padV = 4 + intensity * 6;
            const padH = 8 + intensity * 10;
            const isStrong = intensity > 0.55;
            return (
              <span
                key={code}
                className={`cloud-chip cloud-chip-${type} ${isStrong ? 'cloud-chip-strong' : ''} code-tip`}
                data-desc={lookup(code)}
                style={{
                  fontSize: `${fontSize}px`,
                  padding: `${padV}px ${padH}px`,
                  '--chip-opacity': (0.18 + intensity * 0.82).toFixed(3),
                }}>
                {code}<span className="cloud-count">{count}</span>
              </span>);

          })}
        </div>
      </div>);

  };
  return (
    <div className="clouds-wrap">
      {renderCloud(stats.targets, 'target', targetLabel)}
      {renderCloud(stats.praise, 'praise', praiseLabel)}
    </div>);

};

// Shared smoothing helper for line graphs
const smoothPath = (xy) =>
xy.map(({ x, y }, i, arr) => {
  if (i === 0) return `M${x},${y}`;
  const prev = arr[i - 1];
  const mx = (prev.x + x) / 2;
  return `C${mx},${prev.y} ${mx},${y} ${x},${y}`;
}).join(' ');

// ATL graph — letter-grade scale (NI/ME/EE/E), no target line.
// `field` = 'in' | 'out' | 'combined' (combined draws both lines).
const ATLGraph = ({ subj, hover, setHover, field = 'in' }) => {
  const W = 800,H = 320,PL = 60,PR = 30,PT = 24,PB = 40;
  const x = (i) => PL + i * (W - PL - PR) / 5;
  const y = (v) => H - PB - (v - 1) / 3 * (H - PT - PB);

  const inPts = subj._avgs ? subj._avgs : subj.grades.map((g) => GRADE_VALUES[g]);
  const outPts = subj._outAvgs ? subj._outAvgs : subj.gradesOutside.map((g) => GRADE_VALUES[g]);
  const primary = field === 'out' ? outPts : inPts;
  const secondary = field === 'combined' ? outPts : null;
  const primaryColour = field === 'out' ? '#0f7a8a' : '#9b1844';
  const yearAvg = [2.0, 2.1, 2.3, 2.4, 2.6, 2.7];
  const toXY = (pts) => pts.map((p, i) => ({ x: x(i), y: y(p) }));

  return (
    <div className="biggraph-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="biggraph" preserveAspectRatio="xMidYMid meet">
        {/* y gridlines + grade labels (with hover description) */}
        {[1, 2, 3, 4].map((v) =>
        <g key={v}>
            <line x1={PL} x2={W - PR} y1={y(v)} y2={y(v)} stroke="currentColor" opacity=".10" />
            <text x={PL - 12} y={y(v) + 4} textAnchor="end" fontSize="13" fontWeight="700"
            className={`grade-axis grade-${GRADE_LABELS[v - 1]}`}
            fontFamily="Inter">
              <title>{`${GRADE_LABELS[v - 1]} — ${GRADE_FULL[GRADE_LABELS[v - 1]]}`}</title>
              {GRADE_LABELS[v - 1]}
            </text>
          </g>
        )}
        {[0, 1, 2, 3, 4, 5].map((i) =>
        <text key={i} x={x(i)} y={H - 12} textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor" opacity=".7" fontFamily="Inter">R{i + 1}</text>
        )}

        {/* year average */}
        <path d={smoothPath(toXY(yearAvg))} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" opacity=".4" />

        {/* secondary line (combined view: outside ATL) */}
        {secondary &&
        <path d={smoothPath(toXY(secondary))} fill="none" stroke="#0f7a8a" strokeWidth="3" strokeLinecap="round" strokeDasharray="0" opacity=".95" />
        }
        {secondary && secondary.map((p, i) =>
        <circle key={`s${i}`} cx={x(i)} cy={y(p)} r="4.5" fill="#fff" stroke="#0f7a8a" strokeWidth="2.5" />
        )}

        {/* primary line */}
        <path d={smoothPath(toXY(primary))} fill="none" stroke={primaryColour} strokeWidth="3" strokeLinecap="round" />
        {primary.map((p, i) =>
        <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <circle cx={x(i)} cy={y(p)} r="14" fill="transparent" />
            <circle cx={x(i)} cy={y(p)} r={hover === i ? 7 : 5} fill="#fff" stroke={primaryColour} strokeWidth="2.5" />
          </g>
        )}
        {hover !== null && (() => {
          const tx = x(hover),ty = y(primary[hover]);
          const arr = field === 'out' ? subj.gradesOutside : subj.grades;
          const labelGrade = subj._avgs && field !== 'out' ? subj._avgs[hover].toFixed(2) :
          subj._outAvgs && field === 'out' ? subj._outAvgs[hover].toFixed(2) :
          arr[hover];
          const fullLabel = subj._avgs ? 'Average across subjects' : GRADE_FULL[arr[hover]];
          return (
            <g style={{ pointerEvents: 'none' }}>
              <line x1={tx} x2={tx} y1={PT} y2={H - PB} stroke={primaryColour} opacity=".25" strokeDasharray="2 3" />
              <rect x={tx - 70} y={ty - 46} width="140" height="34" rx="6" fill="#1e1e1e" opacity=".95" />
              <text x={tx} y={ty - 30} textAnchor="middle" fontSize="11" fill="#fff" opacity=".7" fontFamily="Inter">R{hover + 1} · {labelGrade}</text>
              <text x={tx} y={ty - 16} textAnchor="middle" fontSize="11" fill="#fff" fontFamily="Inter">{fullLabel}</text>
            </g>);

        })()}
      </svg>
    </div>);

};

// Numeric attainment graph (4–9 scale, with target line).
const AttainGraph = ({ subj, hover, setHover }) => {
  const W = 800,H = 320,PL = 60,PR = 30,PT = 24,PB = 40;
  const x = (i) => PL + i * (W - PL - PR) / 5;
  const y = (v) => H - PB - (v - 4) / 5 * (H - PT - PB);
  const points = subj.attainment;
  const target = subj.attainmentTarget;
  const toXY = (pts) => pts.map((p, i) => ({ x: x(i), y: y(p) }));

  return (
    <div className="biggraph-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="biggraph" preserveAspectRatio="xMidYMid meet">
        {[4, 5, 6, 7, 8, 9].map((v) =>
        <g key={v}>
            <line x1={PL} x2={W - PR} y1={y(v)} y2={y(v)} stroke="currentColor" opacity=".10" />
            <text x={PL - 12} y={y(v) + 4} textAnchor="end" fontSize="13" fontWeight="600" fill="currentColor" opacity=".7" fontFamily="Inter">{v}</text>
          </g>
        )}
        {[0, 1, 2, 3, 4, 5].map((i) =>
        <text key={i} x={x(i)} y={H - 12} textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor" opacity=".7" fontFamily="Inter">R{i + 1}</text>
        )}

        {/* target line */}
        <line x1={PL} x2={W - PR} y1={y(target)} y2={y(target)}
        stroke="#0f7a8a" strokeWidth="1.5" strokeDasharray="6 5" opacity=".7" />
        <text x={W - PR - 6} y={y(target) - 6} textAnchor="end" fontSize="11" fill="#0f7a8a" fontWeight="700" fontFamily="Inter">Target {subj._attAvgs ? target.toFixed(1) : target}</text>

        <path d={smoothPath(toXY(points))} fill="none" stroke="#0f7a8a" strokeWidth="3" strokeLinecap="round" />
        {points.map((p, i) =>
        <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <circle cx={x(i)} cy={y(p)} r="14" fill="transparent" />
            <circle cx={x(i)} cy={y(p)} r={hover === i ? 7 : 5} fill="#fff" stroke="#0f7a8a" strokeWidth="2.5" />
          </g>
        )}
        {hover !== null && (() => {
          const tx = x(hover),ty = y(points[hover]);
          const val = subj._attAvgs ? subj.attainment[hover].toFixed(2) : subj.attainment[hover];
          return (
            <g style={{ pointerEvents: 'none' }}>
              <line x1={tx} x2={tx} y1={PT} y2={H - PB} stroke="#0f7a8a" opacity=".25" strokeDasharray="2 3" />
              <rect x={tx - 60} y={ty - 36} width="120" height="24" rx="6" fill="#1e1e1e" opacity=".95" />
              <text x={tx} y={ty - 20} textAnchor="middle" fontSize="11" fill="#fff" fontFamily="Inter">R{hover + 1} · grade {val}</text>
            </g>);

        })()}
      </svg>
    </div>);

};

// Overlay graph — three lines (ATL classroom, ATL outside, attainment) on dual y-axes.
const OverlayGraph = ({ subj, hover, setHover }) => {
  const W = 800,H = 340,PL = 60,PR = 60,PT = 24,PB = 40;
  const x = (i) => PL + i * (W - PL - PR) / 5;
  const yATL = (v) => H - PB - (v - 1) / 3 * (H - PT - PB);
  const yAtt = (v) => H - PB - (v - 4) / 5 * (H - PT - PB);

  const inPts = subj._avgs ? subj._avgs : subj.grades.map((g) => GRADE_VALUES[g]);
  const outPts = subj._outAvgs ? subj._outAvgs : subj.gradesOutside.map((g) => GRADE_VALUES[g]);
  const attPts = subj.attainment;

  const toXY = (pts, yFn) => pts.map((p, i) => ({ x: x(i), y: yFn(p) }));

  return (
    <div className="biggraph-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="biggraph" preserveAspectRatio="xMidYMid meet">
        {/* left axis labels (ATL letters) */}
        {[1, 2, 3, 4].map((v) =>
        <g key={`l${v}`}>
            <line x1={PL} x2={W - PR} y1={yATL(v)} y2={yATL(v)} stroke="currentColor" opacity=".06" />
            <text x={PL - 12} y={yATL(v) + 4} textAnchor="end" fontSize="13" fontWeight="700"
            className={`grade-axis grade-${GRADE_LABELS[v - 1]}`}
            fontFamily="Inter">
              <title>{`${GRADE_LABELS[v - 1]} — ${GRADE_FULL[GRADE_LABELS[v - 1]]}`}</title>
              {GRADE_LABELS[v - 1]}
            </text>
          </g>
        )}
        {/* right axis labels (attainment numbers) */}
        {[4, 5, 6, 7, 8, 9].map((v) =>
        <text key={`r${v}`} x={W - PR + 12} y={yAtt(v) + 4} textAnchor="start" fontSize="12" fontWeight="600" fill="#0f7a8a" opacity=".85" fontFamily="Inter">{v}</text>
        )}
        {/* x labels */}
        {[0, 1, 2, 3, 4, 5].map((i) =>
        <text key={i} x={x(i)} y={H - 12} textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor" opacity=".7" fontFamily="Inter">R{i + 1}</text>
        )}

        {/* attainment target line (right-axis scale) */}
        <line x1={PL} x2={W - PR} y1={yAtt(subj.attainmentTarget)} y2={yAtt(subj.attainmentTarget)}
        stroke="#0f7a8a" strokeWidth="1.5" strokeDasharray="6 5" opacity=".55" />

        {/* ATL outside (dashed magenta-2) */}
        <path d={smoothPath(toXY(outPts, yATL))} fill="none" stroke="#b9607d" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" opacity=".95" />
        {outPts.map((p, i) =>
        <circle key={`o${i}`} cx={x(i)} cy={yATL(p)} r="4" fill="#fff" stroke="#b9607d" strokeWidth="2" />
        )}

        {/* ATL in classroom (solid magenta) */}
        <path d={smoothPath(toXY(inPts, yATL))} fill="none" stroke="#9b1844" strokeWidth="3" strokeLinecap="round" />
        {inPts.map((p, i) =>
        <g key={`i${i}`} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <circle cx={x(i)} cy={yATL(p)} r="14" fill="transparent" />
            <circle cx={x(i)} cy={yATL(p)} r={hover === i ? 7 : 5} fill="#fff" stroke="#9b1844" strokeWidth="2.5" />
          </g>
        )}

        {/* Attainment (teal, right-axis) */}
        <path d={smoothPath(toXY(attPts, yAtt))} fill="none" stroke="#0f7a8a" strokeWidth="3" strokeLinecap="round" />
        {attPts.map((p, i) =>
        <circle key={`a${i}`} cx={x(i)} cy={yAtt(p)} r="4.5" fill="#fff" stroke="#0f7a8a" strokeWidth="2.5" />
        )}

        {hover !== null && (() => {
          const tx = x(hover);
          const inGrade = subj._avgs ? subj._avgs[hover].toFixed(2) : subj.grades[hover];
          const outGrade = subj._outAvgs ? subj._outAvgs[hover].toFixed(2) : subj.gradesOutside[hover];
          const att = subj._attAvgs ? subj.attainment[hover].toFixed(2) : subj.attainment[hover];
          const tipY = PT + 6;
          return (
            <g style={{ pointerEvents: 'none' }}>
              <line x1={tx} x2={tx} y1={PT} y2={H - PB} stroke="#9b1844" opacity=".25" strokeDasharray="2 3" />
              <rect x={tx - 80} y={tipY} width="160" height="62" rx="6" fill="#1e1e1e" opacity=".95" />
              <text x={tx} y={tipY + 16} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700" fontFamily="Inter">R{hover + 1}</text>
              <text x={tx} y={tipY + 31} textAnchor="middle" fontSize="11" fill="#fff" opacity=".85" fontFamily="Inter">ATL · class {inGrade}</text>
              <text x={tx} y={tipY + 44} textAnchor="middle" fontSize="11" fill="#fff" opacity=".85" fontFamily="Inter">ATL · out {outGrade}</text>
              <text x={tx} y={tipY + 57} textAnchor="middle" fontSize="11" fill="#fff" opacity=".85" fontFamily="Inter">Attainment {att}</text>
            </g>);

        })()}
      </svg>
    </div>);

};

// Small grade-letter chip with hover description; "E" gets the gold treatment.
const GradeBadge = ({ code }) => {
  if (code == null) return null;
  return (
    <span className={`grade-badge grade-${code} code-tip`} data-desc={`${code} — ${GRADE_FULL[code] || ''}`}>
      {code}
    </span>);

};

Object.assign(window, { InterimScreen });