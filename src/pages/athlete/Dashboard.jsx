import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, ArrowRight } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import ProfileCard from '../../components/dashboard/ProfileCard'
import CoachActivity from '../../components/dashboard/CoachActivity'
import ProfileCompletion from '../../components/dashboard/ProfileCompletion'
import CollegeCard from '../../components/dashboard/CollegeCard'
import ActivityFeed from '../../components/dashboard/ActivityFeed'
import RecruitingCoach from '../../components/dashboard/RecruitingCoach'
import EditProfileModal from '../../components/profile/EditProfileModal'
import { recommendedColleges, resources } from '../../data/mockUser'
import { athleteThreads } from '../../data/mockMessages'

const TABS = ['Universidades', 'Actividad', 'Mensajes']

export default function AthleteDashboard() {
  const [tab, setTab] = useState('Universidades')
  const [editOpen, setEditOpen] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-6 lg:items-start">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6 order-1">
          <ProfileCard onEdit={() => setEditOpen(true)} />
          <CoachActivity />
          <ProfileCompletion />
        </div>

        {/* MIDDLE COLUMN */}
        <div className="flex flex-col gap-6 order-3 lg:order-2">
          <div className="flex gap-1.5 glass rounded-pill p-1.5 w-fit">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
                  tab === t ? 'bg-electric text-white' : 'text-ink-soft hover:bg-ink/5'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'Universidades' && (
            <div className="flex flex-col gap-4">
              {recommendedColleges.map((rec) => <CollegeCard key={rec.collegeId} recommendation={rec} />)}
            </div>
          )}

          {tab === 'Actividad' && <ActivityFeed />}

          {tab === 'Mensajes' && (
            <div className="flex flex-col gap-3">
              {athleteThreads.map((t) => {
                const lastMessage = t.messages[t.messages.length - 1]
                return (
                  <Link key={t.id} to="/athlete/messages" className="block">
                    <GlassCard hover className="p-4 flex items-center gap-3">
                      <span className="relative shrink-0">
                        <span className="w-10 h-10 rounded-full bg-electric flex items-center justify-center text-white font-semibold text-xs">
                          {t.from.replace('Coach ', '').split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </span>
                        {t.unread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ink text-sm truncate">{t.from}</p>
                        <p className="text-xs text-ink-soft truncate">{lastMessage?.text}</p>
                      </div>
                    </GlassCard>
                  </Link>
                )
              })}
              <Link to="/athlete/messages" className="text-electric text-sm font-semibold hover:underline flex items-center gap-1 justify-center mt-2">
                Ver bandeja completa <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6 order-2 lg:order-3 lg:mt-10">
          <RecruitingCoach />

          <GlassCard className="p-6">
            <h3 className="font-heading font-bold text-ink mb-4">Recursos de Reclutamiento</h3>
            <ul className="flex flex-col gap-3">
              {resources.map((r) => (
                <li key={r.title}>
                  <a href="#" className="flex items-center justify-between gap-2 group">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-electric shrink-0" />
                      <span className="text-sm text-ink group-hover:text-electric">{r.title}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-ink-soft/70 shrink-0">
                      {r.time}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  )
}
