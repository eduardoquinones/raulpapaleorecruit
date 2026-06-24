import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Volleyball } from 'lucide-react'
import FadeUp from '../ui/FadeUp'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1748645288738-aadf398bcd3e?fm=jpg&q=80&w=2400&auto=format&fit=crop'
const CARD_THUMB =
  'https://images.unsplash.com/photo-1521138054413-5a47d349b7af?fm=jpg&q=70&w=300&auto=format&fit=crop'

const UTILITY_LINKS = [
  { to: '/athletes', label: 'Para Atletas' },
  { to: '/coach/login', label: 'Para Entrenadores' },
]

const NAV_LINKS = [
  { to: '/athletes', label: 'Atletas' },
  { to: '/colleges', label: 'Universidades' },
  { to: '/coach/login', label: 'Entrenadores' },
]

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-deep">
      {/* background photo + overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Jugadora de voleibol de playa en pleno remate"
          className="w-full h-full object-cover animate-hero-zoom"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(13,27,62,0.1) 0%, rgba(13,27,62,0.6) 100%)' }}
        />
      </div>

      {/* top utility bar */}
      <div className="relative z-30 flex justify-center sm:justify-start pt-5 px-4 sm:px-6">
        <div className="flex items-center gap-3 bg-white/95 rounded-pill pl-2 pr-3 py-1.5 shadow-glass">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-deep text-gold">
            <Volleyball className="w-4 h-4" />
          </span>
          <div className="hidden sm:flex items-center gap-4">
            {UTILITY_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="text-xs font-semibold text-ink hover:text-electric transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* headline */}
      <div className="relative z-20 px-4 sm:px-8 lg:px-14 pt-16 sm:pt-20 lg:pt-28">
        <h1 className="font-heading font-extrabold leading-[0.95] tracking-tight">
          <FadeUp as="span" className="block text-white text-[48px] sm:text-[72px] lg:text-[120px]">
            Tu Próximo.
          </FadeUp>
          <FadeUp as="span" delay={100} className="block text-gold text-[48px] sm:text-[72px] lg:text-[120px]">
            Nivel Te
          </FadeUp>
          <FadeUp as="span" delay={200} className="block text-white text-[48px] sm:text-[72px] lg:text-[120px]">
            Espera.
          </FadeUp>
        </h1>

        <FadeUp delay={300} className="mt-6 max-w-md">
          <p className="text-white/85 text-base sm:text-lg">
            La plataforma #1 de reclutamiento de voleibol en Puerto Rico. Conecta con entrenadores de PR y Estados Unidos.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/athlete/register"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-semibold rounded-pill px-6 py-3 transition-all duration-200 hover:-translate-y-0.5 shadow-glass"
            >
              Crear Perfil Gratis <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/coach/register"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold rounded-pill px-6 py-3 transition-all duration-200 hover:-translate-y-0.5"
            >
              Soy Entrenador
            </Link>
          </div>
        </FadeUp>
      </div>

      {/* corner detail card */}
      <FadeUp
        delay={500}
        className="hidden sm:block absolute bottom-28 right-4 lg:right-10 z-20 w-60"
      >
        <Link
          to="/athlete/profile/1"
          className="block bg-deep/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-glass-lg hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-3">
            <img src={CARD_THUMB} alt="Atleta de voleibol en acción" className="w-12 h-12 rounded-xl object-cover" />
            <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-gold transition-colors" />
          </div>
          <p className="text-[11px] font-semibold tracking-wide uppercase text-gold mb-1">Atleta Destacado</p>
          <p className="text-sm font-bold text-white">Tomas Rivera</p>
          <p className="text-xs text-white/70">4.2 kills/set · Clase 2026</p>
        </Link>
      </FadeUp>

      {/* floating nav pill */}
      <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] sm:w-auto">
        <div
          className="flex items-center gap-1 sm:gap-2 rounded-pill pl-3 pr-1.5 py-1.5 shadow-glass-lg"
          style={{ background: 'rgba(13,27,62,0.85)', backdropFilter: 'blur(20px)' }}
        >
          <Link to="/" className="flex items-center gap-2 pr-2 shrink-0">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-deep">
              <Volleyball className="w-4 h-4" />
            </span>
            <span className="hidden sm:inline font-heading font-bold text-sm text-white whitespace-nowrap">
              VolleyRecruit <span className="text-gold">PR</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-white/80 hover:text-white px-3 py-2 rounded-pill hover:bg-white/10 transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/athlete/register"
            className="bg-white text-deep font-semibold text-sm rounded-pill px-4 sm:px-5 py-2 hover:bg-gold transition-colors duration-200 whitespace-nowrap"
          >
            Crear Perfil
          </Link>
        </div>
      </nav>
    </section>
  )
}
