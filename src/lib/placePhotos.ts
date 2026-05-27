import type { Place } from '@/types/section'

/**
 * Returns the photos for a place as an array.
 * Prefers `photos`; falls back to legacy single `photo` field.
 */
export function getPlacePhotos(place: Pick<Place, 'photos' | 'photo'>): string[] {
  if (place.photos && place.photos.length > 0) return place.photos
  if (place.photo) return [place.photo]
  return []
}

/** Returns the hero photo (first one) for a place, or undefined if none */
export function getPlaceHero(place: Pick<Place, 'photos' | 'photo'>): string | undefined {
  return getPlacePhotos(place)[0]
}
