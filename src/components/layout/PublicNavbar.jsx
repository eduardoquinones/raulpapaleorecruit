import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Volleyball } from 'lucide-react'
import Button from '../ui/Button'

const links = [
  { to: '/athletes', label: 'Para Atletas' },
  { to: '/coach/login', label: 'Para Entrenadores' },
  { to: '/colleges', label: 'Universidades' },
]

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-deep border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold text-deep">
              <Volleyball className="w-5 h-5" />
            </span>
            <span className="font-heading font-bold text-lg text-white tracking-tight">
              VolleyRecruit <span className="text-gold">PR</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 h-full">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `h-16 flex items-center px-4 text-sm font-medium transition-colors border-b-2 ${
                    isActive
                      ? 'text-gold border-gold'
                      : 'text-white/80 hover:text-white border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button as={Link} to="/athlete/login" variant="ghostDark" size="sm">Iniciar Sesión</Button>
            <Button as={Link} to="/athlete/register" variant="gold" size="sm">Crear Cuenta</Button>
          </div>

          <button className="lg:hidden p-2 text-white" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-deep border-l border-white/10 p-6 animate-slide-in-right">
            <div className="flex justify-between items-center mb-8">
              <span className="font-heading font-bold text-white">Menú</span>
              <button onClick={() => setOpen(false)} className="text-white"><X className="w-6 h-6" /></button>
            </div>
            <nav className="flex flex-col gap-2 mb-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-xl text-sm font-medium ${isActive ? 'text-gold bg-white/5' : 'text-white/80 hover:bg-white/5'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <Button as={Link} to="/athlete/login" variant="outline" onClick={() => setOpen(false)}>Iniciar Sesión</Button>
              <Button as={Link} to="/athlete/register" variant="gold" onClick={() => setOpen(false)}>Crear Cuenta</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
