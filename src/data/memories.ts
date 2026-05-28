import type { MemoryCard } from '@/types/section'

/**
 * ── MEMORIES DATA ────────────────────────────────────────────────────────
 *
 * Add / edit entries here. Fields:
 *   id          unique string
 *   title       short memory name shown on the card
 *   date        display date  "Mar 2019"
 *   year        numeric year  2019   (used to sort into year chapters)
 *   description longer caption shown in the expanded viewer
 *   imageUrl    path inside public/  e.g. "/assets/2018_05_29_1.jpg"
 *   placeId     optional place id from PLACES   e.g. "kolkata"
 *   featured    true = shown in Favorite Moments collage
 *   mediaType   'photo' | 'video' | 'audio' | 'letter' | 'ticket'
 *
 * You can add as many entries as you want — the layouts adapt.
 */
export const MEMORIES: MemoryCard[] = [
  {
    id: 'mem-1',
    title: 'Where it all started',
    date: 'May 2016',
    year: 2016,
    description: 'That evening in May 2016. We had no idea what was beginning.',
    imageUrl: '/assets/2016_05_31.jpg',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-2',
    title: 'The early days',
    date: 'Jun 2016',
    year: 2016,
    description: 'Still figuring each other out. Still smiling all the time.',
    imageUrl: '/assets/2016_06_25_1.jpg',
    mediaType: 'photo',
  },
  {
    id: 'mem-3',
    title: 'First year together',
    date: 'May 2017',
    year: 2017,
    description: 'A year of firsts — first fights, first make-ups, first everything.',
    imageUrl: '/assets/2017_05_24.jpg',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-4',
    title: 'Guwahati trip',
    date: 'Aug 2017',
    year: 2017,
    description: 'The city felt like ours that weekend.',
    imageUrl: '/assets/2017_08_07.jpg',
    placeId: 'guwahati',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-5',
    title: 'The hard season',
    date: 'Nov 2018',
    year: 2018,
    description: 'The year that tested us. The year we stayed anyway.',
    imageUrl: '/assets/2018_11_11_1.jpg',
    featured: false,
    mediaType: 'photo',
  },
  {
    id: 'mem-6',
    title: 'Kolkata streets',
    date: 'Mar 2019',
    year: 2019,
    description: 'Streets full of lights, fog and dreams.',
    imageUrl: '/assets/2019_03_24.jpg',
    placeId: 'kolkata',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-7',
    title: 'Udalguri escape',
    date: 'Dec 2020',
    year: 2020,
    description: 'Quiet roads, cool air, just us.',
    imageUrl: '/assets/2020_12_13.jpg',
    placeId: 'udalguri',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-8',
    title: 'Still us',
    date: 'Jun 2021',
    year: 2021,
    description: 'Five years in and it still felt like the beginning.',
    imageUrl: '/assets/2021_06_09_1.jpg',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-9',
    title: 'Sikkim skies',
    date: 'Oct 2022',
    year: 2022,
    description: 'The mountains felt like they were built just for us.',
    imageUrl: '/assets/sikkim/2022_10_27_3.jpg',
    placeId: 'sikkim',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-10',
    title: 'A decade in',
    date: 'May 2026',
    year: 2026,
    description: 'Ten years. And somehow, still just getting started.',
    imageUrl: '/assets/vrindavan/2025_11_08.jpg',
    featured: true,
    mediaType: 'photo',
  },
]

export const FEATURED_MEMORIES = MEMORIES.filter((m) => m.featured)
