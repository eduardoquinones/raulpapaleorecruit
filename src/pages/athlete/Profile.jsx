import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import ProfileHero from '../../components/profile/ProfileHero'
import StatsGrid from '../../components/profile/StatsGrid'
import VideoSection from '../../components/profile/VideoSection'
import EditProfileModal from '../../components/profile/EditProfileModal'
import { useAdminData } from '../../context/AdminDataContext'
import { useAthleteData } from '../../context/AthleteDataContext'
import { useAuth } from '../../context/AuthContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useToast } from '../../components/ui/Toast'

export default function AthleteProfile() {
  const { id } = useParams()
  const { user } = useAuth()
  const { profile, updateProfile } = useAthleteData()
  const { getAthlete } = useAdminData()
  const [coachSaved, setCoachSaved] = useLocalStorage('vr_coach_saved_athletes', [])
  const toast = useToast()
  const navigate = useNavigate()
  const [editOpen, setEditOpen] = useState(false)

  // The only athlete with a persisted, editable profile in this demo is id '1'.
  // Always show the latest saved edits for that id, regardless of who is viewing.
  // For every other id, reflect any admin overrides/deletion as the source of truth.
  const athlete = id === profile.id ? profile : getAthlete(id)
  const isOwnProfile = user?.role === 'athlete' && user.athleteId === id

  if (!athlete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-heading font-bold text-ink">Atleta no encontrado</h2>
        <Link to="/athletes" className="text-electric hover:underline">Volver a Atletas</Link>
      </div>
    )
  }

  const handleSaveProfile = () => {
    if (isOwnProfile) {
      setEditOpen(true)
      return
    }
    if (user?.role === 'coach') {
      const alreadySaved = coachSaved.includes(athlete.id)
      setCoachSaved((prev) => (alreadySaved ? prev.filter((x) => x !== athlete.id) : [...prev, athlete.id]))
      toast?.showToast(alreadySaved ? `${athlete.name} removido de tus prospectos.` : `${athlete.name} añadido a tus prospectos.`)
      return
    }
    toast?.showToast('Perfil guardado.')
  }

  return (
    <div className="pb-12">
      <ProfileHero
        athlete={athlete}
        isOwnProfile={isOwnProfile}
        onUploadPhoto={(photo) => updateProfile({ photo })}
        onContact={() => {
          toast?.showToast(`Mensaje enviado a ${athlete.name}.`)
          if (user?.role === 'coach') navigate('/coach/messages', { state: { openWith: athlete.name } })
        }}
        onSave={handleSaveProfile}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <StatsGrid stats={athlete.stats} tournamentRecord={athlete.tournamentRecord} />

          <GlassCard className="p-6">
            <h2 className="font-heading font-bold text-ink text-lg mb-3">Sobre Mí</h2>
            <p className="text-ink-soft leading-relaxed">{athlete.about}</p>
          </GlassCard>

          <VideoSection videos={athlete.videos} />

          <GlassCard className="p-6">
            <h2 className="font-heading font-bold text-ink text-lg mb-4">Referencias de Entrenadores</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {athlete.references.map((ref) => (
                <div key={ref.name} className="bg-white/50 rounded-2xl p-4 border border-white/40">
                  <p className="font-semibold text-ink">{ref.name}</p>
                  <p className="text-sm text-ink-soft">{ref.school}</p>
                  <p className="text-sm text-electric mt-1">{ref.email}</p>
                  <p className="text-sm text-ink-soft">{ref.phone}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="font-heading font-bold text-ink text-lg mb-3">Club y Escuela Secundaria</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/50 rounded-2xl p-4 border border-white/40">
                <p className="text-xs text-ink-soft">Equipo de Club</p>
                <p className="font-semibold text-ink">{athlete.club}</p>
              </div>
              <div className="bg-white/50 rounded-2xl p-4 border border-white/40">
                <p className="text-xs text-ink-soft">Escuela Secundaria</p>
                <p className="font-semibold text-ink">{athlete.school}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="flex flex-col gap-6">
          <GlassCard className="p-6">
            <h2 className="font-heading font-bold text-ink text-lg mb-3">Información Académica</h2>
            <ul className="text-sm text-ink-soft space-y-2">
              <li className="flex justify-between"><span>GPA</span><span className={`font-semibold ${athlete.gpa >= 3.5 ? 'text-emerald-600' : 'text-ink'}`}>{athlete.gpa}</span></li>
              <li className="flex justify-between"><span>Rango de clase</span><span className="font-semibold text-ink">{athlete.classRank}</span></li>
              <li className="flex justify-between"><span>SAT/ACT</span><span className="font-semibold text-ink">{athlete.satAct}</span></li>
              <li className="flex justify-between"><span>Año de graduación</span><span className="font-semibold text-ink">{athlete.gradYear}</span></li>
            </ul>
            {athlete.honors?.length > 0 && (
              <>
                <p className="text-xs font-semibold text-ink-soft mt-4 mb-1.5">Honores</p>
                <div className="flex flex-wrap gap-1.5">{athlete.honors.map((h) => <Badge key={h} variant="gold">{h}</Badge>)}</div>
              </>
            )}
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="font-heading font-bold text-ink text-lg mb-3">Preferencias de Reclutamiento</h2>
            <p className="text-xs font-semibold text-ink-soft mb-1.5">División preferida</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {athlete.preferences.divisions.map((d) => <Badge key={d} variant="blue">{d}</Badge>)}
            </div>
            <ul className="text-sm text-ink-soft space-y-2">
              <li className="flex justify-between"><span>Ubicación</span><span className="font-semibold text-ink text-right">{athlete.preferences.location}</span></li>
              <li className="flex justify-between"><span>Carrera</span><span className="font-semibold text-ink text-right">{athlete.preferences.major}</span></li>
              <li className="flex justify-between"><span>Distancia de casa</span><span className="font-semibold text-ink text-right">{athlete.preferences.distance}</span></li>
            </ul>
          </GlassCard>
        </div>
      </div>

      {isOwnProfile && <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />}
    </div>
  )
}
