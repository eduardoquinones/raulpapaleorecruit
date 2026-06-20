import { useRef, useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { Plus, Minus } from 'lucide-react'
import { FIPS_TO_CODE, US_ATLAS_STATES_URL } from '../../data/usStateFips'

const STATUS_FILL = {
  saved: '#2B5CE6',
  contacted: '#EA580C',
  committed: '#16A34A',
  none: '#E8EEFF',
}
const HOVER_FILL = '#BFCFFF'

export default function USAMap({ getStateStatus, selectedState, onSelectState, getStateColleges }) {
  const [hovered, setHovered] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef(null)

  const handleMouseMove = (e, name) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setTooltip({ name, x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const selectedColleges = selectedState && getStateColleges ? getStateColleges(selectedState) : []

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(z + 0.5, 4))}
          className="w-7 h-7 rounded-lg bg-white/90 border border-ink/10 shadow-sm flex items-center justify-center text-ink hover:bg-white"
          aria-label="Acercar"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(z - 0.5, 1))}
          className="w-7 h-7 rounded-lg bg-white/90 border border-ink/10 shadow-sm flex items-center justify-center text-ink hover:bg-white"
          aria-label="Alejar"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      <ComposableMap projection="geoAlbersUsa" className="w-full h-auto" style={{ background: 'transparent' }}>
        <ZoomableGroup zoom={zoom} center={[0, 0]} onMoveEnd={({ zoom: z }) => setZoom(z)}>
          <Geographies geography={US_ATLAS_STATES_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const code = FIPS_TO_CODE[geo.id]
                const status = code && getStateStatus ? getStateStatus(code) : 'none'
                const isSelected = code === selectedState
                const isHovered = code === hovered
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => code && onSelectState?.(code)}
                    onMouseEnter={() => setHovered(code)}
                    onMouseMove={(e) => code && handleMouseMove(e, geo.properties.name)}
                    onMouseLeave={() => {
                      setHovered(null)
                      setTooltip(null)
                    }}
                    style={{
                      default: {
                        fill: isHovered ? HOVER_FILL : STATUS_FILL[status] || STATUS_FILL.none,
                        stroke: '#FFFFFF',
                        strokeWidth: isSelected ? 1.5 : 0.75,
                        outline: 'none',
                        cursor: code ? 'pointer' : 'default',
                      },
                      hover: {
                        fill: HOVER_FILL,
                        stroke: '#FFFFFF',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      pressed: {
                        fill: STATUS_FILL[status] || STATUS_FILL.none,
                        stroke: '#FFFFFF',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <span
          className="absolute pointer-events-none whitespace-nowrap glass-dark text-white text-xs px-2.5 py-1 rounded-pill shadow-glass z-20"
          style={{ left: tooltip.x, top: tooltip.y - 36 }}
        >
          {tooltip.name}
        </span>
      )}

      {selectedState && getStateColleges && (
        <div className="mt-3 glass rounded-2xl p-3 text-sm">
          <p className="font-semibold text-ink mb-1">{selectedState}: {selectedColleges.length} universidad{selectedColleges.length === 1 ? '' : 'es'}</p>
          {selectedColleges.length > 0 && (
            <ul className="text-ink-soft text-xs space-y-0.5">
              {selectedColleges.map((c) => <li key={c.id}>{c.name}</li>)}
            </ul>
          )}
        </div>
      )}

      <div className="flex items-center gap-4 mt-4 text-xs text-ink-soft flex-wrap">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: STATUS_FILL.saved }} /> Guardado</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: STATUS_FILL.contacted }} /> Contactado</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: STATUS_FILL.committed }} /> Comprometido</span>
      </div>
    </div>
  )
}
