import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, Map, List, Star, RotateCcw } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import CollegeCard from '../../components/CollegeCard'
import CollegeDetailModal from '../../components/CollegeDetailModal'
import USAMap from '../../components/map/USAMap'
import PRMap from '../../components/map/PRMap'
import CollegesPanel from '../../components/map/CollegesPanel'
import { usColleges } from '../../data/usColleges'
import { useAthleteData } from '../../context/AthleteDataContext'
import { useAdminData } from '../../context/AdminDataContext'
import { useToast } from '../../components/ui/Toast'

const divisions = ['Todas', 'NCAA I', 'NCAA II', 'NCAA III', 'NAIA', 'LAI', 'NJCAA']
const states = [...new Set(usColleges.map((c) => c.stateCode))].sort()

const DEFAULTS = {
  query: '',
  division: 'Todas',
  showPR: true,
  stateFilter: 'Todos',
  program: 'Todos',
  scholarshipOnly: false,
  maxGpa: 4,
}

// Fills in demo-only filter fields (program/scholarships/enrollment) when an
// admin hasn't explicitly set them, without overwriting real admin-set values.
function enrich(college, i) {
  return {
    ...college,
    program: college.program ?? (i % 3 === 0 ? 'Femenino' : i % 3 === 1 ? 'Masculino' : 'Ambos'),
    scholarships: college.scholarships ?? i % 4 !== 0,
    gpaRequirement: college.gpaMin ?? [2.5, 3.0, 3.25, 3.5][i % 4],
    enrollment: college.enrollment ?? ['Pequeña (<3,000)', 'Mediana (3,000-15,000)', 'Grande (15,000+)'][i % 3],
  }
}

