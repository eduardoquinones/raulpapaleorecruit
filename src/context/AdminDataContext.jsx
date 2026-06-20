import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { mockAthletes } from '../data/mockAthletes'
import { getAdminAthleteMeta } from '../data/adminAthleteMeta'
import { mockCoaches } from '../data/mockCoaches'
import { prColleges } from '../data/prColleges'
import { usColleges } from '../data/usColleges'
import { adminConversations } from '../data/adminConversations'
import { recruitingCoach as defaultRecruitingCoach } from '../data/mockUser'

const AdminDataContext = createContext(null)

const DEFAULT_PLATFORM_SETTINGS = {
  platformName: 'VolleyRecruit PR',
  contactEmail: 'contacto@volleyrecruitpr.com',
  contactPhone: '(787) 555-0100',
  social: { instagram: '', facebook: '', twitter: '' },
  emailNotifications: true,
  maintenanceMode: false,
}

const DEFAULT_RECRUITING_COACH_SETTINGS = {
  bio: defaultRecruitingCoach.bio,
  phone: defaultRecruitingCoach.phone,
  email: defaultRecruitingCoach.email,
  photo: null,
}

export function AdminDataProvider({ children }) {
  const [athleteOverrides, setAthleteOverrides] = useLocalStorage('admin_athlete_overrides', {})
  const [deletedAthleteIds, setDeletedAthleteIds] = useLocalStorage('admin_deleted_athletes', [])
  const [athleteNotes, setAthleteNotes] = useLocalStorage('admin_athlete_notes', {})

  const [coachOverrides, setCoachOverrides] = useLocalStorage('admin_coach_overrides', {})
  const [deletedCoachIds, setDeletedCoachIds] = useLocalStorage('admin_deleted_coaches', [])

  const [universityOverrides, setUniversityOverrides] = useLocalStorage('admin_university_overrides', {})
  const [addedUniversities, setAddedUniversities] = useLocalStorage('admin_added_universities', [])
  const [deletedUniversityIds, setDeletedUniversityIds] = useLocalStorage('admin_deleted_universities', [])

  const [conversationFlags, setConversationFlags] = useLocalStorage('admin_conversation_flags', {})

  const [platformSettings, setPlatformSettings] = useLocalStorage('admin_platform_settings', DEFAULT_PLATFORM_SETTINGS)
  const [recruitingCoachSettings, setRecruitingCoachSettings] = useLocalStorage(
    'admin_recruiting_coach_settings',
    DEFAULT_RECRUITING_COACH_SETTINGS
  )

  // ---- Athletes ----
  const athletes = useMemo(() => {
    return mockAthletes
      .filter((a) => !deletedAthleteIds.includes(a.id))
      .map((a) => ({ ...a, ...(athleteOverrides[a.id] || {}), meta: getAdminAthleteMeta(a.id) }))
  }, [athleteOverrides, deletedAthleteIds])

  const getAthlete = (id) => athletes.find((a) => a.id === id)

  const updateAthlete = (id, patch) => {
    setAthleteOverrides((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }))
    // Athlete id '1' is the one live demo account — keep its public-facing profile in sync.
    if (id === '1') {
      try {
        const stored = localStorage.getItem('vr_athlete_profile')
        const current = stored ? JSON.parse(stored) : {}
        localStorage.setItem('vr_athlete_profile', JSON.stringify({ ...current, ...patch }))
      } catch {
        // ignore storage errors
      }
    }
  }

  const deleteAthlete = (id) => setDeletedAthleteIds((prev) => [...new Set([...prev, id])])

  const addAthleteNote = (id, text) => {
    const note = { text, date: new Date().toISOString() }
    setAthleteNotes((prev) => ({ ...prev, [id]: [...(prev[id] || []), note] }))
  }

  // ---- Coaches ----
  const coaches = useMemo(() => {
    return mockCoaches
      .filter((c) => !deletedCoachIds.includes(c.id))
      .map((c) => ({ ...c, ...(coachOverrides[c.id] || {}) }))
  }, [coachOverrides, deletedCoachIds])

  const updateCoach = (id, patch) => setCoachOverrides((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }))
  const deleteCoach = (id) => setDeletedCoachIds((prev) => [...new Set([...prev, id])])

  // ---- Universities ----
  const universities = useMemo(() => {
    const base = [
      ...prColleges.map((c) => ({ ...c, region: 'PR', active: true })),
      ...usColleges.map((c) => ({ ...c, region: 'US', active: true })),
      ...addedUniversities,
    ]
    return base
      .filter((u) => !deletedUniversityIds.includes(u.id))
      .map((u) => ({ ...u, ...(universityOverrides[u.id] || {}) }))
  }, [addedUniversities, universityOverrides, deletedUniversityIds])

  const addUniversity = (data) => {
    const id = data.id || `custom-${Date.now()}`
    setAddedUniversities((prev) => [...prev, { ...data, id, active: true }])
  }
  const updateUniversity = (id, patch) =>
    setUniversityOverrides((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }))
  const deleteUniversity = (id) => setDeletedUniversityIds((prev) => [...new Set([...prev, id])])
  const toggleUniversityActive = (id) => {
    const current = universities.find((u) => u.id === id)
    updateUniversity(id, { active: !(current?.active ?? true) })
  }

  // ---- Conversations ----
  const conversations = useMemo(
    () => adminConversations.map((c) => ({ ...c, flagged: conversationFlags[c.id] ?? c.flagged })),
    [conversationFlags]
  )
  const toggleFlagConversation = (id) =>
    setConversationFlags((prev) => ({ ...prev, [id]: !(prev[id] ?? conversations.find((c) => c.id === id)?.flagged) }))

  // ---- Settings ----
  const updatePlatformSettings = (patch) => setPlatformSettings((prev) => ({ ...prev, ...patch }))
  const updateRecruitingCoachSettings = (patch) => setRecruitingCoachSettings((prev) => ({ ...prev, ...patch }))

  return (
    <AdminDataContext.Provider
      value={{
        athletes,
        getAthlete,
        updateAthlete,
        deleteAthlete,
        athleteNotes,
        addAthleteNote,
        coaches,
        updateCoach,
        deleteCoach,
        universities,
        addUniversity,
        updateUniversity,
        deleteUniversity,
        toggleUniversityActive,
        conversations,
        toggleFlagConversation,
        platformSettings,
        updatePlatformSettings,
        recruitingCoachSettings,
        updateRecruitingCoachSettings,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  )
}

export const useAdminData = () => useContext(AdminDataContext)
