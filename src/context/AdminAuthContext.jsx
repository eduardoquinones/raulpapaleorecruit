import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AdminAuthContext = createContext(null)

const DEFAULT_CREDENTIALS = {
  email: 'admin@volleyrecruitpr.com',
  passwordHash: btoa('admin123'),
}

export function AdminAuthProvider({ children }) {
  const [credentials, setCredentials] = useLocalStorage('admin_credentials', DEFAULT_CREDENTIALS)
  const [adminAuth, setAdminAuth] = useLocalStorage('adminAuth', null)

  const login = (email, password) => {
    const matches =
      email.trim().toLowerCase() === credentials.email.toLowerCase() && btoa(password) === credentials.passwordHash
    if (!matches) {
      return { success: false, error: 'Credenciales incorrectas. Verifica tu correo y contraseña.' }
    }
    setAdminAuth({ email: credentials.email, loggedInAt: new Date().toISOString() })
    return { success: true }
  }

  const logout = () => setAdminAuth(null)

  const changePassword = (currentPassword, newPassword) => {
    if (btoa(currentPassword) !== credentials.passwordHash) {
      return { success: false, error: 'La contraseña actual no es correcta.' }
    }
    setCredentials((prev) => ({ ...prev, passwordHash: btoa(newPassword) }))
    return { success: true }
  }

  return (
    <AdminAuthContext.Provider
      value={{ admin: adminAuth, isAdminAuthenticated: !!adminAuth, login, logout, changePassword, adminEmail: credentials.email }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)
