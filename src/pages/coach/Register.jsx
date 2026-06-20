import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Megaphone } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const inputClass =
  'w-full pl-10 pr-3.5 py-3 rounded-xl border border-ink/10 bg-white/60 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-electric/30'

export default function CoachRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const { register } = useAuth()
  const navigate = useNavigate()

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'El nombre es requerido.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Ingresa un correo electrónico válido.'
    if (form.password.length < 6) errs.password = 'La contraseña debe tener al menos 6 caracteres.'
    if (form.confirm !== form.password) errs.confirm = 'Las contraseñas no coinciden.'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    const result = register('coach', { name: form.name, email: form.email, password: form.password })
    if (!result.success) {
      setErrors({ form: result.error })
      return
    }
    navigate('/coach/dashboard')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <GlassCard className="w-full max-w-md p-8 animate-scale-in">
        <div className="flex flex-col items-center mb-6">
          <span className="w-12 h-12 rounded-full bg-electric text-white flex items-center justify-center mb-3">
            <Megaphone className="w-6 h-6" />
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-ink">Crea tu Cuenta de Entrenador</h1>
          <p className="text-sm text-ink-soft mt-1">Encuentra tu próximo jugador estrella.</p>
        </div>

        {errors.form && (
          <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="relative">
              <User className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input className={`${inputClass} ${errors.name ? 'input-error' : ''}`} placeholder="Nombre completo" value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input className={`${inputClass} ${errors.email ? 'input-error' : ''}`} placeholder="Correo electrónico" value={form.email} onChange={(e) => set('email', e.target.value)} />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="password" className={`${inputClass} ${errors.password ? 'input-error' : ''}`} placeholder="Contraseña" value={form.password} onChange={(e) => set('password', e.target.value)} />
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="password" className={`${inputClass} ${errors.confirm ? 'input-error' : ''}`} placeholder="Confirmar contraseña" value={form.confirm} onChange={(e) => set('confirm', e.target.value)} />
            </div>
            {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
          </div>

          <Button type="submit" variant="primary" className="w-full mt-2">Crear Cuenta</Button>
        </form>

        <p className="text-sm text-ink-soft text-center mt-6">
          ¿Ya tienes cuenta? <Link to="/coach/login" className="text-electric font-semibold hover:underline">Iniciar sesión</Link>
        </p>
        <p className="text-sm text-ink-soft text-center mt-2">
          ¿Eres atleta? <Link to="/athlete/register" className="text-electric font-semibold hover:underline">Crea tu cuenta aquí</Link>
        </p>
      </GlassCard>
    </div>
  )
}
