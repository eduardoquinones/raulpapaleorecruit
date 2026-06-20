import { Star } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import Badge from '../ui/Badge'
import { getPRCollegeById } from '../../data/prColleges'
import { getUSCollegeById } from '../../data/usColleges'
import { useAthleteData } from '../../context/AthleteDataContext'

const PROGRESS_STEPS = ['Perfil visto', 'Añadido a lista', 'Mensaje enviado']

export default function CollegeCard({ recommendation }) {
  const college =
    recommendation.region === 'pr'
      ? getPRCollegeById(recommendation.collegeId)
      : getUSCollegeById(recommendation.collegeId)
  const { favorites, toggleFavorite } = useAthleteData()
  if (!college) return null

  const isFavorite = favorites.includes(college.id)

  return (
    <GlassCard
      hover
      className="p-4 pl-5 flex flex-col sm:flex-row gap-4 border-l-4"
      style={{ borderLeftColor: college.color }}
    >
      <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:w-12 shrink-0">
        <span className="font-heading font-bold text-sm" style={{ color: college.color }}>{college.initials}</span>
        <button onClick={() => toggleFavorite(college.id)} className="text-gold hover:scale-110 transition-transform">
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-gold' : ''}`} />
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <h4 className="font-bold text-ink">{college.name}</h4>
            <p className="text-xs text-ink-soft">{college.city} &middot; {college.division}</p>
          </div>
          <Badge variant={recommendation.badge === 'Reach' ? 'blue' : 'gold'}>{recommendation.badge}</Badge>
        </div>

        <p className="text-xs font-semibold text-ink-soft mt-3 mb-1.5">Mi Progreso</p>
        <div className="flex flex-wrap gap-1.5">
          {PROGRESS_STEPS.map((step) => {
            const complete = recommendation.progress.includes(step)
            return (
              <span
                key={step}
                className={`text-[11px] px-2.5 py-1 rounded-pill border ${
                  complete
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-ink/5 text-ink-soft border-ink/10'
                }`}
              >
                {step}
              </span>
            )
          })}
        </div>
      </div>
    </GlassCard>
  )
}
