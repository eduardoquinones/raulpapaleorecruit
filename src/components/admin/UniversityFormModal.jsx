import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { useToast } from '../ui/Toast'

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl border border-ink/10 bg-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-electric/30'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink-soft mb-1 block">{label}</span>
      {children}
    </label>
  )
}

function buildForm(university) {
  return {
    name: university?.name || '',
    city: university?.city || '',
    region: university?.region || 'PR',
    division: university?.division || 'LAI',
    program: university?.program || 'Ambos',
    rosterSpots: university?.rosterSpots ?? 1,
    gpaMin: university?.gpaMin ?? 2.5,
    coachContact: university?.coachContact || '',
  }
}

export default function UniversityFormModal({ open, university, onClose, onSave }) {
  const [form, setForm] = useState(() => buildForm(university))
  const [lastId, setLastId] = useState(university?.id ?? 'new')
  const toast = useToast()

  if (!open) return null

  const currentId = university?.id ?? 'new'
  if (currentId !== lastId) {
    setLastId(currentId)
    setForm(buildForm(university))
  }

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSave = () => {
    if (!form.name.trim() || !form.city.trim()) {
      toast?.showToast('Nombre y ciudad son requeridos.', 'error')
      return
    }
    const initials = form.name
      .split(' ')
      .filter((w) => w.length > 2)
      .slice(0, 3)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
    onSave({
      ...university,
      ...form,
      initials: university?.initials || initials || 'U',
      color: university?.color || '#2B5CE6',
      rosterSpots: Number(form.rosterSpots),
      gpaMin: Number(form.gpaMin),
    })
    toast?.showToast(university ? `${form.name} actualizada.` : `${form.name} añadida a la plataforma.`)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={university ? 'Editar Universidad' : 'Agregar Universidad'} variant="modal" maxWidth="max-w-lg">
      <div className="flex flex-col gap-4">
        <Field label="Nombre">
          <input className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ciudad">
            <input className={inputClass} value={form.city} onChange={(e) => set('city', e.target.value)} />
          </Field>
          <Field label="Región">
            <select className="filter-select" value={form.region} onChange={(e) => set('region', e.target.value)}>
              <option value="PR">Puerto Rico</option>
              <option value="US">Estados Unidos</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="División">
            <select className="filter-select" value={form.division} onChange={(e) => set('division', e.target.value)}>
              {['NCAA I', 'NCAA II', 'NCAA III', 'NAIA', 'LAI', 'NJCAA'].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Programa de Voleibol">
            <select className="filter-select" value={form.program} onChange={(e) => set('program', e.target.value)}>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Ambos">Ambos</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Cupos disponibles">
            <input type="number" min="0" className={inputClass} value={form.rosterSpots} onChange={(e) => set('rosterSpots', e.target.value)} />
          </Field>
          <Field label="GPA mínimo">
            <input type="number" step="0.1" min="0" max="4" className={inputClass} value={form.gpaMin} onChange={(e) => set('gpaMin', e.target.value)} />
          </Field>
        </div>
        <Field label="Contacto del coach (email)">
          <input className={inputClass} value={form.coachContact} onChange={(e) => set('coachContact', e.target.value)} placeholder="coach@universidad.edu" />
        </Field>

        <div className="flex gap-3 pt-2">
          <Button variant="outlineInk" className="flex-1" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" className="flex-1" onClick={handleSave}>{university ? 'Guardar Cambios' : 'Agregar Universidad'}</Button>
        </div>
      </div>
    </Modal>
  )
}
