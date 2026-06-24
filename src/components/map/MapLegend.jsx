export default function MapLegend({ items }) {
  return (
    <div className="flex items-center gap-2 mt-4 text-xs text-ink-soft flex-wrap">
      {items.map(({ color, label }) => (
        <span key={label} className="flex items-center gap-1.5 bg-ink/5 rounded-pill px-2.5 py-1">
          <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: color }} />
          {label}
        </span>
      ))}
    </div>
  )
}
