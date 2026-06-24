import { MapPin, Users, GraduationCap, Star } from 'lucide-react'
import Modal from './ui/Modal'
import Badge from './ui/Badge'
import Button from './ui/Button'
import CollegeLogo from './CollegeLogo'

export default function CollegeDetailModal({ college, onClose, favorited, onToggleFavorite }) {
  if (!college) return null

  return (
    <Modal open={!!college} onClose={onClose} title="Detalles de la Universidad" variant="modal" maxWidth="max-w-lg">
      <div className="flex items-center gap-4 mb-5">
        <CollegeLogo college={college} size={64} />
        <div>
          <h3 className="font-heading font-bold text-ink text-lg">{college.name}</h3>
          <p className="text-sm text-ink-soft flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {college.city}{college.state ? `, ${college.state}` : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <Badge variant={college.region === 'US' ? 'blue' : 'gold'}>{college.division}</Badge>
        {college.program && <Badge variant="ink">Programa: {college.program}</Badge>}
        {college.scholarships && <Badge variant="green">Becas disponibles</Badge>}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white/50 rounded-2xl p-4 border border-white/40">
          <p className="text-xs text-ink-soft flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Cupos disponibles</p>
          <p className="font-semibold text-ink mt-1">{college.rosterSpots}</p>
        </div>
        <div className="bg-white/50 rounded-2xl p-4 border border-white/40">
          <p className="text-xs text-ink-soft flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" /> GPA requerido</p>
          <p className="font-semibold text-ink mt-1">{college.gpaRequirement ? college.gpaRequirement.toFixed(2) : 'No especificado'}</p>
        </div>
      </div>

      {college.enrollment && (
        <p className="text-sm text-ink-soft mb-5">
          Tamaño de matrícula: <span className="font-semibold text-ink">{college.enrollment}</span>
        </p>
      )}

      <p className="text-sm text-ink-soft mb-6">
        Programa de voleibol {college.region === 'PR' ? 'de la Liga Atlética Interuniversitaria' : 'de la NCAA/NAIA'}.
        Contacta a un entrenador de reclutamiento para más información sobre becas y oportunidades.
      </p>

      <div className="flex gap-3">
        <Button variant="outlineInk" className="flex-1" onClick={onClose}>Cerrar</Button>
        {onToggleFavorite && (
          <Button variant={favorited ? 'gold' : 'primary'} className="flex-1" onClick={() => onToggleFavorite(college)}>
            <Star className={`w-4 h-4 ${favorited ? 'fill-deep' : ''}`} />
            {favorited ? 'Guardada' : 'Guardar'}
          </Button>
        )}
      </div>
    </Modal>
  )
}
