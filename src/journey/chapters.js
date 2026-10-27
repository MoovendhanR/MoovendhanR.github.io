// Story content and the look of each stretch of road.
// Chapters split the road into equal stretches; `sky` is the time of day at the
// middle of each stretch and is blended smoothly in between.

export const chapters = [
  {
    id: 'prologue',
    label: 'Prologue — 05:10',
    title: 'The Long Road',
    text: 'From a Tamil Nadu village to building fintech in Bengaluru. Scroll to ride.',
    vehicle: 'bicycle',
    sky: { top: '#0b1030', bottom: '#2c3266', fog: '#1b1f3d', ground: '#151a12', light: 0.35, sun: 0.0, windows: 0.3, neon: 0, stars: 1 },
  },
  {
    id: 'village',
    label: 'Chapter 01 — Village Dawn · Tamil Nadu',
    title: 'Where It Starts',
    text: 'Paddy fields, palm trees and a higher-secondary PCM stream at John Britto School (2013–2015). Curiosity first, code later.',
    vehicle: 'bicycle',
    sky: { top: '#6f7fbf', bottom: '#f7b47c', fog: '#e7a982', ground: '#4c5a2a', light: 0.75, sun: 0.9, windows: 0, neon: 0, stars: 0 },
  },
  {
    id: 'highway',
    label: 'Chapter 02 — Highway · Morning',
    title: 'The Road to Bengaluru',
    text: 'Moved to Bengaluru in 2017 for a BCA at Karnataka College of Management & Science.',
    vehicle: 'bicycle',
    sky: { top: '#5f9fdc', bottom: '#dcecf8', fog: '#c9dcea', ground: '#5d6b34', light: 1.0, sun: 1.1, windows: 0, neon: 0, stars: 0 },
  },
  {
    id: 'delivery',
    label: 'Chapter 03 — City Noon · 2018–2021',
    title: 'Delivery Runs',
    text: 'Nearly three years in grocery-delivery operations at bigbasket: ownership, tight deadlines and customers who can’t wait.',
    vehicle: 'scooter-crate',
    sky: { top: '#3d8bd6', bottom: '#c4e2f6', fog: '#c7dbe9', ground: '#5a5a4a', light: 1.1, sun: 1.2, windows: 0, neon: 0, stars: 0 },
  },
  {
    id: 'masai',
    label: 'Chapter 04 — Dusk · 2021–2023',
    title: 'Learning to Build',
    text: 'Masai School: 1,000+ hours of MERN, data structures and team sprints. Shipped clones of Expedia, Sephora, Nordstrom and Marriott Bonvoy.',
    vehicle: 'scooter',
    sky: { top: '#2c2f6e', bottom: '#f0875a', fog: '#a8645e', ground: '#3a3530', light: 0.6, sun: 0.6, windows: 0.7, neon: 0.1, stars: 0.2 },
  },
  {
    id: 'firstjobs',
    label: 'Chapter 05 — City Lights · 2023–2024',
    title: 'First Commits',
    text: 'Scintillate Alliance: Figma designs turned into pixel-accurate React. SA Digital: rebuilt the ProLegal Serve dashboard in React + TypeScript.',
    vehicle: 'scooter',
    sky: { top: '#121838', bottom: '#56386c', fog: '#36294d', ground: '#1f1d26', light: 0.4, sun: 0.1, windows: 1, neon: 0.4, stars: 0.6 },
  },
  {
    id: 'finright',
    label: 'Chapter 06 — Neon Night · FinRight · 2025–Now',
    title: 'Fintech After Dark',
    text: 'Payments, automation and AI for Provident Fund members. 1,600+ commits across 7 production codebases.',
    vehicle: 'motorbike',
    sky: { top: '#04050e', bottom: '#1d0f3d', fog: '#120a26', ground: '#0d0b14', light: 0.3, sun: 0, windows: 1, neon: 1, stars: 0.8 },
  },
  {
    id: 'contact',
    label: 'Epilogue — The Viewpoint',
    title: 'What’s Next?',
    text: 'Open to Full-Stack and Backend roles in fintech, SaaS or AI-product teams. Bengaluru or remote.',
    vehicle: 'motorbike',
    sky: { top: '#0e1636', bottom: '#40548f', fog: '#273153', ground: '#121521', light: 0.45, sun: 0.1, windows: 0.8, neon: 0.3, stars: 1 },
  },
];

