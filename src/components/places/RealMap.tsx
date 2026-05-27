import { type ReactNode, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Place } from '@/types/section'
import 'leaflet/dist/leaflet.css'

interface RealMapProps {
  places: Place[]
  activeId: string | null
  onPinClick: (id: string) => void
}

/**
 * Recenters the map when the active place changes.
 */
function FlyToActive({ places, activeId }: { places: Place[]; activeId: string | null }): null {
  const map = useMap()
  useEffect(() => {
    if (!activeId) return
    const place = places.find((p) => p.id === activeId)
    if (place) map.flyTo([place.lat, place.lng], 8, { duration: 1.1 })
  }, [activeId, places, map])
  return null
}

/**
 * Computes a sensible bounding box around all places + a little padding.
 */
function getBounds(places: Place[]): L.LatLngBoundsExpression {
  const lats = places.map((p) => p.lat)
  const lngs = places.map((p) => p.lng)
  const padLat = 0.6
  const padLng = 0.6
  return [
    [Math.min(...lats) - padLat, Math.min(...lngs) - padLng],
    [Math.max(...lats) + padLat, Math.max(...lngs) + padLng],
  ]
}

export function RealMap({ places, activeId, onPinClick }: RealMapProps): ReactNode {
  const mapRef = useRef<L.Map | null>(null)
  const bounds = getBounds(places)
  const journey: [number, number][] = places.map((p) => [p.lat, p.lng])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 320,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(196,149,42,0.20)',
        background: '#0f0c09',
      }}
    >
      <MapContainer
        bounds={bounds}
        style={{ width: '100%', height: '100%', background: '#0f0c09' }}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        ref={(map) => {
          if (map) mapRef.current = map
        }}
      >
        {/* Dark cinema map tiles — Carto Voyager / Stadia look. Using free Carto dark-matter tiles. */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Travel path */}
        {journey.length > 1 && (
          <Polyline
            positions={journey}
            pathOptions={{
              color: '#c4952a',
              weight: 1.5,
              opacity: 0.6,
              dashArray: '5 6',
            }}
          />
        )}

        {/* Place pins */}
        {places.map((place) => {
          const isActive = activeId === place.id
          return (
            <CircleMarker
              key={place.id}
              center={[place.lat, place.lng]}
              radius={isActive ? 9 : 6}
              pathOptions={{
                color: isActive ? '#e4a93c' : '#c4952a',
                fillColor: isActive ? '#e4a93c' : '#c4952a',
                fillOpacity: 0.9,
                weight: 2,
              }}
              eventHandlers={{
                click: () => onPinClick(place.id),
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -8]}
                opacity={1}
                permanent
                className="cinema-map-tooltip"
              >
                {place.name}
              </Tooltip>
            </CircleMarker>
          )
        })}

        <FlyToActive places={places} activeId={activeId} />
      </MapContainer>

      {/* Warm vignette overlay to integrate with the cinema theme */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 100% at 50% 50%, transparent 30%, rgba(15,12,9,0.55) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(196,149,42,0.04) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.30) 100%)',
        }}
      />
    </div>
  )
}
