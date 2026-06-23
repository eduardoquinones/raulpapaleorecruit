import { Link } from 'react-router-dom'
import { UserPlus, Handshake, Trophy, ArrowRight, GraduationCap, Megaphone, Users, School, Award, Star } from 'lucide-react'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import FadeUp from '../components/ui/FadeUp'
import AthleteCard from '../components/AthleteCard'
import CollegeCard from '../components/CollegeCard'
import { mockAthletes } from '../data/mockAthletes'
import { prColleges } from '../data/prColleges'
import { usColleges } from '../data/usColleges'

const stats = [
  { label: 'Atletas', value: '500+', icon: Users },
  { label: 'Universidades', value: '50+', icon: School },
  { label: 'Becas Otorgadas', value: '200+', icon: Award },
  { label: 'Puerto Rico', value: '#1', icon: Star },
]

const steps = [
  { icon: UserPlus, title: 'Crea tu perfil', desc: 'Con estadísticas, videos y logros que destacan tu talento.' },
  { icon: Handshake, title: 'Conecta con entrenadores', desc: 'Universitarios de Puerto Rico y Estados Unidos te buscan aquí.' },
  { icon: Trophy, title: 'Consigue tu beca', desc: 'Y juega voleibol a nivel universitario.' },
]

export default function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="relative pt-10 pb-20 px-4 overflow-hidden hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-electric/5 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Badge variant="blue" className="mb-5">Tu camino al voleibol universitario</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-ink leading-[1.05]">
              Tu Próximo Nivel <span className="bg-hero-gradient bg-clip-text text-transparent">Te Espera</span>
            </h1>
            <p className="mt-6 text-lg text-ink-soft max-w-lg">
              La plataforma #1 de reclutamiento de voleibol en Puerto Rico. Conecta con entrenadores de PR y Estados Unidos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button as={Link} to="/athlete/register" variant="gold" size="lg">
                Crear Perfil Gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button as={Link} to="/coach/register" variant="outlineInk" size="lg">
                Soy Entrenador
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-12 max-w-lg">
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="icon-tile bg-electric/10 mb-2">
                    <s.icon className="w-5 h-5 text-electric" />
                  </span>
                  <div className="text-xl sm:text-2xl font-heading font-extrabold text-electric">{s.value}</div>
                  <div className="text-xs text-ink-soft mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* mockup dashboard preview */}
          <div className="relative animate-float-in">
            <GlassCard premium className="p-6 rotate-1">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-electric flex items-center justify-center text-white font-bold text-sm">TR</span>
                  <div>
                    <p className="font-bold text-ink text-sm">Tomas Rivera</p>
                    <p className="text-xs text-ink-soft">Outside Hitter · 2026</p>
                  </div>
                </div>
                <Badge variant="gold">95%</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[['233', 'Búsquedas'], ['12', 'Vistas'], ['3', 'Seguimientos']].map(([v, l]) => (
                  <div key={l} className="bg-white/60 rounded-2xl p-3 text-center border border-white/40">
                    <div className="text-xl font-extrabold text-electric">{v}</div>
                    <div className="text-[10px] text-ink-soft">{l}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                {['UPR Río Piedras', 'Inter San Germán', 'Sagrado Corazón'].map((c) => (
                  <div key={c} className="flex items-center justify-between bg-white/50 rounded-xl px-3 py-2.5 border border-white/40">
                    <span className="text-sm text-ink font-medium">{c}</span>
                    <Badge variant="blue">Recomendado</Badge>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-4 absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 -rotate-2 w-56">
              <span className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center"><Trophy className="w-5 h-5 text-gold" /></span>
              <div>
                <p className="text-xs text-ink-soft">Nueva oferta</p>
                <p className="text-sm font-bold text-ink">UPR Mayagüez</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* PORTAL PICKER */}
      <section className="px-4 pb-16">
        <FadeUp className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          <GlassCard hover premium className="p-8 text-center">
            <div className="icon-tile mx-auto bg-electric/10 mb-4">
              <GraduationCap className="w-7 h-7 text-electric" />
            </div>
            <h3 className="font-heading font-bold text-ink text-xl mb-2">Soy Atleta</h3>
            <p className="text-sm text-ink-soft mb-6">Crea tu perfil, comparte tus estadísticas y conecta con entrenadores universitarios.</p>
            <Button as={Link} to="/athlete/register" variant="primary" className="w-full">Crear Perfil de Atleta</Button>
          </GlassCard>
          <GlassCard hover premium className="p-8 text-center">
            <div className="icon-tile mx-auto bg-gold/15 mb-4">
              <Megaphone className="w-7 h-7 text-gold-dark" />
            </div>
            <h3 className="font-heading font-bold text-ink text-xl mb-2">Soy Entrenador</h3>
            <p className="text-sm text-ink-soft mb-6">Busca talento boricua, guarda prospectos y mensajea atletas directamente.</p>
            <Button as={Link} to="/coach/register" variant="gold" className="w-full">Crear Cuenta de Entrenador</Button>
          </GlassCard>
        </FadeUp>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-16 bg-mist">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <span className="eyebrow">El proceso</span>
            <h2 className="section-heading inline-block">Cómo Funciona</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <FadeUp key={step.title} delay={i * 100}>
                  <GlassCard hover className="p-7 text-center h-full">
                    <div className="icon-tile mx-auto bg-electric/10 mb-4">
                      <Icon className="w-6 h-6 text-electric" />
                    </div>
                    <div className="text-gold font-extrabold text-xs mb-1 tracking-wide">PASO {i + 1}</div>
                    <h3 className="font-heading font-bold text-ink text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-ink-soft">{step.desc}</p>
                  </GlassCard>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURED ATHLETES */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="flex items-center justify-between mb-10">
            <div>
              <span className="eyebrow">Talento boricua</span>
              <h2 className="section-heading">Atletas Destacados</h2>
            </div>
            <Link to="/athletes" className="text-electric font-semibold text-sm hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAthletes.slice(0, 3).map((a, i) => (
              <FadeUp key={a.id} delay={i * 100}><AthleteCard athlete={a} /></FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLEGES */}
      <section className="px-4 py-16 bg-mist">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="flex items-center justify-between mb-10">
            <div>
              <span className="eyebrow">Tus opciones</span>
              <h2 className="section-heading">Universidades Participantes</h2>
            </div>
            <Link to="/colleges" className="text-electric font-semibold text-sm hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...prColleges.slice(0, 4), ...usColleges.slice(0, 4)].map((c, i) => (
              <FadeUp key={c.id} delay={i * 60}><CollegeCard college={c} /></FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <FadeUp>
          <GlassCard dark premium className="max-w-3xl mx-auto p-12 text-center">
            <h2 className="text-3xl font-heading font-extrabold text-white mb-4">¿Listo para el próximo nivel?</h2>
            <p className="text-slate-300 mb-8">Únete a cientos de atletas boricuas que ya están en camino a la universidad.</p>
            <Button as={Link} to="/athlete/register" variant="gold" size="lg">Crear Perfil Gratis</Button>
          </GlassCard>
        </FadeUp>
      </section>
    </div>
  )
}
