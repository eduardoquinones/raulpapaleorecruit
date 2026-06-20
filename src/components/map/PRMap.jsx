import { useState } from 'react'
import { prColleges } from '../../data/prColleges'

const STATUS_COLORS = {
  saved: '#2B5CE6',
  contacted: '#EA580C',
  committed: '#16A34A',
  none: '#94A3B8',
}

// A simplified but smooth Puerto Rico island silhouette (not a precise coastline,
// but a recognizable rounded landmass instead of a plain rounded rectangle).
const ISLAND_PATH =
  'M4,18 C4,10 12,5 22,4.5 C35,3.5 50,3 64,4 C78,5 90,7 95,13 ' +
  'C98,16.5 97,21 93,25 C86,31 72,34 58,34.5 C44,35 28,34 16,30 ' +
  'C8,27 4,23.5 4,18 Z'

export default function PRMap({ getCollegeStatus, selectedCollege, onSelectCollege }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative">
      <div className="relative w-full aspect-[2.6/1] rounded-2xl bg-electric/5 border border-electric/10 overflow-hidden">
        <svg viewBox="0 0 100 38" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d={ISLAND_PATH} fill="#2B5CE6" opacity="0.1" stroke="#2B5CE6" strokeOpacity="0.25" strokeWidth="0.5" />
        </svg>

        {prColleges.map((college) => {
          const status = getCollegeStatus ? getCollegeStatus(college.id) : 'none'
          const isSelected = selectedCollege === college.id
          return (
            <button
              key={college.id}
              type="button"
              onClick={() => onSelectCollege?.(college.id)}
              onMouseEnter={() => setHovered(college.id)}
              onMouseLeave={() => setHovered((h) => (h === college.id ? null : h))}
              style={{ left: `${college.x}%`, top: `${college.y}%`, backgroundColor: STATUS_COLORS[status] }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md transition-transform ${
                isSelected ? 'scale-150 ring-2 ring-offset-1 ring-electric z-10' : 'hover:scale-125'
              }`}
            >
              {hovered === college.id && (
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap glass-dark text-white text-xs px-2.5 py-1 rounded-pill shadow-glass z-20">
                  {college.short}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-ink-soft flex-wrap">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: STATUS_COLORS.saved }} /> Guardado</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: STATUS_COLORS.contacted }} /> Contactado</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: STATUS_COLORS.committed }} /> Comprometido</span>
      </div>
    </div>
  )
}
