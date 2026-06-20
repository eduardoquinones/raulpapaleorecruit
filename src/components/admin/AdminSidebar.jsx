import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Megaphone, School, MessageSquare, BarChart3, Settings, LogOut,
  ChevronsLeft, ChevronsRight, Volleyball,
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/athletes', label: 'Atletas', icon: Users },
  { to: '/admin/coaches', label: 'Entrenadores', icon: Megaphone },
  { to: '/admin/universities', label: 'Universidades', icon: School },
  { to: '/admin/messages', label: 'Mensajes', icon: MessageSquare },
  { to: '/admin/analytics', label: 'Analíticas', icon: BarChart3 },
  { to: '/admin/settings', label: 'Configuración', icon: Settings },
]

export default function AdminSidebar({ collapsed, onToggleCollapsed }) {
  const { logout } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside
      className={`shrink-0 bg-deep border-r border-white/10 flex flex-col transition-all duration-200 ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      <div className="h-16 flex items-center gap-2 px-4 border-b border-white/10 shrink-0">
        <Link to="/admin/dashboard" className="flex items-center gap-2 min-w-0">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold text-deep shrink-0">
            <Volleyball className="w-5 h-5" />
          </span>
          {!collapsed && (
            <span className="font-heading font-bold text-white text-sm truncate">
              VolleyRecruit PR
              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-md bg-red-500 text-white text-[10px] font-bold uppercase tracking-wide">
                Admin
              </span>
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto scrollbar-thin">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              title={collapsed ? link.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-gold text-deep' : 'text-white/70 hover:text-white hover:bg-white/5'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{link.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-2 border-t border-white/10 flex flex-col gap-1">
        <button
          onClick={handleLogout}
          title={collapsed ? 'Cerrar Sesión' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Cerrar Sesión</span>}
        </button>
        <button
          onClick={onToggleCollapsed}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {collapsed ? <ChevronsRight className="w-5 h-5 shrink-0" /> : <ChevronsLeft className="w-5 h-5 shrink-0" />}
          {!collapsed && <span>Colapsar</span>}
        </button>
      </div>
    </aside>
  )
}
