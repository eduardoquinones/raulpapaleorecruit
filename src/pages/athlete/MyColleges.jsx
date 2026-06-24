import { useMemo, useState } from 'react'
import { Star, MapPin, Users, Check, ChevronDown, ChevronUp } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import CollegeLogo from '../../components/CollegeLogo'
import { prColleges } from '../../data/prColleges'
import { usColleges } from '../../data/usColleges'
import { useAthleteData } from '../../context/AthleteDataContext'
import { useToast } from '../../components/ui/Toast'

const STATUS_COLORS = { saved: '#2B5CE6', contacted: '#EA580C', committed: '#16A34A' }
const STATUS_LABELS = { saved: 'Guardado', contacted: 'Contactado', committed: 'Comprometido' }
const STEP_ORDER = ['saved', 'contacted', 'committed']

export default function MyColleges() {
  const { favorites, toggleFavorite, collegeStatus, setStatus, collegeNotes, setCollegeNote } = useAthleteData()
  const [expanded, setExpanded] = useState(null)
  const toast = useToast()

  const handleRemoveFavorite = (college) => {
    toggleFavorite(college.id)
    toast?.showToast(`${college.short || college.name} removida de tus universidades.`)
  }

  const allColleges = useMemo(() => [...prColleges, ...usColleges], [])
  const savedColleges = useMemo(
    () => allColleges.filter((c) => favorites.includes(c.id)),
    [allColleges, favorites]
  )

  const getStatus = (collegeId) => collegeStatus[collegeId] || 'saved'

  const counts = {
    saved: savedColleges.length,
    contacted: savedColleges.filter((c) => getStatus(c.id) === 'contacted').length,
    committed: savedColleges.filter((c) => getStatus(c.id) === 'committed').length,
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-heading font-extrabold text-ink mb-2">Mis Universidades</h1>
      <p className="text-ink-soft mb-8">Rastrea tu progreso de reclutamiento universidad por universidad.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <GlassCard className="p-5 text-center">
          <div className="text-3xl font-extrabold" style={{ color: STATUS_COLORS.saved }}>{counts.saved}</div>
          <div className="text-sm text-ink-soft mt-1">Guardadas</div>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <div className="text-3xl font-extrabold" style={{ color: STATUS_COLORS.contacted }}>{counts.contacted}</div>
          <div className="text-sm text-ink-soft mt-1">Contactadas</div>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <div className="text-3xl font-extrabold" style={{ color: STATUS_COLORS.committed }}>{counts.committed}</div>
          <div className="text-sm text-ink-soft mt-1">Comprometida</div>
        </GlassCard>
      </div>

      <h3 className="font-heading font-bold text-ink text-xl mb-4">Lista de Universidades</h3>
      {savedColleges.length === 0 ? (
        <GlassCard className="p-10 text-center text-ink-soft">
          No tienes universidades guardadas todavía. Visita "Encuentra Universidades" para empezar.
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-5">
          {savedColleges.map((college) => {
            const status = getStatus(college.id)
            const stepIndex = STEP_ORDER.indexOf(status)
            const isOpen = expanded === college.id
            return (
              <GlassCard key={college.id} hover premium className="p-6">
                <div className="flex items-start gap-4 flex-wrap">
                  <CollegeLogo college={college} size={64} />
                  <div className="flex-1 min-w-[200px]">
                    <p className="font-heading font-bold text-ink text-lg">{college.name}</p>
                    <p className="text-sm text-ink-soft flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" /> {college.city}{college.state ? `, ${college.region === 'US' ? college.stateCode : college.state}` : ''}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant={college.region === 'US' ? 'blue' : 'gold'}>{college.division}</Badge>
                      <span className="text-xs text-ink-soft flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {college.rosterSpots} cupos disponibles</span>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveFavorite(college)} className="text-gold hover:scale-110 transition-transform shrink-0">
                    <Star className="w-6 h-6 fill-gold" />
                  </button>
                </div>

                {/* progress checklist */}
                <div className="flex items-center gap-2 mt-5">
                  {STEP_ORDER.map((s, i) => {
                    const reached = i <= stepIndex
                    return (
                      <div key={s} className="flex items-center flex-1">
                        <button
                          onClick={() => setStatus(college.id, s)}
                          style={reached ? { backgroundColor: STATUS_COLORS[s], borderColor: STATUS_COLORS[s] } : undefined}
                          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-pill border font-medium transition-colors duration-200 ${
                            reached ? 'text-white' : 'bg-white/50 text-ink-soft border-ink/10'
                          }`}
                        >
                          {reached && <Check className="w-3 h-3" />}
                          {STATUS_LABELS[s]}
                        </button>
                        {i < STEP_ORDER.length - 1 && (
                          <div className={`h-0.5 flex-1 mx-1.5 rounded ${i < stepIndex ? 'bg-electric' : 'bg-ink/10'}`} />
                        )}
                      </div>
                    )
                  })}
                </div>

                <button
                  onClick={() => setExpanded((e) => (e === college.id ? null : college.id))}
                  className="flex items-center gap-1.5 text-sm font-medium text-electric hover:underline mt-4"
                >
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {isOpen ? 'Ocultar notas' : 'Notas privadas'}
                </button>

                {isOpen && (
                  <div className="mt-3">
                    <textarea
                      defaultValue={collegeNotes[college.id] || ''}
                      onBlur={(e) => setCollegeNote(college.id, e.target.value)}
                      placeholder="Anota detalles del contacto, próximos pasos, impresiones de la visita..."
                      rows={3}
                      className="filter-select resize-none"
                    />
                  </div>
                )}
              </GlassCard>
            )
          })}
        </div>
      )}
    </div>
  )
}
