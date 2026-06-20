import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import AdminLayout from './AdminLayout'

export default function AdminGuard({ children }) {
  const { isAdminAuthenticated } = useAdminAuth()

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <AdminLayout>{children}</AdminLayout>
}
