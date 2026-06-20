import { Link } from 'react-router-dom'
import { Search, Star, MessageSquare, ArrowRight } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useAdminData } from '../../context/AdminDataContext'
import { coachThreads } from '../../data/mockMessages'

const activity = [
  { id: 1, text: 'Viste el perfil de Daniela Cruz', time: 'hace 1 hora' },
  { id: 2, text: 'Tomas Rivera respondió tu mensaje', time: 'hace 5 horas' },
  { id: 3, text: 'Miguel Santos actualizó sus estadísticas', time: 'hace 1 día' },
]

export default function CoachDashboard() {
  const { user } = useAuth()
  const { athletes, getAthlete } = useAdminData()
  const [saved] = useLocalStorage('vr_coach_saved_athletes', [])
  const savedAthletes = saved.map(getAthlete).filter(Boolean)
  const unreadMessages = coachThreads.filter((t) => t.unread).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-heading font-extrabold text-ink mb-1">Bienvenido, {user?.name || 'Entrenador'}</h1>
      <p className="text-ink-soft mb-8">Aquí está lo que está pasando con tu reclutamiento.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <GlassCard className="p-5 text-center">
          <div className="text-3xl font-extrabold text-electric">{savedAthletes.length}</div>
          <div className="text-sm text-ink-soft mt-1">Prospectos guardados</div>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <div className="text-3xl font-extrabold text-gold-dark">{athletes.length}</div>
          <div className="text-sm text-ink-soft mt-1">Atletas disponibles</div>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <div className="text-3xl font-extrabold text-emerald-600">{unreadMessages}</div>
          <div className="text-sm text-ink-soft mt-1">Mensajes nuevos</div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-ink text-xl">Tus Prospectos</h2>
            <Link to="/coach/saved-athletes" className="text-electric text-sm font-semibold hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {savedAthletes.length === 0 ? (
            <GlassCard className="p-8 text-center text-ink-soft">
              No tienes prospectos guardados todavía.
              <div className="mt-4">
                <Button as={Link} to="/coach/find-athletes" variant="primary" size="sm">
                  <Search className="w-4 h-4" /> Buscar Atletas
                </Button>
              </div>
            </GlassCard>
          ) : (
            savedAthletes.map((a) => (
              <GlassCard key={a.id} hover className="p-4 flex items-center gap-4 flex-wrap">
                <span className="w-12 h-12 rounded-full bg-electric flex items-center justify-center text-white font-bold shrink-0">
                  {a.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </span>
                <div className="flex-1 min-w-[180px]">
                  <p className="font-semibold text-ink">{a.name}</p>
                  <p className="text-xs text-ink-soft">{a.positions.join(' / ')} &middot; Clase {a.gradYear} &middot; {a.city}</p>
                </div>
                <Badge variant="blue">GPA {a.gpa}</Badge>
                <Star className="w-4 h-4 fill-gold text-gold" />
              </GlassCard>
            ))
          )}
        </div>

        <div className="flex flex-col gap-6">
          <GlassCard className="p-6">
            <h3 className="font-heading font-bold text-ink mb-4">Actividad Reciente</h3>
            <ul className="space-y-4">
              {activity.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-electric" />
                  </span>
                  <div>
                    <p className="text-sm text-ink">{item.text}</p>
                    <p className="text-xs text-ink-soft/70">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <h3 className="font-heading font-bold text-ink mb-2">Buscar Talento</h3>
            <p className="text-sm text-ink-soft mb-4">Explora atletas filtrados por posición, GPA, división y más.</p>
            <Button as={Link} to="/coach/find-athletes" variant="gold" className="w-full">Buscar Atletas</Button>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
