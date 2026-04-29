// shared.jsx — shared UI primitives for the Haileybury Report app
// Loaded after React + tweaks-panel; before page scripts.

const Logo = ({ size = 28, color = 'magenta' }) => {
  const src = color === 'white' ? 'assets/logo-white.png' : 'assets/logo-magenta.png';
  return <img src={src} alt="Haileybury" style={{ height: size, width: 'auto', display: 'block' }} />;
};

const TopBar = ({ active, onNav, theme, setTheme }) => {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" onClick={() => onNav('home')}>
          <Logo size={32} color={theme === 'dark' ? 'white' : 'magenta'} />
          <div className="brand-meta">
            <div className="brand-title">Haileybury</div>
            <div className="brand-sub">Parent Report</div>
          </div>
        </button>
        <nav className="topnav">
          <button className={active === 'home' ? 'tn active' : 'tn'} onClick={() => onNav('home')}>Overview</button>
          <button className={active === 'interim' ? 'tn active' : 'tn'} onClick={() => onNav('interim')}>Report Data</button>
          <button className="tn" onClick={() => alert('Reflective journal — not in this prototype')}>Reflective Journal</button>
          <button className="tn" onClick={() => alert('Communications — not in this prototype')}>Communications</button>
        </nav>
        <div className="topbar-right">
          <button className="theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <div className="parent-chip">
            <div className="avatar-init">SW</div>
            <div className="parent-meta">
              <div className="parent-name">Sarah Whitfield</div>
              <div className="parent-role">Parent of Olly · Year 11</div>
            </div>
          </div>
        </div>
      </div>
    </header>);

};

const PupilPortrait = ({ size = 96 }) => {
  // Stylised SVG portrait placeholder — neutral, on brand
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" className="portrait">
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9b1844" />
          <stop offset="100%" stopColor="#5a0f28" />
        </linearGradient>
        <linearGradient id="pg2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="14" fill="url(#pg)" />
      <rect width="96" height="96" rx="14" fill="url(#pg2)" />
      {/* Shoulders */}
      <path d="M8 96 C 14 70, 38 66, 48 66 C 58 66, 82 70, 88 96 Z" fill="rgba(255,255,255,.16)" />
      {/* Head */}
      <circle cx="48" cy="44" r="18" fill="rgba(255,255,255,.92)" />
      {/* Hair */}
      <path d="M30 40 C 30 26, 66 24, 66 40 C 66 36, 60 31, 48 31 C 38 31, 32 35, 30 40 Z" fill="#3b2418" />
      {/* Tie hint */}
      <path d="M44 96 L48 80 L52 96 Z" fill="#9b1844" />
      <text x="48" y="92" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(255,255,255,.55)" fontFamily="Inter">OW</text>
    </svg>);

};

const Lightbulb = ({ color, lit = true, size = 56 }) => {
  // SVG lightbulb in the requested ticket colour
  const c = color;
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" className="bulb">
      {lit &&
      <g className="bulb-glow">
          <circle cx="30" cy="30" r="28" fill={c} opacity=".10" />
          <circle cx="30" cy="30" r="20" fill={c} opacity=".18" />
        </g>
      }
      {/* Bulb body */}
      <path d="M30 8 C 18 8, 10 17, 10 28 C 10 36, 14 41, 18 46 C 21 50, 22 53, 22 56 L 38 56 C 38 53, 39 50, 42 46 C 46 41, 50 36, 50 28 C 50 17, 42 8, 30 8 Z"
      fill={c} stroke="rgba(0,0,0,.25)" strokeWidth="1.2" />
      {/* Highlight */}
      <path d="M22 18 C 18 22, 16 27, 17 32" stroke="rgba(255,255,255,.7)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Filament */}
      <path d="M24 38 L 27 32 L 30 40 L 33 32 L 36 38" stroke="rgba(0,0,0,.35)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Base */}
      <rect x="22" y="56" width="16" height="4" fill="#8a8a8a" />
      <rect x="23" y="60" width="14" height="3" fill="#6e6e6e" />
      <rect x="24" y="63" width="12" height="3" fill="#8a8a8a" />
      <path d="M25 66 L 35 66 L 33 70 L 27 70 Z" fill="#5a5a5a" />
      {/* Rays */}
      {lit && [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = a * Math.PI / 180;
        const x1 = 30 + Math.cos(rad) * 32;
        const y1 = 30 + Math.sin(rad) * 32;
        const x2 = 30 + Math.cos(rad) * 38;
        const y2 = 30 + Math.sin(rad) * 38;
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="2" strokeLinecap="round" opacity=".75" />;
      })}
    </svg>);

};

const Card = ({ title, kicker, action, children, className = '' }) =>
<section className={`card ${className}`}>
    {(title || kicker || action) &&
  <header className="card-head">
        <div>
          {kicker && <div className="kicker">{kicker}</div>}
          {title && <h2 className="card-title">{title}</h2>}
        </div>
        {action && <div className="card-action">{action}</div>}
      </header>
  }
    {children}
  </section>;


Object.assign(window, { Logo, TopBar, PupilPortrait, Lightbulb, Card });