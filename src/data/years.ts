import type { YearChapter } from '@/types/section'

/**
 * ── YEAR CHAPTERS ────────────────────────────────────────────────────────
 *
 * One entry per year from 2016 to 2026.
 * Edit: title, summary, heroPhoto, and which memory/place/message ids belong here.
 * The memories and places must exist in memories.ts and places.ts.
 */
export const YEARS: YearChapter[] = [
  {
    year: 2016,
    title: 'The Beginning',
    summary: 'Two people. One evening. The start of everything.',
    heroPhoto: '/memories/img1.jpg',
    memoryIds: ['mem-1', 'mem-2', 'mem-3'],
    placeIds: [],
    messageIds: ['msg-1', 'msg-2'],
    milestones: [
      { icon: 'Heart', label: 'First day' },
      { icon: 'Star', label: 'First year' },
    ],
  },
  {
    year: 2017,
    title: 'Growing',
    summary: 'Building something real. Finding our rhythm.',
    heroPhoto: '/memories/img4.jpg',
    memoryIds: ['mem-4'],
    placeIds: ['guwahati'],
    messageIds: ['msg-3'],
    milestones: [
      { icon: 'MapPin', label: 'Guwahati trip' },
    ],
  },
  {
    year: 2018,
    title: 'The Hard Year',
    summary: 'It wasn\'t easy. But we stayed. That said everything.',
    heroPhoto: '/memories/img5.jpg',
    memoryIds: ['mem-5'],
    placeIds: [],
    messageIds: ['msg-4'],
    milestones: [
      { icon: 'Shield', label: 'Stayed together' },
    ],
  },
  {
    year: 2019,
    title: 'Finding Our Way',
    summary: 'Coming back stronger. Kolkata magic.',
    heroPhoto: '/memories/img6.jpg',
    memoryIds: ['mem-6'],
    placeIds: ['kolkata'],
    messageIds: ['msg-5'],
    milestones: [
      { icon: 'MapPin', label: 'Kolkata' },
    ],
  },
  {
    year: 2020,
    title: 'Quiet & Together',
    summary: 'The world slowed. We stayed close.',
    heroPhoto: '/memories/img7.jpg',
    memoryIds: ['mem-7'],
    placeIds: ['udalguri'],
    messageIds: ['msg-6'],
    milestones: [
      { icon: 'Home', label: 'Udalguri escape' },
    ],
  },
  {
    year: 2021,
    title: 'Five Years',
    summary: 'Half a decade. Still choosing each other every single day.',
    heroPhoto: '/memories/img8.jpg',
    memoryIds: ['mem-8'],
    placeIds: [],
    messageIds: ['msg-7'],
    milestones: [
      { icon: 'CalendarCheck', label: '5 year milestone' },
    ],
  },
  {
    year: 2022,
    title: 'The Mountains',
    summary: 'Sikkim skies. The most beautiful trip we ever took.',
    heroPhoto: '/memories/img9.jpg',
    memoryIds: ['mem-9'],
    placeIds: ['sikkim'],
    messageIds: [],
    milestones: [
      { icon: 'Mountain', label: 'Sikkim adventure' },
    ],
  },
  {
    year: 2023,
    title: 'New Chapters',
    summary: 'Every year surprises us. This one more than most.',
    heroPhoto: undefined,
    memoryIds: [],
    placeIds: [],
    messageIds: ['msg-8'],
    milestones: [],
  },
  {
    year: 2024,
    title: 'Almost a Decade',
    summary: 'Almost ten years. Still not enough.',
    heroPhoto: undefined,
    memoryIds: [],
    placeIds: [],
    messageIds: [],
    milestones: [],
  },
  {
    year: 2025,
    title: 'Nine Years',
    summary: 'Counting down to the big one.',
    heroPhoto: undefined,
    memoryIds: [],
    placeIds: [],
    messageIds: [],
    milestones: [],
  },
  {
    year: 2026,
    title: 'A Decade',
    summary: 'Ten years. Thousands of moments. One beautiful story.',
    heroPhoto: '/memories/img10.jpg',
    memoryIds: ['mem-10'],
    placeIds: [],
    messageIds: ['msg-9'],
    milestones: [
      { icon: 'Award', label: '10 year anniversary' },
    ],
  },
]

export const YEAR_LIST = YEARS.map((y) => y.year)
export const MIN_YEAR = YEAR_LIST[0]!
export const MAX_YEAR = YEAR_LIST[YEAR_LIST.length - 1]!
