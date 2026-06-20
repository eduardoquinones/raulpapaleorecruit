import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import AthleteCard from '../components/AthleteCard'
import GlassCard from '../components/ui/GlassCard'
import { SkeletonGrid } from '../components/ui/Skeleton'
import { useAdminData } from '../context/AdminDataContext'

const positions = ['Todas', 'Outside Hitter', 'Setter', 'Middle Blocker', 'Libero', 'Opposite']
const gradYears = ['Todos', 2025, 2026, 2027, 2028]
const divisions = ['Todas', 'NCAA I', 'NCAA II', 'LAI', 'NAIA']

export default function Athletes() {
  const { athletes } = useAdminData()
  const [query, setQuery] = useState('')
  const [position, setPosition] = useState('Todas')
  const [gradYear, setGradYear] = useState('Todos')
  const [minGpa, setMinGpa] = useState(0)
  const [division, setDivision] = useState('Todas')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    return athletes.filter((a) => {
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false
      if (position !== 'Todas' && !a.positions.some((p) => p.includes(position))) return false
      if (gradYear !== 'Todos' && a.gradYear !== Number(gradYear)) return false
      if (a.gpa < minGpa) return false
      if (division !== 'Todas' && !a.preferences.divisions.some((d) => d.includes(division))) return false
      return true
    })
  }, [athletes, query, position, gradYear, minGpa, division])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-heading font-extrabold text-ink mb-2">Encuentra Atletas</h1>
      <p className="text-ink-soft mb-8">Explora atletas de voleibol de Puerto Rico listos para el siguiente nivel.</p>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <GlassCard className="p-5 h-fit lg:sticky lg:top-24">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal className="w-4 h-4 text-electric" />
            <h2 className="font-heading font-bold text-ink">Filtros</h2>
          </div>

          <div className="relative mb-5">
            <Search className="w-4 h-4 text-ink-soft absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar atleta..." className="filter-select pl-9" />
          </div>

          <FilterGroup label="Posición">
            <select value={position} onChange={(e) => setPosition(e.target.value)} className="filter-select">
              {positions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </FilterGroup>

          <FilterGroup label="Año de Graduación">
            <select value={gradYear} onChange={(e) => setGradYear(e.target.value)} className="filter-select">
              {gradYears.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </FilterGroup>

          <FilterGroup label={`GPA mínimo: ${minGpa}`}>
            <input type="range" min="0" max="4" step="0.1" value={minGpa} onChange={(e) => setMinGpa(Number(e.target.value))} className="w-full accent-electric" />
          </FilterGroup>

          <FilterGroup label="Preferencia de División">
            <select value={division} onChange={(e) => setDivision(e.target.value)} className="filter-select">
              {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </FilterGroup>
        </GlassCard>

        <div>
          {loading ? (
            <SkeletonGrid count={6} />
          ) : (
            <>
              <p className="text-sm text-ink-soft mb-4">{filtered.length} atletas encontrados</p>
              {filtered.length === 0 ? (
                <GlassCard className="p-10 text-center text-ink-soft">No se encontraron atletas con esos filtros.</GlassCard>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((a) => <AthleteCard key={a.id} athlete={a} />)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ label, children }) {
  return (
    <div className="mb-5">
      <label className="text-xs font-semibold text-ink-soft mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