// Pinned cards shown during the FinRight chapter.
export const finrightCards = [
  {
    title: 'Payments that clear',
    body: 'Cashfree e-mandate subscriptions and one-time payments: order lifecycle, webhooks, retries and deduplicated failure logs.',
    tags: 'CASHFREE · NODE.JS · MONGODB',
  },
  {
    title: 'Government-portal automation',
    body: 'Playwright/Puppeteer pipelines for the EPFO and CMPF portals, running on BullMQ/Redis job queues.',
    tags: 'PLAYWRIGHT · BULLMQ · REDIS',
  },
  {
    title: 'An AI agent that files claims',
    body: 'LangChain + Azure OpenAI agent that fills in EPFO claims, repairs broken selectors itself and resumes from checkpoints.',
    tags: 'LANGCHAIN · AZURE OPENAI',
  },
  {
    title: 'Dashboards, CMS & mobile',
    body: 'React + TypeScript member and ops dashboards, the Thefynprint CMS with Meilisearch, and a React Native app.',
    tags: 'REACT · TYPESCRIPT · REACT NATIVE',
  },
];

export const skills = [
  'Node.js', 'React', 'TypeScript', 'MongoDB', 'Express', 'Redis', 'BullMQ', 'Playwright',
  'LangChain', 'Cashfree', 'Socket.IO', 'React Native', 'Tailwind', 'AWS', 'GitHub Actions', 'Jest',
];

export const links = {
  email: 'mailto:moovendhanr1011@gmail.com',
  linkedin: 'https://www.linkedin.com/in/moovendhan-r/',
  github: 'https://github.com/MoovendhanR',
  resume: './Moovendhan-R-Resume.pdf',
  classic: './?view=classic',
};

// Billboards and signs along the road: which chapter they sit in, where in that
// stretch (0–1), which side of the road, and what they say.
export const signs = [
  { chapter: 0, at: 0.55, side: 1, style: 'milestone', lines: ['BENGALURU', '312'] },
  { chapter: 1, at: 0.3, side: -1, style: 'board', lines: ['HIGHER SECONDARY · PCM', 'Class of 2015'] },
  { chapter: 1, at: 0.75, side: 1, style: 'milestone', lines: ['BENGALURU', '240'] },
  { chapter: 2, at: 0.35, side: 1, style: 'highway', lines: ['BENGALURU', 'BCA · 2017 →'] },
  { chapter: 2, at: 0.8, side: -1, style: 'milestone', lines: ['BENGALURU', '12'] },
  { chapter: 3, at: 0.4, side: -1, style: 'board', lines: ['DELIVERY RUNS', '2018 – 2021'] },
  { chapter: 4, at: 0.35, side: 1, style: 'board', lines: ['MASAI SCHOOL', 'MERN · DSA · 1,000+ HRS'] },
  { chapter: 5, at: 0.3, side: -1, style: 'board', lines: ['FIGMA → REACT', 'Scintillate Alliance'] },
  { chapter: 5, at: 0.7, side: 1, style: 'board', lines: ['PROLEGAL SERVE', 'React · TypeScript'] },
  { chapter: 6, at: 0.08, side: -1, style: 'neon', lines: ['FINRIGHT'], color: '#4db5ff' },
  { chapter: 6, at: 0.2, side: 1, style: 'neon', lines: ['CASHFREE ₹'], color: '#ff4fd8' },
  { chapter: 6, at: 0.32, side: -1, style: 'neon', lines: ['PLAYWRIGHT × BULLMQ'], color: '#3cf2c2' },
  { chapter: 6, at: 0.44, side: 1, style: 'neon', lines: ['AI CLAIM AGENT'], color: '#ffd23c' },
  { chapter: 6, at: 0.95, side: -1, style: 'neon', lines: ['1,600+ COMMITS'], color: '#4db5ff' },
  { chapter: 7, at: 0.45, side: 1, style: 'board', lines: ['OPEN TO WORK', 'Full-Stack · Backend'] },
];
