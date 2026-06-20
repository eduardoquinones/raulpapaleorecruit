import { useRef, useState } from 'react'
import { Camera, Lock, Globe, Mail, AlertTriangle } from 'lucide-react'
import Button from '../../components/ui/Button'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useAdminData } from '../../context/AdminDataContext'
import { useToast } from '../../components/ui/Toast'

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

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-ink/10 p-6">
      <h2 className="font-heading font-bold text-ink mb-4">{title}</h2>
      {children}
    </div>
  )
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {description && <p className="text-xs text-ink-soft">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-pill transition-colors relative shrink-0 ${checked ? 'bg-electric' : 'bg-ink/15'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  )
}

export default function AdminSettings() {
  const { changePassword } = useAdminAuth()
  const { platformSettings, updatePlatformSettings, recruitingCoachSettings, updateRecruitingCoachSettings } = useAdminData()
  const toast = useToast()
  const fileInputRef = useRef(null)

  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' })
  const [platformForm, setPlatformForm] = useState(platformSettings)
  const [coachForm, setCoachForm] = useState(recruitingCoachSettings)

  const handleChangePassword = () => {
    if (passwordForm.next.length < 6) {
      toast?.showToast('La nueva contraseña debe tener al menos 6 caracteres.', 'error')
      return
    }
    if (passwordForm.next !== passwordForm.confirm) {
      toast?.showToast('Las contraseñas no coinciden.', 'error')
      return
    }
    const result = changePassword(passwordForm.current, passwordForm.next)
    if (!result.success) {
      toast?.showToast(result.error, 'error')
      return
    }
    toast?.showToast('Contraseña actualizada exitosamente.')
    setPasswordForm({ current: '', next: '', confirm: '' })
  }

  const handleSavePlatform = () => {
    updatePlatformSettings(platformForm)
    toast?.showToast('Configuración de la plataforma guardada.')
  }

  const handleSaveCoach = () => {
    updateRecruitingCoachSettings(coachForm)
    toast?.showToast('Información de Raul Papaleo actualizada.')
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast?.showToast('Por favor selecciona un archivo de imagen.', 'error')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setCoachForm((f) => ({ ...f, photo: reader.result }))
    reader.readAsDataURL(file)
  }

  return (
    <div className="px-6 sm:px-8 py-8 max-w-3xl flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-ink mb-1">Configuración</h1>
        <p className="text-ink-soft">Administra la configuración de la plataforma y tu cuenta.</p>
      </div>

      <SectionCard title="Cambiar Contraseña de Administrador">
        <div className="flex flex-col gap-3">
          <Field label="Contraseña actual">
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="password" className={`${inputClass} pl-10`} value={passwordForm.current} onChange={(e) => setPasswordForm((f) => ({ ...f, current: e.target.value }))} />
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nueva contraseña">
              <input type="password" className={inputClass} value={passwordForm.next} onChange={(e) => setPasswordForm((f) => ({ ...f, next: e.target.value }))} />
            </Field>
            <Field label="Confirmar nueva contraseña">
              <input type="password" className={inputClass} value={passwordForm.confirm} onChange={(e) => setPasswordForm((f) => ({ ...f, confirm: e.target.value }))} />
            </Field>
          </div>
          <Button variant="primary" className="w-fit mt-1" onClick={handleChangePassword}>Actualizar Contraseña</Button>
        </div>
      </SectionCard>

      <SectionCard title="Configuración de la Plataforma">
        <div className="flex flex-col gap-3">
          <Field label="Nombre de la plataforma">
            <input className={inputClass} value={platformForm.platformName} onChange={(e) => setPlatformForm((f) => ({ ...f, platformName: e.target.value }))} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Correo de contacto">
              <input className={inputClass} value={platformForm.contactEmail} onChange={(e) => setPlatformForm((f) => ({ ...f, contactEmail: e.target.value }))} />
            </Field>
            <Field label="Teléfono de contacto">
              <input className={inputClass} value={platformForm.contactPhone} onChange={(e) => setPlatformForm((f) => ({ ...f, contactPhone: e.target.value }))} />
            </Field>
          </div>
          <Field label="Instagram">
            <div className="relative">
              <Globe className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input className={`${inputClass} pl-10`} value={platformForm.social.instagram} onChange={(e) => setPlatformForm((f) => ({ ...f, social: { ...f.social, instagram: e.target.value } }))} placeholder="https://instagram.com/..." />
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Facebook">
              <input className={inputClass} value={platformForm.social.facebook} onChange={(e) => setPlatformForm((f) => ({ ...f, social: { ...f.social, facebook: e.target.value } }))} placeholder="https://facebook.com/..." />
            </Field>
            <Field label="Twitter / X">
              <input className={inputClass} value={platformForm.social.twitter} onChange={(e) => setPlatformForm((f) => ({ ...f, social: { ...f.social, twitter: e.target.value } }))} placeholder="https://x.com/..." />
            </Field>
          </div>

          <div className="border-t border-ink/10 pt-3 mt-1">
            <Toggle
              checked={platformForm.emailNotifications}
              onChange={(v) => setPlatformForm((f) => ({ ...f, emailNotifications: v }))}
              label="Notificaciones por correo"
              description="Enviar notificaciones automáticas a atletas y entrenadores."
            />
            <Toggle
              checked={platformForm.maintenanceMode}
              onChange={(v) => setPlatformForm((f) => ({ ...f, maintenanceMode: v }))}
              label="Modo de mantenimiento"
              description='Muestra "Próximamente" a los usuarios mientras realizas cambios.'
            />
            {platformForm.maintenanceMode && (
              <p className="text-xs text-amber-600 flex items-center gap-1.5 mt-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> El modo de mantenimiento ocultará la plataforma a todos los usuarios hasta que lo desactives.
              </p>
            )}
          </div>

          <Button variant="primary" className="w-fit mt-1" onClick={handleSavePlatform}>Guardar Configuración</Button>
        </div>
      </SectionCard>

      <SectionCard title="Información de Raul Papaleo (Coach de Reclutamiento)">
        <div className="flex items-center gap-4 mb-4">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-16 rounded-full overflow-hidden bg-deep flex items-center justify-center text-gold font-bold text-lg border-2 border-ink/10 shrink-0"
          >
            {coachForm.photo ? <img src={coachForm.photo} alt="Raul Papaleo" className="w-full h-full object-cover" /> : 'RP'}
          </button>
          <Button variant="outlineInk" size="sm" onClick={() => fileInputRef.current?.click()}>
            <Camera className="w-4 h-4" /> Cambiar foto
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <Field label="Biografía">
            <textarea
              className={`${inputClass} min-h-28 resize-none`}
              value={coachForm.bio}
              onChange={(e) => setCoachForm((f) => ({ ...f, bio: e.target.value }))}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Teléfono">
              <input className={inputClass} value={coachForm.phone} onChange={(e) => setCoachForm((f) => ({ ...f, phone: e.target.value }))} />
            </Field>
            <Field label="Correo electrónico">
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input className={`${inputClass} pl-10`} value={coachForm.email} onChange={(e) => setCoachForm((f) => ({ ...f, email: e.target.value }))} />
              </div>
            </Field>
          </div>
          <Button variant="primary" className="w-fit mt-1" onClick={handleSaveCoach}>Guardar Información</Button>
        </div>
      </SectionCard>
    </div>
  )
}
