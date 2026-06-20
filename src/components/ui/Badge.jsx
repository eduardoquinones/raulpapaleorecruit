const variants = {
  gold: 'bg-gold/15 text-gold-dark border border-gold/30',
  blue: 'bg-electric/10 text-electric border border-electric/25',
  ink: 'bg-ink/8 text-ink border border-ink/15',
  green: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  white: 'bg-white/20 text-white border border-white/30',
}

export default function Badge({ children, variant = 'ink', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-3 py-1 text-xs font-semibold whitespace-nowrap ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
