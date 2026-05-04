// home.jsx — Home / Overview screen for Haileybury Report
const { useState, useMemo } = React;

const HomeScreen = ({ onNav }) => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const [updateExpanded, setUpdateExpanded] = useState(false);
  const [timetableOpen, setTimetableOpen] = useState(false);
  const [openTodoId, setOpenTodoId] = useState(null);

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

      {/* Weekly timetable */}
      <Card kicker="Schedule · summer term" title="Weekly timetable"
        action={
          <button className="btn-ghost" onClick={()=>setTimetableOpen(o=>!o)} aria-expanded={timetableOpen}>
            {timetableOpen ? 'Hide' : 'Show'} →
          </button>
        }>
        {timetableOpen
          ? <Timetable/>
          : <div className="tt-collapsed">Six teaching days · 11 periods · colour-coded by subject. Click <strong>Show</strong> to expand.</div>}
      </Card>

      {/* To do List */}
      <Card kicker="Google Classroom · synced" title="To do List"
        action={<span className="meta-chip">{TODO_ITEMS.length} due this week</span>}>
        <TodoList items={TODO_ITEMS} openId={openTodoId} setOpenId={setOpenTodoId}/>
      </Card>

      {/* Reflective journal + Upcoming */}
      <div className="grid-2">
        <Card kicker="Pupil-led" title="Reflective journal"
          action={<a className="btn-ghost" href="https://twade-ai.github.io/ReflectiveJournal/" target="_blank" rel="noopener noreferrer">Open →</a>}>
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

const Timetable = () => {
  return (
    <div className="tt-wrap">
      <table className="tt">
        <thead>
          <tr>
            <th className="tt-corner">P</th>
            {TIMETABLE.days.map(d => <th key={d} className="tt-day">{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {TIMETABLE.periods.map((p, pi) => (
            <tr key={p.id} className={p.divider ? 'tt-row tt-row-half' : 'tt-row'}>
              <th className="tt-period">{p.label}</th>
              {TIMETABLE.cells[pi].map((cell, di) => {
                if (!cell) return <td key={di} className="tt-empty"/>;
                const c = SUBJECT_COLORS[cell.subject] || { bg:'#eee', fg:'#222' };
                return (
                  <td key={di} className="tt-cell" style={{background:c.bg, color:c.fg}} title={`${cell.subject} · ${cell.code} · ${cell.room}`}>
                    <div className="tt-subj">{cell.subject}</div>
                    <div className="tt-code">{cell.code}</div>
                    <div className="tt-room">{cell.room}</div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="tt-legend">
        {Object.entries(SUBJECT_COLORS).map(([s,c]) => (
          <span key={s} className="tt-leg" style={{background:c.bg, color:c.fg}}>{s}</span>
        ))}
      </div>
    </div>
  );
};

const TodoList = ({ items, openId, setOpenId }) => {
  const fmtDue = (iso) => {
    const d = new Date(iso);
    const day = d.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' });
    const time = d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit', hour12:false });
    return `${day} · ${time}`;
  };
  return (
    <ul className="todo-list">
      {items.map(item => {
        const isOpen = openId === item.id;
        return (
          <li key={item.id} className={`todo-row ${isOpen?'open':''}`}>
            <button className="todo-head" onClick={()=>setOpenId(isOpen ? null : item.id)} aria-expanded={isOpen}>
              <div className="todo-main">
                <div className="todo-title">{item.title}</div>
                <div className="todo-subj">{item.subject} · {item.teacher}</div>
              </div>
              <div className="todo-due">
                <div className="todo-due-label">Due</div>
                <div className="todo-due-when">{fmtDue(item.due)}</div>
              </div>
              <span className={`todo-chev ${isOpen?'open':''}`} aria-hidden>▾</span>
            </button>
            {isOpen && (
              <div className="todo-body">
                <div className="todo-body-kicker">Task description</div>
                <p>{item.description}</p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

Object.assign(window, { HomeScreen, TodoList });
