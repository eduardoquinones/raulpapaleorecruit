import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { prColleges } from '../../data/prColleges'

const PIN_COLOR = '#2B5CE6'

// A simplified but smooth Puerto Rico island silhouette (not a precise coastline,
// but a recognizable rounded landmass instead of a plain rounded rectangle).
const ISLAND_PATH =
  'M4,18 C4,10 12,5 22,4.5 C35,3.5 50,3 64,4 C78,5 90,7 95,13 ' +
  'C98,16.5 97,21 93,25 C86,31 72,34 58,34.5 C44,35 28,34 16,30 ' +
  'C8,27 4,23.5 4,18 Z'

export default function PRMap({ onSelectRegion }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onSelectRegion?.()}
        className="relative w-full aspect-[2.6/1] rounded-2xl bg-electric/5 border border-electric/10 overflow-hidden cursor-pointer group transition-colors hover:bg-electric/10"
        aria-label="Ver todas las universidades de Puerto Rico"
      >
        <svg viewBox="0 0 100 38" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d={ISLAND_PATH}
            fill="#2B5CE6"
            opacity="0.12"
            stroke="#2B5CE6"
            strokeOpacity="0.3"
            strokeWidth="0.5"
            className="transition-opacity duration-200 group-hover:opacity-90"
          />
        </svg>

        {prColleges.map((college) => (
          <span
            key={college.id}
            onMouseEnter={(e) => {
              e.stopPropagation()
              setHovered(college.id)
            }}
            onMouseLeave={() => setHovered((h) => (h === college.id ? null : h))}
            style={{ left: `${college.x}%`, top: `${college.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full"
          >
            <MapPin
              className="w-6 h-6 drop-shadow-md transition-transform hover:scale-125"
              style={{ color: PIN_COLOR, fill: PIN_COLOR }}
              strokeWidth={1.5}
              stroke="#FFFFFF"
            />
            {hovered === college.id && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap glass-dark text-white text-xs px-2.5 py-1 rounded-pill shadow-glass z-20">
                {college.short}
              </span>
            )}
          </span>
        ))}

        <span className="absolute bottom-2 right-3 text-[11px] font-medium text-electric bg-white/80 rounded-pill px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Ver todas las universidades
        </span>
      </button>

      <div className="flex items-center gap-2 mt-4 text-xs text-ink-soft">
        <MapPin className="w-3.5 h-3.5" style={{ color: PIN_COLOR }} />
        {prColleges.length} universidades en Puerto Rico &middot; haz clic en el mapa para verlas todas
      </div>
    </div>
  )
}
