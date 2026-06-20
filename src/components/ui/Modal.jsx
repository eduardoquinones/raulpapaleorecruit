import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, variant = 'slideover', maxWidth = 'max-w-2xl' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  if (variant === 'slideover') {
    return (
      <div className="fixed inset-0 z-[90]">
        <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-full sm:w-[480px] md:w-[560px] glass shadow-glass-lg animate-slide-in-right overflow-y-auto scrollbar-thin">
          <div className="sticky top-0 glass z-10 flex items-center justify-between px-6 py-5 border-b border-white/30">
            <h2 className="font-heading font-bold text-lg text-ink">{title}</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-ink/5 text-ink/60 hover:text-ink">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} glass shadow-glass-lg rounded-card animate-scale-in max-h-[90vh] overflow-y-auto scrollbar-thin`}>
        <div className="sticky top-0 glass z-10 flex items-center justify-between px-6 py-5 border-b border-white/30 rounded-t-card">
          <h2 className="font-heading font-bold text-lg text-ink">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-ink/5 text-ink/60 hover:text-ink">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
