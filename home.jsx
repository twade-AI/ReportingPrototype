// home.jsx — Home / Overview screen for Haileybury Report
const { useState, useMemo } = React;

const HomeScreen = ({ onNav }) => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const [updateExpanded, setUpdateExpanded] = useState(false);
  const [activeTicket, setActiveTicket] = useState('yellow');

  return (
    <div className="page">
      {/* Hero header */}
      <section className="hero">
        <div className="hero-meta">
          <div className="hero-date">
            <span className="dot"/> Live · updated {dateStr}
          </div>
          <h1 className="hero-name">{PUPIL.firstName} <span className="hero-last">{PUPIL.lastName}</span></h1>
          <div className="hero-tags">
            <span className="tag">{PUPIL.year}</span>
            <span className="tag">{PUPIL.form}</span>
            <span className="tag">House: {PUPIL.house}</span>
            <span className="tag">Tutor: {PUPIL.tutor}</span>
          </div>
        </div>
        <div className="hero-portrait">
          <PupilPortrait size={128}/>
        </div>
      </section>

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

      {/* Pupil update */}
      <Card kicker="AI-generated · reviewed by tutor" title="Pupil update"
        action={<span className="meta-chip">Generated {PUPIL_UPDATE.generated}</span>}>
        <div className={`update-body ${updateExpanded?'expanded':''}`}>
          {PUPIL_UPDATE.body.split('\n\n').map((p,i)=> <p key={i}>{p}</p>)}
        </div>
        <button className="link-btn" onClick={()=>setUpdateExpanded(e=>!e)}>
          {updateExpanded ? 'Show less' : 'Read full update'}
        </button>
      </Card>

      {/* Two columns */}
      <div className="grid-2">
        <Card kicker="Interim Report · summary"
          title="Average grade trajectory"
          action={<button className="btn-primary" onClick={()=>onNav('interim')}>Open full data →</button>}>
          <MiniGraph/>
          <div className="mini-legend">
            <span><i className="leg-dot" style={{background:'#9b1844'}}/> Average attainment</span>
            <span><i className="leg-line"/> Target band: EE</span>
          </div>
        </Card>

        <Card kicker="Attendance · last 16 weeks" title="Recent attendance"
          action={<span className="big-stat">{ATTENDANCE.overall}<span className="pct">%</span></span>}>
          <AttendanceBars/>
          <div className="att-legend">
            <span><i className="att-sw" style={{background:'#1f9d6b'}}/> Authorised abs. {ATTENDANCE.authorisedAbsence}%</span>
            <span><i className="att-sw" style={{background:'#f5b800'}}/> Late {ATTENDANCE.late}%</span>
            <span><i className="att-sw" style={{background:'#c33'}}/> Unauth. {ATTENDANCE.unauthorisedAbsence}%</span>
          </div>
        </Card>
      </div>

      {/* Reflective journal + Upcoming */}
      <div className="grid-2">
        <Card kicker="Pupil-led" title="Reflective journal"
          action={<button className="btn-ghost" onClick={()=>alert('Opens reflective journal')}>Open →</button>}>
          <div className="journal-row">
            <div className="journal-stat">
              <div className="journal-num">23</div>
              <div className="journal-cap">entries this term</div>
            </div>
            <div className="journal-stat">
              <div className="journal-num">4.1<span className="pct">/5</span></div>
              <div className="journal-cap">avg confidence rating</div>
            </div>
            <div className="journal-stat">
              <div className="journal-num">Tue</div>
              <div className="journal-cap">last entry · 3 days ago</div>
            </div>
          </div>
          <div className="journal-quote">
            "Mechanics 2 is starting to click — I tried Dr Ramirez's approach of writing the SUVAT equations down before reading the question and it actually saved time."
            <div className="journal-cite">— from Olly's entry, 26 Apr</div>
          </div>
        </Card>

        <Card kicker="This fortnight" title="Sport & co-curricular fixtures">
          <ul className="fixture-list">
            {FIXTURES.map((f,i)=>(
              <li key={i} className="fixture-row">
                <div className="fix-date">
                  <div className="fix-day">{f.date.split(' ')[0]}</div>
                  <div className="fix-num">{f.date.split(' ')[1]} {f.date.split(' ')[2]}</div>
                </div>
                <div className="fix-meta">
                  <div className="fix-type">{f.type}</div>
                  <div className="fix-detail">{f.detail}</div>
                </div>
                <div className="fix-time">{f.time}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Upcoming areas of study */}
      <Card kicker="AI-generated · next half-term" title="Upcoming areas of study">
        <p className="upcoming-body">{UPCOMING_STUDY.body}</p>
        <div className="upcoming-grid">
          {UPCOMING_STUDY.highlights.map((h,i)=>(
            <div key={i} className="upcoming-pill">
              <div className="up-subj">{h.subject}</div>
              <div className="up-topic">{h.topic}</div>
            </div>
          ))}
        </div>
      </Card>

      <footer className="footnote">
        Haileybury · Hertford · Confidential to Mr & Mrs Whitfield · Generated 06:00 BST
      </footer>
    </div>
  );
};

// Mini line graph for homepage
const MiniGraph = () => {
  // Average across all subjects across R1..R6
  const W = 560, H = 140, P = 28;
  const points = [0,1,2,3,4,5].map(i => {
    const avg = SUBJECTS.reduce((s,sub)=> s + GRADE_VALUES[sub.grades[i]], 0) / SUBJECTS.length;
    return avg;
  });
  const x = (i) => P + (i*(W-P*2)/5);
  const y = (v) => H - P - ((v-1)/3)*(H-P*2);
  const path = points.map((p,i)=> `${i===0?'M':'L'}${x(i)},${y(p)}`).join(' ');
  // smooth via simple cubic
  const smooth = points.map((p,i,arr)=>{
    if(i===0) return `M${x(i)},${y(p)}`;
    const px=x(i-1), py=y(arr[i-1]);
    const cx=x(i), cy=y(p);
    const mx=(px+cx)/2;
    return `C${mx},${py} ${mx},${cy} ${cx},${cy}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="minigraph" preserveAspectRatio="xMidYMid meet">
      {/* target band EE = 3 */}
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

Object.assign(window, { HomeScreen });
