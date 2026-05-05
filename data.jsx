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
  purple: { count: 11, label: 'Skills Tickets', sub: 'Skills development',    color: '#7c3aed', recent: [
    { subject: 'Geography',       teacher: 'Mr Whitford',   skill: 'Leadership',     note: 'Coordinated the group\u2019s data analysis on the GCSE coursework after a partner dropped out.', date: '25 Apr' },
    { subject: 'Computer Science', teacher: 'Mr Okafor',    skill: 'Deep thinking',  note: 'Reasoned carefully through edge cases in the recursion task before writing any code.', date: '21 Apr' },
    { subject: 'House',           teacher: 'Mr Donnelly',   skill: 'Teamwork',       note: 'Worked closely with Year 9 mentees in the run-up to mocks.', date: '20 Apr' },
    { subject: 'Drama',           teacher: 'Miss Hollis',   skill: 'Creativity',     note: 'Brought an original staging idea to the ensemble piece that the group adopted.', date: '17 Apr' },
    { subject: 'English',         teacher: 'Ms Patel',      skill: 'Reflection',     note: 'Self-assessed the unseen poetry draft with real honesty about what wasn\u2019t working.', date: '14 Apr' },
    { subject: 'Maths',           teacher: 'Dr Ramirez',    skill: 'Task initiation', note: 'Started the Mechanics 2 paper unprompted ahead of the lesson.', date: '11 Apr' },
    { subject: 'Robotics Club',   teacher: 'Mr Okafor',     skill: 'Enterprise',     note: 'Pitched and prototyped a new line-tracking sensor mount for the inter-house build.', date: '08 Apr' },
    { subject: 'History',         teacher: 'Mr Donnelly',   skill: 'Communication',  note: 'Presented Cold War source analysis with clarity and confident pacing.', date: '03 Apr' },
    { subject: 'Tutor time',      teacher: 'Mrs Carrington', skill: 'Organisation',  note: 'Came to tutorial with journal, planner and report annotations all prepared.', date: '01 Apr' },
  ]},
};

// Skills tracked under the Skills (purple) ticket
const SKILLS = [
  'Organisation', 'Task initiation', 'Reflection', 'Creativity', 'Deep thinking',
  'Leadership', 'Teamwork', 'Communication', 'Enterprise',
];

// Each subject carries:
//   grades         — ATL (Attitude to Learning) in the classroom (R1–R6)
//   gradesOutside  — ATL outside the classroom (homework/prep) (R1–R6)
//   attainment     — numeric attainment grade per cycle (4–9)
//   attainmentTarget — single numeric target (6–9), mostly stable across subjects
const SUBJECTS = [
  { id:'maths',   name:'Maths',                  teacher:'Dr A. Ramirez',     grades:['ME','ME','EE','EE','EE','E' ], gradesOutside:['ME','EE','EE','EE','EE','E' ], target:'E',  effort:1, attainment:[6,7,7,8,8,9], attainmentTarget:9 },
  { id:'science', name:'Science',                teacher:'Mrs J. Holloway',   grades:['ME','EE','EE','EE','EE','EE'], gradesOutside:['NI','ME','ME','EE','EE','EE'], target:'EE', effort:1, attainment:[6,7,7,8,8,8], attainmentTarget:8 },
  { id:'english', name:'English',                teacher:'Ms R. Patel',       grades:['ME','ME','ME','ME','EE','EE'], gradesOutside:['ME','ME','ME','EE','EE','EE'], target:'EE', effort:2, attainment:[5,5,6,6,7,7], attainmentTarget:8 },
  { id:'french',  name:'French',                 teacher:'Mme S. Berthier',   grades:['NI','ME','ME','ME','ME','EE'], gradesOutside:['NI','NI','ME','ME','ME','EE'], target:'EE', effort:2, attainment:[4,5,5,6,6,7], attainmentTarget:7 },
  { id:'theo',    name:'Theology & Philosophy',  teacher:'Rev Dr T. Hayes',   grades:['ME','ME','EE','EE','EE','EE'], gradesOutside:['ME','ME','EE','EE','EE','EE'], target:'EE', effort:1, attainment:[6,6,7,7,8,8], attainmentTarget:8 },
  { id:'history', name:'History',                teacher:'Mr P. Donnelly',    grades:['ME','EE','ME','EE','EE','EE'], gradesOutside:['NI','ME','ME','EE','EE','EE'], target:'EE', effort:1, attainment:[6,7,6,7,8,8], attainmentTarget:8 },
  { id:'drama',   name:'Drama',                  teacher:'Miss L. Hollis',    grades:['ME','ME','ME','ME','ME','ME'], gradesOutside:['ME','ME','ME','ME','EE','ME'], target:'ME', effort:2, attainment:[5,5,6,5,6,6], attainmentTarget:6 },
  { id:'geog',    name:'Geography',              teacher:'Mr K. Whitford',    grades:['ME','ME','EE','ME','EE','EE'], gradesOutside:['ME','EE','EE','ME','EE','EE'], target:'EE', effort:1, attainment:[6,6,7,6,7,7], attainmentTarget:8 },
  { id:'cs',      name:'Computer Science',       teacher:'Mr D. Okafor',      grades:['EE','EE','EE','E', 'E', 'E' ], gradesOutside:['EE','EE','EE','EE','E', 'E' ], target:'E',  effort:1, attainment:[7,8,8,9,9,9], attainmentTarget:9 },
  { id:'sport',   name:'Sports Science',         teacher:'Mr T. Bramwell',    grades:['ME','ME','EE','EE','EE','EE'], gradesOutside:['ME','ME','EE','EE','EE','EE'], target:'EE', effort:1, attainment:[6,6,7,7,8,8], attainmentTarget:8 },
];

