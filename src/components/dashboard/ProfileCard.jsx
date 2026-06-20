import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Camera, MapPin, School } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { useAthleteData } from '../../context/AthleteDataContext'
import { useToast } from '../ui/Toast'

export default function ProfileCard({ onEdit }) {
  const { profile, updateProfile } = useAthleteData()
  const fileInputRef = useRef(null)
  const toast = useToast()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast?.showToast('Por favor selecciona un archivo de imagen.', 'error')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      updateProfile({ photo: reader.result })
      toast?.showToast('Foto de perfil actualizada.')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="rounded-card shadow-glass-dark p-7 flex flex-col items-center text-center bg-gradient-to-br from-deep via-deep to-electric-dark text-white min-h-[420px] justify-center">
      <div className="relative">
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-28 h-28 rounded-full overflow-hidden bg-electric flex items-center justify-center text-white font-bold text-3xl border-4 border-white/30 shadow-glass-lg"
        >
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('')
          )}
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-gold flex items-center justify-center text-deep border-2 border-white shadow-glass"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      <h2 className="font-heading font-bold text-xl mt-5">{profile.name}</h2>
      <p className="text-sm text-white/70 mt-0.5">{profile.sport} | {profile.gradYear}</p>
      <div className="flex flex-wrap gap-1.5 justify-center mt-3">
        {profile.positions.map((p) => <Badge key={p} variant="white">{p}</Badge>)}
      </div>

      <div className="flex flex-col gap-1 mt-4 text-sm text-white/70">
        <span className="flex items-center justify-center gap-1.5"><School className="w-3.5 h-3.5" /> {profile.school}</span>
        <span className="flex items-center justify-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {profile.city}</span>
      </div>

      <div className="flex flex-col gap-2.5 w-full mt-6">
        <Button as={Link} to={`/athlete/profile/${profile.id}`} variant="gold" className="w-full">
          Ver Perfil Público
        </Button>
        <Button variant="outline" className="w-full" onClick={onEdit}>
          Editar Perfil
        </Button>
      </div>
    </div>
  )
}
