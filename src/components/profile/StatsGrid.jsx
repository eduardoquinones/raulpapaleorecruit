import GlassCard from '../ui/GlassCard'

const statLabels = {
  killsPerSet: 'Kills/set',
  acesPerSet: 'Aces/set',
  digsPerSet: 'Digs/set',
  blocksPerSet: 'Blocks/set',
  attackPct: 'Attack %',
  servePct: 'Serve %',
  receptionPct: 'Reception %',
}

export default function StatsGrid({ stats, tournamentRecord }) {
  return (
    <GlassCard className="p-6">
      <h2 className="font-heading font-bold text-ink text-lg mb-4">Estadísticas de Voleibol</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white/50 rounded-2xl p-4 text-center border border-white/40">
            <div className="font-extrabold text-electric text-xl">
              {key.endsWith('Pct') ? `${Math.round(value * 100)}%` : value}
            </div>
            <div className="text-xs text-ink-soft mt-1">{statLabels[key]}</div>
          </div>
        ))}
      </div>
      {tournamentRecord && (
        <p className="text-sm text-ink-soft mt-4">
          Récord de torneos: <span className="font-semibold text-ink">{tournamentRecord}</span>
        </p>
      )}
    </GlassCard>
  )
}
