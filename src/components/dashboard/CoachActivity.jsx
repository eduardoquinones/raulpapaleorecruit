import { ArrowUp, ArrowDown } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import { coachActivityStats } from '../../data/mockUser'

export default function CoachActivity() {
  return (
    <GlassCard className="p-6">
      <h3 className="font-heading font-bold text-ink mb-5">Actividad de Entrenadores</h3>
      <div className="grid grid-cols-3 gap-3">
        {coachActivityStats.map((stat) => {
          const positive = stat.trendPct >= 0
          return (
            <div key={stat.label} className="text-center">
              <div className="text-[40px] sm:text-[48px] leading-none font-extrabold text-electric">{stat.value}</div>
              <div className="text-xs text-ink-soft mt-1">{stat.label}</div>
              <div className={`flex items-center justify-center gap-0.5 text-[11px] font-semibold mt-1 ${positive ? 'text-status-committed' : 'text-status-contacted'}`}>
                {positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(stat.trendPct)}% esta semana
              </div>
              <div className="flex items-end justify-center gap-0.5 h-8 mt-2">
                {stat.bars.map((bar, i) => (
                  <div key={i} className="w-1.5 rounded-sm bg-electric/30" style={{ height: `${bar}%` }} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
