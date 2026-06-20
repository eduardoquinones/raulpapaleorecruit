export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass rounded-card p-5 animate-pulse ${className}`}>
      <div className="w-16 h-16 rounded-full bg-ink/10 mb-4" />
      <div className="h-4 bg-ink/10 rounded-pill w-3/4 mb-2" />
      <div className="h-3 bg-ink/10 rounded-pill w-1/2 mb-4" />
      <div className="h-3 bg-ink/10 rounded-pill w-full mb-1.5" />
      <div className="h-3 bg-ink/10 rounded-pill w-5/6" />
    </div>
  )
}

export function SkeletonGrid({ count = 6, className = '' }) {
  return (
    <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}
