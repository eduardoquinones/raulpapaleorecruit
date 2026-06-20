import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Eye, ExternalLink, Pencil, Trash2, SlidersHorizontal } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import AthleteEditModal from '../../components/admin/AthleteEditModal'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import Button from '../../components/ui/Button'
import { useAdminData } from '../../context/AdminDataContext'
import { downloadCsv } from '../../utils/csvExport'

const POSITION_OPTIONS = ['Outside Hitter', 'Opposite', 'Setter', 'Middle Blocker', 'Libero', 'Defensive Specialist']
const DIVISION_OPTIONS = ['Todas', 'NCAA I', 'NCAA II', 'NCAA III', 'NAIA', 'LAI', 'NJCAA']

export default function AdminAthletes() {
  const { athletes, updateAthlete, deleteAthlete } = useAdminData()
  const [gradYear, setGradYear] = useState('Todos')
  const [positions, setPositions] = useState([])
  const [minGpa, setMinGpa] = useState(0)
  const [minCompletion, setMinCompletion] = useState(0)
  const [school, setSchool] = useState('Todas')
  const [division, setDivision] = useState('Todas')
  const [editingAthlete, setEditingAthlete] = useState(null)
  const [deletingAthlete, setDeletingAthlete] = useState(null)

  const gradYears = useMemo(() => ['Todos', ...new Set(athletes.map((a) => a.gradYear))].sort(), [athletes])
  const schools = useMemo(() => ['Todas', ...new Set(athletes.map((a) => a.school))], [athletes])

  const togglePosition = (pos) =>
    setPositions((prev) => (prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]))

  const filtered = useMemo(() => {
    return athletes.filter((a) => {
      if (gradYear !== 'Todos' && a.gradYear !== gradYear) return false
      if (positions.length > 0 && !a.positions.some((p) => positions.includes(p))) return false
      if (a.gpa < minGpa) return false
      if (a.meta.completionPct < minCompletion) return false
      if (school !== 'Todas' && a.school !== school) return false
      if (division !== 'Todas' && !a.preferences.divisions.some((d) => d.includes(division))) return false
      return true
    })
  }, [athletes, gradYear, positions, minGpa, minCompletion, school, division])

  const columns = [
    {
      key: 'photo',
      label: 'Foto',
      sortable: false,
      render: (a) => (
        <span className="w-9 h-9 rounded-full bg-electric flex items-center justify-center text-white font-semibold text-xs overflow-hidden">
          {a.photo ? <img src={a.photo} alt={a.name} className="w-full h-full object-cover" /> : a.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </span>
      ),
    },
    { key: 'name', label: 'Nombre', sortable: true, accessor: (a) => a.name },
    { key: 'school', label: 'Escuela', sortable: true, accessor: (a) => a.school },
    { key: 'gradYear', label: 'Graduación', sortable: true, accessor: (a) => a.gradYear },
    { key: 'positions', label: 'Posición', sortable: true, accessor: (a) => a.positions.join(' / ') },
    { key: 'gpa', label: 'GPA', sortable: true, accessor: (a) => a.gpa },
    { key: 'height', label: 'Estatura', sortable: true, accessor: (a) => a.height },
    { key: 'club', label: 'Equipo Club', sortable: true, accessor: (a) => a.club },
    { key: 'saved', label: 'U. Guardadas', sortable: true, accessor: (a) => a.meta.savedUniversitiesCount },
    {
      key: 'completion',
      label: 'Perfil %',
      sortable: true,
      accessor: (a) => a.meta.completionPct,
      render: (a) => (
        <div className="flex items-center gap-2 w-24">
          <div className="h-1.5 flex-1 rounded-pill bg-ink/10 overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${a.meta.completionPct}%` }} />
          </div>
          <span className="text-xs text-ink-soft">{a.meta.completionPct}%</span>
        </div>
      ),
    },
    { key: 'registeredAt', label: 'Registro', sortable: true, accessor: (a) => a.meta.registeredAt },
    { key: 'lastActive', label: 'Últ. Actividad', sortable: true, accessor: (a) => a.meta.lastActive },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (a) => (
        <div className="flex items-center gap-1.5">
          <Link to={`/admin/athletes/${a.id}`} title="Ver detalle" className="p-1.5 rounded-lg hover:bg-ink/5 text-ink-soft hover:text-electric">
            <Eye className="w-4 h-4" />
          </Link>
          <a href={`/athlete/profile/${a.id}`} target="_blank" rel="noreferrer" title="Ver perfil público (nueva pestaña)" className="p-1.5 rounded-lg hover:bg-ink/5 text-ink-soft hover:text-electric">
            <ExternalLink className="w-4 h-4" />
          </a>
          <button onClick={() => setEditingAthlete(a)} title="Editar" className="p-1.5 rounded-lg hover:bg-ink/5 text-ink-soft hover:text-gold-dark">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setDeletingAthlete(a)} title="Eliminar" className="p-1.5 rounded-lg hover:bg-red-50 text-ink-soft hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  const handleExport = () => {
    downloadCsv(
      'atletas-volleyrecruit-pr.csv',
      [
        { label: 'Nombre', accessor: (a) => a.name },
        { label: 'Escuela', accessor: (a) => a.school },
        { label: 'Graduación', accessor: (a) => a.gradYear },
        { label: 'Posición', accessor: (a) => a.positions.join(' / ') },
        { label: 'GPA', accessor: (a) => a.gpa },
        { label: 'Estatura', accessor: (a) => a.height },
        { label: 'Equipo Club', accessor: (a) => a.club },
        { label: 'Universidades Guardadas', accessor: (a) => a.meta.savedUniversitiesCount },
        { label: 'Perfil %', accessor: (a) => a.meta.completionPct },
        { label: 'Fecha de Registro', accessor: (a) => a.meta.registeredAt },
        { label: 'Última Actividad', accessor: (a) => a.meta.lastActive },
      ],
      filtered
    )
  }

  return (
    <div className="px-6 sm:px-8 py-8 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-ink">Todos los Atletas</h1>
          <p className="text-ink-soft">Gestiona los perfiles de atletas en la plataforma.</p>
        </div>
        <Button variant="primary" onClick={handleExport}>
          <Download className="w-4 h-4" /> Exportar CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <div className="bg-white rounded-2xl border border-ink/10 p-5 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-4 h-4 text-electric" />
            <h2 className="font-heading font-bold text-ink text-sm">Filtros</h2>
          </div>

          <FilterField label="Año de graduación">
            <select value={gradYear} onChange={(e) => setGradYear(e.target.value === 'Todos' ? 'Todos' : Number(e.target.value))} className="filter-select">
              {gradYears.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </FilterField>

          <FilterField label="Posición">
            <div className="flex flex-wrap gap-1.5">
              {POSITION_OPTIONS.map((pos) => (
                <button
                  key={pos}
                  onClick={() => togglePosition(pos)}
                  className={`px-2.5 py-1 rounded-pill text-[11px] font-medium border transition-colors ${
                    positions.includes(pos) ? 'bg-electric text-white border-electric' : 'bg-white text-ink-soft border-ink/10'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </FilterField>

          <FilterField label={`GPA mínimo: ${minGpa}`}>
            <input type="range" min="0" max="4" step="0.1" value={minGpa} onChange={(e) => setMinGpa(Number(e.target.value))} className="w-full accent-electric" />
          </FilterField>

          <FilterField label={`Perfil completo mínimo: ${minCompletion}%`}>
            <input type="range" min="0" max="100" step="5" value={minCompletion} onChange={(e) => setMinCompletion(Number(e.target.value))} className="w-full accent-electric" />
          </FilterField>

          <FilterField label="Escuela">
            <select value={school} onChange={(e) => setSchool(e.target.value)} className="filter-select">
              {schools.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </FilterField>

          <FilterField label="Preferencia de División">
            <select value={division} onChange={(e) => setDivision(e.target.value)} className="filter-select">
              {DIVISION_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </FilterField>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          pageSize={20}
          noun="atletas"
          searchPlaceholder="Buscar por nombre, escuela o posición..."
          getSearchText={(a) => `${a.name} ${a.school} ${a.positions.join(' ')}`}
        />
      </div>

      <AthleteEditModal
        athlete={editingAthlete}
        onClose={() => setEditingAthlete(null)}
        onSave={(patch) => updateAthlete(editingAthlete.id, patch)}
      />

      <ConfirmDialog
        open={!!deletingAthlete}
        title="Eliminar Atleta"
        message={deletingAthlete ? `¿Estás seguro de que deseas eliminar a ${deletingAthlete.name}? Esta acción no se puede deshacer.` : ''}
        onConfirm={() => deleteAthlete(deletingAthlete.id)}
        onClose={() => setDeletingAthlete(null)}
      />
    </div>
  )
}

function FilterField({ label, children }) {
  return (
    <div className="mb-4">
      <label className="text-xs font-semibold text-ink-soft mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
