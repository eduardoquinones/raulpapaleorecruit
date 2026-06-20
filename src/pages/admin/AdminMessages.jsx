import { useMemo, useState } from 'react'
import { Search, Flag, Lock } from 'lucide-react'
import { useAdminData } from '../../context/AdminDataContext'
import { useToast } from '../../components/ui/Toast'

export default function AdminMessages() {
  const { conversations, toggleFlagConversation } = useAdminData()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)
  const toast = useToast()

  const filtered = useMemo(() => {
    if (!query.trim()) return conversations
    const q = query.toLowerCase()
    return conversations.filter((c) => c.athleteName.toLowerCase().includes(q) || c.coachName.toLowerCase().includes(q))
  }, [conversations, query])

  const activeConversation = conversations.find((c) => c.id === active?.id) || filtered[0] || null

  const handleFlag = (conv) => {
    toggleFlagConversation(conv.id)
    toast?.showToast(conv.flagged ? 'Conversación desmarcada.' : 'Conversación marcada como sospechosa.')
  }

  return (
    <div className="px-6 sm:px-8 py-8 max-w-[1300px]">
      <h1 className="text-2xl font-heading font-extrabold text-ink mb-1">Mensajes de la Plataforma</h1>
      <p className="text-ink-soft mb-6 flex items-center gap-1.5">
        <Lock className="w-3.5 h-3.5" /> Vista de solo lectura — no se pueden editar ni eliminar mensajes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
        <div className="bg-white rounded-2xl border border-ink/10 p-3">
          <div className="relative mb-2 px-1 pt-1">
            <Search className="w-4 h-4 text-ink-soft absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por participante..."
              className="w-full pl-9 pr-3 py-2 rounded-pill border border-ink/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric/30"
            />
          </div>
          <div className="flex flex-col gap-1 max-h-[600px] overflow-y-auto scrollbar-thin">
            {filtered.map((c) => {
              const lastMessage = c.messages[c.messages.length - 1]
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c)}
                  className={`w-full text-left p-3 rounded-2xl transition-colors ${
                    activeConversation?.id === c.id ? 'bg-electric/10' : 'hover:bg-ink/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-ink text-sm truncate">{c.athleteName} &harr; {c.coachName.replace('Coach ', '')}</p>
                    {c.flagged && <Flag className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-ink-soft">{c.university}</p>
                  <p className="text-xs text-ink-soft truncate mt-1">{lastMessage?.text}</p>
                </button>
              )
            })}
            {filtered.length === 0 && <p className="text-sm text-ink-soft text-center py-8">Sin conversaciones encontradas.</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-ink/10 p-6 flex flex-col h-[560px]">
          {activeConversation ? (
            <>
              <div className="border-b border-ink/10 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-ink">{activeConversation.athleteName} &harr; {activeConversation.coachName}</p>
                  <p className="text-xs text-ink-soft">{activeConversation.university}</p>
                </div>
                <button
                  onClick={() => handleFlag(activeConversation)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-pill border transition-colors ${
                    activeConversation.flagged
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white text-ink-soft border-ink/10 hover:border-red-200 hover:text-red-500'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${activeConversation.flagged ? 'fill-red-500' : ''}`} />
                  {activeConversation.flagged ? 'Marcada como sospechosa' : 'Marcar como sospechosa'}
                </button>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-3">
                {activeConversation.messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.from === 'athlete' ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm max-w-md ${m.from === 'athlete' ? 'bg-electric text-white' : 'bg-slate-100 text-ink'}`}>
                      {m.text}
                    </div>
                    <span className="text-[11px] text-ink-soft/60 mt-1">{m.time}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-ink-soft text-center my-auto">Selecciona una conversación para verla.</p>
          )}
        </div>
      </div>
    </div>
  )
}
