import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { defaultUser, defaultProfileChecklist } from '../data/mockUser'

const AthleteDataContext = createContext(null)

export function AthleteDataProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('vr_athlete_profile', defaultUser)
  const [checklist, setChecklist] = useLocalStorage('vr_profile_checklist', defaultProfileChecklist)
  const [favorites, setFavorites] = useLocalStorage('vr_favorite_colleges', ['upr-rio-piedras', 'sagrado'])
  const [collegeStatus, setCollegeStatus] = useLocalStorage('vr_college_status', {})
  const [collegeNotes, setCollegeNotes] = useLocalStorage('vr_college_notes', {})

  const updateProfile = (patch) => {
    setProfile((prev) => ({ ...prev, ...patch }))
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.label === 'Foto de perfil' && patch.photo) return { ...item, done: true }
        return item
      })
    )
  }

  const toggleFavorite = (collegeId) => {
    setFavorites((prev) => (prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId]))
  }

  const setStatus = (collegeId, status) => {
    setCollegeStatus((prev) => ({ ...prev, [collegeId]: status }))
  }

  const setCollegeNote = (collegeId, note) => {
    setCollegeNotes((prev) => ({ ...prev, [collegeId]: note }))
  }

  return (
    <AthleteDataContext.Provider
      value={{ profile, updateProfile, checklist, favorites, toggleFavorite, collegeStatus, setStatus, collegeNotes, setCollegeNote }}
    >
      {children}
    </AthleteDataContext.Provider>
  )
}

export const useAthleteData = () => useContext(AthleteDataContext)
