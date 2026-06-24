import { MapPin, Star, Users } from 'lucide-react'
import Modal from '../ui/Modal'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import CollegeLogo from '../CollegeLogo'

export default function CollegesPanel({ open, onClose, title, emptyMessage, colleges, favorites, onToggleFavorite, onViewMore }) {
  return (
    <Modal open={open} onClose={onClose} title={title} variant="slideover">
      {colleges.length === 0 ? (
        <div className="text-center text-ink-soft py-10">
          <MapPin className="w-8 h-8 mx-auto mb-3 text-ink-muted" />
          {emptyMessage}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-ink-soft mb-1">{colleges.length} universidad{colleges.length === 1 ? '' : 'es'} encontrada{colleges.length === 1 ? '' : 's'}</p>
          {colleges.map((c) => {
            const isFavorite = favorites?.includes(c.id)
            return (
              <div key={c.id} className="glass rounded-2xl p-4 flex items-center gap-3 shadow-glass transition-all duration-300 hover:shadow-glass-lg hover:-translate-y-0.5">
                <CollegeLogo college={c} size={48} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink truncate">{c.name}</p>
                  <p className="text-xs text-ink-soft flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {c.city}{c.state ? `, ${c.region === 'US' ? c.stateCode : c.state}` : ''}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge variant={c.region === 'US' ? 'blue' : 'gold'}>{c.division}</Badge>
                    <span className="text-[11px] text-ink-soft flex items-center gap-1"><Users className="w-3 h-3" /> {c.rosterSpots} cupos</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleFavorite?.(c)}
                    className="p-1.5 rounded-full hover:scale-110 transition-transform text-gold"
                    aria-label="Guardar universidad"
                  >
                    <Star className={`w-5 h-5 ${isFavorite ? 'fill-gold' : ''}`} />
                  </button>
                  <Button variant="outlineInk" size="sm" onClick={() => onViewMore?.(c)} className="!px-3 !py-1.5 text-xs whitespace-nowrap">
                    Ver más
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Modal>
  )
}
