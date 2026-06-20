import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

const SEED_USERS = [
  { role: 'athlete', name: 'Tomas Rivera', email: 'tomas@volleyrecruitpr.com', password: 'demo123', athleteId: '1' },
  { role: 'coach', name: 'Raul Papaleo', email: 'raul@volleyrecruitpr.com', password: 'demo123', athleteId: '1' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('vr_auth_user', null)
  const [registeredUsers, setRegisteredUsers] = useLocalStorage('vr_registered_users', SEED_USERS)

  const login = (role, { email, password }) => {
    const match = registeredUsers.find(
      (u) => u.role === role && u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!match) {
      return { success: false, error: 'Credenciales incorrectas. Verifica tu correo y contraseña.' }
    }
    const nextUser = { role: match.role, name: match.name, email: match.email, athleteId: match.athleteId || '1' }
    setUser(nextUser)
    return { success: true, user: nextUser }
  }

  const register = (role, { name, email, password }) => {
    const alreadyExists = registeredUsers.some((u) => u.role === role && u.email.toLowerCase() === email.toLowerCase())
    if (alreadyExists) {
      return { success: false, error: 'Ya existe una cuenta con este correo electrónico.' }
    }
    const newRecord = { role, name, email, password, athleteId: '1' }
    setRegisteredUsers((prev) => [...prev, newRecord])
    const nextUser = { role, name, email, athleteId: '1' }
    setUser(nextUser)
    return { success: true, user: nextUser }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
