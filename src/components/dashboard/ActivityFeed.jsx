import { Activity } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import { activityFeed } from '../../data/mockUser'

export default function ActivityFeed() {
  return (
    <GlassCard className="p-6">
      <h3 className="font-heading font-bold text-ink mb-4">Actividad Reciente</h3>
      <ul className="space-y-4">
        {activityFeed.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 text-electric" />
            </span>
            <div>
              <p className="text-sm text-ink">{item.text}</p>
              <p className="text-xs text-ink-soft/70">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}
