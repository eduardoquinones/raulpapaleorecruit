import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Pencil, Mail, ExternalLink, Star } from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import AthleteEditModal from '../../components/admin/AthleteEditModal'
import { useAdminData } from '../../context/AdminDataContext'
import { useToast } from '../../components/ui/Toast'
import { getPRCollegeById } from '../../data/prColleges'
import { getUSCollegeById } from '../../data/usColleges'
import { adminConversations } from '../../data/adminConversations'

function lookupCollegeName(id) {
  return getPRCollegeById(id)?.name || getUSCollegeById(id)?.name || id
}

export default function AdminAthleteDetail() {
  const { id } = useParams()
  const { getAthlete, updateAthlete, athleteNotes, addAthleteNote } = useAdminData()
  const athlete = getAthlete(id)
  const [editOpen, setEditOpen] = useState(false)
  const [noteDraft, setNoteDraft] = useState('')
  const toast = useToast()

  const conversations = useMemo(
    () => adminConversations.filter((c) => c.athleteName === athlete?.name),
    [athlete]
  )

  if (!athlete) {
    return (
      <div className="px-8 py-10">
        <p className="text-ink-soft">Atleta no encontrado.</p>
        <Link to="/admin/athletes" className="text-electric hover:underline">Volver a Atletas</Link>
      </div>
    )
  }

  const notes = athleteNotes[id] || []

  const handleAddNote = () => {
    if (!noteDraft.trim()) return
    addAthleteNote(id, noteDraft.trim())
    setNoteDraft('')
    toast?.showToast('Nota añadida.')
  }

  const handleContact = () => {
    toast?.showToast(`Mensaje enviado a ${athlete.name} (${athlete.email || 'sin correo registrado'}).`)
  }

  return (
    <div className="px-6 sm:px-8 py-8 max-w-5xl">
      <Link to="/admin/athletes" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-electric mb-4">
        <ArrowLeft className="w-4 h-4" /> Volver a Atletas
      </Link>

      <div className="bg-white rounded-2xl border border-ink/10 p-6 mb-6 flex flex-wrap items-center gap-5">
        <span className="w-20 h-20 rounded-full bg-electric flex items-center justify-center text-white font-bold text-2xl overflow-hidden shrink-0">
          {athlete.photo ? <img src={athlete.photo} alt={athlete.name} className="w-full h-full object-cover" /> : athlete.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </span>
        <div className="flex-1 min-w-[200px]">
          <h1 className="text-2xl font-heading font-extrabold text-ink">{athlete.name}</h1>
          <p className="text-ink-soft">{athlete.positions.join(' / ')} &middot; Clase {athlete.gradYear} &middot; {athlete.school}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <Badge variant="blue">GPA {athlete.gpa}</Badge>
            <Badge variant="ink">{athlete.height}</Badge>
            <Badge variant="green">{athlete.meta.completionPct}% completo</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <Button variant="primary" onClick={() => setEditOpen(true)}>
            <Pencil className="w-4 h-4" /> Editar Cualquier Campo
          </Button>
          <Button variant="outlineInk" onClick={handleContact}>
            <Mail className="w-4 h-4" /> Contactar Atleta
          </Button>
          <a href={`/athlete/profile/${athlete.id}`} target="_blank" rel="noreferrer" className="text-xs text-electric hover:underline text-center flex items-center justify-center gap-1">
            <ExternalLink className="w-3 h-3" /> Ver perfil público
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Section title="Información Personal">
            <Row label="Escuela" value={athlete.school} />
            <Row label="Ciudad" value={athlete.city} />
            <Row label="Equipo Club" value={athlete.club} />
            <Row label="Número de camiseta" value={athlete.jerseyNumber} />
          </Section>

          <Section title="Información Académica">
            <Row label="GPA" value={athlete.gpa} />
            <Row label="Rango de clase" value={athlete.classRank} />
            <Row label="SAT/ACT" value={athlete.satAct || 'No registrado'} />
            <Row label="Año de graduación" value={athlete.gradYear} />
            {athlete.honors?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {athlete.honors.map((h) => <Badge key={h} variant="gold">{h}</Badge>)}
              </div>
            )}
          </Section>

          <Section title="Estadísticas de Voleibol">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(athlete.stats).map(([key, value]) => (
                <div key={key} className="bg-slate-50 rounded-xl p-3 text-center">
                  <div className="font-bold text-electric">{key.endsWith('Pct') ? `${Math.round(value * 100)}%` : value}</div>
                  <div className="text-[11px] text-ink-soft">{key}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Sobre Mí">
            <p className="text-sm text-ink-soft leading-relaxed">{athlete.about || 'Sin descripción.'}</p>
          </Section>

          {athlete.videos?.length > 0 ? (
            <Section title="Video Destacado">
              <div className="aspect-video rounded-xl overflow-hidden bg-ink/5">
                <iframe className="w-full h-full" src={athlete.videos[0].url} title={athlete.videos[0].title} allowFullScreen />
              </div>
            </Section>
          ) : (
            <Section title="Video Destacado">
              <p className="text-sm text-ink-soft">Este atleta no ha subido ningún video.</p>
            </Section>
          )}

          <Section title="Referencias de Entrenadores">
            {athlete.references?.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {athlete.references.map((ref) => (
                  <div key={ref.name} className="bg-slate-50 rounded-xl p-3">
                    <p className="font-semibold text-ink text-sm">{ref.name}</p>
                    <p className="text-xs text-ink-soft">{ref.school}</p>
                    <p className="text-xs text-electric">{ref.email}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-soft">Sin referencias registradas.</p>
            )}
          </Section>

          <Section title="Preferencias de Reclutamiento">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {athlete.preferences.divisions.map((d) => <Badge key={d} variant="blue">{d}</Badge>)}
            </div>
            <Row label="Ubicación" value={athlete.preferences.location} />
            <Row label="Carrera" value={athlete.preferences.major} />
            <Row label="Distancia de casa" value={athlete.preferences.distance} />
          </Section>

          <Section title="Mensajes (solo lectura)">
            {conversations.length === 0 ? (
              <p className="text-sm text-ink-soft">Este atleta no tiene conversaciones registradas.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {conversations.map((c) => (
                  <div key={c.id} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs font-semibold text-ink-soft mb-2">{c.coachName} &middot; {c.university}</p>
                    <div className="flex flex-col gap-1.5">
                      {c.messages.map((m, i) => (
                        <p key={i} className={`text-xs ${m.from === 'athlete' ? 'text-electric' : 'text-ink-soft'}`}>
                          <span className="font-semibold">{m.from === 'athlete' ? athlete.name.split(' ')[0] : c.coachName.replace('Coach ', '')}:</span> {m.text}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        <div className="flex flex-col gap-6">
          <Section title="Universidades">
            <p className="text-xs font-semibold text-ink-soft mb-1.5">Vistas por</p>
            {athlete.meta.viewedBy.length === 0 ? (
              <p className="text-sm text-ink-soft mb-3">Ninguna universidad ha visto este perfil aún.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {athlete.meta.viewedBy.map((cid) => <Badge key={cid} variant="ink">{lookupCollegeName(cid)}</Badge>)}
              </div>
            )}
            <p className="text-xs text-ink-soft flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-gold" /> {athlete.meta.savedUniversitiesCount} universidades guardadas por el atleta
            </p>
          </Section>

          <Section title="Registro de Actividad">
            <Row label="Fecha de registro" value={athlete.meta.registeredAt} />
            <Row label="Última actividad" value={athlete.meta.lastActive} />
            <Row label="Perfil completado" value={`${athlete.meta.completionPct}%`} />
          </Section>

          <Section title="Notas Privadas del Administrador">
            <div className="flex flex-col gap-2 mb-3 max-h-48 overflow-y-auto scrollbar-thin">
              {notes.length === 0 ? (
                <p className="text-xs text-ink-soft">No hay notas aún.</p>
              ) : (
                notes.map((n, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                    <p className="text-xs text-ink">{n.text}</p>
                    <p className="text-[10px] text-ink-soft mt-1">{new Date(n.date).toLocaleString('es-PR')}</p>
                  </div>
                ))
              )}
            </div>
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Añadir una nota privada sobre este atleta..."
              className="w-full px-3 py-2 rounded-xl border border-ink/10 text-sm min-h-20 resize-none focus:outline-none focus:ring-2 focus:ring-electric/30"
            />
            <Button variant="outlineInk" size="sm" className="w-full mt-2" onClick={handleAddNote}>Añadir Nota</Button>
          </Section>
        </div>
      </div>

      <AthleteEditModal athlete={editOpen ? athlete : null} onClose={() => setEditOpen(false)} onSave={(patch) => updateAthlete(id, patch)} />
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-ink/10 p-5">
      <h2 className="font-heading font-bold text-ink mb-3">{title}</h2>
      {children}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-ink-soft">{label}</span>
      <span className="font-semibold text-ink text-right">{value}</span>
    </div>
  )
}
