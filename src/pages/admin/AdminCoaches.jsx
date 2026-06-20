import { useState } from 'react'
import { Eye, Pencil, Trash2, Download } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import Modal from '../../components/ui/Modal'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useAdminData } from '../../context/AdminDataContext'
import { useToast } from '../../components/ui/Toast'
import { downloadCsv } from '../../utils/csvExport'
import { getAthleteById } from '../../data/mockAthletes'

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl border border-ink/10 bg-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-electric/30'

export default function AdminCoaches() {
  const { coaches, updateCoach, deleteCoach } = useAdminData()
  const [viewingCoach, setViewingCoach] = useState(null)
  const [editingCoach, setEditingCoach] = useState(null)
  const [editForm, setEditForm] = useState(null)
  const [deletingCoach, setDeletingCoach] = useState(null)
  const toast = useToast()

  const openEdit = (coach) => {
    setEditingCoach(coach)
    setEditForm({ name: coach.name, university: coach.university, email: coach.email, phone: coach.phone })
  }

  const handleSaveEdit = () => {
    updateCoach(editingCoach.id, editForm)
    toast?.showToast(`Entrenador ${editForm.name} actualizado.`)
    setEditingCoach(null)
  }

  const columns = [
    { key: 'name', label: 'Nombre', sortable: true, accessor: (c) => c.name },
    { key: 'university', label: 'Universidad / Organización', sortable: true, accessor: (c) => c.university },
    { key: 'email', label: 'Email', sortable: true, accessor: (c) => c.email },
    { key: 'phone', label: 'Teléfono', sortable: true, accessor: (c) => c.phone },
    { key: 'viewed', label: 'Atletas Vistos', sortable: true, accessor: (c) => c.viewedAthleteIds.length },
    { key: 'saved', label: 'Atletas Guardados', sortable: true, accessor: (c) => c.savedAthleteIds.length },
    { key: 'messages', label: 'Mensajes Enviados', sortable: true, accessor: (c) => c.messagesSentCount },
    { key: 'registeredAt', label: 'Fecha de Registro', sortable: true, accessor: (c) => c.registeredAt },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (c) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => setViewingCoach(c)} title="Ver" className="p-1.5 rounded-lg hover:bg-ink/5 text-ink-soft hover:text-electric">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => openEdit(c)} title="Editar" className="p-1.5 rounded-lg hover:bg-ink/5 text-ink-soft hover:text-gold-dark">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setDeletingCoach(c)} title="Eliminar" className="p-1.5 rounded-lg hover:bg-red-50 text-ink-soft hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  const handleExport = () => {
    downloadCsv(
      'entrenadores-volleyrecruit-pr.csv',
      [
        { label: 'Nombre', accessor: (c) => c.name },
        { label: 'Universidad', accessor: (c) => c.university },
        { label: 'Email', accessor: (c) => c.email },
        { label: 'Teléfono', accessor: (c) => c.phone },
        { label: 'Atletas Vistos', accessor: (c) => c.viewedAthleteIds.length },
        { label: 'Atletas Guardados', accessor: (c) => c.savedAthleteIds.length },
        { label: 'Mensajes Enviados', accessor: (c) => c.messagesSentCount },
        { label: 'Fecha de Registro', accessor: (c) => c.registeredAt },
      ],
      coaches
    )
  }

  return (
    <div className="px-6 sm:px-8 py-8 max-w-[1300px]">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-ink">Todos los Entrenadores</h1>
          <p className="text-ink-soft">Gestiona las cuentas de entrenadores en la plataforma.</p>
        </div>
        <Button variant="primary" onClick={handleExport}>
          <Download className="w-4 h-4" /> Exportar CSV
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={coaches}
        pageSize={20}
        noun="entrenadores"
        searchPlaceholder="Buscar por nombre o universidad..."
        getSearchText={(c) => `${c.name} ${c.university}`}
      />

      {/* View coach detail */}
      {viewingCoach && (
        <Modal open={!!viewingCoach} onClose={() => setViewingCoach(null)} title={viewingCoach.name} variant="modal" maxWidth="max-w-lg">
          <p className="text-sm text-ink-soft mb-4">{viewingCoach.university}</p>

          <h3 className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-2">Prospectos Guardados</h3>
          {viewingCoach.savedAthleteIds.length === 0 ? (
            <p className="text-sm text-ink-soft mb-4">Sin prospectos guardados.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {viewingCoach.savedAthleteIds.map((id) => {
                const a = getAthleteById(id)
                return a ? <Badge key={id} variant="blue">{a.name}</Badge> : null
              })}
            </div>
          )}

          <h3 className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-2">Atletas Vistos</h3>
          {viewingCoach.viewedAthleteIds.length === 0 ? (
            <p className="text-sm text-ink-soft mb-4">Sin actividad de vistas.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {viewingCoach.viewedAthleteIds.map((id) => {
                const a = getAthleteById(id)
                return a ? <Badge key={id} variant="ink">{a.name}</Badge> : null
              })}
            </div>
          )}

          <h3 className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-2">Mensajes Enviados</h3>
          <p className="text-sm text-ink">{viewingCoach.messagesSentCount} mensajes enviados en total.</p>

          <Button variant="outlineInk" className="w-full mt-5" onClick={() => setViewingCoach(null)}>Cerrar</Button>
        </Modal>
      )}

      {/* Edit coach */}
      {editingCoach && editForm && (
        <Modal open={!!editingCoach} onClose={() => setEditingCoach(null)} title={`Editar a ${editingCoach.name}`} variant="modal" maxWidth="max-w-md">
          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-ink-soft mb-1 block">Nombre</span>
              <input className={inputClass} value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-ink-soft mb-1 block">Universidad</span>
              <input className={inputClass} value={editForm.university} onChange={(e) => setEditForm((f) => ({ ...f, university: e.target.value }))} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-ink-soft mb-1 block">Email</span>
              <input className={inputClass} value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-ink-soft mb-1 block">Teléfono</span>
              <input className={inputClass} value={editForm.phone} onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))} />
            </label>
            <div className="flex gap-3 pt-2">
              <Button variant="outlineInk" className="flex-1" onClick={() => setEditingCoach(null)}>Cancelar</Button>
              <Button variant="primary" className="flex-1" onClick={handleSaveEdit}>Guardar Cambios</Button>
            </div>
          </div>
        </Modal>
      )}

      <ConfirmDialog
        open={!!deletingCoach}
        title="Eliminar Entrenador"
        message={deletingCoach ? `¿Estás seguro de que deseas eliminar a ${deletingCoach.name}? Esta acción no se puede deshacer.` : ''}
        onConfirm={() => deleteCoach(deletingCoach.id)}
        onClose={() => setDeletingCoach(null)}
      />
    </div>
  )
}
