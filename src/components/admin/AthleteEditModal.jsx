import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { useToast } from '../ui/Toast'

const POSITION_OPTIONS = ['Outside Hitter', 'Opposite', 'Setter', 'Middle Blocker', 'Libero', 'Defensive Specialist']

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

function buildForm(athlete) {
  return {
    name: athlete.name || '',
    school: athlete.school || '',
    city: athlete.city || '',
    club: athlete.club || '',
    gradYear: athlete.gradYear || '',
    positions: athlete.positions || [],
    gpa: athlete.gpa || '',
    height: athlete.height || '',
    weight: athlete.weight || '',
    classRank: athlete.classRank || '',
    satAct: athlete.satAct || '',
    about: athlete.about || '',
  }
}

export default function AthleteEditModal({ athlete, onClose, onSave }) {
  const toast = useToast()
  const [form, setForm] = useState(() => (athlete ? buildForm(athlete) : null))
  const [lastAthleteId, setLastAthleteId] = useState(athlete?.id ?? null)

  // AthleteEditModal stays mounted across opens (the `athlete` prop just toggles
  // between an object and null), so the form must be rebuilt whenever the prop's
  // identity changes — adjusting state during render avoids an extra effect pass.
  const nextId = athlete?.id ?? null
  if (nextId !== lastAthleteId) {
    setLastAthleteId(nextId)
    setForm(athlete ? buildForm(athlete) : null)
  }

  if (!athlete || !form) return null

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const togglePosition = (pos) =>
    setForm((f) => ({
      ...f,
      positions: f.positions.includes(pos) ? f.positions.filter((p) => p !== pos) : [...f.positions, pos],
    }))

  const handleSave = () => {
    if (!form.name.trim()) {
      toast?.showToast('El nombre es requerido.', 'error')
      return
    }
    onSave({
      ...form,
      gradYear: Number(form.gradYear) || form.gradYear,
      gpa: Number(form.gpa) || form.gpa,
    })
    toast?.showToast(`Perfil de ${form.name} actualizado.`)
    onClose()
  }

  return (
    <Modal open={!!athlete} onClose={onClose} title={`Editar a ${athlete.name}`} variant="modal" maxWidth="max-w-xl">
      <div className="flex flex-col gap-4">
        <Field label="Nombre completo">
          <input className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Escuela">
            <input className={inputClass} value={form.school} onChange={(e) => set('school', e.target.value)} />
          </Field>
          <Field label="Ciudad">
            <input className={inputClass} value={form.city} onChange={(e) => set('city', e.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Equipo club">
            <input className={inputClass} value={form.club} onChange={(e) => set('club', e.target.value)} />
          </Field>
          <Field label="Año de graduación">
            <input type="number" className={inputClass} value={form.gradYear} onChange={(e) => set('gradYear', e.target.value)} />
          </Field>
        </div>

        <Field label="Posición(es)">
          <div className="flex flex-wrap gap-2">
            {POSITION_OPTIONS.map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => togglePosition(pos)}
                className={`px-3 py-1.5 rounded-pill text-xs font-medium border transition-colors ${
                  form.positions.includes(pos)
                    ? 'bg-electric text-white border-electric'
                    : 'bg-white text-ink-soft border-ink/10 hover:border-electric/40'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </Field>

        <div className="grid grid-cols-4 gap-3">
          <Field label="GPA">
            <input type="number" step="0.1" min="0" max="4" className={inputClass} value={form.gpa} onChange={(e) => set('gpa', e.target.value)} />
          </Field>
          <Field label="Estatura">
            <input className={inputClass} value={form.height} onChange={(e) => set('height', e.target.value)} />
          </Field>
          <Field label="Peso">
            <input className={inputClass} value={form.weight} onChange={(e) => set('weight', e.target.value)} />
          </Field>
          <Field label="Rango de clase">
            <input className={inputClass} value={form.classRank} onChange={(e) => set('classRank', e.target.value)} />
          </Field>
        </div>

        <Field label="SAT / ACT">
          <input className={inputClass} value={form.satAct} onChange={(e) => set('satAct', e.target.value)} />
        </Field>

        <Field label="Sobre mí">
          <textarea
            className={`${inputClass} min-h-24 resize-none`}
            value={form.about}
            onChange={(e) => set('about', e.target.value)}
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <Button variant="outlineInk" className="flex-1" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" className="flex-1" onClick={handleSave}>Guardar Cambios</Button>
        </div>
      </div>
    </Modal>
  )
}
