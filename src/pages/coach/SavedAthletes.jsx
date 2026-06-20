import { Link, useNavigate } from 'react-router-dom'
import { Star, Search, MessageSquare } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useToast } from '../../components/ui/Toast'
import { useAdminData } from '../../context/AdminDataContext'

export default function CoachSavedAthletes() {
  const [saved, setSaved] = useLocalStorage('vr_coach_saved_athletes', [])
  const toast = useToast()
  const navigate = useNavigate()
  const { getAthlete } = useAdminData()
  const athletes = saved.map(getAthlete).filter(Boolean)

  const remove = (id) => {
    setSaved((prev) => prev.filter((x) => x !== id))
    toast?.showToast('Atleta removido de tus prospectos.')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-heading font-extrabold text-ink mb-2">Mis Prospectos</h1>
      <p className="text-ink-soft mb-8">Atletas que has guardado para seguir su progreso.</p>

      {athletes.length === 0 ? (
        <GlassCard className="p-10 text-center text-ink-soft">
          No tienes prospectos guardados todavía.
          <div className="mt-4">
            <Button as={Link} to="/coach/find-athletes" variant="primary" size="sm">
              <Search className="w-4 h-4" /> Buscar Atletas
            </Button>
          </div>
        </GlassCard>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {athletes.map((a) => (
            <GlassCard key={a.id} hover className="p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-12 h-12 rounded-full bg-electric flex items-center justify-center text-white font-bold shrink-0">
                  {a.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-ink">{a.name}</p>
                  <p className="text-xs text-ink-soft">{a.positions.join(' / ')}</p>
                </div>
                <button onClick={() => remove(a.id)} className="text-gold"><Star className="w-5 h-5 fill-gold" /></button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <Badge variant="ink">Clase {a.gradYear}</Badge>
                <Badge variant="blue">GPA {a.gpa}</Badge>
              </div>
              <div className="flex gap-2 mt-auto">
                <Button as={Link} to={`/athlete/profile/${a.id}`} variant="outlineInk" size="sm" className="flex-1">Ver Perfil</Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/coach/messages', { state: { openWith: a.name } })}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
