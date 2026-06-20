import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Send, Search } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import { useToast } from '../../components/ui/Toast'
import { coachThreads } from '../../data/mockMessages'

function withOpenedThread(threads, athleteName) {
  if (!athleteName) return threads
  const existing = threads.find((t) => t.from === athleteName)
  if (existing) return threads
  return [
    { id: Date.now(), from: athleteName, school: '', online: false, unread: false, messages: [] },
    ...threads,
  ]
}

export default function CoachMessages() {
  const location = useLocation()
  const openWith = location.state?.openWith
  const [conversations, setConversations] = useState(() => withOpenedThread(coachThreads, openWith))
  const [active, setActive] = useState(() => {
    if (openWith) return conversations.find((t) => t.from === openWith) || conversations[0]
    return conversations[0]
  })
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const toast = useToast()

  const filteredThreads = useMemo(
    () =>
      conversations.filter(
        (t) => t.from.toLowerCase().includes(query.toLowerCase()) || t.school.toLowerCase().includes(query.toLowerCase())
      ),
    [conversations, query]
  )

  const activeThread = conversations.find((t) => t.id === active.id) || active

  const handleSend = () => {
    if (!draft.trim()) return
    setConversations((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? { ...t, messages: [...t.messages, { from: 'me', text: draft, time: 'Ahora' }] }
          : t
      )
    )
    toast?.showToast('Mensaje enviado.')
    setDraft('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-heading font-extrabold text-ink mb-8">Mensajes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <GlassCard className="p-3">
          <div className="relative mb-2 px-1 pt-1">
            <Search className="w-4 h-4 text-ink-soft absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar conversación..."
              className="w-full pl-9 pr-3 py-2 rounded-pill border border-ink/10 bg-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-electric/30"
            />
          </div>
          {filteredThreads.map((t) => {
            const lastMessage = t.messages[t.messages.length - 1]
            return (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className={`w-full text-left p-3 rounded-2xl mb-1 transition-colors flex gap-3 ${active.id === t.id ? 'bg-electric/10' : 'hover:bg-ink/5'}`}
              >
                <span className="relative shrink-0">
                  <span className="w-10 h-10 rounded-full bg-electric flex items-center justify-center text-white font-semibold text-xs">
                    {t.from.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </span>
                  {t.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-status-committed border-2 border-white" />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink text-sm truncate">{t.from}</p>
                  <p className="text-xs text-ink-soft">{t.school}</p>
                  <p className="text-xs text-ink-soft truncate mt-1">{lastMessage?.text || 'Inicia la conversación...'}</p>
                </div>
              </button>
            )
          })}
        </GlassCard>

        <GlassCard className="p-6 flex flex-col h-[520px]">
          <div className="border-b border-ink/10 pb-3 mb-4 flex items-center gap-3">
            <span className="relative shrink-0">
              <span className="w-10 h-10 rounded-full bg-electric flex items-center justify-center text-white font-semibold text-xs">
                {activeThread.from.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </span>
              {activeThread.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-status-committed border-2 border-white" />}
            </span>
            <div>
              <p className="font-bold text-ink">{activeThread.from}</p>
              <p className="text-xs text-ink-soft">{activeThread.school}{activeThread.online ? ' · En línea' : ''}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-3">
            {activeThread.messages.length === 0 && (
              <p className="text-sm text-ink-soft/70 text-center mt-10">Aún no hay mensajes. Envía el primero.</p>
            )}
            {activeThread.messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.from === 'me' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm max-w-md ${
                    msg.from === 'me' ? 'bg-electric text-white' : 'bg-slate-100 text-ink'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[11px] text-ink-soft/60 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 rounded-pill border border-ink/10 bg-white/60 pl-4 pr-1.5 py-1.5">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-electric hover:bg-electric-light text-white flex items-center justify-center shrink-0 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
