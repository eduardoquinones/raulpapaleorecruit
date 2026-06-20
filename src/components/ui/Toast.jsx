import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

const icons = {
  success: CheckCircle2,
  info: Info,
  error: AlertCircle,
}

const iconColors = {
  success: 'text-emerald-500',
  info: 'text-electric-light',
  error: 'text-red-400',
}

function ToastProviderImpl({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => {
          const Icon = icons[t.type] || Info
          return (
            <div
              key={t.id}
              className="animate-slide-up glass-dark text-white shadow-glass-lg rounded-2xl px-4 py-3 flex items-start gap-3"
            >
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColors[t.type] || iconColors.info}`} />
              <p className="text-sm flex-1">{t.message}</p>
              <button onClick={() => dismiss(t.id)} className="text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export { ToastProviderImpl as ToastProvider }
export const useToast = () => useContext(ToastContext)
