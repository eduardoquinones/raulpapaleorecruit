import { useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Bell, MessageCircle, Menu, X, Volleyball, ChevronDown, LogOut, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useAthleteData } from '../../context/AthleteDataContext'
import { useClickOutside } from '../../hooks/useClickOutside'

const links = [
  { to: '/athlete/dashboard', label: 'Dashboard' },
  { to: '/athlete/profile/1', label: 'Mi Perfil' },
  { to: '/athlete/my-colleges', label: 'Mis Universidades' },
  { to: '/athlete/find-colleges', label: 'Encuentra Universidades' },
  { to: '/athlete/messages', label: 'Mensajes' },
]

export default function AthleteNavbar() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout, user } = useAuth()
  const { profile } = useAthleteData()
  const navigate = useNavigate()
  const menuRef = useRef(null)
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen)

  const initials = (user?.name || profile?.name || 'A').split(' ').map((n) => n[0]).slice(0, 2).join('')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-deep border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/athlete/dashboard" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold text-deep">
              <Volleyball className="w-5 h-5" />
            </span>
            <span className="font-heading font-bold text-lg text-white tracking-tight hidden sm:inline">
              VolleyRecruit <span className="text-gold">PR</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 h-full">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `h-16 flex items-center px-3 text-sm font-medium transition-colors border-b-2 ${
                    isActive ? 'text-gold border-gold' : 'text-white/80 hover:text-white border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 relative" ref={menuRef}>
            <button className="relative p-2 rounded-full text-white/80 hover:text-white hover:bg-white/5">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <Link to="/athlete/messages" className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/5">
              <MessageCircle className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMenuOpen((m) => !m)}
              className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-pill hover:bg-white/5"
            >
              <span className="w-8 h-8 rounded-full bg-electric flex items-center justify-center text-white font-semibold text-xs border-2 border-white/20 overflow-hidden">
                {profile?.photo ? <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" /> : initials}
              </span>
              <ChevronDown className="w-4 h-4 text-white/70" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-14 w-48 glass rounded-2xl shadow-glass-lg p-2 animate-scale-in">
                <Link to="/athlete/profile/1" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-ink hover:bg-ink/5">
                  <User className="w-4 h-4" /> Mi Cuenta
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4" /> Cerrar Sesión
                </button>
              </div>
            )}
          </div>

          <button className="lg:hidden p-2 text-white" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
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
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-3 rounded-xl text-sm text-red-400 hover:bg-red-400/10">
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
