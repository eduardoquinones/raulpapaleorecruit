import { useRef, useState } from 'react'
import { Plus, Trash2, Video, Camera } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { useAthleteData } from '../../context/AthleteDataContext'
import { useToast } from '../ui/Toast'
import { prHighSchools } from '../../data/prHighSchools'
import { gradYearOptions, divisionOptions, distanceOptions, locationOptions, majorOptions, classRankOptions } from '../../data/profileOptions'

const POSITION_OPTIONS = ['Outside Hitter', 'Opposite', 'Setter', 'Middle Blocker', 'Libero', 'Defensive Specialist']

function buildForm(profile) {
  return {
    name: profile.name || '',
    dob: profile.dob || '',
    phone: profile.phone || '',
    email: profile.email || '',
    location: profile.city || '',
    school: profile.school || '',
    club: profile.club || '',
    jerseyNumber: profile.jerseyNumber || '',
    photo: profile.photo || null,
    gpa: profile.gpa || '',
    classRank: profile.classRank || '',
    satAct: profile.satAct || '',
    gradYear: profile.gradYear || '',
    positions: profile.positions || [],
    stats: { ...profile.stats },
    about: profile.about || '',
    videoUrl: profile.videos?.[0]?.url || '',
    references: profile.references?.length
      ? profile.references
      : [{ name: '', school: '', phone: '', email: '' }],
    divisions: profile.preferences?.divisions || [],
    major: profile.preferences?.major || '',
    distance: profile.preferences?.distance || '',
    locationPref: profile.preferences?.location || '',
    errors: {},
  }
}

