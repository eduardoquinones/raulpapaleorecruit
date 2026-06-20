import { useState } from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex bg-slate-50">
      <AdminSidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed((c) => !c)} />
      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
    </div>
  )
}
