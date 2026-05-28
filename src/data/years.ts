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
    heroPhoto: '/assets/2016_05_31.jpg',
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
    heroPhoto: '/assets/2017_06_01.jpg',
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
    heroPhoto: '/assets/2018_05_29_1.jpg',
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
    summary: 'Coming back stronger. Light returning, slowly.',
    heroPhoto: '/assets/2019_03_24.jpg',
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
    heroPhoto: '/assets/2020_01_19_1.jpg',
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
    heroPhoto: '/assets/2021_05_01.jpg',
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
    summary: 'Sikkim skies and Meghalaya rain. The trips that ruined us for everywhere else.',
    heroPhoto: '/assets/sikkim/2022_10_27_1.jpg',
    memoryIds: ['mem-9'],
    placeIds: ['sikkim', 'meghalaya'],
    messageIds: [],
    milestones: [
      { icon: 'Mountain', label: 'Sikkim adventure' },
      { icon: 'CloudRain', label: 'Meghalaya monsoons' },
    ],
  },
  {
    year: 2023,
    title: 'New Chapters',
    summary: 'Kolkata streets, Guwahati skies, the Brahmaputra at every angle. A year that felt full.',
    heroPhoto: '/assets/kolkata/2023_11_25_1.jpg',
    memoryIds: [],
    placeIds: ['kolkata', 'guwahati'],
    messageIds: ['msg-8'],
    milestones: [
      { icon: 'MapPin', label: 'Kolkata, again' },
    ],
  },
  {
    year: 2024,
    title: 'Almost a Decade',
    summary: 'Almost ten years. Still not enough. Quiet days at home — the kind that feel like everything.',
    heroPhoto: '/assets/nalbari/2024_10_12.jpg',
    memoryIds: [],
    placeIds: ['nalbari'],
    messageIds: [],
    milestones: [
      { icon: 'Home', label: 'Nalbari, slowly' },
    ],
  },
  {
    year: 2025,
    title: 'Nine Years',
    summary: 'Counting down to the big one. Vrindavan, Nalbari, and a thousand small forevers.',
    heroPhoto: '/assets/vrindavan/2025_11_08.jpg',
    memoryIds: [],
    placeIds: ['vrindavan', 'nalbari'],
    messageIds: [],
    milestones: [
      { icon: 'Sparkles', label: 'Vrindavan, together' },
    ],
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
