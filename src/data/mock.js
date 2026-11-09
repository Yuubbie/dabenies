export const currentStudent = {
  id: 'stu-joy-guest',
  name: 'Amara Cole',
  role: 'Founding Creator',
  cohort: 'Creator Cashflow · Cohort 04',
  avatar: 'AC',
  email: 'amara.cole@dabenies.academy',
}

export const doctorJoy = {
  name: 'Dr. Joy Benny',
  title: 'Founder · Dabenies Academy',
  avatar: 'JB',
}

export const modules = [
  {
    id: 'm1',
    title: 'Module 1: Affiliate Marketing Foundations',
    subtitle: 'Offers, funnels, and commissions that actually convert.',
    duration: '2h 18m',
    lessons: [
      { id: 'm1l1', title: 'Welcome to Dabenies Academy', duration: '08:42', type: 'video', resource: 'Welcome-Packet.pdf' },
      { id: 'm1l2', title: 'Choosing Offers That Pay You Recurring', duration: '22:15', type: 'video', resource: 'Offer-Scorecard.pdf' },
      { id: 'm1l3', title: 'Tracking Links, Pixels & Clean Attribution', duration: '18:04', type: 'video', resource: 'Tracking-Setup.pdf' },
      { id: 'm1l4', title: 'Content Funnels That Sell Without Being Salesy', duration: '16:51', type: 'video', resource: 'Funnel-Map.pdf' },
      { id: 'm1l5', title: 'First Commission Sprint Lab', duration: '12:30', type: 'workshop', resource: 'Sprint-Checklist.pdf' },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2: Twitter Monetization',
    subtitle: 'Audience, authority threads, and paid conversion on X.',
    duration: '3h 02m',
    lessons: [
      { id: 'm2l1', title: 'Positioning Your Niche on X', duration: '19:40', type: 'video', resource: 'Niche-Positioning.pdf' },
      { id: 'm2l2', title: 'Thread Architecture That Gets Bookmarks', duration: '27:11', type: 'video', resource: 'Thread-Templates.pdf' },
      { id: 'm2l3', title: 'X Premium, Ads Revenue & Creator Payouts', duration: '24:08', type: 'video', resource: 'Monetization-Map.pdf' },
      { id: 'm2l4', title: 'DMs, Lead Magnets & Soft Closes', duration: '21:33', type: 'video', resource: 'DM-Scripts.pdf' },
      { id: 'm2l5', title: 'From Followers to Paying Buyers', duration: '18:55', type: 'video', resource: 'Conversion-Playbook.pdf' },
    ],
  },
  {
    id: 'm3',
    title: 'Module 3: Content Creation Systems',
    subtitle: 'A repeatable engine for posts, carousels, and campaigns.',
    duration: '1h 54m',
    lessons: [
      { id: 'm3l1', title: 'Why Scattered Telegram Kills Content Cadence', duration: '14:22', type: 'video', resource: 'Cadence-Audit.pdf' },
      { id: 'm3l2', title: 'Batching Hooks, Scripts & CTAs', duration: '20:18', type: 'video', resource: 'Batch-Calendar.xlsx' },
      { id: 'm3l3', title: 'Repurposing One Idea Across 7 Assets', duration: '17:46', type: 'video', resource: 'Repurpose-Grid.pdf' },
      { id: 'm3l4', title: 'Analytics That Tell You What to Make Next', duration: '16:09', type: 'video', resource: 'Content-KPI.pdf' },
    ],
  },
  {
    id: 'm4',
    title: 'Module 4: Video Editing for Creators',
    subtitle: 'Cuts, captions, and polish that make people watch to the end.',
    duration: '2h 07m',
    lessons: [
      { id: 'm4l1', title: 'Editing for Retention, Not Perfection', duration: '15:28', type: 'video', resource: 'Retention-Cuts.pdf' },
      { id: 'm4l2', title: 'Captions, Hooks & Pattern Interrupts', duration: '23:41', type: 'video', resource: 'Caption-Pack.docx' },
      { id: 'm4l3', title: 'Talking-Head to Shorts Pipeline', duration: '19:12', type: 'video', resource: 'Shorts-Pipeline.pdf' },
      { id: 'm4l4', title: 'Color, Sound & Export Presets', duration: '13:50', type: 'workshop', resource: 'Export-Presets.pdf' },
    ],
  },
]

export const initialCompleted = ['m1l1', 'm1l2', 'm1l3']

export const lessonComments = {
  m1l1: [
    { id: 'c1', author: 'Naomi Ellis', avatar: 'NE', time: '2d ago', body: 'Finally a home that is not a chaotic Telegram dump. Ready to stack commissions with a real system.' },
    { id: 'c2', author: 'Daniel Okoye', avatar: 'DO', time: '1d ago', body: 'Paused at 04:12 and listed my three offer categories. Clarity hit immediately.' },
  ],
  m1l2: [
    { id: 'c3', author: 'Priya Shah', avatar: 'PS', time: '18h ago', body: 'Switched from a low-payout info product to a recurring SaaS affiliate. The scorecard made it obvious.' },
  ],
  m1l3: [
    { id: 'c4', author: 'Marcus Hale', avatar: 'MH', time: '6h ago', body: 'Pixel + UTM template is live. I can finally see which tweet actually paid.' },
  ],
}

export const resourcesByLesson = {
  default: [
    { name: 'Session Notes', kind: 'PDF', size: '1.4 MB' },
    { name: 'Action Checklist', kind: 'PDF', size: '420 KB' },
  ],
}

export const channels = [
  { id: 'general-wins', name: '#general-wins', desc: 'Celebrate commissions, viral threads, and published videos.', members: 248 },
  { id: 'affiliate-drops', name: '#affiliate-drops', desc: 'Share converting offers, swipe copy, and payout screenshots.', members: 186 },
  { id: 'twitter-growth', name: '#twitter-growth', desc: 'Hooks, threads, and X monetization experiments.', members: 164 },
  { id: 'edit-lab', name: '#edit-lab', desc: 'Cuts, captions, and feedback on creator videos.', members: 97 },
]

export const initialPosts = {
  'general-wins': [
    {
      id: 'p1',
      author: 'Naomi Ellis',
      avatar: 'NE',
      role: 'Cohort 04',
      time: '3h ago',
      body: 'Closed my first $1,840 affiliate month from one thread + a clean tracking link. Module 1 tracking setup was the missing piece.',
      likes: 42,
      liked: false,
      comments: [
        { id: 'pc1', author: 'Dr. Joy Benny', avatar: 'JB', body: 'This is the system working, Naomi. Offer quality plus attribution. Keep the cadence.', time: '2h ago' },
        { id: 'pc2', author: 'Amara Cole', avatar: 'AC', body: 'Screenshot energy. Taking notes on your hook.', time: '1h ago' },
      ],
    },
    {
      id: 'p2',
      author: 'Daniel Okoye',
      avatar: 'DO',
      role: 'Cohort 03',
      time: '7h ago',
      body: 'Moved my creator circle off Telegram this week. Batch calendar from Module 3 means I am posting daily without living in the group chat.',
      likes: 31,
      liked: true,
      comments: [],
    },
  ],
  'affiliate-drops': [
    {
      id: 'p3',
      author: 'Priya Shah',
      avatar: 'PS',
      role: 'Cohort 04',
      time: '5h ago',
      body: 'High converting SaaS tool for email creators — 30% recurring. DM me if you want the landing page angle I used in Lesson 4.',
      likes: 18,
      liked: false,
      comments: [
        { id: 'pc3', author: 'Dr. Joy Benny', avatar: 'JB', body: 'Love the recurring angle. Pair it with the Funnel Map from Module 1.', time: '4h ago' },
      ],
    },
  ],
  'twitter-growth': [
    {
      id: 'p4',
      author: 'Marcus Hale',
      avatar: 'MH',
      role: 'Cohort 04',
      time: '1h ago',
      body: 'This week I will: 1) ship 5 authority threads, 2) turn one long video into 8 shorts, 3) finish Module 2 Lesson 4. Hold me to it.',
      likes: 24,
      liked: false,
      comments: [
        { id: 'pc4', author: 'Amara Cole', avatar: 'AC', body: 'I am with you on the shorts pipeline. Checking in Friday.', time: '40m ago' },
      ],
    },
  ],
  'edit-lab': [
    {
      id: 'p5',
      author: 'Lydia Grant',
      avatar: 'LG',
      role: 'Cohort 02',
      time: '9h ago',
      body: 'Cut my talking-head from 11 minutes to a 47-second hook. Retention jumped. If you are over-editing, watch Module 4 Lesson 1 tonight.',
      likes: 56,
      liked: false,
      comments: [],
    },
  ],
}

export const aiReplies = [
  {
    match: /affiliate|commission|offer|funnel|pixel|tracking/i,
    text: 'In Module 1, Dr. Joy builds affiliate income on three moves: pick recurring or high-AOV offers with the Offer Scorecard, install clean tracking (links, UTMs, pixel), then run a content funnel that warms before it asks. Start with one offer, one tracking link, and one daily CTA. First commissions come from clarity, not more products.',
  },
  {
    match: /twitter|tweet|thread|x premium|monetiz/i,
    text: 'Module 2 treats X as a conversion channel, not a vanity feed. Position one niche, ship bookmark-worthy threads, then monetize with Premium payouts plus affiliate or product CTAs in DMs. Use the Thread Templates: hook, proof, steps, soft close. Followers are inventory. Buyers come from consistent authority plus a clean next step.',
  },
  {
    match: /content|batch|repurpose|calendar|cadence|telegram/i,
    text: 'Module 3 replaces chaotic Telegram posting with a batching engine. One idea becomes seven assets: thread, short, carousel, email, caption pack, story, and CTA. Use the Batch Calendar so you create twice a week and publish daily. Dabenies Community Hub is the room — #affiliate-drops, #twitter-growth, #edit-lab — so feedback lives in channels, not buried chats.',
  },
  {
    match: /edit|video|caption|short|retention|cut/i,
    text: 'Module 4 is editing for watch time. Cut dead air, put the hook in the first 2 seconds, burn captions on-screen, and interrupt the pattern every 3–5 seconds. Talking-head to shorts: film once, slice 6–10 clips, export vertical 1080x1920. Retention beats cinematic polish when you are building a creator business.',
  },
  {
    match: /lesson|progress|complete|next/i,
    text: 'Your next best step is the first incomplete lesson in your current module. Mark it complete only after you ship one real asset — a tracking link, a thread, a batched post, or a cut video. Progress in Dabenies is measured by published work, not playback speed.',
  },
  {
    match: /dr\.? joy|who|founder|dabenies/i,
    text: 'Dr. Joy Benny is the founder of Dabenies Academy. She trains creators in affiliate marketing, Twitter monetization, content systems, and video editing — so you can leave messy group chats and run a real, structured creator business.',
  },
]

export const defaultAiReply =
  'I am Dabenies AI, your study companion inside the Academy. Ask me about affiliate offers, Twitter threads and payouts, content batching, or video editing. I will answer from Dr. Joy’s curriculum, not generic advice.'

export const students = [
  { id: 's1', name: 'Amara Cole', email: 'amara.cole@dabenies.academy', cohort: 'C04', progress: 38, status: 'Active', last: '12m ago' },
  { id: 's2', name: 'Naomi Ellis', email: 'naomi.ellis@dabenies.academy', cohort: 'C04', progress: 72, status: 'Active', last: '3h ago' },
  { id: 's3', name: 'Daniel Okoye', email: 'daniel.okoye@dabenies.academy', cohort: 'C03', progress: 91, status: 'Active', last: '7h ago' },
  { id: 's4', name: 'Priya Shah', email: 'priya.shah@dabenies.academy', cohort: 'C04', progress: 54, status: 'Active', last: '5h ago' },
  { id: 's5', name: 'Marcus Hale', email: 'marcus.hale@dabenies.academy', cohort: 'C04', progress: 41, status: 'Active', last: '1h ago' },
  { id: 's6', name: 'Lydia Grant', email: 'lydia.grant@dabenies.academy', cohort: 'C02', progress: 100, status: 'Alumni', last: '1d ago' },
  { id: 's7', name: 'Elena Voss', email: 'elena.voss@dabenies.academy', cohort: 'C04', progress: 22, status: 'At Risk', last: '6d ago' },
  { id: 's8', name: 'Jonah Reed', email: 'jonah.reed@dabenies.academy', cohort: 'C03', progress: 67, status: 'Active', last: '2d ago' },
]

export const analytics = {
  activeStudents: 248,
  completionRate: 64,
  communityPosts: 1124,
  avgWatch: '18m',
  weeklyDelta: { students: 12, completion: 4, posts: 86, watch: 2 },
  engagement: [42, 55, 48, 71, 64, 88, 76],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}

export const publishDrafts = [
  { id: 'd1', title: 'Module 5: Paid Ads for Affiliates', status: 'Draft', lessons: 4, updated: 'Yesterday' },
  { id: 'd2', title: 'Live Intensive: Thread-to-Sale Week', status: 'Scheduled', lessons: 3, updated: 'Today 09:40' },
]
