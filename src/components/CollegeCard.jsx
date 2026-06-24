import { MapPin, Users } from 'lucide-react'
import GlassCard from './ui/GlassCard'
import Badge from './ui/Badge'
import Button from './ui/Button'
import CollegeLogo from './CollegeLogo'

export default function CollegeCard({ college, onViewMore }) {
  return (
    <GlassCard hover className="p-5 flex flex-col items-center text-center h-full">
      <CollegeLogo college={college} size={64} className="mb-3" />
      <h3 className="font-heading font-bold text-ink">{college.name}</h3>
      <div className="flex items-center gap-1 text-xs text-ink-soft mt-1">
        <MapPin className="w-3.5 h-3.5" />
        {college.city}{college.state ? `, ${college.state}` : ''}
      </div>
      <div className="flex gap-2 mt-3">
        <Badge variant={college.region === 'US' ? 'blue' : 'gold'}>{college.division}</Badge>
      </div>
      <div className="flex items-center gap-1 text-xs text-ink-soft mt-3">
        <Users className="w-3.5 h-3.5" />
        {college.rosterSpots} cupos disponibles
      </div>
      {onViewMore && (
        <Button variant="outlineInk" size="sm" className="w-full mt-4" onClick={() => onViewMore(college)}>
          Ver más
        </Button>
      )}
    </GlassCard>
  )
}
