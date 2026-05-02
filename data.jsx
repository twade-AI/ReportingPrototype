// data.jsx — mock data for Haileybury Report
// Year 11 boy, STEM-leaning

const PUPIL = {
  firstName: 'Oliver',
  lastName: 'Whitfield',
  preferred: 'Olly',
  year: 'Year 11',
  form: '11 Le Bas',
  house: 'Le Bas',
  tutor: 'Mrs A. Carrington',
  photoInitials: 'OW',
  // SVG portrait placeholder gradient
};

const TICKETS = {
  yellow: { count: 14, label: 'Yellow Tickets', sub: 'Effort & best work', color: '#f5b800', recent: [
    { subject: 'Maths', teacher: 'Dr Ramirez', note: 'Outstanding effort on the Mechanics 2 paper.', date: '24 Apr' },
    { subject: 'Computer Science', teacher: 'Mr Okafor', note: 'Excellent persistence debugging recursion task.', date: '21 Apr' },
    { subject: 'Theology & Phil.', teacher: 'Rev Dr Hayes', note: 'Strong preparation for class discussion.', date: '17 Apr' },
  ]},
  blue:   { count: 9,  label: 'Blue Tickets',   sub: 'Progress & helpfulness', color: '#2a6df4', recent: [
    { subject: 'French', teacher: 'Mme Berthier', note: 'Significant improvement in oral fluency.', date: '23 Apr' },
    { subject: 'English', teacher: 'Ms Patel', note: 'Helped a peer redraft an essay introduction.', date: '19 Apr' },
  ]},
  green:  { count: 6,  label: 'Green Tickets',  sub: 'Kindness & service',   color: '#1f9d6b', recent: [
    { subject: 'House',  teacher: 'Mr Donnelly', note: 'Volunteered to set up the Founders\u2019 Day chapel.', date: '22 Apr' },
    { subject: 'Drama',  teacher: 'Miss Hollis', note: 'Helped a younger pupil rehearse their monologue.', date: '15 Apr' },
  ]},
};

const SUBJECTS = [
  { id:'maths',   name:'Maths',                  teacher:'Dr A. Ramirez',     grades:['ME','ME','EE','EE','EE','E' ], target:'E',  effort:1, attainment:1 },
  { id:'science', name:'Science',                teacher:'Mrs J. Holloway',   grades:['ME','EE','EE','EE','EE','EE'], target:'EE', effort:1, attainment:1 },
  { id:'english', name:'English',                teacher:'Ms R. Patel',       grades:['ME','ME','ME','ME','EE','EE'], target:'EE', effort:2, attainment:2 },
  { id:'french',  name:'French',                 teacher:'Mme S. Berthier',   grades:['NI','ME','ME','ME','ME','EE'], target:'EE', effort:2, attainment:2 },
  { id:'theo',    name:'Theology & Philosophy',  teacher:'Rev Dr T. Hayes',   grades:['ME','ME','EE','EE','EE','EE'], target:'EE', effort:1, attainment:1 },
  { id:'history', name:'History',                teacher:'Mr P. Donnelly',    grades:['ME','EE','ME','EE','EE','EE'], target:'EE', effort:1, attainment:2 },
  { id:'drama',   name:'Drama',                  teacher:'Miss L. Hollis',    grades:['ME','ME','ME','ME','ME','ME'], target:'ME', effort:2, attainment:2 },
  { id:'geog',    name:'Geography',              teacher:'Mr K. Whitford',    grades:['ME','ME','EE','ME','EE','EE'], target:'EE', effort:1, attainment:2 },
  { id:'cs',      name:'Computer Science',       teacher:'Mr D. Okafor',      grades:['EE','EE','EE','E', 'E', 'E' ], target:'E',  effort:1, attainment:1 },
  { id:'sport',   name:'Sports Science',         teacher:'Mr T. Bramwell',    grades:['ME','ME','EE','EE','EE','EE'], target:'EE', effort:1, attainment:1 },
];

