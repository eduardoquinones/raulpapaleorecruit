import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, MessageSquare } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useToast } from '../../components/ui/Toast'
import { useAdminData } from '../../context/AdminDataContext'

const positions = ['Todas', 'Outside Hitter', 'Setter', 'Middle Blocker', 'Libero', 'Opposite']
const gradYears = ['Todos', 2025, 2026, 2027, 2028]
const divisions = ['Todas', 'NCAA I', 'NCAA II', 'LAI', 'NAIA']
const locations = ['Todas', 'Puerto Rico', 'Estados Unidos']

export default function CoachFindAthletes() {
  const { athletes } = useAdminData()
  const [query, setQuery] = useState('')
  const [position, setPosition] = useState('Todas')
  const [gradYear, setGradYear] = useState('Todos')
  const [minGpa, setMinGpa] = useState(0)
  const [minHeight, setMinHeight] = useState(0)
  const [division, setDivision] = useState('Todas')
  const [location, setLocation] = useState('Todas')
  const [saved, setSaved] = useLocalStorage('vr_coach_saved_athletes', [])
  const toast = useToast()
  const navigate = useNavigate()

  const heightInInches = (h) => {
    const [ft, inch] = h.replace('"', '').split("'").map((v) => parseInt(v, 10))
    return ft * 12 + (inch || 0)
  }

  const filtered = useMemo(() => {
    return athletes.filter((a) => {
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false
      if (position !== 'Todas' && !a.positions.some((p) => p.includes(position))) return false
      if (gradYear !== 'Todos' && a.gradYear !== Number(gradYear)) return false
      if (a.gpa < minGpa) return false
      if (heightInInches(a.height) < minHeight) return false
      if (division !== 'Todas' && !a.preferences.divisions.some((d) => d.includes(division))) return false
      if (location === 'Puerto Rico' && !a.preferences.location.includes('Puerto Rico') && a.preferences.location !== 'Puerto Rico') return false
      if (location === 'Estados Unidos' && !a.preferences.location.includes('Estados Unidos') && a.preferences.location !== 'Estados Unidos') return false
      return true
    })
  }, [athletes, query, position, gradYear, minGpa, minHeight, division, location])

  const toggleSave = (id) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    toast?.showToast(saved.includes(id) ? 'Atleta removido de tus prospectos.' : 'Atleta añadido a tus prospectos.')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-heading font-extrabold text-ink mb-2">Buscar Atletas</h1>
      <p className="text-ink-soft mb-8">Encuentra tu próximo jugador estrella entre el talento de Puerto Rico.</p>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <GlassCard className="p-5 h-fit lg:sticky lg:top-24">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal className="w-4 h-4 text-electric" />
            <h2 className="font-heading font-bold text-ink">Filtros</h2>
          </div>

          <div className="relative mb-5">
            <Search className="w-4 h-4 text-ink-soft absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar atleta..." className="filter-select pl-9" />
          </div>

          <Field label="Posición">
            <select value={position} onChange={(e) => setPosition(e.target.value)} className="filter-select">
              {positions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Año de Graduación">
            <select value={gradYear} onChange={(e) => setGradYear(e.target.value)} className="filter-select">
              {gradYears.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </Field>
          <Field label={`GPA mínimo: ${minGpa}`}>
            <input type="range" min="0" max="4" step="0.1" value={minGpa} onChange={(e) => setMinGpa(Number(e.target.value))} className="w-full accent-electric" />
          </Field>
          <Field label={`Altura mínima: ${Math.floor(minHeight / 12)}'${minHeight % 12}"`}>
            <input type="range" min="60" max="84" step="1" value={minHeight} onChange={(e) => setMinHeight(Number(e.target.value))} className="w-full accent-electric" />
          </Field>
          <Field label="Preferencia de División">
            <select value={division} onChange={(e) => setDivision(e.target.value)} className="filter-select">
              {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Ubicación">
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="filter-select">
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>
        </GlassCard>

        <div>
          <p className="text-sm text-ink-soft mb-4">{filtered.length} atletas encontrados</p>
          {filtered.length === 0 ? (
            <GlassCard className="p-10 text-center text-ink-soft">No se encontraron atletas con esos filtros.</GlassCard>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a) => (
                <GlassCard key={a.id} hover className="overflow-hidden flex flex-col">
                  <div className="h-24 bg-gradient-to-br from-deep to-electric-dark relative">
                    <div className="absolute -bottom-7 left-5 w-14 h-14 rounded-full bg-white/80 border-4 border-white flex items-center justify-center text-ink font-bold">
                      {a.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <button
                      onClick={() => toggleSave(a.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 text-gold hover:scale-110 transition-transform"
                    >
                      <Star className={`w-4 h-4 ${saved.includes(a.id) ? 'fill-gold' : ''}`} />
                    </button>
                  </div>
                  <div className="pt-10 px-5 pb-5 flex flex-col flex-1">
                    <h3 className="font-heading font-bold text-ink">{a.name}</h3>
                    <p className="text-sm text-electric font-medium">{a.positions.join(' / ')}</p>
                    <p className="text-xs text-ink-soft mt-1">{a.school}, {a.city} &middot; Clase {a.gradYear}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
                      <Badge variant="ink">{a.height}</Badge>
                      <Badge variant="ink">GPA {a.gpa}</Badge>
                      <Badge variant="blue">{Math.round(a.stats.attackPct * 100)}% Attack</Badge>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Button as={Link} to={`/athlete/profile/${a.id}`} variant="outlineInk" size="sm" className="flex-1">Ver Perfil</Button>
                      <Button variant="primary" size="sm" onClick={() => navigate('/coach/messages', { state: { openWith: a.name } })}><MessageSquare className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
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
