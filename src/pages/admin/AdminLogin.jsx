import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Mail, Lock } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import { useAdminAuth } from '../../context/AdminAuthContext'

const inputClass =
  'w-full pl-10 pr-3.5 py-3 rounded-xl border border-ink/10 bg-white/60 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-electric/30'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Ingresa tu correo y contraseña.')
      return
    }
    const result = login(email, password)
    if (!result.success) {
      setError(result.error)
      return
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep px-4">
      <GlassCard dark className="w-full max-w-sm p-8 animate-scale-in">
        <div className="flex flex-col items-center mb-6">
          <span className="w-14 h-14 rounded-full bg-gold text-deep flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7" />
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white">Panel de Administración</h1>
          <p className="text-sm text-slate-300 mt-1 text-center">Acceso exclusivo para administradores de VolleyRecruit PR</p>
        </div>

        {error && (
          <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              className={inputClass}
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              className={inputClass}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" variant="gold" className="w-full mt-2">Iniciar Sesión</Button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          Demo: admin@volleyrecruitpr.com / admin123
        </p>
      </GlassCard>
    </div>
  )
}
