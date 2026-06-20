import GlassCard from '../ui/GlassCard'

export default function VideoSection({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <GlassCard className="p-6">
        <h2 className="font-heading font-bold text-ink text-lg mb-3">Videos Destacados</h2>
        <p className="text-sm text-ink-soft">Aún no se han añadido videos.</p>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-6">
      <h2 className="font-heading font-bold text-ink text-lg mb-4">Videos Destacados</h2>
      <div className="flex flex-col gap-6">
        {videos.map((video, i) => (
          <div key={i}>
            <div className="aspect-video rounded-2xl overflow-hidden bg-ink/5">
              <iframe className="w-full h-full" src={video.url} title={video.title} allowFullScreen />
            </div>
            <p className="font-semibold text-ink mt-3">{video.title}</p>
            <p className="text-xs text-ink-soft/70">Publicado: {video.date}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
