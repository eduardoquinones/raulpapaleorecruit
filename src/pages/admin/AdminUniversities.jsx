import { useState } from 'react'
import { Plus, Pencil, Trash2, Download } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import UniversityFormModal from '../../components/admin/UniversityFormModal'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import Button from '../../components/ui/Button'
import { useAdminData } from '../../context/AdminDataContext'
import { downloadCsv } from '../../utils/csvExport'

export default function AdminUniversities() {
  const { universities, addUniversity, updateUniversity, deleteUniversity, toggleUniversityActive } = useAdminData()
  const [formOpen, setFormOpen] = useState(false)
  const [editingUniversity, setEditingUniversity] = useState(null)
  const [deletingUniversity, setDeletingUniversity] = useState(null)

  const openAdd = () => {
    setEditingUniversity(null)
    setFormOpen(true)
  }
  const openEdit = (u) => {
    setEditingUniversity(u)
    setFormOpen(true)
  }

  const columns = [
    { key: 'name', label: 'Nombre', sortable: true, accessor: (u) => u.name },
    { key: 'city', label: 'Ciudad', sortable: true, accessor: (u) => u.city },
    { key: 'region', label: 'Estado/País', sortable: true, accessor: (u) => (u.region === 'PR' ? 'Puerto Rico' : u.state || 'Estados Unidos') },
    { key: 'division', label: 'División', sortable: true, accessor: (u) => u.division },
    { key: 'program', label: 'Programa', sortable: true, accessor: (u) => u.program || 'Ambos' },
    { key: 'rosterSpots', label: 'Cupos', sortable: true, accessor: (u) => u.rosterSpots },
    { key: 'gpaMin', label: 'GPA Mínimo', sortable: true, accessor: (u) => u.gpaMin ?? '—' },
    { key: 'coachContact', label: 'Contacto Coach', sortable: true, accessor: (u) => u.coachContact || '—' },
    {
      key: 'active',
      label: 'Estado',
      sortable: true,
      accessor: (u) => (u.active ? 1 : 0),
      render: (u) => (
        <button
          onClick={() => toggleUniversityActive(u.id)}
          className={`text-[11px] px-2.5 py-1 rounded-pill border font-medium ${
            u.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          {u.active ? 'Activa' : 'Inactiva'}
        </button>
      ),
    },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (u) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => openEdit(u)} title="Editar" className="p-1.5 rounded-lg hover:bg-ink/5 text-ink-soft hover:text-gold-dark">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setDeletingUniversity(u)} title="Eliminar" className="p-1.5 rounded-lg hover:bg-red-50 text-ink-soft hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  const handleExport = () => {
    downloadCsv(
      'universidades-volleyrecruit-pr.csv',
      [
        { label: 'Nombre', accessor: (u) => u.name },
        { label: 'Ciudad', accessor: (u) => u.city },
        { label: 'Región', accessor: (u) => (u.region === 'PR' ? 'Puerto Rico' : u.state || 'Estados Unidos') },
        { label: 'División', accessor: (u) => u.division },
        { label: 'Programa', accessor: (u) => u.program || 'Ambos' },
        { label: 'Cupos', accessor: (u) => u.rosterSpots },
        { label: 'GPA Mínimo', accessor: (u) => u.gpaMin ?? '' },
        { label: 'Contacto Coach', accessor: (u) => u.coachContact || '' },
        { label: 'Estado', accessor: (u) => (u.active ? 'Activa' : 'Inactiva') },
      ],
      universities
    )
  }

  return (
    <div className="px-6 sm:px-8 py-8 max-w-[1300px]">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-ink">Universidades</h1>
          <p className="text-ink-soft">Gestiona la base de datos de universidades de Puerto Rico y Estados Unidos.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outlineInk" onClick={handleExport}>
            <Download className="w-4 h-4" /> Exportar CSV
          </Button>
          <Button variant="gold" onClick={openAdd}>
            <Plus className="w-4 h-4" /> Agregar Universidad
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={universities}
        pageSize={20}
        noun="universidades"
        searchPlaceholder="Buscar por nombre o ciudad..."
        getSearchText={(u) => `${u.name} ${u.city}`}
      />

      <UniversityFormModal
        open={formOpen}
        university={editingUniversity}
        onClose={() => setFormOpen(false)}
        onSave={(data) => (editingUniversity ? updateUniversity(editingUniversity.id, data) : addUniversity(data))}
      />

      <ConfirmDialog
        open={!!deletingUniversity}
        title="Eliminar Universidad"
        message={deletingUniversity ? `¿Estás seguro de que deseas eliminar ${deletingUniversity.name}? Esta acción no se puede deshacer.` : ''}
        onConfirm={() => deleteUniversity(deletingUniversity.id)}
        onClose={() => setDeletingUniversity(null)}
      />
    </div>
  )
}
