import { Link } from 'react-router-dom'
import { UserPlus, Handshake, Trophy, ArrowRight, GraduationCap, Megaphone, Users, School, Award, Star } from 'lucide-react'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import FadeUp from '../components/ui/FadeUp'
import Hero from '../components/landing/Hero'
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
      <Hero />

      {/* STATS — typographic moment */}
      <section className="px-4 py-20 bg-deep">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 80} className="text-center sm:text-left">
              <s.icon className="w-6 h-6 text-gold mb-2 mx-auto sm:mx-0" />
              <div className="font-heading font-extrabold text-white text-[44px] sm:text-[64px] lg:text-[80px] leading-none">
                {s.value}
              </div>
              <div className="text-sm text-white/60 mt-1">{s.label}</div>
            </FadeUp>
          ))}
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