export default function FindColleges() {
  const { universities } = useAdminData()
  const [query, setQuery] = useState(DEFAULTS.query)
  const [division, setDivision] = useState(DEFAULTS.division)
  const [showPR, setShowPR] = useState(DEFAULTS.showPR)
  const [stateFilter, setStateFilter] = useState(DEFAULTS.stateFilter)
  const [program, setProgram] = useState(DEFAULTS.program)
  const [scholarshipOnly, setScholarshipOnly] = useState(DEFAULTS.scholarshipOnly)
  const [maxGpa, setMaxGpa] = useState(DEFAULTS.maxGpa)
  const [view, setView] = useState('map')
  const [detailCollege, setDetailCollege] = useState(null)
  const [panel, setPanel] = useState(null) // { title, colleges, emptyMessage } | null
  const { favorites, toggleFavorite } = useAthleteData()
  const toast = useToast()

  const handleToggleFavorite = (college) => {
    const wasFavorite = favorites.includes(college.id)
    toggleFavorite(college.id)
    toast?.showToast(wasFavorite ? `${college.short || college.name} removida de tus universidades.` : `${college.short || college.name} añadida a tus universidades.`)
  }

  const resetFilters = () => {
    setQuery(DEFAULTS.query)
    setDivision(DEFAULTS.division)
    setShowPR(DEFAULTS.showPR)
    setStateFilter(DEFAULTS.stateFilter)
    setProgram(DEFAULTS.program)
    setScholarshipOnly(DEFAULTS.scholarshipOnly)
    setMaxGpa(DEFAULTS.maxGpa)
    toast?.showToast('Filtros restablecidos.')
  }

  const all = useMemo(() => universities.filter((c) => c.active).map((c, i) => enrich(c, i)), [universities])

  const filtered = useMemo(() => {
    return all.filter((c) => {
      if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false
      if (division !== 'Todas' && !c.division.includes(division)) return false
      if (!showPR && c.region === 'PR') return false
      if (stateFilter !== 'Todos' && c.stateCode !== stateFilter && c.region === 'US') return false
      if (stateFilter !== 'Todos' && c.region === 'PR') return false
      if (program !== 'Todos' && c.program !== program) return false
      if (scholarshipOnly && !c.scholarships) return false
      if (c.gpaRequirement > maxGpa) return false
      return true
    })
  }, [all, query, division, showPR, stateFilter, program, scholarshipOnly, maxGpa])

  const hasCollegesInState = (code) => filtered.some((c) => c.stateCode === code && c.region === 'US')

  const handleSelectState = (code, name) => {
    const stateColleges = filtered.filter((c) => c.stateCode === code && c.region === 'US')
    setPanel({
      title: `Universidades en ${name || code}`,
      colleges: stateColleges,
      emptyMessage: `No hay universidades registradas en ${name || code} aún.`,
    })
  }

  const handleSelectPR = () => {
    const prColleges = filtered.filter((c) => c.region === 'PR')
    setPanel({
      title: 'Universidades en Puerto Rico',
      colleges: prColleges,
      emptyMessage: 'No hay universidades registradas en Puerto Rico aún.',
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
        <h1 className="text-3xl font-heading font-extrabold text-ink">Encuentra Universidades</h1>
        <div className="flex gap-1.5 glass rounded-pill p-1.5">
          <button onClick={() => setView('map')} className={`px-3 py-1.5 rounded-pill text-sm font-medium flex items-center gap-1.5 transition-colors duration-200 ${view === 'map' ? 'bg-electric text-white' : 'text-ink-soft'}`}>
            <Map className="w-4 h-4" /> Mapa
          </button>
          <button onClick={() => setView('list')} className={`px-3 py-1.5 rounded-pill text-sm font-medium flex items-center gap-1.5 transition-colors duration-200 ${view === 'list' ? 'bg-electric text-white' : 'text-ink-soft'}`}>
            <List className="w-4 h-4" /> Lista
          </button>
        </div>
      </div>
      <p className="text-ink-soft mb-8">Explora programas de voleibol en Puerto Rico y Estados Unidos. Haz clic en un estado o en Puerto Rico para ver sus universidades.</p>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <GlassCard className="p-5 h-fit lg:sticky lg:top-24">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal className="w-4 h-4 text-electric" />
            <h2 className="font-heading font-bold text-ink">Filtros</h2>
          </div>

          <div className="relative mb-5">
            <Search className="w-4 h-4 text-ink-soft absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar universidad..." className="filter-select pl-9" />
          </div>

          <Field label="División">
            <select value={division} onChange={(e) => setDivision(e.target.value)} className="filter-select">
              {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>

          <Field label="Estado (EE.UU.)">
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="filter-select">
              <option value="Todos">Todos</option>
              {states.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>

          <label className="flex items-center gap-2 mb-5 text-sm text-ink">
            <input type="checkbox" checked={showPR} onChange={(e) => setShowPR(e.target.checked)} className="accent-electric w-4 h-4" />
            Incluir Puerto Rico
          </label>

          <Field label="Programa de Voleibol">
            <select value={program} onChange={(e) => setProgram(e.target.value)} className="filter-select">
              <option value="Todos">Todos</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Ambos">Ambos</option>
            </select>
          </Field>

          <label className="flex items-center gap-2 mb-5 text-sm text-ink">
            <input type="checkbox" checked={scholarshipOnly} onChange={(e) => setScholarshipOnly(e.target.checked)} className="accent-electric w-4 h-4" />
            Solo con becas disponibles
          </label>

          <Field label={`GPA requerido máximo: ${maxGpa}`}>
            <input type="range" min="2" max="4" step="0.25" value={maxGpa} onChange={(e) => setMaxGpa(Number(e.target.value))} className="w-full accent-electric" />
          </Field>

          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-ink-soft hover:text-electric border border-ink/10 hover:border-electric/30 rounded-pill py-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restablecer filtros
          </button>
        </GlassCard>

        <div>
          <p className="text-sm text-ink-soft mb-4">{filtered.length} universidades encontradas</p>

          {view === 'map' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard hover className="p-6">
                <h3 className="font-heading font-bold text-ink mb-4">Estados Unidos</h3>
                <USAMap hasColleges={hasCollegesInState} onSelectState={handleSelectState} selectedState={null} />
              </GlassCard>
              <GlassCard hover className="p-6">
                <h3 className="font-heading font-bold text-ink mb-4">Puerto Rico</h3>
                <PRMap onSelectRegion={handleSelectPR} />
              </GlassCard>
            </div>
          ) : filtered.length === 0 ? (
            <GlassCard className="p-10 text-center text-ink-soft">No se encontraron universidades con esos filtros.</GlassCard>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => (
                <div key={c.id} className="relative">
                  <button
                    onClick={() => handleToggleFavorite(c)}
                    className="absolute top-3 left-3 z-10 p-1.5 rounded-full bg-white/80 text-gold hover:scale-110 transition-transform"
                  >
                    <Star className={`w-4 h-4 ${favorites.includes(c.id) ? 'fill-gold' : ''}`} />
                  </button>
                  <CollegeCard college={c} onViewMore={setDetailCollege} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CollegesPanel
        open={!!panel}
        onClose={() => setPanel(null)}
        title={panel?.title}
        emptyMessage={panel?.emptyMessage}
        colleges={panel?.colleges || []}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onViewMore={(c) => {
          setPanel(null)
          setDetailCollege(c)
        }}
      />

      <CollegeDetailModal
        college={detailCollege}
        onClose={() => setDetailCollege(null)}
        favorited={detailCollege ? favorites.includes(detailCollege.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="mb-5">
      <label className="text-xs font-semibold text-ink-soft mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
