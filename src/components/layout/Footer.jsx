import { Link } from 'react-router-dom'
import { Volleyball, Camera, Globe, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="px-4 pb-6 pt-12">
      <div className="max-w-7xl mx-auto glass-dark rounded-card shadow-glass-dark px-8 py-10 text-slate-400">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-deep">
                <Volleyball className="w-4 h-4" />
              </span>
              <span className="font-heading font-bold text-white">
                VolleyRecruit <span className="text-gold">PR</span>
              </span>
            </Link>
            <p className="text-sm max-w-xs">Tu camino al voleibol universitario.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Compañía</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gold">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-gold">Privacidad</a></li>
              <li><a href="#" className="hover:text-gold">Términos</a></li>
              <li><a href="#" className="hover:text-gold">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Síguenos</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white"><Camera className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white"><Globe className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white"><Share2 className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-sm text-center">
          © 2025 VolleyRecruit PR — Hecho con 🏐 en Puerto Rico
        </div>
      </div>
    </footer>
  )
}
