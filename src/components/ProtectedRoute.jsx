import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth()
  const location = useLocation()
  const loginPath = role === 'coach' ? '/coach/login' : '/athlete/login'

  if (!user) {
    return <Navigate to={loginPath} replace state={{ from: location.pathname }} />
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'coach' ? '/coach/dashboard' : '/athlete/dashboard'} replace />
  }

  return children
}