const GRADE_VALUES = { 'NI':1, 'ME':2, 'EE':3, 'E':4 };
const GRADE_LABELS = ['NI','ME','EE','E'];
const GRADE_FULL = {
  'NI':'Needs Improvement',
  'ME':'Meeting Expected',
  'EE':'Exceeding Expected',
  'E' :'Exceeding'
};

// Target codes from user
const TARGET_CODES = [
  { code:'DW', label:'Depth of written work' },
  { code:'AC', label:'Accuracy of written work' },
  { code:'PR', label:'Structure / presentation' },
  { code:'CO', label:'Consolidate between lessons' },
  { code:'CS', label:'Quality of independent work' },
  { code:'DL', label:'Meet deadlines' },
  { code:'FE', label:'Engage with feedback' },
  { code:'GW', label:'Group work engagement' },
  { code:'OR', label:'Use online resources' },
  { code:'PA', label:'Participate actively' },
  { code:'FW', label:'Focus in lessons' },
  { code:'PS', label:'Practical skills' },
  { code:'RE', label:'Resilience / don\u2019t give up' },
  { code:'SS', label:'Seek support proactively' },
  { code:'TM', label:'Timed practice' },
  { code:'WR', label:'Wider research' },
  { code:'UH', label:'Use department help' },
];

// Heatmap: subject × target — count of times each target has been set across reports
// Numbers 0–4 (0 = never, 4 = set every reporting period)
const TARGETS_MATRIX = {
  maths:   { TM:4, WR:1, RE:2, AC:2, FW:1, CS:1 },
  science: { TM:3, AC:2, CS:2, PR:1, DW:1, RE:1 },
  english: { DW:4, AC:3, PR:3, WR:2, FE:2, CS:1 },
  french:  { OR:3, PA:3, AC:2, DW:2, RE:2, SS:1, FW:1 },
  theo:    { DW:3, WR:2, PA:2, FE:1, PR:1 },
  history: { DW:3, WR:3, AC:2, PR:2, TM:1, FE:1 },
  drama:   { GW:3, PA:3, RE:2, PS:2, FE:2 },
  geog:    { CS:2, AC:2, DW:2, PR:2, WR:1 },
  cs:      { WR:3, OR:2, CS:1, TM:1 },
  sport:   { PS:3, GW:2, RE:2, PA:1, CS:1 },
};

const ATTENDANCE = {
  overall: 97.4,
  authorisedAbsence: 1.8,
  unauthorisedAbsence: 0.0,
  late: 0.8,
  weeks: [100,100,98,96,100,95,100,100,98,100,94,98,100,100,100,98],
};

// Mock Google Classroom assignments — pulled into the To do list
const TODO_ITEMS = [
  {
    id: 'todo-1',
    title: 'Prep - Research Camus ahead of class presentation',
    subject: 'Theology and Philosophy',
    teacher: 'Rev Dr T. Hayes',
    due: '2026-05-04T20:30:00',
    description: `Read the introduction to Camus' "The Myth of Sisyphus" (provided as a PDF on Google Classroom) and prepare a 3-minute presentation outlining his concept of the absurd. Bring three discussion questions for the class. Suggested reading: pp. 1–14, with focus on the opening chapter.`,
  },
  {
    id: 'todo-2',
    title: 'Prep - Mechanics 2 past paper, Section A',
    subject: 'Mathematics',
    teacher: 'Dr A. Ramirez',
    due: '2026-05-05T20:30:00',
    description: `Complete questions 1–6 of the June 2024 Mechanics 2 paper (uploaded to Classroom). Show full working. Mark your own answers using the mark scheme — annotate where you lost marks and bring queries to Wednesday's lesson.`,
  },
  {
    id: 'todo-3',
    title: 'Prep - Read Chapter 4 of "Power and the People" and annotate',
    subject: 'History',
    teacher: 'Mr P. Donnelly',
    due: '2026-05-06T20:30:00',
    description: `Read Chapter 4 (Cold War origins, 1945–1949) and annotate the source extracts on pp. 78–82. Identify provenance, purpose and likely audience for each source. We will use your annotations as the basis for Thursday's source-evaluation exercise.`,
  },
  {
    id: 'todo-4',
    title: 'Prep - Draft introduction for unseen poetry comparison',
    subject: 'English',
    teacher: 'Ms R. Patel',
    due: '2026-05-08T20:30:00',
    description: `Using the two poems uploaded to Classroom ("Hawk Roosting" and "The Eagle"), draft a 200–250 word comparative introduction. Focus on a clear thesis statement and a precise framing of the two poets' contrasting perspectives. No need to write the full essay — introduction only.`,
  },
  {
    id: 'todo-5',
    title: 'Prep - Vocabulary set: «ma région» (Quizlet)',
    subject: 'French',
    teacher: 'Mme S. Berthier',
    due: '2026-05-10T20:30:00',
    description: `Learn the 40-word vocabulary set on Quizlet (link on Classroom) covering geography, transport and regional identity. Short written test at the start of Monday's lesson. Practise spoken pronunciation using the audio function — this vocabulary will appear in your speaking mock.`,
  },
];

