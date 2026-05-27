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
 *   imageUrl    path inside public/  e.g. "/memories/img1.jpg"
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
    imageUrl: '/memories/img1.jpg',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-2',
    title: 'The early days',
    date: 'Aug 2016',
    year: 2016,
    description: 'Still figuring each other out. Still smiling all the time.',
    imageUrl: '/memories/img2.jpg',
    mediaType: 'photo',
  },
  {
    id: 'mem-3',
    title: 'First year together',
    date: 'Dec 2016',
    year: 2016,
    description: 'A year of firsts — first fights, first make-ups, first everything.',
    imageUrl: '/memories/img3.jpg',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-4',
    title: 'Guwahati trip',
    date: 'Aug 2017',
    year: 2017,
    description: 'The city felt like ours that weekend.',
    imageUrl: '/memories/img4.jpg',
    placeId: 'guwahati',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-5',
    title: 'The hard season',
    date: '2018',
    year: 2018,
    description: 'The year that tested us. The year we stayed anyway.',
    imageUrl: '/memories/img5.jpg',
    featured: false,
    mediaType: 'photo',
  },
  {
    id: 'mem-6',
    title: 'Kolkata streets',
    date: 'Mar 2019',
    year: 2019,
    description: 'Streets full of lights, fog and dreams.',
    imageUrl: '/memories/img6.jpg',
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
    imageUrl: '/memories/img7.jpg',
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
    imageUrl: '/memories/img8.jpg',
    featured: true,
    mediaType: 'photo',
  },
  {
    id: 'mem-9',
    title: 'Sikkim skies',
    date: 'May 2022',
    year: 2022,
    description: 'The mountains felt like they were built just for us.',
    imageUrl: '/memories/img9.jpg',
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
    imageUrl: '/memories/img10.jpg',
    featured: true,
    mediaType: 'photo',
  },
]

export const FEATURED_MEMORIES = MEMORIES.filter((m) => m.featured)
