import type { Place } from '@/types/section'

/**
 * ── PLACES ───────────────────────────────────────────────────────────────
 *
 * Each place can have MULTIPLE photos. Add as many as you like to the
 * `photos` array — the first one is shown as the hero on the Places grid,
 * the rest appear in the swipeable gallery when the place is tapped.
 *
 * Photos live under /public/assets/<place-id>/ and are named YYYY_MM_DD[_n].jpg
 * after running scripts/rename-photos.mjs and scripts/optimize-images.mjs.
 *
 * lat/lng are real coordinates used by the Leaflet map.
 */
export const PLACES: Place[] = [
  {
    id: 'guwahati',
    name: 'Guwahati',
    region: 'Assam',
    photos: [
      '/assets/guwahati/2023_01_30_1.jpg',
      '/assets/guwahati/2023_01_30_2.jpg',
      '/assets/guwahati/2023_01_30_3.jpg',
      '/assets/guwahati/2023_11_22.jpg',
      '/assets/guwahati/2023_12_26_1.jpg',
      '/assets/guwahati/2023_12_26_2.jpg',
      '/assets/guwahati/2023_12_26_3.jpg',
    ],
    dates: 'Jan – Dec 2023',
    note: 'The Brahmaputra at dusk. The best evenings we ever shared.',
    lat: 26.1445,
    lng: 91.7362,
    memoryIds: ['mem-4'],
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    region: 'West Bengal',
    photos: [
      '/assets/kolkata/2023_11_22_1.jpg',
      '/assets/kolkata/2023_11_22_2.jpg',
      '/assets/kolkata/2023_11_23_1.jpg',
      '/assets/kolkata/2023_11_23_2.jpg',
      '/assets/kolkata/2023_11_23_3.jpg',
      '/assets/kolkata/2023_11_24_1.jpg',
      '/assets/kolkata/2023_11_24_2.jpg',
      '/assets/kolkata/2023_11_25_1.jpg',
      '/assets/kolkata/2023_11_25_2.jpg',
      '/assets/kolkata/2023_11_26.jpg',
      '/assets/kolkata/2023_11_27.jpg',
      '/assets/kolkata/2023_11_28.jpg',
    ],
    dates: 'Nov 2023',
    note: 'Streets full of golden light. The city of joy felt like ours.',
    lat: 22.5726,
    lng: 88.3639,
    memoryIds: ['mem-6'],
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    region: 'Meghalaya',
    photos: [
      '/assets/meghalaya/2022_10_23_1.jpg',
      '/assets/meghalaya/2022_10_23_2.jpg',
      '/assets/meghalaya/2022_10_24_1.jpg',
      '/assets/meghalaya/2022_10_24_2.jpg',
    ],
    dates: 'Oct 2022',
    note: 'Cloud-soaked valleys and waterfalls that wouldn’t end. We barely spoke.',
    lat: 25.467,
    lng: 91.366,
    memoryIds: [],
  },
  {
    id: 'nalbari',
    name: 'Nalbari',
    region: 'Assam',
    photos: [
      '/assets/nalbari/2024_10_12.jpg',
      '/assets/nalbari/2025_05_21_1.jpg',
      '/assets/nalbari/2025_05_21_2.jpg',
      '/assets/nalbari/2025_05_21_3.jpg',
      '/assets/nalbari/2025_05_21_4.jpg',
    ],
    dates: 'Oct 2024 – May 2025',
    note: 'Home — the quiet kind. Where every room remembers us.',
    lat: 26.4435,
    lng: 91.4411,
    memoryIds: [],
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    region: 'Sikkim',
    photos: [
      '/assets/sikkim/2022_10_23_1.jpg',
      '/assets/sikkim/2022_10_23_2.jpg',
      '/assets/sikkim/2022_10_25.jpg',
      '/assets/sikkim/2022_10_26.jpg',
      '/assets/sikkim/2022_10_27_1.jpg',
      '/assets/sikkim/2022_10_27_2.jpg',
      '/assets/sikkim/2022_10_27_3.jpg',
      '/assets/sikkim/2022_10_27_4.jpg',
      '/assets/sikkim/2022_10_27_5.jpg',
    ],
    dates: 'Oct 2022',
    note: 'The mountains held their breath while we stood together.',
    lat: 27.3389,
    lng: 88.6065,
    memoryIds: ['mem-9'],
  },
  {
    id: 'udalguri',
    name: 'Udalguri',
    region: 'Assam',
    photos: [
      '/assets/udalguri/2022_12_24_1.jpg',
      '/assets/udalguri/2022_12_24_2.jpg',
      '/assets/udalguri/2022_12_24_3.jpg',
      '/assets/udalguri/2023_04_10.jpg',
      '/assets/udalguri/2023_05_07.jpg',
      '/assets/udalguri/2023_05_28.jpg',
      '/assets/udalguri/2023_12_03.jpg',
      '/assets/udalguri/2023_12_12.jpg',
    ],
    dates: 'Dec 2022 – Dec 2023',
    note: "Quiet hills, cool air, and nowhere else we'd rather be.",
    lat: 26.7501,
    lng: 92.1031,
    memoryIds: ['mem-7'],
  },
  {
    id: 'vrindavan',
    name: 'Vrindavan',
    region: 'Uttar Pradesh',
    photos: [
      '/assets/vrindavan/2025_11_06_1.jpg',
      '/assets/vrindavan/2025_11_06_2.jpg',
      '/assets/vrindavan/2025_11_06_3.jpg',
      '/assets/vrindavan/2025_11_07_1.jpg',
      '/assets/vrindavan/2025_11_07_2.jpg',
      '/assets/vrindavan/2025_11_08.jpg',
    ],
    dates: 'Nov 2025',
    note: 'Krishna everywhere, and you beside me. Even the silence felt sweet.',
    lat: 27.5806,
    lng: 77.7006,
    memoryIds: [],
  },
]

export const PLACE_STATS = {
  cities: PLACES.length,
  trips: 12,
}