const FIXTURES = [
  { date:'Wed 1 May',  type:'Rugby 7s',   detail:'1st XV vs Tonbridge (H)',           kit:'Home',   time:'14:30' },
  { date:'Sat 4 May',  type:'Cross-country', detail:'House Relays \u2014 Big Side',     kit:'House',  time:'10:00' },
  { date:'Tue 7 May',  type:'STEM Soc.',  detail:'Robotics Club \u2014 final build',   kit:'\u2014', time:'16:15' },
  { date:'Thu 9 May',  type:'Maths Olympiad', detail:'UKMT Senior Round 2 (Library)',  kit:'\u2014', time:'13:00' },
];

const UPCOMING_STUDY = {
  // AI-generated text
  body: `Over the next half-term Olly will move into mock examination preparation across all ten of his subjects, with particular emphasis on Maths Paper 2 (Mechanics & Statistics), Computer Science NEA write-up, and the Science triple-award practical assessments. In English he begins the unseen poetry unit; in History the focus shifts to source evaluation for the Cold War module. French oral practice will increase in frequency ahead of the speaking mock in week 5.`,
  highlights: [
    { subject:'Maths',          topic:'Mechanics 2 \u2014 projectiles, friction & moments' },
    { subject:'Computer Science', topic:'NEA: testing, evaluation and write-up' },
    { subject:'Science',        topic:'Triple-award required practicals (Bio/Chem/Phys)' },
    { subject:'English',        topic:'Unseen poetry \u2014 comparison & analysis' },
    { subject:'History',        topic:'Cold War \u2014 source evaluation skills' },
    { subject:'French',         topic:'Oral mock preparation \u2014 \u00abma r\u00e9gion\u00bb' },
  ],
};

const PUPIL_UPDATE = {
  // AI-generated paragraph
  body: `Olly has had a really strong start to the summer term. His Maths and Computer Science teachers both report consistently high-quality work, and his recent Mechanics paper placed him in the top quartile of the year group. In Science his confidence with extended-response questions has grown noticeably since the Easter break.

On the games field he\u2019s been a reliable presence in the 1st XV rugby 7s squad and contributed two tries against Bedford Modern. He continues to attend Robotics Club on Tuesdays and is leading on the line-tracking module for the inter-house competition. His tutor notes that he has been particularly thoughtful in House meetings this week, volunteering to mentor a Year 9 pupil.

Areas to keep an eye on: French oral fluency \u2014 his teacher would like to see more sustained spoken practice at home \u2014 and time-management around longer English essays.`,
  sentiment: 'positive',
  generated: '29 Apr 2026, 06:00',
};

