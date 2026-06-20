import { useRef } from 'react'
import { Mail, Star, Camera } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import GlassCard from '../ui/GlassCard'

export default function ProfileHero({ athlete, isOwnProfile = false, onUploadPhoto, onContact, onSave }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file || !onUploadPhoto) return
    const reader = new FileReader()
    reader.onload = () => onUploadPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <section className="px-4 pt-4">
      <GlassCard dark className="max-w-6xl mx-auto net-pattern overflow-hidden">
        <div className="bg-gradient-to-br from-deep via-deep to-electric-dark/60 rounded-card">
          <div className="px-6 sm:px-10 py-12 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative shrink-0">
              {isOwnProfile && (
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              )}
              <button
                type="button"
                onClick={() => isOwnProfile && fileInputRef.current?.click()}
                className="w-32 h-32 rounded-full overflow-hidden bg-electric flex items-center justify-center text-white font-bold text-4xl border-4 border-white/20"
              >
                {athlete.photo ? (
                  <img src={athlete.photo} alt={athlete.name} className="w-full h-full object-cover" />
                ) : (
                  athlete.name.split(' ').map((n) => n[0]).slice(0, 2).join('')
                )}
              </button>
              {isOwnProfile && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-gold flex items-center justify-center text-deep border-2 border-white"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">{athlete.name}</h1>
              <p className="text-gold font-semibold mt-1">
                {athlete.positions?.join(' / ')} &middot; Clase {athlete.gradYear}
              </p>
              <div className="flex items-center gap-1 text-slate-300 text-sm mt-1 justify-center sm:justify-start">
                {athlete.school}, {athlete.city} 🇵🇷
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                <Badge variant="white">Altura {athlete.height}</Badge>
                <Badge variant="white">Peso {athlete.weight}</Badge>
                <Badge variant="white">GPA {athlete.gpa}</Badge>
                <Badge variant="white">Attack {Math.round(athlete.stats.attackPct * 100)}%</Badge>
                <Badge variant="white">{athlete.club}</Badge>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              {isOwnProfile ? (
                <Button variant="gold" onClick={onSave}>Editar Perfil</Button>
              ) : (
                <>
                  <Button variant="gold" onClick={onContact}>
                    <Mail className="w-4 h-4" /> Contactar Atleta
                  </Button>
                  <Button variant="outline" onClick={onSave}>
                    <Star className="w-4 h-4" /> Guardar Perfil
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  )
}
