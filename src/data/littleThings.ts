import type { LittleThing } from '@/types/section'

/**
 * ── LITTLE THINGS ABOUT US ───────────────────────────────────────────────
 *
 * The small details that define your relationship.
 * iconName = any Lucide icon name (PascalCase). See LittleThings/index.tsx
 * for the icons currently mapped — add more there if needed.
 */
export const LITTLE_THINGS: LittleThing[] = [
  {
    id: 'lt-1',
    iconName: 'Music',
    label: 'Our Songs',
    detail: 'O Manu O Manu · Ulomi Ulomi Thke · Manu Kya Mile…',
    category: 'favorites',
  },
  {
    id: 'lt-2',
    iconName: 'Coffee',
    label: 'Our Food',
    detail: 'Puri ru Bootr Ghugni (laaj lga tu), coffee with homemade oats peda.',
    category: 'favorites',
  },
  {
    id: 'lt-3',
    iconName: 'Smile',
    label: 'Favourite Characters',
    detail: 'Regie · Gadget Maharani · Hunter · BGB.',
    category: 'us',
  },
  {
    id: 'lt-4',
    iconName: 'Film',
    label: 'Movie Nights',
    detail: 'The Secret Life of Pets · Stray.',
    category: 'habits',
  },
  {
    id: 'lt-5',
    iconName: 'Calendar',
    label: 'First Date',
    detail: 'Midtown Restaurant, Nalbari.',
    category: 'milestones',
  },
  {
    id: 'lt-6',
    iconName: 'Tag',
    label: 'Love Names',
    detail: 'Manu · Kutu · Tapu · Legulu Ji · Bubuli Ji · BGB · Munuli Ji · Sofy.',
    category: 'us',
  },
  {
    id: 'lt-7',
    iconName: 'Home',
    label: 'Comfort Place',
    detail: 'In your arms — in any place.',
    category: 'favorites',
  },
  {
    id: 'lt-8',
    iconName: 'Moon',
    label: 'Always Do',
    detail: 'Gamu gamu with manu · ruti bela · mamu mamu · tapu kamu · pithit utha.',
    category: 'habits',
  },
]
