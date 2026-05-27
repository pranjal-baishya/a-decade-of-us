import type { Place } from '@/types/section'

/**
 * ── PLACES ───────────────────────────────────────────────────────────────
 *
 * Each place can have MULTIPLE photos. Add as many as you like to the
 * `photos` array — the first one is shown as the hero on the Places grid,
 * the rest appear in the swipeable gallery when the place is tapped.
 *
 * lat/lng are real coordinates used by the Leaflet map.
 */
export const PLACES: Place[] = [
  {
    id: 'kolkata',
    name: 'Kolkata',
    region: 'West Bengal',
    photos: [
      '/memories/img6.jpg',
      // Add more Kolkata photos here, e.g.:
      // '/places/kolkata-2.jpg',
      // '/places/kolkata-3.jpg',
    ],
    dates: 'Mar 2019',
    note: 'Streets full of golden light. The city of joy felt like ours.',
    lat: 22.5726,
    lng: 88.3639,
    memoryIds: ['mem-6'],
  },
  {
    id: 'guwahati',
    name: 'Guwahati',
    region: 'Assam',
    photos: [
      '/memories/img4.jpg',
    ],
    dates: 'Aug 2017',
    note: 'The Brahmaputra at dusk. The best evening we ever shared.',
    lat: 26.1445,
    lng: 91.7362,
    memoryIds: ['mem-4'],
  },
  {
    id: 'udalguri',
    name: 'Udalguri',
    region: 'Assam',
    photos: [
      '/memories/img7.jpg',
    ],
    dates: 'Dec 2020',
    note: "Quiet hills, cool air, and nowhere else we'd rather be.",
    lat: 26.7501,
    lng: 92.1031,
    memoryIds: ['mem-7'],
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    region: 'Sikkim',
    photos: [
      '/memories/img9.jpg',
    ],
    dates: 'May 2022',
    note: 'The mountains held their breath while we stood together.',
    lat: 27.3389,
    lng: 88.6065,
    memoryIds: ['mem-9'],
  },
]

export const PLACE_STATS = {
  cities: PLACES.length,
  trips: 12,
}
