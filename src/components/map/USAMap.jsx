import { useRef, useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { Plus, Minus, RotateCcw } from 'lucide-react'
import { FIPS_TO_CODE, US_ATLAS_STATES_URL } from '../../data/usStateFips'
import MapLegend from './MapLegend'

const FILL_DEFAULT = '#E8EEFF'
const FILL_AVAILABLE = '#C5D5FF'
const FILL_HOVER = '#BFCFFF'

export default function USAMap({ hasColleges, selectedState, onSelectState }) {
  const [hovered, setHovered] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef(null)

  const handleMouseMove = (e, name) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setTooltip({ name, x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const controlBtn =
    'w-8 h-8 rounded-xl bg-white/95 border border-ink/10 shadow-glass flex items-center justify-center text-ink hover:bg-white hover:shadow-glass-lg transition-all duration-200'

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5">
        <button type="button" onClick={() => setZoom((z) => Math.min(z + 0.5, 4))} className={controlBtn} aria-label="Acercar">
          <Plus className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => setZoom((z) => Math.max(z - 0.5, 1))} className={controlBtn} aria-label="Alejar">
          <Minus className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => setZoom(1)} className={controlBtn} aria-label="Restablecer zoom">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <ComposableMap projection="geoAlbersUsa" className="w-full h-auto" style={{ background: 'transparent' }}>
        <ZoomableGroup zoom={zoom} center={[0, 0]} onMoveEnd={({ zoom: z }) => setZoom(z)}>
          <Geographies geography={US_ATLAS_STATES_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const code = FIPS_TO_CODE[geo.id]
                const available = code && hasColleges ? hasColleges(code) : false
                const isSelected = code === selectedState
                const isHovered = code === hovered
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => code && onSelectState?.(code, geo.properties.name)}
                    onMouseEnter={() => setHovered(code)}
                    onMouseMove={(e) => code && handleMouseMove(e, geo.properties.name)}
                    onMouseLeave={() => {
                      setHovered(null)
                      setTooltip(null)
                    }}
                    className={isHovered && code ? 'map-state-hover' : ''}
                    style={{
                      default: {
                        fill: isHovered ? FILL_HOVER : available ? FILL_AVAILABLE : FILL_DEFAULT,
                        stroke: '#FFFFFF',
                        strokeWidth: isSelected ? 1.75 : 0.75,
                        outline: 'none',
                        cursor: code ? 'pointer' : 'default',
                        transition: 'fill 0.2s ease',
                      },
                      hover: {
                        fill: FILL_HOVER,
                        stroke: '#FFFFFF',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      pressed: {
                        fill: available ? FILL_AVAILABLE : FILL_DEFAULT,
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

      <MapLegend
        items={[
          { color: FILL_AVAILABLE, label: 'Universidades disponibles' },
          { color: FILL_DEFAULT, label: 'Sin universidades' },
        ]}
      />
    </div>
  )
}