const GRADE_VALUES = { 'NI':1, 'ME':2, 'EE':3, 'E':4 };
const GRADE_LABELS = ['NI','ME','EE','E'];
const GRADE_FULL = {
  'NI':'Needs improvement',
  'ME':'Meeting expectations',
  'EE':'Exceeding expectations',
  'E' :'Exceptional'
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

// Praise codes — used to surface "what's going well" per reporting cycle
const PRAISE_CODES = [
  { code:'PD', label:'Your participation in class discussions is excellent' },
  { code:'LI', label:'You listen to and act on feedback effectively, using it to help you improve' },
  { code:'SK', label:'You have made excellent progress in developing your practical skills' },
  { code:'CE', label:'You collaborate very effectively with other pupils during lessons' },
  { code:'IN', label:'You demonstrate great initiative to engage with the subject beyond the standard curriculum' },
  { code:'RS', label:'You demonstrate great resilience when completing challenging tasks' },
  { code:'EW', label:'Your essay writing demonstrates the ability to construct coherent and persuasive arguments' },
  { code:'DS', label:'You proactively seek support when needed and/or make excellent use of departmental support outside of lessons' },
  { code:'WP', label:'Your work is well-presented and/or communicated' },
  { code:'CK', label:'You show commitment to consolidating knowledge between lessons' },
  { code:'SM', label:'You do a good job of supporting your working memory by breaking tasks into smaller steps or revisiting instructions' },
  { code:'SA', label:'You display impressive sustained attention and focus throughout tasks or lessons' },
  { code:'AA', label:'You show cognitive flexibility by adapting your approach thoughtfully when tasks require it' },
];

// Per-subject, per-reporting-cycle: target code (from TARGET_CODES) and
// 1–3 praise codes (from PRAISE_CODES) describing what's going well.
const REPORTING_DETAILS = {
  maths:   [
    { target:'TM', praise:['WP','SA'] },
    { target:'AC', praise:['CK','WP'] },
    { target:'WR', praise:['IN','SA'] },
    { target:'TM', praise:['RS','SA'] },
    { target:'RE', praise:['RS','AA'] },
    { target:'CS', praise:['IN','RS','SA'] },
  ],
  science: [
    { target:'AC', praise:['WP','SA'] },
    { target:'PR', praise:['SK','WP'] },
    { target:'CS', praise:['CK','SK'] },
    { target:'TM', praise:['LI','RS'] },
    { target:'DW', praise:['EW','WP'] },
    { target:'RE', praise:['SK','AA'] },
  ],
  english: [
    { target:'DW', praise:['EW','PD'] },
    { target:'AC', praise:['EW','WP'] },
    { target:'PR', praise:['EW','SM'] },
    { target:'WR', praise:['IN','EW'] },
    { target:'FE', praise:['LI','CE'] },
    { target:'PR', praise:['EW','LI'] },
  ],
  french:  [
    { target:'PA', praise:['CE','PD'] },
    { target:'OR', praise:['CK','IN'] },
    { target:'AC', praise:['LI','WP'] },
    { target:'OR', praise:['RS','PD'] },
    { target:'RE', praise:['RS','AA'] },
    { target:'SS', praise:['DS','LI'] },
  ],
  theo:    [
    { target:'WR', praise:['PD','IN'] },
    { target:'DW', praise:['EW','PD'] },
    { target:'PA', praise:['PD','EW'] },
    { target:'PR', praise:['EW','WP'] },
    { target:'FE', praise:['LI','EW'] },
    { target:'DW', praise:['EW','AA'] },
  ],
  history: [
    { target:'WR', praise:['IN','EW'] },
    { target:'AC', praise:['WP','EW'] },
    { target:'DW', praise:['EW','AA'] },
    { target:'PR', praise:['EW','WP'] },
    { target:'TM', praise:['SA','SM'] },
    { target:'FE', praise:['LI','EW'] },
  ],
  drama:   [
    { target:'GW', praise:['CE','SK'] },
    { target:'PA', praise:['SK','PD'] },
    { target:'PS', praise:['SK','CE'] },
    { target:'RE', praise:['RS','AA'] },
    { target:'FE', praise:['LI','CE'] },
    { target:'PS', praise:['SK','LI'] },
  ],
  geog:    [
    { target:'AC', praise:['WP','SK'] },
    { target:'CS', praise:['CK','IN'] },
    { target:'DW', praise:['EW','SK'] },
    { target:'PR', praise:['PD','EW'] },
    { target:'WR', praise:['IN','AA'] },
    { target:'AC', praise:['EW','LI'] },
  ],
  cs:      [
    { target:'WR', praise:['IN','SA'] },
    { target:'OR', praise:['IN','SM'] },
    { target:'TM', praise:['RS','AA'] },
    { target:'CS', praise:['IN','WP'] },
    { target:'WR', praise:['IN','CE'] },
    { target:'CS', praise:['SA','WP','RS'] },
  ],
  sport:   [
    { target:'PS', praise:['SK','RS'] },
    { target:'GW', praise:['CE','SK'] },
    { target:'CS', praise:['IN','WP'] },
    { target:'PA', praise:['SK','CE'] },
    { target:'RE', praise:['RS','CE'] },
    { target:'PS', praise:['SK','LI'] },
  ],
};

const TUTOR_REPORT = {
  author: 'Mrs A. Carrington',
  role: 'Tutor · 11 Le Bas',
  date: '24 Apr 2026',
  period: 'Reporting period R6 · Summer term, week 2',
  signature: 'AC',
  paragraphs: [
    `In our April tutorial, Olly and I reviewed his journal entries from the spring term alongside what's come up in his subject reports and what I've noticed of him across House and around the school. We also revisited the focus we set together in December, which was for Olly to take more initiative in group settings rather than waiting to be asked, particularly given the leadership opportunities opening up as he moves towards the senior school.`,
    `The evidence this term shows real movement on that front, though not always in the ways Olly expected. He tagged five entries against Leadership, three of them from his GCSE Geography coursework, where he ended up coordinating his group's data analysis after a partner dropped out. This came up in his Geography subject report too, where his teacher commented on the initiative he showed. Olly also tagged Teamwork more frequently this term, seven entries in total, a notable shift from autumn when he rarely tagged it. What he didn't tag, but what I've seen consistently, is Kindness. He's been quietly looking out for younger pupils in House through the run-up to mocks, and the same has come up in passing from his rugby coach.`,
    `We talked about the gap between how he sees himself and what others have noticed. Olly was genuinely surprised that I'd registered his kindness as a defining quality, and reflected that he doesn't think of those moments as significant because they feel "just what you do." We discussed whether that's modesty or whether he's underweighting something that's actually a real strength. He was thoughtful about this, recognising that his instinct to dismiss those moments might be the same instinct that holds him back from leadership, the assumption that what he has to offer isn't quite enough. He also acknowledged that with sixth form ahead, the moments where leadership is needed won't always announce themselves, and the next step is choosing to step in when he has the option to stay quiet.`,
    `Olly's focus for next half-term is to act on one moment of unprompted leadership each week, particularly in settings where he'd normally hold back. He also wants to begin tagging moments of Kindness, not because they need recording, but as a way of taking his own contributions more seriously as he moves into the senior part of the school.`,
  ],
};

Object.assign(window, {
  PUPIL, TICKETS, SKILLS, SUBJECTS, GRADE_VALUES, GRADE_LABELS, GRADE_FULL,
  TARGET_CODES, TARGETS_MATRIX, PRAISE_CODES, REPORTING_DETAILS,
  ATTENDANCE, TODO_ITEMS, FIXTURES, UPCOMING_STUDY, PUPIL_UPDATE,
  TUTOR_REPORT, TIMETABLE, SUBJECT_COLORS
});