const SUBJECT_COLORS = {
  'Tutor Time':       { bg:'#e2e8f0', fg:'#475569' },
  'Mathematics':      { bg:'#dbeafe', fg:'#1e40af' },
  'English':          { bg:'#fef3c7', fg:'#92400e' },
  'French':           { bg:'#cffafe', fg:'#0e7490' },
  'Sports Science':   { bg:'#dcfce7', fg:'#166534' },
  'Chemistry':        { bg:'#ffedd5', fg:'#9a3412' },
  'Biology':          { bg:'#d1fae5', fg:'#065f46' },
  'Physics':          { bg:'#ede9fe', fg:'#5b21b6' },
  'Geography':        { bg:'#e0f2fe', fg:'#075985' },
  'Classical Civ':    { bg:'#ffe4e6', fg:'#9f1239' },
  'Wellbeing':        { bg:'#f3f4f6', fg:'#374151' },
};

const TIMETABLE = {
  days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  periods: [
    { id:'P0',   label:'P0' },
    { id:'P1',   label:'P1' },
    { id:'P2',   label:'P2' },
    { id:'P3',   label:'P3' },
    { id:'half', label:'The Half', divider:true },
    { id:'P4',   label:'P4' },
    { id:'P5SS', label:'P5 (SS)' },
    { id:'P5LS', label:'P5 (LS)' },
    { id:'P6',   label:'P6' },
    { id:'P7',   label:'P7' },
    { id:'P8',   label:'P8' },
  ],
  cells: [
    [null, null, null,
     { subject:'Tutor Time',     code:'11V-TUTPW | TPW',  room:'Maths 3' },
     null, null],
    [{ subject:'Classical Civ',  code:'11V3CC | BJG',     room:'Form Room 24' },
     { subject:'French',         code:'11V4FR | HTE',     room:'Form Room 22' },
     { subject:'Sports Science', code:'11V2SS | NCPC',    room:'PE2' },
     { subject:'Chemistry',      code:'11V-CHC2 | AWB',   room:'Chemistry 13' },
     { subject:'Mathematics',    code:'11V-MA5Y | ACAS',  room:'Maths 6' },
     { subject:'English',        code:'11V-EN2Y | JST',   room:'Form Room 11' }],
    [{ subject:'Geography',      code:'11V1GG | PG',      room:'Geography 2' },
     { subject:'Sports Science', code:'11V2SS | NCPC',    room:'PE2' },
     { subject:'Physics',        code:'11V-PHC2 | HAP',   room:'Physics 5' },
     { subject:'Chemistry',      code:'11V-CHC2 | AWB',   room:'Chemistry 13' },
     { subject:'Biology',        code:'11V-BIC2 | SAB',   room:'Research Lab' },
     { subject:'Geography',      code:'11V1GG | PG',      room:'Geography 2' }],
    [{ subject:'Geography',      code:'11V1GG | PG',      room:'Geography 2' },
     { subject:'English',        code:'11V-EN2Y | JST',   room:'Form Room 11' },
     { subject:'Physics',        code:'11V-PHC2 | HAP',   room:'Physics 5' },
     { subject:'Geography',      code:'11V1GG | PG',      room:'Geography 2' },
     { subject:'Biology',        code:'11V-BIC2 | SAB',   room:'Research Lab' },
     { subject:'Classical Civ',  code:'11V3CC | BJG',     room:'Form Room 24' }],
    [null, null, null, null, null, null],
    [{ subject:'English',        code:'11V-EN2Y | JST',   room:'Form Room 11' },
     { subject:'Mathematics',    code:'11V-MA5Y | ACAS',  room:'Maths 6' },
     { subject:'Classical Civ',  code:'11V3CC | BJG',     room:'Form Room 24' },
     { subject:'French',         code:'11V4FR | HTE',     room:'Form Room 22' },
     { subject:'Sports Science', code:'11V2SS | NCPC / PSOH', room:'Sports Hall' },
     { subject:'Mathematics',    code:'11V-MA5Y | ACAS',  room:'Maths 6' }],
    [{ subject:'English',        code:'11V-EN2Y | JST',   room:'Form Room 11' },
     { subject:'Wellbeing',      code:'11V-WE5Y | DJM',   room:'Geography 1' },
     { subject:'Classical Civ',  code:'11V3CC | BJG',     room:'Form Room 24' },
     { subject:'French',         code:'11V4FR | HTE',     room:'Form Room 22' },
     { subject:'Sports Science', code:'11V2SS | NCPC',    room:'PE2' },
     null],
    [null, null, null, null, null, null],
    [{ subject:'Mathematics',    code:'11V-MA5Y | ACAS',  room:'Maths 6' },
     null,
     { subject:'French',         code:'11V4FR | HTE',     room:'Form Room 22' },
     null,
     { subject:'English',        code:'11V-EN2Y | JST',   room:'Form Room 11' },
     null],
    [{ subject:'Mathematics',    code:'11V-MA5Y | ACAS',  room:'Maths 6' },
     null,
     { subject:'Biology',        code:'11V-BIC2 | SAB',   room:'Research Lab' },
     null,
     { subject:'English',        code:'11V-EN2Y | JST',   room:'Form Room 11' },
     null],
    [{ subject:'Chemistry',      code:'11V-CHC2 | AWB',   room:'Chemistry 13' },
     null, null, null,
     { subject:'Physics',        code:'11V-PHC2 | HAP',   room:'Physics 5' },
     null],
  ],
};

