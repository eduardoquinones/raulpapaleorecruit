import { useMemo, useState } from 'react'
import { Star, MapPin } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import USAMap from '../../components/map/USAMap'
import PRMap from '../../components/map/PRMap'
import { prColleges } from '../../data/prColleges'
import { usColleges } from '../../data/usColleges'
import { useAthleteData } from '../../context/AthleteDataContext'
import { collegeGradientStyle } from '../../utils/collegeGradient'
import { useToast } from '../../components/ui/Toast'

const STATUS_COLORS = { saved: '#2B5CE6', contacted: '#EA580C', committed: '#16A34A' }

const STATUS_OPTIONS = ['saved', 'contacted', 'committed']
const STATUS_LABELS = { saved: 'Guardado', contacted: 'Contactado', committed: 'Comprometido' }

export default function MyColleges() {
  const { favorites, toggleFavorite, collegeStatus, setStatus } = useAthleteData()
  const [stateFilter, setStateFilter] = useState(null)
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

  const getStatus = (collegeId) => (favorites.includes(collegeId) ? collegeStatus[collegeId] || 'saved' : 'none')

  const getStateStatus = (stateCode) => {
    const stateColleges = usColleges.filter((c) => c.stateCode === stateCode && favorites.includes(c.id))
    if (stateColleges.some((c) => getStatus(c.id) === 'committed')) return 'committed'
    if (stateColleges.some((c) => getStatus(c.id) === 'contacted')) return 'contacted'
    if (stateColleges.length > 0) return 'saved'
    return 'none'
  }

  const filteredList = stateFilter
    ? savedColleges.filter((c) => c.stateCode === stateFilter)
    : savedColleges

  const counts = {
    saved: savedColleges.length,
    contacted: savedColleges.filter((c) => getStatus(c.id) === 'contacted').length,
    responded: savedColleges.filter((c) => getStatus(c.id) === 'committed').length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-heading font-extrabold text-ink mb-2">Mis Universidades</h1>
      <p className="text-ink-soft mb-8">Rastrea tu progreso de reclutamiento universidad por universidad.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <GlassCard className="p-5 text-center">
          <div className="text-3xl font-extrabold" style={{ color: STATUS_COLORS.saved }}>{counts.saved}</div>
          <div className="text-sm text-ink-soft mt-1">Universidades guardadas</div>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <div className="text-3xl font-extrabold" style={{ color: STATUS_COLORS.contacted }}>{counts.contacted}</div>
          <div className="text-sm text-ink-soft mt-1">Contactadas</div>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <div className="text-3xl font-extrabold" style={{ color: STATUS_COLORS.committed }}>{counts.responded}</div>
          <div className="text-sm text-ink-soft mt-1">Respondieron / Comprometido</div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <GlassCard className="p-6">
          <h3 className="font-heading font-bold text-ink mb-4">Estados Unidos</h3>
          <USAMap
            getStateStatus={getStateStatus}
            selectedState={stateFilter}
            onSelectState={(c) => setStateFilter((s) => (s === c ? null : c))}
            getStateColleges={(code) => savedColleges.filter((c) => c.stateCode === code)}
          />
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="font-heading font-bold text-ink mb-4">Puerto Rico</h3>
          <PRMap getCollegeStatus={getStatus} />
        </GlassCard>
      </div>

      {stateFilter && (
        <div className="mb-4">
          <button onClick={() => setStateFilter(null)} className="text-sm text-electric font-medium hover:underline">
            &larr; Quitar filtro de estado ({stateFilter})
          </button>
        </div>
      )}

      <h3 className="font-heading font-bold text-ink text-xl mb-4">Lista de Universidades</h3>
      {filteredList.length === 0 ? (
        <GlassCard className="p-10 text-center text-ink-soft">
          No tienes universidades guardadas todavía. Visita "Encuentra Universidades" para empezar.
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredList.map((college) => (
            <GlassCard key={college.id} hover className="p-4 flex items-center gap-4 flex-wrap">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-md" style={collegeGradientStyle(college)}>
                {college.initials}
              </div>
              <div className="flex-1 min-w-[180px]">
                <p className="font-semibold text-ink">{college.name}</p>
                <p className="text-xs text-ink-soft flex items-center gap-1"><MapPin className="w-3 h-3" /> {college.city}{college.state ? `, ${college.stateCode}` : ''} &middot; {college.division}</p>
              </div>
              <div className="flex gap-1.5">
                {STATUS_OPTIONS.map((s) => {
                  const active = getStatus(college.id) === s
                  return (
                    <button
                      key={s}
                      onClick={() => setStatus(college.id, s)}
                      style={active ? { backgroundColor: STATUS_COLORS[s], borderColor: STATUS_COLORS[s] } : undefined}
                      className={`text-[11px] px-2.5 py-1 rounded-pill border font-medium ${
                        active ? 'text-white' : 'bg-white/50 text-ink-soft border-ink/10'
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  )
                })}
              </div>
              <button onClick={() => handleRemoveFavorite(college)} className="text-gold hover:scale-110 transition-transform">
                <Star className="w-5 h-5 fill-gold" />
              </button>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
