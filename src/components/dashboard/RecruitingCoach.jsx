import { useState } from 'react'
import { Phone, Mail, MessageSquare, Medal } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import Button from '../ui/Button'
import { recruitingCoach } from '../../data/mockUser'
import { useToast } from '../ui/Toast'

const credentialBadges = [
  { emoji: '🏅', label: 'Olimpiadas Atenas 2004' },
  { emoji: '🏆', label: 'Campeón NORCECA' },
  { emoji: '⭐', label: 'AVP Rookie del Año 1996' },
]

export default function RecruitingCoach() {
  const [expanded, setExpanded] = useState(false)
  const toast = useToast()

  return (
    <GlassCard className="p-6 border-2 border-gold/30 shadow-glass-lg">
      <h3 className="font-heading font-bold text-gold mb-4 text-sm uppercase tracking-wide">
        Tu Coach de Reclutamiento
      </h3>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-16 h-16 rounded-full bg-deep flex items-center justify-center text-gold font-bold text-xl shrink-0 border-2 border-gold/40">
          RP
        </div>
        <div>
          <p className="font-bold text-ink">{recruitingCoach.name}</p>
          <p className="text-xs text-ink-soft">Ex-Olímpico &middot; Voleibol de Playa Profesional</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {credentialBadges.map((b) => (
          <span key={b.label} className="inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[11px] font-semibold bg-gold/10 text-gold-dark border border-gold/25">
            <span>{b.emoji}</span> {b.label}
          </span>
        ))}
      </div>

      <p className="text-sm text-ink-soft leading-relaxed">
        {expanded ? recruitingCoach.bio : `${recruitingCoach.bio.slice(0, 90)}...`}
      </p>
      <button onClick={() => setExpanded((e) => !e)} className="text-electric text-sm font-medium mt-1 hover:underline">
        {expanded ? 'Ver menos' : 'Ver más'}
      </button>

      {expanded && (
        <div className="mt-3 bg-ink/5 rounded-2xl p-3">
          <p className="text-xs font-semibold text-ink-soft mb-1.5 flex items-center gap-1.5">
            <Medal className="w-3.5 h-3.5 text-gold" /> Trayectoria
          </p>
          <ul className="text-xs text-ink-soft space-y-1 list-disc list-inside">
            {recruitingCoach.career.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      )}

      <Button
        variant="primary"
        className="w-full mt-4"
        onClick={() => toast?.showToast('Sesión agendada con Raul Papaleo. Te contactará pronto.')}
      >
        <MessageSquare className="w-4 h-4" />
        Agendar Sesión
      </Button>

      <p className="text-xs text-ink-soft/70 text-center mt-3 mb-2">Contactar directamente por texto o email</p>
      <div className="flex flex-col gap-1.5 text-sm">
        <a href={`tel:${recruitingCoach.phone}`} className="flex items-center gap-2 text-ink-soft hover:text-electric">
          <Phone className="w-4 h-4" /> {recruitingCoach.phone}
        </a>
        <a href={`mailto:${recruitingCoach.email}`} className="flex items-center gap-2 text-ink-soft hover:text-electric">
          <Mail className="w-4 h-4" /> {recruitingCoach.email}
        </a>
      </div>
    </GlassCard>
  )
}
