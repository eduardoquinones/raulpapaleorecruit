import { Link } from 'react-router-dom'
import { MapPin, GraduationCap } from 'lucide-react'
import GlassCard from './ui/GlassCard'
import Badge from './ui/Badge'
import Button from './ui/Button'

export default function AthleteCard({ athlete, linkBase = '/athlete/profile' }) {
  return (
    <GlassCard hover className="overflow-hidden flex flex-col">
      <div className="h-28 bg-gradient-to-br from-deep to-electric-dark relative">
        <div className="absolute -bottom-8 left-5 w-16 h-16 rounded-full bg-white/80 border-4 border-white overflow-hidden flex items-center justify-center text-ink font-bold text-lg">
          {athlete.photo ? (
            <img src={athlete.photo} alt={athlete.name} className="w-full h-full object-cover" />
          ) : (
            athlete.name.split(' ').map((n) => n[0]).slice(0, 2).join('')
          )}
        </div>
        <Badge variant="gold" className="absolute top-3 right-3">{athlete.gradYear}</Badge>
      </div>
      <div className="pt-11 px-5 pb-5 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-ink text-lg">{athlete.name}</h3>
        <p className="text-sm text-electric font-medium">{athlete.positions?.join(' / ')}</p>
        <div className="flex items-center gap-1 text-xs text-ink-soft mt-1">
          <MapPin className="w-3.5 h-3.5" />
          {athlete.school}, {athlete.city}
        </div>
        <div className="flex items-center gap-1 text-xs text-ink-soft mt-0.5">
          <GraduationCap className="w-3.5 h-3.5" />
          GPA {athlete.gpa}
        </div>

        <div className="grid grid-cols-3 gap-2 my-4 text-center">
          <div className="bg-white/50 rounded-xl py-2 border border-white/40">
            <div className="font-bold text-ink text-sm">{athlete.stats.killsPerSet}</div>
            <div className="text-[10px] text-ink-soft">Kills/set</div>
          </div>
          <div className="bg-white/50 rounded-xl py-2 border border-white/40">
            <div className="font-bold text-ink text-sm">{athlete.stats.digsPerSet}</div>
            <div className="text-[10px] text-ink-soft">Digs/set</div>
          </div>
          <div className="bg-white/50 rounded-xl py-2 border border-white/40">
            <div className="font-bold text-ink text-sm">{athlete.stats.acesPerSet}</div>
            <div className="text-[10px] text-ink-soft">Aces/set</div>
          </div>
        </div>

        <Button as={Link} to={`${linkBase}/${athlete.id}`} variant="primary" size="sm" className="mt-auto w-full">
          Ver Perfil
        </Button>
      </div>
    </GlassCard>
  )
}