function Section({ title, children }) {
  return (
    <div className="mb-7">
      <h3 className="font-heading font-bold text-ink mb-3 text-sm uppercase tracking-wide text-ink-soft">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink-soft mb-1 block">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl border border-ink/10 bg-white/60 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-electric/30'

const fieldClass = (hasError) => `${inputClass} ${hasError ? 'input-error' : ''}`

export default function EditProfileModal({ open, onClose }) {
  const { profile, updateProfile } = useAthleteData()
  const toast = useToast()
  const [form, setForm] = useState(() => buildForm(profile))
  const [wasOpen, setWasOpen] = useState(open)
  const fileInputRef = useRef(null)

  // Re-sync the form from the saved profile every time the modal transitions to open,
  // so reopening after a save (or a cancel that discarded edits) shows current data.
  // Adjusting state during render (rather than in an effect) avoids an extra render pass.
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setForm(buildForm(profile))
  }

  if (!open) return null

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast?.showToast('Por favor selecciona un archivo de imagen.', 'error')
      return
    }
    const reader = new FileReader()
    reader.onload = () => set('photo', reader.result)
    reader.readAsDataURL(file)
  }

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const setStat = (key, value) => setForm((f) => ({ ...f, stats: { ...f.stats, [key]: value } }))

  const togglePosition = (pos) =>
    setForm((f) => ({
      ...f,
      positions: f.positions.includes(pos) ? f.positions.filter((p) => p !== pos) : [...f.positions, pos],
    }))

  const toggleDivision = (div) =>
    setForm((f) => ({
      ...f,
      divisions: f.divisions.includes(div) ? f.divisions.filter((d) => d !== div) : [...f.divisions, div],
    }))

  const updateReference = (index, key, value) =>
    setForm((f) => ({
      ...f,
      references: f.references.map((r, i) => (i === index ? { ...r, [key]: value } : r)),
    }))

  const addReference = () =>
    setForm((f) =>
      f.references.length >= 3 ? f : { ...f, references: [...f.references, { name: '', school: '', phone: '', email: '' }] }
    )

  const removeReference = (index) =>
    setForm((f) => ({ ...f, references: f.references.filter((_, i) => i !== index) }))

  const validate = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'El nombre es requerido.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Correo electrónico inválido.'
    if (form.gpa && (Number(form.gpa) < 0 || Number(form.gpa) > 4)) errors.gpa = 'El GPA debe estar entre 0 y 4.'
    if (form.positions.length === 0) errors.positions = 'Selecciona al menos una posición.'
    setForm((f) => ({ ...f, errors }))
    return Object.keys(errors).length === 0
  }

  const handleSave = () => {
    if (!validate()) {
      toast?.showToast('Por favor corrige los errores en el formulario.', 'error')
      return
    }
    updateProfile({
      name: form.name,
      dob: form.dob,
      phone: form.phone,
      email: form.email,
      photo: form.photo,
      city: form.location,
      school: form.school,
      club: form.club,
      jerseyNumber: form.jerseyNumber,
      gpa: Number(form.gpa) || form.gpa,
      classRank: form.classRank,
      satAct: form.satAct,
      gradYear: Number(form.gradYear) || form.gradYear,
      positions: form.positions,
      stats: form.stats,
      about: form.about,
      videos: form.videoUrl ? [{ url: form.videoUrl, title: `${form.name} — Highlights`, date: new Date().toISOString().slice(0, 10) }] : profile.videos,
      references: form.references.filter((r) => r.name.trim()),
      preferences: { divisions: form.divisions, major: form.major, distance: form.distance, location: form.locationPref },
    })
    toast?.showToast('Perfil actualizado exitosamente.')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Editar Perfil" variant="slideover">
      <Section title="Información Personal">
        <Field label="Foto de perfil">
          <div className="flex items-center gap-4">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-full overflow-hidden bg-electric flex items-center justify-center text-white font-bold text-xl border-2 border-ink/10 shrink-0"
            >
              {form.photo ? (
                <img src={form.photo} alt={form.name} className="w-full h-full object-cover" />
              ) : (
                form.name.split(' ').map((n) => n[0]).slice(0, 2).join('') || '?'
              )}
            </button>
            <Button type="button" variant="outlineInk" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Camera className="w-4 h-4" /> Cambiar foto
            </Button>
          </div>
        </Field>
        <Field label="Nombre completo">
          <input className={fieldClass(!!form.errors.name)} value={form.name} onChange={(e) => set('name', e.target.value)} />
          {form.errors.name && <p className="text-xs text-red-500 mt-1">{form.errors.name}</p>}
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Fecha de nacimiento">
            <input type="date" className={inputClass} value={form.dob} onChange={(e) => set('dob', e.target.value)} />
          </Field>
          <Field label="Teléfono">
            <input className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(787) 555-0100" />
          </Field>
        </div>
        <Field label="Correo electrónico">
          <input className={fieldClass(!!form.errors.email)} value={form.email} onChange={(e) => set('email', e.target.value)} />
          {form.errors.email && <p className="text-xs text-red-500 mt-1">{form.errors.email}</p>}
        </Field>
        <Field label="Ubicación">
          <input className={inputClass} value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Guaynabo, PR" />
        </Field>
      </Section>

      <Section title="Información Académica">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Escuela">
            <input
              className={inputClass}
              list="pr-high-schools"
              value={form.school}
              onChange={(e) => set('school', e.target.value)}
              placeholder="Busca o escribe tu escuela..."
            />
            <datalist id="pr-high-schools">
              {prHighSchools.map((s) => <option key={s} value={s} />)}
            </datalist>
          </Field>
          <Field label="Año de graduación">
            <select className="filter-select" value={form.gradYear} onChange={(e) => set('gradYear', e.target.value)}>
              <option value="">Selecciona...</option>
              {gradYearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field label="GPA">
            <input type="number" step="0.1" max="4" min="0" className={fieldClass(!!form.errors.gpa)} value={form.gpa} onChange={(e) => set('gpa', e.target.value)} />
            {form.errors.gpa && <p className="text-xs text-red-500 mt-1">{form.errors.gpa}</p>}
          </Field>
          <Field label="Rango de clase">
            <select className="filter-select" value={form.classRank} onChange={(e) => set('classRank', e.target.value)}>
              <option value="">Selecciona...</option>
              {classRankOptions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="SAT / ACT">
            <input className={inputClass} value={form.satAct} onChange={(e) => set('satAct', e.target.value)} placeholder="1280 SAT" />
          </Field>
        </div>
      </Section>

      <Section title="Estadísticas de Voleibol">
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
                    : 'bg-white/50 text-ink-soft border-ink/10 hover:border-electric/40'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
          {form.errors.positions && <p className="text-xs text-red-500 mt-1">{form.errors.positions}</p>}
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Equipo de club">
            <input className={inputClass} value={form.club} onChange={(e) => set('club', e.target.value)} />
          </Field>
          <Field label="Número de camiseta">
            <input type="number" className={inputClass} value={form.jerseyNumber} onChange={(e) => set('jerseyNumber', e.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Field label="Kills/set">
            <input type="number" step="0.1" className={inputClass} value={form.stats.killsPerSet} onChange={(e) => setStat('killsPerSet', Number(e.target.value))} />
          </Field>
          <Field label="Aces/set">
            <input type="number" step="0.1" className={inputClass} value={form.stats.acesPerSet} onChange={(e) => setStat('acesPerSet', Number(e.target.value))} />
          </Field>
          <Field label="Digs/set">
            <input type="number" step="0.1" className={inputClass} value={form.stats.digsPerSet} onChange={(e) => setStat('digsPerSet', Number(e.target.value))} />
          </Field>
          <Field label="Blocks/set">
            <input type="number" step="0.1" className={inputClass} value={form.stats.blocksPerSet} onChange={(e) => setStat('blocksPerSet', Number(e.target.value))} />
          </Field>
          <Field label="Attack %">
            <input type="number" step="0.01" max="1" min="0" className={inputClass} value={form.stats.attackPct} onChange={(e) => setStat('attackPct', Number(e.target.value))} />
          </Field>
          <Field label="Serve %">
            <input type="number" step="0.01" max="1" min="0" className={inputClass} value={form.stats.servePct} onChange={(e) => setStat('servePct', Number(e.target.value))} />
          </Field>
          <Field label="Reception %">
            <input type="number" step="0.01" max="1" min="0" className={inputClass} value={form.stats.receptionPct} onChange={(e) => setStat('receptionPct', Number(e.target.value))} />
          </Field>
        </div>
      </Section>

      <Section title="Sobre Mí">
        <textarea
          className={`${inputClass} min-h-28 resize-none`}
          value={form.about}
          onChange={(e) => set('about', e.target.value)}
          placeholder="Cuéntale a los entrenadores sobre ti..."
        />
      </Section>

      <Section title="Video Destacado">
        <Field label="URL de YouTube">
          <div className="relative">
            <Video className="w-4 h-4 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input className={`${inputClass} pl-9`} value={form.videoUrl} onChange={(e) => set('videoUrl', e.target.value)} placeholder="https://www.youtube.com/embed/..." />
          </div>
        </Field>
        {form.videoUrl && (
          <div className="aspect-video rounded-2xl overflow-hidden bg-ink/5">
            <iframe className="w-full h-full" src={form.videoUrl} title="preview" allowFullScreen />
          </div>
        )}
      </Section>

      <Section title="Referencias de Entrenadores">
        {form.references.map((ref, i) => (
          <div key={i} className="bg-white/50 rounded-2xl p-3 border border-ink/10 relative">
            <button
              type="button"
              onClick={() => removeReference(i)}
              className="absolute top-2 right-2 text-ink-soft hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input className={inputClass} placeholder="Nombre" value={ref.name} onChange={(e) => updateReference(i, 'name', e.target.value)} />
              <input className={inputClass} placeholder="Escuela" value={ref.school} onChange={(e) => updateReference(i, 'school', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input className={inputClass} placeholder="Teléfono" value={ref.phone} onChange={(e) => updateReference(i, 'phone', e.target.value)} />
              <input className={inputClass} placeholder="Email" value={ref.email} onChange={(e) => updateReference(i, 'email', e.target.value)} />
            </div>
          </div>
        ))}
        {form.references.length < 3 && (
          <button type="button" onClick={addReference} className="flex items-center gap-1.5 text-sm text-electric font-medium">
            <Plus className="w-4 h-4" /> Añadir referencia
          </button>
        )}
      </Section>

      <Section title="Preferencias de Reclutamiento">
        <Field label="División preferida">
          <div className="flex flex-wrap gap-2">
            {divisionOptions.map((div) => (
              <button
                key={div.value}
                type="button"
                onClick={() => toggleDivision(div.value)}
                className={`px-3 py-1.5 rounded-pill text-xs font-medium border transition-colors ${
                  form.divisions.includes(div.value)
                    ? 'bg-gold text-deep border-gold'
                    : 'bg-white/50 text-ink-soft border-ink/10 hover:border-gold/40'
                }`}
              >
                {div.label}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Carrera preferida">
          <select className="filter-select" value={form.major} onChange={(e) => set('major', e.target.value)}>
            {majorOptions.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Distancia de casa">
            <select className="filter-select" value={form.distance} onChange={(e) => set('distance', e.target.value)}>
              {distanceOptions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Ubicación preferida">
            <select className="filter-select" value={form.locationPref} onChange={(e) => set('locationPref', e.target.value)}>
              {locationOptions.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>
        </div>
      </Section>

      <div className="flex gap-3 sticky bottom-0 glass -mx-6 -mb-6 px-6 py-4 border-t border-white/30 rounded-b-card">
        <Button variant="outlineInk" className="flex-1" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" className="flex-1" onClick={handleSave}>Guardar Cambios</Button>
      </div>
    </Modal>
  )
}
