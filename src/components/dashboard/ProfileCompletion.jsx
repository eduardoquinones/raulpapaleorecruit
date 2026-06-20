import { useEffect, useState } from 'react'
import { CheckCircle2, PlusCircle } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import { useAthleteData } from '../../context/AthleteDataContext'

export default function ProfileCompletion() {
  const { checklist } = useAthleteData()
  const pct = Math.round((checklist.filter((i) => i.done).length / checklist.length) * 100)
  const [animatedWidth, setAnimatedWidth] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimatedWidth(pct))
    return () => cancelAnimationFrame(id)
  }, [pct])

  return (
    <GlassCard className="p-6">
      <h3 className="font-heading font-bold text-ink mb-3">Completa tu Perfil</h3>

      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-ink-soft">Progreso</span>
        <span className="font-bold text-emerald-600">{pct}%</span>
      </div>
      <div className="w-full h-2.5 rounded-pill bg-ink/10 overflow-hidden mb-4">
        <div
          className="h-full rounded-pill bg-emerald-500 transition-[width] duration-1000 ease-out"
          style={{ width: `${animatedWidth}%` }}
        />
      </div>

      <ul className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin pr-1">
        {checklist.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-sm">
            {item.done ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <PlusCircle className="w-4 h-4 text-gold shrink-0" />
            )}
            <span className={item.done ? 'text-ink-soft' : 'text-ink font-medium'}>{item.label}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}
