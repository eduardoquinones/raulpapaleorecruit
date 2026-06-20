import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Users, Megaphone, School, MessageSquare, CheckCircle2, UserPlus, Download, Activity } from 'lucide-react'
import StatCard from '../../components/admin/StatCard'
import Button from '../../components/ui/Button'
import { useAdminData } from '../../context/AdminDataContext'
import { downloadCsv } from '../../utils/csvExport'

function daysAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export default function AdminDashboard() {
  const { athletes, coaches, universities, conversations } = useAdminData()

  const stats = useMemo(() => {
    const avgCompletion = Math.round(athletes.reduce((sum, a) => sum + a.meta.completionPct, 0) / athletes.length)
    const messagesThisWeek = conversations.reduce(
      (sum, c) => sum + c.messages.filter((m) => daysAgo(m.time.split(' ')[0]) <= 7).length,
      0
    )
    const newAthletes = athletes.filter((a) => daysAgo(a.meta.registeredAt) <= 7).length
    const newCoaches = coaches.filter((c) => daysAgo(c.registeredAt) <= 7).length

    return {
      totalAthletes: athletes.length,
      totalCoaches: coaches.length,
      totalUniversities: universities.filter((u) => u.active).length,
      messagesThisWeek,
      avgCompletion,
      newRegistrations: newAthletes + newCoaches,
    }
  }, [athletes, coaches, universities, conversations])

  const activity = useMemo(() => {
    const items = []
    athletes.slice(0, 5).forEach((a) => {
      if (a.meta.completionPct === 100) items.push({ text: `${a.name} completó su perfil`, hours: daysAgo(a.meta.lastActive) * 24 })
      if (a.meta.viewedBy.length > 0) {
        items.push({ text: `Un entrenador vio el perfil de ${a.name}`, hours: daysAgo(a.meta.lastActive) * 24 + 3 })
      }
    })
    coaches.slice(0, 3).forEach((c) => {
      if (c.savedAthleteIds.length > 0) {
        const athleteName = athletes.find((a) => a.id === c.savedAthleteIds[0])?.name || 'un atleta'
        items.push({ text: `Nueva solicitud de ${c.name.split(' ')[0]} para ver a ${athleteName}`, hours: 6 })
      }
    })
    athletes.slice(5, 8).forEach((a) => {
      items.push({ text: `${a.name} se registró`, hours: daysAgo(a.meta.registeredAt) * 24 })
    })
    return items.sort((a, b) => a.hours - b.hours).slice(0, 8)
  }, [athletes, coaches])

  const formatHours = (hours) => {
    if (hours < 24) return `hace ${Math.max(1, Math.round(hours))} horas`
    return `hace ${Math.round(hours / 24)} días`
  }

  const handleExport = () => {
    downloadCsv(
      'volleyrecruit-pr-resumen.csv',
      [
        { label: 'Métrica', accessor: (r) => r.label },
        { label: 'Valor', accessor: (r) => r.value },
      ],
      [
        { label: 'Total Atletas', value: stats.totalAthletes },
        { label: 'Total Entrenadores', value: stats.totalCoaches },
        { label: 'Universidades Activas', value: stats.totalUniversities },
        { label: 'Mensajes esta semana', value: stats.messagesThisWeek },
        { label: 'Perfiles completados (% promedio)', value: stats.avgCompletion },
        { label: 'Nuevos registros esta semana', value: stats.newRegistrations },
      ]
    )
  }

  return (
    <div className="px-6 sm:px-8 py-8 max-w-7xl">
      <h1 className="text-2xl font-heading font-extrabold text-ink mb-1">Panel de Administración</h1>
      <p className="text-ink-soft mb-8">Resumen general de la plataforma VolleyRecruit PR.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Atletas Registrados" value={stats.totalAthletes} icon={Users} accent="#2B5CE6" />
        <StatCard label="Total Entrenadores Registrados" value={stats.totalCoaches} icon={Megaphone} accent="#E8A020" />
        <StatCard label="Universidades en Plataforma" value={stats.totalUniversities} icon={School} accent="#16A34A" />
        <StatCard label="Mensajes Enviados Esta Semana" value={stats.messagesThisWeek} icon={MessageSquare} accent="#EA580C" />
        <StatCard label="Perfiles Completados (promedio)" value={stats.avgCompletion} suffix="%" icon={CheckCircle2} accent="#2B5CE6" />
        <StatCard label="Nuevos Registros Esta Semana" value={stats.newRegistrations} icon={UserPlus} accent="#E8A020" />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white rounded-2xl border border-ink/10 p-6">
          <h2 className="font-heading font-bold text-ink mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-electric" /> Actividad Reciente
          </h2>
          <ul className="flex flex-col gap-3">
            {activity.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-electric mt-1.5 shrink-0" />
                <div>
                  <p className="text-ink">{item.text}</p>
                  <p className="text-xs text-ink-soft">{formatHours(item.hours)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-ink/10 p-6 flex flex-col gap-3">
          <h2 className="font-heading font-bold text-ink mb-1">Acciones Rápidas</h2>
          <Button as={Link} to="/admin/athletes" variant="outlineInk" className="w-full justify-start">
            <Users className="w-4 h-4" /> Ver Todos los Atletas
          </Button>
          <Button as={Link} to="/admin/coaches" variant="outlineInk" className="w-full justify-start">
            <Megaphone className="w-4 h-4" /> Ver Todos los Entrenadores
          </Button>
          <Button as={Link} to="/admin/universities" variant="outlineInk" className="w-full justify-start">
            <School className="w-4 h-4" /> Agregar Universidad
          </Button>
          <Button variant="primary" className="w-full justify-start" onClick={handleExport}>
            <Download className="w-4 h-4" /> Exportar Datos (CSV)
          </Button>
        </div>
      </div>
    </div>
  )
}
