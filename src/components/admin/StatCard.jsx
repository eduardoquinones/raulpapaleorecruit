export default function StatCard({ label, value, icon: Icon, accent = '#2B5CE6', suffix = '' }) {
  return (
    <div className="bg-white rounded-2xl border border-ink/10 p-5 flex items-center gap-4 shadow-sm">
      <span
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}1A`, color: accent }}
      >
        {Icon && <Icon className="w-5 h-5" />}
      </span>
      <div className="min-w-0">
        <div className="text-2xl font-extrabold text-ink truncate">
          {value}
          {suffix}
        </div>
        <div className="text-xs text-ink-soft mt-0.5">{label}</div>
      </div>
    </div>
  )
}
