import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Megaphone, Info } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const inputClass =
  'w-full pl-10 pr-3.5 py-3 rounded-xl border border-ink/10 bg-white/60 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-electric/30'

export default function CoachLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Ingresa un correo electrónico válido.'
    if (password.length < 6) errs.password = 'La contraseña debe tener al menos 6 caracteres.'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    const result = login('coach', { email, password })
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
          <h1 className="font-heading font-extrabold text-2xl text-ink">Portal de Entrenadores</h1>
          <p className="text-sm text-ink-soft mt-1">Inicia sesión para buscar talento boricua.</p>
        </div>

        {errors.form && (
          <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input className={`${inputClass} ${errors.email ? 'input-error' : ''}`} placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="password" className={`${inputClass} ${errors.password ? 'input-error' : ''}`} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <Button type="submit" variant="primary" className="w-full mt-2">Iniciar Sesión</Button>
        </form>

        <p className="text-xs text-ink-soft/70 text-center mt-5 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5" /> Demo: raul@volleyrecruitpr.com / demo123
        </p>

        <p className="text-sm text-ink-soft text-center mt-4">
          ¿No tienes cuenta? <Link to="/coach/register" className="text-electric font-semibold hover:underline">Crear cuenta</Link>
        </p>
        <p className="text-sm text-ink-soft text-center mt-2">
          ¿Eres atleta? <Link to="/athlete/login" className="text-electric font-semibold hover:underline">Inicia sesión aquí</Link>
        </p>
      </GlassCard>
    </div>
  )
}
