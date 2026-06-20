import { useMemo } from 'react'
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useAdminData } from '../../context/AdminDataContext'
import { getPRCollegeById } from '../../data/prColleges'
import { getUSCollegeById } from '../../data/usColleges'

const COLORS = ['#2B5CE6', '#E8A020', '#16A34A', '#EA580C', '#6366F1', '#DB2777', '#0EA5E9', '#84CC16']

function weekKey(dateStr) {
  const date = new Date(dateStr)
  const onejan = new Date(date.getFullYear(), 0, 1)
  const week = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7)
  return `S${week} '${String(date.getFullYear()).slice(2)}`
}

function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-ink/10 p-5 ${className}`}>
      <h2 className="font-heading font-bold text-ink mb-4">{title}</h2>
      {children}
    </div>
  )
}

export default function AdminAnalytics() {
  const { athletes, coaches } = useAdminData()

  const registrationsPerWeek = useMemo(() => {
    const buckets = {}
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i * 7)
      buckets[weekKey(d)] = 0
    }
    const allRegs = [...athletes.map((a) => a.meta.registeredAt), ...coaches.map((c) => c.registeredAt)]
    allRegs.forEach((dateStr) => {
      const key = weekKey(dateStr)
      if (key in buckets) buckets[key] += 1
    })
    return Object.entries(buckets).map(([week, count]) => ({ week, count }))
  }, [athletes, coaches])

  const mostViewedAthletes = useMemo(
    () =>
      [...athletes]
        .sort((a, b) => b.meta.viewedBy.length - a.meta.viewedBy.length)
        .slice(0, 8)
        .map((a) => ({ name: a.name.split(' ')[0] + ' ' + a.name.split(' ')[1]?.[0] + '.', views: a.meta.viewedBy.length })),
    [athletes]
  )

  const popularUniversities = useMemo(() => {
    const counts = {}
    athletes.forEach((a) => {
      a.meta.viewedBy.forEach((collegeId) => {
        counts[collegeId] = (counts[collegeId] || 0) + 1
      })
    })
    return Object.entries(counts)
      .map(([id, count]) => ({ name: (getPRCollegeById(id) || getUSCollegeById(id))?.short || id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
  }, [athletes])

  const positionDistribution = useMemo(() => {
    const counts = {}
    athletes.forEach((a) => a.positions.forEach((p) => { counts[p] = (counts[p] || 0) + 1 }))
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [athletes])

  const gradYearDistribution = useMemo(() => {
    const counts = {}
    athletes.forEach((a) => { counts[a.gradYear] = (counts[a.gradYear] || 0) + 1 })
    return Object.entries(counts)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([name, value]) => ({ name, value }))
  }, [athletes])

  const topCoaches = useMemo(
    () =>
      [...coaches]
        .map((c) => ({ ...c, activityScore: c.viewedAthleteIds.length + c.savedAthleteIds.length * 2 + c.messagesSentCount }))
        .sort((a, b) => b.activityScore - a.activityScore)
        .slice(0, 10),
    [coaches]
  )

  const cityDistribution = useMemo(() => {
    const counts = {}
    athletes.forEach((a) => { counts[a.city] = (counts[a.city] || 0) + 1 })
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
  }, [athletes])

  const completionBuckets = useMemo(() => {
    const buckets = { '0-25%': 0, '26-50%': 0, '51-75%': 0, '76-100%': 0 }
    athletes.forEach((a) => {
      const pct = a.meta.completionPct
      if (pct <= 25) buckets['0-25%'] += 1
      else if (pct <= 50) buckets['26-50%'] += 1
      else if (pct <= 75) buckets['51-75%'] += 1
      else buckets['76-100%'] += 1
    })
    return Object.entries(buckets).map(([name, value]) => ({ name, value }))
  }, [athletes])

  return (
    <div className="px-6 sm:px-8 py-8 max-w-[1400px]">
      <h1 className="text-2xl font-heading font-extrabold text-ink mb-1">Analíticas</h1>
      <p className="text-ink-soft mb-8">Métricas de crecimiento y actividad de la plataforma.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Nuevos Registros por Semana (últimas 12 semanas)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={registrationsPerWeek}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" name="Registros" stroke="#2B5CE6" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Perfiles de Atletas Más Vistos">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mostViewedAthletes} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="views" name="Vistas" fill="#2B5CE6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Universidades Más Populares">
          {popularUniversities.length === 0 ? (
            <p className="text-sm text-ink-soft py-10 text-center">Aún no hay suficiente actividad registrada.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={popularUniversities} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name="Interés" fill="#E8A020" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Distribución por Posición">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={positionDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                {positionDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribución por Año de Graduación">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={gradYearDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                {gradYearDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Atletas por Ciudad (Ubicación)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityDistribution} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" name="Atletas" fill="#16A34A" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-ink-soft/70 mt-2">Todos los atletas registrados son actualmente de Puerto Rico.</p>
        </ChartCard>

        <ChartCard title="Distribución de Perfiles Completados">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={completionBuckets}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Atletas" fill="#2B5CE6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="bg-white rounded-2xl border border-ink/10 p-5">
        <h2 className="font-heading font-bold text-ink mb-4">Top {topCoaches.length} Entrenadores Más Activos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-ink/10">
                <th className="text-left px-4 py-2.5 font-semibold text-ink-soft">#</th>
                <th className="text-left px-4 py-2.5 font-semibold text-ink-soft">Entrenador</th>
                <th className="text-left px-4 py-2.5 font-semibold text-ink-soft">Universidad</th>
                <th className="text-left px-4 py-2.5 font-semibold text-ink-soft">Vistos</th>
                <th className="text-left px-4 py-2.5 font-semibold text-ink-soft">Guardados</th>
                <th className="text-left px-4 py-2.5 font-semibold text-ink-soft">Mensajes</th>
              </tr>
            </thead>
            <tbody>
              {topCoaches.map((c, i) => (
                <tr key={c.id} className="border-b border-ink/5">
                  <td className="px-4 py-2.5 text-ink-soft">{i + 1}</td>
                  <td className="px-4 py-2.5 font-medium text-ink">{c.name}</td>
                  <td className="px-4 py-2.5 text-ink-soft">{c.university}</td>
                  <td className="px-4 py-2.5">{c.viewedAthleteIds.length}</td>
                  <td className="px-4 py-2.5">{c.savedAthleteIds.length}</td>
                  <td className="px-4 py-2.5">{c.messagesSentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
