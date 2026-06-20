import { Volleyball } from 'lucide-react'

export default function MaintenanceScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-deep px-4 text-center">
      <div>
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold text-deep mb-6">
          <Volleyball className="w-8 h-8" />
        </span>
        <h1 className="font-heading font-extrabold text-3xl text-white mb-3">Próximamente</h1>
        <p className="text-slate-300 max-w-md mx-auto">
          VolleyRecruit PR está en mantenimiento. Estamos mejorando la plataforma — vuelve a visitarnos en breve.
        </p>
      </div>
    </div>
  )
}
