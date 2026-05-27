import { lazy, Suspense, useState, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider } from '@/providers/AppProvider'
import { CinematicBackground } from '@/components/cinematic/CinematicBackground'
import { MusicToggle } from '@/components/audio/MusicToggle'
import { PressPlay } from '@/pages/Opening/PressPlay'
import { CursorDot } from '@/components/ui/CursorDot'
import { RippleProvider } from '@/components/ui/RippleProvider'

// Lazy-load every page for code-splitting
const OpeningPage     = lazy(() => import('@/pages/Opening').then((m) => ({ default: m.OpeningPage })))
const TimelinePage    = lazy(() => import('@/pages/Timeline').then((m) => ({ default: m.TimelinePage })))
const YearChapterPage = lazy(() => import('@/pages/YearChapter').then((m) => ({ default: m.YearChapterPage })))
const FavoritesPage   = lazy(() => import('@/pages/Favorites').then((m) => ({ default: m.FavoritesPage })))
const MessagesPage    = lazy(() => import('@/pages/Messages').then((m) => ({ default: m.MessagesPage })))
const PlacesPage      = lazy(() => import('@/pages/Places').then((m) => ({ default: m.PlacesPage })))
const LittleThingsPage= lazy(() => import('@/pages/LittleThings').then((m) => ({ default: m.LittleThingsPage })))
const LetterPage      = lazy(() => import('@/pages/Letter').then((m) => ({ default: m.LetterPage })))
const PromisesPage    = lazy(() => import('@/pages/Promises').then((m) => ({ default: m.PromisesPage })))
const EndingPage      = lazy(() => import('@/pages/Ending').then((m) => ({ default: m.EndingPage })))
const NotFoundPage    = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage })))

function PageFallback(): ReactNode {
  return (
    <div className="min-h-dvh flex items-center justify-center" style={{ zIndex: 10, position: 'relative' }}>
      <div className="flex gap-1.5" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'rgba(196,149,42,0.5)',
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function AppRoutes(): ReactNode {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                element={<OpeningPage />} />
        <Route path="/timeline"        element={<TimelinePage />} />
        <Route path="/year/:year"      element={<YearChapterPage />} />
        <Route path="/favorites"       element={<FavoritesPage />} />
        <Route path="/messages"        element={<MessagesPage />} />
        <Route path="/places"          element={<PlacesPage />} />
        <Route path="/little-things"   element={<LittleThingsPage />} />
        <Route path="/letter"          element={<LetterPage />} />
        <Route path="/promises"        element={<PromisesPage />} />
        <Route path="/ending"          element={<EndingPage />} />
        {/* Fallback → Lost in time */}
        <Route path="*"                element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App(): ReactNode {
  // Show PressPlay gate once per session
  const [entered, setEntered] = useState(() => {
    try {
      return sessionStorage.getItem('adou_started') === 'true'
    } catch {
      return false
    }
  })

  const handleEnter = (): void => {
    try { sessionStorage.setItem('adou_started', 'true') } catch { /* ignore */ }
    setEntered(true)
  }

  return (
    <BrowserRouter>
      <AppProvider>
        {/* Custom cursor (desktop only, hides on touch + reduced-motion) */}
        <CursorDot />

        {/* Global tap ripple + heart particle system */}
        <RippleProvider />

        {/* Fixed cinematic background — persists across all pages */}
        <CinematicBackground />

        {/* Optional music toggle */}
        <MusicToggle />

        {/* Press Play gate — shown once per session */}
        <AnimatePresence>
          {!entered && <PressPlay onEnter={handleEnter} />}
        </AnimatePresence>

        {/* Route-based page content */}
        <Suspense fallback={<PageFallback />}>
          <AppRoutes />
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  )
}