const TUTOR_REPORT = {
  author: 'Mrs A. Carrington',
  role: 'Tutor · 11 Le Bas',
  date: '24 Apr 2026',
  period: 'Reporting period R6 · Summer term, week 2',
  signature: 'AC',
  paragraphs: [
    `Olly has settled exceptionally well into the second half of the year and continues to be one of the more thoughtful and self-aware members of 11 Le Bas. He arrives at tutor-time prepared, organised, and increasingly willing to contribute his own perspective to our weekly discussions \u2014 a marked shift from the start of the year, when he was often more comfortable observing than participating.`,
    `Academically the picture is a strong and steadily improving one. His Maths and Computer Science teachers continue to report work of real depth, and the most recent Mechanics paper placed him comfortably in the top quartile of the cohort. Science staff note a growing confidence with extended-response questions, and his History teacher has highlighted some genuinely sophisticated source-evaluation work in the Cold War module. The two areas Olly and I have agreed to focus on this half-term are oral fluency in French \u2014 where regular short bursts of spoken practice at home would make a meaningful difference \u2014 and time-management on longer English essays, where he occasionally over-invests in early paragraphs at the expense of a strong conclusion.`,
    `Beyond the classroom, Olly has been a reliable and good-humoured presence in the 1st XV rugby 7s squad and has taken on a clear leadership role in the Robotics Club, where he is heading up the line-tracking module for the inter-house competition. His House Master and I were both struck this week by his decision to mentor a Year 9 pupil who has been finding the transition into senior school challenging \u2014 a small but significant act of service that very much reflects the boy he is becoming.`,
    `Looking ahead to mock examinations, my advice to Olly \u2014 and to you as parents \u2014 is to resist the temptation to over-revise. He is at his best when he works in focused 45-minute blocks, with clear breaks, and protects his sleep. We will continue to meet weekly and I will, of course, be in touch immediately if anything changes. As ever, please do let me know if there is anything you would like to discuss.`,
  ],
};

Object.assign(window, {
  PUPIL, TICKETS, SUBJECTS, GRADE_VALUES, GRADE_LABELS, GRADE_FULL,
  TARGET_CODES, TARGETS_MATRIX, ATTENDANCE, TODO_ITEMS, FIXTURES, UPCOMING_STUDY, PUPIL_UPDATE,
  TUTOR_REPORT, TIMETABLE, SUBJECT_COLORS
});
