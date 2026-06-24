import { Routes, Route, useLocation } from 'react-router-dom'
import PublicNavbar from './components/layout/PublicNavbar'
import AthleteNavbar from './components/layout/AthleteNavbar'
import CoachNavbar from './components/layout/CoachNavbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import AdminGuard from './components/admin/AdminGuard'
import MaintenanceScreen from './components/MaintenanceScreen'
import { ToastProvider } from './components/ui/Toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AthleteDataProvider } from './context/AthleteDataContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { AdminDataProvider, useAdminData } from './context/AdminDataContext'

import Landing from './pages/Landing'
import Athletes from './pages/Athletes'
import Colleges from './pages/Colleges'

import AthleteLogin from './pages/athlete/Login'
import AthleteRegister from './pages/athlete/Register'
import AthleteDashboard from './pages/athlete/Dashboard'
import AthleteProfile from './pages/athlete/Profile'
import AthleteEditProfile from './pages/athlete/EditProfile'
import MyColleges from './pages/athlete/MyColleges'
import FindColleges from './pages/athlete/FindColleges'
import AthleteMessages from './pages/athlete/Messages'

import CoachLogin from './pages/coach/Login'
import CoachRegister from './pages/coach/Register'
import CoachDashboard from './pages/coach/Dashboard'
import CoachFindAthletes from './pages/coach/FindAthletes'
import CoachMessages from './pages/coach/Messages'
import CoachSavedAthletes from './pages/coach/SavedAthletes'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAthletes from './pages/admin/AdminAthletes'
import AdminAthleteDetail from './pages/admin/AdminAthleteDetail'
import AdminCoaches from './pages/admin/AdminCoaches'
import AdminUniversities from './pages/admin/AdminUniversities'
import AdminMessages from './pages/admin/AdminMessages'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminSettings from './pages/admin/AdminSettings'

function AppNavbar() {
  const { user } = useAuth()
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  if (pathname === '/') return null // Landing page renders its own floating hero nav

  const isAuthPage =
    pathname.startsWith('/athlete/login') ||
    pathname.startsWith('/athlete/register') ||
    pathname.startsWith('/coach/login') ||
    pathname.startsWith('/coach/register')

  if (isAuthPage) return <PublicNavbar />
  if (user?.role === 'athlete') return <AthleteNavbar />
  if (user?.role === 'coach') return <CoachNavbar />
  return <PublicNavbar />
}

function AppFooter() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  return <Footer />
}

function AppContent() {
  const { platformSettings } = useAdminData()
  const { pathname } = useLocation()

  if (platformSettings.maintenanceMode && !pathname.startsWith('/admin')) {
    return <MaintenanceScreen />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <AppNavbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/athletes" element={<Athletes />} />
          <Route path="/colleges" element={<Colleges />} />

          <Route path="/athlete/login" element={<AthleteLogin />} />
          <Route path="/athlete/register" element={<AthleteRegister />} />
          <Route path="/athlete/dashboard" element={<ProtectedRoute role="athlete"><AthleteDashboard /></ProtectedRoute>} />
          <Route path="/athlete/profile/:id" element={<ProtectedRoute><AthleteProfile /></ProtectedRoute>} />
          <Route path="/athlete/edit-profile" element={<ProtectedRoute role="athlete"><AthleteEditProfile /></ProtectedRoute>} />
          <Route path="/athlete/my-colleges" element={<ProtectedRoute role="athlete"><MyColleges /></ProtectedRoute>} />
          <Route path="/athlete/find-colleges" element={<ProtectedRoute role="athlete"><FindColleges /></ProtectedRoute>} />
          <Route path="/athlete/messages" element={<ProtectedRoute role="athlete"><AthleteMessages /></ProtectedRoute>} />

          <Route path="/coach/login" element={<CoachLogin />} />
          <Route path="/coach/register" element={<CoachRegister />} />
          <Route path="/coach/dashboard" element={<ProtectedRoute role="coach"><CoachDashboard /></ProtectedRoute>} />
          <Route path="/coach/find-athletes" element={<ProtectedRoute role="coach"><CoachFindAthletes /></ProtectedRoute>} />
          <Route path="/coach/messages" element={<ProtectedRoute role="coach"><CoachMessages /></ProtectedRoute>} />
          <Route path="/coach/saved-athletes" element={<ProtectedRoute role="coach"><CoachSavedAthletes /></ProtectedRoute>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
          <Route path="/admin/athletes" element={<AdminGuard><AdminAthletes /></AdminGuard>} />
          <Route path="/admin/athletes/:id" element={<AdminGuard><AdminAthleteDetail /></AdminGuard>} />
          <Route path="/admin/coaches" element={<AdminGuard><AdminCoaches /></AdminGuard>} />
          <Route path="/admin/universities" element={<AdminGuard><AdminUniversities /></AdminGuard>} />
          <Route path="/admin/messages" element={<AdminGuard><AdminMessages /></AdminGuard>} />
          <Route path="/admin/analytics" element={<AdminGuard><AdminAnalytics /></AdminGuard>} />
          <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}

function App() {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <AuthProvider>
          <AthleteDataProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </AthleteDataProvider>
        </AuthProvider>
      </AdminDataProvider>
    </AdminAuthProvider>
  )
}

export default App
